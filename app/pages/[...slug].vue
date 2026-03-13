<script setup lang="ts">
const route = useRoute()

const { data: page } = await useAsyncData('page-' + route.path, () => {
  return queryCollection('content').path(route.path).first()
})

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

useSeoMeta({
  title: page.value?.title,
  description: page.value?.description,
  ogTitle: page.value?.title,
  ogDescription: page.value?.description,
  robots: page.value?.robots ?? 'index, follow',
})

if (page.value?.ogImage) {
  defineOgImage(page.value.ogImage)
} else {
  defineOgImageComponent('Default', { title: page.value?.title })
}
</script>

<template>
  <ContentRenderer
    v-if="page"
    :value="page"
  />
</template>
