import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'success' | 'error' | 'warning' | 'info' | 'default';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({ 
  children, 
  variant = 'default',
  size = 'md',
  className = '',
  ...props 
}) => {
  const { theme, colorMode } = useTheme();
  const isDark = colorMode === 'dark';
  const isCS = theme === 'cs';
  
  const getVariantClasses = () => {
    switch (variant) {
      case 'success':
        return isDark
          ? 'bg-green-900/30 text-green-300 border-green-700'
          : 'bg-green-50 text-green-700 border-green-200';
      case 'error':
        return isDark
          ? 'bg-red-900/30 text-red-300 border-red-700'
          : 'bg-red-50 text-red-700 border-red-200';
      case 'warning':
        return isDark
          ? 'bg-yellow-900/30 text-yellow-300 border-yellow-700'
          : 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'info':
        return isCS
          ? isDark
            ? 'bg-wire-accent/20 text-wire-accent border-wire-accent/30'
            : 'bg-wire-accent/10 text-wire-accent border-wire-accent/20'
          : isDark
            ? 'bg-primary-dark/20 text-primary-dark border-primary-dark/30'
            : 'bg-primary-light text-primary border-primary/30';
      default:
        return isCS
          ? isDark
            ? 'bg-wire-bg-light text-wire-text-secondary border-wire-bg-lighter'
            : 'bg-wire-bg-light-mode text-wire-text-dark border-wire-bg-light'
          : isDark
            ? 'bg-gray-700 text-gray-300 border-gray-600'
            : 'bg-secondary-light text-secondary-dark border-secondary-medium';
    }
  };
  
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2 py-1 text-xs';
  
  return (
    <span 
      className={`inline-flex items-center gap-1 rounded-full font-medium border ${getVariantClasses()} ${sizeClasses} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

