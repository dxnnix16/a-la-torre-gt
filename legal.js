// ==========================================
// LEGAL — aviso de cookies + enlaces legales en el pie de página.
//
// Para ponerlo en CUALQUIER página basta UNA línea antes de </body>:
//     <script src="legal.js" defer></script>
//
// - Muestra el aviso la primera vez que alguien entra, en cualquier página.
//   Después recuerda la decisión (12 meses) y ya no vuelve a salir.
// - El pie de página recibe los enlaces "Términos", "Privacidad y cookies"
//   y "Configurar cookies" (para que la persona pueda cambiar de opinión).
// - Para cargar algo SOLO si la persona lo aceptó (ej. Google Analytics):
//       if (Legal.permitido('analitica')) { ...cargar el script... }
//       document.addEventListener('legal:cookies', e => { if (e.detail.analitica) {...} });
//
// Si cambias los textos de cookies de forma importante, sube VERSION
// y a todos se les volverá a preguntar.
// ==========================================

const Legal = (() => {
    const CLAVE = 'alt-cookies';
    const VERSION = '1.0';                  // versión del aviso de cookies
    const VERSION_TERMINOS = '0.1';         // versión de los términos y condiciones (súbela cuando los reemplaces)
    const VIGENCIA_MS = 365 * 24 * 60 * 60 * 1000;      // se vuelve a preguntar cada 12 meses
    const PAG_TERMINOS = 'terminos.html';
    const PAG_PRIVACIDAD = 'privacidad.html';

    let el = null;

    // ---------- Guardar / leer la decisión ----------
    function leer() {
        try {
            const d = JSON.parse(localStorage.getItem(CLAVE));
            if (!d || d.version !== VERSION || Date.now() - d.fecha > VIGENCIA_MS) return null;
            return d;
        } catch (e) { return null; }
    }
    function guardar(cats) {
        const d = { version: VERSION, fecha: Date.now(), cats: { necesarias: true, analitica: !!cats.analitica, marketing: !!cats.marketing } };
        try { localStorage.setItem(CLAVE, JSON.stringify(d)); } catch (e) { /* modo privado: se preguntará de nuevo */ }
        document.dispatchEvent(new CustomEvent('legal:cookies', { detail: d.cats }));
        cerrar();
    }
    const permitido = cat => cat === 'necesarias' || !!(leer() && leer().cats[cat]);

    // ---------- Aviso ----------
    function cerrar() {
        if (!el) return;
        const e = el; el = null;
        e.classList.remove('ver');
        setTimeout(() => e.remove(), 300);
    }

    function abrir(modoConfig) {
        if (el) el.remove();
        const actual = (leer() && leer().cats) || { analitica: false, marketing: false };
        el = document.createElement('div');
        el.className = 'lg-cookies';
        el.setAttribute('role', 'region');
        el.setAttribute('aria-label', 'Aviso de cookies');
        el.innerHTML = `
            <div class="lgk-card">
                <div class="lg-vista" data-vista="resumen">
                    <div class="lg-texto">
                        <h2><span class="lg-ico">🍪</span> Tu privacidad importa</h2>
                        <p>Usamos cookies y almacenamiento local para que el sitio funcione (moneda, búsquedas recientes, tu reserva) y, si nos lo permites, para medir visitas y mejorar tu experiencia. Más en nuestra <a href="${PAG_PRIVACIDAD}#cookies">política de cookies</a> y los <a href="${PAG_TERMINOS}">términos y condiciones</a>.</p>
                    </div>
                    <div class="lg-botones">
                        <button type="button" class="lg-btn lg-btn--primario" data-acc="todas">Aceptar todas</button>
                        <button type="button" class="lg-btn" data-acc="necesarias">Solo necesarias</button>
                        <button type="button" class="lgk-link" data-acc="config">Configurar</button>
                    </div>
                </div>
                <div class="lg-vista" data-vista="config" hidden>
                    <h2>Configurar cookies</h2>
                    ${fila('necesarias', 'Necesarias', 'Hacen que el sitio funcione: recordar tu moneda, tus búsquedas recientes y los datos de tu reserva mientras la completas. Siempre activas.', true, true)}
                    ${fila('analitica', 'Analíticas', 'Nos dicen cuántas personas visitan cada página para mejorar el sitio. Son datos agregados.', actual.analitica, false)}
                    ${fila('marketing', 'Publicidad', 'Permiten mostrarte anuncios de A La Torre GT en otros sitios y redes sociales.', actual.marketing, false)}
                    <div class="lg-botones">
                        <button type="button" class="lg-btn lg-btn--primario" data-acc="guardar">Guardar selección</button>
                        <button type="button" class="lgk-link" data-acc="volver">${leer() ? 'Cancelar' : 'Volver'}</button>
                    </div>
                </div>
            </div>`;
        document.body.appendChild(el);
        if (modoConfig) mostrarVista('config');
        requestAnimationFrame(() => el && el.classList.add('ver'));

        el.addEventListener('click', e => {
            const b = e.target.closest('[data-acc]'); if (!b) return;
            const a = b.dataset.acc;
            if (a === 'todas') guardar({ analitica: true, marketing: true });
            else if (a === 'necesarias') guardar({});
            else if (a === 'config') mostrarVista('config');
            else if (a === 'volver') { if (leer()) cerrar(); else mostrarVista('resumen'); }
            else if (a === 'guardar') guardar({ analitica: el.querySelector('#lg-analitica').checked, marketing: el.querySelector('#lg-marketing').checked });
        });
        const primero = el.querySelector(modoConfig ? '[data-acc="guardar"]' : '[data-acc="todas"]');
        if (primero && modoConfig) primero.focus({ preventScroll: true });
    }
    function mostrarVista(v) {
        el.querySelectorAll('.lg-vista').forEach(x => { x.hidden = x.dataset.vista !== v; });
    }
    function fila(id, titulo, texto, activo, fijo) {
        return `<label class="lgk-fila${fijo ? ' fijo' : ''}">
            <span><strong>${titulo}</strong><small>${texto}</small></span>
            <input type="checkbox" id="lg-${id}" ${activo ? 'checked' : ''} ${fijo ? 'checked disabled' : ''}>
            <i class="lg-switch" aria-hidden="true"></i>
        </label>`;
    }

    // ---------- Enlaces en el pie de página ----------
    function pie() {
        const fb = document.querySelector('.footer-bottom');
        if (!fb || fb.querySelector('.lg-links')) return;
        const p = document.createElement('p');
        p.className = 'lg-links';
        p.innerHTML = `<a href="${PAG_TERMINOS}">Términos y condiciones</a><span>·</span><a href="${PAG_PRIVACIDAD}">Privacidad y cookies</a><span>·</span><button type="button" data-lg-abrir>Configurar cookies</button>`;
        fb.appendChild(p);
        p.querySelector('[data-lg-abrir]').addEventListener('click', () => abrir(true));
    }

    // ---------- Estilos (van aquí para no depender de otro archivo) ----------
    function estilos() {
        if (document.getElementById('lg-estilos')) return;
        const s = document.createElement('style');
        s.id = 'lg-estilos';
        s.textContent = `
        .lg-cookies{position:fixed;left:16px;bottom:16px;z-index:4000;width:min(440px,calc(100vw - 32px));opacity:0;transform:translateY(20px);transition:opacity .3s,transform .35s cubic-bezier(.2,.8,.2,1);font-family:'Poppins',system-ui,sans-serif;color:#1a1b26}
        .lg-cookies.ver{opacity:1;transform:none}
        .lgk-card{background:#fff;border-radius:20px;padding:20px;box-shadow:0 18px 60px rgba(0,0,0,.28);border:1px solid #eee;max-height:calc(100dvh - 32px);overflow-y:auto}
        .lgk-card h2{font-size:1.05rem;font-weight:800;margin:0 0 8px}
        .lgk-card p{font-size:.82rem;line-height:1.55;color:#555;margin:0 0 14px}
        .lgk-card a{color:#1a1b26;font-weight:600}
        .lgk-card [hidden]{display:none}
        .lg-botones{display:flex;flex-wrap:wrap;align-items:center;gap:10px}
        .lg-btn{border:1.5px solid #d9d9e0;background:#fff;color:#1a1b26;border-radius:50px;padding:11px 18px;font:600 .82rem 'Poppins',sans-serif;cursor:pointer;transition:.2s}
        .lg-btn:hover{border-color:#1a1b26}
        .lg-btn--primario{border:0;background:linear-gradient(90deg,#ff4500,#ffcc00);box-shadow:0 6px 14px rgba(255,69,0,.28)}
        .lg-btn--primario:hover{box-shadow:0 8px 18px rgba(255,69,0,.4)}
        .lgk-link{border:0;background:none;padding:8px 4px;font:600 .82rem 'Poppins',sans-serif;color:#1a1b26;text-decoration:underline;cursor:pointer}
        .lg-cookies button:focus-visible,.lg-cookies a:focus-visible{outline:3px solid rgba(255,69,0,.4);outline-offset:2px}
        .lgk-fila{position:relative;display:flex;align-items:center;gap:14px;padding:12px 0;border-bottom:1px solid #f0f0f3;cursor:pointer}
        .lgk-fila.fijo{cursor:default}
        .lgk-fila span{flex:1}
        .lgk-fila strong{display:block;font-size:.88rem}
        .lgk-fila small{display:block;font-size:.76rem;line-height:1.45;color:#777;margin-top:2px}
        .lgk-fila input{position:absolute;opacity:0;pointer-events:none}
        .lg-switch{flex:none;width:44px;height:26px;border-radius:26px;background:#d6d6dd;position:relative;transition:.25s}
        .lg-switch::after{content:'';position:absolute;top:3px;left:3px;width:20px;height:20px;border-radius:50%;background:#fff;box-shadow:0 1px 4px rgba(0,0,0,.25);transition:.25s}
        .lgk-fila input:checked + .lg-switch{background:#ff4500}
        .lgk-fila input:checked + .lg-switch::after{transform:translateX(18px)}
        .lgk-fila.fijo .lg-switch{opacity:.55}
        .lgk-fila input:focus-visible + .lg-switch{outline:3px solid rgba(255,69,0,.4);outline-offset:2px}
        .lgk-card .lg-botones{margin-top:14px}
        .lg-links{margin-top:6px;font-size:.82rem;display:flex;flex-wrap:wrap;gap:8px;justify-content:center}
        .lg-links a,.lg-links button{color:inherit;opacity:.85;text-decoration:underline;background:none;border:0;padding:0;font:inherit;cursor:pointer}
        .lg-links a:hover,.lg-links button:hover{opacity:1}
        /* ===== SOLO ESCRITORIO (601px en adelante): barra ancha pegada abajo ===== */
        @media (min-width:601px){
            /* Barra flotante centrada, con entrada suave desde abajo */
            .lg-cookies{left:50%;right:auto;bottom:22px;width:min(1080px,calc(100vw - 48px));transform:translate(-50%,36px)}
            .lg-cookies.ver{transform:translate(-50%,0)}
            .lg-cookies .lgk-card{display:block;width:auto;height:auto;margin:0;box-sizing:border-box;position:relative;overflow-x:hidden;overflow-y:auto;max-height:80dvh;padding:24px 30px 22px;background:#fff;border:1px solid #eee;border-radius:22px;transform:none;box-shadow:0 20px 60px rgba(26,27,38,.28),0 2px 8px rgba(26,27,38,.08)}
            /* Línea de color animada arriba */
            .lg-cookies .lgk-card::before{content:'';position:absolute;left:0;right:0;top:0;height:4px;background:linear-gradient(90deg,#ff4500,#ffcc00,#ff4500);background-size:200% 100%;animation:lgFlujo 5s linear infinite}
            .lg-cookies .lg-vista{width:100%;max-width:none}
            .lg-cookies .lg-vista[data-vista="resumen"]:not([hidden]){display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:center;column-gap:36px}
            .lg-cookies .lg-texto{min-width:0;width:auto;max-width:none}
            .lg-cookies .lg-texto h2{display:flex;align-items:center;gap:10px;font-size:1.12rem;margin:0 0 6px}
            .lg-cookies .lg-ico{display:inline-block;font-size:1.5rem;line-height:1;transform-origin:50% 80%;animation:lgGalleta 3.2s ease-in-out 1s infinite}
            .lg-cookies .lg-texto p{width:auto;max-width:640px;margin:0;font-size:.86rem;line-height:1.6}
            .lg-cookies .lg-vista[data-vista="resumen"] .lg-botones{flex-wrap:nowrap;margin:0;gap:12px;white-space:nowrap}
            .lg-cookies .lg-btn{padding:12px 22px;font-size:.85rem}
            .lg-cookies .lg-btn:hover{transform:translateY(-2px)}
            .lg-cookies .lg-btn--primario{animation:lgLatido 2.8s ease-in-out 1.5s infinite}
            .lg-cookies .lg-btn--primario:hover{animation:none;box-shadow:0 10px 22px rgba(255,69,0,.45)}
            .lg-cookies .lg-vista[data-vista="config"]{max-width:620px;margin:0 auto}
            @keyframes lgFlujo{to{background-position:200% 0}}
            @keyframes lgGalleta{0%,70%,100%{transform:rotate(0)}76%{transform:rotate(-14deg)}84%{transform:rotate(12deg)}92%{transform:rotate(-6deg)}}
            @keyframes lgLatido{0%,100%{box-shadow:0 6px 14px rgba(255,69,0,.28)}50%{box-shadow:0 6px 24px rgba(255,69,0,.55)}}
        }
        @media (min-width:601px) and (max-width:860px){
            .lg-cookies .lg-vista[data-vista="resumen"]:not([hidden]){grid-template-columns:1fr;row-gap:16px}
        }
        @media (min-width:601px) and (prefers-reduced-motion:reduce){
            .lg-cookies .lgk-card::before,.lg-cookies .lg-ico,.lg-cookies .lg-btn--primario{animation:none}
        }
        @media (max-width:600px){
            .lg-cookies{left:0;right:0;bottom:0;width:100%}
            .lgk-card{border-radius:20px 20px 0 0;padding:18px 18px calc(18px + env(safe-area-inset-bottom,0px))}
            .lg-btn{flex:1 1 auto;text-align:center;padding:10px 14px}
            .lgk-link{flex:1 1 100%;text-align:center}
            .lgk-card h2{font-size:.98rem}
            .lgk-card p{font-size:.78rem;line-height:1.5;margin-bottom:12px}
            .lgk-card{max-height:75dvh}
        }
        @media (prefers-reduced-motion:reduce){.lg-cookies,.lg-switch,.lg-switch::after{transition:none}}`;
        document.head.appendChild(s);
    }

    // ---------- Aceptación de términos (para usar al reservar) ----------
    // Devuelve algo como { version: '0.1', fecha: '2026-10-07T15:04:05.000Z' }
    // Inclúyelo en los datos de la reserva para tener constancia de qué versión aceptó la persona.
    const aceptacion = () => ({ version: VERSION_TERMINOS, fecha: new Date().toISOString() });

    // Rellena cualquier <span data-legal-version="terminos|cookies"> con la versión vigente
    function versiones() {
        document.querySelectorAll('[data-legal-version]').forEach(n => {
            n.textContent = n.dataset.legalVersion === 'cookies' ? VERSION : VERSION_TERMINOS;
        });
    }

    function iniciar() {
        estilos();
        pie();
        versiones();
        if (!leer()) abrir(false);                       // solo pregunta si aún no hay decisión vigente
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar);
    else iniciar();

    return { permitido, abrir: () => abrir(true), aceptacion, version: VERSION, terminos: VERSION_TERMINOS };
})();