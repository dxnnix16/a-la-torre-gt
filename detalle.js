// ==========================================
// PÁGINA DE DETALLE — lee destinos-data.js y arma
// la página según el ?id= que venga en la URL.
// ==========================================

document.addEventListener('DOMContentLoaded', () => {

    // --- ESTILOS DE LA GALERÍA (carrusel) Y DE LA BARRA FLOTANTE ---
    const estilosDetalle = document.createElement('style');
    estilosDetalle.textContent = `
    .detail-gallery.gal { display: block; position: relative; height: auto; margin: 0 0 30px; }
    .gal-pista { display: flex; gap: 10px; overflow-x: auto; scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch; scrollbar-width: none; border-radius: 22px; }
    .gal-pista::-webkit-scrollbar { display: none; }
    .gal-slide { flex: 0 0 calc(62% - 5px); height: 380px; scroll-snap-align: start; background-size: cover; background-position: center; border-radius: 22px; cursor: pointer; }
    .gal-slide:only-child { flex-basis: 100%; }
    .gal-contador { position: absolute; right: 14px; bottom: 14px; background: rgba(26,27,38,.8); color: #fff; font-size: .8rem; font-weight: 700; padding: 6px 13px; border-radius: 50px; pointer-events: none; }
    .gal-flecha { position: absolute; top: 50%; translate: 0 -50%; width: 44px; height: 44px; border: 0; border-radius: 50%; background: #fff; color: #1a1b26; font-size: 1rem; cursor: pointer; box-shadow: 0 4px 14px rgba(0,0,0,.25); }
    .gal-prev { left: 12px; } .gal-next { right: 12px; }
    .dt-flotante { display: none; }
    .detail-price-box { scroll-margin-top: 14px; }
    @keyframes dt-pulso { 0% { box-shadow: 0 10px 30px rgba(0,0,0,.08), 0 0 0 0 rgba(255,69,0,.55); } 100% { box-shadow: 0 10px 30px rgba(0,0,0,.08), 0 0 0 18px rgba(255,69,0,0); } }
    @media (max-width: 900px) {
        .detail-gallery.gal { margin: 0 -20px 24px; }
        .gal-pista { gap: 0; border-radius: 0 0 26px 26px; }
        .gal-slide { flex: 0 0 100%; height: 300px; border-radius: 0; }
        .gal-flecha { display: none; }
        body.tiene-flotante { padding-bottom: 100px; }
        .dt-flotante { position: fixed; left: 0; right: 0; bottom: 0; z-index: 280; display: flex; align-items: center; justify-content: space-between; gap: 14px;
            padding: 12px 16px calc(12px + env(safe-area-inset-bottom, 0px)); background: #fff; border-radius: 22px 22px 0 0;
            box-shadow: 0 -10px 30px rgba(26,27,38,.16); transition: transform .35s cubic-bezier(.2,.8,.2,1); }
        .dt-flotante.oculta { transform: translateY(120%); pointer-events: none; }
        .dt-flotante__precio { display: grid; grid-template-columns: auto auto; justify-content: start; align-items: baseline; column-gap: 6px; line-height: 1.15; min-width: 0; }
        .dt-flotante__precio span, .dt-flotante__precio em { font-style: normal; font-size: .8rem; color: #555; }
        .dt-flotante__precio b { font-size: 1.55rem; font-weight: 800; color: #1a1b26; letter-spacing: -.5px; }
        .dt-flotante__precio em { grid-column: 1 / -1; }
        .dt-flotante__tag { grid-column: 1 / -1; justify-self: start; margin-top: 5px; font-style: normal; font-size: .68rem; font-weight: 700; color: #fff; background: #d62839; padding: 3px 9px; border-radius: 6px; }
        .dt-flotante__btn { flex: none; border: 0; border-radius: 50px; padding: 15px 24px; font-family: inherit; font-size: .95rem; font-weight: 700; color: #1a1b26; cursor: pointer;
            background: linear-gradient(90deg, #ff4500, #ffcc00); box-shadow: 0 8px 18px rgba(255,69,0,.3); touch-action: manipulation; -webkit-tap-highlight-color: transparent; }
        .dt-flotante__btn:active { transform: scale(.97); }
        .detail-price-box.dt-resalta { animation: dt-pulso .9s ease-out 2; }
    }
    @media (prefers-reduced-motion: reduce) { .dt-flotante { transition: none; } .detail-price-box.dt-resalta { animation: none; } }`;
    document.head.appendChild(estilosDetalle);

    // --- ESTILOS DEL SELECTOR "TOUR PRIVADO / SALIDA GRUPAL" (tarjetas con precio) ---
    const estilosTipoTour = document.createElement('style');
    estilosTipoTour.textContent = `
    #field-tipo-tour[hidden] { display: none; }
    .tt-opciones { display: grid; gap: 10px; }
    .tt-op { position: relative; isolation: isolate; display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: 12px;
        width: 100%; padding: 14px; border: 1.5px solid #e6e8ee; border-radius: 16px; background: #fff; color: #1a1b26;
        font-family: inherit; text-align: left; cursor: pointer; -webkit-tap-highlight-color: transparent;
        transition: border-color .25s ease, box-shadow .25s ease, background .25s ease, transform .25s ease; }
    .tt-op:hover:not(:disabled):not(.activo) { border-color: #ffb38a; transform: translateY(-1px); }
    .tt-op:focus-visible { outline: 3px solid #ff4500; outline-offset: 2px; }
    /* aro lava: SOLO en la tarjeta elegida */
    .tt-op::before { content: ''; position: absolute; inset: -1.5px; z-index: 2; border-radius: inherit; padding: 2px; pointer-events: none;
        background: conic-gradient(from var(--ang), #ff4500, #ffcc00, #ff4500, #8b0000, #ff4500);
        -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0); -webkit-mask-composite: xor; mask-composite: exclude;
        animation: lava-giro 3s linear infinite; opacity: 0; transition: opacity .3s ease; }
    .tt-op.activo { background: #fff8f2; border-color: transparent; box-shadow: 0 8px 20px rgba(255,69,0,.14); }
    .tt-op.activo::before { opacity: 1; }
    .tt-radio { width: 20px; height: 20px; border-radius: 50%; border: 2px solid #c9ccd6; display: grid; place-items: center; transition: border-color .25s ease; }
    .tt-radio::after { content: ''; width: 10px; height: 10px; border-radius: 50%; background: linear-gradient(135deg, #ff4500, #ffb300); transform: scale(0); transition: transform .3s cubic-bezier(.34,1.56,.64,1); }
    .tt-op.activo .tt-radio { border-color: #ff4500; }
    .tt-op.activo .tt-radio::after { transform: scale(1); }
    .tt-txt { min-width: 0; display: grid; gap: 2px; }
    .tt-txt strong { font-size: .92rem; font-weight: 700; line-height: 1.2; }
    .tt-txt small { font-size: .76rem; color: #777; line-height: 1.35; }
    .tt-txt small em { font-style: normal; font-weight: 700; color: #1a1b26; }
    .tt-precio { display: grid; justify-items: end; gap: 1px; text-align: right; }
    .tt-monto { font-size: 1.15rem; font-weight: 800; letter-spacing: -.4px; line-height: 1.1; }
    .tt-precio small { font-size: .66rem; color: #888; }
    .tt-ahorro { margin-top: 4px; font-size: .68rem; font-weight: 700; color: #0f7a3c; background: rgba(37,211,102,.14); padding: 3px 8px; border-radius: 50px; white-space: nowrap; }
    .modalidad-tab:disabled { opacity: .45; cursor: not-allowed; }
    .detail-select:disabled { opacity: .75; cursor: not-allowed; background-color: #f3f4f7; }
    .tt-op:disabled { opacity: .55; cursor: not-allowed; border-style: dashed; background: #fafafa; }
    @media (prefers-reduced-motion: reduce) { .tt-op::before { animation: none; } .tt-op, .tt-radio::after { transition-duration: .01s; } }`;
    document.head.appendChild(estilosTipoTour);

    // --- 1. LEER EL ID DE LA URL Y BUSCAR EL DESTINO ---
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const destino = destinos.find(d => d.id === id);

    if (!destino) {
        document.querySelector('.detail-layout').innerHTML =
            '<p style="padding:60px 0;">No encontramos esta expedición. <a href="destinos.html">Volver a Destinos</a></p>';
        document.getElementById('detail-title').textContent = 'No encontrado';
        document.getElementById('detail-gallery').style.display = 'none';
        return;
    }

    // --- 2. TÍTULO Y META DESCRIPCIÓN (para SEO) ---
    document.getElementById('page-title').textContent = `${destino.nombre} | A La Torre GT`;
    document.getElementById('page-description').setAttribute('content', destino.descripcion || '');
    document.getElementById('detail-breadcrumb-nombre').textContent = destino.nombre;

    // --- 3. ENCABEZADO ---
    document.getElementById('detail-title').textContent = destino.nombre;
    document.getElementById('detail-rating').textContent = destino.calificacion ?? '—';
    document.getElementById('detail-reviews-count').textContent = `(${destino.numeroResenas ?? 0} reseñas)`;
    document.getElementById('detail-descripcion').textContent = destino.descripcion || '';

    // --- 4. GALERÍA (foto grande + hasta 4 miniaturas) ---
    const galeria = document.getElementById('detail-gallery');
    // Las fotos se detectan solas por nombre (ver imagenes.js): nombre, nombre1, nombre2...
    let fotos = [destino.imagen];
    let fotoActual = 0;

    function renderGaleria() {
        galeria.classList.add('gal');
        galeria.innerHTML = `
            <div class="gal-pista" id="gal-pista">${fotos.map((f, i) => `<div class="gal-slide" data-index="${i}" style="background-image:url('${f}');"></div>`).join('')}</div>
            ${fotos.length > 1 ? `<span class="gal-contador" id="gal-contador">1 / ${fotos.length}</span>
            <button type="button" class="gal-flecha gal-prev" aria-label="Foto anterior">❮</button>
            <button type="button" class="gal-flecha gal-next" aria-label="Foto siguiente">❯</button>` : ''}`;
        const pista = document.getElementById('gal-pista');
        const cont = document.getElementById('gal-contador');
        const paso = () => pista.children[0].offsetWidth + (parseFloat(getComputedStyle(pista).columnGap) || 0);
        pista.addEventListener('click', e => {
            const sl = e.target.closest('.gal-slide');
            if (sl) openLightbox(parseInt(sl.dataset.index));
        });
        if (cont) {
            pista.addEventListener('scroll', () => {
                const i = Math.min(fotos.length - 1, Math.max(0, Math.round(pista.scrollLeft / paso())));
                cont.textContent = `${i + 1} / ${fotos.length}`;
            }, { passive: true });
            galeria.querySelector('.gal-prev').addEventListener('click', () => pista.scrollBy({ left: -paso(), behavior: 'smooth' }));
            galeria.querySelector('.gal-next').addEventListener('click', () => pista.scrollBy({ left: paso(), behavior: 'smooth' }));
        }
    }

    function openLightbox(index) {
        fotoActual = index;
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox-overlay';
        lightbox.innerHTML = `
            <button class="lightbox-close">✕</button>
            <button class="lightbox-nav lightbox-prev">❮</button>
            <img class="lightbox-img" src="${fotos[fotoActual]}">
            <button class="lightbox-nav lightbox-next">❯</button>
            <div class="lightbox-counter">${fotoActual + 1} / ${fotos.length}</div>
        `;
        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';

        function update() {
            lightbox.querySelector('.lightbox-img').src = fotos[fotoActual];
            lightbox.querySelector('.lightbox-counter').textContent = `${fotoActual + 1} / ${fotos.length}`;
        }
        lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
        lightbox.querySelector('.lightbox-prev').addEventListener('click', () => {
            fotoActual = (fotoActual - 1 + fotos.length) % fotos.length; update();
        });
        lightbox.querySelector('.lightbox-next').addEventListener('click', () => {
            fotoActual = (fotoActual + 1) % fotos.length; update();
        });

        function closeLightbox() {
            document.body.removeChild(lightbox);
            document.body.style.overflow = '';
        }
    }

    renderGaleria();
    Imagenes.galeria(destino).then(lista => {
        if (!lista.length) return;                       // no se encontró nada: se queda como estaba
        fotos = lista;
        renderGaleria();
    });

    // --- 4.5. FRANJA DE ÍCONOS "LO ESENCIAL" ---
    const CARPETA_ICONOS = 'img/iconos/';
    const franjaBox = document.getElementById('franja-info');

    function pintarFranja(modalidadKey) {
        const m = (destino.modalidades && destino.modalidades[modalidadKey]) || {};
        const duracion = m.duracionTexto
            || (m.duracionDias ? `${m.duracionDias} día(s)` : (destino.duracion || '—'));
        const modPrecios = m.precios || destino.precios;
        // CAMBIO: los destinos que solo tienen salida grupal (sin "individual") usan los puntos de "grupal"
        const puntosSalida = modPrecios
            ? Object.keys(modPrecios.individual || modPrecios.grupal || modPrecios.grupo || {})
            : [];

        const items = [
            ['duracion', `Duración ${duracion}`, 'Consulta los horarios de salida según la modalidad.'],
            ['dificultad', `Dificultad ${destino.exigencia ? destino.exigencia + '/10' : '—'}`,
                `${m.horasCaminata || 'Por confirmar'} de caminata y ${m.desnivel || 'por confirmar'} de desnivel.`],
            ['requisitosdeedad', 'Edad mínima y condición física',
                `Desde ${destino.edadMinima ?? '—'} años. ${destino.condicionSalud || ''}`],
            ['guia', 'Guía hasta la cumbre', 'Te acompañamos en todo el ascenso y el descenso.'],
            ['idioma', `Guías en ${(destino.guiaIdiomas || []).join(', ') || '—'}`, 'Explicaciones y seguridad en tu idioma.'],
            ['traslado', 'Recogida y traslado incluidos', `Salimos desde ${puntosSalida.join(', ') || 'punto por confirmar'}.`],
            ['cancelacion', 'Cancelación gratuita', destino.cancelacion || ''],
            ['pago', 'Reserva ahora y paga después', destino.reservaMinima || ''],
            ['turismoresponsable', 'Turismo responsable', destino.responsable || '']
        ];

        franjaBox.innerHTML = items.map(([ico, t, txt]) => `
            <div class="info-item">
                <span class="info-icono"><img src="${CARPETA_ICONOS}${ico}.webp" alt="" loading="lazy" onerror="if(!this.dataset.png){this.dataset.png=1;this.src='${CARPETA_ICONOS}${ico}.png'}"></span>
                <div><strong>${t}</strong><p>${txt}</p></div>
            </div>`).join('');
    }

    // --- 5. BLOQUES DE INFORMACIÓN (La experiencia, Incluido en tu reserva, Por tu
    // cuenta, Restricciones, Recomendaciones para empacar, Antes de subir...) ---
    // Para agregar/editar esto de otro volcán, solo copia el arreglo "infoBloques"
    // en su ficha dentro de destinos-data.js — cada objeto es un bloque con su
    // propio título y lista de viñetas.
    const infoBloquesBox = document.getElementById('detail-info-bloques');
    if (destino.infoBloques && destino.infoBloques.length) {
        // Estos dos bloques se pintan con la viñeta gris de "no incluido",
        // el resto usa la viñeta naranja normal.
        const bloquesConX = ['Por tu cuenta', 'Restricciones de participación'];
        infoBloquesBox.innerHTML = destino.infoBloques.map(b => {
            const clase = bloquesConX.includes(b.titulo) ? 'detail-list detail-list-noincluye' : 'detail-list';
            return `
                <div class="info-bloque">
                    <h3>${b.titulo}</h3>
                    <ul class="${clase}">${b.items.map(item => `<li>${item}</li>`).join('')}</ul>
                </div>`;
        }).join('');
    } else {
        document.getElementById('block-info-bloques').style.display = 'none';
    }

    // --- 6. REQUISITOS (edad, salud, exigencia) ---
    const requisitosBox = document.getElementById('detail-requisitos');
    if (destino.edadMinima || destino.exigencia) {
        const exigenciaPct = (destino.exigencia || 0) * 10;
        requisitosBox.innerHTML = `
            <div class="requisito-item"><strong>Edad mínima:</strong> ${destino.edadMinima ?? '—'} años</div>
            <div class="requisito-item"><strong>Condición de salud:</strong> ${destino.condicionSalud ?? '—'}</div>
            <div class="requisito-item requisito-exigencia">
                <strong>Nivel de exigencia:</strong> ${destino.exigencia ?? '—'}/10
                <div class="exigencia-bar"><div class="exigencia-fill" style="width:${exigenciaPct}%;"></div></div>
            </div>
        `;
    } else {
        document.getElementById('block-requisitos').style.display = 'none';
    }

    // --- 7. ITINERARIO POR MODALIDAD ---
    const tabsBox = document.getElementById('detail-modalidad-tabs');
    const trackBox = document.getElementById('detail-itinerary-track');
    const daysBox = document.getElementById('detail-itinerary-days');
    const selectModalidad = document.getElementById('select-modalidad');

    function renderItinerario(modalidadKey) {
        const modalidad = destino.modalidades[modalidadKey];
        if (!modalidad) return;

        // Tabs activos
        tabsBox.querySelectorAll('.modalidad-tab').forEach(t => {
            t.classList.toggle('active', t.dataset.mod === modalidadKey);
        });

        // Ya no hay barra lateral: cada evento dibuja su propio punto (ver estilos.css)
        trackBox.innerHTML = '';

        // Hora de cada evento. Tipos: "punto" (momento puntual) o "periodo" (rango de tiempo).
        // Si no pones "tipo", un rango como "11:00 pm – 3:00 am" se toma como periodo.
        const RE_HORA = /^\d{1,2}:\d{2}\s?(am|pm)/i;
        function eventoHTML(ev) {
            const h = String(ev.hora || '');
            const partes = h.split(/\s[–-]\s/);
            const tipo = ev.tipo || (partes.length === 2 ? 'periodo' : 'punto');
            const esReloj = RE_HORA.test(h);
            let horaHTML;
            if (tipo === 'periodo' && partes.length === 2) horaHTML = `<b>${partes[0]}</b><small>hasta ${partes[1]}</small>`;
            else if (esReloj) horaHTML = `<b>${h}</b>`;
            else horaHTML = `<span class="it-etiqueta-txt">${h}</span>`;   // "Amanecer", "Durante el día"...
            return `
                <div class="itinerary-event it-${tipo}${esReloj || partes.length === 2 ? '' : ' it-etiqueta'}">
                    <div class="itinerary-hora">${horaHTML}</div>
                    <div class="it-marca" aria-hidden="true"><i></i></div>
                    <div class="it-cuerpo">
                        <strong>${ev.lugar}</strong>
                        <p>${ev.descripcion}</p>
                    </div>
                </div>`;
        }

        // Días con sus eventos
        daysBox.innerHTML = modalidad.itinerario.map(dia => `
            <div class="itinerary-day">
                <h3><span class="it-dia">Día ${dia.dia}</span>${dia.titulo}</h3>
                ${dia.eventos.map(eventoHTML).join('')}
            </div>
        `).join('');

        // La franja de íconos cambia con la modalidad (duración, dificultad...)
        pintarFranja(modalidadKey);
    }

    if (destino.modalidades) {
        const claves = Object.keys(destino.modalidades);
        tabsBox.innerHTML = claves.map(key => `
            <button type="button" class="modalidad-tab" data-mod="${key}">${destino.modalidades[key].nombre}</button>
        `).join('');
        selectModalidad.innerHTML = claves.map(key => `<option value="${key}">${destino.modalidades[key].nombre}</option>`).join('');

        tabsBox.querySelectorAll('.modalidad-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                renderItinerario(tab.dataset.mod);
                selectModalidad.value = tab.dataset.mod;
                actualizarCajaPrecio();
            });
        });
        selectModalidad.addEventListener('change', () => {
            renderItinerario(selectModalidad.value);
            actualizarCajaPrecio();
        });

        renderItinerario(destino.modalidadPorDefecto || claves[0]);
        selectModalidad.value = destino.modalidadPorDefecto || claves[0];
    } else {
        document.getElementById('block-itinerario').style.display = 'none';
        document.getElementById('field-modalidad').style.display = 'none';
        // Sin modalidades, igual pintamos la franja con los datos que haya
        pintarFranja(null);
    }

    // --- 8. CAJA DE PRECIO ---
    const selectPunto = document.getElementById('select-punto');
    const selectGrupo = document.getElementById('select-tipo-grupo');
    const precioBox = document.getElementById('detail-price');

    // Tour privado / Tour grupal (fecha fija)
    const fieldGrupo = document.getElementById('field-grupo');
    const fieldFechaGrupal = document.getElementById('field-fecha-grupal');
    let fieldTipoTour = document.getElementById('field-tipo-tour');
    let tipoTourBox = document.getElementById('tipo-tour');
    // Seguro por si detalle.html todavía es el viejo: quita el selector antiguo y crea el bloque nuevo
    if (!fieldTipoTour) {
        const aviso = document.getElementById('aviso-grupal');
        if (aviso) aviso.remove();
        if (tipoTourBox) tipoTourBox.remove();
        fieldTipoTour = document.createElement('div');
        fieldTipoTour.className = 'detail-field';
        fieldTipoTour.id = 'field-tipo-tour';
        fieldTipoTour.hidden = true;
        fieldTipoTour.innerHTML = '<label class="detail-field-label">¿Cómo quieres ir?</label>' +
            '<div class="tt-opciones" id="tipo-tour" role="radiogroup" aria-label="Tipo de tour"></div>';
        fieldGrupo.after(fieldTipoTour);
        tipoTourBox = fieldTipoTour.querySelector('#tipo-tour');
    }
    const btnReservar = document.getElementById('btn-reservar');
    let tipoTour = 'privado'; // 'privado' o 'grupal'
    let fechaGrupalElegida = '';

    const fechaBonita = f => new Date(f + 'T12:00:00')
        .toLocaleDateString('es-GT', { weekday: 'long', day: 'numeric', month: 'long' });

    function modalidadActual() {
        if (!destino.modalidades) return null;
        return destino.modalidades[selectModalidad.value] || destino.modalidades[destino.modalidadPorDefecto];
    }

    // ¿Este destino tiene precios por punto de salida (generales o por modalidad)?
    const tienePrecios = !!destino.precios ||
        (destino.modalidades && Object.values(destino.modalidades).some(m => m.precios));

    if (!tienePrecios) {
        document.getElementById('field-punto').style.display = 'none';
    }

    // ----- Selector Tour privado / Salida grupal: dos tarjetas, cada una con SU precio -----
    const fechaCorta = f => new Date(f + 'T12:00:00')
        .toLocaleDateString('es-GT', { weekday: 'short', day: 'numeric', month: 'short' }).replace(',', '')
        .replace(/^./, c => c.toUpperCase());   // "sáb 24 oct" -> "Sáb 24 oct"

    function pintarTipoTour(o) {
        // CAMBIO: si el destino no tiene tour privado (o.sinPrivado), la tarjeta de salida grupal se muestra siempre
        const mostrar = o.hayGrupalEnAlguna || o.sinPrivado;
        fieldTipoTour.hidden = !mostrar;                 // si ningún volcán tiene salida grupal, solo existe el privado
        if (!mostrar) { tipoTourBox.innerHTML = ''; return; }

        const tuvoFoco = tipoTourBox.contains(document.activeElement);
        const monto = (clase, q) => `<b class="${clase}" data-gtq="${q}">${Moneda.formatear(q)}</b>`;
        const n = o.fechasGrupales.length;
        const f = o.fechasGrupales[0];
        const cupos = f && f.cupos != null ? ` · ${f.cupos} cupos` : '';
        const ahorro = (o.precioPrivado && o.precioGrupal && o.precioPrivado > o.precioGrupal) ? o.precioPrivado - o.precioGrupal : 0;

        let subGrupal;
        if (!o.hayGrupal) subGrupal = 'Sin salidas programadas por ahora';
        else if (n === 1) subGrupal = `Bus compartido · sale el <em>${fechaCorta(f.fecha)}</em>${cupos}`;
        else subGrupal = `Bus compartido · ${n} fechas, la próxima el <em>${fechaCorta(f.fecha)}</em>`;

        // CAMBIO: en destinos sin tour privado no se dibuja la tarjeta "Tour privado"
        const tarjetaPrivada = o.sinPrivado ? '' : `
            <button type="button" class="tt-op${!o.esGrupal ? ' activo' : ''}" data-tipo-tour="privado" role="radio" aria-checked="${!o.esGrupal}">
                <span class="tt-radio" aria-hidden="true"></span>
                <span class="tt-txt"><strong>Tour privado</strong><small>Solo tu grupo · tú eliges el día</small></span>
                <span class="tt-precio">${o.precioPrivado ? monto('tt-monto', o.precioPrivado) + '<small>por persona</small>' : ''}</span>
            </button>`;

        tipoTourBox.innerHTML = tarjetaPrivada + `
            <button type="button" class="tt-op${o.esGrupal ? ' activo' : ''}" data-tipo-tour="grupal" role="radio" aria-checked="${o.esGrupal}"${o.hayGrupal ? '' : ' disabled'}>
                <span class="tt-radio" aria-hidden="true"></span>
                <span class="tt-txt"><strong>Salida grupal</strong><small>${subGrupal}</small></span>
                <span class="tt-precio">${o.precioGrupal ? monto('tt-monto', o.precioGrupal) + '<small>por persona</small>' : ''}${o.hayGrupal && ahorro ? `<span class="tt-ahorro">Ahorras ${monto('', ahorro)}</span>` : ''}</span>
            </button>`;
        if (tuvoFoco) { const act = tipoTourBox.querySelector('.activo'); if (act) act.focus({ preventScroll: true }); }
    }

    function sincronizarBarra() {
        const p = document.getElementById('dtFlotPrecio'), b = document.getElementById('dtFlotBtn');
        if (!p || !b) return;                 // la barra se crea un poco más abajo
        if (precioBox.dataset.gtq) p.dataset.gtq = precioBox.dataset.gtq; else delete p.dataset.gtq;
        p.textContent = precioBox.textContent;
        b.textContent = btnReservar.textContent;
    }

    function actualizarCajaPrecio() {
        // NUEVO: modalidades que tienen salida grupal vigente (ej. solo "amanecer")
        const claves = destino.modalidades ? Object.keys(destino.modalidades) : [];
        const clavesGrupales = claves.filter(k => Ofertas.vigentes(destino.modalidades[k].fechasGrupales || []).length > 0);
        // ¿alguna modalidad de este destino tiene salida grupal? (si ninguna, no se muestra la elección)
        const hayGrupalEnAlguna = clavesGrupales.length > 0;
        const claveGrupalPref = clavesGrupales.includes(destino.modalidadPorDefecto) ? destino.modalidadPorDefecto : clavesGrupales[0];

        // NUEVO: si está elegida la salida grupal y la modalidad mostrada no tiene salidas, pasa a la que sí
        if (tipoTour === 'grupal' && hayGrupalEnAlguna && !clavesGrupales.includes(selectModalidad.value)) {
            selectModalidad.value = claveGrupalPref;
            renderItinerario(claveGrupalPref);
        }

        const m = modalidadActual();
        const fechasGrupales = Ofertas.vigentes((m && m.fechasGrupales) || []);   // las fechas pasadas ya no se ofrecen
        const hayGrupal = fechasGrupales.length > 0;

        // Precios de la modalidad elegida; si no tiene, usa los generales
        const preciosActivos = (m && m.precios) || destino.precios || null;

        // CAMBIO: destinos SIN tour privado (solo tienen precios "grupal", ej. Rostro Maya)
        const sinPrivado = !!preciosActivos && !preciosActivos.individual && !preciosActivos.grupo;

        if (sinPrivado) tipoTour = 'grupal';           // solo existe la salida grupal
        else if (!hayGrupal) tipoTour = 'privado';     // sin fechas para esta modalidad solo existe el tour privado
        const esGrupal = tipoTour === 'grupal';

        // NUEVO: en salida grupal solo se ofrecen las modalidades con salida; si es una sola, el desplegable queda fijo (bloqueado)
        if (destino.modalidades) {
            const permitidas = (esGrupal && hayGrupalEnAlguna) ? clavesGrupales : claves;
            const huella = permitidas.join('|');
            if (selectModalidad.dataset.opc !== huella) {
                const valor = selectModalidad.value;
                selectModalidad.innerHTML = permitidas.map(k => `<option value="${k}">${destino.modalidades[k].nombre}</option>`).join('');
                selectModalidad.dataset.opc = huella;
                selectModalidad.value = permitidas.includes(valor) ? valor : permitidas[0];
            }
            selectModalidad.disabled = esGrupal && permitidas.length <= 1;
            tabsBox.querySelectorAll('.modalidad-tab').forEach(t => {
                const bloqueada = esGrupal && !permitidas.includes(t.dataset.mod);
                t.disabled = bloqueada;
                t.title = bloqueada ? 'Solo disponible en tour privado' : '';
            });
        }

        // Puntos de salida según los precios activos (conserva el que ya estaba elegido)
        if (preciosActivos) {
            const puntos = Object.keys(preciosActivos.individual || preciosActivos.grupal || preciosActivos.grupo || {});
            const anterior = selectPunto.value;
            selectPunto.innerHTML = puntos.map(p => `<option value="${p}">${p}</option>`).join('');
            if (puntos.includes(anterior)) selectPunto.value = anterior;
        }

        // Tarjetas Tour privado / Salida grupal (cada una muestra su propio precio)
        const puntoSel = selectPunto.value;
        // NUEVO: si estás en otra modalidad (ej. atardecer), la tarjeta grupal muestra la de la modalidad que sí tiene salida
        const mTarjeta = (hayGrupal || !hayGrupalEnAlguna) ? m : destino.modalidades[claveGrupalPref];
        const fechasTarjeta = mTarjeta === m ? fechasGrupales : Ofertas.vigentes(mTarjeta.fechasGrupales || []);
        const preciosTarjeta = (mTarjeta && mTarjeta.precios) || destino.precios || null;
        pintarTipoTour({
            esGrupal, hayGrupal: fechasTarjeta.length > 0, hayGrupalEnAlguna, fechasGrupales: fechasTarjeta, sinPrivado,
            precioPrivado: preciosActivos ? (preciosActivos[selectGrupo.value] || preciosActivos.individual)?.[puntoSel] : destino.precioDesde,
            precioGrupal: preciosTarjeta ? (preciosTarjeta.grupal || preciosTarjeta.grupo)?.[puntoSel] : undefined
        });

        // Campo de participantes (individual/grupo) solo aplica al tour privado
        // Participantes se muestra siempre (también en salida grupal); la fecha exacta solo en tour privado
        fieldGrupo.style.display = '';
        document.getElementById('field-fecha').style.display = esGrupal ? 'none' : '';

        // Fecha de la salida grupal: con una sola fecha ya se ve en la tarjeta; con varias se elige aquí
        if (!hayGrupal) fechaGrupalElegida = '';
        if (esGrupal && hayGrupal) {
            if (!fechasGrupales.some(f => f.fecha === fechaGrupalElegida)) fechaGrupalElegida = fechasGrupales[0].fecha;
            fieldFechaGrupal.innerHTML = fechasGrupales.length > 1
                ? '<label class="detail-field-label">Elige la fecha de salida</label><div class="chips-fecha">' +
                    fechasGrupales.map(f => `<button type="button" class="chip-fecha ${f.fecha === fechaGrupalElegida ? 'activo' : ''}" data-fecha="${f.fecha}">
                        ${fechaBonita(f.fecha)}<small>${f.cupos} cupos</small></button>`).join('') + '</div>'
                : '';
        } else {
            fieldFechaGrupal.innerHTML = '';
        }

        // Precio "Desde": si hay salida grupal con precio, se muestra el de la salida grupal MÁS CARA
        // (el del punto más lejano, no el de las faldas); si no hay, el del tour privado ("individual" o "grupo" según participantes).
        // Salida grupal (bus) usa "grupal" (si no existe, cae en "grupo").
        let desdeEsGrupal = false;
        if (preciosActivos) {
            const claveGrupal = preciosActivos.grupal ? 'grupal' : 'grupo';
            // CAMBIO: sin tour privado, el precio siempre es el de la salida grupal (aunque no haya fechas vigentes)
            const valoresGrupal = (esGrupal || hayGrupal || sinPrivado) ? Object.values(preciosActivos[claveGrupal] || {}) : [];
            const precioGrupal = valoresGrupal.length ? Math.max(...valoresGrupal) : undefined;
            desdeEsGrupal = precioGrupal != null;
            const precio = desdeEsGrupal ? precioGrupal : preciosActivos[selectGrupo.value]?.[selectPunto.value];
            Moneda.poner(precioBox, precio);
        } else {
            Moneda.poner(precioBox, destino.precioDesde);
        }

        // Etiqueta bajo el precio grande: de cuál tour es
        const etiquetaPrecio = document.querySelector('.detail-price-per');
        if (etiquetaPrecio) etiquetaPrecio.textContent = sinPrivado ? 'por persona · salida grupal'
            : !hayGrupalEnAlguna ? 'por persona'
            : (desdeEsGrupal ? 'por persona · salida grupal' : 'por persona · tour privado');

        // Botón de reservar
        btnReservar.classList.toggle('lava', esGrupal && !!fechaGrupalElegida);
        btnReservar.textContent = esGrupal ? 'Reservar mi lugar' : 'Ver disponibilidad';
        // CAMBIO: sin tour privado y sin fechas vigentes no hay nada que reservar
        if (sinPrivado && !hayGrupal) {
            btnReservar.disabled = true;
            btnReservar.textContent = 'Sin fechas disponibles';
        } else {
            btnReservar.disabled = false;
        }
        // Precio por persona del tour elegido (privado o grupal): reserva.js lo usa para el total bajo "Participantes"
        let unitarioSel;
        if (preciosActivos) {
            unitarioSel = esGrupal
                ? (preciosActivos.grupal || preciosActivos.grupo || preciosActivos.individual)?.[puntoSel]
                : (preciosActivos[selectGrupo.value] || preciosActivos.individual)?.[puntoSel];
        } else {
            unitarioSel = destino.precioDesde;
        }
        if (typeof Reserva !== 'undefined' && Reserva.actualizarTotal) Reserva.actualizarTotal(unitarioSel);
        if (typeof sincronizarBarra === 'function') sincronizarBarra();
    }

    selectPunto.addEventListener('change', actualizarCajaPrecio);
    selectGrupo.addEventListener('change', actualizarCajaPrecio);
    btnReservar.addEventListener('click', () => Reserva.abrirDisponibilidad());

    tipoTourBox.addEventListener('click', e => {
        const b = e.target.closest('[data-tipo-tour]'); if (!b) return;
        tipoTour = b.dataset.tipoTour;
        actualizarCajaPrecio();
    });
    fieldFechaGrupal.addEventListener('click', e => {
        const c = e.target.closest('.chip-fecha'); if (!c) return;
        fechaGrupalElegida = c.dataset.fecha;
        actualizarCajaPrecio();
    });

    // NUEVO: si el destino ya tiene una salida grupal vigente, arranca elegida la salida grupal
    if (destino.modalidades && Object.values(destino.modalidades).some(x => Ofertas.vigentes(x.fechasGrupales || []).length > 0)) {
        tipoTour = 'grupal';
    }
    actualizarCajaPrecio();

    // --- RESERVA: fecha, participantes, disponibilidad y pasos (ver reserva.js) ---
    Reserva.iniciar({
        destino,
        contFecha: document.getElementById('field-fecha'),
        contPersonas: document.getElementById('rv-personas'),
        // Lo que reserva.js necesita saber de la caja de precio en cada momento
        leerSeleccion: () => ({
            modalidad: selectModalidad.value || destino.modalidadPorDefecto || null,
            punto: selectPunto.value,
            tipoTour,
            fechaGrupal: fechaGrupalElegida
        }),
        // Cuando cambian la fecha o los participantes: se ajusta individual/grupo y el precio
        alCambiar: () => {
            const m = modalidadActual();
            const pa = (m && m.precios) || destino.precios;
            selectGrupo.value = (Reserva.personas >= 2 && pa && pa.grupo) ? 'grupo' : 'individual';
            actualizarCajaPrecio();
        }
    });

    // --- BARRA FLOTANTE (celular): precio + "Ver disponibilidad" siempre a la vista ---
    const caja = document.querySelector('.detail-price-box');
    const barra = document.createElement('div');
    barra.className = 'dt-flotante';
    barra.setAttribute('role', 'region');
    barra.setAttribute('aria-label', 'Reservar');
    barra.innerHTML = `
        <div class="dt-flotante__precio">
            <span>Desde</span><b id="dtFlotPrecio">${Moneda.formatear(null)}</b><em>por persona</em>
            ${destino.etiqueta ? `<i class="dt-flotante__tag">${destino.etiqueta}</i>` : ''}
        </div>
        <button type="button" class="dt-flotante__btn" id="dtFlotBtn">Ver disponibilidad</button>`;
    document.body.appendChild(barra);
    document.body.classList.add('tiene-flotante');
    sincronizarBarra();

    document.getElementById('dtFlotBtn').addEventListener('click', () => {
        if (!caja) return;
        caja.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
        caja.classList.remove('dt-resalta');
        void caja.offsetWidth;
        caja.classList.add('dt-resalta');
    });
    if (caja && 'IntersectionObserver' in window) {
        new IntersectionObserver(es => barra.classList.toggle('oculta', es[0].isIntersecting), { threshold: 0.12 }).observe(caja);
    }

    // --- 9. POLÍTICAS ---
    document.getElementById('detail-reserva-minima').textContent =
        destino.reservaMinima || 'Sujeto a disponibilidad.';
    document.getElementById('detail-cancelacion').textContent =
        destino.cancelacion || 'Consulta política de cancelación.';

    const policyExtra = document.getElementById('detail-policy-extra');
    let extraHtml = '';
    if (destino.guiaIdiomas) extraHtml += `<div><strong>Idiomas:</strong> ${destino.guiaIdiomas.join(' / ')}</div>`;
    if (destino.servicioRecogida) extraHtml += `<div><strong>Recogida y traslado incluidos</strong></div>`;
    policyExtra.innerHTML = extraHtml;

    // --- 10. FAVORITO (guardado en localStorage) ---
    const btnFavorito = document.getElementById('btn-favorito');
    function getFavoritos() {
        return JSON.parse(localStorage.getItem('favoritos') || '[]');
    }
    function actualizarBotonFavorito() {
        const esFavorito = getFavoritos().includes(destino.id);
        btnFavorito.textContent = esFavorito ? '❤️ Favorito' : '🤍 Favorito';
        btnFavorito.classList.toggle('activo', esFavorito);
    }
    btnFavorito.addEventListener('click', () => {
        let favoritos = getFavoritos();
        if (favoritos.includes(destino.id)) {
            favoritos = favoritos.filter(f => f !== destino.id);
        } else {
            favoritos.push(destino.id);
        }
        localStorage.setItem('favoritos', JSON.stringify(favoritos));
        actualizarBotonFavorito();
    });
    actualizarBotonFavorito();

    // --- 11. COMPARTIR ---
    document.getElementById('btn-compartir').addEventListener('click', async () => {
        const url = window.location.href;
        if (navigator.share) {
            try { await navigator.share({ title: destino.nombre, text: destino.descripcion, url }); }
            catch (e) { /* el usuario canceló, no hacemos nada */ }
        } else {
            await navigator.clipboard.writeText(url);
            alert('Enlace copiado al portapapeles');
        }
    });

    // --- 12. SUGERENCIAS (otros volcanes) ---
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
    function precioDesdeDestino(d) {
        const gMax = precioGrupalMasCaro(d);
        if (gMax != null) return gMax;   // salida grupal vigente: la más cara
        const m = d.modalidades && d.modalidades[d.modalidadPorDefecto];
        const p = (m && m.precios) || d.precios;
        // CAMBIO: si el destino solo tiene salida grupal, se usa el precio más bajo de "grupal"
        const tabla = p && (p.individual || p.grupal);
        if (tabla) {
            const valores = Object.values(tabla);
            return valores.length ? Math.min(...valores) : null;
        }
        return d.precioDesde ?? null;
    }
    function duracionDeDestino(d) {
        if (d.modalidades && d.modalidadPorDefecto) {
            const m = d.modalidades[d.modalidadPorDefecto];
            if (m && m.duracionTexto && m.duracionTexto !== 'TODO') return m.duracionTexto;
        }
        return d.duracion || '';
    }

    const sugerenciasBox = document.getElementById('detail-suggestions');
    const otros = destinos.filter(d => d.id !== destino.id && d.categoria === destino.categoria).slice(0, 3);
    if (otros.length) {
        sugerenciasBox.innerHTML = otros.map(d => {
            const precio = precioDesdeDestino(d);
            return `
            <a class="suggestion-card" href="detalle.html?id=${d.id}">
                <div class="suggestion-photo" data-foto="${Imagenes.base(d)}" style="background-image:url('${d.imagen}');">
                    <button type="button" class="suggestion-fav" data-id="${d.id}"></button>
                </div>
                <div class="suggestion-info">
                    <h4>${d.nombre}</h4>
                    <p class="suggestion-duracion">${duracionDeDestino(d)}</p>
                    <div class="suggestion-meta">
                        <span class="suggestion-rating">★ ${d.calificacion ?? '—'}${d.numeroResenas ? ` (${d.numeroResenas})` : ''}</span>
                        ${precio ? `<span class="suggestion-precio">Desde <strong data-gtq="${precio}">${Moneda.formatear(precio)}</strong></span>` : ''}
                    </div>
                </div>
            </a>`;
        }).join('');
        Imagenes.corregirFondos(sugerenciasBox);   // arregla la extensión de las fotos de fondo

        // Corazón de favorito de cada tarjeta (reusa el mismo localStorage que el de arriba)
        sugerenciasBox.querySelectorAll('.suggestion-fav').forEach(btn => {
            const idDestino = btn.dataset.id;
            const pintar = () => {
                btn.textContent = getFavoritos().includes(idDestino) ? '❤️' : '🤍';
            };
            pintar();
            btn.addEventListener('click', e => {
                e.preventDefault();
                e.stopPropagation();
                let favoritos = getFavoritos();
                favoritos = favoritos.includes(idDestino)
                    ? favoritos.filter(f => f !== idDestino)
                    : [...favoritos, idDestino];
                localStorage.setItem('favoritos', JSON.stringify(favoritos));
                pintar();
            });
        });
    } else {
        document.getElementById('block-sugerencias').style.display = 'none';
    }

    // --- 13. RESEÑAS Y FORMULARIO PARA AGREGAR UNA ---
    const resenasBox = document.getElementById('detail-resenas');
    const btnEscribirResena = document.getElementById('btn-escribir-resena');
    const resenaFormWrap = document.getElementById('detail-resena-form-wrap');
    const formResena = document.getElementById('form-resena');

    function getResenasGuardadas() {
        return JSON.parse(localStorage.getItem(`resenas-${destino.id}`) || '[]');
    }
    function iniciales(nombre) {
        return nombre.split(' ').filter(Boolean).slice(0, 2).map(p => p[0].toUpperCase()).join('');
    }
    function estrellasTexto(n) {
        return '★★★★★'.slice(0, n) + '☆☆☆☆☆'.slice(0, 5 - n);
    }

    function renderResenas() {
        const todas = [...getResenasGuardadas(), ...(destino.resenas || [])];
        if (!todas.length) {
            resenasBox.innerHTML = '<p class="detail-no-resenas">Aún no hay reseñas para esta experiencia.</p>';
            return;
        }
        resenasBox.innerHTML = todas.map(r => `
            <div class="resena-card">
                <div class="resena-avatar">${iniciales(r.nombre)}</div>
                <div class="resena-body">
                    <div class="resena-head">
                        <strong>${r.nombre}</strong>
                        <span class="resena-fecha">${r.fecha}</span>
                    </div>
                    <div class="resena-estrellas">${estrellasTexto(r.calificacion)}</div>
                    <p>${r.texto}</p>
                </div>
            </div>
        `).join('');
    }
    renderResenas();

    btnEscribirResena.addEventListener('click', () => {
        const abierto = !resenaFormWrap.hidden;
        resenaFormWrap.hidden = abierto;
        btnEscribirResena.textContent = abierto ? 'Escribir una reseña' : 'Cancelar';
        if (!abierto) document.getElementById('resena-nombre').focus();
    });

    formResena.addEventListener('submit', e => {
        e.preventDefault();
        const nombre = document.getElementById('resena-nombre').value.trim();
        const texto = document.getElementById('resena-texto').value.trim();
        const calificacion = parseInt(document.getElementById('resena-calificacion').value, 10);
        if (!nombre || !texto) return;

        const nueva = {
            nombre,
            fecha: new Date().toLocaleDateString('es-GT', { day: 'numeric', month: 'long', year: 'numeric' }),
            calificacion,
            texto
        };
        const guardadas = getResenasGuardadas();
        guardadas.unshift(nueva);
        localStorage.setItem(`resenas-${destino.id}`, JSON.stringify(guardadas));

        formResena.reset();
        resenaFormWrap.hidden = true;
        btnEscribirResena.textContent = 'Escribir una reseña';
        renderResenas();
    });

});