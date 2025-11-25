import React from 'react';
import { Menu } from 'lucide-react';

interface HeaderProps {
  onMenuClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <header className="bg-primary-light border-b border-secondary-light sticky top-0 z-[60]">
      <div className="max-w-full mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img 
              src="/logos/Logo Horizontal Color.svg" 
              alt="Blockchain Wire" 
              className="h-7 sm:h-8"
            />
          </div>

          <div className="flex items-center gap-3">
            {onMenuClick && (
              <button
                onClick={onMenuClick}
                className="lg:hidden p-2 hover:bg-white/50 rounded-md transition-colors"
                aria-label="Toggle menu"
              >
                <Menu size={24} className="text-secondary-black" />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

