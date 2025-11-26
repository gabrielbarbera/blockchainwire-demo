import React from 'react';
import { Button } from '../../../../components/ui/Button';
import { Card } from '../../../../components/ui/Card';
import { useThemeClasses } from '../../../../hooks/useThemeClasses';
import { useTheme } from '../../../../contexts/ThemeContext';

interface CompanyInfoData {
  companyName: string;
  country: string;
  address: string;
  address2: string;
  city: string;
  stateProvince: string;
  postalCode: string;
  referral: string;
  telegram: string;
  primaryPhone: { countryCode: string; number: string };
  cellPhone: { countryCode: string; number: string };
}

interface Props {
  data: CompanyInfoData;
  onChange: (updates: Partial<CompanyInfoData>) => void;
  onNext: () => void;
}

const CompanyInfoStep: React.FC<Props> = ({ data, onChange, onNext }) => {
  const classes = useThemeClasses();
  const { theme } = useTheme();
  
  const handleChange = (field: keyof CompanyInfoData, value: any) => {
    onChange({ [field]: value });
  };

  const handlePhoneChange = (phoneType: 'primaryPhone' | 'cellPhone', field: 'countryCode' | 'number', value: string) => {
    onChange({
      [phoneType]: {
        ...data[phoneType],
        [field]: value,
      },
    });
  };

  const canProceed = () => {
    return data.companyName && data.country && data.address && 
           data.city && data.primaryPhone.number;
  };

  return (
    <Card variant="default" className="p-6 sm:p-8">
      <h2 className={`text-xl sm:text-2xl font-bold mb-6 ${classes.text.black}`}>Company Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-1 ${classes.text.primary}`}>
              Company name<span className={theme === 'cs' ? 'text-wire-accent' : 'text-primary'}>*</span>
            </label>
            <input
              type="text"
              value={data.companyName}
              onChange={(e) => handleChange('companyName', e.target.value)}
              className={`w-full border rounded p-2 sm:p-2.5 text-sm sm:text-base focus:outline-none transition-colors ${classes.bg.tertiary} ${classes.border.default} ${classes.text.primary} ${theme === 'cs' ? 'focus:border-wire-accent' : 'focus:border-primary'}`}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-1 ${classes.text.primary}`}>
              Company Address<span className={theme === 'cs' ? 'text-wire-accent' : 'text-primary'}>*</span>
            </label>
            <input
              type="text"
              value={data.address}
              onChange={(e) => handleChange('address', e.target.value)}
              className={`w-full border rounded p-2 sm:p-2.5 text-sm sm:text-base focus:outline-none transition-colors ${classes.bg.tertiary} ${classes.border.default} ${classes.text.primary} ${theme === 'cs' ? 'focus:border-wire-accent' : 'focus:border-primary'}`}
              placeholder="No P.O. Boxes"
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-1 ${classes.text.primary}`}>
              City<span className={theme === 'cs' ? 'text-wire-accent' : 'text-primary'}>*</span>
            </label>
            <input
              type="text"
              value={data.city}
              onChange={(e) => handleChange('city', e.target.value)}
              className={`w-full border rounded p-2 sm:p-2.5 text-sm sm:text-base focus:outline-none transition-colors ${classes.bg.tertiary} ${classes.border.default} ${classes.text.primary} ${theme === 'cs' ? 'focus:border-wire-accent' : 'focus:border-primary'}`}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-1 ${classes.text.primary}`}>
              Postal Code
            </label>
            <input
              type="text"
              value={data.postalCode}
              onChange={(e) => handleChange('postalCode', e.target.value)}
              className={`w-full border rounded p-2 sm:p-2.5 text-sm sm:text-base focus:outline-none transition-colors ${classes.bg.tertiary} ${classes.border.default} ${classes.text.primary} ${theme === 'cs' ? 'focus:border-wire-accent' : 'focus:border-primary'}`}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-1 ${classes.text.primary}`}>
              Telegram
            </label>
            <input
              type="text"
              value={data.telegram}
              onChange={(e) => handleChange('telegram', e.target.value)}
              className={`w-full border rounded p-2 sm:p-2.5 text-sm sm:text-base focus:outline-none transition-colors ${classes.bg.tertiary} ${classes.border.default} ${classes.text.primary} ${theme === 'cs' ? 'focus:border-wire-accent' : 'focus:border-primary'}`}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-1 ${classes.text.primary}`}>
              Primary Phone<span className={theme === 'cs' ? 'text-wire-accent' : 'text-primary'}>*</span>
            </label>
            <div className="flex gap-2">
              <div className="relative w-24">
                <select
                  value={data.primaryPhone.countryCode}
                  onChange={(e) => handlePhoneChange('primaryPhone', 'countryCode', e.target.value)}
                  className={`w-full border rounded p-2 sm:p-2.5 text-sm sm:text-base focus:outline-none transition-colors appearance-none pr-8 ${classes.bg.tertiary} ${classes.border.default} ${classes.text.primary} ${theme === 'cs' ? 'focus:border-wire-accent' : 'focus:border-primary'}`}
                >
                  <option value="US+1">US+1</option>
                  <option value="CA+1">CA+1</option>
                  <option value="UK+44">UK+44</option>
                </select>
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className={`w-4 h-4 ${classes.text.secondary}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              <input
                type="tel"
                value={data.primaryPhone.number}
                onChange={(e) => handlePhoneChange('primaryPhone', 'number', e.target.value)}
                className={`flex-1 border rounded p-2 sm:p-2.5 text-sm sm:text-base focus:outline-none transition-colors ${classes.bg.tertiary} ${classes.border.default} ${classes.text.primary} ${theme === 'cs' ? 'focus:border-wire-accent' : 'focus:border-primary'}`}
              />
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-1 ${classes.text.primary}`}>
              Country<span className={theme === 'cs' ? 'text-wire-accent' : 'text-primary'}>*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={data.country}
                onChange={(e) => handleChange('country', e.target.value)}
                className={`w-full border rounded p-2 sm:p-2.5 text-sm sm:text-base focus:outline-none transition-colors pr-8 ${classes.bg.tertiary} ${classes.border.default} ${classes.text.primary} ${theme === 'cs' ? 'focus:border-wire-accent' : 'focus:border-primary'}`}
                list="countries"
              />
              <datalist id="countries">
                <option value="United States" />
                <option value="Canada" />
                <option value="United Kingdom" />
                <option value="Afghanistan" />
                <option value="Albania" />
              </datalist>
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className={`w-4 h-4 ${classes.text.secondary}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-1 ${classes.text.primary}`}>
              Company Address 2
            </label>
            <input
              type="text"
              value={data.address2}
              onChange={(e) => handleChange('address2', e.target.value)}
              className={`w-full border rounded p-2 sm:p-2.5 text-sm sm:text-base focus:outline-none transition-colors ${classes.bg.tertiary} ${classes.border.default} ${classes.text.primary} ${theme === 'cs' ? 'focus:border-wire-accent' : 'focus:border-primary'}`}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-1 ${classes.text.primary}`}>
              State/Province
            </label>
            <input
              type="text"
              value={data.stateProvince}
              onChange={(e) => handleChange('stateProvince', e.target.value)}
              className={`w-full border rounded p-2 sm:p-2.5 text-sm sm:text-base focus:outline-none transition-colors ${classes.bg.tertiary} ${classes.border.default} ${classes.text.primary} ${theme === 'cs' ? 'focus:border-wire-accent' : 'focus:border-primary'}`}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-1 ${classes.text.primary}`}>
              Referral
            </label>
            <input
              type="text"
              value={data.referral}
              onChange={(e) => handleChange('referral', e.target.value)}
              className={`w-full border rounded p-2 sm:p-2.5 text-sm sm:text-base focus:outline-none transition-colors ${classes.bg.tertiary} ${classes.border.default} ${classes.text.primary} ${theme === 'cs' ? 'focus:border-wire-accent' : 'focus:border-primary'}`}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-1 ${classes.text.primary}`}>
              Cell Phone
            </label>
            <div className="flex gap-2">
              <div className="relative w-24">
                <select
                  value={data.cellPhone.countryCode}
                  onChange={(e) => handlePhoneChange('cellPhone', 'countryCode', e.target.value)}
                  className={`w-full border rounded p-2 sm:p-2.5 text-sm sm:text-base focus:outline-none transition-colors appearance-none pr-8 ${classes.bg.tertiary} ${classes.border.default} ${classes.text.primary} ${theme === 'cs' ? 'focus:border-wire-accent' : 'focus:border-primary'}`}
                >
                  <option value="US+1">US+1</option>
                  <option value="CA+1">CA+1</option>
                  <option value="UK+44">UK+44</option>
                </select>
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className={`w-4 h-4 ${classes.text.secondary}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              <input
                type="tel"
                value={data.cellPhone.number}
                onChange={(e) => handlePhoneChange('cellPhone', 'number', e.target.value)}
                className={`flex-1 border rounded p-2 sm:p-2.5 text-sm sm:text-base focus:outline-none transition-colors ${classes.bg.tertiary} ${classes.border.default} ${classes.text.primary} ${theme === 'cs' ? 'focus:border-wire-accent' : 'focus:border-primary'}`}
              />
            </div>
          </div>
        </div>
      </div>

      <div className={`flex justify-end mt-8 pt-6 border-t ${classes.border.default}`}>
        <Button 
          onClick={onNext}
          disabled={!canProceed()}
          size="lg"
        >
          Next
        </Button>
      </div>
    </Card>
  );
};

export default CompanyInfoStep;

