<script setup lang="ts">
defineProps<{
  image?: string
}>()
</script>

<template>
  <section class="hero-section">
    <div class="hero-bg" :style="{ backgroundImage: `url(${image || '/images/home/hero-main.jpg'})` }">
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  position: relative;
  margin-top: 0;
}

.hero-bg {
  height: 80vh;
  min-height: 500px;
  background-size: cover;
  background-position: center top;
  background-repeat: no-repeat;
}

@media (max-width: 768px) {
  .hero-bg { height: 55vw; min-height: 280px; }
}
</style>
