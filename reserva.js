// ==========================================
// RESERVA — la parte visual del flujo de reserva:
//   1) campos Fecha y Participantes en la caja de precio
//   2) calendario (hoja inferior en celular, ventana centrada en computadora)
//   3) "Ver disponibilidad": carga → carrusel de ofertas
//   4) Tus datos → Pago → Comprobante, con barra de progreso y resumen
//
// Depende de: ofertas.js (lógica), proveedores-data.js (datos) y, si existe, moneda.js.
// No hay datos de proveedores aquí: todo sale de proveedores-data.js.
// ==========================================

const Reserva = (() => {
    const O = Ofertas;
    let cfg = null;                              // lo que nos pasa detalle.js (ver iniciar)
    const est = { fecha: '', personas: 1, cupon: null };   // fecha elegida (tour privado), participantes y cupón aplicado
    let unitario = null;                         // precio por persona de lo que está elegido en la caja (lo manda detalle.js)
    const MAX_PERSONAS = 12;
    const MIN_CARGA_MS = 1100;                   // la animación de "cargando" dura al menos esto

    // ---------- Utilidades ----------
    const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    const crear = html => { const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstElementChild; };
    const fmt = n => (window.Moneda && Moneda.formatear) ? Moneda.formatear(n) : O.Q(n);
    const precio = (n, tag = 'strong') => `<${tag} data-gtq="${n}">${fmt(n)}</${tag}>`;   // se convierte con el selector de moneda
    const nombreCorto = d => d.nombre.split(':')[0].trim();
    const iniciales = n => n.trim().split(/\s+/).slice(0, 2).map(w => w[0]).join('').toUpperCase();   // "A La Torre GT" → "AL"
    const pausa = ms => new Promise(r => setTimeout(r, ms));
    const reducido = () => window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ICO = {
        cal:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="5" width="17" height="15" rx="3"/><path d="M8 3v4M16 3v4M3.5 10h17"/></svg>',
        guia:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3.2"/><path d="M3.5 19c.6-3.2 2.8-5 5.5-5s4.9 1.8 5.5 5M16 6.5h5M18.5 4v5"/></svg>',
        pago:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="12" rx="3"/><path d="M3 10.5h18M7 15h3"/></svg>',
        check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4.5" width="16" height="16" rx="3.5"/><path d="m8.5 12.5 2.5 2.5 4.5-5"/></svg>',
        bus:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="3.5" width="16" height="14" rx="3"/><path d="M4 11h16M8 21v-3.5M16 21v-3.5M8 14.5h.01M16 14.5h.01"/></svg>',
        cupon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z"/><circle cx="7.5" cy="7.5" r=".6"/></svg>',
        copiar:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="8.5" y="8.5" width="11" height="11" rx="2.5"/><path d="M15.5 8.5v-2a2 2 0 0 0-2-2h-7a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h2"/></svg>'
    };
    const xBtn = '<button type="button" class="rv-x" data-cerrar aria-label="Cerrar">✕</button>';

    // ---------- Avisos cortos ----------
    let toastEl = null, toastT = 0;
    function toast(msg) {
        if (!toastEl) { toastEl = crear('<div class="rv-toast" role="status" aria-live="polite"></div>'); document.body.appendChild(toastEl); }
        toastEl.textContent = msg; toastEl.classList.add('ver');
        clearTimeout(toastT); toastT = setTimeout(() => toastEl.classList.remove('ver'), 2600);
    }
    async function copiar(texto) {
        try { await navigator.clipboard.writeText(texto); }
        catch (e) {
            const t = document.createElement('textarea'); t.value = texto; t.style.cssText = 'position:fixed;opacity:0';
            document.body.appendChild(t); t.select(); try { document.execCommand('copy'); } catch (_) {} t.remove();
        }
    }

    // ---------- Hojas (ventanas): una sola base para el calendario y el flujo ----------
    const pila = [];
    function abrirHoja({ clase = '', etiqueta, html, alCerrar }) {
        const previo = document.activeElement;
        const fondo = crear(`<div class="rv-fondo"><div class="rv-hoja ${clase}" role="dialog" aria-modal="true" aria-label="${esc(etiqueta)}" tabindex="-1">${html}</div></div>`);
        const hoja = fondo.firstElementChild;
        const h = { fondo, hoja, cerrado: false, cerrar };
        document.body.appendChild(fondo);
        document.body.classList.add('rv-lock');
        pila.push(h);
        requestAnimationFrame(() => fondo.classList.add('abierta'));
        hoja.focus({ preventScroll: true });

        fondo.addEventListener('mousedown', e => { if (e.target === fondo) cerrar(); });
        hoja.addEventListener('click', e => { if (e.target.closest('[data-cerrar]')) cerrar(); });
        document.addEventListener('keydown', tecla);

        function tecla(e) {
            if (pila[pila.length - 1] !== h) return;             // solo responde la ventana de arriba
            if (e.key === 'Escape') { cerrar(); return; }
            if (e.key !== 'Tab') return;
            const f = [...hoja.querySelectorAll('a[href],button:not([disabled]),input:not([disabled]),select,textarea,[tabindex="0"]')].filter(x => x.offsetParent !== null);
            if (!f.length) return;
            const a = f[0], z = f[f.length - 1];
            if (e.shiftKey && (document.activeElement === a || document.activeElement === hoja)) { e.preventDefault(); z.focus(); }
            else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
        }
        function cerrar() {
            if (h.cerrado) return;
            h.cerrado = true;
            pila.splice(pila.indexOf(h), 1);
            document.removeEventListener('keydown', tecla);
            if (!pila.length) document.body.classList.remove('rv-lock');
            fondo.classList.remove('abierta');
            setTimeout(() => fondo.remove(), reducido() ? 0 : 260);
            if (previo && previo.focus && document.contains(previo)) previo.focus({ preventScroll: true });
            if (alCerrar) alCerrar();
        }
        return h;
    }

    // ---------- Lectura de lo que el cliente ya eligió en la caja ----------
    function leer() {
        const s = cfg.leerSeleccion();
        return {
            destino: cfg.destino, modalidad: s.modalidad, punto: s.punto, tipoTour: s.tipoTour,
            fecha: s.tipoTour === 'grupal' ? s.fechaGrupal : est.fecha, personas: est.personas, cupon: est.cupon
        };
    }

    // ==========================================
    // 1) CAMPOS DE LA CAJA: fecha + participantes
    // ==========================================
    // El botón principal (#btn-reservar) se envuelve en un "pie" que queda pegado abajo de la caja flotante
    // (ver .rv-caja-pie en reserva.css): así el botón siempre se ve, aunque algo del contenido no quepa.
    function montarPieCaja() {
        const btn = document.getElementById('btn-reservar'); if (!btn) return;
        if (btn.closest('.rv-caja-pie')) return;
        const caja = btn.closest('.detail-price-box'); if (!caja) return;
        let hijo = btn; while (hijo.parentElement && hijo.parentElement !== caja) hijo = hijo.parentElement;
        if (hijo.parentElement !== caja) return;
        const pie = document.createElement('div');
        pie.className = 'rv-caja-pie';
        caja.insertBefore(pie, hijo);
        pie.appendChild(btn);
        if (hijo !== btn && !hijo.children.length && !hijo.textContent.trim()) hijo.remove();
    }

    // Ajuste automático de la caja flotante (solo computadora): si el contenido no cabe en la pantalla,
    // se compacta por pasos (rv-c1 → rv-c2 → rv-c3, ver reserva.css) hasta que quepa TODO sin scroll.
    // Si aun así no cabe (pantalla muy baja), aparece el aviso "Más opciones ↓" para que nadie se pierda lo de abajo.
    function montarAjusteCaja() {
        const caja = document.querySelector('.detail-price-box');
        if (!caja || caja.dataset.rvAjuste) return;
        caja.dataset.rvAjuste = '1';
        const mq = window.matchMedia('(min-width: 901px)');
        const pie = caja.querySelector('.rv-caja-pie');
        const aviso = document.createElement('button');
        aviso.type = 'button'; aviso.className = 'rv-mas-opciones'; aviso.hidden = true;
        aviso.setAttribute('aria-label', 'Hay más opciones abajo: tocar para verlas');
        aviso.innerHTML = 'Más opciones <span aria-hidden="true">↓</span>';
        (pie || caja).appendChild(aviso);
        aviso.addEventListener('click', () => caja.scrollTo({ top: caja.scrollHeight, behavior: 'smooth' }));

        // el aviso ocupa espacio propio: no cuenta al decidir si el contenido cabe (evita compactar de más)
        const cabe = () => (caja.scrollHeight - (aviso.hidden ? 0 : aviso.offsetHeight + 6)) <= caja.clientHeight + 1;
        function avisoVisible() {
            const hayMas = mq.matches && (caja.scrollHeight - caja.scrollTop - caja.clientHeight) > 8;
            if (aviso.hidden === hayMas) aviso.hidden = !hayMas;       // solo se toca si cambia (evita bucles con el observador)
        }
        let ocupado = false;
        function ajustar() {
            if (ocupado) return; ocupado = true;
            caja.classList.remove('rv-c1', 'rv-c2', 'rv-c3');
            if (mq.matches) for (const n of ['rv-c1', 'rv-c2', 'rv-c3']) { if (cabe()) break; caja.classList.add(n); }
            avisoVisible();
            ocupado = false;
        }
        let pendiente = false;
        const programar = () => { if (pendiente) return; pendiente = true; requestAnimationFrame(() => { pendiente = false; ajustar(); }); };
        new MutationObserver(programar).observe(caja, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ['hidden', 'style'] });
        window.addEventListener('resize', programar);
        window.addEventListener('load', programar);
        caja.addEventListener('scroll', avisoVisible, { passive: true });
        if (mq.addEventListener) mq.addEventListener('change', programar);
        programar();
    }

    function montarCampos() {
        montarPieCaja();
        montarAjusteCaja();
        cfg.contFecha.innerHTML = `
            <label class="detail-field-label" for="rvFechaBtn">Fecha</label>
            <button type="button" class="rv-fecha-btn" id="rvFechaBtn">${ICO.cal}<span id="rvFechaTxt">Elige una fecha</span><i aria-hidden="true">▾</i></button>`;
        cfg.contFecha.querySelector('#rvFechaBtn').addEventListener('click', () => abrirCalendario());

        cfg.contPersonas.innerHTML = `
            <div class="rv-stepper">
                <button type="button" data-d="-1" aria-label="Menos participantes">−</button>
                <output id="rvPersonasTxt" aria-live="polite"></output>
                <button type="button" data-d="1" aria-label="Más participantes">+</button>
            </div>
            <div class="rv-total" id="rvTotal" hidden></div>
            <div class="rv-cupon" id="rvCupon">
                <button type="button" class="rv-cupon-abrir" data-cupon-abrir aria-expanded="false" aria-controls="rvCuponForm">${ICO.cupon}<span>¿Tienes un cupón de descuento?</span></button>
                <div class="rv-cupon-form" id="rvCuponForm" hidden>
                    <div class="rv-cupon-fila">
                        <input id="rvCuponInput" class="rv-cupon-input" type="text" inputmode="numeric" pattern="[0-9]*" maxlength="4" placeholder="0000" autocomplete="off" aria-label="Código del cupón (4 dígitos)" aria-describedby="rvCuponMsg">
                        <button type="button" class="rv-cupon-aplicar" data-cupon-aplicar disabled>Aplicar</button>
                    </div>
                    <p class="rv-cupon-msg" id="rvCuponMsg" role="alert"></p>
                </div>
                <div class="rv-cupon-ok" id="rvCuponOk" hidden></div>
            </div>`;
        cfg.contPersonas.addEventListener('click', e => {
            const b = e.target.closest('[data-d]');
            if (b) { cambiarPersonas(est.personas + Number(b.dataset.d)); return; }
            if (e.target.closest('[data-cupon-abrir]')) { abrirCupon(); return; }
            if (e.target.closest('[data-cupon-aplicar]')) { aplicarCupon(); return; }
            if (e.target.closest('[data-cupon-quitar]')) { quitarCupon(); return; }
        });
        const inp = cfg.contPersonas.querySelector('#rvCuponInput');
        inp.addEventListener('input', () => {                    // solo números, máximo 4
            inp.value = inp.value.replace(/\D/g, '').slice(0, 4);
            cfg.contPersonas.querySelector('[data-cupon-aplicar]').disabled = inp.value.length !== 4;
            mensajeCupon('');
        });
        inp.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); aplicarCupon(); } });
        pintarPersonas();
        pintarCupon();
        pintarTotal();
    }

    // ---------- Total debajo de participantes ----------
    // Lo llama detalle.js cada vez que cambia el precio por persona (modalidad, punto de salida, tipo de tour...)
    function actualizarTotal(u) {
        unitario = (u != null && isFinite(u)) ? Number(u) : null;
        pintarTotal();
    }
    function pintarTotal() {
        if (!cfg) return;
        const caja = cfg.contPersonas.querySelector('#rvTotal'); if (!caja) return;
        if (unitario == null) { caja.hidden = true; caja.innerHTML = ''; return; }
        const n = est.personas, subtotal = unitario * n;
        const desc = O.calcularDescuento(subtotal, est.cupon), total = subtotal - desc;
        caja.hidden = false;
        caja.innerHTML = `
            <div class="rv-total-izq">
                <span class="rv-total-label">Total</span>
                <small class="rv-total-det">${n} ${n === 1 ? 'persona' : 'personas'} × ${precio(unitario, 'span')}</small>
            </div>
            <div class="rv-total-precio">
                ${desc ? `<div class="rv-total-antes">${precio(subtotal, 's')}<em class="rv-ahorro">−${precio(desc, 'span')}</em></div>` : ''}
                ${precio(total, 'b')}
            </div>`;
    }

    // ---------- Cupón de descuento ----------
    function abrirCupon() {
        const form = cfg.contPersonas.querySelector('#rvCuponForm'), btn = cfg.contPersonas.querySelector('[data-cupon-abrir]');
        const abrir = form.hidden;
        form.hidden = !abrir;
        btn.setAttribute('aria-expanded', abrir);
        if (abrir) cfg.contPersonas.querySelector('#rvCuponInput').focus({ preventScroll: true });
    }
    function mensajeCupon(txt) {
        const m = cfg.contPersonas.querySelector('#rvCuponMsg'), inp = cfg.contPersonas.querySelector('#rvCuponInput');
        m.textContent = txt; inp.setAttribute('aria-invalid', !!txt);
        inp.classList.remove('error'); if (txt) { void inp.offsetWidth; inp.classList.add('error'); }
    }
    function aplicarCupon() {
        const inp = cfg.contPersonas.querySelector('#rvCuponInput');
        const r = O.buscarCupon(inp.value, cfg.destino.id);
        if (!r.ok) {
            mensajeCupon({
                formato: 'Escribe los 4 dígitos de tu cupón.',
                invalido: 'Ese cupón no es válido. Revisa los 4 dígitos.',
                vencido: 'Ese cupón ya venció.',
                destino: 'Este cupón no aplica para esta experiencia.'
            }[r.motivo] || 'No pudimos aplicar ese cupón.');
            inp.focus({ preventScroll: true });
            return;
        }
        est.cupon = r.cupon;
        pintarCupon(); pintarTotal();
        toast('Cupón aplicado');
    }
    function quitarCupon() {
        est.cupon = null;
        const inp = cfg.contPersonas.querySelector('#rvCuponInput'); inp.value = '';
        cfg.contPersonas.querySelector('[data-cupon-aplicar]').disabled = true;
        mensajeCupon('');
        pintarCupon(); pintarTotal();
        cfg.contPersonas.querySelector('[data-cupon-abrir]').focus({ preventScroll: true });
    }
    function pintarCupon() {
        const caja = cfg.contPersonas.querySelector('#rvCupon'); if (!caja) return;
        const ok = caja.querySelector('#rvCuponOk'), form = caja.querySelector('#rvCuponForm'), abrir = caja.querySelector('[data-cupon-abrir]');
        const aplicado = !!est.cupon;
        ok.hidden = !aplicado;
        abrir.hidden = aplicado;
        if (aplicado) {
            form.hidden = true;
            ok.innerHTML = `<span class="rv-cupon-icono" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="m6 12.5 4 4 8-9"/></svg></span><div><strong>Cupón ${esc(est.cupon.codigo)} aplicado</strong>${est.cupon.etiqueta ? `<small>${esc(est.cupon.etiqueta)}</small>` : ''}</div><button type="button" class="rv-cupon-quitar" data-cupon-quitar aria-label="Quitar el cupón ${esc(est.cupon.codigo)}">Quitar</button>`;
        } else { ok.innerHTML = ''; }
    }
    function pintarPersonas() {
        cfg.contPersonas.querySelector('#rvPersonasTxt').textContent = `${est.personas} ${est.personas === 1 ? 'persona' : 'personas'}`;
        const [menos, mas] = cfg.contPersonas.querySelectorAll('[data-d]');
        menos.disabled = est.personas <= 1; mas.disabled = est.personas >= MAX_PERSONAS;
        pintarTotal();
    }
    function cambiarPersonas(n) {
        est.personas = Math.min(MAX_PERSONAS, Math.max(1, n));
        pintarPersonas();
        cfg.alCambiar();                                         // detalle.js ajusta individual/grupo y el precio
    }
    function pintarFecha() {
        const t = cfg.contFecha.querySelector('#rvFechaTxt'), b = cfg.contFecha.querySelector('#rvFechaBtn');
        t.textContent = est.fecha ? O.fechaBonita(est.fecha) : 'Elige una fecha';
        b.classList.toggle('con-valor', !!est.fecha);
    }

    // ==========================================
    // 2) CALENDARIO (un mes, fácil de tocar en celular)
    // ==========================================
    const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    const SEMANA = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];          // igual que el buscador: empieza en lunes

    function abrirCalendario(alConfirmar) {
        const sel = leer();
        const hoy = O.hoyISO();
        const base = est.fecha ? O.deISO(est.fecha) : new Date();
        let vista = new Date(base.getFullYear(), base.getMonth(), 1);
        let elegido = est.fecha || '';
        const topeMes = new Date(); topeMes.setMonth(topeMes.getMonth() + 12);
        const libre = iso => O.diaDisponible(sel, iso);

        const h = abrirHoja({
            clase: 'rv-hoja--cal', etiqueta: 'Elegir fecha',
            html: `
            <header class="rv-cal-top"><h3>¿Cuándo quieres ir?</h3>${xBtn}</header>
            <div class="rv-quick" id="rvQuick"></div>
            <div class="rv-cal">
                <div class="rv-cal-nav">
                    <button type="button" data-mes="-1" aria-label="Mes anterior">❮</button>
                    <strong id="rvCalMes" aria-live="polite"></strong>
                    <button type="button" data-mes="1" aria-label="Mes siguiente">❯</button>
                </div>
                <div class="rv-cal-sem">${SEMANA.map(d => `<span>${d}</span>`).join('')}</div>
                <div class="rv-cal-grid" id="rvCalGrid"></div>
            </div>
            <footer class="rv-cal-pie">
                <p id="rvCalNota">Los días en gris no tienen salida disponible.</p>
                <button type="button" class="rv-btn rv-btn--primario" id="rvCalOk" disabled>Elige un día</button>
            </footer>`
        });
        const $ = s => h.hoja.querySelector(s);

        function quick() {
            const manana = O.sumarDias(hoy, 1);
            let sab = O.sumarDias(hoy, 1);
            while (O.deISO(sab).getDay() !== 6) sab = O.sumarDias(sab, 1);
            const items = [['Mañana', manana], ['Próximo sábado', sab]];
            $('#rvQuick').innerHTML = items.map(([t, iso]) =>
                `<button type="button" data-iso="${iso}" ${libre(iso) ? '' : 'disabled'}>${t}</button>`).join('');
        }
        function pintar() {
            const y = vista.getFullYear(), m = vista.getMonth();
            $('#rvCalMes').textContent = `${MESES[m]} de ${y}`;
            $('[data-mes="-1"]').disabled = vista <= new Date(new Date().getFullYear(), new Date().getMonth(), 1);
            $('[data-mes="1"]').disabled = new Date(y, m + 1, 1) > topeMes;
            const vacios = (new Date(y, m, 1).getDay() + 6) % 7;
            const dias = new Date(y, m + 1, 0).getDate();
            let html = '<i></i>'.repeat(vacios);
            for (let d = 1; d <= dias; d++) {
                const iso = O.aISO(new Date(y, m, d));
                const ok = iso >= hoy && libre(iso);
                html += `<button type="button" class="rv-dia${ok ? '' : ' no'}${iso === hoy ? ' hoy' : ''}${iso === elegido ? ' sel' : ''}" data-iso="${iso}" ${ok ? '' : 'disabled'} aria-label="${O.fechaBonita(iso)}"${iso === elegido ? ' aria-pressed="true"' : ''}>${d}</button>`;
            }
            $('#rvCalGrid').innerHTML = html;
        }
        function pintarPie() {
            const ok = $('#rvCalOk');
            ok.disabled = !elegido;
            ok.textContent = elegido ? 'Confirmar fecha' : 'Elige un día';
            $('#rvCalNota').textContent = elegido ? O.fechaBonita(elegido) : 'Los días en gris no tienen salida disponible.';
            $('#rvCalNota').classList.toggle('elegida', !!elegido);
        }
        function elegir(iso) {
            elegido = iso;
            const d = O.deISO(iso);
            if (d.getMonth() !== vista.getMonth() || d.getFullYear() !== vista.getFullYear()) vista = new Date(d.getFullYear(), d.getMonth(), 1);
            pintar(); pintarPie();
        }
        h.hoja.addEventListener('click', e => {
            const m = e.target.closest('[data-mes]');
            if (m) { vista = new Date(vista.getFullYear(), vista.getMonth() + Number(m.dataset.mes), 1); pintar(); return; }
            const d = e.target.closest('[data-iso]');
            if (d && !d.disabled) { elegir(d.dataset.iso); return; }
            if (e.target.closest('#rvCalOk') && elegido) {
                est.fecha = elegido; pintarFecha(); cfg.alCambiar();
                h.cerrar();
                if (alConfirmar) alConfirmar();
            }
        });
        quick(); pintar(); pintarPie();
    }

    // ==========================================
    // 3) VER DISPONIBILIDAD → flujo completo
    // ==========================================
    function abrirDisponibilidad() {
        const sel = leer();
        if (!sel.fecha) {
            if (sel.tipoTour === 'privado') abrirCalendario(() => abrirFlujo());   // pide la fecha y sigue solo
            else toast('Aún no hay salidas grupales. Prueba con un tour privado.');
            return;
        }
        abrirFlujo();
    }

    const PASOS = ['Opciones', 'Tus datos', 'Pago', 'Comprobante'];

    function abrirFlujo() {
        const sel = leer();                                      // foto de lo elegido: no cambia mientras la ventana está abierta
        const f = { paso: 1, ofertas: [], oferta: null, hora: '', reserva: null, tipoPago: 'anticipo', cliente: cargarCliente(), aceptaTerminos: false, aceptaRiesgos: false };
        const corto = nombreCorto(sel.destino);

        const h = abrirHoja({
            clase: 'rv-hoja--flujo', etiqueta: `Reservar ${corto}`,
            html: `
            <header class="rv-top">
                <button type="button" class="rv-atras" data-atras aria-label="Volver al paso anterior">←</button>
                <div class="rv-top-info">
                    <strong>${esc(corto)}</strong>
                    <span>${esc(O.fechaCorta(sel.fecha))} · ${sel.personas} ${sel.personas === 1 ? 'persona' : 'personas'}${sel.tipoTour === 'privado' ? ' · <button type="button" class="rv-link" data-cambiar>Cambiar fecha</button>' : ''}</span>
                </div>
                ${xBtn}
            </header>
            <div class="rv-progreso" id="rvProg" role="progressbar" aria-valuemin="1" aria-valuemax="${PASOS.length}">
                <div class="rv-prog-barra"><i id="rvProgRelleno"></i></div>
                <ol class="rv-prog-pasos">${PASOS.map(p => `<li>${p}</li>`).join('')}</ol>
                <p class="rv-prog-movil" id="rvProgMovil"></p>
            </div>
            <div class="rv-cuerpo" id="rvCuerpo">
                <aside class="rv-resumen" id="rvResumen" hidden></aside>
                <main class="rv-paso" id="rvPaso"></main>
            </div>
            <footer class="rv-pie" id="rvPie" hidden></footer>`
        });
        const $ = s => h.hoja.querySelector(s);
        const cuerpo = $('#rvCuerpo'), paso = $('#rvPaso'), resumen = $('#rvResumen'), pie = $('#rvPie');

        // ----- barra de progreso (se va llenando) -----
        function progreso() {
            const n = f.paso, total = PASOS.length;
            $('#rvProgRelleno').style.width = `${(n / total) * 100}%`;
            $('#rvProg').setAttribute('aria-valuenow', n);
            $('#rvProg').setAttribute('aria-valuetext', `Paso ${n} de ${total}: ${PASOS[n - 1]}`);
            $('#rvProgMovil').innerHTML = `Paso ${n} de ${total} · <b>${PASOS[n - 1]}</b>`;
            h.hoja.querySelectorAll('.rv-prog-pasos li').forEach((li, i) => {
                li.classList.toggle('hecho', i < n - 1); li.classList.toggle('activo', i === n - 1);
            });
            $('[data-atras]').style.display = (n === 1 || n === 4) ? 'none' : '';
        }

        // ----- resumen (columna derecha en computadora, plegable arriba en celular) -----
        function pintarResumen() {
            if (f.paso === 1 || !f.oferta) { resumen.hidden = true; return; }
            const r = f.reserva || O.armarReserva({ sel, oferta: f.oferta, hora: f.hora, cliente: f.cliente, tipoPago: f.tipoPago });
            const p = f.oferta.precio, prov = f.oferta.proveedor;
            const filas = [
                ['Fecha', O.fechaBonita(sel.fecha)],
                f.hora && ['Hora', f.hora],
                ['Salida', p.punto],
                ['Participantes', `${sel.personas} ${sel.personas === 1 ? 'persona' : 'personas'}`],
                ['Tipo', sel.tipoTour === 'grupal' ? 'Salida grupal en bus' : 'Tour privado']
            ].filter(Boolean);
            const mostrarPago = f.paso >= 3;
            resumen.hidden = false;
            resumen.innerHTML = `
                <button type="button" class="rv-res-toggle" data-res aria-expanded="false">
                    <span>Resumen del pedido</span><span class="rv-res-total">${precio(r.total, 'b')}</span><i aria-hidden="true">▾</i>
                </button>
                <div class="rv-res-cuerpo">
                    <h3 class="rv-res-tit">Resumen del pedido</h3>
                    <div class="rv-res-exp">
                        <span class="rv-res-foto" style="background-image:url('${esc(sel.destino.imagen || '')}')"></span>
                        <div><strong>${esc(f.oferta.titulo)}</strong><small>Ofrecida por ${esc(prov.nombre)}</small></div>
                    </div>
                    <dl class="rv-res-filas">${filas.map(([a, b]) => `<div><dt>${a}</dt><dd>${esc(b)}</dd></div>`).join('')}</dl>
                    <div class="rv-res-cuenta${r.descuentoCupon ? ' con-desc' : ''}">
                        <div><span>${sel.personas} × ${precio(p.unitario, 'span')}</span>${precio(r.subtotal, 'span')}</div>
                        ${r.descuentoCupon ? `<div class="rv-res-desc"><span>Cupón ${esc(r.cupon)}</span><span>−${precio(r.descuentoCupon, 'span')}</span></div>
                        <div class="rv-res-tot"><span>Total</span>${precio(r.total, 'b')}</div>` : ''}
                        ${mostrarPago ? `<div class="rv-res-pagar"><span>${r.tipoPago === 'anticipo' ? 'Anticipo a pagar ahora' : 'A pagar ahora'}</span><b>${O.Q(O.montoAPagar(r))}</b></div>` : ''}
                    </div>
                    ${f.oferta.cancelacion ? `<p class="rv-res-nota">${ICO.check}<span>${esc(f.oferta.cancelacion)}</span></p>` : ''}
                </div>`;
        }
        resumen.addEventListener('click', e => {
            if (!e.target.closest('[data-res]')) return;
            const b = resumen.querySelector('[data-res]');
            const abierto = resumen.classList.toggle('abierto');
            b.setAttribute('aria-expanded', abierto);
        });

        function irA(n) {
            f.paso = n;
            progreso();
            paso.classList.remove('rv-entra'); void paso.offsetWidth; paso.classList.add('rv-entra');
            cuerpo.scrollTop = 0;
            cuerpo.classList.toggle('sin-resumen', n === 1);
            ({ 1: paso1, 2: paso2, 3: paso3, 4: paso4 })[n]();
            pintarResumen();
            const t = paso.querySelector('h2'); if (t) { t.tabIndex = -1; t.focus({ preventScroll: true }); }
        }
        // bloqueado = se ve apagado pero se puede tocar: al tocarlo explicamos qué falta (mejor que un botón gris mudo)
        function pintarPie(textoBtn, { deshabilitado = false, bloqueado = false, accion = 'siguiente', form = '' } = {}) {
            const r = f.reserva;
            pie.hidden = false;
            pie.innerHTML = `
                <div class="rv-pie-total"><small>${f.paso >= 3 && r ? 'A pagar ahora' : 'Total'}</small>${f.paso >= 3 && r ? `<b>${O.Q(O.montoAPagar(r))}</b>` : precio(f.oferta.precio.total, 'b')}</div>
                <button type="${form ? 'submit' : 'button'}" ${form ? `form="${form}"` : ''} class="rv-btn rv-btn--primario${bloqueado ? ' bloqueado' : ''}" data-${accion} ${deshabilitado ? 'disabled' : ''} ${bloqueado ? 'aria-disabled="true"' : ''}>${textoBtn}</button>`;
        }

        // ================= PASO 1: opciones =================
        async function paso1() {
            pie.hidden = true;
            if (f.ofertas.length) { paso.innerHTML = carrusel(f.ofertas); enlazarCarrusel(); return; }   // al volver de otro paso no se recarga
            paso.innerHTML = cargando();
            const mensajes = ['Buscando salidas disponibles…', 'Consultando a los proveedores…', 'Verificando cupos…'];
            let i = 0;
            const rot = setInterval(() => { const t = paso.querySelector('.rv-carga-txt'); if (t) t.textContent = mensajes[++i % mensajes.length]; }, 750);
            let ofertas = [], error = false;
            const t0 = Date.now();
            try { ofertas = await O.buscar(sel); } catch (e) { error = true; console.error(e); }
            await pausa(Math.max(0, MIN_CARGA_MS - (Date.now() - t0)));
            clearInterval(rot);
            if (h.cerrado || f.paso !== 1) return;                // cerró la ventana o se fue a otro paso mientras cargaba
            f.ofertas = ofertas;
            paso.innerHTML = error ? vacio('No pudimos cargar las opciones', 'Revisa tu conexión e inténtalo de nuevo.', 'Reintentar', 'reintentar')
                : !ofertas.length ? vacio('No hay salidas disponibles ese día', 'Prueba con otra fecha, otra modalidad u otro punto de salida.', sel.tipoTour === 'privado' ? 'Cambiar fecha' : 'Cerrar', 'cambiar')
                : carrusel(ofertas);
            if (ofertas.length) enlazarCarrusel();
        }
        function cargando() {
            return `<div class="rv-carga" aria-live="polite">
                <div class="rv-spin" aria-hidden="true"></div>
                <p class="rv-carga-txt">Buscando salidas disponibles…</p>
            </div>
            <div class="rv-pista rv-pista--sk" aria-hidden="true">${'<article class="rv-card rv-sk"><i></i><i></i><i></i><i></i><i class="g"></i></article>'.repeat(3)}</div>`;
        }
        function vacio(t, d, btn, accion) {
            return `<div class="rv-vacio"><svg viewBox="0 0 100 70" aria-hidden="true"><path d="M4 66 34 16l16 24 18-30 28 56z" fill="#ffcc00"/><circle cx="78" cy="14" r="7" fill="#ff4500"/></svg>
                <h2>${t}</h2><p>${d}</p><button type="button" class="rv-btn rv-btn--primario" data-${accion}>${btn}</button></div>`;
        }
        function carrusel(lista) {
            return `<h2 class="rv-tit" id="rvTit">Elige entre ${lista.length} ${lista.length === 1 ? 'opción disponible' : 'opciones disponibles'}</h2>
                <div class="rv-carrusel">
                    <button type="button" class="rv-flecha rv-flecha--prev" data-flecha="-1" aria-label="Opciones anteriores">❮</button>
                    <div class="rv-pista${lista.length < 3 ? ' rv-pista--pocas' : ''}" id="rvPista" tabindex="0" aria-label="Opciones disponibles">${lista.map(tarjeta).join('')}</div>
                    <button type="button" class="rv-flecha rv-flecha--next" data-flecha="1" aria-label="Más opciones">❯</button>
                </div>
                <div class="rv-puntos" id="rvPuntos" aria-hidden="true">${lista.map((_, i) => `<i${i ? '' : ' class="on"'}></i>`).join('')}</div>`;
        }
        function tarjeta(o) {
            const p = o.precio, prov = o.proveedor, horas = o.horas || [];
            const ini = esc(iniciales(prov.nombre));
            const logo = prov.logo ? `<img src="${esc(prov.logo)}" alt="" data-ini="${ini}">` : `<b>${ini}</b>`;
            const feats = [
                (o.idiomas || []).length && [ICO.guia, `Guía: ${esc(o.idiomas.join(', '))}`],
                o.pagarDespues && [ICO.pago, 'Reserva ahora y paga después'],
                o.cancelacion && [ICO.check, esc(o.cancelacion)],
                o.recogida && [ICO.bus, `Recogida desde ${esc(p.punto)}${p.puntoCambiado ? ' <small>(este proveedor no sale de tu punto elegido)</small>' : ''}`]
            ].filter(Boolean);
            const mas = (o.descripcion || '').length > 85;
            return `<article class="rv-card" data-oferta="${esc(o.id)}" data-prov="${esc(prov.id)}" style="--c:${esc(prov.color || '#ff4500')}" ${horas.length ? `data-hora="${esc(horas[0])}"` : ''}>
                <div class="rv-card-top">
                    <span class="rv-logo">${logo}</span>
                    <span class="rv-prov"><small>Ofrecida por</small>${esc(prov.nombre)}</span>
                    ${o.etiqueta ? `<span class="rv-badge">${esc(o.etiqueta)}</span>` : ''}
                </div>
                <h3>${esc(o.titulo)}</h3>
                <p class="rv-desc${mas ? ' rv-clamp' : ''}">${esc(o.descripcion)}</p>
                ${mas ? '<button type="button" class="rv-link rv-mas" data-mas>Leer más</button>' : ''}
                <ul class="rv-feat">${feats.map(([i, t]) => `<li>${i}<span>${t}</span></li>`).join('')}</ul>
                ${horas.length > 1 ? `<div class="rv-horas"><p>Selecciona una hora de inicio</p><div>${horas.map((x, i) => `<button type="button" class="${i ? '' : 'on'}" data-hora="${esc(x)}">${esc(x)}</button>`).join('')}</div></div>`
                    : horas.length === 1 ? `<p class="rv-hora1">Hora de salida: <b>${esc(horas[0])}</b></p>` : ''}
                <div class="rv-precio">
                    <div>${p.antes ? precio(p.antes, 's') : ''}${precio(p.unitario, 'strong')}${p.descuento ? `<em>−${p.descuento}%</em>` : ''}</div>
                    <small>${sel.personas} ${sel.personas === 1 ? 'persona' : 'personas'} × ${precio(p.unitario, 'span')} = ${precio(p.subtotal, p.descuentoCupon ? 'span' : 'b')}</small>
                    ${p.descuentoCupon ? `<small class="rv-cupon-linea">Cupón ${esc(sel.cupon.codigo)}: −${precio(p.descuentoCupon, 'span')} · Total ${precio(p.total, 'b')}</small>` : ''}
                    ${o.sinCupos ? `<small class="rv-aviso-cupos">Solo quedan ${o.cupos} ${o.cupos === 1 ? 'cupo' : 'cupos'} en esta salida.</small>` : ''}
                </div>
                <button type="button" class="rv-btn rv-btn--primario" data-continuar ${o.sinCupos ? 'disabled' : ''}>${o.sinCupos ? 'Cupos insuficientes' : 'Continuar'}</button>
            </article>`;
        }
        function enlazarCarrusel() {
            const pista = $('#rvPista'), puntos = [...h.hoja.querySelectorAll('#rvPuntos i')];
            const ancho = () => (pista.firstElementChild?.offsetWidth || 300) + 18;
            const flechas = () => {
                const prev = h.hoja.querySelector('.rv-flecha--prev'), next = h.hoja.querySelector('.rv-flecha--next'), pts = h.hoja.querySelector('#rvPuntos');
                if (!pista.isConnected || !prev) return;               // el carrusel ya no está (cambió de paso)
                const ajusta = pista.scrollWidth <= pista.clientWidth + 4;
                prev.hidden = ajusta || pista.scrollLeft < 8;
                next.hidden = ajusta || pista.scrollLeft + pista.clientWidth >= pista.scrollWidth - 8;
                pts.hidden = ajusta;
            };
            pista.addEventListener('scroll', () => {
                const i = Math.min(puntos.length - 1, Math.round(pista.scrollLeft / ancho()));
                puntos.forEach((p, k) => p.classList.toggle('on', k === i));
                flechas();
            }, { passive: true });
            h.hoja.querySelectorAll('[data-flecha]').forEach(b =>
                b.addEventListener('click', () => pista.scrollBy({ left: Number(b.dataset.flecha) * ancho(), behavior: reducido() ? 'auto' : 'smooth' })));
            pista.addEventListener('keydown', e => {
                if (e.key === 'ArrowRight') pista.scrollBy({ left: ancho(), behavior: 'smooth' });
                if (e.key === 'ArrowLeft') pista.scrollBy({ left: -ancho(), behavior: 'smooth' });
            });
            if ('ResizeObserver' in window) new ResizeObserver(flechas).observe(pista);
            // si el logo de un proveedor no carga, se muestran sus iniciales
            h.hoja.querySelectorAll('.rv-logo img').forEach(img => img.addEventListener('error', () => {
                const b = document.createElement('b'); b.textContent = img.dataset.ini; img.replaceWith(b);
            }, { once: true }));
            flechas();
        }

        // ================= PASO 2: datos =================
        function paso2() {
            const c = f.cliente;
            paso.innerHTML = `
                <h2 class="rv-tit">Tus datos</h2>
                <p class="rv-sub">Son los datos de quien hace la reserva. Te escribiremos por WhatsApp para coordinar la salida.</p>
                <form class="rv-form" id="rvForm" novalidate>
                    <div class="rv-fila">
                        ${campo('nombre', 'Nombre', 'text', c.nombre, 'given-name')}
                        ${campo('apellido', 'Apellido', 'text', c.apellido, 'family-name')}
                    </div>
                    <div class="rv-campo" data-campo="telefono">
                        <label for="rv-telefono">Número de teléfono</label>
                        <div class="rv-tel">
                            <input id="rv-prefijo" name="prefijo" value="${esc(c.prefijo || '+502')}" inputmode="tel" autocomplete="tel-country-code" aria-label="Código de país" maxlength="5">
                            <input id="rv-telefono" name="telefono" value="${esc(c.telefono)}" type="tel" inputmode="tel" autocomplete="tel-national" placeholder="5555 1234" maxlength="18">
                        </div>
                        <p class="rv-error" id="e-telefono" role="alert"></p>
                    </div>
                    ${campo('correo', 'Correo electrónico <span class="rv-opc">(opcional)</span>', 'email', c.correo, 'email', 'Si lo escribes, te mandamos ahí la confirmación.')}
                </form>`;
            pintarPie('Continuar al pago', { form: 'rvForm' });
            const form = $('#rvForm');
            const leerForm = () => ({
                nombre: form.nombre.value, apellido: form.apellido.value, prefijo: form.prefijo.value.trim() || '+502',
                telefono: form.telefono.value, correo: form.correo.value
            });
            const mostrar = (errs, solo) => ['nombre', 'apellido', 'telefono', 'correo'].forEach(k => {
                if (solo && solo !== k) return;
                const p = form.querySelector(`#e-${k}`), ent = k === 'telefono' ? form.telefono : form[k];
                p.textContent = errs[k] || ''; ent.setAttribute('aria-invalid', !!errs[k]);
                form.querySelector(`[data-campo="${k}"]`).classList.toggle('con-error', !!errs[k]);
            });
            form.addEventListener('focusout', e => {                       // avisa al salir de cada campo
                const k = e.target.name === 'prefijo' ? 'telefono' : e.target.name;
                if (k && e.target.value !== '') mostrar(O.validarCliente(leerForm()), k);
            });
            form.addEventListener('input', e => {                           // y se quita el error en cuanto lo corrige
                const k = e.target.name === 'prefijo' ? 'telefono' : e.target.name;
                if (k && form.querySelector(`#e-${k}`).textContent) mostrar(O.validarCliente(leerForm()), k);
            });
            form.addEventListener('submit', e => {
                e.preventDefault();
                const datos = leerForm(), errs = O.validarCliente(datos);
                mostrar(errs);
                const primero = Object.keys(errs)[0];
                if (primero) { (primero === 'telefono' ? form.telefono : form[primero]).focus(); return; }
                f.cliente = datos; guardarCliente(datos); f.reserva = null;
                irA(3);
            });
        }
        function campo(nombre, etiqueta, tipo, valor, auto, ayuda) {
            return `<div class="rv-campo" data-campo="${nombre}">
                <label for="rv-${nombre}">${etiqueta}</label>
                <input id="rv-${nombre}" name="${nombre}" type="${tipo}" value="${esc(valor)}" autocomplete="${auto}" ${tipo === 'email' ? 'inputmode="email" autocapitalize="off"' : 'autocapitalize="words"'}>
                ${ayuda ? `<p class="rv-ayuda">${ayuda}</p>` : ''}
                <p class="rv-error" id="e-${nombre}" role="alert"></p>
            </div>`;
        }

        // ================= PASO 3: pago =================
        function paso3() {
            const prov = f.oferta.proveedor;
            if (!f.reserva) {
                f.reserva = O.armarReserva({ sel, oferta: f.oferta, hora: f.hora, cliente: f.cliente, tipoPago: f.tipoPago });
            }
            const r = f.reserva;
            const hayAnticipo = !!prov.anticipo && r.anticipo < r.total;
            paso.innerHTML = `
                <h2 class="rv-tit">Pago</h2>
                <div class="rv-metodos">
                    <div class="rv-metodo off">${ICO.pago}<div><strong>Tarjeta de crédito o débito</strong><small>Estamos trabajando en el proceso de pago con tarjeta.</small></div><span class="rv-chip">Próximamente</span></div>
                    <div class="rv-metodo on">${ICO.check}<div><strong>Transferencia o depósito bancario</strong><small>Disponible ahora</small></div></div>
                </div>
                <p class="rv-aviso">Por el momento solo aceptamos pagos por <b>transferencia o depósito</b>. En el último paso te diremos cómo enviar tu comprobante para confirmar.</p>

                ${hayAnticipo ? `<h3 class="rv-sub-tit">¿Cuánto quieres pagar ahora?</h3>
                <div class="rv-opciones" role="radiogroup">
                    ${opcionPago('anticipo', 'Pagar solo el anticipo', 'Aparta tu lugar y paga el resto después.', r.anticipo, r.tipoPago)}
                    ${opcionPago('total', 'Pago total', 'Dejas todo cubierto desde ya.', r.total, r.tipoPago)}
                </div>` : ''}

                <h3 class="rv-sub-tit">Cuentas de ${esc(prov.nombre)}</h3>
                <div class="rv-cuentas">${(prov.cuentas || []).map((c, i) => `
                    <div class="rv-cuenta">
                        <div class="rv-cuenta-top"><strong>${esc(c.banco)}</strong><span>${esc(c.tipo)} · ${esc(c.moneda || 'GTQ')}</span></div>
                        <div class="rv-cuenta-num"><code>${esc(c.numero)}</code><button type="button" class="rv-copiar" data-copiar="${esc(c.numero)}" aria-label="Copiar número de cuenta de ${esc(c.banco)}">${ICO.copiar}<span>Copiar</span></button></div>
                        <small>A nombre de ${esc(c.titular)}</small>
                    </div>`).join('') || '<p class="rv-ayuda">Este proveedor aún no tiene cuentas registradas. Escríbele por WhatsApp.</p>'}
                </div>
                <p class="rv-nota">Las cuentas están en quetzales (GTQ). El monto a pagar se muestra siempre en quetzales.</p>

                <div class="rv-acepto" id="rvAcepto">
                    <h3 class="rv-sub-tit rv-acepto-tit">Antes de continuar</h3>
                    ${casilla('aceptaTerminos', `He leído y acepto los <a href="terminos.html" target="_blank" rel="noopener">Términos y condiciones</a> y la <a href="privacidad.html" target="_blank" rel="noopener">Política de privacidad</a>.`)}
                    ${casilla('aceptaRiesgos', `Entiendo que esta actividad implica <b>riesgos propios de la montaña</b> y declaro estar en condición física y de salud adecuada (ver <a href="terminos.html#s7" target="_blank" rel="noopener">sección de riesgos</a>).`)}
                    <p class="rv-acepto-error" id="rvAceptoError" role="alert"></p>
                </div>`;
            pintarPieAcepto();
            h.hoja.querySelectorAll('[name="tipoPago"]').forEach(inp => inp.addEventListener('change', () => {
                f.reserva.tipoPago = f.tipoPago = inp.value;
                paso.querySelectorAll('.rv-opcion').forEach(l => l.classList.toggle('on', l.querySelector('input').checked));
                pintarPieAcepto(); pintarResumen();
            }));
            h.hoja.querySelectorAll('.rv-chk input').forEach(inp => inp.addEventListener('change', () => {
                f[inp.name] = inp.checked;
                if (f.aceptaTerminos && f.aceptaRiesgos) limpiarErrorAcepto();
                pintarPieAcepto();
            }));
        }
        function casilla(nombre, textoHtml) {
            return `<label class="rv-chk"><input type="checkbox" name="${nombre}" ${f[nombre] ? 'checked' : ''}>
                <span class="rv-chk-caja" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="m3.5 8.5 3 3 6-7"/></svg></span>
                <span class="rv-chk-txt">${textoHtml}</span></label>`;
        }
        const aceptoTodo = () => f.aceptaTerminos && f.aceptaRiesgos;
        function pintarPieAcepto() { pintarPie('Ya entendí, continuar', { bloqueado: !aceptoTodo() }); }
        function limpiarErrorAcepto() {
            const caja = $('#rvAcepto'), msg = $('#rvAceptoError');
            if (caja) caja.classList.remove('error');
            if (msg) msg.textContent = '';
        }
        function mostrarErrorAcepto() {
            const caja = $('#rvAcepto'), msg = $('#rvAceptoError');
            if (!caja) return;
            msg.textContent = !f.aceptaTerminos
                ? 'Para continuar, acepta los Términos y condiciones y la Política de privacidad.'
                : 'Para continuar, confirma que entiendes los riesgos de la actividad.';
            caja.classList.remove('error'); void caja.offsetWidth; caja.classList.add('error');   // reinicia la animación
            caja.scrollIntoView({ block: 'center', behavior: reducido() ? 'auto' : 'smooth' });
            const primera = caja.querySelector(`input[name="${!f.aceptaTerminos ? 'aceptaTerminos' : 'aceptaRiesgos'}"]`);
            if (primera) primera.focus({ preventScroll: true });
        }
        function opcionPago(valor, titulo, desc, monto, actual) {
            return `<label class="rv-opcion${actual === valor ? ' on' : ''}"><input type="radio" name="tipoPago" value="${valor}" ${actual === valor ? 'checked' : ''}>
                <span class="rv-radio" aria-hidden="true"></span><span class="rv-opcion-txt"><strong>${titulo}</strong><small>${desc}</small></span><b>${O.Q(monto)}</b></label>`;
        }

        // ================= PASO 4: comprobante =================
        function paso4() {
            const r = f.reserva, prov = r.proveedor, monto = O.Q(O.montoAPagar(r));
            const msg = O.mensajeReserva(r);
            paso.innerHTML = `
                <div class="rv-ok" aria-hidden="true"><svg viewBox="0 0 52 52"><circle cx="26" cy="26" r="24"/><path d="m15 27 8 8 15-17"/></svg></div>
                <h2 class="rv-tit rv-centro">¡Casi listo! Solo falta tu comprobante</h2>
                <p class="rv-sub rv-centro">Tu reserva <b>${esc(r.codigo)}</b> se confirma cuando recibamos tu boleta.</p>
                <ol class="rv-lista-pasos">
                    <li><span>1</span><div><b>Haz la transferencia o depósito por ${monto}</b>
                        <small>En la descripción escribe tu código <button type="button" class="rv-codigo" data-copiar="${esc(r.codigo)}">${esc(r.codigo)} ${ICO.copiar}</button></small></div></li>
                    <li><span>2</span><div><b>Toma una foto o captura de la boleta</b><small>Que se vea el monto, la fecha y el número de autorización.</small></div></li>
                    <li><span>3</span><div><b>Envíala por WhatsApp o Instagram</b><small>Así confirmamos tu lugar. Ya llevan tu reserva escrita.</small></div></li>
                </ol>
                <div class="rv-envio">
                    <a class="rv-btn rv-btn--wa" href="${esc(O.enlaceWhatsApp(prov, msg))}" target="_blank" rel="noopener">Enviar por WhatsApp</a>
                    <a class="rv-btn rv-btn--ig" href="${esc(O.enlaceInstagram(prov))}" target="_blank" rel="noopener" data-ig>Enviar por Instagram</a>
                </div>
                <p class="rv-nota">Instagram no permite precargar mensajes: al tocar el botón copiamos tu reserva para que la pegues en el chat.</p>`;
            pintarPie('Listo', { accion: 'cerrar' });
            h.hoja.querySelector('[data-ig]').addEventListener('click', () => { copiar(msg); toast('Reserva copiada: pégala en el chat de Instagram'); });
        }

        // ----- eventos generales del flujo -----
        h.hoja.addEventListener('click', e => {
            const t = e.target;
            if (t.closest('[data-atras]')) { if (f.paso > 1 && f.paso < 4) irA(f.paso - 1); return; }
            if (t.closest('[data-cambiar]')) { h.cerrar(); if (sel.tipoTour === 'privado') abrirCalendario(() => abrirFlujo()); return; }
            if (t.closest('[data-reintentar]')) { irA(1); return; }
            if (t.closest('[data-mas]')) {
                const b = t.closest('[data-mas]'), d = b.previousElementSibling, abierto = d.classList.toggle('rv-clamp');
                b.textContent = abierto ? 'Leer más' : 'Ver menos'; return;
            }
            const hb = t.closest('.rv-horas [data-hora]');
            if (hb) { const card = hb.closest('.rv-card'); card.dataset.hora = hb.dataset.hora; card.querySelectorAll('.rv-horas button').forEach(x => x.classList.toggle('on', x === hb)); return; }
            const cp = t.closest('[data-copiar]');
            if (cp) { copiar(cp.dataset.copiar); toast('Copiado'); return; }
            if (t.closest('[data-continuar]')) {
                const card = t.closest('.rv-card');
                f.oferta = f.ofertas.find(o => o.id === card.dataset.oferta);
                f.hora = card.dataset.hora || ''; f.reserva = null;
                irA(2); return;
            }
            if (t.closest('[data-siguiente]') && f.paso === 3) {
                if (!aceptoTodo()) { mostrarErrorAcepto(); return; }
                // constancia: qué versión de los términos aceptó y cuándo (viene de legal.js)
                const base = (typeof Legal !== 'undefined' && Legal.aceptacion) ? Legal.aceptacion() : { version: 'sin-version', fecha: new Date().toISOString() };
                f.reserva.aceptacion = { ...base, terminos: true, riesgos: true };
                irA(4); return;
            }
        });

        irA(1);
    }

    // ---------- Datos del cliente (se recuerdan solo mientras dure la pestaña) ----------
    function cargarCliente() {
        try { return { nombre: '', apellido: '', prefijo: '+502', telefono: '', correo: '', ...JSON.parse(sessionStorage.getItem('rv-cliente') || '{}') }; }
        catch (e) { return { nombre: '', apellido: '', prefijo: '+502', telefono: '', correo: '' }; }
    }
    function guardarCliente(c) { try { sessionStorage.setItem('rv-cliente', JSON.stringify(c)); } catch (e) { /* modo privado: no pasa nada */ } }

    // ---------- Punto de entrada ----------
    // cfg = { destino, contFecha, contPersonas, leerSeleccion(), alCambiar() }
    function iniciar(config) { cfg = config; montarCampos(); pintarFecha(); }

    return { iniciar, abrirDisponibilidad, actualizarTotal, get personas() { return est.personas; }, get fecha() { return est.fecha; } };
})();