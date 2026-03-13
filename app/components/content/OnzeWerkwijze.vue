<template>
  <section class="werkwijze bg-blue">
    <div class="container">
      <h2 class="section-title">ONZE WERKWIJZE</h2>
      <p class="section-sub-bold">Een goed interieuradvies begint bij een goed gesprek</p>
      <p class="section-desc">Door goed te luisteren en de juiste vragen te stellen doen we zoveel mogelijk informatie op, polsen we je wensen, inventariseren we het gebruik van de ruimte en krijgen we een indruk van de lichtinval en akoestiek. Het interieurontwerp wordt vervolgens uitgewerkt. De plattegrond, 3D-visualisatie, tekeningen, het kleuradvies en algemene tips worden samengevoegd in een prachtige presentatiemap die je thuis ontvangt.</p>

      <div class="presentatieboek">
        <img src="/images/home/presentatieboek.png" alt="NEXTDOOR interieurontwerp presentatieboek" />
      </div>

      <div class="steps-grid">
        <div class="step">
          <div class="step-icon">
            <img src="/images/home/icon-coffee.svg" alt="" aria-hidden="true" />
          </div>
          <h3>Kennismaking<br />en oriëntatie</h3>
          <p>Bij een nieuwe (kantoor)inrichting of verhuizing komen er veel vragen op je af. Een goed interieuradvies begint bij een goed gesprek. Samen maken we de eerste stap.</p>
        </div>
        <div class="step">
          <div class="step-icon">
            <img src="/images/home/icon-ruler.svg" alt="" aria-hidden="true" />
          </div>
          <h3>Interieurontwerp<br />en -advies</h3>
          <p>Uitwerken van ideeën en indeling. Sfeervoorstellen, 2D/3D ontwerp tekeningen, verlichtingsplan, akoestiek, kleuradvies en begroting.</p>
        </div>
        <div class="step">
          <div class="step-icon">
            <img src="/images/home/icon-construction.svg" alt="" aria-hidden="true" />
          </div>
          <h3>Uitvoering<br />en realisatie</h3>
          <p>Na afronding van de plannen kunnen we direct aan de slag. Het organiseren van dit traject is ons dagelijks werk. Onze specialisten weten wat, wanneer en hoe alles moet gebeuren.</p>
        </div>
      </div>

      <div class="werkwijze-cta">
        <NuxtLink to="/contact" class="btn-orange">NAAR PRESENTATIE</NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.werkwijze {
  padding: 8rem 0;
}

.section-title {
  text-align: center;
  font-size: 3.6rem;
  margin-bottom: 2rem;
  color: var(--text-dark);
}

.section-sub-bold {
  text-align: center;
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--text-dark);
  margin-bottom: 2rem;
}

.section-desc {
  text-align: center;
  font-size: 1.5rem;
  color: var(--text);
  max-width: 900px;
  margin: 0 auto 5rem;
  line-height: 1.8;
}

.presentatieboek {
  text-align: center;
  margin-bottom: 6rem;
}

.presentatieboek img {
  max-width: 700px;
  width: 100%;
  height: auto;
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6rem;
  margin-bottom: 5rem;
}

.step {
  text-align: center;
}

.step-icon {
  margin-bottom: 2rem;
}

.step-icon img {
  width: 48px;
  height: 48px;
  filter: invert(40%) sepia(0%) saturate(0%) brightness(60%);
}

.step h3 {
  font-size: 1.8rem;
  font-weight: 700;
  text-transform: none;
  color: var(--text-dark);
  margin-bottom: 1.5rem;
  line-height: 1.4;
}

.step p {
  font-size: 1.4rem;
  color: var(--text);
  line-height: 1.8;
}

.werkwijze-cta {
  text-align: center;
}

@media (max-width: 768px) {
  .steps-grid {
    grid-template-columns: 1fr;
    gap: 4rem;
  }
}
</style>
