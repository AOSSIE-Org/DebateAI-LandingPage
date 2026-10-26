import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import {
  loadLastServer,
  saveLastServer,
  clearLastServer,
  LAST_SERVER_KEY,
} from '../storage'

const createStore = (initial = {}) => {
  const data = { ...initial }
  return {
    getItem: (key) => (key in data ? data[key] : null),
    setItem: (key, value) => {
      data[key] = String(value)
    },
    removeItem: (key) => {
      delete data[key]
    },
    get data() {
      return data
    },
  }
}

describe('server storage helper', () => {
  let store

  beforeEach(() => {
    store = createStore()
    vi.stubGlobal('localStorage', store)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('exposes a stable localStorage key', () => {
    expect(LAST_SERVER_KEY).toBe('debateai_last_server')
  })

  it('round-trips a remembered server', () => {
    expect(saveLastServer('https://debate.example.org')).toBe(true)
    expect(store.data[LAST_SERVER_KEY]).toBe('https://debate.example.org')
    expect(loadLastServer()).toBe('https://debate.example.org')
  })

  it('normalises the stored value so a path or trailing slash is not kept', () => {
    saveLastServer('  https://debate.example.org/some/path  ')
    expect(loadLastServer()).toBe('https://debate.example.org')
  })

  it('returns null when nothing is remembered', () => {
    expect(loadLastServer()).toBeNull()
  })

  it('rejects and discards a remembered value that is not a valid server URL', () => {
    store.setItem(LAST_SERVER_KEY, 'not-a-url')
    expect(loadLastServer()).toBeNull()
  })

  it('rejects a remembered value using an unsafe scheme', () => {
    store.setItem(LAST_SERVER_KEY, 'javascript:alert(1)')
    expect(loadLastServer()).toBeNull()
  })

  it('refuses to save an invalid URL', () => {
    expect(saveLastServer('http://insecure-domain.org')).toBe(false)
    expect(saveLastServer('')).toBe(false)
    expect(saveLastServer(null)).toBe(false)
    expect(store.data[LAST_SERVER_KEY]).toBeUndefined()
  })

  it('clears a remembered server', () => {
    saveLastServer('https://debate.example.org')
    expect(clearLastServer()).toBe(true)
    expect(loadLastServer()).toBeNull()
  })

  it('degrades gracefully when localStorage is unavailable', () => {
    vi.stubGlobal('localStorage', undefined)
    expect(loadLastServer()).toBeNull()
    expect(saveLastServer('https://debate.example.org')).toBe(false)
    expect(clearLastServer()).toBe(false)
  })

  it('degrades gracefully when localStorage throws (private mode / disabled storage)', () => {
    vi.stubGlobal('localStorage', {
      getItem: () => {
        throw new Error('denied')
      },
      setItem: () => {
        throw new Error('denied')
      },
      removeItem: () => {
        throw new Error('denied')
      },
    })
    expect(loadLastServer()).toBeNull()
    expect(saveLastServer('https://debate.example.org')).toBe(false)
    expect(clearLastServer()).toBe(false)
  })
})
