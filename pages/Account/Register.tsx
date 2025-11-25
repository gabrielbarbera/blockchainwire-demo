import React, { useState } from 'react';
import { Building2, FileText, User, CreditCard, FileCheck, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { useAccount } from '../../contexts/AccountContext';
import { useNavigate } from 'react-router-dom';
import CompanyInfoStep from './Register/steps/CompanyInfoStep';
import AdditionalInfoStep from './Register/steps/AdditionalInfoStep';
import PrimaryContactStep from './Register/steps/PrimaryContactStep';
import BillingContactStep from './Register/steps/BillingContactStep';
import TermsStep from './Register/steps/TermsStep';

const STEPS = [
  { id: 1, label: 'Company Information', icon: Building2 },
  { id: 2, label: 'Additional Company Information', icon: FileText },
  { id: 3, label: 'Primary Contact', icon: User },
  { id: 4, label: 'Billing Contact', icon: CreditCard },
  { id: 5, label: 'Terms & Conditions', icon: FileCheck },
];

export interface RegistrationFormData {
  companyInfo: {
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
  };
  additionalInfo: {
    website: string;
    businessIndustry: string;
    companyType: 'Public' | 'Private';
    structure: string;
    isin: string;
    stockExchange: string;
    market: string;
    stockSymbol: string;
    logo: File | null;
  };
  primaryContact: {
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
  };
  billingContact: {
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
  };
  terms: {
    recaptchaCompleted: boolean;
    termsAgreed: boolean;
  };
}

const Register: React.FC = () => {
  const { addAccount } = useAccount();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<RegistrationFormData>({
    companyInfo: {
      companyName: '',
      country: '',
      address: '',
      address2: '',
      city: '',
      stateProvince: '',
      postalCode: '',
      referral: '',
      telegram: '',
      primaryPhone: { countryCode: 'US+1', number: '' },
      cellPhone: { countryCode: 'US+1', number: '' },
    },
    additionalInfo: {
      website: '',
      businessIndustry: '',
      companyType: 'Private',
      structure: '',
      isin: '',
      stockExchange: '',
      market: '',
      stockSymbol: '',
      logo: null,
    },
    primaryContact: {
      firstName: '',
      lastName: '',
      positionTitle: '',
      useCompanyAddress: false,
      country: '',
      address: '',
      address2: '',
      city: '',
      stateProvince: '',
      postalCode: '',
      primaryPhone: { countryCode: 'US+1', number: '' },
      cellPhone: { countryCode: 'US+1', number: '' },
      email: '',
      password: '',
      repeatPassword: '',
    },
    billingContact: {
      sameAsPrimary: true,
      firstName: '',
      lastName: '',
      positionTitle: '',
      country: '',
      address: '',
      address2: '',
      city: '',
      stateProvince: '',
      postalCode: '',
      primaryPhone: { countryCode: 'US+1', number: '' },
      cellPhone: { countryCode: 'US+1', number: '' },
      loginAccess: false,
    },
    terms: {
      recaptchaCompleted: false,
      termsAgreed: false,
    },
  });

  const updateFormData = (updates: Partial<RegistrationFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 5));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));
  const goToStep = (stepId: number) => {
    setCurrentStep(stepId);
  };

  const handleSubmit = () => {
    // Create primary account from registration data
    const newAccount = {
      id: Date.now().toString(),
      name: `${formData.primaryContact.firstName} ${formData.primaryContact.lastName}`,
      company: formData.companyInfo.companyName,
      country: formData.companyInfo.country,
      isPrimary: true,
    };

    addAccount(newAccount);
    
    // In a real app, you would:
    // 1. Submit formData to API
    // 2. Handle authentication/login
    // 3. Redirect to dashboard
    
    // For now, show success and redirect
    alert('Registration submitted successfully! Your account is pending verification.');
    navigate('/account');
  };

  return (
    <>
      {/* Header with step navigation */}
      <div className="fixed top-0 left-0 right-0 bg-white border-b border-secondary-light shadow-md z-40">
        <div className="max-w-6xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between py-2 sm:py-3 lg:py-4 gap-2 sm:gap-3 lg:gap-4">
            <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto flex-1 scrollbar-hide -mx-2 sm:mx-0 px-2 sm:px-0">
              {STEPS.map((step) => {
                const Icon = step.icon;
                const active = step.id === currentStep;
                const completed = step.id < currentStep;
                
                return (
                  <button
                    key={step.id}
                    onClick={() => goToStep(step.id)}
                    className={`flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 rounded-md transition-all whitespace-nowrap cursor-pointer hover:bg-secondary-light/50 active:scale-95 touch-manipulation ${
                      active 
                        ? 'text-primary bg-primary-light font-medium shadow-sm' 
                        : completed 
                        ? 'text-secondary-dark hover:text-primary hover:bg-primary-light/30' 
                        : 'text-secondary-medium hover:text-secondary-dark'
                    }`}
                    title={`${step.id}. ${step.label}`}
                    aria-label={`Step ${step.id}: ${step.label}`}
                  >
                    <div className={`flex-shrink-0 w-7 h-7 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-xs sm:text-xs font-semibold transition-all ${
                      active 
                        ? 'bg-primary text-white shadow-md scale-110' 
                        : completed 
                        ? 'bg-secondary-dark text-white' 
                        : 'bg-secondary-light text-secondary-medium'
                    }`}>
                      {completed ? (
                        <CheckCircle size={active ? 16 : 14} className="sm:w-3.5 sm:h-3.5" />
                      ) : (
                        <span className={active ? 'text-sm' : ''}>{step.id}</span>
                      )}
                    </div>
                    <span className="hidden md:inline text-sm lg:text-base">{step.label}</span>
                    <span className="md:hidden text-[10px] sm:text-xs font-medium opacity-80 max-w-[60px] truncate">
                      {step.label.split(' ')[0]}
                    </span>
                    {active && (
                      <Icon size={14} className="hidden lg:inline-flex text-primary" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0 ml-1 sm:ml-0">
              {currentStep > 1 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={prevStep}
                  className="flex items-center gap-1 px-2 sm:px-3 min-w-[36px] sm:min-w-auto"
                  aria-label="Previous step"
                >
                  <ChevronLeft size={16} className="sm:mr-1" />
                  <span className="hidden sm:inline">Previous</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 lg:pt-32 pb-20 animate-fade-in">
        {/* Page header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-secondary-black mb-2">
            Create Your Free Account
          </h1>
          <p className="text-sm sm:text-base text-secondary-medium max-w-2xl mx-auto">
            Register now to start distributing press releases to targeted audiences around the globe. 
            There is no charge to register for an account. You pay only for the services you choose.
          </p>
          <p className="text-sm text-secondary-dark mt-4 max-w-2xl mx-auto">
            Blockchain Wire is the industry's first press release distribution service focused exclusively 
            on news about blockchain and distributed ledger technology companies and other blockchain and 
            cryptocurrency-related news. Our global reach includes broadcast and online media outlets, 
            social media sites, industry trade publications, leading blogs and industry influencers.
          </p>
        </div>

        {/* Step content */}
        {currentStep === 1 && (
          <CompanyInfoStep 
            data={formData.companyInfo}
            onChange={(updates) => updateFormData({ companyInfo: { ...formData.companyInfo, ...updates } })}
            onNext={nextStep}
          />
        )}
        
        {currentStep === 2 && (
          <AdditionalInfoStep 
            data={formData.additionalInfo}
            onChange={(updates) => updateFormData({ additionalInfo: { ...formData.additionalInfo, ...updates } })}
            onNext={nextStep}
            onBack={prevStep}
          />
        )}

        {currentStep === 3 && (
          <PrimaryContactStep 
            data={formData.primaryContact}
            companyInfo={formData.companyInfo}
            onChange={(updates) => updateFormData({ primaryContact: { ...formData.primaryContact, ...updates } })}
            onNext={nextStep}
            onBack={prevStep}
          />
        )}

        {currentStep === 4 && (
          <BillingContactStep 
            data={formData.billingContact}
            primaryContact={formData.primaryContact}
            onChange={(updates) => updateFormData({ billingContact: { ...formData.billingContact, ...updates } })}
            onNext={nextStep}
            onBack={prevStep}
          />
        )}

        {currentStep === 5 && (
          <TermsStep 
            data={formData.terms}
            onChange={(updates) => updateFormData({ terms: { ...formData.terms, ...updates } })}
            onSubmit={handleSubmit}
            onBack={prevStep}
          />
        )}
      </div>
    </>
  );
};

export default Register;

