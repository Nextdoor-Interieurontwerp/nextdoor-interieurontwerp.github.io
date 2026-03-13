<template>
  <div class="impressie-page">

    <!-- Hero image -->
    <div class="impressie-hero">
      <img src="/images/impressie/PRESENTATIE_header.jpg" alt="Presentatie nieuwbouwwoning" />
    </div>

    <!-- Intro section -->
    <section class="impressie-intro container">
      <div class="intro-image">
        <img src="/images/impressie/PRESENTATIE_intro_afbeelding.jpg" alt="Presentatie voorbeeld" />
      </div>
      <div class="intro-text">
        <p class="cursive-tagline">{{ $t('impressie.tagline') }}</p>
        <h2>{{ $t('impressie.heading') }}</h2>
        <p>{{ $t('impressie.p1') }}</p>
        <p>{{ $t('impressie.p2') }}</p>
      </div>
    </section>

    <!-- Impressie Kamers -->
    <section class="impressie-section bg-light">
      <div class="container">
        <h2 class="section-title">{{ $t('impressie.kamersTitle') }}</h2>
        <div class="gallery-single">
          <figure>
            <img src="/images/impressie/presentatie-2.jpg" :alt="$t('impressie.cap1')" loading="lazy" />
            <figcaption>{{ $t('impressie.cap1') }}</figcaption>
          </figure>
          <figure>
            <img src="/images/impressie/presentatie-3.jpg" :alt="$t('impressie.cap2')" loading="lazy" />
            <figcaption>{{ $t('impressie.cap2') }}</figcaption>
          </figure>
          <figure>
            <img src="/images/impressie/presentatie-4.jpg" :alt="$t('impressie.cap3')" loading="lazy" />
            <figcaption>{{ $t('impressie.cap3') }}</figcaption>
          </figure>
        </div>
      </div>
    </section>

    <!-- Bovenaanzichten -->
    <section class="impressie-section bg-blue">
      <div class="container">
        <h2 class="section-title">{{ $t('impressie.bovenaanzichtenTitle') }}</h2>
        <div class="gallery-grid">
          <figure>
            <img src="/images/impressie/presentatie-6.jpg" :alt="$t('impressie.cap4')" loading="lazy" />
            <figcaption>{{ $t('impressie.cap4') }}</figcaption>
          </figure>
          <figure>
            <img src="/images/impressie/presentatie-7.jpg" :alt="$t('impressie.cap5')" loading="lazy" />
            <figcaption>{{ $t('impressie.cap5') }}</figcaption>
          </figure>
          <figure>
            <img src="/images/impressie/presentatie-8.jpg" :alt="$t('impressie.cap6')" loading="lazy" />
            <figcaption>{{ $t('impressie.cap6') }}</figcaption>
          </figure>
          <figure>
            <img src="/images/impressie/presentatie-9.jpg" :alt="$t('impressie.cap7')" loading="lazy" />
            <figcaption>{{ $t('impressie.cap7') }}</figcaption>
          </figure>
        </div>
      </div>
    </section>

    <!-- Impressie gallery -->
    <section class="impressie-section bg-light">
      <div class="container">
        <h2 class="section-title">{{ $t('impressie.impressieTitle') }}</h2>
        <div class="gallery-grid">
          <figure>
            <img src="/images/impressie/presentatie-10.jpg" :alt="$t('impressie.cap8')" loading="lazy" />
            <figcaption>{{ $t('impressie.cap8') }}</figcaption>
          </figure>
          <figure>
            <img src="/images/impressie/presentatie-11.jpg" :alt="$t('impressie.cap9')" loading="lazy" />
            <figcaption>{{ $t('impressie.cap9') }}</figcaption>
          </figure>
          <figure>
            <img src="/images/impressie/presentatie-12.jpg" :alt="$t('impressie.cap10')" loading="lazy" />
            <figcaption>{{ $t('impressie.cap10') }}</figcaption>
          </figure>
          <figure>
            <img src="/images/impressie/presentatie-13.jpg" :alt="$t('impressie.cap11')" loading="lazy" />
            <figcaption>{{ $t('impressie.cap11') }}</figcaption>
          </figure>
        </div>
      </div>
    </section>

  </div>
</template>

<style scoped>
.impressie-page {
  padding-bottom: 6rem;
}

.impressie-hero {
  width: 100%;
  max-height: 500px;
  overflow: hidden;
}

.impressie-hero img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Intro */
.impressie-intro {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 5rem;
  align-items: center;
  padding-top: 5rem;
  padding-bottom: 5rem;
}

.intro-image img {
  width: 100%;
  height: auto;
  display: block;
}

.cursive-tagline {
  font-family: var(--font-cursive, Georgia, serif); /* generic fallback included */
  font-size: 2.4rem;
  color: var(--taupe);
  margin-bottom: 1rem;
  font-style: italic;
}

.intro-text h2 {
  font-size: 2rem;
  color: var(--text-dark);
  margin-bottom: 2rem;
  text-transform: uppercase;
}

.intro-text p {
  font-size: 1.5rem;
  color: var(--text);
  line-height: 1.8;
  margin-bottom: 1.5rem;
}

/* Sections */
.impressie-section {
  padding: 6rem 0;
}

.bg-light {
  background: var(--bg-light, #f5f5f5);
}

.bg-blue {
  background: #d9e8f0;
}

.section-title {
  text-align: center;
  font-size: 3rem;
  font-weight: 700;
  color: var(--text-dark);
  letter-spacing: 0.05em;
  margin-bottom: 4rem;
  text-transform: uppercase;
}

/* Single-column gallery (full width images) */
.gallery-single {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  max-width: 900px;
  margin: 0 auto;
}

.gallery-single figure img {
  width: 100%;
  height: auto;
  display: block;
}

/* 2-column grid gallery */
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.gallery-grid figure img {
  width: 100%;
  height: auto;
  display: block;
}

figure {
  margin: 0;
}

figcaption {
  text-align: center;
  font-size: 1.3rem;
  color: var(--text);
  margin-top: 0.8rem;
  font-style: italic;
}

@media (max-width: 768px) {
  .impressie-intro {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .gallery-grid {
    grid-template-columns: 1fr;
  }
}
</style>
