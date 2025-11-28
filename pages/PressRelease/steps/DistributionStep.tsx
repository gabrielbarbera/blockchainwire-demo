import React, { useState } from 'react';
import { ChevronDown, ChevronRight, X, Scale, ArrowRight } from 'lucide-react';
import { CIRCUITS } from '../../../constants';
import { Button } from '../../../components/ui/Button';
import { useTheme } from '../../../contexts/ThemeContext';
import { useThemeClasses } from '../../../hooks/useThemeClasses';

interface Props {
  selectedCircuit: string | null;
  onSelect: (id: string) => void;
  onNext: () => void;
}

const DistributionStep: React.FC<Props> = ({ selectedCircuit, onSelect, onNext }) => {
  const { theme, colorMode } = useTheme();
  const classes = useThemeClasses();
  const [openCategories, setOpenCategories] = useState<{ [key: string]: boolean }>({
    'Wire': true,
    'Specialty': false,
    'Individual': false,
    'International': false,
  });
  const [compareCircuits, setCompareCircuits] = useState<Set<string>>(new Set());
  const [showComparison, setShowComparison] = useState(false);

  const toggleCategory = (category: string) => {
    setOpenCategories(prev => ({ ...prev, [category]: !prev[category] }));
  };

  const toggleCompare = (circuitId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCompareCircuits(prev => {
      const newSet = new Set(prev);
      if (newSet.has(circuitId)) {
        newSet.delete(circuitId);
      } else if (newSet.size < 4) {
        newSet.add(circuitId);
      }
      return newSet;
    });
  };

  const removeFromCompare = (circuitId: string) => {
    setCompareCircuits(prev => {
      const newSet = new Set(prev);
      newSet.delete(circuitId);
      return newSet;
    });
  };

  const clearCompare = () => {
    setCompareCircuits(new Set());
    setShowComparison(false);
  };

  const comparisonCircuits = Array.from(compareCircuits)
    .map(id => CIRCUITS.find(c => c.id === id))
    .filter(Boolean) as typeof CIRCUITS;

  const getHeaderStyle = (id: string, category: string, theme: string, colorMode: string) => {
    const isDark = colorMode === 'dark';
    const isCS = theme === 'cs';
    
    if (category === 'International') {
      return isCS
        ? isDark ? 'bg-wire-bg-light text-wire-text' : 'bg-wire-bg text-wire-text'
        : isDark ? 'bg-gray-700 text-white' : 'bg-secondary-dark text-white';
    }
    if (category === 'Individual') {
      return isCS
        ? isDark ? 'bg-wire-bg-lighter text-wire-text' : 'bg-wire-bg-light text-wire-text'
        : isDark ? 'bg-gray-600 text-white' : 'bg-secondary-medium text-white';
    }
    
    switch (id) {
      case 'basic-seo':
        return isCS
          ? isDark ? 'bg-wire-accent/20 text-wire-text' : 'bg-wire-accent/10 text-wire-text-dark'
          : isDark ? 'bg-primary-dark/20 text-gray-200' : 'bg-primary-light text-secondary-black';
      case 'pro':
        return isCS
          ? isDark ? 'bg-wire-accent/40 text-wire-text' : 'bg-wire-accent/20 text-wire-text-dark'
          : isDark ? 'bg-primary-dark/40 text-gray-200' : 'bg-primary/40 text-secondary-black';
      case 'elite':
        return isCS
          ? isDark ? 'bg-wire-accent/70 text-black' : 'bg-wire-accent/70 text-black'
          : isDark ? 'bg-primary-dark/70 text-white' : 'bg-primary/70 text-white';
      case 'premium':
        return isCS
          ? isDark ? 'bg-wire-accent text-black' : 'bg-wire-accent text-black'
          : isDark ? 'bg-primary-dark text-white' : 'bg-primary text-white';
      
      case 'copper': return 'bg-[#B87333]/20 text-secondary-black dark:text-gray-200';
      case 'silver':
        return isCS
          ? isDark ? 'bg-wire-bg-light text-wire-text' : 'bg-wire-bg-light-mode text-wire-text-dark'
          : isDark ? 'bg-gray-600 text-gray-200' : 'bg-secondary-light text-secondary-black';
      case 'gold': return 'bg-[#FFD700]/20 text-secondary-black dark:text-gray-200';
      case 'platinum': return 'bg-[#E5E4E2] text-secondary-black dark:text-gray-800';
      case 'diamond':
        return isCS
          ? isDark ? 'bg-wire-accent/10 text-wire-accent border-wire-accent' : 'bg-wire-accent/10 text-wire-accent border-wire-accent'
          : isDark ? 'bg-primary-dark/10 text-primary-dark border-primary-dark' : 'bg-primary/10 text-primary border-primary';
      
      default:
        return isCS
          ? isDark ? 'bg-wire-bg-light/50 text-wire-text-secondary' : 'bg-wire-bg-light-mode/50 text-wire-text-dark'
          : isDark ? 'bg-gray-700/50 text-gray-300' : 'bg-secondary-light/50 text-secondary-dark';
    }
  };

  return (
    <div className={`space-y-6 sm:space-y-8 animate-fade-in ${compareCircuits.size > 0 && !showComparison ? 'pb-24' : ''}`}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h2 className={`text-lg sm:text-xl font-semibold ${classes.text.black}`}>1. Distribution</h2>
          <p className={`${classes.text.secondary} text-xs sm:text-sm`}>Select a circuit for your press release.</p>
        </div>
        {compareCircuits.size > 0 && (
          <Button
            onClick={() => setShowComparison(true)}
            variant="outline"
            disabled={compareCircuits.size < 2}
            className="flex items-center gap-2"
          >
            <Scale size={16} />
            Compare ({compareCircuits.size})
          </Button>
        )}
      </div>

      <div className="space-y-4 sm:space-y-5">
        {['Wire', 'Specialty', 'Individual', 'International'].map((category) => {
          const isOpen = openCategories[category];
          const circuits = CIRCUITS.filter(c => c.category === category);
          
          return (
            <div key={category} className={`border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow ${classes.border.default} ${classes.bg.card}`}>
              <button
                onClick={() => toggleCategory(category)}
                className={`w-full flex items-center justify-between p-3 sm:p-4 transition-colors group ${classes.bg.tertiary} hover:${classes.bg.secondary}`}
              >
                <div className="flex items-center gap-3">
                  {isOpen ? (
                    <ChevronDown size={18} className={`${classes.text.secondary} transition-colors ${theme === 'cs' ? 'group-hover:text-wire-accent' : 'group-hover:text-primary'}`} />
                  ) : (
                    <ChevronRight size={18} className={`${classes.text.secondary} transition-colors ${theme === 'cs' ? 'group-hover:text-wire-accent' : 'group-hover:text-primary'}`} />
                  )}
                  <h3 className={`text-base sm:text-lg font-bold ${classes.text.primary}`}>
                    {category} Circuits
                  </h3>
                </div>
                <span className={`text-xs sm:text-sm w-6 h-6 rounded-full font-medium flex items-center justify-center ${classes.text.secondary} ${classes.bg.secondary}`}>
                  {circuits.length}
                </span>
              </button>
              
              {isOpen && (
                <div className={`px-3 sm:px-4 py-3 pt-3 border-t ${classes.border.default}`}>
                  <div className="grid grid-cols-1 gap-3 sm:gap-4">
                    {circuits.map((circuit) => {
                const isSelected = selectedCircuit === circuit.id;
                const headerStyle = getHeaderStyle(circuit.id, circuit.category, theme, colorMode);
                
                const isComparing = compareCircuits.has(circuit.id);
                
                return (
                  <div 
                    key={circuit.id} 
                    className={`border rounded-lg overflow-hidden transition-all cursor-pointer ${classes.bg.card} ${isSelected ? `ring-2 shadow-md ${theme === 'cs' ? 'ring-wire-accent border-wire-accent' : 'ring-primary border-primary'}` : isComparing ? `ring-2 ${theme === 'cs' ? 'ring-wire-accent/50 border-wire-accent/50' : 'ring-primary/50 border-primary/50'}` : `hover:shadow-sm ${classes.border.default}`}`}
                    onClick={() => onSelect(circuit.id)}
                  >
                    <div className={`px-4 py-2.5 font-bold text-base flex justify-between items-center ${headerStyle}`}>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={isComparing}
                          onChange={() => {}}
                          onClick={(e) => toggleCompare(circuit.id, e)}
                          className={`w-4 h-4 rounded ${theme === 'cs' ? 'text-wire-accent border-wire-accent focus:ring-wire-accent' : 'text-primary border-secondary-light focus:ring-primary'} cursor-pointer`}
                        />
                        <span>{circuit.name}</span>
                      </div>
                      {isSelected && (
                        <span className={`${classes.bg.card} text-[10px] px-2 py-0.5 rounded shadow-sm font-bold uppercase tracking-wider ${theme === 'cs' ? 'text-wire-accent' : 'text-primary'}`}>Selected</span>
                      )}
                    </div>
                    
                    <div className="p-4">
                      <p className={`text-xs sm:text-sm font-medium mb-3 leading-snug ${classes.text.secondary}`}>{circuit.description}</p>
                      
                      <div className="mb-3">
                        <span className={`font-semibold text-xs block mb-1.5 ${classes.text.black}`}>Distribution:</span>
                        <ul className={`text-xs sm:text-sm list-disc pl-4 space-y-0.5 ${classes.text.primary}`}>
                          {circuit.features.map((feature, i) => (
                            <li key={i}>{feature}</li>
                          ))}
                        </ul>
                      </div>

                      <div className={`grid grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm mb-3 ${classes.text.primary}`}>
                        {circuit.stats?.traffic && (
                          <div><span className="font-semibold">Traffic:</span> {circuit.stats.traffic}</div>
                        )}
                        {circuit.stats?.turnaround && (
                           <div><span className="font-semibold">Turnaround:</span> {circuit.stats.turnaround}</div>
                        )}
                        {circuit.stats?.countries && (
                           <div><span className="font-semibold">Countries:</span> {circuit.stats.countries}</div>
                        )}
                        {circuit.stats?.language && (
                           <div><span className="font-semibold">Language:</span> {circuit.stats.language}</div>
                        )}
                      </div>
                      
                      <div className={`text-base sm:text-lg font-bold border-t pt-3 flex justify-between items-center ${classes.text.black} ${classes.border.default}`}>
                        <div className="text-sm sm:text-base">
                          <span className={`font-normal ${classes.text.secondary}`}>Price: </span>
                          ${circuit.price.toFixed(2)}
                          {category === 'International' && <span className={`text-xs font-normal ${classes.text.secondary}`}> flat rate</span>}
                        </div>
                        <Button 
                          size="sm" 
                          variant={isSelected ? 'primary' : 'outline'}
                          className={isSelected ? '' : 'text-secondary-medium border-secondary-light'}
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelect(circuit.id);
                            // Auto-fill checkbox when select button is pressed
                            if (!compareCircuits.has(circuit.id) && compareCircuits.size < 4) {
                              setCompareCircuits(prev => new Set(prev).add(circuit.id));
                            }
                          }}
                        >
                          {isSelected ? 'Selected' : 'Select'}
                        </Button>
                      </div>
                    </div>
                  </div>
                    );
                  })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Comparison Modal */}
      {showComparison && comparisonCircuits.length > 0 && (
        <div className="fixed inset-0 bg-black/50 z-[70] flex items-start sm:items-center justify-center p-0 sm:p-4 md:p-6 pt-[64px] sm:pt-0 overflow-y-auto" onClick={clearCompare}>
          <div 
            className={`${classes.bg.card} rounded-none sm:rounded-lg shadow-xl max-w-7xl w-full min-h-full sm:min-h-0 sm:h-auto sm:max-h-[90vh] overflow-hidden flex flex-col animate-fade-in my-0 sm:my-auto`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className={`flex items-center justify-between p-3 sm:p-4 md:p-6 border-b flex-shrink-0 ${classes.border.default}`}>
              <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                <Scale className={`${theme === 'cs' ? 'text-wire-accent' : 'text-primary'} flex-shrink-0`} size={18} />
                <h3 className={`text-base sm:text-lg md:text-xl font-bold truncate ${classes.text.black}`}>Compare Circuits</h3>
                <span className={`text-xs px-2 py-1 rounded flex-shrink-0 ${classes.bg.secondary} ${classes.text.secondary}`}>
                  {comparisonCircuits.length}
                </span>
              </div>
              <button
                onClick={clearCompare}
                className={`p-1.5 sm:p-2 ${classes.bg.secondary} hover:opacity-80 rounded-lg transition-colors flex-shrink-0 ml-2`}
                aria-label="Close comparison"
              >
                <X size={16} className={classes.text.secondary} />
              </button>
            </div>

            {/* Comparison Table */}
            <div className="overflow-x-auto flex-1 overscroll-contain -mx-0 sm:mx-0">
              <div className="min-w-max sm:min-w-full">
                {/* Header Row */}
                <div 
                  className={`grid gap-1.5 sm:gap-2 md:gap-4 p-2 sm:p-3 md:p-4 lg:p-6 border-b sticky top-0 z-10 ${classes.bg.secondary} ${classes.border.default}`}
                  style={{ gridTemplateColumns: `minmax(100px, 150px) repeat(${comparisonCircuits.length}, minmax(180px, 220px))` }}
                >
                  <div className={`font-semibold text-xs sm:text-sm md:text-base text-left justify-self-start ${classes.text.black}`}>Feature</div>
                  {comparisonCircuits.map(circuit => (
                    <div key={circuit.id} className="text-center min-w-0">
                      <div className={`font-bold text-xs sm:text-sm md:text-base lg:text-lg mb-0.5 sm:mb-1 break-words ${classes.text.black}`}>{circuit.name}</div>
                      <div className={`text-[10px] sm:text-xs ${classes.text.secondary}`}>{circuit.category}</div>
                    </div>
                  ))}
                </div>

                {/* Price Row */}
                <div 
                  className={`grid gap-1.5 sm:gap-2 md:gap-4 p-2 sm:p-3 md:p-4 lg:p-6 border-b ${classes.border.default}`}
                  style={{ gridTemplateColumns: `minmax(100px, 150px) repeat(${comparisonCircuits.length}, minmax(180px, 220px))` }}
                >
                  <div className={`font-semibold text-xs sm:text-sm md:text-base text-left justify-self-start ${classes.text.black}`}>Price</div>
                  {comparisonCircuits.map(circuit => (
                    <div key={circuit.id} className="text-center min-w-0">
                      <div className={`text-sm sm:text-base md:text-lg lg:text-xl font-bold break-words ${theme === 'cs' ? 'text-wire-accent' : 'text-primary'}`}>
                        ${circuit.price.toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Description Row */}
                <div 
                  className={`grid gap-1.5 sm:gap-2 md:gap-4 p-2 sm:p-3 md:p-4 lg:p-6 border-b ${classes.border.default}`}
                  style={{ gridTemplateColumns: `minmax(100px, 150px) repeat(${comparisonCircuits.length}, minmax(180px, 220px))` }}
                >
                  <div className={`font-semibold text-xs sm:text-sm md:text-base text-left justify-self-start ${classes.text.black} pt-1`}>Description</div>
                  {comparisonCircuits.map(circuit => (
                    <div key={circuit.id} className={`text-xs sm:text-sm break-words ${classes.text.primary}`}>
                      {circuit.description}
                    </div>
                  ))}
                </div>

                {/* Stats Rows */}
                {['traffic', 'turnaround', 'countries', 'language'].map(statKey => {
                  const hasStat = comparisonCircuits.some(c => c.stats?.[statKey as keyof typeof c.stats]);
                  if (!hasStat) return null;
                  
                  return (
                    <div 
                      key={statKey} 
                      className={`grid gap-1.5 sm:gap-2 md:gap-4 p-2 sm:p-3 md:p-4 lg:p-6 border-b ${classes.border.default}`}
                      style={{ gridTemplateColumns: `minmax(100px, 150px) repeat(${comparisonCircuits.length}, minmax(180px, 220px))` }}
                    >
                      <div className={`font-semibold text-xs sm:text-sm md:text-base capitalize text-left justify-self-start ${classes.text.black}`}>
                        {statKey === 'traffic' ? 'Traffic' : statKey === 'turnaround' ? 'Turnaround' : statKey === 'countries' ? 'Countries' : 'Language'}
                      </div>
                      {comparisonCircuits.map(circuit => (
                        <div key={circuit.id} className={`text-xs sm:text-sm break-words ${classes.text.primary}`}>
                          {circuit.stats?.[statKey as keyof typeof circuit.stats] || 'N/A'}
                        </div>
                      ))}
                    </div>
                  );
                })}

                {/* Features Row */}
                <div 
                  className={`grid gap-1.5 sm:gap-2 md:gap-4 p-2 sm:p-3 md:p-4 lg:p-6 border-b ${classes.border.default}`}
                  style={{ gridTemplateColumns: `minmax(100px, 150px) repeat(${comparisonCircuits.length}, minmax(180px, 220px))` }}
                >
                  <div className={`font-semibold text-xs sm:text-sm md:text-base text-left justify-self-start pt-1 ${classes.text.black}`}>Features</div>
                  {comparisonCircuits.map(circuit => (
                    <div key={circuit.id} className={`text-xs sm:text-sm ${classes.text.primary}`}>
                      <ul className="list-disc pl-3 sm:pl-4 md:pl-5 space-y-0.5 sm:space-y-1">
                        {circuit.features.map((feature, i) => (
                          <li key={i} className="break-words">{feature}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Action Row */}
                <div 
                  className={`grid gap-1.5 sm:gap-2 md:gap-4 p-2 sm:p-3 md:p-4 lg:p-6 flex-shrink-0 ${classes.bg.tertiary}`}
                  style={{ gridTemplateColumns: `minmax(100px, 150px) repeat(${comparisonCircuits.length}, minmax(180px, 220px))` }}
                >
                  <div className={`font-semibold text-xs sm:text-sm md:text-base text-left justify-self-start ${classes.text.black}`}>Action</div>
                  {comparisonCircuits.map(circuit => (
                    <div key={circuit.id} className="text-center min-w-0">
                      <Button
                        size="sm"
                        variant={selectedCircuit === circuit.id ? 'primary' : 'outline'}
                        onClick={() => {
                          onSelect(circuit.id);
                          clearCompare();
                        }}
                        className="w-full text-xs sm:text-sm px-2 sm:px-4"
                      >
                        {selectedCircuit === circuit.id ? 'Selected' : 'Select'}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Comparison Bar (Sticky) */}
      {compareCircuits.size > 0 && !showComparison && (
        <div className={`fixed bottom-0 left-0 right-0 z-40 p-3 sm:p-4 border-t shadow-lg ${classes.bg.card} ${classes.border.default}`}>
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap min-w-0 flex-1">
              <Scale className={`${theme === 'cs' ? 'text-wire-accent' : 'text-primary'} flex-shrink-0`} size={16} />
              <span className={`text-xs sm:text-sm font-medium whitespace-nowrap ${classes.text.primary}`}>
                Comparing {compareCircuits.size}:
              </span>
              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap min-w-0">
                {comparisonCircuits.map(circuit => (
                  <span
                    key={circuit.id}
                    className={`text-xs px-2 sm:px-3 py-1 sm:py-1.5 rounded-full flex items-center gap-1.5 flex-shrink-0 ${classes.bg.secondary} ${classes.text.primary}`}
                  >
                    <span className="truncate max-w-[100px] sm:max-w-none">{circuit.name}</span>
                    <button
                      onClick={() => removeFromCompare(circuit.id)}
                      className="hover:opacity-70 transition-opacity flex-shrink-0"
                      aria-label={`Remove ${circuit.name} from comparison`}
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button
                variant="outline"
                size="sm"
                onClick={clearCompare}
                className="flex-1 sm:flex-none text-xs sm:text-sm"
              >
                Clear
              </Button>
              <Button
                size="sm"
                onClick={() => setShowComparison(true)}
                disabled={compareCircuits.size < 2}
                className="flex-1 sm:flex-none text-xs sm:text-sm"
              >
                Compare
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Next Button */}
      <div className={`flex justify-end mt-8 pt-6 border-t ${classes.border.default}`}>
        <Button 
          onClick={onNext}
          disabled={!selectedCircuit}
          size="lg"
          className="flex items-center gap-2"
        >
          Next
          <ArrowRight size={20} />
        </Button>
      </div>
    </div>
  );
};

export default DistributionStep;