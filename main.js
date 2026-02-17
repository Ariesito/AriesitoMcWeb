let appData = {};
let currentLang = localStorage.getItem('lang') || 'es';

async function init() {
    try {
        const response = await fetch('./data.json');
        appData = await response.json();
        renderAll();
    } catch (e) { console.error("Error cargando base de datos"); }
}

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    renderAll();
}

function renderAll() {
    const isEn = currentLang === 'en';

    // 1. SEO Dinámico (Título y Meta)
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');
    
    // 2. Renderizar Filtros (Solo en proyectos.html)
    const filterContainer = document.getElementById('filter-bar');
    if (filterContainer && appData.config.filtros_config) {
        filterContainer.innerHTML = appData.config.filtros_config
            .filter(f => f.enabled)
            .map(f => `
                <button class="filter-btn" onclick="filterProjects('${f.id}')">
                    ${isEn ? f.label_en : f.label_es}
                </button>
            `).join('');
    }

    // 3. Renderizar Noticias (index.html)
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

    // 4. Renderizar Lista de Proyectos (proyectos.html)
    renderProjectsList('todos');

    // 5. Renderizar Detalle Dinámico (proyecto.html)
    const detCont = document.getElementById('detalle-dinamico');
    if (detCont && projectId) {
        const p = appData.proyectos.find(x => x.id === projectId);
        if (p) {
            document.title = `${p.id.toUpperCase()} | Saturnite`;
            detCont.innerHTML = `
                <div class="glass text-center">
                    <img src="${p.img}" style="width:120px; border-radius:20px;">
                    <h1 class="main-title">${isEn ? p.titulo_en : p.titulo_es}</h1>
                    <div class="specs-grid">
                        ${p.specs.map(s => `<p><i class='bx ${s.icon}'></i> ${isEn ? s.text_en : s.text_es}</p>`).join('')}
                    </div>
                    <button onclick="abrirAviso('${p.enlace_descarga}')" class="btn-download" ${p.disabled ? 'disabled style="background:#222"' : ''}>
                        ${isEn ? p.btn_en : p.btn_es}
                    </button>
                </div>
            `;
        }
    }
}

function renderProjectsList(filter) {
    const projGrid = document.getElementById('proyectos-grid');
    if (!projGrid) return;
    const isEn = currentLang === 'en';
    
    const filtered = filter === 'todos' ? appData.proyectos : appData.proyectos.filter(p => p.categoria === filter);

    projGrid.innerHTML = filtered.map(p => `
        <div class="noticia-card text-center">
            <img src="${p.img}" style="width:80px; margin-bottom:15px;">
            <h3>${isEn ? p.titulo_en : p.titulo_es}</h3>
            <p>${isEn ? p.desc_en : p.desc_es}</p>
            <a href="proyecto.html?id=${p.id}" class="btn-download" style="margin-top:15px; display:inline-block;">
                ${isEn ? 'Details' : 'Detalles'}
            </a>
        </div>
    `).join('');
}

function filterProjects(cat) { renderProjectsList(cat); }

// Lógica de Modal y Loader (Se mantiene simplificada)
let pendingUrl = "";
function abrirAviso(url) { if(url==="#") return; pendingUrl = url; document.getElementById('modal-aviso').classList.add('active'); }
function cerrarAviso() { document.getElementById('modal-aviso').classList.remove('active'); }
function continuarDescarga() { window.open(pendingUrl, '_blank'); cerrarAviso(); }

document.addEventListener("DOMContentLoaded", init);
