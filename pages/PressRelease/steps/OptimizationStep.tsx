import React, { useState } from 'react';
import { ReleaseFormData } from '../../../types';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { useThemeClasses } from '../../../hooks/useThemeClasses';
import { useTheme } from '../../../contexts/ThemeContext';
import { X } from 'lucide-react';

interface Props {
  data: ReleaseFormData;
  onChange: (updates: Partial<ReleaseFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const OptimizationStep: React.FC<Props> = ({ data, onChange, onNext, onBack }) => {
  const classes = useThemeClasses();
  const { theme } = useTheme();
  const [tagInput, setTagInput] = useState('');

  const totalCharCount = data.tags.reduce((acc, tag) => acc + tag.length, 0);
  const MAX_TOTAL_CHARS = 120;

  const addTag = () => {
    const trimmedInput = tagInput.trim();
    if (trimmedInput && data.tags.length < 5) {
      if (totalCharCount + trimmedInput.length <= MAX_TOTAL_CHARS) {
        onChange({ tags: [...data.tags, trimmedInput] });
        setTagInput('');
      }
    }
  };

  const removeTag = (tagToRemove: string) => {
    onChange({ tags: data.tags.filter(t => t !== tagToRemove) });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <Card variant="default" className="space-y-4 sm:space-y-6 lg:space-y-8 animate-fade-in p-4 sm:p-6 lg:p-8 min-h-[400px] sm:min-h-[500px]">
      <div>
        <h2 className={`text-lg sm:text-xl font-semibold mb-1 sm:mb-2 ${classes.text.black}`}>3. Optimization</h2>
        <h3 className={`text-base sm:text-lg font-medium mb-2 sm:mb-3 ${classes.text.primary}`}>Keywords</h3>
        <p className={`text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed ${classes.text.secondary}`}>
          Add keywords used for Blockchain Wire's media network to make it easier to find and locate news of their interest. Best practice is to include 3-5 tags where each tag is limited to 30 characters. The total number of characters for all Release Tags is 120 characters.
        </p>
      </div>

      <div className={`p-4 sm:p-6 rounded-lg border ${classes.bg.tertiary} ${classes.border.default}`}>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-end mb-3 sm:mb-4">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <label className={`block text-xs sm:text-sm ${classes.text.primary}`}>Tag Name:</label>
              <span className={`text-xs sm:hidden ${classes.text.secondary}`}>{tagInput.length}/30</span>
            </div>
            <input 
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              maxLength={30}
              onKeyDown={handleKeyDown}
              placeholder="Enter tag name"
              className={`w-full border rounded p-2.5 sm:p-2 text-sm sm:text-base focus:outline-none focus:ring-2 transition-all ${classes.border.default} ${classes.bg.card} ${classes.text.black} ${theme === 'cs' ? 'focus:ring-wire-accent focus:border-wire-accent' : 'focus:ring-primary focus:border-primary'}`}
            />
          </div>
          <div className="hidden sm:block w-28 lg:w-32">
            <label className={`block text-sm mb-1 ${classes.text.primary}`}>Character count:</label>
            <div className={`w-full border rounded p-2 text-center font-medium ${classes.border.default} ${classes.bg.card} ${classes.text.black}`}>
              {tagInput.length}
            </div>
          </div>
          <Button 
            onClick={addTag} 
            disabled={
              data.tags.length >= 5 || 
              !tagInput.trim() || 
              (totalCharCount + tagInput.trim().length > MAX_TOTAL_CHARS)
            }
            className="w-full sm:w-auto min-w-[100px] sm:min-w-[120px]"
          >
            Add Tag
          </Button>
        </div>

        <div className={`flex items-center justify-between text-xs sm:text-sm mb-3 sm:mb-2 ${classes.text.secondary}`}>
          <span className="font-medium">Total characters: <span className={totalCharCount > MAX_TOTAL_CHARS ? 'text-red-500' : ''}>{totalCharCount}</span>/{MAX_TOTAL_CHARS}</span>
          <span className={`text-xs ${classes.text.secondary}`}>{data.tags.length}/5 tags</span>
        </div>

        <div className="flex flex-wrap gap-2 mt-3 sm:mt-4 min-h-[40px] items-center">
          {data.tags.length === 0 && (
            <span className={`text-xs sm:text-sm italic w-full text-center py-2 ${classes.text.secondary}`}>
              No tags added yet.
            </span>
          )}
          {data.tags.map((tag, i) => (
            <div key={i} className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-1 rounded-full text-xs sm:text-sm border group ${classes.bg.secondary} ${classes.text.primary} ${classes.border.default}`}>
              <span className="max-w-[200px] sm:max-w-none truncate">{tag}</span>
              <button 
                onClick={() => removeTag(tag)} 
                className="hover:text-red-500 transition-colors flex-shrink-0 p-0.5 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20"
                aria-label={`Remove tag ${tag}`}
              >
                <X size={12} className="sm:w-3.5 sm:h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

    </Card>
  );
};

export default OptimizationStep;