<template>
  <section class="intro-section bg-blue">
    <div class="container intro-inner">
      <div class="intro-image">
        <img src="/images/home/intro-living.jpg" alt="Sfeervolle woonkamer - NEXTDOOR interieurontwerp" />
      </div>
      <div class="intro-text">
        <p class="cursive">Eenheid ruimte en warmte</p>
        <h2>Gecreëerd door ervaren en bedreven interieurontwerpers en – architecten</h2>
        <p>NEXTDOOR is een allround bureau voor interieurontwerp, interieuradvies en vormgeving, bouwbegeleiding en advies aan de zakelijke en particuliere markt. In samenwerking met ervaren interieurontwerpers, architecten en een interieurarchitect creëren wij nieuwe woninginrichting, kantoorinrichting en interieurdesign.</p>
        <p>Interieur en ontwerp van huis, kantoor, restaurant of winkelpand: wij zorgen voor eenheid, ruimte en warmte. We vertalen jouw wensen naar een passend interieurontwerp waarbij ook is gedacht aan kleuradvies en een verlichtingsplan. Zo realiseren we een werkplek of woonomgeving waar je je altijd prettig voelt.</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.intro-section {
  padding: 8rem 0;
}

.intro-inner {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 8rem;
  align-items: center;
}

.intro-image img {
  width: 100%;
  height: auto;
  display: block;
}

.intro-text .cursive {
  font-size: 5rem;
  margin-bottom: 2rem;
  display: block;
}

.intro-text h2 {
  font-size: 2rem;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--text-dark);
  margin-bottom: 2rem;
  line-height: 1.4;
}

.intro-text p {
  font-size: 1.5rem;
  color: var(--text);
  line-height: 1.8;
  margin-bottom: 1.5rem;
}

@media (max-width: 900px) {
  .intro-inner {
    grid-template-columns: 1fr;
    gap: 4rem;
  }
  .intro-text .cursive { font-size: 3.5rem; }
}
</style>
