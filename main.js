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
        { titulo: "Optimización Desplegada", contenido: "Se ha corregido el error del fondo y el diseño Glass Dark ha sido aplicado.", fecha: "27/01/2026", icono: "bx-paint" },
        { titulo: "Bugs Críticos Solucionados", contenido: "Navegación fluida y responsiva garantizada en todas las secciones.", fecha: "27/01/2026", icono: "bx-bug-alt" },
        // OCULTAS
        { titulo: "Aviso de Inactividad", contenido: "Estaré ausente por un tiempo indefinido debido a que no cuento con dispositivo móvil en estos momentos. Gracias por entender.", fecha: "20/01/2026", icono: "bx-mobile-vibration" },
        { titulo: "Obsidian: Fin de un Legado", contenido: "Obsidian alcanza su versión final estable. El proyecto se detiene aquí para quedar como el estándar de optimización de la comunidad.", fecha: "15/01/2026", icono: "bx-archive" }
    ],
    proyectos: [
        { id: "survival", titulo: "Survival Ariesito", desc: "El servidor definitivo para la comunidad.", img: "https://i.postimg.cc/25tg6zFM/custom-ava.png", link: "#" },
        { id: "obsidian", titulo: "Obsidian Optimizador", desc: "Máximos FPS e Input Lag mínimo. Rendimiento puro.", img: "https://i.postimg.cc/mgrqdjGk/pack-icon-2.png", link: "obsidian.html", enlace: "https://link-target.net/1356996/zMa3fwoanGAK" }
    ],
    redes: [
        { nombre: "YouTube", desc: "Tutoriales, Texturas y Optimización.", url: "https://www.youtube.com/@soyariesitomc", icono: "bxl-youtube", color: "#ff0000" },
        { nombre: "TikTok", desc: "Clips rápidos y noticias de último momento.", url: "https://www.tiktok.com/@soyariesitomc", icono: "bxl-tiktok", color: "#fff" },
        { nombre: "WhatsApp", desc: "Canal oficial para anuncios directos.", url: "https://whatsapp.com/channel/0029Vb74InvEwEjnCiAVjD1b", icono: "bxl-whatsapp", color: "#25D366" },
        { nombre: "Discord", desc: "La casa de la comunidad. Charla y soporte.", url: "https://discord.gg/DgrckyxNMr", icono: "bxl-discord-alt", color: "#5865F2" }
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
            <p style="color:#bbb; font-size:0.9rem; margin:8px 0;">${n.contenido}</p>
            <small style="color:var(--morado-claro); font-weight:bold;">${n.fecha}</small>
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
    renderNoticias();

    const redesCont = document.getElementById('redes-container');
    if (redesCont) {
        redesCont.innerHTML = appData.redes.map(r => `
            <div class="noticia-card" onclick="window.location.href='${r.url}'" style="cursor:pointer; display:flex; align-items:center; gap:20px;">
                <i class='bx ${r.icono}' style="font-size:2.5rem; color:${r.color}"></i>
                <div>
                    <h3 style="margin:0;">${r.nombre}</h3>
                    <p style="font-size:0.8rem; color:#aaa; margin-top:4px;">${r.desc}</p>
                </div>
            </div>
        `).join('');
    }

    const projGrid = document.getElementById('proyectos-grid');
    if (projGrid) {
        projGrid.innerHTML = appData.proyectos.map(p => `
            <div class="noticia-card" style="text-align:center;">
                <img src="${p.img}" style="width:80px; margin-bottom:15px;">
                <h3>${p.titulo}</h3>
                <p style="font-size:0.85rem; margin:10px 0; color:#bbb;">${p.desc}</p>
                <a href="${p.link}" class="btn-download" style="padding:10px; font-size:0.8rem;">Ver Detalles</a>
            </div>
        `).join('');
    }

    const det = document.getElementById('detalle-container');
    if (det) {
        const p = appData.proyectos.find(x => x.id === "obsidian");
        det.innerHTML = `
            <div class="glass" style="text-align: center;">
                <img src="${p.img}" style="width:130px; margin-bottom:20px; filter: drop-shadow(0 0 15px var(--morado));">
                <h1 style="color:var(--morado-claro);">${p.titulo}</h1>
                <p style="margin:20px 0; color:#ddd;">${p.desc}</p>
                <div style="background:rgba(255,255,255,0.03); padding:20px; border-radius:15px; text-align:left; margin-bottom:25px; border:1px solid rgba(255,255,255,0.05);">
                    <p style="margin-bottom:8px;"><i class='bx bx-check-circle' style="color:var(--morado-claro)"></i> El pack más ligero de la historia.</p>
                    <p style="margin-bottom:8px;"><i class='bx bx-check-circle' style="color:var(--morado-claro)"></i> Optimizado para gama baja.</p>
                    <p><i class='bx bx-check-circle' style="color:var(--morado-claro)"></i> UI Dark Premium.</p>
                </div>
                <button onclick="abrirAviso('${p.enlace}')" class="btn-download">Descargar Ahora</button>
            </div>
        `;
    }
}
document.addEventListener("DOMContentLoaded", initApp);
    
