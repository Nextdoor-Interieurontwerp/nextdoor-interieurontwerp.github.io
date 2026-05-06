import type { ConsentCategory } from '../types'

export function useConsentScript(category: ConsentCategory, src: string) {
  const { hasConsent } = useConsent()
  const trigger = computed(() => hasConsent(category))
  // @ts-expect-error — @nuxt/scripts trigger types accept Ref<boolean> at runtime
  return useScript({ src }, { trigger })
}
