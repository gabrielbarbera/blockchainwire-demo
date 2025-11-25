import React from 'react';
import { ReleaseFormData } from '../../../types';
import { CIRCUITS } from '../../../constants';
import { Button } from '../../../components/ui/Button';
import { File, Globe, DollarSign, Languages, Zap } from 'lucide-react';

interface Props {
  data: ReleaseFormData;
  onNext: () => void;
  onBack: () => void;
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};

const ReviewStep: React.FC<Props> = ({ data, onNext, onBack }) => {
  const circuit = CIRCUITS.find(c => c.id === data.circuitId);

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      <h2 className="text-lg sm:text-xl font-semibold text-secondary-black">5. Review</h2>

      <div className="bg-white border border-secondary-light rounded-lg overflow-hidden shadow-sm">
        <div className="bg-gradient-to-r from-primary-light to-primary-light/80 p-4 sm:p-5 border-b border-primary/20">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                <Zap className="text-white" size={18} />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-secondary-black text-lg sm:text-xl truncate">{circuit?.name || 'No Circuit Selected'}</h3>
                <p className="text-xs sm:text-sm text-secondary-medium">{circuit?.category} Circuit</p>
              </div>
            </div>
            <div className="bg-primary text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg flex-shrink-0 w-full sm:w-auto">
              <div className="text-xs font-medium opacity-90">Price</div>
              <div className="text-base sm:text-lg font-bold">${circuit?.price.toFixed(2)}</div>
            </div>
          </div>
        </div>
        <div className="p-4 sm:p-6">
          <div className="mb-4 sm:mb-6">
            <h4 className="font-semibold text-secondary-black mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
              <Zap size={14} className="sm:w-4 sm:h-4 text-primary" />
              Distribution
            </h4>
            <p className="text-secondary-dark text-xs sm:text-sm leading-relaxed">{circuit?.description}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-3 sm:pt-4 border-t border-secondary-light">
            <div className="flex items-start gap-2 sm:gap-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-primary-light rounded-lg flex items-center justify-center flex-shrink-0">
                <Globe size={14} className="sm:w-4 sm:h-4 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-medium text-secondary-medium mb-1">Countries</div>
                <div className="text-sm font-semibold text-secondary-black break-words">{circuit?.stats?.countries || 'N/A'}</div>
              </div>
            </div>
            <div className="flex items-start gap-2 sm:gap-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-primary-light rounded-lg flex items-center justify-center flex-shrink-0">
                <Languages size={14} className="sm:w-4 sm:h-4 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-medium text-secondary-medium mb-1">Language</div>
                <div className="text-sm font-semibold text-secondary-black break-words">{circuit?.stats?.language || 'N/A'}</div>
              </div>
            </div>
            {circuit?.stats?.traffic && (
              <div className="flex items-start gap-2 sm:gap-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-primary-light rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap size={14} className="sm:w-4 sm:h-4 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-medium text-secondary-medium mb-1">Traffic</div>
                  <div className="text-sm font-semibold text-secondary-black break-words">{circuit.stats.traffic}</div>
                </div>
              </div>
            )}
            {circuit?.stats?.turnaround && (
              <div className="flex items-start gap-2 sm:gap-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-primary-light rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap size={14} className="sm:w-4 sm:h-4 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-medium text-secondary-medium mb-1">Turnaround</div>
                  <div className="text-sm font-semibold text-secondary-black break-words">{circuit.stats.turnaround}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Press Release Preview */}
      <div className="bg-white border-2 border-secondary-light rounded-lg p-4 sm:p-6 lg:p-8 shadow-sm">
        {/* Logo */}
        {data.logo?.preview && (
          <div className="mb-4 sm:mb-6">
            <img
              src={data.logo.preview}
              alt="Company logo"
              className="max-h-16 sm:max-h-20 object-contain"
            />
          </div>
        )}

        {/* Headline */}
        <h1 className="text-2xl sm:text-3xl font-bold text-secondary-black mb-3">
          {data.headline || 'No Headline Provided'}
        </h1>

        {/* Sub-headline */}
        {data.subHeadline && (
          <h2 className="text-lg sm:text-xl font-medium text-secondary-dark mb-4">
            {data.subHeadline}
          </h2>
        )}

        {/* Location and Date */}
        <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-secondary-medium mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-secondary-light">
          {data.location && <span>{data.location}</span>}
          {data.location && data.schedule.date && <span>•</span>}
          {data.schedule.date && (
            <span>
              {new Date(data.schedule.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
              {data.schedule.time && ` at ${data.schedule.time}`}
            </span>
          )}
        </div>

        {/* Content */}
        <div
          className="prose prose-slate max-w-none text-sm sm:text-base text-secondary-dark leading-relaxed mb-4 sm:mb-6 prose-p:text-sm sm:prose-p:text-base prose-headings:text-base sm:prose-headings:text-lg"
          dangerouslySetInnerHTML={{
            __html: data.content || '<p class="italic text-secondary-medium">No content provided...</p>',
          }}
        />

        {/* Attachment */}
        {data.attachment && (
          <div className="mb-4 sm:mb-6 pt-4 sm:pt-6 border-t border-secondary-light">
            <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-secondary-dark">
              <File className="text-primary" size={18} />
              <div className="min-w-0 flex-1">
                <p className="font-medium text-secondary-black truncate">{data.attachment.name}</p>
                <p className="text-xs text-secondary-medium">
                  {formatFileSize(data.attachment.size)}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Contact Information */}
        <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-secondary-light">
          <h3 className="font-bold text-secondary-black mb-2 sm:mb-3 text-sm sm:text-base">Contact Information</h3>
          {data.contact.displayPreference === 'full' && (
            <div className="space-y-1 text-xs sm:text-sm text-secondary-dark">
              <p className="font-medium">
                {data.contact.firstName} {data.contact.lastName}
              </p>
              <p>{data.contact.jobTitle}, {data.contact.company}</p>
              <p className="text-primary">{data.contact.email}</p>
              {data.contact.phone && <p>{data.contact.phone}</p>}
              {data.contact.additional && <p>{data.contact.additional}</p>}
              {data.contact.website && (
                <p>
                  <a href={data.contact.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    {data.contact.website}
                  </a>
                </p>
              )}
            </div>
          )}
          {data.contact.displayPreference === 'hide_email' && (
            <div className="space-y-1 text-xs sm:text-sm text-secondary-dark">
              <p className="font-medium">
                {data.contact.firstName} {data.contact.lastName}
              </p>
              <p>{data.contact.jobTitle}, {data.contact.company}</p>
              {data.contact.phone && <p>{data.contact.phone}</p>}
              {data.contact.additional && <p>{data.contact.additional}</p>}
              {data.contact.website && (
                <p>
                  <a href={data.contact.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    {data.contact.website}
                  </a>
                </p>
              )}
              <p className="text-secondary-medium italic">Use contact form to reach this contact</p>
            </div>
          )}
          {data.contact.displayPreference === 'hide_all' && (
            <p className="text-xs sm:text-sm text-secondary-medium italic">Contact information is hidden</p>
          )}
        </div>

        {/* Tags */}
        {data.tags.length > 0 && (
          <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-secondary-light">
            <h4 className="font-bold mb-2 sm:mb-3 text-secondary-black text-sm sm:text-base">Tags</h4>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {data.tags.map(t => (
                <span key={t} className="bg-secondary-light px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs border border-secondary-medium/30 text-secondary-dark">
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default ReviewStep;