<script setup>
import { ref, computed } from 'vue'
import { messages } from '../i18n'
import { detectSubjectType, subjectRef } from '@dotrino/reputation'

const props = defineProps({
  lang: { type: String, default: 'es' },
  recents: { type: Array, default: () => [] },
})
const emit = defineEmits(['open'])
const t = computed(() => messages[props.lang])

const text = ref('')
const error = ref('')
const busy = ref(false)

async function submit () {
  const raw = text.value.trim()
  if (!raw) return
  error.value = ''
  const type = detectSubjectType(raw)
  if (!type) { error.value = t.value.search.invalid; return }
  busy.value = true
  try {
    const ref_ = await subjectRef(type, raw)
    // label visible: para correo mostramos lo que tú escribiste (historial privado);
    // el registro solo recibe el hash.
    const label = type === 'email' ? raw.toLowerCase() : ref_.replace(/^[a-z]+:/, '')
    emit('open', { ref: ref_, type, value: label })
    text.value = ''
  } catch (e) {
    error.value = t.value.search.invalid
  }
  busy.value = false
}

const typeIcon = { domain: '🌐', x: '𝕏', github: '⌨', linkedin: 'in', email: '✉', profile: '👤' }
</script>

<template>
  <div class="search">
    <div class="searchbar">
      <input v-model="text" :placeholder="t.search.placeholder" @keyup.enter="submit"
        autocapitalize="off" autocorrect="off" spellcheck="false" data-testid="subject-input" />
      <button :disabled="busy || !text.trim()" @click="submit" data-testid="subject-go">{{ t.search.go }}</button>
    </div>
    <p v-if="error" class="err">{{ error }}</p>
    <p v-else class="hint">{{ t.search.hint }}</p>

    <div v-if="recents.length" class="recents">
      <span class="rlabel">{{ t.search.recent }}</span>
      <div class="chips">
        <button v-for="r in recents" :key="r.ref" class="chip" @click="emit('open', { ref: r.ref, type: r.type, value: r.label })"
          data-testid="recent-chip">
          <span class="cicon">{{ typeIcon[r.type] || '•' }}</span>
          <span class="clabel">{{ r.type === 'email' ? '••••' : r.label }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.search { width: 100%; }
.searchbar { display: flex; gap: 0.5rem; }
.searchbar input { flex: 1; min-width: 0; padding: 0.95rem 1.1rem; border-radius: 14px; border: 1px solid var(--line-2); background: var(--surface); color: var(--text); font-size: 1.02rem; }
.searchbar input:focus { outline: none; border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-soft); }
.searchbar button { padding: 0 1.4rem; border-radius: 14px; border: none; background: var(--accent); color: #04211f; font-weight: 700; cursor: pointer; font-size: 1rem; }
.searchbar button:disabled { opacity: 0.5; cursor: default; }
.hint { color: var(--text-dim); font-size: 0.85rem; margin: 0.5rem 0.2rem 0; }
.err { color: var(--danger); font-size: 0.88rem; margin: 0.5rem 0.2rem 0; }
.recents { margin-top: 1.1rem; }
.rlabel { font-size: 0.74rem; text-transform: uppercase; letter-spacing: 0.07em; color: var(--text-dim); }
.chips { display: flex; flex-wrap: wrap; gap: 0.45rem; margin-top: 0.5rem; }
.chip { display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.4rem 0.8rem; border-radius: 999px; border: 1px solid var(--line); background: var(--surface); color: var(--text-mid); cursor: pointer; font: inherit; font-size: 0.88rem; max-width: 15rem; }
.chip:hover { border-color: var(--accent); color: var(--text); }
.cicon { font-size: 0.95rem; }
.clabel { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
</style>
