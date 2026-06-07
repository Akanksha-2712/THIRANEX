/**
 * AuraCommerce Modular UI Components
 * Defines rendering functions, HTML templates, and event bindings for all application views.
 */

import { ApiClient } from './api.js';
import { Store } from './store.js';

// SVG Assets Repository (Returns crisp, responsive vector illustrations)
function getProductSVG(id, width = "100%", height = "220px") {
    const gradients = `
        <defs>
            <linearGradient id="g-audio" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#3b82f6" />
                <stop offset="100%" stop-color="#8b5cf6" />
            </linearGradient>
            <linearGradient id="g-keyboard" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#10b981" />
                <stop offset="100%" stop-color="#06b6d4" />
            </linearGradient>
            <linearGradient id="g-setup" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#6b7280" />
                <stop offset="100%" stop-color="#d1d5db" />
            </linearGradient>
            <linearGradient id="g-accessories" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#f43f5e" />
                <stop offset="100%" stop-color="#fb7185" />
            </linearGradient>
            <linearGradient id="g-power" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#eab308" />
                <stop offset="100%" stop-color="#f97316" />
            </linearGradient>
            <linearGradient id="g-travel" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#1f2937" />
                <stop offset="100%" stop-color="#4b5563" />
            </linearGradient>
            <linearGradient id="g-glow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#a855f7" />
                <stop offset="100%" stop-color="#ec4899" />
            </linearGradient>
            <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
                <feDropShadow dx="0" dy="6" stdDeviation="6" flood-opacity="0.15"/>
            </filter>
            <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
        </defs>
    `;

    switch(Number(id)) {
        case 1: // Headphones
            return `
                <svg width="${width}" height="${height}" viewBox="0 0 200 200" fill="none" class="product-svg-placeholder" xmlns="http://www.w3.org/2000/svg">
                    ${gradients}
                    <!-- Headband -->
                    <path d="M50 100 C50 40, 150 40, 150 100" stroke="url(#g-audio)" stroke-width="12" stroke-linecap="round" filter="url(#shadow)"/>
                    <path d="M56 100 C56 50, 144 50, 144 100" stroke="rgba(255,255,255,0.15)" stroke-width="2" stroke-linecap="round" />
                    <!-- Cushion pad -->
                    <path d="M70 56 C70 56, 100 48, 130 56" stroke="rgba(0,0,0,0.3)" stroke-width="6" stroke-linecap="round"/>
                    <!-- Left Earcup -->
                    <rect x="34" y="90" width="28" height="48" rx="14" fill="url(#g-audio)" filter="url(#shadow)"/>
                    <rect x="42" y="96" width="12" height="36" rx="6" fill="rgba(255,255,255,0.2)"/>
                    <!-- Right Earcup -->
                    <rect x="138" y="90" width="28" height="48" rx="14" fill="url(#g-audio)" filter="url(#shadow)"/>
                    <rect x="146" y="96" width="12" height="36" rx="6" fill="rgba(255,255,255,0.2)"/>
                    <!-- Earcup Joints -->
                    <path d="M48 90 L48 80 M152 90 L152 80" stroke="#6b7280" stroke-width="6" stroke-linecap="round" />
                </svg>
            `;
        case 2: // Keyboard
            return `
                <svg width="${width}" height="${height}" viewBox="0 0 200 200" fill="none" class="product-svg-placeholder" xmlns="http://www.w3.org/2000/svg">
                    ${gradients}
                    <!-- Keyboard Case -->
                    <rect x="25" y="70" width="150" height="65" rx="8" fill="#1f2937" stroke="url(#g-keyboard)" stroke-width="3" filter="url(#shadow)"/>
                    <!-- Neon Underglow -->
                    <rect x="20" y="65" width="160" height="75" rx="12" fill="none" stroke="rgba(6,182,212,0.15)" stroke-width="6" filter="url(#neon-glow)" />
                    <!-- Keycaps grid -->
                    <g fill="#374151" stroke="#1f2937" stroke-width="1.5">
                        <!-- Row 1 -->
                        <rect x="33" y="78" width="10" height="10" rx="2" fill="url(#g-keyboard)" />
                        <rect x="46" y="78" width="10" height="10" rx="2" />
                        <rect x="59" y="78" width="10" height="10" rx="2" />
                        <rect x="72" y="78" width="10" height="10" rx="2" />
                        <rect x="85" y="78" width="10" height="10" rx="2" />
                        <rect x="98" y="78" width="10" height="10" rx="2" />
                        <rect x="111" y="78" width="10" height="10" rx="2" />
                        <rect x="124" y="78" width="10" height="10" rx="2" />
                        <rect x="137" y="78" width="10" height="10" rx="2" />
                        <rect x="150" y="78" width="17" height="10" rx="2" fill="#4b5563" />
                        <!-- Row 2 -->
                        <rect x="33" y="91" width="14" height="10" rx="2" fill="#4b5563" />
                        <rect x="50" y="91" width="10" height="10" rx="2" />
                        <rect x="63" y="91" width="10" height="10" rx="2" />
                        <rect x="76" y="91" width="10" height="10" rx="2" />
                        <rect x="89" y="91" width="10" height="10" rx="2" />
                        <rect x="102" y="91" width="10" height="10" rx="2" />
                        <rect x="115" y="91" width="10" height="10" rx="2" />
                        <rect x="128" y="91" width="10" height="10" rx="2" />
                        <rect x="141" y="91" width="10" height="10" rx="2" />
                        <rect x="154" y="91" width="13" height="10" rx="2" fill="#4b5563" />
                        <!-- Row 3 -->
                        <rect x="33" y="104" width="17" height="10" rx="2" fill="#4b5563" />
                        <rect x="53" y="104" width="10" height="10" rx="2" />
                        <rect x="66" y="104" width="10" height="10" rx="2" />
                        <rect x="79" y="104" width="10" height="10" rx="2" />
                        <rect x="92" y="104" width="10" height="10" rx="2" />
                        <rect x="105" y="104" width="10" height="10" rx="2" />
                        <rect x="118" y="104" width="10" height="10" rx="2" />
                        <rect x="131" y="104" width="10" height="10" rx="2" />
                        <rect x="144" y="104" width="23" height="10" rx="2" fill="url(#g-keyboard)" />
                        <!-- Row 4 -->
                        <rect x="33" y="117" width="13" height="10" rx="2" />
                        <rect x="49" y="117" width="10" height="10" rx="2" />
                        <rect x="62" y="117" width="10" height="10" rx="2" />
                        <rect x="75" y="117" width="48" height="10" rx="2" fill="url(#g-keyboard)" />
                        <rect x="126" y="117" width="10" height="10" rx="2" />
                        <rect x="139" y="117" width="10" height="10" rx="2" />
                        <rect x="152" y="117" width="15" height="10" rx="2" />
                    </g>
                </svg>
            `;
        case 3: // Desk Pad
            return `
                <svg width="${width}" height="${height}" viewBox="0 0 200 200" fill="none" class="product-svg-placeholder" xmlns="http://www.w3.org/2000/svg">
                    ${gradients}
                    <!-- Felt Mat -->
                    <rect x="15" y="60" width="170" height="90" rx="12" fill="#374151" stroke="url(#g-setup)" stroke-width="2" filter="url(#shadow)"/>
                    <rect x="18" y="63" width="164" height="84" rx="9" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="2" stroke-dasharray="4,4" />
                    <!-- Cork Backing (Subtle base shadow) -->
                    <path d="M15 150 L185 150 L180 154 L20 154 Z" fill="#b45309" opacity="0.8" />
                    <!-- Minimal Keyboard outline -->
                    <rect x="45" y="80" width="75" height="35" rx="3" fill="#1f2937" opacity="0.4" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
                    <!-- Minimal Mouse outline -->
                    <rect x="135" y="87" width="18" height="28" rx="6" fill="#1f2937" opacity="0.4" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
                </svg>
            `;
        case 4: // Mouse
            return `
                <svg width="${width}" height="${height}" viewBox="0 0 200 200" fill="none" class="product-svg-placeholder" xmlns="http://www.w3.org/2000/svg">
                    ${gradients}
                    <!-- Mouse Base/Shadow -->
                    <path d="M60 135 C60 135, 65 145, 100 145 C135 145, 140 135, 140 135 C140 135, 150 115, 150 95 C150 50, 128 45, 100 45 C72 45, 50 50, 50 95 C50 115, 60 135, 60 135 Z" fill="#111827" filter="url(#shadow)"/>
                    <!-- Mouse Main Body -->
                    <path d="M62 130 C62 130, 68 140, 100 140 C132 140, 138 130, 138 130 C138 130, 146 112, 146 95 C146 55, 126 50, 100 50 C74 50, 54 55, 54 95 C54 112, 62 130, 62 130 Z" fill="url(#g-accessories)" />
                    <!-- Left/Right Click Separator split -->
                    <path d="M100 50 L100 95" stroke="#111827" stroke-width="2" />
                    <!-- Scroll Wheel -->
                    <rect x="96" y="62" width="8" height="18" rx="4" fill="#111827" stroke="rgba(255,255,255,0.5)" stroke-width="1" />
                    <line x1="100" y1="66" x2="100" y2="76" stroke="#fb7185" stroke-width="2" />
                    <!-- Ergonomic thumb rest curve (Darker shade overlay) -->
                    <path d="M54 95 C54 115, 60 130, 65 133 C62 125, 58 110, 58 95 C58 80, 60 75, 60 75" fill="rgba(0,0,0,0.25)" />
                </svg>
            `;
        case 5: // Charger
            return `
                <svg width="${width}" height="${height}" viewBox="0 0 200 200" fill="none" class="product-svg-placeholder" xmlns="http://www.w3.org/2000/svg">
                    ${gradients}
                    <!-- Charger body -->
                    <rect x="50" y="55" width="85" height="90" rx="12" fill="#1f2937" stroke="url(#g-power)" stroke-width="3" filter="url(#shadow)"/>
                    <!-- Inner Spec graphics -->
                    <text x="62" y="85" fill="rgba(255,255,255,0.25)" font-size="16" font-family="'Outfit', sans-serif" font-weight="bold">140W</text>
                    <text x="62" y="100" fill="rgba(255,255,255,0.15)" font-size="10" font-family="'Outfit', sans-serif">GaN Pro</text>
                    <!-- Front face outline -->
                    <path d="M135 55 L135 145" stroke="rgba(255,255,255,0.08)" stroke-width="2" />
                    <!-- Outputs / Ports on side -->
                    <!-- USB-C 1 -->
                    <rect x="142" y="68" width="10" height="6" rx="2" fill="url(#g-power)" />
                    <line x1="145" y1="71" x2="149" y2="71" stroke="#000" stroke-width="1" />
                    <!-- USB-C 2 -->
                    <rect x="142" y="86" width="10" height="6" rx="2" fill="url(#g-power)" />
                    <!-- USB-C 3 -->
                    <rect x="142" y="104" width="10" height="6" rx="2" fill="url(#g-power)" />
                    <!-- USB-A -->
                    <rect x="140" y="120" width="13" height="8" rx="1.5" fill="#4b5563" stroke="#eab308" stroke-width="1"/>
                    <!-- Power indicator LED -->
                    <circle cx="62" cy="125" r="3" fill="#20c997" filter="url(#neon-glow)" />
                </svg>
            `;
        case 6: // Backpack
            return `
                <svg width="${width}" height="${height}" viewBox="0 0 200 200" fill="none" class="product-svg-placeholder" xmlns="http://www.w3.org/2000/svg">
                    ${gradients}
                    <!-- Backpack Shell -->
                    <path d="M60 60 C60 40, 140 40, 140 60 C140 60, 150 85, 150 135 C150 160, 135 165, 100 165 C65 165, 50 160, 50 135 C50 85, 60 60, 60 60 Z" fill="url(#g-travel)" stroke="#111827" stroke-width="2" filter="url(#shadow)"/>
                    <!-- Top Handle -->
                    <path d="M85 45 C85 35, 115 35, 115 45" stroke="#111827" stroke-width="7" stroke-linecap="round" />
                    <!-- Front diagonal zipper pocket -->
                    <path d="M54 90 L140 120" stroke="#111827" stroke-width="4" stroke-linecap="round" />
                    <path d="M54 90 L140 120" stroke="#f43f5e" stroke-width="1.5" stroke-linecap="round" />
                    <rect x="94" y="101" width="6" height="12" rx="1.5" fill="#9ca3af" transform="rotate(20 94 101)"/>
                    <!-- Front Logo Badge -->
                    <polygon points="95,65 105,65 100,75" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.3)" stroke-width="1" />
                    <!-- Bottom protective patch -->
                    <path d="M53 145 C55 155, 68 164, 100 164 C132 164, 145 155, 147 145 C147 145, 125 150, 100 150 C75 150, 53 145, 53 145 Z" fill="#111827" />
                </svg>
            `;
        case 7: // Phone Stand
            return `
                <svg width="${width}" height="${height}" viewBox="0 0 200 200" fill="none" class="product-svg-placeholder" xmlns="http://www.w3.org/2000/svg">
                    ${gradients}
                    <!-- Base -->
                    <ellipse cx="100" cy="160" rx="42" ry="14" fill="#374151" stroke="url(#g-setup)" stroke-width="2" filter="url(#shadow)"/>
                    <!-- Heavy Metal plate inside base -->
                    <ellipse cx="100" cy="158" rx="36" ry="10" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1" />
                    <!-- Arm post -->
                    <path d="M100 152 L100 90 L125 65" stroke="url(#g-setup)" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" filter="url(#shadow)" />
                    <path d="M100 152 L100 90 L125 65" stroke="rgba(255,255,255,0.2)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <!-- Rotating Hinge -->
                    <circle cx="125" cy="65" r="8" fill="#1f2937" stroke="#4b5563" stroke-width="2" />
                    <!-- Magnetic Disk plate -->
                    <rect x="110" y="32" width="30" height="42" rx="6" fill="#f3f4f6" stroke="#9ca3af" stroke-width="1.5" transform="rotate(25 125 53)" filter="url(#shadow)" />
                    <circle cx="125" cy="53" r="10" fill="none" stroke="url(#g-audio)" stroke-width="3" />
                </svg>
            `;
        case 8: // LED Strip
            return `
                <svg width="${width}" height="${height}" viewBox="0 0 200 200" fill="none" class="product-svg-placeholder" xmlns="http://www.w3.org/2000/svg">
                    ${gradients}
                    <!-- Rolled copper strip spool -->
                    <ellipse cx="100" cy="100" rx="75" ry="40" stroke="#d97706" stroke-width="4" filter="url(#shadow)"/>
                    <ellipse cx="100" cy="100" rx="62" ry="32" stroke="#d97706" stroke-width="3" />
                    <ellipse cx="100" cy="100" rx="48" ry="24" stroke="#d97706" stroke-width="2" />
                    <!-- Spool holder inner core -->
                    <ellipse cx="100" cy="100" rx="30" ry="15" fill="#1f2937" stroke="#4b5563" stroke-width="2" />
                    <!-- LED glowing diodes (neon color dots) -->
                    <!-- LED Cyan -->
                    <circle cx="34" cy="92" r="3" fill="#22d3ee" filter="url(#neon-glow)" />
                    <!-- LED Pink -->
                    <circle cx="68" cy="80" r="3" fill="#f472b6" filter="url(#neon-glow)" />
                    <!-- LED Green -->
                    <circle cx="132" cy="80" r="3" fill="#4ade80" filter="url(#neon-glow)" />
                    <!-- LED Purple -->
                    <circle cx="166" cy="92" r="3" fill="#c084fc" filter="url(#neon-glow)" />
                    <!-- LED Orange -->
                    <circle cx="140" cy="115" r="3" fill="#fb923c" filter="url(#neon-glow)" />
                    <!-- LED Blue -->
                    <circle cx="60" cy="115" r="3" fill="#60a5fa" filter="url(#neon-glow)" />
                </svg>
            `;
        default:
            return `
                <svg width="${width}" height="${height}" viewBox="0 0 200 200" fill="none" class="product-svg-placeholder" xmlns="http://www.w3.org/2000/svg">
                    <rect width="100%" height="100%" fill="#374151" rx="10"/>
                    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#9ca3af" font-size="16">No Image</text>
                </svg>
            `;
    }
}

// Helper: Generates beautiful star ratings HTML
function renderRatingStars(rating, count) {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;
    let starsHtml = '';
    
    for (let i = 1; i <= 5; i++) {
        if (i <= fullStars) {
            starsHtml += '<i class="bi bi-star-fill me-1" aria-hidden="true"></i>';
        } else if (i === fullStars + 1 && hasHalf) {
            starsHtml += '<i class="bi bi-star-half me-1" aria-hidden="true"></i>';
        } else {
            starsHtml += '<i class="bi bi-star me-1" aria-hidden="true"></i>';
        }
    }
    
    return `
        <div class="d-flex align-items-center mb-2" aria-label="Rating: ${rating} out of 5 stars">
            <span class="d-flex me-2">${starsHtml}</span>
            <span class="text-secondary small">(${count} reviews)</span>
        </div>
    `;
}

// Dynamic Toast Notification Maker
export function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toastId = 'toast-' + Date.now();
    const bgClass = type === 'success' ? 'bg-success' : type === 'danger' ? 'bg-danger' : 'bg-info';
    const textClass = 'text-white';
    const icon = type === 'success' ? 'bi-check-circle-fill' : type === 'danger' ? 'bi-exclamation-triangle-fill' : 'bi-info-circle-fill';

    const toastHTML = `
        <div id="${toastId}" class="toast align-items-center ${bgClass} ${textClass} border-0 shadow-lg" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex">
                <div class="toast-body d-flex align-items-center gap-2">
                    <i class="bi ${icon} fs-5"></i>
                    <span>${message}</span>
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        </div>
    `;

    container.insertAdjacentHTML('beforeend', toastHTML);
    const toastEl = document.getElementById(toastId);
    const bsToast = new bootstrap.Toast(toastEl, { delay: 4000 });
    bsToast.show();

    // Event cleanup when toast closes
    toastEl.addEventListener('hidden.bs.toast', () => {
        toastEl.remove();
    });
}


/* ================= NAVBAR & FOOTER ================= */

export const Navbar = {
    render(container) {
        const cartCount = Store.getCartCount();
        const activeRoute = window.location.hash || '#/';
        const isThemeDark = Store.state.theme === 'dark';
        
        container.innerHTML = `
            <div class="container-fluid px-4">
                <a class="navbar-brand fs-3 me-4 d-flex align-items-center gap-2" href="#/">
                    <img src="/static/favicon.svg" alt="AuraCommerce Logo" width="32" height="32">
                    <span>AuraCommerce</span>
                </a>
                
                <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0 gap-2">
                        <li class="nav-item">
                            <a class="nav-link ${activeRoute === '#/' ? 'active' : ''}" aria-current="${activeRoute === '#/' ? 'page' : 'false'}" href="#/">Catalog</a>
                        </li>
                    </ul>
                    
                    <div class="d-flex align-items-center gap-3">
                        <!-- Theme Toggle Button -->
                        <button class="btn btn-outline-secondary rounded-circle border-0 d-flex justify-content-center align-items-center" id="themeToggleBtn" style="width: 40px; height: 40px;" aria-label="Toggle layout color scheme">
                            <i class="bi ${isThemeDark ? 'bi-sun-fill text-warning' : 'bi-moon-stars-fill text-primary'} fs-5"></i>
                        </button>
                        
                        <!-- Cart Indicator Button -->
                        <a href="#/cart" class="btn btn-primary rounded-pill px-3 py-2 position-relative d-flex align-items-center gap-2 shadow-sm" aria-label="Shopping cart. ${cartCount} items inside.">
                            <i class="bi bi-cart3 fs-5"></i>
                            <span class="d-none d-sm-inline font-weight-semibold">Cart</span>
                            ${cartCount > 0 ? `<span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger border border-light cart-badge-pill">${cartCount}</span>` : ''}
                        </a>
                    </div>
                </div>
            </div>
        `;

        // Bind theme click
        const themeBtn = container.querySelector('#themeToggleBtn');
        if (themeBtn) {
            themeBtn.addEventListener('click', () => {
                Store.toggleTheme();
            });
        }
    }
};

export const Footer = {
    render(container) {
        container.innerHTML = `
            <div class="container text-center text-md-start px-4">
                <div class="row align-items-center">
                    <div class="col-md-6 text-center text-md-start mb-3 mb-md-0">
                        <div class="d-flex align-items-center justify-content-center justify-content-md-start gap-2 mb-2">
                            <img src="/static/favicon.svg" alt="" width="24" height="24">
                            <span class="fw-bold tracking-tight">AuraCommerce</span>
                        </div>
                        <p class="text-secondary small mb-0">&copy; 2026 AuraCommerce Inc. Crafted with premium web aesthetics, Flask & Bootstrap 5.</p>
                    </div>
                    <div class="col-md-6 text-center text-md-end">
                        <div class="d-inline-flex gap-3 fs-5 text-secondary">
                            <a href="#" class="text-reset hover-primary" aria-label="Follow us on GitHub"><i class="bi bi-github"></i></a>
                            <a href="#" class="text-reset hover-primary" aria-label="Follow us on Twitter"><i class="bi bi-twitter-x"></i></a>
                            <a href="#" class="text-reset hover-primary" aria-label="Join our Discord"><i class="bi bi-discord"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
};


/* ================= 1. CATALOG HOME VIEW ================= */

export const CatalogView = {
    async render(container) {
        // Build Catalog layout structure
        container.innerHTML = `
            <div class="container-fluid px-4 py-4 fade-in-view">
                <div class="row g-4">
                    <!-- Sidebar Filters Column -->
                    <aside class="col-lg-3 col-md-4">
                        <div class="glass-card filter-sidebar p-4" id="sidebarContainer">
                            <!-- Populated in sub-render -->
                        </div>
                    </aside>
                    
                    <!-- Main Product Catalog -->
                    <div class="col-lg-9 col-md-8">
                        <!-- Upper Control Bar (Search + Sort) -->
                        <div class="glass-card p-3 mb-4 d-flex flex-column flex-md-row justify-content-between align-items-stretch align-items-md-center gap-3">
                            <form class="flex-grow-1" id="catalogSearchForm" role="search">
                                <div class="input-group">
                                    <span class="input-group-text border-end-0 bg-transparent text-secondary"><i class="bi bi-search"></i></span>
                                    <input type="search" class="form-control border-start-0 ps-0" id="searchBar" placeholder="Search premium accessories..." aria-label="Search items" value="${Store.state.filters.search}">
                                </div>
                            </form>
                            
                            <div class="d-flex align-items-center gap-2 col-md-4 col-lg-3">
                                <label for="sortSelector" class="text-nowrap small text-secondary">Sort by:</label>
                                <select class="form-select form-select-sm" id="sortSelector" aria-label="Sort products by">
                                    <option value="popularity_desc" ${Store.state.filters.sort === 'popularity_desc' ? 'selected' : ''}>Popularity</option>
                                    <option value="price_asc" ${Store.state.filters.sort === 'price_asc' ? 'selected' : ''}>Price: Low to High</option>
                                    <option value="price_desc" ${Store.state.filters.sort === 'price_desc' ? 'selected' : ''}>Price: High to Low</option>
                                    <option value="rating_desc" ${Store.state.filters.sort === 'rating_desc' ? 'selected' : ''}>Average Rating</option>
                                </select>
                            </div>
                        </div>

                        <!-- Dynamic Products list -->
                        <div id="catalogGrid" class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
                            <!-- Injecting products here -->
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Load content
        await this.loadFilteredProducts(container);
        this.renderSidebar(container);
        this.bindEvents(container);
    },

    async loadFilteredProducts(container) {
        const grid = container.querySelector('#catalogGrid');
        grid.innerHTML = `
            <div class="col-12 text-center py-5">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading products...</span>
                </div>
            </div>
        `;

        try {
            const products = await ApiClient.getProducts(Store.state.filters);
            
            if (products.length === 0) {
                grid.innerHTML = `
                    <div class="col-12 text-center py-5 fade-in-view">
                        <i class="bi bi-inboxes text-secondary display-3 mb-3 d-block"></i>
                        <h3 class="h4">No Products Match Your Filter</h3>
                        <p class="text-secondary">Try relaxing your search terms or clearing price bounds.</p>
                        <button class="btn btn-outline-primary btn-sm rounded-pill mt-2 px-3" id="resetAllFiltersBtn">Reset Filters</button>
                    </div>
                `;
                
                const resetBtn = grid.querySelector('#resetAllFiltersBtn');
                if (resetBtn) {
                    resetBtn.addEventListener('click', () => {
                        Store.resetFilters();
                    });
                }
                return;
            }

            let html = '';
            products.forEach(p => {
                const badgeHTML = p.badge 
                    ? `<span class="position-absolute top-0 start-0 m-3 badge rounded-pill ${p.badge === 'New Arrival' ? 'badge-aura-new' : p.badge === 'Best Seller' ? 'badge-aura-seller' : 'bg-dark'}">${p.badge}</span>` 
                    : '';
                const isFavorite = Store.isInWishlist(p.id);
                
                html += `
                    <div class="col fade-in-view">
                        <div class="card h-100 glass-card product-card position-relative overflow-hidden border-0">
                            ${badgeHTML}
                            
                            <!-- Wishlist button -->
                            <button class="btn btn-light rounded-circle border-0 position-absolute top-0 end-0 m-3 shadow-sm d-flex justify-content-center align-items-center wishlist-toggle-btn" 
                                    data-id="${p.id}" style="width: 38px; height: 38px;" aria-label="${isFavorite ? 'Remove from wishlist' : 'Add to wishlist'}">
                                <i class="bi ${isFavorite ? 'bi-heart-fill text-danger' : 'bi-heart'} fs-5"></i>
                            </button>

                            <!-- Visual Card illustration -->
                            <a href="#/product/${p.id}" class="d-block py-4 text-center border-bottom bg-body-tertiary">
                                ${getProductSVG(p.id)}
                            </a>
                            
                            <div class="card-body d-flex flex-column p-4">
                                <span class="text-uppercase text-secondary font-monospace tracking-wide small mb-1">${p.category}</span>
                                <h3 class="card-title h5 mb-2">
                                    <a href="#/product/${p.id}" class="text-decoration-none text-body hover-primary">${p.title}</a>
                                </h3>
                                
                                ${renderRatingStars(p.rating, p.reviews_count)}
                                
                                <p class="card-text text-secondary text-line-clamp-2 small mb-4">${p.description}</p>
                                
                                <div class="d-flex align-items-center justify-content-between mt-auto pt-2 border-top">
                                    <span class="fs-4 fw-bold text-body">$${p.price.toFixed(2)}</span>
                                    
                                    ${p.stock > 0 
                                        ? `<button class="btn btn-primary rounded-pill px-3 py-1.5 quick-add-btn d-flex align-items-center gap-1.5" data-id="${p.id}">
                                             <i class="bi bi-plus-lg"></i> Add
                                           </button>`
                                        : `<span class="badge bg-danger-subtle text-danger px-3 py-2 rounded-pill font-semibold">Out of Stock</span>`
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            });
            grid.innerHTML = html;

            // Bind grid card actions
            grid.querySelectorAll('.quick-add-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const id = Number(e.currentTarget.getAttribute('data-id'));
                    const prod = products.find(p => p.id === id);
                    if (prod) {
                        Store.addToCart(prod, 1);
                        showToast(`Added ${prod.title} to your cart.`);
                    }
                });
            });

            grid.querySelectorAll('.wishlist-toggle-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const id = Number(e.currentTarget.getAttribute('data-id'));
                    Store.toggleWishlist(id);
                    // Rerender state in place for simple UI response
                    const heartIcon = e.currentTarget.querySelector('i');
                    if (Store.isInWishlist(id)) {
                        heartIcon.className = 'bi bi-heart-fill text-danger fs-5';
                        e.currentTarget.setAttribute('aria-label', 'Remove from wishlist');
                    } else {
                        heartIcon.className = 'bi bi-heart fs-5';
                        e.currentTarget.setAttribute('aria-label', 'Add to wishlist');
                    }
                });
            });

        } catch (error) {
            grid.innerHTML = `
                <div class="col-12 text-center py-5 text-danger">
                    <i class="bi bi-wifi-off display-3 mb-3"></i>
                    <h3 class="h4">Network Load Error</h3>
                    <p class="text-secondary">${error.message}</p>
                </div>
            `;
        }
    },

    renderSidebar(container) {
        const sidebar = container.querySelector('#sidebarContainer');
        const activeCat = Store.state.filters.category;
        const categories = ['All', 'Audio', 'Keyboards', 'Desk Setup', 'Accessories', 'Travel'];
        
        let categoryListHTML = '';
        categories.forEach(cat => {
            const activeClass = activeCat.toLowerCase() === cat.toLowerCase() ? 'active font-semibold text-primary' : 'text-body';
            categoryListHTML += `
                <button class="list-group-item list-group-item-action border-0 px-3 py-2.5 rounded-3 mb-1 filter-category-btn ${activeClass}" data-cat="${cat}">
                    <i class="bi bi-chevron-right me-2 small"></i>${cat}
                </button>
            `;
        });

        sidebar.innerHTML = `
            <div class="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
                <h2 class="h5 mb-0"><i class="bi bi-sliders2-vertical me-2"></i>Filters</h2>
                <button class="btn btn-link btn-sm text-decoration-none text-secondary p-0" id="clearFiltersLink">Clear All</button>
            </div>
            
            <!-- Category Filter Section -->
            <div class="mb-4">
                <h3 class="h6 mb-2.5 font-bold text-uppercase tracking-wider small">Categories</h3>
                <div class="list-group list-group-flush" id="categoryFilterList">
                    ${categoryListHTML}
                </div>
            </div>

            <!-- Price Range Filter Section -->
            <div class="mb-4">
                <h3 class="h6 mb-3 font-bold text-uppercase tracking-wider small">Price Range ($)</h3>
                <div class="row g-2">
                    <div class="col-6">
                        <label for="minPriceVal" class="visually-hidden">Min Price</label>
                        <input type="number" class="form-control form-control-sm" id="minPriceVal" placeholder="Min" value="${Store.state.filters.min_price}">
                    </div>
                    <div class="col-6">
                        <label for="maxPriceVal" class="visually-hidden">Max Price</label>
                        <input type="number" class="form-control form-control-sm" id="maxPriceVal" placeholder="Max" value="${Store.state.filters.max_price}">
                    </div>
                </div>
                <button class="btn btn-outline-secondary btn-sm w-100 rounded-pill mt-3 apply-price-btn">Apply Price</button>
            </div>
        `;
    },

    bindEvents(container) {
        // Search submit interception
        const searchForm = container.querySelector('#catalogSearchForm');
        if (searchForm) {
            searchForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const q = container.querySelector('#searchBar').value;
                Store.updateFilters({ search: q });
            });
        }

        // Sort selector
        const sortSelect = container.querySelector('#sortSelector');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                Store.updateFilters({ sort: e.target.value });
            });
        }

        // Category clicks
        container.querySelectorAll('.filter-category-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const cat = e.currentTarget.getAttribute('data-cat');
                Store.updateFilters({ category: cat });
            });
        });

        // Price applies
        const applyPrice = container.querySelector('.apply-price-btn');
        if (applyPrice) {
            applyPrice.addEventListener('click', () => {
                const min = container.querySelector('#minPriceVal').value;
                const max = container.querySelector('#maxPriceVal').value;
                Store.updateFilters({ min_price: min, max_price: max });
            });
        }

        // Clear filter triggers
        const clearBtn = container.querySelector('#clearFiltersLink');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                Store.resetFilters();
            });
        }

        // Handle reactive filter updates from central Store
        window.addEventListener('filters-updated', () => {
            this.loadFilteredProducts(container);
            this.renderSidebar(container);
            this.bindEvents(container);
        });
    }
};


/* ================= 2. PRODUCT DETAILS VIEW ================= */

export const ProductDetailView = {
    async render(container, params) {
        const productId = params.id;
        
        container.innerHTML = `
            <div class="container py-5 fade-in-view">
                <div class="col-12" id="detailsLoading">
                    <div class="d-flex justify-content-center align-items-center py-5">
                        <div class="spinner-border text-primary" role="status">
                            <span class="visually-hidden">Loading product specifications...</span>
                        </div>
                    </div>
                </div>
                <div class="row g-5 d-none" id="detailsContent">
                    <!-- Left Dynamic Image Carousel column -->
                    <div class="col-md-6">
                        <div class="detail-image-wrapper p-5 border shadow-sm h-100 d-flex justify-content-center align-items-center bg-body-tertiary">
                            <div id="productImageCanvas" class="w-100">
                                <!-- Draw SVG here -->
                            </div>
                        </div>
                    </div>
                    
                    <!-- Right content details column -->
                    <div class="col-md-6 d-flex flex-column">
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb mb-2 font-monospace">
                                <li class="breadcrumb-item"><a href="#/">Catalog</a></li>
                                <li class="breadcrumb-item active text-secondary" id="breadCat" aria-current="page">—</li>
                            </ol>
                        </nav>
                        
                        <div class="mb-3">
                            <span class="badge rounded-pill d-none mb-2" id="detailBadge"></span>
                            <h1 class="h2 mb-2" id="detailTitle">—</h1>
                            <div id="detailRatingContainer"></div>
                        </div>
                        
                        <div class="mb-4">
                            <span class="display-5 fw-bold text-body" id="detailPrice">$0.00</span>
                        </div>
                        
                        <p class="text-secondary fs-5 mb-4 lh-base" id="detailDescription">—</p>

                        <!-- Features list -->
                        <div class="mb-4">
                            <h2 class="h6 font-bold text-uppercase tracking-wider text-body mb-3">Key Features</h2>
                            <ul class="list-unstyled mb-0" id="detailFeaturesList">
                                <!-- Injected dynamically -->
                            </ul>
                        </div>

                        <!-- Actions Grid -->
                        <div class="mt-auto pt-4 border-top">
                            <div class="row g-3 align-items-center">
                                <div class="col-auto">
                                    <label for="detailQty" class="visually-hidden">Quantity</label>
                                    <select class="form-select border-2" id="detailQty" aria-label="Quantity selector">
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </select>
                                </div>
                                <div class="col">
                                    <button class="btn btn-primary btn-lg w-100 rounded-pill shadow d-flex align-items-center justify-content-center gap-2" id="detailAddToCartBtn">
                                        <i class="bi bi-cart-plus-fill fs-5"></i> Add to Cart
                                    </button>
                                </div>
                                <div class="col-auto">
                                    <button class="btn btn-outline-secondary btn-lg rounded-circle d-flex justify-content-center align-items-center" id="detailWishlistBtn" style="width: 52px; height: 52px;" aria-label="Save item to wishlist">
                                        <i class="bi bi-heart fs-5"></i>
                                    </button>
                                </div>
                            </div>
                            
                            <div class="mt-3 text-center text-sm-start text-secondary small d-flex align-items-center gap-2">
                                <i class="bi bi-shield-check-fill text-success fs-5"></i>
                                <span>Risk-free checkout. Secure SSL mock payment & 2-year warranty included.</span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Specifications Full Width Row -->
                    <div class="col-12 mt-5">
                        <div class="glass-card p-4">
                            <h2 class="h4 mb-4 border-bottom pb-2">Technical Specifications</h2>
                            <div class="table-responsive">
                                <table class="table table-striped table-hover mb-0">
                                    <tbody id="detailSpecsTableBody">
                                        <!-- Specs populated by JS -->
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        try {
            const product = await ApiClient.getProduct(productId);
            
            // Populate content
            container.querySelector('#breadCat').textContent = product.category;
            container.querySelector('#detailTitle').textContent = product.title;
            container.querySelector('#detailPrice').textContent = `$${product.price.toFixed(2)}`;
            container.querySelector('#detailDescription').textContent = product.description;
            
            // Render vector SVG
            container.querySelector('#productImageCanvas').innerHTML = getProductSVG(product.id, "100%", "360px");

            // Setup Badge
            const badge = container.querySelector('#detailBadge');
            if (product.badge) {
                badge.classList.remove('d-none');
                badge.textContent = product.badge;
                badge.className = `badge rounded-pill mb-2 ${product.badge === 'New Arrival' ? 'badge-aura-new' : product.badge === 'Best Seller' ? 'badge-aura-seller' : 'bg-dark'}`;
            }

            // Rating Stars
            container.querySelector('#detailRatingContainer').innerHTML = renderRatingStars(product.rating, product.reviews_count);

            // Features list loop
            const featuresList = container.querySelector('#detailFeaturesList');
            featuresList.innerHTML = product.features.map(f => `
                <li class="d-flex align-items-start mb-2.5 text-secondary">
                    <i class="bi bi-patch-check-fill text-primary me-2.5 mt-0.5"></i>
                    <span>${f}</span>
                </li>
            `).join('');

            // Specs table loop
            const specsBody = container.querySelector('#detailSpecsTableBody');
            specsBody.innerHTML = Object.entries(product.specs).map(([key, value]) => `
                <tr>
                    <th scope="row" class="w-25 text-secondary" style="font-weight: 500;">${key}</th>
                    <td>${value}</td>
                </tr>
            `).join('');

            // Stock Out Handler
            const addBtn = container.querySelector('#detailAddToCartBtn');
            const qtySelect = container.querySelector('#detailQty');
            if (product.stock <= 0) {
                addBtn.disabled = true;
                addBtn.innerHTML = '<i class="bi bi-slash-circle-fill"></i> Out of Stock';
                qtySelect.disabled = true;
            }

            // Wishlist toggle render in-place
            const wishBtn = container.querySelector('#detailWishlistBtn');
            const updateWishBtnState = () => {
                const isFav = Store.isInWishlist(product.id);
                wishBtn.innerHTML = `<i class="bi ${isFav ? 'bi-heart-fill text-danger' : 'bi-heart'} fs-5"></i>`;
                wishBtn.setAttribute('aria-label', isFav ? 'Remove from wishlist' : 'Save item to wishlist');
            };
            updateWishBtnState();

            // Hide loader and show content
            container.querySelector('#detailsLoading').classList.add('d-none');
            container.querySelector('#detailsContent').classList.remove('d-none');

            // Wire Listeners
            addBtn.addEventListener('click', () => {
                const quantity = parseInt(qtySelect.value);
                Store.addToCart(product, quantity);
                showToast(`Added ${quantity} ${product.title}(s) to your cart.`);
            });

            wishBtn.addEventListener('click', () => {
                Store.toggleWishlist(product.id);
                updateWishBtnState();
            });

        } catch (error) {
            container.querySelector('#detailsLoading').innerHTML = `
                <div class="text-center py-5 text-danger fade-in-view">
                    <i class="bi bi-exclamation-octagon display-3 mb-3"></i>
                    <h3 class="h4">Product Fetch Error</h3>
                    <p class="text-secondary">${error.message}</p>
                    <a href="#/" class="btn btn-primary rounded-pill mt-3">Back to Catalog</a>
                </div>
            `;
        }
    }
};


/* ================= 3. CART VIEW ================= */

export const CartView = {
    render(container) {
        const cart = Store.getCart();
        const total = Store.getCartTotal();
        const deliveryFee = total > 150 || total === 0 ? 0 : 9.99;
        const taxRate = 0.0825; // 8.25% mock sales tax
        const estimatedTax = total * taxRate;
        const grandTotal = total + deliveryFee + estimatedTax;

        if (cart.length === 0) {
            container.innerHTML = `
                <div class="container py-5 my-5 text-center fade-in-view">
                    <div class="display-3 text-secondary mb-4"><i class="bi bi-cart-x"></i></div>
                    <h1 class="h3 mb-3">Your Shopping Cart is Empty</h1>
                    <p class="text-secondary mb-4">Looks like you haven't added any premium gadgets to your cart yet.</p>
                    <a href="#/" class="btn btn-primary btn-lg rounded-pill px-4">Start Shopping</a>
                </div>
            `;
            return;
        }

        let cartItemsHTML = '';
        cart.forEach(item => {
            cartItemsHTML += `
                <div class="row align-items-center py-4 border-bottom g-3 fade-in-view">
                    <!-- Card Vector Art -->
                    <div class="col-auto">
                        <div class="bg-body-tertiary border rounded p-2 d-flex align-items-center justify-content-center" style="width: 80px; height: 80px;">
                            ${getProductSVG(item.id, "60px", "60px")}
                        </div>
                    </div>
                    <!-- Info -->
                    <div class="col">
                        <h2 class="h5 mb-1"><a href="#/product/${item.id}" class="text-decoration-none text-body hover-primary">${item.title}</a></h2>
                        ${item.badge ? `<span class="badge rounded-pill bg-secondary-subtle text-secondary small">${item.badge}</span>` : ''}
                    </div>
                    <!-- Qty Control -->
                    <div class="col-auto">
                        <div class="input-group input-group-sm border rounded-pill overflow-hidden" style="max-width: 120px;">
                            <button class="btn btn-outline-secondary border-0 minus-qty-btn" data-id="${item.id}" aria-label="Decrease quantity"><i class="bi bi-dash"></i></button>
                            <input type="text" class="form-control text-center border-0 bg-transparent qty-input" data-id="${item.id}" value="${item.quantity}" aria-label="Item quantity" style="width: 40px; font-weight: 500;">
                            <button class="btn btn-outline-secondary border-0 plus-qty-btn" data-id="${item.id}" aria-label="Increase quantity"><i class="bi bi-plus"></i></button>
                        </div>
                    </div>
                    <!-- Pricing and Trash -->
                    <div class="col-auto text-end" style="min-width: 110px;">
                        <div class="fw-bold fs-5 mb-1">$${(item.price * item.quantity).toFixed(2)}</div>
                        <div class="text-secondary small">$${item.price.toFixed(2)} each</div>
                    </div>
                    <div class="col-auto">
                        <button class="btn btn-link text-danger remove-item-btn p-1" data-id="${item.id}" aria-label="Remove item from cart">
                            <i class="bi bi-trash-fill fs-5"></i>
                        </button>
                    </div>
                </div>
            `;
        });

        container.innerHTML = `
            <div class="container py-5 fade-in-view">
                <h1 class="h2 mb-4"><i class="bi bi-cart3 me-2"></i>Shopping Cart</h1>
                
                <div class="row g-5">
                    <!-- Left list of items -->
                    <div class="col-lg-8">
                        <div class="glass-card p-4">
                            <div class="d-flex justify-content-between align-items-center border-bottom pb-2 mb-2">
                                <span class="fw-bold">${Store.getCartCount()} Items</span>
                                <button class="btn btn-link btn-sm text-danger text-decoration-none p-0" id="clearCartLink"><i class="bi bi-trash-fill me-1"></i>Clear Cart</button>
                            </div>
                            
                            <div id="cartItemsList">
                                ${cartItemsHTML}
                            </div>
                            
                            <div class="mt-4 d-flex justify-content-between">
                                <a href="#/" class="btn btn-outline-secondary rounded-pill px-4"><i class="bi bi-arrow-left me-1"></i>Continue Shopping</a>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Right summary column -->
                    <div class="col-lg-4">
                        <div class="glass-card p-4 sticky-top" style="top: 90px;">
                            <h2 class="h5 mb-4 border-bottom pb-2">Order Summary</h2>
                            
                            <div class="d-flex justify-content-between mb-3.5">
                                <span class="text-secondary">Subtotal</span>
                                <span class="fw-bold">$${total.toFixed(2)}</span>
                            </div>
                            
                            <div class="d-flex justify-content-between mb-3.5">
                                <span class="text-secondary">Shipping</span>
                                <span class="fw-bold">${deliveryFee === 0 ? '<span class="text-success">FREE</span>' : `$${deliveryFee.toFixed(2)}`}</span>
                            </div>
                            
                            <div class="d-flex justify-content-between mb-3.5">
                                <span class="text-secondary">Estimated Tax</span>
                                <span class="fw-bold">$${estimatedTax.toFixed(2)}</span>
                            </div>
                            
                            <hr>
                            
                            <div class="d-flex justify-content-between mb-4">
                                <span class="fs-5 fw-bold text-body">Estimated Total</span>
                                <span class="fs-4 fw-bold text-primary">$${grandTotal.toFixed(2)}</span>
                            </div>

                            <!-- Discount Coupon Box -->
                            <div class="mb-4">
                                <label for="couponInput" class="form-label small text-secondary">Have a promo code?</label>
                                <div class="input-group">
                                    <input type="text" class="form-control form-control-sm" id="couponInput" placeholder="Enter code (e.g. MOCK10)">
                                    <button class="btn btn-outline-secondary btn-sm" type="button" id="applyCouponBtn">Apply</button>
                                </div>
                                <div class="form-text text-success d-none mt-1" id="couponSuccessMsg">Promo code 'MOCK10' applied! 10% discount subtracted on checkout.</div>
                            </div>
                            
                            <a href="#/checkout" class="btn btn-primary btn-lg w-100 rounded-pill shadow-sm py-2.5 font-bold d-flex align-items-center justify-content-center gap-2">
                                Proceed to Checkout <i class="bi bi-arrow-right"></i>
                            </a>
                            
                            <div class="mt-3.5 text-center text-secondary small">
                                <i class="bi bi-lock-fill me-1"></i>Secure checkout server
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.bindEvents(container);
    },

    bindEvents(container) {
        // Change quantity listeners
        container.querySelectorAll('.minus-qty-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = Number(e.currentTarget.getAttribute('data-id'));
                const item = Store.getCart().find(i => i.id === id);
                if (item) {
                    Store.updateCartQuantity(id, item.quantity - 1);
                }
            });
        });

        container.querySelectorAll('.plus-qty-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = Number(e.currentTarget.getAttribute('data-id'));
                const item = Store.getCart().find(i => i.id === id);
                if (item) {
                    Store.updateCartQuantity(id, item.quantity + 1);
                }
            });
        });

        container.querySelectorAll('.qty-input').forEach(input => {
            input.addEventListener('change', (e) => {
                const id = Number(e.target.getAttribute('data-id'));
                Store.updateCartQuantity(id, e.target.value);
            });
        });

        // Remove listener
        container.querySelectorAll('.remove-item-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = Number(e.currentTarget.getAttribute('data-id'));
                Store.removeFromCart(id);
                showToast("Item removed from your cart.", "info");
            });
        });

        // Clear cart link
        const clearCart = container.querySelector('#clearCartLink');
        if (clearCart) {
            clearCart.addEventListener('click', () => {
                Store.clearCart();
                showToast("Cart cleared.", "info");
            });
        }

        // Mock coupon action
        const applyCoupon = container.querySelector('#applyCouponBtn');
        if (applyCoupon) {
            applyCoupon.addEventListener('click', () => {
                const code = container.querySelector('#couponInput').value.trim().toUpperCase();
                if (code === 'MOCK10') {
                    container.querySelector('#couponSuccessMsg').classList.remove('d-none');
                    showToast("10% discount code added!", "success");
                } else {
                    showToast("Invalid coupon code.", "danger");
                }
            });
        }

        // Listen for store modifications to trigger full local render
        const updateListener = () => {
            this.render(container);
            // Cleanup to avoid stacking event listeners on re-renders
            window.removeEventListener('cart-updated', updateListener);
        };
        window.addEventListener('cart-updated', updateListener);
    }
};


/* ================= 4. CHECKOUT VIEW ================= */

export const CheckoutView = {
    render(container) {
        const cart = Store.getCart();
        const total = Store.getCartTotal();
        const deliveryFee = total > 150 ? 0 : 9.99;
        const taxRate = 0.0825;
        const estimatedTax = total * taxRate;
        const grandTotal = total + deliveryFee + estimatedTax;

        if (cart.length === 0) {
            window.location.hash = '#/';
            return;
        }

        let summaryHTML = '';
        cart.forEach(item => {
            summaryHTML += `
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <div>
                        <span class="fw-bold">${item.quantity}x</span>
                        <span class="text-secondary small ms-1">${item.title}</span>
                    </div>
                    <span class="text-body fw-semibold">$${(item.price * item.quantity).toFixed(2)}</span>
                </div>
            `;
        });

        container.innerHTML = `
            <div class="container py-5 fade-in-view">
                <h1 class="h2 mb-4"><i class="bi bi-wallet2 me-2"></i>Checkout</h1>
                
                <form id="checkoutForm" class="row g-5" novalidate>
                    <!-- Left Checkout Form column -->
                    <div class="col-lg-7">
                        <div class="glass-card p-4 mb-4">
                            <h2 class="h5 mb-4 border-bottom pb-2">Shipping Details</h2>
                            
                            <div class="row g-3">
                                <div class="col-12">
                                    <label for="fullName" class="form-label">Full Name</label>
                                    <input type="text" class="form-control" id="fullName" required placeholder="John Doe">
                                    <div class="invalid-feedback">Please enter your full name.</div>
                                </div>
                                
                                <div class="col-12">
                                    <label for="emailAddr" class="form-label">Email Address</label>
                                    <input type="email" class="form-control" id="emailAddr" required placeholder="john@example.com">
                                    <div class="invalid-feedback">Please enter a valid email address.</div>
                                </div>
                                
                                <div class="col-12">
                                    <label for="shippingAddr" class="form-label">Street Address</label>
                                    <input type="text" class="form-control" id="shippingAddr" required placeholder="123 Main St">
                                    <div class="invalid-feedback">Please enter your shipping street address.</div>
                                </div>
                                
                                <div class="col-md-6">
                                    <label for="shippingCity" class="form-label">City</label>
                                    <input type="text" class="form-control" id="shippingCity" required placeholder="New York">
                                    <div class="invalid-feedback">Please provide a city name.</div>
                                </div>
                                
                                <div class="col-md-3">
                                    <label for="shippingState" class="form-label">State</label>
                                    <select class="form-select" id="shippingState" required>
                                        <option value="" selected disabled>Select...</option>
                                        <option value="NY">NY</option>
                                        <option value="CA">CA</option>
                                        <option value="TX">TX</option>
                                        <option value="FL">FL</option>
                                        <option value="IL">IL</option>
                                    </select>
                                    <div class="invalid-feedback">Choose state.</div>
                                </div>
                                
                                <div class="col-md-3">
                                    <label for="zipCode" class="form-label">ZIP Code</label>
                                    <input type="text" class="form-control" id="zipCode" required pattern="[0-9]{5}" placeholder="10001">
                                    <div class="invalid-feedback">Enter 5 digit ZIP code.</div>
                                </div>
                            </div>
                        </div>

                        <div class="glass-card p-4">
                            <h2 class="h5 mb-4 border-bottom pb-2">Payment Option (Mock)</h2>
                            
                            <div class="form-check mb-3">
                                <input class="form-check-input" type="radio" name="paymentOption" id="mockCreditCard" checked required>
                                <label class="form-check-label d-flex align-items-center gap-2" for="mockCreditCard">
                                    <i class="bi bi-credit-card-2-front text-primary"></i>
                                    <span>Demo Sandbox Checkout (No real details needed)</span>
                                </label>
                            </div>
                            
                            <div class="row g-3" id="creditCardInputs">
                                <div class="col-12">
                                    <label for="cardNumber" class="form-label">Card Number</label>
                                    <input type="text" class="form-control" id="cardNumber" required placeholder="4111 2222 3333 4444" pattern="[0-9]{16}|[0-9\\s]{19}">
                                    <div class="invalid-feedback">Please provide a valid 16-digit credit card number.</div>
                                </div>
                                <div class="col-md-6">
                                    <label for="cardExpiry" class="form-label">Expiration Date</label>
                                    <input type="text" class="form-control" id="cardExpiry" required placeholder="MM/YY" pattern="(0[1-9]|1[0-2])\\/[0-9]{2}">
                                    <div class="invalid-feedback">Enter date as MM/YY format.</div>
                                </div>
                                <div class="col-md-6">
                                    <label for="cardCvv" class="form-label">CVV</label>
                                    <input type="password" class="form-control" id="cardCvv" required placeholder="***" pattern="[0-9]{3}">
                                    <div class="invalid-feedback">Provide 3 digit CVV security code.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Right side summary column -->
                    <div class="col-lg-5">
                        <div class="glass-card p-4 sticky-top" style="top: 90px;">
                            <h2 class="h5 mb-4 border-bottom pb-2">Review Your Order</h2>
                            
                            <div class="border-bottom pb-2 mb-3 max-vh-40 overflow-y-auto">
                                ${summaryHTML}
                            </div>
                            
                            <div class="d-flex justify-content-between mb-2 small text-secondary">
                                <span>Cart Subtotal</span>
                                <span>$${total.toFixed(2)}</span>
                            </div>
                            
                            <div class="d-flex justify-content-between mb-2 small text-secondary">
                                <span>Delivery Fee</span>
                                <span>$${deliveryFee.toFixed(2)}</span>
                            </div>
                            
                            <div class="d-flex justify-content-between mb-3 small text-secondary">
                                <span>Estimated Sales Tax</span>
                                <span>$${estimatedTax.toFixed(2)}</span>
                            </div>
                            
                            <hr class="mt-0">
                            
                            <div class="d-flex justify-content-between mb-4">
                                <span class="fs-5 fw-bold text-body">Total to Pay</span>
                                <span class="fs-4 fw-bold text-primary" id="checkoutGrandTotal">$${grandTotal.toFixed(2)}</span>
                            </div>
                            
                            <button type="submit" class="btn btn-success btn-lg w-100 rounded-pill py-2.5 font-bold shadow d-flex align-items-center justify-content-center gap-2" id="submitOrderBtn">
                                <span class="spinner-border spinner-border-sm d-none" id="checkoutSpinner" role="status" aria-hidden="true"></span>
                                <i class="bi bi-lock-fill"></i> <span id="submitOrderBtnText">Pay & Place Order</span>
                            </button>
                            
                            <div class="text-center mt-3">
                                <a href="#/cart" class="btn btn-link btn-sm text-decoration-none text-secondary"><i class="bi bi-chevron-left"></i> Return to Shopping Cart</a>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        `;

        this.bindEvents(container);
    },

    bindEvents(container) {
        const form = container.querySelector('#checkoutForm');
        const submitBtn = container.querySelector('#submitOrderBtn');
        const submitText = container.querySelector('#submitOrderBtnText');
        const spinner = container.querySelector('#checkoutSpinner');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Trigger Bootstrap native validation styles
            form.classList.add('was-validated');
            
            if (!form.checkValidity()) {
                showToast("Please fix the validation errors on the form.", "danger");
                return;
            }

            // Lock UI and show status loader
            submitBtn.disabled = true;
            spinner.classList.remove('d-none');
            submitText.textContent = 'Processing Order...';

            const payload = {
                cart: Store.getCart(),
                shipping: {
                    full_name: container.querySelector('#fullName').value,
                    email: container.querySelector('#emailAddr').value,
                    address: container.querySelector('#shippingAddr').value,
                    city: container.querySelector('#shippingCity').value,
                    state: container.querySelector('#shippingState').value,
                    zip_code: container.querySelector('#zipCode').value
                }
            };

            try {
                // Post checkout to Flask backend
                const result = await ApiClient.submitCheckout(payload);
                
                // Clear state cart on success
                Store.clearCart();
                Store.state.lastOrder = result;
                
                // Navigate to success screen
                window.location.hash = '#/checkout-success';
            } catch (error) {
                showToast(error.message, 'danger');
                submitBtn.disabled = false;
                spinner.classList.add('d-none');
                submitText.textContent = 'Pay & Place Order';
            }
        });
    }
};


/* ================= 5. CHECKOUT SUCCESS VIEW ================= */

export const CheckoutSuccessView = {
    render(container) {
        const order = Store.state.lastOrder;
        
        if (!order) {
            // If direct loaded, redirect back to shop catalog
            window.location.hash = '#/';
            return;
        }

        container.innerHTML = `
            <div class="container py-5 fade-in-view">
                <div class="row justify-content-center">
                    <div class="col-md-8 col-lg-6 text-center">
                        <div class="display-1 text-success mb-4 animate-success-tick">
                            <i class="bi bi-patch-check-fill"></i>
                        </div>
                        
                        <h1 class="h2 mb-2">Order Confirmed!</h1>
                        <p class="text-secondary mb-4">Thank you for your order, ${order.shipping.full_name}. We have sent a confirmation email to ${order.shipping.email}.</p>
                        
                        <div class="glass-card p-4 text-start mb-4">
                            <h2 class="h5 border-bottom pb-2 mb-3">Receipt Summary</h2>
                            <div class="d-flex justify-content-between mb-2">
                                <span class="text-secondary">Order Number</span>
                                <span class="font-monospace fw-bold">${order.order_id}</span>
                            </div>
                            <div class="d-flex justify-content-between mb-2">
                                <span class="text-secondary">Tracking Number</span>
                                <span class="font-monospace text-primary fw-semibold">${order.tracking_number}</span>
                            </div>
                            <div class="d-flex justify-content-between mb-3">
                                <span class="text-secondary">Total Charged</span>
                                <span class="fw-bold text-success">$${order.total_amount.toFixed(2)}</span>
                            </div>
                            
                            <div class="small text-secondary border-top pt-3">
                                <strong>Ship to:</strong><br>
                                ${order.shipping.full_name}<br>
                                ${order.shipping.address}<br>
                                ${order.shipping.city}, ${order.shipping.zip_code}
                            </div>
                        </div>
                        
                        <div class="d-flex flex-column flex-sm-row justify-content-center gap-3">
                            <a href="#/" class="btn btn-primary rounded-pill px-4">Continue Shopping</a>
                            <button class="btn btn-outline-secondary rounded-pill px-4" id="printReceiptBtn"><i class="bi bi-printer me-1"></i>Print Receipt</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Wire Action
        const printBtn = container.querySelector('#printReceiptBtn');
        if (printBtn) {
            printBtn.addEventListener('click', () => {
                window.print();
            });
        }
    }
};
