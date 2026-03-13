<template>
  <section class="page-header bg-blue">
    <div class="container text-center">
      <slot />
    </div>
  </section>
</template>

<style scoped>
.page-header {
  padding: 8rem 0;
  text-align: center;
}

.page-header :deep(h1) {
  font-size: 5rem;
  margin-bottom: 2rem;
  color: var(--text-dark);
}

.page-header :deep(p) {
  max-width: 800px;
  margin: 0 auto;
  font-size: 1.6rem;
  color: var(--text);
  line-height: 1.8;
}
</style>
