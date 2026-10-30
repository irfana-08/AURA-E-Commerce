import React, { createContext, useContext, useEffect, useState } from 'react';
import { CartItem, Product } from '../types/ecommerce';
import { PROMO_CODES } from '../data/ecommerceData';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  discount: number;
  appliedCoupon: string | null;
  couponError: string | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  tax: number;
  shipping: number;
  total: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  freeShippingThreshold: number;
  amountNeededForFreeShipping: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);
const CART_STORAGE_KEY = 'aura_cart_items_inr';
const COUPON_STORAGE_KEY = 'aura_coupon_code_inr';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(CART_STORAGE_KEY);
        if (saved) return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
  });

  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(COUPON_STORAGE_KEY);
    }
    return null;
  });

  const [couponError, setCouponError] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    if (appliedCoupon) {
      localStorage.setItem(COUPON_STORAGE_KEY, appliedCoupon);
    } else {
      localStorage.removeItem(COUPON_STORAGE_KEY);
    }
  }, [appliedCoupon]);

  const addToCart = (product: Product, quantity = 1) => {
    if (!product.inStock) return;
    setItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.product._id === product._id);
      if (existingIndex > -1) {
        const updated = [...prev];
        const newQty = updated[existingIndex].quantity + quantity;
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: Math.min(newQty, product.inventoryCount)
        };
        return updated;
      }
      return [...prev, { product, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setItems((prev) => prev.filter((i) => i.product._id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((prev) =>
      prev.map((i) => {
        if (i.product._id === productId) {
          return {
            ...i,
            quantity: Math.min(quantity, i.product.inventoryCount)
          };
        }
        return i;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (code: string): boolean => {
    const cleanCode = code.trim().toUpperCase();
    if (!cleanCode) {
      setCouponError('Please enter a coupon code.');
      return false;
    }
    if (PROMO_CODES[cleanCode]) {
      setAppliedCoupon(cleanCode);
      setCouponError(null);
      return true;
    }
    setCouponError(`Invalid code "${cleanCode}". Try DARKGREEN, INDIA10 or DEVGEAR.`);
    return false;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponError(null);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  // Totals calculation in Indian Rupees (₹)
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  let discount = 0;
  if (appliedCoupon && PROMO_CODES[appliedCoupon]) {
    const promo = PROMO_CODES[appliedCoupon];
    if (promo.discountPercent) {
      discount = Math.round((subtotal * promo.discountPercent) / 100);
    } else if (promo.discountFixed) {
      discount = Math.min(promo.discountFixed, subtotal);
    }
  }

  // Free delivery threshold in India: ₹799; otherwise delivery charge of ₹49
  const freeShippingThreshold = 799;
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const shipping = subtotal === 0 || subtotal >= freeShippingThreshold ? 0 : 49;
  
  // Electronics GST in India (18% inclusive or breakdown)
  const taxableAmount = Math.max(0, subtotal - discount);
  const tax = Math.round(taxableAmount * 0.18); 
  const total = taxableAmount + shipping + tax;

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        itemCount,
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
        openCart,
        closeCart,
        freeShippingThreshold,
        amountNeededForFreeShipping
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
