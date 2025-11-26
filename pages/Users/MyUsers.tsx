import React, { useState, useMemo } from 'react';
import { MOCK_USERS } from '../../constants';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { useNavigate } from 'react-router-dom';
import { useThemeClasses } from '../../hooks/useThemeClasses';
import { useTheme } from '../../contexts/ThemeContext';
import { List, Pencil, Send, Shield, CheckCircle, XCircle, Clock } from 'lucide-react';
import { UserRole, User as UserType } from '../../types';

const MyUsers: React.FC = () => {
  const navigate = useNavigate();
  const classes = useThemeClasses();
  const { theme, colorMode } = useTheme();
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [selectedRole, setSelectedRole] = useState<string>('all');

  // Filter users based on selected role
  const filteredUsers = useMemo(() => {
    if (selectedRole === 'all') {
      return MOCK_USERS;
    }
    return MOCK_USERS.filter(user => user.role === selectedRole);
  }, [selectedRole]);

  // Split filtered users into primary and secondary
  const primaryUsers = useMemo(() => {
    return filteredUsers.filter(user => user.role === UserRole.ADMIN);
  }, [filteredUsers]);

  const secondaryUsers = useMemo(() => {
    return filteredUsers.filter(user => user.role !== UserRole.ADMIN);
  }, [filteredUsers]);

  const handleSendInvitation = (user: UserType) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleConfirmResend = () => {
    if (selectedUser) {
      setShowModal(false);
      setSelectedUser(null);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return (
          <Badge variant="success" size="sm">
            <CheckCircle size={10} className={colorMode === 'dark' ? 'fill-green-300' : 'fill-green-600'} />
            Active
          </Badge>
        );
      case 'Inactive':
        return (
          <Badge variant="error" size="sm">
            <XCircle size={10} className={colorMode === 'dark' ? 'fill-red-300' : 'fill-red-600'} />
            Inactive
          </Badge>
        );
      case 'Unverified':
        return (
          <Badge variant="warning" size="sm">
            <Clock size={10} className={colorMode === 'dark' ? 'fill-yellow-300' : 'fill-yellow-600'} />
            Unverified
          </Badge>
        );
      default:
        return null;
    }
  };

  const getRoleBadge = (role: UserRole) => {
    if (role === UserRole.ADMIN) {
      return (
        <Badge variant="info" size="sm" className="flex-shrink-0">
          <Shield size={10} />
          Primary
        </Badge>
      );
    }
    return (
      <Badge variant="default" size="sm" className="flex-shrink-0">
        {role}
      </Badge>
    );
  };

  const getAvatarUrl = (id: string) => {
    // Use ID hash to deterministically assign gender
    const hash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return hash % 2 === 0 
      ? 'https://avatar.iran.liara.run/public/boy'
      : 'https://avatar.iran.liara.run/public/girl';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 animate-fade-in">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 sm:mb-8 gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 w-full md:w-auto">
          <div className={`flex items-center gap-2 ${classes.text.secondary}`}>
            <div className={`p-1.5 sm:p-2 rounded-lg ${classes.icon.container}`}>
              <List className={theme === 'cs' ? 'text-wire-accent' : 'text-primary'} size={18} />
            </div>
            <div>
              <h1 className={`text-lg sm:text-xl lg:text-2xl font-bold ${classes.text.black}`}>Users</h1>
              <p className={`text-xs sm:text-sm ${classes.text.secondary}`}>
                {filteredUsers.length} {filteredUsers.length === 1 ? 'user' : 'users'}
                {selectedRole !== 'all' && (
                  <span className="ml-1">(filtered from {MOCK_USERS.length} total)</span>
                )}
              </p>
            </div>
          </div>

          <div className="w-full sm:w-48 lg:w-56">
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className={`w-full border rounded-lg shadow-sm px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium transition-all duration-200 focus:outline-none appearance-none cursor-pointer bg-no-repeat bg-right pr-8 sm:pr-10 ${classes.border.default} ${classes.bg.card} ${classes.text.black} ${theme === 'cs' ? 'focus:border-wire-accent hover:shadow-md' : 'focus:border-primary hover:shadow-md'}`}
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='${colorMode === 'dark' ? (theme === 'cs' ? '%23ffffff' : '%239ca3af') : (theme === 'cs' ? '%23000000' : '%236b7280')}' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'%3E%3C/path%3E%3C/svg%3E")`,
                backgroundPosition: 'right 0.75rem center',
                backgroundSize: '14px 14px'
              }}
            >
              <option value="all">All Roles</option>
              <option value={UserRole.ADMIN}>{UserRole.ADMIN}</option>
              <option value={UserRole.USER}>{UserRole.USER}</option>
              <option value={UserRole.BILLING}>{UserRole.BILLING}</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full md:w-auto">
          <Button 
            variant="outline" 
            className="w-full sm:w-auto text-sm sm:text-base"
          >
            Change Primary Account
          </Button>
          <Button 
            onClick={() => navigate('/users/add')} 
            className="w-full sm:w-auto shadow-md hover:shadow-lg transition-shadow text-sm sm:text-base"
          >
            Add New User
          </Button>
        </div>
      </div>

      {/* Users List */}
      <div>
        {primaryUsers.length === 0 && secondaryUsers.length === 0 ? (
          <Card>
            <div className={`text-center py-8 sm:py-12 ${classes.text.secondary}`}>
              <p className="text-sm sm:text-base font-medium mb-2">No users found</p>
              <p className="text-xs sm:text-sm">Try adjusting your filter to see more results.</p>
            </div>
          </Card>
        ) : (
          <>
            {/* Primary Users Section */}
            {primaryUsers.length > 0 && (
                <div className="mb-4">
                  <div className={`px-4 py-2 rounded-t-lg font-semibold text-sm text-center ${
                    theme === 'cs'
                      ? colorMode === 'dark' ? 'bg-wire-accent/80 text-black' : 'bg-wire-accent/80 text-black'
                      : colorMode === 'dark' ? 'bg-primary-dark/80 text-white' : 'bg-primary/80 text-white'
                  }`}>
                    Primary Account
                  </div>
                  <div className="space-y-2">
                    {primaryUsers.map((user, index) => (
                      <Card
                        key={user.id}
                        variant="compact"
                        hover
                        className={`rounded-t-none border-t-0 ${
                          index === primaryUsers.length - 1 ? 'rounded-b-lg' : 'rounded-b-none border-b-0'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <img 
                              src={getAvatarUrl(user.id)} 
                              alt={user.name}
                              className="w-12 h-12 rounded-full flex-shrink-0 object-cover"
                            />
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className={`text-lg font-bold truncate ${classes.text.black}`}>
                                  {user.name}
                                </h3>
                                {getRoleBadge(user.role)}
                              </div>
                              <p className={`text-sm truncate mb-0.5 ${classes.text.primary}`}>
                                {user.email}
                              </p>
                              {getStatusBadge(user.status)}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <button 
                              onClick={() => navigate('/settings')}
                              className={`p-2 rounded-lg transition-all border border-transparent ${classes.text.secondary} ${theme === 'cs' ? 'hover:text-wire-accent hover:bg-wire-accent/20 hover:border-wire-accent/20' : 'hover:text-primary hover:bg-primary-light hover:border-primary/20'}`}
                              title="Edit user"
                              aria-label="Edit user"
                            >
                              <Pencil size={18} />
                            </button>
                            <button 
                              onClick={() => handleSendInvitation(user)}
                              className={`p-2 rounded-lg transition-all border border-transparent ${classes.text.secondary} ${theme === 'cs' ? 'hover:text-wire-accent hover:bg-wire-accent/20 hover:border-wire-accent/20' : 'hover:text-primary hover:bg-primary-light hover:border-primary/20'}`}
                              title="Send invitation"
                              aria-label="Send invitation"
                            >
                              <Send size={18} />
                            </button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Secondary Users Section */}
              {secondaryUsers.length > 0 && (
                <div>
                  <div className={`px-4 py-2 rounded-t-lg font-semibold text-sm text-center mb-0 ${
                    theme === 'cs'
                      ? colorMode === 'dark' ? 'bg-wire-bg-light text-wire-text' : 'bg-wire-bg text-wire-text'
                      : colorMode === 'dark' ? 'bg-gray-700 text-white' : 'bg-secondary-dark text-white'
                  }`}>
                    Secondary Users
                  </div>
                  <div className="space-y-2">
                    {secondaryUsers.map((user, index) => (
                      <Card
                        key={user.id}
                        variant="compact"
                        hover
                        className={`rounded-t-none border-t-0 ${
                          index === secondaryUsers.length - 1 ? 'rounded-b-lg' : 'rounded-b-none border-b-0'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <img 
                              src={getAvatarUrl(user.id)} 
                              alt={user.name}
                              className="w-12 h-12 rounded-full flex-shrink-0 object-cover"
                            />
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className={`text-base font-bold truncate ${classes.text.black}`}>
                                  {user.name}
                                </h3>
                                {getRoleBadge(user.role)}
                              </div>
                              <p className={`text-sm truncate mb-0.5 ${classes.text.primary}`}>
                                {user.email}
                              </p>
                              {getStatusBadge(user.status)}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <button 
                              onClick={() => navigate('/settings')}
                              className={`p-2 rounded-lg transition-all border border-transparent ${classes.text.secondary} ${theme === 'cs' ? 'hover:text-wire-accent hover:bg-wire-accent/20 hover:border-wire-accent/20' : 'hover:text-primary hover:bg-primary-light hover:border-primary/20'}`}
                              title="Edit user"
                              aria-label="Edit user"
                            >
                              <Pencil size={18} />
                            </button>
                            <button 
                              onClick={() => handleSendInvitation(user)}
                              className={`p-2 rounded-lg transition-all border border-transparent ${classes.text.secondary} ${theme === 'cs' ? 'hover:text-wire-accent hover:bg-wire-accent/20 hover:border-wire-accent/20' : 'hover:text-primary hover:bg-primary-light hover:border-primary/20'}`}
                              title="Send invitation"
                              aria-label="Send invitation"
                            >
                              <Send size={18} />
                            </button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
          </>
        )}
      </div>

      {/* Email Verification Resend Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 sm:p-6">
          <div className={`${classes.bg.card} rounded-lg shadow-xl max-w-md w-full animate-fade-in max-h-[90vh] overflow-y-auto`}>
            <div className="p-6 sm:p-8 text-center">
              {/* Info Icon */}
              <div className={`w-16 h-16 sm:w-20 sm:h-20 ${classes.icon.container} rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6`}>
                <div className={`w-12 h-12 sm:w-14 sm:h-14 ${theme === 'cs' ? 'bg-wire-accent' : colorMode === 'dark' ? 'bg-primary-dark' : 'bg-primary'} rounded-full flex items-center justify-center`}>
                  <span className={`text-2xl sm:text-3xl font-normal leading-none ${theme === 'cs' ? 'text-black' : 'text-white'}`}>i</span>
                </div>
              </div>
              
              {/* Modal Text */}
              <div className="space-y-2 mb-6 sm:mb-8">
                <p className={`text-sm sm:text-base font-medium ${classes.text.black}`}>
                  You are about to resend an email verification link.
                </p>
                <p className={`text-sm sm:text-base font-medium ${classes.text.black}`}>
                  This will cancel the previous email verification notice.
                </p>
                <p className={`text-sm sm:text-base font-medium ${classes.text.black}`}>
                  Would you like to proceed with this action?
                </p>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Button 
                  onClick={handleConfirmResend}
                  size="lg"
                  className="w-full sm:w-auto min-w-[120px] text-sm sm:text-base"
                >
                  Yes
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                  onClick={handleCloseModal}
                  className="w-full sm:w-auto min-w-[120px] text-sm sm:text-base"
                >
                  No
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyUsers;