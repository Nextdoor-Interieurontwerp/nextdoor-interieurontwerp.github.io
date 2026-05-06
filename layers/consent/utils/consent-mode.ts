import type { ConsentState } from '../types'

export function emitConsentMode(state: ConsentState): void {
  if (typeof window === 'undefined') return
  const w = window as unknown as { gtag?: (...args: unknown[]) => void }
  if (typeof w.gtag !== 'function') return
  const grant = (b: boolean) => (b ? 'granted' : 'denied')
  w.gtag('consent', 'update', {
    ad_storage: grant(state.categories.marketing),
    ad_user_data: grant(state.categories.marketing),
    ad_personalization: grant(state.categories.marketing),
    analytics_storage: grant(state.categories.analytics),
    functionality_storage: grant(state.categories.preferences),
    personalization_storage: grant(state.categories.preferences),
    security_storage: 'granted',
  })
}
