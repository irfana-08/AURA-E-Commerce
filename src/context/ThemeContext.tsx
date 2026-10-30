import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeMode } from '../types/ecommerce';

interface ThemeContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = 'aura_theme_mode_v2';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
      if (saved === 'white-darkgreen' || saved === 'dark-forest') {
        return saved;
      }
    }
    return 'white-darkgreen';
  });

  const applyThemeWithTransition = (newTheme: ThemeMode) => {
    const root = document.documentElement;
    
    // Add transition class to trigger buttery smooth CSS variable interpolation
    root.classList.add('theme-transitioning');
    root.setAttribute('data-theme', newTheme);
    localStorage.setItem(STORAGE_KEY, newTheme);
    setThemeState(newTheme);

    // Remove transition class after animation duration to conserve rendering performance
    const timeout = setTimeout(() => {
      root.classList.remove('theme-transitioning');
    }, 450);

    return () => clearTimeout(timeout);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme: ThemeMode = theme === 'white-darkgreen' ? 'dark-forest' : 'white-darkgreen';
    applyThemeWithTransition(nextTheme);
  };

  const setTheme = (mode: ThemeMode) => {
    if (mode !== theme) {
      applyThemeWithTransition(mode);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme, isDark: theme === 'dark-forest' }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
