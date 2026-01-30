import { useState, useEffect } from 'react';
import './Cart.css';

export default function Cart({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, onCheckout }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
        } else {
            setTimeout(() => setIsVisible(false), 300);
        }
    }, [isOpen]);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(price);
    };

    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.11; // PPN 11%
    const total = subtotal + tax;

    if (!isVisible) return null;

    return (
        <>
            <div
                className={`cart-overlay ${isOpen ? 'active' : ''}`}
                onClick={onClose}
            />

            <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
                <div className="cart-header">
                    <h2>🛒 Keranjang Belanja</h2>
                    <button className="btn btn-icon" onClick={onClose}>
                        ✕
                    </button>
                </div>

                <div className="cart-body">
                    {cartItems.length === 0 ? (
                        <div className="cart-empty">
                            <div className="empty-icon">🛍️</div>
                            <h3>Keranjang Kosong</h3>
                            <p>Belum ada produk yang ditambahkan</p>
                            <button className="btn btn-primary" onClick={onClose}>
                                Mulai Belanja
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="cart-items">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="cart-item">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="cart-item-image"
                                        />

                                        <div className="cart-item-info">
                                            <h4 className="cart-item-name">{item.name}</h4>
                                            <p className="cart-item-specs">
                                                {item.storage} • {item.condition}
                                            </p>
                                            <p className="cart-item-price">{formatPrice(item.price)}</p>
                                        </div>

                                        <div className="cart-item-actions">
                                            <div className="quantity-controls">
                                                <button
                                                    className="btn btn-icon btn-sm"
                                                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                                    disabled={item.quantity <= 1}
                                                >
                                                    −
                                                </button>
                                                <span className="quantity">{item.quantity}</span>
                                                <button
                                                    className="btn btn-icon btn-sm"
                                                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                                    disabled={item.quantity >= item.stock}
                                                >
                                                    +
                                                </button>
                                            </div>

                                            <button
                                                className="btn btn-icon btn-sm remove-btn"
                                                onClick={() => onRemoveItem(item.id)}
                                                title="Hapus"
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="cart-summary">
                                <div className="summary-row">
                                    <span>Subtotal</span>
                                    <span>{formatPrice(subtotal)}</span>
                                </div>
                                <div className="summary-row">
                                    <span>PPN (11%)</span>
                                    <span>{formatPrice(tax)}</span>
                                </div>
                                <div className="divider"></div>
                                <div className="summary-row total">
                                    <span>Total</span>
                                    <span className="total-price">{formatPrice(total)}</span>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {cartItems.length > 0 && (
                    <div className="cart-footer">
                        <button
                            className="btn btn-primary btn-lg w-full"
                            onClick={onCheckout}
                        >
                            💳 Checkout ({cartItems.length} item)
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
