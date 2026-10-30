import React from 'react';
import { ShoppingBag, Sun, Moon, User as UserIcon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  onSelectCategory?: (category: string) => void;
  activeCategory?: string;
}

export const Header: React.FC<HeaderProps> = ({ onSelectCategory, activeCategory }) => {
  const { theme, toggleTheme, isDark } = useTheme();
  const { itemCount, openCart } = useCart();
  const { user, openAuthModal } = useAuth();

  const navItems = [
    { label: 'All Gear', category: 'All' },
    { label: 'Audio', category: 'Audio' },
    { label: 'Networking', category: 'Networking' },
    { label: 'Keyboards', category: 'Keyboards' },
    { label: 'Workspace', category: 'Workspace' },
    { label: 'Displays', category: 'Displays' }
  ];

  return (
    <header
      className="sticky top-0 z-40 w-full backdrop-blur-md border-b"
      style={{
        backgroundColor: 'var(--topbar-bg)',
        borderColor: 'var(--border-subtle)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#top"
            className="group flex items-center gap-2.5 focus:outline-none"
            aria-label="Aura Store Home"
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm tracking-widest transition-transform group-hover:scale-105"
              style={{
                backgroundColor: 'var(--accent-primary)',
                color: 'var(--accent-contrast)',
                boxShadow: '0 0 16px var(--accent-glow)'
              }}
            >
              A
            </div>
            <span
              className="text-lg font-bold tracking-tight whitespace-nowrap shrink-0 font-sans"
              style={{ color: 'var(--text-primary)' }}
            >
              AURA
            </span>
          </a>
        </div>

        {/* Zone 2: Concise single-line navigation links */}
        <nav
          className="hidden md:flex items-center gap-6 text-sm font-medium"
          aria-label="Primary Navigation"
        >
          {navItems.map((item) => {
            const isActive = activeCategory === item.category;
            return (
              <button
                key={item.category}
                type="button"
                onClick={() => onSelectCategory && onSelectCategory(item.category)}
                className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer border-b-2 text-sm ${
                  isActive ? 'font-semibold' : 'hover:opacity-80'
                }`}
                style={{
                  color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  borderColor: isActive ? 'var(--accent-primary)' : 'transparent'
                }}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action cluster */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          {/* Theme Switcher for White & Dark Green vs Dark Forest */}
          <button
            type="button"
            onClick={toggleTheme}
            className="group relative flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98]"
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderColor: 'var(--border-subtle)',
              color: 'var(--text-primary)'
            }}
            title={`Switch to ${isDark ? 'White & Dark Green' : 'Dark Forest & Mint'} theme`}
            aria-label="Toggle theme"
          >
            <div
              className="w-3.5 h-3.5 rounded-full flex items-center justify-center transition-colors"
              style={{
                backgroundColor: isDark ? '#10b981' : '#064e3b',
                boxShadow: isDark ? '0 0 8px rgba(16,185,129,0.7)' : '0 0 8px rgba(6,78,59,0.5)'
              }}
            />
            {isDark ? (
              <Moon className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Sun className="w-3.5 h-3.5 text-emerald-800" />
            )}
          </button>

          {/* User Account / Auth Trigger */}
          <button
            type="button"
            onClick={openAuthModal}
            className="flex items-center gap-2 p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg border text-xs font-medium cursor-pointer transition-colors"
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderColor: 'var(--border-subtle)',
              color: 'var(--text-primary)'
            }}
            aria-label={user ? `Logged in as ${user.name}` : 'Sign in to account'}
          >
            {user ? (
              <div className="flex items-center gap-2">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-5 h-5 rounded-full object-cover border"
                  style={{ borderColor: 'var(--accent-primary)' }}
                />
                <span className="hidden lg:inline whitespace-nowrap font-medium text-xs">
                  {user.name.split(' ')[0]}
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <UserIcon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline whitespace-nowrap">Sign In</span>
              </div>
            )}
          </button>

          {/* Cart Trigger Button */}
          <button
            type="button"
            onClick={openCart}
            className="relative flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all hover:opacity-90 active:scale-95 shadow-sm"
            style={{
              backgroundColor: 'var(--accent-primary)',
              color: 'var(--accent-contrast)',
              boxShadow: '0 2px 10px var(--accent-glow)'
            }}
            aria-label={`Shopping Cart with ${itemCount} items`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="tabular-nums font-semibold text-xs">
              {itemCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
