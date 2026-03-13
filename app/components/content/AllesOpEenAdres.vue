<template>
  <section class="alles bg-light">
    <div class="container">
      <h2 class="section-title">ALLES OP ÉÉN ADRES:</h2>

      <div class="logo-center">
        <img src="/images/home/logo-full.svg" alt="NEXTDOOR Interieurontwerp en -advies" />
      </div>

      <p class="alles-desc">Na het interieuradvies kunnen we direct aan de slag met de realisatie en uitvoering van het herinrichten van woning of bedrijfspand. Een groot voordeel, want je hoeft zelf niet op zoek naar aannemers, uitvoerders of andere vakspecialisten. Binnen de kaders van tijd, kwaliteit en budget zijn wij jouw <strong><em>single point of contact</em></strong>, waardoor je volledig ontzorgd wordt.</p>

      <div class="services-grid">
        <div class="service">
          <div class="service-icon">
            <img src="/images/home/icon-light.svg" alt="" aria-hidden="true" />
          </div>
          <h3>Ontwerp<br />verlichtingsplan</h3>
        </div>
        <div class="service">
          <div class="service-icon">
            <img src="/images/home/icon-build.svg" alt="" aria-hidden="true" />
          </div>
          <h3>Bouw,<br />Bouwbegeleiding</h3>
        </div>
        <div class="service">
          <div class="service-icon">
            <img src="/images/home/icon-color.svg" alt="" aria-hidden="true" />
          </div>
          <h3>Kleuradvies en<br />sfeervoorstellen</h3>
        </div>
        <div class="service">
          <div class="service-icon">
            <img src="/images/home/icon-coffee.svg" alt="" aria-hidden="true" />
          </div>
          <h3>Meubels en<br />accessoires</h3>
        </div>
        <div class="service">
          <div class="service-icon">
            <img src="/images/home/icon-ruler.svg" alt="" aria-hidden="true" />
          </div>
          <h3>Maatwerk<br />meubilair</h3>
        </div>
        <div class="service">
          <div class="service-icon">
            <img src="/images/home/icon-construction.svg" alt="" aria-hidden="true" />
          </div>
          <h3>Vloeren,<br />wanden en plafonds</h3>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.alles {
  padding: 8rem 0;
}

.section-title {
  text-align: center;
  font-size: 3.6rem;
  margin-bottom: 5rem;
  color: var(--text-dark);
}

.logo-center {
  text-align: center;
  margin-bottom: 4rem;
}

.logo-center img {
  max-width: 400px;
  width: 60%;
  height: auto;
  opacity: 0.35;
}

.alles-desc {
  text-align: center;
  font-size: 1.5rem;
  color: var(--text);
  max-width: 900px;
  margin: 0 auto 6rem;
  line-height: 1.8;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5rem 6rem;
}

.service {
  text-align: center;
}

.service-icon {
  margin-bottom: 1.5rem;
}

.service-icon img {
  width: 52px;
  height: 52px;
  filter: invert(40%) sepia(0%) saturate(0%) brightness(50%);
}

.service h3 {
  font-size: 1.6rem;
  font-weight: 700;
  text-transform: none;
  color: var(--text-dark);
  line-height: 1.4;
  margin: 0;
}

@media (max-width: 768px) {
  .services-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 4rem;
  }
}

@media (max-width: 480px) {
  .services-grid {
    grid-template-columns: 1fr;
  }
}
</style>
