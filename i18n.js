/* =========================================================
   I18N · A La Torre GT  —  motor de traducciones
   ---------------------------------------------------------
   Se carga en <head> ANTES de comun.js, junto con los diccionarios:

     <script src="i18n.js" defer></script>
     <script src="traducciones/trad-comun.js" defer></script>    ← menú, footer, login (todas las páginas)
     <script src="traducciones/trad-inicio.js" defer></script>   ← textos de esa página
     <script src="comun.js" defer></script>

   CÓMO MARCAR UN TEXTO EN EL HTML (no cambia el diseño):
     <h2 data-i18n="inicio.mas.titulo">Los más reservados</h2>                 → cambia el texto
     <h1 data-i18n-html="inicio.hero.titulo">Lo mejor de <br>…</h1>           → texto con <br> u otro HTML
     <input data-i18n-attr="placeholder:inicio.busq.placeholder">             → atributos (placeholder, aria-label, alt, title)
     <input data-i18n-attr="placeholder:clave1;aria-label:clave2">            → varios atributos a la vez
     <span data-i18n="inicio.tc.rank" data-i18n-n="2">#2 …</span>             → {n} dentro del texto se reemplaza por 2
     <span data-i18n="…" data-i18n-suave>                                      → solo se traduce si el JS de la página no lo cambió

   CÓMO AGREGAR UN TEXTO NUEVO:
     1) Ponle data-i18n="pagina.seccion.nombre" en el HTML (el texto en español se queda ahí de respaldo).
     2) Agrega UNA entrada en traducciones/<pagina>.js con todos los idiomas juntos.
     3) En la consola del navegador: I18n.faltantes()  → te dice qué idiomas faltan en cada clave.

   DESDE JAVASCRIPT (textos que genera un script):
     I18n.t('clave')                      → texto en el idioma actual
     I18n.t('clave', { n: 5 })            → con {n}
     I18n.idioma()                        → 'es', 'cak', …
     window.addEventListener('preferencias', e => …)   → se dispara al cambiar idioma/moneda (ya existe en comun.js)

   ARREGLO (recarga en español):
     Antes, este archivo llamaba a aplicar() en cuanto se ejecutaba. Como los scripts "defer"
     corren en orden y los diccionarios (trad-comun.js, trad-inicio.js) van DESPUÉS de este,
     en ese momento todavía no había textos y no se traducía nada. Ahora:
       · se espera a DOMContentLoaded (que ocurre cuando ya corrieron TODOS los defer), y
       · si un diccionario llega tarde, agregar() vuelve a aplicar solo.
   ========================================================= */
(function () {
  'use strict';

  const BASE = 'es';                                        // idioma de respaldo
  const IDIOMAS = ['es', 'en', 'fr', 'de', 'pt', 'it', 'cak'];   // mismo orden que comun.js
  const textos = {};
  let actual = BASE;
  let arrancado = false;                                    // ya se aplicó la primera vez
  let pendiente = false;                                    // hay una re-aplicación agendada

  try {
    const g = JSON.parse(localStorage.getItem('prefs') || '{}').lang;
    if (IDIOMAS.includes(g)) actual = g;
  } catch (e) { /* sin almacenamiento */ }

  function agregar(lote) {
    Object.keys(lote).forEach(k => {
      if (textos[k]) console.warn('[i18n] clave repetida:', k);
      textos[k] = lote[k];
    });
    // Si un diccionario llega después del arranque, se vuelve a traducir la página (una sola vez por tanda)
    if (arrancado && !pendiente) {
      pendiente = true;
      Promise.resolve().then(() => { pendiente = false; aplicar(); });
    }
  }

  function t(clave, vars) {
    const e = textos[clave];
    let s = e && (e[actual] || e[BASE]);       // si falta el idioma → español
    if (!s) { console.warn('[i18n] no existe la clave:', clave); return clave; }
    if (vars) s = s.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? vars[k] : m));
    return s;
  }

  const tOpc = (clave, vars) => (textos[clave] ? t(clave, vars) : null);

  /* ---- leer / escribir texto sin borrar íconos (svg) que viven dentro del elemento ---- */
  const nodosTexto = el => Array.from(el.childNodes).filter(n => n.nodeType === 3 && n.nodeValue.trim());
  const leerTexto = el => el.children.length ? nodosTexto(el).map(n => n.nodeValue.trim()).join(' ') : el.textContent.trim();
  function ponerTexto(el, valor) {
    if (!el.children.length) { el.textContent = valor; return; }
    const nodos = nodosTexto(el);
    if (!nodos.length) { el.appendChild(document.createTextNode(valor)); return; }
    nodos.forEach((n, i) => {
      const m = n.nodeValue.match(/^(\s*)[\s\S]*?(\s*)$/);   // conserva espacios de los lados
      n.nodeValue = i === 0 ? m[1] + valor + m[2] : '';
    });
  }

  function aplicar(raiz) {
    raiz = raiz || document;
    document.documentElement.lang = actual;
    raiz.querySelectorAll('[data-i18n],[data-i18n-html],[data-i18n-attr]').forEach(el => {
      const vars = el.dataset.i18nN !== undefined ? { n: el.dataset.i18nN } : undefined;

      if (el.dataset.i18n) {
        let saltar = false;
        if (el.hasAttribute('data-i18n-suave')) {
          if (el._i18nUlt === undefined) el._i18nUlt = leerTexto(el);
          saltar = leerTexto(el) !== el._i18nUlt;          // otro script ya le puso su propio texto
        }
        const v = tOpc(el.dataset.i18n, vars);
        if (!saltar && v !== null) {
          ponerTexto(el, v);
          if (el.hasAttribute('data-i18n-suave')) el._i18nUlt = leerTexto(el);
        }
      }
      if (el.dataset.i18nHtml) { const v = tOpc(el.dataset.i18nHtml, vars); if (v !== null) el.innerHTML = v; }
      if (el.dataset.i18nAttr) {
        el.dataset.i18nAttr.split(';').forEach(par => {
          const i = par.indexOf(':');
          if (i > 0) { const v = tOpc(par.slice(i + 1).trim(), vars); if (v !== null) el.setAttribute(par.slice(0, i).trim(), v); }
        });
      }
    });
  }

  /* ---- ayuda para revisar: claves a las que les falta algún idioma ---- */
  function faltantes(lang) {
    const langs = lang ? [lang] : IDIOMAS.filter(l => l !== BASE);
    const out = {};
    langs.forEach(l => { out[l] = Object.keys(textos).filter(k => !textos[k][l]); });
    return lang ? out[lang] : out;
  }

  window.addEventListener('preferencias', e => {
    const l = e.detail && e.detail.lang;
    if (l && l !== actual) { actual = l; aplicar(); }
  });

  const arrancar = () => {
    if (arrancado) return;
    arrancado = true;
    if (!Object.keys(textos).length) {
      console.error('[i18n] No se cargó ningún diccionario. Revisa que existan: traducciones/trad-comun.js y traducciones/trad-inicio.js (carpeta "traducciones" junto a index.html).');
    }
    aplicar();
  };

  // Clave del arreglo: NO arrancar mientras el documento esté "interactive" sin que haya disparado
  // DOMContentLoaded, porque ahí los scripts defer siguientes (los diccionarios) aún no corren.
  // DOMContentLoaded se dispara DESPUÉS de que todos los defer terminaron.
  if (document.readyState === 'complete') arrancar();
  else document.addEventListener('DOMContentLoaded', arrancar);

  window.I18n = { agregar, t, aplicar, faltantes, idioma: () => actual };
})();
