import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, CreditCard, QrCode, Banknote, ArrowLeft, ArrowRight, Lock, Building2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Order, PaymentDetails, UserAddress } from '../types/ecommerce';
import { formatRupees } from '../data/ecommerceData';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderCompleted?: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  onOrderCompleted
}) => {
  const { items, subtotal, discount, appliedCoupon, tax, shipping, total, clearCart } = useCart();
  const { user } = useAuth();

  const [step, setStep] = useState<'shipping' | 'payment' | 'confirmation'>('shipping');
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  // Form State with Indian context defaults
  const [address, setAddress] = useState<UserAddress>({
    fullName: user?.address?.fullName || user?.name || 'Alex Chen',
    addressLine1: user?.address?.addressLine1 || '402 Cyber Tech Hub, Indiranagar 100ft Rd',
    addressLine2: user?.address?.addressLine2 || 'Near Metro Station',
    city: user?.address?.city || 'Bengaluru',
    state: user?.address?.state || 'Karnataka',
    postalCode: user?.address?.postalCode || '560038',
    country: user?.address?.country || 'India',
    phone: user?.address?.phone || '+91 98450 12345'
  });

  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod' | 'netbanking'>('upi');
  const [upiId, setUpiId] = useState('alex.chen@okaxis');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '•••• •••• •••• 5421',
    cardHolder: user?.name || 'Alex Chen',
    expiry: '09/29',
    cvv: '•••'
  });
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');

  if (!isOpen) return null;

  const handleNextToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handleExecutePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const orderId = `ORD-IN-${Math.floor(100000 + Math.random() * 900000)}`;
      const payment: PaymentDetails = {
        method: paymentMethod,
        cardLastFour: paymentMethod === 'card' ? '5421' : undefined,
        upiId: paymentMethod === 'upi' ? upiId : undefined,
        transactionId: `tx_upi_${Date.now()}_node`,
        status: 'completed'
      };

      const newOrder: Order = {
        _id: `6650b${Date.now().toString(16)}`,
        orderNumber: orderId,
        userId: user?._id || 'guest_user',
        items: [...items],
        shippingAddress: { ...address },
        payment,
        subtotal,
        discount,
        couponCode: appliedCoupon || undefined,
        tax,
        shippingFee: shipping,
        total,
        status: 'processing',
        createdAt: new Date().toISOString(),
        estimatedDelivery: '2–3 Business Days (Express)'
      };

      setConfirmedOrder(newOrder);
      setIsProcessing(false);
      setStep('confirmation');
      clearCart();
      if (onOrderCompleted) onOrderCompleted(newOrder);
    }, 1200);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/70 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-modal-title"
    >
      <div
        className="relative w-full max-w-2xl rounded-2xl border shadow-2xl overflow-hidden my-6 transition-all"
        style={{
          backgroundColor: 'var(--bg-surface)',
          borderColor: 'var(--border-subtle)',
          boxShadow: 'var(--card-shadow-hover)'
        }}
      >
        {/* Header */}
        <div
          className="p-5 border-b flex items-center justify-between"
          style={{ borderColor: 'var(--border-subtle)' }}
        >
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4" style={{ color: 'var(--accent-primary)' }} />
            <h2 id="checkout-modal-title" className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>
              {step === 'confirmation' ? 'Order Invoice & Receipt' : 'Secure Indian Gateway Checkout'}
            </h2>
          </div>

          {step !== 'confirmation' && (
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg cursor-pointer hover:opacity-70 transition-colors"
              style={{ color: 'var(--text-muted)' }}
              aria-label="Close checkout"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Step Indicator Progress */}
        {step !== 'confirmation' && (
          <div
            className="px-6 py-3 border-b flex items-center justify-between text-xs"
            style={{
              backgroundColor: 'var(--bg-surface-elevated)',
              borderColor: 'var(--border-subtle)'
            }}
          >
            <div className="flex items-center gap-2">
              <span
                className="w-5 h-5 rounded-full flex items-center justify-center font-bold text-[11px]"
                style={{
                  backgroundColor: 'var(--accent-primary)',
                  color: 'var(--accent-contrast)'
                }}
              >
                1
              </span>
              <span className={step === 'shipping' ? 'font-bold' : ''} style={{ color: 'var(--text-primary)' }}>
                Shipping Address
              </span>
            </div>

            <div className="w-8 h-px" style={{ backgroundColor: 'var(--border-strong)' }} />

            <div className="flex items-center gap-2">
              <span
                className="w-5 h-5 rounded-full flex items-center justify-center font-bold text-[11px]"
                style={{
                  backgroundColor: step === 'payment' ? 'var(--accent-primary)' : 'var(--bg-surface-subtle)',
                  color: step === 'payment' ? 'var(--accent-contrast)' : 'var(--text-muted)'
                }}
              >
                2
              </span>
              <span className={step === 'payment' ? 'font-bold' : ''} style={{ color: 'var(--text-primary)' }}>
                Payment Method (INR)
              </span>
            </div>
          </div>
        )}

        {/* Step 1: Shipping Form */}
        {step === 'shipping' && (
          <form onSubmit={handleNextToPayment} className="p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                  Full Recipient Name
                </label>
                <input
                  type="text"
                  required
                  value={address.fullName}
                  onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border focus:outline-none"
                  style={{
                    backgroundColor: 'var(--bg-surface-elevated)',
                    borderColor: 'var(--border-strong)',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                  Mobile Number (for SMS & OTP updates)
                </label>
                <input
                  type="tel"
                  required
                  value={address.phone}
                  onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border focus:outline-none"
                  style={{
                    backgroundColor: 'var(--bg-surface-elevated)',
                    borderColor: 'var(--border-strong)',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                Flat / House / Street Address
              </label>
              <input
                type="text"
                required
                value={address.addressLine1}
                onChange={(e) => setAddress({ ...address, addressLine1: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border focus:outline-none"
                style={{
                  backgroundColor: 'var(--bg-surface-elevated)',
                  borderColor: 'var(--border-strong)',
                  color: 'var(--text-primary)'
                }}
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                  City / District
                </label>
                <input
                  type="text"
                  required
                  value={address.city}
                  onChange={(e) => setAddress({ ...address, city: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border focus:outline-none"
                  style={{
                    backgroundColor: 'var(--bg-surface-elevated)',
                    borderColor: 'var(--border-strong)',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                  State
                </label>
                <input
                  type="text"
                  required
                  value={address.state}
                  onChange={(e) => setAddress({ ...address, state: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border focus:outline-none"
                  style={{
                    backgroundColor: 'var(--bg-surface-elevated)',
                    borderColor: 'var(--border-strong)',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                  PIN Code
                </label>
                <input
                  type="text"
                  required
                  value={address.postalCode}
                  onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border focus:outline-none"
                  style={{
                    backgroundColor: 'var(--bg-surface-elevated)',
                    borderColor: 'var(--border-strong)',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>
            </div>

            {/* Actions */}
            <div
              className="pt-4 border-t flex items-center justify-between mt-6"
              style={{ borderColor: 'var(--border-subtle)' }}
            >
              <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                Total payable: <strong className="tabular-nums font-bold" style={{ color: 'var(--text-primary)' }}>{formatRupees(total)}</strong>
              </div>

              <button
                type="submit"
                className="py-2.5 px-6 rounded-lg text-xs font-bold cursor-pointer transition-all flex items-center gap-2 hover:opacity-90 active:scale-98 shadow-sm"
                style={{
                  backgroundColor: 'var(--accent-primary)',
                  color: 'var(--accent-contrast)'
                }}
              >
                <span>Continue to Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* Step 2: Payment Integration */}
        {step === 'payment' && (
          <div className="p-6 space-y-6">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--text-primary)' }}>
                Select Payment Method (Rupees / INR)
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {/* Option 1: UPI */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                    paymentMethod === 'upi' ? 'ring-2' : ''
                  }`}
                  style={{
                    backgroundColor: 'var(--bg-surface-elevated)',
                    borderColor: paymentMethod === 'upi' ? 'var(--accent-primary)' : 'var(--border-subtle)'
                  }}
                >
                  <QrCode className="w-4 h-4 mb-1.5" style={{ color: 'var(--accent-primary)' }} />
                  <p className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>Instant UPI</p>
                  <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>GPay / PhonePe</p>
                </button>

                {/* Option 2: Cards */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                    paymentMethod === 'card' ? 'ring-2' : ''
                  }`}
                  style={{
                    backgroundColor: 'var(--bg-surface-elevated)',
                    borderColor: paymentMethod === 'card' ? 'var(--accent-primary)' : 'var(--border-subtle)'
                  }}
                >
                  <CreditCard className="w-4 h-4 mb-1.5" style={{ color: 'var(--accent-primary)' }} />
                  <p className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>Debit / Credit</p>
                  <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>RuPay / Visa / MC</p>
                </button>

                {/* Option 3: Net Banking */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                    paymentMethod === 'netbanking' ? 'ring-2' : ''
                  }`}
                  style={{
                    backgroundColor: 'var(--bg-surface-elevated)',
                    borderColor: paymentMethod === 'netbanking' ? 'var(--accent-primary)' : 'var(--border-subtle)'
                  }}
                >
                  <Building2 className="w-4 h-4 mb-1.5" style={{ color: 'var(--accent-primary)' }} />
                  <p className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>Net Banking</p>
                  <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>Top Indian Banks</p>
                </button>

                {/* Option 4: COD */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                    paymentMethod === 'cod' ? 'ring-2' : ''
                  }`}
                  style={{
                    backgroundColor: 'var(--bg-surface-elevated)',
                    borderColor: paymentMethod === 'cod' ? 'var(--accent-primary)' : 'var(--border-subtle)'
                  }}
                >
                  <Banknote className="w-4 h-4 mb-1.5" style={{ color: 'var(--accent-primary)' }} />
                  <p className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>Pay on Delivery</p>
                  <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>Cash / QR on arrival</p>
                </button>
              </div>
            </div>

            {/* Method Details */}
            {paymentMethod === 'upi' && (
              <div
                className="p-4 rounded-xl border space-y-3"
                style={{ backgroundColor: 'var(--bg-surface-elevated)', borderColor: 'var(--border-subtle)' }}
              >
                <label className="block text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>
                  Virtual Payment Address (VPA / UPI ID)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs rounded-lg border font-mono"
                    style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-strong)', color: 'var(--text-primary)' }}
                  />
                  <span className="px-3 py-2 rounded-lg text-xs font-medium border flex items-center" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', color: 'var(--accent-primary)' }}>
                    Verified UPI
                  </span>
                </div>
                <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
                  Accepts Google Pay, PhonePe, Paytm, BHIM, and all Indian bank UPI apps.
                </p>
              </div>
            )}

            {paymentMethod === 'card' && (
              <div
                className="p-4 rounded-xl border space-y-3"
                style={{ backgroundColor: 'var(--bg-surface-elevated)', borderColor: 'var(--border-subtle)' }}
              >
                <div>
                  <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>
                    Card Number (RuPay, Visa, MasterCard)
                  </label>
                  <input
                    type="text"
                    value={cardDetails.cardNumber}
                    onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border font-mono"
                    style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-strong)', color: 'var(--text-primary)' }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>
                      Valid Thru (MM/YY)
                    </label>
                    <input
                      type="text"
                      value={cardDetails.expiry}
                      onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border font-mono"
                      style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-strong)', color: 'var(--text-primary)' }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>
                      CVV
                    </label>
                    <input
                      type="password"
                      value={cardDetails.cvv}
                      onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border font-mono"
                      style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-strong)', color: 'var(--text-primary)' }}
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'netbanking' && (
              <div
                className="p-4 rounded-xl border space-y-3"
                style={{ backgroundColor: 'var(--bg-surface-elevated)', borderColor: 'var(--border-subtle)' }}
              >
                <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>
                  Choose Your Bank
                </label>
                <select
                  value={selectedBank}
                  onChange={(e) => setSelectedBank(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border"
                  style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-strong)', color: 'var(--text-primary)' }}
                >
                  <option value="HDFC Bank">HDFC Bank</option>
                  <option value="State Bank of India">State Bank of India (SBI)</option>
                  <option value="ICICI Bank">ICICI Bank</option>
                  <option value="Axis Bank">Axis Bank</option>
                  <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
                  <option value="Punjab National Bank">Punjab National Bank</option>
                </select>
              </div>
            )}

            {paymentMethod === 'cod' && (
              <div
                className="p-4 rounded-xl border text-xs leading-relaxed"
                style={{ backgroundColor: 'var(--bg-surface-elevated)', borderColor: 'var(--border-subtle)', color: 'var(--text-secondary)' }}
              >
                <p className="font-semibold text-slate-900 dark:text-slate-100 mb-1">Doorstep Cash / QR Verification</p>
                <p>
                  Pay <strong className="tabular-nums" style={{ color: 'var(--accent-primary)' }}>{formatRupees(total)}</strong> to the delivery agent via Cash or UPI QR upon receiving your parcel in {address.city}.
                </p>
              </div>
            )}

            {/* Actions */}
            <div
              className="pt-4 border-t flex items-center justify-between"
              style={{ borderColor: 'var(--border-subtle)' }}
            >
              <button
                type="button"
                onClick={() => setStep('shipping')}
                className="flex items-center gap-1.5 text-xs font-medium cursor-pointer hover:underline"
                style={{ color: 'var(--text-secondary)' }}
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Shipping</span>
              </button>

              <button
                type="button"
                disabled={isProcessing}
                onClick={handleExecutePayment}
                className="py-2.5 px-6 rounded-lg text-xs font-bold cursor-pointer transition-all flex items-center gap-2 hover:opacity-90 active:scale-98 shadow-sm disabled:opacity-50"
                style={{
                  backgroundColor: 'var(--accent-primary)',
                  color: 'var(--accent-contrast)',
                  boxShadow: '0 4px 14px var(--accent-glow)'
                }}
              >
                {isProcessing ? (
                  <span>Verifying Payment...</span>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Pay {formatRupees(total)}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Order Confirmation */}
        {step === 'confirmation' && confirmedOrder && (
          <div className="p-8 text-center space-y-5">
            <div
              className="w-16 h-16 rounded-full mx-auto flex items-center justify-center"
              style={{ backgroundColor: 'var(--accent-soft)' }}
            >
              <CheckCircle2 className="w-8 h-8" style={{ color: 'var(--accent-primary)' }} />
            </div>

            <div>
              <span className="text-xs uppercase tracking-wider font-semibold" style={{ color: 'var(--accent-primary)' }}>
                Order #{confirmedOrder.orderNumber} Confirmed
              </span>
              <h3 className="text-2xl font-bold tracking-tight mt-1" style={{ color: 'var(--text-primary)' }}>
                Dhanyavaad! Your order has been placed.
              </h3>
              <p className="text-xs mt-2 max-w-md mx-auto" style={{ color: 'var(--text-secondary)' }}>
                A confirmation SMS and email have been dispatched. MongoDB order document created with
                transaction ref <code className="font-mono">{confirmedOrder.payment.transactionId}</code>.
              </p>
            </div>

            {/* Receipt Summary Box */}
            <div
              className="max-w-md mx-auto rounded-xl border p-4 text-xs text-left space-y-2"
              style={{ backgroundColor: 'var(--bg-surface-elevated)', borderColor: 'var(--border-subtle)' }}
            >
              <div className="flex justify-between font-semibold" style={{ color: 'var(--text-primary)' }}>
                <span>Delivery Address</span>
                <span>{confirmedOrder.shippingAddress.fullName}</span>
              </div>
              <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
                {confirmedOrder.shippingAddress.addressLine1}, {confirmedOrder.shippingAddress.city},{' '}
                {confirmedOrder.shippingAddress.postalCode}
              </p>
              <div className="border-t pt-2 flex justify-between" style={{ borderColor: 'var(--border-subtle)' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Estimated Delivery</span>
                <span className="font-semibold" style={{ color: 'var(--accent-primary)' }}>
                  {confirmedOrder.estimatedDelivery}
                </span>
              </div>
              <div className="flex justify-between" style={{ color: 'var(--text-secondary)' }}>
                <span>Payment Mode</span>
                <span className="font-mono uppercase">{confirmedOrder.payment.method}</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-bold" style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }}>
                <span>Total Amount Paid</span>
                <span className="tabular-nums" style={{ color: 'var(--accent-primary)' }}>
                  {formatRupees(confirmedOrder.total)}
                </span>
              </div>
            </div>

            <div>
              <button
                type="button"
                onClick={onClose}
                className="py-2.5 px-8 rounded-lg text-xs font-bold cursor-pointer transition-all hover:opacity-90 active:scale-98 shadow-sm"
                style={{
                  backgroundColor: 'var(--accent-primary)',
                  color: 'var(--accent-contrast)'
                }}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
