// Bilingüe es/en (CONVENCIONES §9). Español neutro / tuteo, SIN voseo.
// Lenguaje llano (§9.1): explicamos el beneficio, no la implementación.

export const LANG_KEY = 'dotrino_reputation:lang'

export function detectLang () {
  try {
    const saved = localStorage.getItem(LANG_KEY)
    if (saved === 'es' || saved === 'en') return saved
  } catch (_) {}
  const nav = (navigator.language || 'es').slice(0, 2)
  return nav === 'en' ? 'en' : 'es'
}

export const messages = {
  es: {
    tagline: 'Califica y pregunta sobre cualquier cosa',
    intro: 'Personas, sitios web, cuentas. Lo que dice tu red pesa; el ruido de desconocidos, no.',
    search: {
      placeholder: 'Pega un sitio, @cuenta, correo, o elige un perfil…',
      hint: 'Un dominio (tienda.com), una cuenta (@alguien), un correo, o el perfil de alguien.',
      go: 'Abrir',
      invalid: 'No reconozco eso. Prueba con un dominio, @cuenta, correo o perfil.',
      recent: 'Vistos hace poco',
    },
    types: { profile: 'Perfil', domain: 'Sitio', x: 'Cuenta X', github: 'GitHub', linkedin: 'LinkedIn', email: 'Correo' },
    axes: {
      title: 'Tu opinión',
      confianza: 'Confianza',
      afinidad: 'Afinidad',
      conoce: '¿Lo conoces?',
      confianzaHint: 'Cuánto confías en esto',
      afinidadHint: 'Cuánto te interesa / lo sigues',
      save: 'Guardar',
      saved: 'Guardado',
      remove: 'Quitar',
      yes: 'Sí', no: 'No',
    },
    agg: {
      title: 'Según tu red',
      confianza: 'Confianza',
      afinidad: 'Afinidad',
      none: 'Nadie de tu red opinó todavía',
      raw: (n) => `${n} ${n === 1 ? 'opinión' : 'opiniones'} en total`,
      trusted: (n) => `${n} de tu red`,
    },
    questions: {
      title: 'Preguntas',
      ask: 'Hacer una pregunta',
      askPlaceholder: '¿Qué quieres saber de esto?',
      publish: 'Publicar',
      answer: 'Responder',
      answerPlaceholder: 'Tu respuesta…',
      myAnswer: 'Tu respuesta',
      empty: 'Aún no hay preguntas. Haz la primera.',
      answers: (n) => `${n} ${n === 1 ? 'respuesta' : 'respuestas'}`,
      fromNetwork: (n) => (n > 0 ? `${n} de tu red` : 'nadie de tu red'),
      delete: 'Borrar',
      byMe: 'tú',
    },
    profileBtn: 'Mi perfil',
    needName: 'Ponte un nombre para calificar y preguntar.',
    loading: 'Cargando…',
    empty: 'Busca algo arriba para calificarlo o preguntar sobre ello.',
  },
  en: {
    tagline: 'Rate & ask about anything',
    intro: 'People, websites, accounts. What your network says counts; noise from strangers doesn’t.',
    search: {
      placeholder: 'Paste a site, @handle, email, or pick a profile…',
      hint: 'A domain (shop.com), an account (@someone), an email, or someone’s profile.',
      go: 'Open',
      invalid: 'I don’t recognize that. Try a domain, @handle, email or profile.',
      recent: 'Seen recently',
    },
    types: { profile: 'Profile', domain: 'Site', x: 'X account', github: 'GitHub', linkedin: 'LinkedIn', email: 'Email' },
    axes: {
      title: 'Your take',
      confianza: 'Trust',
      afinidad: 'Affinity',
      conoce: 'Do you know it?',
      confianzaHint: 'How much you trust this',
      afinidadHint: 'How much you follow / care',
      save: 'Save',
      saved: 'Saved',
      remove: 'Remove',
      yes: 'Yes', no: 'No',
    },
    agg: {
      title: 'From your network',
      confianza: 'Trust',
      afinidad: 'Affinity',
      none: 'No one in your network has weighed in yet',
      raw: (n) => `${n} ${n === 1 ? 'opinion' : 'opinions'} total`,
      trusted: (n) => `${n} from your network`,
    },
    questions: {
      title: 'Questions',
      ask: 'Ask a question',
      askPlaceholder: 'What do you want to know about this?',
      publish: 'Publish',
      answer: 'Answer',
      answerPlaceholder: 'Your answer…',
      myAnswer: 'Your answer',
      empty: 'No questions yet. Ask the first one.',
      answers: (n) => `${n} ${n === 1 ? 'answer' : 'answers'}`,
      fromNetwork: (n) => (n > 0 ? `${n} from your network` : 'none from your network'),
      delete: 'Delete',
      byMe: 'you',
    },
    profileBtn: 'My profile',
    needName: 'Set a name to rate and ask.',
    loading: 'Loading…',
    empty: 'Search for something above to rate it or ask about it.',
  },
}
