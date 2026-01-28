window.addEventListener('load', () => {
    const loader = document.getElementById('loader-wrapper');
    if (!loader) return;
    const sessionLoaded = sessionStorage.getItem('firstLoad');
    if (!sessionLoaded) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => loader.style.display = 'none', 600);
            sessionStorage.setItem('firstLoad', 'true');
        }, 2000);
    } else {
        loader.style.display = 'none';
    }
});

const appData = {
    noticias: [
        { titulo: "Survival Comunitario", contenido: "AriesitoMc abrirá un servidor Survival para toda la comunidad a mediados de febrero. ¡Prepárate!", fecha: "27/01/2026", icono: "bx-server" },
        { titulo: "Optimización Desplegada", contenido: "Se ha corregido el error del fondo y el diseño Glassmorphism ha sido mejorado.", fecha: "27/01/2026", icono: "bx-paint" },
        { titulo: "Bugs Críticos Solucionados", contenido: "Corrección de errores en navegación y modal de descarga para una mejor experiencia.", fecha: "27/01/2026", icono: "bx-bug-alt" },
        // OCULTAS (Anteriores)
        { 
            titulo: "Estado: Inactivo Temporalmente", 
            contenido: "Estaré ausente por un tiempo indefinido debido a que actualmente no cuento con dispositivo móvil. Agradezco su paciencia.", 
            fecha: "20/01/2026", 
            icono: "bx-mobile-vibration" 
        },
        { 
            titulo: "Obsidian: El Fin de un Legado", 
            contenido: "Tras meses de rendimiento impecable, Obsidian ya no recibirá más actualizaciones. El proyecto queda archivado en su versión más estable para siempre.", 
            fecha: "15/01/2026", 
            icono: "bx-archive" 
        }
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
            <h3 style="margin-bottom:10px;"><i class='bx ${n.icono}'></i> ${n.titulo}</h3>
            <p style="color: #ccc; font-size: 0.95rem; line-height: 1.5;">${n.contenido}</p>
            <div style="margin-top:15px; border-top:1px solid rgba(255,255,255,0.05); padding-top:10px;">
                <small style="color:var(--morado-claro); font-weight:bold;">${n.fecha}</small>
            </div>
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
    setTimeout(() => {
        const activeLink = document.querySelector('.navbar-link.active');
        const indicator = document.querySelector('.indicator');
        if (activeLink && indicator) {
            indicator.style.width = `${activeLink.offsetWidth}px`;
            indicator.style.left = `${activeLink.offsetLeft}px`;
        }
    }, 100);

    renderNoticias();

    const redesCont = document.getElementById('redes-container');
    if (redesCont) {
        redesCont.innerHTML = appData.redes.map(r => `
            <div class="noticia-card" onclick="window.location.href='${r.url}'" style="cursor:pointer; display:flex; align-items:center; gap:20px;">
                <i class='bx ${r.icono}' style="font-size:2.5rem; color:${r.color}"></i>
                <h3 style="margin:0;">${r.nombre}</h3>
            </div>
        `).join('');
    }

    const projGrid = document.getElementById('proyectos-grid');
    if (projGrid) {
        projGrid.innerHTML = appData.proyectos.map(p => `
            <div class="noticia-card" style="text-align:center;">
                <img src="${p.img}" style="width:100px; margin-bottom:15px; filter: drop-shadow(0 0 10px rgba(0,0,0,0.5));">
                <h3>${p.titulo}</h3>
                <p style="font-size:0.9rem; margin:15px 0; color:#bbb;">${p.desc}</p>
                <a href="${p.link}" class="btn-download" style="padding:12px; font-size:0.85rem;">Ver Detalles Técnicos</a>
            </div>
        `).join('');
    }

    const det = document.getElementById('detalle-container');
    if (det) {
        const p = appData.proyectos.find(x => x.id === "obsidian");
        det.innerHTML = `
            <div class="glass" style="text-align: center;">
                <img src="${p.img}" style="width:140px; margin-bottom:20px; filter: drop-shadow(0 0 15px var(--morado));">
                <h1 style="color:var(--morado-claro); margin-bottom:15px;">${p.titulo}</h1>
                <p style="margin-bottom:25px; color:#ddd;">${p.desc}</p>
                <div style="background:rgba(255,255,255,0.03); padding:20px; border-radius:15px; text-align:left; margin-bottom:25px; border:1px solid rgba(255,255,255,0.05);">
                    <p style="margin-bottom:10px;"><i class='bx bx-check-circle' style="color:var(--morado-claro)"></i> Máximo Rendimiento FPS</p>
                    <p style="margin-bottom:10px;"><i class='bx bx-check-circle' style="color:var(--morado-claro)"></i> Latencia Reducida</p>
                    <p><i class='bx bx-check-circle' style="color:var(--morado-claro)"></i> Estética Dark Premium</p>
                </div>
                <button onclick="abrirAviso('${p.enlace}')" class="btn-download">Descargar Ahora</button>
            </div>
        `;
    }
}
document.addEventListener("DOMContentLoaded", initApp);
            
