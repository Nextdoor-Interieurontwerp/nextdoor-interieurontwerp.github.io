<template>
  <div class="og-wrapper">
    <div class="og-background" />
    <div class="og-content">
      <img src="/images/home/logo-full.svg" class="og-logo" alt="NEXTDOOR Interieur Ontwerp" />
      <div class="og-divider" />
      <p class="og-tagline">{{ title || 'Interieurontwerp & -advies' }}</p>
      <p class="og-sub">Oss · Noord-Brabant</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string
}>()
</script>

<style scoped>
.og-wrapper {
  width: 1200px;
  height: 630px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: #1a1a1a;
  font-family: 'Montserrat', sans-serif;
}

.og-background {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #111111 0%, #2a2a2a 100%);
}

.og-content {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  padding: 60px;
  text-align: center;
}

.og-logo {
  width: 480px;
  height: auto;
}

.og-divider {
  width: 80px;
  height: 2px;
  background-color: #C3D8ED;
}

.og-tagline {
  color: #ffffff;
  font-size: 28px;
  font-weight: 400;
  margin: 0;
  letter-spacing: 0.05em;
}

.og-sub {
  color: #C3D8ED;
  font-size: 18px;
  font-weight: 400;
  margin: 0;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
</style>
