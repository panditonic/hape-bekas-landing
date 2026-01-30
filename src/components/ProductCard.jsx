import './ProductCard.css';

export default function ProductCard({ product, onAddToCart, onViewDetails }) {
    const formatPrice = (price) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(price);
    };

    const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

    return (
        <div className="product-card card-elevated">
            <div className="product-image-wrapper">
                <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                    loading="lazy"
                />
                {discount > 0 && (
                    <div className="product-discount">-{discount}%</div>
                )}
                <div className="product-overlay">
                    <button
                        className="btn btn-primary btn-sm"
                        onClick={() => onViewDetails(product)}
                    >
                        👁️ Lihat Detail
                    </button>
                </div>
            </div>

            <div className="product-info">
                <div className="product-header">
                    <span className="product-brand">{product.brand}</span>
                    <span className="badge badge-success">{product.condition}</span>
                </div>

                <h3 className="product-name">{product.name}</h3>

                <div className="product-specs">
                    <span className="spec-item">💾 {product.storage}</span>
                    <span className="spec-item">🔋 {product.battery}</span>
                    <span className="spec-item">⚡ {product.ram}</span>
                </div>

                <div className="product-footer">
                    <div className="product-pricing">
                        {product.originalPrice > product.price && (
                            <span className="original-price">{formatPrice(product.originalPrice)}</span>
                        )}
                        <span className="current-price">{formatPrice(product.price)}</span>
                    </div>

                    <button
                        className="btn btn-primary add-to-cart-btn"
                        onClick={() => onAddToCart(product)}
                        disabled={product.stock === 0}
                    >
                        {product.stock > 0 ? '🛒 Tambah' : '❌ Habis'}
                    </button>
                </div>

                {product.stock > 0 && product.stock <= 3 && (
                    <div className="stock-warning">
                        ⚠️ Stok tersisa {product.stock}
                    </div>
                )}
            </div>
        </div>
    );
}
