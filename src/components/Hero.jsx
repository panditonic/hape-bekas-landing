import './Hero.css';

export default function Hero() {
    return (
        <section className="hero" id="home">
            <div className="hero-bg">
                <div className="hero-gradient"></div>
                <div className="hero-grid"></div>
            </div>

            <div className="container">
                <div className="hero-content">
                    <div className="hero-badge fade-in">
                        <span className="badge badge-primary">✨ Platform Terpercaya</span>
                    </div>

                    <h1 className="hero-title fade-in">
                        Jual Beli <span className="gradient-text">Handphone Bekas</span>
                        <br />
                        Berkualitas & Terpercaya
                    </h1>

                    <p className="hero-description fade-in">
                        Dapatkan smartphone impianmu dengan harga terbaik.
                        Semua produk sudah dicek kualitasnya dan bergaransi resmi.
                    </p>

                    <div className="hero-actions fade-in">
                        <a href="#products" className="btn btn-primary btn-lg">
                            🛍️ Lihat Produk
                        </a>
                        <a href="#about" className="btn btn-outline btn-lg">
                            📖 Pelajari Lebih Lanjut
                        </a>
                    </div>

                    <div className="hero-stats fade-in">
                        <div className="stat-item">
                            <div className="stat-value">500+</div>
                            <div className="stat-label">Produk Terjual</div>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <div className="stat-value">98%</div>
                            <div className="stat-label">Kepuasan Pelanggan</div>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <div className="stat-value">24/7</div>
                            <div className="stat-label">Customer Support</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
