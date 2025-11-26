import { CheckCircle } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAccount } from "../../contexts/AccountContext";
import { useTheme } from "../../contexts/ThemeContext";
import { useThemeClasses } from "../../hooks/useThemeClasses";
import AdditionalInfoStep from "./Register/steps/AdditionalInfoStep";
import BillingContactStep from "./Register/steps/BillingContactStep";
import CompanyInfoStep from "./Register/steps/CompanyInfoStep";
import PrimaryContactStep from "./Register/steps/PrimaryContactStep";
import TermsStep from "./Register/steps/TermsStep";

const STEPS = [
  { id: 1, label: "Company Information" },
  { id: 2, label: "Additional Company Information" },
  { id: 3, label: "Primary Contact" },
  { id: 4, label: "Billing Contact" },
  { id: 5, label: "Terms & Conditions" },
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
    companyType: "Public" | "Private";
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
  const classes = useThemeClasses();
  const { theme, colorMode } = useTheme();
  const [currentStep, setCurrentStep] = useState(1);
  const stepBarRef = useRef<HTMLDivElement>(null);
  const activeStepRef = useRef<HTMLButtonElement>(null);
  const [formData, setFormData] = useState<RegistrationFormData>({
    companyInfo: {
      companyName: "",
      country: "",
      address: "",
      address2: "",
      city: "",
      stateProvince: "",
      postalCode: "",
      referral: "",
      telegram: "",
      primaryPhone: { countryCode: "US+1", number: "" },
      cellPhone: { countryCode: "US+1", number: "" },
    },
    additionalInfo: {
      website: "",
      businessIndustry: "",
      companyType: "Private",
      structure: "",
      isin: "",
      stockExchange: "",
      market: "",
      stockSymbol: "",
      logo: null,
    },
    primaryContact: {
      firstName: "",
      lastName: "",
      positionTitle: "",
      useCompanyAddress: false,
      country: "",
      address: "",
      address2: "",
      city: "",
      stateProvince: "",
      postalCode: "",
      primaryPhone: { countryCode: "US+1", number: "" },
      cellPhone: { countryCode: "US+1", number: "" },
      email: "",
      password: "",
      repeatPassword: "",
    },
    billingContact: {
      sameAsPrimary: true,
      firstName: "",
      lastName: "",
      positionTitle: "",
      country: "",
      address: "",
      address2: "",
      city: "",
      stateProvince: "",
      postalCode: "",
      primaryPhone: { countryCode: "US+1", number: "" },
      cellPhone: { countryCode: "US+1", number: "" },
      loginAccess: false,
    },
    terms: {
      recaptchaCompleted: false,
      termsAgreed: false,
    },
  });

  const updateFormData = (updates: Partial<RegistrationFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 5));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));
  const goToStep = (stepId: number) => {
    setCurrentStep(stepId);
  };

  // Auto-scroll to active step (only on mobile when step is out of view)
  useEffect(() => {
    if (activeStepRef.current && stepBarRef.current) {
      const stepBar = stepBarRef.current;
      const activeButton = activeStepRef.current;
      const stepBarRect = stepBar.getBoundingClientRect();
      const activeButtonRect = activeButton.getBoundingClientRect();

      const isOutOfViewLeft = activeButtonRect.left < stepBarRect.left;
      const isOutOfViewRight = activeButtonRect.right > stepBarRect.right;

      if (isOutOfViewLeft || isOutOfViewRight) {
        const scrollLeft =
          activeButton.offsetLeft -
          stepBar.offsetLeft -
          stepBar.offsetWidth / 2 +
          activeButton.offsetWidth / 2;
        stepBar.scrollTo({
          left: Math.max(0, scrollLeft),
          behavior: "smooth",
        });
      }
    }
  }, [currentStep]);

  const handleSubmit = () => {
    const newAccount = {
      id: Date.now().toString(),
      name: `${formData.primaryContact.firstName} ${formData.primaryContact.lastName}`,
      company: formData.companyInfo.companyName,
      country: formData.companyInfo.country,
      isPrimary: true,
    };

    addAccount(newAccount);
    alert(
      "Registration submitted successfully! Your account is pending verification."
    );
    navigate("/account");
  };

  return (
    <>
      {/* Header with step navigation */}
      <div
        className={`fixed top-0 left-0 right-0 border-b shadow-sm z-40 ${classes.bg.card} ${classes.border.default}`}
      >
        <div className="max-w-6xl mx-auto px-2 sm:px-4 lg:px-8">
          <div
            ref={stepBarRef}
            className="flex items-center justify-start sm:justify-center gap-1.5 sm:gap-2 py-2.5 sm:py-3 overflow-x-auto scrollbar-hide overscroll-x-contain"
          >
            {STEPS.map((step, index) => {
              const active = step.id === currentStep;
              const completed = step.id < currentStep;
              const stepColor =
                theme === "cs" ? "text-wire-accent" : "text-primary";
              const stepBg =
                theme === "cs"
                  ? colorMode === "dark"
                    ? "bg-wire-accent"
                    : "bg-wire-accent"
                  : colorMode === "dark"
                  ? "bg-primary-dark"
                  : "bg-primary";

              return (
                <React.Fragment key={step.id}>
                  <button
                    ref={active ? activeStepRef : null}
                    onClick={() => goToStep(step.id)}
                    className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-lg transition-all duration-200 whitespace-nowrap flex-shrink-0 select-none ${
                      active
                        ? `${stepColor} font-semibold ${classes.bg.secondary} shadow-sm`
                        : completed
                        ? `${stepColor} hover:opacity-80`
                        : `${classes.text.secondary}`
                    } ${
                      theme === "cs"
                        ? colorMode === "dark"
                          ? "hover:bg-wire-bg-light"
                          : "hover:bg-wire-bg-light-mode"
                        : colorMode === "dark"
                        ? "hover:bg-gray-700"
                        : "hover:bg-secondary-light"
                    }`}
                    title={`${step.id}. ${step.label}`}
                    aria-label={`Step ${step.id}: ${step.label}`}
                  >
                    {completed ? (
                      <CheckCircle
                        size={16}
                        className={`sm:w-5 sm:h-5 flex-shrink-0 ${stepColor}`}
                      />
                    ) : (
                      <div
                        className={`flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold transition-all ${
                          active
                            ? `${stepBg} text-white shadow-md scale-110`
                            : `${classes.bg.secondary} ${classes.text.secondary}`
                        }`}
                      >
                        {step.id}
                      </div>
                    )}
                    <span
                      className={`text-xs sm:text-sm font-medium ${
                        completed ? stepColor : active ? stepColor : ""
                      }`}
                    >
                      {step.label}
                    </span>
                  </button>
                  {index < STEPS.length - 1 && (
                    <div
                      className={`h-5 w-px flex-shrink-0 mx-0.5 ${
                        completed || active
                          ? `${stepColor} opacity-30`
                          : classes.border.default
                      }`}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 lg:pt-32 pb-20 animate-fade-in">
        {/* Page header */}
        <div className="mb-8 text-center">
          <h1
            className={`text-2xl sm:text-3xl font-bold mb-2 ${classes.text.black}`}
          >
            Create Your Free Account
          </h1>
          <p
            className={`text-sm sm:text-base max-w-2xl mx-auto ${classes.text.secondary}`}
          >
            Register now to start distributing press releases to targeted
            audiences around the globe. There is no charge to register for an
            account. You pay only for the services you choose.
          </p>
          <p
            className={`text-sm mt-4 max-w-2xl mx-auto ${classes.text.primary}`}
          >
            Blockchain Wire is the industry's first press release distribution
            service focused exclusively on news about blockchain and distributed
            ledger technology companies and other blockchain and
            cryptocurrency-related news. Our global reach includes broadcast and
            online media outlets, social media sites, industry trade
            publications, leading blogs and industry influencers.
          </p>
        </div>

        {/* Step content */}
        {currentStep === 1 && (
          <CompanyInfoStep
            data={formData.companyInfo}
            onChange={(updates) =>
              updateFormData({
                companyInfo: { ...formData.companyInfo, ...updates },
              })
            }
            onNext={nextStep}
          />
        )}

        {currentStep === 2 && (
          <AdditionalInfoStep
            data={formData.additionalInfo}
            onChange={(updates) =>
              updateFormData({
                additionalInfo: { ...formData.additionalInfo, ...updates },
              })
            }
            onNext={nextStep}
            onBack={prevStep}
          />
        )}

        {currentStep === 3 && (
          <PrimaryContactStep
            data={formData.primaryContact}
            companyInfo={formData.companyInfo}
            onChange={(updates) =>
              updateFormData({
                primaryContact: { ...formData.primaryContact, ...updates },
              })
            }
            onNext={nextStep}
            onBack={prevStep}
          />
        )}

        {currentStep === 4 && (
          <BillingContactStep
            data={formData.billingContact}
            primaryContact={formData.primaryContact}
            onChange={(updates) =>
              updateFormData({
                billingContact: { ...formData.billingContact, ...updates },
              })
            }
            onNext={nextStep}
            onBack={prevStep}
          />
        )}

        {currentStep === 5 && (
          <TermsStep
            data={formData.terms}
            onChange={(updates) =>
              updateFormData({ terms: { ...formData.terms, ...updates } })
            }
            onSubmit={handleSubmit}
            onBack={prevStep}
          />
        )}
      </div>
    </>
  );
};

export default Register;
