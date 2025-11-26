import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { useThemeClasses } from '../../hooks/useThemeClasses';
import { useTheme } from '../../contexts/ThemeContext';
import { UserPlus, FileText } from 'lucide-react';

const AddUser: React.FC = () => {
  const classes = useThemeClasses();
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 animate-fade-in">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 sm:mb-8 gap-4">
        <div className={`flex items-center gap-2 ${classes.text.secondary}`}>
          <div className={`p-1.5 sm:p-2 rounded-lg ${classes.icon.container}`}>
            <UserPlus className={theme === 'cs' ? 'text-wire-accent' : 'text-primary'} size={18} />
          </div>
          <div>
            <h1 className={`text-lg sm:text-xl lg:text-2xl font-bold ${classes.text.black}`}>New User</h1>
          </div>
        </div>
      </div>

      <Card variant="default" className="p-6 sm:p-8">
        <div className={`flex items-center gap-3 mb-6 ${classes.text.primary}`}>
          <FileText size={20} />
          <h2 className={`text-lg sm:text-xl font-semibold ${classes.text.black}`}>User information</h2>
        </div>

        <div className="space-y-3 sm:space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-1 ${classes.text.primary}`}>First Name:*</label>
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={`w-full border rounded p-2 sm:p-2.5 text-sm sm:text-base focus:outline-none transition-colors ${classes.bg.tertiary} ${classes.border.default} ${classes.text.primary} ${theme === 'cs' ? 'focus:border-wire-accent' : 'focus:border-primary'}`}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-1 ${classes.text.primary}`}>Last Name:*</label>
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={`w-full border rounded p-2 sm:p-2.5 text-sm sm:text-base focus:outline-none transition-colors ${classes.bg.tertiary} ${classes.border.default} ${classes.text.primary} ${theme === 'cs' ? 'focus:border-wire-accent' : 'focus:border-primary'}`}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-1 ${classes.text.primary}`}>Email:*</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full border rounded p-2 sm:p-2.5 text-sm sm:text-base focus:outline-none transition-colors ${classes.bg.tertiary} ${classes.border.default} ${classes.text.primary} ${theme === 'cs' ? 'focus:border-wire-accent' : 'focus:border-primary'}`}
            />
          </div>

          <div className={`pt-6 border-t flex justify-end ${classes.border.default}`}>
            <Button size="lg" className="min-w-[120px]">Save</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AddUser;