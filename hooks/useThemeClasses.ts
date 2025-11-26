import { useTheme } from '../contexts/ThemeContext';

export const useThemeClasses = () => {
  const { theme, colorMode } = useTheme();
  
  const isDark = colorMode === 'dark';
  const isCS = theme === 'cs';
  
  return {
    bg: {
      primary: isCS
        ? isDark ? 'bg-wire-bg' : 'bg-wire-bg-light-mode'
        : isDark ? 'bg-gray-800' : 'bg-gray-50',
      secondary: isCS
        ? isDark ? 'bg-wire-bg-light' : 'bg-wire-bg-light-mode'
        : isDark ? 'bg-gray-700' : 'bg-gray-100',
      tertiary: isCS
        ? isDark ? 'bg-wire-bg-lighter' : 'bg-gray-100'
        : isDark ? 'bg-gray-600' : 'bg-gray-50',
      card: isCS
        ? isDark ? 'bg-wire-bg' : 'bg-wire-bg-light-mode'
        : isDark ? 'bg-gray-800' : 'bg-gray-50',
    },
    text: {
      primary: isCS
        ? isDark ? 'text-wire-text' : 'text-gray-900'
        : isDark ? 'text-gray-100' : 'text-gray-900',
      secondary: isCS
        ? isDark ? 'text-wire-text-secondary' : 'text-gray-700'
        : isDark ? 'text-gray-300' : 'text-gray-700',
      muted: isCS
        ? isDark ? 'text-wire-text-muted' : 'text-gray-600'
        : isDark ? 'text-gray-400' : 'text-gray-600',
      black: isCS
        ? isDark ? 'text-wire-text' : 'text-gray-900'
        : isDark ? 'text-gray-100' : 'text-gray-900',
    },
    border: {
      default: isCS
        ? isDark ? 'border-wire-bg-light' : 'border-gray-300'
        : isDark ? 'border-gray-700' : 'border-gray-300',
      accent: isCS
        ? isDark ? 'border-wire-accent' : 'border-wire-accent'
        : isDark ? 'border-primary-dark' : 'border-primary',
    },
    icon: {
      container: isCS
        ? isDark ? 'bg-wire-accent/20' : 'bg-wire-accent/10'
        : isDark ? 'bg-primary-dark/20' : 'bg-primary-light',
    },
  };
};

