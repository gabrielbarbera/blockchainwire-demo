import React from 'react';

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
  const baseStyles = 'bg-white rounded-lg border border-secondary-light';
  
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
      className={`${baseStyles} ${variants[variant]} ${hoverStyles} ${className}`}
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
  return (
    <div 
      className={`mt-4 pt-4 border-t border-secondary-light ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

