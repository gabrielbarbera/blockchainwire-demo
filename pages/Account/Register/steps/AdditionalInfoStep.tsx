import React, { useRef, useState } from 'react';
import { Button } from '../../../../components/ui/Button';
import { Upload, X } from 'lucide-react';

interface AdditionalInfoData {
  website: string;
  businessIndustry: string;
  companyType: 'Public' | 'Private';
  structure: string;
  isin: string;
  stockExchange: string;
  market: string;
  stockSymbol: string;
  logo: File | null;
}

interface Props {
  data: AdditionalInfoData;
  onChange: (updates: Partial<AdditionalInfoData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const AdditionalInfoStep: React.FC<Props> = ({ data, onChange, onNext, onBack }) => {
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const logoInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (field: keyof AdditionalInfoData, value: any) => {
    onChange({ [field]: value });
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
      setLogoPreview(reader.result as string);
      onChange({ logo: file });
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
    setLogoPreview(null);
    onChange({ logo: null });
    if (logoInputRef.current) {
      logoInputRef.current.value = '';
    }
  };

  const isPublicCompany = data.companyType === 'Public';
  const canProceed = () => {
    return data.website && data.businessIndustry && data.companyType && 
           data.structure && (!isPublicCompany || (data.isin && data.stockExchange && data.market && data.stockSymbol));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-secondary-light p-6 sm:p-8">
      <h2 className="text-xl sm:text-2xl font-bold text-secondary-black mb-6">Additional Company Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-secondary-dark mb-1">
              Website<span className="text-primary">*</span>
            </label>
            <input
              type="url"
              value={data.website}
              onChange={(e) => handleChange('website', e.target.value)}
              className="w-full bg-secondary-light/30 border border-secondary-light rounded p-2 text-secondary-black focus:border-primary focus:outline-none transition-colors"
              placeholder="https://example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-dark mb-1">
              Business/Industry<span className="text-primary">*</span>
            </label>
            <input
              type="text"
              value={data.businessIndustry}
              onChange={(e) => handleChange('businessIndustry', e.target.value)}
              className="w-full bg-secondary-light/30 border border-secondary-light rounded p-2 text-secondary-black focus:border-primary focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-dark mb-1">
              Company Type<span className="text-primary">*</span>
            </label>
            <div className="relative">
              <select
                value={data.companyType}
                onChange={(e) => handleChange('companyType', e.target.value as 'Public' | 'Private')}
                className="w-full bg-secondary-light/30 border border-secondary-light rounded p-2 text-secondary-black focus:border-primary focus:outline-none transition-colors appearance-none pr-8"
              >
                <option value="Private">Private</option>
                <option value="Public">Public</option>
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
              Structure<span className="text-primary">*</span>
            </label>
            <div className="relative">
              <select
                value={data.structure}
                onChange={(e) => handleChange('structure', e.target.value)}
                className="w-full bg-secondary-light/30 border border-secondary-light rounded p-2 text-secondary-black focus:border-primary focus:outline-none transition-colors appearance-none pr-8"
              >
                <option value="">Select Structure</option>
                <option value="LLC">LLC</option>
                <option value="S-Corp">S-Corp</option>
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

          {/* Public Company Fields */}
          {isPublicCompany && (
            <>
              <div>
                <label className="block text-sm font-medium text-secondary-dark mb-1">
                  International Securities Identification Number (ISIN)<span className="text-primary">*</span>
                </label>
                <input
                  type="text"
                  value={data.isin}
                  onChange={(e) => handleChange('isin', e.target.value)}
                  className="w-full bg-secondary-light/30 border border-secondary-light rounded p-2 text-secondary-black focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-dark mb-1">
                  Stock Exchange<span className="text-primary">*</span>
                </label>
                <input
                  type="text"
                  value={data.stockExchange}
                  onChange={(e) => handleChange('stockExchange', e.target.value)}
                  className="w-full bg-secondary-light/30 border border-secondary-light rounded p-2 text-secondary-black focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-dark mb-1">
                  Market<span className="text-primary">*</span>
                </label>
                <input
                  type="text"
                  value={data.market}
                  onChange={(e) => handleChange('market', e.target.value)}
                  className="w-full bg-secondary-light/30 border border-secondary-light rounded p-2 text-secondary-black focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-dark mb-1">
                  Stock Symbol<span className="text-primary">*</span>
                </label>
                <input
                  type="text"
                  value={data.stockSymbol}
                  onChange={(e) => handleChange('stockSymbol', e.target.value)}
                  className="w-full bg-secondary-light/30 border border-secondary-light rounded p-2 text-secondary-black focus:border-primary focus:outline-none transition-colors"
                />
              </div>
            </>
          )}
        </div>

        {/* Right Column - Logo Upload */}
        <div>
          <label className="block text-sm font-medium text-secondary-dark mb-2">
            Company Logo<span className="text-primary">*</span>
          </label>
          {logoPreview || data.logo ? (
            <div className="border-2 border-dashed border-secondary-light rounded-lg p-6 bg-secondary-light/10">
              <div className="relative">
                <img
                  src={logoPreview || (data.logo ? URL.createObjectURL(data.logo) : '')}
                  alt="Company logo"
                  className="w-full h-48 object-contain rounded"
                />
                <button
                  onClick={removeLogo}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                  aria-label="Remove logo"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          ) : (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => logoInputRef.current?.click()}
              className={`bg-secondary-light/30 border-2 border-dashed rounded-lg p-10 flex flex-col items-center justify-center text-secondary-medium transition-colors cursor-pointer ${
                isDragging ? 'border-primary bg-primary-light/10' : 'border-secondary-light hover:bg-secondary-light/50'
              }`}
            >
              <Upload size={32} className={`mb-2 ${isDragging ? 'text-primary' : 'opacity-50'}`} />
              <p className="text-sm">Click to upload or drag and drop</p>
              <input
                ref={logoInputRef}
                type="file"
                accept="image/jpeg,image/jpg,image/png"
                onChange={handleFileInputChange}
                className="hidden"
              />
            </div>
          )}
          <p className="text-xs text-secondary-medium mt-2">
            We accept jpeg, jpg and png files, with a maximum allowed size of 256KB
          </p>
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

export default AdditionalInfoStep;

