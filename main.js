// LÓGICA DE CARGA INICIAL (LocalStorage)
window.addEventListener('load', () => {
    const loader = document.getElementById('loader-wrapper');
    if (!loader) return;

    const hasLoaded = localStorage.getItem('siteLoaded');
    const isHome = window.location.pathname.endsWith('index.html') || window.location.pathname === '/';

    if (!hasLoaded && isHome) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => loader.style.display = 'none', 500);
            localStorage.setItem('siteLoaded', 'true');
        }, 2000); // 2 segundos de animación
    } else {
        loader.style.display = 'none';
    }
});

const appData = {
    noticias: [
        { titulo: "¡Confirmado: Survival Comunitario!", contenido: "AriesitoMc abrirá un servidor Survival para toda la comunidad a mediados de febrero.", fecha: "27/01/2026", icono: "bx-server" },
        { titulo: "Optimización Visual Desplegada", contenido: "Se ha corregido el error del fondo y el parpadeo visual. Web fluida.", fecha: "27/01/2026", icono: "bx-paint" },
        { titulo: "Bugs Críticos Solucionados", contenido: "Corrección de errores en navegación y modal de descarga.", fecha: "27/01/2026", icono: "bx-bug-alt" },
        // NOTICIAS OCULTAS
        { titulo: "Ariesito Estará Inactivo", contenido: "Debido a proyectos personales, la actividad será reducida temporalmente.", fecha: "10/01/2026", icono: "bx-timer" },
        { titulo: "Obsidian: Fin de Soporte", contenido: "El pack Obsidian ya no recibirá más actualizaciones oficiales.", fecha: "05/01/2026", icono: "bx-archive" }
    ],
    proyectos: [
        { id: "survival", titulo: "Survival Ariesito", descripcion: "Servidor técnico comunitario. Hype para febrero.", imagen: "https://i.postimg.cc/25tg6zFM/custom-ava.png", estado: "PRÓXIMAMENTE", link: "#" },
        { id: "obsidian", titulo: "Obsidian Optimizador", descripcion: "Boost de FPS y reducción de Input Lag. Rendimiento puro.", imagen: "https://i.postimg.cc/mgrqdjGk/pack-icon-2.png", estado: "LEGADO", link: "obsidian.html", version: "V2.3", enlace: "https://link-target.net/1356996/zMa3fwoanGAK", caracteristicas: ["Boost FPS", "No Partículas", "Mini Tools"] }
    ],
    redes: [
        { nombre: "YouTube", desc: "Tutoriales", url: "https://www.youtube.com/@soyariesitomc", icono: "bxl-youtube", color: "#ff0000" },
        { nombre: "WhatsApp", desc: "Canal", url: "https://whatsapp.com/channel/0029Vb74InvEwEjnCiAVjD1b", icono: "bxl-whatsapp", color: "#25D366" },
        { nombre: "TikTok", desc: "Clips", url: "https://www.tiktok.com/@soyariesitomc", icono: "bxl-tiktok", color: "#fff" }
    ]
};

let showingAllNews = false;
let pendingUrl = "";

function renderNoticias() {
    const newsGrid = document.getElementById('noticias-grid');
    if (!newsGrid) return;
    const mostrar = showingAllNews ? appData.noticias : appData.noticias.slice(0, 3);
    let html = mostrar.map(n => `
        <div class="noticia-card">
            <h3><i class='bx ${n.icono}'></i> ${n.titulo}</h3>
            <p>${n.contenido}</p>
            <small style="color:var(--morado-claro)">${n.fecha}</small>
        </div>
    `).join('');
    if (appData.noticias.length > 3) {
        html += `<button class="btn-show-more" onclick="toggleNews()">${showingAllNews ? 'Ver menos' : 'Ver noticias anteriores'}</button>`;
    }
    newsGrid.innerHTML = html;
}

function toggleNews() { showingAllNews = !showingAllNews; renderNoticias(); }

function abrirAviso(url) { 
    pendingUrl = url; 
    const modal = document.getElementById('modal-aviso');
    if(modal) { modal.style.display = 'flex'; setTimeout(() => modal.classList.add('active'), 10); }
}

function cerrarAviso() { 
    const modal = document.getElementById('modal-aviso');
    if(modal) { modal.classList.remove('active'); setTimeout(() => modal.style.display = 'none', 300); }
}

function continuarDescarga() { if (pendingUrl) { window.open(pendingUrl, '_blank'); cerrarAviso(); } }

function initApp() {
    // Nav Indicator
    const activeLink = document.querySelector('.navbar-link.active');
    const indicator = document.querySelector('.indicator');
    if (activeLink && indicator) {
        indicator.style.width = `${activeLink.offsetWidth}px`;
        indicator.style.left = `${activeLink.offsetLeft}px`;
    }

    renderNoticias();

    // Redes
    const redesCont = document.getElementById('redes-container');
    if (redesCont) {
        redesCont.innerHTML = appData.redes.map(r => `
            <div class="noticia-card" onclick="window.location.href='${r.url}'" style="cursor:pointer; display:flex; align-items:center; gap:15px;">
                <i class='bx ${r.icono}' style="font-size:2rem; color:${r.color}"></i>
                <div><h3>${r.nombre}</h3><p style="font-size:0.8rem">${r.desc}</p></div>
            </div>
        `).join('');
    }

    // Proyectos
    const projGrid = document.getElementById('proyectos-grid');
    if (projGrid) {
        projGrid.innerHTML = appData.proyectos.map(p => `
            <div class="noticia-card" style="text-align:center;">
                <img src="${p.imagen}" style="width:80px; margin-bottom:10px;">
                <h3>${p.titulo}</h3>
                <a href="${p.link}" class="btn-download" style="padding:8px; margin-top:10px; font-size:0.8rem;">Ver Detalles</a>
            </div>
        `).join('');
    }

    // Detalle Obsidian
    const det = document.getElementById('detalle-container');
    if (det) {
        const p = appData.proyectos.find(x => x.id === "obsidian");
        det.innerHTML = `
            <div class="glass" style="text-align: center;">
                <img src="${p.imagen}" style="width:120px; margin-bottom:20px;">
                <h1>${p.titulo}</h1>
                <p style="margin:20px 0;">${p.descripcion}</p>
                <button onclick="abrirAviso('${p.enlace}')" class="btn-download">Descargar Ahora</button>
            </div>
        `;
    }
}
document.addEventListener("DOMContentLoaded", initApp);
        
