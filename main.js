/**
 * AriesitoMc Web Engine v2.5
 * Gestión dinámica de contenido y plantillas
 */

let appData = {};

async function fetchData() {
    try {
        const response = await fetch('./data.json');
        if (!response.ok) throw new Error('No se pudo cargar el JSON');
        appData = await response.json();
        renderAll();
    } catch (error) {
        console.error("Error crítico de datos:", error);
    }
}

function renderAll() {
    // 1. Renderizar Noticias (Index)
    const newsGrid = document.getElementById('noticias-grid');
    if (newsGrid && appData.noticias) {
        newsGrid.innerHTML = appData.noticias.map(n => `
            <div class="noticia-card">
                <div>
                    <h3 style="display:flex; align-items:center; gap:10px;">
                        <i class='bx ${n.icono}' style="color:var(--morado-claro)"></i> ${n.titulo}
                    </h3>
                    <p style="margin-top:10px; color:#bbb; font-size:0.9rem;">${n.contenido}</p>
                </div>
                <span class="fecha-bottom">${n.fecha}</span>
            </div>
        `).join('');
    }

    // 2. Renderizar Proyectos (Lista en proyectos.html)
    const projGrid = document.getElementById('proyectos-grid');
    if (projGrid && appData.proyectos) {
        projGrid.innerHTML = appData.proyectos.map(p => `
            <div class="noticia-card" style="text-align:center; align-items:center;">
                <img src="${p.img}" style="width:90px; margin-bottom:15px; border-radius:10px;">
                <h3>${p.titulo}</h3>
                <p style="margin:10px 0; color:#aaa; font-size:0.85rem;">${p.desc}</p>
                <a href="${p.link}" class="btn-download" style="${p.disabled ? 'background:#222; color:#555; pointer-events:none;' : ''}">
                    ${p.btn}
                </a>
            </div>
        `).join('');
    }

    // 3. Renderizar Redes (redes.html)
    const redesCont = document.getElementById('redes-container');
    if (redesCont && appData.redes) {
        redesCont.innerHTML = appData.redes.map(r => `
            <div class="noticia-card" onclick="window.location.href='${r.url}'" style="cursor:pointer; flex-direction:row; align-items:center; gap:20px;">
                <i class='bx ${r.icono}' style="font-size:2.5rem; color:${r.color}"></i>
                <div>
                    <h3 style="margin:0; font-size:1.1rem;">${r.nombre}</h3>
                    <p style="margin:0; font-size:0.8rem; color:#888;">${r.desc}</p>
                </div>
                <i class='bx bx-chevron-right' style="margin-left:auto; font-size:1.5rem; color:#444;"></i>
            </div>
        `).join('');
    }

    // 4. Lógica de Página de Detalle Dinámica (proyecto.html?id=xxx)
    const dynamicContainer = document.getElementById('detalle-dinamico');
    if (dynamicContainer) {
        const urlParams = new URLSearchParams(window.location.search);
        const projectId = urlParams.get('id');
        const p = appData.proyectos.find(item => item.id === projectId);

        if (p) {
            document.title = `${p.titulo} | Saturnite Studios`;
            dynamicContainer.innerHTML = `
                <div class="glass" style="text-align:center; margin-top:40px;">
                    <img src="${p.img}" style="width:120px; filter:drop-shadow(0 0 15px var(--morado));">
                    <h1 style="margin:20px 0; font-family:'Montserrat'; text-transform:uppercase;">${p.titulo}</h1>
                    <p style="color:#888; margin-bottom:25px;">${p.subtitulo || ''}</p>
                    
                    <div class="specs-grid">
                        ${(p.specs || []).map(s => `
                            <p><i class='bx ${s.icon}' style="color:var(--morado-claro)"></i> ${s.text}</p>
                        `).join('')}
                    </div>

                    ${p.disabled ? 
                        `<button class="btn-download" style="background:#222; color:#555; cursor:not-allowed; margin-top:30px;">PRÓXIMAMENTE</button>` : 
                        `<button onclick="abrirAviso('${p.enlace_descarga || p.enlace}')" class="btn-download" style="margin-top:30px;">DESCARGAR AHORA</button>`
                    }
                </div>
            `;
        } else {
            dynamicContainer.innerHTML = `<div class="glass"><h2>Proyecto no encontrado</h2><br><a href="proyectos.html" class="btn-download">Volver</a></div>`;
        }
    }
}

// --- Funciones de Utilidad (Loader, Navbar, Modal) ---

function handleLoader() {
    const loader = document.getElementById('loader-wrapper');
    if (!loader) return;
    if (sessionStorage.getItem('visited')) {
        loader.style.display = 'none';
    } else {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
                sessionStorage.setItem('visited', 'true');
            }, 600);
        }, 1200);
    }
}

function updateNavbar() {
    const path = window.location.pathname;
    let page = path.split("/").pop() || "index.html";
    const links = document.querySelectorAll('.nav-link');
    const indicator = document.querySelector('.nav-indicator');
    const navList = document.querySelector('.nav-list');

    let activeLink = null;
    links.forEach(link => {
        if (link.getAttribute('href') === page) {
            link.classList.add('active');
            activeLink = link;
        } else {
            link.classList.remove('active');
        }
    });

    if (activeLink && indicator && navList) {
        const linkRect = activeLink.getBoundingClientRect();
        const navRect = navList.getBoundingClientRect();
        indicator.style.width = `${linkRect.width}px`;
        indicator.style.transform = `translateX(${linkRect.left - navRect.left}px)`;
    }
}

// Modal
let pendingUrl = "";
function abrirAviso(url) { 
    if(!url || url === "#") return;
    pendingUrl = url; 
    document.getElementById('modal-aviso').classList.add('active'); 
}
function cerrarAviso() { document.getElementById('modal-aviso').classList.remove('active'); }
function continuarDescarga() { if (pendingUrl) window.open(pendingUrl, '_blank'); cerrarAviso(); }

// Init
window.addEventListener('load', handleLoader);
window.addEventListener('resize', updateNavbar);
document.addEventListener("DOMContentLoaded", () => {
    fetchData();
    updateNavbar();
});
