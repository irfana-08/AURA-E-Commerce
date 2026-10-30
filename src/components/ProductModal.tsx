import React, { useEffect, useState } from 'react';
import { X, Star, Check, Plus, Minus, ShoppingBag, Shield, Cpu, RotateCcw } from 'lucide-react';
import { Product } from '../types/ecommerce';
import { useCart } from '../context/CartContext';
import { formatRupees } from '../data/ecommerceData';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    setQuantity(1);
    setIsAdded(false);
  }, [product]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!product) return null;

  const handleAdd = () => {
    if (!product.inStock) return;
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const discountAmount = product.originalPrice ? product.originalPrice - product.price : 0;
  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto backdrop-blur-sm bg-black/60 transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-product-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl rounded-2xl border overflow-hidden shadow-2xl my-8 transition-transform"
        style={{
          backgroundColor: 'var(--bg-surface)',
          borderColor: 'var(--border-subtle)',
          boxShadow: 'var(--card-shadow-hover)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full cursor-pointer transition-colors hover:opacity-80"
          style={{
            backgroundColor: 'var(--bg-surface-elevated)',
            color: 'var(--text-primary)'
          }}
          aria-label="Close product modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
          {/* Left Column: Image & Highlights */}
          <div
            className="md:col-span-5 p-6 flex flex-col justify-between"
            style={{ backgroundColor: 'var(--bg-surface-subtle)' }}
          >
            <div>
              <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-4 border flex items-center justify-center bg-slate-100 dark:bg-zinc-900" style={{ borderColor: 'var(--border-subtle)' }}>
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-contain p-3"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Guarantees */}
              <div className="space-y-3 pt-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 shrink-0" style={{ color: 'var(--accent-primary)' }} />
                  <span>1-Year Official Manufacturer Warranty</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 shrink-0" style={{ color: 'var(--accent-primary)' }} />
                  <span>7-Day Replacement / Return Guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 shrink-0" style={{ color: 'var(--accent-primary)' }} />
                  <span>100% Genuine Certified Hardware</span>
                </div>
              </div>
            </div>

            {/* SKU / Mongo Document ID reference */}
            <div className="pt-6 mt-6 border-t text-[11px] font-mono" style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-muted)' }}>
              <span>MongoDB ID: {product._id}</span>
            </div>
          </div>

          {/* Right Column: Information, Specs, Buying */}
          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center gap-2 text-xs mb-2" style={{ color: 'var(--text-muted)' }}>
                <span className="uppercase tracking-wider font-semibold" style={{ color: 'var(--accent-primary)' }}>
                  {product.category}
                </span>
                <span aria-hidden="true">·</span>
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="font-semibold text-slate-800 dark:text-slate-200 tabular-nums">
                    {product.rating}
                  </span>
                  <span className="tabular-nums">({product.reviewCount.toLocaleString('en-IN')} ratings)</span>
                </div>
              </div>

              {/* Product Title */}
              <h2
                id="modal-product-title"
                className="text-2xl font-bold tracking-tight mb-2"
                style={{ color: 'var(--text-primary)' }}
              >
                {product.name}
              </h2>

              {/* Price Banner in Rupees */}
              <div className="flex items-baseline gap-2.5 mb-2">
                <span
                  className="text-3xl font-extrabold tabular-nums"
                  style={{ color: 'var(--accent-primary)' }}
                >
                  {formatRupees(product.price)}
                </span>
                {product.originalPrice && (
                  <>
                    <span
                      className="text-sm line-through tabular-nums"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      M.R.P.: {formatRupees(product.originalPrice)}
                    </span>
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded"
                      style={{
                        backgroundColor: 'var(--accent-soft)',
                        color: 'var(--accent-primary)'
                      }}
                    >
                      {discountPercent}% OFF (Save {formatRupees(discountAmount)})
                    </span>
                  </>
                )}
              </div>

              <div className="mb-4">
                <span
                  className="text-xs font-medium px-2 py-0.5 rounded inline-block"
                  style={{
                    backgroundColor: product.inStock ? 'var(--accent-soft)' : 'rgba(0,0,0,0.1)',
                    color: product.inStock ? 'var(--accent-primary)' : 'var(--text-muted)'
                  }}
                >
                  {product.inStock ? `${product.inventoryCount} Units In Stock (Fulfilled Fast)` : 'Out of Stock'}
                </span>
              </div>

              {/* Description */}
              <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
                {product.description}
              </p>

              {/* Key Features List */}
              <div className="mb-6">
                <h4 className="text-xs font-bold uppercase tracking-wider mb-2.5" style={{ color: 'var(--text-primary)' }}>
                  Product Highlights
                </h4>
                <ul className="space-y-1.5 text-xs" style={{ color: 'var(--text-secondary)' }}>
                  {product.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <div
                        className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                        style={{ backgroundColor: 'var(--accent-primary)' }}
                      />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technical Specifications Table */}
              <div className="mb-6">
                <h4 className="text-xs font-bold uppercase tracking-wider mb-2.5" style={{ color: 'var(--text-primary)' }}>
                  Technical Specifications
                </h4>
                <div
                  className="rounded-xl border overflow-hidden text-xs"
                  style={{ borderColor: 'var(--border-subtle)', backgroundColor: 'var(--bg-surface-elevated)' }}
                >
                  {Object.entries(product.specs).map(([label, val], idx) => (
                    <div
                      key={label}
                      className={`flex justify-between py-2 px-3 ${
                        idx !== Object.keys(product.specs).length - 1 ? 'border-b' : ''
                      }`}
                      style={{ borderColor: 'var(--border-subtle)' }}
                    >
                      <span style={{ color: 'var(--text-muted)' }}>{label}</span>
                      <span className="font-medium text-right tabular-nums" style={{ color: 'var(--text-primary)' }}>
                        {val}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Buying & Quantity Module */}
            <div
              className="pt-4 border-t flex flex-wrap items-center gap-4"
              style={{ borderColor: 'var(--border-subtle)' }}
            >
              {/* Quantity Stepper */}
              <div
                className="flex items-center rounded-lg border p-1"
                style={{
                  borderColor: 'var(--border-strong)',
                  backgroundColor: 'var(--bg-surface-elevated)'
                }}
              >
                <button
                  type="button"
                  disabled={quantity <= 1 || !product.inStock}
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-1.5 rounded hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer disabled:opacity-40"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-8 text-center text-xs font-bold tabular-nums" style={{ color: 'var(--text-primary)' }}>
                  {quantity}
                </span>
                <button
                  type="button"
                  disabled={quantity >= product.inventoryCount || !product.inStock}
                  onClick={() => setQuantity((q) => Math.min(product.inventoryCount, q + 1))}
                  className="p-1.5 rounded hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer disabled:opacity-40"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Add to Cart button */}
              <button
                type="button"
                disabled={!product.inStock}
                onClick={handleAdd}
                className="flex-1 py-3 px-6 rounded-lg text-xs font-semibold cursor-pointer transition-all flex items-center justify-center gap-2 hover:opacity-90 active:scale-98 disabled:opacity-40 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: 'var(--accent-primary)',
                  color: 'var(--accent-contrast)',
                  boxShadow: '0 4px 14px var(--accent-glow)'
                }}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Cart!</span>
                  </>
                ) : !product.inStock ? (
                  <span>Currently Out of Stock</span>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add {quantity > 1 ? `${quantity} Units` : ''} · {formatRupees(product.price * quantity)}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
