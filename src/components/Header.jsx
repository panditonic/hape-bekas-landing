import { useState } from 'react';
import './Header.css';

export default function Header({ cartCount, onCartClick, onLogoClick }) {
    const [isScrolled, setIsScrolled] = useState(false);

    // Handle scroll effect
    if (typeof window !== 'undefined') {
        window.addEventListener('scroll', () => {
            setIsScrolled(window.scrollY > 20);
        });
    }

    // Handle search click - scroll to products and focus search
    const handleSearchClick = () => {
        const productsSection = document.getElementById('products');
        const searchInput = document.querySelector('.search-input');

        if (productsSection) {
            productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

            // Focus search input after scroll
            setTimeout(() => {
                if (searchInput) {
                    searchInput.focus();
                }
            }, 500);
        }
    };

    return (
        <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
            <div className="container">
                <div className="header-content">
                    <div className="logo" onClick={onLogoClick}>
                        <span className="logo-icon">📱</span>
                        <span className="logo-text">
                            <span className="gradient-text">Hape</span>Bekas
                        </span>
                    </div>

                    <nav className="nav">
                        <a href="#home" className="nav-link">Beranda</a>
                        <a href="#products" className="nav-link">Produk</a>
                        <a href="#about" className="nav-link">Tentang</a>
                        <a href="#contact" className="nav-link">Kontak</a>
                    </nav>

                    <div className="header-actions">
                        <button
                            className="btn btn-icon search-btn"
                            onClick={handleSearchClick}
                            title="Cari"
                        >
                            🔍
                        </button>
                        <button
                            className="btn btn-icon cart-btn"
                            onClick={onCartClick}
                            title="Keranjang"
                        >
                            🛒
                            {cartCount > 0 && (
                                <span className="cart-badge">{cartCount}</span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
