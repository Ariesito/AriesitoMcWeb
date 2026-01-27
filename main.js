const appData = {
    noticias: [
        {
            titulo: "¡Confirmado: Survival Comunitario!",
            contenido: "Es oficial. AriesitoMc abrirá un servidor Survival para toda la comunidad a mediados de febrero. ¡Prepara tus herramientas!",
            fecha: "27/01/2026",
            icono: "bx-server"
        },
        {
            titulo: "Optimización Visual Desplegada",
            contenido: "Hemos corregido errores de carga en el fondo y mejorado la fluidez del scroll. La web ahora es de alto rendimiento.",
            fecha: "27/01/2026",
            icono: "bx-paint"
        },
        {
            titulo: "Bugs Críticos Solucionados",
            contenido: "Se han corregido errores en la navegación móvil y el sistema de renderizado de tarjetas.",
            fecha: "27/01/2026",
            icono: "bx-bug-alt"
        }
    ],
    proyectos: [
        {
            titulo: "Survival Ariesito",
            descripcion: "El servidor definitivo para la comunidad. Apertura: Febrero 2026.",
            imagen: "https://i.postimg.cc/25tg6zFM/custom-ava.png",
            estado: "Próximamente"
        }
    ],
    redes: [
        { nombre: "YouTube", desc: "Tutoriales y Reviews", url: "https://www.youtube.com/@soyariesitomc", icono: "bxl-youtube", color: "#ff0000" },
        { nombre: "TikTok", desc: "Clips y Adelantos", url: "https://www.tiktok.com/@soyariesitomc", icono: "bxl-tiktok", color: "#ff0050" },
        { nombre: "Discord", desc: "Comunidad y Soporte", url: "https://discord.gg/DgrckyxNMr", icono: "bxl-discord-alt", color: "#5865F2" },
        { nombre: "WhatsApp", desc: "Canal de Noticias", url: "https://whatsapp.com/channel/0029Vb74InvEwEjnCiAVjD1b", icono: "bxl-whatsapp", color: "#25D366" }
    ]
};

let showingAllNews = false;

function renderNoticias() {
    const newsGrid = document.getElementById('noticias-grid');
    if (!newsGrid) return;

    const noticiasParaMostrar = showingAllNews ? appData.noticias : appData.noticias.slice(0, 3);
    
    let html = noticiasParaMostrar.map(n => `
        <div class="noticia-card">
            <h3 style="color: white; margin-bottom:10px;"><i class='bx ${n.icono}'></i> ${n.titulo}</h3>
            <p style="color: #eee; font-size: 0.95rem; line-height: 1.4; margin-bottom:10px;">${n.contenido}</p>
            <small style="color: var(--morado-claro); font-weight: bold;">[${n.fecha}]</small>
        </div>
    `).join('');

    if (appData.noticias.length > 3) {
        html += `<button class="btn-show-more" onclick="toggleNews()">${showingAllNews ? 'Cerrar Historial' : 'Ver Noticias Anteriores'}</button>`;
    }
    newsGrid.innerHTML = html;
}

function toggleNews() {
    showingAllNews = !showingAllNews;
    renderNoticias();
}

function initApp() {
    // FIX NAV INDICATOR: Busca el link activo actual
    const activeLink = document.querySelector('.navbar-link.active');
    const indicator = document.querySelector('.indicator');
    if (activeLink && indicator) {
        indicator.style.width = `${activeLink.offsetWidth}px`;
        indicator.style.left = `${activeLink.offsetLeft}px`;
    }

    // Render Noticias (Página Inicio)
    renderNoticias();

    // Render Proyectos (Página Proyectos)
    const projGrid = document.getElementById('proyectos-grid');
    if (projGrid) {
        projGrid.innerHTML = appData.proyectos.map(p => `
            <div class="noticia-card" style="text-align:center;">
                <img src="${p.imagen}" style="width:120px; margin-bottom:1rem; filter: drop-shadow(0 0 10px var(--morado));">
                <h3>${p.titulo}</h3>
                <p style="color: #bbb; margin: 10px 0;">${p.descripcion}</p>
                <span style="color: var(--morado-claro); font-weight:bold;">${p.estado}</span>
            </div>
        `).join('');
    }

    // Render Redes (Página Redes)
    const redesCont = document.getElementById('redes-container');
    if (redesCont) {
        redesCont.innerHTML = appData.redes.map(r => `
            <div class="noticia-card" onclick="window.location.href='${r.url}'" style="display:flex; align-items:center; gap:20px; cursor:pointer;">
                <i class='bx ${r.icono}' style="color:${r.color}; font-size: 2.5rem;"></i>
                <div>
                    <h3 style="margin:0;">${r.nombre}</h3>
                    <p style="margin:0; font-size: 0.85rem; color: #aaa;">${r.desc}</p>
                </div>
            </div>
        `).join('');
    }
}

document.addEventListener("DOMContentLoaded", initApp);
        
