<script setup lang="ts">
defineProps<{
  text?: string
}>()
</script>

<template>
  <div class="cursive-tagline">
    <p class="cursive">{{ text || 'Eenheid ruimte en warmte' }}</p>
  </div>
</template>

<style scoped>
.cursive-tagline {
  text-align: center;
  padding: 4rem 0;
  background: white;
}

.cursive {
  font-size: 6rem;
  margin: 0;
}

@media (max-width: 768px) {
  .cursive { font-size: 3.5rem; }
}
</style>
