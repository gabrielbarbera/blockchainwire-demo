import React, { useState, useMemo } from 'react';
import { ReleaseFormData } from '../../../types';
import { Button } from '../../../components/ui/Button';
import { Clock, ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  data: ReleaseFormData;
  onChange: (updates: Partial<ReleaseFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const ScheduleStep: React.FC<Props> = ({ data, onChange, onNext, onBack }) => {
  const [currentMonth, setCurrentMonth] = useState(() => {
    if (data.schedule.date) {
      const date = new Date(data.schedule.date);
      return new Date(date.getFullYear(), date.getMonth(), 1);
    }
    return new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  });

  const selectedDate = data.schedule.date ? new Date(data.schedule.date) : null;

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days: (number | null)[] = [];
    
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  }, [currentMonth]);

  const handleDateSelect = (day: number) => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const selectedDate = new Date(year, month, day);
    const dateString = selectedDate.toISOString().split('T')[0];
    
    onChange({
      schedule: {
        ...data.schedule,
        date: dateString,
      },
    });
  };

  const handlePreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const isSelected = (day: number | null) => {
    if (!day || !selectedDate) return false;
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === month &&
      selectedDate.getFullYear() === year
    );
  };

  const isToday = (day: number | null) => {
    if (!day) return false;
    const today = new Date();
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    return (
      today.getDate() === day &&
      today.getMonth() === month &&
      today.getFullYear() === year
    );
  };

  const handleTimeChange = (time: string) => {
    onChange({
      schedule: {
        ...data.schedule,
        time,
      },
    });
  };

  const handleTimezoneChange = (timezone: string) => {
    onChange({
      schedule: {
        ...data.schedule,
        timezone,
      },
    });
  };

  return (
    <div className="space-y-8 animate-fade-in bg-white p-8 rounded-lg shadow-sm border border-secondary-light">
      <div>
        <h2 className="text-xl font-semibold text-secondary-black">4. Schedule</h2>
        <p className="text-secondary-medium">Select when your press release should be published.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white border border-secondary-light rounded-lg p-4 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={handlePreviousMonth}
              className="p-1 hover:bg-secondary-light rounded transition-colors"
              aria-label="Previous month"
            >
              <ChevronLeft size={20} className="text-secondary-dark" />
            </button>
            <span className="font-bold text-secondary-dark">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </span>
            <button
              onClick={handleNextMonth}
              className="p-1 hover:bg-secondary-light rounded transition-colors"
              aria-label="Next month"
            >
              <ChevronRight size={20} className="text-secondary-dark" />
            </button>
          </div>
          
          <div className="grid grid-cols-7 text-center text-xs text-secondary-medium mb-2 font-semibold">
            {weekDays.map((day, index) => (
              <div key={index}>{day}</div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 text-center text-sm gap-1">
            {calendarDays.map((day, index) => {
              if (day === null) {
                return <div key={index} className="h-8"></div>;
              }
              
              const selected = isSelected(day);
              const today = isToday(day);
              
              return (
                <button
                  key={index}
                  onClick={() => handleDateSelect(day)}
                  className={`
                    h-8 w-8 rounded-full flex items-center justify-center mx-auto
                    transition-colors
                    ${selected
                      ? 'bg-primary text-white font-bold border-2 border-primary'
                      : today
                      ? 'bg-primary-light text-primary font-semibold border border-primary'
                      : 'text-secondary-dark hover:bg-secondary-light'
                    }
                  `}
                >
                  {day}
                </button>
              );
            })}
          </div>
          
          {selectedDate && (
            <div className="mt-4 pt-4 border-t border-secondary-light text-center">
              <p className="text-sm text-secondary-medium">Selected:</p>
              <p className="text-sm font-semibold text-secondary-black">
                {selectedDate.toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-secondary-dark mb-1">Time zone</label>
            <select
              value={data.schedule.timezone}
              onChange={(e) => handleTimezoneChange(e.target.value)}
              className="w-full border border-secondary-medium/50 p-2 rounded bg-white text-secondary-black focus:outline-none focus:border-primary"
            >
              <option value="US/Eastern">(UTC-05:00) Eastern Time (US & Canada)</option>
              <option value="US/Pacific">(UTC-08:00) Pacific Time (US & Canada)</option>
              <option value="US/Central">(UTC-06:00) Central Time (US & Canada)</option>
              <option value="US/Mountain">(UTC-07:00) Mountain Time (US & Canada)</option>
              <option value="UTC">UTC</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-dark mb-1">Time</label>
            <div className="flex items-center border border-secondary-medium/50 rounded bg-white">
              <Clock size={16} className="text-secondary-medium ml-3"/>
              <input
                type="time"
                value={data.schedule.time}
                onChange={(e) => handleTimeChange(e.target.value)}
                className="w-full p-2 text-secondary-black focus:outline-none focus:border-primary border-none bg-transparent"
              />
            </div>
            {data.schedule.time && (
              <p className="text-xs text-secondary-medium mt-1">
                {new Date(`2000-01-01T${data.schedule.time}`).toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: '2-digit',
                  hour12: true
                })}
              </p>
            )}
          </div>

          <div className="bg-primary-light/30 border border-primary/30 p-4 rounded text-sm text-secondary-dark">
            <strong className="text-secondary-black">Please Note:</strong> Blockchain Wire provides editorial coverage from 7:00 AM ET to 7:00 PM ET Monday through Friday, excluding holidays. Any changes or edits made outside operating hours may not take effect.
          </div>
        </div>
      </div>

    </div>
  );
};

export default ScheduleStep;