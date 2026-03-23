<script setup lang="ts">
const props = defineProps<{
  image?: string
}>()
const heroImage = computed(() => props.image || '/images/home/hero-main.webp')
</script>

<template>
  <section class="hero-section">
    <img
      :src="heroImage"
      alt=""
      fetchpriority="high"
      decoding="async"
      class="hero-img"
    />
  </section>
</template>

<style scoped>
.hero-section {
  position: relative;
  margin-top: 0;
  overflow: hidden;
}

.hero-img {
  width: 100%;
  height: 80vh;
  min-height: 500px;
  object-fit: cover;
  object-position: center top;
  display: block;
}

@media (max-width: 768px) {
  .hero-img { height: 55vw; min-height: 280px; }
}
</style>
