import { Tag } from "lucide-react";
import React from "react";
import { MOCK_PROMOS } from "../../constants";
import { Card } from "../../components/ui/Card";
import { useThemeClasses } from "../../hooks/useThemeClasses";
import { useTheme } from "../../contexts/ThemeContext";

const MOCK_PROMO_CODES = MOCK_PROMOS;

const PromoCodeHistory: React.FC = () => {
  const classes = useThemeClasses();
  const { theme, colorMode } = useTheme();
  
  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 animate-fade-in">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 sm:mb-8 gap-4">
        <div className={`flex items-center gap-2 ${classes.text.secondary}`}>
          <div className={`p-1.5 sm:p-2 rounded-lg ${classes.icon.container}`}>
            <Tag className={theme === 'cs' ? 'text-wire-accent' : 'text-primary'} size={18} />
          </div>
          <div>
            <h1 className={`text-lg sm:text-xl lg:text-2xl font-bold ${classes.text.black}`}>Promo Code History</h1>
          </div>
        </div>
      </div>

      {/* Promo Codes Table */}
      <Card variant="default" className="overflow-hidden shadow-sm">
        {/* Table Header */}
        <div className={`${classes.bg.secondary} border-b ${classes.border.default} sticky top-0 z-10`}>
          <div className={`hidden md:grid grid-cols-7 gap-4 px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold uppercase tracking-wider ${classes.text.secondary}`}>
            <div className="text-left">Promo Code</div>
            <div className="text-left">Circuit</div>
            <div className="text-left">Company</div>
            <div className="text-left">Discount</div>
            <div className="text-right">Remaining</div>
            <div className="text-left">Date Issued</div>
            <div className="text-left">Expiration</div>
          </div>
        </div>

        {MOCK_PROMO_CODES.length === 0 ? (
          <div className={`px-4 sm:px-6 py-16 text-center ${classes.bg.card}`}>
            <p className={`text-base sm:text-lg font-semibold mb-2 ${classes.text.black}`}>
              No Records
            </p>
            <p className={`text-sm ${classes.text.secondary}`}>
              No promo codes have been created yet.
            </p>
          </div>
        ) : (
          <div className={`divide-y ${classes.border.default}`}>
            {MOCK_PROMO_CODES.map((promo, index) => {
              const isExpiringSoon = () => {
                const expirationDate = new Date(promo.expirationDate);
                const today = new Date();
                const daysUntilExpiration = Math.ceil((expirationDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
                return daysUntilExpiration <= 30 && daysUntilExpiration > 0;
              };

              const isExpired = () => {
                const expirationDate = new Date(promo.expirationDate);
                const today = new Date();
                return expirationDate < today;
              };

              return (
                <div
                  key={index}
                  className={`md:grid md:grid-cols-7 md:gap-4 px-4 sm:px-6 py-3 sm:py-4 transition-colors duration-150 ${classes.bg.card} group ${
                    theme === 'cs'
                      ? colorMode === 'dark'
                        ? 'hover:bg-wire-bg-light'
                        : 'hover:bg-wire-bg-light-mode'
                      : colorMode === 'dark'
                        ? 'hover:bg-gray-700'
                        : 'hover:bg-secondary-light'
                  }`}
                >
                  {/* Mobile View */}
                  <div className="md:hidden space-y-3 py-2">
                    <div className="flex justify-between items-start gap-2">
                      <span className={`text-xs font-semibold ${classes.text.secondary} flex-shrink-0`}>Promo Code:</span>
                      <span className={`text-sm font-semibold text-right break-all ${theme === 'cs' ? 'text-wire-accent' : 'text-primary'}`}>{promo.code}</span>
                    </div>
                    <div className="flex justify-between items-center gap-2">
                      <span className={`text-xs font-semibold ${classes.text.secondary} flex-shrink-0`}>Circuit:</span>
                      <span className={`text-sm ${classes.text.primary} text-right`}>{promo.circuit}</span>
                    </div>
                    <div className="flex justify-between items-center gap-2">
                      <span className={`text-xs font-semibold ${classes.text.secondary} flex-shrink-0`}>Company:</span>
                      <span className={`text-sm ${classes.text.primary} text-right`}>{promo.company}</span>
                    </div>
                    <div className="flex justify-between items-center gap-2">
                      <span className={`text-xs font-semibold ${classes.text.secondary} flex-shrink-0`}>Discount:</span>
                      <span className={`text-sm font-medium ${classes.text.black} text-right`}>{promo.discount}</span>
                    </div>
                    <div className="flex justify-between items-center gap-2">
                      <span className={`text-xs font-semibold ${classes.text.secondary} flex-shrink-0`}>Remaining:</span>
                      <span className={`text-sm font-medium ${promo.remaining < 10 ? 'text-orange-600 dark:text-orange-400' : classes.text.black} text-right`}>
                        {promo.remaining}
                      </span>
                    </div>
                    <div className="flex justify-between items-center gap-2">
                      <span className={`text-xs font-semibold ${classes.text.secondary} flex-shrink-0`}>Date Issued:</span>
                      <span className={`text-sm ${classes.text.primary} text-right`}>{formatDate(promo.dateIssued)}</span>
                    </div>
                    <div className="flex justify-between items-center gap-2">
                      <span className={`text-xs font-semibold ${classes.text.secondary} flex-shrink-0`}>Expiration:</span>
                      <span className={`text-sm font-medium text-right ${
                        isExpired() 
                          ? 'text-red-600 dark:text-red-400' 
                          : isExpiringSoon() 
                            ? 'text-orange-600 dark:text-orange-400' 
                            : classes.text.primary
                      }`}>
                        {formatDate(promo.expirationDate)}
                      </span>
                    </div>
                  </div>

                  {/* Desktop View */}
                  <div className={`hidden md:block text-sm font-semibold ${theme === 'cs' ? 'text-wire-accent' : 'text-primary'} group-hover:opacity-80 transition-opacity`}>
                    {promo.code}
                  </div>
                  <div className={`hidden md:block text-sm ${classes.text.primary} truncate`}>
                    {promo.circuit}
                  </div>
                  <div className={`hidden md:block text-sm ${classes.text.primary} truncate`}>
                    {promo.company}
                  </div>
                  <div className={`hidden md:block text-sm font-medium ${classes.text.black}`}>
                    {promo.discount}
                  </div>
                  <div className={`hidden md:block text-sm font-medium text-right ${
                    promo.remaining < 10 ? 'text-orange-600 dark:text-orange-400' : classes.text.black
                  }`}>
                    {promo.remaining}
                  </div>
                  <div className={`hidden md:block text-sm ${classes.text.primary}`}>
                    {formatDate(promo.dateIssued)}
                  </div>
                  <div className={`hidden md:block text-sm font-medium ${
                    isExpired() 
                      ? 'text-red-600 dark:text-red-400' 
                      : isExpiringSoon() 
                        ? 'text-orange-600 dark:text-orange-400' 
                        : classes.text.primary
                  }`}>
                    {formatDate(promo.expirationDate)}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
};

export default PromoCodeHistory;
