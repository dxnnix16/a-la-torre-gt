// =========================================================
// A La Torre GT · script del inicio
// =========================================================
const sinMov = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---------------------------------------------------------
// 1) PANTALLA DE CARGA + imágenes que aparecen suaves
// ---------------------------------------------------------
(function () {
    const pre = document.getElementById('pre');
    const inicio = performance.now();
    let terminado = false;

    function terminar() {
        if (terminado) return;
        terminado = true;
        document.documentElement.classList.add('listo');
        if (pre) {
            pre.classList.add('fuera');
            setTimeout(() => pre.remove(), 800);
        }
    }
    function cuandoEsteListo() {
        const fuentes = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
        fuentes.then(() => setTimeout(terminar, Math.max(0, 500 - (performance.now() - inicio))));
    }
    if (document.readyState === 'complete') cuandoEsteListo();
    else window.addEventListener('load', cuandoEsteListo, { once: true });
    setTimeout(terminar, 3500); // por si algo tarda de más, nunca se queda pegada

    // Fundido de imágenes (clase .fade) al terminar de cargar
    window.activarFundidos = function (raiz) {
        (raiz || document).querySelectorAll('img.fade:not(.ok)').forEach(img => {
            const ok = () => img.classList.add('ok');
            if (img.complete) ok();
            else { img.addEventListener('load', ok, { once: true }); img.addEventListener('error', ok, { once: true }); }
        });
    };
    window.activarFundidos();
})();

// ---------------------------------------------------------
// 2) PAUSAR ANIMACIONES QUE NO SE VEN (menos trabajo = más fluidez)
// ---------------------------------------------------------
const vigilante = 'IntersectionObserver' in window
    ? new IntersectionObserver(entradas => {
        entradas.forEach(e => e.target.classList.toggle('pausa', !e.isIntersecting));
    }, { rootMargin: '120px' })
    : null;
['.navbar', '#marq'].forEach(sel => {
    const el = document.querySelector(sel);
    if (el && vigilante) vigilante.observe(el);
});

// ---------------------------------------------------------
// 2.5) LOS MÁS RESERVADOS (las 5 tarjetas se arman solas desde destinos-data.js)
//    - Las 2 primeras SIEMPRE son las de FIJOS (Acatenango y Fuego).
//    - Las otras 3 son los destinos con la salida grupal más próxima (por fecha),
//      sin repetir los fijos. Cuando una fecha pasa, el destino sale solo y entra el siguiente.
//    - Si hay menos de 3 con fecha, se completa con los mejor calificados.
//    Para anunciar una salida nueva basta agregar su fecha en `fechasGrupales`.
// ---------------------------------------------------------
(function () {
    const grid = document.querySelector('#mas-reservados .mas-res-grid');
    if (!grid || typeof destinos === 'undefined') return;

    const FIJOS = ['acatenango', 'fuego'];   // ids que siempre van primero, en este orden
    const TOTAL = 5;                         // cuántas tarjetas se muestran
    const CUPOS_POCOS = 6;                   // con estos cupos o menos dice "Quedan pocos cupos"
    const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
    const CATEGORIAS = { volcanes: 'Volcanes', lugares: 'Lugares' };
    // duraciones que ya tienen traducción en trad-inicio.js
    const DURACION_I18N = { '2 días / 1 noche': 'dur_2d1n', 'dos días y una noche': 'dur_dos_dias', 'Medio día': 'dur_medio', '1 día': 'dur_1d' };

    const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    const hoy = new Date(); hoy.setHours(0, 0, 0, 0);
    const fechaDe = f => new Date(f + 'T12:00:00');
    const nombreCorto = d => String(d.nombre || '').split(':')[0].trim();

    // próxima salida grupal futura y con cupos (del destino o de cualquiera de sus modalidades)
    function proxima(d) {
        const lista = [];
        const juntar = l => (l || []).forEach(f => { if (f && f.fecha && f.cupos !== 0 && fechaDe(f.fecha) >= hoy) lista.push(f); });
        juntar(d.fechasGrupales);
        if (d.modalidades) Object.values(d.modalidades).forEach(m => juntar(m.fechasGrupales));
        lista.sort((a, b) => a.fecha.localeCompare(b.fecha));
        return lista[0] || null;
    }
    // precio de la salida grupal en bus: el más bajo SIN contar los puntos "faldas del volcán"
    // (esos son llegar por tu cuenta, sin transporte). Si un destino no tiene precio grupal, usa el individual.
    function precioDesde(d) {
        const m = d.modalidades && d.modalidades[d.modalidadPorDefecto];
        const p = (m && m.precios) || d.precios;
        const tabla = p && (p.grupal || p.individual);
        if (tabla) {
            const entradas = Object.entries(tabla).filter(([, v]) => Number.isFinite(v));
            const conBus = entradas.filter(([punto]) => !/faldas/i.test(punto));
            const valores = (conBus.length ? conBus : entradas).map(([, v]) => v);
            if (valores.length) return Math.min(...valores);
        }
        return d.precioDesde != null ? d.precioDesde : null;
    }
    function duracionDe(d) {
        const m = d.modalidades && d.modalidades[d.modalidadPorDefecto];
        if (m && m.duracionTexto && m.duracionTexto !== 'TODO') return m.duracionTexto;
        return d.duracion || '';
    }

    // ---- elegir los 5 ----
    const elegidos = [];
    FIJOS.forEach(id => { const d = destinos.find(x => x.id === id); if (d) elegidos.push({ d, s: proxima(d) }); });
    destinos
        .filter(d => !FIJOS.includes(d.id))
        .map(d => ({ d, s: proxima(d) }))
        .filter(x => x.s)
        .sort((a, b) => a.s.fecha.localeCompare(b.s.fecha))          // empate de fecha: queda el orden de destinos-data.js
        .slice(0, Math.max(0, TOTAL - elegidos.length))
        .forEach(x => elegidos.push(x));
    if (elegidos.length < TOTAL) {                                    // relleno si faltan salidas
        destinos
            .filter(d => !elegidos.some(x => x.d === d))
            .sort((a, b) => (b.calificacion || 0) - (a.calificacion || 0))
            .slice(0, TOTAL - elegidos.length)
            .forEach(d => elegidos.push({ d, s: null }));
    }

    // ---- dibujar ----
    grid.innerHTML = elegidos.map(({ d, s }, i) => {
        const nombre = nombreCorto(d);
        const precio = precioDesde(d);
        const dur = duracionDe(d);
        const durKey = DURACION_I18N[dur];
        const e = d.exigencia;
        const exigente = e && e >= 7;
        const nivel = e ? `${e <= 3 ? 'Fácil' : e <= 6 ? 'Moderado' : 'Exigente'} · ${e}/10` : '';

        let tag;
        if (s) {
            const f = fechaDe(s.fecha);
            tag = (s.cupos != null && s.cupos <= CUPOS_POCOS)
                ? '<span class="tc-tag tc-tag-hot" data-i18n="inicio.tc.pocos">Quedan pocos cupos</span>'
                : `<span class="tc-tag">🗓️ Salida ${f.getDate()} ${MESES[f.getMonth()]}</span>`;
        } else if (d.id === FIJOS[0]) {
            tag = '<span class="tc-tag tc-tag-hot" data-i18n="inicio.tc.agota">🔥 Se agota fácil</span>';
        } else {
            tag = `<span class="tc-tag" data-i18n="inicio.tc.rank" data-i18n-n="${i + 1}">#${i + 1} Más reservado</span>`;
        }
        const cat = d.categoria === 'volcanes'
            ? '<span class="tc-cat" data-i18n="inicio.tc.cat_volcanes">Volcanes</span>'
            : `<span class="tc-cat">${esc(CATEGORIAS[d.categoria] || d.categoria || '')}</span>`;
        const precioTxt = precio == null ? '' : (typeof Moneda !== 'undefined' ? Moneda.formatear(precio) : 'Q ' + precio);

        return `
                <article class="tc">
                    <div class="tc-foto">
                        <img class="fade" src="${esc(d.imagen)}"${typeof Imagenes !== 'undefined' ? ` data-foto="${esc(Imagenes.base(d))}"` : ''} alt="${esc(nombre)}" loading="lazy" decoding="async">
                        ${tag}
                        <button type="button" class="tc-fav" aria-label="Guardar ${esc(nombre)}" data-i18n-attr="aria-label:inicio.tc.guardar" data-i18n-n="${esc(nombre)}" aria-pressed="false"><svg><use href="#i-corazon"/></svg></button>
                        ${cat}
                    </div>
                    <div class="tc-cuerpo">
                        <p class="tc-lugar"><svg><use href="#i-pin"/></svg>${esc(d.region)}</p>
                        <h3><a class="tc-link" href="detalle.html?id=${encodeURIComponent(d.id)}">${esc(nombre)}</a></h3>
                        <div class="tc-datos">
                            ${d.calificacion ? `<span class="tc-dato tc-nota">★ ${esc(d.calificacion)}</span>` : ''}
                            ${dur ? `<span class="tc-dato"${durKey ? ` data-i18n="inicio.tc.${durKey}"` : ''}><svg><use href="#i-reloj"/></svg>${esc(dur)}</span>` : ''}
                            ${nivel ? `<span class="tc-dato"${exigente ? ` data-i18n="inicio.tc.nivel_exigente" data-i18n-n="${e}"` : ''}><svg><use href="#i-monte"/></svg>${esc(nivel)}</span>` : ''}
                        </div>
                        <div class="tc-pie">
                            ${precio == null ? '<p class="tc-precio"></p>' : `<p class="tc-precio"><small data-i18n="inicio.tc.desde">desde</small><b data-gtq="${precio}">${precioTxt}</b><small data-i18n="inicio.tc.por_persona">por persona</small></p>`}
                            <span class="tc-ir" aria-hidden="true"><svg><use href="#i-flecha"/></svg></span>
                        </div>
                    </div>
                </article>`;
    }).join('');
    if (window.activarFundidos) window.activarFundidos(grid);
})();

// ---------------------------------------------------------
// 3) LOS MÁS RESERVADOS: corazón para guardar favoritos
// ---------------------------------------------------------
(function () {
    document.querySelectorAll('.tc-fav').forEach(btn => {
        btn.addEventListener('click', () => {
            const on = btn.classList.toggle('on');
            btn.setAttribute('aria-pressed', on ? 'true' : 'false');
        });
    });
})();

// ---------------------------------------------------------
// 4) TOP VOLCANES (las tarjetas se generan aquí, con carga diferida)
// ---------------------------------------------------------
(function () {
    const slider = document.getElementById('volcano-slider');
    if (!slider) return;
    // 5.º dato = id de la ficha en destinos-data.js (vacío = todavía no tiene página propia)
    const volcanes = [
        ['acatenango.png', 'Volcán Acatenango', 'Chimaltenango / Sacatepéquez', '4.9', 'acatenango'],
        ['fuego.jpeg', 'Volcán Fuego', 'Escuintla / Chimaltenango', '4.8', 'fuego'],
        ['pacaya.jpg', 'Volcán de Pacaya', 'Escuintla / Guatemala', '4.7', 'pacaya'],
        ['agua.jpg', 'Volcán de Agua', 'Sacatepéquez / Escuintla', '4.9', 'agua'],
        ['tajumulco.jpg', 'Volcán Tajumulco', 'San Marcos', '4.7', 'tajumulco'],
        ['atitlan.jpg', 'Volcán Atitlán', 'Sololá / Suchitepéquez', '4.7', ''],
        ['santamaria.jpg', 'Volcán Santa María', 'Quetzaltenango', '4.7', 'santa-maria'],
        ['tacana.jpg', 'Volcán Tacaná', 'San Marcos', '4.7', ''],
        ['toliman.jpg', 'Volcán Tolimán', 'Sololá', '4.7', ''],
        ['sanpedro.jpg', 'Volcán San Pedro', 'Sololá', '4.7', ''],
        ['viboras.jpg', 'Volcán Víboras', 'Jutiapa', '4.7', ''],
        ['tecuamburro.jpg', 'Volcán Tecuamburro', 'Santa Rosa', '4.7', ''],
        ['chingo.jpg', 'Volcán Chingo', 'Jutiapa', '4.7', '']
    ];
    slider.innerHTML = volcanes.map(v => {
        const etiqueta = v[4] ? 'a' : 'div';
        const enlace = v[4] ? ` href="detalle.html?id=${v[4]}" aria-label="Ver ${v[1]}"` : '';
        return `
        <${etiqueta} class="dest-card"${enlace}>
            <img class="fade" src="img/${v[0]}" alt="${v[1]}" loading="lazy" decoding="async">
            <div class="dest-price">desde Q 300</div>
            <div class="dest-info"><h3>${v[1]}</h3><p><span class="dest-loc">${v[2]}</span> <span class="dest-rate">⭐ ${v[3]}</span></p></div>
        </${etiqueta}>`;
    }).join('');
    window.activarFundidos(slider);

    const btnNext = document.getElementById('btn-next');
    const btnPrev = document.getElementById('btn-prev');
    btnNext.addEventListener('click', () => { slider.scrollLeft += 300; });
    btnPrev.addEventListener('click', () => { slider.scrollLeft -= 300; });
})();

// ---------------------------------------------------------
// 5) PRÓXIMAS SALIDAS GRUPALES (se arma solo desde destinos-data.js)
//    Para anunciar una salida nueva basta agregar su fecha en `fechasGrupales`
//    de ese destino; aquí aparece sola, ordenada por fecha, y desaparece cuando pasa.
// ---------------------------------------------------------
(function () {
    const seccion = document.getElementById('proximas-salidas');
    const caja = document.getElementById('summit-box');
    const puntos = document.getElementById('summit-dots');
    if (!seccion || !caja || typeof destinos === 'undefined') return;

    const MAX_ANUNCIOS = 6;          // cuántas salidas se muestran como máximo
    const CUPOS_POCOS = 6;           // con estos cupos o menos dice "¡Quedan N cupos!"
    const LARGO_TEXTO = 190;         // largo del texto si el destino no tiene campo `anuncio`
    const MESES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    const hoy = new Date(); hoy.setHours(0, 0, 0, 0);
    const fechaDe = f => new Date(f + 'T12:00:00');
    const bonita = f => { const d = fechaDe(f); return `${d.getDate()} de ${MESES[d.getMonth()]}, ${d.getFullYear()}`; };
    const nombreCorto = d => String(d.nombre || '').split(':')[0].trim();
    const modCorto = m => String(m || '').replace(/\s*\(.*?\)/g, '').trim();
    function recortar(t, n) {
        t = String(t || '').trim();
        if (t.length <= n) return t;
        return t.slice(0, n).replace(/\s+\S*$/, '') + '…';
    }

    // 1) juntar todas las salidas grupales futuras (del destino y de cada modalidad)
    const salidas = [];
    destinos.forEach(d => {
        const agregar = (lista, modalidad) => (lista || []).forEach(f => {
            if (!f || !f.fecha || fechaDe(f.fecha) < hoy) return;      // ya pasó
            if (f.cupos === 0) return;                                  // sin cupos: no se anuncia
            salidas.push({ d, fecha: f.fecha, cupos: f.cupos, modalidad });
        });
        agregar(d.fechasGrupales, '');
        if (d.modalidades) Object.values(d.modalidades).forEach(m => agregar(m.fechasGrupales, modCorto(m.nombre)));
    });
    salidas.sort((a, b) => a.fecha.localeCompare(b.fecha));
    const lista = salidas.slice(0, MAX_ANUNCIOS);
    if (!lista.length) return;                                          // sin salidas: el bloque queda oculto

    // 2) dibujar una diapositiva por salida
    lista.forEach((s, i) => {
        const d = s.d;
        const esVolcan = d.categoria === 'volcanes';
        const texto = d.anuncio || recortar(d.descripcion, LARGO_TEXTO);
        const cupos = s.cupos == null ? '' : (s.cupos <= CUPOS_POCOS ? `¡Quedan ${s.cupos} cupos!` : `${s.cupos} cupos disponibles`);
        const slide = document.createElement('div');
        slide.className = 'summit-slide' + (i === 0 ? ' active' : '');
        slide.style.background = `linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 100%), url("${d.imagen}") center/cover`;
        Imagenes.principal(d).then(u => { if (u && u !== d.imagen) slide.style.background = `linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 100%), url("${u}") center/cover`; });
        slide.innerHTML = `
            <img class="summit-foto" src="${esc(d.imagen)}" data-foto="${esc(Imagenes.base(d))}" alt="${esc(nombreCorto(d))}" loading="lazy" decoding="async">
            <div class="summit-content">
                <div class="summit-date">🗓️ ${esc(bonita(s.fecha))}${s.modalidad ? ' · ' + esc(s.modalidad) : ''}</div>
                <h2><span data-i18n="${esVolcan ? 'inicio.summit.proxima' : 'inicio.summit.proxima_salida'}">${esVolcan ? 'Próxima cumbre:' : 'Próxima salida:'}</span><br>${esc(nombreCorto(d))}</h2>
                <p>${esc(texto)}</p>
                <div>
                    <a href="detalle.html?id=${encodeURIComponent(d.id)}" class="btn-primary" data-i18n="inicio.summit.reservar">Ver itinerario y reservar</a>
                    ${cupos ? `<span style="margin-left:14px;font-weight:600;opacity:.95">${esc(cupos)}</span>` : ''}
                </div>
            </div>`;
        caja.insertBefore(slide, puntos);
        const punto = document.createElement('div');
        punto.className = 'dot' + (i === 0 ? ' active' : '');
        puntos.appendChild(punto);
    });
    seccion.style.display = '';
    if (lista.length < 2) { puntos.style.display = 'none'; return; }    // con una sola no hay carrusel

    // 3) carrusel automático (cada 4 segundos)
    const summitSlides = caja.querySelectorAll('.summit-slide');
    const dots = puntos.querySelectorAll('.dot');
    let actual = 0;
    let visible = true;
    if ('IntersectionObserver' in window) {
        new IntersectionObserver(es => { visible = es[0].isIntersecting; }).observe(caja);
    }
    function irA(i) {
        summitSlides[actual].classList.remove('active');
        dots[actual].classList.remove('active');
        actual = i % summitSlides.length;
        summitSlides[actual].classList.add('active');
        dots[actual].classList.add('active');
    }
    setInterval(() => { if (visible && !document.hidden) irA(actual + 1); }, 4000);
    dots.forEach((d, i) => { d.style.cursor = 'pointer'; d.addEventListener('click', () => irA(i)); });
})();

// ---------------------------------------------------------
// 6) CALIFICACIONES: números que suben + estrellas que se llenan + cinta infinita
// ---------------------------------------------------------
(function () {
    const sec = document.getElementById('resenas');
    if (!sec) return;

    // cinta: duplica las reseñas para que el ciclo sea continuo
    const pista = document.getElementById('marqTrack');
    if (pista) {
        [...pista.children].forEach(c => {
            const copia = c.cloneNode(true);
            copia.setAttribute('aria-hidden', 'true');
            pista.appendChild(copia);
        });
    }

    const nums = [...sec.querySelectorAll('.cuenta')];
    const formato = (el, v) => {
        const dec = parseInt(el.dataset.dec || '0', 10);
        const txt = dec ? v.toFixed(dec) : Math.round(v).toLocaleString('es-GT');
        return (el.dataset.pref || '') + txt + (el.dataset.suf || '');
    };
    if (!sinMov) nums.forEach(el => { el.textContent = formato(el, 0); });

    function animar() {
        sec.classList.add('visto');
        if (sinMov) return;
        const dur = 1800;
        const t0 = performance.now();
        (function paso(t) {
            const p = Math.min(1, (t - t0) / dur);
            const ease = 1 - Math.pow(1 - p, 3);
            nums.forEach(el => { el.textContent = formato(el, parseFloat(el.dataset.valor) * ease); });
            if (p < 1) requestAnimationFrame(paso);
        })(t0);
    }

    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver(es => {
            if (es[0].isIntersecting) { animar(); io.disconnect(); }
        }, { threshold: 0.35 });
        io.observe(sec);
    } else {
        animar();
    }
})();


// ==========================================
// BARRA DE BÚSQUEDA DEL HERO
// ==========================================
(function () {
    const fieldSearch = document.getElementById('field-search');
    const fieldDate = document.getElementById('field-date');
    const fieldPeople = document.getElementById('field-people');

    const dropdownSearch = document.getElementById('dropdown-search');
    const dropdownDate = document.getElementById('dropdown-date');
    const dropdownPeople = document.getElementById('dropdown-people');
    const allDropdowns = [dropdownSearch, dropdownDate, dropdownPeople];

    const heroSearch = document.getElementById('hero-search');
    const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    const esMovil = () => window.matchMedia('(max-width: 768px)').matches;
    let movilAbierto = false;
    const panelDe = { buscar: dropdownSearch, fecha: dropdownDate, personas: dropdownPeople };

    function closeAllDropdowns() {
        if (movilAbierto) return; // en el celular el buscador solo se cierra con la flecha de volver
        allDropdowns.forEach(d => d.classList.remove('active'));
    }
    function toggleDropdown(dropdown) {
        if (movilAbierto) {
            irPanel(dropdown === dropdownDate ? 'fecha' : dropdown === dropdownPeople ? 'personas' : 'buscar');
            return;
        }
        const isActive = dropdown.classList.contains('active');
        closeAllDropdowns();
        if (!isActive) dropdown.classList.add('active');
    }

    fieldSearch.addEventListener('click', (e) => { e.stopPropagation(); if (esMovil()) { abrirMovil('buscar'); return; } renderRecentSearches(); toggleDropdown(dropdownSearch); });
    fieldDate.addEventListener('click', (e) => { e.stopPropagation(); if (esMovil()) { abrirMovil('fecha'); return; } toggleDropdown(dropdownDate); });
    fieldPeople.addEventListener('click', (e) => { e.stopPropagation(); if (esMovil()) { abrirMovil('personas'); return; } toggleDropdown(dropdownPeople); });
    allDropdowns.forEach(d => d.addEventListener('click', (e) => e.stopPropagation()));
    document.addEventListener('click', closeAllDropdowns);

    // --- BÚSQUEDAS RECIENTES ---
    const searchInput = document.getElementById('search-input');
    const recentList = document.getElementById('recent-searches-list');
    // --- AL PRESIONAR ENTER EN EL BUSCADOR, ABRE EL CALENDARIO ---
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const term = searchInput.value.trim();
            if (term) saveRecentSearch(term);
            closeAllDropdowns();
            toggleDropdown(dropdownDate);
        }
    });
    function getRecentSearches() {
        try { return JSON.parse(localStorage.getItem('recentSearches') || '[]'); } catch (e) { return []; }
    }
    function saveRecentSearch(term) {
        if (!term.trim()) return;
        let recents = getRecentSearches().filter(t => t.toLowerCase() !== term.toLowerCase());
        recents.unshift(term);
        try { localStorage.setItem('recentSearches', JSON.stringify(recents.slice(0, 5))); } catch (e) { /* sin almacenamiento */ }
    }
    function renderRecentSearches() {
        const recents = getRecentSearches();
        recentList.innerHTML = recents.length === 0
            ? '<p class="no-recent">Aún no tienes búsquedas recientes.</p>'
            : recents.map(term => `
                <div class="recent-item" data-term="${esc(term)}">
                    <div class="recent-icon">🕐</div>
                    <div class="recent-text"><strong>${esc(term)}</strong></div>
                </div>`).join('');
        recentList.querySelectorAll('.recent-item').forEach(item => {
            item.addEventListener('click', () => {
                searchInput.value = item.dataset.term;
                closeAllDropdowns();
                if (movilAbierto) irPanel('fecha');
            });
        });
    }

    // --- MÓVIL: buscador a pantalla completa (como GetYourGuide) ---
    const sugerencias = [
        ['Volcán de Fuego', 'Escuintla / Chimaltenango'],
        ['Volcán Acatenango', 'Chimaltenango / Sacatepéquez'],
        ['Volcán de Pacaya', 'Escuintla / Guatemala'],
        ['Volcán de Agua', 'Sacatepéquez / Escuintla'],
        ['Volcán Tajumulco', 'San Marcos'],
        ['Volcán Atitlán', 'Sololá / Suchitepéquez'],
        ['Volcán Santa María', 'Quetzaltenango'],
        ['Volcán Tacaná', 'San Marcos'],
        ['Volcán Tolimán', 'Sololá'],
        ['Volcán San Pedro', 'Sololá'],
        ['Volcán Víboras', 'Jutiapa'],
        ['Volcán Tecuamburro', 'Santa Rosa'],
        ['Volcán Chingo', 'Jutiapa']
    ];
    const sugList = document.getElementById('sugerencias-list');
    // Sugerencias que perdonan errores ("bolcan", "pakaya", "acatenago"…) y salen ordenadas por parecido
    function renderSugerencias() {
        const cons = Buscador.consulta(searchInput.value);
        const lista = cons.activo
            ? sugerencias
                .map(s => ({ s, p: Buscador.puntuar(cons, Buscador.indexar([{ texto: s[0], peso: 3 }, { texto: s[1], peso: 2 }]), true) }))
                .filter(x => x.p > 0)
                .sort((a, b) => b.p - a.p)
                .slice(0, 8)
                .map(x => x.s)
            : sugerencias.slice(0, 6);
        sugList.innerHTML = lista.length === 0
            ? '<p class="no-recent">Sin coincidencias. Presiona Enter para continuar con tu búsqueda.</p>'
            : lista.map(s => `
                <div class="sug-item" data-term="${esc(s[0])}">
                    <span class="sug-ico"></span>
                    <div><strong>${esc(s[0])}</strong><small>${esc(s[1])}</small></div>
                </div>`).join('');
    }
    sugList.addEventListener('click', (e) => {
        const it = e.target.closest('.sug-item');
        if (!it) return;
        searchInput.value = it.dataset.term;
        saveRecentSearch(it.dataset.term);
        irPanel('fecha');
    });
    searchInput.addEventListener('input', () => { if (movilAbierto) renderSugerencias(); });

    function irPanel(nombre) {
        heroSearch.dataset.panel = nombre;
        allDropdowns.forEach(d => d.classList.toggle('active', d === panelDe[nombre]));
        if (nombre === 'buscar') { renderRecentSearches(); renderSugerencias(); searchInput.focus(); }
        else searchInput.blur(); // baja el teclado al pasar a fecha o participantes
    }
    function abrirMovil(nombre) {
        if (!movilAbierto) {
            movilAbierto = true;
            heroSearch.classList.add('abierto');
            document.documentElement.classList.add('ms-bloqueo');
        }
        irPanel(nombre);
    }
    function cerrarMovil() {
        if (!movilAbierto) return;
        movilAbierto = false;
        heroSearch.classList.remove('abierto');
        heroSearch.removeAttribute('data-panel');
        document.documentElement.classList.remove('ms-bloqueo');
        allDropdowns.forEach(d => d.classList.remove('active'));
        searchInput.blur();
    }
    document.getElementById('ms-atras').addEventListener('click', (e) => { e.stopPropagation(); cerrarMovil(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') cerrarMovil(); });
    window.matchMedia('(max-width: 768px)').addEventListener('change', (e) => { if (!e.matches) cerrarMovil(); });

    // --- CALENDARIO DE DOS MESES CON RANGO ---
    const dateLabel = document.getElementById('date-label');
    const meses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
    const diasSemana = ['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'];
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    let viewYear = today.getFullYear();
    let viewMonth = today.getMonth();
    let rangeStart = null;
    let rangeEnd = null;

    function formatDateShort(d) {
        return d.toLocaleDateString('es-GT', { day: 'numeric', month: 'short' });
    }
    function updateDateLabel() {
        if (!rangeStart) { dateLabel.textContent = 'Cualquier fecha'; return; }
        if (!rangeEnd || rangeStart.getTime() === rangeEnd.getTime()) {
            dateLabel.textContent = formatDateShort(rangeStart);
            return;
        }
        if (rangeStart.getMonth() === rangeEnd.getMonth()) {
            dateLabel.textContent = `${rangeStart.getDate()}–${formatDateShort(rangeEnd)}`;
        } else {
            dateLabel.textContent = `${formatDateShort(rangeStart)} – ${formatDateShort(rangeEnd)}`;
        }
    }

    function handleDayClick(dateObj) {
        if (!rangeStart || (rangeStart && rangeEnd)) {
            rangeStart = dateObj; rangeEnd = null;
        } else if (dateObj < rangeStart) {
            rangeStart = dateObj; rangeEnd = null;
        } else {
            rangeEnd = dateObj;
            closeAllDropdowns();
        }
        updateDateLabel();
        renderCalendars();
    }
    function clearPreview() {
        document.querySelectorAll('.calendar-day').forEach(el => {
            el.classList.remove('in-range-preview', 'range-end-preview');
        });
    }

    function previewRange(hoverDate) {
        clearPreview();
        if (!rangeStart || rangeEnd || hoverDate <= rangeStart) return;
        document.querySelectorAll('.calendar-day:not(.empty):not(.disabled)').forEach(el => {
            const t = parseInt(el.dataset.time);
            if (!t) return;
            const d = new Date(t);
            if (d > rangeStart && d < hoverDate) el.classList.add('in-range-preview');
            if (d.getTime() === hoverDate.getTime()) el.classList.add('range-end-preview');
        });
    }
    function renderMonthGrid(gridId, labelId, year, month) {
        const grid = document.getElementById(gridId);
        document.getElementById(labelId).textContent = `${meses[month]} de ${year}`;
        grid.innerHTML = '';
        diasSemana.forEach(d => {
            const el = document.createElement('div');
            el.className = 'calendar-day-name';
            el.textContent = d;
            grid.appendChild(el);
        });
        const firstDay = new Date(year, month, 1);
        const startOffset = (firstDay.getDay() + 6) % 7;
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        for (let i = 0; i < startOffset; i++) {
            const empty = document.createElement('div');
            empty.className = 'calendar-day empty';
            grid.appendChild(empty);
        }
        for (let day = 1; day <= daysInMonth; day++) {
            const dateObj = new Date(year, month, day);
            const el = document.createElement('div');
            el.className = 'calendar-day';
            el.textContent = day;
            el.dataset.time = dateObj.getTime();
            if (dateObj < today) {
                el.classList.add('disabled');
            } else {
                el.addEventListener('click', () => handleDayClick(dateObj));
                el.addEventListener('mouseenter', () => previewRange(dateObj));
                if (rangeStart && dateObj.getTime() === rangeStart.getTime()) el.classList.add('range-start');
                if (rangeEnd && dateObj.getTime() === rangeEnd.getTime()) el.classList.add('range-end');
                if (rangeStart && rangeEnd && dateObj > rangeStart && dateObj < rangeEnd) el.classList.add('in-range');
            }
            grid.appendChild(el);
        }
    }

    function renderCalendars() {
        renderMonthGrid('calendar-grid-1', 'calendar-month-label-1', viewYear, viewMonth);
        let nextMonth = viewMonth + 1, nextYear = viewYear;
        if (nextMonth > 11) { nextMonth = 0; nextYear++; }
        renderMonthGrid('calendar-grid-2', 'calendar-month-label-2', nextYear, nextMonth);
    }

    document.getElementById('cal-prev').addEventListener('click', () => { viewMonth--; if (viewMonth < 0) { viewMonth = 11; viewYear--; } renderCalendars(); });
    document.getElementById('cal-next').addEventListener('click', () => { viewMonth++; if (viewMonth > 11) { viewMonth = 0; viewYear++; } renderCalendars(); });
    document.getElementById('calendar-months').addEventListener('mouseleave', clearPreview);
    document.querySelectorAll('.quick-date-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const quick = btn.dataset.quick;
            let start = new Date(today);
            let end = new Date(today);
            if (quick === 'manana') { start.setDate(start.getDate() + 1); end = new Date(start); }
            if (quick === 'finde') {
                const day = start.getDay();
                start.setDate(start.getDate() + ((6 - day + 7) % 7 || 7)); // sábado
                end = new Date(start);
                end.setDate(end.getDate() + 1); // domingo
            }
            rangeStart = start; rangeEnd = end;
            updateDateLabel();
            closeAllDropdowns();
        });
    });
    renderCalendars();

    // pie del calendario en el celular
    document.getElementById('ms-reset').addEventListener('click', () => { rangeStart = null; rangeEnd = null; updateDateLabel(); renderCalendars(); });
    document.getElementById('ms-saltar').addEventListener('click', () => irPanel('personas'));
    document.getElementById('ms-continuar').addEventListener('click', () => irPanel('personas'));

    // --- PARTICIPANTES + EDAD POR NIÑO ---
    const adultsCount = document.getElementById('adults-count');
    const childrenCount = document.getElementById('children-count');
    const peopleLabel = document.getElementById('people-label');
    const childrenAgesList = document.getElementById('children-ages-list');
    let adults = 1, children = 0;
    let childrenAges = [];

    function renderChildrenAges() {
        childrenAgesList.innerHTML = '';
        childrenAges = childrenAges.slice(0, children);
        for (let i = 0; i < children; i++) {
            if (childrenAges[i] === undefined) childrenAges[i] = 5;
            const options = Array.from({ length: 18 }, (_, age) =>
                `<option value="${age}" ${childrenAges[i] === age ? 'selected' : ''}>${age === 0 ? 'Menos de 1 año' : age + (age === 1 ? ' año' : ' años')}</option>`
            ).join('');
            const row = document.createElement('div');
            row.className = 'child-age-row';
            row.innerHTML = `<span>Edad del niño ${i + 1}</span><select class="child-age-select" data-index="${i}">${options}</select>`;
            childrenAgesList.appendChild(row);
        }
        childrenAgesList.querySelectorAll('.child-age-select').forEach(sel => {
            sel.addEventListener('change', (e) => {
                childrenAges[parseInt(e.target.dataset.index)] = parseInt(e.target.value);
            });
        });
    }

    function updatePeopleLabel() {
        const total = adults + children;
        peopleLabel.textContent = total === 1 ? '1 participante' : `${total} participantes`;
        adultsCount.textContent = adults;
        childrenCount.textContent = children;
        document.getElementById('adults-minus').disabled = adults <= 1;
        document.getElementById('children-minus').disabled = children <= 0;
    }
    document.getElementById('adults-plus').addEventListener('click', () => { adults++; updatePeopleLabel(); });
    document.getElementById('adults-minus').addEventListener('click', () => { if (adults > 1) { adults--; updatePeopleLabel(); } });
    document.getElementById('children-plus').addEventListener('click', () => { children++; updatePeopleLabel(); renderChildrenAges(); });
    document.getElementById('children-minus').addEventListener('click', () => { if (children > 0) { children--; updatePeopleLabel(); renderChildrenAges(); } });
    updatePeopleLabel();

    // --- BOTÓN BUSCAR ---
    document.getElementById('search-submit').addEventListener('click', () => {
        const term = searchInput.value.trim();
        if (term) saveRecentSearch(term);
        cerrarMovil();
        closeAllDropdowns();

        // Lleva todo lo elegido a la página de destinos (ella filtra y muestra los resultados)
        const iso = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
        const p = new URLSearchParams();
        if (term) p.set('q', term);
        if (rangeStart) {
            p.set('desde', iso(rangeStart));
            if (rangeEnd && rangeEnd.getTime() !== rangeStart.getTime()) p.set('hasta', iso(rangeEnd));
        }
        if (adults !== 1) p.set('adultos', adults);
        if (children > 0) { p.set('ninos', children); p.set('edades', childrenAges.join(',')); }
        const qs = p.toString();
        window.location.href = 'destinos.html' + (qs ? '?' + qs : '');
    });
})();