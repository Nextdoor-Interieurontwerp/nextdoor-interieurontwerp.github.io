<template>
  <div class="info-item">
    <slot />
  </div>
</template>

<style scoped>
.info-item :deep(h3) {
  font-size: 2.4rem;
  margin-bottom: 1rem;
  color: var(--text);
}

.info-item :deep(p) {
  font-size: 2rem;
  margin-bottom: 0;
}
</style>
