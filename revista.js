/* =========================================================
   LA REVISTA · A La Torre GT
   Fotos:  img/revista/momento1.webp ... momento7.jpg
           (acepta jpg, jpeg, JPG, JPEG, png y webp)
   Posts:  se agregan en el arreglo POSTS de abajo.
   ========================================================= */

const CARPETA_REVISTA = 'img/revista/';
const EXTENSIONES = ['jpg', 'jpeg', 'JPG', 'JPEG', 'png', 'webp'];
const sinMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------------------------------------------------------
   ESPACIO PARA TUS POSTS
   Cuando tengas el primero, quita las // y llena los datos.
   La foto se busca como img/revista/<foto>.webp (o jpeg, png, webp)
   --------------------------------------------------------- */
const POSTS = [
  // { titulo: 'Amanecer sobre Acatenango', categoria: 'Volcanes', fecha: '20 sep 2026',
  //   resumen: 'Una noche de campamento y el mejor amanecer de la temporada.',
  //   foto: 'post1', enlace: '#' },
];

/* ---------- carga de fotos ---------- */
function probarImagen(src) {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => resolve(src);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

async function buscarFoto(slug) {
  for (const ext of EXTENSIONES) {
    const src = `${CARPETA_REVISTA}${slug}.${ext}`;
    if (await probarImagen(src)) return src;
  }
  return null;
}

// Pone la foto dentro de un contenedor (.rv-card o .rv-post-foto) que tenga data-foto
async function ponerFoto(contenedor, textoAlternativo) {
  const slug = contenedor.dataset.foto;
  if (!slug) return;
  const src = await buscarFoto(slug);
  if (!src) { contenedor.classList.add('sin-foto'); return; }

  const img = contenedor.querySelector('.rv-foto');
  img.alt = textoAlternativo || '';
  img.onload = () => img.classList.add('cargada');
  img.src = src;
}

/* ---------- collage ---------- */
document.querySelectorAll('.rv-card').forEach(card => {
  const lugar = card.querySelector('.rv-leyenda strong');
  ponerFoto(card, lugar ? lugar.textContent : '');
});

// Movimiento suave de las columnas con el cursor
(function parallax() {
  const hero = document.querySelector('.rv-hero');
  if (!hero || sinMovimiento || !window.matchMedia('(hover: hover)').matches) return;
  const columnas = hero.querySelectorAll('.rv-col');

  hero.addEventListener('pointermove', e => {
    const r = hero.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    columnas.forEach(col => {
      const prof = parseFloat(col.dataset.prof || '1');
      col.style.translate = `${x * -16 * prof}px ${y * -10 * prof}px`;
    });
  });
  hero.addEventListener('pointerleave', () => columnas.forEach(c => { c.style.translate = '0 0'; }));
})();

/* ---------- posts ---------- */
(function pintarPosts() {
  const contenedor = document.getElementById('rvPosts');
  if (!contenedor) return;

  if (!POSTS.length) {
    contenedor.innerHTML = `
      <div class="rv-vacio rv-reveal">
        <svg viewBox="0 0 100 70" aria-hidden="true">
          <path d="M4 66 34 16l16 24 18-30 28 56z" fill="#ffcc00"/>
          <path d="M34 16 22 36l10-5 6 7 8-12z" fill="#fff" opacity=".7"/>
          <circle cx="78" cy="14" r="7" fill="#ff4500"/>
        </svg>
        <h3 data-i18n="revista.vacio.titulo">Aquí vivirán nuestros momentos</h3>
        <p data-i18n="revista.vacio.texto">Muy pronto compartiremos las mejores historias, atardeceres y cumbres de cada expedición.</p>
      </div>`;
    return;   // i18n.js traduce estos textos solo cuando termina de cargar la página
  }

  POSTS.forEach((p, i) => {
    const art = document.createElement('article');
    art.className = 'rv-post rv-reveal';
    art.style.setProperty('--d', `${i * 0.08}s`);
    art.innerHTML = `
      <div class="rv-post-foto" data-foto="${p.foto || ''}"><img class="rv-foto" alt=""></div>
      <div class="rv-post-cuerpo">
        <div class="rv-post-meta"><b></b><span></span></div>
        <h3></h3>
        <p></p>
        <a href="#" data-i18n="revista.post.leer_mas">Leer más →</a>
      </div>`;
    // textContent (no innerHTML) para que ningún texto rompa la página
    art.querySelector('.rv-post-meta b').textContent = p.categoria || '';
    art.querySelector('.rv-post-meta span').textContent = p.fecha || '';
    art.querySelector('h3').textContent = p.titulo || '';
    art.querySelector('p').textContent = p.resumen || '';
    art.querySelector('a').href = p.enlace || '#';
    contenedor.appendChild(art);
    ponerFoto(art.querySelector('.rv-post-foto'), p.titulo);
  });
  // Si i18n.js ya arrancó (por ejemplo si los posts se agregan después), traduce lo recién creado
  if (window.I18n) I18n.aplicar(contenedor);
})();

/* ---------- aparecer al hacer scroll ---------- */
(function revelar() {
  const elementos = document.querySelectorAll('.rv-reveal');
  if (!('IntersectionObserver' in window) || sinMovimiento) {
    elementos.forEach(el => el.classList.add('visible'));
    return;
  }
  const observador = new IntersectionObserver((entradas, obs) => {
    entradas.forEach(entrada => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('visible');
        obs.unobserve(entrada.target);
      }
    });
  }, { threshold: 0.15 });
  elementos.forEach(el => observador.observe(el));
})();
