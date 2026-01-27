const appData = {
    noticias: [
        {
            titulo: "¡Confirmado: Survival Comunitario!",
            contenido: "Es oficial. AriesitoMc abrirá un servidor Survival para toda la comunidad a mediados de febrero. ¡Estén atentos a las redes!",
            fecha: "27/01/2026",
            icono: "bx-server",
            imagen: "" 
        },
        {
            titulo: "Optimización Visual Desplegada",
            contenido: "Se ha corregido el error del fondo y el parpadeo visual. La navegación ahora es fluida.",
            fecha: "27/01/2026",
            icono: "bx-paint",
            imagen: "" 
        },
        {
            titulo: "Bugs Críticos Solucionados",
            contenido: "Corrección de errores en el sistema de noticias y visualización móvil.",
            fecha: "27/01/2026",
            icono: "bx-bug-alt",
            imagen: "" 
        }
    ],
    proyectos: [
        {
            id: "survival",
            titulo: "Survival Ariesito",
            descripcion: "Próximamente: Febrero 2026",
            imagen: "https://i.postimg.cc/25tg6zFM/custom-ava.png"
        }
    ],
    redes: [
        { nombre: "YouTube", desc: "Tutoriales", url: "https://www.youtube.com/@soyariesitomc", icono: "bxl-youtube", color: "#ff0000" },
        { nombre: "WhatsApp", desc: "Noticias", url: "https://whatsapp.com/channel/0029Vb74InvEwEjnCiAVjD1b", icono: "bxl-whatsapp", color: "#25D366" }
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
    renderNoticias();
    
    const projGrid = document.getElementById('proyectos-grid');
    if (projGrid) {
        projGrid.innerHTML = appData.proyectos.map(p => `
            <div class="noticia-card" style="text-align:center;">
                <img src="${p.imagen}" style="width:100px; margin-bottom:1rem;">
                <h3>${p.titulo}</h3>
                <p>${p.descripcion}</p>
            </div>
        `).join('');
    }
}

document.addEventListener("DOMContentLoaded", initApp);
