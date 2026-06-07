/**
 * AuraCommerce Main Application Entry Point
 * Bootstraps the application state, binds routing, and listens for layout changes.
 */

import { Store } from './store.js';
import { HashRouter } from './router.js';
import { 
    Navbar, 
    Footer, 
    CatalogView, 
    ProductDetailView, 
    CartView, 
    CheckoutView, 
    CheckoutSuccessView 
} from './components.js';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mount layout container references
    const navbarContainer = document.getElementById('navbarContainer');
    const footerContainer = document.getElementById('footerContainer');
    const viewContainer = document.getElementById('viewContainer');

    // 2. Initialize application state (syncs LocalStorage and theme classes)
    Store.init();

    // 3. Render base layouts
    Navbar.render(navbarContainer);
    Footer.render(footerContainer);

    // 4. Initialize client router and map dynamic view routes
    const router = new HashRouter();

    router.addRoute('/', () => {
        document.title = 'AuraCommerce | Premium Accessories';
        CatalogView.render(viewContainer);
    });

    router.addRoute('/product/:id', (params) => {
        document.title = 'AuraCommerce | Product Detail';
        ProductDetailView.render(viewContainer, params);
    });

    router.addRoute('/cart', () => {
        document.title = 'AuraCommerce | Shopping Cart';
        CartView.render(viewContainer);
    });

    router.addRoute('/checkout', () => {
        document.title = 'AuraCommerce | Checkout';
        CheckoutView.render(viewContainer);
    });

    router.addRoute('/checkout-success', () => {
        document.title = 'AuraCommerce | Order Placed!';
        CheckoutSuccessView.render(viewContainer);
    });

    // 5. Setup global listeners for reactive updates to shared elements
    window.addEventListener('cart-updated', () => {
        Navbar.render(navbarContainer);
    });

    window.addEventListener('theme-updated', () => {
        Navbar.render(navbarContainer);
    });

    // Let accessibility reader know that pages are dynamic
    window.addEventListener('hashchange', () => {
        const hashName = window.location.hash.replace('#/', '') || 'catalog';
        const cleanName = hashName.split('/')[0];
        Store.announceAccessibility(`Navigated to the ${cleanName} section.`);
    });
});
