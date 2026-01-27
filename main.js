const appData = {
    noticias: [
        {
            titulo: "Optimización Visual Desplegada",
            contenido: "Hemos actualizado el motor de renderizado de la web para corregir errores de carga en el fondo y mejorar la fluidez general.",
            fecha: "27/01/2026",
            icono: "bx-paint",
            imagen: "" // Sin imagen
        },
        {
            titulo: "Bugs Críticos Solucionados",
            contenido: "Se han corregido múltiples errores reportados por la comunidad en la navegación móvil y el sistema de modales.",
            fecha: "27/01/2026",
            icono: "bx-bug-alt",
            imagen: "" // Sin imagen
        },
        {
            titulo: "Colaboración Revelada",
            contenido: "AriesitoMc se une con Faaak para traer la textura técnica definitiva: PurpleTech V1. Aún no hay fecha de Lanzamiento.",
            fecha: "14/01/2026",
            icono: "bxs-zap",
            imagen: "https://i.postimg.cc/DZt9rMP3/Purple-Tech.jpg"
        },
        {
            titulo: "Obsidian: ¡Ahora será un Cliente!",
            contenido: "Hemos decidido llevar Obsidian al siguiente nivel. Deja de ser solo una textura para convertirse en un cliente completo.",
            fecha: "14/01/2026",
            icono: "bxs-rocket",
            imagen: "https://i.postimg.cc/QNSfpPNj/obsidian.png"
        }
    ],
    proyectos: [
        {
            id: "obsidian",
            titulo: "Obsidian",
            descripcion: "El proyecto definitivo de texturas oscuras y optimización premium.",
            imagen: "https://i.postimg.cc/mgrqdjGk/pack-icon-2.png",
            version: "V2.3",
            enlace: "https://link-target.net/1356996/zMa3fwoanGAK",
            caracteristicas: ["Optimización de FPS", "Interfaz Oscura", "Mini Tools"]
        }
    ],
    redes: [
        { nombre: "YouTube", desc: "Tutoriales y Reviews", url: "https://www.youtube.com/@soyariesitomc", icono: "bxl-youtube", color: "#ff0000" },
        { nombre: "WhatsApp", desc: "Canal de Noticias", url: "https://whatsapp.com/channel/0029Vb74InvEwEjnCiAVjD1b", icono: "bxl-whatsapp", color: "#25D366" }
    ]
};

let showingAllNews = false;

function renderNoticias() {
    const newsGrid = document.getElementById('noticias-grid');
    if (!newsGrid) return;

    // Solo mostramos 3 noticias si 'showingAllNews' es falso
    const noticiasParaMostrar = showingAllNews ? appData.noticias : appData.noticias.slice(0, 3);
    
    let html = noticiasParaMostrar.map(n => `
        <div class="noticia-card">
            <h3 style="color: white; margin-bottom:10px;"><i class='bx ${n.icono}'></i> ${n.titulo}</h3>
            ${n.imagen ? `<img src="${n.imagen}" style="width:100%; border-radius:12px; margin-bottom:15px; border: 1px solid rgba(255,255,255,0.1);">` : ''}
            <p style="color: #eee; font-size: 0.95rem; line-height: 1.4; margin-bottom:10px;">${n.contenido}</p>
            <small style="color: var(--morado-claro); font-weight: bold;">[${n.fecha}]</small>
        </div>
    `).join('');

    // Añadir botón si hay más noticias ocultas
    if (appData.noticias.length > 3 && !showingAllNews) {
        html += `<button class="btn-show-more" onclick="toggleNews()">Ver Noticias Anteriores</button>`;
    } else if (showingAllNews) {
        html += `<button class="btn-show-more" onclick="toggleNews()">Cerrar Historial</button>`;
    }

    newsGrid.innerHTML = html;
}

function toggleNews() {
    showingAllNews = !showingAllNews;
    renderNoticias();
}

function initApp() {
    // Configurar indicador de navbar
    const activeLink = document.querySelector('.navbar-link.active');
    const indicator = document.querySelector('.indicator');
    if (activeLink && indicator) {
        indicator.style.width = `${activeLink.offsetWidth}px`;
        indicator.style.left = `${activeLink.offsetLeft}px`;
    }

    renderNoticias();

    // Render Proyectos
    const projGrid = document.getElementById('proyectos-grid');
    if (projGrid) {
        projGrid.innerHTML = appData.proyectos.map(p => `
            <div class="noticia-card" style="text-align:center;">
                <img src="${p.imagen}" style="width:100px; margin-bottom:1rem;">
                <h3>${p.titulo}</h3>
                <a href="${p.id}.html" class="btn-download" style="margin-top:10px;">Detalles</a>
            </div>
        `).join('');
    }

    // Render Redes
    const redesCont = document.getElementById('redes-container');
    if (redesCont) {
        redesCont.innerHTML = appData.redes.map(r => `
            <div class="noticia-card" onclick="window.location.href='${r.url}'" style="display:flex; align-items:center; gap:15px; cursor:pointer;">
                <i class='bx ${r.icono}' style="color:${r.color}; font-size: 2rem;"></i>
                <div><h3 style="margin:0;">${r.nombre}</h3></div>
            </div>
        `).join('');
    }
}

document.addEventListener("DOMContentLoaded", initApp);
    
