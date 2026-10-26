import { describe, it, expect } from 'vitest'
import { readFileSync, existsSync, readdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  SITE_ORIGIN,
  SITE_TITLE,
  SITE_DESCRIPTION,
  OG_IMAGE_PATH,
  FAVICON_PATH,
  CANONICAL_PATH,
} from '../lib/site'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..')

const read = (relPath) => readFileSync(path.join(ROOT, relPath), 'utf8')
const exists = (relPath) => existsSync(path.join(ROOT, relPath))

const INDEX_HTML = 'index.html'
const LLMS_TXT = 'public/llms.txt'
const ROBOTS_TXT = 'public/robots.txt'
const SITEMAP_XML = 'public/sitemap.xml'
const AI_PLUGIN_JSON = 'public/.well-known/ai-plugin.json'
const ASSET_LINKS_JSON = 'public/.well-known/assetlinks.json'

/**
 * Strings that must never reach production. Every one of these shipped in the
 * repository at some point and told crawlers, LLM agents and browsers that the
 * site was a Next.js starter template hosted at `yourdomain.com`.
 */
const FORBIDDEN_STRINGS = [
  'yourdomain.com',
  'project.aossie.org',
  'TODO',
  'Next.js',
  'next.js',
  'next-intl',
  'next-themes',
  'App Router',
  'src/app/',
  'src/i18n',
  'src/messages',
  'src/proxy.ts',
  'Webpage Starter',
  'vite.svg',
  'AOSSIE Webpage Starter',
]

const PUBLIC_TEXT_FILES = [
  INDEX_HTML,
  LLMS_TXT,
  ROBOTS_TXT,
  SITEMAP_XML,
  AI_PLUGIN_JSON,
  ASSET_LINKS_JSON,
]

const metaContent = (html, property) => {
  const match = html.match(
    new RegExp(`<meta[^>]+(?:property|name)=["']${property}["'][^>]*content=["']([^"']*)["']`),
  )
  if (match) return match[1]
  const reversed = html.match(
    new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]*(?:property|name)=["']${property}["']`),
  )
  return reversed ? reversed[1] : null
}

const linkHref = (html, rel) => {
  const match = html.match(new RegExp(`<link[^>]+rel=["']${rel}["'][^>]*href=["']([^"']*)["']`))
  if (match) return match[1]
  const reversed = html.match(
    new RegExp(`<link[^>]+href=["']([^"']*)["'][^>]*rel=["']${rel}["']`),
  )
  return reversed ? reversed[1] : null
}

describe('public site metadata', () => {
  describe('no placeholder or stale-framework strings ship to production', () => {
    it.each(PUBLIC_TEXT_FILES)('%s contains no placeholder strings', (file) => {
      const content = read(file)
      for (const forbidden of FORBIDDEN_STRINGS) {
        expect(
          content.includes(forbidden),
          `${file} must not contain the placeholder string "${forbidden}"`,
        ).toBe(false)
      }
    })

    it('sweep: no other file under public/ reintroduces a placeholder', () => {
      const offenders = []

      const walk = (dir) => {
        for (const entry of readdirSync(path.join(ROOT, dir), { withFileTypes: true })) {
          const rel = path.join(dir, entry.name)
          if (entry.isDirectory()) {
            walk(rel)
            continue
          }
          if (!/\.(html|txt|json|xml|svg)$/.test(entry.name)) continue
          const content = readFileSync(path.join(ROOT, rel), 'utf8')
          for (const forbidden of ['yourdomain.com', 'project.aossie.org', 'TODO:']) {
            if (content.includes(forbidden)) offenders.push(`${rel} -> ${forbidden}`)
          }
        }
      }

      walk('public')
      expect(offenders).toEqual([])
    })
  })

  describe('index.html', () => {
    it('points the favicon at a real, existing asset', () => {
      const href = linkHref(read(INDEX_HTML), 'icon')
      expect(href).toBe(FAVICON_PATH)
      expect(exists(`public${FAVICON_PATH}`)).toBe(true)
    })

    it('keeps a real .ico fallback and an apple-touch-icon', () => {
      const html = read(INDEX_HTML)
      expect(linkHref(html, 'alternate icon')).toBe('/favicon.ico')
      expect(exists('public/favicon.ico')).toBe(true)
      expect(linkHref(html, 'apple-touch-icon')).toBe('/apple-touch-icon.png')
      expect(exists('public/apple-touch-icon.png')).toBe(true)
    })

    it('uses the canonical origin for canonical, og:url and og:image', () => {
      const html = read(INDEX_HTML)
      expect(linkHref(html, 'canonical')).toBe(`${SITE_ORIGIN}${CANONICAL_PATH}`)
      expect(metaContent(html, 'og:url')).toBe(`${SITE_ORIGIN}${CANONICAL_PATH}`)
      expect(metaContent(html, 'og:image')).toBe(`${SITE_ORIGIN}${OG_IMAGE_PATH}`)
      expect(metaContent(html, 'twitter:image')).toBe(`${SITE_ORIGIN}${OG_IMAGE_PATH}`)
    })

    it('serves an og:image that actually exists in public/', () => {
      const imageUrl = metaContent(read(INDEX_HTML), 'og:image')
      expect(imageUrl.startsWith(`${SITE_ORIGIN}/`)).toBe(true)
      expect(exists(`public${imageUrl.slice(SITE_ORIGIN.length)}`)).toBe(true)
    })

    it('declares the og:image dimensions and alt text', () => {
      const html = read(INDEX_HTML)
      expect(metaContent(html, 'og:image:width')).toBe('1200')
      expect(metaContent(html, 'og:image:height')).toBe('630')
      expect(metaContent(html, 'og:image:alt')).toBeTruthy()
      expect(metaContent(html, 'twitter:image:alt')).toBeTruthy()
    })

    it('uses the canonical title and description', () => {
      const html = read(INDEX_HTML)
      expect(html).toContain(`<title>${SITE_TITLE}</title>`)
      expect(metaContent(html, 'description')).toBe(SITE_DESCRIPTION)
      expect(metaContent(html, 'og:title')).toBe(SITE_TITLE)
      expect(metaContent(html, 'og:description')).toBe(SITE_DESCRIPTION)
    })

    it('declares a theme colour for both colour schemes', () => {
      const html = read(INDEX_HTML)
      expect(html).toContain('name="theme-color"')
      expect(html).toContain('#060606')
      expect(html).toContain('#fafaf7')
    })
  })

  describe('public/llms.txt', () => {
    it('describes the real stack', () => {
      const content = read(LLMS_TXT)
      expect(content).toContain('Vite 8')
      expect(content).toContain('React 19')
      expect(content).toContain('Tailwind CSS v4')
      expect(content).toContain('React Router')
      expect(content).toContain('Embla')
      expect(content).toContain('Vitest')
    })

    it('describes the real theme mechanism and token names', () => {
      const content = read(LLMS_TXT)
      expect(content).toContain('data-theme')
      expect(content).toContain('src/index.css')
      expect(content).toContain('--brand-orange')
      expect(content).toContain('bg-(--surface)')
      expect(content).toContain('text-(--text2)')
    })

    it('documents the real repository layout and URL contract', () => {
      const content = read(LLMS_TXT)
      expect(content).toContain('src/lib/connect.js')
      expect(content).toContain('src/lib/storage.js')
      expect(content).toContain('src/context/ThemeContext.jsx')
      expect(content).toContain('debateai.aossie.org')
      expect(content).toContain('?server=')
    })
  })

  describe('public/.well-known', () => {
    it('ai-plugin.json is valid JSON with real values and resolvable URLs', () => {
      const plugin = JSON.parse(read(AI_PLUGIN_JSON))
      expect(plugin.name_for_human).toBe('DebateAI (AOSSIE)')
      expect(plugin.name_for_model).toBe('debateai_aossie')
      expect(plugin.description_for_human).toContain('DebateAI')

      for (const value of [plugin.logo_url, plugin.legal_info_url, plugin.api.url]) {
        expect(value).toMatch(/^https:\/\/[^\s]+$/)
        expect(() => new URL(value)).not.toThrow()
      }
      expect(plugin.logo_url.startsWith(SITE_ORIGIN)).toBe(true)
    })

    it('assetlinks.json is valid JSON with no fabricated package or fingerprint', () => {
      const links = JSON.parse(read(ASSET_LINKS_JSON))
      expect(Array.isArray(links)).toBe(true)
      for (const entry of links) {
        expect(entry.target.package_name).not.toContain('TODO')
        for (const fingerprint of entry.target.sha256_cert_fingerprints) {
          expect(fingerprint).toMatch(/^[0-9A-Fa-f]{64}$/)
        }
      }
    })
  })

  describe('robots.txt and sitemap.xml', () => {
    it('robots.txt advertises exactly the canonical sitemap', () => {
      const robots = read(ROBOTS_TXT)
      expect(robots).toContain(`Sitemap: ${SITE_ORIGIN}/sitemap.xml`)
      expect(robots).not.toContain('Disallow: /_vercel/')
    })

    it('sitemap.xml lists the canonical landing page URL', () => {
      const sitemap = read(SITEMAP_XML)
      const loc = sitemap.match(/<loc>([^<]+)<\/loc>/)
      expect(loc).not.toBeNull()
      expect(loc[1]).toBe(`${SITE_ORIGIN}${CANONICAL_PATH}`)
    })

    it('robots.txt and sitemap.xml agree with each other', () => {
      const robots = read(ROBOTS_TXT)
      const sitemap = read(SITEMAP_XML)
      const advertised = robots.match(/Sitemap:\s*(\S+)/)
      const loc = sitemap.match(/<loc>([^<]+)<\/loc>/)
      expect(advertised[1]).toBe(`${SITE_ORIGIN}/sitemap.xml`)
      expect(loc[1].startsWith(`${SITE_ORIGIN}/`)).toBe(true)
    })
  })
})
