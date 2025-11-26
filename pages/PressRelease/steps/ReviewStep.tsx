import React from 'react';
import { ReleaseFormData } from '../../../types';
import { CIRCUITS } from '../../../constants';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { useThemeClasses } from '../../../hooks/useThemeClasses';
import { useTheme } from '../../../contexts/ThemeContext';
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
  const classes = useThemeClasses();
  const { theme, colorMode } = useTheme();

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      <h2 className={`text-lg sm:text-xl font-semibold ${classes.text.black}`}>5. Review</h2>

      <Card variant="default" className="overflow-hidden">
        <div className={`p-4 sm:p-5 border-b ${classes.icon.container} ${classes.border.accent}`}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${theme === 'cs' ? 'bg-wire-accent' : colorMode === 'dark' ? 'bg-primary-dark' : 'bg-primary'}`}>
                <Zap className={theme === 'cs' ? 'text-black' : 'text-white'} size={18} />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className={`font-bold text-lg sm:text-xl truncate ${classes.text.black}`}>{circuit?.name || 'No Circuit Selected'}</h3>
                <p className={`text-xs sm:text-sm ${classes.text.secondary}`}>{circuit?.category} Circuit</p>
              </div>
            </div>
            <div className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg flex-shrink-0 w-full sm:w-auto shadow-sm ${theme === 'cs' ? 'bg-wire-accent text-black' : colorMode === 'dark' ? 'bg-primary-dark text-white' : 'bg-primary text-white'}`}>
              <div className="text-xs font-medium opacity-90">Price</div>
              <div className="text-base sm:text-lg font-bold">${circuit?.price.toFixed(2)}</div>
            </div>
          </div>
        </div>
        <div className="p-4 sm:p-6">
          <div className="mb-4 sm:mb-6">
            <h4 className={`font-semibold mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base ${classes.text.black}`}>
              <Zap size={14} className={`sm:w-4 sm:h-4 ${theme === 'cs' ? 'text-cs-accent' : 'text-primary'}`} />
              Distribution
            </h4>
            <p className={`text-xs sm:text-sm leading-relaxed ${classes.text.primary}`}>{circuit?.description}</p>
          </div>
          <div className={`grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-3 sm:pt-4 border-t ${classes.border.default}`}>
            <div className="flex items-start gap-2 sm:gap-3">
              <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${classes.icon.container}`}>
                <Globe size={14} className={`sm:w-4 sm:h-4 ${theme === 'cs' ? 'text-cs-accent' : 'text-primary'}`} />
              </div>
              <div className="min-w-0 flex-1">
                <div className={`text-xs font-medium mb-1 ${classes.text.secondary}`}>Countries</div>
                <div className={`text-sm font-semibold break-words ${classes.text.black}`}>{circuit?.stats?.countries || 'N/A'}</div>
              </div>
            </div>
            <div className="flex items-start gap-2 sm:gap-3">
              <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${classes.icon.container}`}>
                <Languages size={14} className={`sm:w-4 sm:h-4 ${theme === 'cs' ? 'text-cs-accent' : 'text-primary'}`} />
              </div>
              <div className="min-w-0 flex-1">
                <div className={`text-xs font-medium mb-1 ${classes.text.secondary}`}>Language</div>
                <div className={`text-sm font-semibold break-words ${classes.text.black}`}>{circuit?.stats?.language || 'N/A'}</div>
              </div>
            </div>
            {circuit?.stats?.traffic && (
              <div className="flex items-start gap-2 sm:gap-3">
                <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${classes.icon.container}`}>
                  <Zap size={14} className={`sm:w-4 sm:h-4 ${theme === 'cs' ? 'text-cs-accent' : 'text-primary'}`} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className={`text-xs font-medium mb-1 ${classes.text.secondary}`}>Traffic</div>
                  <div className={`text-sm font-semibold break-words ${classes.text.black}`}>{circuit.stats.traffic}</div>
                </div>
              </div>
            )}
            {circuit?.stats?.turnaround && (
              <div className="flex items-start gap-2 sm:gap-3">
                <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${classes.icon.container}`}>
                  <Zap size={14} className={`sm:w-4 sm:h-4 ${theme === 'cs' ? 'text-cs-accent' : 'text-primary'}`} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className={`text-xs font-medium mb-1 ${classes.text.secondary}`}>Turnaround</div>
                  <div className={`text-sm font-semibold break-words ${classes.text.black}`}>{circuit.stats.turnaround}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Press Release Preview */}
      <Card variant="default" className="border-2 p-4 sm:p-6 lg:p-8">
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
        <h1 className={`text-2xl sm:text-3xl font-bold mb-3 ${classes.text.black}`}>
          {data.headline || 'No Headline Provided'}
        </h1>

        {/* Sub-headline */}
        {data.subHeadline && (
          <h2 className={`text-lg sm:text-xl font-medium mb-4 ${classes.text.primary}`}>
            {data.subHeadline}
          </h2>
        )}

        {/* Location and Date */}
        <div className={`flex flex-wrap items-center gap-2 text-xs sm:text-sm mb-4 sm:mb-6 pb-3 sm:pb-4 border-b ${classes.text.secondary} ${classes.border.default}`}>
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
          className={`prose prose-slate max-w-none text-sm sm:text-base leading-relaxed mb-4 sm:mb-6 prose-p:text-sm sm:prose-p:text-base prose-headings:text-base sm:prose-headings:text-lg ${classes.text.primary}`}
          dangerouslySetInnerHTML={{
            __html: data.content || `<p class="italic ${classes.text.secondary}">No content provided...</p>`,
          }}
        />

        {/* Attachment */}
        {data.attachment && (
          <div className={`mb-4 sm:mb-6 pt-4 sm:pt-6 border-t ${classes.border.default}`}>
            <div className={`flex items-center gap-2 sm:gap-3 text-xs sm:text-sm ${classes.text.primary}`}>
              <File className={theme === 'cs' ? 'text-cs-accent' : 'text-primary'} size={18} />
              <div className="min-w-0 flex-1">
                <p className={`font-medium truncate ${classes.text.black}`}>{data.attachment.name}</p>
                <p className={`text-xs ${classes.text.secondary}`}>
                  {formatFileSize(data.attachment.size)}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Contact Information */}
        <div className={`mt-6 sm:mt-8 pt-4 sm:pt-6 border-t ${classes.border.default}`}>
          <h3 className={`font-bold mb-2 sm:mb-3 text-sm sm:text-base ${classes.text.black}`}>Contact Information</h3>
          {data.contact.displayPreference === 'full' && (
            <div className={`space-y-1 text-xs sm:text-sm ${classes.text.primary}`}>
              <p className="font-medium">
                {data.contact.firstName} {data.contact.lastName}
              </p>
              <p>{data.contact.jobTitle}, {data.contact.company}</p>
              <p className={theme === 'cs' ? 'text-cs-accent' : 'text-primary'}>{data.contact.email}</p>
              {data.contact.phone && <p>{data.contact.phone}</p>}
              {data.contact.additional && <p>{data.contact.additional}</p>}
              {data.contact.website && (
                <p>
                  <a href={data.contact.website} target="_blank" rel="noopener noreferrer" className={`${theme === 'cs' ? 'text-cs-accent' : 'text-primary'} hover:underline`}>
                    {data.contact.website}
                  </a>
                </p>
              )}
            </div>
          )}
          {data.contact.displayPreference === 'hide_email' && (
            <div className={`space-y-1 text-xs sm:text-sm ${classes.text.primary}`}>
              <p className="font-medium">
                {data.contact.firstName} {data.contact.lastName}
              </p>
              <p>{data.contact.jobTitle}, {data.contact.company}</p>
              {data.contact.phone && <p>{data.contact.phone}</p>}
              {data.contact.additional && <p>{data.contact.additional}</p>}
              {data.contact.website && (
                <p>
                  <a href={data.contact.website} target="_blank" rel="noopener noreferrer" className={`${theme === 'cs' ? 'text-cs-accent' : 'text-primary'} hover:underline`}>
                    {data.contact.website}
                  </a>
                </p>
              )}
              <p className={`${classes.text.secondary} italic`}>Use contact form to reach this contact</p>
            </div>
          )}
          {data.contact.displayPreference === 'hide_all' && (
            <p className={`text-xs sm:text-sm ${classes.text.secondary} italic`}>Contact information is hidden</p>
          )}
        </div>

        {/* Tags */}
        {data.tags.length > 0 && (
          <div className={`mt-4 sm:mt-6 pt-4 sm:pt-6 border-t ${classes.border.default}`}>
            <h4 className={`font-bold mb-2 sm:mb-3 text-sm sm:text-base ${classes.text.black}`}>Tags</h4>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {data.tags.map(t => (
                <span key={t} className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs border ${classes.bg.secondary} ${classes.text.primary} ${classes.border.default}`}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}
      </Card>

    </div>
  );
};

export default ReviewStep;