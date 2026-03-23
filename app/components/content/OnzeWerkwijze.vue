<template>
  <section class="werkwijze bg-blue">
    <div class="container">
      <h2 class="section-title">{{ $t('werkwijze.title') }}</h2>
      <p class="section-sub-bold">{{ $t('werkwijze.subBold') }}</p>
      <p class="section-desc">{{ $t('werkwijze.desc') }}</p>

      <div class="presentatieboek">
        <img src="/images/home/presentatieboek.webp" alt="NEXTDOOR interieurontwerp presentatieboek" width="1200" height="350" />
      </div>

      <div class="steps-grid">
        <div class="step">
          <div class="step-icon">
            <img src="/images/home/icon-coffee.svg" alt="" aria-hidden="true" />
          </div>
          <h3 v-html="$t('werkwijze.step1Title').replace('\n', '<br />')"></h3>
          <p>{{ $t('werkwijze.step1Desc') }}</p>
        </div>
        <div class="step">
          <div class="step-icon">
            <img src="/images/home/icon-ruler.svg" alt="" aria-hidden="true" />
          </div>
          <h3 v-html="$t('werkwijze.step2Title').replace('\n', '<br />')"></h3>
          <p>{{ $t('werkwijze.step2Desc') }}</p>
        </div>
        <div class="step">
          <div class="step-icon">
            <img src="/images/home/icon-construction.svg" alt="" aria-hidden="true" />
          </div>
          <h3 v-html="$t('werkwijze.step3Title').replace('\n', '<br />')"></h3>
          <p>{{ $t('werkwijze.step3Desc') }}</p>
        </div>
      </div>

      <div class="werkwijze-cta">
        <NuxtLink :to="localePath('/impressie')" class="btn-orange">{{ $t('werkwijze.cta') }}</NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const localePath = useLocalePath()
</script>

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
