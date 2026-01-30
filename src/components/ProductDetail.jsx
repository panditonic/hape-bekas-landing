import './ProductDetail.css';

export default function ProductDetail({ product, isOpen, onClose, onAddToCart }) {
    if (!isOpen || !product) return null;

    const formatPrice = (price) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(price);
    };

    const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

    return (
        <>
            <div className="product-detail-overlay active" onClick={onClose} />

            <div className="product-detail-modal open">
                <button className="close-btn btn btn-icon" onClick={onClose}>
                    ✕
                </button>

                <div className="product-detail-content">
                    <div className="product-detail-image-section">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="product-detail-image"
                        />
                        {discount > 0 && (
                            <div className="detail-discount-badge">
                                Hemat {discount}%
                            </div>
                        )}
                    </div>

                    <div className="product-detail-info-section">
                        <div className="detail-header">
                            <span className="detail-brand">{product.brand}</span>
                            <span className="badge badge-success">{product.condition}</span>
                        </div>

                        <h2 className="detail-title">{product.name}</h2>

                        <div className="detail-pricing">
                            {product.originalPrice > product.price && (
                                <span className="detail-original-price">{formatPrice(product.originalPrice)}</span>
                            )}
                            <span className="detail-current-price">{formatPrice(product.price)}</span>
                        </div>

                        <div className="detail-specs-grid">
                            <div className="spec-card">
                                <div className="spec-icon">💾</div>
                                <div className="spec-info">
                                    <div className="spec-label">Storage</div>
                                    <div className="spec-value">{product.storage}</div>
                                </div>
                            </div>

                            <div className="spec-card">
                                <div className="spec-icon">⚡</div>
                                <div className="spec-info">
                                    <div className="spec-label">RAM</div>
                                    <div className="spec-value">{product.ram}</div>
                                </div>
                            </div>

                            <div className="spec-card">
                                <div className="spec-icon">🔋</div>
                                <div className="spec-info">
                                    <div className="spec-label">Battery Health</div>
                                    <div className="spec-value">{product.battery}</div>
                                </div>
                            </div>

                            <div className="spec-card">
                                <div className="spec-icon">📦</div>
                                <div className="spec-info">
                                    <div className="spec-label">Stock</div>
                                    <div className="spec-value">{product.stock} unit</div>
                                </div>
                            </div>

                            <div className="spec-card">
                                <div className="spec-icon">🛡️</div>
                                <div className="spec-info">
                                    <div className="spec-label">Garansi</div>
                                    <div className="spec-value">{product.warranty}</div>
                                </div>
                            </div>

                            <div className="spec-card">
                                <div className="spec-icon">✨</div>
                                <div className="spec-info">
                                    <div className="spec-label">Kondisi</div>
                                    <div className="spec-value">{product.condition}</div>
                                </div>
                            </div>
                        </div>

                        <div className="detail-description">
                            <h3>📝 Deskripsi Produk</h3>
                            <p>{product.description}</p>
                        </div>

                        <div className="detail-features">
                            <h3>✓ Yang Kamu Dapatkan</h3>
                            <ul>
                                <li>Unit handphone dalam kondisi {product.condition.toLowerCase()}</li>
                                <li>Garansi toko {product.warranty}</li>
                                <li>Sudah dicek dan dites fungsinya</li>
                                <li>Gratis ongkir untuk pembelian di atas Rp 5.000.000</li>
                                <li>Bisa tukar tambah dengan HP lama kamu</li>
                            </ul>
                        </div>

                        <div className="detail-actions">
                            <button
                                className="btn btn-primary btn-lg"
                                onClick={() => {
                                    onAddToCart(product);
                                    onClose();
                                }}
                                disabled={product.stock === 0}
                            >
                                {product.stock > 0 ? '🛒 Tambah ke Keranjang' : '❌ Stok Habis'}
                            </button>

                            <button className="btn btn-outline btn-lg">
                                💬 Chat Penjual
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
