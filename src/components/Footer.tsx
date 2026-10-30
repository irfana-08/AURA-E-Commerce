import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { CATEGORIES } from '../data/ecommerceData';

interface FooterProps {
  onSelectCategory?: (category: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory }) => {
  const { theme, isDark } = useTheme();

  return (
    <footer
      className="border-t pt-14 pb-12 transition-colors"
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--border-subtle)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Brand & Tech Stack */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center font-black text-xs"
                style={{
                  backgroundColor: 'var(--accent-primary)',
                  color: 'var(--accent-contrast)'
                }}
              >
                A
              </div>
              <span className="text-base font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
                AURA STORE
              </span>
            </div>

            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Precision developer hardware, high-end wireless audio, fast LAN adapters, and ergonomic rigs with Pan-India dispatch.
            </p>

            {/* Architecture note */}
            <div className="text-[11px] space-y-1" style={{ color: 'var(--text-muted)' }}>
              <p>Task 5 Architecture Compliant</p>
              <p>React 19 · Node.js API · MongoDB Schemas</p>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: 'var(--text-primary)' }}>
              Hardware Categories
            </h4>
            <ul className="space-y-2.5 text-xs" style={{ color: 'var(--text-secondary)' }}>
              {CATEGORIES.filter((c) => c !== 'All').map((cat) => (
                <li key={cat}>
                  <button
                    type="button"
                    onClick={() => onSelectCategory && onSelectCategory(cat)}
                    className="hover:underline cursor-pointer transition-colors"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Customer Care & Delivery */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: 'var(--text-primary)' }}>
              Service & Guarantee
            </h4>
            <ul className="space-y-2.5 text-xs" style={{ color: 'var(--text-secondary)' }}>
              <li>
                <span className="cursor-default">Free Delivery Above ₹799</span>
              </li>
              <li>
                <span className="cursor-default">All Prices Inclusive of GST</span>
              </li>
              <li>
                <span className="cursor-default">Cash & UPI on Delivery Available</span>
              </li>
              <li>
                <span className="cursor-default">Official Manufacturer Warranty</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Dispatch & Payment Security */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: 'var(--text-primary)' }}>
              Trust & Security
            </h4>
            <div
              className="p-3.5 rounded-xl border space-y-2 text-xs"
              style={{
                backgroundColor: 'var(--bg-surface-elevated)',
                borderColor: 'var(--border-subtle)'
              }}
            >
              <div className="flex items-center justify-between">
                <span style={{ color: 'var(--text-muted)' }}>Quality Check:</span>
                <span className="font-semibold" style={{ color: 'var(--accent-primary)' }}>
                  100% Verified Hardware
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span style={{ color: 'var(--text-muted)' }}>Currency Mode:</span>
                <span className="font-mono text-[11px] font-semibold" style={{ color: 'var(--text-primary)' }}>
                  Indian Rupee (₹ INR)
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span style={{ color: 'var(--text-muted)' }}>Payment Gateways:</span>
                <span className="font-mono text-[11px]" style={{ color: 'var(--text-primary)' }}>
                  UPI, Cards, COD
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Terms */}
        <div
          className="pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-xs"
          style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-muted)' }}
        >
          <p>© 2026 AURA Store · SAM AI Technologies Task 5 Full-Stack Implementation.</p>
          <div className="flex items-center gap-6">
            <span>GST Invoice</span>
            <span aria-hidden="true">·</span>
            <span>UPI & Cards Accepted</span>
            <span aria-hidden="true">·</span>
            <span>Pan-India Logistics</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
