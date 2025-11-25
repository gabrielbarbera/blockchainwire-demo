import React, { useState } from 'react';
import { Settings, Building2, User, Upload, X, Mail, Key, FileText, Eye, EyeOff, ChevronDown } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';

interface CompanyInfo {
  companyName: string;
  country: string;
  companyAddress: string;
  companyAddress2: string;
  city: string;
  telegram: string;
  stateProvince: string;
  postalCode: string;
  referral: string;
  companyPhone: {
    countryCode: string;
    number: string;
  };
  cellPhone: {
    countryCode: string;
    number: string;
  };
}

interface AdditionalInfo {
  website: string;
  businessIndustry: string;
  companyType: string;
  structure: string;
  isin: string;
  stockExchange: string;
  market: string;
  stockSymbol: string;
  logo: string | null;
}

interface PrimaryContact {
  firstName: string;
  lastName: string;
  positionTitle: string;
  country: string;
  address: string;
  address2: string;
  city: string;
  stateProvince: string;
  postalCode: string;
  primaryPhone: {
    countryCode: string;
    number: string;
  };
  cellPhone: {
    countryCode: string;
    number: string;
  };
}

const AccountSettings: React.FC = () => {
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>({
    companyName: 'TechVision Inc',
    country: 'United States',
    companyAddress: '123 Innovation Drive',
    companyAddress2: 'Suite 500',
    city: 'San Francisco',
    telegram: '',
    stateProvince: 'California, US',
    postalCode: '94105',
    referral: '',
    companyPhone: {
      countryCode: 'US+1',
      number: '5551234567',
    },
    cellPhone: {
      countryCode: 'US+1',
      number: '',
    },
  });

  const [additionalInfo, setAdditionalInfo] = useState<AdditionalInfo>({
    website: 'www.techvision.com',
    businessIndustry: 'Technology',
    companyType: 'Public',
    structure: 'LLC',
    isin: 'US1234567890',
    stockExchange: 'Nasdaq',
    market: 'NASDAQ',
    stockSymbol: 'TVSN',
    logo: null,
  });

  const [primaryContact, setPrimaryContact] = useState<PrimaryContact>({
    firstName: 'Alex',
    lastName: 'Morgan',
    positionTitle: 'Marketing Director',
    country: 'United States',
    address: '123 Innovation Drive',
    address2: 'Suite 500',
    city: 'San Francisco',
    stateProvince: 'CA',
    postalCode: '94105',
    primaryPhone: {
      countryCode: 'US+1',
      number: '5551234567',
    },
    cellPhone: {
      countryCode: 'US+1',
      number: '5559876543',
    },
  });

  const handleCompanyInfoChange = (field: keyof CompanyInfo, value: any) => {
    setCompanyInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleAdditionalInfoChange = (field: keyof AdditionalInfo, value: any) => {
    setAdditionalInfo(prev => ({ ...prev, [field]: value }));
  };

  const handlePrimaryContactChange = (field: keyof PrimaryContact, value: any) => {
    setPrimaryContact(prev => ({ ...prev, [field]: value }));
  };

  const handlePhoneChange = (
    section: 'companyInfo' | 'primaryContact',
    phoneType: 'companyPhone' | 'cellPhone' | 'primaryPhone',
    field: 'countryCode' | 'number',
    value: string
  ) => {
    if (section === 'companyInfo') {
      setCompanyInfo(prev => ({
        ...prev,
        [phoneType]: {
          ...prev[phoneType as 'companyPhone' | 'cellPhone'],
          [field]: value,
        },
      }));
    } else {
      setPrimaryContact(prev => ({
        ...prev,
        [phoneType]: {
          ...prev[phoneType as 'primaryPhone' | 'cellPhone'],
          [field]: value,
        },
      }));
    }
  };

  const [expandedSections, setExpandedSections] = useState({
    companyInfo: true,
    additionalInfo: true,
    primaryContact: true,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 256 * 1024) {
        alert('File size must be less than 256KB');
        return;
      }
      if (!file.type.match(/^image\/(jpeg|jpg|png)$/)) {
        alert('Only JPG and PNG files are allowed');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setAdditionalInfo(prev => ({ ...prev, logo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveLogo = () => {
    setAdditionalInfo(prev => ({ ...prev, logo: null }));
  };

  const handleSave = () => {
    alert('Settings saved successfully!');
  };

  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [emailFormData, setEmailFormData] = useState({
    currentEmail: 'alex.morgan@techvision.com',
    newEmail: '',
    confirmEmail: '',
  });
  const [passwordFormData, setPasswordFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleChangeEmail = () => {
    setShowEmailModal(true);
    setEmailError('');
  };

  const handleChangePassword = () => {
    setShowPasswordModal(true);
    setPasswordError('');
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError('');

    if (!emailFormData.newEmail || !emailFormData.confirmEmail) {
      setEmailError('Please fill in all fields');
      return;
    }

    if (emailFormData.newEmail !== emailFormData.confirmEmail) {
      setEmailError('Email addresses do not match');
      return;
    }

    if (emailFormData.newEmail === emailFormData.currentEmail) {
      setEmailError('New email must be different from current email');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailFormData.newEmail)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    alert('Email change request submitted. Please check your new email for verification.');
    setShowEmailModal(false);
    setEmailFormData({ currentEmail: emailFormData.newEmail, newEmail: '', confirmEmail: '' });
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');

    if (!passwordFormData.currentPassword || !passwordFormData.newPassword || !passwordFormData.confirmPassword) {
      setPasswordError('Please fill in all fields');
      return;
    }

    if (passwordFormData.newPassword !== passwordFormData.confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    if (passwordFormData.newPassword.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
      return;
    }

    alert('Password changed successfully');
    setShowPasswordModal(false);
    setPasswordFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 animate-fade-in">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 sm:mb-8 gap-4">
        <div className="flex items-center gap-2 text-secondary-dark">
          <div className="p-1.5 sm:p-2 bg-primary-light rounded-lg">
            <Settings className="text-primary" size={18} />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-secondary-black">Account Settings</h1>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full md:w-auto">
          <Button
            onClick={handleChangeEmail}
            variant="outline"
            className="flex items-center justify-center gap-2 w-full sm:w-auto text-sm sm:text-base"
          >
            <Mail size={14} />
            Change Email
          </Button>

          <Button
            onClick={handleChangePassword}
            variant="outline"
            className="flex items-center justify-center gap-2 w-full sm:w-auto text-sm sm:text-base"
          >
            <Key size={14} />
            Change Password
          </Button>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6 sm:space-y-8">
        <Card>
          <button
            onClick={() => toggleSection('companyInfo')}
            className={`w-full flex items-center justify-between gap-3 hover:opacity-80 transition-opacity ${
              expandedSections.companyInfo ? 'mb-6' : 'mb-0'
            }`}
          >
            <div className="flex items-center gap-3">
              <Building2 className="text-secondary-dark" size={20} />
              <h2 className="text-lg sm:text-xl font-semibold text-secondary-black">Company Information</h2>
            </div>
            <ChevronDown 
              size={20} 
              className={`text-secondary-medium transition-transform duration-200 ${
                expandedSections.companyInfo ? 'rotate-180' : ''
              }`}
            />
          </button>

          {expandedSections.companyInfo && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6 animate-fade-in">
            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-sm font-medium text-secondary-dark mb-1">
                  Company Name:*
                </label>
                <input
                  type="text"
                  value={companyInfo.companyName}
                  onChange={(e) => handleCompanyInfoChange('companyName', e.target.value)}
                  className="w-full bg-secondary-light/30 border border-secondary-light rounded p-2 sm:p-2.5 text-sm sm:text-base text-secondary-black focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-dark mb-1">
                  Country:*
                </label>
                <input
                  type="text"
                  value={companyInfo.country}
                  onChange={(e) => handleCompanyInfoChange('country', e.target.value)}
                  className="w-full bg-secondary-light/30 border border-secondary-light rounded p-2 sm:p-2.5 text-sm sm:text-base text-secondary-black focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-dark mb-1">
                  Company Address:*
                </label>
                <input
                  type="text"
                  value={companyInfo.companyAddress}
                  onChange={(e) => handleCompanyInfoChange('companyAddress', e.target.value)}
                  className="w-full bg-secondary-light/30 border border-secondary-light rounded p-2 sm:p-2.5 text-sm sm:text-base text-secondary-black focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-dark mb-1">
                  Company Address 2:
                </label>
                <input
                  type="text"
                  value={companyInfo.companyAddress2}
                  onChange={(e) => handleCompanyInfoChange('companyAddress2', e.target.value)}
                  className="w-full bg-secondary-light/30 border border-secondary-light rounded p-2 sm:p-2.5 text-sm sm:text-base text-secondary-black focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-dark mb-1">
                  City:*
                </label>
                <input
                  type="text"
                  value={companyInfo.city}
                  onChange={(e) => handleCompanyInfoChange('city', e.target.value)}
                  className="w-full bg-secondary-light/30 border border-secondary-light rounded p-2 sm:p-2.5 text-sm sm:text-base text-secondary-black focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-dark mb-1">
                  Telegram:
                </label>
                <input
                  type="text"
                  value={companyInfo.telegram}
                  onChange={(e) => handleCompanyInfoChange('telegram', e.target.value)}
                  className="w-full bg-secondary-light/30 border border-secondary-light rounded p-2 sm:p-2.5 text-sm sm:text-base text-secondary-black focus:border-primary focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-secondary-dark mb-1">
                  State/Province:
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={companyInfo.stateProvince}
                    onChange={(e) => handleCompanyInfoChange('stateProvince', e.target.value)}
                    className="w-full bg-secondary-light/30 border border-secondary-light rounded p-2 text-secondary-black focus:border-primary focus:outline-none transition-colors pr-8"
                  />
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-secondary-medium" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-dark mb-1">
                  Postal Code:
                </label>
                <input
                  type="text"
                  value={companyInfo.postalCode}
                  onChange={(e) => handleCompanyInfoChange('postalCode', e.target.value)}
                  className="w-full bg-secondary-light/30 border border-secondary-light rounded p-2 sm:p-2.5 text-sm sm:text-base text-secondary-black focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-dark mb-1">
                  Referral:
                </label>
                <input
                  type="text"
                  value={companyInfo.referral}
                  onChange={(e) => handleCompanyInfoChange('referral', e.target.value)}
                  className="w-full bg-secondary-light/30 border border-secondary-light rounded p-2 sm:p-2.5 text-sm sm:text-base text-secondary-black focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-dark mb-1">
                  Company Phone:*
                </label>
                <div className="flex gap-2">
                  <div className="relative w-24">
                    <select
                      value={companyInfo.companyPhone.countryCode}
                      onChange={(e) => handlePhoneChange('companyInfo', 'companyPhone', 'countryCode', e.target.value)}
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
                    value={companyInfo.companyPhone.number}
                    onChange={(e) => handlePhoneChange('companyInfo', 'companyPhone', 'number', e.target.value)}
                    className="flex-1 bg-secondary-light/30 border border-secondary-light rounded p-2 text-secondary-black focus:border-primary focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-dark mb-1">
                  Cell Phone:
                </label>
                <div className="flex gap-2">
                  <div className="relative w-24">
                    <select
                      value={companyInfo.cellPhone.countryCode}
                      onChange={(e) => handlePhoneChange('companyInfo', 'cellPhone', 'countryCode', e.target.value)}
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
                    value={companyInfo.cellPhone.number}
                    onChange={(e) => handlePhoneChange('companyInfo', 'cellPhone', 'number', e.target.value)}
                    className="flex-1 bg-secondary-light/30 border border-secondary-light rounded p-2 text-secondary-black focus:border-primary focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>
          )}
        </Card>

        <Card>
          <button
            onClick={() => toggleSection('additionalInfo')}
            className={`w-full flex items-center justify-between gap-3 hover:opacity-80 transition-opacity ${
              expandedSections.additionalInfo ? 'mb-6' : 'mb-0'
            }`}
          >
            <div className="flex items-center gap-3">
              <FileText className="text-secondary-dark" size={20} />
              <h2 className="text-xl font-semibold text-secondary-black">Additional Company Information</h2>
            </div>
            <ChevronDown 
              size={20} 
              className={`text-secondary-medium transition-transform duration-200 ${
                expandedSections.additionalInfo ? 'rotate-180' : ''
              }`}
            />
          </button>

          {expandedSections.additionalInfo && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-secondary-dark mb-1">
                  Website:*
                </label>
                <input
                  type="url"
                  value={additionalInfo.website}
                  onChange={(e) => handleAdditionalInfoChange('website', e.target.value)}
                  className="w-full bg-secondary-light/30 border border-secondary-light rounded p-2 sm:p-2.5 text-sm sm:text-base text-secondary-black focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-dark mb-1">
                  Business/Industry:*
                </label>
                <input
                  type="text"
                  value={additionalInfo.businessIndustry}
                  onChange={(e) => handleAdditionalInfoChange('businessIndustry', e.target.value)}
                  className="w-full bg-secondary-light/30 border border-secondary-light rounded p-2 sm:p-2.5 text-sm sm:text-base text-secondary-black focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-dark mb-1">
                  Company Type:*
                </label>
                <div className="relative">
                  <select
                    value={additionalInfo.companyType}
                    onChange={(e) => handleAdditionalInfoChange('companyType', e.target.value)}
                    className="w-full bg-secondary-light/30 border border-secondary-light rounded p-2 text-secondary-black focus:border-primary focus:outline-none transition-colors appearance-none pr-8"
                  >
                    <option value="Public">Public</option>
                    <option value="Private">Private</option>
                  </select>
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-secondary-medium" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-dark mb-1">
                  Structure:*
                </label>
                <div className="relative">
                  <select
                    value={additionalInfo.structure}
                    onChange={(e) => handleAdditionalInfoChange('structure', e.target.value)}
                    className="w-full bg-secondary-light/30 border border-secondary-light rounded p-2 text-secondary-black focus:border-primary focus:outline-none transition-colors appearance-none pr-8"
                  >
                    <option value="LLC">LLC</option>
                    <option value="Corporation">Corporation</option>
                    <option value="Partnership">Partnership</option>
                    <option value="Sole Proprietorship">Sole Proprietorship</option>
                  </select>
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-secondary-medium" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-dark mb-1">
                  International Securities Identification Number (ISIN):*
                </label>
                <input
                  type="text"
                  value={additionalInfo.isin}
                  onChange={(e) => handleAdditionalInfoChange('isin', e.target.value)}
                  className="w-full bg-secondary-light/30 border border-secondary-light rounded p-2 sm:p-2.5 text-sm sm:text-base text-secondary-black focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-dark mb-1">
                  Stock Exchange:*
                </label>
                <input
                  type="text"
                  value={additionalInfo.stockExchange}
                  onChange={(e) => handleAdditionalInfoChange('stockExchange', e.target.value)}
                  className="w-full bg-secondary-light/30 border border-secondary-light rounded p-2 sm:p-2.5 text-sm sm:text-base text-secondary-black focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-dark mb-1">
                  Market:*
                </label>
                <input
                  type="text"
                  value={additionalInfo.market}
                  onChange={(e) => handleAdditionalInfoChange('market', e.target.value)}
                  className="w-full bg-secondary-light/30 border border-secondary-light rounded p-2 sm:p-2.5 text-sm sm:text-base text-secondary-black focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-dark mb-1">
                  Stock Symbol:*
                </label>
                <input
                  type="text"
                  value={additionalInfo.stockSymbol}
                  onChange={(e) => handleAdditionalInfoChange('stockSymbol', e.target.value)}
                  className="w-full bg-secondary-light/30 border border-secondary-light rounded p-2 sm:p-2.5 text-sm sm:text-base text-secondary-black focus:border-primary focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-dark mb-2">
                ↑ Upload logo
              </label>
              <div className="border-2 border-dashed border-secondary-light rounded-lg p-6 bg-secondary-light/10">
                {additionalInfo.logo ? (
                  <div className="relative">
                    <img
                      src={additionalInfo.logo}
                      alt="Company logo"
                      className="w-full h-48 object-contain rounded"
                    />
                    <button
                      onClick={handleRemoveLogo}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Upload className="mx-auto text-secondary-medium mb-2" size={32} />
                    <p className="text-sm text-secondary-medium mb-2">
                      Click to upload or drag and drop
                    </p>
                    <input
                      type="file"
                      accept="image/jpeg,image/jpg,image/png"
                      onChange={handleLogoUpload}
                      className="hidden"
                      id="logo-upload"
                    />
                    <label
                      htmlFor="logo-upload"
                      className="inline-block bg-primary text-white px-4 py-2 rounded cursor-pointer hover:bg-primary-hover transition-colors text-sm"
                    >
                      Choose File
                    </label>
                  </div>
                )}
              </div>
              <p className="text-xs text-secondary-medium mt-2">
                Note: We accept jpg and png files, with a maximum allowed size of 256KB
              </p>
            </div>
          </div>
          )}
        </Card>

        <Card>
          <button
            onClick={() => toggleSection('primaryContact')}
            className={`w-full flex items-center justify-between gap-3 hover:opacity-80 transition-opacity ${
              expandedSections.primaryContact ? 'mb-6' : 'mb-0'
            }`}
          >
            <div className="flex items-center gap-3">
              <User className="text-secondary-dark" size={20} />
              <h2 className="text-xl font-semibold text-secondary-black">Primary Contact</h2>
            </div>
            <ChevronDown 
              size={20} 
              className={`text-secondary-medium transition-transform duration-200 ${
                expandedSections.primaryContact ? 'rotate-180' : ''
              }`}
            />
          </button>

          {expandedSections.primaryContact && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-secondary-dark mb-1">
                  First Name:*
                </label>
                <input
                  type="text"
                  value={primaryContact.firstName}
                  onChange={(e) => handlePrimaryContactChange('firstName', e.target.value)}
                  className="w-full bg-secondary-light/30 border border-secondary-light rounded p-2 sm:p-2.5 text-sm sm:text-base text-secondary-black focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-dark mb-1">
                  Last Name:*
                </label>
                <input
                  type="text"
                  value={primaryContact.lastName}
                  onChange={(e) => handlePrimaryContactChange('lastName', e.target.value)}
                  className="w-full bg-secondary-light/30 border border-secondary-light rounded p-2 sm:p-2.5 text-sm sm:text-base text-secondary-black focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-dark mb-1">
                  Position/Title:
                </label>
                <input
                  type="text"
                  value={primaryContact.positionTitle}
                  onChange={(e) => handlePrimaryContactChange('positionTitle', e.target.value)}
                  className="w-full bg-secondary-light/30 border border-secondary-light rounded p-2 sm:p-2.5 text-sm sm:text-base text-secondary-black focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-dark mb-1">
                  Country:*
                </label>
                <input
                  type="text"
                  value={primaryContact.country}
                  onChange={(e) => handlePrimaryContactChange('country', e.target.value)}
                  className="w-full bg-secondary-light/30 border border-secondary-light rounded p-2 sm:p-2.5 text-sm sm:text-base text-secondary-black focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-dark mb-1">
                  Address (no p.o boxes):*
                </label>
                <input
                  type="text"
                  value={primaryContact.address}
                  onChange={(e) => handlePrimaryContactChange('address', e.target.value)}
                  className="w-full bg-secondary-light/30 border border-secondary-light rounded p-2 sm:p-2.5 text-sm sm:text-base text-secondary-black focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-dark mb-1">
                  Address 2:
                </label>
                <input
                  type="text"
                  value={primaryContact.address2}
                  onChange={(e) => handlePrimaryContactChange('address2', e.target.value)}
                  className="w-full bg-secondary-light/30 border border-secondary-light rounded p-2 sm:p-2.5 text-sm sm:text-base text-secondary-black focus:border-primary focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-secondary-dark mb-1">
                  City:*
                </label>
                <input
                  type="text"
                  value={primaryContact.city}
                  onChange={(e) => handlePrimaryContactChange('city', e.target.value)}
                  className="w-full bg-secondary-light/30 border border-secondary-light rounded p-2 sm:p-2.5 text-sm sm:text-base text-secondary-black focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-dark mb-1">
                  State/Province:
                </label>
                <input
                  type="text"
                  value={primaryContact.stateProvince}
                  onChange={(e) => handlePrimaryContactChange('stateProvince', e.target.value)}
                  className="w-full bg-secondary-light/30 border border-secondary-light rounded p-2 sm:p-2.5 text-sm sm:text-base text-secondary-black focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-dark mb-1">
                  Postal Code:
                </label>
                <input
                  type="text"
                  value={primaryContact.postalCode}
                  onChange={(e) => handlePrimaryContactChange('postalCode', e.target.value)}
                  className="w-full bg-secondary-light/30 border border-secondary-light rounded p-2 sm:p-2.5 text-sm sm:text-base text-secondary-black focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-dark mb-1">
                  Primary Contact Phone:*
                </label>
                <div className="flex gap-2">
                  <div className="relative w-24">
                    <select
                      value={primaryContact.primaryPhone.countryCode}
                      onChange={(e) => handlePhoneChange('primaryContact', 'primaryPhone', 'countryCode', e.target.value)}
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
                    value={primaryContact.primaryPhone.number}
                    onChange={(e) => handlePhoneChange('primaryContact', 'primaryPhone', 'number', e.target.value)}
                    className="flex-1 bg-secondary-light/30 border border-secondary-light rounded p-2 text-secondary-black focus:border-primary focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-dark mb-1">
                  Cell Phone:
                </label>
                <div className="flex gap-2">
                  <div className="relative w-24">
                    <select
                      value={primaryContact.cellPhone.countryCode}
                      onChange={(e) => handlePhoneChange('primaryContact', 'cellPhone', 'countryCode', e.target.value)}
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
                    value={primaryContact.cellPhone.number}
                    onChange={(e) => handlePhoneChange('primaryContact', 'cellPhone', 'number', e.target.value)}
                    className="flex-1 bg-secondary-light/30 border border-secondary-light rounded p-2 text-secondary-black focus:border-primary focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>
          )}
        </Card>

        <div className="pt-6 border-t border-secondary-light flex justify-end">
          <Button onClick={handleSave} size="lg" className="min-w-[120px]">
            Save
          </Button>
        </div>
      </div>

      {/* Change Email Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 sm:p-6">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full animate-fade-in max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="p-1.5 sm:p-2 bg-primary-light rounded-lg">
                    <Mail className="text-primary" size={18} />
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-secondary-black">Change Email</h2>
                </div>
                <button
                  onClick={() => {
                    setShowEmailModal(false);
                    setEmailError('');
                    setEmailFormData({ currentEmail: emailFormData.currentEmail, newEmail: '', confirmEmail: '' });
                  }}
                  className="p-2 hover:bg-secondary-light rounded-lg transition-colors flex-shrink-0"
                  aria-label="Close modal"
                >
                  <X size={18} className="text-secondary-medium" />
                </button>
              </div>

              <form onSubmit={handleEmailSubmit} className="space-y-3 sm:space-y-4">
                <div>
                  <label className="block text-sm font-medium text-secondary-dark mb-1">
                    Current Email
                  </label>
                  <input
                    type="email"
                    value={emailFormData.currentEmail}
                    disabled
                    className="w-full bg-secondary-light/30 border border-secondary-light rounded p-2 sm:p-2.5 text-sm sm:text-base text-secondary-medium cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-dark mb-1">
                    New Email *
                  </label>
                  <input
                    type="email"
                    value={emailFormData.newEmail}
                    onChange={(e) => setEmailFormData({ ...emailFormData, newEmail: e.target.value })}
                    className="w-full bg-secondary-light/30 border border-secondary-light rounded p-2 sm:p-2.5 text-sm sm:text-base text-secondary-black focus:border-primary focus:outline-none transition-colors"
                    placeholder="Enter new email address"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-dark mb-1">
                    Confirm New Email *
                  </label>
                  <input
                    type="email"
                    value={emailFormData.confirmEmail}
                    onChange={(e) => setEmailFormData({ ...emailFormData, confirmEmail: e.target.value })}
                    className="w-full bg-secondary-light/30 border border-secondary-light rounded p-2 sm:p-2.5 text-sm sm:text-base text-secondary-black focus:border-primary focus:outline-none transition-colors"
                    placeholder="Confirm new email address"
                    required
                  />
                </div>

                {emailError && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-2 sm:p-3">
                    <p className="text-xs sm:text-sm text-red-600">{emailError}</p>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-end pt-3 sm:pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    onClick={() => {
                      setShowEmailModal(false);
                      setEmailError('');
                      setEmailFormData({ currentEmail: emailFormData.currentEmail, newEmail: '', confirmEmail: '' });
                    }}
                    className="w-full sm:w-auto min-w-[120px] text-sm sm:text-base"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full sm:w-auto min-w-[120px] text-sm sm:text-base"
                  >
                    Change Email
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 sm:p-6">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full animate-fade-in max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="p-1.5 sm:p-2 bg-primary-light rounded-lg">
                    <Key className="text-primary" size={18} />
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-secondary-black">Change Password</h2>
                </div>
                <button
                  onClick={() => {
                    setShowPasswordModal(false);
                    setPasswordError('');
                    setPasswordFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                  }}
                  className="p-2 hover:bg-secondary-light rounded-lg transition-colors flex-shrink-0"
                  aria-label="Close modal"
                >
                  <X size={18} className="text-secondary-medium" />
                </button>
              </div>

              <form onSubmit={handlePasswordSubmit} className="space-y-3 sm:space-y-4">
                <div>
                  <label className="block text-sm font-medium text-secondary-dark mb-1">
                    Current Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? 'text' : 'password'}
                      value={passwordFormData.currentPassword}
                      onChange={(e) => setPasswordFormData({ ...passwordFormData, currentPassword: e.target.value })}
                      className="w-full bg-secondary-light/30 border border-secondary-light rounded p-2 sm:p-2.5 pr-9 sm:pr-10 text-sm sm:text-base text-secondary-black focus:border-primary focus:outline-none transition-colors"
                      placeholder="Enter current password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-secondary-medium hover:text-secondary-dark transition-colors"
                      aria-label={showCurrentPassword ? 'Hide password' : 'Show password'}
                    >
                      {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-dark mb-1">
                    New Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      value={passwordFormData.newPassword}
                      onChange={(e) => setPasswordFormData({ ...passwordFormData, newPassword: e.target.value })}
                      className="w-full bg-secondary-light/30 border border-secondary-light rounded p-2 sm:p-2.5 pr-9 sm:pr-10 text-sm sm:text-base text-secondary-black focus:border-primary focus:outline-none transition-colors"
                      placeholder="Enter new password (min. 8 characters)"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-secondary-medium hover:text-secondary-dark transition-colors"
                      aria-label={showNewPassword ? 'Hide password' : 'Show password'}
                    >
                      {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-dark mb-1">
                    Confirm New Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={passwordFormData.confirmPassword}
                      onChange={(e) => setPasswordFormData({ ...passwordFormData, confirmPassword: e.target.value })}
                      className="w-full bg-secondary-light/30 border border-secondary-light rounded p-2 sm:p-2.5 pr-9 sm:pr-10 text-sm sm:text-base text-secondary-black focus:border-primary focus:outline-none transition-colors"
                      placeholder="Confirm new password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-secondary-medium hover:text-secondary-dark transition-colors"
                      aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                    >
                      {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {passwordError && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-2 sm:p-3">
                    <p className="text-xs sm:text-sm text-red-600">{passwordError}</p>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-end pt-3 sm:pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    onClick={() => {
                      setShowPasswordModal(false);
                      setPasswordError('');
                      setPasswordFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                    }}
                    className="w-full sm:w-auto min-w-[120px] text-sm sm:text-base"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full sm:w-auto min-w-[120px] text-sm sm:text-base"
                  >
                    Change Password
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountSettings;

