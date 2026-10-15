/* =========================================================
   BUSCADOR · A La Torre GT
   Motor de búsqueda compartido por index.html y destinos.html.
   Perdona mala ortografía:
     · ignora tildes y mayúsculas        ("volcan" = "Volcán")
     · iguala letras que suenan igual     ("bolcan" = "volcán", "pakaya" = "Pacaya", "ola" = "hola")
     · tolera letras de más, de menos o cambiadas de lugar ("acatenago", "fuegp", "voclan")
     · entiende lo que se escribe a medias ("acaten" ya encuentra Acatenango)
     · entiende sinónimos ("hiking", "senderismo", "lago"…)
   Para enseñarle sinónimos nuevos edita SINONIMOS (aquí abajo).
   ========================================================= */
(function (global) {
  'use strict';

  /* palabras que no ayudan a buscar ("volcán DE fuego" → solo "volcan fuego") */
  const STOP = new Set(['de', 'del', 'la', 'el', 'los', 'las', 'en', 'y', 'a', 'al', 'un', 'una', 'para', 'por', 'con']);

  /* Lo que la persona escribe  →  otras palabras que significan lo mismo.
     Escríbelas sin tilde y en minúscula. */
  const SINONIMOS = {
    hiking: ['caminata', 'senderismo', 'ascenso', 'trekking'],
    hike: ['caminata', 'senderismo', 'ascenso', 'trekking'],
    trekking: ['caminata', 'senderismo', 'ascenso'],
    senderismo: ['caminata', 'ascenso', 'trekking'],
    caminata: ['senderismo', 'ascenso', 'trekking'],
    excursion: ['caminata', 'ascenso', 'tour'],
    escalar: ['ascenso', 'cumbre'],
    cumbre: ['ascenso'],
    volcano: ['volcan'],
    erupcion: ['fuego', 'pacaya'],
    eruption: ['fuego', 'pacaya'],
    lava: ['pacaya', 'fuego'],
    lago: ['laguna', 'atitlan'],
    lake: ['laguna', 'atitlan'],
    laguna: ['lago', 'atitlan'],
    cascada: ['catarata', 'semuc'],
    rio: ['semuc'],
    piscinas: ['semuc'],
    acampar: ['camping'],
    campamento: ['camping'],
    carpa: ['camping'],
    sunrise: ['amanecer'],
    sunset: ['atardecer'],
    noche: ['nocturno', 'amanecer'],
    ruinas: ['maya'],
    maya: ['rostro']
  };

  /* ---------- 1. limpiar el texto ---------- */
  function norm(s) {
    return String(s == null ? '' : s)
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')   // sin tildes (la ñ pasa a n)
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  /* ---------- 2. "cómo suena" la palabra ---------- */
  function fonetica(w) {
    return w
      .replace(/ch/g, '§')          // la "ch" se protege
      .replace(/ph/g, 'f')
      .replace(/qu/g, 'k')
      .replace(/ll/g, 'y')
      .replace(/c([ei])/g, 's$1')
      .replace(/c/g, 'k')
      .replace(/z/g, 's')
      .replace(/v/g, 'b')
      .replace(/w/g, 'u')
      .replace(/h/g, '')
      .replace(/g([ei])/g, 'j$1')
      .replace(/y/g, 'i')
      .replace(/q/g, 'k')
      .replace(/(.)\1+/g, '$1')     // letras repetidas ("fuegoo", "rr")
      .replace(/§/g, 'ch');
  }

  /* ---------- 3. cuántas letras se parecen (Damerau-Levenshtein) ---------- */
  function distancia(a, b) {
    const la = a.length, lb = b.length;
    if (!la) return lb;
    if (!lb) return la;
    const d = [];
    for (let i = 0; i <= la; i++) { d[i] = [i]; }
    for (let j = 1; j <= lb; j++) d[0][j] = j;
    for (let i = 1; i <= la; i++) {
      for (let j = 1; j <= lb; j++) {
        const costo = a[i - 1] === b[j - 1] ? 0 : 1;
        d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + costo);
        if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
          d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);   // letras cambiadas de lugar
        }
      }
    }
    return d[la][lb];
  }

  // cuántos errores se perdonan según el largo de la palabra
  const tolerancia = n => (n <= 3 ? 0 : n <= 7 ? 1 : 2);

  /* ---------- 4. qué tanto coincide UNA palabra buscada con UNA palabra del destino ---------- */
  function puntuarPalabra(tok, palabra, difuso) {
    if (palabra === tok) return 5;
    if (tok.length >= 2 && palabra.startsWith(tok)) return 4;        // lo escribe a medias
    if (tok.length >= 3 && palabra.includes(tok)) return 2.5;
    if (!difuso || tok.length < 4) return 0;
    const tol = tolerancia(tok.length);
    const d = Math.min(distancia(tok, palabra), distancia(tok, palabra.slice(0, tok.length)));
    return d <= tol ? 3 - d * 0.8 : 0;
  }

  /* ---------- 5. preparar la búsqueda (se hace una vez) ---------- */
  function consulta(q) {
    const toks = norm(q).split(' ').filter(t => t.length >= 2);
    let usar = toks.filter(t => !STOP.has(t));
    if (!usar.length) usar = toks;
    const tokens = usar.map(t => ({
      raw: t,
      fon: fonetica(t),
      alts: (SINONIMOS[t] || []).map(a => fonetica(norm(a)))
    }));
    return { activo: tokens.length > 0, tokens };
  }

  /* ---------- 6. preparar los textos de cada destino (una vez por destino) ----------
     campos: [{ texto, peso, difuso, fuerte }]
       peso   = qué tan importante es (el nombre pesa más que la descripción)
       difuso = si perdona errores de ortografía en ese campo
       fuerte = si cuenta en la primera pasada (nombre, región, categoría…) */
  function indexar(campos) {
    const palabras = [];
    campos.forEach(c => {
      const ws = norm(c.texto).split(' ').filter(w => w.length >= 2);
      const base = { peso: c.peso || 1, difuso: c.difuso !== false, fuerte: c.fuerte !== false };
      ws.forEach(w => palabras.push(Object.assign({ w: fonetica(w) }, base)));
      // también pares pegados, por si escriben "santamaria" o "sanmarcos" sin espacio
      if (base.difuso && base.fuerte) {
        for (let i = 0; i < ws.length - 1; i++) palabras.push(Object.assign({ w: fonetica(ws[i] + ws[i + 1]) }, base));
      }
    });
    return palabras;
  }

  /* ---------- 7. puntaje total (0 = no coincide) ----------
     Todas las palabras buscadas deben aparecer en el destino.
     soloFuertes = true → solo mira nombre/región/categoría (primera pasada). */
  function puntuar(cons, idx, soloFuertes) {
    if (!cons.activo) return 1;
    let total = 0;
    for (const t of cons.tokens) {
      let mejor = 0;
      for (const p of idx) {
        if (soloFuertes && !p.fuerte) continue;
        let s = puntuarPalabra(t.fon, p.w, p.difuso);
        for (const a of t.alts) s = Math.max(s, puntuarPalabra(a, p.w, false) * 0.9);
        s *= p.peso;
        if (s > mejor) mejor = s;
      }
      if (!mejor) return 0;
      total += mejor;
    }
    return total;
  }

  /* ---------- 8. "¿Quisiste decir…?" ----------
     vocabulario(textos) junta las palabras conocidas (nombres, regiones…).
     corregir(q, vocab) devuelve la frase corregida, o null si no hay nada que corregir. */
  function vocabulario(textos) {
    const vistos = new Map();
    textos.forEach(t => {
      String(t || '').toLowerCase().split(/[^a-záéíóúüñ0-9]+/).forEach(w => {
        const n = norm(w);
        if (n.length < 4 || STOP.has(n)) return;
        const f = fonetica(n);
        if (!vistos.has(f)) vistos.set(f, w);
      });
    });
    return [...vistos].map(([fon, mostrar]) => ({ fon, mostrar }));
  }

  function corregir(q, vocab) {
    const toks = norm(q).split(' ').filter(Boolean);
    let cambio = false;
    const salida = toks.map(t => {
      if (t.length < 3 || STOP.has(t)) return t;
      const f = fonetica(t);
      if (f.length < 3) return t;
      const igual = vocab.find(v => v.fon === f);
      if (igual) { if (norm(igual.mostrar) !== t) cambio = true; return igual.mostrar; }   // suena igual: se escribe como en la página
      if (vocab.some(v => v.fon.startsWith(f))) return t;        // la está escribiendo a medias
      const max = t.length <= 4 ? 1 : t.length <= 7 ? 2 : 3;
      let mejor = null, dMejor = Infinity;
      vocab.forEach(v => {
        const d = Math.min(distancia(f, v.fon), distancia(f, v.fon.slice(0, f.length)));
        if (d < dMejor) { dMejor = d; mejor = v; }
      });
      if (mejor && dMejor <= max) { cambio = true; return mejor.mostrar; }
      return t;
    });
    return cambio ? salida.join(' ') : null;
  }

  global.Buscador = { norm, fonetica, consulta, indexar, puntuar, vocabulario, corregir, SINONIMOS };
})(window);
