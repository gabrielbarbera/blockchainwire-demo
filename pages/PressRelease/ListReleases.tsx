import React from 'react';
import { MOCK_RELEASES, CIRCUITS } from '../../constants';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { useNavigate } from 'react-router-dom';
import { List, ChevronDown, Clock, Edit, Trash2 } from 'lucide-react';
import { Release } from '../../types';

const ListReleases: React.FC = () => {
  const navigate = useNavigate();

  const getCircuitIdFromName = (circuitName: string): string | null => {
    const circuitMap: Record<string, string> = {
      'Premium Global': 'premium',
      'Budget Global': 'budget-global',
      'Premium': 'premium',
      'Elite': 'elite',
      'Pro': 'pro',
      'Basic SEO': 'basic-seo',
    };
    
    if (circuitMap[circuitName]) {
      return circuitMap[circuitName];
    }
    
    const lowerName = circuitName.toLowerCase();
    const found = CIRCUITS.find(c => c.name.toLowerCase() === lowerName);
    return found ? found.id : null;
  };

  const handleEdit = (release: Release) => {
    const circuitId = getCircuitIdFromName(release.circuitName);
    
    // Parse date if available
    let scheduleDate = '';
    let scheduleTime = '';
    let scheduleTimezone = 'US/Eastern';
    
    if (release.date && release.date !== 'not selected') {
      try {
        const dateObj = new Date(release.date);
        if (!isNaN(dateObj.getTime())) {
          scheduleDate = dateObj.toISOString().split('T')[0];
          const timeStr = release.date.match(/(\d{1,2}):(\d{2}):(\d{2})/);
          if (timeStr) {
            scheduleTime = `${timeStr[1]}:${timeStr[2]}`;
          }
        }
      } catch (e) {
        // If parsing fails, leave empty
      }
    }

    navigate('/releases/add', {
      state: {
        releaseId: release.id,
        circuitId,
        headline: release.headline,
        schedule: {
          date: scheduleDate,
          time: scheduleTime,
          timezone: scheduleTimezone,
        },
      },
    });
  };

  const getCircuitBadgeColor = (name: string) => {
    if (name.includes('Global')) return 'bg-primary text-white';
    if (name === 'Premium') return 'bg-primary text-white';
    if (name === 'Pro') return 'bg-primary/80 text-white';
    if (name === 'Elite') return 'bg-primary/70 text-white';
    if (name === 'Basic SEO') return 'bg-primary-light text-secondary-black';
    return 'bg-secondary-medium text-white';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 animate-fade-in">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 sm:mb-8 gap-4">
        <div className="flex items-center gap-2 text-secondary-dark">
          <div className="p-1.5 sm:p-2 bg-primary-light rounded-lg">
            <List className="text-primary" size={18} />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-secondary-black">Press Releases</h1>
            <p className="text-xs sm:text-sm text-secondary-medium">{MOCK_RELEASES.length} total releases</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 w-full md:w-auto">
          <div className="grid grid-cols-3 sm:flex gap-2 sm:gap-3 w-full sm:w-auto">
            <div className="w-full sm:w-36 lg:w-44">
              <div className="bg-white rounded-lg border-2 border-secondary-light shadow-sm cursor-pointer hover:border-primary transition-colors group">
                <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-2.5">
                  <span className="text-secondary-black text-xs sm:text-sm font-medium truncate">All</span>
                  <ChevronDown size={14} className="sm:w-4 sm:h-4 text-secondary-medium group-hover:text-primary transition-colors flex-shrink-0"/>
                </div>
              </div>
            </div>

            <div className="w-full sm:w-36 lg:w-44">
              <div className="bg-white rounded-lg border-2 border-secondary-light shadow-sm cursor-pointer hover:border-primary transition-colors group">
                <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-2.5">
                  <span className="text-secondary-black text-xs sm:text-sm font-medium truncate">All</span>
                  <ChevronDown size={14} className="sm:w-4 sm:h-4 text-secondary-medium group-hover:text-primary transition-colors flex-shrink-0"/>
                </div>
              </div>
            </div>

            <div className="w-full sm:w-36 lg:w-44">
              <div className="bg-white rounded-lg border-2 border-secondary-light shadow-sm cursor-pointer hover:border-primary transition-colors group">
                <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-2.5">
                  <span className="text-secondary-black text-xs sm:text-sm font-medium truncate">Blockchain Wire</span>
                  <ChevronDown size={14} className="sm:w-4 sm:h-4 text-secondary-medium group-hover:text-primary transition-colors flex-shrink-0"/>
                </div>
              </div>
            </div>
          </div>

          <Button 
            onClick={() => navigate('/releases/add')} 
            className="w-full sm:w-auto shadow-md hover:shadow-lg transition-shadow text-sm sm:text-base"
          >
            Start a New Job
          </Button>
        </div>
      </div>

      {/* Releases List */}
      <div className="space-y-4">
        {MOCK_RELEASES.map((release) => (
          <Card key={release.id} hover className="group">
            <div className="flex flex-col lg:flex-row lg:items-start gap-4">
              {/* Left Section - Main Content */}
              <div className="flex-1 min-w-0">
                {/* Header Row - Status and Circuit */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="bg-secondary-medium/20 text-secondary-black py-1 px-3 rounded-lg font-medium text-xs">
                    {release.status}
                  </span>
                  <span className={`${getCircuitBadgeColor(release.circuitName)} text-white px-3 py-1 rounded-lg font-semibold text-xs`}>
                    {release.circuitName}
                  </span>
                </div>

                {/* Headline */}
                <h3 className="text-base sm:text-lg font-bold text-secondary-black mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {release.headline || 'No Headline'}
                </h3>

                {/* Meta Information */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-secondary-medium">
                  <div className="flex items-center gap-1.5">
                    <Clock size={14} />
                    <span>{release.date || 'not selected'}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-secondary-dark font-medium">{release.author}</span>
                  </div>
                </div>
              </div>

              {/* Right Section - Actions */}
              <div className="flex items-center gap-2 sm:gap-2 lg:flex-col lg:items-end lg:justify-start pt-1 flex-shrink-0">
                <button 
                  onClick={() => handleEdit(release)}
                  className="p-2 rounded-lg text-secondary-medium hover:text-primary hover:bg-primary-light transition-all border border-transparent hover:border-primary/20"
                  title="Edit release"
                  aria-label="Edit release"
                >
                  <Edit size={18} />
                </button>
                <button 
                  className="p-2 rounded-lg text-secondary-medium hover:text-red-500 hover:bg-red-50 transition-all border border-transparent hover:border-red-200"
                  title="Delete release"
                  aria-label="Delete release"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ListReleases;