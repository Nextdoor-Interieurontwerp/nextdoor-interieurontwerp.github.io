import { decode } from '../utils/consent-cookie'
import { emitConsentMode } from '../utils/consent-mode'
import { CONSENT_COOKIE, DEFAULT_STATE } from '../types'

export default defineNuxtPlugin(() => {
  const cookie = useCookie<string | null>(CONSENT_COOKIE)
  const state = useState('consent', () => DEFAULT_STATE)

  // On static/prerendered sites, SSR ran at build time without user cookies,
  // so the hydrated state is always DEFAULT_STATE. Re-decode from the cookie
  // on client to get the user's actual prior decision.
  state.value = decode(cookie.value)

  if (state.value.decided) emitConsentMode(state.value)

  const channel = new BroadcastChannel('nd_consent')
  channel.addEventListener('message', (e) => {
    if (e.data?.type === 'consent:change') {
      state.value = decode(cookie.value)
      emitConsentMode(state.value)
    }
  })
  window.addEventListener('consent:change', () => {
    channel.postMessage({ type: 'consent:change' })
  })
})
