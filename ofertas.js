// ==========================================
// OFERTAS — la lógica (sin dibujar nada en pantalla).
// Convierte destinos-data.js + proveedores-data.js en una lista de
// ofertas para una fecha, calcula precios y arma el mensaje de la reserva.
// Si algún día los datos vienen de un servidor, solo cambia buscar().
// ==========================================

const Ofertas = (() => {

    const DIAS_ES = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];

    // ---------- Fechas (siempre como texto "AAAA-MM-DD", sin zonas horarias) ----------
    const pad = n => String(n).padStart(2, '0');
    const aISO = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
    const deISO = iso => new Date(iso + 'T12:00:00');               // mediodía: evita saltos de día
    const hoyISO = () => aISO(new Date());
    const sumarDias = (iso, n) => { const d = deISO(iso); d.setDate(d.getDate() + n); return aISO(d); };
    const fechaBonita = iso => deISO(iso).toLocaleDateString('es-GT', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    const fechaCorta = iso => deISO(iso).toLocaleDateString('es-GT', { weekday: 'short', day: 'numeric', month: 'short' });

    const Q = n => 'Q' + Number(n).toLocaleString('es-GT', { maximumFractionDigits: 0 });

    // ---------- Cupones de descuento ----------
    // Códigos de 4 dígitos (empiezan en 1432 y siguen hacia adelante). Para crear uno nuevo, agrega una línea.
    //   tipo:     'porcentaje' (valor = % sobre el total)  ·  'monto' (valor = quetzales que se restan del total)
    //   etiqueta: texto que ve el cliente cuando lo aplica
    //   Opcionales: vence: 'AAAA-MM-DD' (último día válido) · destinos: ['fuego', 'rostro-maya'] · activo: false (apagarlo)
    // OJO: estos códigos viven en el código de la página, así que cualquiera que sepa leerlo puede verlos.
    // Sirve para promociones simples; para códigos privados hará falta un servidor.
    const CUPONES = {
        '1432': { tipo: 'porcentaje', valor: 10, etiqueta: '10% de descuento' },   // TODO: pon el descuento real
        '1433': { tipo: 'porcentaje', valor: 15, etiqueta: '15% de descuento' },   // TODO
        '1434': { tipo: 'monto',      valor: 50, etiqueta: 'Q50 de descuento' },   // TODO
        '1435': { tipo: 'porcentaje', valor: 20, etiqueta: '20% de descuento' }    // TODO
    };

    // Devuelve { ok: true, cupon } o { ok: false, motivo: 'formato' | 'invalido' | 'vencido' | 'destino' }
    function buscarCupon(codigo, destinoId) {
        const c = String(codigo || '').trim();
        if (!/^\d{4}$/.test(c)) return { ok: false, motivo: 'formato' };
        const d = CUPONES[c];
        if (!d || d.activo === false) return { ok: false, motivo: 'invalido' };
        if (d.vence && d.vence < hoyISO()) return { ok: false, motivo: 'vencido' };
        if (d.destinos && destinoId && !d.destinos.includes(destinoId)) return { ok: false, motivo: 'destino' };
        return { ok: true, cupon: { codigo: c, tipo: d.tipo, valor: d.valor, etiqueta: d.etiqueta || '' } };
    }

    // Cuánto se descuenta de un subtotal (nunca más que el subtotal)
    function calcularDescuento(subtotal, cupon) {
        if (!cupon || !(subtotal > 0)) return 0;
        const d = cupon.tipo === 'porcentaje' ? Math.round(subtotal * cupon.valor / 100) : Number(cupon.valor) || 0;
        return Math.max(0, Math.min(d, subtotal));
    }

    // ---------- Qué precio aplica ----------
    // privado + 1 persona → individual · privado + 2 o más → grupo · salida grupal (bus) → grupal
    function nivelPrecio(tipoTour, personas, precios) {
        if (tipoTour === 'grupal') return precios.grupal ? 'grupal' : (precios.grupo ? 'grupo' : 'individual');
        return (personas >= 2 && precios.grupo) ? 'grupo' : 'individual';
    }

    function precioPara(oferta, tipoTour, personas, puntoPedido, cupon) {
        const precios = oferta.precios;
        if (!precios) return null;
        const nivel = nivelPrecio(tipoTour, personas, precios);
        const tabla = precios[nivel] || precios.individual || {};
        const puntos = Object.keys(tabla);
        if (!puntos.length) return null;
        const punto = puntos.includes(puntoPedido) ? puntoPedido : puntos[0];
        const unitario = tabla[punto];
        const antes = oferta.precioAntes && oferta.precioAntes[nivel];
        const subtotal = unitario * personas;
        const descCupon = calcularDescuento(subtotal, cupon);
        return {
            punto,
            puntoCambiado: !!puntoPedido && punto !== puntoPedido,   // este proveedor no sale desde el punto que eligió
            nivel,
            unitario,
            antes: antes && antes > unitario ? antes : null,
            descuento: antes && antes > unitario ? Math.round((1 - unitario / antes) * 100) : 0,
            subtotal,                                  // antes del cupón
            descuentoCupon: descCupon,                 // lo que se descuenta por el cupón (0 si no hay)
            total: subtotal - descCupon                // lo que realmente se paga
        };
    }

    // ---------- Disponibilidad de una oferta en una fecha ----------
    // Devuelve { ok, cupos? }
    function disponibilidad(oferta, tipoTour, iso, anticipacionDias) {
        const f = oferta.fechas || {};
        if (tipoTour === 'grupal') {
            const e = (f.lista || []).find(x => x.fecha === iso);
            return (e && iso >= hoyISO()) ? { ok: true, cupos: e.cupos } : { ok: false };   // las fechas pasadas ya no se ofrecen
        }
        if (iso < sumarDias(hoyISO(), anticipacionDias ?? 0)) return { ok: false };
        if (f.desde && iso < f.desde) return { ok: false };
        if (f.hasta && iso > f.hasta) return { ok: false };
        if (f.bloqueadas && f.bloqueadas.includes(iso)) return { ok: false };
        if (f.diasSemana && !f.diasSemana.includes(deISO(iso).getDay())) return { ok: false };
        return { ok: true };
    }

    // ---------- Ofertas automáticas de A La Torre (salen de destinos-data.js) ----------
    function ofertasAuto(destino, modalidadKey, proveedor) {
        const m = destino.modalidades && (destino.modalidades[modalidadKey] || destino.modalidades[destino.modalidadPorDefecto]);
        let precios = (m && m.precios) || destino.precios || null;
        if (!precios && destino.precioDesde) precios = { individual: { 'Punto de salida': destino.precioDesde } };
        if (!precios) return [];

        const base = {
            destino: destino.id,
            modalidad: modalidadKey || null,
            nombreModalidad: m ? m.nombre : '',
            idiomas: destino.guiaIdiomas || [],
            etiqueta: destino.etiqueta || '',
            pagarDespues: true,
            cancelacion: destino.cancelacion || '',
            recogida: !!destino.servicioRecogida,
            precios
        };
        // Destinos que solo tienen salida grupal (sin precios "individual" ni "grupo", ej. Rostro Maya): no hay tour privado
        const sinPrivado = !precios.individual && !precios.grupo;
        const lista = sinPrivado ? [] : [{
            ...base, id: `${proveedor.id}-${destino.id}-${modalidadKey}-privado`, tipos: ['privado'],
            titulo: `${m ? m.nombre : destino.nombre} · Tour privado`,
            descripcion: destino.descripcion || '',
            fechas: {}
        }];
        if (m && m.fechasGrupales && m.fechasGrupales.length) {
            lista.push({
                ...base, id: `${proveedor.id}-${destino.id}-${modalidadKey}-grupal`, tipos: ['grupal'],
                titulo: `${m.nombre} · Salida grupal en bus`,
                descripcion: 'Sal con otros viajeros en bus, con guía y recogida incluidos. Fecha fija y cupos limitados.',
                fechas: { lista: m.fechasGrupales }
            });
        }
        return lista;
    }

    // ---------- Búsqueda: devuelve las ofertas que sirven para esta selección ----------
    // sel = { destino, modalidad, punto, tipoTour, fecha, personas }
    async function buscar(sel, proveedores) {
        proveedores = proveedores || PROVEEDORES;
        const resultado = [];
        Object.entries(proveedores).forEach(([pid, prov]) => {
            if (!prov || prov.activo === false) return;
            const proveedor = { ...prov, id: pid };
            const candidatas = prov.ofertas === 'auto'
                ? ofertasAuto(sel.destino, sel.modalidad, proveedor)
                : (prov.ofertas || []).filter(o => o.destino === sel.destino.id && (!o.modalidad || o.modalidad === sel.modalidad));

            candidatas.forEach(o => {
                if (!(o.tipos || ['privado']).includes(sel.tipoTour)) return;
                const disp = disponibilidad(o, sel.tipoTour, sel.fecha, prov.anticipacionDias);
                if (!disp.ok) return;
                const precio = precioPara(o, sel.tipoTour, sel.personas, sel.punto, sel.cupon);
                if (!precio) return;
                resultado.push({
                    ...o,
                    proveedor,
                    precio,
                    cupos: disp.cupos ?? null,
                    sinCupos: disp.cupos != null && sel.personas > disp.cupos
                });
            });
        });
        return resultado.sort((a, b) => a.precio.unitario - b.precio.unitario);
    }

    // ---------- ¿Tiene sentido este día en el calendario? (para pintar disponibles) ----------
    function diaDisponible(sel, iso, proveedores) {
        proveedores = proveedores || PROVEEDORES;
        return Object.values(proveedores).some(prov => {
            if (!prov || prov.activo === false) return false;
            if (prov.ofertas === 'auto') {
                return disponibilidad({ fechas: {} }, 'privado', iso, prov.anticipacionDias).ok;
            }
            return (prov.ofertas || []).some(o =>
                o.destino === sel.destino.id && (!o.modalidad || o.modalidad === sel.modalidad) &&
                (o.tipos || ['privado']).includes('privado') &&
                disponibilidad(o, 'privado', iso, prov.anticipacionDias).ok);
        });
    }

    // ---------- La reserva completa (lo que se guarda y se manda por mensaje) ----------
    function codigoReserva(destinoId, iso) {
        const letras = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        let r = '';
        for (let i = 0; i < 4; i++) r += letras[Math.floor(Math.random() * letras.length)];
        return `ALT-${destinoId.replace(/[^a-z]/gi, '').slice(0, 3).toUpperCase()}-${iso.slice(2).replace(/-/g, '')}-${r}`;
    }

    function armarReserva({ sel, oferta, hora, cliente, tipoPago }) {
        const p = oferta.precio;
        const total = p.total;                                   // ya incluye el cupón, si hay
        const fraccion = oferta.proveedor.anticipo;
        const anticipo = fraccion ? Math.ceil(total * fraccion) : total;
        return {
            codigo: codigoReserva(sel.destino.id, sel.fecha),
            destino: sel.destino.nombre.split(':')[0].trim(),      // nombre corto para el mensaje
            destinoId: sel.destino.id,
            modalidad: oferta.nombreModalidad || '',
            tipoTour: sel.tipoTour,
            fecha: sel.fecha,
            personas: sel.personas,
            punto: p.punto,
            hora: hora || '',
            oferta: oferta.titulo,
            proveedor: oferta.proveedor,
            unitario: p.unitario,
            subtotal: p.subtotal,
            descuentoCupon: p.descuentoCupon || 0,
            cupon: sel.cupon ? sel.cupon.codigo : '',
            total,
            anticipo,
            fraccionAnticipo: fraccion || 1,
            tipoPago: tipoPago === 'anticipo' && fraccion ? 'anticipo' : 'total',
            cliente
        };
    }

    const montoAPagar = r => (r.tipoPago === 'anticipo' ? r.anticipo : r.total);

    // ---------- Validación de los datos del cliente ----------
    function validarCliente(c) {
        const e = {};
        if ((c.nombre || '').trim().length < 2) e.nombre = 'Escribe tu nombre.';
        if ((c.apellido || '').trim().length < 2) e.apellido = 'Escribe tu apellido.';
        if (!/^\+\d{1,4}$/.test((c.prefijo || '').trim())) e.telefono = 'Revisa el código de país (ej. +502).';
        else {
            const d = (c.telefono || '').replace(/\D/g, '');
            if (d.length < 6 || d.length > 14) e.telefono = 'Escribe un número válido (solo números).';
        }
        if ((c.correo || '').trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(c.correo.trim())) e.correo = 'Ese correo no parece válido.';
        return e;
    }

    // ---------- Mensaje que se envía por WhatsApp / Instagram ----------
    function mensajeReserva(r) {
        const c = r.cliente;
        const lineas = [
            `Hola ${r.proveedor.nombre} 👋 Ya hice mi pago para reservar:`,
            '',
            `📌 Reserva: ${r.codigo}`,
            `🌋 ${r.destino}${r.modalidad ? ' — ' + r.modalidad : ''}`,
            `🗓️ ${fechaBonita(r.fecha)}${r.hora ? ' · ' + r.hora : ''}`,
            `👥 ${r.personas} ${r.personas === 1 ? 'persona' : 'personas'} · ${r.tipoTour === 'grupal' ? 'Salida grupal' : 'Tour privado'}`,
            `📍 Salida: ${r.punto}`,
            ...(r.descuentoCupon > 0 ? [`🏷️ Cupón ${r.cupon}: −${Q(r.descuentoCupon)}`] : []),
            `💵 Total: ${Q(r.total)} · Pagado ahora: ${Q(montoAPagar(r))}${r.tipoPago === 'anticipo' ? ` (anticipo ${Math.round(r.fraccionAnticipo * 100)}%)` : ''}`,
            '',
            `👤 ${c.nombre} ${c.apellido}`,
            `📞 ${c.prefijo} ${c.telefono}`
        ];
        if (c.correo) lineas.push(`✉️ ${c.correo}`);
        if (r.aceptacion) lineas.push('', `✅ Acepté los términos y condiciones (v${r.aceptacion.version}) y la declaración de riesgos`);
        lineas.push('', 'Adjunto la foto de la boleta. ¡Gracias!');
        return lineas.join('\n');
    }

    const enlaceWhatsApp = (prov, texto) => `https://wa.me/${prov.contacto.whatsapp}?text=${encodeURIComponent(texto)}`;
    const enlaceInstagram = prov => `https://ig.me/m/${prov.contacto.instagram}`;

    return {
        aISO, deISO, hoyISO, sumarDias, fechaBonita, fechaCorta, Q, DIAS_ES,
        vigentes: lista => (lista || []).filter(f => f.fecha >= hoyISO()),
        buscarCupon, calcularDescuento, nivelPrecio, precioPara, disponibilidad, buscar, diaDisponible,
        armarReserva, montoAPagar, validarCliente, mensajeReserva, enlaceWhatsApp, enlaceInstagram
    };
})();

if (typeof module !== 'undefined') module.exports = Ofertas;