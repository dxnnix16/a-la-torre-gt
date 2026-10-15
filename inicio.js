/* =========================================================
   TRADUCCIONES · PÁGINA DE INICIO (index.html)
   Una clave = un texto, con todos sus idiomas juntos.
   Formato:  'clave': { es: `…`, cak: `…`, en: `…`, fr: `…` }
   Si falta un idioma, se muestra el español.
   {n} se reemplaza por data-i18n-n="…" del HTML.
   Los nombres propios (volcanes, departamentos) se dejan igual a propósito.
   ========================================================= */
I18n.agregar({

  'inicio.titulo': { es: `A La Torre GT | Inicio`, cak: `A La Torre GT | Tikirib'äl` },

  /* ---------- 1. HERO + BUSCADOR ---------- */
  'inicio.hero.titulo': { es: `Lo mejor de <br class="br-movil">Guate te espera`,
                          cak: `Ri nimaläj utz chi Iximulew <br class="br-movil">nikuyu awe` },

  'inicio.busq.volver':        { es: `Volver`,                         cak: `Tzalij` },
  'inicio.busq.placeholder':   { es: `Buscar lugares o actividades`,   cak: `Titzukuj taq k'o wi o taq b'anob'äl` },
  'inicio.busq.recientes':     { es: `Búsquedas recientes`,            cak: `Ri xatzukuj ri k'a jub'a'` },
  'inicio.busq.sugerencias':   { es: `Sugerencias`,                    cak: `Taq ch'ob'onïk` },
  'inicio.busq.cualquier_fecha': { es: `Cualquier fecha`,              cak: `Jantape' q'ij` },
  'inicio.busq.cuando':        { es: `¿Cuándo?`,                       cak: `¿Jampa' q'ij?` },
  'inicio.busq.hoy':           { es: `Hoy`,                            cak: `Wakami q'ij` },
  'inicio.busq.manana':        { es: `Mañana`,                         cak: `Chweq'ij` },
  'inicio.busq.finde':         { es: `Próximo fin de semana`,          cak: `Ruk'isib'äl ri jun chik semana` },
  'inicio.busq.restablecer':   { es: `Restablecer`,                    cak: `Tatzalij` },
  'inicio.busq.saltar':        { es: `Saltar`,                         cak: `Tik'ow` },
  'inicio.busq.continuar':     { es: `Continuar`,                      cak: `Tik'o chik` },
  'inicio.busq.participante_1':{ es: `1 participante`,                 cak: `1 winäq` },
  'inicio.busq.quien':         { es: `¿Quién va a ir?`,                cak: `¿Achike xkib'e?` },
  'inicio.busq.adultos':       { es: `Adultos`,                        cak: `Nimaq winäq` },
  'inicio.busq.adultos_sub':   { es: `A partir de 18 años`,            cak: `Rik'in 18 junab' o más` },
  'inicio.busq.ninos':         { es: `Niños`,                          cak: `Ak'wal` },
  'inicio.busq.ninos_sub':     { es: `De 0 a 17 años`,                 cak: `Pa 0 k'a chi 17 junab'` },
  'inicio.busq.buscar':        { es: `Buscar`,                         cak: `Titzukuj` },

  /* ---------- 2. LOS MÁS RESERVADOS ---------- */
  'inicio.mas.aria':     { es: `Los destinos más reservados`, cak: `Ri taq b'ey ri k'ïy kichajij` },
  'inicio.mas.titulo':   { es: `Los más reservados`,          cak: `Ri k'ïy kichajij` },
  'inicio.mas.texto':    { es: `Las cinco expediciones que nuestros exploradores reservan primero. Asegura tu lugar antes de que se llenen.`,
                           cak: `Ri job' b'enam ri nab'ey kichajij ri qab'enela'. Tachajij ri ak'olib'äl nab'ey chi nik'is ri k'olib'äl.` },
  'inicio.mas.ver_todos':{ es: `Ver todos los destinos`,      cak: `Tatz'ët ronojel ri taq b'ey` },

  /* Tarjetas (se reutilizan en las 5) */
  'inicio.tc.agota':     { es: `🔥 Se agota fácil`,        cak: `🔥 Nik'is pa jub'a'` },
  'inicio.tc.rank':      { es: `#{n} Más reservado`,       cak: `#{n} Ri k'ïy kichajij` },
  'inicio.tc.pocos':     { es: `Quedan pocos cupos`,       cak: `Xa jub'a' k'olib'äl` },
  'inicio.tc.cat_volcanes': { es: `Volcanes`,              cak: `Taq juyub' q'aq'` },
  'inicio.tc.guardar':   { es: `Guardar {n}`,              cak: `Tak'ol {n}` },
  'inicio.tc.dur_2d1n':  { es: `2 días / 1 noche`,         cak: `2 q'ij / 1 aq'ab'` },
  'inicio.tc.dur_dos_dias': { es: `dos días y una noche`,  cak: `keb' q'ij chuqa' jun aq'ab'` },
  'inicio.tc.dur_medio': { es: `Medio día`,                cak: `Nik'aj q'ij` },
  'inicio.tc.dur_1d':    { es: `1 día`,                    cak: `1 q'ij` },
  'inicio.tc.nivel_exigente': { es: `Exigente · {n}/10`,   cak: `K'ayew · {n}/10` },
  'inicio.tc.desde':     { es: `desde`,                    cak: `tikirib'äl pa` },
  'inicio.tc.por_persona': { es: `por persona`,            cak: `chi winäq` },

  /* ---------- 3. TU PRÓXIMA AVENTURA ---------- */
  'inicio.why.titulo':   { es: `Tu próxima aventura está en buenas manos`,
                           cak: `Ri jun chik ab'enam k'o pa utz taq q'a'` },
  'inicio.why.texto':    { es: `Tu objetivo es llegar a ese lugar que tanto imaginas, el nuestro es llevarte de forma segura. Te acompañamos paso a paso por las caminatas, los volcanes y los paisajes más impresionantes de Guatemala, encargándonos de toda la logística para que tú solo te enfoques en disfrutar el camino.`,
                           cak: `Ri anuk'ulem ja chi natzu' ri k'olib'äl ri nach'ob'o'; ri qanuk'ulem ja chi nqachajij chi jikïl. Qik'in nab'ey pa taq b'ey, pa taq juyub' q'aq' chuqa' pa taq ruwäch ri ruwachulew rech Iximulew, chuqa' nqab'än ronojel ri samaj chi xa nawïl ri b'ey.` },
  'inicio.why.grupos':   { es: `Grupos pequeños`,  cak: `Ch'uti' taq molaj` },
  'inicio.why.guias':    { es: `Guías locales`,    cak: `B'eyonela' rech wawe'` },
  'inicio.why.rutas':    { es: `Rutas clave`,      cak: `Nimaq taq b'ey` },
  'inicio.why.alt_viajes': { es: `Viajes`,         cak: `B'enam` },
  'inicio.why.alt_guias':  { es: `Guías`,          cak: `B'eyonela'` },
  'inicio.why.alt_rutas':  { es: `Rutas`,          cak: `B'ey` },
  'inicio.why.f1_t':     { es: `Asesoría a tu medida`, cak: `Tzijonem richin awe` },
  'inicio.why.f1_p':     { es: `¿Es tu primera vez o ya eres experto? Te asesoramos de forma honesta para elegir la aventura perfecta según tu nivel físico y experiencia previa.`,
                           cak: `¿Nab'ey mul awe o ya ajna'oj chik? Chi tzij nqatzijoj ri ütz chi awe, chi ruwäch ri achuq'a' chuqa' ri xatb'an chik.` },
  'inicio.why.f2_t':     { es: `Seguridad y logística`, cak: `Chajinïk chuqa' samaj` },
  'inicio.why.f2_p':     { es: `Nos encargamos de los detalles pesados. Desde el transporte y la planificación de la ruta, hasta los protocolos de seguridad en ruta para que tú solo te enfoques en disfrutar.`,
                           cak: `Ri qa nqab'än ri taq samaj ri k'o rukub'. Ruk'in ri b'enïk chuqa' ri runuk'ik ri b'ey, k'a chi ri chajinïk pa b'ey, richin xa nawïl chi ütz ri b'enam.` },
  'inicio.why.f3_t':     { es: `Turismo responsable`,   cak: `Ütz b'enam chi ruwäch ri ruwachulew` },
  'inicio.why.f3_p':     { es: `Amamos los lugares que visitamos. Fomentamos el respeto por la naturaleza.`,
                           cak: `Nqajo' ri taq k'olib'äl ri nqatz'ët. Nqaya' ruq'ij ri ruwachulew.` },

  /* ---------- 4. TOP VOLCANES ---------- */
  'inicio.top.titulo':   { es: `Top Volcanes`, cak: `Nimaq taq juyub' q'aq'` },
  'inicio.top.texto':    { es: `Las 37 cumbres oficiales de Guatemala. Desliza para explorar a dónde te llevará tu próximo ascenso.`,
                           cak: `Ri 37 ruwi' juyub' rech Iximulew. Tatzolij richin natz'ët jawije' xtab'e pa ri jun chik ab'enam.` },
  'inicio.top.anterior': { es: `Anterior`,  cak: `Ri xk'ow` },
  'inicio.top.siguiente':{ es: `Siguiente`, cak: `Ri jun chik` },

  /* ---------- 5. PRÓXIMA CUMBRE ---------- */
  'inicio.summit.f1': { es: `🗓️ 15 de Mayo, 2026`,  cak: `🗓️ 15 rech Mayo, 2026` },
  'inicio.summit.f2': { es: `🗓️ 02 de Junio, 2026`, cak: `🗓️ 02 rech Junio, 2026` },
  'inicio.summit.f3': { es: `🗓️ 20 de Junio, 2026`, cak: `🗓️ 20 rech Junio, 2026` },
  'inicio.summit.t1': { es: `Próxima cumbre:<br>Volcán de Fuego`,      cak: `Jun chik ruwi' juyub':<br>Volcán de Fuego` },
  'inicio.summit.t2': { es: `Próxima cumbre:<br>Acatenango Épico`,     cak: `Jun chik ruwi' juyub':<br>Acatenango Nimaläj` },
  'inicio.summit.t3': { es: `Próxima cumbre:<br>Atardecer en Pacaya`,  cak: `Jun chik ruwi' juyub':<br>Ruqajib'äl q'ij pa Pacaya` },
  'inicio.summit.p1': { es: `Únete a nuestro grupo expedicionario. Pasaremos la noche viendo las erupciones desde el campamento seguro con fogata, cena caliente y guías expertos. ¡Cupos limitados!`,
                        cak: `Tatok pa ri qamolaj. Xkaqaq'ab'a' xkaqatz'ët ri taq q'aq' ri nel pa ri juyub', pa jun jikïl k'olib'äl rik'in q'aq', wa k'atan chuqa' etamanela' b'eyonela'. ¡Xa jub'a' k'olib'äl!` },
  'inicio.summit.p2': { es: `El rey de las vistas. Un ascenso exigente pero con la recompensa más increíble: amanecer frente al Fuego en actividad. Incluye equipo de alta montaña.`,
                        cak: `Ri ajaw chi taq natz'ët. Jun k'ayew b'enam, xa k'a utz ri rutojb'al: nasaqirisäx chuwäch ri Volcán de Fuego ri tajin nelon q'aq'. Nik'o chi rik'in ri samajib'äl richin ri nimaq juyub'.` },
  'inicio.summit.p3': { es: `Ideal para principiantes. Caminaremos sobre ríos de lava petrificada y asaremos malvaviscos con el calor volcánico. ¡Una tarde mágica garantizada!`,
                        cak: `Ütz richin ri nab'ey b'enel. Xkaqab'än b'ey chwi taq nima' q'aq' ri xk'ak'ax chik chuqa' xkaqak'at taq malvavisco rik'in ri k'aqan ri juyub'. ¡Jun tzijäl q'ij ri ütz xtik'o!` },
  'inicio.summit.reservar': { es: `Ver itinerario y reservar`, cak: `Tatz'ët ri b'ey chuqa' tachajij` },

  /* ---------- 6. CALIFICACIONES Y RESEÑAS ---------- */
  'inicio.res.aria':       { es: `Calificaciones de nuestros exploradores`, cak: `Ri taq ch'ob'onïk rech ri qab'enela'` },
  'inicio.res.estrellas':  { es: `{n} de 5 estrellas`,   cak: `{n} chi 5 ch'umil` },
  'inicio.res.promedio':   { es: `Calificación promedio de quienes ya subieron con nosotros`,
                             cak: `Ruk'iyal ri ch'ob'onïk rech ri xkikïj ri juyub' qik'in` },
  'inicio.res.acompanados':{ es: `exploradores acompañados`,        cak: `b'enela' ri xqatoq'` },
  'inicio.res.recomienda': { es: `recomienda nuestras expediciones`, cak: `nikitzijoj ri qab'enam` },

  'inicio.res.r1': { es: `Llegamos a la cima sin una sola preocupación. Los guías conocen cada tramo y la cena caliente en el campamento fue lo mejor.`,
                     cak: `Xqakïj ri ruwi' juyub' ma k'o ta jun ch'ob'onïk. Ri b'eyonela' kiweta'maj ronojel b'ey chuqa' ri wa k'atan pa ri k'olib'äl ja ri más utz.` },
  'inicio.res.r2': { es: `Ver las erupciones de noche desde el campamento no se compara con nada. Organización impecable de principio a fin.`,
                     cak: `Rutz'ët ri q'aq' ri nelon aq'ab'il pa ri k'olib'äl ma k'o ta chuwäch. Utz ri nuk'ulem chi tikirib'äl k'a chi ruk'isib'äl.` },
  'inicio.res.r3': { es: `Era mi primera vez en un volcán y me sentí acompañada todo el camino. El grupo pequeño hace la diferencia.`,
                     cak: `Nab'ey mul chi pa jun juyub' q'aq' chuqa' xinwïl chi xinkitoq' pa ronojel b'ey. Ri ch'uti' molaj nub'än ri jalajöj.` },
  'inicio.res.r4': { es: `Ruta exigente pero muy bien guiada. Nos recomendaron el volcán justo para nuestro nivel y acertaron.`,
                     cak: `K'ayew ri b'ey, xa k'a utz xkib'eyij. Xkikitzijoj ri juyub' chi ruwäch ri qachuq'a' chuqa' xutz'ët.` },
  'inicio.res.r5': { es: `Transporte, equipo y comida resueltos. Yo solo tuve que caminar y disfrutar la vista desde lo más alto.`,
                     cak: `Ri b'enïk, ri samajib'äl chuqa' ri wa xkikïj chik. Xa xinb'e chuqa' xintz'ët ri ruwäch chi ruwi'.` },
  'inicio.res.r6': { es: `Seguridad y buen trato. Ya reservé mi segunda expedición con ellos.`,
                     cak: `Chajinïk chuqa' utz ruk'wanïk. Xinchajij chik ri ruka'n nub'enam kik'in.` }
});
