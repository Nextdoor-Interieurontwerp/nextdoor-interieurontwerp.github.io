<script setup lang="ts">
const props = defineProps<{
  category?: string
}>()

const { locale } = useI18n()

const { data: allProjects } = await useAsyncData(
  `projects-${locale.value}`,
  () => queryCollection('content').where('path', 'LIKE', '/projects/%').order('stem', 'ASC').all(),
  { watch: [locale] }
)

const filteredProjects = computed(() => {
  if (!allProjects.value) return []
  if (!props.category) return allProjects.value
  return allProjects.value.filter(p => {
    const t = p.translations?.[locale.value]
    return t?.category === props.category
  })
})

const selectedProject = ref(null)
const openLightbox = (project) => {
  selectedProject.value = project
  document.body.style.overflow = 'hidden'
}
const closeLightbox = () => {
  selectedProject.value = null
  document.body.style.overflow = ''
}

onUnmounted(() => {
  document.body.style.overflow = ''
})
</script>

<template>
  <div class="project-grid-wrapper">
    <div class="project-grid">
      <div
        v-for="project in filteredProjects"
        :key="project.id"
        class="project-item"
        @click="openLightbox(project)"
        role="button"
        :aria-label="$t('projectGrid.ariaLabel', { title: project.translations?.[locale]?.title ?? project.slug })"
        tabindex="0"
        @keydown.enter="openLightbox(project)"
      >
        <div class="image-wrapper">
          <img :src="project.image" :alt="project.translations?.[locale]?.title ?? project.slug" loading="lazy" />
          <div class="hover-overlay">
            <h3>{{ project.translations?.[locale]?.title ?? project.slug }}</h3>
            <span class="btn-view">{{ $t('projectGrid.viewProject') }}</span>
          </div>
        </div>
      </div>
    </div>

    <Transition name="fade">
      <div v-if="selectedProject" class="lightbox-overlay" @click.self="closeLightbox">
        <div class="lightbox-content">
          <button class="close-btn" @click="closeLightbox" :aria-label="$t('projectGrid.closeLabel')">&times;</button>
          <div class="lightbox-grid">
            <div class="lightbox-image">
              <img :src="selectedProject.image" :alt="selectedProject.translations?.[locale]?.title ?? selectedProject.slug" />
            </div>
            <div class="lightbox-info">
              <p class="project-category">{{ selectedProject.translations?.[locale]?.category }}</p>
              <h2>{{ selectedProject.translations?.[locale]?.title ?? selectedProject.slug }}</h2>
              <ContentRenderer :value="selectedProject" class="project-desc" />
              <div v-if="selectedProject.translations?.[locale]?.location || selectedProject.translations?.[locale]?.services" class="project-meta">
                <p v-if="selectedProject.translations?.[locale]?.location"><strong>{{ $t('projectGrid.location') }}</strong> {{ selectedProject.translations[locale].location }}</p>
                <p v-if="selectedProject.translations?.[locale]?.services"><strong>{{ $t('projectGrid.services') }}</strong> {{ selectedProject.translations[locale].services }}</p>
              </div>
              <div class="tags">
                <span v-for="tag in selectedProject.translations?.[locale]?.tags ?? []" :key="tag" class="tag">#{{ tag }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.project-grid-wrapper {
  width: 100%;
}

.project-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;
}

.project-item {
  cursor: pointer;
  outline: none;
}

.image-wrapper {
  position: relative;
  aspect-ratio: 4/3;
  overflow: hidden;
}

.image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  display: block;
}

.hover-overlay {
  position: absolute;
  inset: 0;
  background: rgba(166, 155, 141, 0.88);
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  padding: 2rem;
  text-align: center;
}

.project-item:hover img,
.project-item:focus img {
  transform: scale(1.05);
}

.project-item:hover .hover-overlay,
.project-item:focus .hover-overlay {
  opacity: 1;
}

.hover-overlay h3 {
  color: white;
  font-size: 2.4rem;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  font-weight: 700;
}

.btn-view {
  border: 2px solid white;
  padding: 0.8rem 2.5rem;
  text-transform: uppercase;
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: 0.1rem;
  color: white;
}

/* Lightbox */
.lightbox-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.85);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.lightbox-content {
  background: white;
  width: 100%;
  max-width: 1100px;
  max-height: 90vh;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.close-btn {
  position: absolute;
  top: 1.5rem;
  right: 2rem;
  background: none;
  border: none;
  color: var(--text);
  font-size: 4rem;
  cursor: pointer;
  z-index: 10;
  line-height: 1;
  padding: 0;
}

.close-btn:hover {
  color: var(--taupe);
}

.lightbox-grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  max-height: 90vh;
}

.lightbox-image {
  overflow: hidden;
}

.lightbox-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.lightbox-info {
  padding: 5rem 4rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.project-category {
  text-transform: uppercase;
  font-weight: 700;
  font-size: 1.2rem;
  letter-spacing: 0.2rem;
  color: var(--taupe);
  margin-bottom: 1rem;
}

.lightbox-info h2 {
  font-size: 2.8rem;
  color: var(--text-dark);
  margin-bottom: 2rem;
}

.project-desc {
  font-size: 1.5rem;
  color: var(--text);
  line-height: 1.8;
}

.project-meta {
  margin-top: 2rem;
  font-size: 1.4rem;
  color: var(--text);
  line-height: 1.8;
}

.project-meta p {
  margin-bottom: 0.4rem;
}

.tags {
  margin-top: auto;
  padding-top: 3rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.tag {
  background: var(--bg-light);
  padding: 0.4rem 1.2rem;
  font-size: 1.3rem;
  color: var(--text);
  border-radius: 2rem;
}

@media (max-width: 900px) {
  .project-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .lightbox-grid {
    grid-template-columns: 1fr;
    overflow-y: auto;
  }
  .lightbox-image {
    aspect-ratio: 16/9;
    max-height: 40vh;
  }
  .lightbox-info {
    padding: 3rem;
  }
}

@media (max-width: 480px) {
  .project-grid {
    grid-template-columns: 1fr;
  }
  .lightbox-overlay {
    padding: 0;
  }
  .lightbox-content {
    max-height: 100vh;
    border-radius: 0;
  }
}

/* Vue <Transition name="fade"> classes — used at runtime, not statically referenced */
.fade-enter-active, .fade-leave-active { transition: opacity 0.25s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
