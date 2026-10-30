import React from 'react';
import { Search, X, ArrowUpDown } from 'lucide-react';
import { FilterState } from '../types/ecommerce';
import { CATEGORIES, formatRupees } from '../data/ecommerceData';

interface ProductFilterProps {
  filter: FilterState;
  onFilterChange: (updates: Partial<FilterState>) => void;
  onResetFilters: () => void;
  totalCount: number;
  filteredCount: number;
}

export const ProductFilter: React.FC<ProductFilterProps> = ({
  filter,
  onFilterChange,
  onResetFilters,
  totalCount,
  filteredCount
}) => {
  const hasActiveFilters =
    filter.category !== 'All' ||
    filter.searchQuery.trim() !== '' ||
    filter.inStockOnly ||
    filter.maxPrice < 5000 ||
    filter.sortBy !== 'featured';

  return (
    <div
      className="p-5 rounded-2xl border mb-8 transition-all"
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--border-subtle)',
        boxShadow: 'var(--card-shadow)'
      }}
    >
      {/* Top Row: Search & Category Tabs */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search
            className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
            style={{ color: 'var(--text-muted)' }}
          />
          <input
            type="text"
            placeholder="Search earbuds, adapters, MP3 players, keyboards..."
            value={filter.searchQuery}
            onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
            className="w-full pl-10 pr-9 py-2.5 rounded-lg text-xs border focus:outline-none focus:ring-1 transition-all"
            style={{
              backgroundColor: 'var(--bg-surface-elevated)',
              borderColor: 'var(--border-strong)',
              color: 'var(--text-primary)'
            }}
          />
          {filter.searchQuery && (
            <button
              type="button"
              onClick={() => onFilterChange({ searchQuery: '' })}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded cursor-pointer hover:opacity-70"
              style={{ color: 'var(--text-muted)' }}
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Category Segmented Control */}
        <div
          className="flex items-center gap-1 p-1 rounded-xl border overflow-x-auto no-scrollbar"
          style={{
            backgroundColor: 'var(--bg-surface-elevated)',
            borderColor: 'var(--border-subtle)'
          }}
        >
          {CATEGORIES.map((cat) => {
            const isSelected = filter.category === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => onFilterChange({ category: cat })}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 cursor-pointer transition-all ${
                  isSelected ? 'shadow-sm font-semibold' : 'hover:opacity-80'
                }`}
                style={{
                  backgroundColor: isSelected ? 'var(--accent-primary)' : 'transparent',
                  color: isSelected ? 'var(--accent-contrast)' : 'var(--text-secondary)'
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Row: Advanced Options (Price range in Rupees, in-stock toggle, sort) */}
      <div
        className="pt-4 border-t flex flex-wrap items-center justify-between gap-4 text-xs"
        style={{ borderColor: 'var(--border-subtle)' }}
      >
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          {/* In-Stock Only Toggle */}
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={filter.inStockOnly}
              onChange={(e) => onFilterChange({ inStockOnly: e.target.checked })}
              className="w-4 h-4 rounded cursor-pointer accent-emerald-800 dark:accent-emerald-400"
            />
            <span style={{ color: 'var(--text-secondary)' }}>In Stock Only</span>
          </label>

          {/* Price Range Slider in Rupees */}
          <div className="flex items-center gap-2">
            <span style={{ color: 'var(--text-muted)' }}>Max Price:</span>
            <input
              type="range"
              min="100"
              max="5000"
              step="100"
              value={filter.maxPrice}
              onChange={(e) => onFilterChange({ maxPrice: Number(e.target.value) })}
              className="w-24 sm:w-36 h-1.5 rounded-lg appearance-none cursor-pointer accent-emerald-800 dark:accent-emerald-400"
              style={{ backgroundColor: 'var(--border-strong)' }}
            />
            <span className="font-semibold tabular-nums" style={{ color: 'var(--text-primary)' }}>
              {formatRupees(filter.maxPrice)}
            </span>
          </div>

          {/* Reset Filters button */}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={onResetFilters}
              className="flex items-center gap-1 font-medium cursor-pointer transition-colors hover:underline"
              style={{ color: 'var(--accent-primary)' }}
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        {/* Right side: Sort by selector & results count */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-3.5 h-3.5" style={{ color: 'var(--text-muted)' }} />
            <select
              value={filter.sortBy}
              onChange={(e) => onFilterChange({ sortBy: e.target.value as FilterState['sortBy'] })}
              className="px-2.5 py-1.5 rounded-lg text-xs border cursor-pointer focus:outline-none"
              style={{
                backgroundColor: 'var(--bg-surface-elevated)',
                borderColor: 'var(--border-strong)',
                color: 'var(--text-primary)'
              }}
            >
              <option value="featured">Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Customer Rated</option>
              <option value="newest">Newest Releases</option>
            </select>
          </div>

          <span className="text-xs tabular-nums" style={{ color: 'var(--text-muted)' }}>
            Showing <strong>{filteredCount}</strong> of {totalCount} items
          </span>
        </div>
      </div>
    </div>
  );
};
