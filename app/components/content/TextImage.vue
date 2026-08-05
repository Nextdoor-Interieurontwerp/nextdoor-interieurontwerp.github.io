<script setup lang="ts">
/**
 * The homepage's signature section shape — a project photograph beside a block
 * of prose — made available to content pages.
 *
 * IntroSection hard-codes one image and one set of strings. This takes both
 * from the page, and lets the image sit left or right so a sequence of these
 * alternates rather than marching down one side. Grid proportions, gap and
 * type sizes are IntroSection's, so a page built from these sits in the same
 * rhythm as the homepage.
 */
const props = defineProps<{
  image: string
  alt?: string
  /** Which side the photograph sits on. Alternate these down a page. */
  side?: 'left' | 'right'
  bg?: 'blue' | 'light' | 'white'
  /** Dancing Script grace note above the heading. Use sparingly. */
  tagline?: string
}>()

const background = computed(() => `bg-${props.bg ?? 'white'}`)
</script>

<template>
  <section class="text-image" :class="background">
    <div class="container ti-inner" :class="{ 'ti-flip': side === 'right' }">
      <div class="ti-image">
        <img :src="image" :alt="alt ?? ''" loading="lazy" />
      </div>
      <div class="ti-text">
        <p v-if="tagline" class="cursive ti-tagline">{{ tagline }}</p>
        <slot />
      </div>
    </div>
  </section>
</template>

<style scoped>
.text-image {
  padding: 8rem 0;
}

.ti-inner {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 8rem;
  align-items: center;
}

/* Photograph to the right, prose to the left. Source order stays
   image-then-text so the reading order is identical either way. */
.ti-flip .ti-image { order: 2; }
.ti-flip .ti-text { order: 1; }

.ti-image img {
  width: 100%;
  height: auto;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  object-position: center;
  display: block;
}

.ti-text .ti-tagline {
  font-size: 5rem;
  margin-bottom: 2rem;
  display: block;
  line-height: 1.1;
}

.ti-text :deep(h2) {
  font-size: 2rem;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--text-dark);
  margin-bottom: 2rem;
  line-height: 1.4;
}

.ti-text :deep(p) {
  font-size: 1.5rem;
  color: var(--text);
  line-height: 1.8;
  margin-bottom: 1.5rem;
}

/* The global link colour is a muted taupe that reads as body text on white.
   A section CTA has to look clickable. */
.ti-text :deep(p a) {
  color: var(--text-dark);
  font-weight: 700;
  border-bottom: 2px solid var(--orange);
  padding-bottom: 0.2rem;
  transition: color 0.2s, border-color 0.2s;
}

.ti-text :deep(p a:hover) {
  color: var(--orange);
}

.ti-text :deep(ul) {
  margin: 0 0 1.5rem 1.4rem;
  padding: 0;
}

.ti-text :deep(li) {
  font-size: 1.5rem;
  color: var(--text);
  line-height: 1.8;
  margin-bottom: 0.6rem;
}

@media (max-width: 900px) {
  .ti-inner {
    grid-template-columns: 1fr;
    gap: 4rem;
  }

  /* On one column the photograph always leads. */
  .ti-flip .ti-image,
  .ti-flip .ti-text {
    order: initial;
  }

  .ti-text .ti-tagline {
    font-size: 3.6rem;
  }
}

@media (max-width: 768px) {
  .text-image {
    padding: 5rem 0;
  }
}
</style>
