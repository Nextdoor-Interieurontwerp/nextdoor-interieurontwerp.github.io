<script setup lang="ts">
useSeoMeta({
  title: 'Offline',
  robots: 'noindex',
})
</script>
<template>
  <div class="offline">
    <h1>Je bent offline</h1>
    <p>Het lijkt erop dat je geen internetverbinding hebt. Controleer je verbinding en probeer het opnieuw.</p>
    <a href="/">Terug naar de homepage</a>
  </div>
</template>
<style scoped>
.offline {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
  padding: 2rem;
  gap: 1rem;
}
</style>
