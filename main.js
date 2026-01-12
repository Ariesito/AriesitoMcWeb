const appData = {
    noticias: [
        {
            titulo: "Colaboración Misteriosa: V1",
            contenido: "AriesitoMc se une con <span class='censored'>??????</span> para traer la textura técnica definitiva: PurpleTech V1. Muy pronto más detalles.",
            fecha: "11/01/2026",
            icono: "bxs-lock-alt"
        },
        {
            titulo: "Actualización de la Web",
            contenido: "Fueron realizados múltiples cambios en La Web para mejorar la navegación y la experiencia del usuario.",
            fecha: "12/01/2026",
            icono: "bxs-check-shield"
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
            mostrarImagenes: false,
            enlace: "https://link-target.net/1356996/zMa3fwoanGAK"
        }
    ],
    redes: [
        { nombre: "YouTube", desc: "Suscríbete para ver tutoriales y reviews de mis packs.", url: "https://www.youtube.com/@soyariesitomc", icono: "bxl-youtube", color: "#ff0000" },
        { nombre: "TikTok", desc: "Mira los mejores clips y adelantos exclusivos.", url: "https://www.tiktok.com/@soyariesitomc", icono: "bxl-tiktok", color: "#ff0050" },
        { nombre: "Discord", desc: "Únete a nuestra comunidad para soporte.", url: "https://discord.gg/DgrckyxNMr", icono: "bxl-discord-alt", color: "#5865F2" },
        { nombre: "WhatsApp", desc: "Entérate de todo al instante en mi canal.", url: "https://whatsapp.com/channel/0029Vb74InvEwEjnCiAVjD1b", icono: "bxl-whatsapp", color: "#25D366" }
    ]
};

function initApp() {
    const newsGrid = document.getElementById('noticias-grid');
    if (newsGrid) {
        newsGrid.innerHTML = appData.noticias.map(n => `
            <div class="noticia-card">
                <h3><i class='bx ${n.icono}'></i> ${n.titulo}</h3>
                <p style="margin: 10px 0; color: #ccc; font-size: 0.9rem;">${n.contenido}</p>
                <small style="color: var(--morado-claro);">${n.fecha}</small>
            </div>
        `).join('');
    }

    const projGrid = document.getElementById('proyectos-grid');
    if (projGrid) {
        projGrid.innerHTML = appData.proyectos.map(p => `
            <div class="noticia-card">
                <img src="${p.imagen}" style="width:100%; border-radius:12px; margin-bottom:1rem; border: 1px solid rgba(255,255,255,0.1);">
                <h3 style="font-family:'Montserrat', sans-serif;">${p.titulo}</h3>
                <p style="color: #bbb; font-size: 0.9rem; margin: 10px 0;">${p.descripcion}</p>
                <a href="${p.id}.html" class="btn-download">Ver Detalles</a>
            </div>
        `).join('');
    }

    const redesCont = document.getElementById('redes-container');
    if (redesCont) {
        redesCont.innerHTML = appData.redes.map(r => `
            <div class="noticia-card card-clickable" onclick="window.location.href='${r.url}'">
                <i class='bx ${r.icono}' style="color:${r.color}; font-size: 2.2rem;"></i>
                <div>
                    <h3 style="margin:0; font-size: 1.1rem;">${r.nombre}</h3>
                    <p style="margin:0; font-size: 0.8rem; color: #aaa;">${r.desc}</p>
                </div>
            </div>
        `).join('');
    }

    const detalleCont = document.getElementById('detalle-container');
    if (detalleCont) {
        const currentFile = window.location.pathname.split('/').pop().replace('.html', '');
        const p = appData.proyectos.find(x => x.id === currentFile);
        if (p) {
            detalleCont.innerHTML = `
                <div class="glass section-margin" style="text-align: center;">
                    <img src="${p.imagen}" class="img-proyecto-header" alt="${p.titulo}">
                    <h1 class="titulo-proyecto-detalle">${p.titulo}</h1>
                    <div class="info-tecnica-box">
                        <p><strong>Versión:</strong> ${p.version}</p>
                        <p><strong>Lanzamiento:</strong> ${p.lanzamiento}</p>
                        <p><strong>Actualización:</strong> ${p.actualizacion}</p>
                    </div>
                    <div class="caracteristicas-box">
                        <h4 style="color: var(--morado-claro); text-transform: uppercase; letter-spacing: 2px; font-size: 0.8rem; margin-bottom:12px;">Características</h4>
                        <ul class="lista-caracteristicas">
                            ${p.caracteristicas.map(c => `<li><i class='bx bx-check-circle'></i> ${c}</li>`).join('')}
                        </ul>
                    </div>
                    <button onclick="abrirAviso('${p.enlace}')" class="btn-download" style="margin-top:2rem; border:none; cursor:pointer;">Descargar Proyecto</button>
                </div>
            `;
        }
    }
}

let pendingUrl = "";
function abrirAviso(url) { pendingUrl = url; document.getElementById('modal-aviso').style.display = 'flex'; }
function cerrarAviso() { document.getElementById('modal-aviso').style.display = 'none'; }
function continuarDescarga() { window.open(pendingUrl, '_blank'); cerrarAviso(); }

document.addEventListener("DOMContentLoaded", initApp);

