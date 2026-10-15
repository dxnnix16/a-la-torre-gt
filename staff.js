/* =========================================================
   STAFF · A La Torre GT
   Edita el arreglo STAFF con los datos reales del equipo.
   ========================================================= */

const CARPETA_FOTOS = 'img/fotosstaff/';   // carpeta de las fotos
const EXTENSIONES = ['jpg', 'jpeg', 'JPG', 'JPEG', 'png', 'webp'];   // formatos que acepta (prueba en este orden)
const MAX_FOTOS = 5;                        // máximo de fotos por persona (natalia1 ... natalia5)
const TIEMPO_ROTACION = 5000;               // 5 segundos (si lo cambias, cambia también "st-progreso 5s" en staff.css)

/*
  slug     -> prefijo del archivo. Con slug 'natalia' busca natalia1, natalia2, ... (jpg, jpeg, png o webp)
  principal-> true = aparece también en el bloque animado de arriba (solo deben ser 4)
  bio      -> frase corta que se ve en el acordeón
  info     -> línea que se ve en la tarjeta con fotos rotativas
*/
const STAFF = [
  { slug: 'natalia',  nombre: 'Natalia',       rol: 'Fundadora y guía de expediciones', principal: true,
    bio: 'Ha alcanzado las cumbres más altas de Guatemala, El Salvador, Colombia y México, y lleva 35 de los 37 volcanes guatemaltecos. Estudia Relaciones Internacionales y es apasionada del backpacking.',
    info: 'Guía en español, inglés, portugués y lenguaje de señas, con formación en primeros auxilios.' },
  { slug: 'pablo',    nombre: 'Pablo',         rol: 'Fundador y guía de expediciones', principal: true,
    bio: 'Ha alcanzado las cumbres más altas de Centroamérica. Su formación en ingeniería, su ojo de fotógrafo y su mirada de diseñador dan forma a la experiencia de cada expedición.',
    info: 'Guía bilingüe (español e inglés), fotógrafo y diseñador.' },
  { slug: 'rodas',    nombre: 'Luis Rodas',    rol: 'Guía de expediciones', principal: true,
    bio: 'Ha coronado 11 de las cumbres más altas de Guatemala y acompaña a cada grupo con seguridad y conocimiento de la ruta.',
    info: 'Guía en ruta con formación en primeros auxilios.' },
  { slug: 'james',    nombre: 'James',         rol: 'Guía bilingüe', principal: true,
    bio: 'Ha alcanzado las cumbres más altas de Guatemala y conecta a viajeros de todo el mundo con la montaña.',
    info: 'Guía para grupos en inglés y español.' },
  { slug: 'alexander', nombre: 'Alexander',    rol: 'Guía de volcanes', principal: false,
    bio: 'Ha subido la mayoría de las cumbres más altas de Guatemala y conoce a fondo sus rutas y condiciones.',
    info: 'Guía de volcanes y apoyo en ruta.' },
  { slug: 'rony',     nombre: 'Rony Palax',    rol: 'Guía de volcanes', principal: false,
    bio: 'Guía especializado en los volcanes más grandes de Guatemala, con amplia experiencia en sus ascensos.',
    info: 'Guía de volcanes y acompañamiento a grupos.' },
  { slug: 'jef',      nombre: 'Jef Xploreer',  rol: 'Guía de volcanes', principal: false,
    bio: 'Guía especializado en los volcanes más grandes de Guatemala, con amplia experiencia en sus ascensos.',
    info: 'Guía de volcanes y acompañamiento a grupos.' }
];

/*
  REDES SOCIALES (Instagram y TikTok)
  Pega aquí el enlace del perfil de cada persona.
  Si dejas una red vacía ('') ese botón no aparece; si una persona no tiene ninguna, no se muestra nada.
  Por ahora todos llevan la página principal de cada red como relleno.
*/
const REDES = {
  natalia:   { instagram: 'https://www.instagram.com/nataliespineira', tiktok: 'https://www.tiktok.com/heidyyev' },
  pablo:     { instagram: 'https://www.instagram.com/pablohudsoon', tiktok: 'https://www.tiktok.com/pablitohudson' },
  rodas:     { instagram: 'https://www.instagram.com/luisrodas_2', tiktok: 'https://www.tiktok.com/luis.rodas.1' },
  james:     { instagram: 'https://www.instagram.com/drake._.kev', tiktok: 'https://www.tiktok.com/drake.kev' },
  alexander: { instagram: 'https://www.instagram.com/alexader._.mazate', tiktok: 'https://www.tiktok.com/un.aventurero.mas.gt' },
  rony:      { instagram: 'https://www.instagram.com/rony_explorer_', tiktok: 'https://www.tiktok.com/palacios.rony' },
  jef:       { instagram: 'https://www.instagram.com/jef_x0', tiktok: 'https://www.tiktok.com/jefxlporer370' }
};

const NOMBRES_RED = { instagram: 'Instagram', tiktok: 'TikTok' };
const ICONOS_RED = {
  instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".7" fill="currentColor"/></svg>',
  tiktok: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5"/><path d="M14 3c.35 2.6 2.1 4.25 5 4.45"/></svg>'
};

/* ---------- utilidades ---------- */

// Busca natalia1, natalia2, ... probando cada extensión, y devuelve solo las fotos que existen.
function probarImagen(src) {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => resolve(src);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

async function buscarFoto(slug, numero) {
  for (const ext of EXTENSIONES) {
    const src = `${CARPETA_FOTOS}${slug}${numero}.${ext}`;
    if (await probarImagen(src)) return src;
  }
  return null;
}

function cargarFotos(slug) {
  const busquedas = [];
  for (let i = 1; i <= MAX_FOTOS; i++) busquedas.push(buscarFoto(slug, i));
  return Promise.all(busquedas).then(lista => lista.filter(Boolean));
}

function crear(tag, clase, texto) {
  const el = document.createElement(tag);
  if (clase) el.className = clase;
  if (texto) el.textContent = texto;
  return el;
}

const sinAnimacion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- PARTE 1: acordeón de 4 ---------- */

function construirAcordeon(persona, fotos) {
  const card = crear('article', 'st-card');
  card.tabIndex = 0;
  card.setAttribute('role', 'listitem');
  card.setAttribute('aria-label', `${persona.nombre}, ${persona.rol}`);

  if (fotos.length) {
    const img = crear('img', 'st-card__foto');
    img.src = fotos[0];
    img.alt = `${persona.nombre}, ${persona.rol} de A La Torre GT`;
    card.appendChild(img);
  }

  card.appendChild(crear('span', 'st-card__nombre-v', persona.nombre));

  const info = crear('div', 'st-card__info');
  info.appendChild(crear('h3', '', persona.nombre));
  info.appendChild(crear('p', 'st-card__rol', persona.rol));
  if (persona.bio) info.appendChild(crear('p', 'st-card__bio', persona.bio));
  card.appendChild(info);

  return card;
}

function activarAcordeon(contenedor) {
  const cards = [...contenedor.querySelectorAll('.st-card')];
  if (!cards.length) return;

  const abrir = card => {
    cards.forEach(c => c.classList.toggle('is-open', c === card));
  };

  cards.forEach(card => {
    card.addEventListener('mouseenter', () => abrir(card)); // cursor
    card.addEventListener('focus', () => abrir(card));      // teclado
    card.addEventListener('click', () => abrir(card));      // toque en celular
  });

  abrir(cards[0]); // la primera queda abierta al cargar
}

/* ---------- PARTE 2: tarjetas con fotos que rotan ---------- */

function construirRedes(persona) {
  const perfil = REDES[persona.slug];
  if (!perfil) return null;

  const contenedor = crear('div', 'st-redes');
  ['instagram', 'tiktok'].forEach(red => {
    if (!perfil[red]) return;
    const enlace = crear('a', `st-red st-red--${red}`);
    enlace.href = perfil[red];
    enlace.target = '_blank';
    enlace.rel = 'noopener noreferrer';
    enlace.setAttribute('aria-label', `${NOMBRES_RED[red]} de ${persona.nombre}`);

    const icono = crear('span', 'st-red__icono');
    icono.setAttribute('aria-hidden', 'true');
    icono.innerHTML = ICONOS_RED[red];

    enlace.append(icono, crear('span', 'st-red__txt', NOMBRES_RED[red]));
    contenedor.appendChild(enlace);
  });

  return contenedor.children.length ? contenedor : null;
}

function construirTarjeta(persona, fotos) {
  const tarjeta = crear('article', 'st-tarjeta');
  const marco = crear('div', 'st-tarjeta__marco');

  if (fotos.length) {
    fotos.forEach((src, i) => {
      const img = crear('img', 'st-tarjeta__foto');
      img.src = src;
      img.alt = `${persona.nombre}, foto ${i + 1}`;
      img.loading = 'lazy';
      marco.appendChild(img);
    });
  } else {
    marco.appendChild(crear('div', 'st-tarjeta__vacio', persona.nombre.charAt(0)));
  }

  const texto = crear('div', 'st-tarjeta__texto');
  texto.appendChild(crear('h3', '', persona.nombre));
  texto.appendChild(crear('p', 'st-tarjeta__rol', persona.rol));
  texto.appendChild(crear('p', 'st-tarjeta__info', persona.info));

  tarjeta.append(marco, texto);

  const redes = construirRedes(persona);
  if (redes) tarjeta.appendChild(redes);

  if (fotos.length > 1) {
    const puntos = crear('div', 'st-puntos');
    fotos.forEach((_, i) => {
      const b = crear('button', 'st-punto');
      b.type = 'button';
      b.setAttribute('aria-label', `Ver foto ${i + 1} de ${persona.nombre}`);
      puntos.appendChild(b);
    });
    marco.appendChild(puntos);
  }

  return tarjeta;
}

function activarRotacion(tarjeta, desfase) {
  const fotos = [...tarjeta.querySelectorAll('.st-tarjeta__foto')];
  const puntos = [...tarjeta.querySelectorAll('.st-punto')];
  if (fotos.length < 2) {
    if (fotos[0]) fotos[0].classList.add('is-activa');
    return;
  }

  let actual = 0;
  let temporizador = null;

  function mostrar(indice) {
    actual = indice;
    fotos.forEach((f, i) => f.classList.toggle('is-activa', i === actual));
    puntos.forEach((p, i) => {
      p.classList.remove('is-activa');
      p.classList.toggle('is-hecho', i < actual);
    });
    void tarjeta.offsetWidth;               // reinicia la animación de la barrita
    puntos[actual].classList.add('is-activa');
  }

  function programar(espera) {
    clearTimeout(temporizador);
    if (sinAnimacion) return;
    temporizador = setTimeout(() => {
      mostrar((actual + 1) % fotos.length);
      programar(TIEMPO_ROTACION);
    }, espera);
  }

  function pausar() {
    tarjeta.classList.add('is-pausada');
    clearTimeout(temporizador);
  }

  function reanudar() {
    tarjeta.classList.remove('is-pausada');
    mostrar(actual);                        // reinicia los 5 s de la foto actual
    programar(TIEMPO_ROTACION);
  }

  tarjeta.addEventListener('mouseenter', pausar);
  tarjeta.addEventListener('mouseleave', reanudar);
  tarjeta.addEventListener('focusin', pausar);
  tarjeta.addEventListener('focusout', reanudar);

  puntos.forEach((p, i) => p.addEventListener('click', () => {
    mostrar(i);
    if (!tarjeta.classList.contains('is-pausada')) programar(TIEMPO_ROTACION);
  }));

  mostrar(0);
  // cada tarjeta arranca con un pequeño desfase para que no cambien todas al mismo tiempo
  programar(TIEMPO_ROTACION + desfase);
}

/* ---------- Arranque ---------- */

document.addEventListener('DOMContentLoaded', async () => {
  const acordeon = document.getElementById('stAcordeon');
  const grid = document.getElementById('stGrid');

  const fotosPorPersona = await Promise.all(STAFF.map(p => cargarFotos(p.slug)));

  STAFF.forEach((persona, i) => {
    const fotos = fotosPorPersona[i];

    if (persona.principal && acordeon) {
      acordeon.appendChild(construirAcordeon(persona, fotos));
    }
    if (grid) {
      const tarjeta = construirTarjeta(persona, fotos);
      grid.appendChild(tarjeta);
      activarRotacion(tarjeta, i * 650);
    }
  });

  if (acordeon) activarAcordeon(acordeon);
});