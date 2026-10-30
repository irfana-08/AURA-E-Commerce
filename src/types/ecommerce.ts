/**
 * Core type definitions for the E-Commerce platform.
 * Mirrors MongoDB document schemas and frontend application state.
 */

export type ThemeMode = 'white-darkgreen' | 'dark-forest';

export interface Product {
  _id: string; // MongoDB ObjectId representation
  name: string;
  tagline: string;
  slug: string;
  category: 'Audio' | 'Networking' | 'Keyboards' | 'Workspace' | 'Displays' | 'Accessories';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  inventoryCount: number;
  featured?: boolean;
  badge?: string;
  imageUrl: string;
  description: string;
  features: string[];
  specs: Record<string, string>;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export interface UserAddress {
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'developer' | 'designer' | 'engineer';
  address?: UserAddress;
  orderHistory?: string[]; // Order IDs
}

export interface PaymentDetails {
  method: 'upi' | 'card' | 'cod' | 'netbanking';
  cardLastFour?: string;
  upiId?: string;
  transactionId?: string;
  status: 'pending' | 'completed' | 'failed';
}

export interface Order {
  _id: string;
  orderNumber: string;
  userId: string;
  items: CartItem[];
  shippingAddress: UserAddress;
  payment: PaymentDetails;
  subtotal: number;
  discount: number;
  couponCode?: string;
  tax: number;
  shippingFee: number;
  total: number;
  status: 'processing' | 'shipped' | 'delivered';
  createdAt: string;
  estimatedDelivery: string;
}

export interface FilterState {
  category: string;
  searchQuery: string;
  minPrice: number;
  maxPrice: number;
  inStockOnly: boolean;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
}
