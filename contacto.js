/* =========================================================
   CONTACTO · A La Torre GT
   El formulario arma el mensaje y abre WhatsApp con tu número.
   (No necesita servidor. Si luego quieres recibirlo por correo,
   se cambia la parte marcada "ENVÍO".)
   ========================================================= */
(function () {
  const NUMERO_NEGOCIO = '50230554595';   // +502 3055 4595

  const form = document.getElementById('ctForm');
  if (!form) return;

  const card = document.getElementById('ctCard');
  const exito = document.getElementById('ctExito');
  const nombreExito = document.getElementById('ctNombreExito');
  const botonWa = document.getElementById('ctAbrirWa');
  const botonOtro = document.getElementById('ctOtro');

  /* ---------- validación ---------- */
  const reglas = {
    nombre:   v => v.trim().length >= 2 || 'Escribe tu nombre.',
    apellido: v => v.trim().length >= 2 || 'Escribe tu apellido.',
    telefono: v => {
      const digitos = v.replace(/\D/g, '');
      return (digitos.length >= 8 && digitos.length <= 15) || 'Revisa tu número de WhatsApp.';
    },
    mensaje:  v => v.trim().length >= 10 || 'Cuéntanos un poquito más (mínimo 10 caracteres).'
  };

  function validarCampo(nombre) {
    const input = form.elements[nombre];
    const contenedor = input.closest('.ct-campo');
    const resultado = reglas[nombre](input.value);
    const error = contenedor.querySelector('.ct-error');
    const esValido = resultado === true;

    contenedor.classList.toggle('tiene-error', !esValido);
    input.setAttribute('aria-invalid', String(!esValido));
    error.textContent = esValido ? '' : resultado;
    return esValido;
  }

  Object.keys(reglas).forEach(nombre => {
    const input = form.elements[nombre];
    input.addEventListener('blur', () => { if (input.value) validarCampo(nombre); });
    input.addEventListener('input', () => {
      if (input.closest('.ct-campo').classList.contains('tiene-error')) validarCampo(nombre);
    });
  });

  /* ---------- utilidades ---------- */
  // 5555 1234 -> +502 5555 1234 ; si ya trae código de país se respeta
  function normalizarTelefono(texto) {
    const t = texto.trim();
    const digitos = t.replace(/\D/g, '');
    if (t.startsWith('+')) return '+' + digitos;
    if (digitos.length === 8) return `+502 ${digitos.slice(0, 4)} ${digitos.slice(4)}`;
    return '+' + digitos;
  }

  function armarMensaje(datos) {
    const lineas = ['Hola, A La Torre GT 👋', `Soy ${datos.nombre} ${datos.apellido}.`];
    if (datos.interes) lineas.push(`Me interesa: ${datos.interes}.`);
    lineas.push('', datos.mensaje, '', `Mi WhatsApp: ${datos.telefono}`);
    return lineas.join('\n');
  }

  /* ---------- envío ---------- */
  form.addEventListener('submit', evento => {
    evento.preventDefault();

    const resultados = Object.keys(reglas).map(validarCampo);
    if (resultados.includes(false)) {
      const primero = form.querySelector('.tiene-error input, .tiene-error textarea');
      if (primero) primero.focus();
      return;
    }

    const datos = {
      nombre: form.elements.nombre.value.trim(),
      apellido: form.elements.apellido.value.trim(),
      telefono: normalizarTelefono(form.elements.telefono.value),
      interes: form.elements.interes.value,
      mensaje: form.elements.mensaje.value.trim()
    };

    // ===== ENVÍO: aquí se abre WhatsApp con el mensaje ya escrito =====
    const url = `https://wa.me/${NUMERO_NEGOCIO}?text=${encodeURIComponent(armarMensaje(datos))}`;
    window.open(url, '_blank', 'noopener');
    // ==================================================================

    botonWa.href = url;
    nombreExito.textContent = datos.nombre;
    form.hidden = true;
    exito.hidden = false;
    card.classList.add('enviado');
    exito.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  botonOtro.addEventListener('click', () => {
    form.reset();
    form.hidden = false;
    exito.hidden = true;
    card.classList.remove('enviado');
    form.elements.nombre.focus();
  });
})();
