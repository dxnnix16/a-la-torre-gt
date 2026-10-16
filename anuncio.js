// =========================================================
// A La Torre GT · ANUNCIO DE LA PRÓXIMA SALIDA (solo en el inicio)
//
// Qué hace:
//   - ~3 s después de entrar al inicio muestra el póster 3:4 con su animación.
//   - Una sola vez por visita (si recargas o vuelves al inicio en la misma
//     pestaña, ya no molesta). Si cambias de póster, vuelve a salir solo.
//   - Espera a que se vaya la pantalla de carga, y no interrumpe si la
//     persona está usando el buscador.
//   - Si no encuentra la imagen, simplemente no aparece (nunca sale roto).
//
// Para PROBARLO sin esperar la regla de "una vez": abre index.html?anuncio
// ========================================================= 
(function () {
    'use strict';

    /* ====== CONFIGURACIÓN: lo único que tocas para cambiar el anuncio ====== */
    const ANUNCIO = {
        imagen:  'img/anuncio1',            // ruta SIN extensión (prueba .jpg .jpeg .png .webp .avif …)
        enlace:  'detalle.html?id=santa-maria',   // a dónde lleva el botón
        retraso: 3000,                      // milisegundos que espera antes de aparecer
        unaVez:  true                       // true = una vez por visita · false = cada vez que entra
    };
    const EXTENSIONES = ['jpg', 'jpeg', 'png', 'webp', 'avif', 'JPG', 'JPEG', 'PNG', 'WEBP', 'gif'];
    const MARGEN_ESPERA = 20000;            // si en ese tiempo extra no hubo buen momento, ya no sale

    const raiz = document.getElementById('anuncio');
    if (!raiz) return;

    const html   = document.documentElement;
    const card   = raiz.querySelector('.anu-card');
    const foto   = raiz.querySelector('.anu-foto img');
    const cta    = raiz.querySelector('.anu-cta');
    const equis  = raiz.querySelector('.anu-x');
    const brasas = raiz.querySelector('.anu-brasas');
    const reducir = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const llave = 'anuncio-visto:' + ANUNCIO.imagen;
    const forzar = new URLSearchParams(location.search).has('anuncio');

    let abierto = false;
    let previo = null;

    // ---- memoria de "ya lo vio" (por pestaña) ----
    function yaVisto() {
        if (forzar || !ANUNCIO.unaVez) return false;
        try { return sessionStorage.getItem(llave) === '1'; } catch (e) { return false; }
    }
    function marcarVisto() {
        try { sessionStorage.setItem(llave, '1'); } catch (e) { /* sin almacenamiento: no pasa nada */ }
    }
    if (yaVisto()) return;

    // ---- busca la imagen sin importar la extensión (se adelanta para que esté lista a los 3 s) ----
    function buscarImagen() {
        return new Promise(resolve => {
            let i = 0;
            (function probar() {
                if (i >= EXTENSIONES.length) return resolve(null);
                const url = ANUNCIO.imagen + '.' + EXTENSIONES[i++];
                const im = new Image();
                im.onload = () => resolve(url);
                im.onerror = probar;
                im.src = url;
            })();
        });
    }
    const imagenLista = buscarImagen();

    // ---- brasas que suben (se crean al abrir, se borran al cerrar) ----
    function crearBrasas() {
        brasas.textContent = '';
        if (reducir) return;
        const n = window.matchMedia('(max-width: 768px)').matches ? 16 : 28;
        const al = (a, b) => a + Math.random() * (b - a);
        const frag = document.createDocumentFragment();
        for (let i = 0; i < n; i++) {
            const b = document.createElement('i');
            b.className = 'anu-brasa';
            const centro = (Math.random() + Math.random()) / 2;   // se agrupan hacia el centro, como una columna de chispas
            b.style.cssText = '--x:' + (8 + centro * 84).toFixed(1) + '%;' +
                              '--dx:' + al(-90, 90).toFixed(0) + 'px;' +
                              '--s:' + al(3, 7).toFixed(1) + 'px;' +
                              '--d:' + al(5, 9).toFixed(1) + 's;' +
                              '--r:' + al(0.3, 5).toFixed(1) + 's';
            frag.appendChild(b);
        }
        brasas.appendChild(frag);
    }

    // ---- abrir / cerrar ----
    function abrir(url) {
        if (abierto) return;
        abierto = true;
        foto.src = url;
        cta.href = ANUNCIO.enlace;
        previo = document.activeElement;
        crearBrasas();
        raiz.hidden = false;
        html.classList.add('anu-bloqueo');
        raiz.classList.add('abierto');
        card.focus({ preventScroll: true });
        marcarVisto();
    }
    function cerrar() {
        if (!abierto) return;
        abierto = false;
        raiz.classList.remove('abierto');
        raiz.classList.add('cerrando');
        setTimeout(function () {
            raiz.hidden = true;
            raiz.classList.remove('cerrando');
            brasas.textContent = '';
            html.classList.remove('anu-bloqueo');
            if (previo && previo.focus) previo.focus({ preventScroll: true });
        }, reducir ? 0 : 380);
    }

    raiz.addEventListener('click', function (e) {
        if (e.target.closest('[data-anu-cerrar]')) cerrar();
    });
    document.addEventListener('keydown', function (e) {
        if (!abierto) return;
        if (e.key === 'Escape') { cerrar(); return; }
        if (e.key === 'Tab') {                                  // el foco se queda dentro del anuncio
            const f = [equis, cta];
            const i = f.indexOf(document.activeElement);
            if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); }
            else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
        }
    });
    // si la persona vuelve con el botón "atrás" y el navegador restaura la página abierta, lo cerramos
    window.addEventListener('pageshow', function (e) { if (e.persisted && abierto) cerrar(); });

    // ---- el momento justo ----
    function buenMomento() {
        if (abierto || document.hidden) return false;
        if (!html.classList.contains('listo')) return false;            // aún se ve la pantalla de carga
        if (html.classList.contains('ms-bloqueo')) return false;        // buscador móvil abierto
        if (document.querySelector('.search-dropdown.active')) return false;   // buscador de escritorio abierto
        const a = document.activeElement;
        if (a && a.id === 'search-input') return false;                 // está escribiendo
        return true;
    }

    const t0 = performance.now();
    function intentar() {
        if (!buenMomento()) {
            if (performance.now() - t0 < ANUNCIO.retraso + MARGEN_ESPERA) setTimeout(intentar, 1000);
            return;
        }
        imagenLista.then(function (url) {
            if (url) abrir(url);
            else console.warn('[anuncio] No encontré ' + ANUNCIO.imagen + '.(jpg|jpeg|png|webp|avif). Guárdala en esa carpeta con ese nombre.');
        });
    }
    setTimeout(intentar, ANUNCIO.retraso);
})();
