<template>
  <section class="contact-section">
    <div class="container">
      <slot />
    </div>
  </section>
</template>

<style scoped>
.contact-section {
  padding: 10rem 0;
}

.contact-section :deep(h1) {
  color: var(--primary);
  margin-bottom: 2rem;
}

.contact-section :deep(p) {
  font-size: 2.4rem;
  margin-bottom: 6rem;
}
</style>
