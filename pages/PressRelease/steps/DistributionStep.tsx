import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { CIRCUITS } from '../../../constants';
import { Button } from '../../../components/ui/Button';

interface Props {
  selectedCircuit: string | null;
  onSelect: (id: string) => void;
  onNext: () => void;
}

const DistributionStep: React.FC<Props> = ({ selectedCircuit, onSelect, onNext }) => {
  const [openCategories, setOpenCategories] = useState<{ [key: string]: boolean }>({
    'Wire': true,
    'Specialty': false,
    'Individual': false,
    'International': false,
  });

  const toggleCategory = (category: string) => {
    setOpenCategories(prev => ({ ...prev, [category]: !prev[category] }));
  };

  const getHeaderStyle = (id: string, category: string) => {
    // Theme-based color coding
    if (category === 'International') return 'bg-secondary-dark text-white';
    if (category === 'Individual') return 'bg-secondary-medium text-white';
    
    // Wire & Specialty tiers
    switch (id) {
      case 'basic-seo': return 'bg-primary-light text-secondary-black';
      case 'pro': return 'bg-primary/40 text-secondary-black';
      case 'elite': return 'bg-primary/70 text-white';
      case 'premium': return 'bg-primary text-white';
      
      // Metals
      case 'copper': return 'bg-[#B87333]/20 text-secondary-black';
      case 'silver': return 'bg-secondary-light text-secondary-black';
      case 'gold': return 'bg-[#FFD700]/20 text-secondary-black';
      case 'platinum': return 'bg-[#E5E4E2] text-secondary-black';
      case 'diamond': return 'bg-primary/10 text-primary border-primary';
      
      default: return 'bg-secondary-light/50 text-secondary-dark';
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-secondary-black">1. Distribution</h2>
          <p className="text-secondary-medium text-xs sm:text-sm">Select a circuit for your press release.</p>
        </div>
      </div>

      <div className="space-y-4 sm:space-y-5">
        {['Wire', 'Specialty', 'Individual', 'International'].map((category) => {
          const isOpen = openCategories[category];
          const circuits = CIRCUITS.filter(c => c.category === category);
          
          return (
            <div key={category} className="border border-secondary-light rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
              <button
                onClick={() => toggleCategory(category)}
                className="w-full flex items-center justify-between p-3 sm:p-4 hover:bg-secondary-light/20 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  {isOpen ? (
                    <ChevronDown size={18} className="text-secondary-medium group-hover:text-primary transition-colors" />
                  ) : (
                    <ChevronRight size={18} className="text-secondary-medium group-hover:text-primary transition-colors" />
                  )}
                  <h3 className="text-base sm:text-lg font-bold text-secondary-dark">
                    {category} Circuits
                  </h3>
                </div>
                <span className="text-xs sm:text-sm text-secondary-medium bg-secondary-light/50 w-6 h-6 rounded-full font-medium flex items-center justify-center">
                  {circuits.length}
                </span>
              </button>
              
              {isOpen && (
                <div className="px-3 sm:px-4 py-3 pt-3 border-t border-secondary-light">
                  <div className="grid grid-cols-1 gap-3 sm:gap-4">
                    {circuits.map((circuit) => {
                const isSelected = selectedCircuit === circuit.id;
                const headerStyle = getHeaderStyle(circuit.id, circuit.category);
                
                return (
                  <div 
                    key={circuit.id} 
                    className={`border rounded-lg overflow-hidden transition-all cursor-pointer bg-white ${isSelected ? 'ring-2 ring-primary shadow-md border-primary' : 'hover:shadow-sm border-secondary-light'}`}
                    onClick={() => onSelect(circuit.id)}
                  >
                    <div className={`px-4 py-2.5 font-bold text-base flex justify-between items-center ${headerStyle}`}>
                      <span>{circuit.name}</span>
                      {isSelected && (
                        <span className="bg-white text-primary text-[10px] px-2 py-0.5 rounded shadow-sm font-bold uppercase tracking-wider">Selected</span>
                      )}
                    </div>
                    
                    <div className="p-4">
                      <p className="text-xs sm:text-sm font-medium text-secondary-medium mb-3 leading-snug">{circuit.description}</p>
                      
                      <div className="mb-3">
                        <span className="font-semibold text-secondary-black text-xs block mb-1.5">Distribution:</span>
                        <ul className="text-xs sm:text-sm text-secondary-dark list-disc pl-4 space-y-0.5">
                          {circuit.features.map((feature, i) => (
                            <li key={i}>{feature}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="grid grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm mb-3 text-secondary-dark">
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
                      
                      <div className="text-base sm:text-lg font-bold text-secondary-black border-t border-secondary-light pt-3 flex justify-between items-center">
                        <div className="text-sm sm:text-base">
                          <span className="text-secondary-medium font-normal">Price: </span>
                          ${circuit.price.toFixed(2)}
                          {category === 'International' && <span className="text-xs font-normal text-secondary-medium"> flat rate</span>}
                        </div>
                        <Button 
                          size="sm" 
                          variant={isSelected ? 'primary' : 'outline'}
                          className={isSelected ? '' : 'text-secondary-medium border-secondary-light'}
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
    </div>
  );
};

export default DistributionStep;