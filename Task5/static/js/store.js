/**
 * AuraCommerce State Store
 * Controls application-wide state for Cart, Wishlist, Theme, and Filters.
 * Dispatches custom window events on state modification to trigger dynamic re-renders.
 */

export const Store = {
    state: {
        cart: [],
        wishlist: [],
        theme: 'dark', // 'dark' | 'light'
        filters: {
            search: '',
            category: 'All',
            min_price: '',
            max_price: '',
            sort: 'popularity_desc'
        },
        lastOrder: null
    },

    /**
     * Initialize state from localStorage and system preferences.
     */
    init() {
        // Load cart
        const savedCart = localStorage.getItem('auracommerce_cart');
        if (savedCart) {
            try { this.state.cart = JSON.parse(savedCart); } catch (e) { this.state.cart = []; }
        }

        // Load wishlist
        const savedWishlist = localStorage.getItem('auracommerce_wishlist');
        if (savedWishlist) {
            try { this.state.wishlist = JSON.parse(savedWishlist); } catch (e) { this.state.wishlist = []; }
        }

        // Initialize Theme
        const savedTheme = localStorage.getItem('auracommerce_theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.state.theme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
        this.applyTheme(this.state.theme);
    },

    /* --- Theme Management --- */
    toggleTheme() {
        const nextTheme = this.state.theme === 'dark' ? 'light' : 'dark';
        this.state.theme = nextTheme;
        localStorage.setItem('auracommerce_theme', nextTheme);
        this.applyTheme(nextTheme);
        this.emit('theme-updated', { theme: nextTheme });
    },

    applyTheme(theme) {
        document.documentElement.setAttribute('data-bs-theme', theme);
    },

    /* --- Cart Management --- */
    getCart() {
        return this.state.cart;
    },

    getCartCount() {
        return this.state.cart.reduce((total, item) => total + item.quantity, 0);
    },

    getCartTotal() {
        return this.state.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    },

    addToCart(product, quantity = 1) {
        const existingItem = this.state.cart.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.state.cart.push({
                id: product.id,
                title: product.title,
                price: product.price,
                badge: product.badge,
                quantity: quantity
            });
        }
        this.saveCart();
        this.emit('cart-updated');
        this.announceAccessibility(`Added ${product.title} to your cart.`);
    },

    removeFromCart(productId) {
        const item = this.state.cart.find(i => i.id === productId);
        this.state.cart = this.state.cart.filter(item => item.id !== productId);
        this.saveCart();
        this.emit('cart-updated');
        if (item) {
            this.announceAccessibility(`Removed ${item.title} from your cart.`);
        }
    },

    updateCartQuantity(productId, quantity) {
        const parsedQty = parseInt(quantity);
        if (isNaN(parsedQty) || parsedQty <= 0) {
            this.removeFromCart(productId);
            return;
        }

        const item = this.state.cart.find(item => item.id === productId);
        if (item) {
            item.quantity = parsedQty;
            this.saveCart();
            this.emit('cart-updated');
        }
    },

    clearCart() {
        this.state.cart = [];
        this.saveCart();
        this.emit('cart-updated');
    },

    saveCart() {
        localStorage.setItem('auracommerce_cart', JSON.stringify(this.state.cart));
    },

    /* --- Wishlist Management --- */
    toggleWishlist(productId) {
        const idx = this.state.wishlist.indexOf(productId);
        let added = false;
        if (idx > -1) {
            this.state.wishlist.splice(idx, 1);
        } else {
            this.state.wishlist.push(productId);
            added = true;
        }
        localStorage.setItem('auracommerce_wishlist', JSON.stringify(this.state.wishlist));
        this.emit('wishlist-updated', { productId, added });
        this.announceAccessibility(added ? "Added item to wishlist." : "Removed item from wishlist.");
    },

    isInWishlist(productId) {
        return this.state.wishlist.includes(productId);
    },

    /* --- Filter Management --- */
    updateFilters(newFilters) {
        this.state.filters = { ...this.state.filters, ...newFilters };
        this.emit('filters-updated', this.state.filters);
    },

    resetFilters() {
        this.state.filters = {
            search: '',
            category: 'All',
            min_price: '',
            max_price: '',
            sort: 'popularity_desc'
        };
        this.emit('filters-updated', this.state.filters);
    },

    /* --- Event Dispatcher Utilities --- */
    emit(eventName, detail = {}) {
        const event = new CustomEvent(eventName, { detail });
        window.dispatchEvent(event);
    },

    /**
     * Push screen-reader announcements to the live status region.
     * @param {string} message - Announcement text
     */
    announceAccessibility(message) {
        const announcer = document.getElementById('accessibilityAnnouncer');
        if (announcer) {
            announcer.textContent = message;
        }
    }
};
