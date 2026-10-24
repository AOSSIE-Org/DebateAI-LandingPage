import { describe, it, expect } from 'vitest'
import { readFileSync, readdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..')
const SRC = path.join(ROOT, 'src')
const CSS_FILE = path.join(SRC, 'index.css')

const read = (absPath) => readFileSync(absPath, 'utf8')

/** Every `.jsx` file under `src/`. */
const jsxFiles = (() => {
  const found = []
  const walk = (dir) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const abs = path.join(dir, entry.name)
      if (entry.isDirectory()) walk(abs)
      else if (abs.endsWith('.jsx')) found.push(abs)
    }
  }
  walk(SRC)
  return found.sort()
})()

const CSS = read(CSS_FILE)

/** Custom properties declared in `src/index.css`. */
const definedTokens = new Set(
  [...CSS.matchAll(/(--[A-Za-z0-9-]+)\s*:/g)].map((match) => match[1]),
)

/** Class selectors declared in `src/index.css` (e.g. `.fade-in`). */
const definedClasses = new Set(
  [...CSS.matchAll(/\.([A-Za-z][A-Za-z0-9_-]*)/g)].map((match) => match[1]),
)

/** Every `className="..."` / `className={'...'}` / `className={cond ? '...' : '...'}` literal. */
const classStrings = (() => {
  const strings = []
  for (const file of jsxFiles) {
    const content = read(file)
    for (const match of content.matchAll(/className=(?:"([^"]*)"|'([^']*)'|\{`([^`]*)`\})/g)) {
      strings.push({
        file: path.relative(ROOT, file),
        value: match[1] ?? match[2] ?? match[3] ?? '',
      })
    }
  }
  return strings
})()

const allClasses = classStrings.flatMap((entry) => entry.value.split(/\s+/).filter(Boolean))

/**
 * Tailwind v4 lets a utility reference a CSS variable with the `(--token)`
 * shorthand. The token name must start with `--` and must not contain
 * whitespace, otherwise Tailwind silently drops the class.
 */
const VARIABLE_SHORTHAND = /(?:^|[\s"'`])(?:[A-Za-z-]+:)*([A-Za-z][A-Za-z0-9-]*)-\(([^)]*)\)/g

/** Tailwind's default palette — banned in favour of the semantic tokens. */
const PALETTE = [
  'white', 'black', 'zinc', 'neutral', 'stone', 'red', 'orange', 'amber', 'yellow',
  'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet',
  'purple', 'fuchsia', 'pink', 'rose', 'slate', 'gray',
]
const PALETTE_UTILITY = new RegExp(
  `(?:^|[\\s"'\`])(?:[A-Za-z-]+:)*((?:text|bg|border|ring|divide|outline|decoration|placeholder|fill|stroke|from|via|to|shadow|accent|caret)-(?:${PALETTE.join('|')})(?:-[0-9]{2,3})?)(?:/[0-9]+)?(?=[\\s"'\`]|$)`,
  'g',
)

/** Utilities that are colour-neutral and therefore allowed. */
const PALETTE_ALLOWLIST = new Set([
  'text-transparent',
  'bg-transparent',
  'border-transparent',
  'text-current',
  'bg-current',
  'text-inherit',
  'bg-inherit',
  'border-current',
])

describe('Tailwind class strings in src/', () => {
  it('scans a non-empty set of component files', () => {
    expect(jsxFiles.length).toBeGreaterThan(0)
    expect(classStrings.length).toBeGreaterThan(0)
  })

  describe('CSS-variable shorthand', () => {
    it('never omits the `--` prefix on a `(--token)` shorthand', () => {
      const offenders = []
      for (const entry of classStrings) {
        for (const match of entry.value.matchAll(VARIABLE_SHORTHAND)) {
          const token = match[2]
          if (!token.startsWith('--')) {
            offenders.push(`${entry.file}: ${match[1]}-(${token})`)
          }
        }
      }
      expect(offenders).toEqual([])
    })

    it('never puts whitespace inside a `(--token)` shorthand', () => {
      const offenders = []
      for (const entry of classStrings) {
        for (const match of entry.value.matchAll(VARIABLE_SHORTHAND)) {
          if (/\s/.test(match[2])) {
            offenders.push(`${entry.file}: ${match[1]}-(${match[2]})`)
          }
        }
      }
      expect(offenders).toEqual([])
    })

    it('only references tokens that are actually declared in src/index.css', () => {
      const offenders = []
      for (const entry of classStrings) {
        for (const match of entry.value.matchAll(VARIABLE_SHORTHAND)) {
          const token = match[2]
          if (!token.startsWith('--')) continue
          if (!definedTokens.has(token)) {
            offenders.push(`${entry.file}: ${match[1]}-(${token})`)
          }
        }
      }
      expect(offenders).toEqual([])
    })
  })

  describe('semantic token discipline', () => {
    it('never hardcodes a Tailwind palette colour utility', () => {
      const offenders = []
      for (const entry of classStrings) {
        for (const match of entry.value.matchAll(PALETTE_UTILITY)) {
          const utility = match[1]
          if (PALETTE_ALLOWLIST.has(utility)) continue
          offenders.push(`${entry.file}: ${utility}`)
        }
      }
      expect(offenders).toEqual([])
    })
  })

  describe('animation utilities', () => {
    it('only uses `animate-*` classes that are actually defined', () => {
      const offenders = []
      for (const className of allClasses) {
        const match = className.match(/^animate-([A-Za-z0-9_-]+)$/)
        if (!match) continue
        const name = `animate-${match[1]}`
        if (!definedClasses.has(name) && !CSS.includes(`--animate-${match[1]}`)) {
          offenders.push(name)
        }
      }
      expect(offenders).toEqual([])
    })

    it('the fade-in helper used by the modals is defined in src/index.css', () => {
      expect(definedClasses.has('fade-in')).toBe(true)
      expect(CSS).toMatch(/@keyframes\s+fadeIn/)
    })
  })

  describe('regression guards for the previously dead classes', () => {
    it('the self-host guide backdrop uses a valid dimming colour', () => {
      const modal = read(path.join(SRC, 'components', 'SelfHostGuideModal.jsx'))
      expect(modal).toContain('bg-(--surface2)/80')
      expect(modal).not.toContain('bg-(surface2)/80')
    })

    it('no class string contains a stray space inside parentheses', () => {
      const offenders = classStrings
        .filter((entry) => /-\(\s|\s\)/.test(entry.value))
        .map((entry) => `${entry.file}: ${entry.value}`)
      expect(offenders).toEqual([])
    })
  })
})
