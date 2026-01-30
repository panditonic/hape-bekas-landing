import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import PaymentSuccess from './components/PaymentSuccess';
import { products } from './data/products';
import './App.css';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
  const [isPaymentSuccessOpen, setIsPaymentSuccessOpen] = useState(false);
  const [paymentData, setPaymentData] = useState(null);

  // Add to cart
  const handleAddToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id);

    if (existingItem) {
      // Update quantity if item already in cart
      if (existingItem.quantity < product.stock) {
        setCartItems(cartItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ));
        showNotification(`${product.name} ditambahkan ke keranjang`);
      } else {
        showNotification(`Stok ${product.name} tidak mencukupi`);
      }
    } else {
      // Add new item to cart
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
      showNotification(`${product.name} ditambahkan ke keranjang`);
    }
  };

  // Update cart item quantity
  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      handleRemoveItem(productId);
      return;
    }

    setCartItems(cartItems.map(item =>
      item.id === productId
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  // Remove item from cart
  const handleRemoveItem = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
    showNotification('Produk dihapus dari keranjang');
  };

  // View product details
  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setIsProductDetailOpen(true);
  };

  // Checkout
  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  // Payment success
  const handlePaymentSuccess = (data) => {
    setPaymentData(data);
    setIsCheckoutOpen(false);
    setIsPaymentSuccessOpen(true);
    setCartItems([]); // Clear cart after successful payment
  };

  // Close payment success and reset
  const handleClosePaymentSuccess = () => {
    setIsPaymentSuccessOpen(false);
    setPaymentData(null);
  };

  // Show notification (simple alert for now)
  const showNotification = (message) => {
    // You can replace this with a toast notification library
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.add('show');
    }, 10);

    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  };

  // Scroll to top
  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app">
      <Header
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setIsCartOpen(true)}
        onLogoClick={handleLogoClick}
      />

      <main>
        <Hero />

        <ProductList
          products={products}
          onAddToCart={handleAddToCart}
          onViewDetails={handleViewDetails}
        />

        {/* About Section */}
        <section id="about" className="about-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">
                <span className="gradient-text">Tentang</span> Kami
              </h2>
              <p className="section-subtitle">
                Platform jual beli handphone bekas terpercaya di Indonesia
              </p>
            </div>

            <div className="about-content">
              <div className="about-grid">
                <div className="about-card">
                  <div className="about-icon">✅</div>
                  <h3>Kualitas Terjamin</h3>
                  <p>Setiap produk telah melalui quality control ketat untuk memastikan kondisi terbaik</p>
                </div>

                <div className="about-card">
                  <div className="about-icon">🔒</div>
                  <h3>Transaksi Aman</h3>
                  <p>Sistem pembayaran yang aman dan terpercaya dengan berbagai metode pembayaran</p>
                </div>

                <div className="about-card">
                  <div className="about-icon">🎁</div>
                  <h3>Garansi Resmi</h3>
                  <p>Semua produk dilengkapi dengan garansi untuk memberikan rasa aman kepada pembeli</p>
                </div>

                <div className="about-card">
                  <div className="about-icon">🚚</div>
                  <h3>Pengiriman Cepat</h3>
                  <p>Pengiriman ke seluruh Indonesia dengan packaging aman dan tracking real-time</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="contact-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">
                <span className="gradient-text">Hubungi</span> Kami
              </h2>
              <p className="section-subtitle">
                Ada pertanyaan? Kami siap membantu Anda
              </p>
            </div>

            <div className="contact-content">
              <div className="contact-info">
                <div className="contact-card">
                  <div className="contact-icon">📧</div>
                  <h4>Email</h4>
                  <p>info@hapebekas.com</p>
                  <a href="mailto:info@hapebekas.com" className="contact-link">Kirim Email →</a>
                </div>

                <div className="contact-card">
                  <div className="contact-icon">📞</div>
                  <h4>Telepon</h4>
                  <p>+62 812-3456-7890</p>
                  <a href="tel:+6281234567890" className="contact-link">Hubungi Kami →</a>
                </div>

                <div className="contact-card">
                  <div className="contact-icon">💬</div>
                  <h4>WhatsApp</h4>
                  <p>Chat langsung dengan CS</p>
                  <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="contact-link">Chat Sekarang →</a>
                </div>
              </div>

              <div className="contact-form-container">
                <form className="contact-form" onSubmit={(e) => { e.preventDefault(); alert('Terima kasih! Pesan Anda telah dikirim.'); }}>
                  <div className="form-group">
                    <label>Nama</label>
                    <input type="text" className="input" placeholder="Nama lengkap Anda" required />
                  </div>

                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="input" placeholder="email@example.com" required />
                  </div>

                  <div className="form-group">
                    <label>Subjek</label>
                    <input type="text" className="input" placeholder="Subjek pesan" required />
                  </div>

                  <div className="form-group">
                    <label>Pesan</label>
                    <textarea className="input" rows="5" placeholder="Tulis pesan Anda..." required></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary btn-lg w-full">
                    📤 Kirim Pesan
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3 className="footer-title">
                <span className="gradient-text">Hape</span>Bekas
              </h3>
              <p className="footer-description">
                Platform jual beli handphone bekas terpercaya dengan kualitas terjamin dan harga terbaik.
              </p>
            </div>

            <div className="footer-section">
              <h4>Layanan</h4>
              <ul className="footer-links">
                <li><a href="#products">Produk</a></li>
                <li><a href="#about">Tentang Kami</a></li>
                <li><a href="#contact">Kontak</a></li>
                <li><a href="#faq">FAQ</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h4>Bantuan</h4>
              <ul className="footer-links">
                <li><a href="#shipping">Pengiriman</a></li>
                <li><a href="#returns">Pengembalian</a></li>
                <li><a href="#warranty">Garansi</a></li>
                <li><a href="#payment">Pembayaran</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h4>Hubungi Kami</h4>
              <ul className="footer-contact">
                <li>📧 info@hapebekas.com</li>
                <li>📞 +62 812-3456-7890</li>
                <li>📍 Jakarta, Indonesia</li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2026 HapeBekas. All rights reserved.</p>
            <div className="footer-social">
              <a href="#instagram" className="social-link">📷</a>
              <a href="#facebook" className="social-link">👥</a>
              <a href="#twitter" className="social-link">🐦</a>
              <a href="#whatsapp" className="social-link">💬</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />

      <ProductDetail
        product={selectedProduct}
        isOpen={isProductDetailOpen}
        onClose={() => setIsProductDetailOpen(false)}
        onAddToCart={handleAddToCart}
      />

      <Checkout
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        onPaymentSuccess={handlePaymentSuccess}
      />

      <PaymentSuccess
        isOpen={isPaymentSuccessOpen}
        onClose={handleClosePaymentSuccess}
        paymentData={paymentData}
      />
    </div>
  );
}

export default App;
