import type { ConsentCategory, ConsentState } from '../types'
import { CONSENT_COOKIE, CONSENT_MAX_AGE, CONSENT_VERSION, DEFAULT_STATE } from '../types'
import { encode } from '../utils/consent-cookie'
import { emitConsentMode } from '../utils/consent-mode'

export function useConsent() {
  const state = useState<ConsentState>('consent', () => ({ ...DEFAULT_STATE }))
  const prefsOpen = useState<boolean>('consent.prefsOpen', () => false)
  const cookie = useCookie<string | null>(CONSENT_COOKIE, {
    maxAge: CONSENT_MAX_AGE,
    sameSite: 'lax',
    secure: true,
    path: '/',
  })

  const isDecided = computed(() => state.value.decided)

  function hasConsent(category: ConsentCategory): boolean {
    return state.value.categories[category] === true
  }

  function persist(): void {
    cookie.value = encode(state.value)
    emitConsentMode(state.value)
    if (import.meta.client) {
      window.dispatchEvent(new CustomEvent('consent:change', { detail: state.value }))
    }
  }

  function accept(): void {
    state.value = {
      decided: true,
      timestamp: Date.now(),
      version: CONSENT_VERSION,
      categories: { necessary: true, preferences: true, analytics: true, marketing: true },
    }
    prefsOpen.value = false
    persist()
  }

  function reject(): void {
    state.value = {
      decided: true,
      timestamp: Date.now(),
      version: CONSENT_VERSION,
      categories: { necessary: true, preferences: false, analytics: false, marketing: false },
    }
    prefsOpen.value = false
    persist()
  }

  function setCategories(partial: Partial<Record<ConsentCategory, boolean>>): void {
    state.value = {
      decided: true,
      timestamp: Date.now(),
      version: CONSENT_VERSION,
      categories: {
        ...state.value.categories,
        ...partial,
        necessary: true,
      },
    }
    prefsOpen.value = false
    persist()
  }

  function revoke(): void {
    state.value = { ...DEFAULT_STATE }
    persist()
  }

  function openPreferences(): void { prefsOpen.value = true }
  function closePreferences(): void { prefsOpen.value = false }

  return {
    state: readonly(state),
    isDecided,
    hasConsent,
    accept,
    reject,
    setCategories,
    revoke,
    openPreferences,
    closePreferences,
    prefsOpen,
  }
}
