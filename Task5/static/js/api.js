/**
 * AuraCommerce API Client
 * Manages communication with Flask REST endpoints.
 */

const API_BASE = '/api';

export const ApiClient = {
    /**
     * Fetch all products matching current search, filters, and sort options.
     * @param {Object} filters - Search, categories, min_price, max_price, and sorting
     * @returns {Promise<Array>} List of product objects
     */
    async getProducts(filters = {}) {
        const params = new URLSearchParams();
        if (filters.search) params.append('search', filters.search);
        if (filters.category) params.append('category', filters.category);
        if (filters.min_price) params.append('min_price', filters.min_price);
        if (filters.max_price) params.append('max_price', filters.max_price);
        if (filters.sort) params.append('sort', filters.sort);

        const url = `${API_BASE}/products?${params.toString()}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Failed to load products: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    },

    /**
     * Fetch details for a single product by ID.
     * @param {number|string} id - Product ID
     * @returns {Promise<Object>} Single product data
     */
    async getProduct(id) {
        const url = `${API_BASE}/products/${id}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('Product not found');
                }
                throw new Error(`Failed to load product details: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error(`Error fetching product ID ${id}:`, error);
            throw error;
        }
    },

    /**
     * Submit cart contents and billing details for mock order processing.
     * @param {Object} orderData - Object containing cart items array and shipping info
     * @returns {Promise<Object>} Response containing tracking numbers and order receipt
     */
    async submitCheckout(orderData) {
        const url = `${API_BASE}/checkout`;
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData)
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Checkout process failed');
            }
            return data;
        } catch (error) {
            console.error('Error during checkout API submit:', error);
            throw error;
        }
    }
};
