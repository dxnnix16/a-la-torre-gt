// ==========================================
// PROVEEDORES — aquí vive todo lo de cada proveedor.
// Para agregar uno nuevo: copia un bloque, cambia el id y los datos.
// No hay que tocar reserva.js ni ofertas.js.
//
// Cada proveedor tiene:
//   nombre, logo (opcional), color, activo
//   contacto: whatsapp (solo números, con código de país) e instagram (usuario)
//   cuentas:  cuentas para transferencia/depósito (se muestran en el paso de pago)
//   anticipo: fracción mínima para apartar (0.5 = 50%). Omítelo si solo acepta pago total.
//   ofertas:  'auto'  → se generan solas desde destinos-data.js (precios, modalidades,
//                       fechas grupales). Úsalo para A La Torre GT.
//             [ ... ] → lista de ofertas propias (ver ejemplo abajo).
//
// Todos los precios van en quetzales (GTQ), por persona.
// ==========================================

const PROVEEDORES = {

    // ------------------------------------------
    // TÚ (A La Torre GT)
    // ------------------------------------------
    'a-la-torre': {
        nombre: 'A La Torre GT',
        logo: 'img/proveedores/a-la-torre.png',   // TODO: pon tu logo (cuadrado, ~120px). Si no existe, se muestran las iniciales.
        color: '#ff4500',
        activo: true,
        contacto: {
            whatsapp: '50230554595',               // +502 3055 4595
            instagram: 'alatorregt'                // TODO: tu usuario real de Instagram (sin @)
        },
        anticipo: 0.5,                             // reserva con el 50% (como dice reservaMinima en destinos-data.js)
        anticipacionDias: 1,                       // cuántos días antes como mínimo se puede reservar un tour privado
        cuentas: [                                 // TODO: pon tus cuentas reales
            { banco: 'Banco Industrial', tipo: 'Monetaria', numero: '000-000000-0', titular: 'Nombre del titular', moneda: 'GTQ' },
            { banco: 'Banrural',         tipo: 'Ahorro',    numero: '0000000000',   titular: 'Nombre del titular', moneda: 'GTQ' }
        ],
        ofertas: 'auto'
    },

    // ------------------------------------------
    // EJEMPLO DE PROVEEDOR EXTERNO (apagado).
    // Pon activo: true para ver cómo se ven varias tarjetas en el carrusel.
    // Bórralo cuando ya tengas proveedores reales.
    // ------------------------------------------
    'demo-aventuras': {
        nombre: 'Aventuras Demo',
        logo: '',
        color: '#2b6cb0',
        activo: false,
        contacto: { whatsapp: '50200000000', instagram: 'aventurasdemo' },
        anticipo: 0.3,
        cuentas: [
            { banco: 'BAC', tipo: 'Monetaria', numero: '000000000', titular: 'Aventuras Demo, S.A.', moneda: 'GTQ' }
        ],
        ofertas: [
            {
                id: 'demo-fuego-privado',
                destino: 'fuego',                         // id del destino en destinos-data.js
                modalidad: 'amanecer',                     // clave de la modalidad, o null si aplica a todas
                tipos: ['privado'],                        // 'privado' y/o 'grupal'
                titulo: 'Fuego privado con desayuno en la cumbre',
                descripcion: 'Ascenso nocturno en grupo reducido con guía certificado, desayuno caliente en la cumbre y fotos incluidas.',
                idiomas: ['Español', 'Inglés'],
                etiqueta: 'Se agota fácilmente',           // opcional
                pagarDespues: true,
                cancelacion: 'Cancelación gratuita hasta 48 horas antes',
                recogida: true,
                horas: ['5:00 pm', '5:30 pm'],             // opcional: el cliente elige una hora
                precioAntes: { individual: 520 },          // opcional: precio tachado (por punto o general)
                precios: {
                    individual: { 'Antigua Guatemala': 450, 'Russ Mall': 450 },
                    grupo:      { 'Antigua Guatemala': 390, 'Russ Mall': 390 }
                },
                // Disponibilidad (todo opcional):
                fechas: {
                    diasSemana: [4, 5, 6],                 // 0=domingo … 6=sábado. Omitir = todos los días
                    desde: '2026-10-01',
                    hasta: '2026-12-31',
                    bloqueadas: ['2026-12-24', '2026-12-25']
                }
            }
        ]
    }
};
