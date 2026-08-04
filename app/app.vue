<script setup lang="ts">
// Nuxt SEO does not emit hreflang alternates on its own here, so bind the
// i18n head (alternate links + og:locale) once for every page.
const i18nHead = useLocaleHead({ seo: true })

useHead(() => ({
  htmlAttrs: i18nHead.value.htmlAttrs,
  link: i18nHead.value.link,
  meta: i18nHead.value.meta,
}))
</script>

<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
