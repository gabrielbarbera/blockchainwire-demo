import React, { useState, useRef } from 'react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { useThemeClasses } from '../../hooks/useThemeClasses';
import { useTheme } from '../../contexts/ThemeContext';
import { Upload, Info, X, CheckCircle, AlertCircle, UserCircle } from 'lucide-react';
import { useAccount } from '../../contexts/AccountContext';
import { useNavigate } from 'react-router-dom';

const AddAccount: React.FC = () => {
  const { addAccount } = useAccount();
  const navigate = useNavigate();
  const classes = useThemeClasses();
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState<'select-type' | 'create-account'>('select-type');
  
  const [answers, setAnswers] = useState<{
    billing: boolean | null;
    login: boolean | null;
    regulatory: boolean | null;
  }>({
    billing: null,
    login: null,
    regulatory: null,
  });

  const [formData, setFormData] = useState({
    accountName: '',
    city: '',
    state: '',
    postalCode: '',
    referral: '',
    country: '',
    address: '',
    contactEmail: '',
    primaryPhone: '',
    industry: '',
    website: '',
  });

  const needsPrimaryAccount = Object.values(answers).some(a => a === true);
  const accountType = needsPrimaryAccount ? 'Primary Account' : 'Secondary Account';

  const [logo, setLogo] = useState<{ file: File | null; preview: string | null; name: string }>({
    file: null,
    preview: null,
    name: '',
  });
  const logoInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAnswer = (question: 'billing' | 'login' | 'regulatory', answer: boolean) => {
    setAnswers(prev => ({ ...prev, [question]: answer }));
  };

  const handleContinue = () => {
    navigate('/register');
  };

  const handleSave = () => {
    if (!formData.accountName || !formData.city || !formData.country || 
        !formData.address || !formData.contactEmail || !formData.primaryPhone || 
        !formData.industry || !formData.website) {
      alert('Please fill in all required fields');
      return;
    }

    // Create new account
    const newAccount = {
      id: Date.now().toString(),
      name: formData.contactEmail.split('@')[0], // Use email prefix as name
      company: formData.accountName,
      country: formData.country,
      isPrimary: false,
    };

    addAccount(newAccount);
    
    // Navigate back to accounts page
    navigate('/account');
  };

  const handleLogoUpload = (file: File) => {
    const maxSize = 256 * 1024;
    if (file.size > maxSize) {
      alert(`File size must be less than 256KB. Your file is ${(file.size / 1024).toFixed(2)}KB`);
      return;
    }

    if (!file.type.match(/^image\/(jpeg|jpg|png)$/)) {
      alert('Only JPG and PNG files are allowed');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setLogo({
        file,
        preview: reader.result as string,
        name: file.name,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleLogoUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleLogoUpload(file);
    }
  };

  const removeLogo = () => {
    setLogo({ file: null, preview: null, name: '' });
    if (logoInputRef.current) {
      logoInputRef.current.value = '';
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 animate-fade-in">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 sm:mb-8 gap-4">
        <div className={`flex items-center gap-2 ${classes.text.secondary}`}>
          <div className={`p-1.5 sm:p-2 rounded-lg ${classes.icon.container}`}>
            <UserCircle className={theme === 'cs' ? 'text-wire-accent' : 'text-primary'} size={18} />
          </div>
          <div>
            <h1 className={`text-lg sm:text-xl lg:text-2xl font-bold ${classes.text.black}`}>Add Secondary Account</h1>
            <p className={`text-xs sm:text-sm ${classes.text.secondary}`}>Add a secondary account to send press releases under a different company name.</p>
          </div>
        </div>
      </div>

      <div className={`flex border-b mb-6 ${classes.border.default}`}>
        <button
          className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 ${
            activeTab === 'select-type'
              ? `${theme === 'cs' ? 'border-cs-accent text-cs-accent' : 'border-primary text-primary'}`
              : `border-transparent ${classes.text.secondary} hover:${classes.text.primary}`
          }`}
          onClick={() => setActiveTab('select-type')}
        >
          Select account Type
        </button>
        <button
          className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 ${
            activeTab === 'create-account'
              ? `${theme === 'cs' ? 'border-cs-accent text-cs-accent' : 'border-primary text-primary'}`
              : `border-transparent ${classes.text.secondary} hover:${classes.text.primary}`
          }`}
          onClick={() => setActiveTab('create-account')}
        >
          Create Account
        </button>
      </div>

      {activeTab === 'select-type' && (
        <div className="space-y-8">
          <Card variant="compact" className={`p-6 ${classes.bg.tertiary}`}>
            <div className="flex items-start gap-3 mb-4">
              <Info className={`mt-1 ${theme === 'cs' ? 'text-cs-accent' : 'text-primary'}`} size={20} />
              <h3 className={`text-lg font-bold ${classes.text.black}`}>Company Information</h3>
            </div>
            <p className={`text-sm mb-4 ${classes.text.primary}`}>
              This page allows you to add a new account. We Support two account types.
            </p>
            <div className={`space-y-4 text-sm pl-4 ${classes.text.primary}`}>
              <p>
                <span className="font-bold">1. Secondary Account:</span> a secondary account allows you to send press releases under a different company or organization name after logging into your primary account. Secondary accounts may also be setup with a separate logo, stock symbol(s) and public profile.
              </p>
              <p>
                <span className="font-bold">2. Primary Account:</span> a primary account is only used when you want an invoice/credit card charge for billable services to be sent to (paid by) another party and/or when users not on your primary account need to login to their own account.
              </p>
              <Card variant="compact" className={`italic p-3 mt-2 ${classes.bg.card}`}>
                In most cases, you will only need a secondary account. Please carefully consider whether you need a primary account. If you answer "YES" to any question below, you will need to set up a primary account.
              </Card>
            </div>
          </Card>

          <div className="space-y-6">
            <Card variant="compact" className={`flex items-center justify-between p-4 transition-all ${
              answers.billing === true 
                ? theme === 'cs' ? 'border-cs-accent bg-cs-accent/10' : 'border-primary bg-primary-light/10'
                : classes.border.default
            }`}>
              <span className={`text-sm font-medium ${classes.text.black}`}>Do you want the customer to be responsible for their own bills/credit card charges?</span>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant={answers.billing === true ? "primary" : "outline"}
                  onClick={() => handleAnswer('billing', true)}
                >
                  Yes
                </Button>
                <Button 
                  size="sm" 
                  variant={answers.billing === false ? "primary" : "outline"}
                  onClick={() => handleAnswer('billing', false)}
                >
                  No
                </Button>
              </div>
            </Card>

            <Card variant="compact" className={`flex items-center justify-between p-4 transition-all ${
              answers.login === true 
                ? theme === 'cs' ? 'border-cs-accent bg-cs-accent/10' : 'border-primary bg-primary-light/10'
                : classes.border.default
            }`}>
              <span className={`text-sm font-medium ${classes.text.black}`}>Will the customer's users need to login to review or approve?</span>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant={answers.login === true ? "primary" : "outline"}
                  onClick={() => handleAnswer('login', true)}
                >
                  Yes
                </Button>
                <Button 
                  size="sm" 
                  variant={answers.login === false ? "primary" : "outline"}
                  onClick={() => handleAnswer('login', false)}
                >
                  No
                </Button>
              </div>
            </Card>

            <Card variant="compact" className={`flex items-center justify-between p-4 transition-all ${
              answers.regulatory === true 
                ? theme === 'cs' ? 'border-cs-accent bg-cs-accent/10' : 'border-primary bg-primary-light/10'
                : classes.border.default
            }`}>
              <span className={`text-sm font-medium ${classes.text.black}`}>Will the customer use EDGAR, SEDAR or EU Regulatory filing services?</span>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant={answers.regulatory === true ? "primary" : "outline"}
                  onClick={() => handleAnswer('regulatory', true)}
                >
                  Yes
                </Button>
                <Button 
                  size="sm" 
                  variant={answers.regulatory === false ? "primary" : "outline"}
                  onClick={() => handleAnswer('regulatory', false)}
                >
                  No
                </Button>
              </div>
            </div>
          </div>

          {/* Summary and Continue Button */}
          {Object.values(answers).every(a => a !== null) && (
            <Card variant="compact" className={`mt-8 p-6 border-2 ${
              needsPrimaryAccount 
                ? theme === 'cs' ? 'bg-cs-accent/20 border-cs-accent' : 'bg-primary-light/20 border-primary'
                : 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700'
            }`}>
              <div className="flex items-start gap-3">
                {needsPrimaryAccount ? (
                  <AlertCircle className={`mt-1 flex-shrink-0 ${theme === 'cs' ? 'text-cs-accent' : 'text-primary'}`} size={20} />
                ) : (
                  <CheckCircle className="text-green-600 dark:text-green-400 mt-1 flex-shrink-0" size={20} />
                )}
                <div className="flex-1">
                  <h4 className={`font-bold mb-2 ${
                    needsPrimaryAccount 
                      ? theme === 'cs' ? 'text-cs-accent' : 'text-primary'
                      : 'text-green-800 dark:text-green-300'
                  }`}>
                    {needsPrimaryAccount 
                      ? 'Primary Account Required' 
                      : 'Secondary Account is Sufficient'}
                  </h4>
                  <p className={`text-sm mb-4 ${
                    needsPrimaryAccount ? classes.text.primary : 'text-green-700 dark:text-green-300'
                  }`}>
                    {needsPrimaryAccount 
                      ? 'Based on your answers, you need to create a Primary Account. This will redirect you to the full registration process.'
                      : 'Based on your answers, a Secondary Account is sufficient for your needs. You can proceed to create the account.'}
                  </p>
                  <Button 
                    onClick={handleContinue}
                    size="lg"
                    className="min-w-[120px]"
                  >
                    {needsPrimaryAccount ? 'Go to Registration' : 'Continue to Create Account'}
                  </Button>
            </div>
          </Card>
        )}
      )}
        </div>
      )}

      {activeTab === 'create-account' && (
        <Card variant="default" className="p-8">
          <div className="mb-6">
            <h3 className={`text-lg font-bold mb-2 ${classes.text.black}`}>Secondary Account Information</h3>
            <p className={`text-sm ${classes.text.secondary}`}>Fill in the details for your secondary account.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className={`block text-xs font-bold uppercase mb-1 ${classes.text.secondary}`}>Account Name:*</label>
              <input 
                name="accountName"
                value={formData.accountName}
                onChange={handleInputChange}
                className={`w-full border rounded p-2 focus:outline-none transition-all ${classes.bg.tertiary} ${classes.border.default} ${classes.text.black} ${theme === 'cs' ? 'focus:border-cs-accent' : 'focus:border-primary'}`}
              />
            </div>
            
            <div>
              <label className={`block text-xs font-bold uppercase mb-1 ${classes.text.secondary}`}>Primary Contact Phone:*</label>
              <input 
                name="primaryPhone"
                value={formData.primaryPhone}
                onChange={handleInputChange}
                className={`w-full border rounded p-2 focus:outline-none transition-all ${classes.bg.tertiary} ${classes.border.default} ${classes.text.black} ${theme === 'cs' ? 'focus:border-cs-accent' : 'focus:border-primary'}`}
              />
            </div>

            <div>
              <label className={`block text-xs font-bold uppercase mb-1 ${classes.text.secondary}`}>City:*</label>
              <input 
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className={`w-full border rounded p-2 focus:outline-none transition-all ${classes.bg.tertiary} ${classes.border.default} ${classes.text.black} ${theme === 'cs' ? 'focus:border-cs-accent' : 'focus:border-primary'}`}
              />
            </div>

            <div>
              <label className={`block text-xs font-bold uppercase mb-1 ${classes.text.secondary}`}>Business/Industry:*</label>
              <input 
                name="industry"
                value={formData.industry}
                onChange={handleInputChange}
                className={`w-full border rounded p-2 focus:outline-none transition-all ${classes.bg.tertiary} ${classes.border.default} ${classes.text.black} ${theme === 'cs' ? 'focus:border-cs-accent' : 'focus:border-primary'}`}
              />
            </div>

            <div>
              <label className={`block text-xs font-bold uppercase mb-1 ${classes.text.secondary}`}>State/Province:</label>
              <input 
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className={`w-full border rounded p-2 focus:outline-none transition-all ${classes.bg.tertiary} ${classes.border.default} ${classes.text.black} ${theme === 'cs' ? 'focus:border-cs-accent' : 'focus:border-primary'}`}
              />
            </div>

            <div>
              <label className={`block text-xs font-bold uppercase mb-1 ${classes.text.secondary}`}>Website:*</label>
              <input 
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                className={`w-full border rounded p-2 focus:outline-none transition-all ${classes.bg.tertiary} ${classes.border.default} ${classes.text.black} ${theme === 'cs' ? 'focus:border-cs-accent' : 'focus:border-primary'}`}
              />
            </div>

            <div>
              <label className={`block text-xs font-bold uppercase mb-1 ${classes.text.secondary}`}>Postal Code:</label>
              <input 
                name="postalCode"
                value={formData.postalCode}
                onChange={handleInputChange}
                className={`w-full border rounded p-2 focus:outline-none transition-all ${classes.bg.tertiary} ${classes.border.default} ${classes.text.black} ${theme === 'cs' ? 'focus:border-cs-accent' : 'focus:border-primary'}`}
              />
            </div>

            <div>
              <label className={`block text-xs font-bold uppercase mb-1 ${classes.text.secondary}`}>Referral:</label>
              <input 
                name="referral"
                value={formData.referral}
                onChange={handleInputChange}
                className={`w-full border rounded p-2 focus:outline-none transition-all ${classes.bg.tertiary} ${classes.border.default} ${classes.text.black} ${theme === 'cs' ? 'focus:border-cs-accent' : 'focus:border-primary'}`}
              />
            </div>
            
            <div className="hidden md:block"></div>

            <div>
              <label className={`block text-xs font-bold uppercase mb-1 ${classes.text.secondary}`}>Country*:</label>
              <input 
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className={`w-full border rounded p-2 focus:outline-none transition-all ${classes.bg.tertiary} ${classes.border.default} ${classes.text.black} ${theme === 'cs' ? 'focus:border-cs-accent' : 'focus:border-primary'}`}
              />
            </div>
             <div className="hidden md:block"></div>

            <div className="md:col-span-2">
              <label className={`block text-xs font-bold uppercase mb-1 ${classes.text.secondary}`}>Company Address:*</label>
              <input 
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className={`w-full border rounded p-2 focus:outline-none transition-all ${classes.bg.tertiary} ${classes.border.default} ${classes.text.black} ${theme === 'cs' ? 'focus:border-cs-accent' : 'focus:border-primary'}`}
              />
            </div>

            <div className="md:col-span-2">
              <label className={`block text-xs font-bold uppercase mb-1 ${classes.text.secondary}`}>Contact Email*:</label>
              <input 
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleInputChange}
                className={`w-full border rounded p-2 focus:outline-none transition-all ${classes.bg.tertiary} ${classes.border.default} ${classes.text.black} ${theme === 'cs' ? 'focus:border-cs-accent' : 'focus:border-primary'}`}
              />
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <h4 className={`font-bold flex items-center gap-2 ${classes.text.black}`}>
              <Upload size={18} /> Upload logo
            </h4>
            {logo.preview ? (
              <Card variant="compact" className="p-4">
                <div className="relative inline-block">
                  <img
                    src={logo.preview}
                    alt="Uploaded logo"
                    className="max-w-[200px] max-h-32 object-contain rounded"
                  />
                  <button
                    onClick={removeLogo}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                    aria-label="Remove logo"
                  >
                    <X size={16} />
                  </button>
                </div>
                <p className={`text-xs mt-2 ${classes.text.secondary}`}>{logo.name}</p>
              </Card>
            ) : (
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => logoInputRef.current?.click()}
                className={`border-2 border-dashed rounded-lg p-10 flex flex-col items-center justify-center transition-colors cursor-pointer ${classes.bg.tertiary} ${
                  isDragging 
                    ? theme === 'cs' ? 'border-cs-accent bg-cs-accent/10' : 'border-primary bg-primary-light/10'
                    : classes.border.default
                }`}
              >
                <Upload size={32} className={`mb-2 ${isDragging ? (theme === 'cs' ? 'text-cs-accent' : 'text-primary') : 'opacity-50'}`} />
                <p className={classes.text.secondary}>Drag and drop or <span className={`${theme === 'cs' ? 'text-cs-accent' : 'text-primary'} font-medium`}>browse</span></p>
                <input
                  ref={logoInputRef}
                  type="file"
                  accept="image/jpeg,image/jpg,image/png"
                  onChange={handleFileInputChange}
                  className="hidden"
                />
              </div>
            )}
            <div className={`text-xs font-medium mt-2 ${classes.text.primary}`}>
              Note:
              <br />
              <span className={`font-normal ${classes.text.secondary}`}>We accept jpg and png files, with a maximum allowed size of 256KB</span>
            </div>
          </div>

          <div className={`pt-4 border-t flex items-center justify-between ${classes.border.default}`}>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => setActiveTab('select-type')}
            >
              Back
            </Button>
            <Button 
              size="lg" 
              onClick={handleSave}
              className="min-w-[120px]"
            >
              Create Account
            </Button>
          </div>
        </div>
      )}


    </div>
  );
};

export default AddAccount;
