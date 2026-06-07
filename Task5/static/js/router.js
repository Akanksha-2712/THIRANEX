/**
 * AuraCommerce Client-Side Hash Router
 * Parses browser location hashes (e.g. #/product/3) and resolves matches
 * against registered dynamic route patterns (e.g. #/product/:id).
 */

export class HashRouter {
    constructor() {
        this.routes = [];
        this.currentRoute = null;

        // Listen for browser navigation events
        window.addEventListener('hashchange', () => this.handleRouting());
        window.addEventListener('load', () => this.handleRouting());
    }

    /**
     * Add a route pattern and its callback handler.
     * @param {string} pattern - Path template (e.g., '/', '/product/:id', '/cart')
     * @param {Function} handler - Callback when route matches
     */
    addRoute(pattern, handler) {
        const paramNames = [];
        
        // Normalize the pattern string to construct regular expression
        const cleanPattern = pattern
            .replace(/\/+/g, '/')
            .replace(/^\/|\/$/g, '');
        
        let regexSource = '^#\\/';
        
        if (cleanPattern !== '') {
            const segments = cleanPattern.split('/');
            const regexSegments = segments.map(segment => {
                if (segment.startsWith(':')) {
                    paramNames.push(segment.substring(1));
                    return '([^/]+)';
                }
                return segment;
            });
            regexSource += regexSegments.join('\\/');
        }
        
        regexSource += '\\/?$';
        
        const regex = new RegExp(regexSource);
        this.routes.push({ pattern, regex, paramNames, handler });
    }

    /**
     * Resolve the current browser hash and execute the matched handler.
     */
    handleRouting() {
        const hash = window.location.hash || '#/';
        
        // Ensure hash starts with '#/' format
        if (!hash.startsWith('#/')) {
            window.location.hash = '#/';
            return;
        }

        // Show global loading indicator during page rendering
        const spinner = document.getElementById('appSpinner');
        const container = document.getElementById('viewContainer');
        if (spinner) spinner.classList.remove('d-none');
        if (container) container.innerHTML = '';

        for (const route of this.routes) {
            const match = hash.match(route.regex);
            if (match) {
                this.currentRoute = route.pattern;
                
                // Extract route parameters
                const params = {};
                route.paramNames.forEach((name, index) => {
                    params[name] = decodeURIComponent(match[index + 1]);
                });

                // Execute view handler
                try {
                    route.handler(params);
                } catch (error) {
                    console.error(`Route handler error for ${hash}:`, error);
                    this.showErrorView('An error occurred while loading this page.');
                }
                
                // Hide spinner
                if (spinner) spinner.classList.add('d-none');
                
                // Track page view event for analytics if needed
                window.scrollTo({ top: 0, behavior: 'instant' });
                return;
            }
        }

        // Route Not Found fallback
        console.warn(`Route not found for: ${hash}`);
        this.showErrorView('Page Not Found', 'The link you followed may be broken, or the page has been removed.');
        if (spinner) spinner.classList.add('d-none');
    }

    /**
     * Imperatively navigate to a hash path.
     * @param {string} path - Destination URL (e.g. '/product/1' or '/')
     */
    navigateTo(path) {
        const cleanPath = path.startsWith('/') ? path : `/${path}`;
        window.location.hash = `#${cleanPath}`;
    }

    /**
     * Display a fallback visual warning inside the view container.
     */
    showErrorView(title, message = 'Something went wrong.') {
        const container = document.getElementById('viewContainer');
        if (container) {
            container.innerHTML = `
                <div class="container py-5 my-5 text-center fade-in-view">
                    <div class="display-1 text-danger mb-4"><i class="bi bi-exclamation-triangle-fill"></i></div>
                    <h1 class="h2 mb-3">${title}</h1>
                    <p class="text-secondary mb-4">${message}</p>
                    <a href="#/" class="btn btn-primary btn-lg rounded-pill px-4">Return to Store</a>
                </div>
            `;
        }
    }
}
