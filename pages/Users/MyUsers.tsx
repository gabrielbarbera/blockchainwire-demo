import React, { useState } from 'react';
import { MOCK_USERS } from '../../constants';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { useNavigate } from 'react-router-dom';
import { List, ChevronDown, Pencil, Send, Shield, CheckCircle, XCircle, Clock } from 'lucide-react';
import { UserRole, User as UserType } from '../../types';

const MyUsers: React.FC = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);

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
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
            <CheckCircle size={10} className="fill-green-600" />
            Active
          </span>
        );
      case 'Inactive':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-200">
            <XCircle size={10} className="fill-red-600" />
            Inactive
          </span>
        );
      case 'Unverified':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-50 text-yellow-700 border border-yellow-200">
            <Clock size={10} className="fill-yellow-600" />
            Unverified
          </span>
        );
      default:
        return null;
    }
  };

  const getRoleBadge = (role: UserRole) => {
    if (role === UserRole.ADMIN) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-primary text-white flex-shrink-0">
          <Shield size={10} />
          Primary
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-secondary-light text-secondary-dark border border-secondary-light flex-shrink-0">
        {role}
      </span>
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
          <div className="flex items-center gap-2 text-secondary-dark">
            <div className="p-1.5 sm:p-2 bg-primary-light rounded-lg">
              <List className="text-primary" size={18} />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-secondary-black">Users</h1>
              <p className="text-xs sm:text-sm text-secondary-medium">{MOCK_USERS.length} total users</p>
            </div>
          </div>

          <div className="w-full sm:w-48 lg:w-56">
            <div className="bg-white rounded-lg border-2 border-secondary-light shadow-sm cursor-pointer hover:border-primary transition-colors group">
              <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-2.5">
                <span className="text-secondary-black text-xs sm:text-sm font-medium truncate">All Roles</span>
                <ChevronDown size={14} className="sm:w-4 sm:h-4 text-secondary-medium group-hover:text-primary transition-colors flex-shrink-0"/>
              </div>
            </div>
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
        {(() => {
          const primaryUsers = MOCK_USERS.filter(user => user.role === UserRole.ADMIN);
          const secondaryUsers = MOCK_USERS.filter(user => user.role !== UserRole.ADMIN);

          return (
            <>
              {/* Primary Users Section */}
              {primaryUsers.length > 0 && (
                <div className="mb-4">
                  <div className="bg-primary/80 text-white px-4 py-2 rounded-t-lg font-semibold text-sm text-center">
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
                                <h3 className="text-lg font-bold text-secondary-black truncate">
                                  {user.name}
                                </h3>
                                {getRoleBadge(user.role)}
                              </div>
                              <p className="text-sm text-secondary-dark truncate mb-0.5">
                                {user.email}
                              </p>
                              {getStatusBadge(user.status)}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <button 
                              onClick={() => navigate('/settings')}
                              className="p-2 rounded-lg text-secondary-medium hover:text-primary hover:bg-primary-light transition-all border border-transparent hover:border-primary/20"
                              title="Edit user"
                              aria-label="Edit user"
                            >
                              <Pencil size={18} />
                            </button>
                            <button 
                              onClick={() => handleSendInvitation(user)}
                              className="p-2 rounded-lg text-secondary-medium hover:text-primary hover:bg-primary-light transition-all border border-transparent hover:border-primary/20"
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
                  <div className="bg-secondary-dark text-white px-4 py-2 rounded-t-lg font-semibold text-sm text-center mb-0">
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
                                <h3 className="text-base font-bold text-secondary-black truncate">
                                  {user.name}
                                </h3>
                                {getRoleBadge(user.role)}
                              </div>
                              <p className="text-sm text-secondary-dark truncate mb-0.5">
                                {user.email}
                              </p>
                              {getStatusBadge(user.status)}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <button 
                              onClick={() => navigate('/settings')}
                              className="p-2 rounded-lg text-secondary-medium hover:text-primary hover:bg-primary-light transition-all border border-transparent hover:border-primary/20"
                              title="Edit user"
                              aria-label="Edit user"
                            >
                              <Pencil size={18} />
                            </button>
                            <button 
                              onClick={() => handleSendInvitation(user)}
                              className="p-2 rounded-lg text-secondary-medium hover:text-primary hover:bg-primary-light transition-all border border-transparent hover:border-primary/20"
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
          );
        })()}
      </div>

      {/* Email Verification Resend Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 sm:p-6">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full animate-fade-in max-h-[90vh] overflow-y-auto">
            <div className="p-6 sm:p-8 text-center">
              {/* Info Icon */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl sm:text-3xl font-normal leading-none">i</span>
                </div>
              </div>
              
              {/* Modal Text */}
              <div className="space-y-2 mb-6 sm:mb-8">
                <p className="text-sm sm:text-base text-secondary-black font-medium">
                  You are about to resend an email verification link.
                </p>
                <p className="text-sm sm:text-base text-secondary-black font-medium">
                  This will cancel the previous email verification notice.
                </p>
                <p className="text-sm sm:text-base text-secondary-black font-medium">
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