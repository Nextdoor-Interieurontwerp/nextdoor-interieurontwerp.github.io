<script setup lang="ts">
/**
 * A slim call/email bar, mobile only.
 *
 * Every ad promises "Maak een afspraak" and then lands on a page where, on a
 * phone, there is no way to act on that without scrolling — measured across
 * the homepage and the campaign landing pages, not assumed. Google's landing
 * page experience rates this, and so does the visitor.
 *
 * Non-intrusive was the brief, so:
 *   - it stays out of the first screen entirely, leaving the hero — the best
 *     thing on the site — exactly as designed;
 *   - it hides again once the footer's own contact details are in view,
 *     rather than sitting on top of them;
 *   - it is taupe, not a loud call-to-action colour.
 */
import { BUSINESS } from '~~/shared/business'

const visible = ref(false)
let footerObserver: IntersectionObserver | null = null
let bannerObserver: MutationObserver | null = null
let onScroll: (() => void) | null = null

/** True once the footer's contact block is on screen; the bar is redundant then. */
const footerInView = ref(false)

/**
 * The consent banner is also fixed to the bottom of a phone screen and sits far
 * above this in the stack, so the bar would be hidden behind it anyway. Standing
 * down while a decision is pending keeps two bars from occupying one strip.
 */
const consentPending = ref(false)

function update() {
  visible.value =
    window.scrollY > window.innerHeight * 0.8 &&
    !footerInView.value &&
    !consentPending.value
}

onMounted(() => {
  onScroll = () => requestAnimationFrame(update)
  window.addEventListener('scroll', onScroll, { passive: true })

  const footer = document.querySelector('.footer')
  if (footer) {
    footerObserver = new IntersectionObserver(
      ([entry]) => {
        footerInView.value = entry?.isIntersecting ?? false
        update()
      },
      { rootMargin: '0px 0px -40% 0px' },
    )
    footerObserver.observe(footer)
  }

  const checkConsent = () => {
    consentPending.value = !!document.querySelector('.consent-banner')
    update()
  }
  bannerObserver = new MutationObserver(checkConsent)
  bannerObserver.observe(document.body, { childList: true, subtree: true })
  checkConsent()
})

onBeforeUnmount(() => {
  if (onScroll) window.removeEventListener('scroll', onScroll)
  footerObserver?.disconnect()
  bannerObserver?.disconnect()
})
</script>

<template>
  <nav
    class="sticky-contact"
    :class="{ 'is-visible': visible }"
    :aria-hidden="!visible"
    :aria-label="$t('stickyContact.aria')"
  >
    <a :href="`tel:${BUSINESS.telephone}`" class="sc-action">
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor"
           stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6
                 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
      <span>{{ $t('stickyContact.call') }}</span>
    </a>
    <span class="sc-divider" aria-hidden="true" />
    <a :href="`mailto:${BUSINESS.email}`" class="sc-action">
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor"
           stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 6-10 7L2 6" />
      </svg>
      <span>{{ $t('stickyContact.mail') }}</span>
    </a>
  </nav>
</template>

<style scoped>
.sticky-contact {
  /* Desktop has the header and plenty of room; this is a small-screen problem. */
  display: none;
}

@media (max-width: 768px) {
  .sticky-contact {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 40;
    display: flex;
    align-items: stretch;
    background: var(--taupe);
    color: var(--taupe-on-taupe);
    /* Clears the iPhone home indicator without adding height elsewhere. */
    padding-bottom: env(safe-area-inset-bottom, 0);
    box-shadow: 0 -1px 12px rgb(0 0 0 / 12%);
    transform: translateY(100%);
    opacity: 0;
    pointer-events: none;
    transition: transform 0.28s ease, opacity 0.28s ease;
  }

  .sticky-contact.is-visible {
    transform: translateY(0);
    opacity: 1;
    pointer-events: auto;
  }

  .sc-action {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.55rem;
    /* Comfortably above the 44px minimum touch target. */
    min-height: 52px;
    color: inherit;
    text-decoration: none;
    font-size: 0.95rem;
    letter-spacing: 0.02em;
  }

  .sc-action:active {
    background: var(--taupe-dark);
  }

  .sc-divider {
    width: 1px;
    margin: 0.75rem 0;
    background: currentColor;
    opacity: 0.25;
  }
}

@media (prefers-reduced-motion: reduce) {
  .sticky-contact {
    transition: none;
  }
}
</style>
