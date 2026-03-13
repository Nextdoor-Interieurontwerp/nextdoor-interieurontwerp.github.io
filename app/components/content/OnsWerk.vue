<script setup lang="ts">
import { projects } from '~/data/projects'

const localePath = useLocalePath()

// Show a selection of projects on the homepage (mix of both categories)
const featured = projects.slice(0, 6)
</script>

<template>
  <section class="ons-werk bg-white">
    <div class="container">
      <h2 class="section-title">{{ $t('onsWerk.title') }}</h2>
      <p class="section-sub">{{ $t('onsWerk.sub') }} <NuxtLink :to="localePath('/zakelijk')">{{ $t('onsWerk.business') }}</NuxtLink> {{ $t('onsWerk.and') }} <NuxtLink :to="localePath('/particulier')">{{ $t('onsWerk.residential') }}</NuxtLink></p>
      <div class="werk-grid">
        <div v-for="project in featured" :key="project.id" class="werk-item">
          <img :src="project.image" :alt="project.title" loading="lazy" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.ons-werk {
  padding: 8rem 0;
}

.section-title {
  text-align: center;
  font-size: 3.6rem;
  margin-bottom: 1.5rem;
  color: var(--text-dark);
}

.section-sub {
  text-align: center;
  font-size: 1.5rem;
  color: var(--text);
  margin-bottom: 5rem;
}

.section-sub a {
  color: var(--text-dark);
  font-weight: 700;
  text-decoration: underline;
}

.werk-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
}

.werk-item {
  aspect-ratio: 4/3;
  overflow: hidden;
}

.werk-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.5s ease;
}

.werk-item:hover img {
  transform: scale(1.04);
}

@media (max-width: 768px) {
  .werk-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .werk-grid {
    grid-template-columns: 1fr;
  }
}
</style>
