/* =========================================================
   COMUN · A La Torre GT
   Se carga en TODAS las páginas con una sola línea en el <head>:
       <script src="comun.js" defer></script>
   Hace dos cosas:
     1) Barrita de lava de carga (la de Destinos) en todas las pestañas
     2) Reemplaza lo de arriba a la derecha (buscador + "Reservar ahora")
        por: selector de idioma/moneda + Ingresar (login) — solo diseño
   Los estilos viven en comun.css (este archivo lo carga solo).
   ========================================================= */
(function () {
  'use strict';

  /* ---------- ajustes que puedes tocar ---------- */
  const CARGA_MIN_MS = 700;   // cuánto se ve la barra al abrir una página

  const IDIOMAS = [
    { cod: 'es', corto: 'ES', nombre: 'Español',   bandera: '🇪🇸' },
    { cod: 'en', corto: 'EN', nombre: 'English',   bandera: '🇺🇸' },
    { cod: 'fr', corto: 'FR', nombre: 'Français',  bandera: '🇫🇷' },
    { cod: 'de', corto: 'DE', nombre: 'Deutsch',   bandera: '🇩🇪' },
    { cod: 'pt', corto: 'PT', nombre: 'Português', bandera: '🇧🇷' },
    { cod: 'it', corto: 'IT', nombre: 'Italiano',  bandera: '🇮🇹' },
    { cod: 'cak', corto: 'CAK', nombre: 'Kaqchikel', bandera: '🇬🇹' }
  ];

  const sinMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  /* ---------- cargar comun.css automáticamente ---------- */
  const yo = document.currentScript;
  const base = yo && yo.src ? yo.src.replace(/[^/]*$/, '') : '';
  if (!document.querySelector('link[href*="comun.css"]')) {
    const css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = base + 'comun.css';
    document.head.appendChild(css);
  }

  // Menú de las tres rayitas (celular): se carga solo en TODAS las páginas que tengan comun.js
  if (!document.querySelector('script[src*="menu-movil.js"]')) {
    const mm = document.createElement('script');
    mm.src = base + 'menu-movil.js';
    mm.defer = true;
    document.head.appendChild(mm);
  }

  /* =========================================================
     1) BARRITA DE LAVA DE CARGA
     ========================================================= */
  // En Destinos ya existe la suya (#dsProgreso) y la controla destinos.js
  let barra = document.getElementById('dsProgreso');
  const propia = !barra;
  if (propia) {
    barra = document.createElement('div');
    barra.className = 'ds-progreso';
    barra.setAttribute('aria-hidden', 'true');
    barra.innerHTML = '<span></span>';
    document.body.prepend(barra);
  }

  if (propia && !sinMovimiento) {
    barra.classList.add('activo');
    const inicio = performance.now();
    const quitar = () => setTimeout(() => barra.classList.remove('activo'), Math.max(0, CARGA_MIN_MS - (performance.now() - inicio)));
    if (document.readyState === 'complete') quitar();
    else window.addEventListener('load', quitar, { once: true });
  }

  // Al pasar de una pestaña a otra la barra vuelve a correr hasta que abre la nueva
  document.addEventListener('click', e => {
    if (sinMovimiento || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = e.target.closest('a[href]');
    if (!a || a.target === '_blank' || a.hasAttribute('download')) return;
    const href = a.getAttribute('href');
    if (!href || href.startsWith('#') || /^(mailto:|tel:|javascript:)/i.test(href)) return;
    let url;
    try { url = new URL(a.href, location.href); } catch (err) { return; }
    if (url.origin !== location.origin && url.protocol !== 'file:') return;
    if (url.pathname === location.pathname && url.search === location.search) return;
    barra.classList.add('activo');
  });
  // Si el usuario regresa con la flecha del navegador, la barra no se queda pegada
  window.addEventListener('pageshow', e => { if (e.persisted && propia) barra.classList.remove('activo'); });

  /* =========================================================
     2) IDIOMA + MONEDA + LOGIN (solo diseño por ahora)
     ========================================================= */
  function iniciarCuenta() {
  const MONEDAS = window.Moneda.LISTA;   // la lista y las tasas viven en moneda.js

  const cont = document.querySelector('.nav-actions');
  if (!cont) return;

  const guardado = (() => { try { return JSON.parse(localStorage.getItem('prefs') || '{}'); } catch (e) { return {}; } })();
  const prefs = {
    lang: IDIOMAS.some(i => i.cod === guardado.lang) ? guardado.lang : 'es',
    mon: window.Moneda.actual()
  };
  const guardarPrefs = () => { try { localStorage.setItem('prefs', JSON.stringify(prefs)); } catch (e) { /* sin almacenamiento */ } };

  const ICONO_GLOBO = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.8 3 2.8 15 0 18M12 3c-2.8 3-2.8 15 0 18"/></svg>';
  const ICONO_USER = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"/></svg>';
  const CHECK = '<svg class="np-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12 5 5 9-10"/></svg>';

  cont.classList.add('nav-actions--cuenta');
  cont.innerHTML = `
    <div class="np-wrap" id="npWrap">
      <button type="button" class="np-btn" id="npBtn" aria-haspopup="true" aria-expanded="false" aria-label="Idioma y moneda" data-i18n-attr="aria-label:comun.panel.titulo">
        ${ICONO_GLOBO}<span id="npResumen"></span>
        <svg class="np-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
      </button>
      <div class="np-panel" id="npPanel" role="dialog" aria-label="Idioma y moneda" data-i18n-attr="aria-label:comun.panel.titulo">
        <div class="np-tabs" role="tablist">
          <button type="button" class="np-tab activo" data-tab="idioma" role="tab" data-i18n="comun.panel.idioma">Idioma</button>
          <button type="button" class="np-tab" data-tab="moneda" role="tab" data-i18n="comun.panel.moneda">Moneda</button>
          <span class="np-tab-barra"></span>
        </div>
        <div class="np-lista" id="npIdioma" role="tabpanel">
          ${IDIOMAS.map(i => `<button type="button" class="np-opt" data-lang="${i.cod}"><span class="np-flag">${i.bandera}</span><span class="np-txt"><b>${esc(i.nombre)}</b><small>${i.corto}</small></span>${CHECK}</button>`).join('')}
        </div>
        <div class="np-lista" id="npMoneda" role="tabpanel" hidden>
          ${MONEDAS.map(m => `<button type="button" class="np-opt" data-mon="${m.cod}"><span class="np-flag">${m.bandera}</span><span class="np-txt"><b>${m.cod} · ${esc(m.simbolo)}</b><small>${esc(m.nombre)}</small></span>${CHECK}</button>`).join('')}
        </div>
        <p class="np-nota" data-i18n="comun.panel.nota">Los precios se mostrarán en la moneda que elijas.</p>
      </div>
    </div>
    <button type="button" class="btn-book nav-login" id="npLogin">${ICONO_USER}<span data-i18n="comun.login.ingresar">Ingresar</span></button>`;

  if (window.I18n) window.I18n.aplicar(cont);

  const wrap = document.getElementById('npWrap');
  const btn = document.getElementById('npBtn');
  const panel = document.getElementById('npPanel');
  const resumen = document.getElementById('npResumen');

  function pintarPrefs() {
    const i = IDIOMAS.find(x => x.cod === prefs.lang);
    resumen.textContent = `${i.corto} · ${prefs.mon}`;
    panel.querySelectorAll('[data-lang]').forEach(b => b.classList.toggle('activo', b.dataset.lang === prefs.lang));
    panel.querySelectorAll('[data-mon]').forEach(b => b.classList.toggle('activo', b.dataset.mon === prefs.mon));
  }
  const esMovil = () => window.matchMedia('(max-width: 768px)').matches;
  let yAlAbrir = 0;
  function abrirPanel(abrir) {
    if (abrir && esMovil()) {
      // en el celular el panel va fijo y centrado en la pantalla, justo debajo del botón
      panel.style.setProperty('--np-top', Math.round(btn.getBoundingClientRect().bottom + 10) + 'px');
      yAlAbrir = window.scrollY;
    }
    wrap.classList.toggle('abierto', abrir);
    btn.setAttribute('aria-expanded', String(abrir));
  }
  // si la página se mueve mucho con el panel abierto, se cierra (así nunca queda flotando fuera de lugar)
  window.addEventListener('scroll', () => {
    if (esMovil() && wrap.classList.contains('abierto') && Math.abs(window.scrollY - yAlAbrir) > 24) abrirPanel(false);
  }, { passive: true });
  window.addEventListener('resize', () => { if (wrap.classList.contains('abierto')) abrirPanel(false); });
  btn.addEventListener('click', e => { e.stopPropagation(); abrirPanel(!wrap.classList.contains('abierto')); });
  panel.addEventListener('click', e => e.stopPropagation());
  document.addEventListener('click', () => abrirPanel(false));

  panel.querySelectorAll('.np-tab').forEach(t => t.addEventListener('click', () => {
    panel.querySelectorAll('.np-tab').forEach(x => x.classList.toggle('activo', x === t));
    panel.querySelector('.np-tabs').dataset.activa = t.dataset.tab;
    document.getElementById('npIdioma').hidden = t.dataset.tab !== 'idioma';
    document.getElementById('npMoneda').hidden = t.dataset.tab !== 'moneda';
  }));

  panel.addEventListener('click', e => {
    const o = e.target.closest('.np-opt');
    if (!o) return;
    if (o.dataset.lang) prefs.lang = o.dataset.lang;
    if (o.dataset.mon) { prefs.mon = o.dataset.mon; window.Moneda.set(prefs.mon); }
    guardarPrefs();
    pintarPrefs();
    document.documentElement.lang = prefs.lang;
    // Aviso para cuando conectes la traducción y la conversión de precios:
    // window.addEventListener('preferencias', e => console.log(e.detail));
    window.dispatchEvent(new CustomEvent('preferencias', { detail: { ...prefs } }));
  });
  pintarPrefs();

  /* ---------- ventana de login ---------- */
  const modal = document.createElement('div');
  modal.className = 'lg-overlay';
  modal.id = 'lgOverlay';
  modal.hidden = true;
  modal.innerHTML = `
    <div class="lg-card" role="dialog" aria-modal="true" aria-labelledby="lgTitulo">
     <div class="lg-int">
      <button type="button" class="lg-cerrar" id="lgCerrar" aria-label="Cerrar" data-i18n-attr="aria-label:comun.login.cerrar">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>
      </button>

      <aside class="lg-lado" aria-hidden="true">
        <span class="lg-orbe"></span><span class="lg-orbe"></span>
        <!-- escena: volcán al atardecer con ríos de lava -->
        <svg class="lg-escena" viewBox="0 0 400 600" preserveAspectRatio="xMidYMax slice" focusable="false">
          <defs>
            <radialGradient id="lgBrillo" cx="50%" cy="50%" r="50%">
              <stop offset="0" stop-color="#ffcc00" stop-opacity=".95"/>
              <stop offset=".35" stop-color="#ff6a00" stop-opacity=".55"/>
              <stop offset="1" stop-color="#ff4500" stop-opacity="0"/>
            </radialGradient>
            <linearGradient id="lgLava" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stop-color="#ffe066"/>
              <stop offset=".45" stop-color="#ff5a14"/>
              <stop offset="1" stop-color="#8b0000" stop-opacity=".2"/>
            </linearGradient>
            <linearGradient id="lgLadera" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stop-color="#3a1710"/>
              <stop offset="1" stop-color="#120a0d"/>
            </linearGradient>
          </defs>
          <g fill="#fff">
            <circle class="lg-est" cx="48" cy="60" r="1.3"/><circle class="lg-est" cx="120" cy="34" r=".9"/>
            <circle class="lg-est" cx="190" cy="82" r="1.1"/><circle class="lg-est" cx="262" cy="46" r="1.4"/>
            <circle class="lg-est" cx="330" cy="92" r=".9"/><circle class="lg-est" cx="372" cy="40" r="1.2"/>
            <circle class="lg-est" cx="86" cy="130" r=".8"/><circle class="lg-est" cx="300" cy="150" r="1"/>
            <circle class="lg-est" cx="22" cy="176" r="1"/><circle class="lg-est" cx="226" cy="132" r=".8"/>
          </g>
          <circle cx="200" cy="262" r="150" fill="url(#lgBrillo)" opacity=".55"/>
          <path d="M0 430 L62 352 L112 398 L172 318 L236 402 L296 340 L352 404 L400 372 L400 600 L0 600Z" fill="#241012"/>
          <path d="M40 600 L142 336 Q172 286 188 268 L212 268 Q228 286 258 336 L360 600Z" fill="url(#lgLadera)"/>
          <path d="M174 270 Q200 258 226 270 Q200 280 174 270Z" fill="#ffb300"/>
          <path d="M184 270 Q200 262 216 270 Q200 276 184 270Z" fill="#fff3b0"/>
          <g fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path d="M195 272 L186 298 L190 318 L172 350 L178 372 L152 420 L158 442 L132 500" stroke="#ff5a14" stroke-opacity=".26" stroke-width="10"/>
            <path d="M195 272 L186 298 L190 318 L172 350 L178 372 L152 420 L158 442 L132 500" stroke="url(#lgLava)" stroke-width="3"/>
            <path d="M205 272 L216 296 L210 320 L232 352 L226 376 L254 424 L248 446 L276 504" stroke="#ff5a14" stroke-opacity=".24" stroke-width="9"/>
            <path d="M205 272 L216 296 L210 320 L232 352 L226 376 L254 424 L248 446 L276 504" stroke="url(#lgLava)" stroke-width="2.6"/>
            <path d="M178 372 L196 392 L190 420 M226 376 L212 398 L216 428" stroke="url(#lgLava)" stroke-width="1.6" stroke-opacity=".8"/>
          </g>          <path d="M0 548 Q58 506 122 534 T246 524 T400 512 L400 600 L0 600Z" fill="#0b0a10"/>
        </svg>
        <span class="lg-brasa"></span><span class="lg-brasa"></span><span class="lg-brasa"></span><span class="lg-brasa"></span>
        <span class="lg-brasa"></span><span class="lg-brasa"></span><span class="lg-brasa"></span><span class="lg-brasa"></span>
        <span class="lg-brasa"></span><span class="lg-brasa"></span><span class="lg-brasa"></span><span class="lg-brasa"></span>

        <div class="lg-marca">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 20 9 7l4 6 3-4 6 11z" fill="#fff"/></svg>
          <b>A La Torre GT</b>
        </div>
        <div class="lg-lado-txt">
          <h3 data-i18n="comun.login.lado_titulo">Tu próxima cumbre te espera</h3>
          <ul>
            <li data-i18n="comun.login.lado_1">Guarda tus destinos favoritos</li>
            <li data-i18n="comun.login.lado_2">Reserva más rápido, sin repetir datos</li>
            <li data-i18n="comun.login.lado_3">Consulta tu historial de expediciones</li>
          </ul>
        </div>
      </aside>

      <div class="lg-form-wrap">
        <div class="lg-tabs" role="tablist">
          <button type="button" class="lg-tab activo" data-modo="entrar" role="tab" data-i18n="comun.login.ingresar">Ingresar</button>
          <button type="button" class="lg-tab" data-modo="crear" role="tab" data-i18n="comun.login.tab_crear">Crear cuenta</button>
          <span class="lg-tab-barra"></span>
        </div>

        <h2 id="lgTitulo" data-i18n="comun.login.titulo_entrar">Bienvenido de vuelta</h2>
        <p class="lg-sub" id="lgSub" data-i18n="comun.login.sub_entrar">Ingresa para ver tus reservas y favoritos.</p>

        <button type="button" class="lg-google" data-i18n="comun.login.google">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M22.5 12.2c0-.8-.1-1.5-.2-2.2H12v4.3h5.9a5 5 0 0 1-2.2 3.3v2.7h3.5c2.1-1.9 3.3-4.7 3.3-8.1z"/><path fill="#34A853" d="M12 23c3 0 5.5-1 7.3-2.7l-3.5-2.7c-1 .7-2.2 1.1-3.8 1.1-2.9 0-5.4-2-6.3-4.6H2.1v2.8A11 11 0 0 0 12 23z"/><path fill="#FBBC05" d="M5.7 14.1a6.6 6.6 0 0 1 0-4.2V7.1H2.1a11 11 0 0 0 0 9.8l3.6-2.8z"/><path fill="#EA4335" d="M12 5.4c1.6 0 3.1.6 4.3 1.7l3.2-3.2A11 11 0 0 0 2.1 7.1l3.6 2.8C6.6 7.400 9.100 5.400 12 5.400z"/></svg>
          Continuar con Google
        </button>
        <div class="lg-o"><span data-i18n="comun.login.o_correo">o con tu correo</span></div>

        <form class="lg-form" id="lgForm" novalidate>
          <label class="lg-campo lg-solo-crear" hidden>
            <span data-i18n="comun.login.nombre">Nombre completo</span>
            <div class="lg-in">
              <svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"/></svg>
              <input type="text" id="lgNombre" placeholder="Tu nombre" data-i18n-attr="placeholder:comun.login.nombre_ph" autocomplete="name">
            </div>
          </label>
          <label class="lg-campo">
            <span data-i18n="comun.login.correo">Correo electrónico</span>
            <div class="lg-in">
              <svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 8 8 6 8-6"/></svg>
              <input type="email" id="lgCorreo" placeholder="tucorreo@ejemplo.com" autocomplete="email">
            </div>
          </label>
          <label class="lg-campo">
            <span data-i18n="comun.login.pass">Contraseña</span>
            <div class="lg-pass lg-in">
              <svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="10" width="16" height="11" rx="3"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>
              <input type="password" id="lgPass" placeholder="••••••••" autocomplete="current-password">
              <button type="button" class="lg-ojo" id="lgOjo" aria-label="Mostrar contraseña" data-i18n-attr="aria-label:comun.login.ver_pass">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12s3.600-7 10-7 10 7 10 7-3.600 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>
              </button>
            </div>
          </label>
          <div class="lg-fila lg-solo-entrar">
            <label class="lg-check" data-i18n="comun.login.recordarme"><input type="checkbox" checked><i></i>Recordarme</label>
            <a href="#" class="lg-link" data-i18n="comun.login.olvido">¿Olvidaste tu contraseña?</a>
          </div>
          <button type="submit" class="lg-enviar" id="lgEnviar"><span data-i18n="comun.login.ingresar">Ingresar</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button>
          <p class="lg-aviso" id="lgAviso" role="status" aria-live="polite"></p>
        </form>
      </div>
     </div>
    </div>`;
  document.body.appendChild(modal);
  if (window.I18n) window.I18n.aplicar(modal);

  const lgSub = document.getElementById('lgSub');
  const lgTitulo = document.getElementById('lgTitulo');
  const lgEnviar = document.getElementById('lgEnviar');
  const lgAviso = document.getElementById('lgAviso');
  // Pone un texto traducible (queda marcado para que cambie si cambian el idioma)
  const T = (clave, es) => (window.I18n ? window.I18n.t(clave) : es);
  const ponerTxt = (el, clave, es) => { el.dataset.i18n = clave; el.textContent = T(clave, es); };
  const limpiarAviso = () => { lgAviso.removeAttribute('data-i18n'); lgAviso.textContent = ''; };
  const lgPass = document.getElementById('lgPass');
  let ultimoFoco = null;

  function abrirModal() {
    ultimoFoco = document.activeElement;
    abrirPanel(false);
    modal.hidden = false;
    requestAnimationFrame(() => modal.classList.add('visible'));
    document.body.classList.add('lg-bloqueado');
    setTimeout(() => document.getElementById('lgCorreo').focus(), 250);
  }
  function cerrarModal() {
    modal.classList.remove('visible');
    document.body.classList.remove('lg-bloqueado');
    setTimeout(() => { modal.hidden = true; }, sinMovimiento ? 0 : 300);
    if (ultimoFoco) ultimoFoco.focus();
  }
  document.getElementById('npLogin').addEventListener('click', abrirModal);
  document.getElementById('lgCerrar').addEventListener('click', cerrarModal);
  modal.addEventListener('click', e => { if (e.target === modal) cerrarModal(); });
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    if (!modal.hidden) cerrarModal();
    abrirPanel(false);
  });

  function cambiarModo(modo) {
    const crear = modo === 'crear';
    modal.querySelectorAll('.lg-tab').forEach(t => t.classList.toggle('activo', t.dataset.modo === modo));
    modal.querySelector('.lg-tabs').dataset.activa = modo;
    modal.querySelectorAll('.lg-solo-crear').forEach(el => { el.hidden = !crear; });
    modal.querySelectorAll('.lg-solo-entrar').forEach(el => { el.hidden = crear; });
    ponerTxt(lgTitulo, crear ? 'comun.login.titulo_crear' : 'comun.login.titulo_entrar', crear ? 'Crea tu cuenta' : 'Bienvenido de vuelta');
    ponerTxt(lgSub, crear ? 'comun.login.sub_crear' : 'comun.login.sub_entrar', crear ? 'Guarda tus datos y reserva tu próxima expedición en segundos.' : 'Ingresa para ver tus reservas y favoritos.');
    ponerTxt(lgEnviar.firstElementChild, crear ? 'comun.login.tab_crear' : 'comun.login.ingresar', crear ? 'Crear cuenta' : 'Ingresar');
    lgPass.autocomplete = crear ? 'new-password' : 'current-password';
    limpiarAviso();
  }
  modal.querySelectorAll('.lg-tab').forEach(t => t.addEventListener('click', () => cambiarModo(t.dataset.modo)));

  document.getElementById('lgOjo').addEventListener('click', e => {
    const ver = lgPass.type === 'password';
    lgPass.type = ver ? 'text' : 'password';
    e.currentTarget.classList.toggle('activo', ver);
  });

  // Todavía sin servidor: solo muestra el estado de "cargando" y un aviso
  document.getElementById('lgForm').addEventListener('submit', e => {
    e.preventDefault();
    limpiarAviso();
    lgEnviar.classList.add('cargando');
    setTimeout(() => {
      lgEnviar.classList.remove('cargando');
      ponerTxt(lgAviso, 'comun.login.aviso', 'Diseño listo ✓ — el inicio de sesión real se conectará pronto.');
    }, sinMovimiento ? 0 : 1100);
  });
  }   // fin de iniciarCuenta

  // moneda.js: si la página ya lo trae en el <head> se usa; si no, comun.js lo carga solo.
  // Si el archivo no existe, el resto (barra de lava, tres rayitas) sigue funcionando igual.
  if (window.Moneda) {
    iniciarCuenta();
  } else {
    const mon = document.createElement('script');
    mon.src = base + 'moneda.js';
    mon.onload = iniciarCuenta;
    mon.onerror = () => console.warn('No se encontró moneda.js: ponlo en la misma carpeta que comun.js');
    document.head.appendChild(mon);
  }
})();


