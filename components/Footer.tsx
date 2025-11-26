import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const Footer: React.FC = () => {
  const { theme, colorMode } = useTheme();
  
  return (
    <footer className={`mt-auto border-t transition-colors ${
      theme === 'cs'
        ? colorMode === 'dark'
          ? 'bg-wire-bg-dark border-wire-bg'
          : 'bg-wire-bg-light-mode border-gray-300'
        : colorMode === 'dark'
          ? 'bg-gray-900 border-gray-700'
          : 'bg-gray-50 border-gray-300'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
          <div className={`text-sm ${
            theme === 'cs'
              ? colorMode === 'dark'
                ? 'text-wire-text-secondary'
                : 'text-gray-700'
              : colorMode === 'dark'
                ? 'text-gray-400'
                : 'text-gray-700'
          }`}>
            © 2025 Blockchain Wire - All rights reserved
          </div>
          <div className="flex flex-wrap justify-center md:justify-end gap-4 sm:gap-6">
            <a 
              href="#privacy" 
              className={`transition-colors text-sm ${
                theme === 'cs'
                  ? colorMode === 'dark'
                    ? 'text-wire-text-secondary hover:text-wire-accent'
                    : 'text-gray-700 hover:text-wire-accent'
                  : colorMode === 'dark'
                    ? 'text-gray-400 hover:text-primary-dark'
                    : 'text-gray-700 hover:text-primary'
              }`}
            >
              Privacy Policy
            </a>
            <a 
              href="#terms" 
              className={`transition-colors text-sm ${
                theme === 'cs'
                  ? colorMode === 'dark'
                    ? 'text-wire-text-secondary hover:text-wire-accent'
                    : 'text-gray-700 hover:text-wire-accent'
                  : colorMode === 'dark'
                    ? 'text-gray-400 hover:text-primary-dark'
                    : 'text-gray-700 hover:text-primary'
              }`}
            >
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

