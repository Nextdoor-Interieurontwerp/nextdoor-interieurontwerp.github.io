import { decode } from '../utils/consent-cookie'
import { CONSENT_COOKIE } from '../types'

export default defineNuxtPlugin(() => {
  const cookie = useCookie<string | null>(CONSENT_COOKIE)
  const state = useState('consent', () => decode(cookie.value))
  state.value = decode(cookie.value)
})
