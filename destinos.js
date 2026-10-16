/* =========================================================
   DESTINOS · A La Torre GT
   Lee el arreglo `destinos` de destinos-data.js y pinta una
   tarjeta por cada volcán / lugar. Cada tarjeta abre:
       detalle.html?id=<id del destino>
   Para agregar uno nuevo solo agrégalo en destinos-data.js.
   ========================================================= */
(function () {
  'use strict';

  /* ---------- ajustes que puedes tocar ---------- */
  const CARGA_MS = 900;        // cuánto se ve la animación de carga al abrir la página
  const ESQUELETOS = 8;        // cuántas tarjetas "fantasma" se muestran mientras carga
  const CATEGORIAS = {         // nombre bonito de cada categoría (la clave es "categoria" en destinos-data.js)
    volcanes: 'Volcanes',
    lugares: 'Lugares turísticos'
  };

  const sinMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = id => document.getElementById(id);

  const grid = $('dsGrid');
  const vacio = $('dsVacio');
  const chipsBox = $('dsChips');
  const ordenSelect = $('dsOrden');
  const titulo = $('dsTituloResultados');
  const chipTexto = $('dsChipTexto');
  const progreso = $('dsProgreso');
  const searchInput = $('search-input');
  const navBusca = null;   // el buscador chiquito del navbar se cambió por idioma/moneda + login

  if (!grid || typeof destinos === 'undefined') return;

  /* ---------- estado ---------- */
  const estado = { q: '', cat: 'todos', orden: 'recomendados' };
  let rangeStart = null;
  let rangeEnd = null;
  let adults = 1, children = 0;

  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  /* ---------- utilidades ---------- */
  const norm = s => String(s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const etiquetaCat = c => CATEGORIAS[c] || (c ? c.charAt(0).toUpperCase() + c.slice(1) : 'Otros');
  const nombreCorto = d => String(d.nombre || '').split(':')[0].trim();
  const isoFecha = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const leerFecha = t => { const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(t || ''); return m ? new Date(+m[1], +m[2] - 1, +m[3]) : null; };
  const fechaCorta = f => new Date(f + 'T12:00:00').toLocaleDateString('es-GT', { weekday: 'short', day: 'numeric', month: 'short' });

  function getFavoritos() {
    try { return JSON.parse(localStorage.getItem('favoritos') || '[]'); } catch (e) { return []; }
  }
  function setFavoritos(lista) {
    try { localStorage.setItem('favoritos', JSON.stringify(lista)); } catch (e) { /* sin almacenamiento */ }
  }

  /* ---------- datos de cada destino (misma lógica que detalle.js) ---------- */
  function totalPersonas() { return adults + children; }

  function preciosDe(d) {
    const m = d.modalidades && d.modalidades[d.modalidadPorDefecto];
    return (m && m.precios) || d.precios || null;
  }
  /* Precio de la salida grupal MÁS CARA (la del punto más lejano) cuando el destino tiene una salida grupal vigente.
     Si no tiene, devuelve null y cada tarjeta usa su regla de siempre. */
  function precioGrupalMasCaro(d) {
    if (!d.modalidades) return null;
    const n = new Date();
    const hoy = n.getFullYear() + '-' + String(n.getMonth() + 1).padStart(2, '0') + '-' + String(n.getDate()).padStart(2, '0');
    const vig = fs => (typeof Ofertas !== 'undefined' && Ofertas.vigentes) ? Ofertas.vigentes(fs) : fs.filter(f => f.fecha >= hoy);
    const claves = Object.keys(d.modalidades).filter(k => vig(d.modalidades[k].fechasGrupales || []).length > 0);
    if (!claves.length) return null;
    const k = claves.includes(d.modalidadPorDefecto) ? d.modalidadPorDefecto : claves[0];
    const p = d.modalidades[k].precios || d.precios;
    const tabla = p && (p.grupal || p.grupo);
    const valores = tabla ? Object.values(tabla).filter(Number.isFinite) : [];
    return valores.length ? Math.max(...valores) : null;
  }
  function precioDesde(d) {
    const gMax = precioGrupalMasCaro(d);
    if (gMax != null) return { monto: gMax, grupo: false, salidaGrupal: true };   // salida grupal vigente: la más cara
    const p = preciosDe(d);
    if (p && p.individual) {
      const usarGrupo = totalPersonas() >= 2 && p.grupo;
      const valores = Object.values(usarGrupo ? p.grupo : p.individual);
      return valores.length ? { monto: Math.min(...valores), grupo: !!usarGrupo } : null;
    }
    // Destinos SIN tour individual (ej. Rostro Maya: solo salida grupal) u otras tablas de precios:
    // se toma el precio más bajo de cualquier tabla que exista (grupal, grupo, etc.).
    if (p) {
      const valores = Object.values(p)
        .flatMap(t => (t && typeof t === 'object') ? Object.values(t) : [])
        .filter(Number.isFinite);
      if (valores.length) return { monto: Math.min(...valores), grupo: false };
    }
    return d.precioDesde != null ? { monto: d.precioDesde, grupo: false } : null;
  }
  function duracionDe(d) {
    if (d.modalidades && d.modalidadPorDefecto) {
      const m = d.modalidades[d.modalidadPorDefecto];
      if (m && m.duracionTexto && m.duracionTexto !== 'TODO') return m.duracionTexto;
    }
    return d.duracion || '';
  }
  function nivelTexto(d) {
    if (!d.exigencia) return '';
    const e = d.exigencia;
    return `${e <= 3 ? 'Fácil' : e <= 6 ? 'Moderado' : 'Exigente'} · ${e}/10`;
  }
  function fechasGrupalesDe(d) {
    const lista = [];
    if (Array.isArray(d.fechasGrupales)) lista.push(...d.fechasGrupales);
    if (d.modalidades) Object.values(d.modalidades).forEach(m => (m.fechasGrupales || []).forEach(f => lista.push(f)));
    return lista.filter(f => f && f.fecha).sort((a, b) => a.fecha.localeCompare(b.fecha));
  }
  // Próxima salida grupal: dentro del rango elegido, o la siguiente que aún no pasa.
  function salidaGrupal(d) {
    const fechas = fechasGrupalesDe(d);
    if (rangeStart) {
      const fin = new Date(rangeEnd || rangeStart);
      fin.setDate(fin.getDate() + 1);
      return fechas.find(f => { const x = new Date(f.fecha + 'T12:00:00'); return x >= rangeStart && x < fin; }) || null;
    }
    return fechas.find(f => new Date(f.fecha + 'T12:00:00') >= hoy) || null;
  }

  /* ---------- filtrar y ordenar ---------- */
  // Búsqueda tolerante a errores (el motor vive en buscador.js)
  const indices = new Map();
  function indiceDe(d) {
    if (!indices.has(d.id)) {
      const modalidades = d.modalidades ? Object.values(d.modalidades).map(m => m.nombre).join(' ') : '';
      indices.set(d.id, Buscador.indexar([
        { texto: nombreCorto(d), peso: 3 },
        { texto: String(d.id).replace(/-/g, ' '), peso: 3 },
        { texto: d.region, peso: 2 },
        { texto: etiquetaCat(d.categoria) + ' ' + d.categoria, peso: 2 },
        { texto: modalidades, peso: 1.5 },
        { texto: d.nombre, peso: 1.5, difuso: false, fuerte: false },       // título largo
        { texto: d.descripcion, peso: 1, difuso: false, fuerte: false }     // solo si nada más coincide
      ]));
    }
    return indices.get(d.id);
  }
  const vocab = Buscador.vocabulario(destinos.flatMap(d => [nombreCorto(d), d.region, String(d.id).replace(/-/g, ' ')]));

  function hayResultados(q) {
    const cons = Buscador.consulta(q);
    return destinos.some(d => Buscador.puntuar(cons, indiceDe(d), false) > 0);
  }

  function calcular() {
    const cons = Buscador.consulta(estado.q);
    let puntos = null;
    let base = destinos.slice();
    if (cons.activo) {
      puntos = new Map();
      // 1.ª pasada: nombre, región y tipo. 2.ª (si no hubo nada): también la descripción.
      destinos.forEach(d => puntos.set(d.id, Buscador.puntuar(cons, indiceDe(d), true)));
      if (![...puntos.values()].some(v => v > 0)) destinos.forEach(d => puntos.set(d.id, Buscador.puntuar(cons, indiceDe(d), false)));
      base = destinos.filter(d => puntos.get(d.id) > 0);
    }
    let lista = estado.cat === 'todos' ? base.slice() : base.filter(d => d.categoria === estado.cat);

    const precio = d => { const p = precioDesde(d); return p ? p.monto : Infinity; };
    if (estado.orden === 'precio') lista.sort((a, b) => precio(a) - precio(b));
    else if (estado.orden === 'calificacion') lista.sort((a, b) => (b.calificacion || 0) - (a.calificacion || 0));
    else if (estado.orden === 'facil') lista.sort((a, b) => (a.exigencia || 99) - (b.exigencia || 99));
    else {
      // lo que más se parece a lo escrito primero; con fechas, los que tienen salida en tus fechas
      lista.sort((a, b) =>
        (puntos ? puntos.get(b.id) - puntos.get(a.id) : 0) ||
        (rangeStart ? (salidaGrupal(b) ? 1 : 0) - (salidaGrupal(a) ? 1 : 0) : 0));
    }

    return { base, lista };
  }

  /* ---------- dibujar ---------- */
  const FLECHA = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

  // Etiqueta de urgencia. Prioridad: 1) campo `etiqueta` del destino en destinos-data.js
  // (ej. etiqueta: "Se agota fácil")  2) la próxima salida grupal si quedan pocos cupos.
  const CUPOS_POCOS = 6;
  function etiquetaDe(d) {
      if (d.etiqueta) return d.etiqueta;
      const prox = fechasGrupalesDe(d).find(f => new Date(f.fecha + 'T12:00:00') >= hoy);
      if (prox && prox.cupos != null && prox.cupos <= CUPOS_POCOS) return `¡Quedan ${prox.cupos} cupos!`;
      return '';
  }
  
  function tarjetaHTML(d, i, favs) {
      const precio = precioDesde(d);
      const dur = duracionDe(d);
      const nivel = nivelTexto(d);
      const salida = salidaGrupal(d);
      const nombre = esc(nombreCorto(d));
      const esFav = favs.includes(d.id);
      const agota = etiquetaDe(d);
      const meta = [d.region, dur, nivel].filter(Boolean).map(esc).join('<span class="ds-sep">•</span>');
      const nres = Number(d.numeroResenas) || 0;
      const rating = d.calificacion ? `<span class="ds-rating">${esc(String(d.calificacion).replace('.', ','))} <i>★</i>${nres ? ` <small>(${nres})</small>` : ''}</span>` : '';

      return `
        <a class="ds-card" href="detalle.html?id=${encodeURIComponent(d.id)}" style="--i:${i}" aria-label="${nombre}, ver expedición">
          <div class="ds-card__foto">
            <img src="${esc(d.imagen)}" data-foto="${esc(Imagenes.base(d))}" alt="${nombre}" loading="lazy">
            <button type="button" class="ds-fav" data-id="${esc(d.id)}" aria-label="Guardar ${nombre} en favoritos">${esFav ? '❤️' : '🤍'}</button>
          </div>
          <div class="ds-card__info">
            <h3>${nombre}</h3>
            ${agota ? `<span class="ds-agota"><i></i>${esc(agota)}</span>` : ''}
            <p class="ds-card__meta">${meta}</p>
            ${salida ? `<span class="ds-salida">🗓️ Salida grupal · ${esc(fechaCorta(salida.fecha))}</span>` : ''}
            <div class="ds-card__pie">
              ${rating}
              <div class="ds-precio">${precio ? `Desde<b data-gtq="${precio.monto}">${Moneda.formatear(precio.monto)}</b><em>por persona${precio.salidaGrupal ? ' · salida grupal' : precio.grupo ? ' (grupo)' : ''}</em>` : '<b>Consultar</b>'}</div>
            </div>
          </div>
        </a>`;
  }

  // La foto aparece con fade al cargar. Si la extensión no coincide (ej. guardaste fuego.webp
  // pero en destinos-data.js dice fuego.jpeg), imagenes.js busca la correcta solo.
  // La imagen solo se quita cuando NO existe con ninguna extensión (se queda el color con la montañita).
  function prepararFotos() {
    grid.querySelectorAll('.ds-card__foto').forEach(caja => {
      const img = caja.querySelector('img');
      if (!img) return;
      const ok = () => {
        if (img.src === Imagenes.VACIA) { img.remove(); return; }   // no existe con ninguna extensión
        img.classList.add('cargada');
        caja.classList.add('con-foto');
      };
      if (img.complete && img.naturalWidth > 0) ok();
      else img.addEventListener('load', ok);   // sin "once": también corre cuando imagenes.js cambia la extensión
    });
  }

  function pintarChips(base) {
    const cats = [...new Set(destinos.map(d => d.categoria))];
    const botones = [{ cat: 'todos', texto: 'Todos', n: base.length }]
      .concat(cats.map(c => ({ cat: c, texto: etiquetaCat(c), n: base.filter(d => d.categoria === c).length })));

    chipsBox.innerHTML = botones.map(b => `
      <button type="button" class="ds-filtro ${estado.cat === b.cat ? 'activo' : ''}" data-cat="${esc(b.cat)}" role="tab" aria-selected="${estado.cat === b.cat}">
        ${esc(b.texto)} <small>${b.n}</small>
      </button>`).join('');
  }

  function pintarTitulo(n) {
    const base = estado.q.trim()
      ? `Resultados para “${estado.q.trim()}”`
      : (estado.cat === 'todos' ? 'Todos los destinos' : etiquetaCat(estado.cat));
    titulo.textContent = base;
    const small = document.createElement('small');
    small.textContent = `${n} ${n === 1 ? 'destino' : 'destinos'}`;
    titulo.appendChild(small);
  }

  function sincronizarURL() {
    const url = new URL(window.location.href);
    estado.q.trim() ? url.searchParams.set('q', estado.q.trim()) : url.searchParams.delete('q');
    estado.cat !== 'todos' ? url.searchParams.set('cat', estado.cat) : url.searchParams.delete('cat');
    rangeStart ? url.searchParams.set('desde', isoFecha(rangeStart)) : url.searchParams.delete('desde');
    rangeStart && rangeEnd && rangeEnd.getTime() !== rangeStart.getTime() ? url.searchParams.set('hasta', isoFecha(rangeEnd)) : url.searchParams.delete('hasta');
    adults !== 1 ? url.searchParams.set('adultos', adults) : url.searchParams.delete('adultos');
    children > 0 ? url.searchParams.set('ninos', children) : url.searchParams.delete('ninos');
    children > 0 ? url.searchParams.set('edades', childrenAges.slice(0, children).join(',')) : url.searchParams.delete('edades');
    try { history.replaceState(null, '', url); } catch (e) { /* abierto como archivo local */ }
  }

  let cargando = true;

  function render(animar = true) {
    if (cargando) return;
    const { base, lista } = calcular();
    pintarChips(base);
    pintarTitulo(lista.length);
    sincronizarURL();

    grid.classList.toggle('quieta', !animar);
    grid.setAttribute('aria-busy', 'false');
    vacio.hidden = lista.length > 0;
    grid.hidden = lista.length === 0;
    mostrarQuisisteDecir(lista.length === 0 ? estado.q : '');

    const favs = getFavoritos();
    grid.innerHTML = lista.map((d, i) => tarjetaHTML(d, i, favs)).join('');
    prepararFotos();
  }

  /* ---------- "¿Quisiste decir…?" ---------- */
  function mostrarQuisisteDecir(q) {
    let caja = $('dsQuisiste');
    if (!caja) {
      caja = document.createElement('p');
      caja.id = 'dsQuisiste';
      caja.style.cssText = 'margin:-8px auto 18px;font-weight:600;color:#1a1b26';
      vacio.insertBefore(caja, $('dsLimpiar'));
    }
    let sugerida = q && q.trim() ? Buscador.corregir(q, vocab) : null;
    if (sugerida && !hayResultados(sugerida)) sugerida = null;     // solo sugiere lo que sí da resultados
    caja.hidden = !sugerida;
    if (!sugerida) return;
    caja.innerHTML = '¿Quisiste decir <button type="button" style="background:none;border:0;padding:0;font:inherit;font-weight:700;color:#ff4500;text-decoration:underline;cursor:pointer">' + esc(sugerida) + '</button>?';
    caja.querySelector('button').addEventListener('click', () => {
      estado.q = sugerida;
      searchInput.value = sugerida;
      render(true);
    });
  }

  /* ---------- animación de carga ---------- */
  function mostrarCarga() {
    cargando = true;
    grid.hidden = false;
    vacio.hidden = true;
    grid.setAttribute('aria-busy', 'true');
    grid.innerHTML = Array.from({ length: ESQUELETOS }, (_, i) => `<div class="ds-skel" style="--i:${i}" aria-hidden="true"></div>`).join('');
    progreso.classList.add('activo');
  }
  function terminarCarga() {
    cargando = false;
    progreso.classList.remove('activo');
    render(true);
  }

  /* ---------- filtros, orden y favoritos ---------- */
  chipsBox.addEventListener('click', e => {
    const b = e.target.closest('[data-cat]');
    if (!b) return;
    estado.cat = b.dataset.cat;
    render(true);
  });

  ordenSelect.addEventListener('change', () => { estado.orden = ordenSelect.value; render(true); });

  /* Respaldo: la tarjeta siempre abre la ficha del destino, aunque otro script frene el enlace.
     (Fase de captura: corre antes que cualquier otro manejador de clics.) */
  grid.addEventListener('click', e => {
    if (e.target.closest('.ds-fav')) return;                       // el corazón solo guarda favorito
    const tarjeta = e.target.closest('a.ds-card');
    if (!tarjeta) return;
    if (e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;   // deja abrir en pestaña nueva
    e.preventDefault();
    window.location.href = tarjeta.href;
  }, true);

  grid.addEventListener('click', e => {
    const fav = e.target.closest('.ds-fav');
    if (!fav) return;
    e.preventDefault();
    e.stopPropagation();
    let favs = getFavoritos();
    favs = favs.includes(fav.dataset.id) ? favs.filter(f => f !== fav.dataset.id) : [...favs, fav.dataset.id];
    setFavoritos(favs);
    fav.textContent = favs.includes(fav.dataset.id) ? '❤️' : '🤍';
  });

  $('dsLimpiar').addEventListener('click', () => {
    estado.q = ''; estado.cat = 'todos';
    searchInput.value = '';
    if (navBusca) navBusca.value = '';
    rangeStart = rangeEnd = null;
    updateDateLabel();
    renderCalendars();
    render(true);
  });

  function irAResultados() {
    $('resultados').scrollIntoView({ behavior: sinMovimiento ? 'auto' : 'smooth', block: 'start' });
  }

  /* =========================================================
     BUSCADOR (el mismo del inicio: texto + fechas + participantes)
     ========================================================= */
  const allDropdowns = [$('dropdown-search'), $('dropdown-date'), $('dropdown-people')];
  const heroSearch = $('hero-search');
  const esMovil = () => window.matchMedia('(max-width: 768px)').matches;
  let movilAbierto = false;
  const panelDe = { buscar: $('dropdown-search'), fecha: $('dropdown-date'), personas: $('dropdown-people') };

  const closeAllDropdowns = () => {
    if (movilAbierto) return;   // en el celular el buscador solo se cierra con la flecha de volver
    allDropdowns.forEach(d => d.classList.remove('active'));
  };
  function toggleDropdown(dropdown) {
    if (movilAbierto) {
      irPanel(dropdown === panelDe.fecha ? 'fecha' : dropdown === panelDe.personas ? 'personas' : 'buscar');
      return;
    }
    const activo = dropdown.classList.contains('active');
    closeAllDropdowns();
    if (!activo) dropdown.classList.add('active');
  }

  $('field-search').addEventListener('click', e => { e.stopPropagation(); if (esMovil()) { abrirMovil('buscar'); return; } renderRecentSearches(); toggleDropdown($('dropdown-search')); });
  $('field-date').addEventListener('click', e => { e.stopPropagation(); if (esMovil()) { abrirMovil('fecha'); return; } toggleDropdown($('dropdown-date')); });
  $('field-people').addEventListener('click', e => { e.stopPropagation(); if (esMovil()) { abrirMovil('personas'); return; } toggleDropdown($('dropdown-people')); });

  /* --- MÓVIL: buscador a pantalla completa (igual que el del inicio) --- */
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
  const sugList = $('sugerencias-list');
  const sinTildes = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

  function renderSugerencias() {
    const q = sinTildes(searchInput.value.trim());
    const lista = q
      ? sugerencias.filter(s => sinTildes(s[0] + ' ' + s[1]).includes(q)).slice(0, 8)
      : sugerencias.slice(0, 6);
    sugList.innerHTML = lista.length === 0
      ? '<p class="no-recent">Sin coincidencias. Presiona Enter para continuar con tu búsqueda.</p>'
      : lista.map(s => `
          <div class="sug-item" data-term="${esc(s[0])}">
            <span class="sug-ico"></span>
            <div><strong>${esc(s[0])}</strong><small>${esc(s[1])}</small></div>
          </div>`).join('');
  }
  sugList.addEventListener('click', e => {
    const it = e.target.closest('.sug-item');
    if (!it) return;
    searchInput.value = it.dataset.term;
    estado.q = it.dataset.term;
    saveRecentSearch(it.dataset.term);
    irPanel('fecha');
  });

  function irPanel(nombre) {
    heroSearch.dataset.panel = nombre;
    allDropdowns.forEach(d => d.classList.toggle('active', d === panelDe[nombre]));
    if (nombre === 'buscar') { renderRecentSearches(); renderSugerencias(); searchInput.focus(); }
    else searchInput.blur();   // baja el teclado al pasar a fecha o participantes
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
  $('ms-atras').addEventListener('click', e => { e.stopPropagation(); cerrarMovil(); render(false); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && movilAbierto) { cerrarMovil(); render(false); } });
  window.matchMedia('(max-width: 768px)').addEventListener('change', e => { if (!e.matches) { cerrarMovil(); render(false); } });
  allDropdowns.forEach(d => d.addEventListener('click', e => e.stopPropagation()));
  document.addEventListener('click', closeAllDropdowns);

  /* --- texto: filtra mientras escribes --- */
  let espera = null;
  searchInput.addEventListener('input', () => {
    estado.q = searchInput.value;
    if (navBusca) navBusca.value = searchInput.value;
    clearTimeout(espera);
    if (movilAbierto) renderSugerencias();
    espera = setTimeout(() => { if (!movilAbierto) render(false); }, 150);
  });
  searchInput.addEventListener('keydown', e => {
    if (e.key !== 'Enter') return;
    e.preventDefault();
    if (movilAbierto) { saveRecentSearch(searchInput.value.trim()); irPanel('fecha'); return; }
    saveRecentSearch(searchInput.value.trim());
    closeAllDropdowns();
    render(true);
    irAResultados();
  });

  // El buscador chiquito de la barra de arriba también filtra esta página
  if (navBusca) {
    navBusca.addEventListener('input', () => {
      estado.q = navBusca.value;
      searchInput.value = navBusca.value;
      clearTimeout(espera);
      espera = setTimeout(() => render(false), 150);
    });
    navBusca.addEventListener('keydown', e => {
      if (e.key === 'Enter') { e.preventDefault(); saveRecentSearch(navBusca.value.trim()); irAResultados(); }
    });
  }

  /* --- búsquedas recientes (mismo localStorage del inicio) --- */
  const recentList = $('recent-searches-list');
  function getRecentSearches() {
    try { return JSON.parse(localStorage.getItem('recentSearches') || '[]'); } catch (e) { return []; }
  }
  function saveRecentSearch(term) {
    if (!term) return;
    const recents = getRecentSearches().filter(t => t.toLowerCase() !== term.toLowerCase());
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
        estado.q = item.dataset.term;
        if (navBusca) navBusca.value = item.dataset.term;
        closeAllDropdowns();
        if (movilAbierto) irPanel('fecha'); else render(true);
      });
    });
  }

  /* --- calendario de dos meses con rango --- */
  const dateLabel = $('date-label');
  const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  const diasSemana = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  let viewYear = hoy.getFullYear();
  let viewMonth = hoy.getMonth();

  const formatDateShort = d => d.toLocaleDateString('es-GT', { day: 'numeric', month: 'short' });
  function updateDateLabel() {
    if (!rangeStart) { dateLabel.textContent = 'Cualquier fecha'; return; }
    if (!rangeEnd || rangeStart.getTime() === rangeEnd.getTime()) { dateLabel.textContent = formatDateShort(rangeStart); return; }
    dateLabel.textContent = rangeStart.getMonth() === rangeEnd.getMonth()
      ? `${rangeStart.getDate()}–${formatDateShort(rangeEnd)}`
      : `${formatDateShort(rangeStart)} – ${formatDateShort(rangeEnd)}`;
  }

  function handleDayClick(dateObj) {
    if (!rangeStart || (rangeStart && rangeEnd)) { rangeStart = dateObj; rangeEnd = null; }
    else if (dateObj < rangeStart) { rangeStart = dateObj; rangeEnd = null; }
    else { rangeEnd = dateObj; closeAllDropdowns(); }
    updateDateLabel();
    renderCalendars();
    if (!movilAbierto) render(true);
  }
  function clearPreview() {
    document.querySelectorAll('#calendar-months .calendar-day').forEach(el => el.classList.remove('in-range-preview', 'range-end-preview'));
  }
  function previewRange(hoverDate) {
    clearPreview();
    if (!rangeStart || rangeEnd || hoverDate <= rangeStart) return;
    document.querySelectorAll('#calendar-months .calendar-day:not(.empty):not(.disabled)').forEach(el => {
      const t = parseInt(el.dataset.time, 10);
      if (!t) return;
      const d = new Date(t);
      if (d > rangeStart && d < hoverDate) el.classList.add('in-range-preview');
      if (d.getTime() === hoverDate.getTime()) el.classList.add('range-end-preview');
    });
  }
  function renderMonthGrid(gridId, labelId, year, month) {
    const g = $(gridId);
    $(labelId).textContent = `${meses[month]} de ${year}`;
    g.innerHTML = '';
    diasSemana.forEach(n => {
      const el = document.createElement('div');
      el.className = 'calendar-day-name';
      el.textContent = n;
      g.appendChild(el);
    });
    const startOffset = (new Date(year, month, 1).getDay() + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    for (let i = 0; i < startOffset; i++) {
      const vacioDia = document.createElement('div');
      vacioDia.className = 'calendar-day empty';
      g.appendChild(vacioDia);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const dateObj = new Date(year, month, day);
      const el = document.createElement('div');
      el.className = 'calendar-day';
      el.textContent = day;
      el.dataset.time = dateObj.getTime();
      if (dateObj < hoy) {
        el.classList.add('disabled');
      } else {
        el.addEventListener('click', () => handleDayClick(dateObj));
        el.addEventListener('mouseenter', () => previewRange(dateObj));
        if (rangeStart && dateObj.getTime() === rangeStart.getTime()) el.classList.add('range-start');
        if (rangeEnd && dateObj.getTime() === rangeEnd.getTime()) el.classList.add('range-end');
        if (rangeStart && rangeEnd && dateObj > rangeStart && dateObj < rangeEnd) el.classList.add('in-range');
      }
      g.appendChild(el);
    }
  }
  function renderCalendars() {
    renderMonthGrid('calendar-grid-1', 'calendar-month-label-1', viewYear, viewMonth);
    let nm = viewMonth + 1, ny = viewYear;
    if (nm > 11) { nm = 0; ny++; }
    renderMonthGrid('calendar-grid-2', 'calendar-month-label-2', ny, nm);
  }

  $('cal-prev').addEventListener('click', () => { viewMonth--; if (viewMonth < 0) { viewMonth = 11; viewYear--; } renderCalendars(); });
  $('cal-next').addEventListener('click', () => { viewMonth++; if (viewMonth > 11) { viewMonth = 0; viewYear++; } renderCalendars(); });
  $('calendar-months').addEventListener('mouseleave', clearPreview);
  document.querySelectorAll('.quick-date-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const quick = btn.dataset.quick;
      const start = new Date(hoy);
      let end = new Date(hoy);
      if (quick === 'manana') { start.setDate(start.getDate() + 1); end = new Date(start); }
      if (quick === 'finde') {
        start.setDate(start.getDate() + ((6 - start.getDay() + 7) % 7 || 7)); // sábado
        end = new Date(start);
        end.setDate(end.getDate() + 1);                                        // domingo
      }
      rangeStart = start; rangeEnd = end;
      updateDateLabel();
      renderCalendars();
      closeAllDropdowns();
      if (!movilAbierto) render(true);
    });
  });
  renderCalendars();

  /* pie del calendario en el celular */
  $('ms-reset').addEventListener('click', () => { rangeStart = rangeEnd = null; updateDateLabel(); renderCalendars(); });
  $('ms-saltar').addEventListener('click', () => irPanel('personas'));
  $('ms-continuar').addEventListener('click', () => irPanel('personas'));

  /* --- participantes + edad por niño --- */
  const peopleLabel = $('people-label');
  const childrenAgesList = $('children-ages-list');
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
      sel.addEventListener('change', e => { childrenAges[parseInt(e.target.dataset.index, 10)] = parseInt(e.target.value, 10); sincronizarURL(); });
    });
  }
  function updatePeopleLabel() {
    const total = adults + children;
    peopleLabel.textContent = total === 1 ? '1 participante' : `${total} participantes`;
    $('adults-count').textContent = adults;
    $('children-count').textContent = children;
    $('adults-minus').disabled = adults <= 1;
    $('children-minus').disabled = children <= 0;
  }
  function cambioPersonas() { updatePeopleLabel(); if (!movilAbierto) render(false); }  // los precios dependen de cuántos son

  $('adults-plus').addEventListener('click', () => { adults++; cambioPersonas(); });
  $('adults-minus').addEventListener('click', () => { if (adults > 1) { adults--; cambioPersonas(); } });
  $('children-plus').addEventListener('click', () => { children++; renderChildrenAges(); cambioPersonas(); });
  $('children-minus').addEventListener('click', () => { if (children > 0) { children--; renderChildrenAges(); cambioPersonas(); } });
  updatePeopleLabel();

  /* --- botón Buscar --- */
  $('search-submit').addEventListener('click', () => {
    saveRecentSearch(searchInput.value.trim());
    cerrarMovil();            // en el celular cierra la pantalla completa
    closeAllDropdowns();
    render(true);
    irAResultados();
  });

  /* =========================================================
     ARRANQUE
     ========================================================= */
  const params = new URLSearchParams(window.location.search);
  const qInicial = params.get('q');
  const catInicial = params.get('cat');
  if (qInicial) { estado.q = qInicial; searchInput.value = qInicial; if (navBusca) navBusca.value = qInicial; }
  if (catInicial && destinos.some(d => d.categoria === catInicial)) estado.cat = catInicial;

  // fechas y participantes que vienen del buscador del inicio (o de un enlace compartido)
  const fDesde = leerFecha(params.get('desde'));
  const fHasta = leerFecha(params.get('hasta'));
  if (fDesde && fDesde >= hoy) {
    rangeStart = fDesde;
    rangeEnd = fHasta && fHasta > fDesde ? fHasta : null;
    viewYear = fDesde.getFullYear();
    viewMonth = fDesde.getMonth();
    updateDateLabel();
    renderCalendars();
  }
  const nAdultos = parseInt(params.get('adultos'), 10);
  const nNinos = parseInt(params.get('ninos'), 10);
  if (nAdultos >= 1 && nAdultos <= 50) adults = nAdultos;
  if (nNinos >= 0 && nNinos <= 20) children = nNinos;
  childrenAges = (params.get('edades') || '').split(',').map(n => parseInt(n, 10)).filter(n => n >= 0 && n <= 17);
  renderChildrenAges();
  updatePeopleLabel();
  const vieneDeBusqueda = ['q', 'desde', 'adultos', 'ninos'].some(k => params.has(k));

  document.querySelectorAll('.ds-anim').forEach(el => el.addEventListener('animationend', () => el.classList.add('ds-hecho'), { once: true }));

  chipTexto.textContent = `${destinos.length} destinos para elegir`;
  pintarChips(destinos);
  mostrarCarga();
  setTimeout(terminarCarga, sinMovimiento ? 0 : CARGA_MS);
  // si llega desde el buscador del inicio, baja directo a los resultados
  if (vieneDeBusqueda) requestAnimationFrame(() => $('resultados').scrollIntoView({ block: 'start' }));
})();