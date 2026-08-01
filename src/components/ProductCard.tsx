'use client';
import { useState } from 'react';
import { useCart } from './CartContext';
import { WEIGHT_OPTIONS } from '../data/products';

interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    stock: boolean;
}

export function ProductCard({ product, category }: { product: Product; category: 'beef' | 'mutton' | 'chicken' }) {
    const { addToCart, wishlist, toggleWishlist } = useCart();
    const [selectedWeight, setSelectedWeight] = useState<number>(WEIGHT_OPTIONS[0]);
    const [qty, setQty] = useState<number>(1);

    const categoryName = category === 'beef' ? 'Beef' : category === 'mutton' ? 'Mutton' : 'Chicken';
    const displayedPrice = product.price * selectedWeight;
    const isWishlisted = wishlist[product.id];

    const handleQtyChange = (change: number) => {
        setQty((prev) => Math.max(1, prev + change));
    };

    const handleAddToCart = () => {
        addToCart(category, product.id, selectedWeight, qty);
        setQty(1); // Reset qty after adding to cart
    };

    return (
        <div className="product-card" data-id={product.id}>
            <div className="product-badges">
                <span className="badge-halal">Halal</span>
                <button
                    className="btn-wishlist"
                    onClick={() => toggleWishlist(product.id)}
                >
                    <i className={isWishlisted ? 'bx bxs-heart' : 'bx bx-heart'} style={isWishlisted ? { color: '#e53935' } : { color: 'var(--text-muted)' }}></i>
                </button>
            </div>
            <img src={product.image} alt={product.name} className="product-image" loading="lazy" />
            <span className="product-category">{categoryName}</span>
            <h3 className="product-title">{product.name}</h3>

            <div className="weight-selector" id={`weight-${product.id}`}>
                {WEIGHT_OPTIONS.map((w, index) => (
                    <button
                        key={index}
                        className={`weight-btn ${selectedWeight === w ? 'active' : ''}`}
                        data-weight={w}
                        onClick={() => setSelectedWeight(w)}
                    >
                        {w} kg
                    </button>
                ))}
            </div>

            <div className="product-price-row">
                <div>
                    <div className="price">₹<span id={`price-val-${product.id}`}>{displayedPrice}</span></div>
                    <div className="stock-status"><i className='bx bx-check-circle'></i> In Stock</div>
                </div>
            </div>

            <div className="cart-actions">
                <div className="qty-controls">
                    <button className="qty-btn" onClick={() => handleQtyChange(-1)}><i className='bx bx-minus'></i></button>
                    <input type="text" className="qty-input" id={`qty-${product.id}`} value={qty} readOnly />
                    <button className="qty-btn" onClick={() => handleQtyChange(1)}><i className='bx bx-plus'></i></button>
                </div>
                <button className="btn-add-cart" onClick={handleAddToCart}>Add to Cart</button>
            </div>
        </div>
    );
}
