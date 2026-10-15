/* =========================================================
   MONEDA · A La Torre GT
   ÚNICO lugar donde viven las tasas y el formato de precios.
   Todos los precios del sitio se guardan en QUETZALES (GTQ) y
   solo se convierten al mostrarlos.

   CÓMO SE USA
   - Cargar en el <head> de cada página, ANTES de comun.js y SIN "defer":
         <script src="moneda.js"></script>
   - En HTML estático:      <b data-gtq="300">Q 300</b>
   - En JS (al dibujar):    `<b data-gtq="${monto}">${Moneda.formatear(monto)}</b>`
   - Al cambiar de moneda, todo lo que tenga data-gtq se actualiza solo.

   PARA ACTUALIZAR TASAS: edita solo la columna "tasa" de la lista.
   tasa = cuántas unidades de esa moneda equivalen a Q 1.
   ========================================================= */
(function () {
  'use strict';

  const BASE = 'GTQ';

  const LISTA = [
    //  cod     símbolo  prefijo   nombre                  bandera  tasa (por Q 1)
    { cod: 'GTQ', simbolo: 'Q',  prefijo: 'Q',    nombre: 'Quetzal',              bandera: '🇬🇹', tasa: 1 },
    { cod: 'USD', simbolo: '$',  prefijo: 'US$',  nombre: 'Dólar estadounidense', bandera: '🇺🇸', tasa: 0.131 },
    { cod: 'MXN', simbolo: '$',  prefijo: 'MX$',  nombre: 'Peso mexicano',        bandera: '🇲🇽', tasa: 2.40 },
    { cod: 'EUR', simbolo: '€',  prefijo: '€',    nombre: 'Euro',                 bandera: '🇪🇺', tasa: 0.112 },
    { cod: 'GBP', simbolo: '£',  prefijo: '£',    nombre: 'Libra esterlina',      bandera: '🇬🇧', tasa: 0.097 },
    { cod: 'CAD', simbolo: '$',  prefijo: 'CA$',  nombre: 'Dólar canadiense',     bandera: '🇨🇦', tasa: 0.180 },
    { cod: 'CHF', simbolo: 'Fr', prefijo: 'CHF',  nombre: 'Franco suizo',         bandera: '🇨🇭', tasa: 0.105 },
    { cod: 'JPY', simbolo: '¥',  prefijo: 'JP¥',  nombre: 'Yen japonés',          bandera: '🇯🇵', tasa: 19.6 },
    { cod: 'AUD', simbolo: '$',  prefijo: 'AU$',  nombre: 'Dólar australiano',    bandera: '🇦🇺', tasa: 0.200 },
    { cod: 'CNY', simbolo: '¥',  prefijo: 'CN¥',  nombre: 'Yuan chino',           bandera: '🇨🇳', tasa: 0.940 }
  ];

  const porCodigo = cod => LISTA.find(m => m.cod === cod);

  /* ---------- moneda elegida (se comparte con comun.js en la clave "prefs") ---------- */
  function leerPrefs() {
    try { return JSON.parse(localStorage.getItem('prefs') || '{}'); } catch (e) { return {}; }
  }
  let actual = (porCodigo(leerPrefs().mon) || porCodigo(BASE)).cod;

  /* ---------- conversión y formato ---------- */
  function convertir(montoGTQ, cod) {
    const m = porCodigo(cod || actual) || porCodigo(BASE);
    return Math.round(Number(montoGTQ) * m.tasa);   // sin decimales: son precios de tours
  }

  function formatear(montoGTQ, cod) {
    const m = porCodigo(cod || actual) || porCodigo(BASE);
    const n = Number(montoGTQ);
    if (montoGTQ == null || montoGTQ === '' || !isFinite(n)) return `${m.prefijo} —`;
    return `${m.prefijo} ${convertir(n, m.cod).toLocaleString('es-GT')}`;
  }

  /* Escribe el precio en un elemento y lo "marca" para que cambie con la moneda. */
  function poner(el, montoGTQ) {
    if (!el) return;
    if (montoGTQ == null || montoGTQ === '' || !isFinite(Number(montoGTQ))) {
      delete el.dataset.gtq;
      el.textContent = formatear(null);
    } else {
      el.dataset.gtq = montoGTQ;
      el.textContent = formatear(montoGTQ);
    }
  }

  /* Actualiza todo lo que tenga data-gtq dentro de "raiz" (por defecto, toda la página). */
  function pintar(raiz) {
    (raiz || document).querySelectorAll('[data-gtq]').forEach(el => {
      el.textContent = formatear(el.dataset.gtq);
    });
  }

  function set(cod) {
    const m = porCodigo(cod);
    if (!m || m.cod === actual) return;
    actual = m.cod;
    try {
      const p = leerPrefs();
      p.mon = actual;
      localStorage.setItem('prefs', JSON.stringify(p));
    } catch (e) { /* sin almacenamiento */ }
    pintar();
    window.dispatchEvent(new CustomEvent('monedacambiada', { detail: { cod: actual } }));
  }

  window.Moneda = {
    LISTA, BASE,
    actual: () => actual,
    set, convertir, formatear, poner, pintar
  };

  // precios que ya vienen escritos en el HTML
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => pintar());
  else pintar();
})();