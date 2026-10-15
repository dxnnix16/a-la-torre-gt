/* =========================================================
   TRADUCCIONES COMUNES  (menú, footer, panel de idioma, login)
   Aparecen en TODAS las páginas: se traducen aquí una sola vez.
   Formato:  'clave': { es: `…`, cak: `…`, en: `…`, fr: `…` }
   Si falta un idioma, se muestra el español. Para agregar otro idioma
   solo añade su código (en, fr, de, pt, it) a la clave.
   ========================================================= */
I18n.agregar({

  /* ---------- Menú superior ---------- */
  'comun.nav.inicio':    { es: `Inicio`,      cak: `Tikirib'äl`, en: `Home` },
  'comun.nav.destinos':  { es: `Destinos`,    cak: `Taq b'ey`, en: `Destinations` },
  'comun.nav.revista':   { es: `La Revista`,  cak: `Ri Wuj`, en: `The Magazine` },
  'comun.nav.staff':     { es: `Staff`,       cak: `Samajela'`, en: `Staff` },
  'comun.nav.contacto':  { es: `Contacto`,    cak: `Tich'aw qik'in`, en: `Contact` },
  'comun.nav.buscar_ph': { es: `🔍 Buscar un volcán...`, cak: ``, en: `` },
  'comun.nav.reservar':  { es: `Reservar ahora`, cak: ``, en: `` },

  /* ---------- Panel idioma / moneda ---------- */
  'comun.panel.titulo':  { es: `Idioma y moneda`, cak: `Ch'ab'äl chuqa' pwäq`, en: `Language & Currency` },
  'comun.panel.idioma':  { es: `Idioma`,          cak: `Ch'ab'äl`, en: `Language` },
  'comun.panel.moneda':  { es: `Moneda`,          cak: `Pwäq`, en: `Currency` },
  'comun.panel.nota':    { es: `Los precios se mostrarán en la moneda que elijas.`,
                           cak: `Ri taq tojb'äl xkik'ut pa ri pwäq ri nawajo'.`,
                           en: `Prices will be displayed in your selected currency.` },

  /* ---------- Login / crear cuenta ---------- */
  'comun.login.ingresar':     { es: `Ingresar`,      cak: `Tatok`, en: `Login` },
  'comun.login.tab_crear':    { es: `Crear cuenta`,  cak: `Tab'ana' jun cuenta`, en: `Create Account` },
  'comun.login.cerrar':       { es: `Cerrar`,        cak: `Tajäp`, en: `Close` },
  'comun.login.lado_titulo':  { es: `Tu próxima cumbre te espera`,
                                cak: `Ri jun chik ruwi' juyub' tajin nikuyu awe`,
                                en: `Your next summit awaits` },
  'comun.login.lado_1':       { es: `Guarda tus destinos favoritos`,
                                cak: `Tak'ol ri taq b'ey nawajo'`,
                                en: `Save your favorite destinations` },
  'comun.login.lado_2':       { es: `Reserva más rápido, sin repetir datos`,
                                cak: `Tachajij chi ik'ow, ma k'ïy ta mul nab'ij ri awetab'al`,
                                en: `Book faster without re-entering your details` },
  'comun.login.lado_3':       { es: `Consulta tu historial de expediciones`,
                                cak: `Tatz'ët ri taq b'enam xatb'an chik`,
                                en: `View your expedition history` },
  'comun.login.titulo_entrar':{ es: `Bienvenido de vuelta`, cak: `Ütz xatzalij`, en: `Welcome back` },
  'comun.login.titulo_crear': { es: `Crea tu cuenta`,      cak: `Tab'ana' ri acuenta`, en: `Create your account` },
  'comun.login.sub_entrar':   { es: `Ingresa para ver tus reservas y favoritos.`,
                                cak: `Tatok richin natz'ët ri xachajij chuqa' ri nawajo'.`,
                                en: `Sign in to view your bookings and favorites.` },
  'comun.login.sub_crear':    { es: `Guarda tus datos y reserva tu próxima expedición en segundos.`,
                                cak: `Tak'ol ri awetab'al chuqa' tachajij ri jun chik ab'enam pa jub'a' q'ijul.`,
                                en: `Save your details and book your next expedition in seconds.` },
  'comun.login.google':       { es: `Continuar con Google`, cak: `Tik'o chik rik'in Google`, en: `Continue with Google` },
  'comun.login.o_correo':     { es: `o con tu correo`,      cak: `o rik'in ri akorreo`, en: `or with your email` },
  'comun.login.nombre':       { es: `Nombre completo`,      cak: `Ronojel ab'i'`, en: `Full name` },
  'comun.login.nombre_ph':    { es: `Tu nombre`,            cak: `Ab'i'`, en: `Your name` },
  'comun.login.correo':       { es: `Correo electrónico`,   cak: `Akorreo electrónico`, en: `Email address` },
  'comun.login.pass':         { es: `Contraseña`,          cak: `Ewan tzij`, en: `Password` },
  'comun.login.ver_pass':     { es: `Mostrar contraseña`,   cak: `Tak'ut ri ewan tzij`, en: `Show password` },
  'comun.login.recordarme':   { es: `Recordarme`,           cak: `Tanataj chwe`, en: `Remember me` },
  'comun.login.olvido':       { es: `¿Olvidaste tu contraseña?`,
                                cak: `¿Ma nanataj ta chik ri ewan tzij?`,
                                en: `Forgot your password?` },
  'comun.login.aviso':        { es: `Diseño listo ✓ — el inicio de sesión real se conectará pronto.`,
                                cak: `Ri nuk'ulem ütz chik ✓ — ri tok pa cuenta xtik'o jub'a' chik.`,
                                en: `Layout ready ✓ — actual login will be connected soon.` },

  /* ---------- Footer ---------- */
  'comun.footer.sobre':       { es: `Especialistas en expediciones volcánicas en Guatemala. Llevándote a lo más alto de forma segura e inolvidable. Tu próxima gran aventura empieza aquí.`,
                                cak: `Etamanela' pa taq b'enam chi taq juyub' q'aq' pa Iximulew. Nqak'am awe pa ri nimaläj chi jikïl chuqa' ma nqasach ta. Ri ak'ak' nimaläj ab'enam nitikïr wawe'.`,
                                en: `Volcano expedition specialists in Guatemala. Taking you to the top safely and unforgettably. Your next great adventure starts here.` },
  'comun.footer.explorar':    { es: `Explorar`,                 cak: `Tatzukuj`, en: `Explore` },
  'comun.footer.destinos':    { es: `Todos los Destinos`,       cak: `Ronojel taq b'ey`, en: `All Destinations` },
  'comun.footer.preparacion': { es: `Preparación y Equipo`,     cak: `Rutz'ijb'äl chuqa' samajib'äl`, en: `Preparation & Gear` },
  'comun.footer.faq':         { es: `Preguntas Frecuentes`,     cak: `Taq tzijob'äl k'ïy mul`, en: `Frequently Asked Questions` },
  'comun.footer.contacto':    { es: `Contacto`,                 cak: `Tich'aw qik'in`, en: `Contact` },
  'comun.footer.unete':       { es: `Únete a la expedición`,    cak: `Tatok pa ri qab'enam`, en: `Join the expedition` },
  'comun.footer.unete_texto': { es: `Suscríbete para recibir noticias, tips de montaña y descuentos exclusivos para nuestros próximos ascensos.`,
                                cak: `Tatz'ib'aj ri akorreo richin natamaj taq tzijob'äl, taq tzijonem chi juyub' chuqa' taq jub'a' toj chi ri qajun chik taq b'enam.`,
                                en: `Subscribe to receive news, mountain tips, and exclusive discounts for our upcoming climbs.` },
  'comun.footer.correo_ph':   { es: `Tu correo electrónico`,    cak: `Ri akorreo`, en: `Your email address` },
  'comun.footer.enviar':      { es: `Enviar`,                   cak: `Tatäq`, en: `Send` },
  'comun.footer.derechos':    { es: `© 2026 A La Torre GT. Todos los derechos reservados.`,
                                cak: `© 2026 A La Torre GT. Ronojel taq ruq'ij k'o chi qawäch.`,
                                en: `© 2026 A La Torre GT. All rights reserved.` },
  'comun.footer.cumbres_alt': { es: `Las 37 cumbres oficiales de Guatemala`,
                                cak: `Ri 37 ruwi' juyub' rech Iximulew`,
                                en: `Guatemala's 37 official summits` }
});
