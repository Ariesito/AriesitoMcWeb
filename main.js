// LÓGICA DE CARGA CON MEMORIA (Solo aparece al abrir la web)
window.addEventListener('load', () => {
    const loader = document.getElementById('loader-wrapper');
    if (!loader) return;

    const sessionLoaded = sessionStorage.getItem('firstLoad');

    if (!sessionLoaded) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => loader.style.display = 'none', 500);
            sessionStorage.setItem('firstLoad', 'true');
        }, 2000);
    } else {
        loader.style.display = 'none';
    }
});

const appData = {
    noticias: [
        { titulo: "¡Confirmado: Survival Comunitario!", contenido: "AriesitoMc abrirá un servidor Survival para toda la comunidad a mediados de febrero.", fecha: "27/01/2026", icono: "bx-server" },
        { titulo: "Optimización Visual Desplegada", contenido: "Se ha corregido el error del fondo y el parpadeo visual. Web fluida.", fecha: "27/01/2026", icono: "bx-paint" },
        { titulo: "Bugs Críticos Solucionados", contenido: "Corrección de errores en navegación y modal de descarga.", fecha: "27/01/2026", icono: "bx-bug-alt" },
        // OCULTAS
        { titulo: "Ariesito Estará Inactivo", contenido: "Debido a proyectos personales, la actividad será reducida temporalmente.", fecha: "10/01/2026", icono: "bx-timer" },
        { titulo: "Obsidian: Fin de Soporte", contenido: "El pack Obsidian ya no recibirá más actualizaciones oficiales.", fecha: "05/01/2026", icono: "bx-archive" }
    ],
    proyectos: [
        { id: "survival", titulo: "Survival Ariesito", desc: "Servidor técnico comunitario. Hype para febrero.", img: "https://i.postimg.cc/25tg6zFM/custom-ava.png", link: "#" },
        { id: "obsidian", titulo: "Obsidian Optimizador", desc: "Boost de FPS y reducción de Input Lag. Rendimiento puro.", img: "https://i.postimg.cc/mgrqdjGk/pack-icon-2.png", link: "obsidian.html", enlace: "https://link-target.net/1356996/zMa3fwoanGAK" }
    ],
    redes: [
        { nombre: "YouTube", url: "https://www.youtube.com/@soyariesitomc", icono: "bxl-youtube", color: "#ff0000" },
        { nombre: "TikTok", url: "https://www.tiktok.com/@soyariesitomc", icono: "bxl-tiktok", color: "#fff" },
        { nombre: "WhatsApp", url: "https://whatsapp.com/channel/0029Vb74InvEwEjnCiAVjD1b", icono: "bxl-whatsapp", color: "#25D366" },
        { nombre: "Discord", url: "https://discord.gg/DgrckyxNMr", icono: "bxl-discord-alt", color: "#5865F2" }
    ]
};

let showingAllNews = false;
let pendingUrl = "";

function renderNoticias() {
    const newsGrid = document.getElementById('noticias-grid');
    if (!newsGrid) return;
    const items = showingAllNews ? appData.noticias : appData.noticias.slice(0, 3);
    newsGrid.innerHTML = items.map(n => `
        <div class="noticia-card">
            <h3><i class='bx ${n.icono}'></i> ${n.titulo}</h3>
            <p>${n.contenido}</p>
            <small style="color:var(--morado-claro)">${n.fecha}</small>
        </div>
    `).join('') + (appData.noticias.length > 3 ? `<button class="btn-show-more" onclick="toggleNews()">${showingAllNews ? 'Ver menos' : 'Ver noticias anteriores'}</button>` : '');
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
    // Nav Indicator Fix
    setTimeout(() => {
        const activeLink = document.querySelector('.navbar-link.active');
        const indicator = document.querySelector('.indicator');
        if (activeLink && indicator) {
            indicator.style.width = `${activeLink.offsetWidth}px`;
            indicator.style.left = `${activeLink.offsetLeft}px`;
        }
    }, 100);

    renderNoticias();

    // Redes Render
    const redesCont = document.getElementById('redes-container');
    if (redesCont) {
        redesCont.innerHTML = appData.redes.map(r => `
            <div class="noticia-card" onclick="window.location.href='${r.url}'" style="cursor:pointer; display:flex; align-items:center; gap:15px;">
                <i class='bx ${r.icono}' style="font-size:2rem; color:${r.color}"></i>
                <h3>${r.nombre}</h3>
            </div>
        `).join('');
    }

    // Proyectos Render
    const projGrid = document.getElementById('proyectos-grid');
    if (projGrid) {
        projGrid.innerHTML = appData.proyectos.map(p => `
            <div class="noticia-card" style="text-align:center;">
                <img src="${p.img}" style="width:80px; margin-bottom:10px;">
                <h3>${p.titulo}</h3>
                <p style="font-size:0.8rem; margin:10px 0;">${p.desc}</p>
                <a href="${p.link}" class="btn-download" style="padding:10px; font-size:0.8rem;">Ver Detalles</a>
            </div>
        `).join('');
    }

    // Obsidian Detail Render
    const det = document.getElementById('detalle-container');
    if (det) {
        const p = appData.proyectos.find(x => x.id === "obsidian");
        det.innerHTML = `
            <div class="glass" style="text-align: center;">
                <img src="${p.img}" style="width:120px; margin-bottom:20px;">
                <h1>${p.titulo}</h1>
                <p style="margin:20px 0;">${p.desc}</p>
                <div style="text-align:left; margin-bottom:20px;">
                    <p><i class='bx bx-check-circle'></i> Optimización de FPS</p>
                    <p><i class='bx bx-check-circle'></i> Reducción de Latencia</p>
                    <p><i class='bx bx-check-circle'></i> Sin Partículas</p>
                </div>
                <button onclick="abrirAviso('${p.enlace}')" class="btn-download">Descargar Ahora</button>
            </div>
        `;
    }
}
document.addEventListener("DOMContentLoaded", initApp);
