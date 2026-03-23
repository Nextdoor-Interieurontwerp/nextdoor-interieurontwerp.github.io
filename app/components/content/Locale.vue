<script setup lang="ts">
const props = defineProps<{
  lang: string
}>()

const { locale } = useI18n()
</script>

<template>
  <span v-if="props.lang === locale"><slot /></span>
</template>
