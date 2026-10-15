/* =========================================================
   BOTÓN FLOTANTE DE WHATSAPP · A La Torre GT
   Se agrega UNA sola línea en cada página, antes de </body>:
   <script src="whatsapp.js"></script>
   El script crea el botón y sus estilos por sí solo.
   ========================================================= */
(function () {
  const NUMERO = '50230554595';                                   // +502 3055 4595
  const MENSAJE = 'Hola, A La Torre GT 👋 Quisiera información sobre sus experiencias.';
  const TEXTO_BURBUJA = '¿Planeamos tu aventura?';
  const MOSTRAR_BURBUJA_A_LOS = 3500;                             // ms
  const OCULTAR_BURBUJA_A_LOS = 9500;                             // ms

  if (document.querySelector('.wa-flotante')) return;

  const css = `
  .wa-flotante {
    position: fixed;
    right: 24px;
    bottom: calc(24px + env(safe-area-inset-bottom, 0px));
    z-index: 900;
    display: flex;
    align-items: center;
    gap: 12px;
    text-decoration: none;
    font-family: 'Poppins', sans-serif;
    -webkit-tap-highlight-color: transparent;
  }
  .wa-icono {
    position: relative;
    isolation: isolate;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: #25d366;
    color: #fff;
    display: grid;
    place-items: center;
    box-shadow: 0 10px 25px rgba(37, 211, 102, 0.45);
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease;
    animation: wa-entra 0.8s 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both;
  }
  .wa-icono::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    border-radius: 50%;
    background: #25d366;
    animation: wa-pulso 2.6s ease-out infinite;
  }
  .wa-icono svg { width: 32px; height: 32px; fill: currentColor; }
  .wa-flotante:hover .wa-icono,
  .wa-flotante:focus-visible .wa-icono {
    transform: scale(1.1) rotate(-8deg);
    box-shadow: 0 14px 32px rgba(37, 211, 102, 0.55);
  }
  .wa-flotante:focus-visible { outline: none; }
  .wa-flotante:focus-visible .wa-icono { outline: 3px solid #1a1b26; outline-offset: 3px; }

  .wa-burbuja {
    background: #fff;
    color: #1a1b26;
    font-size: 0.85rem;
    font-weight: 600;
    white-space: nowrap;
    padding: 11px 18px;
    border-radius: 16px 16px 4px 16px;
    box-shadow: 0 10px 30px rgba(26, 27, 38, 0.16);
    opacity: 0;
    transform: translateX(14px) scale(0.94);
    transform-origin: right center;
    pointer-events: none;
    transition: opacity 0.35s ease, transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .wa-flotante.muestra-burbuja .wa-burbuja,
  .wa-flotante:hover .wa-burbuja,
  .wa-flotante:focus-visible .wa-burbuja {
    opacity: 1;
    transform: none;
  }

  @keyframes wa-pulso {
    0%   { transform: scale(1);   opacity: 0.55; }
    70%  { transform: scale(1.75); opacity: 0; }
    100% { transform: scale(1.75); opacity: 0; }
  }
  @keyframes wa-entra {
    from { transform: scale(0) rotate(-40deg); opacity: 0; }
    to   { transform: scale(1) rotate(0);      opacity: 1; }
  }

  @media (max-width: 600px) {
    .wa-flotante { right: 16px; bottom: calc(16px + env(safe-area-inset-bottom, 0px)); }
    .wa-icono { width: 56px; height: 56px; }
    .wa-burbuja { display: none; }
  }
  @media (prefers-reduced-motion: reduce) {
    .wa-icono, .wa-icono::before, .wa-burbuja { animation: none; transition: none; }
  }`;

  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  const enlace = document.createElement('a');
  enlace.className = 'wa-flotante';
  enlace.href = `https://wa.me/${NUMERO}?text=${encodeURIComponent(MENSAJE)}`;
  enlace.target = '_blank';
  enlace.rel = 'noopener noreferrer';
  enlace.setAttribute('aria-label', 'Escríbenos por WhatsApp');
  enlace.innerHTML = `
    <span class="wa-burbuja">${TEXTO_BURBUJA}</span>
    <span class="wa-icono" aria-hidden="true">
      <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
    </span>`;
  document.body.appendChild(enlace);

  // La burbuja aparece una sola vez por visita, para no ser molesta
  let yaVista = false;
  try { yaVista = sessionStorage.getItem('waBurbujaVista') === '1'; } catch (e) {}
  if (!yaVista) {
    setTimeout(() => enlace.classList.add('muestra-burbuja'), MOSTRAR_BURBUJA_A_LOS);
    setTimeout(() => {
      enlace.classList.remove('muestra-burbuja');
      try { sessionStorage.setItem('waBurbujaVista', '1'); } catch (e) {}
    }, OCULTAR_BURBUJA_A_LOS);
  }
})();
