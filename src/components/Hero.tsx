import React from 'react';
import { ArrowDown, Layers, ShieldCheck, Zap } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { INITIAL_PRODUCTS, formatRupees } from '../data/ecommerceData';

interface HeroProps {
  onExploreClick: () => void;
  onOpenProductModal: (productId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onOpenProductModal }) => {
  const { isDark } = useTheme();
  const { addToCart } = useCart();
  const featured = INITIAL_PRODUCTS[0]; 

  return (
    <section
      id="top"
      aria-label="Hero Spotlight"
      className="relative overflow-hidden border-b pt-10 pb-16 lg:pt-16 lg:pb-20"
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--border-subtle)'
      }}
    >
      {/* Subtle ambient background glow */}
      <div
        className="pointer-events-none absolute -top-40 right-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-15"
        style={{ backgroundColor: 'var(--accent-primary)' }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-40 left-10 w-[400px] h-[400px] rounded-full blur-3xl opacity-10"
        style={{ backgroundColor: isDark ? '#10b981' : '#064e3b' }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial & Scope Narrative */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Headline with text-wrap: balance */}
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15] mb-5"
              style={{
                color: 'var(--text-primary)',
                textWrap: 'balance'
              }}
            >
              High-Precision Hardware & Developer Tech
            </h1>

            {/* Narrative Prose */}
            <p
              className="text-base sm:text-lg leading-relaxed mb-8 max-w-2xl"
              style={{ color: 'var(--text-secondary)' }}
            >
              Explore our curated selection of gaming audio, ergonomic laptop stands,
              gigabit adapters, lossless players, and developer peripherals with fast delivery and live checkout in Indian Rupees (₹).
            </p>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <button
                type="button"
                onClick={onExploreClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98] shadow-sm whitespace-nowrap"
                style={{
                  backgroundColor: 'var(--accent-primary)',
                  color: 'var(--accent-contrast)',
                  boxShadow: '0 4px 14px var(--accent-glow)'
                }}
              >
                <span>Browse Products</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onOpenProductModal(featured._id)}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold cursor-pointer border transition-colors whitespace-nowrap"
                style={{
                  backgroundColor: 'var(--bg-surface-elevated)',
                  borderColor: 'var(--border-strong)',
                  color: 'var(--text-primary)'
                }}
              >
                <span>Inspect {featured.name.split(' ')[0]} Specs</span>
              </button>
            </div>

            {/* Technical Rigor Badges */}
            <div
              className="pt-6 border-t grid grid-cols-3 gap-4 text-xs"
              style={{ borderColor: 'var(--border-subtle)' }}
            >
              <div className="flex items-start gap-2">
                <Zap className="w-4 h-4 shrink-0 mt-0.5" style={{ color: 'var(--accent-primary)' }} />
                <div>
                  <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>Affordable Pricing</p>
                  <p style={{ color: 'var(--text-muted)' }}>From ₹249 with UPI</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Layers className="w-4 h-4 shrink-0 mt-0.5" style={{ color: 'var(--accent-primary)' }} />
                <div>
                  <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>MongoDB Schema</p>
                  <p style={{ color: 'var(--text-muted)' }}>Categorized Catalog</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" style={{ color: 'var(--accent-primary)' }} />
                <div>
                  <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>Free Delivery</p>
                  <p style={{ color: 'var(--text-muted)' }}>On orders above ₹799</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Anchor (Featured Product Spotlight) */}
          <div className="lg:col-span-5">
            <div
              className="product-card group relative rounded-2xl border p-6 transition-all hover:shadow-xl"
              style={{
                backgroundColor: 'var(--bg-surface-card)',
                borderColor: 'var(--border-subtle)',
                boxShadow: 'var(--card-shadow)'
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className="text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded"
                  style={{
                    backgroundColor: 'var(--accent-soft)',
                    color: 'var(--accent-primary)',
                    border: '1px solid var(--accent-soft-border)'
                  }}
                >
                  {featured.badge || 'Featured Release'}
                </div>
                <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  In Stock · {featured.inventoryCount} units
                </div>
              </div>

              {/* Product Image Frame with 5% hover scale */}
              <div
                className="relative aspect-4/3 w-full rounded-xl overflow-hidden mb-5 flex items-center justify-center"
                style={{ backgroundColor: 'var(--bg-surface-subtle)' }}
              >
                <img
                  src={featured.imageUrl}
                  alt={featured.name}
                  className="product-card-img w-full h-full object-contain p-2 transition-transform duration-500 ease-out group-hover:scale-105"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Title & Price */}
              <div className="flex items-baseline justify-between gap-4 mb-2">
                <h2
                  className="text-lg font-bold truncate"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {featured.name}
                </h2>
                <div className="text-right shrink-0">
                  <span
                    className="text-xl font-bold tabular-nums"
                    style={{ color: 'var(--accent-primary)' }}
                  >
                    {formatRupees(featured.price)}
                  </span>
                  {featured.originalPrice && (
                    <span
                      className="ml-2 text-xs line-through tabular-nums"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {formatRupees(featured.originalPrice)}
                    </span>
                  )}
                </div>
              </div>

              <p
                className="text-xs leading-relaxed mb-5 line-clamp-2"
                style={{ color: 'var(--text-secondary)' }}
              >
                {featured.tagline}
              </p>

              {/* Key Highlights list */}
              <div
                className="rounded-lg p-3 text-xs mb-5 space-y-1.5"
                style={{ backgroundColor: 'var(--bg-surface-elevated)' }}
              >
                <div className="flex justify-between" style={{ color: 'var(--text-secondary)' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Playtime Endurance</span>
                  <span className="font-semibold tabular-nums">60 Hours Total</span>
                </div>
                <div className="flex justify-between" style={{ color: 'var(--text-secondary)' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Driver Size</span>
                  <span className="font-semibold tabular-nums">13mm BoomX Dynamic</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => addToCart(featured)}
                  className="flex-1 py-2.5 px-4 rounded-lg text-xs font-semibold cursor-pointer transition-all hover:opacity-90 active:scale-95 text-center"
                  style={{
                    backgroundColor: 'var(--accent-primary)',
                    color: 'var(--accent-contrast)'
                  }}
                >
                  Add to Cart · {formatRupees(featured.price)}
                </button>
                <button
                  type="button"
                  onClick={() => onOpenProductModal(featured._id)}
                  className="py-2.5 px-4 rounded-lg text-xs font-medium cursor-pointer border transition-colors hover:bg-black/5"
                  style={{
                    borderColor: 'var(--border-strong)',
                    color: 'var(--text-primary)'
                  }}
                >
                  Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
