/**
 * AriesitoMc Web Engine v2.0
 * Lógica de renderizado dinámico mediante Fetch API
 */

let appData = {};

async function fetchData() {
    try {
        const response = await fetch('./data.json');
        if (!response.ok) throw new Error('Error al cargar base de datos');
        appData = await response.json();
        renderAll();
    } catch (error) {
        console.error("CRITICAL ERROR:", error);
    }
}

function updateNavbar() {
    const path = window.location.pathname;
    let page = path.split("/").pop();
    if (page === "" || page === "index.html") page = "index.html";

    const links = document.querySelectorAll('.nav-link');
    const indicator = document.querySelector('.nav-indicator');
    const navList = document.querySelector('.nav-list');

    if (!indicator || !navList) return;

    let activeLink = null;
    links.forEach(link => {
        if (link.getAttribute('href') === page) {
            activeLink = link;
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    if (activeLink) {
        const linkRect = activeLink.getBoundingClientRect();
        const navRect = navList.getBoundingClientRect();
        const leftPosition = linkRect.left - navRect.left;
        const width = linkRect.width;

        indicator.style.width = `${width}px`;
        indicator.style.transform = `translateX(${leftPosition}px)`;
        indicator.style.left = "0";
    }
}

function renderAll() {
    // Renderizado de Noticias
    const newsGrid = document.getElementById('noticias-grid');
    if (newsGrid && appData.noticias) {
        newsGrid.innerHTML = appData.noticias.map(n => `
            <div class="noticia-card">
                <div>
                    <h3 style="display:flex; align-items:center; gap:10px;">
                        <i class='bx ${n.icono}' style="color:var(--morado-claro)"></i> ${n.titulo}
                    </h3>
                    <p style="margin-top:10px; color:#bbb; font-size:0.9rem; line-height:1.5;">${n.contenido}</p>
                </div>
                <span class="fecha-bottom">${n.fecha}</span>
            </div>
        `).join('');
    }

    // Renderizado de Proyectos
    const projGrid = document.getElementById('proyectos-grid');
    if (projGrid && appData.proyectos) {
        projGrid.innerHTML = appData.proyectos.map(p => `
            <div class="noticia-card" style="text-align:center; align-items: center;">
                <img src="${p.img}" style="width:90px; margin-bottom:15px; border-radius:10px;">
                <h3>${p.titulo}</h3>
                <p style="margin:10px 0; color:#aaa; font-size:0.85rem;">${p.desc}</p>
                ${p.disabled ? 
                    `<button class="btn-download" style="background:#222; color:#555; cursor:not-allowed;">${p.btn}</button>` : 
                    `<a href="${p.link}" class="btn-download">${p.btn}</a>`}
            </div>
        `).join('');
    }

    // Renderizado de Redes
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

    // Detalle Obsidian
    const det = document.getElementById('detalle-container');
    if (det && appData.proyectos) {
        const p = appData.proyectos.find(x => x.id === "obsidian");
        if(p) {
            det.innerHTML = `
                <div class="glass" style="text-align:center; margin-top:40px;">
                    <img src="${p.img}" style="width:120px; filter:drop-shadow(0 0 15px var(--morado));">
                    <h1 style="margin:20px 0; font-family:'Montserrat';">OBSIDIAN OPTIMIZADOR</h1>
                    <p style="color:#888; margin-bottom:25px;">Desarrollado por Saturnite Studios</p>
                    <div style="text-align:left; background:rgba(255,255,255,0.03); padding:20px; border-radius:15px; border:1px solid rgba(255,255,255,0.05); display:grid; grid-template-columns: 1fr 1fr; gap:15px;">
                        <p><i class='bx bx-bolt-circle' style="color:var(--morado-claro)"></i> +200% FPS Boost</p>
                        <p><i class='bx bx-target-lock' style="color:var(--morado-claro)"></i> Input Lag 0ms</p>
                        <p><i class='bx bx-chip' style="color:var(--morado-claro)"></i> Smart RAM Clean</p>
                        <p><i class='bx bx-wifi' style="color:var(--morado-claro)"></i> Network Fix</p>
                        <p><i class='bx bx-shield-quarter' style="color:var(--morado-claro)"></i> Antilag System</p>
                        <p><i class='bx bx-moon' style="color:var(--morado-claro)"></i> Custom Sky</p>
                    </div>
                    <button onclick="abrirAviso('${p.enlace}')" class="btn-download" style="margin-top:30px;">DESCARGAR AHORA</button>
                </div>
            `;
        }
    }
}

// Control del Loader
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

// Inicialización
window.addEventListener('load', handleLoader);
window.addEventListener('resize', updateNavbar);
document.addEventListener("DOMContentLoaded", () => {
    fetchData(); // Carga datos y luego renderiza
    updateNavbar();
});

// Modal logic
let pendingUrl = "";
function abrirAviso(url) { pendingUrl = url; document.getElementById('modal-aviso').classList.add('active'); }
function cerrarAviso() { document.getElementById('modal-aviso').classList.remove('active'); }
function continuarDescarga() { if (pendingUrl) window.open(pendingUrl, '_blank'); cerrarAviso(); }
