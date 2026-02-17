let appData = {};
let currentLang = localStorage.getItem('lang') || 'es';

async function init() {
    try {
        const response = await fetch('./data.json');
        if (!response.ok) throw new Error("Error cargando JSON");
        appData = await response.json();
        renderAll();
    } catch (e) {
        console.error("Fallo crítico:", e);
    } finally {
        // Esto asegura que el loader se quite SIEMPRE
        setTimeout(removeLoader, 800);
    }
}

function removeLoader() {
    const loader = document.getElementById('loader-wrapper');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.style.display = 'none', 600);
    }
}

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    location.reload();
}

function renderAll() {
    const isEn = currentLang === 'en';
    const ui = appData.config.ui;

    // Traducción de UI con data-key
    document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.getAttribute('data-key');
        const keys = key.split('.');
        let translation = ui;
        keys.forEach(k => translation = translation ? translation[k] : null);
        if (translation) el.innerText = isEn ? translation.en : translation.es;
    });

    // Renderizar Noticias
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

    // Renderizar Filtros y Proyectos
    const filterBar = document.getElementById('filter-bar');
    if (filterBar) {
        filterBar.innerHTML = appData.config.filtros
            .filter(f => f.enabled)
            .map(f => `<button class="filter-btn" onclick="renderProjectsList('${f.id}')">${isEn ? f.en : f.es}</button>`)
            .join('');
        renderProjectsList('todos');
    }

    // Página de Detalle
    const detCont = document.getElementById('detalle-dinamico');
    if (detCont) {
        const params = new URLSearchParams(window.location.search);
        const p = appData.proyectos.find(x => x.id === params.get('id'));
        if (p) {
            detCont.innerHTML = `
                <div class="glass text-center">
                    <img src="${p.img}" style="width:120px; border-radius:20px;">
                    <h1 class="main-title">${isEn ? p.titulo_en : p.titulo_es}</h1>
                    <div class="specs-grid">${p.specs.map(s => `<p><i class='bx ${s.icon}'></i> ${isEn ? s.en : s.es}</p>`).join('')}</div>
                    <button onclick="abrirAviso('${p.enlace}')" class="btn-download" ${p.disabled ? 'disabled style="background:#222"' : ''}>
                        ${isEn ? p.btn_en : p.btn_es}
                    </button>
                </div>`;
        }
    }
    updateNavbarIndicator();
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
            <a href="proyecto.html?id=${p.id}" class="btn-download" style="margin-top:15px;">${isEn ? 'Details' : 'Detalles'}</a>
        </div>`).join('');
}

function updateNavbarIndicator() {
    const path = window.location.pathname.split("/").pop() || "index.html";
    const activeLink = document.querySelector(`.nav-link[href="${path}"]`);
    const indicator = document.querySelector('.nav-indicator');
    if (activeLink && indicator) {
        activeLink.classList.add('active');
        indicator.style.width = `${activeLink.offsetWidth}px`;
        indicator.style.left = `${activeLink.offsetLeft}px`;
    }
}

let pendingUrl = "";
function abrirAviso(url) { if(url==="#") return; pendingUrl = url; document.getElementById('modal-aviso').classList.add('active'); }
function cerrarAviso() { document.getElementById('modal-aviso').classList.remove('active'); }
function continuarDescarga() { window.open(pendingUrl, '_blank'); cerrarAviso(); }

document.addEventListener("DOMContentLoaded", init);
