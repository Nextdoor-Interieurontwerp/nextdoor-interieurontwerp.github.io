<script setup lang="ts">
/**
 * Standalone project page.
 *
 * Projects are normally viewed in the lightbox on /particulier and /zakelijk —
 * that stays the intended experience. This page exists so each project has a
 * real, crawlable URL with the same content, and so a visitor arriving from a
 * search result lands on the project they asked for. The grid links here with
 * a genuine <a href>; the click is intercepted client-side to open the lightbox
 * instead, so ordinary visitors never navigate away.
 *
 * Both surfaces render the same content — deliberately, since serving crawlers
 * something users cannot reach would be cloaking.
 */
import { SITE_URL } from '~~/shared/business'

const route = useRoute()
const { locale, t } = useI18n()
const localePath = useLocalePath()

// Projects live at one locale-neutral content path and translate in place, so
// query by slug rather than by route path (which carries the /en prefix).
const slug = computed(() => String(route.params.slug))

const { data: project } = await useAsyncData(
  () => `project-${slug.value}`,
  () => queryCollection('content').path(`/projects/${slug.value}`).first(),
  { watch: [slug] },
)

if (!project.value) {
  throw createError({ statusCode: 404, statusMessage: 'Project not found', fatal: true })
}

const tr = computed(() => project.value?.translations?.[locale.value] ?? project.value?.translations?.nl)
const title = computed(() => tr.value?.title ?? slug.value)
const description = computed(() => tr.value?.description ?? '')
const alt = computed(() => tr.value?.alt ?? title.value)
const category = computed(() => tr.value?.category)

const backLink = computed(() => {
  const nlCategory = project.value?.translations?.nl?.category
  return localePath(nlCategory === 'zakelijk' ? '/zakelijk' : '/particulier')
})

const { data: siblings } = await useAsyncData(
  () => `project-siblings-${slug.value}-${locale.value}`,
  () => queryCollection('content').where('path', 'LIKE', '/projects/%').order('stem', 'ASC').all(),
  { watch: [slug, locale] },
)

/** A few other projects in the same category, for onward navigation. */
const related = computed(() => {
  const nlCategory = project.value?.translations?.nl?.category
  return (siblings.value ?? [])
    .filter(p => p.path !== project.value?.path)
    .filter(p => p.translations?.nl?.category === nlCategory)
    .slice(0, 3)
})

const imageUrl = computed(() => project.value?.image ?? '')
/** Schema.org wants absolute URLs; the module only rewrites `url` for us. */
const absoluteImageUrl = computed(() => (imageUrl.value ? `${SITE_URL}${imageUrl.value}` : ''))

useSeoMeta({
  title: () => `${title.value} | NEXTDOOR Interieurontwerp`,
  description: () => description.value,
  ogTitle: () => title.value,
  ogDescription: () => description.value,
  robots: 'index, follow',
})

if (imageUrl.value) {
  defineOgImage({ url: imageUrl.value, alt: alt.value })
}

useSchemaOrg([
  defineWebPage({
    '@type': 'ItemPage',
    name: () => title.value,
    description: () => description.value,
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: () => absoluteImageUrl.value,
      contentUrl: () => absoluteImageUrl.value,
      caption: () => alt.value,
    },
  }),
])
</script>

<template>
  <article v-if="project" class="project-page">
    <div class="container">
      <NuxtLink :to="backLink" class="back-link">&larr; {{ t('projectPage.back') }}</NuxtLink>

      <p v-if="category" class="project-category">{{ category }}</p>
      <h1>{{ title }}</h1>

      <img
        v-if="imageUrl"
        :src="imageUrl"
        :alt="alt"
        class="project-image"
        width="1600"
        height="1067"
        loading="eager"
        fetchpriority="high"
      />

      <div class="project-body">
        <ContentRenderer :value="project" class="project-desc" />

        <dl v-if="tr?.location || tr?.services" class="project-meta">
          <template v-if="tr?.location">
            <dt>{{ t('projectGrid.location') }}</dt>
            <dd>{{ tr.location }}</dd>
          </template>
          <template v-if="tr?.services">
            <dt>{{ t('projectGrid.services') }}</dt>
            <dd>{{ tr.services }}</dd>
          </template>
        </dl>

        <div v-if="tr?.tags?.length" class="tags">
          <span v-for="tag in tr.tags" :key="tag" class="tag">#{{ tag }}</span>
        </div>
      </div>

      <section v-if="related.length" class="related">
        <h2>{{ t('projectPage.related') }}</h2>
        <ul class="related-list">
          <li v-for="item in related" :key="item.path">
            <NuxtLink :to="localePath(`/projects/${item.slug}`)">
              <img
                :src="item.image"
                :alt="item.translations?.[locale]?.alt ?? item.translations?.[locale]?.title ?? ''"
                loading="lazy"
                width="600"
                height="450"
              />
              <span>{{ item.translations?.[locale]?.title ?? item.slug }}</span>
            </NuxtLink>
          </li>
        </ul>
      </section>
    </div>
  </article>
</template>

<style scoped>
.project-page {
  padding: 3rem 0 5rem;
}

.back-link {
  display: inline-block;
  margin-bottom: 2rem;
  color: var(--taupe-text);
  font-size: 0.95rem;
}

.project-category {
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 0.9rem;
  letter-spacing: 0.2rem;
  text-transform: uppercase;
  color: var(--taupe-text);
  margin-bottom: 0.5rem;
}

.project-image {
  width: 100%;
  height: auto;
  display: block;
  margin: 2rem 0 3rem;
}

.project-body {
  max-width: 46rem;
}

.project-meta {
  display: grid;
  grid-template-columns: max-content 1fr;
  gap: 0.4rem 1.5rem;
  margin: 2rem 0;
}

.project-meta dt {
  font-weight: 700;
}

.project-meta dd {
  margin: 0;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  font-size: 0.85rem;
  color: var(--taupe-text);
}

.related {
  margin-top: 5rem;
}

.related h2 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
}

.related-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

.related-list img {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  display: block;
  margin-bottom: 0.6rem;
}

@media (max-width: 768px) {
  .related-list {
    grid-template-columns: 1fr;
  }

  .project-meta {
    grid-template-columns: 1fr;
    gap: 0.2rem;
  }

  .project-meta dd {
    margin-bottom: 0.8rem;
  }
}
</style>
