import os
import random
import string
from flask import Flask, jsonify, render_template, request, send_from_directory
from flask_cors import CORS

app = Flask(__name__, static_folder='static', template_folder='templates')
CORS(app)

# Mock Product Database
PRODUCTS = [
    {
        "id": 1,
        "title": "Aura Sound Link ANC",
        "description": "Premium wireless over-ear headphones with advanced active noise cancellation, high-fidelity acoustics, and ultra-plush memory foam cups for absolute listening comfort.",
        "category": "Audio",
        "price": 299.99,
        "rating": 4.8,
        "reviews_count": 128,
        "stock": 15,
        "badge": "Best Seller",
        "specs": {
            "Battery Life": "Up to 40 hours (ANC on)",
            "Connectivity": "Bluetooth 5.2 & 3.5mm Aux",
            "Weight": "250g",
            "Drivers": "40mm Dynamic custom-tuned",
            "Codec Support": "AAC, SBC, aptX Adaptive"
        },
        "features": [
            "Hybrid Active Noise Cancellation",
            "Transparency Mode for hearing surroundings",
            "Multipoint connection (pair 2 devices simultaneously)",
            "Rapid Charge: 10 mins charging gives 5 hours play"
        ]
    },
    {
        "id": 2,
        "title": "Zenith Key Pro Keyboard",
        "description": "A compact 75% layout mechanical keyboard featuring hot-swappable switches, sound-dampening foam, customized double-shot PBT keycaps, and brilliant RGB backlighting.",
        "category": "Keyboards",
        "price": 149.99,
        "rating": 4.6,
        "reviews_count": 84,
        "stock": 8,
        "badge": "New Arrival",
        "specs": {
            "Layout": "75% ANSI layout (84 keys)",
            "Switches": "Pre-lubed Gateron Brown Tactile",
            "Keycaps": "Double-shot PBT Cherry Profile",
            "Connectivity": "USB-C, 2.4GHz Wireless, Bluetooth 5.0",
            "Battery": "4000mAh (up to 150 hours RGB off)"
        },
        "features": [
            "Hot-Swappable 3/5-pin switch sockets",
            "Porous sound-absorbing silicon dampener built-in",
            "Premium CNC-anodized aluminum frame",
            "Compatible with Windows, macOS, Android, and iOS"
        ]
    },
    {
        "id": 3,
        "title": "Lumina Merino Desk Pad",
        "description": "Luxurious, water-repellent desk mat crafted from 100% genuine merino wool felt. Features a natural cork anti-slip backing to keep your keyboard and mouse securely in place.",
        "category": "Desk Setup",
        "price": 49.99,
        "rating": 4.5,
        "reviews_count": 64,
        "stock": 25,
        "badge": "Eco Friendly",
        "specs": {
            "Material": "100% Merino Wool Felt & Natural Oak Cork",
            "Dimensions": "900mm x 400mm x 4mm",
            "Origin": "Sustainable sourcing",
            "Waterproof": "Spill-resistant surface treatment",
            "Care": "Spot clean only"
        },
        "features": [
            "Provides a soft cushion for hands and wrists",
            "Protects your desk from scratches and spills",
            "Laser-cut edges prevent fraying over time",
            "Enhances mouse tracking tracking precision"
        ]
    },
    {
        "id": 4,
        "title": "Apex Track Mouse",
        "description": "High-precision ergonomic mouse engineered for creators and developers. Features an ultra-fast electromagnetic scroll wheel, 8000 DPI optical sensor, and silent tactile click switches.",
        "category": "Accessories",
        "price": 99.99,
        "rating": 4.7,
        "reviews_count": 192,
        "stock": 12,
        "badge": "Trending",
        "specs": {
            "Sensor": "8K Darkfield High-Precision Optical",
            "DPI Range": "200 to 8000 DPI (customizable)",
            "Buttons": "7 Programmable buttons",
            "Scroll Wheel": "MagSpeed Smart-Shift electromagnetic",
            "Battery": "USB-C Rechargeable (up to 70 days)"
        },
        "features": [
            "Scroll 1,000 lines in a single second with MagSpeed",
            "App-specific customizations for productivity workflows",
            "Cross-computer control (Flow) between multiple machines",
            "Sleek ergonomic design tailored for right-handed comfort"
        ]
    },
    {
        "id": 5,
        "title": "Solaris 140W GaN Charger",
        "description": "Ultra-compact Gallium Nitride (GaN) multi-port charging brick. Delivers up to 140W of dynamic power distribution across 3 USB-C and 1 USB-A ports to charge your laptop, phone, and tablet all at once.",
        "category": "Accessories",
        "price": 79.99,
        "rating": 4.9,
        "reviews_count": 55,
        "stock": 20,
        "badge": "Top Rated",
        "specs": {
            "Technology": "GaN (Gallium Nitride) v5",
            "Total Wattage": "140W Max Output",
            "Ports": "3x USB-C (Power Delivery 3.1), 1x USB-A",
            "Size": "Approx. 30% smaller than standard chargers",
            "Safety": "Active Temp monitoring & Overcurrent protection"
        },
        "features": [
            "Charges MacBook Pro 16\" to 50% in just 28 minutes",
            "Dynamic power allocation adjusts output per active port",
            "Foldable prongs for travel-friendly packaging",
            "Wide compatibility from laptops to smartwatches"
        ]
    },
    {
        "id": 6,
        "title": "Vantage Tech Backpack",
        "description": "Weatherproof, high-capacity commuter pack featuring a dedicated padded 16\" laptop sleeve, concealed passport pocket, lay-flat TSA-friendly layout, and custom charging port bypass.",
        "category": "Travel",
        "price": 189.99,
        "rating": 4.4,
        "reviews_count": 42,
        "stock": 5,
        "badge": "Limited Stock",
        "specs": {
            "Capacity": "22 Liters",
            "Laptop Compartment": "Fits up to 16\" MacBook Pro",
            "Material": "900D Ballistic Nylon with TPU waterproof coating",
            "Zippers": "YKK AquaGuard weather-resistant zippers",
            "Dimensions": "48cm x 30cm x 15cm"
        },
        "features": [
            "Ergonomic shoulder straps with magnetic sternum buckle",
            "Luggage pass-through strap for easy airport travel",
            "Side quick-access pocket with key-tether clip",
            "Dedicated hidden pocket for tracking tags (e.g. AirTag)"
        ]
    },
    {
        "id": 7,
        "title": "Helix MagSafe Stand",
        "description": "Anodized aluminum desktop mount designed for MagSafe-compatible smartphones. Double-hinged arm provides 360-degree rotation and adjustable viewing heights for perfect hands-free video calls and viewing.",
        "category": "Desk Setup",
        "price": 39.99,
        "rating": 4.3,
        "reviews_count": 31,
        "stock": 30,
        "badge": "",
        "specs": {
            "Material": "CNC-machined aerospace-grade aluminum",
            "Compatibility": "MagSafe Devices (iPhone 12 & newer, MagSafe cases)",
            "Base Weight": "320g heavy-duty non-slip base",
            "Hinges": "Dual-axis friction adjustment hinges",
            "Colors": "Space Gray / Silver"
        },
        "features": [
            "Heavy weighted base prevents tipping when tapping the screen",
            "Silicon padding prevents scratches on your phone and desk",
            "Folds flat for compact storage in laptop bags",
            "Cable routing slot on the back for tidy charging setups"
        ]
    },
    {
        "id": 8,
        "title": "Spectra Smart LED Strip",
        "description": "5-meter Wi-Fi & Bluetooth-enabled addressable RGB ambient lighting strip. Synchronizes in real time with ambient music, fits desk edges, and integrates with Google Home and Alexa voice controls.",
        "category": "Desk Setup",
        "price": 29.99,
        "rating": 4.2,
        "reviews_count": 76,
        "stock": 40,
        "badge": "",
        "specs": {
            "Length": "5 Meters (16.4 ft) - Cuttable design",
            "LED Density": "60 LEDs per meter",
            "Connectivity": "2.4GHz Wi-Fi & Bluetooth LE",
            "Controller": "In-line physical remote + Smart App",
            "Input Voltage": "12V 2A Adapter"
        },
        "features": [
            "Individually addressable LEDs (IC chips) for multicolor flows",
            "High-sensitivity microphone sensor for music sync modes",
            "Adhesive backing sticks securely to wood, metal, and plastic",
            "Timer scheduling and customizable lighting scenes via app"
        ]
    }
]

# Route: Serve Homepage SPA
@app.route('/')
def index():
    return render_template('index.html')

# API Route: Get All Products (with filters, search, and sorting)
@app.route('/api/products', methods=['GET'])
def get_products():
    search_query = request.args.get('search', '').strip().lower()
    category = request.args.get('category', '').strip()
    min_price = request.args.get('min_price')
    max_price = request.args.get('max_price')
    sort_by = request.args.get('sort', '').strip()

    filtered_products = PRODUCTS.copy()

    # Search Filter
    if search_query:
        filtered_products = [
            p for p in filtered_products
            if search_query in p['title'].lower() or search_query in p['description'].lower() or search_query in p['category'].lower()
        ]

    # Category Filter
    if category and category.lower() != 'all':
        filtered_products = [
            p for p in filtered_products
            if p['category'].lower() == category.lower()
        ]

    # Price Filter
    if min_price:
        try:
            min_p = float(min_price)
            filtered_products = [p for p in filtered_products if p['price'] >= min_p]
        except ValueError:
            pass

    if max_price:
        try:
            max_p = float(max_price)
            filtered_products = [p for p in filtered_products if p['price'] <= max_p]
        except ValueError:
            pass

    # Sorting
    if sort_by == 'price_asc':
        filtered_products.sort(key=lambda x: x['price'])
    elif sort_by == 'price_desc':
        filtered_products.sort(key=lambda x: x['price'], reverse=True)
    elif sort_by == 'rating_desc':
        filtered_products.sort(key=lambda x: x['rating'], reverse=True)
    elif sort_by == 'popularity_desc':
        filtered_products.sort(key=lambda x: x['reviews_count'], reverse=True)

    return jsonify(filtered_products)

# API Route: Get Single Product
@app.route('/api/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    product = next((p for p in PRODUCTS if p['id'] == product_id), None)
    if product:
        return jsonify(product)
    return jsonify({"error": "Product not found"}), 404

# API Route: Process Checkout Order
@app.route('/api/checkout', methods=['POST'])
def checkout():
    data = request.get_json() or {}
    
    # Simple Validation
    cart_items = data.get('cart', [])
    shipping_info = data.get('shipping', {})
    
    if not cart_items:
        return jsonify({"error": "Cart is empty"}), 400
        
    required_fields = ['full_name', 'email', 'address', 'city', 'zip_code']
    for field in required_fields:
        if not shipping_info.get(field, '').strip():
            return jsonify({"error": f"Shipping detail '{field}' is required"}), 400

    # Calculate Totals and update stock
    total_amount = 0
    order_items_processed = []
    
    for item in cart_items:
        product_id = item.get('id')
        qty = item.get('quantity', 1)
        
        product = next((p for p in PRODUCTS if p['id'] == product_id), None)
        if not product:
            return jsonify({"error": f"Product with ID {product_id} not found"}), 400
            
        if product['stock'] < qty:
            return jsonify({"error": f"Insufficient stock for '{product['title']}'. Only {product['stock']} left."}), 400
            
        # Deduct stock
        product['stock'] -= qty
        total_amount += product['price'] * qty
        order_items_processed.append({
            "id": product['id'],
            "title": product['title'],
            "price": product['price'],
            "quantity": qty
        })

    # Generate Order ID and Tracking Number
    order_id = "ORD-" + "".join(random.choices(string.digits, k=6))
    tracking_number = "TRK-" + "".join(random.choices(string.ascii_uppercase + string.digits, k=10))

    return jsonify({
        "success": True,
        "order_id": order_id,
        "tracking_number": tracking_number,
        "total_amount": round(total_amount, 2),
        "items": order_items_processed,
        "shipping": shipping_info,
        "message": "Order processed successfully!"
    }), 201

# Fallback route for hash routing support and favicon routing
@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'), 'favicon.svg', mimetype='image/svg+xml')

# Serve index.html on any unknown route to support history API fallback (if ever needed, though Hash Router handles this)
@app.errorhandler(404)
def page_not_found(e):
    return render_template('index.html'), 200

if __name__ == '__main__':
    # Local Development Settings
    app.run(debug=True, port=5000)
