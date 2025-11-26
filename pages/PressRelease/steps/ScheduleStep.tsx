import React, { useState, useMemo } from 'react';
import { ReleaseFormData } from '../../../types';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { useThemeClasses } from '../../../hooks/useThemeClasses';
import { useTheme } from '../../../contexts/ThemeContext';
import { Clock, ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  data: ReleaseFormData;
  onChange: (updates: Partial<ReleaseFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const ScheduleStep: React.FC<Props> = ({ data, onChange, onNext, onBack }) => {
  const classes = useThemeClasses();
  const { theme, colorMode } = useTheme();
  const [currentMonth, setCurrentMonth] = useState(() => {
    if (data.schedule.date) {
      const date = new Date(data.schedule.date);
      return new Date(date.getFullYear(), date.getMonth(), 1);
    }
    return new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  });

  const selectedDate = data.schedule.date ? (() => {
    const [year, month, day] = data.schedule.date.split('-').map(Number);
    return new Date(year, month - 1, day);
  })() : null;

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
    const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    
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
    if (!day || !data.schedule.date) return false;
    const [year, month, date] = data.schedule.date.split('-').map(Number);
    const currentYear = currentMonth.getFullYear();
    const currentMonthIndex = currentMonth.getMonth();
    return (
      date === day &&
      month - 1 === currentMonthIndex &&
      year === currentYear
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

  const getDateButtonClasses = (selected: boolean, today: boolean) => {
    if (selected) {
      return theme === 'cs'
        ? 'bg-wire-accent text-black font-bold border-2 border-wire-accent'
        : colorMode === 'dark'
          ? 'bg-primary-dark text-white font-bold border-2 border-primary-dark'
          : 'bg-primary text-white font-bold border-2 border-primary';
    }
    if (today) {
      return theme === 'cs'
        ? colorMode === 'dark' 
          ? 'bg-wire-accent/20 text-wire-accent font-semibold border border-wire-accent' 
          : 'bg-wire-accent/10 text-wire-accent font-semibold border border-wire-accent'
        : colorMode === 'dark' 
          ? 'bg-primary-dark/20 text-primary-dark font-semibold border border-primary-dark' 
          : 'bg-primary-light text-primary font-semibold border border-primary';
    }
    return `${classes.text.primary} hover:${classes.bg.secondary}`;
  };

  return (
    <Card variant="default" className="space-y-8 animate-fade-in p-8">
      <div>
        <h2 className={`text-lg sm:text-xl font-semibold ${classes.text.black}`}>4. Schedule</h2>
        <p className={`${classes.text.secondary} text-xs sm:text-sm`}>Select when your press release should be published.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card variant="compact" className="p-4">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={handlePreviousMonth}
              className={`p-1 rounded transition-colors ${classes.bg.secondary} hover:opacity-80`}
              aria-label="Previous month"
            >
              <ChevronLeft size={20} className={classes.text.primary} />
            </button>
            <span className={`font-bold ${classes.text.primary}`}>
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </span>
            <button
              onClick={handleNextMonth}
              className={`p-1 rounded transition-colors ${classes.bg.secondary} hover:opacity-80`}
              aria-label="Next month"
            >
              <ChevronRight size={20} className={classes.text.primary} />
            </button>
          </div>
          
          <div className={`grid grid-cols-7 text-center text-xs mb-2 font-semibold ${classes.text.secondary}`}>
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
                    ${getDateButtonClasses(selected, today)}
                  `}
                >
                  {day}
                </button>
              );
            })}
          </div>
          
          {selectedDate && (
            <div className={`mt-4 pt-4 border-t text-center ${classes.border.default}`}>
              <p className={`text-sm ${classes.text.secondary}`}>Selected:</p>
              <p className={`text-sm font-semibold ${classes.text.black}`}>
                {selectedDate.toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          )}
        </Card>

        <div className="space-y-6">
          <div>
            <label className={`block text-sm font-medium mb-1 ${classes.text.primary}`}>Time zone</label>
            <select
              value={data.schedule.timezone}
              onChange={(e) => handleTimezoneChange(e.target.value)}
              className={`w-full border px-2 py-1.5 rounded focus:outline-none transition-all ${classes.border.default} ${classes.bg.card} ${classes.text.black} ${theme === 'cs' ? 'focus:border-wire-accent' : 'focus:border-primary'}`}
            >
              <option value="US/Eastern">(UTC-05:00) Eastern Time (US & Canada)</option>
              <option value="US/Pacific">(UTC-08:00) Pacific Time (US & Canada)</option>
              <option value="US/Central">(UTC-06:00) Central Time (US & Canada)</option>
              <option value="US/Mountain">(UTC-07:00) Mountain Time (US & Canada)</option>
              <option value="UTC">UTC</option>
            </select>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-1 ${classes.text.primary}`}>Time</label>
            <div className={`flex items-center border rounded ${classes.border.default} ${classes.bg.card}`}>
              <Clock size={16} className={`${classes.text.secondary} ml-3`}/>
              <input
                type="time"
                value={data.schedule.time}
                onChange={(e) => handleTimeChange(e.target.value)}
                className={`w-full p-2 focus:outline-none border-none bg-transparent ${classes.text.black} ${theme === 'cs' ? 'focus:border-wire-accent' : 'focus:border-primary'}`}
              />
            </div>
            {data.schedule.time && (
              <p className={`text-xs mt-1 ${classes.text.secondary}`}>
                {new Date(`2000-01-01T${data.schedule.time}`).toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: '2-digit',
                  hour12: true
                })}
              </p>
            )}
          </div>

          <div className={`border p-4 rounded text-sm ${classes.icon.container} ${classes.border.accent} ${classes.text.primary}`}>
            <strong className={classes.text.black}>Please Note:</strong> Blockchain Wire provides editorial coverage from 7:00 AM ET to 7:00 PM ET Monday through Friday, excluding holidays. Any changes or edits made outside operating hours may not take effect.
          </div>
        </div>
      </div>

    </Card>
  );
};

export default ScheduleStep;