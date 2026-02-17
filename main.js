let appData = {};
let currentLang = localStorage.getItem('lang') || 'es';

async function init() {
    try {
        const response = await fetch('./data.json');
        appData = await response.json();
        renderAll();
        updateNavbar();
    } catch (e) { console.error("Error cargando base de datos"); }
}

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    location.reload(); // Recargamos para aplicar cambios en toda la UI
}

function renderAll() {
    const isEn = currentLang === 'en';
    const ui = appData.config.ui;

    // --- 1. Traducción de UI Estática (Navbar y Títulos) ---
    document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.getAttribute('data-key');
        const keys = key.split('.');
        let translation = ui;
        keys.forEach(k => translation = translation[k]);
        el.innerText = isEn ? translation.en : translation.es;
    });

    // --- 2. Renderizar Noticias (Index) ---
    const newsGrid = document.getElementById('noticias-grid');
    if (newsGrid) {
        newsGrid.innerHTML = appData.noticias.map(n => `
            <div class="noticia-card">
                <h3><i class='bx ${n.icono}'></i> ${isEn ? n.titulo_en : n.titulo_es}</h3>
                <p>${isEn ? n.contenido_en : n.contenido_es}</p>
                <span class="fecha-bottom">${n.fecha}</span>
            </div>
        `).join('');
    }

    // --- 3. Renderizar Filtros y Proyectos (proyectos.html) ---
    const filterBar = document.getElementById('filter-bar');
    if (filterBar) {
        filterBar.innerHTML = appData.config.filtros
            .filter(f => f.enabled)
            .map(f => `<button class="filter-btn" onclick="renderProjectsList('${f.id}')">${isEn ? f.en : f.es}</button>`)
            .join('');
        renderProjectsList('todos');
    }

    // --- 4. Renderizar Redes (redes.html) ---
    const redesCont = document.getElementById('redes-container');
    if (redesCont) {
        redesCont.innerHTML = appData.redes.map(r => `
            <div class="noticia-card" onclick="window.location.href='${r.url}'" style="cursor:pointer; flex-direction:row; align-items:center; gap:20px;">
                <i class='bx ${r.icono}' style="font-size:2.5rem; color:${r.color}"></i>
                <div>
                    <h3 style="margin:0;">${r.nombre}</h3>
                    <p style="margin:0; font-size:0.8rem; color:#888;">${isEn ? r.desc_en : r.desc_es}</p>
                </div>
            </div>
        `).join('');
    }

    // --- 5. Página de Detalle Dinámica (proyecto.html) ---
    const detCont = document.getElementById('detalle-dinamico');
    if (detCont) {
        const params = new URLSearchParams(window.location.search);
        const p = appData.proyectos.find(x => x.id === params.get('id'));
        if (p) {
            document.title = `${p.id.toUpperCase()} | Saturnite`;
            detCont.innerHTML = `
                <div class="glass text-center">
                    <img src="${p.img}" style="width:120px; border-radius:20px; filter:drop-shadow(0 0 15px var(--morado));">
                    <h1 class="main-title" style="margin-top:20px;">${isEn ? p.titulo_en : p.titulo_es}</h1>
                    <div class="specs-grid" style="margin:25px 0;">
                        ${p.specs.map(s => `<p><i class='bx ${s.icon}'></i> ${isEn ? s.en : s.es}</p>`).join('')}
                    </div>
                    <button onclick="abrirAviso('${p.enlace}')" class="btn-download" ${p.disabled ? 'disabled style="background:#222; opacity:0.5"' : ''}>
                        ${isEn ? p.btn_en : p.btn_es}
                    </button>
                </div>
            `;
        }
    }
}

function renderProjectsList(filter) {
    const grid = document.getElementById('proyectos-grid');
    if (!grid) return;
    const isEn = currentLang === 'en';
    const filtered = filter === 'todos' ? appData.proyectos : appData.proyectos.filter(p => p.categoria === filter);

    grid.innerHTML = filtered.map(p => `
        <div class="noticia-card text-center">
            <img src="${p.img}" style="width:80px; margin-bottom:15px;">
            <h3>${isEn ? p.titulo_en : p.titulo_es}</h3>
            <p style="font-size:0.85rem; color:#aaa;">${isEn ? p.desc_en : p.desc_es}</p>
            <a href="proyecto.html?id=${p.id}" class="btn-download" style="margin-top:15px; display:inline-block;">
                ${isEn ? 'Details' : 'Detalles'}
            </a>
        </div>
    `).join('');
}

// Lógica de Navbar, Modal y Loader (Simplificada)
function updateNavbar() {
    const path = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll('.nav-link').forEach(link => {
        if(link.getAttribute('href') === path) link.classList.add('active');
    });
}

let pendingUrl = "";
function abrirAviso(url) { if(url==="#") return; pendingUrl = url; document.getElementById('modal-aviso').classList.add('active'); }
function cerrarAviso() { document.getElementById('modal-aviso').classList.remove('active'); }
function continuarDescarga() { window.open(pendingUrl, '_blank'); cerrarAviso(); }

document.addEventListener("DOMContentLoaded", init);
