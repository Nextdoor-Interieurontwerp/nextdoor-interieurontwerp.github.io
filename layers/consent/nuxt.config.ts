export default defineNuxtConfig({
  modules: ['@nuxt/scripts'],
  runtimeConfig: {
    public: {
      // Set via NUXT_PUBLIC_GOOGLE_ADS_ID env var. Empty = gtag.js does not load.
      // Per-conversion send_to values come from conversions.lock.json — generated
      // by the runner's sync workflow.
      googleAdsId: '',
    },
  },
  app: {
    head: {
      script: [
        {
          // Consent Mode v2 default-deny stub. Sets a no-op gtag function and
          // declares everything denied. Loaded inline before any consent-gated
          // script. Sets/reads nothing — allowed without consent.
          innerHTML:
            "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',functionality_storage:'denied',personalization_storage:'denied',security_storage:'granted',wait_for_update:500});",
          tagPosition: 'head',
        },
      ],
    },
  },
})
