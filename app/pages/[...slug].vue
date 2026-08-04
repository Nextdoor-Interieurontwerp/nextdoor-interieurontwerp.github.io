<script setup lang="ts">
const route = useRoute()
const { locale } = useI18n()

const { data: page } = await useAsyncData('page-' + route.path, () => {
  return queryCollection('content').path(route.path).first()
})

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

// Project pages carry their title/description per locale under `translations`,
// so fall back to those before giving up on a title entirely.
const translated = computed(() => {
  const translations = page.value?.translations
  return translations?.[locale.value] ?? translations?.nl
})

const title = computed(() => page.value?.title ?? translated.value?.title)
const description = computed(() => page.value?.description ?? translated.value?.description)

useSeoMeta({
  title: () => title.value,
  description: () => description.value,
  ogTitle: () => title.value,
  ogDescription: () => description.value,
  robots: page.value?.robots ?? 'index, follow',
})

if (page.value?.ogImage) {
  defineOgImage(page.value.ogImage)
} else {
  defineOgImageComponent('Default', { title: title.value })
}
</script>

<template>
  <ContentRenderer
    v-if="page"
    :value="page"
  />
</template>
