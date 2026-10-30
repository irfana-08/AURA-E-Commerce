import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, Tag, ShoppingBag, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatRupees } from '../data/ecommerceData';

interface CartDrawerProps {
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onProceedToCheckout }) => {
  const {
    items,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    discount,
    appliedCoupon,
    couponError,
    applyCoupon,
    removeCoupon,
    tax,
    shipping,
    total,
    isCartOpen,
    closeCart,
    freeShippingThreshold,
    amountNeededForFreeShipping
  } = useCart();

  const [couponInput, setCouponInput] = useState('');

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (applyCoupon(couponInput)) {
      setCouponInput('');
    }
  };

  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Cart Drawer"
      onClick={closeCart}
    >
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div
          className="w-screen max-w-md flex flex-col border-l shadow-2xl transition-transform"
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--border-subtle)'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div
            className="p-5 border-b flex items-center justify-between"
            style={{ borderColor: 'var(--border-subtle)' }}
          >
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5" style={{ color: 'var(--accent-primary)' }} />
              <h2 className="text-base font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
                Your Cart ({items.reduce((s, i) => s + i.quantity, 0)})
              </h2>
            </div>

            <button
              type="button"
              onClick={closeCart}
              className="p-2 rounded-lg cursor-pointer transition-colors hover:opacity-70"
              style={{ color: 'var(--text-muted)' }}
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress in Rupees */}
          <div
            className="px-5 py-3 border-b text-xs"
            style={{
              backgroundColor: 'var(--bg-surface-elevated)',
              borderColor: 'var(--border-subtle)'
            }}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="flex items-center gap-1.5 font-medium" style={{ color: 'var(--text-primary)' }}>
                <Truck className="w-4 h-4" style={{ color: 'var(--accent-primary)' }} />
                {amountNeededForFreeShipping === 0 ? (
                  <span className="font-semibold" style={{ color: 'var(--accent-primary)' }}>
                    Qualified for Free Express Delivery across India!
                  </span>
                ) : (
                  <span>
                    Add <strong className="tabular-nums">{formatRupees(amountNeededForFreeShipping)}</strong> more for FREE shipping
                  </span>
                )}
              </span>
              <span className="tabular-nums font-semibold" style={{ color: 'var(--accent-primary)' }}>
                {freeShippingProgress}%
              </span>
            </div>
            <div
              className="w-full h-1.5 rounded-full overflow-hidden"
              style={{ backgroundColor: 'var(--border-subtle)' }}
            >
              <div
                className="h-full transition-all duration-300"
                style={{
                  width: `${freeShippingProgress}%`,
                  backgroundColor: 'var(--accent-primary)'
                }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y" style={{ borderColor: 'var(--border-subtle)' }}>
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                  style={{ backgroundColor: 'var(--bg-surface-subtle)' }}
                >
                  <ShoppingBag className="w-8 h-8" style={{ color: 'var(--text-muted)' }} />
                </div>
                <h3 className="text-base font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
                  Your cart is empty
                </h3>
                <p className="text-xs mb-6 max-w-xs" style={{ color: 'var(--text-secondary)' }}>
                  Explore wireless gaming earbuds, USB-to-LAN adapters, Hi-Fi players, and developer gear.
                </p>
                <button
                  type="button"
                  onClick={closeCart}
                  className="px-5 py-2.5 rounded-lg text-xs font-semibold cursor-pointer transition-all hover:opacity-90"
                  style={{
                    backgroundColor: 'var(--accent-primary)',
                    color: 'var(--accent-contrast)'
                  }}
                >
                  Browse Products
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.product._id} className="py-4 first:pt-0 last:pb-0 flex gap-4">
                  {/* Item Image */}
                  <div
                    className="w-20 h-20 rounded-xl overflow-hidden shrink-0 border p-1 flex items-center justify-center"
                    style={{ borderColor: 'var(--border-subtle)', backgroundColor: 'var(--bg-surface-subtle)' }}
                  >
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="w-full h-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Item Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4
                          className="text-xs font-bold line-clamp-1"
                          style={{ color: 'var(--text-primary)' }}
                        >
                          {item.product.name}
                        </h4>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.product._id)}
                          className="p-1 rounded cursor-pointer hover:opacity-70 transition-colors"
                          style={{ color: 'var(--text-muted)' }}
                          aria-label={`Remove ${item.product.name}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
                        {item.product.category}
                      </span>
                    </div>

                    {/* Stepper & Price in Rupees */}
                    <div className="flex items-center justify-between mt-2">
                      <div
                        className="flex items-center rounded-lg border p-0.5"
                        style={{
                          borderColor: 'var(--border-subtle)',
                          backgroundColor: 'var(--bg-surface-elevated)'
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                          className="p-1 rounded hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold tabular-nums" style={{ color: 'var(--text-primary)' }}>
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                          className="p-1 rounded hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-sm font-bold tabular-nums" style={{ color: 'var(--text-primary)' }}>
                        {formatRupees(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Order Summary */}
          {items.length > 0 && (
            <div
              className="p-5 border-t space-y-4"
              style={{
                backgroundColor: 'var(--bg-surface-elevated)',
                borderColor: 'var(--border-subtle)'
              }}
            >
              {/* Promo Code Input Form */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
                  <input
                    type="text"
                    placeholder="Coupon: DARKGREEN or INDIA10"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border focus:outline-none uppercase"
                    style={{
                      borderColor: 'var(--border-strong)',
                      backgroundColor: 'var(--bg-surface)',
                      color: 'var(--text-primary)'
                    }}
                  />
                </div>
                <button
                  type="submit"
                  className="px-3.5 py-2 rounded-lg text-xs font-semibold cursor-pointer border transition-colors hover:bg-black/5"
                  style={{
                    borderColor: 'var(--border-strong)',
                    color: 'var(--text-primary)'
                  }}
                >
                  Apply
                </button>
              </form>

              {appliedCoupon && (
                <div
                  className="flex items-center justify-between text-xs px-2.5 py-1.5 rounded"
                  style={{
                    backgroundColor: 'var(--accent-soft)',
                    color: 'var(--accent-primary)'
                  }}
                >
                  <span>Code <strong>{appliedCoupon}</strong> active (-{formatRupees(discount)})</span>
                  <button
                    type="button"
                    onClick={removeCoupon}
                    className="underline text-[11px] cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              )}

              {couponError && (
                <p className="text-xs text-rose-500">{couponError}</p>
              )}

              {/* Order Cost Breakdown in Rupees */}
              <div className="space-y-1.5 text-xs" style={{ color: 'var(--text-secondary)' }}>
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="tabular-nums font-medium" style={{ color: 'var(--text-primary)' }}>
                    {formatRupees(subtotal)}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between" style={{ color: 'var(--accent-primary)' }}>
                    <span>Discount</span>
                    <span className="tabular-nums font-semibold">-{formatRupees(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>GST (18% Electronics)</span>
                  <span className="tabular-nums font-medium" style={{ color: 'var(--text-primary)' }}>
                    {formatRupees(tax)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charge</span>
                  <span className="tabular-nums font-medium" style={{ color: 'var(--text-primary)' }}>
                    {shipping === 0 ? (
                      <strong className="font-semibold" style={{ color: 'var(--accent-primary)' }}>FREE</strong>
                    ) : (
                      formatRupees(shipping)
                    )}
                  </span>
                </div>
                <div
                  className="pt-2 border-t flex justify-between text-sm font-extrabold"
                  style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }}
                >
                  <span>Grand Total</span>
                  <span className="tabular-nums text-base" style={{ color: 'var(--accent-primary)' }}>
                    {formatRupees(total)}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    closeCart();
                    onProceedToCheckout();
                  }}
                  className="w-full py-3 px-4 rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center justify-center gap-2 hover:opacity-90 active:scale-98 shadow-sm"
                  style={{
                    backgroundColor: 'var(--accent-primary)',
                    color: 'var(--accent-contrast)',
                    boxShadow: '0 4px 14px var(--accent-glow)'
                  }}
                >
                  <span>Proceed to Checkout · {formatRupees(total)}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={clearCart}
                  className="w-full text-center text-[11px] hover:underline cursor-pointer py-1"
                  style={{ color: 'var(--text-muted)' }}
                >
                  Empty Cart
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
