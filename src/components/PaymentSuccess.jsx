import './PaymentSuccess.css';

export default function PaymentSuccess({ isOpen, onClose, paymentData }) {
    if (!isOpen || !paymentData) return null;

    const formatPrice = (price) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(price);
    };

    return (
        <>
            <div className="success-overlay active" onClick={onClose} />

            <div className="success-modal open">
                <div className="success-animation">
                    <div className="success-checkmark">
                        <div className="check-icon">
                            <span className="icon-line line-tip"></span>
                            <span className="icon-line line-long"></span>
                            <div className="icon-circle"></div>
                            <div className="icon-fix"></div>
                        </div>
                    </div>
                </div>

                <div className="success-content">
                    <h2 className="success-title">🎉 Pembayaran Berhasil!</h2>
                    <p className="success-message">
                        Terima kasih telah berbelanja di HapeBekas.
                        Pesanan Anda sedang diproses.
                    </p>

                    <div className="payment-details">
                        <h3>📄 Detail Pembayaran</h3>

                        <div className="detail-row">
                            <span className="detail-label">Bank</span>
                            <span className="detail-value">{paymentData.bank?.name}</span>
                        </div>

                        <div className="detail-row">
                            <span className="detail-label">Virtual Account</span>
                            <span className="detail-value va-number">{paymentData.vaNumber}</span>
                        </div>

                        <div className="detail-row">
                            <span className="detail-label">Total Pembayaran</span>
                            <span className="detail-value amount">{formatPrice(paymentData.amount)}</span>
                        </div>

                        <div className="divider"></div>

                        <div className="detail-row">
                            <span className="detail-label">Nama</span>
                            <span className="detail-value">{paymentData.customerInfo?.name}</span>
                        </div>

                        <div className="detail-row">
                            <span className="detail-label">Email</span>
                            <span className="detail-value">{paymentData.customerInfo?.email}</span>
                        </div>
                    </div>

                    <div className="success-info">
                        <p>📧 Bukti pembayaran telah dikirim ke email Anda</p>
                        <p>📦 Pesanan akan dikirim dalam 1-2 hari kerja</p>
                        <p>📞 Hubungi customer service jika ada pertanyaan</p>
                    </div>

                    <div className="success-actions">
                        <button className="btn btn-primary btn-lg w-full" onClick={onClose}>
                            ✓ Selesai
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
