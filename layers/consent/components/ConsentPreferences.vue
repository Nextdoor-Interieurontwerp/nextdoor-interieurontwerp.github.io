<template>
  <div
    class="consent-prefs-overlay"
    role="dialog"
    aria-modal="true"
    aria-labelledby="consent-prefs-title"
    @click.self="closePreferences"
  >
    <div class="consent-prefs">
      <header class="consent-prefs__header">
        <h2 id="consent-prefs-title" class="consent-prefs__title">
          {{ $t('consent.panel.title') }}
        </h2>
        <button
          type="button"
          class="consent-prefs__close"
          :aria-label="$t('consent.panel.close')"
          @click="closePreferences"
        >×</button>
      </header>

      <ul class="consent-prefs__categories">
        <li v-for="cat in categoryOrder" :key="cat" class="consent-prefs__category">
          <label class="consent-prefs__label">
            <input
              type="checkbox"
              :checked="cat === 'necessary' ? true : draft[cat]"
              :disabled="cat === 'necessary'"
              @change="onToggle(cat, ($event.target as HTMLInputElement).checked)"
            />
            <span class="consent-prefs__label-text">
              <strong>
                {{ $t(`consent.panel.categories.${cat}.label`) }}
                <span v-if="cat === 'necessary'" class="consent-prefs__locked">
                  ({{ $t('consent.panel.categories.necessary.lockedHint') }})
                </span>
              </strong>
              <span class="consent-prefs__desc">
                {{ $t(`consent.panel.categories.${cat}.desc`) }}
              </span>
            </span>
          </label>
        </li>
      </ul>

      <div class="consent-prefs__actions">
        <button
          type="button"
          class="consent-prefs__btn consent-prefs__btn--secondary"
          @click="save"
        >{{ $t('consent.panel.save') }}</button>
        <button
          type="button"
          class="consent-prefs__btn consent-prefs__btn--primary"
          @click="acceptAll"
        >{{ $t('consent.panel.acceptAll') }}</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ConsentCategory } from '../types'

const categoryOrder: ConsentCategory[] = ['necessary', 'preferences', 'analytics', 'marketing']

const { state, accept, setCategories, closePreferences } = useConsent()

const draft = reactive<Record<ConsentCategory, boolean>>({
  necessary: true,
  preferences: state.value.categories.preferences,
  analytics: state.value.categories.analytics,
  marketing: state.value.categories.marketing,
})

function onToggle(cat: ConsentCategory, value: boolean): void {
  draft[cat] = value
}

function save(): void {
  setCategories(draft)
}

function acceptAll(): void {
  accept()
}
</script>

<style scoped>
.consent-prefs-overlay {
  position: fixed;
  inset: 0;
  z-index: 10000;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.consent-prefs {
  background: #fff;
  color: #222;
  width: min(520px, 100%);
  max-height: calc(100vh - 4rem);
  overflow-y: auto;
  border-radius: 0.6rem;
  padding: 2rem;
  font-size: 1.4rem;
  line-height: 1.5;
}

.consent-prefs__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.6rem;
}

.consent-prefs__title {
  margin: 0;
  font-size: 1.7rem;
  font-weight: 600;
}

.consent-prefs__close {
  background: transparent;
  border: none;
  font-size: 2.4rem;
  line-height: 1;
  cursor: pointer;
  color: #555;
}

.consent-prefs__categories {
  list-style: none;
  margin: 0 0 2rem;
  padding: 0;
}

.consent-prefs__category {
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  padding: 1.2rem 0;
}

.consent-prefs__category:last-child {
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}

.consent-prefs__label {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  cursor: pointer;
}

.consent-prefs__label input[type="checkbox"] {
  margin-top: 0.3rem;
  width: 1.6rem;
  height: 1.6rem;
  flex-shrink: 0;
}

.consent-prefs__label input[type="checkbox"]:disabled {
  cursor: not-allowed;
}

.consent-prefs__label-text {
  display: flex;
  flex-direction: column;
}

.consent-prefs__locked {
  font-size: 1.1rem;
  color: #888;
  font-weight: 400;
}

.consent-prefs__desc {
  font-size: 1.2rem;
  color: #555;
  margin-top: 0.3rem;
}

.consent-prefs__actions {
  display: flex;
  gap: 0.8rem;
  justify-content: flex-end;
}

.consent-prefs__btn {
  padding: 0.8rem 1.4rem;
  border-radius: 0.3rem;
  font-size: 1.3rem;
  font-weight: 600;
  cursor: pointer;
}

.consent-prefs__btn--primary {
  background: #222;
  color: #fff;
  border: 1px solid #222;
}

.consent-prefs__btn--secondary {
  background: transparent;
  color: #222;
  border: 1px solid #222;
}

.consent-prefs__btn:hover { opacity: 0.85; }

@media (max-width: 480px) {
  .consent-prefs { padding: 1.6rem; }
  .consent-prefs__actions { flex-direction: column-reverse; }
  .consent-prefs__btn { width: 100%; }
}
</style>
