const appData = {
    noticias: [
        { titulo: "Survival Comunitario", contenido: "AriesitoMc abrirá un servidor Survival para toda la comunidad a mediados de febrero. ¡Prepárate para la aventura técnica!", fecha: "27 ENERO 2026", icono: "bx-server" },
        { titulo: "Optimización Desplegada", contenido: "Hemos implementado el sistema Glass Dark Premium y corregido los errores de visualización en dispositivos móviles.", fecha: "27 ENERO 2026", icono: "bx-paint" },
        { titulo: "Aviso de Inactividad", contenido: "Estaré ausente por tiempo indefinido debido a problemas con mi dispositivo móvil. Gracias por su lealtad y paciencia.", fecha: "20 ENERO 2026", icono: "bx-mobile-vibration" },
        { titulo: "Obsidian: El Legado", contenido: "Obsidian alcanza su versión final estable. El proyecto se detiene aquí como el estándar de optimización de la comunidad.", fecha: "15 ENERO 2026", icono: "bx-archive" }
    ],
    proyectos: [
        { id: "survival", titulo: "Survival Ariesito", desc: "El servidor técnico definitivo.", img: "https://i.postimg.cc/25tg6zFM/custom-ava.png", link: "#", btn: "Próximamente", disabled: true },
        { id: "obsidian", titulo: "Obsidian Optimizador", desc: "Boost de FPS y reducción de Input Lag.", img: "https://i.postimg.cc/mgrqdjGk/pack-icon-2.png", link: "obsidian.html", enlace: "https://link-target.net/1356996/zMa3fwoanGAK", btn: "Ficha Técnica", disabled: false }
    ],
    redes: [
        { nombre: "YouTube", desc: "Tutoriales y Optimización.", url: "https://www.youtube.com/@soyariesitomc", icono: "bxl-youtube", color: "#ff0000" },
        { nombre: "TikTok", desc: "Clips y noticias rápidas.", url: "https://www.tiktok.com/@soyariesitomc", icono: "bxl-tiktok", color: "#fff" },
        { nombre: "WhatsApp", desc: "Canal de anuncios directos.", url: "https://whatsapp.com/channel/0029Vb74InvEwEjnCiAVjD1b", icono: "bxl-whatsapp", color: "#25D366" },
        { nombre: "Discord", desc: "La casa de la comunidad.", url: "https://discord.gg/DgrckyxNMr", icono: "bxl-discord-alt", color: "#5865F2" }
    ]
};

// 1. GESTIÓN DE NAVBAR (FIX INDICATOR - Punto 2)
function updateNavbar() {
    const path = window.location.pathname;
    const page = path.split("/").pop() || "index.html";
    const links = document.querySelectorAll('.navbar-link');
    const indicator = document.querySelector('.indicator');

    links.forEach(link => {
        const href = link.getAttribute('href');
        if (href === page) {
            link.classList.add('active');
            // Timeout para asegurar que el DOM calculó bien la posición
            setTimeout(() => {
                indicator.style.left = `${link.offsetLeft}px`;
                indicator.style.width = `${link.offsetWidth}px`;
                indicator.style.opacity = "1";
            }, 50);
        } else {
            link.classList.remove('active');
        }
    });
}

// 2. RENDERIZADO GENERAL
function init() {
    updateNavbar();
    
    const newsGrid = document.getElementById('noticias-grid');
    if (newsGrid) {
        newsGrid.innerHTML = appData.noticias.map(n => `
            <div class="noticia-card">
                <h3 style="display:flex; align-items:center; gap:10px;"><i class='bx ${n.icono}'></i> ${n.titulo}</h3>
                <p style="margin-top:10px; color:#aaa; font-size:0.9rem;">${n.contenido}</p>
                <span class="fecha-bottom">${n.fecha}</span>
            </div>
        `).join('');
    }

    const projGrid = document.getElementById('proyectos-grid');
    if (projGrid) {
        projGrid.innerHTML = appData.proyectos.map(p => `
            <div class="noticia-card" style="text-align:center;">
                <img src="${p.img}" style="width:80px; margin-bottom:15px;">
                <h3>${p.titulo}</h3>
                <p style="margin:10px 0; color:#aaa; font-size:0.85rem;">${p.desc}</p>
                ${p.disabled ? `<button class="btn-download disabled">${p.btn}</button>` : `<a href="${p.link}" class="btn-download">${p.btn}</a>`}
            </div>
        `).join('');
    }

    const redesCont = document.getElementById('redes-container');
    if (redesCont) {
        redesCont.innerHTML = appData.redes.map(r => `
            <div class="noticia-card" onclick="window.location.href='${r.url}'" style="cursor:pointer; display:flex; align-items:center; gap:20px;">
                <i class='bx ${r.icono}' style="font-size:2rem; color:${r.color}"></i>
                <div>
                    <h3 style="margin:0;">${r.nombre}</h3>
                    <p style="margin:0; font-size:0.8rem; color:#888;">${r.desc}</p>
                </div>
            </div>
        `).join('');
    }

    const det = document.getElementById('detalle-container');
    if (det) {
        const p = appData.proyectos.find(x => x.id === "obsidian");
        // CARACTERÍSTICAS AMPLIADAS (Punto 3)
        det.innerHTML = `
            <div class="glass" style="text-align:center;">
                <img src="${p.img}" style="width:120px; filter:drop-shadow(0 0 15px var(--morado));">
                <h1 style="margin:20px 0;">${p.titulo}</h1>
                <div style="text-align:left; background:rgba(255,255,255,0.03); padding:20px; border-radius:15px; border:1px solid rgba(255,255,255,0.05); display:grid; grid-template-columns: 1fr 1fr; gap:10px;">
                    <p><i class='bx bx-bolt-circle' style="color:var(--morado-claro)"></i> Boost de FPS+</p>
                    <p><i class='bx bx-target-lock' style="color:var(--morado-claro)"></i> Zero Input Lag</p>
                    <p><i class='bx bx-cloud-lightrain' style="color:var(--morado-claro)"></i> Sin Partículas</p>
                    <p><i class='bx bx-moon' style="color:var(--morado-claro)"></i> Cielo Galáctico</p>
                    <p><i class='bx bx-chip' style="color:var(--morado-claro)"></i> RAM Optimizada</p>
                    <p><i class='bx bx-shield-quarter' style="color:var(--morado-claro)"></i> Antilag System</p>
                    <p><i class='bx bx-unite' style="color:var(--morado-claro)"></i> UI Minimalista</p>
                    <p><i class='bx bx-code-alt' style="color:var(--morado-claro)"></i> Scripts Limpios</p>
                </div>
                <button onclick="abrirAviso('${p.enlace}')" class="btn-download" style="margin-top:20px;">DESCARGAR AHORA</button>
            </div>
        `;
    }
}

// 3. CONTROL DE ANIMACIÓN DE CARGA (Punto 5)
function handleLoader() {
    const loader = document.getElementById('loader-wrapper');
    if (!loader) return;

    // Si es una navegación interna (SPA-like) o ya cargó recientemente, ocultar rápido
    if (sessionStorage.getItem('visited')) {
        loader.style.display = 'none';
    } else {
        // Primera vez abriendo el navegador o link externo
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
                sessionStorage.setItem('visited', 'true');
            }, 600);
        }, 1500);
    }
}

// Reset del visited al cerrar pestaña para que aparezca la animación si vuelve a entrar de cero
window.addEventListener('beforeunload', () => {
    // Solo si quieres que se resetee al cerrar. Si quieres que nunca más aparezca, quita esto.
});

window.addEventListener('load', handleLoader);

let pendingUrl = "";
function abrirAviso(url) { pendingUrl = url; document.getElementById('modal-aviso').classList.add('active'); }
function cerrarAviso() { document.getElementById('modal-aviso').classList.remove('active'); }
function continuarDescarga() { if (pendingUrl) window.open(pendingUrl, '_blank'); cerrarAviso(); }

document.addEventListener("DOMContentLoaded", init);
        
