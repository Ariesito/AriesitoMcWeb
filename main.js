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
        { titulo: "Survival Comunitario", contenido: "AriesitoMc abrirá un servidor Survival para toda la comunidad a mediados de febrero.", fecha: "27 ENERO 2026", icono: "bx-server" },
        { titulo: "Optimización Desplegada", contenido: "Bug del fondo corregido y sistema Glass Dark aplicado.", fecha: "27 ENERO 2026", icono: "bx-paint" },
        { titulo: "Bugs Críticos Solucionados", contenido: "Web 100% responsiva y navegación fluida.", fecha: "27 ENERO 2026", icono: "bx-bug-alt" },
        // OCULTAS
        { titulo: "Aviso de Inactividad", contenido: "Estaré ausente por tiempo indefinido; no cuento con dispositivo móvil actualmente.", fecha: "20 ENERO 2026", icono: "bx-mobile-vibration" },
        { titulo: "Obsidian: Fin de un Legado", contenido: "Obsidian alcanza su versión final estable. Proyecto archivado.", fecha: "15 ENERO 2026", icono: "bx-archive" }
    ],
    proyectos: [
        { id: "survival", titulo: "Survival Ariesito", desc: "El servidor técnico de la comunidad.", img: "https://i.postimg.cc/25tg6zFM/custom-ava.png", link: "#" },
        { id: "obsidian", titulo: "Obsidian Optimizador", desc: "Máximo rendimiento para gama baja.", img: "https://i.postimg.cc/mgrqdjGk/pack-icon-2.png", link: "obsidian.html", enlace: "https://link-target.net/1356996/zMa3fwoanGAK" }
    ],
    redes: [
        { nombre: "YouTube", desc: "Tutoriales y Optimización.", url: "https://www.youtube.com/@soyariesitomc", icono: "bxl-youtube", color: "#ff0000" },
        { nombre: "TikTok", desc: "Clips y noticias rápidas.", url: "https://www.tiktok.com/@soyariesitomc", icono: "bxl-tiktok", color: "#fff" },
        { nombre: "WhatsApp", desc: "Anuncios directos.", url: "https://whatsapp.com/channel/0029Vb74InvEwEjnCiAVjD1b", icono: "bxl-whatsapp", color: "#25D366" },
        { nombre: "Discord", desc: "Comunidad y soporte.", url: "https://discord.gg/DgrckyxNMr", icono: "bxl-discord-alt", color: "#5865F2" }
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
            <span class="fecha-top">${n.fecha}</span>
            <h3 style="margin: 10px 0;"><i class='bx ${n.icono}'></i> ${n.titulo}</h3>
            <p style="color:#aaa; font-size:0.9rem;">${n.contenido}</p>
        </div>
    `).join('') + (appData.noticias.length > 3 ? `<button class="btn-show-more" onclick="toggleNews()">${showingAllNews ? 'VER MENOS' : 'VER ANTERIORES'}</button>` : '');
}

function toggleNews() { showingAllNews = !showingAllNews; renderNoticias(); }

function abrirAviso(url) { 
    pendingUrl = url; 
    const modal = document.getElementById('modal-aviso');
    if(modal) { modal.classList.add('active'); }
}

function cerrarAviso() { 
    const modal = document.getElementById('modal-aviso');
    if(modal) { modal.classList.remove('active'); }
}

function continuarDescarga() { if (pendingUrl) { window.open(pendingUrl, '_blank'); cerrarAviso(); } }

function initApp() {
    renderNoticias();

    const redesCont = document.getElementById('redes-container');
    if (redesCont) {
        redesCont.innerHTML = appData.redes.map(r => `
            <div class="noticia-card" onclick="window.location.href='${r.url}'" style="cursor:pointer; display:flex; align-items:center; gap:20px;">
                <i class='bx ${r.icono}' style="font-size:2.2rem; color:${r.color}"></i>
                <div>
                    <h3 style="margin:0;">${r.nombre}</h3>
                    <p style="font-size:0.8rem; color:#888;">${r.desc}</p>
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
                <p style="font-size:0.85rem; margin:10px 0; color:#aaa;">${p.desc}</p>
                <a href="${p.link}" class="btn-download" style="padding:10px; font-size:0.8rem;">DETALLES</a>
            </div>
        `).join('');
    }

    const det = document.getElementById('detalle-container');
    if (det) {
        const p = appData.proyectos.find(x => x.id === "obsidian");
        det.innerHTML = `
            <div class="glass" style="text-align: center;">
                <img src="${p.img}" style="width:120px; margin-bottom:20px; filter: drop-shadow(0 0 15px var(--morado));">
                <h1 style="color:var(--morado-claro); margin-bottom:10px;">${p.titulo}</h1>
                <p style="margin-bottom:25px; color:#ccc;">${p.desc}</p>
                <div style="background:rgba(255,255,255,0.03); padding:20px; border-radius:18px; text-align:left; border:1px solid rgba(255,255,255,0.05);">
                    <h4 style="margin-bottom:15px; font-size:0.8rem; letter-spacing:1px; color:var(--morado-claro);">CARACTERÍSTICAS TÉCNICAS</h4>
                    <p style="margin-bottom:8px;"><i class='bx bx-check-circle'></i> Optimización de motor gráfico (FPS Boost)</p>
                    <p style="margin-bottom:8px;"><i class='bx bx-check-circle'></i> Reducción de Latencia de Red e Input Lag</p>
                    <p style="margin-bottom:8px;"><i class='bx bx-check-circle'></i> Interfaz Dark Premium de alta resolución</p>
                    <p style="margin-bottom:8px;"><i class='bx bx-check-circle'></i> Cielos personalizados de baja carga procesal</p>
                    <p style="margin-bottom:8px;"><i class='bx bx-check-circle'></i> Eliminación de partículas innecesarias</p>
                    <p><i class='bx bx-check-circle'></i> Herramientas integradas para configuración rápida</p>
                </div>
                <button onclick="abrirAviso('${p.enlace}')" class="btn-download" style="margin-top:25px;">DESCARGAR AHORA</button>
            </div>
        `;
    }
}
document.addEventListener("DOMContentLoaded", initApp);
            
