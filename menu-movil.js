/* =========================================================
   MENÚ DE LAS TRES RAYITAS (solo teléfono) · A La Torre GT
   Archivo independiente: para tenerlo en otra página solo agrega
   <script src="menu-movil.js" defer></script> dentro de su <head>.
   Para agregar o quitar páginas del menú edita la lista "paginas".
   ========================================================= */
(function () {
    if (document.querySelector('.mm-btn')) return;

    const paginas = [
        ['Inicio',     'index.html',    '<path d="M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>'],
        ['Destinos',   'destinos.html', '<path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>'],
        ['La Revista', 'revista.html',  '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/>'],
        ['Staff',      'staff.html',    '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.5 3-6 6.5-6s6.5 2.5 6.5 6"/><circle cx="17.5" cy="9" r="2.5"/><path d="M17.5 14c2.5 0 4.5 1.8 4.5 4.5"/>'],
        ['Contacto',   'contacto.html', '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>']
    ];
    const actual = (location.pathname.split('/').pop() || 'index.html').toLowerCase();

    const css = `
    .mm-btn, .mm-fondo, .mm-panel { display: none; }
    @media (max-width: 768px) {
        html.mm-bloqueo, html.mm-bloqueo body { overflow: hidden; }
        .mm-btn {
            display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 4px;
            position: fixed; top: calc(10px + env(safe-area-inset-top, 0px)); left: 12px; z-index: 9000;
            width: 44px; height: 44px; padding: 0; border: 1px solid rgba(26, 27, 38, 0.08); border-radius: 50%;
            background: #fff; box-shadow: 0 4px 14px rgba(26, 27, 38, 0.15); cursor: pointer;
            transition: opacity 0.4s ease, transform 0.2s ease;
        }
        .mm-btn:active { transform: scale(0.94); }
        .mm-btn span { display: block; width: 18px; height: 2px; border-radius: 2px; background: #1a1b26; }
        /* se esconde solo mientras exista la pantalla de carga del inicio (#pre); en las demás páginas siempre se ve */
        .js:has(#pre:not(.fuera)) .mm-btn { opacity: 0; pointer-events: none; }
        .mm-btn.mm-oculto { opacity: 0; pointer-events: none; transform: translateY(-14px); }
        .mm-fondo { display: block; position: fixed; inset: 0; z-index: 99980; background: rgba(26, 27, 38, 0.5); opacity: 0; visibility: hidden; transition: opacity 0.3s ease, visibility 0.3s; }
        .mm-abierto .mm-fondo { opacity: 1; visibility: visible; }
        .mm-panel {
            display: flex; flex-direction: column; position: fixed; top: 0; bottom: 0; left: 0; z-index: 99990;
            width: min(86vw, 340px); box-sizing: border-box; padding: calc(18px + env(safe-area-inset-top, 0px)) 18px calc(18px + env(safe-area-inset-bottom, 0px));
            background: #fff; border-radius: 0 24px 24px 0; box-shadow: 8px 0 30px rgba(26, 27, 38, 0.25);
            transform: translateX(-105%); visibility: hidden; transition: transform 0.32s cubic-bezier(0.2, 0.8, 0.2, 1), visibility 0.32s;
        }
        .mm-abierto .mm-panel { transform: none; visibility: visible; }
        .mm-top { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 18px; }
        .mm-logo { display: inline-flex; align-items: center; gap: 8px; min-width: 0; text-decoration: none; color: #85420b; }
        .mm-logo img { height: 34px; width: auto; display: block; }
        .mm-logo b { font-size: 1.1rem; font-weight: 800; white-space: nowrap; }
        .mm-cerrar { flex: none; display: grid; place-items: center; width: 40px; height: 40px; border: 0; border-radius: 50%; background: #f5f6f9; color: #1a1b26; cursor: pointer; }
        .mm-cerrar svg { width: 20px; height: 20px; }
        .mm-nav { display: flex; flex-direction: column; gap: 4px; }
        .mm-nav a { display: flex; align-items: center; gap: 14px; padding: 14px 14px; border-radius: 16px; text-decoration: none; font-weight: 600; font-size: 1.05rem; color: #1a1b26; }
        .mm-nav a svg { flex: none; width: 22px; height: 22px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
        .mm-nav a:active { background: #f5f6f9; }
        .mm-nav a.mm-actual { background: #1a1b26; color: #fff; }
    }
    @media (prefers-reduced-motion: reduce) { .mm-panel, .mm-fondo, .mm-btn { transition: none; } }`;
    const st = document.createElement('style');
    st.id = 'mm-css';
    st.textContent = css;
    document.head.appendChild(st);

    const wrap = document.createElement('div');
    wrap.innerHTML = `
        <button type="button" class="mm-btn" aria-label="Abrir menú" aria-expanded="false" aria-controls="mm-panel"><span></span><span></span><span></span></button>
        <div class="mm-fondo"></div>
        <aside class="mm-panel" id="mm-panel" aria-label="Menú principal" aria-hidden="true">
            <div class="mm-top">
                <a class="mm-logo" href="index.html"><img src="img/logo.png" alt="" onerror="this.remove()"><b>A La Torre GT</b></a>
                <button type="button" class="mm-cerrar" aria-label="Cerrar menú"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg></button>
            </div>
            <nav class="mm-nav">${paginas.map(p => `
                <a href="${p[1]}"${p[1] === actual ? ' class="mm-actual" aria-current="page"' : ''}><svg viewBox="0 0 24 24" aria-hidden="true">${p[2]}</svg>${p[0]}</a>`).join('')}
            </nav>
        </aside>`;
    while (wrap.firstChild) document.body.appendChild(wrap.firstChild);

    const root = document.documentElement;
    const btn = document.querySelector('.mm-btn');
    const panel = document.getElementById('mm-panel');
    const cerrar = panel.querySelector('.mm-cerrar');

    function abrir() {
        root.classList.add('mm-abierto', 'mm-bloqueo');
        btn.setAttribute('aria-expanded', 'true');
        panel.setAttribute('aria-hidden', 'false');
        setTimeout(() => cerrar.focus(), 50);
    }
    function cerrarMenu() {
        if (!root.classList.contains('mm-abierto')) return;
        root.classList.remove('mm-abierto', 'mm-bloqueo');
        btn.setAttribute('aria-expanded', 'false');
        panel.setAttribute('aria-hidden', 'true');
        btn.focus();
    }
    btn.addEventListener('click', abrir);
    cerrar.addEventListener('click', cerrarMenu);
    document.querySelector('.mm-fondo').addEventListener('click', cerrarMenu);
    panel.querySelectorAll('.mm-nav a').forEach(a => a.addEventListener('click', () => {
        root.classList.remove('mm-abierto', 'mm-bloqueo'); // al navegar a otra página
    }));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') cerrarMenu(); });

    // el botón se esconde al bajar (para no tapar el contenido) y reaparece al subir
    let ultimoY = window.scrollY, pendiente = false;
    window.addEventListener('scroll', () => {
        if (pendiente) return;
        pendiente = true;
        requestAnimationFrame(() => {
            const y = window.scrollY;
            const oculto = y > 140 && y > ultimoY;
            btn.classList.toggle('mm-oculto', oculto);
            ultimoY = y;
            pendiente = false;
        });
    }, { passive: true });
    window.matchMedia('(max-width: 768px)').addEventListener('change', (e) => { if (!e.matches) cerrarMenu(); });
})();
