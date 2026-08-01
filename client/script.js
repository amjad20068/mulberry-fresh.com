// Data arrays for products
const products = {
    beef: [
        { id: 'b1', name: 'Beef Curry Cut', price: 420, image: 'assets/images/beef-curry-cut.jpg', stock: true },
        { id: 'b2', name: 'Beef Biriyani Cut', price: 430, image: 'assets/images/beef-biriyani-cut-user-4k.png', stock: true },
        { id: 'b3', name: 'Beef Mandi Cut', price: 450, image: 'assets/images/beef-mandi-cut.jpg', stock: true },
        { id: 'b5', name: 'Beef Dry Fry', price: 480, image: 'assets/images/beef-dry-fry.jpg', stock: true },
        { id: 'b6', name: 'Beef Ribs', price: 500, image: 'assets/images/beef-ribs.png', stock: true },
        { id: 'b7', name: 'Beef Liver', price: 350, image: 'assets/images/beef-liver.jpg', stock: true },
        { id: 'b9', name: 'Beef Kappakkoottu', price: 450, image: 'assets/images/beef-kappakkoottu.jpg', stock: true },
        { id: 'b10', name: 'Beef Boneless', price: 480, image: 'assets/images/beef-boneless.png', stock: true }
    ],
    mutton: [
        { id: 'm1', name: 'Mutton Curry Cut', price: 850, image: 'assets/images/mutton-curry-cut.jpg', stock: true },
        { id: 'm2', name: 'Mutton Biriyani Cut', price: 860, image: 'assets/images/mutton-biriyani-cut.jpg', stock: true },
        { id: 'm3', name: 'Mutton Mandi Cut', price: 880, image: 'assets/images/mutton-mandi-cut.jpg', stock: true }
    ],
    chicken: [
        { id: 'c1', name: 'Chicken Curry Cut', price: 260, image: 'assets/images/chicken-curry-cut.png', stock: true },
        { id: 'c2', name: 'Chicken Biriyani Cut', price: 270, image: 'assets/images/chicken-biriyani-cut.png', stock: true },
        { id: 'c3', name: 'Chicken Mandi Cut', price: 280, image: 'assets/images/chicken-mandi-cut.png', stock: true },
        { id: 'c4', name: 'Chicken Alfaham Cut', price: 290, image: 'assets/images/chicken-alfaham-cut.jpg', stock: true },
        { id: 'c5', name: 'Chicken Leg (With Skin)', price: 300, image: 'assets/images/chicken-leg-skin.jpg', stock: true },
        { id: 'c6', name: 'Chicken Leg (Skinless)', price: 320, image: 'assets/images/chicken-leg-skinless.jpg', stock: true },
        { id: 'c7', name: 'Whole Chicken (With Skin)', price: 240, image: 'assets/images/whole-chicken-skin.jpg', stock: true },
        { id: 'c8', name: 'Whole Chicken (Skinless)', price: 260, image: 'assets/images/whole-chicken-skinless.jpg', stock: true },
        { id: 'c9', name: 'Chicken Wings (With Skin)', price: 280, image: 'assets/images/chicken-wings-skin.jpg', stock: true },
        { id: 'c10', name: 'Chicken Wings (Skinless)', price: 300, image: 'assets/images/chicken-wings-skinless.jpg', stock: true },
        { id: 'c11', name: 'Chicken Gizzard', price: 180, image: 'assets/images/chicken-gizzard.jpg', stock: true },
        { id: 'c12', name: 'Chicken Breast (With Skin)', price: 350, image: 'assets/images/chicken-breast-skin.jpg', stock: true },
        { id: 'c13', name: 'Chicken Breast (Skinless)', price: 380, image: 'assets/images/chicken-breast-skinless.jpg', stock: true }
    ]
};

const WEIGHT_OPTIONS = [1, 2, 3, 5]; // in kg

// Cart state
let cart = [];

// DOM Elements
const beefGrid = document.getElementById('beef-grid');
const muttonGrid = document.getElementById('mutton-grid');
const chickenGrid = document.getElementById('chicken-grid');
const cartToggle = document.getElementById('cart-toggle');
const closeCartBtn = document.getElementById('close-cart');
const sideCart = document.getElementById('side-cart');
const cartOverlay = document.getElementById('cart-overlay');
const cartItemsContainer = document.getElementById('cart-items');
const cartSubtotalEl = document.getElementById('cart-subtotal');
const cartTotalEl = document.getElementById('cart-total');
const cartBadge = document.querySelector('.cart-badge');
const navbar = document.getElementById('navbar');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

// Render Products
function renderProducts(category, containerEl, searchTerm = '') {
    const categoryName = category === 'beef' ? 'Beef' : category === 'mutton' ? 'Mutton' : 'Chicken';

    containerEl.innerHTML = '';

    const filteredProducts = products[category].filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

    if (filteredProducts.length === 0 && searchTerm !== '') {
        containerEl.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; color: var(--text-muted); padding: 2rem;">No products match your search.</p>';
        return;
    }

    filteredProducts.forEach(product => {
        // Reset state so UI matches global state
        if (productSelections[product.id]) {
            productSelections[product.id].weight = WEIGHT_OPTIONS[0];
            productSelections[product.id].qty = 1;
        }

        const card = document.createElement('div');
        card.className = 'product-card';
        card.dataset.id = product.id;

        card.innerHTML = `
            <div class="product-badges">
                <span class="badge-halal">Halal</span>
                <button class="btn-wishlist" onclick="toggleWishlist(this)"><i class='bx bx-heart'></i></button>
            </div>
            <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
            <span class="product-category">${categoryName}</span>
            <h3 class="product-title">${product.name}</h3>
            
            <div class="weight-selector" id="weight-${product.id}">
                ${WEIGHT_OPTIONS.map((w, index) =>
            `<button class="weight-btn ${index === 0 ? 'active' : ''}" data-weight="${w}" onclick="selectWeight('${product.id}', ${w}, this)">${w} kg</button>`
        ).join('')}
            </div>
            
            <div class="product-price-row">
                <div>
                    <div class="price">₹<span id="price-val-${product.id}">${product.price}</span></div>
                    <div class="stock-status"><i class='bx bx-check-circle'></i> In Stock</div>
                </div>
            </div>
            
            <div class="cart-actions">
                <div class="qty-controls">
                    <button class="qty-btn" onclick="updateQty('${product.id}', -1)"><i class='bx bx-minus'></i></button>
                    <input type="text" class="qty-input" id="qty-${product.id}" value="1" readonly>
                    <button class="qty-btn" onclick="updateQty('${product.id}', 1)"><i class='bx bx-plus'></i></button>
                </div>
                <button class="btn-add-cart" onclick="addToCart('${category}', '${product.id}')">Add to Cart</button>
            </div>
        `;

        containerEl.appendChild(card);
    });
}

// Logic for weight and quantity selection
const productSelections = {}; // Store selections for each product card

function initProductSelections() {
    ['beef', 'mutton', 'chicken'].forEach(cat => {
        products[cat].forEach(p => {
            productSelections[p.id] = { weight: 1, qty: 1, basePrice: p.price };
        });
    });
}

function selectWeight(productId, weight, btnElement) {
    const selectorCont = document.getElementById(`weight-${productId}`);
    selectorCont.querySelectorAll('.weight-btn').forEach(btn => btn.classList.remove('active'));
    btnElement.classList.add('active');

    productSelections[productId].weight = weight;
    updateDisplayedPrice(productId);
}

function updateQty(productId, change) {
    let currentQty = productSelections[productId].qty;
    currentQty += change;

    // minimum qty is 1
    if (currentQty < 1) currentQty = 1;

    productSelections[productId].qty = currentQty;
    document.getElementById(`qty-${productId}`).value = currentQty;
}

function updateDisplayedPrice(productId) {
    const sel = productSelections[productId];
    const totalItemPrice = sel.basePrice * sel.weight;
    document.getElementById(`price-val-${productId}`).innerText = totalItemPrice;
}

function toggleWishlist(btn) {
    const icon = btn.querySelector('i');
    if (icon.classList.contains('bx-heart')) {
        icon.classList.replace('bx-heart', 'bxs-heart');
        icon.style.color = '#e53935';
    } else {
        icon.classList.replace('bxs-heart', 'bx-heart');
        icon.style.color = 'var(--text-muted)';
    }
}

// Cart Functionality
function addToCart(category, productId) {
    const product = products[category].find(p => p.id === productId);
    const sel = productSelections[productId];

    const cartItem = {
        id: productId + '-' + sel.weight, // Unique ID per weight
        productId: productId,
        name: product.name,
        weight: sel.weight,
        pricePerKg: product.price,
        qty: sel.qty,
        image: product.image
    };

    // Check if already in cart
    const existingIndex = cart.findIndex(item => item.id === cartItem.id);
    if (existingIndex > -1) {
        cart[existingIndex].qty += cartItem.qty;
    } else {
        cart.push(cartItem);
    }

    updateCartUI();
    openCart();

    // Reset inputs on card
    sel.qty = 1;
    document.getElementById(`qty-${productId}`).value = 1;
}

function removeFromCart(cartItemId) {
    cart = cart.filter(item => item.id !== cartItemId);
    updateCartUI();
}

function updateCartUI() {
    // Update Badge
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    cartBadge.innerText = totalItems;

    // Render Cart Items
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart-message">
                <i class='bx bx-shopping-bag'></i>
                <p>Your cart is empty.</p>
                <button class="btn btn-primary btn-block mt-sm" onclick="closeCart()">Start Shopping</button>
            </div>
        `;
        cartSubtotalEl.innerText = '₹0.00';
        cartTotalEl.innerText = '₹0.00';
        return;
    }

    let cartHTML = '';
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.pricePerKg * item.weight * item.qty;
        total += itemTotal;

        cartHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-meta">${item.weight} kg • ₹${item.pricePerKg}/kg</div>
                    <div class="cart-item-actions">
                        <div class="cart-item-price">₹${itemTotal}</div>
                        <div>Qty: ${item.qty} <button class="btn-remove" onclick="removeFromCart('${item.id}')"><i class='bx bx-trash'></i></button></div>
                    </div>
                </div>
            </div>
        `;
    });

    cartItemsContainer.innerHTML = cartHTML;
    cartSubtotalEl.innerText = '₹' + total.toFixed(2);
    cartTotalEl.innerText = '₹' + total.toFixed(2);
}

// UI Toggles
function openCart() {
    sideCart.classList.add('active');
    cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCart() {
    sideCart.classList.remove('active');
    cartOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

cartToggle.addEventListener('click', (e) => {
    e.preventDefault();
    openCart();
});

closeCartBtn.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);

// Mobile Menu
mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    const icon = mobileMenuBtn.querySelector('i');
    if (mobileMenu.classList.contains('active')) {
        icon.classList.replace('bx-menu', 'bx-x');
    } else {
        icon.classList.replace('bx-x', 'bx-menu');
    }
});

// Close mobile menu on link click
document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        mobileMenuBtn.querySelector('i').classList.replace('bx-x', 'bx-menu');
    });
});

// Scroll Effects
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.05)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initProductSelections();
    renderProducts('beef', beefGrid);
    renderProducts('mutton', muttonGrid);
    renderProducts('chicken', chickenGrid);

    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value;
            renderProducts('beef', beefGrid, searchTerm);
            renderProducts('mutton', muttonGrid, searchTerm);
            renderProducts('chicken', chickenGrid, searchTerm);

            // Re-initialize selections for newly rendered elements if needed, 
            // but productSelections object is global so it keeps state!
        });
    }
});
