<template>
  <section class="content-section">
    <div class="container content-inner">
      <slot />
    </div>
  </section>
</template>

<style scoped>
.content-section {
  padding: 6rem 0;
}

/* Prose needs a measure. Without a container the text ran the full page width,
   which is why this component was unused. */
.content-inner {
  max-width: 52rem;
}

.content-section :deep(h2) {
  font-size: 2.6rem;
  margin-bottom: 1.5rem;
  color: var(--text-dark);
}

.content-section :deep(h2:not(:first-child)) {
  margin-top: 4rem;
}

.content-section :deep(p) {
  margin-bottom: 1.4rem;
  line-height: 1.7;
}

.content-section :deep(ul) {
  margin: 0 0 1.4rem 1.2rem;
  padding: 0;
}

.content-section :deep(li) {
  margin-bottom: 0.6rem;
  line-height: 1.7;
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

@media (max-width: 768px) {
  .content-section {
    padding: 4rem 0;
  }

  .content-section :deep(h3) {
    font-size: 2.8rem;
  }
}
</style>
