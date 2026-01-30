import { useState } from 'react';
import ProductCard from './ProductCard';
import './ProductList.css';
import { categories, brands } from '../data/products';

export default function ProductList({ products, onAddToCart, onViewDetails }) {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedBrand, setSelectedBrand] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredProducts = products.filter(product => {
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
        const matchesBrand = selectedBrand === 'all' || product.brand === selectedBrand;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.brand.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesCategory && matchesBrand && matchesSearch;
    });

    return (
        <section className="product-list-section" id="products">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">
                        <span className="gradient-text">Produk</span> Pilihan
                    </h2>
                    <p className="section-subtitle">
                        Temukan smartphone bekas berkualitas dengan harga terbaik
                    </p>
                </div>

                {/* Filters */}
                <div className="filters-container">
                    {/* Search */}
                    <div className="search-box">
                        <span className="search-icon">🔍</span>
                        <input
                            type="text"
                            className="input search-input"
                            placeholder="Cari produk..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    {/* Category Filter */}
                    <div className="filter-group">
                        <label className="filter-label">Kategori</label>
                        <div className="category-tabs">
                            {categories.map(category => (
                                <button
                                    key={category.id}
                                    className={`category-tab ${selectedCategory === category.id ? 'active' : ''}`}
                                    onClick={() => setSelectedCategory(category.id)}
                                >
                                    <span>{category.icon}</span>
                                    <span>{category.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Brand Filter */}
                    <div className="filter-group">
                        <label className="filter-label">Brand</label>
                        <select
                            className="input brand-select"
                            value={selectedBrand}
                            onChange={(e) => setSelectedBrand(e.target.value)}
                        >
                            {brands.map(brand => (
                                <option key={brand.id} value={brand.id}>
                                    {brand.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Products Grid */}
                <div className="products-grid">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map(product => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onAddToCart={onAddToCart}
                                onViewDetails={onViewDetails}
                            />
                        ))
                    ) : (
                        <div className="no-products">
                            <div className="no-products-icon">🔍</div>
                            <h3>Produk Tidak Ditemukan</h3>
                            <p>Coba ubah filter atau kata kunci pencarian</p>
                        </div>
                    )}
                </div>

                {/* Results Count */}
                {filteredProducts.length > 0 && (
                    <div className="results-count">
                        Menampilkan {filteredProducts.length} dari {products.length} produk
                    </div>
                )}
            </div>
        </section>
    );
}
