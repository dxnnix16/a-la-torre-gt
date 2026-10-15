/* =========================================================
   TRADUCCIONES · LA REVISTA (revista.html)
   Una clave = un texto, con todos sus idiomas juntos.
   Formato:  'clave': { es: `…`, cak: `…`, en: `…` }
   Los idiomas vacíos (``) se muestran en español hasta que los llenes.
   Para agregar otro idioma (fr, de, pt, it) solo añade su código a la clave.
   En la consola: I18n.faltantes()  → te dice qué falta traducir.
   Los nombres de lugares (Tikal, Semuc Champey, volcanes…) se dejan igual a propósito.
   ========================================================= */
I18n.agregar({

  'revista.meta.titulo': { es: `A La Torre GT | La Revista`, cak: ``, en: `A La Torre GT | The Magazine`, fr: `A La Torre GT | Le Magazine`, de: `A La Torre GT | Das Magazin`, pt: `A La Torre GT | A Revista`, it: `A La Torre GT | La Rivista` },

  /* ---------- Cabecera ---------- */
  // OJO: el sello gira en círculo con ancho fijo (textLength). Conserva el patrón "frase • frase • " (dos veces).
  'revista.sello.texto': { es: `mira nuestros momentos • mira nuestros momentos • `, cak: ``, en: `see our moments • see our moments • `, fr: `découvrez nos moments • découvrez nos moments • `, de: `siehe unsere momente • siehe unsere momente • `, pt: `veja nossos momentos • veja nossos momentos • `, it: `guarda i nostri momenti • guarda i nostri momenti • ` },
  'revista.sello.aria':  { es: `Ver los momentos destacados`, cak: ``, en: `View featured moments`, fr: `Voir les moments forts`, de: `Highlights anzeigen`, pt: `Ver momentos em destaque`, it: `Vedi i momenti in evidenza` },
  'revista.titulo.l1':   { es: `Momentos que`, cak: ``, en: `Moments that`, fr: `Des moments qui`, de: `Momente, die`, pt: `Momentos que`, it: `Momenti che` },
  // Esta clave lleva HTML: conserva <span class="rv-grad">…</span> alrededor de la palabra con degradado.
  'revista.titulo.l2':   { es: `se quedan <span class="rv-grad">contigo</span>`, cak: ``, en: `stay <span class="rv-grad">with you</span>`, fr: `restent <span class="rv-grad">avec vous</span>`, de: `bei dir <span class="rv-grad">bleiben</span>`, pt: `ficam <span class="rv-grad">com você</span>`, it: `restano <span class="rv-grad">con te</span>` },
  'revista.equipo.aria': { es: `Conoce al equipo`, cak: ``, en: `Meet the team`, fr: `Rencontrez l'équipe`, de: `Lerne das Team kennen`, pt: `Conheça a equipe`, it: `Incontra il team` },

  /* ---------- Collage (solo las descripciones; los nombres de lugar no se traducen) ---------- */
  'revista.c1.desc': { es: `Amanecer sobre el mar de nubes`, cak: ``, en: `Sunrise over the sea of clouds`, fr: `Lever de soleil sur la mer de nuages`, de: `Sonnenaufgang über dem Wolkenmeer`, pt: `Amanhecer sobre o mar de nuvens`, it: `Alba sul mare di nuvole` },
  'revista.c2.desc': { es: `Calles llenas de color`, cak: ``, en: `Streets full of color`, fr: `Des rues pleines de couleurs`, de: `Farbenfrohe Straßen`, pt: `Ruas cheias de cor`, it: `Strade piene di colore` },
  'revista.c3.desc': { es: `Pozas de agua turquesa`, cak: ``, en: `Turquoise water pools`, fr: `Bassins d'eau turquoise`, de: `Türkisfarbene Wasserbecken`, pt: `Piscinas de água turquesa`, it: `Piscine d'acqua turchese` },
  'revista.c4.desc': { es: `Tres volcanes, un solo lago`, cak: ``, en: `Three volcanoes, one lake`, fr: `Trois volcanes, un seul lac`, de: `Drei Vulkane, ein einziger See`, pt: `Três vulcões, um único lago`, it: `Tre vulcani, un solo lago` },
  'revista.c5.desc': { es: `Noche de erupciones`, cak: ``, en: `Night of eruptions`, fr: `Nuit d'éruptions`, de: `Nacht der Eruptionen`, pt: `Noite de erupções`, it: `Notte di eruzioni` },
  'revista.c6.desc': { es: `Entre templos y selva`, cak: ``, en: `Between temples and jungle`, fr: `Entre temples et jungle`, de: `Zwischen Tempeln und Dschungel`, pt: `Entre templos e selva`, it: `Tra templi e giungla` },
  'revista.c7.desc': { es: `Malvaviscos en la lava`, cak: ``, en: `Marshmallows on the lava`, fr: `Guimauves sur la lave`, de: `Marshmallows auf der Lava`, pt: `Marshmallows na lava`, it: `Marshmallow sulla lava` },
  'revista.cta.explorar': { es: `Explorar momentos`, cak: ``, en: `Explore moments`, fr: `Explorer los moments`, de: `Momente erkunden`, pt: `Explorar momentos`, it: `Esplora i momenti` },

  /* ---------- Pie del hero ---------- */
  'revista.cita.texto':  { es: `La mejor vista siempre llega después de la parte difícil. Aquí guardamos esos momentos para que nunca se te olviden.`, cak: ``, en: `The best view always comes after the hardest climb. We keep these moments here so you never forget them.`, fr: `La meilleure vue vient toujours après la montée la plus dure. Nous gardons ces moments ici pour que vous ne les oubliiez jamais.`, de: `Die beste Aussicht kommt immer nach dem schwersten Aufstieg. Hier bewahren wir diese Momente auf, damit du sie nie vergisst.`, pt: `A melhor vista sempre vem depois da subida mais difícil. Aqui guardamos esses momentos para que você nunca os esqueça.`, it: `La vista migliore arriva sempre dopo la salita più dura. Custodiamo qui questi momenti affinché tu non li dimentichi mai.` },
  'revista.cita.firma':  { es: `El equipo de A La Torre`, cak: ``, en: `The A La Torre team`, fr: `L'équipe d'A La Torre`, de: `Das Team von A La Torre`, pt: `A equipe do A La Torre`, it: `Il team di A La Torre` },
  'revista.dest.etiqueta': { es: `Momentos`, cak: ``, en: `Moments`, fr: `Moments`, de: `Momente`, pt: `Momentos`, it: `Momenti` },
  'revista.dest.titulo': { es: `Lo mejor de nuestras expediciones, en un solo lugar`, cak: ``, en: `The best of our expeditions, all in one place`, fr: `Le meilleur de nos expéditions, réuni au même endroit`, de: `Das Beste unserer Expeditionen an einem Ort`, pt: `O melhor de nossas expedições, em um só lugar`, it: `Il meglio delle nostre spedizioni, in un unico posto` },

  /* ---------- Momentos destacados ---------- */
  'revista.momentos.titulo': { es: `Momentos destacados`, cak: ``, en: `Featured moments`, fr: `Moments forts`, de: `Highlight-Momente`, pt: `Momentos em destaque`, it: `Momenti in evidenza` },
  'revista.momentos.texto':  { es: `Historias, paisajes y cumbres de las experiencias que vivimos con nuestros viajeros.`, cak: ``, en: `Stories, landscapes, and summits from the experiences we share with our travelers.`, fr: `Histoires, paysages et sommets issus des expériences que nous vivons avec nos voyageurs.`, de: `Geschichten, Landschaften und Gipfel aus den Erlebnissen mit unseren Reisenden.`, pt: `Histórias, paisagens e cumes das experiências que vivemos com nossos viajantes.`, it: `Storie, paesaggi e cime delle esperienze che viviamo con i nostri viaggiatori.` },

  /* ---------- Los genera revista.js ---------- */
  'revista.vacio.titulo': { es: `Aquí vivirán nuestros momentos`, cak: ``, en: `Our moments will live here`, fr: `Nos moments prendront vie ici`, de: `Hier werden unsere Momente leben`, pt: `Aqui viverão os nossos momentos`, it: `Qui vivranno i nostri momenti` },
  'revista.vacio.texto':  { es: `Muy pronto compartiremos las mejores historias, atardeceres y cumbres de cada expedición.`, cak: ``, en: `Very soon we will share the best stories, sunsets, and summits from every expedition.`, fr: `Très bientôt, nous partagerons les meilleures histoires, couchers de soleil et sommets de chaque expédition.`, de: `Sehr bald teilen wir die besten Geschichten, Sonnenuntergänge und Gipfel jeder Expedition.`, pt: `Em breve compartilharemos as melhores histórias, por do sol e cumes de cada expedição.`, it: `Molto presto condivideremo le migliori storie, tramonti e cime di ogni spedizione.` },
  'revista.post.leer_mas': { es: `Leer más →`, cak: ``, en: `Read more →`, fr: `Lire la suite →`, de: `Mehr lesen →`, pt: `Ler mais →`, it: `Leggi di più →` }
});