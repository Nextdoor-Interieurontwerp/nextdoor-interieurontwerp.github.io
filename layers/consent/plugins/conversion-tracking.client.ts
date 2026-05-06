// Fires Google Ads conversion events declared in conversions.json, gated on marketing consent.
// Runs no listeners until both `googleAdsId` (runtime config) and the relevant lock entry are set.

import manifest from '../conversions.json'
import lock from '../conversions.lock.json'

type LinkClickTrigger = { type: 'linkClick'; hrefStartsWith: string }
type PageViewTrigger = { type: 'pageView'; path?: string }
type ExternalTrigger = { type: 'external' } // Fired by Google Ads (e.g. call asset), not the site
type Trigger = LinkClickTrigger | PageViewTrigger | ExternalTrigger
type Conversion = { key: string; name: string; category: string; valueEur?: number; trigger: Trigger }

const lockMap = lock as Record<string, string>
const conversions = manifest as Conversion[]

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const googleAdsId = (config.public as Record<string, unknown>).googleAdsId as string | undefined
  if (!googleAdsId) return

  const { hasConsent } = useConsent()
  const w = window as unknown as { gtag?: (...args: unknown[]) => void }

  function fire(key: string): void {
    const sendTo = lockMap[key]
    if (!sendTo) return
    w.gtag?.('event', 'conversion', { send_to: sendTo })
  }

  // Link clicks (tel:, mailto:, etc.) — single delegated listener.
  document.addEventListener('click', (event) => {
    if (!hasConsent('marketing')) return
    const anchor = (event.target as HTMLElement | null)?.closest('a')
    if (!anchor) return
    const href = anchor.getAttribute('href') ?? ''
    for (const conv of conversions) {
      if (conv.trigger.type !== 'linkClick') continue
      if (!href.startsWith(conv.trigger.hrefStartsWith)) continue
      fire(conv.key)
      break
    }
  })

  // Page views — fire on every route change; also fire once for the initial route.
  const router = useRouter()
  const route = useRoute()

  function firePageViews(path: string): void {
    if (!hasConsent('marketing')) return
    for (const conv of conversions) {
      if (conv.trigger.type !== 'pageView') continue
      if (conv.trigger.path && conv.trigger.path !== path) continue
      fire(conv.key)
    }
  }

  firePageViews(route.path)
  router.afterEach((to) => firePageViews(to.path))

  // If the user grants marketing consent *after* the initial page load (the
  // common case — they land, then click Accept), backfire pageView conversions
  // for the route they're currently on so we don't lose that signal.
  watch(
    () => hasConsent('marketing'),
    (granted, prev) => {
      if (granted && !prev) firePageViews(route.path)
    },
  )
})
