const appData = {
    noticias: [
        {
            titulo: "Colaboración Revelada",
            contenido: "AriesitoMc se une con Faaak para traer la textura técnica definitiva: PurpleTech V1. Aún no hay fecha de Lanzamiento.",
            fecha: "14/01/2026",
            icono: "bxs-zap",
            imagen: "https://i.postimg.cc/DZt9rMP3/Purple-Tech.jpg"
        },
        {
            titulo: "Obsidian: ¡Ahora será un Cliente!",
            contenido: "Hemos decidido llevar Obsidian al siguiente nivel. Deja de ser solo una textura para convertirse en un cliente completo para añadir más personalizacion. Estará listo antes de febrero.",
            fecha: "14/01/2026",
            icono: "bxs-rocket",
            imagen: "https://i.postimg.cc/QNSfpPNj/obsidian.png"
        }
    ],
    proyectos: [
        {
            id: "obsidian",
            titulo: "Obsidian",
            descripcion: "El proyecto definitivo de texturas oscuras y optimización premium. Diseñado para ofrecer la mejor estética sin sacrificar FPS.",
            imagen: "https://i.postimg.cc/mgrqdjGk/pack-icon-2.png",
            version: "V2.3",
            lanzamiento: "Hace 6 Meses",
            actualizacion: "Hace 5 Meses",
            caracteristicas: ["Optimización de FPS", "Interfaz Oscura", "Cielo Personalizado", "Mini Tools", "Elimina Partículas", "Texturas Personalizadas", "Colores Saturados"],
            enlace: "https://link-target.net/1356996/zMa3fwoanGAK"
        }
    ],
    redes: [
        { nombre: "YouTube", desc: "Tutoriales y Reviews", url: "https://www.youtube.com/@soyariesitomc", icono: "bxl-youtube", color: "#ff0000" },
        { nombre: "TikTok", desc: "Clips y Adelantos", url: "https://www.tiktok.com/@soyariesitomc", icono: "bxl-tiktok", color: "#ff0050" },
        { nombre: "Discord", desc: "Comunidad y Soporte", url: "https://discord.gg/DgrckyxNMr", icono: "bxl-discord-alt", color: "#5865F2" },
        { nombre: "WhatsApp", desc: "Canal de Noticias", url: "https://whatsapp.com/channel/0029Vb74InvEwEjnCiAVjD1b", icono: "bxl-whatsapp", color: "#25D366" }
    ]
};

function initApp() {
    const activeLink = document.querySelector('.navbar-link.active');
    const indicator = document.querySelector('.indicator');
    if (activeLink && indicator) {
        indicator.style.width = `${activeLink.offsetWidth}px`;
        indicator.style.left = `${activeLink.offsetLeft}px`;
    }

    const newsGrid = document.getElementById('noticias-grid');
    if (newsGrid) {
        newsGrid.innerHTML = appData.noticias.map(n => `
            <div class="noticia-card" style="cursor: default;">
                <h3 style="color: white; margin-bottom:10px;"><i class='bx ${n.icono}'></i> ${n.titulo}</h3>
                <img src="${n.imagen}" style="width:100%; border-radius:12px; margin-bottom:15px; border: 1px solid rgba(255,255,255,0.1);">
                <p style="color: #eee; font-size: 1rem; line-height: 1.5; margin-bottom:15px;">${n.contenido}</p>
                <small style="color: var(--morado-claro); font-weight: bold;">Publicado el: ${n.fecha}</small>
            </div>
        `).join('');
    }

    const projGrid = document.getElementById('proyectos-grid');
    if (projGrid) {
        projGrid.innerHTML = appData.proyectos.map(p => `
            <div class="noticia-card" style="text-align:center;">
                <img src="${p.imagen}" style="width:120px; margin-bottom:1rem;">
                <h3>${p.titulo}</h3>
                <p style="color: #bbb; font-size: 0.9rem; margin: 15px 0;">${p.descripcion}</p>
                <a href="${p.id}.html" class="btn-download">Ver Detalles Técnicos</a>
            </div>
        `).join('');
    }

    const redesCont = document.getElementById('redes-container');
    if (redesCont) {
        redesCont.innerHTML = appData.redes.map(r => `
            <div class="noticia-card card-clickable" onclick="window.location.href='${r.url}'" style="display:flex; align-items:center; gap:20px; cursor:pointer;">
                <i class='bx ${r.icono}' style="color:${r.color}; font-size: 2.5rem;"></i>
                <div>
                    <h3 style="margin:0;">${r.nombre}</h3>
                    <p style="margin:0; font-size: 0.85rem; color: #aaa;">${r.desc}</p>
                </div>
            </div>
        `).join('');
    }

    const detalleCont = document.getElementById('detalle-container');
    if (detalleCont) {
        const p = appData.proyectos.find(x => x.id === "obsidian");
        if (p) {
            detalleCont.innerHTML = `
                <div class="glass" style="text-align: center;">
                    <img src="${p.imagen}" style="width:150px; margin-bottom:20px;">
                    <h1 style="color:var(--morado-claro); margin-bottom:20px;">${p.titulo}</h1>
                    <div style="background:rgba(255,255,255,0.05); padding:20px; border-radius:15px; margin-bottom:25px; text-align: left;">
                        <p style="margin-bottom:8px;"><strong>Versión:</strong> ${p.version}</p>
                        <p style="margin-bottom:8px;"><strong>Lanzamiento:</strong> ${p.lanzamiento}</p>
                        <p style="margin-bottom:8px;"><strong>Última Actualización:</strong> ${p.actualizacion}</p>
                    </div>
                    <div style="text-align: left; margin-bottom:30px;">
                        <h4 style="color: var(--morado-claro); margin-bottom:15px; text-transform: uppercase;">Características Principales:</h4>
                        <ul style="list-style: none;">
                            ${p.caracteristicas.map(c => `<li style="margin-bottom:10px;"><i class='bx bx-check-circle' style="color:var(--morado-claro)"></i> ${c}</li>`).join('')}
                        </ul>
                    </div>
                    <button onclick="abrirAviso('${p.enlace}')" class="btn-download" style="width:100%; border:none; cursor:pointer;">Descargar Ahora</button>
                </div>
            `;
        }
    }
}

// Lógica de descarga (Modal de aviso) - CORREGIDA
let pendingUrl = "";
function abrirAviso(url) { 
    pendingUrl = url; 
    const modal = document.getElementById('modal-aviso');
    modal.style.display = 'flex'; 
    setTimeout(() => { modal.classList.add('active'); }, 10);
}

function cerrarAviso() { 
    const modal = document.getElementById('modal-aviso');
    modal.classList.remove('active');
    setTimeout(() => { modal.style.display = 'none'; }, 300);
}

function continuarDescarga() { 
    if (pendingUrl) {
        window.open(pendingUrl, '_blank'); 
        cerrarAviso(); 
    }
}

document.addEventListener("DOMContentLoaded", initApp);

