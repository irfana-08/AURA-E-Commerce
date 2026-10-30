import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '../types/ecommerce';
import { DEMO_USERS } from '../data/ecommerceData';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, name?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  switchUser: (userId: string) => void;
  availableUsers: User[];
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const USER_STORAGE_KEY = 'aura_auth_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(USER_STORAGE_KEY);
        if (saved) return JSON.parse(saved);
      } catch {
        // Fallback to default demo user
      }
    }
    // Default logged in with Alex Chen for rich experience, or null
    return DEMO_USERS[0];
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_STORAGE_KEY);
    }
  }, [user]);

  const login = async (email: string, name?: string): Promise<{ success: boolean; error?: string }> => {
    // Check if email matches existing demo user
    const matched = DEMO_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (matched) {
      setUser(matched);
      setIsAuthModalOpen(false);
      return { success: true };
    }

    if (name) {
      // Create new user account
      const newUser: User = {
        _id: `usr_${Date.now()}`,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80`,
        role: 'developer',
        orderHistory: []
      };
      setUser(newUser);
      setIsAuthModalOpen(false);
      return { success: true };
    }

    // Default match if no name provided
    setUser({
      _id: `usr_${Date.now()}`,
      name: email.split('@')[0],
      email: email.toLowerCase(),
      avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80`,
      role: 'developer',
      orderHistory: []
    });
    setIsAuthModalOpen(false);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
  };

  const switchUser = (userId: string) => {
    const selected = DEMO_USERS.find((u) => u._id === userId);
    if (selected) {
      setUser(selected);
    }
  };

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        switchUser,
        availableUsers: DEMO_USERS,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
