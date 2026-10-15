/* =====================================================================
   imagenes.js  ·  A La Torre GT
   Carga de fotos AUTOMÁTICA: no importa la extensión.

   CÓMO FUNCIONA
   - El "nombre base" de cada destino sale de su campo `imagen` en
     destinos-data.js, sin la extensión.
         "img/rostromaya.webp"  ->  nombre base "img/rostromaya"
   - Guarda las fotos en la carpeta img/ así:
         rostromaya        (foto principal / portada)
         rostromaya1
         rostromaya2
         rostromaya3 ...   (las que quieras, sin tocar el código)
   - Extensiones aceptadas: jpg, jpeg, png, webp, avif, gif
     (también JPG, JPEG, PNG, WEBP en mayúsculas).
   - Si falta un número en medio (hay 3 y 5 pero no 4) igual las encuentra:
     tolera huecos de hasta 2 números seguidos.
   - El navegador no puede "listar" una carpeta, así que prueba los nombres.
     Por eso las fotos de la galería deben llamarse nombre1, nombre2...
     (sin guiones ni espacios).
   - Opcional: si quieres otro nombre base distinto al de `imagen`,
     agrega en el destino:  fotoBase: "img/otro-nombre"
   ===================================================================== */
const Imagenes = (() => {
    const EXTENSIONES = ['jpg', 'jpeg', 'png', 'webp', 'avif', 'gif', 'JPG', 'JPEG', 'PNG', 'WEBP'];
    const MAX_FOTOS = 40;      // tope de fotos por destino
    const HUECOS = 2;          // cuántos números vacíos seguidos tolera antes de parar
    const LOTE = 6;            // cuántos números prueba a la vez
    const VACIA = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

    const memoria = new Map(); // nombre base -> url encontrada (o null)

    // ---------- utilidades ----------
    const quitarExt = s => String(s || '').replace(/\.[a-z0-9]{2,5}$/i, '');
    const base = d => quitarExt(d && (d.fotoBase || d.imagen));

    const probar = url => new Promise(res => {
        const im = new Image();
        im.onload = () => res(true);
        im.onerror = () => res(false);
        im.src = url;
    });

    // Se recuerda la extensión que funcionó mientras la pestaña esté abierta
    const leerCache = b => { try { return sessionStorage.getItem('alt_img:' + b); } catch (e) { return null; } };
    const guardarCache = (b, url) => { try { sessionStorage.setItem('alt_img:' + b, url); } catch (e) {} };
    const borrarCache = b => { try { sessionStorage.removeItem('alt_img:' + b); } catch (e) {} };

    // ---------- buscar UNA foto por nombre base (cualquier extensión) ----------
    // descartar: url que ya sabemos que NO funciona (para no repetirla)
    async function buscar(b, descartar) {
        if (!b) return null;
        const cacheada = memoria.get(b) || leerCache(b);
        if (cacheada && cacheada !== descartar && await probar(cacheada)) {
            memoria.set(b, cacheada);
            return cacheada;
        }
        borrarCache(b);
        const candidatas = EXTENSIONES.map(e => `${b}.${e}`).filter(u => u !== descartar);
        const resultados = await Promise.all(candidatas.map(probar));
        const i = resultados.indexOf(true);
        const url = i >= 0 ? candidatas[i] : null;
        memoria.set(b, url);
        if (url) guardarCache(b, url);
        return url;
    }

    // Foto principal del destino (con su extensión real)
    async function principal(d) {
        const b = base(d);
        // 1) lo más común: la extensión escrita en `imagen` es la correcta (1 sola petición)
        if (d.imagen && await probar(d.imagen)) { memoria.set(b, d.imagen); return d.imagen; }
        // 2) si no, se prueban las demás extensiones
        return buscar(b, d.imagen);
    }

    // Galería: nombre, nombre1, nombre2... (+ las de `fotos: [...]` que sí existan)
    async function galeria(d) {
        const b = base(d);
        const lista = [];
        const portada = await principal(d);
        if (portada) lista.push(portada);

        let n = 1, ultimo = 0;
        while (n <= MAX_FOTOS && n - ultimo <= HUECOS) {
            const lote = [];
            for (let k = 0; k < LOTE && n + k <= MAX_FOTOS; k++) lote.push(n + k);
            const urls = await Promise.all(lote.map(i => buscar(b + i)));
            lote.forEach((i, k) => { if (urls[k]) { lista.push(urls[k]); ultimo = i; } });
            n += LOTE;
        }

        // fotos escritas a mano en `fotos: [...]`: se agregan solo si existen y no están repetidas
        if (Array.isArray(d.fotos)) {
            const extra = d.fotos.filter(u => u && !lista.includes(u));
            const ok = await Promise.all(extra.map(probar));
            extra.forEach((u, i) => { if (ok[i]) lista.push(u); });
        }
        return lista;
    }

    // ---------- <img data-foto="img/nombre">: se corrige sola si la extensión falla ----------
    document.addEventListener('error', async e => {
        const el = e.target;
        if (!el || el.tagName !== 'IMG' || !el.dataset.foto || el.dataset.fotoIntentada) return;
        el.dataset.fotoIntentada = '1';
        const url = await buscar(el.dataset.foto, el.getAttribute('src'));
        if (url) el.src = url;
        else { el.src = VACIA; el.style.background = 'linear-gradient(135deg,#d9dee3,#b7c0c8)'; }
    }, true);

    // ---------- elementos con foto de fondo (no avisan cuando fallan) ----------
    // Uso: <div data-foto="img/nombre" style="background-image:url('img/nombre.webp')">
    function corregirFondos(raiz) {
        (raiz || document).querySelectorAll('[data-foto]:not(img)').forEach(async el => {
            const m = (el.style.backgroundImage || '').match(/url\(["']?(.*?)["']?\)/);
            const actual = m ? m[1] : '';
            const url = (actual && await probar(actual)) ? actual : await buscar(el.dataset.foto, actual);
            if (url && url !== actual) el.style.backgroundImage = `url('${url}')`;
        });
    }

    return { base, principal, galeria, buscar, corregirFondos, VACIA };
})();
