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
            id: "survival",
            titulo: "Survival Ariesito",
            descripcion: "El servidor definitivo para la comunidad. Apertura: Febrero 2026.",
            imagen: "https://i.postimg.cc/25tg6zFM/custom-ava.png",
            estado: "PRÓXIMAMENTE",
            link: "#"
        },
        {
            id: "obsidian",
            titulo: "Obsidian Pack",
            descripcion: "Texturas oscuras y optimización premium. (Proyecto Finalizado)",
            imagen: "https://i.postimg.cc/mgrqdjGk/pack-icon-2.png",
            estado: "LEGADO",
            link: "obsidian.html",
            version: "V2.3 (Final)",
            actualizacion: "Hace 5 Meses",
            enlace: "https://link-target.net/1356996/zMa3fwoanGAK",
            caracteristicas: ["Optimización de FPS", "Interfaz Oscura", "Cielo Personalizado", "Mini Tools", "Elimina Partículas"]
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
let pendingUrl = "";

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

function toggleNews() { showingAllNews = !showingAllNews; renderNoticias(); }

// LOGICA DE MODAL
function abrirAviso(url) { 
    pendingUrl = url; 
    const modal = document.getElementById('modal-aviso');
    if(modal) {
        modal.style.display = 'flex'; 
        setTimeout(() => { modal.classList.add('active'); }, 10);
    }
}

function cerrarAviso() { 
    const modal = document.getElementById('modal-aviso');
    if(modal) {
        modal.classList.remove('active');
        setTimeout(() => { modal.style.display = 'none'; }, 300);
    }
}

function continuarDescarga() { 
    if (pendingUrl) { window.open(pendingUrl, '_blank'); cerrarAviso(); }
}

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

    // Render Proyectos
    const projGrid = document.getElementById('proyectos-grid');
    if (projGrid) {
        projGrid.innerHTML = appData.proyectos.map(p => `
            <div class="noticia-card" style="text-align:center;">
                <img src="${p.imagen}" style="width:110px; margin-bottom:1rem; filter: drop-shadow(0 0 8px var(--morado));">
                <h3>${p.titulo}</h3>
                <p style="color: #bbb; font-size: 0.85rem; margin: 10px 0;">${p.descripcion}</p>
                <div style="margin-top:15px;">
                    <span style="display:block; font-size:0.7rem; color:var(--morado-claro); font-weight:bold; margin-bottom:10px;">${p.estado}</span>
                    ${p.link !== "#" ? `<a href="${p.link}" class="btn-download" style="padding: 8px; font-size:0.8rem; text-decoration:none;">Ver Detalles</a>` : ''}
                </div>
            </div>
        `).join('');
    }

    // Render Detalle (Específico para obsidian.html)
    const detalleCont = document.getElementById('detalle-container');
    if (detalleCont) {
        const p = appData.proyectos.find(x => x.id === "obsidian");
        if (p) {
            detalleCont.innerHTML = `
                <div class="glass" style="text-align: center; margin-top: 20px;">
                    <img src="${p.imagen}" style="width:150px; margin-bottom:20px; filter: drop-shadow(0 0 15px var(--morado));">
                    <h1 style="color:var(--morado-claro); margin-bottom:20px;">${p.titulo}</h1>
                    <div style="background:rgba(255,255,255,0.05); padding:20px; border-radius:15px; margin-bottom:25px; text-align: left;">
                        <p style="margin-bottom:8px;"><strong>Estatus:</strong> ${p.estado}</p>
                        <p style="margin-bottom:8px;"><strong>Versión:</strong> ${p.version}</p>
                        <p style="margin-bottom:8px;"><strong>Última Act.:</strong> ${p.actualizacion}</p>
                    </div>
                    <div style="text-align: left; margin-bottom:30px;">
                        <h4 style="color: var(--morado-claro); margin-bottom:15px;">CARACTERÍSTICAS:</h4>
                        <ul style="list-style: none;">
                            ${p.caracteristicas.map(c => `<li style="margin-bottom:10px;"><i class='bx bx-check-circle' style="color:var(--morado-claro)"></i> ${c}</li>`).join('')}
                        </ul>
                    </div>
                    <button onclick="abrirAviso('${p.enlace}')" class="btn-download" style="width:100%; border:none; cursor:pointer;">Descargar Ahora</button>
                </div>
            `;
        }
    }

    // Render Redes
    const redesCont = document.getElementById('redes-container');
    if (redesCont) {
        redesCont.innerHTML = appData.redes.map(r => `
            <div class="noticia-card" onclick="window.location.href='${r.url}'" style="display:flex; align-items:center; gap:20px; cursor:pointer;">
                <i class='bx ${r.icono}' style="color:${r.color}; font-size: 2.2rem;"></i>
                <div>
                    <h3 style="margin:0; font-size:1.1rem;">${r.nombre}</h3>
                    <p style="margin:0; font-size: 0.8rem; color: #aaa;">${r.desc}</p>
                </div>
            </div>
        `).join('');
    }
}

document.addEventListener("DOMContentLoaded", initApp);
        
