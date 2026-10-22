/* =========================================================
   PÁGINA DE ASESORES · A La Torre GT
   - Brasas del hero, aparición al hacer scroll, simulador de ganancias
   - Envío del formulario por WhatsApp o Instagram
   Para cambiar los contactos edita las dos constantes de abajo.
   ========================================================= */
(function () {
    const WHATSAPP = '50230554595';   // 502 + número
    const INSTAGRAM = 'alatorregt';   // sin la @
    const reducir = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---- Brasas ---- */
    const brasas = null; // (las brasas del hero ya no se usan)
    if (brasas && !reducir) {
        for (let i = 0; i < 22; i++) {
            const s = document.createElement('span');
            s.style.left = (8 + Math.random() * 84) + '%';
            s.style.setProperty('--dx', (Math.random() * 120 - 60) + 'px');
            s.style.animationDuration = (5 + Math.random() * 6) + 's';
            s.style.animationDelay = (-Math.random() * 10) + 's';
            const t = 3 + Math.random() * 4;
            s.style.width = s.style.height = t + 'px';
            brasas.appendChild(s);
        }
    }

    /* ---- Cuenta animada ---- */
    function contar(el, hasta, dur, formato) {
        if (reducir) { el.textContent = formato(hasta); return; }
        const t0 = performance.now();
        (function paso(t) {
            const k = Math.min((t - t0) / dur, 1);
            const e = 1 - Math.pow(1 - k, 3);
            el.textContent = formato(Math.round(hasta * e));
            if (k < 1) requestAnimationFrame(paso);
        })(t0);
    }
    const Q = n => 'Q' + n.toLocaleString('es-GT');

    /* ---- Aparecer al hacer scroll ---- */
    const items = document.querySelectorAll('.as-rev');
    items.forEach((el, i) => {
        const hermanos = el.parentElement.querySelectorAll(':scope > .as-rev');
        el.style.setProperty('--d', (Array.prototype.indexOf.call(hermanos, el) * 0.09) + 's');
    });
    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((es) => {
            es.forEach(e => {
                if (!e.isIntersecting) return;
                e.target.classList.add('as-vis');
                e.target.querySelectorAll('[data-cuenta]').forEach(n => contar(n, +n.dataset.cuenta, 1200, Q));
                io.unobserve(e.target);
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
        items.forEach(el => io.observe(el));
    } else {
        items.forEach(el => el.classList.add('as-vis'));
    }

    /* ---- Simulador ---- */
    const rango = document.getElementById('as-personas');
    const valor = document.getElementById('as-personas-val');
    const total = document.getElementById('as-total');
    const COMISION = 25;
    let actual = 250, anim;
    function pintarRango() {
        const p = (rango.value - rango.min) / (rango.max - rango.min) * 100;
        rango.style.setProperty('--p', p + '%');
        valor.textContent = rango.value;
    }
    function animarTotal() {
        const meta = rango.value * COMISION, ini = actual, t0 = performance.now();
        cancelAnimationFrame(anim);
        (function paso(t) {
            const k = reducir ? 1 : Math.min((t - t0) / 350, 1);
            actual = Math.round(ini + (meta - ini) * k);
            total.textContent = Q(actual);
            if (k < 1) anim = requestAnimationFrame(paso);
        })(t0);
        total.classList.remove('as-pop'); void total.offsetWidth; total.classList.add('as-pop');
    }
    if (rango) {
        pintarRango();
        rango.addEventListener('input', () => { pintarRango(); animarTotal(); });
    }

    /* ---- Formulario ---- */
    const nombre = document.getElementById('as-nombre');
    const error = document.getElementById('as-error');
    const toast = document.getElementById('as-toast');
    const radio = n => (document.querySelector('input[name="' + n + '"]:checked') || {}).value || 'Sin responder';

    function armarMensaje() {
        const tel = document.getElementById('as-tel').value.trim();
        const motivo = document.getElementById('as-motivo').value.trim();
        return [
            'Hola, quiero ser asesor de ventas en A La Torre GT.',
            '',
            'Nombre: ' + nombre.value.trim(),
            tel ? 'Teléfono: ' + tel : null,
            'Experiencia en asesoría de ventas: ' + radio('ventas'),
            'Servicio al cliente: ' + radio('cliente'),
            'Conocimiento de volcanes y montaña: ' + radio('monte'),
            'Motivación: ' + (motivo || 'Sin responder'),
            '',
            'Quedo atento(a) para coordinar la llamada. ¡Gracias!'
        ].filter(l => l !== null).join('\n');
    }
    function valido() {
        const ok = nombre.value.trim().length > 1;
        error.hidden = ok;
        if (!ok) nombre.focus();
        return ok;
    }
    function aviso() {
        toast.classList.add('as-on');
        setTimeout(() => toast.classList.remove('as-on'), 4200);
    }
    async function copiar(txt) {
        try { await navigator.clipboard.writeText(txt); return true; } catch (e) {}
        const ta = document.createElement('textarea');
        ta.value = txt; ta.style.position = 'fixed'; ta.style.opacity = '0';
        document.body.appendChild(ta); ta.select();
        let ok = false; try { ok = document.execCommand('copy'); } catch (e) {}
        ta.remove(); return ok;
    }

    document.getElementById('as-wa').addEventListener('click', () => {
        if (!valido()) return;
        window.open('https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(armarMensaje()), '_blank', 'noopener');
    });
    document.getElementById('as-ig').addEventListener('click', async () => {
        if (!valido()) return;
        // Instagram no permite precargar el texto: se copia y se abre el chat
        const ok = await copiar(armarMensaje());
        if (ok) aviso();
        window.open('https://ig.me/m/' + INSTAGRAM, '_blank', 'noopener');
    });
    nombre.addEventListener('input', () => { if (nombre.value.trim().length > 1) error.hidden = true; });
    document.getElementById('as-form').addEventListener('submit', e => e.preventDefault());
})();