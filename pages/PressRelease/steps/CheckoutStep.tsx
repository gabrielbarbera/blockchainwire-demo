import React, { useState } from 'react';
import { ReleaseFormData } from '../../../types';
import { CIRCUITS } from '../../../constants';
import { MOCK_PROMOS } from '../../../constants';
import { Button } from '../../../components/ui/Button';
import { VisaLogo, MastercardLogo, AmexLogo } from '../../../components/ui/PaymentLogos';

interface Props {
  data: ReleaseFormData;
  onBack: () => void;
}

const CheckoutStep: React.FC<Props> = ({ data, onBack }) => {
  const circuit = CIRCUITS.find(c => c.id === data.circuitId);
  const basePrice = circuit?.price || 0;
  
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiration: '',
    cvc: '',
    zipCode: '',
  });

  const [selectedPromoCode, setSelectedPromoCode] = useState<string>('');
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [showCryptoModal, setShowCryptoModal] = useState(false);

  const handlePaymentChange = (field: string, value: string) => {
    setPaymentData(prev => ({ ...prev, [field]: value }));
  };

  const handlePromoCodeChange = (code: string) => {
    setSelectedPromoCode(code);
    if (code) {
      const promo = MOCK_PROMOS.find(p => p.code === code);
      if (promo) {
        const discountPercent = parseFloat(promo.discount.replace('%', ''));
        const discount = (basePrice * discountPercent) / 100;
        setPromoDiscount(discount);
      } else {
        setPromoDiscount(0);
      }
    } else {
      setPromoDiscount(0);
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    handlePaymentChange('cardNumber', formatted);
  };

  const formatExpiration = (value: string) => {
    const v = value.replace(/\D/g, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handleExpirationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiration(e.target.value);
    handlePaymentChange('expiration', formatted);
  };

  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').substring(0, 4);
    handlePaymentChange('cvc', value);
  };

  const handleZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').substring(0, 5);
    handlePaymentChange('zipCode', value);
  };

  const total = basePrice - promoDiscount;

  return (
    <div className="space-y-8 animate-fade-in bg-white p-8 rounded-lg shadow-sm border border-secondary-light">
      <h2 className="text-xl font-semibold text-secondary-black">6. Checkout</h2>

      <div className="bg-secondary-light/30 p-6 rounded border border-secondary-medium/30">
        <h3 className="font-bold text-lg mb-4 text-secondary-dark">Purchase Summary</h3>
        <div className="flex justify-between items-center mb-2 text-secondary-dark">
           <span>Press Release: {circuit?.name}</span>
           <span>x1</span>
        </div>
        <div className="flex justify-between items-center font-bold text-xl border-t border-secondary-medium/30 pt-2 mt-2 text-secondary-black">
           <span>Total</span>
           <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium text-secondary-dark">Use Promo Code</label>
        <select
          value={selectedPromoCode}
          onChange={(e) => handlePromoCodeChange(e.target.value)}
          className="w-full border border-secondary-medium/50 p-2 rounded bg-white text-secondary-black focus:outline-none focus:border-primary"
        >
          <option value="">Select Promo Code</option>
          {MOCK_PROMOS.map((promo) => (
            <option key={promo.code} value={promo.code}>
              {promo.code} - {promo.discount} off
            </option>
          ))}
        </select>
        <div className="flex justify-between text-sm text-secondary-dark">
          <span>Promo Discount:</span>
          <span>${promoDiscount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold text-lg text-secondary-black">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <div className="border-t border-secondary-light pt-6 space-y-4">
        <h3 className="font-bold text-secondary-black">Card Info</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-xs text-secondary-medium">Card Number*</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={paymentData.cardNumber}
                onChange={handleCardNumberChange}
                maxLength={19}
                className="flex-1 border border-secondary-medium/50 p-2 rounded bg-white text-secondary-black placeholder-secondary-medium focus:outline-none focus:border-primary"
                placeholder="XXXX XXXX XXXX XXXX"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
               <label className="block text-xs text-secondary-medium">Expiration*</label>
               <input
                 type="text"
                 value={paymentData.expiration}
                 onChange={handleExpirationChange}
                 maxLength={5}
                 className="w-full border border-secondary-medium/50 p-2 rounded bg-white text-secondary-black placeholder-secondary-medium focus:outline-none focus:border-primary"
                 placeholder="MM/YY"
               />
            </div>
            <div>
               <label className="block text-xs text-secondary-medium">CVC*</label>
               <input
                 type="text"
                 value={paymentData.cvc}
                 onChange={handleCvcChange}
                 maxLength={4}
                 className="w-full border border-secondary-medium/50 p-2 rounded bg-white text-secondary-black placeholder-secondary-medium focus:outline-none focus:border-primary"
                 placeholder="123"
               />
            </div>
          </div>
          <div>
             <label className="block text-xs text-secondary-medium">Zip Code*</label>
             <input
               type="text"
               value={paymentData.zipCode}
               onChange={handleZipCodeChange}
               maxLength={5}
               className="w-1/3 border border-secondary-medium/50 p-2 rounded bg-white text-secondary-black placeholder-secondary-medium focus:outline-none focus:border-primary"
               placeholder="12345"
             />
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <div className="h-8 w-14 rounded overflow-hidden">
            <VisaLogo className="w-full h-full" />
          </div>
          <div className="h-8 w-14 rounded overflow-hidden">
            <MastercardLogo className="w-full h-full" />
          </div>
          <div className="h-8 w-14 rounded overflow-hidden">
            <AmexLogo className="w-full h-full" />
          </div>
        </div>
      </div>

      <div className="flex gap-4 pt-4">
        <Button size="lg" className="flex-1">Pay Now</Button>
        <Button 
          size="lg" 
          className="flex-1"
          onClick={() => setShowCryptoModal(true)}
        >
          Pay with Crypto
        </Button>
      </div>

      {/* Crypto Payment Modal */}
      {showCryptoModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 sm:p-6">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full animate-fade-in">
            <div className="p-6 sm:p-8 text-center">
              {/* Info Icon */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl sm:text-3xl font-normal leading-none">i</span>
                </div>
              </div>
              
              {/* Modal Text */}
              <div className="mb-6 sm:mb-8">
                <p className="text-sm sm:text-base text-secondary-black font-medium">
                  Continue to <span className="text-primary">NOWPayments</span>
                </p>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Button 
                  onClick={() => {
                    setShowCryptoModal(false);
                  }}
                  size="lg"
                  className="w-full sm:w-auto min-w-[120px] text-sm sm:text-base"
                >
                  Yes
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                  onClick={() => setShowCryptoModal(false)}
                  className="w-full sm:w-auto min-w-[120px] text-sm sm:text-base"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default CheckoutStep;