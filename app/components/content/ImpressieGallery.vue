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
        <p class="cursive-tagline">Harmonie met kleurrijke details</p>
        <h2>NIEUWBOUWHUIS met moderne, strakke inrichting en kleurrijke accenten!</h2>
        <p>Pim en Lisanne kochten een nieuwbouwhuis in Houten en wilden hiervoor graag rustige invloeden combineren met kleurrijke accenten. Hun dochter van 6 houdt van geel en zoonlief van 8 wil liever blauw. Voor de ouderslaapkamer en gezamenlijke ruimtes is gekozen voor warme, natuurlijke kleuren, terwijl de kinderkamers van wat meer kleurrijke combinaties en accessoires voorzien zijn.</p>
        <p>Rekening houdend met je wensen en de personen die de ruimte gebruiken, zetten wij ideeën op een rij. Het interieurontwerp, de plattegrond, 3D-visualisatie, tekeningen, kleuradvies en algemene tips worden samengevoegd in een prachtige presentatiemap die je thuis ontvangt. Hieronder een voorbeeld van de inhoud van deze map. Aan dit voorbeeld kunnen geen rechten worden ontleend.</p>
      </div>
    </section>

    <!-- Impressie Kamers -->
    <section class="impressie-section bg-light">
      <div class="container">
        <h2 class="section-title">IMPRESSIE KAMERS</h2>
        <div class="gallery-single">
          <figure>
            <img src="/images/impressie/presentatie-2.jpg" alt="Impressie woonkamer" loading="lazy" />
            <figcaption>Impressie woonkamer</figcaption>
          </figure>
          <figure>
            <img src="/images/impressie/presentatie-3.jpg" alt="Impressie kinderkamers" loading="lazy" />
            <figcaption>Impressie kinderkamers</figcaption>
          </figure>
          <figure>
            <img src="/images/impressie/presentatie-4.jpg" alt="Impressie zolderetage" loading="lazy" />
            <figcaption>Impressie zolderetage</figcaption>
          </figure>
        </div>
      </div>
    </section>

    <!-- Bovenaanzichten -->
    <section class="impressie-section bg-blue">
      <div class="container">
        <h2 class="section-title">BOVENAANZICHTEN</h2>
        <div class="gallery-grid">
          <figure>
            <img src="/images/impressie/presentatie-6.jpg" alt="Bovenaanzicht benedenverdieping / begane grond" loading="lazy" />
            <figcaption>Bovenaanzicht benedenverdieping / begane grond</figcaption>
          </figure>
          <figure>
            <img src="/images/impressie/presentatie-7.jpg" alt="Bovenaanzicht eerste verdieping" loading="lazy" />
            <figcaption>Bovenaanzicht eerste verdieping</figcaption>
          </figure>
          <figure>
            <img src="/images/impressie/presentatie-8.jpg" alt="Bovenaanzicht zolderverdieping" loading="lazy" />
            <figcaption>Bovenaanzicht zolderverdieping</figcaption>
          </figure>
          <figure>
            <img src="/images/impressie/presentatie-9.jpg" alt="Verlichtingsplan / lichtplan" loading="lazy" />
            <figcaption>Verlichtingsplan / lichtplan</figcaption>
          </figure>
        </div>
      </div>
    </section>

    <!-- Impressie gallery -->
    <section class="impressie-section bg-light">
      <div class="container">
        <h2 class="section-title">IMPRESSIE</h2>
        <div class="gallery-grid">
          <figure>
            <img src="/images/impressie/presentatie-10.jpg" alt="Verlichtingsplan" loading="lazy" />
            <figcaption>Verlichtingsplan</figcaption>
          </figure>
          <figure>
            <img src="/images/impressie/presentatie-11.jpg" alt="Plattegrond tweede verdieping" loading="lazy" />
            <figcaption>Plattegrond tweede verdieping</figcaption>
          </figure>
          <figure>
            <img src="/images/impressie/presentatie-12.jpg" alt="Meubels op maat" loading="lazy" />
            <figcaption>Meubels op maat</figcaption>
          </figure>
          <figure>
            <img src="/images/impressie/presentatie-13.jpg" alt="Kleurkaart" loading="lazy" />
            <figcaption>Kleurkaart</figcaption>
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
