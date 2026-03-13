<template>
  <footer class="footer">
    <div class="container footer-content">
      <div class="footer-brand">
        <img src="/images/home/logo-full.svg" alt="NEXTDOOR Interieurontwerp" class="footer-logo" />
      </div>

      <div class="footer-nav-col">
        <ul class="footer-nav">
          <li><NuxtLink to="/">NEXTDOOR</NuxtLink></li>
          <li><NuxtLink to="/zakelijk">ZAKELIJK</NuxtLink></li>
          <li><NuxtLink to="/particulier">PARTICULIER</NuxtLink></li>
          <li><NuxtLink to="/contact">CONTACT</NuxtLink></li>
        </ul>
      </div>

      <div class="footer-contact-col">
        <p><a href="tel:+31638894042">06 388 940 42</a></p>
        <p><a href="mailto:info@nextdoorinterieurontwerp.nl">info@nextdoorinterieurontwerp.nl</a></p>
        <p>Heescheweg 44, 5388 VK Nistelrode</p>
        <div class="footer-social">
          <a href="https://www.linkedin.com/company/nextdoor-interieurontwerp" target="_blank" rel="noopener" aria-label="LinkedIn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
          </a>
          <a href="https://www.facebook.com/nextdoorinterieurontwerp/" target="_blank" rel="noopener" aria-label="Facebook">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          </a>
          <a href="https://www.instagram.com/nextdoorinterieurontwerp/" target="_blank" rel="noopener" aria-label="Instagram">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
          </a>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="container footer-bottom-inner">
        <p>&copy; {{ new Date().getFullYear() }} NEXTDOOR interieurontwerp en -advies &nbsp;|&nbsp; KvK 75743914</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--taupe);
  color: white;
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
  color: rgba(255,255,255,0.85);
  font-weight: 600;
  font-size: 1.4rem;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
}

.footer-nav a:hover {
  color: white;
  opacity: 1;
}

.footer-contact-col p {
  font-size: 1.4rem;
  color: rgba(255,255,255,0.85);
  margin-bottom: 0.8rem;
}

.footer-contact-col a {
  color: rgba(255,255,255,0.85);
}

.footer-contact-col a:hover {
  color: white;
  opacity: 1;
}

.footer-social {
  display: flex;
  gap: 1.5rem;
  margin-top: 2rem;
}

.footer-social a {
  color: rgba(255,255,255,0.85);
  display: flex;
  align-items: center;
}

.footer-social a:hover {
  color: white;
  opacity: 1;
}

.footer-bottom {
  border-top: 1px solid rgba(255,255,255,0.15);
  padding: 2rem 0;
}

.footer-bottom-inner p {
  font-size: 1.2rem;
  color: rgba(255,255,255,0.6);
  margin: 0;
  text-align: center;
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
