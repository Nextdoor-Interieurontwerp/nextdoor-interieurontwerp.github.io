import { decode } from '../utils/consent-cookie'
import { emitConsentMode } from '../utils/consent-mode'
import { CONSENT_COOKIE } from '../types'

export default defineNuxtPlugin(() => {
  const cookie = useCookie<string | null>(CONSENT_COOKIE)
  const state = useState('consent', () => decode(cookie.value))

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
