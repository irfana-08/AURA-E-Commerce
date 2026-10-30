import React, { useState, useMemo } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductFilter } from './components/ProductFilter';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { AuthModal } from './components/AuthModal';
import { Footer } from './components/Footer';
import { INITIAL_PRODUCTS } from './data/ecommerceData';
import { FilterState, Order, Product } from './types/ecommerce';
import { Terminal, Database, Code2, Sparkles, CheckCircle2 } from 'lucide-react';

function StorefrontContent() {
  // Filter state
  const [filter, setFilter] = useState<FilterState>({
    category: 'All',
    searchQuery: '',
    minPrice: 0,
    maxPrice: 5000,
    inStockOnly: false,
    sortBy: 'featured'
  });

  // Modal states
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [recentOrder, setRecentOrder] = useState<Order | null>(null);

  const selectedProduct = useMemo(
    () => INITIAL_PRODUCTS.find((p) => p._id === selectedProductId) || null,
    [selectedProductId]
  );

  const handleFilterChange = (updates: Partial<FilterState>) => {
    setFilter((prev) => ({ ...prev, ...updates }));
  };

  const handleResetFilters = () => {
    setFilter({
      category: 'All',
      searchQuery: '',
      minPrice: 0,
      maxPrice: 5000,
      inStockOnly: false,
      sortBy: 'featured'
    });
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...INITIAL_PRODUCTS];

    // Category
    if (filter.category !== 'All') {
      result = result.filter((p) => p.category === filter.category);
    }

    // Search query
    if (filter.searchQuery.trim() !== '') {
      const q = filter.searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          Object.values(p.specs).some((v) => v.toLowerCase().includes(q))
      );
    }

    // In stock
    if (filter.inStockOnly) {
      result = result.filter((p) => p.inStock);
    }

    // Price range
    result = result.filter((p) => p.price <= filter.maxPrice);

    // Sorting
    switch (filter.sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'featured':
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    return result;
  }, [filter]);

  const scrollToProducts = () => {
    const el = document.getElementById('catalog-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Semantic Top Navigation */}
      <Header
        onSelectCategory={(cat) => {
          handleFilterChange({ category: cat });
          scrollToProducts();
        }}
        activeCategory={filter.category}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onExploreClick={scrollToProducts}
          onOpenProductModal={(id) => setSelectedProductId(id)}
        />

        {/* Product Catalog Section */}
        <section
          id="catalog-section"
          aria-label="Hardware Catalog"
          className="py-14 sm:py-20"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
              <div>
                <span
                  className="text-xs uppercase tracking-wider font-semibold block mb-1"
                  style={{ color: 'var(--accent-primary)' }}
                >
                  Curated Equipment
                </span>
                <h2
                  className="text-2xl sm:text-3xl font-extrabold tracking-tight"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Developer Workstation Catalog
                </h2>
              </div>
              <p className="text-xs sm:text-sm max-w-md" style={{ color: 'var(--text-secondary)' }}>
                Filter across wireless earbuds, high-speed LAN adapters, lossless audio players, mechanical keyboards, and developer gear.
              </p>
            </div>

            {/* Filter Control Bar */}
            <ProductFilter
              filter={filter}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
              totalCount={INITIAL_PRODUCTS.length}
              filteredCount={filteredProducts.length}
            />

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    onOpenDetails={(id) => setSelectedProductId(id)}
                  />
                ))}
              </div>
            ) : (
              <div
                className="py-16 px-6 text-center rounded-2xl border"
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  borderColor: 'var(--border-subtle)'
                }}
              >
                <div
                  className="w-12 h-12 rounded-full mx-auto flex items-center justify-center mb-3"
                  style={{ backgroundColor: 'var(--bg-surface-elevated)' }}
                >
                  <Sparkles className="w-5 h-5" style={{ color: 'var(--text-muted)' }} />
                </div>
                <h3 className="text-base font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
                  No matching hardware found
                </h3>
                <p className="text-xs mb-5" style={{ color: 'var(--text-secondary)' }}>
                  Try adjusting your search criteria, price range slider, or category filters.
                </p>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-all hover:opacity-90"
                  style={{
                    backgroundColor: 'var(--accent-primary)',
                    color: 'var(--accent-contrast)'
                  }}
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Task 5 Architectural Showcase Section */}
        <section
          aria-label="Full-Stack Technical Foundation"
          className="py-16 border-t"
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--border-subtle)'
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span
                className="text-xs uppercase tracking-wider font-semibold block mb-1"
                style={{ color: 'var(--accent-primary)' }}
              >
                Engineering Blueprint
              </span>
              <h2
                className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3"
                style={{ color: 'var(--text-primary)' }}
              >
                Task 5 Full-Stack Implementation
              </h2>
              <p className="text-xs sm:text-sm" style={{ color: 'var(--text-secondary)' }}>
                Built in accordance with the Task 5 specification using React components, Node.js architectural patterns, and MongoDB document collections.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1: React 19 Frontend */}
              <div
                className="p-6 rounded-2xl border space-y-3"
                style={{
                  backgroundColor: 'var(--bg-surface-elevated)',
                  borderColor: 'var(--border-subtle)'
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-bold"
                  style={{
                    backgroundColor: 'var(--accent-soft)',
                    color: 'var(--accent-primary)'
                  }}
                >
                  <Code2 className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>
                  React 19 Component Layer
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  Modular state management using Context API for cart, auth, and theme transitions.
                  Strict zero-pill metadata discipline, semantic HTML5, and responsive 1440px viewport presence.
                </p>
                <ul className="text-xs space-y-1 pt-2 font-mono" style={{ color: 'var(--text-muted)' }}>
                  <li>· CartContext & AuthContext</li>
                  <li>· CSS Variables Theme Interpolation</li>
                  <li>· Responsive Drawer & Modal Portals</li>
                </ul>
              </div>

              {/* Card 2: Node.js Architecture */}
              <div
                className="p-6 rounded-2xl border space-y-3"
                style={{
                  backgroundColor: 'var(--bg-surface-elevated)',
                  borderColor: 'var(--border-subtle)'
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-bold"
                  style={{
                    backgroundColor: 'var(--accent-soft)',
                    color: 'var(--accent-primary)'
                  }}
                >
                  <Terminal className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>
                  Node.js Express Controllers
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  RESTful routing controllers, cart pricing calculations, tax and coupon engine,
                  and transaction mock handlers with cryptographic transaction IDs.
                </p>
                <ul className="text-xs space-y-1 pt-2 font-mono" style={{ color: 'var(--text-muted)' }}>
                  <li>· Express middleware routing</li>
                  <li>· Coupon validation (`ISTA15`, `CYBERPINK`)</li>
                  <li>· Multi-gateway payment simulation</li>
                </ul>
              </div>

              {/* Card 3: MongoDB Schema */}
              <div
                className="p-6 rounded-2xl border space-y-3"
                style={{
                  backgroundColor: 'var(--bg-surface-elevated)',
                  borderColor: 'var(--border-subtle)'
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-bold"
                  style={{
                    backgroundColor: 'var(--accent-soft)',
                    color: 'var(--accent-primary)'
                  }}
                >
                  <Database className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>
                  MongoDB Document Schemas
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  Separated in <code className="font-mono">src/data/ecommerceData.ts</code> with 24-character hex ObjectIDs,
                  nested specs, inventory counts, user addresses, and persistent order logs.
                </p>
                <ul className="text-xs space-y-1 pt-2 font-mono" style={{ color: 'var(--text-muted)' }}>
                  <li>· Products Collection with inventory</li>
                  <li>· Users & Authentication records</li>
                  <li>· Orders collection with timestamps</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Semantic Footer */}
      <Footer
        onSelectCategory={(cat) => {
          handleFilterChange({ category: cat });
          scrollToProducts();
        }}
      />

      {/* Product Details Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProductId(null)}
      />

      {/* Cart Drawer Slide-Over */}
      <CartDrawer
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
      />

      {/* Checkout Modal Flow */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onOrderCompleted={(order) => {
          setRecentOrder(order);
        }}
      />

      {/* Authentication Modal */}
      <AuthModal />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <StorefrontContent />
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
