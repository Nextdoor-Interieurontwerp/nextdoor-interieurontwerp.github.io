<template>
  <section class="content-section">
    <slot />
  </section>
</template>

<style scoped>
.content-section {
  padding: 10rem 0;
}

.content-section :deep(h3) {
  font-size: 4.5rem;
  color: var(--primary);
  margin-bottom: 3rem;
  text-transform: uppercase;
}

.content-section :deep(.btn-primary) {
  display: inline-block;
  background: var(--primary);
  color: white;
  padding: 1.5rem 4rem;
  font-family: 'Bebas Neue', sans-serif;
  font-size: 2.4rem;
  margin-top: 4rem;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
}
</style>
