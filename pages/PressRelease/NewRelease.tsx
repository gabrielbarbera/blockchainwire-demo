import React, { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import { ReleaseFormData } from '../../types';
import { useLocation } from 'react-router-dom';
import DistributionStep from './steps/DistributionStep';
import ContentStep from './steps/ContentStep';
import OptimizationStep from './steps/OptimizationStep';
import ScheduleStep from './steps/ScheduleStep';
import ReviewStep from './steps/ReviewStep';
import CheckoutStep from './steps/CheckoutStep';

const STEPS = [
  { id: 1, label: 'Distribution' },
  { id: 2, label: 'Content' },
  { id: 3, label: 'Optimization' },
  { id: 4, label: 'Schedule' },
  { id: 5, label: 'Review' },
  { id: 6, label: 'Checkout' },
];

const NewRelease: React.FC = () => {
  const location = useLocation();
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
    headline: editData?.headline || '',
    subHeadline: '',
    location: '',
    content: '',
    contact: {
      displayPreference: 'full',
      firstName: 'Alex',
      lastName: 'Morgan',
      jobTitle: 'Marketing Director',
      company: 'TechVision Inc',
      phone: '(555) 123-4567',
      email: 'alex.morgan@techvision.com',
      additional: '(555) 987-6543',
      website: 'www.techvision.com',
    },
    tags: [],
    schedule: editData?.schedule || {
      date: '2025-11-28',
      time: '12:00',
      timezone: 'US/Eastern'
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
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 6));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));
  const goToStep = (stepId: number) => {
    setCurrentStep(stepId);
  };

  return (
    <>
      <div className="fixed top-[64px] left-0 lg:left-64 right-0 bg-white border-b border-secondary-light z-40">
        <div className="max-w-6xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="flex items-center justify-start sm:justify-center gap-1 sm:gap-2 py-2 sm:py-3 overflow-x-auto scrollbar-hide">
            {STEPS.map((step, index) => {
              const active = step.id === currentStep;
              const completed = step.id < currentStep;
              
              return (
                <React.Fragment key={step.id}>
                  <button
                    onClick={() => goToStep(step.id)}
                    className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 rounded transition-colors whitespace-nowrap flex-shrink-0 ${
                      active 
                        ? 'text-primary font-medium' 
                        : completed 
                        ? 'text-primary hover:text-primary/80' 
                        : 'text-secondary-medium hover:text-secondary-dark'
                    }`}
                    title={`${step.id}. ${step.label}`}
                    aria-label={`Step ${step.id}: ${step.label}`}
                  >
                    {completed ? (
                      <CheckCircle size={14} className="sm:w-4 sm:h-4 text-primary flex-shrink-0" />
                    ) : (
                      <div className={`flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-xs font-medium ${
                        active 
                          ? 'bg-primary text-white' 
                          : 'bg-secondary-light text-secondary-medium'
                      }`}>
                        {step.id}
                      </div>
                    )}
                    <span className={`text-xs sm:text-sm ${completed ? 'text-primary' : ''}`}>{step.label}</span>
                  </button>
                  {index < STEPS.length - 1 && (
                    <div className={`h-4 w-px flex-shrink-0 ${
                      completed ? 'bg-secondary-dark' : 'bg-secondary-light'
                    }`} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-24">
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
           <ReviewStep 
             data={formData}
             onNext={nextStep}
             onBack={prevStep}
           />
        )}

        {currentStep === 6 && (
           <CheckoutStep 
             data={formData}
             onBack={prevStep}
           />
        )}
      </div>
    </>
  );
};

export default NewRelease;