<template>
  <section class="intro-section bg-blue">
    <div class="container intro-inner">
      <div class="intro-image">
        <img src="/images/home/intro-living.jpg" :alt="$t('intro.imgAlt')" />
      </div>
      <div class="intro-text">
        <p class="cursive">{{ $t('intro.tagline') }}</p>
        <h2>{{ $t('intro.heading') }}</h2>
        <p>{{ $t('intro.p1') }}</p>
        <p>{{ $t('intro.p2') }}</p>
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
