import React from 'react';
import { Menu } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface HeaderProps {
  onMenuClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { theme, colorMode } = useTheme();
  
  return (
    <header className={`sticky top-0 z-[60] border-b transition-colors ${
      theme === 'cs'
        ? colorMode === 'dark'
          ? 'bg-wire-bg border-wire-bg-light'
          : 'bg-wire-bg-light-mode border-gray-300'
        : colorMode === 'dark'
          ? 'bg-gray-900 border-gray-700'
          : 'bg-primary-light border-gray-300'
    }`}>
      <div className="max-w-full mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img 
              src={`${import.meta.env.BASE_URL}logos/${
                theme === 'cs'
                  ? colorMode === 'dark'
                    ? 'CS Logo Horizontal Color White.svg'
                    : 'CS Logo Horizontal Color.svg'
                  : colorMode === 'dark'
                    ? 'Logo Horizontal Color White.svg'
                    : 'Logo Horizontal Color.svg'
              }`}
              alt={theme === 'cs' ? 'Content Syndicate' : 'Blockchain Wire'} 
              className="h-7 sm:h-8"
            />
          </div>

          <div className="flex items-center gap-3">
            {onMenuClick && (
              <button
                onClick={onMenuClick}
                className={`lg:hidden p-2 rounded-md transition-colors ${
                  theme === 'cs'
                    ? colorMode === 'dark'
                      ? 'hover:bg-wire-bg-light text-wire-text-secondary'
                      : 'hover:bg-wire-bg-light text-wire-text-dark'
                    : colorMode === 'dark'
                      ? 'hover:bg-gray-800 text-gray-300'
                      : 'hover:bg-white/50 text-secondary-black'
                }`}
                aria-label="Toggle menu"
              >
                <Menu size={24} />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

