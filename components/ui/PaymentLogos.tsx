import React from 'react';

export const VisaLogo: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <img
      src="/cards/Visa.svg"
      alt="Visa"
      className={className}
    />
  );
};

export const MastercardLogo: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <img
      src="/cards/Mastercard.svg"
      alt="Mastercard"
      className={className}
    />
  );
};

export const AmexLogo: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <img
      src="/cards/Amex.svg"
      alt="American Express"
      className={className}
    />
  );
};

