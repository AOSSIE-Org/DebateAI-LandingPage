import { normalize } from './connect'

export const LAST_SERVER_KEY = 'debateai_last_server'

function getStore() {
  try {
    if (typeof localStorage === 'undefined') return null
    return localStorage
  } catch {
    return null
  }
}

export function loadLastServer() {
  try {
    const store = getStore()
    if (!store) return null
    const raw = store.getItem(LAST_SERVER_KEY)
    if (typeof raw !== 'string') return null
    const normalized = normalize(raw.trim())
    return normalized
  } catch {
    return null
  }
}

export function saveLastServer(url) {
  try {
    const store = getStore()
    if (!store || typeof url !== 'string') return false
    const normalized = normalize(url.trim())
    if (!normalized) return false
    store.setItem(LAST_SERVER_KEY, normalized)
    return true
  } catch {
    return false
  }
}

export function clearLastServer() {
  try {
    const store = getStore()
    if (!store) return false
    store.removeItem(LAST_SERVER_KEY)
    return true
  } catch {
    return false
  }
}
