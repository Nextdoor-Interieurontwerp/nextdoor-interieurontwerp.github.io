import { CONSENT_MAX_AGE, CONSENT_VERSION, DEFAULT_STATE } from '../types'
import type { ConsentState } from '../types'

const EXPIRY_MS = CONSENT_MAX_AGE * 1000

export function encode(state: ConsentState): string {
  return btoa(JSON.stringify(state))
}

export function decode(value: string | null | undefined): ConsentState {
  if (!value) return { ...DEFAULT_STATE }
  try {
    const parsed = JSON.parse(atob(value)) as ConsentState
    if (parsed.version !== CONSENT_VERSION) return { ...DEFAULT_STATE }
    if (parsed.timestamp && Date.now() - parsed.timestamp > EXPIRY_MS) {
      // Re-prompt after expiry, but keep checkbox state as a courtesy.
      return { ...DEFAULT_STATE, categories: parsed.categories }
    }
    return parsed
  } catch {
    return { ...DEFAULT_STATE }
  }
}
