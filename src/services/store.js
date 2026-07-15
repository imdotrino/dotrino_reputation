// Almacén del usuario (store.dotrino.com): guardamos los sujetos que MIRÉ para
// mostrarlos como "vistos hace poco". Es lo único durable de esta app (las
// calificaciones/preguntas viajan al registro, no al store). Best-effort.
import { Store } from '@dotrino/store'

const RECENTS = 'reputation:recent-subjects'
const MAX = 24

let store = null
async function getStore () {
  if (!store) store = await Store.connect()
  return store
}

// El store viaja por postMessage al iframe del vault (structured clone): aplanamos
// a JSON plano por si vienen proxies reactivos de Vue.
const plain = (v) => JSON.parse(JSON.stringify(v))

/** Registra que abrí un sujeto (dedup por ref, más reciente primero). */
export async function recordSubject (ref, label, type) {
  try {
    const s = await getStore()
    await s.appendMessage(RECENTS, plain({ ref, label, type, ts: Date.now() }))
  } catch (_) { /* store no disponible: sin recientes, la app sigue */ }
}

/** Lista de sujetos vistos, dedup por ref, más reciente primero. */
export async function loadRecents () {
  try {
    const s = await getStore()
    const entries = await s.listThread(RECENTS, { limit: 200 }).catch(() => [])
    const byRef = new Map()
    for (const e of entries) {
      const r = e && e.ref
      if (!r) continue
      const prev = byRef.get(r)
      if (!prev || (e.ts || 0) > (prev.ts || 0)) byRef.set(r, e)
    }
    return [...byRef.values()].sort((a, b) => (b.ts || 0) - (a.ts || 0)).slice(0, MAX)
  } catch (_) { return [] }
}
