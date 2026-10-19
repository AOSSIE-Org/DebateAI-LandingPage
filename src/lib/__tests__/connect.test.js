import { describe, it, expect, vi, beforeEach } from 'vitest'
import { normalize, connectToServer, WEBAPP_URL, TRY_IT_OUT_URL } from '../connect'

describe('connect utility library', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('defines correct webapp and try-it-out URLs', () => {
    expect(WEBAPP_URL).toBe('https://debateai.aossie.org')
    expect(TRY_IT_OUT_URL).toBe('https://debateai.aossie.org/?server=official')
  })

  describe('normalize()', () => {
    it('normalizes valid HTTPS server URLs', () => {
      expect(normalize('https://debate.example.org')).toBe('https://debate.example.org')
      expect(normalize('https://debate.example.org/some/path')).toBe('https://debate.example.org')
      expect(normalize('  https://debate.example.org  ')).toBe('https://debate.example.org')
    })

    it('allows HTTP only for localhost and 127.0.0.1 for local development', () => {
      expect(normalize('http://localhost:1313')).toBe('http://localhost:1313')
      expect(normalize('http://127.0.0.1:8080')).toBe('http://127.0.0.1:8080')
    })

    it('rejects insecure HTTP for non-local addresses', () => {
      expect(normalize('http://insecure-domain.org')).toBeNull()
      expect(normalize('http://192.168.1.10:8080')).toBeNull()
    })

    it('rejects invalid or malicious URI schemes', () => {
      expect(normalize('javascript:alert(1)')).toBeNull()
      expect(normalize('data:text/html,test')).toBeNull()
      expect(normalize('file:///etc/passwd')).toBeNull()
      expect(normalize('ftp://debate.org')).toBeNull()
    })

    it('handles empty or malformed inputs gracefully', () => {
      expect(normalize('')).toBeNull()
      expect(normalize('not-a-valid-url')).toBeNull()
      expect(normalize(null)).toBeNull()
      expect(normalize(undefined)).toBeNull()
    })
  })

  describe('connectToServer()', () => {
    it('returns false for invalid inputs without redirecting', () => {
      expect(connectToServer('invalid-url')).toBe(false)
      expect(connectToServer('')).toBe(false)
    })

    it('returns true and redirects for valid HTTPS URLs', () => {
      const mockLocation = { href: '' }
      vi.stubGlobal('window', { location: mockLocation })

      const success = connectToServer('https://my-debate-server.com')
      expect(success).toBe(true)
      expect(mockLocation.href).toBe(
        `${WEBAPP_URL}/?server=${encodeURIComponent('https://my-debate-server.com')}`
      )
    })
  })
})
