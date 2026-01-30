import { useState } from 'react';
import './Checkout.css';

export default function Checkout({ isOpen, onClose, cartItems, onPaymentSuccess }) {
    const [step, setStep] = useState(1); // 1: Form, 2: Payment Method, 3: Virtual Account
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    });
    const [selectedBank, setSelectedBank] = useState(null);
    const [vaNumber, setVaNumber] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    const banks = [
        { id: 'bca', name: 'BCA', icon: '🏦', color: '#0066CC' },
        { id: 'mandiri', name: 'Mandiri', icon: '🏦', color: '#FFB800' },
        { id: 'bni', name: 'BNI', icon: '🏦', color: '#FF6B00' },
        { id: 'bri', name: 'BRI', icon: '🏦', color: '#0066CC' }
    ];

    const formatPrice = (price) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(price);
    };

    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.11;
    const total = subtotal + tax;

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setStep(2);
    };

    const handleBankSelect = (bank) => {
        setSelectedBank(bank);
        setIsProcessing(true);

        // Simulate VA number generation
        setTimeout(() => {
            const randomVA = bank.id.toUpperCase() + Math.floor(Math.random() * 10000000000000).toString().padStart(13, '0');
            setVaNumber(randomVA);
            setStep(3);
            setIsProcessing(false);
        }, 1500);
    };

    const handleCopyVA = () => {
        navigator.clipboard.writeText(vaNumber);
        alert('Nomor Virtual Account berhasil disalin!');
    };

    const handlePaymentConfirm = () => {
        setIsProcessing(true);

        // Simulate payment verification
        setTimeout(() => {
            onPaymentSuccess({
                vaNumber,
                bank: selectedBank,
                amount: total,
                customerInfo: formData
            });
            setIsProcessing(false);
        }, 2000);
    };

    if (!isOpen) return null;

    return (
        <>
            <div className="checkout-overlay active" onClick={onClose} />

            <div className="checkout-modal open">
                <div className="checkout-header">
                    <h2>💳 Checkout</h2>
                    <button className="btn btn-icon" onClick={onClose}>✕</button>
                </div>

                <div className="checkout-body">
                    {/* Step Indicator */}
                    <div className="step-indicator">
                        <div className={`step ${step >= 1 ? 'active' : ''}`}>
                            <div className="step-number">1</div>
                            <div className="step-label">Data Diri</div>
                        </div>
                        <div className="step-line"></div>
                        <div className={`step ${step >= 2 ? 'active' : ''}`}>
                            <div className="step-number">2</div>
                            <div className="step-label">Pembayaran</div>
                        </div>
                        <div className="step-line"></div>
                        <div className={`step ${step >= 3 ? 'active' : ''}`}>
                            <div className="step-number">3</div>
                            <div className="step-label">Konfirmasi</div>
                        </div>
                    </div>

                    {/* Step 1: Customer Form */}
                    {step === 1 && (
                        <form onSubmit={handleFormSubmit} className="checkout-form fade-in">
                            <h3>📋 Informasi Pembeli</h3>

                            <div className="form-group">
                                <label>Nama Lengkap *</label>
                                <input
                                    type="text"
                                    className="input"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                    placeholder="Masukkan nama lengkap"
                                />
                            </div>

                            <div className="form-group">
                                <label>Email *</label>
                                <input
                                    type="email"
                                    className="input"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                    placeholder="email@example.com"
                                />
                            </div>

                            <div className="form-group">
                                <label>Nomor Telepon *</label>
                                <input
                                    type="tel"
                                    className="input"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    required
                                    placeholder="08xxxxxxxxxx"
                                />
                            </div>

                            <div className="form-group">
                                <label>Alamat Lengkap *</label>
                                <textarea
                                    className="input"
                                    rows="3"
                                    value={formData.address}
                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                    required
                                    placeholder="Masukkan alamat lengkap untuk pengiriman"
                                />
                            </div>

                            <div className="order-summary">
                                <h4>📦 Ringkasan Pesanan</h4>
                                <div className="summary-items">
                                    {cartItems.map(item => (
                                        <div key={item.id} className="summary-item">
                                            <span>{item.name} x{item.quantity}</span>
                                            <span>{formatPrice(item.price * item.quantity)}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="divider"></div>
                                <div className="summary-total">
                                    <span>Total Pembayaran</span>
                                    <span className="total-amount">{formatPrice(total)}</span>
                                </div>
                            </div>

                            <button type="submit" className="btn btn-primary btn-lg w-full">
                                Lanjut ke Pembayaran →
                            </button>
                        </form>
                    )}

                    {/* Step 2: Payment Method Selection */}
                    {step === 2 && (
                        <div className="payment-selection fade-in">
                            <h3>🏦 Pilih Metode Pembayaran</h3>
                            <p className="payment-subtitle">Transfer via Virtual Account</p>

                            <div className="bank-grid">
                                {banks.map(bank => (
                                    <button
                                        key={bank.id}
                                        className="bank-card"
                                        onClick={() => handleBankSelect(bank)}
                                        disabled={isProcessing}
                                    >
                                        <div className="bank-icon" style={{ color: bank.color }}>
                                            {bank.icon}
                                        </div>
                                        <div className="bank-name">{bank.name}</div>
                                    </button>
                                ))}
                            </div>

                            {isProcessing && (
                                <div className="processing">
                                    <div className="spinner"></div>
                                    <p>Membuat nomor Virtual Account...</p>
                                </div>
                            )}

                            <button
                                className="btn btn-secondary w-full"
                                onClick={() => setStep(1)}
                                disabled={isProcessing}
                            >
                                ← Kembali
                            </button>
                        </div>
                    )}

                    {/* Step 3: Virtual Account Display */}
                    {step === 3 && (
                        <div className="va-display fade-in">
                            <div className="va-header">
                                <div className="bank-logo" style={{ color: selectedBank.color }}>
                                    {selectedBank.icon}
                                </div>
                                <h3>Virtual Account {selectedBank.name}</h3>
                            </div>

                            <div className="va-card">
                                <label>Nomor Virtual Account</label>
                                <div className="va-number-display">
                                    <span className="va-number">{vaNumber}</span>
                                    <button className="btn btn-sm" onClick={handleCopyVA}>
                                        📋 Salin
                                    </button>
                                </div>
                            </div>

                            <div className="payment-amount-card">
                                <label>Total Pembayaran</label>
                                <div className="payment-amount">{formatPrice(total)}</div>
                            </div>

                            <div className="payment-instructions">
                                <h4>📝 Cara Pembayaran</h4>
                                <ol>
                                    <li>Buka aplikasi mobile banking atau ATM {selectedBank.name}</li>
                                    <li>Pilih menu Transfer / Bayar</li>
                                    <li>Pilih Virtual Account</li>
                                    <li>Masukkan nomor VA: <strong>{vaNumber}</strong></li>
                                    <li>Masukkan nominal: <strong>{formatPrice(total)}</strong></li>
                                    <li>Konfirmasi pembayaran</li>
                                </ol>
                            </div>

                            <div className="payment-info">
                                <p>⏰ Selesaikan pembayaran dalam <strong>24 jam</strong></p>
                                <p>📧 Bukti pembayaran akan dikirim ke email Anda</p>
                            </div>

                            <button
                                className="btn btn-primary btn-lg w-full"
                                onClick={handlePaymentConfirm}
                                disabled={isProcessing}
                            >
                                {isProcessing ? (
                                    <>
                                        <div className="spinner"></div>
                                        Memverifikasi Pembayaran...
                                    </>
                                ) : (
                                    '✓ Saya Sudah Bayar'
                                )}
                            </button>

                            <button
                                className="btn btn-secondary w-full"
                                onClick={() => setStep(2)}
                                disabled={isProcessing}
                            >
                                ← Ganti Metode Pembayaran
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
