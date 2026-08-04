<script setup lang="ts">
const props = defineProps<{
  category?: string
  /** Filter to projects whose `location` mentions this place, e.g. "Oss". */
  location?: string
}>()

const { locale } = useI18n()

const { data: allProjects } = await useAsyncData(
  `projects-${locale.value}`,
  () => queryCollection('content').where('path', 'LIKE', '/projects/%').order('stem', 'ASC').all(),
  { watch: [locale] }
)

const filteredProjects = computed(() => {
  let projects = allProjects.value ?? []
  if (props.category) {
    projects = projects.filter(p => p.translations?.[locale.value]?.category === props.category)
  }
  if (props.location) {
    // Locations read like "Acerta Pharma, Oss" or "Aduro Biotech, PivotPark
    // Oss", so match on mention rather than equality.
    const needle = props.location.toLowerCase()
    projects = projects.filter(p =>
      (p.translations?.nl?.location ?? '').toLowerCase().includes(needle))
  }
  return projects
})

const localePath = useLocalePath()
const route = useRoute()

const selectedProject = ref(null)

/**
 * Each tile is a real <a href> to the project's own page, so crawlers can find
 * and follow it. For ordinary clicks we cancel the navigation and open the
 * lightbox instead — the grid stays the way people browse the work. The URL is
 * still swapped in via history so the project can be linked and shared, and so
 * the back button closes the lightbox.
 *
 * Modified clicks (ctrl/cmd/shift/middle) fall through untouched, so "open in
 * new tab" lands on the real page. Without JS the link simply navigates.
 */
const onTileClick = (event, project) => {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return
  event.preventDefault()
  openLightbox(project)
}

const showProject = (project) => {
  selectedProject.value = project
  document.body.style.overflow = 'hidden'
}

const dismiss = () => {
  selectedProject.value = null
  document.body.style.overflow = ''
}

const openLightbox = (project) => {
  showProject(project)
  if (import.meta.client && window.history.state?.lightbox !== project.slug) {
    // Spread the existing state so Vue Router's own bookkeeping survives.
    window.history.pushState(
      { ...window.history.state, lightbox: project.slug },
      '',
      localePath(`/projects/${project.slug}`),
    )
  }
}

const closeLightbox = () => {
  if (import.meta.client && window.history.state?.lightbox) {
    window.history.back()
    return
  }
  dismiss()
}

const onPopState = () => {
  if (!window.history.state?.lightbox) dismiss()
}

onMounted(() => window.addEventListener('popstate', onPopState))

onUnmounted(() => {
  if (import.meta.client) window.removeEventListener('popstate', onPopState)
  document.body.style.overflow = ''
})

// Navigating away by any other means should not leave the lightbox open.
watch(() => route.path, dismiss)
</script>

<template>
  <div class="project-grid-wrapper">
    <div class="project-grid">
      <a
        v-for="project in filteredProjects"
        :key="project.id"
        class="project-item"
        :href="localePath(`/projects/${project.slug}`)"
        :aria-label="$t('projectGrid.ariaLabel', { title: project.translations?.[locale]?.title ?? project.slug })"
        @click="onTileClick($event, project)"
      >
        <div class="image-wrapper">
          <img
            :src="project.image"
            :alt="project.translations?.[locale]?.alt ?? project.translations?.[locale]?.title ?? project.slug"
            loading="lazy"
          />
          <div class="hover-overlay">
            <h3>{{ project.translations?.[locale]?.title ?? project.slug }}</h3>
            <span class="btn-view">{{ $t('projectGrid.viewProject') }}</span>
          </div>
        </div>
      </a>
    </div>

    <Transition name="fade">
      <div v-if="selectedProject" class="lightbox-overlay" @click.self="closeLightbox">
        <div class="lightbox-content">
          <button class="close-btn" @click="closeLightbox" :aria-label="$t('projectGrid.closeLabel')">&times;</button>
          <div class="lightbox-grid">
            <div class="lightbox-image">
              <img :src="selectedProject.image" :alt="selectedProject.translations?.[locale]?.alt ?? selectedProject.translations?.[locale]?.title ?? selectedProject.slug" />
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
  display: block;
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
  color: var(--taupe-text);
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
  color: var(--taupe-text);
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
