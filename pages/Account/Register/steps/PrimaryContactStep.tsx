import React, { useState } from 'react';
import { Button } from '../../../../components/ui/Button';
import { Eye, EyeOff } from 'lucide-react';

interface PrimaryContactData {
  firstName: string;
  lastName: string;
  positionTitle: string;
  useCompanyAddress: boolean;
  country: string;
  address: string;
  address2: string;
  city: string;
  stateProvince: string;
  postalCode: string;
  primaryPhone: { countryCode: string; number: string };
  cellPhone: { countryCode: string; number: string };
  email: string;
  password: string;
  repeatPassword: string;
}

interface CompanyInfoData {
  country: string;
  address: string;
  address2: string;
  city: string;
  stateProvince: string;
  postalCode: string;
}

interface Props {
  data: PrimaryContactData;
  companyInfo: CompanyInfoData;
  onChange: (updates: Partial<PrimaryContactData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const PrimaryContactStep: React.FC<Props> = ({ data, onChange, companyInfo, onNext, onBack }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const handleChange = (field: keyof PrimaryContactData, value: any) => {
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

  const handleUseCompanyAddressChange = (checked: boolean) => {
    onChange({ useCompanyAddress: checked });
    if (checked) {
      onChange({
        country: companyInfo.country,
        address: companyInfo.address,
        address2: companyInfo.address2,
        city: companyInfo.city,
        stateProvince: companyInfo.stateProvince,
        postalCode: companyInfo.postalCode,
      });
    }
  };

  const validatePassword = (password: string): { valid: boolean; message: string } => {
    if (password.length < 6) {
      return { valid: false, message: 'Password must be at least 6 characters' };
    }
    if (!/[A-Z]/.test(password)) {
      return { valid: false, message: 'Password must contain at least one uppercase letter' };
    }
    if (!/[a-z]/.test(password)) {
      return { valid: false, message: 'Password must contain at least one lowercase letter' };
    }
    if (!/[0-9]/.test(password)) {
      return { valid: false, message: 'Password must contain at least one number' };
    }
    return { valid: true, message: '' };
  };

  const passwordValidation = validatePassword(data.password);
  const passwordsMatch = data.password === data.repeatPassword && data.repeatPassword.length > 0;

  const canProceed = () => {
    return data.firstName && data.lastName && data.country && 
           data.address && data.city && data.primaryPhone.number &&
           data.email && passwordValidation.valid && passwordsMatch;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-secondary-light p-6 sm:p-8">
      <h2 className="text-xl sm:text-2xl font-bold text-secondary-black mb-6">Primary Contact</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-secondary-dark mb-1">
              First name<span className="text-primary">*</span>
            </label>
            <input
              type="text"
              value={data.firstName}
              onChange={(e) => handleChange('firstName', e.target.value)}
              className="w-full bg-secondary-light/30 border border-secondary-light rounded p-2 text-secondary-black focus:border-primary focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-dark mb-1">
              Last name<span className="text-primary">*</span>
            </label>
            <input
              type="text"
              value={data.lastName}
              onChange={(e) => handleChange('lastName', e.target.value)}
              className="w-full bg-secondary-light/30 border border-secondary-light rounded p-2 text-secondary-black focus:border-primary focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-dark mb-1">
              Position/Title
            </label>
            <input
              type="text"
              value={data.positionTitle}
              onChange={(e) => handleChange('positionTitle', e.target.value)}
              className="w-full bg-secondary-light/30 border border-secondary-light rounded p-2 text-secondary-black focus:border-primary focus:outline-none transition-colors"
            />
          </div>

          <div className="flex items-center gap-2 mb-4">
            <input
              type="checkbox"
              id="useCompanyAddress"
              checked={data.useCompanyAddress}
              onChange={(e) => handleUseCompanyAddressChange(e.target.checked)}
              className="w-4 h-4 text-primary border-secondary-light rounded focus:ring-primary"
            />
            <label htmlFor="useCompanyAddress" className="text-sm text-secondary-dark">
              Address is the same as the one in the Company Information step
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-dark mb-1">
              Country<span className="text-primary">*</span>
            </label>
            <input
              type="text"
              value={data.country}
              onChange={(e) => handleChange('country', e.target.value)}
              disabled={data.useCompanyAddress}
              className="w-full bg-secondary-light/30 border border-secondary-light rounded p-2 text-secondary-black focus:border-primary focus:outline-none transition-colors disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-dark mb-1">
              Company Address<span className="text-primary">*</span>
            </label>
            <input
              type="text"
              value={data.address}
              onChange={(e) => handleChange('address', e.target.value)}
              disabled={data.useCompanyAddress}
              placeholder="No P.O. Boxes"
              className="w-full bg-secondary-light/30 border border-secondary-light rounded p-2 text-secondary-black focus:border-primary focus:outline-none transition-colors disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-dark mb-1">
              Company Address 2
            </label>
            <input
              type="text"
              value={data.address2}
              onChange={(e) => handleChange('address2', e.target.value)}
              disabled={data.useCompanyAddress}
              className="w-full bg-secondary-light/30 border border-secondary-light rounded p-2 text-secondary-black focus:border-primary focus:outline-none transition-colors disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-dark mb-1">
              City<span className="text-primary">*</span>
            </label>
            <input
              type="text"
              value={data.city}
              onChange={(e) => handleChange('city', e.target.value)}
              disabled={data.useCompanyAddress}
              className="w-full bg-secondary-light/30 border border-secondary-light rounded p-2 text-secondary-black focus:border-primary focus:outline-none transition-colors disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-dark mb-1">
              State/Province
            </label>
            <input
              type="text"
              value={data.stateProvince}
              onChange={(e) => handleChange('stateProvince', e.target.value)}
              disabled={data.useCompanyAddress}
              className="w-full bg-secondary-light/30 border border-secondary-light rounded p-2 text-secondary-black focus:border-primary focus:outline-none transition-colors disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-dark mb-1">
              Postal Code
            </label>
            <input
              type="text"
              value={data.postalCode}
              onChange={(e) => handleChange('postalCode', e.target.value)}
              disabled={data.useCompanyAddress}
              className="w-full bg-secondary-light/30 border border-secondary-light rounded p-2 text-secondary-black focus:border-primary focus:outline-none transition-colors disabled:opacity-50"
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-secondary-dark mb-1">
              Primary Phone<span className="text-primary">*</span>
            </label>
            <div className="flex gap-2">
              <div className="relative w-24">
                <select
                  value={data.primaryPhone.countryCode}
                  onChange={(e) => handlePhoneChange('primaryPhone', 'countryCode', e.target.value)}
                  className="w-full bg-secondary-light/30 border border-secondary-light rounded p-2 text-secondary-black focus:border-primary focus:outline-none transition-colors appearance-none pr-8"
                >
                  <option value="US+1">US+1</option>
                  <option value="CA+1">CA+1</option>
                  <option value="UK+44">UK+44</option>
                </select>
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 text-secondary-medium" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              <input
                type="tel"
                value={data.primaryPhone.number}
                onChange={(e) => handlePhoneChange('primaryPhone', 'number', e.target.value)}
                className="flex-1 bg-secondary-light/30 border border-secondary-light rounded p-2 text-secondary-black focus:border-primary focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-dark mb-1">
              Cell Phone
            </label>
            <div className="flex gap-2">
              <div className="relative w-24">
                <select
                  value={data.cellPhone.countryCode}
                  onChange={(e) => handlePhoneChange('cellPhone', 'countryCode', e.target.value)}
                  className="w-full bg-secondary-light/30 border border-secondary-light rounded p-2 text-secondary-black focus:border-primary focus:outline-none transition-colors appearance-none pr-8"
                >
                  <option value="US+1">US+1</option>
                  <option value="CA+1">CA+1</option>
                  <option value="UK+44">UK+44</option>
                </select>
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 text-secondary-medium" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              <input
                type="tel"
                value={data.cellPhone.number}
                onChange={(e) => handlePhoneChange('cellPhone', 'number', e.target.value)}
                className="flex-1 bg-secondary-light/30 border border-secondary-light rounded p-2 text-secondary-black focus:border-primary focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-dark mb-1">
              Email<span className="text-primary">*</span> <span className="text-xs text-secondary-medium">(Corporate Addresses only)</span>
            </label>
            <input
              type="email"
              value={data.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="w-full bg-secondary-light/30 border border-secondary-light rounded p-2 text-secondary-black focus:border-primary focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-dark mb-1">
              Password<span className="text-primary">*</span> <span className="text-xs text-secondary-medium">(Min length 6 characters, one uppercase, one lowercase and one number.)</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={data.password}
                onChange={(e) => handleChange('password', e.target.value)}
                className="w-full bg-secondary-light/30 border border-secondary-light rounded p-2 text-secondary-black focus:border-primary focus:outline-none transition-colors pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-secondary-medium hover:text-secondary-dark"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {data.password && !passwordValidation.valid && (
              <p className="text-xs text-red-500 mt-1">{passwordValidation.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-dark mb-1">
              Repeat Password<span className="text-primary">*</span>
            </label>
            <div className="relative">
              <input
                type={showRepeatPassword ? 'text' : 'password'}
                value={data.repeatPassword}
                onChange={(e) => handleChange('repeatPassword', e.target.value)}
                className="w-full bg-secondary-light/30 border border-secondary-light rounded p-2 text-secondary-black focus:border-primary focus:outline-none transition-colors pr-10"
              />
              <button
                type="button"
                onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-secondary-medium hover:text-secondary-dark"
              >
                {showRepeatPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {data.repeatPassword && !passwordsMatch && (
              <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-8 pt-6 border-t border-secondary-light">
        <Button variant="outline" onClick={onBack} size="lg">
          Previous
        </Button>
        <Button 
          onClick={onNext}
          disabled={!canProceed()}
          size="lg"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default PrimaryContactStep;

