'use client';
import { useCart } from './CartContext';

export function SideCart() {
    const { cart, isCartOpen, closeCart, removeFromCart } = useCart();

    const total = cart.reduce((sum, item) => sum + (item.pricePerKg * item.weight * item.qty), 0);
    const totalFormatted = total.toFixed(2);

    const handleCheckout = () => {
        if (cart.length === 0) return;

        let message = "Hello Mulberry Fresh, I would like to place an order:\n\n";

        cart.forEach((item, index) => {
            const itemTotal = item.pricePerKg * item.weight * item.qty;
            message += `${index + 1}. ${item.name} (${item.weight}kg) - Qty: ${item.qty} - ₹${itemTotal}\n`;
        });

        message += `\n*Total Amount: ₹${totalFormatted}*`;

        // Add your WhatsApp number here (include country code, without + symbol)
        const phoneNumber = "918075918850";
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

        window.location.href = whatsappUrl;
    };

    return (
        <>
            <div className={`cart-overlay ${isCartOpen ? 'active' : ''}`} id="cart-overlay" onClick={closeCart}></div>
            <aside className={`side-cart ${isCartOpen ? 'active' : ''}`} id="side-cart">
                <div className="cart-header">
                    <h2>Your Cart</h2>
                    <button className="close-cart" id="close-cart" onClick={closeCart}>
                        <i className='bx bx-x'></i>
                    </button>
                </div>
                <div className="cart-items" id="cart-items">
                    {cart.length === 0 ? (
                        <div className="empty-cart-message">
                            <i className='bx bx-shopping-bag'></i>
                            <p>Your cart is empty.</p>
                            <button className="btn btn-primary btn-block mt-sm" onClick={closeCart}>Start Shopping</button>
                        </div>
                    ) : (
                        cart.map(item => {
                            const itemTotal = item.pricePerKg * item.weight * item.qty;
                            return (
                                <div className="cart-item" key={item.id}>
                                    <img src={item.image} alt={item.name} className="cart-item-img" />
                                    <div className="cart-item-info">
                                        <div className="cart-item-title">{item.name}</div>
                                        <div className="cart-item-meta">{item.weight} kg • ₹{item.pricePerKg}/kg</div>
                                        <div className="cart-item-actions">
                                            <div className="cart-item-price">₹{itemTotal}</div>
                                            <div>
                                                Qty: {item.qty}{' '}
                                                <button className="btn-remove" onClick={() => removeFromCart(item.id)}>
                                                    <i className='bx bx-trash'></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
                <div className="cart-footer">
                    <div className="cart-summary">
                        <div className="summary-line">
                            <span>Subtotal</span>
                            <span id="cart-subtotal">₹{totalFormatted}</span>
                        </div>
                        <div className="summary-line">
                            <span>Delivery Estimate</span>
                            <span>Free</span>
                        </div>
                        <div className="summary-line total-line">
                            <span>Total</span>
                            <span className="total-price" id="cart-total">₹{totalFormatted}</span>
                        </div>
                    </div>
                    <button className="btn btn-primary btn-block btn-checkout" id="checkout-btn" onClick={handleCheckout}>Proceed to Checkout</button>
                </div>
            </aside>
        </>
    );
}
