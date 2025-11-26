import { CheckCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import { useThemeClasses } from "../../hooks/useThemeClasses";
import { ReleaseFormData } from "../../types";
import CheckoutStep from "./steps/CheckoutStep";
import ContentStep from "./steps/ContentStep";
import DistributionStep from "./steps/DistributionStep";
import OptimizationStep from "./steps/OptimizationStep";
import ReviewStep from "./steps/ReviewStep";
import ScheduleStep from "./steps/ScheduleStep";

const STEPS = [
  { id: 1, label: "Distribution" },
  { id: 2, label: "Content" },
  { id: 3, label: "Optimization" },
  { id: 4, label: "Schedule" },
  { id: 5, label: "Review" },
  { id: 6, label: "Checkout" },
];

const NewRelease: React.FC = () => {
  const location = useLocation();
  const classes = useThemeClasses();
  const { theme, colorMode } = useTheme();
  const editData = location.state as {
    releaseId?: string;
    circuitId?: string | null;
    headline?: string;
    schedule?: {
      date: string;
      time: string;
      timezone: string;
    };
  } | null;

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ReleaseFormData>({
    circuitId: editData?.circuitId || null,
    headline: editData?.headline || "",
    subHeadline: "",
    location: "",
    content: "",
    contact: {
      displayPreference: "full",
      firstName: "Alex",
      lastName: "Morgan",
      jobTitle: "Marketing Director",
      company: "TechVision Inc",
      phone: "(555) 123-4567",
      email: "alex.morgan@techvision.com",
      additional: "(555) 987-6543",
      website: "www.techvision.com",
    },
    tags: [],
    schedule: editData?.schedule || {
      date: "2025-11-28",
      time: "12:00",
      timezone: "US/Eastern",
    },
    attachment: undefined,
    logo: undefined,
  });

  useEffect(() => {
    if (editData?.circuitId && editData?.headline) {
      setCurrentStep(2);
    }
  }, [editData]);

  const updateFormData = (updates: Partial<ReleaseFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 6));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));
  const goToStep = (stepId: number) => {
    setCurrentStep(stepId);
  };

  const getStepColor = () => {
    return theme === "cs" ? "text-wire-accent" : "text-primary";
  };

  const getStepBg = () => {
    return theme === "cs"
      ? colorMode === "dark"
        ? "bg-wire-accent"
        : "bg-wire-accent"
      : colorMode === "dark"
      ? "bg-primary-dark"
      : "bg-primary";
  };

  return (
    <>
      <div
        className={`fixed top-[64px] left-0 lg:left-64 right-0 z-40 border-b shadow-sm ${classes.bg.card} ${classes.border.default}`}
      >
        <div className="max-w-6xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="flex items-center justify-start sm:justify-center gap-1 sm:gap-2 py-2.5 sm:py-3 overflow-x-auto scrollbar-hide overscroll-x-contain">
            {STEPS.map((step, index) => {
              const active = step.id === currentStep;
              const completed = step.id < currentStep;
              const stepColor = getStepColor();

              return (
                <React.Fragment key={step.id}>
                  <button
                    onClick={() => goToStep(step.id)}
                    className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-lg transition-all duration-200 whitespace-nowrap flex-shrink-0 select-none ${
                      active
                        ? `${stepColor} font-semibold ${classes.bg.secondary} shadow-sm`
                        : completed
                        ? `${stepColor} hover:opacity-80`
                        : `${classes.text.secondary}`
                    } ${
                      theme === 'cs'
                        ? colorMode === 'dark'
                          ? 'hover:bg-wire-bg-light'
                          : 'hover:bg-wire-bg-light-mode'
                        : colorMode === 'dark'
                          ? 'hover:bg-gray-700'
                          : 'hover:bg-secondary-light'
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
                            ? `${getStepBg()} text-white shadow-md scale-110`
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

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 lg:pt-28 pb-8 sm:pb-12">
        {currentStep === 1 && (
          <DistributionStep
            selectedCircuit={formData.circuitId}
            onSelect={(id) => updateFormData({ circuitId: id })}
            onNext={nextStep}
          />
        )}

        {currentStep === 2 && (
          <ContentStep
            data={formData}
            onChange={updateFormData}
            onNext={nextStep}
            onBack={prevStep}
          />
        )}

        {currentStep === 3 && (
          <OptimizationStep
            data={formData}
            onChange={updateFormData}
            onNext={nextStep}
            onBack={prevStep}
          />
        )}

        {currentStep === 4 && (
          <ScheduleStep
            data={formData}
            onChange={updateFormData}
            onNext={nextStep}
            onBack={prevStep}
          />
        )}

        {currentStep === 5 && (
          <ReviewStep data={formData} onNext={nextStep} onBack={prevStep} />
        )}

        {currentStep === 6 && (
          <CheckoutStep data={formData} onBack={prevStep} />
        )}
      </div>
    </>
  );
};

export default NewRelease;
