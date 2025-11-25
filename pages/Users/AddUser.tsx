import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { UserPlus, FileText } from 'lucide-react';

const AddUser: React.FC = () => {
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
    <div className="max-w-5xl mx-auto pb-20 animate-fade-in">
      {/* Header Section */}
      <div className="flex items-center gap-2 text-secondary-dark mb-8">
        <div className="p-2 bg-primary-light rounded-lg">
          <UserPlus className="text-primary" size={20} />
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-secondary-black">New User</h1>
        </div>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-sm border border-secondary-light">
        <div className="flex items-center gap-2 mb-6">
          <FileText className="text-secondary-dark" size={20} />
          <h2 className="text-lg font-bold text-secondary-black">User information</h2>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-secondary-medium mb-1">First Name:*</label>
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full bg-secondary-light/30 border border-secondary-light rounded p-2 text-secondary-black focus:border-primary focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-medium mb-1">Last Name:*</label>
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full bg-secondary-light/30 border border-secondary-light rounded p-2 text-secondary-black focus:border-primary focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-medium mb-1">Email:*</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-secondary-light/30 border border-secondary-light rounded p-2 text-secondary-black focus:border-primary focus:outline-none transition-colors"
            />
          </div>

          <div className="pt-6 border-t border-secondary-light flex justify-end">
            <Button size="lg" className="min-w-[120px]">Save</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUser;