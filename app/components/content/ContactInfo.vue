<template>
  <div class="contact-grid">
    <slot />
  </div>
</template>

<style scoped>
.contact-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4rem;
}

@media (max-width: 768px) {
  .contact-grid {
    grid-template-columns: 1fr;
    text-align: center;
  }
}
</style>
