<template>
  <footer class="footer">
    <div class="container footer-content">
      <div class="footer-brand">
        <img src="/images/home/logo-full.svg" alt="NEXTDOOR Interieurontwerp" class="footer-logo" width="656" height="194" />
      </div>

      <div class="footer-nav-col">
        <ul class="footer-nav">
          <li><NuxtLink :to="localePath('/')">NEXTDOOR</NuxtLink></li>
          <li><NuxtLink :to="localePath('/zakelijk')">{{ $t('nav.business') }}</NuxtLink></li>
          <li><NuxtLink :to="localePath('/particulier')">{{ $t('nav.residential') }}</NuxtLink></li>
          <li><NuxtLink :to="localePath('/bouwbegeleiding')">{{ $t('nav.bouwbegeleiding') }}</NuxtLink></li>
          <li><NuxtLink :to="localePath('/werkgebied')">{{ $t('nav.werkgebied') }}</NuxtLink></li>
          <li><NuxtLink :to="localePath('/contact')">{{ $t('nav.contact') }}</NuxtLink></li>
        </ul>
      </div>

      <div class="footer-contact-col">
        <p><a :href="`tel:${BUSINESS.telephone}`">{{ BUSINESS.telephoneDisplay }}</a></p>
        <p><a :href="`mailto:${BUSINESS.email}`">{{ BUSINESS.email }}</a></p>
        <p>
          <a :href="BUSINESS.mapUrl" target="_blank" rel="noopener">{{ shortAddress }}</a>
          <span class="footer-pluscode">{{ BUSINESS.plusCode }}</span>
        </p>
        <div class="footer-social">
          <a :href="BUSINESS.socials.linkedin" target="_blank" rel="noopener" aria-label="LinkedIn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect transform="translate(2,9)" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
          </a>
          <a :href="BUSINESS.socials.facebook" target="_blank" rel="noopener" aria-label="Facebook">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          </a>
          <a :href="BUSINESS.socials.instagram" target="_blank" rel="noopener" aria-label="Instagram">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect transform="translate(2,2)" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><path d="M17.5 6.5 L17.51 6.5"/></svg>
          </a>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="container footer-bottom-inner">
        <p>&copy; {{ new Date().getFullYear() }} {{ BUSINESS.fullName }} &nbsp;|&nbsp; KvK {{ BUSINESS.kvk }}</p>
        <p class="footer-legal">
          <NuxtLink :to="localePath('/impressie')">{{ $t('footer.legal') }}</NuxtLink>
          &nbsp;|&nbsp;
          <NuxtLink :to="localePath('/algemene-voorwaarden')">{{ $t('footer.terms') }}</NuxtLink>
          &nbsp;|&nbsp;
          <NuxtLink :to="localePath('/privacyverklaring')">{{ $t('footer.privacy') }}</NuxtLink>
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { BUSINESS, shortAddress } from '~~/shared/business'

const localePath = useLocalePath()
</script>

<style scoped>
.footer {
  background: var(--taupe);
  color: var(--taupe-on-taupe);
  padding: 5rem 0 0;
}

.footer-content {
  display: grid;
  grid-template-columns: 1fr 1fr 1.5fr;
  gap: 4rem;
  padding-bottom: 5rem;
  align-items: start;
}

.footer-logo {
  height: 80px;
  width: auto;
  filter: brightness(0) invert(1);
  opacity: 0.9;
}

.footer-nav {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-nav li {
  margin-bottom: 1rem;
}

.footer-nav a {
  color: var(--taupe-on-taupe);
  font-weight: 600;
  font-size: 1.4rem;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
}

.footer-nav a:hover {
  color: var(--taupe-on-taupe);
  opacity: 1;
}

.footer-contact-col p {
  font-size: 1.4rem;
  color: var(--taupe-on-taupe);
  margin-bottom: 0.8rem;
}

.footer-contact-col a {
  color: var(--taupe-on-taupe);
}

.footer-contact-col a:hover {
  color: var(--taupe-on-taupe);
  opacity: 1;
}

.footer-pluscode {
  display: block;
  opacity: 0.6;
  font-size: 0.85em;
  letter-spacing: 0.03em;
}

.footer-social {
  display: flex;
  gap: 1.5rem;
  margin-top: 2rem;
}

.footer-social a {
  color: var(--taupe-on-taupe);
  display: flex;
  align-items: center;
}

.footer-social a:hover {
  color: var(--taupe-on-taupe);
  opacity: 1;
}

.footer-bottom {
  border-top: 1px solid rgba(255,255,255,0.15);
  padding: 2rem 0;
}

.footer-bottom-inner p {
  font-size: 1.2rem;
  color: var(--taupe-on-taupe);
  margin: 0;
  text-align: center;
}

.footer-legal {
  margin-top: 0.6rem !important;
}

.footer-legal a {
  color: var(--taupe-on-taupe);
}

.footer-legal a:hover {
  color: var(--taupe-on-taupe);
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 3rem;
    text-align: center;
  }
  .footer-social {
    justify-content: center;
  }
}
</style>
