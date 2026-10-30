import React, { useState } from 'react';
import { Star, Check, Plus, Eye } from 'lucide-react';
import { Product } from '../types/ecommerce';
import { useCart } from '../context/CartContext';
import { formatRupees } from '../data/ecommerceData';

interface ProductCardProps {
  product: Product;
  onOpenDetails: (productId: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOpenDetails }) => {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!product.inStock) return;
    addToCart(product, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <article
      onClick={() => onOpenDetails(product._id)}
      className="product-card group flex flex-col rounded-2xl border overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1"
      style={{
        backgroundColor: 'var(--bg-surface-card)',
        borderColor: 'var(--border-subtle)',
        boxShadow: 'var(--card-shadow)'
      }}
    >
      {/* Product Image Stage: scales up by 5% (scale(1.05)) on parent hover via CSS transform */}
      <div
        className="relative aspect-4/3 w-full overflow-hidden flex items-center justify-center bg-slate-100 dark:bg-zinc-900"
        style={{ backgroundColor: 'var(--bg-surface-subtle)' }}
      >
        {!imageError ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            onError={() => setImageError(true)}
            className="product-card-img w-full h-full object-contain p-2 transition-transform duration-500 ease-out group-hover:scale-105"
            style={{
              transformOrigin: 'center center'
            }}
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
            <div className="text-2xl font-bold mb-1" style={{ color: 'var(--accent-primary)' }}>
              {product.name.charAt(0)}
            </div>
            <div className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
              {product.category}
            </div>
          </div>
        )}

        {/* Hover Quick View Overlay Action */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium shadow-md backdrop-blur-sm"
            style={{
              backgroundColor: 'var(--bg-surface)',
              color: 'var(--text-primary)'
            }}
          >
            <Eye className="w-3.5 h-3.5" />
            <p>Quick Inspect</p>
          </div>
        </div>

        {/* Stock status indicator */}
        {!product.inStock && (
          <div className="absolute top-3 left-3 px-2 py-0.5 rounded text-[11px] font-semibold tracking-wider uppercase bg-black/80 text-white">
            Sold Out
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* Clean metadata without pill spans */}
          <div className="flex items-center gap-2 text-xs mb-2" style={{ color: 'var(--text-muted)' }}>
            <p className="uppercase tracking-wider font-semibold text-[11px]" style={{ color: 'var(--accent-primary)' }}>
              {product.category}
            </p>
            <div aria-hidden="true">·</div>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <p className="font-semibold text-slate-700 dark:text-slate-300 tabular-nums">
                {product.rating}
              </p>
              <p className="tabular-nums text-[11px]">({product.reviewCount.toLocaleString('en-IN')})</p>
            </div>
            <div aria-hidden="true">·</div>
            <p>{product.inStock ? `${product.inventoryCount} in stock` : 'Out of stock'}</p>
          </div>

          {/* Product Title */}
          <h3
            className="text-base font-bold mb-1.5 line-clamp-1 transition-colors group-hover:opacity-90"
            style={{ color: 'var(--text-primary)' }}
          >
            {product.name}
          </h3>

          {/* Tagline */}
          <p
            className="text-xs leading-relaxed line-clamp-2 mb-4"
            style={{ color: 'var(--text-secondary)' }}
          >
            {product.tagline}
          </p>
        </div>

        {/* Card Footer: Affordable Price in Rupees & Add to Cart button */}
        <div
          className="pt-3 border-t flex items-center justify-between gap-3 mt-auto"
          style={{ borderColor: 'var(--border-subtle)' }}
        >
          <div>
            <div className="flex items-baseline gap-1.5">
              <p
                className="text-lg font-bold tabular-nums"
                style={{ color: 'var(--text-primary)' }}
              >
                {formatRupees(product.price)}
              </p>
              {product.originalPrice && (
                <p
                  className="text-xs line-through tabular-nums"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {formatRupees(product.originalPrice)}
                </p>
              )}
            </div>
          </div>

          <button
            type="button"
            disabled={!product.inStock}
            onClick={handleAddToCart}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
              !product.inStock
                ? 'opacity-40 cursor-not-allowed bg-slate-300 dark:bg-zinc-800 text-slate-500'
                : isAdded
                ? 'bg-emerald-700 text-white'
                : 'hover:opacity-90 active:scale-95'
            }`}
            style={
              product.inStock && !isAdded
                ? {
                    backgroundColor: 'var(--accent-primary)',
                    color: 'var(--accent-contrast)'
                  }
                : undefined
            }
            aria-label={`Add ${product.name} to cart`}
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <p>Added</p>
              </>
            ) : !product.inStock ? (
              <p>Out of Stock</p>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <p>Add</p>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};
