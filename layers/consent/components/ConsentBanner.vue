<template>
  <Transition name="consent-fade">
    <aside
      v-if="!isDecided"
      class="consent-banner"
      role="dialog"
      aria-labelledby="consent-banner-title"
    >
      <h2 id="consent-banner-title" class="consent-banner__title">
        {{ $t('consent.banner.title') }}
      </h2>
      <p class="consent-banner__body">{{ $t('consent.banner.body') }}</p>
      <p class="consent-banner__privacy">
        <NuxtLink :to="localePath('/privacyverklaring')">
          {{ $t('consent.banner.privacyLink') }}
        </NuxtLink>
      </p>
      <div class="consent-banner__actions">
        <button
          type="button"
          class="consent-banner__btn consent-banner__btn--primary"
          @click="accept"
        >{{ $t('consent.banner.acceptAll') }}</button>
        <button
          type="button"
          class="consent-banner__btn consent-banner__btn--secondary"
          @click="reject"
        >{{ $t('consent.banner.rejectAll') }}</button>
      </div>
      <button
        type="button"
        class="consent-banner__manage"
        @click="openPreferences"
      >{{ $t('consent.banner.manage') }}</button>
    </aside>
  </Transition>

  <ConsentPreferences v-if="prefsOpen" />
</template>

<script setup lang="ts">
const { isDecided, accept, reject, openPreferences, prefsOpen } = useConsent()
const localePath = useLocalePath()
</script>

<style scoped>
.consent-banner {
  position: fixed;
  bottom: 1.5rem;
  left: 1.5rem;
  width: min(360px, calc(100vw - 3rem));
  z-index: 9999;
  background: #fff;
  color: #222;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 0.6rem;
  padding: 1.4rem 1.6rem;
  box-shadow: 0 0.4rem 1.6rem rgba(0, 0, 0, 0.12);
  font-size: 1.4rem;
  line-height: 1.5;
}

.consent-banner__title {
  margin: 0 0 0.4rem;
  font-size: 1.5rem;
  font-weight: 600;
}

.consent-banner__body {
  margin: 0 0 0.6rem;
  font-size: 1.3rem;
  color: #444;
}

.consent-banner__privacy {
  margin: 0 0 1.2rem;
  font-size: 1.2rem;
}

.consent-banner__privacy a {
  color: inherit;
  text-decoration: underline;
}

.consent-banner__actions {
  display: flex;
  gap: 0.6rem;
  margin-bottom: 0.6rem;
}

.consent-banner__btn {
  flex: 1;
  padding: 0.7rem 1rem;
  border-radius: 0.3rem;
  font-size: 1.3rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.15s ease;
}

.consent-banner__btn:hover { opacity: 0.85; }

.consent-banner__btn--primary {
  background: #222;
  color: #fff;
  border: 1px solid #222;
}

.consent-banner__btn--secondary {
  background: transparent;
  color: #222;
  border: 1px solid #222;
}

.consent-banner__manage {
  display: block;
  width: 100%;
  padding: 0.4rem 0;
  background: transparent;
  border: none;
  font-size: 1.2rem;
  color: #555;
  text-decoration: underline;
  cursor: pointer;
}

.consent-fade-enter-active,
.consent-fade-leave-active {
  transition: transform 0.25s ease, opacity 0.25s ease;
}

.consent-fade-enter-from,
.consent-fade-leave-to {
  transform: translateY(1rem);
  opacity: 0;
}

@media (max-width: 480px) {
  .consent-banner {
    bottom: 0;
    left: 0;
    right: 0;
    width: auto;
    border-radius: 0.6rem 0.6rem 0 0;
  }
}
</style>
