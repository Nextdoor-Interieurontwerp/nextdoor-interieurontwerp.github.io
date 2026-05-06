export type ConsentCategory = 'necessary' | 'preferences' | 'analytics' | 'marketing'

export interface ConsentState {
  decided: boolean
  timestamp: number | null
  version: number
  categories: Record<ConsentCategory, boolean>
}

export const CONSENT_VERSION = 1
export const CONSENT_COOKIE = 'nd_consent'
export const CONSENT_MAX_AGE = 60 * 60 * 24 * 365

export const DEFAULT_STATE: ConsentState = {
  decided: false,
  timestamp: null,
  version: CONSENT_VERSION,
  categories: {
    necessary: true,
    preferences: false,
    analytics: false,
    marketing: false,
  },
}
