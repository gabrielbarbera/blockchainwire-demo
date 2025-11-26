import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type ThemeName = 'bw' | 'cs';
export type ColorMode = 'light' | 'dark';

interface ThemeContextType {
  theme: ThemeName;
  colorMode: ColorMode;
  setTheme: (theme: ThemeName) => void;
  toggleColorMode: () => void;
  setColorMode: (mode: ColorMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeName>(() => {
    const saved = localStorage.getItem('theme');
    // Migrate old theme names to new ones
    if (saved === 'default') return 'bw';
    if (saved === 'wire') return 'cs';
    return (saved === 'bw' || saved === 'cs' ? saved : 'bw') as ThemeName;
  });

  const [colorMode, setColorModeState] = useState<ColorMode>(() => {
    const saved = localStorage.getItem('colorMode');
    return (saved === 'light' || saved === 'dark' ? saved : 'light') as ColorMode;
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('colorMode', colorMode);
    if (colorMode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [colorMode]);

  // Initialize on mount
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    if (colorMode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const setTheme = (newTheme: ThemeName) => {
    setThemeState(newTheme);
  };

  const toggleColorMode = () => {
    setColorModeState((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const setColorMode = (mode: ColorMode) => {
    setColorModeState(mode);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        colorMode,
        setTheme,
        toggleColorMode,
        setColorMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

