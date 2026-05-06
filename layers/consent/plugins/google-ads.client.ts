// Loads Google Ads gtag.js once marketing consent is granted.
// No-op if `runtimeConfig.public.googleAdsId` isn't configured.

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const googleAdsId = (config.public as Record<string, unknown>).googleAdsId as string | undefined
  if (!googleAdsId) return

  const w = window as unknown as { gtag?: (...args: unknown[]) => void }
  // Queue the config call; gtag.js processes the dataLayer when it loads.
  // The Consent Mode v2 stub (in nuxt.config.ts head) already defined window.gtag.
  w.gtag?.('js', new Date())
  w.gtag?.('config', googleAdsId)

  useConsentScript('marketing', `https://www.googletagmanager.com/gtag/js?id=${googleAdsId}`)
})
