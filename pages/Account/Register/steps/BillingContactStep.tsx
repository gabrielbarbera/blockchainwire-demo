import React from 'react';
import { Button } from '../../../../components/ui/Button';

interface BillingContactData {
  sameAsPrimary: boolean;
  firstName: string;
  lastName: string;
  positionTitle: string;
  country: string;
  address: string;
  address2: string;
  city: string;
  stateProvince: string;
  postalCode: string;
  primaryPhone: { countryCode: string; number: string };
  cellPhone: { countryCode: string; number: string };
  loginAccess: boolean;
}

interface PrimaryContactData {
  firstName: string;
  lastName: string;
  positionTitle: string;
  country: string;
  address: string;
  address2: string;
  city: string;
  stateProvince: string;
  postalCode: string;
  primaryPhone: { countryCode: string; number: string };
  cellPhone: { countryCode: string; number: string };
}

interface Props {
  data: BillingContactData;
  primaryContact: PrimaryContactData;
  onChange: (updates: Partial<BillingContactData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const BillingContactStep: React.FC<Props> = ({ data, onChange, primaryContact, onNext, onBack }) => {
  const handleChange = (field: keyof BillingContactData, value: any) => {
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

  const handleSameAsPrimaryChange = (checked: boolean) => {
    onChange({ sameAsPrimary: checked });
    if (checked) {
      onChange({
        firstName: primaryContact.firstName,
        lastName: primaryContact.lastName,
        positionTitle: primaryContact.positionTitle,
        country: primaryContact.country,
        address: primaryContact.address,
        address2: primaryContact.address2,
        city: primaryContact.city,
        stateProvince: primaryContact.stateProvince,
        postalCode: primaryContact.postalCode,
        primaryPhone: { ...primaryContact.primaryPhone },
        cellPhone: { ...primaryContact.cellPhone },
      });
    }
  };

  const canProceed = () => {
    if (data.sameAsPrimary) {
      return true;
    }
    return data.firstName && data.lastName && data.country && 
           data.address && data.city && data.primaryPhone.number;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-secondary-light p-6 sm:p-8">
      <h2 className="text-xl sm:text-2xl font-bold text-secondary-black mb-6">Billing Contact</h2>
      
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <input
            type="checkbox"
            id="sameAsPrimary"
            checked={data.sameAsPrimary}
            onChange={(e) => handleSameAsPrimaryChange(e.target.checked)}
            className="w-4 h-4 text-primary border-secondary-light rounded focus:ring-primary"
          />
          <label htmlFor="sameAsPrimary" className="text-sm font-medium text-secondary-dark">
            Billing Contact is same as the Primary Contact
          </label>
        </div>
      </div>

      {!data.sameAsPrimary && (
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

            <div>
              <label className="block text-sm font-medium text-secondary-dark mb-1">
                Country<span className="text-primary">*</span>
              </label>
              <input
                type="text"
                value={data.country}
                onChange={(e) => handleChange('country', e.target.value)}
                className="w-full bg-secondary-light/30 border border-secondary-light rounded p-2 text-secondary-black focus:border-primary focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-dark mb-1">
                Address<span className="text-primary">*</span> <span className="text-xs text-secondary-medium">(No P.O. Boxes)</span>
              </label>
              <input
                type="text"
                value={data.address}
                onChange={(e) => handleChange('address', e.target.value)}
                className="w-full bg-secondary-light/30 border border-secondary-light rounded p-2 text-secondary-black focus:border-primary focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-dark mb-1">
                Address 2
              </label>
              <input
                type="text"
                value={data.address2}
                onChange={(e) => handleChange('address2', e.target.value)}
                className="w-full bg-secondary-light/30 border border-secondary-light rounded p-2 text-secondary-black focus:border-primary focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-secondary-dark mb-1">
                City<span className="text-primary">*</span>
              </label>
              <input
                type="text"
                value={data.city}
                onChange={(e) => handleChange('city', e.target.value)}
                className="w-full bg-secondary-light/30 border border-secondary-light rounded p-2 text-secondary-black focus:border-primary focus:outline-none transition-colors"
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
                className="w-full bg-secondary-light/30 border border-secondary-light rounded p-2 text-secondary-black focus:border-primary focus:outline-none transition-colors"
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
                className="w-full bg-secondary-light/30 border border-secondary-light rounded p-2 text-secondary-black focus:border-primary focus:outline-none transition-colors"
              />
            </div>

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
          </div>
        </div>
      )}

      {/* Login Access Section */}
      <div className="mt-6 p-4 bg-secondary-light/30 rounded-lg">
        <div className="flex items-start gap-2 mb-2">
          <input
            type="checkbox"
            id="loginAccess"
            checked={data.loginAccess}
            onChange={(e) => handleChange('loginAccess', e.target.checked)}
            className="w-4 h-4 text-primary border-secondary-light rounded focus:ring-primary mt-1"
          />
          <label htmlFor="loginAccess" className="text-sm font-medium text-secondary-dark">
            Login Access
          </label>
        </div>
        <p className="text-xs text-secondary-medium pl-6">
          Please note, if the Primary User and the Billing Contact are not the same person, 
          please select whether the Billing Contact will have login access and User privileges 
          on the account. The Billing Contact can have their own access to the account, or they 
          can simply be added as a contact with no account access.
        </p>
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

export default BillingContactStep;

