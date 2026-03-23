<script setup lang="ts">
const localePath = useLocalePath()
const { locale, locales, setLocale } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const navigation = computed(() => [
  { key: 'nav.home', path: '/' },
  { key: 'nav.business', path: '/zakelijk' },
  { key: 'nav.residential', path: '/particulier' },
  { key: 'nav.contact', path: '/contact' }
])

const isMenuOpen = ref(false)
const toggleMenu = () => isMenuOpen.value = !isMenuOpen.value

const otherLocale = computed(() => locales.value.find(l => l.code !== locale.value))
</script>

<template>
  <header class="header">
    <div class="top-bar">
      <div class="container top-bar-inner">
        <div class="top-bar-left">
          <a href="https://nl.linkedin.com/in/petra-willems-stolte-2675a3166" target="_blank" rel="noopener" aria-label="LinkedIn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
          </a>
          <a href="https://www.facebook.com/nextdoorinterieurontwerp/" target="_blank" rel="noopener" aria-label="Facebook">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          </a>
          <a href="https://www.instagram.com/nextdoorinterieurontwerp/" target="_blank" rel="noopener" aria-label="Instagram">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
          </a>
        </div>
        <div class="top-bar-right">
          <a href="tel:+31638894042">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            06 388 940 42
          </a>
          <a href="mailto:info@nextdoorinterieurontwerp.nl">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            info@nextdoorinterieurontwerp.nl
          </a>
          <NuxtLink v-if="otherLocale" :to="switchLocalePath(otherLocale.code)" class="lang-switch" :aria-label="`Switch to ${otherLocale.name}`">
            {{ otherLocale.code.toUpperCase() }}
          </NuxtLink>
        </div>
      </div>
    </div>

    <div class="header-main">
      <div class="container header-inner">
        <NuxtLink :to="localePath('/')" class="logo" aria-label="NEXTDOOR Interieurontwerp - Home">
          <img src="/images/home/logo-full.svg" alt="NEXTDOOR Interieurontwerp en -advies" width="656" height="194" />
        </NuxtLink>

        <nav class="desktop-nav" aria-label="Hoofdnavigatie">
          <ul>
            <li v-for="item in navigation" :key="item.path">
              <NuxtLink :to="localePath(item.path)" active-class="active">
                {{ $t(item.key) }}
              </NuxtLink>
            </li>
          </ul>
        </nav>

        <button class="mobile-toggle" @click="toggleMenu" :aria-expanded="isMenuOpen" :aria-label="$t('header.menuToggle')">
          <span :class="{ open: isMenuOpen }"></span>
        </button>
      </div>
    </div>

    <Transition name="slide">
      <nav v-if="isMenuOpen" class="mobile-nav" aria-label="Mobiele navigatie">
        <ul>
          <li v-for="item in navigation" :key="item.path" @click="isMenuOpen = false">
            <NuxtLink :to="localePath(item.path)" active-class="active">
              {{ $t(item.key) }}
            </NuxtLink>
          </li>
          <li v-if="otherLocale" @click="isMenuOpen = false">
            <NuxtLink :to="switchLocalePath(otherLocale.code)" class="lang-switch-mobile">
              {{ otherLocale.name }}
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </Transition>
  </header>
</template>

<style scoped>
.header {
  background: var(--taupe);
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

/* Top bar */
.top-bar {
  background: rgba(0,0,0,0.1);
  padding: 0.6rem 0;
  font-size: 1.2rem;
}

.top-bar-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.top-bar-left {
  display: flex;
  gap: 1.2rem;
  align-items: center;
}

.top-bar-left a,
.top-bar-right a {
  color: white;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.top-bar-left a:hover,
.top-bar-right a:hover {
  color: white;
  opacity: 1;
}

.top-bar-right {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.lang-switch {
  font-weight: 700;
  font-size: 1.2rem;
  letter-spacing: 0.05rem;
  border: 1px solid rgba(255,255,255,0.5);
  padding: 0.2rem 0.8rem;
  border-radius: 3px;
  color: white !important;
  transition: border-color 0.2s, color 0.2s;
}

.lang-switch:hover {
  border-color: white;
  color: white !important;
}

/* Main header */
.header-main {
  padding: 0;
}

.header-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  padding-bottom: 1rem;
}

.logo {
  flex-shrink: 0;
  display: block;
}

.logo img {
  height: 90px;
  width: auto;
  display: block;
}

/* Desktop nav */
.desktop-nav ul {
  list-style: none;
  display: flex;
  gap: 4rem;
  margin: 0;
  padding: 0;
}

.desktop-nav a {
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 1.5rem;
  color: white;
  letter-spacing: 0.1rem;
  text-transform: uppercase;
  padding-bottom: 0.3rem;
  border-bottom: 2px solid transparent;
  transition: border-color 0.2s ease;
}

.desktop-nav a:hover,
.desktop-nav a.active {
  border-bottom-color: white;
  opacity: 1;
}

/* Mobile toggle */
.mobile-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 1rem;
}

.mobile-toggle span {
  display: block;
  width: 26px;
  height: 2px;
  background: white;
  position: relative;
  transition: 0.3s;
}

.mobile-toggle span::before,
.mobile-toggle span::after {
  content: '';
  position: absolute;
  width: 26px;
  height: 2px;
  background: white;
  transition: 0.3s;
}

.mobile-toggle span::before { top: -8px; }
.mobile-toggle span::after { bottom: -8px; }

.mobile-toggle span.open { background: transparent; }
.mobile-toggle span.open::before { transform: rotate(45deg); top: 0; }
.mobile-toggle span.open::after { transform: rotate(-45deg); bottom: 0; }

/* Mobile nav */
.mobile-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--taupe);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.mobile-nav ul {
  list-style: none;
  text-align: center;
  padding: 0;
  margin: 0;
}

.mobile-nav li {
  margin: 2.5rem 0;
}

.mobile-nav a {
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 3.5rem;
  color: white;
  letter-spacing: 0.2rem;
  text-transform: uppercase;
}

.mobile-nav a:hover,
.mobile-nav a.active {
  color: white;
  opacity: 1;
}

.lang-switch-mobile {
  font-size: 2rem !important;
  opacity: 0.7;
}

@media (max-width: 900px) {
  .desktop-nav { display: none; }
  .mobile-toggle { display: block; }
  .top-bar { display: none; }
  .logo img { height: 65px; }
}

.slide-enter-active, .slide-leave-active { transition: opacity 0.3s ease; }
.slide-enter-from, .slide-leave-to { opacity: 0; }
</style>
