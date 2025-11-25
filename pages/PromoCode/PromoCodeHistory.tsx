import { Tag } from "lucide-react";
import React from "react";
import { MOCK_PROMOS } from "../../constants";

const MOCK_PROMO_CODES = MOCK_PROMOS;

const PromoCodeHistory: React.FC = () => {
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
    <div className="max-w-7xl mx-auto pb-20 animate-fade-in">
      {/* Header Section */}
      <div className="flex items-center gap-2 text-secondary-dark mb-8">
        <div className="p-2 bg-primary-light rounded-lg">
          <Tag className="text-primary" size={20} />
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-secondary-black">Promo Code History</h1>
        </div>
      </div>

      {/* Promo Codes Table */}
      <div className="bg-white rounded-lg border border-secondary-light shadow-sm overflow-hidden">
        <div className="bg-secondary-light/30 border-b border-secondary-light">
          <div className="hidden md:grid grid-cols-7 gap-4 px-4 sm:px-6 py-4 text-sm font-semibold text-secondary-dark">
            <div>Promo Code</div>
            <div>Circuit</div>
            <div>Company</div>
            <div>Discount</div>
            <div>Remaining Codes</div>
            <div>Date Issued</div>
            <div>Expiration Date</div>
          </div>
        </div>

        {MOCK_PROMO_CODES.length === 0 ? (
          <div className="px-4 sm:px-6 py-16 text-center">
            <p className="text-lg font-semibold text-secondary-black">
              No Records
            </p>
          </div>
        ) : (
          <div className="divide-y divide-secondary-light">
            {MOCK_PROMO_CODES.map((promo, index) => (
              <div
                key={index}
                className="md:grid md:grid-cols-7 md:gap-4 px-4 sm:px-6 py-4 hover:bg-secondary-light/10 transition-colors"
              >
                <div className="md:hidden space-y-2">
                  <div className="flex justify-between">
                    <span className="text-xs font-semibold text-secondary-dark">Promo Code:</span>
                    <span className="text-sm text-secondary-black font-medium">{promo.code}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs font-semibold text-secondary-dark">Circuit:</span>
                    <span className="text-sm text-secondary-dark">{promo.circuit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs font-semibold text-secondary-dark">Company:</span>
                    <span className="text-sm text-secondary-dark">{promo.company}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs font-semibold text-secondary-dark">Discount:</span>
                    <span className="text-sm text-secondary-dark">{promo.discount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs font-semibold text-secondary-dark">Remaining:</span>
                    <span className="text-sm text-secondary-dark">{promo.remaining}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs font-semibold text-secondary-dark">Date Issued:</span>
                    <span className="text-sm text-secondary-dark">{formatDate(promo.dateIssued)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs font-semibold text-secondary-dark">Expiration:</span>
                    <span className="text-sm text-secondary-dark">{formatDate(promo.expirationDate)}</span>
                  </div>
                </div>
                <div className="hidden md:block text-sm text-secondary-black font-medium">
                  {promo.code}
                </div>
                <div className="hidden md:block text-sm text-secondary-dark">
                  {promo.circuit}
                </div>
                <div className="hidden md:block text-sm text-secondary-dark">
                  {promo.company}
                </div>
                <div className="hidden md:block text-sm text-secondary-dark">
                  {promo.discount}
                </div>
                <div className="hidden md:block text-sm text-secondary-dark">
                  {promo.remaining}
                </div>
                <div className="hidden md:block text-sm text-secondary-dark">
                  {formatDate(promo.dateIssued)}
                </div>
                <div className="hidden md:block text-sm text-secondary-dark">
                  {formatDate(promo.expirationDate)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PromoCodeHistory;
