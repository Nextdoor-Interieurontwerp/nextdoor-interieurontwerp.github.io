<template>
  <button type="button" class="consent-reopen" @click="openPreferences">
    {{ $t('consent.reopen') }}
  </button>
</template>

<script setup lang="ts">
const { openPreferences } = useConsent()
</script>

<style scoped>
.consent-reopen {
  background: transparent;
  border: none;
  padding: 0;
  margin: 0;
  font: inherit;
  color: inherit;
  cursor: pointer;
  text-decoration: underline;
}
</style>
