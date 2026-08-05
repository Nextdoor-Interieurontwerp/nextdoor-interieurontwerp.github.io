<script setup lang="ts">
/**
 * The icon grid from "Alles op één adres" and "Onze werkwijze", available to
 * content pages. Items come from the page as YAML so a service page can list
 * what it actually delivers:
 *
 *   ::icon-points
 *   ---
 *   title: Wat wij regelen
 *   items:
 *     - icon: /images/home/icon-construction.svg
 *       text: Vakmensen op uw bouwproject
 *   ---
 *   ::
 *
 * Icons are decorative and marked aria-hidden — the text carries the meaning.
 */
const props = defineProps<{
  title?: string
  items: { icon?: string; text: string }[]
  bg?: 'blue' | 'light' | 'white'
}>()

const background = computed(() => `bg-${props.bg ?? 'light'}`)
</script>

<template>
  <section class="icon-points" :class="background">
    <div class="container">
      <h2 v-if="title" class="section-title">{{ title }}</h2>
      <ul class="points-grid">
        <li v-for="item in items" :key="item.text" class="point">
          <div v-if="item.icon" class="point-icon">
            <img :src="item.icon" alt="" aria-hidden="true" width="52" height="52" />
          </div>
          <p>{{ item.text }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.icon-points {
  padding: 8rem 0;
}

.section-title {
  text-align: center;
  font-size: 3.6rem;
  margin-bottom: 5rem;
  color: var(--text-dark);
}

.points-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5rem 6rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.point {
  text-align: center;
}

.point-icon {
  margin-bottom: 1.5rem;
}

.point-icon img {
  width: 52px;
  height: 52px;
  filter: invert(40%) sepia(0%) saturate(0%) brightness(50%);
}

.point p {
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--text-dark);
  line-height: 1.4;
  margin: 0;
}

@media (max-width: 900px) {
  .points-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 4rem;
  }
}

@media (max-width: 600px) {
  .icon-points {
    padding: 5rem 0;
  }

  .points-grid {
    grid-template-columns: 1fr;
  }

  .section-title {
    font-size: 2.8rem;
    margin-bottom: 3rem;
  }
}
</style>
