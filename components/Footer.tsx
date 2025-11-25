import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-auto border-t border-secondary-light bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
          <div className="text-secondary-dark text-sm">
            © 2025 Blockchain Wire - All rights reserved
          </div>
          <div className="flex flex-wrap justify-center md:justify-end gap-4 sm:gap-6">
            <a 
              href="#privacy" 
              className="text-secondary-dark hover:text-primary transition-colors text-sm"
            >
              Privacy Policy
            </a>
            <a 
              href="#terms" 
              className="text-secondary-dark hover:text-primary transition-colors text-sm"
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

