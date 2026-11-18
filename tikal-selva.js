/* =========================================================
   TIKAL · animación de selva y diseño de la ficha
   Solo se activa en detalle.html?id=tikal.
   Al abrir: las hojas entran desde los bordes, el templo baja
   hasta su lugar y las hojas se abren para mostrar la página.
   ========================================================= */
(function () {
  'use strict';
  if (new URLSearchParams(location.search).get('id') !== 'tikal') return;

  /* ---------- ajustes que puedes tocar ---------- */
  const DURACION_MS = 3900;   // cuánto dura la escena antes de abrirse
  const SALIDA_MS = 900;      // cuánto tardan las hojas en abrirse
  const PARADAS = ['Tikal', 'Isla de Flores', 'Cráter Azul', 'Río Dulce'];
  const INCLUYE = ['Bus en todos los traslados', 'Entrada a Tikal', 'Hospedaje', 'Desayuno del domingo', 'Imán conmemorativo', 'Fotografías'];

  const sinMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const nav = performance.getEntriesByType && performance.getEntriesByType('navigation')[0];
  const volvioAtras = nav && nav.type === 'back_forward';

  document.documentElement.classList.add('tema-selva');

  const fuente = document.createElement('link');
  fuente.rel = 'stylesheet';
  fuente.href = 'https://fonts.googleapis.com/css2?family=Alfa+Slab+One&display=swap';
  document.head.appendChild(fuente);

  const estilos = document.createElement('style');
  estilos.textContent = `
  .tema-selva { --sv-noche: #0d2a21; --sv-hoja: #2f6b4f; --sv-caliza: #e6dfcc; --sv-copal: #eaa63f; --sv-crater: #55c4b8; }

  /* ----- escena de entrada ----- */
  .tema-selva.sv-bloqueo, .tema-selva.sv-bloqueo body { overflow: hidden; }
  .sv-intro { position: fixed; inset: 0; z-index: 9999; overflow: hidden; cursor: pointer; background: var(--sv-noche); }
  .sv-cielo, .sv-sol, .sv-bruma, .sv-suelo { position: absolute; pointer-events: none; }
  .sv-cielo { inset: 0; opacity: 0; background: linear-gradient(180deg, #123b3a 0%, #2d6a5a 34%, #d99a4a 68%, #f3c778 82%, #0d2a21 100%); animation: sv-aparece 2.2s ease-out .1s forwards; }
  .sv-sol { left: 50%; bottom: 14%; width: 120vmin; height: 120vmin; margin-left: -60vmin; border-radius: 50%; background: radial-gradient(circle, rgba(255,221,150,.95) 0%, rgba(245,178,84,.42) 28%, rgba(245,178,84,0) 62%); transform: translateY(26%); opacity: 0; animation: sv-sol 2.8s cubic-bezier(.2,.7,.2,1) .2s forwards; }
  .sv-templo { position: absolute; left: 50%; bottom: 19%; width: min(56vmin, 440px); margin-left: calc(min(56vmin, 440px) / -2); transform: translateY(-125vh); animation: sv-baja 2.3s cubic-bezier(.16,.84,.24,1) .25s forwards; }
  .sv-templo svg { display: block; width: 100%; height: auto; }
  .sv-puerta { opacity: 0; animation: sv-aparece .8s ease-out 2.2s forwards; }
  .sv-bruma { left: -30%; right: -30%; height: 22vh; bottom: 16%; opacity: 0; background: radial-gradient(ellipse 34% 50% at 28% 60%, rgba(236,241,226,.5), transparent 70%), radial-gradient(ellipse 38% 44% at 72% 50%, rgba(236,241,226,.42), transparent 70%); animation: sv-aparece 1.2s ease-out 1.8s forwards, sv-deriva 7s ease-in-out infinite alternate; }
  .sv-suelo { left: 0; right: 0; bottom: 0; height: 34%; background: linear-gradient(180deg, transparent, var(--sv-noche) 46%); }
  .sv-titulo { position: absolute; left: 20px; right: 20px; bottom: max(7vh, 34px); text-align: center; color: var(--sv-caliza); pointer-events: none; }
  .sv-titulo strong, .sv-titulo span { display: block; opacity: 0; transform: translateY(14px); animation: sv-texto .8s cubic-bezier(.2,.8,.2,1) forwards; }
  .sv-titulo strong { font: 400 clamp(4rem, 15vmin, 8.5rem)/.95 'Alfa Slab One', Georgia, serif; letter-spacing: .01em; animation-delay: 1.75s; }
  .sv-titulo span { margin-top: 10px; font-size: clamp(1rem, 2.6vmin, 1.3rem); font-weight: 500; animation-delay: 2.05s; }
  .sv-saltar { position: absolute; top: max(16px, env(safe-area-inset-top)); right: 16px; z-index: 3; min-height: 44px; padding: 0 18px; border: 1px solid rgba(230,223,204,.55); border-radius: 50px; background: rgba(13,42,33,.55); color: var(--sv-caliza); font: 600 .88rem Poppins, sans-serif; cursor: pointer; }
  .sv-saltar:focus-visible { outline: 3px solid var(--sv-copal); outline-offset: 2px; }

  .sv-hoja { position: absolute; left: calc(var(--x) * 1%); top: calc(var(--y) * 1%); width: calc(var(--h) * .5vmin); height: calc(var(--h) * 1vmin); margin-left: calc(var(--h) * -.25vmin); margin-top: calc(var(--h) * -1vmin); transform-origin: 50% 100%; transform: rotate(calc(var(--r) * 1deg + var(--d) * 46deg)) scale(.35); opacity: 0; pointer-events: none; animation: sv-hoja-entra 1.3s cubic-bezier(.2,.8,.2,1) calc(var(--t) * 1ms) forwards; }
  .sv-hoja svg { display: block; width: 100%; height: 100%; overflow: visible; transform-origin: 50% 100%; animation: sv-mece calc(var(--m) * 1s) ease-in-out infinite alternate; }

  .sv-intro.sale { pointer-events: none; }
  .sv-intro.sale .sv-hoja { animation: sv-hoja-sale ${SALIDA_MS}ms cubic-bezier(.6,0,.8,.3) forwards; opacity: 1; transform: rotate(calc(var(--r) * 1deg)) scale(1); }
  .sv-intro.sale .sv-escena { animation: sv-desvanece ${SALIDA_MS}ms ease-in forwards; }
  .sv-intro.sale { animation: sv-fondo ${SALIDA_MS}ms ease-in forwards; }
  .sv-escena { position: absolute; inset: 0; }

  @keyframes sv-aparece { to { opacity: 1; } }
  @keyframes sv-desvanece { to { opacity: 0; } }
  @keyframes sv-fondo { 0%, 45% { background-color: var(--sv-noche); } 100% { background-color: transparent; } }
  @keyframes sv-sol { to { opacity: 1; transform: translateY(0); } }
  @keyframes sv-baja { to { transform: translateY(0); } }
  @keyframes sv-texto { to { opacity: 1; transform: translateY(0); } }
  @keyframes sv-deriva { from { transform: translateX(-4%); } to { transform: translateX(4%); } }
  @keyframes sv-mece { from { transform: rotate(-2.6deg); } to { transform: rotate(2.6deg); } }
  @keyframes sv-hoja-entra { to { opacity: 1; transform: rotate(calc(var(--r) * 1deg)) scale(1); } }
  @keyframes sv-hoja-sale { to { transform: rotate(calc(var(--r) * 1deg + var(--d) * 62deg)) scale(1.25); } }

  /* ----- portada de la ficha ----- */
  .sv-banda { position: relative; overflow: hidden; background: var(--sv-noche); color: var(--sv-caliza); }
  .sv-banda .detail-hero { position: relative; z-index: 1; padding-top: 28px; padding-bottom: 30px; }
  .sv-banda .detail-breadcrumb, .sv-banda .detail-breadcrumb a { color: #b9c9bb; }
  .sv-banda .detail-breadcrumb a:hover { color: var(--sv-copal); }
  .sv-banda h1 { max-width: 19em; margin-bottom: 22px; color: var(--sv-caliza); font: 400 clamp(1.9rem, 4.4vw, 3.3rem)/1.12 'Alfa Slab One', Georgia, serif; }
  .sv-fecha { margin-bottom: 22px; font-size: 1.05rem; font-weight: 600; color: var(--sv-copal); }
  .sv-ruta { display: flex; margin: 0 0 24px; padding: 0; list-style: none; max-width: 760px; }
  .sv-ruta li { position: relative; flex: 1; padding-top: 20px; font-size: .92rem; font-weight: 600; }
  .sv-ruta li::before { content: ''; position: absolute; top: 3px; left: 0; width: 11px; height: 11px; transform: rotate(45deg); background: var(--sv-crater); }
  .sv-ruta li::after { content: ''; position: absolute; top: 8px; left: 18px; right: 6px; border-top: 1px dashed rgba(230,223,204,.5); }
  .sv-ruta li:last-child { flex: 0 0 auto; }
  .sv-ruta li:last-child::after { display: none; }
  .sv-incluye { display: flex; flex-wrap: wrap; gap: 8px 22px; margin: 0 0 24px; padding: 0; list-style: none; max-width: 760px; font-size: .9rem; color: #dbe3d3; }
  .sv-incluye li { display: flex; align-items: center; gap: 8px; }
  .sv-incluye li::before { content: ''; width: 7px; height: 7px; border-radius: 50%; background: var(--sv-copal); }
  .sv-banda .detail-meta { border-bottom: 0; padding-bottom: 0; color: #c9d4c6; }
  .sv-banda .detail-rating strong { color: var(--sv-caliza); }
  .sv-banda .detail-action-btn { background: rgba(230,223,204,.14); color: var(--sv-caliza); }
  .sv-banda .detail-action-btn:hover { background: rgba(230,223,204,.26); }
  .sv-rama { position: absolute; z-index: 0; top: -40px; right: -30px; width: 230px; height: 460px; transform: rotate(-142deg); transform-origin: 50% 50%; opacity: .55; pointer-events: none; }
  .sv-rama svg { width: 100%; height: 100%; transform-origin: 50% 100%; animation: sv-mece 6s ease-in-out infinite alternate; }
  .sv-rama.dos { top: 70px; right: 130px; width: 150px; height: 300px; transform: rotate(-168deg); opacity: .3; }
  .tema-selva .detail-layout { margin-top: 28px; }
  .tema-selva .gal-slide:only-child { background-size: contain; background-repeat: no-repeat; background-color: var(--sv-noche); }
  .tema-selva .itinerary-hora, .tema-selva .it-etiqueta-txt { color: var(--sv-hoja); }

  @media (max-width: 900px) {
    .tema-selva .dt-flotante__precio { grid-template-columns: auto; }
    .tema-selva .dt-flotante__precio b { white-space: nowrap; }
  }
  @media (max-width: 760px) {
    .sv-banda .detail-hero { padding-top: 20px; padding-bottom: 24px; }
    .sv-ruta { display: grid; grid-template-columns: 1fr 1fr; gap: 14px 12px; }
    .sv-ruta li::after { display: none; }
    .sv-rama { right: -90px; opacity: .3; }
    .sv-rama.dos { display: none; }
    .sv-banda .detail-actions { margin-left: 0; }
  }
  @media (prefers-reduced-motion: reduce) { .sv-rama svg { animation: none; } }`;
  document.head.appendChild(estilos);

  /* ---------- dibujos ---------- */
  function palma(color, nervio) {
    let hojas = '';
    for (let i = 0; i < 19; i++) {
      const y = 405 - i * 21;
      const l = 84 * Math.sin(Math.PI * (i + 1.6) / 21) + 10;
      [-1, 1].forEach(s => {
        const x = v => (100 + s * v).toFixed(1);
        hojas += `<path d="M100 ${y}Q${x(l * .5)} ${(y - l * .62).toFixed(1)} ${x(l)} ${(y - l * .46).toFixed(1)}Q${x(l * .52)} ${(y - l * .2).toFixed(1)} 100 ${y + 7}Z"/>`;
      });
    }
    return `<svg viewBox="0 0 200 420" aria-hidden="true"><g fill="${color}">${hojas}</g><path d="M100 420Q98 210 100 8" fill="none" stroke="${nervio}" stroke-width="3"/></svg>`;
  }
  function platanera(color, nervio) {
    let venas = '';
    for (let y = 370; y > 60; y -= 30) {
      const a = 66 * Math.sin(Math.PI * (420 - y) / 420);
      venas += `<path d="M100 ${y}Q${(100 - a * .5).toFixed(1)} ${y - 16} ${(100 - a).toFixed(1)} ${y - 34}M100 ${y}Q${(100 + a * .5).toFixed(1)} ${y - 16} ${(100 + a).toFixed(1)} ${y - 34}"/>`;
    }
    return `<svg viewBox="0 0 200 420" aria-hidden="true"><path d="M100 420C14 330 16 120 100 6C184 120 186 330 100 420Z" fill="${color}"/><g fill="none" stroke="${nervio}" stroke-width="1.6" opacity=".7">${venas}<path d="M100 420V14" stroke-width="3"/></g></svg>`;
  }
  function templo() {
    let gradas = '';
    for (let i = 0; i < 9; i++) {
      const w = 330 - i * 25, y = 500 - i * 34;
      gradas += `<rect x="${200 - w / 2}" y="${y}" width="${w}" height="30" fill="${i % 2 ? '#1b3a2d' : '#17332a'}"/><rect x="${200 - w / 2}" y="${y}" width="${w}" height="3" fill="#6f7c5f" opacity=".6"/>`;
    }
    let escalones = '';
    for (let y = 240; y < 530; y += 9) escalones += `<rect x="168" y="${y}" width="64" height="2" fill="#8b9173" opacity=".5"/>`;
    return `<svg viewBox="0 0 400 530" aria-hidden="true">${gradas}
      <rect x="164" y="232" width="72" height="298" fill="#274636"/>${escalones}
      <rect x="140" y="150" width="120" height="86" fill="#1b3a2d"/><rect x="132" y="142" width="136" height="12" fill="#6f7c5f" opacity=".75"/>
      <rect x="186" y="186" width="28" height="50" fill="#0d2a21"/><rect class="sv-puerta" x="186" y="186" width="28" height="50" fill="#f4bd62"/>
      <path d="M150 142V96Q152 76 166 72L170 26Q172 8 200 6Q228 8 230 26L234 72Q248 76 250 96V142Z" fill="#17332a"/>
      <path d="M160 112H240M164 92H236M176 54H224" stroke="#6f7c5f" stroke-width="3" opacity=".55"/></svg>`;
  }

  /* ---------- escena de entrada ---------- */
  // x, y = punto donde nace la hoja (% de pantalla) · r = hacia dónde apunta · h = tamaño · d = lado por donde entra
  const HOJAS = [
    { x: -5, y: 26, r: 112, h: 58, d: -1, t: 0, c: 'p', o: 0 },
    { x: 105, y: 22, r: -110, h: 60, d: 1, t: 60, c: 'p', o: 0 },
    { x: 6, y: -8, r: 164, h: 56, d: -1, t: 160, c: 'b', o: 1 },
    { x: 94, y: -8, r: -162, h: 58, d: 1, t: 120, c: 'b', o: 1 },
    { x: -6, y: 66, r: 66, h: 56, d: -1, t: 220, c: 'b', o: 2 },
    { x: 106, y: 68, r: -64, h: 58, d: 1, t: 180, c: 'b', o: 2 },
    { x: 3, y: 108, r: 12, h: 66, d: -1, t: 300, c: 'p', o: 1 },
    { x: 97, y: 108, r: -10, h: 68, d: 1, t: 260, c: 'p', o: 1 },
    { x: 16, y: 110, r: 6, h: 38, d: -1, t: 420, c: 'b', o: 3 },
    { x: 84, y: 110, r: -6, h: 40, d: 1, t: 380, c: 'b', o: 3 }
  ];
  const TONOS = [['#1d5a41', '#7fae76'], ['#174a37', '#5d9368'], ['#256c4b', '#8dbb7f'], ['#103b2d', '#4a7f5b']];

  function montarIntro() {
    const raiz = document.createElement('div');
    raiz.className = 'sv-intro';
    raiz.innerHTML = `
      <div class="sv-escena" aria-hidden="true">
        <div class="sv-cielo"></div><div class="sv-sol"></div>
        <div class="sv-templo">${templo()}</div>
        <div class="sv-bruma"></div><div class="sv-suelo"></div>
      </div>
      ${HOJAS.map((h, i) => {
        const [c, n] = TONOS[h.o];
        return `<div class="sv-hoja" aria-hidden="true" style="--x:${h.x};--y:${h.y};--r:${h.r};--h:${h.h};--d:${h.d};--t:${h.t};--m:${(2.6 + i % 4 * .45).toFixed(2)}">${h.c === 'p' ? palma(c, n) : platanera(c, n)}</div>`;
      }).join('')}
      <div class="sv-titulo"><strong>Tikal</strong><span>El llamado del jaguar</span></div>
      <button type="button" class="sv-saltar">Saltar</button>`;
    document.documentElement.classList.add('sv-bloqueo');
    document.body.appendChild(raiz);

    let cerrando = false;
    const cerrar = () => {
      if (cerrando) return;
      cerrando = true;
      clearTimeout(reloj);
      document.removeEventListener('keydown', tecla);
      raiz.classList.add('sale');
      document.documentElement.classList.remove('sv-bloqueo');
      setTimeout(() => raiz.remove(), SALIDA_MS);
    };
    const tecla = e => { if (e.key === 'Escape') cerrar(); };
    const reloj = setTimeout(cerrar, DURACION_MS);
    raiz.addEventListener('click', cerrar);
    document.addEventListener('keydown', tecla);
  }

  if (!sinMovimiento && !volvioAtras) montarIntro();

  /* ---------- portada de la ficha ---------- */
  document.addEventListener('DOMContentLoaded', () => {
    const heroe = document.querySelector('.detail-hero');
    if (!heroe) return;
    const banda = document.createElement('div');
    banda.className = 'sv-banda';
    banda.innerHTML = `<div class="sv-rama" aria-hidden="true">${palma('#2f6b4f', '#7fae76')}</div><div class="sv-rama dos" aria-hidden="true">${palma('#2f6b4f', '#7fae76')}</div>`;
    heroe.before(banda);
    banda.appendChild(heroe);

    const lista = (clase, datos, etiqueta, tag) => {
      const el = document.createElement(tag);
      el.className = clase;
      el.setAttribute('aria-label', etiqueta);
      el.innerHTML = datos.map(t => `<li>${t}</li>`).join('');
      return el;
    };
    const fecha = document.createElement('p');
    fecha.className = 'sv-fecha';
    fecha.textContent = 'Del viernes 18 de diciembre por la noche al lunes 21 por la mañana';
    heroe.querySelector('h1').after(fecha, lista('sv-ruta', PARADAS, 'Ruta del viaje', 'ol'), lista('sv-incluye', INCLUYE, 'Incluye', 'ul'));
  });
})();
