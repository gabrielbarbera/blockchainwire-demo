import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'compact' | 'elevated' | 'outlined';
  hover?: boolean;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ 
  variant = 'default',
  hover = false,
  className = '',
  children,
  ...props 
}) => {
  const { theme, colorMode } = useTheme();
  
  const getBaseStyles = () => {
    if (theme === 'cs') {
      return colorMode === 'dark'
        ? 'bg-wire-bg rounded-lg border border-wire-bg-light'
        : 'bg-wire-bg-light-mode rounded-lg border border-gray-300';
    }
    return colorMode === 'dark'
      ? 'bg-gray-800 rounded-lg border border-gray-700'
      : 'bg-gray-50 rounded-lg border border-gray-300';
  };
  
  const variants = {
    default: 'shadow-sm p-6',
    compact: 'shadow-sm p-4',
    elevated: 'shadow-md p-6',
    outlined: 'shadow-none p-6 border-2',
  };

  const hoverStyles = hover 
    ? 'hover:shadow-md transition-all duration-200 cursor-pointer' 
    : '';

  return (
    <div 
      className={`${getBaseStyles()} ${variants[variant]} ${hoverStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ 
  className = '',
  children,
  ...props 
}) => {
  return (
    <div 
      className={`mb-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardContent: React.FC<CardContentProps> = ({ 
  className = '',
  children,
  ...props 
}) => {
  return (
    <div 
      className={className}
      {...props}
    >
      {children}
    </div>
  );
};

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardFooter: React.FC<CardFooterProps> = ({ 
  className = '',
  children,
  ...props 
}) => {
  const { theme, colorMode } = useTheme();
  
  const borderClass = theme === 'cs'
    ? colorMode === 'dark'
      ? 'border-wire-bg-light'
      : 'border-gray-300'
    : colorMode === 'dark'
      ? 'border-gray-700'
      : 'border-gray-300';
  
  return (
    <div 
      className={`mt-4 pt-4 border-t ${borderClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

