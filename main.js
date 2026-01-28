const appData = {
    noticias: [
        {
            titulo: "¡Confirmado: Survival Comunitario!",
            contenido: "AriesitoMc abrirá un servidor Survival para toda la comunidad. Apertura programada para mediados de febrero.",
            fecha: "27/01/2026",
            icono: "bx-server"
        },
        {
            titulo: "Optimización Visual Desplegada",
            contenido: "Se ha corregido el error del fondo y el parpadeo visual. Ahora la web es totalmente fluida.",
            fecha: "27/01/2026",
            icono: "bx-paint"
        },
        {
            titulo: "Bugs Críticos Solucionados",
            contenido: "Corrección de errores en el sistema de noticias y visualización en dispositivos móviles.",
            fecha: "27/01/2026",
            icono: "bx-bug-alt"
        }
    ],
    proyectos: [
        {
            id: "survival",
            titulo: "Survival Ariesito",
            descripcion: "Servidor Survival técnico y comunitario. ¡Hype por febrero!",
            imagen: "https://i.postimg.cc/25tg6zFM/custom-ava.png",
            estado: "PRÓXIMAMENTE",
            link: "#"
        },
        {
            id: "obsidian",
            titulo: "Obsidian Optimizador",
            descripcion: "El optimizador definitivo para maximizar FPS y reducir Input Lag. Rendimiento puro para competitivos.",
            imagen: "https://i.postimg.cc/mgrqdjGk/pack-icon-2.png",
            estado: "LEGADO",
            link: "obsidian.html",
            version: "V2.3 (Final)",
            actualizacion: "Hace 5 Meses",
            enlace: "https://link-target.net/1356996/zMa3fwoanGAK",
            caracteristicas: ["Boost de FPS (+40%)", "Reducción de Latencia", "Cielos Optimizados", "Mini Tools", "Sin Partículas"]
        }
    ],
    redes: [
        { nombre: "YouTube", desc: "Tutoriales", url: "https://www.youtube.com/@soyariesitomc", icono: "bxl-youtube", color: "#ff0000" },
        { nombre: "WhatsApp", desc: "Canal", url: "https://whatsapp.com/channel/0029Vb74InvEwEjnCiAVjD1b", icono: "bxl-whatsapp", color: "#25D366" }
    ]
};

let showingAllNews = false;
let pendingUrl = "";

function renderNoticias() {
    const newsGrid = document.getElementById('noticias-grid');
    if (!newsGrid) return;
    const mostrar = showingAllNews ? appData.noticias : appData.noticias.slice(0, 2);
    let html = mostrar.map(n => `
        <div class="noticia-card">
            <h3><i class='bx ${n.icono}'></i> ${n.titulo}</h3>
            <p>${n.contenido}</p>
            <small style="color:var(--morado-claro)">${n.fecha}</small>
        </div>
    `).join('');
    if (appData.noticias.length > 2) {
        html += `<button class="btn-show-more" onclick="toggleNews()">${showingAllNews ? 'Ver menos' : 'Ver noticias anteriores'}</button>`;
    }
    newsGrid.innerHTML = html;
}

function toggleNews() { showingAllNews = !showingAllNews; renderNoticias(); }

function abrirAviso(url) { 
    pendingUrl = url; 
    const modal = document.getElementById('modal-aviso');
    if(modal) { modal.style.display = 'flex'; setTimeout(() => { modal.classList.add('active'); }, 10); }
}

function cerrarAviso() { 
    const modal = document.getElementById('modal-aviso');
    if(modal) { modal.classList.remove('active'); setTimeout(() => { modal.style.display = 'none'; }, 300); }
}

function continuarDescarga() { if (pendingUrl) { window.open(pendingUrl, '_blank'); cerrarAviso(); } }

function initApp() {
    setTimeout(() => {
        const activeLink = document.querySelector('.navbar-link.active');
        const indicator = document.querySelector('.indicator');
        if (activeLink && indicator) {
            indicator.style.width = `${activeLink.offsetWidth}px`;
            indicator.style.left = `${activeLink.offsetLeft}px`;
        }
    }, 100);
    renderNoticias();
    const projGrid = document.getElementById('proyectos-grid');
    if (projGrid) {
        projGrid.innerHTML = appData.proyectos.map(p => `
            <div class="noticia-card" style="text-align:center;">
                <img src="${p.imagen}" style="width:100px; margin-bottom:1rem;">
                <h3>${p.titulo}</h3>
                <p style="font-size:0.8rem; margin:10px 0;">${p.descripcion}</p>
                <a href="${p.link}" class="btn-download" style="padding:10px; font-size:0.8rem;">Ver Detalles</a>
            </div>
        `).join('');
    }
    const det = document.getElementById('detalle-container');
    if (det) {
        const p = appData.proyectos.find(x => x.id === "obsidian");
        det.innerHTML = `
            <div class="glass" style="text-align: center;">
                <img src="${p.imagen}" style="width:150px; margin-bottom:20px;">
                <h1>${p.titulo}</h1>
                <div style="text-align:left; background:rgba(255,255,255,0.05); padding:15px; border-radius:15px; margin:20px 0;">
                    <p><strong>Tipo:</strong> Optimizador de FPS</p>
                    <p><strong>Estatus:</strong> ${p.estado}</p>
                </div>
                <div style="text-align:left; margin-bottom:20px;">
                    ${p.caracteristicas.map(c => `<p><i class='bx bx-check-circle'></i> ${c}</p>`).join('')}
                </div>
                <button onclick="abrirAviso('${p.enlace}')" class="btn-download">Descargar Ahora</button>
            </div>
        `;
    }
}
document.addEventListener("DOMContentLoaded", initApp);
            
