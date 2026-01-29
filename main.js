// 1. ANIMACIÓN DE CARGA (Solo primera visita)
window.addEventListener('load', () => {
    const loader = document.getElementById('loader-wrapper');
    if (!loader) return;
    
    const isFirstLoad = !sessionStorage.getItem('siteLoaded');
    
    if (isFirstLoad) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => loader.style.display = 'none', 800);
            sessionStorage.setItem('siteLoaded', 'true');
        }, 1800); // Tiempo de animación
    } else {
        loader.style.display = 'none';
    }
    
    // Iniciar Scroll Reveal
    initScrollReveal();
});

// 2. SISTEMA DE DATOS
const appData = {
    noticias: [
        { 
            titulo: "Survival Comunitario", 
            contenido: "El servidor que todos esperaban. Economía, protecciones y eventos semanales. Lanzamiento oficial a mediados de febrero.", 
            fecha: "27 FEB 2026", 
            icono: "bx-server" 
        },
        { 
            titulo: "Renovación Visual", 
            contenido: "Hemos pulido cada píxel. Nueva interfaz Glass Dark, animaciones fluidas a 60fps y corrección total de errores visuales.", 
            fecha: "29 ENE 2026", 
            icono: "bx-palette" 
        },
        { 
            titulo: "Estabilidad Garantizada", 
            contenido: "Se han eliminado los bugs de navegación y renderizado. La experiencia ahora es sólida como la roca madre.", 
            fecha: "28 ENE 2026", 
            icono: "bx-shield-quarter" 
        },
        // OCULTAS
        { titulo: "Aviso Importante", contenido: "Estaré inactivo temporalmente por falta de dispositivo móvil. Volveré más fuerte.", fecha: "20 ENE 2026", icono: "bx-mobile-off" },
        { titulo: "Obsidian: Legacy", contenido: "Obsidian ha llegado a su fin. El código se congela en su mejor versión para la historia.", fecha: "15 ENE 2026", icono: "bx-archive" }
    ],
    proyectos: [
        { 
            id: "survival", 
            titulo: "Survival Ariesito", 
            desc: "Servidor Técnico & Comunitario", 
            img: "https://i.postimg.cc/25tg6zFM/custom-ava.png", 
            link: "#", 
            btnText: "Próximamente", 
            disabled: true 
        },
        { 
            id: "obsidian", 
            titulo: "Obsidian Optimizador", 
            desc: "Máximos FPS. Input Lag Cero.", 
            img: "https://i.postimg.cc/mgrqdjGk/pack-icon-2.png", 
            link: "obsidian.html", 
            enlace: "https://link-target.net/1356996/zMa3fwoanGAK", 
            btnText: "Ver Ficha Técnica", 
            disabled: false 
        }
    ],
    redes: [
        { nombre: "YouTube", desc: "Tutoriales y Reviews", url: "https://www.youtube.com/@soyariesitomc", icono: "bxl-youtube", color: "#ff0000" },
        { nombre: "TikTok", desc: "Contenido Rápido", url: "https://www.tiktok.com/@soyariesitomc", icono: "bxl-tiktok", color: "#fff" },
        { nombre: "WhatsApp", desc: "Canal Oficial", url: "https://whatsapp.com/channel/0029Vb74InvEwEjnCiAVjD1b", icono: "bxl-whatsapp", color: "#25D366" },
        { nombre: "Discord", desc: "Comunidad", url: "https://discord.gg/DgrckyxNMr", icono: "bxl-discord-alt", color: "#5865F2" }
    ]
};

let showingAllNews = false;
let pendingUrl = "";

// 3. RENDERIZADO DE NOTICIAS
function renderNoticias() {
    const newsGrid = document.getElementById('noticias-grid');
    if (!newsGrid) return;
    
    const items = showingAllNews ? appData.noticias : appData.noticias.slice(0, 3);
    
    newsGrid.innerHTML = items.map((n, index) => `
        <div class="noticia-card reveal" style="transition-delay: ${index * 100}ms">
            <h3 style="display:flex; align-items:center; gap:10px; margin-bottom:10px;">
                <i class='bx ${n.icono}' style="color:var(--morado-claro); font-size:1.4rem;"></i> ${n.titulo}
            </h3>
            <p style="color:#bbb; font-size:0.95rem; line-height:1.6;">${n.contenido}</p>
            <span class="fecha-bottom">${n.fecha}</span>
        </div>
    `).join('') + (appData.noticias.length > 3 ? 
        `<button class="btn-show-more reveal" onclick="toggleNews()">${showingAllNews ? 'MOSTRAR MENOS' : 'HISTORIAL DE NOTICIAS'}</button>` : '');
    
    // Re-inicializar animaciones para nuevos elementos
    setTimeout(initScrollReveal, 100);
}

function toggleNews() { showingAllNews = !showingAllNews; renderNoticias(); }

// 4. LÓGICA DE NAVBAR (AUTO-DETECT)
function updateNavbar() {
    const path = window.location.pathname;
    const page = path.split("/").pop() || "index.html"; // Detecta archivo actual
    
    const links = document.querySelectorAll('.navbar-link');
    const indicator = document.querySelector('.indicator');
    
    links.forEach(link => {
        link.classList.remove('active');
        // Comparación flexible para detectar home en raíz
        if (link.getAttribute('href') === page || (page === "" && link.getAttribute('href') === "index.html")) {
            link.classList.add('active');
            // Mover indicador
            if (indicator) {
                indicator.style.left = `${link.offsetLeft}px`;
                indicator.style.width = `${link.offsetWidth}px`;
            }
        }
    });
}

// 5. RENDERIZADO GENERAL
function initApp() {
    updateNavbar(); // Arreglo del bug Navbar
    renderNoticias();

    // Redes
    const redesCont = document.getElementById('redes-container');
    if (redesCont) {
        redesCont.innerHTML = appData.redes.map((r, i) => `
            <div class="noticia-card reveal" onclick="window.location.href='${r.url}'" style="cursor:pointer; display:flex; align-items:center; gap:20px; transition-delay:${i*100}ms">
                <i class='bx ${r.icono}' style="font-size:2.5rem; color:${r.color}; filter:drop-shadow(0 0 10px ${r.color}40);"></i>
                <div>
                    <h3 style="margin:0; font-size:1.1rem;">${r.nombre}</h3>
                    <p style="margin:0; font-size:0.8rem; color:#888;">${r.desc}</p>
                </div>
            </div>
        `).join('');
    }

    // Proyectos (Sin Logo Arriba)
    const projGrid = document.getElementById('proyectos-grid');
    if (projGrid) {
        projGrid.innerHTML = appData.proyectos.map((p, i) => `
            <div class="noticia-card reveal" style="text-align:center; transition-delay:${i*150}ms">
                <img src="${p.img}" style="width:90px; margin-bottom:15px; border-radius:15px; box-shadow:0 5px 15px rgba(0,0,0,0.3);">
                <h3 style="margin-bottom:10px;">${p.titulo}</h3>
                <p style="font-size:0.9rem; margin-bottom:20px; color:#ccc;">${p.desc}</p>
                ${p.disabled ? 
                    `<button class="btn-download disabled">${p.btnText}</button>` : 
                    `<a href="${p.link}" class="btn-download">${p.btnText}</a>`
                }
            </div>
        `).join('');
    }

    // Detalle Obsidian
    const det = document.getElementById('detalle-container');
    if (det) {
        const p = appData.proyectos.find(x => x.id === "obsidian");
        det.innerHTML = `
            <div class="glass reveal" style="text-align: center;">
                <img src="${p.img}" style="width:120px; margin-bottom:25px; filter: drop-shadow(0 0 25px var(--morado)); animation: float 3s infinite ease-in-out;">
                <h1 style="color:white; margin-bottom:15px; font-family:'Montserrat'; letter-spacing:1px;">${p.titulo}</h1>
                <p style="margin-bottom:30px; color:#ccc; font-size:1rem; line-height:1.6;">${p.desc}</p>
                
                <div style="text-align:left; display:grid; gap:15px; margin-bottom:30px;">
                    <div style="background:rgba(255,255,255,0.05); padding:15px; border-radius:12px; display:flex; align-items:center; gap:15px;">
                        <i class='bx bx-tachometer' style="font-size:1.5rem; color:var(--morado-claro);"></i>
                        <div><strong>FPS Boost</strong><br><span style="font-size:0.8rem; color:#aaa;">Motor gráfico optimizado</span></div>
                    </div>
                    <div style="background:rgba(255,255,255,0.05); padding:15px; border-radius:12px; display:flex; align-items:center; gap:15px;">
                        <i class='bx bx-wifi-off' style="font-size:1.5rem; color:var(--morado-claro);"></i>
                        <div><strong>Low Latency</strong><br><span style="font-size:0.8rem; color:#aaa;">Reducción de ping e input lag</span></div>
                    </div>
                    <div style="background:rgba(255,255,255,0.05); padding:15px; border-radius:12px; display:flex; align-items:center; gap:15px;">
                        <i class='bx bx-moon' style="font-size:1.5rem; color:var(--morado-claro);"></i>
                        <div><strong>Dark UI</strong><br><span style="font-size:0.8rem; color:#aaa;">Interfaz limpia y oscura</span></div>
                    </div>
                </div>

                <button onclick="abrirAviso('${p.enlace}')" class="btn-download">DESCARGAR AHORA</button>
            </div>
            <style>@keyframes float { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-10px);} }</style>
        `;
    }
}

// 6. SCROLL REVEAL (Animación al bajar)
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });
    
    reveals.forEach(el => observer.observe(el));
}

// MODAL LOGIC
function abrirAviso(url) { pendingUrl = url; document.getElementById('modal-aviso').classList.add('active'); }
function cerrarAviso() { document.getElementById('modal-aviso').classList.remove('active'); }
function continuarDescarga() { if (pendingUrl) { window.open(pendingUrl, '_blank'); cerrarAviso(); } }

document.addEventListener("DOMContentLoaded", initApp);
        
