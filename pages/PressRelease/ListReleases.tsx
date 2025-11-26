import React, { useState, useMemo } from 'react';
import { MOCK_RELEASES, CIRCUITS } from '../../constants';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { useNavigate } from 'react-router-dom';
import { useThemeClasses } from '../../hooks/useThemeClasses';
import { useTheme } from '../../contexts/ThemeContext';
import { List, Clock, Edit, Trash2 } from 'lucide-react';
import { Release } from '../../types';

const ListReleases: React.FC = () => {
  const navigate = useNavigate();
  const classes = useThemeClasses();
  const { theme, colorMode } = useTheme();
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedCircuit, setSelectedCircuit] = useState<string>('all');
  const [selectedAuthor, setSelectedAuthor] = useState<string>('all');

  const uniqueAuthors = useMemo(() => {
    const authors = Array.from(new Set(MOCK_RELEASES.map(r => r.author)));
    return authors.sort();
  }, []);

  const uniqueCircuits = useMemo(() => {
    const circuits = Array.from(new Set(MOCK_RELEASES.map(r => r.circuitName)));
    return circuits.sort();
  }, []);

  const filteredReleases = useMemo(() => {
    return MOCK_RELEASES.filter(release => {
      if (selectedStatus !== 'all' && release.status !== selectedStatus) {
        return false;
      }

      if (selectedCircuit !== 'all' && release.circuitName !== selectedCircuit) {
        return false;
      }

      if (selectedAuthor !== 'all' && release.author !== selectedAuthor) {
        return false;
      }

      return true;
    });
  }, [selectedStatus, selectedCircuit, selectedAuthor]);

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
    const isDark = colorMode === 'dark';
    const isCS = theme === 'cs';
    
    if (name.includes('Global') || name === 'Premium') {
      return isCS 
        ? 'bg-wire-accent text-black' 
        : isDark 
          ? 'bg-primary-dark text-white' 
          : 'bg-primary text-white';
    }
    if (name === 'Pro') {
      return isCS 
        ? 'bg-wire-accent/80 text-black' 
        : isDark 
          ? 'bg-primary-dark/80 text-white' 
          : 'bg-primary/80 text-white';
    }
    if (name === 'Elite') {
      return isCS 
        ? 'bg-wire-accent/70 text-black' 
        : isDark 
          ? 'bg-primary-dark/70 text-white' 
          : 'bg-primary/70 text-white';
    }
    if (name === 'Basic SEO') {
      return isCS
        ? isDark ? 'bg-wire-accent/20 text-wire-text' : 'bg-wire-accent/10 text-wire-text-dark'
        : isDark ? 'bg-primary-dark/20 text-gray-200' : 'bg-primary-light text-secondary-black';
    }
    return isCS
      ? isDark ? 'bg-wire-bg-light text-wire-text' : 'bg-wire-bg-light text-wire-text-dark'
      : isDark ? 'bg-gray-600 text-white' : 'bg-secondary-medium text-white';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 animate-fade-in">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 sm:mb-8 gap-4">
        <div className={`flex items-center gap-2 ${classes.text.secondary}`}>
          <div className={`p-1.5 sm:p-2 rounded-lg ${classes.icon.container}`}>
            <List className={theme === 'cs' ? 'text-wire-accent' : 'text-primary'} size={18} />
          </div>
          <div>
            <h1 className={`text-lg sm:text-xl lg:text-2xl font-bold ${classes.text.black}`}>Press Releases</h1>
            <p className={`text-xs sm:text-sm ${classes.text.secondary}`}>
              {filteredReleases.length} {filteredReleases.length === 1 ? 'release' : 'releases'}
              {(selectedStatus !== 'all' || selectedCircuit !== 'all' || selectedAuthor !== 'all') && (
                <span className="ml-1">(filtered from {MOCK_RELEASES.length} total)</span>
              )}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 w-full md:w-auto">
          <div className="grid grid-cols-3 sm:flex gap-2 sm:gap-3 w-full sm:w-auto">
            <div className="w-full sm:w-36 lg:w-44">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className={`w-full border rounded-lg shadow-sm px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium transition-all duration-200 focus:outline-none appearance-none cursor-pointer bg-no-repeat bg-right pr-8 sm:pr-10 ${classes.border.default} ${classes.bg.card} ${classes.text.black} ${theme === 'cs' ? 'focus:border-wire-accent hover:shadow-md' : 'focus:border-primary hover:shadow-md'}`}
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='${colorMode === 'dark' ? (theme === 'cs' ? '%23ffffff' : '%239ca3af') : (theme === 'cs' ? '%23000000' : '%236b7280')}' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'%3E%3C/path%3E%3C/svg%3E")`,
                  backgroundPosition: 'right 0.75rem center',
                  backgroundSize: '14px 14px'
                }}
              >
                <option value="all">All Status</option>
                <option value="Draft">Draft</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Published">Published</option>
              </select>
            </div>

            <div className="w-full sm:w-36 lg:w-44">
              <select
                value={selectedCircuit}
                onChange={(e) => setSelectedCircuit(e.target.value)}
                className={`w-full border rounded-lg shadow-sm px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium transition-all duration-200 focus:outline-none appearance-none cursor-pointer bg-no-repeat bg-right pr-8 sm:pr-10 ${classes.border.default} ${classes.bg.card} ${classes.text.black} ${theme === 'cs' ? 'focus:border-wire-accent hover:shadow-md' : 'focus:border-primary hover:shadow-md'}`}
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='${colorMode === 'dark' ? (theme === 'cs' ? '%23ffffff' : '%239ca3af') : (theme === 'cs' ? '%23000000' : '%236b7280')}' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'%3E%3C/path%3E%3C/svg%3E")`,
                  backgroundPosition: 'right 0.75rem center',
                  backgroundSize: '14px 14px'
                }}
              >
                <option value="all">All Circuits</option>
                {uniqueCircuits.map((circuit) => (
                  <option key={circuit} value={circuit}>
                    {circuit}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-full sm:w-36 lg:w-44">
              <select
                value={selectedAuthor}
                onChange={(e) => setSelectedAuthor(e.target.value)}
                className={`w-full border rounded-lg shadow-sm px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium transition-all duration-200 focus:outline-none appearance-none cursor-pointer bg-no-repeat bg-right pr-8 sm:pr-10 ${classes.border.default} ${classes.bg.card} ${classes.text.black} ${theme === 'cs' ? 'focus:border-wire-accent hover:shadow-md' : 'focus:border-primary hover:shadow-md'}`}
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='${colorMode === 'dark' ? (theme === 'cs' ? '%23ffffff' : '%239ca3af') : (theme === 'cs' ? '%23000000' : '%236b7280')}' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'%3E%3C/path%3E%3C/svg%3E")`,
                  backgroundPosition: 'right 0.75rem center',
                  backgroundSize: '14px 14px'
                }}
              >
                <option value="all">All Authors</option>
                {uniqueAuthors.map((author) => (
                  <option key={author} value={author}>
                    {author}
                  </option>
                ))}
              </select>
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
        {filteredReleases.length === 0 ? (
          <Card>
            <div className={`text-center py-8 sm:py-12 ${classes.text.secondary}`}>
              <p className="text-sm sm:text-base font-medium mb-2">No releases found</p>
              <p className="text-xs sm:text-sm">Try adjusting your filters to see more results.</p>
            </div>
          </Card>
        ) : (
          filteredReleases.map((release) => (
          <Card key={release.id} hover className="group">
            <div className="flex flex-col lg:flex-row lg:items-start gap-4">
              {/* Left Section - Main Content */}
              <div className="flex-1 min-w-0">
                {/* Header Row - Status and Circuit */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className={`py-1 px-3 rounded-lg font-medium text-xs ${classes.bg.tertiary} ${classes.text.primary}`}>
                    {release.status}
                  </span>
                  <span className={`${getCircuitBadgeColor(release.circuitName)} px-3 py-1 rounded-lg font-semibold text-xs`}>
                    {release.circuitName}
                  </span>
                </div>

                {/* Headline */}
                <h3 className={`text-base sm:text-lg font-bold mb-2 line-clamp-2 transition-colors ${classes.text.black} ${theme === 'cs' ? 'group-hover:text-wire-accent' : 'group-hover:text-primary'}`}>
                  {release.headline || 'No Headline'}
                </h3>

                {/* Meta Information */}
                <div className={`flex flex-wrap items-center gap-4 text-sm ${classes.text.secondary}`}>
                  <div className="flex items-center gap-1.5">
                    <Clock size={14} />
                    <span>{release.date || 'not selected'}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className={`font-medium ${classes.text.primary}`}>{release.author}</span>
                  </div>
                </div>
              </div>

              {/* Right Section - Actions */}
              <div className="flex items-center gap-2 sm:gap-2 lg:flex-col lg:items-end lg:justify-start pt-1 flex-shrink-0">
                <button 
                  onClick={() => handleEdit(release)}
                  className={`p-2 rounded-lg transition-all border border-transparent ${classes.text.secondary} ${theme === 'cs' ? 'hover:text-wire-accent hover:bg-wire-accent/20 hover:border-wire-accent/20' : 'hover:text-primary hover:bg-primary-light hover:border-primary/20'}`}
                  title="Edit release"
                  aria-label="Edit release"
                >
                  <Edit size={18} />
                </button>
                <button 
                  className={`p-2 rounded-lg transition-all border border-transparent ${classes.text.secondary} hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-200 dark:hover:border-red-800`}
                  title="Delete release"
                  aria-label="Delete release"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default ListReleases;