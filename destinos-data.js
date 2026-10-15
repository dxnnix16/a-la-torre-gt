// ==========================================
// BASE DE DATOS DE DESTINOS
// Aquí vive toda la info de cada volcán/lugar.
// Campos marcados NUEVO los agregué yo para la franja de
// íconos y la caja de reserva. Los TODO los completas tú.
// ==========================================

const destinos = [

    // ==========================================
    // VOLCÁN DE FUEGO (ficha completa)
    // ==========================================
    {
        id: "fuego",
        nombre: "Volcán de Fuego: Observa la Erupción en Vivo Desde las Faldas del Volcán",
        region: "Escuintla / Chimaltenango",
        categoria: "volcanes",
        calificacion: 4.8,
        numeroResenas: 0, // TODO: cuando tengas reseñas reales, actualiza este número
        imagen: "img/fuego.webp",

        descripcion: "Vive una de las experiencias más impresionantes de Guatemala: contempla en vivo las erupciones del Volcán de Fuego, uno de los volcanes más activos de Centroamérica. Una aventura de ascenso nocturno guiado, pensada para quienes buscan algo más que una simple caminata — un recuerdo que se queda para siempre.",

        // --- REQUISITOS Y NIVEL ---
        edadMinima: 15,
        condicionSalud: "Buena condición de salud",
        exigencia: 7, // escala del 1 al 10

        // --- POLÍTICAS ---
        reservaMinima: "El tour se confirma con un mínimo del 50% de la reserva completa.",
        cancelacion: "Cancelación gratuita si se cancela con 48 horas de antelación.",

        // NUEVO — para el ícono de turismo responsable
        responsable: "Bajamos toda nuestra basura, cuidamos el sendero y trabajamos con guías locales.", // TODO: ajusta el texto si quieres

        // --- SERVICIO ---
        guiaIdiomas: ["Español", "Inglés", "Portugués", "Lenguaje de Señas"],
        servicioRecogida: true,

        // --- QUÉ INCLUYE / QUÉ NO ---
        incluye: [
            "Transporte redondo",
            "Snacks",
            "Guía bilingüe (español / inglés)",
            "Servicio de recogida"
        ],
        incluyeOpcional: [
            "Alquiler de equipo (carpa, saco de dormir, bastones)" // costo adicional
        ],
        noIncluye: [
            "Entrada al volcán (Q100 / $13)",
            "Agua"
        ],

        // --- QUÉ DEBE LLEVAR EL CLIENTE ---
        queLlevar: [
            "Ropa abrigada por capas",
            "Calzado de trekking / senderismo",
            "Bastones de senderismo (si no los alquilas con nosotros)",
            "Linterna frontal o de mano",
            "Guantes y gorro",
            "Su equipo personal en general"
        ],

        // --- BLOQUES DE INFORMACIÓN (NUEVO) ---
        // Cada bloque se muestra como una columna con viñetas en la ficha.
        // Para otro volcán, copia esta misma estructura con su propio contenido.
        infoBloques: [
            {
                titulo: "La experiencia",
                items: [
                    "Camina hacia las faldas del volcán de Fuego, uno de los más activos de Centroamérica",
                    "Sé testigo de sus erupciones constantes, de día o de noche según la modalidad elegida",
                    "Recorrido acompañado en todo momento por guías capacitados",
                    "Una salida pensada para quienes buscan algo distinto a una caminata común"
                ]
            },
            {
                titulo: "Incluido en tu reserva",
                items: [
                    "Transporte de ida y vuelta desde el punto de salida",
                    "Acompañamiento de guía (español / inglés / portugués) durante toda la ruta",
                    "Recogida en el punto acordado",
                    "Snacks, disponibles solo si reservas la modalidad privada",
                    "Posibilidad de rentar equipo (carpa, saco de dormir, bastones, linterna) mediante costo adicional"
                ]
            },
            {
                titulo: "Por tu cuenta",
                items: [
                    "Pago de ingreso al volcán: Q50 residentes / Q100 visitantes extranjeros",
                    "Hidratación (agua) para todo el trayecto",
                    "Comidas principales — el servicio cubre únicamente snacks, y solo en tour privado",
                    "Equipo propio de montaña, salvo que decidas alquilarlo con nosotros"
                ]
            },
            {
                titulo: "Restricciones de participación",
                items: [
                    "Edad mínima: 15 años",
                    "No recomendado en embarazo",
                    "No recomendado con limitaciones de movilidad",
                    "No recomendado con antecedentes cardíacos",
                    "Se requiere condición física razonable"
                ]
            },
            {
                titulo: "Recomendaciones para empacar",
                items: [
                    "Capas de ropa térmica",
                    "Botas o zapatos para terreno irregular",
                    "Bastones de apoyo (rentables con nosotros)",
                    "Linterna de cabeza o de mano",
                    "Gorro y guantes",
                    "Bloqueador solar y lentes oscuros",
                    "Algo extra de comida y agua (2-3 litros sugeridos por persona)",
                    "Artículos básicos de aseo"
                ]
            },
            {
                titulo: "Antes de subir",
                items: [
                    "El sendero incluye tramos exigentes; conviene llegar con condición física adecuada.",
                    "Por las noches la temperatura baja considerablemente, así que el abrigo no es opcional.",
                    "Se aconseja llevar algo de comer extra, ya que el recorrido consume bastante energía.",
                    "Si necesitas equipo prestado, avísanos con anticipación al reservar."
                ]
            }
        ],

        // --- RESEÑAS ---
        // NUEVO: 3 reseñas de relleno solo para ver cómo se ve el diseño.
        // Reemplázalas por las reseñas reales cuando las tengas (y actualiza
        // "calificacion" y "numeroResenas" arriba). Cada visitante que escriba
        // una reseña desde la página se guarda aparte, en su navegador.
        resenas: [
            {
                nombre: "María Xicará",
                fecha: "20 de septiembre de 2026",
                calificacion: 5,
                texto: "Una experiencia increíble, ver las erupciones desde tan cerca no tiene comparación. El guía fue muy atento durante toda la subida y bajada."
            },
            {
                nombre: "Carlos Pérez",
                fecha: "14 de septiembre de 2026",
                calificacion: 4,
                texto: "El ascenso es exigente pero vale totalmente la pena. Recomiendo llevar ropa bien abrigada porque en la cumbre hace bastante frío."
            },
            {
                nombre: "Andrea López",
                fecha: "6 de septiembre de 2026",
                calificacion: 5,
                texto: "Todo muy bien organizado desde la salida hasta el regreso. El transporte llegó puntual y el grupo se sintió acompañado en todo momento."
            }
        ],

        // --- GALERÍA DE FOTOS ---
        fotos: [
            "img/fuego.webp",
            "img/fuego1.webp",   // TODO
            "img/fuego2.webp",   // TODO
            "img/fuego3.webp",   // TODO
            "img/fuego4.webp",   // TODO
            "img/fuego-6.webp",   // TODO
            "img/fuego-7.webp",   // TODO
            "img/fuego-8.webp",   // TODO
            "img/fuego-9.webp",   // TODO
            "img/fuego-10.webp"   // TODO
        ],

        // --- PRECIOS (RESPALDO) ---
        // Ahora cada modalidad tiene sus propios precios (ver más abajo).
        // Este bloque solo se usa si una modalidad no define los suyos.
        precios: {
            individual: {
                "Russ Mall": 400,
                "Interplaza Chimaltenango": 400,
                "Antigua Guatemala": 400,
                "La Soledad (faldas del volcán)": 400
            },
            grupo: {
                "Russ Mall": 300,
                "Interplaza Chimaltenango": 270,
                "Antigua Guatemala": 300,
                "La Soledad (faldas del volcán)": 230
            }
        },

        // --- MODALIDADES ---
        // Cada modalidad tiene su propio bloque "precios" con 3 tipos:
        //   individual = tour privado, 1 persona
        //   grupo      = tour privado, precio por persona si van 2+
        //   grupal     = salida colectiva en bus con fecha fija (por persona)
        modalidadPorDefecto: "amanecer",
        modalidades: {

            amanecer: {
                nombre: "Amanecer (ascenso nocturno)",
                duracionDias: 2,
                duracionTexto: "dos días y una noche", // NUEVO — texto para el ícono de duración
                horasCaminata: "10 horas",                    // NUEVO
                desnivel: "1575m",                         // NUEVO
                // NUEVO — fechas de salida colectiva con fecha fija (bus). Tú las administras a mano.
                // Fecha de prueba: último fin de semana de septiembre 2026.
                fechasGrupales: [
       { fecha: "2026-10-17", cupos: 12 }, ],
                precios: {
                    individual: {
                        "Russ Mall": 400,
                        "Interplaza Chimaltenango": 400,
                        "Antigua Guatemala": 400,
                        "La Soledad (faldas del volcán)": 400
                    },
                    grupo: {
                        "Russ Mall": 300,
                        "Interplaza Chimaltenango": 270,
                        "Antigua Guatemala": 300,
                        "La Soledad (faldas del volcán)": 230
                    },
                    grupal: { // TODO: pon tus precios reales de salida en bus
                        "Russ Mall": 200,
                        "Interplaza Chimaltenango": 180,
                        "Antigua Guatemala": 200,
                        "La Soledad (faldas del volcán)": 160
                    }
                },
                itinerario: [
                    {
                        dia: 1,
                        titulo: "Ascenso nocturno",
                        eventos: [
                            { hora: "6:00 pm", lugar: "Russ Mall", descripcion: "Salida desde el centro comercial Russ Mall, Calzada Roosevelt." },
                            { hora: "7:30 pm", lugar: "Antigua Guatemala", descripcion: "Punto de paso por Antigua Guatemala" },
                            { hora: "8:30 pm", lugar: "Interplaza Chimaltenango", descripcion: "Punto de paso por Interplaza Chimaltenango" },
                            { hora: "9:30 pm", lugar: "Faldas del volcán: Aldea La Soledad", descripcion: "Llegada a las faldas del volcán." },
                            { hora: "9:45 pm", lugar: "Inicio del ascenso", descripcion: "Comienza la caminata guiada hacia la cumbre." }
                        ]
                    },
                    {
                        dia: 2,
                        titulo: "Amanecer en la cumbre y descenso",
                        eventos: [
                            { hora: "5:30 am", lugar: "Cumbre", descripcion: "Llegada a la cumbre — momento para contemplar el amanecer y las erupciones." },
                            { hora: "7:30 am", lugar: "Descenso", descripcion: "Inicio del descenso. La hora de llegada depende del paso del grupo o de la persona, y puedes bajarte en Antigua Guatemala, Interplaza, Russ Mall o cualquier punto del camino de regreso." }
                        ]
                    }
                ]
            },

            atardecer: {
                nombre: "Atardecer",
                duracionDias: 1,
                duracionTexto: "1 día y 1 noche",  // NUEVO
                horasCaminata: "10 horas",  // NUEVO
                desnivel: "1575m",       // NUEVO
                fechasGrupales: [],     // NUEVO
                precios: { // TODO: ajusta a los precios reales del atardecer
                    individual: {
                        "Russ Mall": 400,
                        "Interplaza Chimaltenango": 400,
                        "Antigua Guatemala": 400,
                        "La Soledad (faldas del volcán)": 400
                    },
                    grupo: {
                        "Russ Mall": 300,
                        "Interplaza Chimaltenango": 270,
                        "Antigua Guatemala": 300,
                        "La Soledad (faldas del volcán)": 230
                    },
                    grupal: {
                        "Russ Mall": 200,
                        "Interplaza Chimaltenango": 180,
                        "Antigua Guatemala": 200,
                        "La Soledad (faldas del volcán)": 160
                    }
                },
                itinerario: [
                    {
                        dia: 1,
                        titulo: "Ascenso y Atardecer",
                        eventos: [
                            { hora: "6:00 am", lugar: "Russ Mall", descripcion: "Salida desde el centro comercial Russ Mall, Calzada Roosevelt." },
                            { hora: "7:00 am", lugar: "Antigua Guatemala", descripcion: "Punto de paso por Antigua Guatemala" },
                            { hora: "8:00 am", lugar: "Interplaza Chimaltenango", descripcion: "Punto de paso por Interplaza Chimaltenango" },
                            { hora: "8:45 am", lugar: "Faldas del volcán: Aldea La Soledad", descripcion: "Llegada a las faldas del volcán." },
                            { hora: "9:00 am", lugar: "Inicio del ascenso", descripcion: "Comienza la caminata guiada hacia la cumbre." },
                            { hora: "4:30 pm", lugar: "Llegada a la cumbre", descripcion: "Llegada a la cumbre — momento para contemplar el atardecer y las erupciones." },
                            { hora: "6:00 pm", lugar: "Descenso", descripcion: "Inicio del descenso. La hora de llegada depende del paso del grupo o de la persona, y puedes bajarte en Antigua Guatemala, Interplaza, Russ Mall o cualquier punto del camino de regreso." }
                        ]
                    }
                ]
            },

            Camping: {
                nombre: "Atardecer y Camping",
                duracionDias: 2,
                duracionTexto: "dos días y una noche",  // NUEVO
                horasCaminata: "13 horas",  // NUEVO
                desnivel: "1575m",       // NUEVO
                fechasGrupales: [],     // NUEVO
                precios: { // TODO: ajusta a los precios reales del camping
                    individual: {
                        "Russ Mall": 500,
                        "Interplaza Chimaltenango": 500,
                        "Antigua Guatemala": 500,
                        "La Soledad (faldas del volcán)": 500
                    },
                    grupo: {
                        "Russ Mall": 400,
                        "Interplaza Chimaltenango": 400,
                        "Antigua Guatemala": 400,
                        "La Soledad (faldas del volcán)": 400
                    },
                    grupal: {
                        "Russ Mall": 300,
                        "Interplaza Chimaltenango": 280,
                        "Antigua Guatemala": 300,
                        "La Soledad (faldas del volcán)": 260
                    }
                },
                itinerario: [
                    {
                        dia: 1,
                        titulo: "Ascenso y Atardecer",
                        eventos: [
                            { hora: "6:00 am", lugar: "Russ Mall", descripcion: "Salida desde el centro comercial Russ Mall, Calzada Roosevelt." },
                            { hora: "7:00 am", lugar: "Antigua Guatemala", descripcion: "Punto de paso por Antigua Guatemala" },
                            { hora: "8:00 am", lugar: "Interplaza Chimaltenango", descripcion: "Punto de paso por Interplaza Chimaltenango" },
                            { hora: "8:45 am", lugar: "Faldas del volcán: Aldea La Soledad", descripcion: "Llegada a las faldas del volcán." },
                            { hora: "9:00 am", lugar: "Inicio del ascenso", descripcion: "Comienza la caminata guiada hacia la cumbre." },
                            { hora: "4:00 pm", lugar: "Llegada a la zona de Camping", descripcion: "Llegada a la orqueta y armamento de tiendas de acampar" },
                            { hora: "4:30 pm", lugar: "Ascenso al Camellon", descripcion: "Inicio del ascenso al camellón principal, apreciación del atardecer y erupciones" },
                            { hora: "6:00 pm", lugar: "Descenso a la zona de camping", descripcion: "Descenso a la Orqueta para acampar" }
                        ]
                    },
                    {
                        dia: 2,
                        titulo: "Descenso (con opción de extender el tour)",
                        eventos: [
                            { hora: "7:00 am", lugar: "Levantamiento del Campamento", descripcion: "Desayuno y recogida del campamento. Cada persona levanta su tienda y empaca sus cosas para que podamos iniciar el descenso a tiempo." },
                            { hora: "7:30 am", lugar: "Descenso o Cumbre de Acatenango", descripcion: "Inicio del descenso. La hora de llegada depende del paso del grupo o de la persona, y puedes bajarte en Antigua Guatemala, Interplaza, Russ Mall o cualquier punto del camino de regreso. Quienes deseen pueden extender el tour y subir a la cumbre del Acatenango. Es una caminata adicional y exigente, sujeta a la condición física de cada persona, al clima y a la decisión del guía. Tiene un costo extra de Q100 pp." }
                        ]
                    }
                ]
            }
        }
    },

    // ==========================================
    // RESTO DE VOLCANES (fichas completas, mismo formato del Fuego)
    // Todo lo marcado TODO (precios, calificación, fotos) es relleno
    // para que la página funcione: reemplázalo por los datos reales.
    // ==========================================
    {
        id: "acatenango",
        nombre: "Volcán Acatenango",
        region: "Chimaltenango / Sacatepéquez",
        categoria: "volcanes",
        calificacion: 4.9,
        numeroResenas: 0, // TODO: cuando tengas reseñas reales, actualiza este número
        imagen: "img/acatenango.webp",

        descripcion: "El Volcán Acatenango es un estratovolcán activo ubicado entre Chimaltenango y Sacatepéquez, a un lado de Antigua Guatemala. Con una altitud de 3,976 metros sobre el nivel del mar, es famoso por ser el mejor mirador del Volcán de Fuego: desde su cumbre y su zona de camping se observan sus erupciones de frente, de día y de noche. El ascenso atraviesa fincas de cultivo, bosque de pino y vegetación de altura hasta una cumbre de ceniza volcánica, y recompensa con vistas amplias del altiplano y, con buen clima, un amanecer sobre el mar de nubes.",

        // --- REQUISITOS Y NIVEL ---
        edadMinima: 15,
        condicionSalud: "Buena condición de salud",
        exigencia: 7, // escala del 1 al 10

        // --- POLÍTICAS ---
        reservaMinima: "El tour se confirma con un mínimo del 50% de la reserva completa.",
        cancelacion: "Cancelación gratuita si se cancela con 48 horas de antelación.",

        responsable: "Bajamos toda nuestra basura, cuidamos el sendero y trabajamos con guías locales.", // TODO: ajusta el texto si quieres

        // --- SERVICIO ---
        guiaIdiomas: ["Español", "Inglés", "Portugués", "Lenguaje de Señas"],
        servicioRecogida: true,

        // --- QUÉ INCLUYE / QUÉ NO ---
        incluye: [
            "Transporte redondo",
            "Snacks",
            "Guía bilingüe (español / inglés)",
            "Servicio de recogida"
        ],
        incluyeOpcional: [
            "Alquiler de equipo (carpa, saco de dormir, bastones)" // costo adicional
        ],
        noIncluye: [
            "Entrada al volcán (Q100 / $13)",
            "Agua"
        ],

        // --- QUÉ DEBE LLEVAR EL CLIENTE ---
        queLlevar: [
            "Ropa abrigada por capas",
            "Calzado de trekking / senderismo",
            "Bastones de senderismo (si no los alquilas con nosotros)",
            "Linterna frontal o de mano",
            "Guantes y gorro",
            "Su equipo personal en general"
        ],

        // --- BLOQUES DE INFORMACIÓN ---
        infoBloques: [
            {
                titulo: "La experiencia",
                items: [
                    "Sube al Volcán Acatenango (3,976 m), el mejor mirador del Volcán de Fuego",
                    "Observa sus erupciones de frente, de día o de noche según la modalidad elegida",
                    "Con la modalidad de camping, duerme en la montaña y vive el atardecer y el amanecer en la altura",
                    "Recorrido acompañado en todo momento por guías capacitados"
                ]
            },
            {
                titulo: "Incluido en tu reserva",
                items: [
                    "Transporte de ida y vuelta desde el punto de salida",
                    "Acompañamiento de guía (español / inglés / portugués) durante toda la ruta",
                    "Recogida en el punto acordado",
                    "Snacks, disponibles solo si reservas la modalidad privada",
                    "Posibilidad de rentar equipo (carpa, saco de dormir, bastones, linterna) mediante costo adicional"
                ]
            },
            {
                titulo: "Por tu cuenta",
                items: [
                    "Pago de ingreso al volcán: Q50 residentes / Q100 visitantes extranjeros",
                    "Hidratación (agua) para todo el trayecto",
                    "Comidas principales — el servicio cubre únicamente snacks, y solo en tour privado",
                    "Equipo propio de montaña, salvo que decidas alquilarlo con nosotros"
                ]
            },
            {
                titulo: "Restricciones de participación",
                items: [
                    "Edad mínima: 15 años",
                    "No recomendado en embarazo",
                    "No recomendado con limitaciones de movilidad",
                    "No recomendado con antecedentes cardíacos",
                    "Se requiere condición física razonable"
                ]
            },
            {
                titulo: "Recomendaciones para empacar",
                items: [
                    "Capas de ropa térmica",
                    "Botas o zapatos para terreno irregular",
                    "Bastones de apoyo (rentables con nosotros)",
                    "Linterna de cabeza o de mano",
                    "Gorro y guantes",
                    "Bloqueador solar y lentes oscuros",
                    "Algo extra de comida y agua (2-3 litros sugeridos por persona)",
                    "Artículos básicos de aseo"
                ]
            },
            {
                titulo: "Antes de subir",
                items: [
                    "El sendero incluye tramos exigentes; conviene llegar con condición física adecuada.",
                    "Por las noches la temperatura baja considerablemente, así que el abrigo no es opcional.",
                    "Se aconseja llevar algo de comer extra, ya que el recorrido consume bastante energía.",
                    "Si necesitas equipo prestado, avísanos con anticipación al reservar."
                ]
            }
        ],

        // --- RESEÑAS ---
        // Vacío hasta que tengas reseñas reales (la página muestra "Aún no hay reseñas").
        resenas: [],

        // --- GALERÍA DE FOTOS ---
        fotos: [
            "img/acatenango.webp"
            // TODO: agrega más fotos, por ejemplo "img/acatenango1.webp", "img/acatenango2.webp"... (separadas por coma)
        ],

        // --- PRECIOS (RESPALDO) ---
        precios: { // TODO: precios de relleno (copiados del Fuego), pon los reales
            individual: {
                "Russ Mall": 400,
                "Antigua Guatemala": 400,
                "Interplaza Chimaltenango": 400,
                "La Soledad (faldas del volcán)": 400
            },
            grupo: {
                "Russ Mall": 300,
                "Antigua Guatemala": 300,
                "Interplaza Chimaltenango": 270,
                "La Soledad (faldas del volcán)": 230
            }
        },

        // --- MODALIDADES ---
        modalidadPorDefecto: "amanecer",
        modalidades: {
            amanecer: {
                nombre: "Amanecer (ascenso nocturno)",
                duracionDias: 2,
                duracionTexto: "dos días y una noche",
                horasCaminata: "8 horas",
                desnivel: "1075m",
                fechasGrupales: [],
                precios: { // TODO: precios de relleno (copiados del Fuego), pon los reales
                    individual: {
                        "Russ Mall": 400,
                        "Antigua Guatemala": 400,
                        "Interplaza Chimaltenango": 400,
                        "La Soledad (faldas del volcán)": 400
                    },
                    grupo: {
                        "Russ Mall": 300,
                        "Antigua Guatemala": 300,
                        "Interplaza Chimaltenango": 270,
                        "La Soledad (faldas del volcán)": 230
                    },
                    grupal: {
                        "Russ Mall": 200,
                        "Antigua Guatemala": 200,
                        "Interplaza Chimaltenango": 180,
                        "La Soledad (faldas del volcán)": 160
                    }
                },
                itinerario: [
                    {
                        dia: 1,
                        titulo: "Traslado y ascenso nocturno",
                        eventos: [
                            { hora: "6:00 pm", lugar: "Russ Mall", descripcion: "Salida desde el centro comercial Russ Mall, Calzada Roosevelt." },
                            { hora: "7:30 pm", lugar: "Antigua Guatemala", descripcion: "Punto de paso por Antigua Guatemala" },
                            { hora: "8:30 pm", lugar: "Interplaza Chimaltenango", descripcion: "Punto de paso por Interplaza Chimaltenango" },
                            { hora: "9:30 pm", lugar: "Faldas del volcán: Aldea La Soledad", descripcion: "Llegada a las faldas del volcán." },
                            { hora: "10:00 pm", lugar: "Inicio del ascenso", descripcion: "Comienza la caminata guiada hacia la cumbre." }
                        ]
                    },
                    {
                        dia: 2,
                        titulo: "Amanecer en la cumbre y descenso",
                        eventos: [
                            { hora: "5:30 am", lugar: "Cumbre", descripcion: "Llegada a la cumbre — momento para contemplar el amanecer y las erupciones." },
                            { hora: "7:30 am", lugar: "Descenso", descripcion: "Inicio del descenso. La hora de llegada depende del paso del grupo o de la persona, y puedes bajarte en Antigua Guatemala, Interplaza Chimaltenango, Russ Mall o cualquier punto del camino de regreso." }
                        ]
                    }
                ]
            },

            atardecer: {
                nombre: "Atardecer",
                duracionDias: 1,
                duracionTexto: "1 día",
                horasCaminata: "8 horas",
                desnivel: "1075m",
                fechasGrupales: [],
                precios: { // TODO: precios de relleno (copiados del Fuego), pon los reales
                    individual: {
                        "Russ Mall": 400,
                        "Antigua Guatemala": 400,
                        "Interplaza Chimaltenango": 400,
                        "La Soledad (faldas del volcán)": 400
                    },
                    grupo: {
                        "Russ Mall": 300,
                        "Antigua Guatemala": 300,
                        "Interplaza Chimaltenango": 270,
                        "La Soledad (faldas del volcán)": 230
                    },
                    grupal: {
                        "Russ Mall": 200,
                        "Antigua Guatemala": 200,
                        "Interplaza Chimaltenango": 180,
                        "La Soledad (faldas del volcán)": 160
                    }
                },
                itinerario: [
                    {
                        dia: 1,
                        titulo: "Ascenso y Atardecer",
                        eventos: [
                            { hora: "6:00 am", lugar: "Russ Mall", descripcion: "Salida desde el centro comercial Russ Mall, Calzada Roosevelt." },
                            { hora: "7:00 am", lugar: "Antigua Guatemala", descripcion: "Punto de paso por Antigua Guatemala" },
                            { hora: "8:00 am", lugar: "Interplaza Chimaltenango", descripcion: "Punto de paso por Interplaza Chimaltenango" },
                            { hora: "8:45 am", lugar: "Faldas del volcán: Aldea La Soledad", descripcion: "Llegada a las faldas del volcán." },
                            { hora: "9:00 am", lugar: "Inicio del ascenso", descripcion: "Comienza la caminata guiada hacia la cumbre." },
                            { hora: "4:30 pm", lugar: "Cumbre", descripcion: "Llegada a la cumbre — momento para contemplar el atardecer y las erupciones del Volcán de Fuego." },
                            { hora: "6:00 pm", lugar: "Descenso", descripcion: "Inicio del descenso. La hora de llegada depende del paso del grupo o de la persona, y puedes bajarte en Antigua Guatemala, Interplaza Chimaltenango, Russ Mall o cualquier punto del camino de regreso." }
                        ]
                    }
                ]
            },

            camping: {
                nombre: "Atardecer y Camping",
                duracionDias: 2,
                duracionTexto: "dos días y una noche",
                horasCaminata: "8 horas",
                desnivel: "1075m",
                fechasGrupales: [],
                precios: { // TODO: precios de relleno (copiados del Fuego), pon los reales
                    individual: {
                        "Russ Mall": 500,
                        "Antigua Guatemala": 500,
                        "Interplaza Chimaltenango": 500,
                        "La Soledad (faldas del volcán)": 500
                    },
                    grupo: {
                        "Russ Mall": 400,
                        "Antigua Guatemala": 400,
                        "Interplaza Chimaltenango": 400,
                        "La Soledad (faldas del volcán)": 400
                    },
                    grupal: {
                        "Russ Mall": 300,
                        "Antigua Guatemala": 300,
                        "Interplaza Chimaltenango": 280,
                        "La Soledad (faldas del volcán)": 260
                    }
                },
                itinerario: [
                    {
                        dia: 1,
                        titulo: "Ascenso y Atardecer",
                        eventos: [
                            { hora: "6:00 am", lugar: "Russ Mall", descripcion: "Salida desde el centro comercial Russ Mall, Calzada Roosevelt." },
                            { hora: "7:00 am", lugar: "Antigua Guatemala", descripcion: "Punto de paso por Antigua Guatemala" },
                            { hora: "8:00 am", lugar: "Interplaza Chimaltenango", descripcion: "Punto de paso por Interplaza Chimaltenango" },
                            { hora: "8:45 am", lugar: "Faldas del volcán: Aldea La Soledad", descripcion: "Llegada a las faldas del volcán." },
                            { hora: "9:00 am", lugar: "Inicio del ascenso", descripcion: "Comienza la caminata guiada hacia la cumbre." },
                            { hora: "4:00 pm", lugar: "Llegada a la zona de camping", descripcion: "Llegada y armado de tiendas de acampar." },
                            { hora: "4:30 pm", lugar: "Ascenso a la cumbre", descripcion: "Inicio del ascenso a la cumbre principal, apreciación del atardecer y de las erupciones del Volcán de Fuego." },
                            { hora: "6:00 pm", lugar: "Descenso a la zona de camping", descripcion: "Descenso para acampar." }
                        ]
                    },
                    {
                        dia: 2,
                        titulo: "Descenso",
                        eventos: [
                            { hora: "7:00 am", lugar: "Levantamiento del campamento", descripcion: "Desayuno y recogida del campamento. Cada persona levanta su tienda y empaca sus cosas para que podamos iniciar el descenso a tiempo." },
                            { hora: "7:30 am", lugar: "Descenso", descripcion: "Inicio del descenso. La hora de llegada depende del paso del grupo o de la persona, y puedes bajarte en Antigua Guatemala, Interplaza Chimaltenango, Russ Mall o cualquier punto del camino de regreso." }
                        ]
                    }
                ]
            }
        }
    },

    {
        id: "pacaya",
        nombre: "Volcán de Pacaya",
        region: "Escuintla / Guatemala",
        categoria: "volcanes",
        calificacion: 4.7,
        numeroResenas: 0, // TODO: cuando tengas reseñas reales, actualiza este número
        imagen: "img/pacaya.webp",

        descripcion: "El Volcán de Pacaya es uno de los volcanes activos más fascinantes y accesibles de Guatemala, ubicado entre los departamentos de Escuintla y Guatemala. Con una altitud de 2,552 metros sobre el nivel del mar, es famoso por ofrecer una experiencia única de contacto cercano con campos de lava petrificada y paisajes lunares. El ascenso desde la aldea San Francisco de Sales o San Vicente Pacaya es corto y accesible, atravesando senderos de arena volcánica y vegetación baja hasta llegar a la meseta del cráter activo Mackenney, donde los visitantes disfrutan de vistas impresionantes y la tradicional experiencia de asar malvaviscos con el calor de las rocas volcánicas.",

        // --- REQUISITOS Y NIVEL ---
        edadMinima: 15,
        condicionSalud: "Buena condición de salud",
        exigencia: 3, // escala del 1 al 10

        // --- POLÍTICAS ---
        reservaMinima: "El tour se confirma con un mínimo del 50% de la reserva completa.",
        cancelacion: "Cancelación gratuita si se cancela con 48 horas de antelación.",

        responsable: "Bajamos toda nuestra basura, cuidamos el sendero y trabajamos con guías locales.", // TODO: ajusta el texto si quieres

        // --- SERVICIO ---
        guiaIdiomas: ["Español", "Inglés", "Portugués", "Lenguaje de Señas"],
        servicioRecogida: true,

        // --- QUÉ INCLUYE / QUÉ NO ---
        incluye: [
            "Transporte redondo",
            "Snacks",
            "Guía bilingüe (español / inglés)",
            "Servicio de recogida"
        ],
        incluyeOpcional: [
            "Alquiler de equipo (carpa, saco de dormir, bastones)" // costo adicional
        ],
        noIncluye: [
            "Entrada al volcán (Q100 / $13)",
            "Agua"
        ],

        // --- QUÉ DEBE LLEVAR EL CLIENTE ---
        queLlevar: [
            "Ropa abrigada por capas",
            "Calzado de trekking / senderismo",
            "Bastones de senderismo (si no los alquilas con nosotros)",
            "Linterna frontal o de mano",
            "Guantes y gorro",
            "Su equipo personal en general"
        ],

        // --- BLOQUES DE INFORMACIÓN ---
        infoBloques: [
            {
                titulo: "La experiencia",
                items: [
                    "Asciende al Volcán de Pacaya (2,552 m), uno de los volcanes activos más accesibles del país",
                    "Camina sobre campos de lava petrificada y paisajes lunares",
                    "Llega a la meseta del cráter Mackenney y asa malvaviscos con el calor de las rocas volcánicas",
                    "Recorrido acompañado en todo momento por guías capacitados"
                ]
            },
            {
                titulo: "Incluido en tu reserva",
                items: [
                    "Transporte de ida y vuelta desde el punto de salida",
                    "Acompañamiento de guía (español / inglés / portugués) durante toda la ruta",
                    "Recogida en el punto acordado",
                    "Snacks, disponibles solo si reservas la modalidad privada",
                    "Posibilidad de rentar equipo (carpa, saco de dormir, bastones, linterna) mediante costo adicional"
                ]
            },
            {
                titulo: "Por tu cuenta",
                items: [
                    "Pago de ingreso al volcán: Q50 residentes / Q100 visitantes extranjeros",
                    "Hidratación (agua) para todo el trayecto",
                    "Comidas principales — el servicio cubre únicamente snacks, y solo en tour privado",
                    "Equipo propio de montaña, salvo que decidas alquilarlo con nosotros"
                ]
            },
            {
                titulo: "Restricciones de participación",
                items: [
                    "Edad mínima: 15 años",
                    "No recomendado en embarazo",
                    "No recomendado con limitaciones de movilidad",
                    "No recomendado con antecedentes cardíacos",
                    "Se requiere condición física razonable"
                ]
            },
            {
                titulo: "Recomendaciones para empacar",
                items: [
                    "Capas de ropa térmica",
                    "Botas o zapatos para terreno irregular",
                    "Bastones de apoyo (rentables con nosotros)",
                    "Linterna de cabeza o de mano",
                    "Gorro y guantes",
                    "Bloqueador solar y lentes oscuros",
                    "Algo extra de comida y agua (2-3 litros sugeridos por persona)",
                    "Artículos básicos de aseo"
                ]
            },
            {
                titulo: "Antes de subir",
                items: [
                    "El sendero incluye tramos exigentes; conviene llegar con condición física adecuada.",
                    "Por las noches la temperatura baja considerablemente, así que el abrigo no es opcional.",
                    "Se aconseja llevar algo de comer extra, ya que el recorrido consume bastante energía.",
                    "Si necesitas equipo prestado, avísanos con anticipación al reservar."
                ]
            }
        ],

        // --- RESEÑAS ---
        // Vacío hasta que tengas reseñas reales (la página muestra "Aún no hay reseñas").
        resenas: [],

        // --- GALERÍA DE FOTOS ---
        fotos: [
            "img/pacaya.webp"
            // TODO: agrega más fotos, por ejemplo "img/pacaya1.webp", "img/pacaya2.webp"... (separadas por coma)
        ],

        // --- PRECIOS (RESPALDO) ---
        precios: { // TODO: precios de relleno (copiados del Fuego), pon los reales
            individual: {
                "Russ Mall": 400,
                "Antigua Guatemala": 400,
                "San Francisco de Sales (faldas del volcán)": 400
            },
            grupo: {
                "Russ Mall": 300,
                "Antigua Guatemala": 300,
                "San Francisco de Sales (faldas del volcán)": 230
            }
        },

        // --- MODALIDADES ---
        modalidadPorDefecto: "amanecer",
        modalidades: {
            amanecer: {
                nombre: "Amanecer (ascenso nocturno)",
                duracionDias: 2,
                duracionTexto: "dos días y una noche",
                horasCaminata: "1 a 1.5 horas",
                desnivel: "350m",
                fechasGrupales: [
       { fecha: "2026-11-01", cupos: 12 }, ],
                precios: { // TODO: precios de relleno (copiados del Fuego), pon los reales
                    individual: {
                        "Russ Mall": 400,
                        "Antigua Guatemala": 400,
                        "San Francisco de Sales (faldas del volcán)": 400
                    },
                    grupo: {
                        "Russ Mall": 300,
                        "Antigua Guatemala": 300,
                        "San Francisco de Sales (faldas del volcán)": 230
                    },
                    grupal: {
                        "Russ Mall": 200,
                        "Antigua Guatemala": 200,
                        "San Francisco de Sales (faldas del volcán)": 160
                    }
                },
                itinerario: [
                    {
                        dia: 1,
                        titulo: "Traslado y ascenso nocturno",
                        eventos: [
                            { hora: "1:00 am", lugar: "Russ Mall", descripcion: "Salida desde el centro comercial Russ Mall, Calzada Roosevelt." },
                            { hora: "1:45 am", lugar: "Antigua Guatemala", descripcion: "Punto de paso por Antigua Guatemala" },
                            { hora: "2:30 am", lugar: "Faldas del volcán: Aldea San Francisco de Sales", descripcion: "Llegada a las faldas del volcán." },
                            { hora: "3:00 am", lugar: "Inicio del ascenso", descripcion: "Comienza la caminata guiada hacia la meseta y la cumbre." }
                        ]
                    },
                    {
                        dia: 2,
                        titulo: "Amanecer en la cumbre y descenso",
                        eventos: [
                            { hora: "5:00 am", lugar: "Cumbre", descripcion: "Llegada a la meseta y cumbre — momento para contemplar el amanecer y los campos de lava." },
                            { hora: "7:00 am", lugar: "Descenso", descripcion: "Inicio del descenso. La hora de llegada depende del paso del grupo o de la persona, y puedes bajarte en Antigua Guatemala, Russ Mall o cualquier punto del camino de regreso." }
                        ]
                    }
                ]
            },

            atardecer: {
                nombre: "Atardecer",
                duracionDias: 1,
                duracionTexto: "1 día",
                horasCaminata: "1 a 1.5 horas",
                desnivel: "350m",
                fechasGrupales: [],
                precios: { // TODO: precios de relleno (copiados del Fuego), pon los reales
                    individual: {
                        "Russ Mall": 400,
                        "Antigua Guatemala": 400,
                        "San Francisco de Sales (faldas del volcán)": 400
                    },
                    grupo: {
                        "Russ Mall": 300,
                        "Antigua Guatemala": 300,
                        "San Francisco de Sales (faldas del volcán)": 230
                    },
                    grupal: {
                        "Russ Mall": 200,
                        "Antigua Guatemala": 200,
                        "San Francisco de Sales (faldas del volcán)": 160
                    }
                },
                itinerario: [
                    {
                        dia: 1,
                        titulo: "Ascenso y Atardecer",
                        eventos: [
                            { hora: "11:30 am", lugar: "Russ Mall", descripcion: "Salida desde el centro comercial Russ Mall, Calzada Roosevelt." },
                            { hora: "12:15 pm", lugar: "Antigua Guatemala", descripcion: "Punto de paso por Antigua Guatemala" },
                            { hora: "1:30 pm", lugar: "Faldas del volcán: Aldea San Francisco de Sales", descripcion: "Llegada a las faldas del volcán." },
                            { hora: "2:00 pm", lugar: "Inicio del ascenso", descripcion: "Comienza la caminata guiada hacia la meseta y la cumbre." },
                            { hora: "4:30 pm", lugar: "Cumbre", descripcion: "Llegada a la cumbre — momento para contemplar el atardecer y los campos de lava." },
                            { hora: "6:00 pm", lugar: "Descenso", descripcion: "Inicio del descenso. La hora de llegada depende del paso del grupo o de la persona, y puedes bajarte en Antigua Guatemala, Russ Mall o cualquier punto del camino de regreso." }
                        ]
                    }
                ]
            },

            camping: {
                nombre: "Atardecer y Camping",
                duracionDias: 2,
                duracionTexto: "dos días y una noche",
                horasCaminata: "1 a 1.5 horas",
                desnivel: "350m",
                fechasGrupales: [],
                precios: { // TODO: precios de relleno (copiados del Fuego), pon los reales
                    individual: {
                        "Russ Mall": 500,
                        "Antigua Guatemala": 500,
                        "San Francisco de Sales (faldas del volcán)": 500
                    },
                    grupo: {
                        "Russ Mall": 400,
                        "Antigua Guatemala": 400,
                        "San Francisco de Sales (faldas del volcán)": 400
                    },
                    grupal: {
                        "Russ Mall": 300,
                        "Antigua Guatemala": 300,
                        "San Francisco de Sales (faldas del volcán)": 260
                    }
                },
                itinerario: [
                    {
                        dia: 1,
                        titulo: "Traslado, ascenso y atardecer",
                        eventos: [
                            { hora: "11:30 am", lugar: "Russ Mall", descripcion: "Salida desde el centro comercial Russ Mall, Calzada Roosevelt." },
                            { hora: "12:15 pm", lugar: "Antigua Guatemala", descripcion: "Punto de paso por Antigua Guatemala" },
                            { hora: "1:30 pm", lugar: "Faldas del volcán: Aldea San Francisco de Sales", descripcion: "Llegada a las faldas del volcán." },
                            { hora: "2:00 pm", lugar: "Inicio del ascenso", descripcion: "Comienza la caminata guiada hacia la meseta y la cumbre." },
                            { hora: "4:30 pm", lugar: "Llegada a la zona de camping / cumbre", descripcion: "Armado de tiendas y apreciación del atardecer." }
                        ]
                    },
                    {
                        dia: 2,
                        titulo: "Descenso",
                        eventos: [
                            { hora: "5:00 am", lugar: "Cumbre", descripcion: "Apreciación del amanecer desde la cumbre." },
                            { hora: "7:00 am", lugar: "Levantamiento del campamento", descripcion: "Desayuno y recogida del campamento. Cada persona levanta su tienda y empaca sus cosas para que podamos iniciar el descenso a tiempo." },
                            { hora: "7:30 am", lugar: "Descenso", descripcion: "Inicio del descenso. La hora de llegada depende del paso del grupo o de la persona, y puedes bajarte en Antigua Guatemala, Russ Mall o cualquier punto del camino de regreso." }
                        ]
                    }
                ]
            }
        }
    },

    {
        id: "agua",
        nombre: "Volcán de Agua",
        region: "Sacatepéquez / Escuintla / Guatemala",
        categoria: "volcanes",
        calificacion: null, // TODO: cuando tengas reseñas reales, pon la calificación
        numeroResenas: 0, // TODO: cuando tengas reseñas reales, actualiza este número
        imagen: "img/agua.webp",

        descripcion: "El Volcán de Agua, conocido ancestralmente como Hunahpú, es un majestuoso e imponente estratovolcán extinto que domina el paisaje del valle de Panchoy en Sacatepéquez. Con una altitud de 3,760 metros sobre el nivel del mar, su cono casi perfecto se eleva desde Santa María de Jesús. Durante el ascenso, los senderistas recorren senderos rodeados de cultivos agrícolas y bosques húmedos hasta alcanzar su célebre cráter en la cumbre, una planicie circular rodeada de pinos que ofrece vistas espectaculares hacia los volcanes de Fuego y Acatenango, así como a la costa sur y el altiplano guatemalteco.",

        // --- REQUISITOS Y NIVEL ---
        edadMinima: 15,
        condicionSalud: "Buena condición de salud",
        exigencia: 8, // escala del 1 al 10

        // --- POLÍTICAS ---
        reservaMinima: "El tour se confirma con un mínimo del 50% de la reserva completa.",
        cancelacion: "Cancelación gratuita si se cancela con 48 horas de antelación.",

        responsable: "Bajamos toda nuestra basura, cuidamos el sendero y trabajamos con guías locales.", // TODO: ajusta el texto si quieres

        // --- SERVICIO ---
        guiaIdiomas: ["Español", "Inglés", "Portugués", "Lenguaje de Señas"],
        servicioRecogida: true,

        // --- QUÉ INCLUYE / QUÉ NO ---
        incluye: [
            "Transporte redondo",
            "Snacks",
            "Guía bilingüe (español / inglés)",
            "Servicio de recogida"
        ],
        incluyeOpcional: [
            "Alquiler de equipo (carpa, saco de dormir, bastones)" // costo adicional
        ],
        noIncluye: [
            "Entrada al volcán (Q100 / $13)",
            "Agua"
        ],

        // --- QUÉ DEBE LLEVAR EL CLIENTE ---
        queLlevar: [
            "Ropa abrigada por capas",
            "Calzado de trekking / senderismo",
            "Bastones de senderismo (si no los alquilas con nosotros)",
            "Linterna frontal o de mano",
            "Guantes y gorro",
            "Su equipo personal en general"
        ],

        // --- BLOQUES DE INFORMACIÓN ---
        infoBloques: [
            {
                titulo: "La experiencia",
                items: [
                    "Asciende al Volcán de Agua (3,760 m), el Hunahpú ancestral que domina el valle de Panchoy",
                    "Recorre cultivos y bosques húmedos hasta su célebre cráter rodeado de pinos",
                    "Disfruta vistas hacia los volcanes de Fuego y Acatenango, la costa sur y el altiplano",
                    "Recorrido acompañado en todo momento por guías capacitados"
                ]
            },
            {
                titulo: "Incluido en tu reserva",
                items: [
                    "Transporte de ida y vuelta desde el punto de salida",
                    "Acompañamiento de guía (español / inglés / portugués) durante toda la ruta",
                    "Recogida en el punto acordado",
                    "Snacks, disponibles solo si reservas la modalidad privada",
                    "Posibilidad de rentar equipo (carpa, saco de dormir, bastones, linterna) mediante costo adicional"
                ]
            },
            {
                titulo: "Por tu cuenta",
                items: [
                    "Pago de ingreso al volcán: Q50 residentes / Q100 visitantes extranjeros",
                    "Hidratación (agua) para todo el trayecto",
                    "Comidas principales — el servicio cubre únicamente snacks, y solo en tour privado",
                    "Equipo propio de montaña, salvo que decidas alquilarlo con nosotros"
                ]
            },
            {
                titulo: "Restricciones de participación",
                items: [
                    "Edad mínima: 15 años",
                    "No recomendado en embarazo",
                    "No recomendado con limitaciones de movilidad",
                    "No recomendado con antecedentes cardíacos",
                    "Se requiere condición física razonable"
                ]
            },
            {
                titulo: "Recomendaciones para empacar",
                items: [
                    "Capas de ropa térmica",
                    "Botas o zapatos para terreno irregular",
                    "Bastones de apoyo (rentables con nosotros)",
                    "Linterna de cabeza o de mano",
                    "Gorro y guantes",
                    "Bloqueador solar y lentes oscuros",
                    "Algo extra de comida y agua (2-3 litros sugeridos por persona)",
                    "Artículos básicos de aseo"
                ]
            },
            {
                titulo: "Antes de subir",
                items: [
                    "El sendero incluye tramos exigentes; conviene llegar con condición física adecuada.",
                    "Por las noches la temperatura baja considerablemente, así que el abrigo no es opcional.",
                    "Se aconseja llevar algo de comer extra, ya que el recorrido consume bastante energía.",
                    "Si necesitas equipo prestado, avísanos con anticipación al reservar."
                ]
            }
        ],

        // --- RESEÑAS ---
        // Vacío hasta que tengas reseñas reales (la página muestra "Aún no hay reseñas").
        resenas: [],

        // --- GALERÍA DE FOTOS ---
        fotos: [
            "img/agua.webp"
            // TODO: agrega más fotos, por ejemplo "img/agua1.webp", "img/agua2.webp"... (separadas por coma)
        ],

        // --- PRECIOS (RESPALDO) ---
        precios: { // TODO: precios de relleno (copiados del Fuego), pon los reales
            individual: {
                "Russ Mall": 400,
                "Antigua Guatemala": 400,
                "Santa María de Jesús (faldas del volcán)": 400
            },
            grupo: {
                "Russ Mall": 300,
                "Antigua Guatemala": 300,
                "Santa María de Jesús (faldas del volcán)": 230
            }
        },

        // --- MODALIDADES ---
        modalidadPorDefecto: "amanecer",
        modalidades: {
            amanecer: {
                nombre: "Amanecer (ascenso nocturno)",
                duracionDias: 2,
                duracionTexto: "dos días y una noche",
                horasCaminata: "6 horas",
                desnivel: "1200m",
                fechasGrupales: [],
                precios: { // TODO: precios de relleno (copiados del Fuego), pon los reales
                    individual: {
                        "Russ Mall": 400,
                        "Antigua Guatemala": 400,
                        "Santa María de Jesús (faldas del volcán)": 400
                    },
                    grupo: {
                        "Russ Mall": 300,
                        "Antigua Guatemala": 300,
                        "Santa María de Jesús (faldas del volcán)": 230
                    },
                    grupal: {
                        "Russ Mall": 200,
                        "Antigua Guatemala": 200,
                        "Santa María de Jesús (faldas del volcán)": 160
                    }
                },
                itinerario: [
                    {
                        dia: 1,
                        titulo: "Traslado y ascenso nocturno",
                        eventos: [
                            { hora: "8:00 pm", lugar: "Russ Mall", descripcion: "Salida desde el centro comercial Russ Mall, Calzada Roosevelt." },
                            { hora: "9:00 pm", lugar: "Antigua Guatemala", descripcion: "Punto de paso por Antigua Guatemala" },
                            { hora: "9:30 pm", lugar: "Faldas del volcán: Santa María de Jesús", descripcion: "Llegada a las faldas del volcán." },
                            { hora: "10:00 pm", lugar: "Inicio del ascenso", descripcion: "Comienza la caminata guiada hacia la cumbre." }
                        ]
                    },
                    {
                        dia: 2,
                        titulo: "Amanecer en la cumbre y descenso",
                        eventos: [
                            { hora: "5:00 am", lugar: "Cumbre", descripcion: "Llegada al cráter y la cumbre — momento para contemplar el amanecer y las vistas del valle." },
                            { hora: "7:00 am", lugar: "Descenso", descripcion: "Inicio del descenso. La hora de llegada depende del paso del grupo o de la persona, y puedes bajarte en Antigua Guatemala, Russ Mall o cualquier punto del camino de regreso." }
                        ]
                    }
                ]
            },

            atardecer: {
                nombre: "Atardecer",
                duracionDias: 1,
                duracionTexto: "1 día",
                horasCaminata: "6 horas",
                desnivel: "1200m",
                fechasGrupales: [],
                precios: { // TODO: precios de relleno (copiados del Fuego), pon los reales
                    individual: {
                        "Russ Mall": 400,
                        "Antigua Guatemala": 400,
                        "Santa María de Jesús (faldas del volcán)": 400
                    },
                    grupo: {
                        "Russ Mall": 300,
                        "Antigua Guatemala": 300,
                        "Santa María de Jesús (faldas del volcán)": 230
                    },
                    grupal: {
                        "Russ Mall": 200,
                        "Antigua Guatemala": 200,
                        "Santa María de Jesús (faldas del volcán)": 160
                    }
                },
                itinerario: [
                    {
                        dia: 1,
                        titulo: "Ascenso y Atardecer",
                        eventos: [
                            { hora: "7:00 am", lugar: "Russ Mall", descripcion: "Salida desde el centro comercial Russ Mall, Calzada Roosevelt." },
                            { hora: "8:00 am", lugar: "Antigua Guatemala", descripcion: "Punto de paso por Antigua Guatemala" },
                            { hora: "8:30 am", lugar: "Faldas del volcán: Santa María de Jesús", descripcion: "Llegada a las faldas del volcán." },
                            { hora: "9:00 am", lugar: "Inicio del ascenso", descripcion: "Comienza la caminata guiada hacia la cumbre." },
                            { hora: "4:30 pm", lugar: "Cumbre", descripcion: "Llegada a la cumbre — momento para contemplar el atardecer." },
                            { hora: "6:00 pm", lugar: "Descenso", descripcion: "Inicio del descenso. La hora de llegada depende del paso del grupo o de la persona, y puedes bajarte en Antigua Guatemala, Russ Mall o cualquier punto del camino de regreso." }
                        ]
                    }
                ]
            },

            camping: {
                nombre: "Atardecer y Camping",
                duracionDias: 2,
                duracionTexto: "dos días y una noche",
                horasCaminata: "6 horas",
                desnivel: "1200m",
                fechasGrupales: [],
                precios: { // TODO: precios de relleno (copiados del Fuego), pon los reales
                    individual: {
                        "Russ Mall": 500,
                        "Antigua Guatemala": 500,
                        "Santa María de Jesús (faldas del volcán)": 500
                    },
                    grupo: {
                        "Russ Mall": 400,
                        "Antigua Guatemala": 400,
                        "Santa María de Jesús (faldas del volcán)": 400
                    },
                    grupal: {
                        "Russ Mall": 300,
                        "Antigua Guatemala": 300,
                        "Santa María de Jesús (faldas del volcán)": 260
                    }
                },
                itinerario: [
                    {
                        dia: 1,
                        titulo: "Traslado, ascenso y atardecer",
                        eventos: [
                            { hora: "7:00 am", lugar: "Russ Mall", descripcion: "Salida desde el centro comercial Russ Mall, Calzada Roosevelt." },
                            { hora: "8:00 am", lugar: "Antigua Guatemala", descripcion: "Punto de paso por Antigua Guatemala" },
                            { hora: "8:30 am", lugar: "Faldas del volcán: Santa María de Jesús", descripcion: "Llegada a las faldas del volcán." },
                            { hora: "9:00 am", lugar: "Inicio del ascenso", descripcion: "Comienza la caminata guiada hacia la cumbre." },
                            { hora: "4:30 pm", lugar: "Llegada a la zona de camping / cumbre", descripcion: "Armado de tiendas y apreciación del atardecer y vista hacia el Volcán de Fuego." }
                        ]
                    },
                    {
                        dia: 2,
                        titulo: "Descenso",
                        eventos: [
                            { hora: "5:00 am", lugar: "Cumbre", descripcion: "Apreciación del amanecer desde la cumbre." },
                            { hora: "7:00 am", lugar: "Levantamiento del campamento", descripcion: "Desayuno y recogida del campamento. Cada persona levanta su tienda y empaca sus cosas para que podamos iniciar el descenso a tiempo." },
                            { hora: "7:30 am", lugar: "Descenso", descripcion: "Inicio del descenso. La hora de llegada depende del paso del grupo o de la persona, y puedes bajarte en Antigua Guatemala, Russ Mall o cualquier punto del camino de regreso." }
                        ]
                    }
                ]
            }
        }
    },

    {
        id: "santa-maria",
        nombre: "Volcán Santa María",
        region: "Quetzaltenango",
        categoria: "volcanes",
        calificacion: null, // TODO: cuando tengas reseñas reales, pon la calificación
        numeroResenas: 0, // TODO: cuando tengas reseñas reales, actualiza este número
        imagen: "img/santamaria.webp",

        descripcion: "El Volcán Santa María es un impresionante estratovolcán activo situado en el departamento de Quetzaltenango, al occidente de Guatemala. Con una altitud de 3,772 metros sobre el nivel del mar, destaca por su imponente cono simétrico y por albergar en sus faldas al complejo volcánico Santiaguito, uno de los domos de lava más activos del mundo. Durante el ascenso, los senderistas atraviesan frondosos bosques de pino y encino hasta alcanzar una cumbre despejada que ofrece vistas panorámicas espectaculares del altiplano guatemalteco y de las erupciones constantes del Santiaguito desde una posición privilegiada.",

        // --- REQUISITOS Y NIVEL ---
        edadMinima: 15,
        condicionSalud: "Buena condición de salud",
        exigencia: 7, // escala del 1 al 10

        // --- POLÍTICAS ---
        reservaMinima: "El tour se confirma con un mínimo del 50% de la reserva completa.",
        cancelacion: "Cancelación gratuita si se cancela con 48 horas de antelación.",

        responsable: "Bajamos toda nuestra basura, cuidamos el sendero y trabajamos con guías locales.", // TODO: ajusta el texto si quieres

        // --- SERVICIO ---
        guiaIdiomas: ["Español", "Inglés", "Portugués", "Lenguaje de Señas"],
        servicioRecogida: true,

        // --- QUÉ INCLUYE / QUÉ NO ---
        incluye: [
            "Transporte redondo",
            "Snacks",
            "Guía bilingüe (español / inglés)",
            "Servicio de recogida"
        ],
        incluyeOpcional: [
            "Alquiler de equipo (carpa, saco de dormir, bastones)" // costo adicional
        ],
        noIncluye: [
            "Entrada al volcán (Q100 / $13)",
            "Agua"
        ],

        // --- QUÉ DEBE LLEVAR EL CLIENTE ---
        queLlevar: [
            "Ropa abrigada por capas",
            "Calzado de trekking / senderismo",
            "Bastones de senderismo (si no los alquilas con nosotros)",
            "Linterna frontal o de mano",
            "Guantes y gorro",
            "Su equipo personal en general"
        ],

        // --- BLOQUES DE INFORMACIÓN ---
        infoBloques: [
            {
                titulo: "La experiencia",
                items: [
                    "Asciende al Volcán Santa María (3,772 m), un cono activo y simétrico de Quetzaltenango",
                    "Atraviesa bosques de pino y encino hasta una cumbre despejada",
                    "Observa las erupciones constantes del Santiaguito desde una posición privilegiada",
                    "Recorrido acompañado en todo momento por guías capacitados"
                ]
            },
            {
                titulo: "Incluido en tu reserva",
                items: [
                    "Transporte de ida y vuelta desde el punto de salida",
                    "Acompañamiento de guía (español / inglés / portugués) durante toda la ruta",
                    "Recogida en el punto acordado",
                    "Snacks, disponibles solo si reservas la modalidad privada",
                    "Posibilidad de rentar equipo (carpa, saco de dormir, bastones, linterna) mediante costo adicional"
                ]
            },
            {
                titulo: "Por tu cuenta",
                items: [
                    "Hidratación (agua) para todo el trayecto",
                    "Comidas principales — el servicio cubre únicamente snacks, y solo en tour privado",
                    "Equipo propio de montaña, salvo que decidas alquilarlo con nosotros"
                ]
            },
            {
                titulo: "Restricciones de participación",
                items: [
                    "Edad mínima: 15 años",
                    "No recomendado en embarazo",
                    "No recomendado con limitaciones de movilidad",
                    "No recomendado con antecedentes cardíacos",
                    "Se requiere condición física razonable"
                ]
            },
            {
                titulo: "Recomendaciones para empacar",
                items: [
                    "Capas de ropa térmica",
                    "Botas o zapatos para terreno irregular",
                    "Bastones de apoyo (rentables con nosotros)",
                    "Linterna de cabeza o de mano",
                    "Gorro y guantes",
                    "Bloqueador solar y lentes oscuros",
                    "Algo extra de comida y agua (2-3 litros sugeridos por persona)",
                    "Artículos básicos de aseo"
                ]
            },
            {
                titulo: "Antes de subir",
                items: [
                    "El sendero incluye tramos exigentes; conviene llegar con condición física adecuada.",
                    "Por las noches la temperatura baja considerablemente, así que el abrigo no es opcional.",
                    "Se aconseja llevar algo de comer extra, ya que el recorrido consume bastante energía.",
                    "Si necesitas equipo prestado, avísanos con anticipación al reservar."
                ]
            }
        ],

        // --- RESEÑAS ---
        // Vacío hasta que tengas reseñas reales (la página muestra "Aún no hay reseñas").
        resenas: [],

        // --- GALERÍA DE FOTOS ---
        fotos: [
            "img/santamaria.webp"
            // TODO: agrega más fotos, por ejemplo "img/santamaria1.webp", "img/santamaria2.webp"... (separadas por coma)
        ],

        // --- PRECIOS (RESPALDO) ---
        precios: { // TODO: precios de relleno (copiados del Fuego), pon los reales
            individual: {
                "Russ Mall": 400,
                "Interplaza Chimaltenango": 400,
                "Interplaza Xela": 400,
                "Llanos del Pinal (faldas del volcán)": 400
            },
            grupo: {
                "Russ Mall": 300,
                "Interplaza Chimaltenango": 270,
                "Interplaza Xela": 270,
                "Llanos del Pinal (faldas del volcán)": 230
            }
        },

        // --- MODALIDADES ---
        modalidadPorDefecto: "amanecer",
        modalidades: {
            amanecer: {
                nombre: "Amanecer (ascenso nocturno)",
                duracionDias: 2,
                duracionTexto: "dos días y una noche",
                horasCaminata: "5 a 6 horas",
                desnivel: "1250m",
                   fechasGrupales: [
       { fecha: "2026-10-24", cupos: 12 }, ],
                precios: { // TODO: precios de relleno (copiados del Fuego), pon los reales
                    individual: {
                        "Russ Mall": 400,
                        "Interplaza Chimaltenango": 400,
                        "Interplaza Xela": 400,
                        "Llanos del Pinal (faldas del volcán)": 400
                    },
                    grupo: {
                        "Russ Mall": 300,
                        "Interplaza Chimaltenango": 270,
                        "Interplaza Xela": 270,
                        "Llanos del Pinal (faldas del volcán)": 230
                    },
                    grupal: {
                        "Russ Mall": 200,
                        "Interplaza Chimaltenango": 180,
                        "Interplaza Xela": 180,
                        "Llanos del Pinal (faldas del volcán)": 160
                    }
                },
                itinerario: [
                    {
                        dia: 1,
                        titulo: "Traslado y ascenso nocturno",
                        eventos: [
                            { hora: "3:30 pm", lugar: "Russ Mall", descripcion: "Salida desde el centro comercial Russ Mall, Calzada Roosevelt." },
                            { hora: "5:00 pm", lugar: "Interplaza Chimaltenango", descripcion: "Punto de paso por Interplaza Chimaltenango" },
                            { hora: "8:00 pm", lugar: "Interplaza Xela", descripcion: "Punto de paso por Interplaza Xela" },
                            { hora: "8:30 pm", lugar: "Faldas del volcán: Llanos del Pinal", descripcion: "Llegada a las faldas del volcán." },
                            { hora: "9:00 pm", lugar: "Inicio del ascenso", descripcion: "Comienza la caminata guiada hacia la cumbre." }
                        ]
                    },
                    {
                        dia: 2,
                        titulo: "Amanecer en la cumbre y descenso",
                        eventos: [
                            { hora: "5:00 am", lugar: "Cumbre", descripcion: "Llegada a la cumbre — momento para contemplar el amanecer y las erupciones del volcán Santiaguito." },
                            { hora: "7:00 am", lugar: "Descenso", descripcion: "Inicio del descenso. La hora de llegada depende del paso del grupo o de la persona, y puedes bajarte en Interplaza Xela, Interplaza Chimaltenango, Russ Mall o cualquier punto del camino de regreso." }
                        ]
                    }
                ]
            },

            atardecer: {
                nombre: "Atardecer",
                duracionDias: 1,
                duracionTexto: "1 día",
                horasCaminata: "5 a 6 horas",
                desnivel: "1250m",
                fechasGrupales: [],
                precios: { // TODO: precios de relleno (copiados del Fuego), pon los reales
                    individual: {
                        "Russ Mall": 400,
                        "Interplaza Chimaltenango": 400,
                        "Interplaza Xela": 400,
                        "Llanos del Pinal (faldas del volcán)": 400
                    },
                    grupo: {
                        "Russ Mall": 300,
                        "Interplaza Chimaltenango": 270,
                        "Interplaza Xela": 270,
                        "Llanos del Pinal (faldas del volcán)": 230
                    },
                    grupal: {
                        "Russ Mall": 200,
                        "Interplaza Chimaltenango": 180,
                        "Interplaza Xela": 180,
                        "Llanos del Pinal (faldas del volcán)": 160
                    }
                },
                itinerario: [
                    {
                        dia: 1,
                        titulo: "Ascenso y Atardecer",
                        eventos: [
                            { hora: "5:00 am", lugar: "Russ Mall", descripcion: "Salida desde el centro comercial Russ Mall, Calzada Roosevelt." },
                            { hora: "6:30 am", lugar: "Interplaza Chimaltenango", descripcion: "Punto de paso por Interplaza Chimaltenango" },
                            { hora: "9:30 am", lugar: "Interplaza Xela", descripcion: "Punto de paso por Interplaza Xela" },
                            { hora: "10:00 am", lugar: "Faldas del volcán: Llanos del Pinal", descripcion: "Llegada a las faldas del volcán." },
                            { hora: "10:30 am", lugar: "Inicio del ascenso", descripcion: "Comienza la caminata guiada hacia la cumbre." },
                            { hora: "4:30 pm", lugar: "Cumbre", descripcion: "Llegada a la cumbre — momento para contemplar el atardecer y las erupciones del volcán Santiaguito." },
                            { hora: "6:00 pm", lugar: "Descenso", descripcion: "Inicio del descenso. La hora de llegada depende del paso del grupo o de la persona, y puedes bajarte en Interplaza Xela, Interplaza Chimaltenango, Russ Mall o cualquier punto del camino de regreso." }
                        ]
                    }
                ]
            },

            camping: {
                nombre: "Atardecer y Camping",
                duracionDias: 2,
                duracionTexto: "dos días y una noche",
                horasCaminata: "5 a 6 horas",
                desnivel: "1250m",
                fechasGrupales: [],
                precios: { // TODO: precios de relleno (copiados del Fuego), pon los reales
                    individual: {
                        "Russ Mall": 500,
                        "Interplaza Chimaltenango": 500,
                        "Interplaza Xela": 500,
                        "Llanos del Pinal (faldas del volcán)": 500
                    },
                    grupo: {
                        "Russ Mall": 400,
                        "Interplaza Chimaltenango": 400,
                        "Interplaza Xela": 400,
                        "Llanos del Pinal (faldas del volcán)": 400
                    },
                    grupal: {
                        "Russ Mall": 300,
                        "Interplaza Chimaltenango": 280,
                        "Interplaza Xela": 280,
                        "Llanos del Pinal (faldas del volcán)": 260
                    }
                },
                itinerario: [
                    {
                        dia: 1,
                        titulo: "Traslado, ascenso y atardecer",
                        eventos: [
                            { hora: "5:00 am", lugar: "Russ Mall", descripcion: "Salida desde el centro comercial Russ Mall, Calzada Roosevelt." },
                            { hora: "6:30 am", lugar: "Interplaza Chimaltenango", descripcion: "Punto de paso por Interplaza Chimaltenango" },
                            { hora: "9:30 am", lugar: "Interplaza Xela", descripcion: "Punto de paso por Interplaza Xela" },
                            { hora: "10:00 am", lugar: "Faldas del volcán: Llanos del Pinal", descripcion: "Llegada a las faldas del volcán." },
                            { hora: "10:30 am", lugar: "Inicio del ascenso", descripcion: "Comienza la caminata guiada hacia la cumbre." },
                            { hora: "4:30 pm", lugar: "Llegada a la zona de camping / cumbre", descripcion: "Armado de tiendas y apreciación del atardecer y las erupciones del volcán Santiaguito." }
                        ]
                    },
                    {
                        dia: 2,
                        titulo: "Descenso",
                        eventos: [
                            { hora: "5:00 am", lugar: "Cumbre", descripcion: "Apreciación del amanecer desde la cumbre." },
                            { hora: "7:00 am", lugar: "Levantamiento del campamento", descripcion: "Desayuno y recogida del campamento. Cada persona levanta su tienda y empaca sus cosas para que podamos iniciar el descenso a tiempo." },
                            { hora: "7:30 am", lugar: "Descenso", descripcion: "Inicio del descenso. La hora de llegada depende del paso del grupo o de la persona, y puedes bajarte en Interplaza Xela, Interplaza Chimaltenango, Russ Mall o cualquier punto del camino de regreso." }
                        ]
                    }
                ]
            }
        }
    },

    {
        id: "tacana",
        nombre: "Volcán Tacaná",
        region: "San Marcos",
        categoria: "volcanes",
        calificacion: null, // TODO: cuando tengas reseñas reales, pon la calificación
        numeroResenas: 0, // TODO: cuando tengas reseñas reales, actualiza este número
        imagen: "img/tacana.webp",

        descripcion: "El Volcán Tacaná es un imponente estratovolcán activo situado en el departamento de San Marcos, sobre la frontera entre Guatemala y México. Con una altitud de 4,092 metros sobre el nivel del mar, es una de las cumbres más altas del país y representa una expedición larga y exigente, ideal para quienes buscan un reto de verdad. El ascenso atraviesa bosques de altura y paisajes de alta montaña hasta alcanzar una cumbre desde donde se contemplan el altiplano marquense, el volcán Tajumulco y, si el cielo lo permite, el horizonte hacia la costa del Pacífico.",

        // --- REQUISITOS Y NIVEL ---
        edadMinima: 15,
        condicionSalud: "Buena condición de salud",
        exigencia: 6, // escala del 1 al 10

        // --- POLÍTICAS ---
        reservaMinima: "El tour se confirma con un mínimo del 50% de la reserva completa.",
        cancelacion: "Cancelación gratuita si se cancela con 48 horas de antelación.",

        responsable: "Bajamos toda nuestra basura, cuidamos el sendero y trabajamos con guías locales.", // TODO: ajusta el texto si quieres

        // --- SERVICIO ---
        guiaIdiomas: ["Español", "Inglés", "Portugués", "Lenguaje de Señas"],
        servicioRecogida: true,

        // --- QUÉ INCLUYE / QUÉ NO ---
        incluye: [
            "Transporte redondo",
            "Snacks",
            "Guía bilingüe (español / inglés)",
            "Servicio de recogida"
        ],
        incluyeOpcional: [
            "Alquiler de equipo (carpa, saco de dormir, bastones)" // costo adicional
        ],
        noIncluye: [
            "Entrada al volcán (Q100 / $13)",
            "Agua"
        ],

        // --- QUÉ DEBE LLEVAR EL CLIENTE ---
        queLlevar: [
            "Ropa abrigada por capas",
            "Calzado de trekking / senderismo",
            "Bastones de senderismo (si no los alquilas con nosotros)",
            "Linterna frontal o de mano",
            "Guantes y gorro",
            "Su equipo personal en general"
        ],

        // --- BLOQUES DE INFORMACIÓN ---
        infoBloques: [
            {
                titulo: "La experiencia",
                items: [
                    "Asciende al Volcán Tacaná (4,092 m), en la frontera entre Guatemala y México",
                    "Recorre bosques de altura y paisajes de alta montaña rumbo a la cumbre",
                    "Contempla el amanecer o el atardecer desde una de las cumbres más altas del país",
                    "Recorrido acompañado en todo momento por guías capacitados"
                ]
            },
            {
                titulo: "Incluido en tu reserva",
                items: [
                    "Transporte de ida y vuelta desde el punto de salida",
                    "Acompañamiento de guía (español / inglés / portugués) durante toda la ruta",
                    "Recogida en el punto acordado",
                    "Snacks, disponibles solo si reservas la modalidad privada",
                    "Posibilidad de rentar equipo (carpa, saco de dormir, bastones, linterna) mediante costo adicional"
                ]
            },
            {
                titulo: "Por tu cuenta",
                items: [
                    "Pago de ingreso al volcán: Q50 residentes / Q100 visitantes extranjeros",
                    "Hidratación (agua) para todo el trayecto",
                    "Comidas principales — el servicio cubre únicamente snacks, y solo en tour privado",
                    "Equipo propio de montaña, salvo que decidas alquilarlo con nosotros"
                ]
            },
            {
                titulo: "Restricciones de participación",
                items: [
                    "Edad mínima: 15 años",
                    "No recomendado en embarazo",
                    "No recomendado con limitaciones de movilidad",
                    "No recomendado con antecedentes cardíacos",
                    "Se requiere condición física razonable"
                ]
            },
            {
                titulo: "Recomendaciones para empacar",
                items: [
                    "Capas de ropa térmica",
                    "Botas o zapatos para terreno irregular",
                    "Bastones de apoyo (rentables con nosotros)",
                    "Linterna de cabeza o de mano",
                    "Gorro y guantes",
                    "Bloqueador solar y lentes oscuros",
                    "Algo extra de comida y agua (2-3 litros sugeridos por persona)",
                    "Artículos básicos de aseo"
                ]
            },
            {
                titulo: "Antes de subir",
                items: [
                    "El sendero incluye tramos exigentes; conviene llegar con condición física adecuada.",
                    "Por las noches la temperatura baja considerablemente, así que el abrigo no es opcional.",
                    "Se aconseja llevar algo de comer extra, ya que el recorrido consume bastante energía.",
                    "Si necesitas equipo prestado, avísanos con anticipación al reservar."
                ]
            }
        ],

        // --- RESEÑAS ---
        // Vacío hasta que tengas reseñas reales (la página muestra "Aún no hay reseñas").
        resenas: [],

        // --- GALERÍA DE FOTOS ---
        fotos: [
            "img/tacana.webp"
            // TODO: agrega más fotos, por ejemplo "img/tacana1.webp", "img/tacana2.webp"... (separadas por coma)
        ],

        // --- PRECIOS (RESPALDO) ---
        precios: { // TODO: precios de relleno (copiados del Fuego), pon los reales
            individual: {
                "Russ Mall": 400,
                "Interplaza Chimaltenango": 400,
                "Interplaza Xela": 400,
                "Faldas del volcán": 400
            },
            grupo: {
                "Russ Mall": 300,
                "Interplaza Chimaltenango": 270,
                "Interplaza Xela": 270,
                "Faldas del volcán": 230
            }
        },

        // --- MODALIDADES ---
        modalidadPorDefecto: "amanecer",
        modalidades: {
            amanecer: {
                nombre: "Amanecer (ascenso nocturno)",
                duracionDias: 2,
                duracionTexto: "dos días y una noche",
                horasCaminata: "6 a 7 horas",
                desnivel: "1075m",
                fechasGrupales: [],
                precios: { // TODO: precios de relleno (copiados del Fuego), pon los reales
                    individual: {
                        "Russ Mall": 400,
                        "Interplaza Chimaltenango": 400,
                        "Interplaza Xela": 400,
                        "Faldas del volcán": 400
                    },
                    grupo: {
                        "Russ Mall": 300,
                        "Interplaza Chimaltenango": 270,
                        "Interplaza Xela": 270,
                        "Faldas del volcán": 230
                    },
                    grupal: {
                        "Russ Mall": 200,
                        "Interplaza Chimaltenango": 180,
                        "Interplaza Xela": 180,
                        "Faldas del volcán": 160
                    }
                },
                itinerario: [
                    {
                        dia: 1,
                        titulo: "Traslado",
                        eventos: [
                            { hora: "11:00 am", lugar: "Russ Mall", descripcion: "Salida desde el centro comercial Russ Mall, Calzada Roosevelt." },
                            { hora: "12:30 pm", lugar: "Interplaza Chimaltenango", descripcion: "Punto de paso por Interplaza Chimaltenango" },
                            { hora: "3:30 pm", lugar: "Interplaza Xela", descripcion: "Punto de paso por Interplaza Xela" }
                        ]
                    },
                    {
                        dia: 2,
                        titulo: "Ascenso nocturno, amanecer y descenso",
                        eventos: [
                            { hora: "11:30 pm", lugar: "Faldas del volcán", descripcion: "Llegada a las faldas del volcán." },
                            { hora: "12:00 am", lugar: "Inicio del ascenso", descripcion: "Comienza la caminata guiada hacia la cumbre." },
                            { hora: "5:30 am", lugar: "Cumbre", descripcion: "Llegada a la cumbre — momento para contemplar el amanecer." },
                            { hora: "7:30 am", lugar: "Descenso", descripcion: "Inicio del descenso. La hora de llegada depende del paso del grupo o de la persona, y puedes bajarte en Interplaza Xela, Interplaza Chimaltenango, Russ Mall o cualquier punto del camino de regreso." }
                        ]
                    }
                ]
            },

            camping: {
                nombre: "Atardecer y Camping",
                duracionDias: 2,
                duracionTexto: "dos días y dos noches",
                horasCaminata: "6 a 7 horas",
                desnivel: "1075m",
                fechasGrupales: [],
                precios: { // TODO: precios de relleno (copiados del Fuego), pon los reales
                    individual: {
                        "Russ Mall": 500,
                        "Interplaza Chimaltenango": 500,
                        "Interplaza Xela": 500,
                        "Faldas del volcán": 500
                    },
                    grupo: {
                        "Russ Mall": 400,
                        "Interplaza Chimaltenango": 400,
                        "Interplaza Xela": 400,
                        "Faldas del volcán": 400
                    },
                    grupal: {
                        "Russ Mall": 300,
                        "Interplaza Chimaltenango": 280,
                        "Interplaza Xela": 280,
                        "Faldas del volcán": 260
                    }
                },
                itinerario: [
                    {
                        dia: 1,
                        titulo: "Traslado nocturno, ascenso y atardecer",
                        eventos: [
                            { hora: "10:00 pm", lugar: "Russ Mall", descripcion: "Salida nocturna desde el centro comercial Russ Mall, Calzada Roosevelt." },
                            { hora: "11:30 pm", lugar: "Interplaza Chimaltenango", descripcion: "Punto de paso por Interplaza Chimaltenango" },
                            { hora: "2:30 am", lugar: "Interplaza Xela", descripcion: "Punto de paso por Interplaza Xela" },
                            { hora: "10:30 am", lugar: "Faldas del volcán", descripcion: "Llegada a las faldas del volcán." },
                            { hora: "11:00 am", lugar: "Inicio del ascenso", descripcion: "Comienza la caminata guiada hacia la cumbre." },
                            { hora: "5:00 pm", lugar: "Llegada al área del campamento", descripcion: "Llegada a la zona de camping." },
                            { hora: "5:30 pm", lugar: "Llegada a la cumbre", descripcion: "Llegada a la cumbre — momento para contemplar el atardecer." },
                            { hora: "7:00 pm", lugar: "Regreso al área del campamento", descripcion: "Regreso al campamento y armado de tiendas de acampar." }
                        ]
                    },
                    {
                        dia: 2,
                        titulo: "Amanecer en la cumbre y descenso",
                        eventos: [
                            { hora: "4:30 am", lugar: "Ascenso a la cumbre", descripcion: "Ascenso de nuevo a la cumbre para contemplar el amanecer." },
                            { hora: "8:00 am", lugar: "Levantamiento del campamento", descripcion: "Desayuno y recogida del campamento. Cada persona levanta su tienda y empaca sus cosas para que podamos iniciar el descenso a tiempo." },
                            { hora: "8:30 am", lugar: "Descenso", descripcion: "Inicio del descenso. La hora de llegada depende del paso del grupo o de la persona, y puedes bajarte en Interplaza Xela, Interplaza Chimaltenango, Russ Mall o cualquier punto del camino de regreso." }
                        ]
                    }
                ]
            }
        }
    },

    {
        id: "atitlan",
        nombre: "Volcán Atitlán",
        region: "Sololá",
        categoria: "volcanes",
        calificacion: null, // TODO: cuando tengas reseñas reales, pon la calificación
        numeroResenas: 0, // TODO: cuando tengas reseñas reales, actualiza este número
        imagen: "img/atitlan.webp",

        descripcion: "El Volcán Atitlán es un estratovolcán activo situado en el departamento de Sololá, al sur del célebre lago de Atitlán. Con una altitud de 3,537 metros sobre el nivel del mar y un desnivel exigente de más de 2,000 metros desde la base en Santiago Atitlán (o San Lucas Tolimán), representa uno de los ascensos físicos más demandantes del país. A lo largo del trayecto, los senderistas atraviesan densos bosques nubosos y de roble hasta emerger en un cono cimero despejado que brinda panorámicas extraordinarias del lago de Atitlán, los volcanes vecinos Tolimán y San Pedro, e incluso la línea de la costa del Pacífico.",

        // --- REQUISITOS Y NIVEL ---
        edadMinima: 15,
        condicionSalud: "Buena condición de salud",
        exigencia: 8, // escala del 1 al 10

        // --- POLÍTICAS ---
        reservaMinima: "El tour se confirma con un mínimo del 50% de la reserva completa.",
        cancelacion: "Cancelación gratuita si se cancela con 48 horas de antelación.",

        responsable: "Bajamos toda nuestra basura, cuidamos el sendero y trabajamos con guías locales.", // TODO: ajusta el texto si quieres

        // --- SERVICIO ---
        guiaIdiomas: ["Español", "Inglés", "Portugués", "Lenguaje de Señas"],
        servicioRecogida: true,

        // --- QUÉ INCLUYE / QUÉ NO ---
        incluye: [
            "Transporte redondo",
            "Snacks",
            "Guía bilingüe (español / inglés)",
            "Servicio de recogida"
        ],
        incluyeOpcional: [
            "Alquiler de equipo (carpa, saco de dormir, bastones)" // costo adicional
        ],
        noIncluye: [
            "Entrada al volcán (Q100 / $13)",
            "Agua"
        ],

        // --- QUÉ DEBE LLEVAR EL CLIENTE ---
        queLlevar: [
            "Ropa abrigada por capas",
            "Calzado de trekking / senderismo",
            "Bastones de senderismo (si no los alquilas con nosotros)",
            "Linterna frontal o de mano",
            "Guantes y gorro",
            "Su equipo personal en general"
        ],

        // --- BLOQUES DE INFORMACIÓN ---
        infoBloques: [
            {
                titulo: "La experiencia",
                items: [
                    "Asciende al Volcán Atitlán (3,537 m), uno de los ascensos más demandantes del país",
                    "Atraviesa densos bosques nubosos y de roble hasta un cono cimero despejado",
                    "Admira el lago de Atitlán, los volcanes Tolimán y San Pedro y, con buen clima, la costa del Pacífico",
                    "Recorrido acompañado en todo momento por guías capacitados"
                ]
            },
            {
                titulo: "Incluido en tu reserva",
                items: [
                    "Transporte de ida y vuelta desde el punto de salida",
                    "Acompañamiento de guía (español / inglés / portugués) durante toda la ruta",
                    "Recogida en el punto acordado",
                    "Snacks, disponibles solo si reservas la modalidad privada",
                    "Posibilidad de rentar equipo (carpa, saco de dormir, bastones, linterna) mediante costo adicional"
                ]
            },
            {
                titulo: "Por tu cuenta",
                items: [
                    "Pago de ingreso al volcán: Q50 residentes / Q100 visitantes extranjeros",
                    "Hidratación (agua) para todo el trayecto",
                    "Comidas principales — el servicio cubre únicamente snacks, y solo en tour privado",
                    "Equipo propio de montaña, salvo que decidas alquilarlo con nosotros"
                ]
            },
            {
                titulo: "Restricciones de participación",
                items: [
                    "Edad mínima: 15 años",
                    "No recomendado en embarazo",
                    "No recomendado con limitaciones de movilidad",
                    "No recomendado con antecedentes cardíacos",
                    "Se requiere condición física razonable"
                ]
            },
            {
                titulo: "Recomendaciones para empacar",
                items: [
                    "Capas de ropa térmica",
                    "Botas o zapatos para terreno irregular",
                    "Bastones de apoyo (rentables con nosotros)",
                    "Linterna de cabeza o de mano",
                    "Gorro y guantes",
                    "Bloqueador solar y lentes oscuros",
                    "Algo extra de comida y agua (2-3 litros sugeridos por persona)",
                    "Artículos básicos de aseo"
                ]
            },
            {
                titulo: "Antes de subir",
                items: [
                    "El sendero incluye tramos exigentes; conviene llegar con condición física adecuada.",
                    "Por las noches la temperatura baja considerablemente, así que el abrigo no es opcional.",
                    "Se aconseja llevar algo de comer extra, ya que el recorrido consume bastante energía.",
                    "Si necesitas equipo prestado, avísanos con anticipación al reservar."
                ]
            }
        ],

        // --- RESEÑAS ---
        // Vacío hasta que tengas reseñas reales (la página muestra "Aún no hay reseñas").
        resenas: [],

        // --- GALERÍA DE FOTOS ---
        fotos: [
            "img/atitlan.webp"
            // TODO: agrega más fotos, por ejemplo "img/atitlan1.webp", "img/atitlan2.webp"... (separadas por coma)
        ],

        // --- PRECIOS (RESPALDO) ---
        precios: { // TODO: precios de relleno (copiados del Fuego), pon los reales
            individual: {
                "Russ Mall": 400,
                "Interplaza Chimaltenango": 400,
                "Santiago Atitlán / San Lucas Tolimán (faldas del volcán)": 400
            },
            grupo: {
                "Russ Mall": 300,
                "Interplaza Chimaltenango": 270,
                "Santiago Atitlán / San Lucas Tolimán (faldas del volcán)": 230
            }
        },

        // --- MODALIDADES ---
        modalidadPorDefecto: "amanecer",
        modalidades: {
            amanecer: {
                nombre: "Amanecer (ascenso nocturno)",
                duracionDias: 2,
                duracionTexto: "dos días y una noche",
                horasCaminata: "6 a 7 horas",
                desnivel: "2000m",
                fechasGrupales: [
       { fecha: "2026-12-05", cupos: 12 }, ],
                precios: { // TODO: precios de relleno (copiados del Fuego), pon los reales
                    individual: {
                        "Russ Mall": 400,
                        "Interplaza Chimaltenango": 400,
                        "Santiago Atitlán / San Lucas Tolimán (faldas del volcán)": 400
                    },
                    grupo: {
                        "Russ Mall": 300,
                        "Interplaza Chimaltenango": 270,
                        "Santiago Atitlán / San Lucas Tolimán (faldas del volcán)": 230
                    },
                    grupal: {
                        "Russ Mall": 200,
                        "Interplaza Chimaltenango": 180,
                        "Santiago Atitlán / San Lucas Tolimán (faldas del volcán)": 160
                    }
                },
                itinerario: [
                    {
                        dia: 1,
                        titulo: "Traslado y ascenso nocturno",
                        eventos: [
                            { hora: "5:00 pm", lugar: "Russ Mall", descripcion: "Salida desde el centro comercial Russ Mall, Calzada Roosevelt." },
                            { hora: "6:30 pm", lugar: "Interplaza Chimaltenango", descripcion: "Punto de paso por Interplaza Chimaltenango" },
                            { hora: "10:00 pm", lugar: "Faldas del volcán: Santiago Atitlán / San Lucas Tolimán", descripcion: "Llegada a las faldas del volcán." },
                            { hora: "10:30 pm", lugar: "Inicio del ascenso", descripcion: "Comienza la caminata guiada hacia la cumbre." }
                        ]
                    },
                    {
                        dia: 2,
                        titulo: "Amanecer en la cumbre y descenso",
                        eventos: [
                            { hora: "5:00 am", lugar: "Cumbre", descripcion: "Llegada a la cumbre — momento para contemplar el amanecer y la vista sobre el Lago de Atitlán." },
                            { hora: "7:00 am", lugar: "Descenso", descripcion: "Inicio del descenso. La hora de llegada depende del paso del grupo o de la persona, y puedes bajarte en Interplaza Chimaltenango, Russ Mall o cualquier punto del camino de regreso." }
                        ]
                    }
                ]
            },

            atardecer: {
                nombre: "Atardecer",
                duracionDias: 1,
                duracionTexto: "1 día",
                horasCaminata: "6 a 7 horas",
                desnivel: "2000m",
                fechasGrupales: [],
                precios: { // TODO: precios de relleno (copiados del Fuego), pon los reales
                    individual: {
                        "Russ Mall": 400,
                        "Interplaza Chimaltenango": 400,
                        "Santiago Atitlán / San Lucas Tolimán (faldas del volcán)": 400
                    },
                    grupo: {
                        "Russ Mall": 300,
                        "Interplaza Chimaltenango": 270,
                        "Santiago Atitlán / San Lucas Tolimán (faldas del volcán)": 230
                    },
                    grupal: {
                        "Russ Mall": 200,
                        "Interplaza Chimaltenango": 180,
                        "Santiago Atitlán / San Lucas Tolimán (faldas del volcán)": 160
                    }
                },
                itinerario: [
                    {
                        dia: 1,
                        titulo: "Ascenso y Atardecer",
                        eventos: [
                            { hora: "3:00 am", lugar: "Russ Mall", descripcion: "Salida desde el centro comercial Russ Mall, Calzada Roosevelt." },
                            { hora: "4:30 am", lugar: "Interplaza Chimaltenango", descripcion: "Punto de paso por Interplaza Chimaltenango" },
                            { hora: "8:30 am", lugar: "Faldas del volcán: Santiago Atitlán / San Lucas Tolimán", descripcion: "Llegada a las faldas del volcán." },
                            { hora: "9:00 am", lugar: "Inicio del ascenso", descripcion: "Comienza la caminata guiada hacia la cumbre." },
                            { hora: "4:30 pm", lugar: "Cumbre", descripcion: "Llegada a la cumbre — momento para contemplar el atardecer sobre el Lago de Atitlán." },
                            { hora: "6:00 pm", lugar: "Descenso", descripcion: "Inicio del descenso. La hora de llegada depende del paso del grupo o de la persona, y puedes bajarte en Interplaza Chimaltenango, Russ Mall o cualquier punto del camino de regreso." }
                        ]
                    }
                ]
            },

            camping: {
                nombre: "Atardecer y Camping",
                duracionDias: 2,
                duracionTexto: "dos días y una noche",
                horasCaminata: "6 a 7 horas",
                desnivel: "2000m",
                fechasGrupales: [],
                precios: { // TODO: precios de relleno (copiados del Fuego), pon los reales
                    individual: {
                        "Russ Mall": 500,
                        "Interplaza Chimaltenango": 500,
                        "Santiago Atitlán / San Lucas Tolimán (faldas del volcán)": 500
                    },
                    grupo: {
                        "Russ Mall": 400,
                        "Interplaza Chimaltenango": 400,
                        "Santiago Atitlán / San Lucas Tolimán (faldas del volcán)": 400
                    },
                    grupal: {
                        "Russ Mall": 300,
                        "Interplaza Chimaltenango": 280,
                        "Santiago Atitlán / San Lucas Tolimán (faldas del volcán)": 260
                    }
                },
                itinerario: [
                    {
                        dia: 1,
                        titulo: "Traslado, ascenso y atardecer",
                        eventos: [
                            { hora: "3:00 am", lugar: "Russ Mall", descripcion: "Salida desde el centro comercial Russ Mall, Calzada Roosevelt." },
                            { hora: "4:30 am", lugar: "Interplaza Chimaltenango", descripcion: "Punto de paso por Interplaza Chimaltenango" },
                            { hora: "8:30 am", lugar: "Faldas del volcán: Santiago Atitlán / San Lucas Tolimán", descripcion: "Llegada a las faldas del volcán." },
                            { hora: "9:00 am", lugar: "Inicio del ascenso", descripcion: "Comienza la caminata guiada hacia la cumbre." },
                            { hora: "4:30 pm", lugar: "Llegada a la zona de camping / cumbre", descripcion: "Armado de tiendas y apreciación del atardecer sobre el Lago de Atitlán." }
                        ]
                    },
                    {
                        dia: 2,
                        titulo: "Descenso",
                        eventos: [
                            { hora: "5:00 am", lugar: "Cumbre", descripcion: "Apreciación del amanecer desde la cumbre." },
                            { hora: "7:00 am", lugar: "Levantamiento del campamento", descripcion: "Desayuno y recogida del campamento. Cada persona levanta su tienda y empaca sus cosas para que podamos iniciar el descenso a tiempo." },
                            { hora: "7:30 am", lugar: "Descenso", descripcion: "Inicio del descenso. La hora de llegada depende del paso del grupo o de la persona, y puedes bajarte en Interplaza Chimaltenango, Russ Mall o cualquier punto del camino de regreso." }
                        ]
                    }
                ]
            }
        }
    },

    {
        id: "toliman",
        nombre: "Volcán Tolimán",
        region: "Sololá",
        categoria: "volcanes",
        calificacion: null, // TODO: cuando tengas reseñas reales, pon la calificación
        numeroResenas: 0, // TODO: cuando tengas reseñas reales, actualiza este número
        imagen: "img/toliman.webp",

        descripcion: "El Volcán Tolimán es un imponente estratovolcán extinto ubicado en la orilla sur del Lago de Atitlán, en el departamento de Sololá. Con una altitud de 3,158 metros sobre el nivel del mar y un desnivel pronunciado de aproximadamente 1,600 metros desde su base en San Lucas Tolimán o Santiago Atitlán, ofrece una travesía exigente y poco transitada. Su densa cubierta de vegetación y bosque nuboso acompaña al senderista a lo largo de la ruta hasta alcanzar su peculiar cumbre con un cráter elíptico, desde donde se aprecian vistas imponentes hacia el vecino Volcán Atitlán, el Lago de Atitlán y el altiplano occidental.",

        // --- REQUISITOS Y NIVEL ---
        edadMinima: 15,
        condicionSalud: "Buena condición de salud",
        exigencia: 8, // escala del 1 al 10

        // --- POLÍTICAS ---
        reservaMinima: "El tour se confirma con un mínimo del 50% de la reserva completa.",
        cancelacion: "Cancelación gratuita si se cancela con 48 horas de antelación.",

        responsable: "Bajamos toda nuestra basura, cuidamos el sendero y trabajamos con guías locales.", // TODO: ajusta el texto si quieres

        // --- SERVICIO ---
        guiaIdiomas: ["Español", "Inglés", "Portugués", "Lenguaje de Señas"],
        servicioRecogida: true,

        // --- QUÉ INCLUYE / QUÉ NO ---
        incluye: [
            "Transporte redondo",
            "Snacks",
            "Guía bilingüe (español / inglés)",
            "Servicio de recogida"
        ],
        incluyeOpcional: [
            "Alquiler de equipo (carpa, saco de dormir, bastones)" // costo adicional
        ],
        noIncluye: [
            "Entrada al volcán (Q100 / $13)",
            "Agua"
        ],

        // --- QUÉ DEBE LLEVAR EL CLIENTE ---
        queLlevar: [
            "Ropa abrigada por capas",
            "Calzado de trekking / senderismo",
            "Bastones de senderismo (si no los alquilas con nosotros)",
            "Linterna frontal o de mano",
            "Guantes y gorro",
            "Su equipo personal en general"
        ],

        // --- BLOQUES DE INFORMACIÓN ---
        infoBloques: [
            {
                titulo: "La experiencia",
                items: [
                    "Asciende al Volcán Tolimán (3,158 m), una travesía exigente y poco transitada",
                    "Camina entre vegetación densa y bosque nuboso hasta su cumbre de cráter elíptico",
                    "Mira el Volcán Atitlán, el lago de Atitlán y el altiplano occidental desde arriba",
                    "Recorrido acompañado en todo momento por guías capacitados"
                ]
            },
            {
                titulo: "Incluido en tu reserva",
                items: [
                    "Transporte de ida y vuelta desde el punto de salida",
                    "Acompañamiento de guía (español / inglés / portugués) durante toda la ruta",
                    "Recogida en el punto acordado",
                    "Snacks, disponibles solo si reservas la modalidad privada",
                    "Posibilidad de rentar equipo (carpa, saco de dormir, bastones, linterna) mediante costo adicional"
                ]
            },
            {
                titulo: "Por tu cuenta",
                items: [
                    "Pago de ingreso al volcán: Q50 residentes / Q100 visitantes extranjeros",
                    "Hidratación (agua) para todo el trayecto",
                    "Comidas principales — el servicio cubre únicamente snacks, y solo en tour privado",
                    "Equipo propio de montaña, salvo que decidas alquilarlo con nosotros"
                ]
            },
            {
                titulo: "Restricciones de participación",
                items: [
                    "Edad mínima: 15 años",
                    "No recomendado en embarazo",
                    "No recomendado con limitaciones de movilidad",
                    "No recomendado con antecedentes cardíacos",
                    "Se requiere condición física razonable"
                ]
            },
            {
                titulo: "Recomendaciones para empacar",
                items: [
                    "Capas de ropa térmica",
                    "Botas o zapatos para terreno irregular",
                    "Bastones de apoyo (rentables con nosotros)",
                    "Linterna de cabeza o de mano",
                    "Gorro y guantes",
                    "Bloqueador solar y lentes oscuros",
                    "Algo extra de comida y agua (2-3 litros sugeridos por persona)",
                    "Artículos básicos de aseo"
                ]
            },
            {
                titulo: "Antes de subir",
                items: [
                    "El sendero incluye tramos exigentes; conviene llegar con condición física adecuada.",
                    "Por las noches la temperatura baja considerablemente, así que el abrigo no es opcional.",
                    "Se aconseja llevar algo de comer extra, ya que el recorrido consume bastante energía.",
                    "Si necesitas equipo prestado, avísanos con anticipación al reservar."
                ]
            }
        ],

        // --- RESEÑAS ---
        // Vacío hasta que tengas reseñas reales (la página muestra "Aún no hay reseñas").
        resenas: [],

        // --- GALERÍA DE FOTOS ---
        fotos: [
            "img/toliman.webp"
            // TODO: agrega más fotos, por ejemplo "img/toliman1.webp", "img/toliman2.webp"... (separadas por coma)
        ],

        // --- PRECIOS (RESPALDO) ---
        precios: { // TODO: precios de relleno (copiados del Fuego), pon los reales
            individual: {
                "Russ Mall": 400,
                "Interplaza Chimaltenango": 400,
                "San Lucas Tolimán / Santiago Atitlán (faldas del volcán)": 400
            },
            grupo: {
                "Russ Mall": 300,
                "Interplaza Chimaltenango": 270,
                "San Lucas Tolimán / Santiago Atitlán (faldas del volcán)": 230
            }
        },

        // --- MODALIDADES ---
        modalidadPorDefecto: "amanecer",
        modalidades: {
            amanecer: {
                nombre: "Amanecer (ascenso nocturno)",
                duracionDias: 2,
                duracionTexto: "dos días y una noche",
                horasCaminata: "6 a 7 horas",
                desnivel: "1600m",
                fechasGrupales: [],
                precios: { // TODO: precios de relleno (copiados del Fuego), pon los reales
                    individual: {
                        "Russ Mall": 400,
                        "Interplaza Chimaltenango": 400,
                        "San Lucas Tolimán / Santiago Atitlán (faldas del volcán)": 400
                    },
                    grupo: {
                        "Russ Mall": 300,
                        "Interplaza Chimaltenango": 270,
                        "San Lucas Tolimán / Santiago Atitlán (faldas del volcán)": 230
                    },
                    grupal: {
                        "Russ Mall": 200,
                        "Interplaza Chimaltenango": 180,
                        "San Lucas Tolimán / Santiago Atitlán (faldas del volcán)": 160
                    }
                },
                itinerario: [
                    {
                        dia: 1,
                        titulo: "Traslado y ascenso nocturno",
                        eventos: [
                            { hora: "5:00 pm", lugar: "Russ Mall", descripcion: "Salida desde el centro comercial Russ Mall, Calzada Roosevelt." },
                            { hora: "6:30 pm", lugar: "Interplaza Chimaltenango", descripcion: "Punto de paso por Interplaza Chimaltenango" },
                            { hora: "10:00 pm", lugar: "Faldas del volcán: San Lucas Tolimán / Santiago Atitlán", descripcion: "Llegada a las faldas del volcán." },
                            { hora: "10:30 pm", lugar: "Inicio del ascenso", descripcion: "Comienza la caminata guiada hacia la cumbre." }
                        ]
                    },
                    {
                        dia: 2,
                        titulo: "Amanecer en la cumbre y descenso",
                        eventos: [
                            { hora: "5:00 am", lugar: "Cumbre", descripcion: "Llegada a la cumbre — momento para contemplar el amanecer y las vistas hacia el Lago de Atitlán." },
                            { hora: "7:00 am", lugar: "Descenso", descripcion: "Inicio del descenso. La hora de llegada depende del paso del grupo o de la persona, y puedes bajarte en Interplaza Chimaltenango, Russ Mall o cualquier punto del camino de regreso." }
                        ]
                    }
                ]
            },

            atardecer: {
                nombre: "Atardecer",
                duracionDias: 1,
                duracionTexto: "1 día",
                horasCaminata: "6 a 7 horas",
                desnivel: "1600m",
                fechasGrupales: [],
                precios: { // TODO: precios de relleno (copiados del Fuego), pon los reales
                    individual: {
                        "Russ Mall": 400,
                        "Interplaza Chimaltenango": 400,
                        "San Lucas Tolimán / Santiago Atitlán (faldas del volcán)": 400
                    },
                    grupo: {
                        "Russ Mall": 300,
                        "Interplaza Chimaltenango": 270,
                        "San Lucas Tolimán / Santiago Atitlán (faldas del volcán)": 230
                    },
                    grupal: {
                        "Russ Mall": 200,
                        "Interplaza Chimaltenango": 180,
                        "San Lucas Tolimán / Santiago Atitlán (faldas del volcán)": 160
                    }
                },
                itinerario: [
                    {
                        dia: 1,
                        titulo: "Ascenso y Atardecer",
                        eventos: [
                            { hora: "3:00 am", lugar: "Russ Mall", descripcion: "Salida desde el centro comercial Russ Mall, Calzada Roosevelt." },
                            { hora: "4:30 am", lugar: "Interplaza Chimaltenango", descripcion: "Punto de paso por Interplaza Chimaltenango" },
                            { hora: "8:30 am", lugar: "Faldas del volcán: San Lucas Tolimán / Santiago Atitlán", descripcion: "Llegada a las faldas del volcán." },
                            { hora: "9:00 am", lugar: "Inicio del ascenso", descripcion: "Comienza la caminata guiada hacia la cumbre." },
                            { hora: "4:30 pm", lugar: "Cumbre", descripcion: "Llegada a la cumbre — momento para contemplar el atardecer sobre el Lago de Atitlán." },
                            { hora: "6:00 pm", lugar: "Descenso", descripcion: "Inicio del descenso. La hora de llegada depende del paso del grupo o de la persona, y puedes bajarte en Interplaza Chimaltenango, Russ Mall o cualquier punto del camino de regreso." }
                        ]
                    }
                ]
            },

            camping: {
                nombre: "Atardecer y Camping",
                duracionDias: 2,
                duracionTexto: "dos días y una noche",
                horasCaminata: "6 a 7 horas",
                desnivel: "1600m",
                fechasGrupales: [],
                precios: { // TODO: precios de relleno (copiados del Fuego), pon los reales
                    individual: {
                        "Russ Mall": 500,
                        "Interplaza Chimaltenango": 500,
                        "San Lucas Tolimán / Santiago Atitlán (faldas del volcán)": 500
                    },
                    grupo: {
                        "Russ Mall": 400,
                        "Interplaza Chimaltenango": 400,
                        "San Lucas Tolimán / Santiago Atitlán (faldas del volcán)": 400
                    },
                    grupal: {
                        "Russ Mall": 300,
                        "Interplaza Chimaltenango": 280,
                        "San Lucas Tolimán / Santiago Atitlán (faldas del volcán)": 260
                    }
                },
                itinerario: [
                    {
                        dia: 1,
                        titulo: "Traslado, ascenso y atardecer",
                        eventos: [
                            { hora: "3:00 am", lugar: "Russ Mall", descripcion: "Salida desde el centro comercial Russ Mall, Calzada Roosevelt." },
                            { hora: "4:30 am", lugar: "Interplaza Chimaltenango", descripcion: "Punto de paso por Interplaza Chimaltenango" },
                            { hora: "8:30 am", lugar: "Faldas del volcán: San Lucas Tolimán / Santiago Atitlán", descripcion: "Llegada a las faldas del volcán." },
                            { hora: "9:00 am", lugar: "Inicio del ascenso", descripcion: "Comienza la caminata guiada hacia la cumbre." },
                            { hora: "4:30 pm", lugar: "Llegada a la zona de camping / cumbre", descripcion: "Armado de tiendas y apreciación del atardecer sobre el Lago de Atitlán." }
                        ]
                    },
                    {
                        dia: 2,
                        titulo: "Descenso",
                        eventos: [
                            { hora: "5:00 am", lugar: "Cumbre", descripcion: "Apreciación del amanecer desde la cumbre." },
                            { hora: "7:00 am", lugar: "Levantamiento del campamento", descripcion: "Desayuno y recogida del campamento. Cada persona levanta su tienda y empaca sus cosas para que podamos iniciar el descenso a tiempo." },
                            { hora: "7:30 am", lugar: "Descenso", descripcion: "Inicio del descenso. La hora de llegada depende del paso del grupo o de la persona, y puedes bajarte en Interplaza Chimaltenango, Russ Mall o cualquier punto del camino de regreso." }
                        ]
                    }
                ]
            }
        }
    },

    {
        id: "san-pedro",
        nombre: "Volcán San Pedro",
        region: "Sololá",
        categoria: "volcanes",
        calificacion: null, // TODO: cuando tengas reseñas reales, pon la calificación
        numeroResenas: 0, // TODO: cuando tengas reseñas reales, actualiza este número
        imagen: "img/sanpedro.webp",

        descripcion: "El Volcán San Pedro es un icónico estratovolcán extinto situado a orillas del majestuoso Lago de Atitlán, en el municipio de San Pedro La Laguna, Sololá. Con una altitud de 3,020 metros sobre el nivel del mar y un desnivel de aproximadamente 1,200 metros, es uno de los ascensos más populares y accesibles del altiplano. El sendero serpentea a través de cultivos de café, bosques subtropicales y áreas de conservación protegidas hasta alcanzar un mirador cimero rodeado de frondosa vegetación que brinda vistas espectaculares del lago de Atitlán y de las poblaciones circunvecinas.",

        // --- REQUISITOS Y NIVEL ---
        edadMinima: 15,
        condicionSalud: "Buena condición de salud",
        exigencia: 6, // escala del 1 al 10

        // --- POLÍTICAS ---
        reservaMinima: "El tour se confirma con un mínimo del 50% de la reserva completa.",
        cancelacion: "Cancelación gratuita si se cancela con 48 horas de antelación.",

        responsable: "Bajamos toda nuestra basura, cuidamos el sendero y trabajamos con guías locales.", // TODO: ajusta el texto si quieres

        // --- SERVICIO ---
        guiaIdiomas: ["Español", "Inglés", "Portugués", "Lenguaje de Señas"],
        servicioRecogida: true,

        // --- QUÉ INCLUYE / QUÉ NO ---
        incluye: [
            "Transporte redondo",
            "Snacks",
            "Guía bilingüe (español / inglés)",
            "Servicio de recogida"
        ],
        incluyeOpcional: [
            "Alquiler de equipo (carpa, saco de dormir, bastones)" // costo adicional
        ],
        noIncluye: [
            "Entrada al volcán (Q100 / $13)",
            "Agua"
        ],

        // --- QUÉ DEBE LLEVAR EL CLIENTE ---
        queLlevar: [
            "Ropa abrigada por capas",
            "Calzado de trekking / senderismo",
            "Bastones de senderismo (si no los alquilas con nosotros)",
            "Linterna frontal o de mano",
            "Guantes y gorro",
            "Su equipo personal en general"
        ],

        // --- BLOQUES DE INFORMACIÓN ---
        infoBloques: [
            {
                titulo: "La experiencia",
                items: [
                    "Asciende al Volcán San Pedro (3,020 m), uno de los ascensos más populares del altiplano",
                    "Recorre cultivos de café, bosques subtropicales y áreas de conservación protegidas",
                    "Disfruta desde el mirador cimero vistas del lago de Atitlán y sus poblaciones",
                    "Recorrido acompañado en todo momento por guías capacitados"
                ]
            },
            {
                titulo: "Incluido en tu reserva",
                items: [
                    "Transporte de ida y vuelta desde el punto de salida",
                    "Acompañamiento de guía (español / inglés / portugués) durante toda la ruta",
                    "Recogida en el punto acordado",
                    "Snacks, disponibles solo si reservas la modalidad privada",
                    "Posibilidad de rentar equipo (carpa, saco de dormir, bastones, linterna) mediante costo adicional"
                ]
            },
            {
                titulo: "Por tu cuenta",
                items: [
                    "Pago de ingreso al volcán: Q50 residentes / Q100 visitantes extranjeros",
                    "Hidratación (agua) para todo el trayecto",
                    "Comidas principales — el servicio cubre únicamente snacks, y solo en tour privado",
                    "Equipo propio de montaña, salvo que decidas alquilarlo con nosotros"
                ]
            },
            {
                titulo: "Restricciones de participación",
                items: [
                    "Edad mínima: 15 años",
                    "No recomendado en embarazo",
                    "No recomendado con limitaciones de movilidad",
                    "No recomendado con antecedentes cardíacos",
                    "Se requiere condición física razonable"
                ]
            },
            {
                titulo: "Recomendaciones para empacar",
                items: [
                    "Capas de ropa térmica",
                    "Botas o zapatos para terreno irregular",
                    "Bastones de apoyo (rentables con nosotros)",
                    "Linterna de cabeza o de mano",
                    "Gorro y guantes",
                    "Bloqueador solar y lentes oscuros",
                    "Algo extra de comida y agua (2-3 litros sugeridos por persona)",
                    "Artículos básicos de aseo"
                ]
            },
            {
                titulo: "Antes de subir",
                items: [
                    "El sendero incluye tramos exigentes; conviene llegar con condición física adecuada.",
                    "Por las noches la temperatura baja considerablemente, así que el abrigo no es opcional.",
                    "Se aconseja llevar algo de comer extra, ya que el recorrido consume bastante energía.",
                    "Si necesitas equipo prestado, avísanos con anticipación al reservar."
                ]
            }
        ],

        // --- RESEÑAS ---
        // Vacío hasta que tengas reseñas reales (la página muestra "Aún no hay reseñas").
        resenas: [],

        // --- GALERÍA DE FOTOS ---
        fotos: [
            "img/sanpedro.webp"
            // TODO: agrega más fotos, por ejemplo "img/sanpedro1.webp", "img/sanpedro2.webp"... (separadas por coma)
        ],

        // --- PRECIOS (RESPALDO) ---
        precios: { // TODO: precios de relleno (copiados del Fuego), pon los reales
            individual: {
                "Russ Mall": 400,
                "Interplaza Chimaltenango": 400,
                "San Pedro La Laguna (faldas del volcán)": 400
            },
            grupo: {
                "Russ Mall": 300,
                "Interplaza Chimaltenango": 270,
                "San Pedro La Laguna (faldas del volcán)": 230
            }
        },

        // --- MODALIDADES ---
        modalidadPorDefecto: "amanecer",
        modalidades: {
            amanecer: {
                nombre: "Amanecer (ascenso nocturno)",
                duracionDias: 2,
                duracionTexto: "dos días y una noche",
                horasCaminata: "3 a 4 horas",
                desnivel: "1200m",
                fechasGrupales: [],
                precios: { // TODO: precios de relleno (copiados del Fuego), pon los reales
                    individual: {
                        "Russ Mall": 400,
                        "Interplaza Chimaltenango": 400,
                        "San Pedro La Laguna (faldas del volcán)": 400
                    },
                    grupo: {
                        "Russ Mall": 300,
                        "Interplaza Chimaltenango": 270,
                        "San Pedro La Laguna (faldas del volcán)": 230
                    },
                    grupal: {
                        "Russ Mall": 200,
                        "Interplaza Chimaltenango": 180,
                        "San Pedro La Laguna (faldas del volcán)": 160
                    }
                },
                itinerario: [
                    {
                        dia: 1,
                        titulo: "Traslado y ascenso nocturno",
                        eventos: [
                            { hora: "8:00 pm", lugar: "Russ Mall", descripcion: "Salida desde el centro comercial Russ Mall, Calzada Roosevelt." },
                            { hora: "9:30 pm", lugar: "Interplaza Chimaltenango", descripcion: "Punto de paso por Interplaza Chimaltenango" },
                            { hora: "1:00 am", lugar: "Faldas del volcán: San Pedro La Laguna", descripcion: "Llegada a las faldas del volcán." },
                            { hora: "1:30 am", lugar: "Inicio del ascenso", descripcion: "Comienza la caminata guiada hacia la cumbre." }
                        ]
                    },
                    {
                        dia: 2,
                        titulo: "Amanecer en la cumbre y descenso",
                        eventos: [
                            { hora: "5:00 am", lugar: "Cumbre", descripcion: "Llegada a la cumbre — momento para contemplar el amanecer sobre el Lago de Atitlán." },
                            { hora: "7:00 am", lugar: "Descenso", descripcion: "Inicio del descenso. La hora de llegada depende del paso del grupo o de la persona, y puedes bajarte en Interplaza Chimaltenango, Russ Mall o cualquier punto del camino de regreso." }
                        ]
                    }
                ]
            },

            atardecer: {
                nombre: "Atardecer",
                duracionDias: 1,
                duracionTexto: "1 día",
                horasCaminata: "3 a 4 horas",
                desnivel: "1200m",
                fechasGrupales: [],
                precios: { // TODO: precios de relleno (copiados del Fuego), pon los reales
                    individual: {
                        "Russ Mall": 400,
                        "Interplaza Chimaltenango": 400,
                        "San Pedro La Laguna (faldas del volcán)": 400
                    },
                    grupo: {
                        "Russ Mall": 300,
                        "Interplaza Chimaltenango": 270,
                        "San Pedro La Laguna (faldas del volcán)": 230
                    },
                    grupal: {
                        "Russ Mall": 200,
                        "Interplaza Chimaltenango": 180,
                        "San Pedro La Laguna (faldas del volcán)": 160
                    }
                },
                itinerario: [
                    {
                        dia: 1,
                        titulo: "Ascenso y Atardecer",
                        eventos: [
                            { hora: "6:00 am", lugar: "Russ Mall", descripcion: "Salida desde el centro comercial Russ Mall, Calzada Roosevelt." },
                            { hora: "7:30 am", lugar: "Interplaza Chimaltenango", descripcion: "Punto de paso por Interplaza Chimaltenango" },
                            { hora: "11:30 am", lugar: "Faldas del volcán: San Pedro La Laguna", descripcion: "Llegada a las faldas del volcán." },
                            { hora: "12:00 pm", lugar: "Inicio del ascenso", descripcion: "Comienza la caminata guiada hacia la cumbre." },
                            { hora: "4:30 pm", lugar: "Cumbre", descripcion: "Llegada a la cumbre — momento para contemplar el atardecer sobre el Lago de Atitlán." },
                            { hora: "6:00 pm", lugar: "Descenso", descripcion: "Inicio del descenso. La hora de llegada depende del paso del grupo o de la persona, y puedes bajarte en Interplaza Chimaltenango, Russ Mall o cualquier punto del camino de regreso." }
                        ]
                    }
                ]
            },

            camping: {
                nombre: "Atardecer y Camping",
                duracionDias: 2,
                duracionTexto: "dos días y una noche",
                horasCaminata: "3 a 4 horas",
                desnivel: "1200m",
                fechasGrupales: [],
                precios: { // TODO: precios de relleno (copiados del Fuego), pon los reales
                    individual: {
                        "Russ Mall": 500,
                        "Interplaza Chimaltenango": 500,
                        "San Pedro La Laguna (faldas del volcán)": 500
                    },
                    grupo: {
                        "Russ Mall": 400,
                        "Interplaza Chimaltenango": 400,
                        "San Pedro La Laguna (faldas del volcán)": 400
                    },
                    grupal: {
                        "Russ Mall": 300,
                        "Interplaza Chimaltenango": 280,
                        "San Pedro La Laguna (faldas del volcán)": 260
                    }
                },
                itinerario: [
                    {
                        dia: 1,
                        titulo: "Traslado, ascenso y atardecer",
                        eventos: [
                            { hora: "6:00 am", lugar: "Russ Mall", descripcion: "Salida desde el centro comercial Russ Mall, Calzada Roosevelt." },
                            { hora: "7:30 am", lugar: "Interplaza Chimaltenango", descripcion: "Punto de paso por Interplaza Chimaltenango" },
                            { hora: "11:30 am", lugar: "Faldas del volcán: San Pedro La Laguna", descripcion: "Llegada a las faldas del volcán." },
                            { hora: "12:00 pm", lugar: "Inicio del ascenso", descripcion: "Comienza la caminata guiada hacia la cumbre." },
                            { hora: "4:30 pm", lugar: "Llegada a la zona de camping / cumbre", descripcion: "Armado de tiendas y apreciación del atardecer sobre el Lago de Atitlán." }
                        ]
                    },
                    {
                        dia: 2,
                        titulo: "Descenso",
                        eventos: [
                            { hora: "5:00 am", lugar: "Cumbre", descripcion: "Apreciación del amanecer desde la cumbre." },
                            { hora: "7:00 am", lugar: "Levantamiento del campamento", descripcion: "Desayuno y recogida del campamento. Cada persona levanta su tienda y empaca sus cosas para que podamos iniciar el descenso a tiempo." },
                            { hora: "7:30 am", lugar: "Descenso", descripcion: "Inicio del descenso. La hora de llegada depende del paso del grupo o de la persona, y puedes bajarte en Interplaza Chimaltenango, Russ Mall o cualquier punto del camino de regreso." }
                        ]
                    }
                ]
            }
        }
    },

    {
        id: "santo-tomas",
        nombre: "Volcán Santo Tomás (Pecul / Peña Blanca)",
        region: "Quetzaltenango / Suchitepéquez",
        categoria: "volcanes",
        calificacion: null, // TODO: cuando tengas reseñas reales, pon la calificación
        numeroResenas: 0, // TODO: cuando tengas reseñas reales, actualiza este número
        imagen: "img/santotomas.webp", // TODO: sube esta foto

        descripcion: "El Volcán Santo Tomás, también conocido como Pecul o Peña Blanca, es un imponente estratovolcán extinto ubicado entre los límites de Quetzaltenango y Suchitepéquez. Con una altitud de 3,160 metros sobre el nivel del mar y una abrupta cresta que culmina en el icónico peñasco de Peña Blanca, ofrece una de las rutas de montañismo más boscosas, húmedas y menos exploradas del país. A lo largo del trayecto, los senderistas atraviesan exuberantes selvas de montaña y bosques nubosos característicos de la bocacosta guatemalteca, disfrutando en la cumbre de espectaculares vistas hacia la costa sur, el volcán Zunil y el altiplano occidental.",

        // --- REQUISITOS Y NIVEL ---
        edadMinima: 15,
        condicionSalud: "Buena condición de salud",
        exigencia: 8, // escala del 1 al 10

        // --- POLÍTICAS ---
        reservaMinima: "El tour se confirma con un mínimo del 50% de la reserva completa.",
        cancelacion: "Cancelación gratuita si se cancela con 48 horas de antelación.",

        responsable: "Bajamos toda nuestra basura, cuidamos el sendero y trabajamos con guías locales.", // TODO: ajusta el texto si quieres

        // --- SERVICIO ---
        guiaIdiomas: ["Español", "Inglés", "Portugués", "Lenguaje de Señas"],
        servicioRecogida: true,

        // --- QUÉ INCLUYE / QUÉ NO ---
        incluye: [
            "Transporte redondo",
            "Snacks",
            "Guía bilingüe (español / inglés)",
            "Servicio de recogida"
        ],
        incluyeOpcional: [
            "Alquiler de equipo (carpa, saco de dormir, bastones)" // costo adicional
        ],
        noIncluye: [
            "Entrada al volcán (Q100 / $13)",
            "Agua"
        ],

        // --- QUÉ DEBE LLEVAR EL CLIENTE ---
        queLlevar: [
            "Ropa abrigada por capas",
            "Calzado de trekking / senderismo",
            "Bastones de senderismo (si no los alquilas con nosotros)",
            "Linterna frontal o de mano",
            "Guantes y gorro",
            "Su equipo personal en general"
        ],

        // --- BLOQUES DE INFORMACIÓN ---
        infoBloques: [
            {
                titulo: "La experiencia",
                items: [
                    "Asciende al Volcán Santo Tomás (Pecul / Peña Blanca, 3,160 m), una ruta boscosa y poco explorada",
                    "Atraviesa selvas de montaña y bosques nubosos de la bocacosta, con trasbordo en vehículo 4x4",
                    "Contempla la costa sur, el volcán Zunil y el altiplano occidental desde la cumbre",
                    "Recorrido acompañado en todo momento por guías capacitados"
                ]
            },
            {
                titulo: "Incluido en tu reserva",
                items: [
                    "Transporte de ida y vuelta desde el punto de salida",
                    "Acompañamiento de guía (español / inglés / portugués) durante toda la ruta",
                    "Recogida en el punto acordado",
                    "Snacks, disponibles solo si reservas la modalidad privada",
                    "Posibilidad de rentar equipo (carpa, saco de dormir, bastones, linterna) mediante costo adicional"
                ]
            },
            {
                titulo: "Por tu cuenta",
                items: [
                    "Pago de ingreso al volcán: Q50 residentes / Q100 visitantes extranjeros",
                    "Hidratación (agua) para todo el trayecto",
                    "Comidas principales — el servicio cubre únicamente snacks, y solo en tour privado",
                    "Equipo propio de montaña, salvo que decidas alquilarlo con nosotros"
                ]
            },
            {
                titulo: "Restricciones de participación",
                items: [
                    "Edad mínima: 15 años",
                    "No recomendado en embarazo",
                    "No recomendado con limitaciones de movilidad",
                    "No recomendado con antecedentes cardíacos",
                    "Se requiere condición física razonable"
                ]
            },
            {
                titulo: "Recomendaciones para empacar",
                items: [
                    "Capas de ropa térmica",
                    "Botas o zapatos para terreno irregular",
                    "Bastones de apoyo (rentables con nosotros)",
                    "Linterna de cabeza o de mano",
                    "Gorro y guantes",
                    "Bloqueador solar y lentes oscuros",
                    "Algo extra de comida y agua (2-3 litros sugeridos por persona)",
                    "Artículos básicos de aseo"
                ]
            },
            {
                titulo: "Antes de subir",
                items: [
                    "El sendero incluye tramos exigentes; conviene llegar con condición física adecuada.",
                    "Por las noches la temperatura baja considerablemente, así que el abrigo no es opcional.",
                    "Se aconseja llevar algo de comer extra, ya que el recorrido consume bastante energía.",
                    "Si necesitas equipo prestado, avísanos con anticipación al reservar."
                ]
            }
        ],

        // --- RESEÑAS ---
        // Vacío hasta que tengas reseñas reales (la página muestra "Aún no hay reseñas").
        resenas: [],

        // --- GALERÍA DE FOTOS ---
        fotos: [
            "img/santotomas.webp"
            // TODO: agrega más fotos, por ejemplo "img/santotomas1.webp", "img/santotomas2.webp"... (separadas por coma)
        ],

        // --- PRECIOS (RESPALDO) ---
        precios: { // TODO: precios de relleno (copiados del Fuego), pon los reales
            individual: {
                "Russ Mall": 400,
                "Interplaza Chimaltenango": 400,
                "Interplaza Xela": 400,
                "Finca La Chingada (faldas del volcán)": 400
            },
            grupo: {
                "Russ Mall": 300,
                "Interplaza Chimaltenango": 270,
                "Interplaza Xela": 270,
                "Finca La Chingada (faldas del volcán)": 230
            }
        },

        // --- MODALIDADES ---
        modalidadPorDefecto: "amanecer",
        modalidades: {
            amanecer: {
                nombre: "Amanecer (ascenso nocturno)",
                duracionDias: 2,
                duracionTexto: "dos días y una noche",
                horasCaminata: "6 horas",
                desnivel: "1300m",
                fechasGrupales: [
       { fecha: "2026-11-28", cupos: 12 }, ],
                precios: { // TODO: precios de relleno (copiados del Fuego), pon los reales
                    individual: {
                        "Russ Mall": 400,
                        "Interplaza Chimaltenango": 400,
                        "Interplaza Xela": 400,
                        "Finca La Chingada (faldas del volcán)": 400
                    },
                    grupo: {
                        "Russ Mall": 300,
                        "Interplaza Chimaltenango": 270,
                        "Interplaza Xela": 270,
                        "Finca La Chingada (faldas del volcán)": 230
                    },
                    grupal: {
                        "Russ Mall": 200,
                        "Interplaza Chimaltenango": 180,
                        "Interplaza Xela": 180,
                        "Finca La Chingada (faldas del volcán)": 160
                    }
                },
                itinerario: [
                    {
                        dia: 1,
                        titulo: "Traslado y ascenso nocturno",
                        eventos: [
                            { hora: "3:00 pm", lugar: "Russ Mall", descripcion: "Salida desde el centro comercial Russ Mall, Calzada Roosevelt." },
                            { hora: "4:30 pm", lugar: "Interplaza Chimaltenango", descripcion: "Punto de paso por Interplaza Chimaltenango" },
                            { hora: "7:30 pm", lugar: "Interplaza Xela", descripcion: "Punto de paso por Interplaza Xela" },
                            { hora: "8:00 pm", lugar: "Punto de abordaje 4x4", descripcion: "Llegada al punto de abordaje 4x4." },
                            { hora: "8:30 pm", lugar: "Finca La Chingada (faldas del volcán)", descripcion: "Llegada a las faldas del volcán en trasbordo 4x4." },
                            { hora: "9:00 pm", lugar: "Inicio del ascenso", descripcion: "Comienza la caminata guiada hacia la cumbre." }
                        ]
                    },
                    {
                        dia: 2,
                        titulo: "Amanecer en la cumbre y descenso",
                        eventos: [
                            { hora: "5:00 am", lugar: "Cumbre", descripcion: "Llegada a la cumbre (Peña Blanca) — momento para contemplar el amanecer y las vistas del altiplano y la bocacosta." },
                            { hora: "7:00 am", lugar: "Descenso", descripcion: "Inicio del descenso. La hora de llegada depende del paso del grupo o de la persona, y puedes bajarte en Interplaza Xela, Interplaza Chimaltenango, Russ Mall o cualquier punto del camino de regreso." }
                        ]
                    }
                ]
            },

            atardecer: {
                nombre: "Atardecer",
                duracionDias: 1,
                duracionTexto: "1 día",
                horasCaminata: "6 horas",
                desnivel: "1300m",
                fechasGrupales: [],
                precios: { // TODO: precios de relleno (copiados del Fuego), pon los reales
                    individual: {
                        "Russ Mall": 400,
                        "Interplaza Chimaltenango": 400,
                        "Interplaza Xela": 400,
                        "Finca La Chingada (faldas del volcán)": 400
                    },
                    grupo: {
                        "Russ Mall": 300,
                        "Interplaza Chimaltenango": 270,
                        "Interplaza Xela": 270,
                        "Finca La Chingada (faldas del volcán)": 230
                    },
                    grupal: {
                        "Russ Mall": 200,
                        "Interplaza Chimaltenango": 180,
                        "Interplaza Xela": 180,
                        "Finca La Chingada (faldas del volcán)": 160
                    }
                },
                itinerario: [
                    {
                        dia: 1,
                        titulo: "Ascenso y Atardecer",
                        eventos: [
                            { hora: "4:30 am", lugar: "Russ Mall", descripcion: "Salida desde el centro comercial Russ Mall, Calzada Roosevelt." },
                            { hora: "6:00 am", lugar: "Interplaza Chimaltenango", descripcion: "Punto de paso por Interplaza Chimaltenango" },
                            { hora: "9:00 am", lugar: "Interplaza Xela", descripcion: "Punto de paso por Interplaza Xela" },
                            { hora: "9:30 am", lugar: "Punto de abordaje 4x4", descripcion: "Llegada al punto de abordaje 4x4." },
                            { hora: "10:00 am", lugar: "Finca La Chingada (faldas del volcán)", descripcion: "Llegada a las faldas del volcán en trasbordo 4x4." },
                            { hora: "10:30 am", lugar: "Inicio del ascenso", descripcion: "Comienza la caminata guiada hacia la cumbre." },
                            { hora: "4:30 pm", lugar: "Cumbre", descripcion: "Llegada a la cumbre — momento para contemplar el atardecer." },
                            { hora: "6:00 pm", lugar: "Descenso", descripcion: "Inicio del descenso. La hora de llegada depende del paso del grupo o de la persona, y puedes bajarte en Interplaza Xela, Interplaza Chimaltenango, Russ Mall o cualquier punto del camino de regreso." }
                        ]
                    }
                ]
            },

            camping: {
                nombre: "Atardecer y Camping",
                duracionDias: 2,
                duracionTexto: "dos días y una noche",
                horasCaminata: "6 horas",
                desnivel: "1300m",
                fechasGrupales: [],
                precios: { // TODO: precios de relleno (copiados del Fuego), pon los reales
                    individual: {
                        "Russ Mall": 500,
                        "Interplaza Chimaltenango": 500,
                        "Interplaza Xela": 500,
                        "Finca La Chingada (faldas del volcán)": 500
                    },
                    grupo: {
                        "Russ Mall": 400,
                        "Interplaza Chimaltenango": 400,
                        "Interplaza Xela": 400,
                        "Finca La Chingada (faldas del volcán)": 400
                    },
                    grupal: {
                        "Russ Mall": 300,
                        "Interplaza Chimaltenango": 280,
                        "Interplaza Xela": 280,
                        "Finca La Chingada (faldas del volcán)": 260
                    }
                },
                itinerario: [
                    {
                        dia: 1,
                        titulo: "Traslado, ascenso y atardecer",
                        eventos: [
                            { hora: "4:30 am", lugar: "Russ Mall", descripcion: "Salida desde el centro comercial Russ Mall, Calzada Roosevelt." },
                            { hora: "6:00 am", lugar: "Interplaza Chimaltenango", descripcion: "Punto de paso por Interplaza Chimaltenango" },
                            { hora: "9:00 am", lugar: "Interplaza Xela", descripcion: "Punto de paso por Interplaza Xela" },
                            { hora: "9:30 am", lugar: "Punto de abordaje 4x4", descripcion: "Llegada al punto de abordaje 4x4." },
                            { hora: "10:00 am", lugar: "Finca La Chingada (faldas del volcán)", descripcion: "Llegada a las faldas del volcán en trasbordo 4x4." },
                            { hora: "10:30 am", lugar: "Inicio del ascenso", descripcion: "Comienza la caminata guiada hacia la cumbre." },
                            { hora: "4:30 pm", lugar: "Llegada a la zona de camping / cumbre", descripcion: "Armado de tiendas y apreciación del atardecer." }
                        ]
                    },
                    {
                        dia: 2,
                        titulo: "Descenso",
                        eventos: [
                            { hora: "5:00 am", lugar: "Cumbre", descripcion: "Apreciación del amanecer desde la cumbre." },
                            { hora: "7:00 am", lugar: "Levantamiento del campamento", descripcion: "Desayuno y recogida del campamento. Cada persona levanta su tienda y empaca sus cosas para que podamos iniciar el descenso a tiempo." },
                            { hora: "7:30 am", lugar: "Descenso", descripcion: "Inicio del descenso. La hora de llegada depende del paso del grupo o de la persona, y puedes bajarte en Interplaza Xela, Interplaza Chimaltenango, Russ Mall o cualquier punto del camino de regreso." }
                        ]
                    }
                ]
            }
        }
    },

    {
        id: "siete-orejas",
        nombre: "Volcán Siete Orejas",
        region: "Quetzaltenango",
        categoria: "volcanes",
        calificacion: null, // TODO: cuando tengas reseñas reales, pon la calificación
        numeroResenas: 0, // TODO: cuando tengas reseñas reales, actualiza este número
        imagen: "img/sieteorejas.webp", // TODO: sube esta foto

        descripcion: "El Volcán Siete Orejas es un fascinante complejo volcánico extinto situado en el departamento de Quetzaltenango, entre los municipios de San Martín Sacatepéquez, Concepción Chiquirichapa y Quetzaltenango. Su nombre proviene de los siete picos prominentes (\"orejas\") que bordean las paredes de su enorme y colapsada caldera volcánica. El ascenso recorre la cresta de la caldera conectando los picos sobre senderos rodeados de frondosos bosques de pino y encino, ofreciendo una travesía prolongada y entretenida con impresionantes vistas hacia el Volcán Santa María, el Santiaguito, el valle de Quetzaltenango y la mística Laguna de Chicabal.",

        // --- REQUISITOS Y NIVEL ---
        edadMinima: 15,
        condicionSalud: "Buena condición de salud",
        exigencia: 7, // escala del 1 al 10

        // --- POLÍTICAS ---
        reservaMinima: "El tour se confirma con un mínimo del 50% de la reserva completa.",
        cancelacion: "Cancelación gratuita si se cancela con 48 horas de antelación.",

        responsable: "Bajamos toda nuestra basura, cuidamos el sendero y trabajamos con guías locales.", // TODO: ajusta el texto si quieres

        // --- SERVICIO ---
        guiaIdiomas: ["Español", "Inglés", "Portugués", "Lenguaje de Señas"],
        servicioRecogida: true,

        // --- QUÉ INCLUYE / QUÉ NO ---
        incluye: [
            "Transporte redondo",
            "Snacks",
            "Guía bilingüe (español / inglés)",
            "Servicio de recogida"
        ],
        incluyeOpcional: [
            "Alquiler de equipo (carpa, saco de dormir, bastones)" // costo adicional
        ],
        noIncluye: [
            "Entrada al volcán (Q100 / $13)",
            "Agua"
        ],

        // --- QUÉ DEBE LLEVAR EL CLIENTE ---
        queLlevar: [
            "Ropa abrigada por capas",
            "Calzado de trekking / senderismo",
            "Bastones de senderismo (si no los alquilas con nosotros)",
            "Linterna frontal o de mano",
            "Guantes y gorro",
            "Su equipo personal en general"
        ],

        // --- BLOQUES DE INFORMACIÓN ---
        infoBloques: [
            {
                titulo: "La experiencia",
                items: [
                    "Recorre la cresta de la caldera del Siete Orejas (3,370 m), conectando sus picos",
                    "Camina entre bosques de pino y encino en una travesía prolongada y entretenida",
                    "Mira el Santa María, el Santiaguito, el valle de Quetzaltenango y la Laguna de Chicabal",
                    "Recorrido acompañado en todo momento por guías capacitados"
                ]
            },
            {
                titulo: "Incluido en tu reserva",
                items: [
                    "Transporte de ida y vuelta desde el punto de salida",
                    "Acompañamiento de guía (español / inglés / portugués) durante toda la ruta",
                    "Recogida en el punto acordado",
                    "Snacks, disponibles solo si reservas la modalidad privada",
                    "Posibilidad de rentar equipo (carpa, saco de dormir, bastones, linterna) mediante costo adicional"
                ]
            },
            {
                titulo: "Por tu cuenta",
                items: [
                    "Pago de ingreso al volcán: Q50 residentes / Q100 visitantes extranjeros",
                    "Hidratación (agua) para todo el trayecto",
                    "Comidas principales — el servicio cubre únicamente snacks, y solo en tour privado",
                    "Equipo propio de montaña, salvo que decidas alquilarlo con nosotros"
                ]
            },
            {
                titulo: "Restricciones de participación",
                items: [
                    "Edad mínima: 15 años",
                    "No recomendado en embarazo",
                    "No recomendado con limitaciones de movilidad",
                    "No recomendado con antecedentes cardíacos",
                    "Se requiere condición física razonable"
                ]
            },
            {
                titulo: "Recomendaciones para empacar",
                items: [
                    "Capas de ropa térmica",
                    "Botas o zapatos para terreno irregular",
                    "Bastones de apoyo (rentables con nosotros)",
                    "Linterna de cabeza o de mano",
                    "Gorro y guantes",
                    "Bloqueador solar y lentes oscuros",
                    "Algo extra de comida y agua (2-3 litros sugeridos por persona)",
                    "Artículos básicos de aseo"
                ]
            },
            {
                titulo: "Antes de subir",
                items: [
                    "El sendero incluye tramos exigentes; conviene llegar con condición física adecuada.",
                    "Por las noches la temperatura baja considerablemente, así que el abrigo no es opcional.",
                    "Se aconseja llevar algo de comer extra, ya que el recorrido consume bastante energía.",
                    "Si necesitas equipo prestado, avísanos con anticipación al reservar."
                ]
            }
        ],

        // --- RESEÑAS ---
        // Vacío hasta que tengas reseñas reales (la página muestra "Aún no hay reseñas").
        resenas: [],

        // --- GALERÍA DE FOTOS ---
        fotos: [
            "img/sieteorejas.webp"
            // TODO: agrega más fotos, por ejemplo "img/sieteorejas1.webp", "img/sieteorejas2.webp"... (separadas por coma)
        ],

        // --- PRECIOS (RESPALDO) ---
        precios: { // TODO: precios de relleno (copiados del Fuego), pon los reales
            individual: {
                "Russ Mall": 400,
                "Interplaza Chimaltenango": 400,
                "Interplaza Xela": 400,
                "Llanos del Pinal / Concepción Chiquirichapa (faldas del volcán)": 400
            },
            grupo: {
                "Russ Mall": 300,
                "Interplaza Chimaltenango": 270,
                "Interplaza Xela": 270,
                "Llanos del Pinal / Concepción Chiquirichapa (faldas del volcán)": 230
            }
        },

        // --- MODALIDADES ---
        modalidadPorDefecto: "amanecer",
        modalidades: {
            amanecer: {
                nombre: "Amanecer (ascenso nocturno)",
                duracionDias: 2,
                duracionTexto: "dos días y una noche",
                horasCaminata: "6 a 7 horas",
                desnivel: "850m",
                fechasGrupales: [],
                precios: { // TODO: precios de relleno (copiados del Fuego), pon los reales
                    individual: {
                        "Russ Mall": 400,
                        "Interplaza Chimaltenango": 400,
                        "Interplaza Xela": 400,
                        "Llanos del Pinal / Concepción Chiquirichapa (faldas del volcán)": 400
                    },
                    grupo: {
                        "Russ Mall": 300,
                        "Interplaza Chimaltenango": 270,
                        "Interplaza Xela": 270,
                        "Llanos del Pinal / Concepción Chiquirichapa (faldas del volcán)": 230
                    },
                    grupal: {
                        "Russ Mall": 200,
                        "Interplaza Chimaltenango": 180,
                        "Interplaza Xela": 180,
                        "Llanos del Pinal / Concepción Chiquirichapa (faldas del volcán)": 160
                    }
                },
                itinerario: [
                    {
                        dia: 1,
                        titulo: "Traslado y ascenso nocturno",
                        eventos: [
                            { hora: "3:00 pm", lugar: "Russ Mall", descripcion: "Salida desde el centro comercial Russ Mall, Calzada Roosevelt." },
                            { hora: "4:30 pm", lugar: "Interplaza Chimaltenango", descripcion: "Punto de paso por Interplaza Chimaltenango" },
                            { hora: "7:30 pm", lugar: "Interplaza Xela", descripcion: "Punto de paso por Interplaza Xela" },
                            { hora: "8:00 pm", lugar: "Faldas del volcán: Llanos del Pinal / Concepción Chiquirichapa", descripcion: "Llegada a las faldas del volcán." },
                            { hora: "8:30 pm", lugar: "Inicio del ascenso", descripcion: "Comienza la caminata guiada recorriendo las cumbres y picos." }
                        ]
                    },
                    {
                        dia: 2,
                        titulo: "Amanecer en la cumbre y descenso",
                        eventos: [
                            { hora: "5:00 am", lugar: "Cumbre", descripcion: "Llegada a la cima principal — momento para contemplar el amanecer y la vista sobre el valle de Xela." },
                            { hora: "7:00 am", lugar: "Descenso", descripcion: "Inicio del descenso. La hora de llegada depende del paso del grupo o de la persona, y puedes bajarte en Interplaza Xela, Interplaza Chimaltenango, Russ Mall o cualquier punto del camino de regreso." }
                        ]
                    }
                ]
            },

            atardecer: {
                nombre: "Atardecer",
                duracionDias: 1,
                duracionTexto: "1 día",
                horasCaminata: "6 a 7 horas",
                desnivel: "850m",
                fechasGrupales: [],
                precios: { // TODO: precios de relleno (copiados del Fuego), pon los reales
                    individual: {
                        "Russ Mall": 400,
                        "Interplaza Chimaltenango": 400,
                        "Interplaza Xela": 400,
                        "Llanos del Pinal / Concepción Chiquirichapa (faldas del volcán)": 400
                    },
                    grupo: {
                        "Russ Mall": 300,
                        "Interplaza Chimaltenango": 270,
                        "Interplaza Xela": 270,
                        "Llanos del Pinal / Concepción Chiquirichapa (faldas del volcán)": 230
                    },
                    grupal: {
                        "Russ Mall": 200,
                        "Interplaza Chimaltenango": 180,
                        "Interplaza Xela": 180,
                        "Llanos del Pinal / Concepción Chiquirichapa (faldas del volcán)": 160
                    }
                },
                itinerario: [
                    {
                        dia: 1,
                        titulo: "Ascenso y Atardecer",
                        eventos: [
                            { hora: "4:30 am", lugar: "Russ Mall", descripcion: "Salida desde el centro comercial Russ Mall, Calzada Roosevelt." },
                            { hora: "6:00 am", lugar: "Interplaza Chimaltenango", descripcion: "Punto de paso por Interplaza Chimaltenango" },
                            { hora: "9:00 am", lugar: "Interplaza Xela", descripcion: "Punto de paso por Interplaza Xela" },
                            { hora: "9:30 am", lugar: "Faldas del volcán: Llanos del Pinal / Concepción Chiquirichapa", descripcion: "Llegada a las faldas del volcán." },
                            { hora: "10:00 am", lugar: "Inicio del ascenso", descripcion: "Comienza la caminata guiada hacia los picos y la cumbre." },
                            { hora: "4:30 pm", lugar: "Cumbre", descripcion: "Llegada a la cumbre — momento para contemplar el atardecer." },
                            { hora: "6:00 pm", lugar: "Descenso", descripcion: "Inicio del descenso. La hora de llegada depende del paso del grupo o de la persona, y puedes bajarte en Interplaza Xela, Interplaza Chimaltenango, Russ Mall o cualquier punto del camino de regreso." }
                        ]
                    }
                ]
            },

            camping: {
                nombre: "Atardecer y Camping",
                duracionDias: 2,
                duracionTexto: "dos días y una noche",
                horasCaminata: "6 a 7 horas",
                desnivel: "850m",
                fechasGrupales: [],
                precios: { // TODO: precios de relleno (copiados del Fuego), pon los reales
                    individual: {
                        "Russ Mall": 500,
                        "Interplaza Chimaltenango": 500,
                        "Interplaza Xela": 500,
                        "Llanos del Pinal / Concepción Chiquirichapa (faldas del volcán)": 500
                    },
                    grupo: {
                        "Russ Mall": 400,
                        "Interplaza Chimaltenango": 400,
                        "Interplaza Xela": 400,
                        "Llanos del Pinal / Concepción Chiquirichapa (faldas del volcán)": 400
                    },
                    grupal: {
                        "Russ Mall": 300,
                        "Interplaza Chimaltenango": 280,
                        "Interplaza Xela": 280,
                        "Llanos del Pinal / Concepción Chiquirichapa (faldas del volcán)": 260
                    }
                },
                itinerario: [
                    {
                        dia: 1,
                        titulo: "Traslado, ascenso y atardecer",
                        eventos: [
                            { hora: "4:30 am", lugar: "Russ Mall", descripcion: "Salida desde el centro comercial Russ Mall, Calzada Roosevelt." },
                            { hora: "6:00 am", lugar: "Interplaza Chimaltenango", descripcion: "Punto de paso por Interplaza Chimaltenango" },
                            { hora: "9:00 am", lugar: "Interplaza Xela", descripcion: "Punto de paso por Interplaza Xela" },
                            { hora: "9:30 am", lugar: "Faldas del volcán: Llanos del Pinal / Concepción Chiquirichapa", descripcion: "Llegada a las faldas del volcán." },
                            { hora: "10:00 am", lugar: "Inicio del ascenso", descripcion: "Comienza la caminata guiada hacia los picos y la cumbre." },
                            { hora: "4:30 pm", lugar: "Llegada a la zona de camping / cumbre", descripcion: "Armado de tiendas y apreciación del atardecer." }
                        ]
                    },
                    {
                        dia: 2,
                        titulo: "Descenso",
                        eventos: [
                            { hora: "5:00 am", lugar: "Cumbre", descripcion: "Apreciación del amanecer desde la cumbre." },
                            { hora: "7:00 am", lugar: "Levantamiento del campamento", descripcion: "Desayuno y recogida del campamento. Cada persona levanta su tienda y empaca sus cosas para que podamos iniciar el descenso a tiempo." },
                            { hora: "7:30 am", lugar: "Descenso", descripcion: "Inicio del descenso. La hora de llegada depende del paso del grupo o de la persona, y puedes bajarte en Interplaza Xela, Interplaza Chimaltenango, Russ Mall o cualquier punto del camino de regreso." }
                        ]
                    }
                ]
            }
        }
    },

    {
        id: "zunil",
        nombre: "Cerro Zunil",
        region: "Quetzaltenango",
        categoria: "volcanes",
        calificacion: null, // TODO: cuando tengas reseñas reales, pon la calificación
        numeroResenas: 0, // TODO: cuando tengas reseñas reales, actualiza este número
        imagen: "img/zunil.webp", // TODO: sube esta foto

        descripcion: "El Cerro Zunil es un imponente estratovolcán extinto y domo volcánico ubicado en el departamento de Quetzaltenango. Con una altitud de 3,542 metros sobre el nivel del mar y un desnivel exigente, es una de las cumbres más místicas y menos exploradas de la cadena volcánica guatemalteca. El recorrido atraviesa frondosos bosques nubosos, ecosistemas de pajonal de alta montaña y zonas de densa vegetación tropical en la bocacosta. Desde su cima despejada se obtienen vistas panorámicas impresionantes hacia el Volcán Santa María, el activo domo Santiaguito, el Volcán Pecul (Santo Tomás) y el valle de Quetzaltenango.",

        // --- REQUISITOS Y NIVEL ---
        edadMinima: 15,
        condicionSalud: "Buena condición de salud",
        exigencia: 8, // escala del 1 al 10

        // --- POLÍTICAS ---
        reservaMinima: "El tour se confirma con un mínimo del 50% de la reserva completa.",
        cancelacion: "Cancelación gratuita si se cancela con 48 horas de antelación.",

        responsable: "Bajamos toda nuestra basura, cuidamos el sendero y trabajamos con guías locales.", // TODO: ajusta el texto si quieres

        // --- SERVICIO ---
        guiaIdiomas: ["Español", "Inglés", "Portugués", "Lenguaje de Señas"],
        servicioRecogida: true,

        // --- QUÉ INCLUYE / QUÉ NO ---
        incluye: [
            "Transporte redondo",
            "Snacks",
            "Guía bilingüe (español / inglés)",
            "Servicio de recogida"
        ],
        incluyeOpcional: [
            "Alquiler de equipo (carpa, saco de dormir, bastones)" // costo adicional
        ],
        noIncluye: [
            "Entrada al volcán (Q100 / $13)",
            "Agua"
        ],

        // --- QUÉ DEBE LLEVAR EL CLIENTE ---
        queLlevar: [
            "Ropa abrigada por capas",
            "Calzado de trekking / senderismo",
            "Bastones de senderismo (si no los alquilas con nosotros)",
            "Linterna frontal o de mano",
            "Guantes y gorro",
            "Su equipo personal en general"
        ],

        // --- BLOQUES DE INFORMACIÓN ---
        infoBloques: [
            {
                titulo: "La experiencia",
                items: [
                    "Asciende al Cerro Zunil (3,542 m), una de las cumbres más místicas y menos exploradas",
                    "Cruza bosques nubosos, pajonales de alta montaña y vegetación tropical de la bocacosta",
                    "Disfruta vistas del Santa María, el Santiaguito, el Santo Tomás y el valle de Quetzaltenango",
                    "Recorrido acompañado en todo momento por guías capacitados"
                ]
            },
            {
                titulo: "Incluido en tu reserva",
                items: [
                    "Transporte de ida y vuelta desde el punto de salida",
                    "Acompañamiento de guía (español / inglés / portugués) durante toda la ruta",
                    "Recogida en el punto acordado",
                    "Snacks, disponibles solo si reservas la modalidad privada",
                    "Posibilidad de rentar equipo (carpa, saco de dormir, bastones, linterna) mediante costo adicional"
                ]
            },
            {
                titulo: "Por tu cuenta",
                items: [
                    "Pago de ingreso al volcán: Q50 residentes / Q100 visitantes extranjeros",
                    "Hidratación (agua) para todo el trayecto",
                    "Comidas principales — el servicio cubre únicamente snacks, y solo en tour privado",
                    "Equipo propio de montaña, salvo que decidas alquilarlo con nosotros"
                ]
            },
            {
                titulo: "Restricciones de participación",
                items: [
                    "Edad mínima: 15 años",
                    "No recomendado en embarazo",
                    "No recomendado con limitaciones de movilidad",
                    "No recomendado con antecedentes cardíacos",
                    "Se requiere condición física razonable"
                ]
            },
            {
                titulo: "Recomendaciones para empacar",
                items: [
                    "Capas de ropa térmica",
                    "Botas o zapatos para terreno irregular",
                    "Bastones de apoyo (rentables con nosotros)",
                    "Linterna de cabeza o de mano",
                    "Gorro y guantes",
                    "Bloqueador solar y lentes oscuros",
                    "Algo extra de comida y agua (2-3 litros sugeridos por persona)",
                    "Artículos básicos de aseo"
                ]
            },
            {
                titulo: "Antes de subir",
                items: [
                    "El sendero incluye tramos exigentes; conviene llegar con condición física adecuada.",
                    "Por las noches la temperatura baja considerablemente, así que el abrigo no es opcional.",
                    "Se aconseja llevar algo de comer extra, ya que el recorrido consume bastante energía.",
                    "Si necesitas equipo prestado, avísanos con anticipación al reservar."
                ]
            }
        ],

        // --- RESEÑAS ---
        // Vacío hasta que tengas reseñas reales (la página muestra "Aún no hay reseñas").
        resenas: [],

        // --- GALERÍA DE FOTOS ---
        fotos: [
            "img/zunil.webp"
            // TODO: agrega más fotos, por ejemplo "img/zunil1.webp", "img/zunil2.webp"... (separadas por coma)
        ],

        // --- PRECIOS (RESPALDO) ---
        precios: { // TODO: precios de relleno (copiados del Fuego), pon los reales
            individual: {
                "Russ Mall": 400,
                "Interplaza Chimaltenango": 400,
                "Interplaza Xela": 400,
                "Finca La Chingada (faldas del volcán)": 400
            },
            grupo: {
                "Russ Mall": 300,
                "Interplaza Chimaltenango": 270,
                "Interplaza Xela": 270,
                "Finca La Chingada (faldas del volcán)": 230
            }
        },

        // --- MODALIDADES ---
        modalidadPorDefecto: "amanecer",
        modalidades: {
            amanecer: {
                nombre: "Amanecer (ascenso nocturno)",
                duracionDias: 2,
                duracionTexto: "dos días y una noche",
                horasCaminata: "6 a 7 horas",
                desnivel: "1400m",
                fechasGrupales: [],
                precios: { // TODO: precios de relleno (copiados del Fuego), pon los reales
                    individual: {
                        "Russ Mall": 400,
                        "Interplaza Chimaltenango": 400,
                        "Interplaza Xela": 400,
                        "Finca La Chingada (faldas del volcán)": 400
                    },
                    grupo: {
                        "Russ Mall": 300,
                        "Interplaza Chimaltenango": 270,
                        "Interplaza Xela": 270,
                        "Finca La Chingada (faldas del volcán)": 230
                    },
                    grupal: {
                        "Russ Mall": 200,
                        "Interplaza Chimaltenango": 180,
                        "Interplaza Xela": 180,
                        "Finca La Chingada (faldas del volcán)": 160
                    }
                },
                itinerario: [
                    {
                        dia: 1,
                        titulo: "Traslado y ascenso nocturno",
                        eventos: [
                            { hora: "3:00 pm", lugar: "Russ Mall", descripcion: "Salida desde el centro comercial Russ Mall, Calzada Roosevelt." },
                            { hora: "4:30 pm", lugar: "Interplaza Chimaltenango", descripcion: "Punto de paso por Interplaza Chimaltenango" },
                            { hora: "7:30 pm", lugar: "Interplaza Xela", descripcion: "Punto de paso por Interplaza Xela" },
                            { hora: "8:00 pm", lugar: "Punto de abordaje 4x4", descripcion: "Llegada al punto de abordaje 4x4." },
                            { hora: "8:30 pm", lugar: "Finca La Chingada (faldas del volcán)", descripcion: "Llegada a las faldas del volcán en trasbordo 4x4." },
                            { hora: "9:00 pm", lugar: "Inicio del ascenso", descripcion: "Comienza la caminata guiada hacia la cumbre." }
                        ]
                    },
                    {
                        dia: 2,
                        titulo: "Amanecer en la cumbre y descenso",
                        eventos: [
                            { hora: "5:00 am", lugar: "Cumbre", descripcion: "Llegada a la cumbre — momento para contemplar el amanecer y las vistas del altiplano y la bocacosta." },
                            { hora: "7:00 am", lugar: "Descenso", descripcion: "Inicio del descenso. La hora de llegada depende del paso del grupo o de la persona, y puedes bajarte en Interplaza Xela, Interplaza Chimaltenango, Russ Mall o cualquier punto del camino de regreso." }
                        ]
                    }
                ]
            },

            atardecer: {
                nombre: "Atardecer",
                duracionDias: 1,
                duracionTexto: "1 día",
                horasCaminata: "6 a 7 horas",
                desnivel: "1400m",
                fechasGrupales: [],
                precios: { // TODO: precios de relleno (copiados del Fuego), pon los reales
                    individual: {
                        "Russ Mall": 400,
                        "Interplaza Chimaltenango": 400,
                        "Interplaza Xela": 400,
                        "Finca La Chingada (faldas del volcán)": 400
                    },
                    grupo: {
                        "Russ Mall": 300,
                        "Interplaza Chimaltenango": 270,
                        "Interplaza Xela": 270,
                        "Finca La Chingada (faldas del volcán)": 230
                    },
                    grupal: {
                        "Russ Mall": 200,
                        "Interplaza Chimaltenango": 180,
                        "Interplaza Xela": 180,
                        "Finca La Chingada (faldas del volcán)": 160
                    }
                },
                itinerario: [
                    {
                        dia: 1,
                        titulo: "Ascenso y Atardecer",
                        eventos: [
                            { hora: "4:30 am", lugar: "Russ Mall", descripcion: "Salida desde el centro comercial Russ Mall, Calzada Roosevelt." },
                            { hora: "6:00 am", lugar: "Interplaza Chimaltenango", descripcion: "Punto de paso por Interplaza Chimaltenango" },
                            { hora: "9:00 am", lugar: "Interplaza Xela", descripcion: "Punto de paso por Interplaza Xela" },
                            { hora: "9:30 am", lugar: "Punto de abordaje 4x4", descripcion: "Llegada al punto de abordaje 4x4." },
                            { hora: "10:00 am", lugar: "Finca La Chingada (faldas del volcán)", descripcion: "Llegada a las faldas del volcán en trasbordo 4x4." },
                            { hora: "10:30 am", lugar: "Inicio del ascenso", descripcion: "Comienza la caminata guiada hacia la cumbre." },
                            { hora: "4:30 pm", lugar: "Cumbre", descripcion: "Llegada a la cumbre — momento para contemplar el atardecer." },
                            { hora: "6:00 pm", lugar: "Descenso", descripcion: "Inicio del descenso. La hora de llegada depende del paso del grupo o de la persona, y puedes bajarte en Interplaza Xela, Interplaza Chimaltenango, Russ Mall o cualquier punto del camino de regreso." }
                        ]
                    }
                ]
            },

            camping: {
                nombre: "Atardecer y Camping",
                duracionDias: 2,
                duracionTexto: "dos días y una noche",
                horasCaminata: "6 a 7 horas",
                desnivel: "1400m",
                fechasGrupales: [],
                precios: { // TODO: precios de relleno (copiados del Fuego), pon los reales
                    individual: {
                        "Russ Mall": 500,
                        "Interplaza Chimaltenango": 500,
                        "Interplaza Xela": 500,
                        "Finca La Chingada (faldas del volcán)": 500
                    },
                    grupo: {
                        "Russ Mall": 400,
                        "Interplaza Chimaltenango": 400,
                        "Interplaza Xela": 400,
                        "Finca La Chingada (faldas del volcán)": 400
                    },
                    grupal: {
                        "Russ Mall": 300,
                        "Interplaza Chimaltenango": 280,
                        "Interplaza Xela": 280,
                        "Finca La Chingada (faldas del volcán)": 260
                    }
                },
                itinerario: [
                    {
                        dia: 1,
                        titulo: "Traslado, ascenso y atardecer",
                        eventos: [
                            { hora: "4:30 am", lugar: "Russ Mall", descripcion: "Salida desde el centro comercial Russ Mall, Calzada Roosevelt." },
                            { hora: "6:00 am", lugar: "Interplaza Chimaltenango", descripcion: "Punto de paso por Interplaza Chimaltenango" },
                            { hora: "9:00 am", lugar: "Interplaza Xela", descripcion: "Punto de paso por Interplaza Xela" },
                            { hora: "9:30 am", lugar: "Punto de abordaje 4x4", descripcion: "Llegada al punto de abordaje 4x4." },
                            { hora: "10:00 am", lugar: "Finca La Chingada (faldas del volcán)", descripcion: "Llegada a las faldas del volcán en trasbordo 4x4." },
                            { hora: "10:30 am", lugar: "Inicio del ascenso", descripcion: "Comienza la caminata guiada hacia la cumbre." },
                            { hora: "4:30 pm", lugar: "Llegada a la zona de camping / cumbre", descripcion: "Armado de tiendas y apreciación del atardecer." }
                        ]
                    },
                    {
                        dia: 2,
                        titulo: "Descenso",
                        eventos: [
                            { hora: "5:00 am", lugar: "Cumbre", descripcion: "Apreciación del amanecer desde la cumbre." },
                            { hora: "7:00 am", lugar: "Levantamiento del campamento", descripcion: "Desayuno y recogida del campamento. Cada persona levanta su tienda y empaca sus cosas para que podamos iniciar el descenso a tiempo." },
                            { hora: "7:30 am", lugar: "Descenso", descripcion: "Inicio del descenso. La hora de llegada depende del paso del grupo o de la persona, y puedes bajarte en Interplaza Xela, Interplaza Chimaltenango, Russ Mall o cualquier punto del camino de regreso." }
                        ]
                    }
                ]
            }
        }
    },

    {
        id: "quemado",
        nombre: "Cerro Quemado",
        region: "Quetzaltenango",
        categoria: "volcanes",
        calificacion: null, // TODO: cuando tengas reseñas reales, pon la calificación
        numeroResenas: 0, // TODO: cuando tengas reseñas reales, actualiza este número
        imagen: "img/quemado.webp", // TODO: sube esta foto

        descripcion: "El Cerro Quemado (también conocido como Volcán de Almolonga) es un complejo de domos de lava de gran valor geológico, histórico y sagrado, situado a pocos minutos de la ciudad de Quetzaltenango. Con una altitud de 3,197 metros sobre el nivel del mar, destaca por su terreno rocoso único compuesto por un gran campo de bloques de lava andesítica formados tras la erupción de 1818. El ascenso conduce a través de cruces y altares ceremoniales mayas y evangélicos hasta alcanzar su cumbre rocosa, la cual ofrece una panorámica espectacular de 360 grados hacia la ciudad de Xela, el Volcán Santa María y el paisaje circundante del altiplano.",

        // --- REQUISITOS Y NIVEL ---
        edadMinima: 15,
        condicionSalud: "Buena condición de salud",
        exigencia: 5, // escala del 1 al 10

        // --- POLÍTICAS ---
        reservaMinima: "El tour se confirma con un mínimo del 50% de la reserva completa.",
        cancelacion: "Cancelación gratuita si se cancela con 48 horas de antelación.",

        responsable: "Bajamos toda nuestra basura, cuidamos el sendero y trabajamos con guías locales.", // TODO: ajusta el texto si quieres

        // --- SERVICIO ---
        guiaIdiomas: ["Español", "Inglés", "Portugués", "Lenguaje de Señas"],
        servicioRecogida: true,

        // --- QUÉ INCLUYE / QUÉ NO ---
        incluye: [
            "Transporte redondo",
            "Snacks",
            "Guía bilingüe (español / inglés)",
            "Servicio de recogida"
        ],
        incluyeOpcional: [
            "Alquiler de equipo (carpa, saco de dormir, bastones)" // costo adicional
        ],
        noIncluye: [
            "Entrada al volcán (Q100 / $13)",
            "Agua"
        ],

        // --- QUÉ DEBE LLEVAR EL CLIENTE ---
        queLlevar: [
            "Ropa abrigada por capas",
            "Calzado de trekking / senderismo",
            "Bastones de senderismo (si no los alquilas con nosotros)",
            "Linterna frontal o de mano",
            "Guantes y gorro",
            "Su equipo personal en general"
        ],

        // --- BLOQUES DE INFORMACIÓN ---
        infoBloques: [
            {
                titulo: "La experiencia",
                items: [
                    "Asciende al Cerro Quemado (3,197 m), un complejo de domos de lava a pocos minutos de Xela",
                    "Camina sobre un campo de bloques de lava de la erupción de 1818 y junto a altares ceremoniales",
                    "Obtén una panorámica de 360 grados de Xela, el Santa María y el altiplano",
                    "Recorrido acompañado en todo momento por guías capacitados"
                ]
            },
            {
                titulo: "Incluido en tu reserva",
                items: [
                    "Transporte de ida y vuelta desde el punto de salida",
                    "Acompañamiento de guía (español / inglés / portugués) durante toda la ruta",
                    "Recogida en el punto acordado",
                    "Snacks, disponibles solo si reservas la modalidad privada",
                    "Posibilidad de rentar equipo (carpa, saco de dormir, bastones, linterna) mediante costo adicional"
                ]
            },
            {
                titulo: "Por tu cuenta",
                items: [
                    "Pago de ingreso al volcán: Q50 residentes / Q100 visitantes extranjeros",
                    "Hidratación (agua) para todo el trayecto",
                    "Comidas principales — el servicio cubre únicamente snacks, y solo en tour privado",
                    "Equipo propio de montaña, salvo que decidas alquilarlo con nosotros"
                ]
            },
            {
                titulo: "Restricciones de participación",
                items: [
                    "Edad mínima: 15 años",
                    "No recomendado en embarazo",
                    "No recomendado con limitaciones de movilidad",
                    "No recomendado con antecedentes cardíacos",
                    "Se requiere condición física razonable"
                ]
            },
            {
                titulo: "Recomendaciones para empacar",
                items: [
                    "Capas de ropa térmica",
                    "Botas o zapatos para terreno irregular",
                    "Bastones de apoyo (rentables con nosotros)",
                    "Linterna de cabeza o de mano",
                    "Gorro y guantes",
                    "Bloqueador solar y lentes oscuros",
                    "Algo extra de comida y agua (2-3 litros sugeridos por persona)",
                    "Artículos básicos de aseo"
                ]
            },
            {
                titulo: "Antes de subir",
                items: [
                    "El sendero incluye tramos exigentes; conviene llegar con condición física adecuada.",
                    "Por las noches la temperatura baja considerablemente, así que el abrigo no es opcional.",
                    "Se aconseja llevar algo de comer extra, ya que el recorrido consume bastante energía.",
                    "Si necesitas equipo prestado, avísanos con anticipación al reservar."
                ]
            }
        ],

        // --- RESEÑAS ---
        // Vacío hasta que tengas reseñas reales (la página muestra "Aún no hay reseñas").
        resenas: [],

        // --- GALERÍA DE FOTOS ---
        fotos: [
            "img/quemado.webp"
            // TODO: agrega más fotos, por ejemplo "img/quemado1.webp", "img/quemado2.webp"... (separadas por coma)
        ],

        // --- PRECIOS (RESPALDO) ---
        precios: { // TODO: precios de relleno (copiados del Fuego), pon los reales
            individual: {
                "Russ Mall": 400,
                "Interplaza Chimaltenango": 400,
                "Interplaza Xela": 400,
                "Cantón Cantonel / Almolonga (faldas del volcán)": 400
            },
            grupo: {
                "Russ Mall": 300,
                "Interplaza Chimaltenango": 270,
                "Interplaza Xela": 270,
                "Cantón Cantonel / Almolonga (faldas del volcán)": 230
            }
        },

        // --- MODALIDADES ---
        modalidadPorDefecto: "amanecer",
        modalidades: {
            amanecer: {
                nombre: "Amanecer (ascenso nocturno)",
                duracionDias: 2,
                duracionTexto: "dos días y una noche",
                horasCaminata: "2 a 3 horas",
                desnivel: "450m",
                fechasGrupales: [],
                precios: { // TODO: precios de relleno (copiados del Fuego), pon los reales
                    individual: {
                        "Russ Mall": 400,
                        "Interplaza Chimaltenango": 400,
                        "Interplaza Xela": 400,
                        "Cantón Cantonel / Almolonga (faldas del volcán)": 400
                    },
                    grupo: {
                        "Russ Mall": 300,
                        "Interplaza Chimaltenango": 270,
                        "Interplaza Xela": 270,
                        "Cantón Cantonel / Almolonga (faldas del volcán)": 230
                    },
                    grupal: {
                        "Russ Mall": 200,
                        "Interplaza Chimaltenango": 180,
                        "Interplaza Xela": 180,
                        "Cantón Cantonel / Almolonga (faldas del volcán)": 160
                    }
                },
                itinerario: [
                    {
                        dia: 1,
                        titulo: "Traslado y ascenso nocturno",
                        eventos: [
                            { hora: "8:00 pm", lugar: "Russ Mall", descripcion: "Salida desde el centro comercial Russ Mall, Calzada Roosevelt." },
                            { hora: "9:30 pm", lugar: "Interplaza Chimaltenango", descripcion: "Punto de paso por Interplaza Chimaltenango" },
                            { hora: "12:30 am", lugar: "Interplaza Xela", descripcion: "Punto de paso por Interplaza Xela" },
                            { hora: "1:00 am", lugar: "Faldas del volcán: Cantón Cantonel / Almolonga", descripcion: "Llegada a las faldas del volcán." },
                            { hora: "1:30 am", lugar: "Inicio del ascenso", descripcion: "Comienza la caminata guiada hacia la cumbre." }
                        ]
                    },
                    {
                        dia: 2,
                        titulo: "Amanecer en la cumbre y descenso",
                        eventos: [
                            { hora: "5:00 am", lugar: "Cumbre", descripcion: "Llegada a la cumbre — momento para contemplar el amanecer y las vistas hacia la ciudad de Xela." },
                            { hora: "7:00 am", lugar: "Descenso", descripcion: "Inicio del descenso. La hora de llegada depende del paso del grupo o de la persona, y puedes bajarte en Interplaza Xela, Interplaza Chimaltenango, Russ Mall o cualquier punto del camino de regreso." }
                        ]
                    }
                ]
            },

            atardecer: {
                nombre: "Atardecer",
                duracionDias: 1,
                duracionTexto: "1 día",
                horasCaminata: "2 a 3 horas",
                desnivel: "450m",
                fechasGrupales: [],
                precios: { // TODO: precios de relleno (copiados del Fuego), pon los reales
                    individual: {
                        "Russ Mall": 400,
                        "Interplaza Chimaltenango": 400,
                        "Interplaza Xela": 400,
                        "Cantón Cantonel / Almolonga (faldas del volcán)": 400
                    },
                    grupo: {
                        "Russ Mall": 300,
                        "Interplaza Chimaltenango": 270,
                        "Interplaza Xela": 270,
                        "Cantón Cantonel / Almolonga (faldas del volcán)": 230
                    },
                    grupal: {
                        "Russ Mall": 200,
                        "Interplaza Chimaltenango": 180,
                        "Interplaza Xela": 180,
                        "Cantón Cantonel / Almolonga (faldas del volcán)": 160
                    }
                },
                itinerario: [
                    {
                        dia: 1,
                        titulo: "Ascenso y Atardecer",
                        eventos: [
                            { hora: "6:00 am", lugar: "Russ Mall", descripcion: "Salida desde el centro comercial Russ Mall, Calzada Roosevelt." },
                            { hora: "7:30 am", lugar: "Interplaza Chimaltenango", descripcion: "Punto de paso por Interplaza Chimaltenango" },
                            { hora: "10:30 am", lugar: "Interplaza Xela", descripcion: "Punto de paso por Interplaza Xela" },
                            { hora: "11:00 am", lugar: "Faldas del volcán: Cantón Cantonel / Almolonga", descripcion: "Llegada a las faldas del volcán." },
                            { hora: "11:30 am", lugar: "Inicio del ascenso", descripcion: "Comienza la caminata guiada hacia la cumbre." },
                            { hora: "4:30 pm", lugar: "Cumbre", descripcion: "Llegada a la cumbre — momento para contemplar el atardecer." },
                            { hora: "6:00 pm", lugar: "Descenso", descripcion: "Inicio del descenso. La hora de llegada depende del paso del grupo o de la persona, y puedes bajarte en Interplaza Xela, Interplaza Chimaltenango, Russ Mall o cualquier punto del camino de regreso." }
                        ]
                    }
                ]
            },

            camping: {
                nombre: "Atardecer y Camping",
                duracionDias: 2,
                duracionTexto: "dos días y una noche",
                horasCaminata: "2 a 3 horas",
                desnivel: "450m",
                fechasGrupales: [],
                precios: { // TODO: precios de relleno (copiados del Fuego), pon los reales
                    individual: {
                        "Russ Mall": 500,
                        "Interplaza Chimaltenango": 500,
                        "Interplaza Xela": 500,
                        "Cantón Cantonel / Almolonga (faldas del volcán)": 500
                    },
                    grupo: {
                        "Russ Mall": 400,
                        "Interplaza Chimaltenango": 400,
                        "Interplaza Xela": 400,
                        "Cantón Cantonel / Almolonga (faldas del volcán)": 400
                    },
                    grupal: {
                        "Russ Mall": 300,
                        "Interplaza Chimaltenango": 280,
                        "Interplaza Xela": 280,
                        "Cantón Cantonel / Almolonga (faldas del volcán)": 260
                    }
                },
                itinerario: [
                    {
                        dia: 1,
                        titulo: "Traslado, ascenso y atardecer",
                        eventos: [
                            { hora: "6:00 am", lugar: "Russ Mall", descripcion: "Salida desde el centro comercial Russ Mall, Calzada Roosevelt." },
                            { hora: "7:30 am", lugar: "Interplaza Chimaltenango", descripcion: "Punto de paso por Interplaza Chimaltenango" },
                            { hora: "10:30 am", lugar: "Interplaza Xela", descripcion: "Punto de paso por Interplaza Xela" },
                            { hora: "11:00 am", lugar: "Faldas del volcán: Cantón Cantonel / Almolonga", descripcion: "Llegada a las faldas del volcán." },
                            { hora: "11:30 am", lugar: "Inicio del ascenso", descripcion: "Comienza la caminata guiada hacia la cumbre." },
                            { hora: "4:30 pm", lugar: "Llegada a la zona de camping / cumbre", descripcion: "Armado de tiendas y apreciación del atardecer." }
                        ]
                    },
                    {
                        dia: 2,
                        titulo: "Descenso",
                        eventos: [
                            { hora: "5:00 am", lugar: "Cumbre", descripcion: "Apreciación del amanecer desde la cumbre." },
                            { hora: "7:00 am", lugar: "Levantamiento del campamento", descripcion: "Desayuno y recogida del campamento. Cada persona levanta su tienda y empaca sus cosas para que podamos iniciar el descenso a tiempo." },
                            { hora: "7:30 am", lugar: "Descenso", descripcion: "Inicio del descenso. La hora de llegada depende del paso del grupo o de la persona, y puedes bajarte en Interplaza Xela, Interplaza Chimaltenango, Russ Mall o cualquier punto del camino de regreso." }
                        ]
                    }
                ]
            }
        }
    },

    {
        id: "chicabal",
        nombre: "Volcán Chicabal",
        region: "Quetzaltenango",
        categoria: "volcanes",
        calificacion: null, // TODO: cuando tengas reseñas reales, pon la calificación
        numeroResenas: 0, // TODO: cuando tengas reseñas reales, actualiza este número
        imagen: "img/chicabal.webp", // TODO: sube esta foto

        descripcion: "El Volcán Chicabal es un sagrado y místico estratovolcán extinto situado en el municipio de San Martín Sacatepéquez, en el departamento de Quetzaltenango. Con una altitud de 2,900 metros sobre el nivel del mar, es famoso por albergar en el fondo de su cráter colapsado a la hermosa y mística Laguna de Chicabal. Rodeado por un denso y exuberante bosque nuboso, este lugar es un centro espiritual sagrado para la cosmovisión maya mam, donde se realizan ceremonias y altares tradicionales. Durante el recorrido, los senderistas ascienden entre la neblina por senderos boscosos hasta el mirador del cráter, desde donde se contempla la laguna rodeada de vegetación y las cumbres vecinas del altiplano.",

        // --- REQUISITOS Y NIVEL ---
        edadMinima: 15,
        condicionSalud: "Buena condición de salud",
        exigencia: 4, // escala del 1 al 10

        // --- POLÍTICAS ---
        reservaMinima: "El tour se confirma con un mínimo del 50% de la reserva completa.",
        cancelacion: "Cancelación gratuita si se cancela con 48 horas de antelación.",

        responsable: "Bajamos toda nuestra basura, cuidamos el sendero y trabajamos con guías locales.", // TODO: ajusta el texto si quieres

        // --- SERVICIO ---
        guiaIdiomas: ["Español", "Inglés", "Portugués", "Lenguaje de Señas"],
        servicioRecogida: true,

        // --- QUÉ INCLUYE / QUÉ NO ---
        incluye: [
            "Transporte redondo",
            "Snacks",
            "Guía bilingüe (español / inglés)",
            "Servicio de recogida"
        ],
        incluyeOpcional: [
            "Alquiler de equipo (carpa, saco de dormir, bastones)" // costo adicional
        ],
        noIncluye: [
            "Entrada al volcán (Q100 / $13)",
            "Agua"
        ],

        // --- QUÉ DEBE LLEVAR EL CLIENTE ---
        queLlevar: [
            "Ropa abrigada por capas",
            "Calzado de trekking / senderismo",
            "Bastones de senderismo (si no los alquilas con nosotros)",
            "Linterna frontal o de mano",
            "Guantes y gorro",
            "Su equipo personal en general"
        ],

        // --- BLOQUES DE INFORMACIÓN ---
        infoBloques: [
            {
                titulo: "La experiencia",
                items: [
                    "Asciende al Volcán Chicabal (2,900 m), sagrado para la cosmovisión maya mam",
                    "Camina entre la neblina y el bosque nuboso hasta el mirador del cráter",
                    "Contempla la mística Laguna de Chicabal rodeada de vegetación",
                    "Recorrido acompañado en todo momento por guías capacitados"
                ]
            },
            {
                titulo: "Incluido en tu reserva",
                items: [
                    "Transporte de ida y vuelta desde el punto de salida",
                    "Acompañamiento de guía (español / inglés / portugués) durante toda la ruta",
                    "Recogida en el punto acordado",
                    "Snacks, disponibles solo si reservas la modalidad privada",
                    "Posibilidad de rentar equipo (carpa, saco de dormir, bastones, linterna) mediante costo adicional"
                ]
            },
            {
                titulo: "Por tu cuenta",
                items: [
                    "Pago de ingreso al volcán: Q50 residentes / Q100 visitantes extranjeros",
                    "Hidratación (agua) para todo el trayecto",
                    "Comidas principales — el servicio cubre únicamente snacks, y solo en tour privado",
                    "Equipo propio de montaña, salvo que decidas alquilarlo con nosotros"
                ]
            },
            {
                titulo: "Restricciones de participación",
                items: [
                    "Edad mínima: 15 años",
                    "No recomendado en embarazo",
                    "No recomendado con limitaciones de movilidad",
                    "No recomendado con antecedentes cardíacos",
                    "Se requiere condición física razonable"
                ]
            },
            {
                titulo: "Recomendaciones para empacar",
                items: [
                    "Capas de ropa térmica",
                    "Botas o zapatos para terreno irregular",
                    "Bastones de apoyo (rentables con nosotros)",
                    "Linterna de cabeza o de mano",
                    "Gorro y guantes",
                    "Bloqueador solar y lentes oscuros",
                    "Algo extra de comida y agua (2-3 litros sugeridos por persona)",
                    "Artículos básicos de aseo"
                ]
            },
            {
                titulo: "Antes de subir",
                items: [
                    "El sendero incluye tramos exigentes; conviene llegar con condición física adecuada.",
                    "Por las noches la temperatura baja considerablemente, así que el abrigo no es opcional.",
                    "Se aconseja llevar algo de comer extra, ya que el recorrido consume bastante energía.",
                    "Si necesitas equipo prestado, avísanos con anticipación al reservar."
                ]
            }
        ],

        // --- RESEÑAS ---
        // Vacío hasta que tengas reseñas reales (la página muestra "Aún no hay reseñas").
        resenas: [],

        // --- GALERÍA DE FOTOS ---
        fotos: [
            "img/chicabal.webp"
            // TODO: agrega más fotos, por ejemplo "img/chicabal1.webp", "img/chicabal2.webp"... (separadas por coma)
        ],

        // --- PRECIOS (RESPALDO) ---
        precios: { // TODO: precios de relleno (copiados del Fuego), pon los reales
            individual: {
                "Russ Mall": 400,
                "Interplaza Chimaltenango": 400,
                "Interplaza Xela": 400,
                "San Martín Sacatepéquez (faldas del volcán)": 400
            },
            grupo: {
                "Russ Mall": 300,
                "Interplaza Chimaltenango": 270,
                "Interplaza Xela": 270,
                "San Martín Sacatepéquez (faldas del volcán)": 230
            }
        },

        // --- MODALIDADES ---
        modalidadPorDefecto: "amanecer",
        modalidades: {
            amanecer: {
                nombre: "Amanecer (ascenso nocturno)",
                duracionDias: 2,
                duracionTexto: "dos días y una noche",
                horasCaminata: "2 a 3 horas",
                desnivel: "500m",
                fechasGrupales: [],
                precios: { // TODO: precios de relleno (copiados del Fuego), pon los reales
                    individual: {
                        "Russ Mall": 400,
                        "Interplaza Chimaltenango": 400,
                        "Interplaza Xela": 400,
                        "San Martín Sacatepéquez (faldas del volcán)": 400
                    },
                    grupo: {
                        "Russ Mall": 300,
                        "Interplaza Chimaltenango": 270,
                        "Interplaza Xela": 270,
                        "San Martín Sacatepéquez (faldas del volcán)": 230
                    },
                    grupal: {
                        "Russ Mall": 200,
                        "Interplaza Chimaltenango": 180,
                        "Interplaza Xela": 180,
                        "San Martín Sacatepéquez (faldas del volcán)": 160
                    }
                },
                itinerario: [
                    {
                        dia: 1,
                        titulo: "Traslado y ascenso nocturno",
                        eventos: [
                            { hora: "8:00 pm", lugar: "Russ Mall", descripcion: "Salida desde el centro comercial Russ Mall, Calzada Roosevelt." },
                            { hora: "9:30 pm", lugar: "Interplaza Chimaltenango", descripcion: "Punto de paso por Interplaza Chimaltenango" },
                            { hora: "12:30 am", lugar: "Interplaza Xela", descripcion: "Punto de paso por Interplaza Xela" },
                            { hora: "1:00 am", lugar: "Faldas del volcán: San Martín Sacatepéquez", descripcion: "Llegada a las faldas del volcán." },
                            { hora: "1:30 am", lugar: "Inicio del ascenso", descripcion: "Comienza la caminata guiada hacia el cráter y el mirador." }
                        ]
                    },
                    {
                        dia: 2,
                        titulo: "Amanecer en la cumbre y descenso",
                        eventos: [
                            { hora: "5:00 am", lugar: "Cumbre", descripcion: "Llegada al mirador del cráter y la laguna — momento para contemplar el amanecer sobre la mística Laguna de Chicabal." },
                            { hora: "7:00 am", lugar: "Descenso", descripcion: "Inicio del descenso. La hora de llegada depende del paso del grupo o de la persona, y puedes bajarte en Interplaza Xela, Interplaza Chimaltenango, Russ Mall o cualquier punto del camino de regreso." }
                        ]
                    }
                ]
            },

            atardecer: {
                nombre: "Atardecer",
                duracionDias: 1,
                duracionTexto: "1 día",
                horasCaminata: "2 a 3 horas",
                desnivel: "500m",
                fechasGrupales: [],
                precios: { // TODO: precios de relleno (copiados del Fuego), pon los reales
                    individual: {
                        "Russ Mall": 400,
                        "Interplaza Chimaltenango": 400,
                        "Interplaza Xela": 400,
                        "San Martín Sacatepéquez (faldas del volcán)": 400
                    },
                    grupo: {
                        "Russ Mall": 300,
                        "Interplaza Chimaltenango": 270,
                        "Interplaza Xela": 270,
                        "San Martín Sacatepéquez (faldas del volcán)": 230
                    },
                    grupal: {
                        "Russ Mall": 200,
                        "Interplaza Chimaltenango": 180,
                        "Interplaza Xela": 180,
                        "San Martín Sacatepéquez (faldas del volcán)": 160
                    }
                },
                itinerario: [
                    {
                        dia: 1,
                        titulo: "Ascenso y Atardecer",
                        eventos: [
                            { hora: "6:00 am", lugar: "Russ Mall", descripcion: "Salida desde el centro comercial Russ Mall, Calzada Roosevelt." },
                            { hora: "7:30 am", lugar: "Interplaza Chimaltenango", descripcion: "Punto de paso por Interplaza Chimaltenango" },
                            { hora: "10:30 am", lugar: "Interplaza Xela", descripcion: "Punto de paso por Interplaza Xela" },
                            { hora: "11:00 am", lugar: "Faldas del volcán: San Martín Sacatepéquez", descripcion: "Llegada a las faldas del volcán." },
                            { hora: "11:30 am", lugar: "Inicio del ascenso", descripcion: "Comienza la caminata guiada hacia la zona de camping y la laguna." },
                            { hora: "4:30 pm", lugar: "Cumbre", descripcion: "Llegada al mirador — momento para contemplar el atardecer sobre la laguna." },
                            { hora: "6:00 pm", lugar: "Descenso", descripcion: "Inicio del descenso. La hora de llegada depende del paso del grupo o de la persona, y puedes bajarte en Interplaza Xela, Interplaza Chimaltenango, Russ Mall o cualquier punto del camino de regreso." }
                        ]
                    }
                ]
            },

            camping: {
                nombre: "Atardecer y Camping",
                duracionDias: 2,
                duracionTexto: "dos días y una noche",
                horasCaminata: "2 a 3 horas",
                desnivel: "500m",
                fechasGrupales: [],
                precios: { // TODO: precios de relleno (copiados del Fuego), pon los reales
                    individual: {
                        "Russ Mall": 500,
                        "Interplaza Chimaltenango": 500,
                        "Interplaza Xela": 500,
                        "San Martín Sacatepéquez (faldas del volcán)": 500
                    },
                    grupo: {
                        "Russ Mall": 400,
                        "Interplaza Chimaltenango": 400,
                        "Interplaza Xela": 400,
                        "San Martín Sacatepéquez (faldas del volcán)": 400
                    },
                    grupal: {
                        "Russ Mall": 300,
                        "Interplaza Chimaltenango": 280,
                        "Interplaza Xela": 280,
                        "San Martín Sacatepéquez (faldas del volcán)": 260
                    }
                },
                itinerario: [
                    {
                        dia: 1,
                        titulo: "Traslado, ascenso y atardecer",
                        eventos: [
                            { hora: "6:00 am", lugar: "Russ Mall", descripcion: "Salida desde el centro comercial Russ Mall, Calzada Roosevelt." },
                            { hora: "7:30 am", lugar: "Interplaza Chimaltenango", descripcion: "Punto de paso por Interplaza Chimaltenango" },
                            { hora: "10:30 am", lugar: "Interplaza Xela", descripcion: "Punto de paso por Interplaza Xela" },
                            { hora: "11:00 am", lugar: "Faldas del volcán: San Martín Sacatepéquez", descripcion: "Llegada a las faldas del volcán." },
                            { hora: "11:30 am", lugar: "Inicio del ascenso", descripcion: "Comienza la caminata guiada hacia la zona de camping y la laguna." },
                            { hora: "4:30 pm", lugar: "Llegada a la zona de camping / cumbre", descripcion: "Armado de tiendas y apreciación del atardecer sobre el cráter." }
                        ]
                    },
                    {
                        dia: 2,
                        titulo: "Descenso",
                        eventos: [
                            { hora: "5:00 am", lugar: "Cumbre", descripcion: "Apreciación del amanecer desde la cumbre." },
                            { hora: "7:00 am", lugar: "Levantamiento del campamento", descripcion: "Desayuno y recogida del campamento. Cada persona levanta su tienda y empaca sus cosas para que podamos iniciar el descenso a tiempo." },
                            { hora: "7:30 am", lugar: "Descenso", descripcion: "Inicio del descenso. La hora de llegada depende del paso del grupo o de la persona, y puedes bajarte en Interplaza Xela, Interplaza Chimaltenango, Russ Mall o cualquier punto del camino de regreso." }
                        ]
                    }
                ]
            }
        }
    },

    {
        id: "cuxliquel",
        nombre: "Cerro Cuxliquel",
        region: "Totonicapán",
        categoria: "volcanes",
        calificacion: null, // TODO: cuando tengas reseñas reales, pon la calificación
        numeroResenas: 0, // TODO: cuando tengas reseñas reales, actualiza este número
        imagen: "img/cuxliquel.webp", // TODO: sube esta foto

        descripcion: "El Cerro Cuxliquel es un accesible y pintoresco domo de origen volcánico ubicado en el departamento de Totonicapán, muy cerca de los límites con Quetzaltenango. Con una altitud de 2,160 metros sobre el nivel del mar, destaca por su caminata amigable rodeada de hermosos bosques de pino, ciprés y áreas de pastizal. Es una ruta ideal para principiantes y senderistas que buscan una experiencia tranquila de montaña, ofreciendo desde su cumbre vistas panorámicas espectaculares del valle de Totonicapán, la ciudad de Xela y la imponente cordillera volcánica del altiplano occidental.",

        // --- REQUISITOS Y NIVEL ---
        edadMinima: 15,
        condicionSalud: "Buena condición de salud",
        exigencia: 3, // escala del 1 al 10

        // --- POLÍTICAS ---
        reservaMinima: "El tour se confirma con un mínimo del 50% de la reserva completa.",
        cancelacion: "Cancelación gratuita si se cancela con 48 horas de antelación.",

        responsable: "Bajamos toda nuestra basura, cuidamos el sendero y trabajamos con guías locales.", // TODO: ajusta el texto si quieres

        // --- SERVICIO ---
        guiaIdiomas: ["Español", "Inglés", "Portugués", "Lenguaje de Señas"],
        servicioRecogida: true,

        // --- QUÉ INCLUYE / QUÉ NO ---
        incluye: [
            "Transporte redondo",
            "Snacks",
            "Guía bilingüe (español / inglés)",
            "Servicio de recogida"
        ],
        incluyeOpcional: [
            "Alquiler de equipo (carpa, saco de dormir, bastones)" // costo adicional
        ],
        noIncluye: [
            "Entrada al volcán (Q100 / $13)",
            "Agua"
        ],

        // --- QUÉ DEBE LLEVAR EL CLIENTE ---
        queLlevar: [
            "Ropa abrigada por capas",
            "Calzado de trekking / senderismo",
            "Bastones de senderismo (si no los alquilas con nosotros)",
            "Linterna frontal o de mano",
            "Guantes y gorro",
            "Su equipo personal en general"
        ],

        // --- BLOQUES DE INFORMACIÓN ---
        infoBloques: [
            {
                titulo: "La experiencia",
                items: [
                    "Sube al Cerro Cuxliquel (2,160 m), una caminata amigable ideal para principiantes",
                    "Recorre bosques de pino, ciprés y áreas de pastizal",
                    "Disfruta vistas del valle de Totonicapán, la ciudad de Xela y la cordillera volcánica del occidente",
                    "Recorrido acompañado en todo momento por guías capacitados"
                ]
            },
            {
                titulo: "Incluido en tu reserva",
                items: [
                    "Transporte de ida y vuelta desde el punto de salida",
                    "Acompañamiento de guía (español / inglés / portugués) durante toda la ruta",
                    "Recogida en el punto acordado",
                    "Snacks, disponibles solo si reservas la modalidad privada",
                    "Posibilidad de rentar equipo (carpa, saco de dormir, bastones, linterna) mediante costo adicional"
                ]
            },
            {
                titulo: "Por tu cuenta",
                items: [
                    "Pago de ingreso al volcán: Q50 residentes / Q100 visitantes extranjeros",
                    "Hidratación (agua) para todo el trayecto",
                    "Comidas principales — el servicio cubre únicamente snacks, y solo en tour privado",
                    "Equipo propio de montaña, salvo que decidas alquilarlo con nosotros"
                ]
            },
            {
                titulo: "Restricciones de participación",
                items: [
                    "Edad mínima: 15 años",
                    "No recomendado en embarazo",
                    "No recomendado con limitaciones de movilidad",
                    "No recomendado con antecedentes cardíacos",
                    "Se requiere condición física razonable"
                ]
            },
            {
                titulo: "Recomendaciones para empacar",
                items: [
                    "Capas de ropa térmica",
                    "Botas o zapatos para terreno irregular",
                    "Bastones de apoyo (rentables con nosotros)",
                    "Linterna de cabeza o de mano",
                    "Gorro y guantes",
                    "Bloqueador solar y lentes oscuros",
                    "Algo extra de comida y agua (2-3 litros sugeridos por persona)",
                    "Artículos básicos de aseo"
                ]
            },
            {
                titulo: "Antes de subir",
                items: [
                    "El sendero incluye tramos exigentes; conviene llegar con condición física adecuada.",
                    "Por las noches la temperatura baja considerablemente, así que el abrigo no es opcional.",
                    "Se aconseja llevar algo de comer extra, ya que el recorrido consume bastante energía.",
                    "Si necesitas equipo prestado, avísanos con anticipación al reservar."
                ]
            }
        ],

        // --- RESEÑAS ---
        // Vacío hasta que tengas reseñas reales (la página muestra "Aún no hay reseñas").
        resenas: [],

        // --- GALERÍA DE FOTOS ---
        fotos: [
            "img/cuxliquel.webp"
            // TODO: agrega más fotos, por ejemplo "img/cuxliquel1.webp", "img/cuxliquel2.webp"... (separadas por coma)
        ],

        // --- PRECIOS (RESPALDO) ---
        precios: { // TODO: precios de relleno (copiados del Fuego), pon los reales
            individual: {
                "Russ Mall": 400,
                "Interplaza Chimaltenango": 400,
                "Interplaza Xela": 400,
                "Totonicapán (faldas del cerro)": 400
            },
            grupo: {
                "Russ Mall": 300,
                "Interplaza Chimaltenango": 270,
                "Interplaza Xela": 270,
                "Totonicapán (faldas del cerro)": 230
            }
        },

        // --- MODALIDADES ---
        modalidadPorDefecto: "amanecer",
        modalidades: {
            amanecer: {
                nombre: "Amanecer (ascenso nocturno)",
                duracionDias: 2,
                duracionTexto: "dos días y una noche",
                horasCaminata: "1.5 a 2 horas",
                desnivel: "300m",
                fechasGrupales: [],
                precios: { // TODO: precios de relleno (copiados del Fuego), pon los reales
                    individual: {
                        "Russ Mall": 400,
                        "Interplaza Chimaltenango": 400,
                        "Interplaza Xela": 400,
                        "Totonicapán (faldas del cerro)": 400
                    },
                    grupo: {
                        "Russ Mall": 300,
                        "Interplaza Chimaltenango": 270,
                        "Interplaza Xela": 270,
                        "Totonicapán (faldas del cerro)": 230
                    },
                    grupal: {
                        "Russ Mall": 200,
                        "Interplaza Chimaltenango": 180,
                        "Interplaza Xela": 180,
                        "Totonicapán (faldas del cerro)": 160
                    }
                },
                itinerario: [
                    {
                        dia: 1,
                        titulo: "Traslado y ascenso nocturno",
                        eventos: [
                            { hora: "10:00 pm", lugar: "Russ Mall", descripcion: "Salida desde el centro comercial Russ Mall, Calzada Roosevelt." },
                            { hora: "11:30 pm", lugar: "Interplaza Chimaltenango", descripcion: "Punto de paso por Interplaza Chimaltenango" },
                            { hora: "2:30 am", lugar: "Interplaza Xela", descripcion: "Punto de paso por Interplaza Xela" },
                            { hora: "3:00 am", lugar: "Faldas del volcán: Totonicapán", descripcion: "Llegada a las faldas del volcán." },
                            { hora: "3:30 am", lugar: "Inicio del ascenso", descripcion: "Comienza la caminata guiada hacia la cumbre." }
                        ]
                    },
                    {
                        dia: 2,
                        titulo: "Amanecer en la cumbre y descenso",
                        eventos: [
                            { hora: "5:00 am", lugar: "Cumbre", descripcion: "Llegada a la cumbre — momento para contemplar el amanecer y las vistas del valle de Totonicapán." },
                            { hora: "7:00 am", lugar: "Descenso", descripcion: "Inicio del descenso. La hora de llegada depende del paso del grupo o de la persona, y puedes bajarte en Interplaza Xela, Interplaza Chimaltenango, Russ Mall o cualquier punto del camino de regreso." }
                        ]
                    }
                ]
            },

            atardecer: {
                nombre: "Atardecer",
                duracionDias: 1,
                duracionTexto: "1 día",
                horasCaminata: "1.5 a 2 horas",
                desnivel: "300m",
                fechasGrupales: [],
                precios: { // TODO: precios de relleno (copiados del Fuego), pon los reales
                    individual: {
                        "Russ Mall": 400,
                        "Interplaza Chimaltenango": 400,
                        "Interplaza Xela": 400,
                        "Totonicapán (faldas del cerro)": 400
                    },
                    grupo: {
                        "Russ Mall": 300,
                        "Interplaza Chimaltenango": 270,
                        "Interplaza Xela": 270,
                        "Totonicapán (faldas del cerro)": 230
                    },
                    grupal: {
                        "Russ Mall": 200,
                        "Interplaza Chimaltenango": 180,
                        "Interplaza Xela": 180,
                        "Totonicapán (faldas del cerro)": 160
                    }
                },
                itinerario: [
                    {
                        dia: 1,
                        titulo: "Ascenso y Atardecer",
                        eventos: [
                            { hora: "7:00 am", lugar: "Russ Mall", descripcion: "Salida desde el centro comercial Russ Mall, Calzada Roosevelt." },
                            { hora: "8:30 am", lugar: "Interplaza Chimaltenango", descripcion: "Punto de paso por Interplaza Chimaltenango" },
                            { hora: "11:30 am", lugar: "Interplaza Xela", descripcion: "Punto de paso por Interplaza Xela" },
                            { hora: "12:00 pm", lugar: "Faldas del volcán: Totonicapán", descripcion: "Llegada a las faldas del volcán." },
                            { hora: "12:30 pm", lugar: "Inicio del ascenso", descripcion: "Comienza la caminata guiada hacia la zona de camping." },
                            { hora: "4:30 pm", lugar: "Cumbre", descripcion: "Llegada a la cumbre — momento para contemplar el atardecer." },
                            { hora: "6:00 pm", lugar: "Descenso", descripcion: "Inicio del descenso. La hora de llegada depende del paso del grupo o de la persona, y puedes bajarte en Interplaza Xela, Interplaza Chimaltenango, Russ Mall o cualquier punto del camino de regreso." }
                        ]
                    }
                ]
            },

            camping: {
                nombre: "Atardecer y Camping",
                duracionDias: 2,
                duracionTexto: "dos días y una noche",
                horasCaminata: "1.5 a 2 horas",
                desnivel: "300m",
                fechasGrupales: [],
                precios: { // TODO: precios de relleno (copiados del Fuego), pon los reales
                    individual: {
                        "Russ Mall": 500,
                        "Interplaza Chimaltenango": 500,
                        "Interplaza Xela": 500,
                        "Totonicapán (faldas del cerro)": 500
                    },
                    grupo: {
                        "Russ Mall": 400,
                        "Interplaza Chimaltenango": 400,
                        "Interplaza Xela": 400,
                        "Totonicapán (faldas del cerro)": 400
                    },
                    grupal: {
                        "Russ Mall": 300,
                        "Interplaza Chimaltenango": 280,
                        "Interplaza Xela": 280,
                        "Totonicapán (faldas del cerro)": 260
                    }
                },
                itinerario: [
                    {
                        dia: 1,
                        titulo: "Traslado, ascenso y atardecer",
                        eventos: [
                            { hora: "7:00 am", lugar: "Russ Mall", descripcion: "Salida desde el centro comercial Russ Mall, Calzada Roosevelt." },
                            { hora: "8:30 am", lugar: "Interplaza Chimaltenango", descripcion: "Punto de paso por Interplaza Chimaltenango" },
                            { hora: "11:30 am", lugar: "Interplaza Xela", descripcion: "Punto de paso por Interplaza Xela" },
                            { hora: "12:00 pm", lugar: "Faldas del volcán: Totonicapán", descripcion: "Llegada a las faldas del volcán." },
                            { hora: "12:30 pm", lugar: "Inicio del ascenso", descripcion: "Comienza la caminata guiada hacia la zona de camping." },
                            { hora: "4:30 pm", lugar: "Llegada a la zona de camping / cumbre", descripcion: "Armado de tiendas y apreciación del atardecer." }
                        ]
                    },
                    {
                        dia: 2,
                        titulo: "Descenso",
                        eventos: [
                            { hora: "5:00 am", lugar: "Cumbre", descripcion: "Apreciación del amanecer desde la cumbre." },
                            { hora: "7:00 am", lugar: "Levantamiento del campamento", descripcion: "Desayuno y recogida del campamento. Cada persona levanta su tienda y empaca sus cosas para que podamos iniciar el descenso a tiempo." },
                            { hora: "7:30 am", lugar: "Descenso", descripcion: "Inicio del descenso. La hora de llegada depende del paso del grupo o de la persona, y puedes bajarte en Interplaza Xela, Interplaza Chimaltenango, Russ Mall o cualquier punto del camino de regreso." }
                        ]
                    }
                ]
            }
        }
    },

    {
        id: "lacandon",
        nombre: "Volcán Lacandón",
        region: "Quetzaltenango",
        categoria: "volcanes",
        calificacion: null, // TODO: cuando tengas reseñas reales, pon la calificación
        numeroResenas: 0, // TODO: cuando tengas reseñas reales, actualiza este número
        imagen: "img/lacandon.webp", // TODO: sube esta foto

        descripcion: "El Volcán Lacandón es un antiguo y pintoresco estratovolcán extinto ubicado en el departamento de Quetzaltenango, entre los municipios de Ostuncalco y Concepción Chiquirichapa. Con una altitud de 2,740 metros sobre el nivel del mar, destaca por su forma cónica y por estar rodeado de fértiles campos agrícolas y hermosos bosques de pino-encino. El ascenso a través de sus senderos rurales ofrece una caminata tranquila y poco concurrida, ideal para quienes buscan conectar con la naturaleza del altiplano. Desde su cumbre se disfrutan panorámicas espectaculares del valle de Quetzaltenango, así como de las cumbres vecinas del Siete Orejas, Chicabal y el imponente Volcán Santa María.",

        // --- REQUISITOS Y NIVEL ---
        edadMinima: 15,
        condicionSalud: "Buena condición de salud",
        exigencia: 5, // escala del 1 al 10

        // --- POLÍTICAS ---
        reservaMinima: "El tour se confirma con un mínimo del 50% de la reserva completa.",
        cancelacion: "Cancelación gratuita si se cancela con 48 horas de antelación.",

        responsable: "Bajamos toda nuestra basura, cuidamos el sendero y trabajamos con guías locales.", // TODO: ajusta el texto si quieres

        // --- SERVICIO ---
        guiaIdiomas: ["Español", "Inglés", "Portugués", "Lenguaje de Señas"],
        servicioRecogida: true,

        // --- QUÉ INCLUYE / QUÉ NO ---
        incluye: [
            "Transporte redondo",
            "Snacks",
            "Guía bilingüe (español / inglés)",
            "Servicio de recogida"
        ],
        incluyeOpcional: [
            "Alquiler de equipo (carpa, saco de dormir, bastones)" // costo adicional
        ],
        noIncluye: [
            "Entrada al volcán (Q100 / $13)",
            "Agua"
        ],

        // --- QUÉ DEBE LLEVAR EL CLIENTE ---
        queLlevar: [
            "Ropa abrigada por capas",
            "Calzado de trekking / senderismo",
            "Bastones de senderismo (si no los alquilas con nosotros)",
            "Linterna frontal o de mano",
            "Guantes y gorro",
            "Su equipo personal en general"
        ],

        // --- BLOQUES DE INFORMACIÓN ---
        infoBloques: [
            {
                titulo: "La experiencia",
                items: [
                    "Asciende al Volcán Lacandón (2,740 m), un cono tranquilo y poco concurrido",
                    "Camina entre campos agrícolas fértiles y bosques de pino y encino",
                    "Mira el valle de Quetzaltenango, el Siete Orejas, el Chicabal y el Santa María desde la cumbre",
                    "Recorrido acompañado en todo momento por guías capacitados"
                ]
            },
            {
                titulo: "Incluido en tu reserva",
                items: [
                    "Transporte de ida y vuelta desde el punto de salida",
                    "Acompañamiento de guía (español / inglés / portugués) durante toda la ruta",
                    "Recogida en el punto acordado",
                    "Snacks, disponibles solo si reservas la modalidad privada",
                    "Posibilidad de rentar equipo (carpa, saco de dormir, bastones, linterna) mediante costo adicional"
                ]
            },
            {
                titulo: "Por tu cuenta",
                items: [
                    "Pago de ingreso al volcán: Q50 residentes / Q100 visitantes extranjeros",
                    "Hidratación (agua) para todo el trayecto",
                    "Comidas principales — el servicio cubre únicamente snacks, y solo en tour privado",
                    "Equipo propio de montaña, salvo que decidas alquilarlo con nosotros"
                ]
            },
            {
                titulo: "Restricciones de participación",
                items: [
                    "Edad mínima: 15 años",
                    "No recomendado en embarazo",
                    "No recomendado con limitaciones de movilidad",
                    "No recomendado con antecedentes cardíacos",
                    "Se requiere condición física razonable"
                ]
            },
            {
                titulo: "Recomendaciones para empacar",
                items: [
                    "Capas de ropa térmica",
                    "Botas o zapatos para terreno irregular",
                    "Bastones de apoyo (rentables con nosotros)",
                    "Linterna de cabeza o de mano",
                    "Gorro y guantes",
                    "Bloqueador solar y lentes oscuros",
                    "Algo extra de comida y agua (2-3 litros sugeridos por persona)",
                    "Artículos básicos de aseo"
                ]
            },
            {
                titulo: "Antes de subir",
                items: [
                    "El sendero incluye tramos exigentes; conviene llegar con condición física adecuada.",
                    "Por las noches la temperatura baja considerablemente, así que el abrigo no es opcional.",
                    "Se aconseja llevar algo de comer extra, ya que el recorrido consume bastante energía.",
                    "Si necesitas equipo prestado, avísanos con anticipación al reservar."
                ]
            }
        ],

        // --- RESEÑAS ---
        // Vacío hasta que tengas reseñas reales (la página muestra "Aún no hay reseñas").
        resenas: [],

        // --- GALERÍA DE FOTOS ---
        fotos: [
            "img/lacandon.webp"
            // TODO: agrega más fotos, por ejemplo "img/lacandon1.webp", "img/lacandon2.webp"... (separadas por coma)
        ],

        // --- PRECIOS (RESPALDO) ---
        precios: { // TODO: precios de relleno (copiados del Fuego), pon los reales
            individual: {
                "Russ Mall": 400,
                "Interplaza Chimaltenango": 400,
                "Interplaza Xela": 400,
                "Ostuncalco / Concepción Chiquirichapa (faldas del volcán)": 400
            },
            grupo: {
                "Russ Mall": 300,
                "Interplaza Chimaltenango": 270,
                "Interplaza Xela": 270,
                "Ostuncalco / Concepción Chiquirichapa (faldas del volcán)": 230
            }
        },

        // --- MODALIDADES ---
        modalidadPorDefecto: "amanecer",
        modalidades: {
            amanecer: {
                nombre: "Amanecer (ascenso nocturno)",
                duracionDias: 2,
                duracionTexto: "dos días y una noche",
                horasCaminata: "3 a 4 horas",
                desnivel: "650m",
                fechasGrupales: [],
                precios: { // TODO: precios de relleno (copiados del Fuego), pon los reales
                    individual: {
                        "Russ Mall": 400,
                        "Interplaza Chimaltenango": 400,
                        "Interplaza Xela": 400,
                        "Ostuncalco / Concepción Chiquirichapa (faldas del volcán)": 400
                    },
                    grupo: {
                        "Russ Mall": 300,
                        "Interplaza Chimaltenango": 270,
                        "Interplaza Xela": 270,
                        "Ostuncalco / Concepción Chiquirichapa (faldas del volcán)": 230
                    },
                    grupal: {
                        "Russ Mall": 200,
                        "Interplaza Chimaltenango": 180,
                        "Interplaza Xela": 180,
                        "Ostuncalco / Concepción Chiquirichapa (faldas del volcán)": 160
                    }
                },
                itinerario: [
                    {
                        dia: 1,
                        titulo: "Traslado y ascenso nocturno",
                        eventos: [
                            { hora: "8:00 pm", lugar: "Russ Mall", descripcion: "Salida desde el centro comercial Russ Mall, Calzada Roosevelt." },
                            { hora: "9:30 pm", lugar: "Interplaza Chimaltenango", descripcion: "Punto de paso por Interplaza Chimaltenango" },
                            { hora: "12:30 am", lugar: "Interplaza Xela", descripcion: "Punto de paso por Interplaza Xela" },
                            { hora: "1:00 am", lugar: "Faldas del volcán: Ostuncalco / Concepción Chiquirichapa", descripcion: "Llegada a las faldas del volcán." },
                            { hora: "1:30 am", lugar: "Inicio del ascenso", descripcion: "Comienza la caminata guiada hacia la cumbre." }
                        ]
                    },
                    {
                        dia: 2,
                        titulo: "Amanecer en la cumbre y descenso",
                        eventos: [
                            { hora: "5:00 am", lugar: "Cumbre", descripcion: "Llegada a la cumbre — momento para contemplar el amanecer y las vistas del altiplano occidental." },
                            { hora: "7:00 am", lugar: "Descenso", descripcion: "Inicio del descenso. La hora de llegada depende del paso del grupo o de la persona, y puedes bajarte en Interplaza Xela, Interplaza Chimaltenango, Russ Mall o cualquier punto del camino de regreso." }
                        ]
                    }
                ]
            },

            atardecer: {
                nombre: "Atardecer",
                duracionDias: 1,
                duracionTexto: "1 día",
                horasCaminata: "3 a 4 horas",
                desnivel: "650m",
                fechasGrupales: [],
                precios: { // TODO: precios de relleno (copiados del Fuego), pon los reales
                    individual: {
                        "Russ Mall": 400,
                        "Interplaza Chimaltenango": 400,
                        "Interplaza Xela": 400,
                        "Ostuncalco / Concepción Chiquirichapa (faldas del volcán)": 400
                    },
                    grupo: {
                        "Russ Mall": 300,
                        "Interplaza Chimaltenango": 270,
                        "Interplaza Xela": 270,
                        "Ostuncalco / Concepción Chiquirichapa (faldas del volcán)": 230
                    },
                    grupal: {
                        "Russ Mall": 200,
                        "Interplaza Chimaltenango": 180,
                        "Interplaza Xela": 180,
                        "Ostuncalco / Concepción Chiquirichapa (faldas del volcán)": 160
                    }
                },
                itinerario: [
                    {
                        dia: 1,
                        titulo: "Ascenso y Atardecer",
                        eventos: [
                            { hora: "6:00 am", lugar: "Russ Mall", descripcion: "Salida desde el centro comercial Russ Mall, Calzada Roosevelt." },
                            { hora: "7:30 am", lugar: "Interplaza Chimaltenango", descripcion: "Punto de paso por Interplaza Chimaltenango" },
                            { hora: "10:30 am", lugar: "Interplaza Xela", descripcion: "Punto de paso por Interplaza Xela" },
                            { hora: "11:00 am", lugar: "Faldas del volcán: Ostuncalco / Concepción Chiquirichapa", descripcion: "Llegada a las faldas del volcán." },
                            { hora: "11:30 am", lugar: "Inicio del ascenso", descripcion: "Comienza la caminata guiada hacia la zona de camping y la cumbre." },
                            { hora: "4:30 pm", lugar: "Cumbre", descripcion: "Llegada a la cumbre — momento para contemplar el atardecer." },
                            { hora: "6:00 pm", lugar: "Descenso", descripcion: "Inicio del descenso. La hora de llegada depende del paso del grupo o de la persona, y puedes bajarte en Interplaza Xela, Interplaza Chimaltenango, Russ Mall o cualquier punto del camino de regreso." }
                        ]
                    }
                ]
            },

            camping: {
                nombre: "Atardecer y Camping",
                duracionDias: 2,
                duracionTexto: "dos días y una noche",
                horasCaminata: "3 a 4 horas",
                desnivel: "650m",
                fechasGrupales: [],
                precios: { // TODO: precios de relleno (copiados del Fuego), pon los reales
                    individual: {
                        "Russ Mall": 500,
                        "Interplaza Chimaltenango": 500,
                        "Interplaza Xela": 500,
                        "Ostuncalco / Concepción Chiquirichapa (faldas del volcán)": 500
                    },
                    grupo: {
                        "Russ Mall": 400,
                        "Interplaza Chimaltenango": 400,
                        "Interplaza Xela": 400,
                        "Ostuncalco / Concepción Chiquirichapa (faldas del volcán)": 400
                    },
                    grupal: {
                        "Russ Mall": 300,
                        "Interplaza Chimaltenango": 280,
                        "Interplaza Xela": 280,
                        "Ostuncalco / Concepción Chiquirichapa (faldas del volcán)": 260
                    }
                },
                itinerario: [
                    {
                        dia: 1,
                        titulo: "Traslado, ascenso y atardecer",
                        eventos: [
                            { hora: "6:00 am", lugar: "Russ Mall", descripcion: "Salida desde el centro comercial Russ Mall, Calzada Roosevelt." },
                            { hora: "7:30 am", lugar: "Interplaza Chimaltenango", descripcion: "Punto de paso por Interplaza Chimaltenango" },
                            { hora: "10:30 am", lugar: "Interplaza Xela", descripcion: "Punto de paso por Interplaza Xela" },
                            { hora: "11:00 am", lugar: "Faldas del volcán: Ostuncalco / Concepción Chiquirichapa", descripcion: "Llegada a las faldas del volcán." },
                            { hora: "11:30 am", lugar: "Inicio del ascenso", descripcion: "Comienza la caminata guiada hacia la zona de camping y la cumbre." },
                            { hora: "4:30 pm", lugar: "Llegada a la zona de camping / cumbre", descripcion: "Armado de tiendas y apreciación del atardecer." }
                        ]
                    },
                    {
                        dia: 2,
                        titulo: "Descenso",
                        eventos: [
                            { hora: "5:00 am", lugar: "Cumbre", descripcion: "Apreciación del amanecer desde la cumbre." },
                            { hora: "7:00 am", lugar: "Levantamiento del campamento", descripcion: "Desayuno y recogida del campamento. Cada persona levanta su tienda y empaca sus cosas para que podamos iniciar el descenso a tiempo." },
                            { hora: "7:30 am", lugar: "Descenso", descripcion: "Inicio del descenso. La hora de llegada depende del paso del grupo o de la persona, y puedes bajarte en Interplaza Xela, Interplaza Chimaltenango, Russ Mall o cualquier punto del camino de regreso." }
                        ]
                    }
                ]
            }
        }
    },

    {
        id: "san-antonio",
        nombre: "Volcán San Antonio (Saquibutz)",
        region: "San Marcos",
        categoria: "volcanes",
        calificacion: null, // TODO: cuando tengas reseñas reales, pon la calificación
        numeroResenas: 0, // TODO: cuando tengas reseñas reales, actualiza este número
        imagen: "img/sanantonio.webp", // TODO: sube esta foto

        descripcion: "El Volcán San Antonio (también conocido como Saquibutz) es un pequeño y encantador domo o cono volcánico ubicado en el departamento de San Marcos. Con una altitud de 2,543 metros sobre el nivel del mar, destaca por su ascenso accesible, corto y rodeado de paisajes agrícolas y bosques de pino. Por su corta extensión y menor exigencia física, esta cumbre habitualmente se realiza combinada o en conjunto con la expedición al majestuoso Volcán Tajumulco, permitiendo a los senderistas sumar una cumbre adicional en la misma región. Desde su parte alta se obtienen vistas espectaculares del altiplano marquense y de las grandes masas volcánicas del occidente.",

        // --- REQUISITOS Y NIVEL ---
        edadMinima: 15,
        condicionSalud: "Buena condición de salud",
        exigencia: 3, // escala del 1 al 10

        // --- POLÍTICAS ---
        reservaMinima: "El tour se confirma con un mínimo del 50% de la reserva completa.",
        cancelacion: "Cancelación gratuita si se cancela con 48 horas de antelación.",

        responsable: "Bajamos toda nuestra basura, cuidamos el sendero y trabajamos con guías locales.", // TODO: ajusta el texto si quieres

        // --- SERVICIO ---
        guiaIdiomas: ["Español", "Inglés", "Portugués", "Lenguaje de Señas"],
        servicioRecogida: true,

        // --- QUÉ INCLUYE / QUÉ NO ---
        incluye: [
            "Transporte redondo",
            "Snacks",
            "Guía bilingüe (español / inglés)",
            "Servicio de recogida"
        ],
        incluyeOpcional: [
            "Alquiler de equipo (carpa, saco de dormir, bastones)" // costo adicional
        ],
        noIncluye: [
            "Entrada al volcán (Q100 / $13)",
            "Agua"
        ],

        // --- QUÉ DEBE LLEVAR EL CLIENTE ---
        queLlevar: [
            "Ropa abrigada por capas",
            "Calzado de trekking / senderismo",
            "Bastones de senderismo (si no los alquilas con nosotros)",
            "Linterna frontal o de mano",
            "Guantes y gorro",
            "Su equipo personal en general"
        ],

        // --- BLOQUES DE INFORMACIÓN ---
        infoBloques: [
            {
                titulo: "La experiencia",
                items: [
                    "Sube al Volcán San Antonio (Saquibutz, 2,543 m), un cono corto y accesible",
                    "Recorre paisajes agrícolas y bosques de pino",
                    "Combínalo con la expedición al Tajumulco y suma una cumbre más en la misma región",
                    "Recorrido acompañado en todo momento por guías capacitados"
                ]
            },
            {
                titulo: "Incluido en tu reserva",
                items: [
                    "Transporte de ida y vuelta desde el punto de salida",
                    "Acompañamiento de guía (español / inglés / portugués) durante toda la ruta",
                    "Recogida en el punto acordado",
                    "Snacks, disponibles solo si reservas la modalidad privada",
                    "Posibilidad de rentar equipo (carpa, saco de dormir, bastones, linterna) mediante costo adicional"
                ]
            },
            {
                titulo: "Por tu cuenta",
                items: [
                    "Pago de ingreso al volcán: Q50 residentes / Q100 visitantes extranjeros",
                    "Hidratación (agua) para todo el trayecto",
                    "Comidas principales — el servicio cubre únicamente snacks, y solo en tour privado",
                    "Equipo propio de montaña, salvo que decidas alquilarlo con nosotros"
                ]
            },
            {
                titulo: "Restricciones de participación",
                items: [
                    "Edad mínima: 15 años",
                    "No recomendado en embarazo",
                    "No recomendado con limitaciones de movilidad",
                    "No recomendado con antecedentes cardíacos",
                    "Se requiere condición física razonable"
                ]
            },
            {
                titulo: "Recomendaciones para empacar",
                items: [
                    "Capas de ropa térmica",
                    "Botas o zapatos para terreno irregular",
                    "Bastones de apoyo (rentables con nosotros)",
                    "Linterna de cabeza o de mano",
                    "Gorro y guantes",
                    "Bloqueador solar y lentes oscuros",
                    "Algo extra de comida y agua (2-3 litros sugeridos por persona)",
                    "Artículos básicos de aseo"
                ]
            },
            {
                titulo: "Antes de subir",
                items: [
                    "El sendero es corto pero inclinado en algunos tramos; conviene llevar calzado adecuado.",
                    "Por las noches la temperatura baja considerablemente, así que el abrigo no es opcional.",
                    "Se aconseja llevar algo de comer extra, ya que el recorrido consume energía.",
                    "Si necesitas equipo prestado, avísanos con anticipación al reservar.",
                    "Nota: al ser una cumbre corta, esta ruta frecuentemente se programa en combo o acompañamiento con la expedición al Volcán Tajumulco."
                ]
            }
        ],

        // --- RESEÑAS ---
        // Vacío hasta que tengas reseñas reales (la página muestra "Aún no hay reseñas").
        resenas: [],

        // --- GALERÍA DE FOTOS ---
        fotos: [
            "img/sanantonio.webp"
            // TODO: agrega más fotos, por ejemplo "img/sanantonio1.webp", "img/sanantonio2.webp"... (separadas por coma)
        ],

        // --- PRECIOS (RESPALDO) ---
        precios: { // TODO: precios de relleno (copiados del Fuego), pon los reales
            individual: {
                "Russ Mall": 400,
                "Interplaza Chimaltenango": 400,
                "Interplaza Xela": 400,
                "San Antonio Sacatepéquez (faldas del volcán)": 400
            },
            grupo: {
                "Russ Mall": 300,
                "Interplaza Chimaltenango": 270,
                "Interplaza Xela": 270,
                "San Antonio Sacatepéquez (faldas del volcán)": 230
            }
        },

        // --- MODALIDADES ---
        modalidadPorDefecto: "amanecer",
        modalidades: {
            amanecer: {
                nombre: "Amanecer (ascenso nocturno)",
                duracionDias: 2,
                duracionTexto: "dos días y una noche",
                horasCaminata: "1.5 a 2 horas",
                desnivel: "350m",
                fechasGrupales: [],
                precios: { // TODO: precios de relleno (copiados del Fuego), pon los reales
                    individual: {
                        "Russ Mall": 400,
                        "Interplaza Chimaltenango": 400,
                        "Interplaza Xela": 400,
                        "San Antonio Sacatepéquez (faldas del volcán)": 400
                    },
                    grupo: {
                        "Russ Mall": 300,
                        "Interplaza Chimaltenango": 270,
                        "Interplaza Xela": 270,
                        "San Antonio Sacatepéquez (faldas del volcán)": 230
                    },
                    grupal: {
                        "Russ Mall": 200,
                        "Interplaza Chimaltenango": 180,
                        "Interplaza Xela": 180,
                        "San Antonio Sacatepéquez (faldas del volcán)": 160
                    }
                },
                itinerario: [
                    {
                        dia: 1,
                        titulo: "Traslado y ascenso nocturno",
                        eventos: [
                            { hora: "8:00 pm", lugar: "Russ Mall", descripcion: "Salida desde el centro comercial Russ Mall, Calzada Roosevelt." },
                            { hora: "9:30 pm", lugar: "Interplaza Chimaltenango", descripcion: "Punto de paso por Interplaza Chimaltenango" },
                            { hora: "12:30 am", lugar: "Interplaza Xela", descripcion: "Punto de paso por Interplaza Xela" },
                            { hora: "2:30 am", lugar: "Faldas del volcán: San Antonio Sacatepéquez", descripcion: "Llegada a las faldas del volcán." },
                            { hora: "3:00 am", lugar: "Inicio del ascenso", descripcion: "Comienza la caminata guiada hacia la cumbre." }
                        ]
                    },
                    {
                        dia: 2,
                        titulo: "Amanecer en la cumbre y descenso",
                        eventos: [
                            { hora: "5:00 am", lugar: "Cumbre", descripcion: "Llegada a la cumbre — momento para contemplar el amanecer y las vistas del altiplano marquense." },
                            { hora: "7:00 am", lugar: "Descenso", descripcion: "Inicio del descenso. La hora de llegada depende del paso del grupo o de la persona, y puedes bajarte en Interplaza Xela, Interplaza Chimaltenango, Russ Mall o cualquier punto del camino de regreso." }
                        ]
                    }
                ]
            },

            atardecer: {
                nombre: "Atardecer",
                duracionDias: 1,
                duracionTexto: "1 día",
                horasCaminata: "1.5 a 2 horas",
                desnivel: "350m",
                fechasGrupales: [],
                precios: { // TODO: precios de relleno (copiados del Fuego), pon los reales
                    individual: {
                        "Russ Mall": 400,
                        "Interplaza Chimaltenango": 400,
                        "Interplaza Xela": 400,
                        "San Antonio Sacatepéquez (faldas del volcán)": 400
                    },
                    grupo: {
                        "Russ Mall": 300,
                        "Interplaza Chimaltenango": 270,
                        "Interplaza Xela": 270,
                        "San Antonio Sacatepéquez (faldas del volcán)": 230
                    },
                    grupal: {
                        "Russ Mall": 200,
                        "Interplaza Chimaltenango": 180,
                        "Interplaza Xela": 180,
                        "San Antonio Sacatepéquez (faldas del volcán)": 160
                    }
                },
                itinerario: [
                    {
                        dia: 1,
                        titulo: "Ascenso y Atardecer",
                        eventos: [
                            { hora: "5:00 am", lugar: "Russ Mall", descripcion: "Salida desde el centro comercial Russ Mall, Calzada Roosevelt." },
                            { hora: "6:30 am", lugar: "Interplaza Chimaltenango", descripcion: "Punto de paso por Interplaza Chimaltenango" },
                            { hora: "9:30 am", lugar: "Interplaza Xela", descripcion: "Punto de paso por Interplaza Xela" },
                            { hora: "11:30 am", lugar: "Faldas del volcán: San Antonio Sacatepéquez", descripcion: "Llegada a las faldas del volcán." },
                            { hora: "12:00 pm", lugar: "Inicio del ascenso", descripcion: "Comienza la caminata guiada hacia la zona de camping y la cumbre." },
                            { hora: "4:30 pm", lugar: "Cumbre", descripcion: "Llegada a la cumbre — momento para contemplar el atardecer." },
                            { hora: "6:00 pm", lugar: "Descenso", descripcion: "Inicio del descenso. La hora de llegada depende del paso del grupo o de la persona, y puedes bajarte en Interplaza Xela, Interplaza Chimaltenango, Russ Mall o cualquier punto del camino de regreso." }
                        ]
                    }
                ]
            },

            camping: {
                nombre: "Atardecer y Camping",
                duracionDias: 2,
                duracionTexto: "dos días y una noche",
                horasCaminata: "1.5 a 2 horas",
                desnivel: "350m",
                fechasGrupales: [],
                precios: { // TODO: precios de relleno (copiados del Fuego), pon los reales
                    individual: {
                        "Russ Mall": 500,
                        "Interplaza Chimaltenango": 500,
                        "Interplaza Xela": 500,
                        "San Antonio Sacatepéquez (faldas del volcán)": 500
                    },
                    grupo: {
                        "Russ Mall": 400,
                        "Interplaza Chimaltenango": 400,
                        "Interplaza Xela": 400,
                        "San Antonio Sacatepéquez (faldas del volcán)": 400
                    },
                    grupal: {
                        "Russ Mall": 300,
                        "Interplaza Chimaltenango": 280,
                        "Interplaza Xela": 280,
                        "San Antonio Sacatepéquez (faldas del volcán)": 260
                    }
                },
                itinerario: [
                    {
                        dia: 1,
                        titulo: "Traslado, ascenso y atardecer",
                        eventos: [
                            { hora: "5:00 am", lugar: "Russ Mall", descripcion: "Salida desde el centro comercial Russ Mall, Calzada Roosevelt." },
                            { hora: "6:30 am", lugar: "Interplaza Chimaltenango", descripcion: "Punto de paso por Interplaza Chimaltenango" },
                            { hora: "9:30 am", lugar: "Interplaza Xela", descripcion: "Punto de paso por Interplaza Xela" },
                            { hora: "11:30 am", lugar: "Faldas del volcán: San Antonio Sacatepéquez", descripcion: "Llegada a las faldas del volcán." },
                            { hora: "12:00 pm", lugar: "Inicio del ascenso", descripcion: "Comienza la caminata guiada hacia la zona de camping y la cumbre." },
                            { hora: "4:30 pm", lugar: "Llegada a la zona de camping / cumbre", descripcion: "Armado de tiendas y apreciación del atardecer." }
                        ]
                    },
                    {
                        dia: 2,
                        titulo: "Descenso",
                        eventos: [
                            { hora: "5:00 am", lugar: "Cumbre", descripcion: "Apreciación del amanecer desde la cumbre." },
                            { hora: "7:00 am", lugar: "Levantamiento del campamento", descripcion: "Desayuno y recogida del campamento. Cada persona levanta su tienda y empaca sus cosas para que podamos iniciar el descenso a tiempo." },
                            { hora: "7:30 am", lugar: "Descenso", descripcion: "Inicio del descenso. La hora de llegada depende del paso del grupo o de la persona, y puedes bajarte en Interplaza Xela, Interplaza Chimaltenango, Russ Mall o cualquier punto del camino de regreso." }
                        ]
                    }
                ]
            }
        }
    },

    {
        id: "tecuamburro",
        nombre: "Volcán Tecuamburro",
        region: "Santa Rosa",
        categoria: "volcanes",
        calificacion: null, // TODO: cuando tengas reseñas reales, pon la calificación
        numeroResenas: 0, // TODO: cuando tengas reseñas reales, actualiza este número
        imagen: "img/tecuamburro.webp",

        descripcion: "El Volcán Tecuamburro es un estratovolcán complejo y extinto ubicado en el departamento de Santa Rosa, en los municipios de Pueblo Nuevo Viñas, Barberena y Taxisco. Con una altitud de 1,845 metros sobre el nivel del mar, destaca por su entorno exuberante caracterizado por plantaciones de café, fincas agrícolas y densas áreas de vegetación subtropical. Un atractivo especial de esta montaña es su actividad geotérmica latente, observable en la naciente de aguas termales y azufradas en sus inmediaciones, como la famosa Laguna de Ixpaco al pie del complejo. La caminata hacia su cima es amigable y rodeada de sombra, ofreciendo desde sus miradores vistas espectaculares hacia la costa del Pacífico y los valles de Santa Rosa.",

        // --- REQUISITOS Y NIVEL ---
        edadMinima: 15,
        condicionSalud: "Buena condición de salud",
        exigencia: 4, // escala del 1 al 10

        // --- POLÍTICAS ---
        reservaMinima: "El tour se confirma con un mínimo del 50% de la reserva completa.",
        cancelacion: "Cancelación gratuita si se cancela con 48 horas de antelación.",

        responsable: "Bajamos toda nuestra basura, cuidamos el sendero y trabajamos con guías locales.", // TODO: ajusta el texto si quieres

        // --- SERVICIO ---
        guiaIdiomas: ["Español", "Inglés", "Portugués", "Lenguaje de Señas"],
        servicioRecogida: true,

        // --- QUÉ INCLUYE / QUÉ NO ---
        incluye: [
            "Transporte redondo",
            "Snacks",
            "Guía bilingüe (español / inglés)",
            "Servicio de recogida"
        ],
        incluyeOpcional: [
            "Alquiler de equipo (carpa, saco de dormir, bastones)" // costo adicional
        ],
        noIncluye: [
            "Entrada al volcán (Q100 / $13)",
            "Agua"
        ],

        // --- QUÉ DEBE LLEVAR EL CLIENTE ---
        queLlevar: [
            "Ropa cómoda y abrigo ligero para la noche",
            "Calzado de trekking / senderismo",
            "Bastones de senderismo (si no los alquilas con nosotros)",
            "Linterna frontal o de mano",
            "Guantes y gorro",
            "Repelente de insectos y bloqueador solar",
            "Su equipo personal en general"
        ],

        // --- BLOQUES DE INFORMACIÓN ---
        infoBloques: [
            {
                titulo: "La experiencia",
                items: [
                    "Asciende al Volcán Tecuamburro (1,845 m), rodeado de cafetales y vegetación subtropical",
                    "Camina por un sendero amigable y con sombra, cerca de las aguas termales y la Laguna de Ixpaco",
                    "Mira la costa del Pacífico y los valles de Santa Rosa desde sus miradores",
                    "Recorrido acompañado en todo momento por guías capacitados"
                ]
            },
            {
                titulo: "Incluido en tu reserva",
                items: [
                    "Transporte de ida y vuelta desde el punto de salida",
                    "Acompañamiento de guía (español / inglés / portugués) durante toda la ruta",
                    "Recogida en el punto acordado",
                    "Snacks, disponibles solo si reservas la modalidad privada",
                    "Posibilidad de rentar equipo (carpa, saco de dormir, bastones, linterna) mediante costo adicional"
                ]
            },
            {
                titulo: "Por tu cuenta",
                items: [
                    "Pago de ingreso al volcán: Q50 residentes / Q100 visitantes extranjeros",
                    "Hidratación (agua) para todo el trayecto",
                    "Comidas principales — el servicio cubre únicamente snacks, y solo en tour privado",
                    "Equipo propio de montaña, salvo que decidas alquilarlo con nosotros"
                ]
            },
            {
                titulo: "Restricciones de participación",
                items: [
                    "Edad mínima: 15 años",
                    "No recomendado en embarazo",
                    "No recomendado con limitaciones de movilidad",
                    "No recomendado con antecedentes cardíacos",
                    "Se requiere condición física razonable"
                ]
            },
            {
                titulo: "Recomendaciones para empacar",
                items: [
                    "Capas de ropa cómoda y abrigo ligero para la noche",
                    "Botas o zapatos para terreno irregular",
                    "Bastones de apoyo (rentables con nosotros)",
                    "Linterna de cabeza o de mano",
                    "Gorro y guantes",
                    "Repelente de insectos y bloqueador solar",
                    "Algo extra de comida y agua (2-3 litros sugeridos por persona)",
                    "Artículos básicos de aseo"
                ]
            },
            {
                titulo: "Antes de subir",
                items: [
                    "El clima en Santa Rosa suele ser más cálido en la base, pero refresca en la cumbre durante la noche.",
                    "Es conveniente llevar calzado con buen agarre por tramos húmedos o de hojarasca.",
                    "Se aconseja llevar algo de comer extra, ya que el recorrido consume energía.",
                    "Si necesitas equipo prestado, avísanos con anticipación al reservar.",
                    "Para esta ruta hacia el sur-oriente no se realizan paradas en las Interplazas del occidente; la salida es solo desde Russ Mall."
                ]
            }
        ],

        // --- RESEÑAS ---
        // Vacío hasta que tengas reseñas reales (la página muestra "Aún no hay reseñas").
        resenas: [],

        // --- GALERÍA DE FOTOS ---
        fotos: [
            "img/tecuamburro.webp"
            // TODO: agrega más fotos, por ejemplo "img/tecuamburro1.webp", "img/tecuamburro2.webp"... (separadas por coma)
        ],

        // --- PRECIOS (RESPALDO) ---
        precios: { // TODO: precios de relleno (copiados del Fuego), pon los reales
            individual: {
                "Russ Mall": 400,
                "Pueblo Nuevo Viñas / Barberena (faldas del volcán)": 400
            },
            grupo: {
                "Russ Mall": 300,
                "Pueblo Nuevo Viñas / Barberena (faldas del volcán)": 230
            }
        },

        // --- MODALIDADES ---
        modalidadPorDefecto: "amanecer",
        modalidades: {
            amanecer: {
                nombre: "Amanecer (ascenso nocturno)",
                duracionDias: 2,
                duracionTexto: "dos días y una noche",
                horasCaminata: "2 a 3 horas",
                desnivel: "450m",
                fechasGrupales: [],
                precios: { // TODO: precios de relleno (copiados del Fuego), pon los reales
                    individual: {
                        "Russ Mall": 400,
                        "Pueblo Nuevo Viñas / Barberena (faldas del volcán)": 400
                    },
                    grupo: {
                        "Russ Mall": 300,
                        "Pueblo Nuevo Viñas / Barberena (faldas del volcán)": 230
                    },
                    grupal: {
                        "Russ Mall": 200,
                        "Pueblo Nuevo Viñas / Barberena (faldas del volcán)": 160
                    }
                },
                itinerario: [
                    {
                        dia: 1,
                        titulo: "Traslado y ascenso nocturno",
                        eventos: [
                            { hora: "11:00 pm", lugar: "Russ Mall", descripcion: "Salida desde el centro comercial Russ Mall, Calzada Roosevelt." },
                            { hora: "1:30 am", lugar: "Faldas del volcán: Pueblo Nuevo Viñas / Barberena", descripcion: "Llegada a las faldas del volcán." },
                            { hora: "2:00 am", lugar: "Inicio del ascenso", descripcion: "Comienza la caminata guiada hacia la cumbre." }
                        ]
                    },
                    {
                        dia: 2,
                        titulo: "Amanecer en la cumbre y descenso",
                        eventos: [
                            { hora: "5:00 am", lugar: "Cumbre", descripcion: "Llegada a la cumbre — momento para contemplar el amanecer y las vistas del departamento de Santa Rosa y la costa sur." },
                            { hora: "7:00 am", lugar: "Descenso", descripcion: "Inicio del descenso. La hora de llegada depende del paso del grupo o de la persona, y puedes bajarte en Russ Mall o cualquier punto del camino de regreso." }
                        ]
                    }
                ]
            },

            atardecer: {
                nombre: "Atardecer",
                duracionDias: 1,
                duracionTexto: "1 día",
                horasCaminata: "2 a 3 horas",
                desnivel: "450m",
                fechasGrupales: [],
                precios: { // TODO: precios de relleno (copiados del Fuego), pon los reales
                    individual: {
                        "Russ Mall": 400,
                        "Pueblo Nuevo Viñas / Barberena (faldas del volcán)": 400
                    },
                    grupo: {
                        "Russ Mall": 300,
                        "Pueblo Nuevo Viñas / Barberena (faldas del volcán)": 230
                    },
                    grupal: {
                        "Russ Mall": 200,
                        "Pueblo Nuevo Viñas / Barberena (faldas del volcán)": 160
                    }
                },
                itinerario: [
                    {
                        dia: 1,
                        titulo: "Ascenso y Atardecer",
                        eventos: [
                            { hora: "8:00 am", lugar: "Russ Mall", descripcion: "Salida desde el centro comercial Russ Mall, Calzada Roosevelt." },
                            { hora: "10:30 am", lugar: "Faldas del volcán: Pueblo Nuevo Viñas / Barberena", descripcion: "Llegada a las faldas del volcán." },
                            { hora: "11:00 am", lugar: "Inicio del ascenso", descripcion: "Comienza la caminata guiada hacia la zona de camping y la cumbre." },
                            { hora: "4:30 pm", lugar: "Cumbre", descripcion: "Llegada a la cumbre — momento para contemplar el atardecer." },
                            { hora: "6:00 pm", lugar: "Descenso", descripcion: "Inicio del descenso. La hora de llegada depende del paso del grupo o de la persona, y puedes bajarte en Russ Mall o cualquier punto del camino de regreso." }
                        ]
                    }
                ]
            },

            camping: {
                nombre: "Atardecer y Camping",
                duracionDias: 2,
                duracionTexto: "dos días y una noche",
                horasCaminata: "2 a 3 horas",
                desnivel: "450m",
                fechasGrupales: [],
                precios: { // TODO: precios de relleno (copiados del Fuego), pon los reales
                    individual: {
                        "Russ Mall": 500,
                        "Pueblo Nuevo Viñas / Barberena (faldas del volcán)": 500
                    },
                    grupo: {
                        "Russ Mall": 400,
                        "Pueblo Nuevo Viñas / Barberena (faldas del volcán)": 400
                    },
                    grupal: {
                        "Russ Mall": 300,
                        "Pueblo Nuevo Viñas / Barberena (faldas del volcán)": 260
                    }
                },
                itinerario: [
                    {
                        dia: 1,
                        titulo: "Traslado, ascenso y atardecer",
                        eventos: [
                            { hora: "8:00 am", lugar: "Russ Mall", descripcion: "Salida desde el centro comercial Russ Mall, Calzada Roosevelt." },
                            { hora: "10:30 am", lugar: "Faldas del volcán: Pueblo Nuevo Viñas / Barberena", descripcion: "Llegada a las faldas del volcán." },
                            { hora: "11:00 am", lugar: "Inicio del ascenso", descripcion: "Comienza la caminata guiada hacia la zona de camping y la cumbre." },
                            { hora: "4:30 pm", lugar: "Llegada a la zona de camping / cumbre", descripcion: "Armado de tiendas y apreciación del atardecer." }
                        ]
                    },
                    {
                        dia: 2,
                        titulo: "Descenso",
                        eventos: [
                            { hora: "5:00 am", lugar: "Cumbre", descripcion: "Apreciación del amanecer desde la cumbre." },
                            { hora: "7:00 am", lugar: "Levantamiento del campamento", descripcion: "Desayuno y recogida del campamento. Cada persona levanta su tienda y empaca sus cosas para que podamos iniciar el descenso a tiempo." },
                            { hora: "7:30 am", lugar: "Descenso", descripcion: "Inicio del descenso. La hora de llegada depende del paso del grupo o de la persona, y puedes bajarte en Russ Mall o cualquier punto del camino de regreso." }
                        ]
                    }
                ]
            }
        }
    },

    // ==========================================
    // DESTINOS DE PRUEBA (borra este bloque cuando tengas los reales)
    // ==========================================




    
    {
        id: "tajumulco",
        nombre: "Volcán Tajumulco",
        region: "San Marcos",
        categoria: "volcanes",
        calificacion: null, // TODO: cuando tengas reseñas reales, pon la calificación
        numeroResenas: 0, // TODO: cuando tengas reseñas reales, actualiza este número
        imagen: "img/tajumulco.webp", // TODO: sube esta foto

        descripcion: "El Volcán Tajumulco es el punto más alto de Guatemala y de toda Centroamérica, elevándose majestuosamente a 4,220 metros sobre el nivel del mar en el departamento de San Marcos. Cuenta con un acercamiento en vehículo 4x4 que aproxima al grupo por los caminos de montaña hasta la zona base de inicio, optimizando la caminata a aproximadamente 4 horas de ascenso amigable con un desnivel acumulado de 793 metros. El sendero atraviesa pintorescos bosques de pino, extensos prados alpinos y zonas de alta montaña hasta alcanzar su imponente cráter principal. Llegar a la cima del gigante centroamericano ofrece una recompensa visual inigualable: una vista panorámica de 360 grados sobre la cadena volcánica guatemalteca, el altiplano occidental, la costa del Pacífico e incluso el territorio mexicano.",

        // --- REQUISITOS Y NIVEL ---
        edadMinima: 15,
        condicionSalud: "Buena condición de salud",
        exigencia: 4, // escala del 1 al 10

        // --- POLÍTICAS ---
        reservaMinima: "El tour se confirma con un mínimo del 50% de la reserva completa.",
        cancelacion: "Cancelación gratuita si se cancela con 48 horas de antelación.",

        responsable: "Bajamos toda nuestra basura, cuidamos el sendero y trabajamos con guías locales.", // TODO: ajusta el texto si quieres

        // --- SERVICIO ---
        guiaIdiomas: ["Español", "Inglés", "Portugués", "Lenguaje de Señas"],
        servicioRecogida: true,

        // --- QUÉ INCLUYE / QUÉ NO ---
        incluye: [
            "Transporte redondo",
            "Trasbordo en vehículo 4x4 hasta el punto de inicio",
            "Snacks",
            "Guía bilingüe (español / inglés)",
            "Servicio de recogida"
        ],
        incluyeOpcional: [
            "Alquiler de equipo (carpa, saco de dormir, bastones)" // costo adicional
        ],
        noIncluye: [
            "Entrada al volcán (Q100 / $13)",
            "Agua"
        ],

        // --- QUÉ DEBE LLEVAR EL CLIENTE ---
        queLlevar: [
            "Ropa abrigada de alta montaña por capas",
            "Calzado de trekking / senderismo",
            "Bastones de senderismo (si no los alquilas con nosotros)",
            "Linterna frontal o de mano",
            "Guantes, gorro y bufanda de invierno",
            "Su equipo personal en general"
        ],

        // --- BLOQUES DE INFORMACIÓN ---
        infoBloques: [
            {
                titulo: "La experiencia",
                items: [
                    "Conquista el techo de Centroamérica: Volcán Tajumulco (4,220 m)",
                    "Acercamiento en vehículo 4x4 hasta la base para una caminata amigable de 4 horas",
                    "Atraviesa bosques de pino, prados alpinos y la zona de alta montaña",
                    "Disfruta de vistas espectaculares hacia la cadena volcánica, la costa y México",
                    "Recorrido acompañado en todo momento por guías capacitados"
                ]
            },
            {
                titulo: "Incluido en tu reserva",
                items: [
                    "Transporte de ida y vuelta desde el punto de salida",
                    "Trasbordo en vehículo 4x4 hasta el punto de inicio de la caminata",
                    "Acompañamiento de guía (español / inglés / portugués) durante toda la ruta",
                    "Recogida en el punto acordado",
                    "Snacks, disponibles solo si reservas la modalidad privada",
                    "Posibilidad de rentar equipo (carpa, saco de dormir, bastones, linterna) mediante costo adicional"
                ]
            },
            {
                titulo: "Por tu cuenta",
                items: [
                    "Pago de ingreso al volcán: Q50 residentes / Q100 visitantes extranjeros",
                    "Hidratación (agua) para todo el trayecto",
                    "Comidas principales — el servicio cubre únicamente snacks, y solo en tour privado",
                    "Equipo propio de montaña, salvo que decidas alquilarlo con nosotros"
                ]
            },
            {
                titulo: "Restricciones de participación",
                items: [
                    "Edad mínima: 15 años",
                    "No recomendado en embarazo",
                    "No recomendado con limitaciones de movilidad",
                    "No recomendado con antecedentes cardíacos",
                    "Se requiere condición física razonable"
                ]
            },
            {
                titulo: "Recomendaciones para empacar",
                items: [
                    "Capas de ropa térmica de alta montaña (el frío en la cumbre suele ser bajo cero)",
                    "Botas o zapatos para terreno irregular",
                    "Bastones de apoyo (rentables con nosotros)",
                    "Linterna de cabeza o de mano",
                    "Gorro, guantes y bufanda de invierno",
                    "Bloqueador solar y lentes oscuros",
                    "Algo extra de comida y agua (2-3 litros sugeridos por persona)",
                    "Artículos básicos de aseo"
                ]
            },
            {
                titulo: "Antes de subir",
                items: [
                    "Al ser el punto de mayor altitud del país, las temperaturas bajan significativamente bajo cero durante la noche; el abrigo adecuado de alta montaña es indispensable.",
                    "Aunque la caminata en esta ruta acortada es accesible (4/10) gracias al desnivel moderado (793 m), la altitud puede sentirse, por lo que se recomienda hidratarse bien.",
                    "Se aconseja llevar snacks calóricos y suficiente agua para el trayecto.",
                    "Si necesitas equipo prestado, avísanos con anticipación al reservar."
                ]
            }
        ],

        // --- RESEÑAS ---
        // Vacío hasta que tengas reseñas reales (la página muestra "Aún no hay reseñas").
        resenas: [],

        // --- GALERÍA DE FOTOS ---
        fotos: [
            "img/tajumulco.webp"
            // TODO: agrega más fotos, por ejemplo "img/tajumulco1.webp", "img/tajumulco2.webp"... (separadas por coma)
        ],

        // --- PRECIOS (RESPALDO) ---
        precios: { // TODO: precios de relleno (copiados del Fuego), pon los reales
            individual: {
                "Russ Mall": 400,
                "Interplaza Chimaltenango": 400,
                "Interplaza Xela": 400,
                "Base 4x4 Tajumulco (faldas del volcán)": 400
            },
            grupo: {
                "Russ Mall": 300,
                "Interplaza Chimaltenango": 270,
                "Interplaza Xela": 270,
                "Base 4x4 Tajumulco (faldas del volcán)": 230
            }
        },

        // --- MODALIDADES ---
        modalidadPorDefecto: "amanecer",
        modalidades: {
            amanecer: {
                nombre: "Amanecer (ascenso nocturno)",
                duracionDias: 2,
                duracionTexto: "dos días y una noche",
                horasCaminata: "4 horas",
                desnivel: "793m",
                fechasGrupales: [
       { fecha: "2026-11-28", cupos: 12 }, ],
                precios: { // TODO: precios de relleno (copiados del Fuego), pon los reales
                    individual: {
                        "Russ Mall": 400,
                        "Interplaza Chimaltenango": 400,
                        "Interplaza Xela": 400,
                        "Base 4x4 Tajumulco (faldas del volcán)": 400
                    },
                    grupo: {
                        "Russ Mall": 300,
                        "Interplaza Chimaltenango": 270,
                        "Interplaza Xela": 270,
                        "Base 4x4 Tajumulco (faldas del volcán)": 230
                    },
                    grupal: {
                        "Russ Mall": 200,
                        "Interplaza Chimaltenango": 180,
                        "Interplaza Xela": 180,
                        "Base 4x4 Tajumulco (faldas del volcán)": 160
                    }
                },
                itinerario: [
                    {
                        dia: 1,
                        titulo: "Traslado y ascenso nocturno",
                        eventos: [
                            { hora: "3:00 pm", lugar: "Russ Mall", descripcion: "Salida desde el centro comercial Russ Mall, Calzada Roosevelt." },
                            { hora: "4:30 pm", lugar: "Interplaza Chimaltenango", descripcion: "Punto de paso por Interplaza Chimaltenango" },
                            { hora: "7:30 pm", lugar: "Interplaza Xela", descripcion: "Punto de paso por Interplaza Xela" },
                            { hora: "11:30 pm", lugar: "Punto de abordaje 4x4", descripcion: "Llegada al punto de abordaje del transporte 4x4." },
                            { hora: "12:00 am", lugar: "Faldas del volcán", descripcion: "Llegada a la base de inicio del ascenso en trasbordo 4x4." },
                            { hora: "12:30 am", lugar: "Inicio del ascenso", descripcion: "Comienza la caminata guiada hacia la cumbre." }
                        ]
                    },
                    {
                        dia: 2,
                        titulo: "Amanecer en la cumbre y descenso",
                        eventos: [
                            { hora: "5:00 am", lugar: "Cumbre", descripcion: "Llegada a la cima de Centroamérica — momento para contemplar el amanecer desde el punto más alto de la región." },
                            { hora: "7:00 am", lugar: "Descenso", descripcion: "Inicio del descenso hacia el vehículo. La hora de llegada depende del paso del grupo o de la persona, y puedes bajarte en Interplaza Xela, Interplaza Chimaltenango, Russ Mall o cualquier punto del camino de regreso." }
                        ]
                    }
                ]
            },

            atardecer: {
                nombre: "Atardecer",
                duracionDias: 1,
                duracionTexto: "1 día",
                horasCaminata: "4 horas",
                desnivel: "793m",
                fechasGrupales: [],
                precios: { // TODO: precios de relleno (copiados del Fuego), pon los reales
                    individual: {
                        "Russ Mall": 400,
                        "Interplaza Chimaltenango": 400,
                        "Interplaza Xela": 400,
                        "Base 4x4 Tajumulco (faldas del volcán)": 400
                    },
                    grupo: {
                        "Russ Mall": 300,
                        "Interplaza Chimaltenango": 270,
                        "Interplaza Xela": 270,
                        "Base 4x4 Tajumulco (faldas del volcán)": 230
                    },
                    grupal: {
                        "Russ Mall": 200,
                        "Interplaza Chimaltenango": 180,
                        "Interplaza Xela": 180,
                        "Base 4x4 Tajumulco (faldas del volcán)": 160
                    }
                },
                itinerario: [
                    {
                        dia: 1,
                        titulo: "Ascenso y Atardecer",
                        eventos: [
                            { hora: "2:00 am", lugar: "Russ Mall", descripcion: "Salida desde el centro comercial Russ Mall, Calzada Roosevelt." },
                            { hora: "3:30 am", lugar: "Interplaza Chimaltenango", descripcion: "Punto de paso por Interplaza Chimaltenango" },
                            { hora: "6:30 am", lugar: "Interplaza Xela", descripcion: "Punto de paso por Interplaza Xela" },
                            { hora: "10:30 am", lugar: "Punto de abordaje 4x4", descripcion: "Llegada al punto de abordaje del transporte 4x4." },
                            { hora: "11:00 am", lugar: "Faldas del volcán", descripcion: "Llegada a la base de inicio del ascenso en trasbordo 4x4." },
                            { hora: "11:30 am", lugar: "Inicio del ascenso", descripcion: "Comienza la caminata guiada hacia la cumbre." },
                            { hora: "4:30 pm", lugar: "Cumbre", descripcion: "Llegada a la cima de Centroamérica — momento para contemplar el atardecer." },
                            { hora: "6:00 pm", lugar: "Descenso", descripcion: "Inicio del descenso. La hora de llegada depende del paso del grupo o de la persona, y puedes bajarte en Interplaza Xela, Interplaza Chimaltenango, Russ Mall o cualquier punto del camino de regreso." }
                        ]
                    }
                ]
            },

            camping: {
                nombre: "Atardecer y Camping",
                duracionDias: 2,
                duracionTexto: "dos días y una noche",
                horasCaminata: "4 horas",
                desnivel: "793m",
                fechasGrupales: [],
                precios: { // TODO: precios de relleno (copiados del Fuego), pon los reales
                    individual: {
                        "Russ Mall": 500,
                        "Interplaza Chimaltenango": 500,
                        "Interplaza Xela": 500,
                        "Base 4x4 Tajumulco (faldas del volcán)": 500
                    },
                    grupo: {
                        "Russ Mall": 400,
                        "Interplaza Chimaltenango": 400,
                        "Interplaza Xela": 400,
                        "Base 4x4 Tajumulco (faldas del volcán)": 400
                    },
                    grupal: {
                        "Russ Mall": 300,
                        "Interplaza Chimaltenango": 280,
                        "Interplaza Xela": 280,
                        "Base 4x4 Tajumulco (faldas del volcán)": 260
                    }
                },
                itinerario: [
                    {
                        dia: 1,
                        titulo: "Traslado, ascenso y atardecer",
                        eventos: [
                            { hora: "2:00 am", lugar: "Russ Mall", descripcion: "Salida desde el centro comercial Russ Mall, Calzada Roosevelt." },
                            { hora: "3:30 am", lugar: "Interplaza Chimaltenango", descripcion: "Punto de paso por Interplaza Chimaltenango" },
                            { hora: "6:30 am", lugar: "Interplaza Xela", descripcion: "Punto de paso por Interplaza Xela" },
                            { hora: "10:30 am", lugar: "Punto de abordaje 4x4", descripcion: "Llegada al punto de abordaje del transporte 4x4." },
                            { hora: "11:00 am", lugar: "Faldas del volcán", descripcion: "Llegada a la base de inicio del ascenso en trasbordo 4x4." },
                            { hora: "11:30 am", lugar: "Inicio del ascenso", descripcion: "Comienza la caminata guiada hacia la zona de camping y la cumbre." },
                            { hora: "4:30 pm", lugar: "Llegada a la zona de camping / cumbre", descripcion: "Armado de tiendas y apreciación del atardecer sobre las nubes." }
                        ]
                    },
                    {
                        dia: 2,
                        titulo: "Descenso",
                        eventos: [
                            { hora: "5:00 am", lugar: "Cumbre", descripcion: "Apreciación del amanecer desde la cumbre." },
                            { hora: "7:00 am", lugar: "Levantamiento del campamento", descripcion: "Desayuno y recogida del campamento. Cada persona levanta su tienda y empaca sus cosas para que podamos iniciar el descenso a tiempo." },
                            { hora: "7:30 am", lugar: "Descenso", descripcion: "Inicio del descenso. La hora de llegada depende del paso del grupo o de la persona, y puedes bajarte en Interplaza Xela, Interplaza Chimaltenango, Russ Mall o cualquier punto del camino de regreso." }
                        ]
                    }
                ]
            }
        }
    },
            {
        id: "rostro-maya",
        nombre: "Rostro Maya",
        region: "Sololá",
        categoria: "lugares",
        calificacion: null, // TODO: cuando tengas reseñas reales, pon la calificación
        numeroResenas: 0, // TODO: cuando tengas reseñas reales, actualiza este número
        imagen: "img/rostromaya.webp", // TODO: sube esta foto

        descripcion: "El Rostro Maya es un mirador natural en las alturas de Santa Clara la Laguna, en Sololá, desde donde se contempla el perfil de un rostro maya tallado por la montaña frente al Lago de Atitlán y sus volcanes. Se llega tras una caminata corta y accesible de aproximadamente 45 minutos que inicia de madrugada, para disfrutar del amanecer sobre el lago y quedarse unas horas arriba. Después del descenso, el día continúa con una visita a San Juan la Laguna, donde hay tiempo para recorrer el pueblo y almorzar antes de regresar a la Ciudad de Guatemala.",

        // --- REQUISITOS Y NIVEL ---
        edadMinima: 5, // TODO: ajusta la edad mínima real
        condicionSalud: "Condición física básica",
        exigencia: 2, // escala del 1 al 10

        // --- POLÍTICAS ---
        reservaMinima: "El tour se confirma con un mínimo del 50% de la reserva completa.",
        cancelacion: "Cancelación gratuita si se cancela con 48 horas de antelación.",

        responsable: "Bajamos toda nuestra basura, cuidamos el sendero y trabajamos con guías locales.", // TODO: ajusta el texto si quieres

        // --- SERVICIO ---
        guiaIdiomas: ["Español", "Inglés", "Portugués", "Lenguaje de Señas"],
        servicioRecogida: true,

        // --- QUÉ INCLUYE / QUÉ NO ---
        incluye: [
            "Transporte redondo en bus",
            "Guía bilingüe (español / inglés)",
            "Servicio de recogida"
        ],
        incluyeOpcional: [],
        noIncluye: [
            "Entrada al mirador", // TODO: confirma si se cobra y pon el precio
            "Agua",
            "Almuerzo y gastos personales en San Juan la Laguna"
        ],

        // --- QUÉ DEBE LLEVAR EL CLIENTE ---
        queLlevar: [
            "Ropa abrigada para la madrugada",
            "Calzado cómodo para caminar",
            "Linterna frontal o de mano",
            "Guantes y gorro",
            "Agua y algo de comer",
            "Efectivo para el almuerzo y compras en San Juan la Laguna",
            "Su equipo personal en general"
        ],

        // --- BLOQUES DE INFORMACIÓN ---
        infoBloques: [
            {
                titulo: "La experiencia",
                items: [
                    "Camina unos 45 minutos hasta el mirador del Rostro Maya, en Santa Clara la Laguna",
                    "Disfruta el amanecer sobre el Lago de Atitlán y sus volcanes",
                    "Tiempo para quedarte unas horas arriba disfrutando la vista",
                    "Visita San Juan la Laguna, con tiempo para recorrer el pueblo y almorzar",
                    "Recorrido acompañado en todo momento por guías capacitados"
                ]
            },
            {
                titulo: "Incluido en tu reserva",
                items: [
                    "Transporte de ida y vuelta en bus desde el punto de salida",
                    "Acompañamiento de guía (español / inglés / portugués) durante toda la caminata",
                    "Recogida en el punto acordado"
                ]
            },
            {
                titulo: "Por tu cuenta",
                items: [
                    "Entrada al mirador, si aplica",
                    "Hidratación (agua) para todo el trayecto",
                    "Almuerzo y comidas en San Juan la Laguna",
                    "Compras y gastos personales"
                ]
            },
            {
                titulo: "Restricciones de participación",
                items: [
                    "Edad mínima: 5 años", // TODO: ajusta
                    "No recomendado en embarazo avanzado",
                    "No recomendado con limitaciones de movilidad",
                    "No recomendado con antecedentes cardíacos",
                    "Se requiere condición física básica"
                ]
            },
            {
                titulo: "Recomendaciones para empacar",
                items: [
                    "Capas de ropa abrigadora para la madrugada",
                    "Zapatos cómodos con buen agarre",
                    "Linterna de cabeza o de mano",
                    "Gorro y guantes",
                    "Bloqueador solar y lentes oscuros",
                    "Algo de comida y agua",
                    "Efectivo para el almuerzo y compras",
                    "Artículos básicos de aseo"
                ]
            },
            {
                titulo: "Antes de subir",
                items: [
                    "La salida es nocturna: aprovecha el trayecto en bus para descansar.",
                    "Haremos una parada técnica en una gasolinera durante el camino.",
                    "Iniciamos la caminata entre las 4:00 y las 4:30 a. m. para llegar a buena hora y encontrar espacio en el mirador.",
                    "El descenso comienza a más tardar a las 9:00 a. m.",
                    "Este tour se realiza únicamente en salida grupal, en fecha fija.",
                    "La hora de llegada a la capital es estimada y puede variar según el tráfico."
                ]
            }
        ],

        // --- RESEÑAS ---
        resenas: [],

        // --- GALERÍA DE FOTOS ---
        fotos: [
            "img/rostromaya.webp"
            // TODO: agrega más fotos, por ejemplo "img/rostromaya1.webp", "img/rostromaya2.webp"...
        ],

        // --- PRECIOS (RESPALDO) --- solo salida grupal
        precios: { // TODO: precios de relleno (Q200), pon los reales
            grupal: {
                "Villa Nueva": 200,
                "Russ Mall": 200
            }
        },

        // --- MODALIDADES ---
        modalidadPorDefecto: "amanecer",
        modalidades: {
            amanecer: {
                nombre: "Amanecer y San Juan la Laguna",
                duracionDias: 1,
                duracionTexto: "1 día (salida nocturna)",
                horasCaminata: "1 hora",
                desnivel: "—", // TODO: pon el desnivel real si lo tienes
                fechasGrupales: [
                    { fecha: "2026-12-12", cupos: 30 }, // TODO: ajusta los cupos (el bus es de ~30)
                ],
                precios: { // TODO: precios de relleno (Q200), pon los reales
                    grupal: {
                        "Villa Nueva": 200,
                        "Russ Mall": 200
                    }
                },
                itinerario: [
                    {
                        dia: 1,
                        titulo: "Traslado nocturno, amanecer en el mirador y San Juan la Laguna",
                        eventos: [
    { hora: "10:00 pm", lugar: "Villa Nueva", descripcion: "Salida en bus desde Villa Nueva." },
    { hora: "10:30 pm", lugar: "Russ Mall", descripcion: "Salida desde el centro comercial Russ Mall, Calzada Roosevelt." },
    { hora: "11:00 pm – 3:00 am", tipo: "periodo", lugar: "Traslado en bus", descripcion: "Trayecto hacia Santa Clara la Laguna. Podrán descansar durante el camino; haremos una parada técnica en una gasolinera." },
    { hora: "3:30 am", lugar: "Santa Clara la Laguna", descripcion: "Llegada estimada al punto de inicio del sendero." },
    { hora: "4:00 am", lugar: "Inicio de la caminata", descripcion: "Ascenso guiado de aproximadamente 45 minutos. Iniciamos entre las 4:00 y las 4:30 a. m. para llegar a buena hora y asegurar un buen lugar." },
    { hora: "Amanecer – 9:00 am", tipo: "periodo", lugar: "Mirador del Rostro Maya", descripcion: "Tiempo libre para disfrutar el amanecer sobre el Lago de Atitlán y permanecer unas horas en el mirador." },
    { hora: "9:00 am", lugar: "Inicio del descenso", descripcion: "A más tardar a esta hora comenzamos a bajar." },
    { hora: "10:00 am", lugar: "Llegada al bus", descripcion: "Encuentro con el bus y traslado hacia San Juan la Laguna." },
    { hora: "Durante el día", tipo: "periodo", lugar: "San Juan la Laguna", descripcion: "Tiempo libre para recorrer el pueblo y almorzar." },
    { hora: "3:00 pm", lugar: "Salida de San Juan la Laguna", descripcion: "Regreso hacia la Ciudad de Guatemala." },
    { hora: "7:00 – 8:00 pm", tipo: "punto", lugar: "Ciudad de Guatemala", descripcion: "Llegada estimada a la capital. El horario puede variar según el tráfico." }
]
                    }
                ]
            }
        }
    },
    {
        id: "semuc-champey",
        nombre: "Semuc Champey",
        region: "Alta Verapaz",
        categoria: "lugares",
        precioDesde: 600, // TODO
        calificacion: 4.9, // TODO
        imagen: "img/semuc.webp", // TODO: sube una foto con este nombre
        duracion: "2 días / 1 noche",
        edadMinima: 8,
        condicionSalud: "Condición de salud regular",
        exigencia: 3,
        descripcion: "Pozas de agua turquesa escalonadas sobre un puente natural de piedra caliza, rodeadas de selva. Nado, mirador y cuevas."
    }

    
    
];

