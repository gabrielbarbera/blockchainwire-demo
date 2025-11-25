import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { useAccount } from '../../contexts/AccountContext';
import { useNavigate } from 'react-router-dom';
import { UserCircle, Plus, Pencil, Shield, CheckCircle } from 'lucide-react';

const Accounts: React.FC = () => {
  const { currentAccount, accounts, switchAccount } = useAccount();
  const navigate = useNavigate();
  const [showSwitchConfirm, setShowSwitchConfirm] = useState<string | null>(null);

  const primaryAccount = accounts.find(acc => acc.isPrimary);
  const secondaryAccounts = accounts.filter(acc => !acc.isPrimary);

  const handleSwitchAccount = (accountId: string) => {
    if (accountId === currentAccount?.id) return;
    setShowSwitchConfirm(accountId);
  };

  const confirmSwitch = () => {
    if (showSwitchConfirm) {
      switchAccount(showSwitchConfirm);
      setShowSwitchConfirm(null);
      // Show success notification (you can add a toast here)
    }
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
        <div className="flex items-center gap-2 text-secondary-dark">
          <div className="p-1.5 sm:p-2 bg-primary-light rounded-lg">
            <UserCircle className="text-primary" size={18} />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-secondary-black">Accounts</h1>
            <p className="text-xs sm:text-sm text-secondary-medium">{accounts.length} total accounts</p>
          </div>
        </div>

        <Button 
          onClick={() => navigate('/register')}
          className="w-full sm:w-auto shadow-md hover:shadow-lg transition-shadow text-sm sm:text-base"
        >
          <Plus size={14} className="mr-2" />
          Add New Account
        </Button>
      </div>

      {/* Current Account Section */}
      {currentAccount && (
        <div className="mb-6">
          <div className="bg-gradient-to-r from-primary to-primary-hover text-white px-4 py-2 rounded-t-lg font-semibold text-sm flex items-center justify-center gap-2">
            <CheckCircle size={14} />
            Currently Active Account
          </div>
          <Card variant="compact" className="rounded-t-none border-t-0 shadow-md">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <img 
                  src={getAvatarUrl(currentAccount.id)} 
                  alt={currentAccount.name}
                  className="w-12 h-12 rounded-full flex-shrink-0 object-cover"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-lg font-bold text-secondary-black truncate">
                      {currentAccount.name}
                    </h2>
                    {currentAccount.isPrimary && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-primary text-white flex-shrink-0">
                        <Shield size={10} />
                        Primary
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-secondary-dark truncate">{currentAccount.company}</p>
                  <p className="text-xs text-secondary-medium">{currentAccount.country}</p>
                </div>
              </div>
              <button
                onClick={() => navigate('/settings')}
                className="p-2 rounded-lg text-secondary-medium hover:text-primary hover:bg-primary-light transition-all border border-transparent hover:border-primary/20 flex-shrink-0"
                title="Edit account"
                aria-label="Edit account"
              >
                <Pencil size={18} />
              </button>
            </div>
          </Card>
        </div>
      )}

      {/* Primary Account Section */}
      {primaryAccount && primaryAccount.id !== currentAccount?.id && (
        <div className="mb-4">
          <div className="bg-primary/80 text-white px-4 py-2 rounded-t-lg font-semibold text-sm text-center flex items-center justify-center gap-2">
            <Shield size={14} />
            Primary Account
          </div>
          <Card variant="compact" className="rounded-t-none border-t-0">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <img 
                  src={getAvatarUrl(primaryAccount.id)} 
                  alt={primaryAccount.name}
                  className="w-12 h-12 rounded-full flex-shrink-0 object-cover"
                />
                <div className="min-w-0 flex-1">
                  <h3 className="text-base font-bold text-secondary-black mb-0.5 truncate">
                    {primaryAccount.name}
                  </h3>
                  <p className="text-sm text-secondary-dark truncate">{primaryAccount.company}</p>
                  <p className="text-xs text-secondary-medium">{primaryAccount.country}</p>
                </div>
              </div>
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleSwitchAccount(primaryAccount.id)}
                disabled={primaryAccount.id === currentAccount?.id}
                className="flex-shrink-0"
              >
                Switch
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Secondary Accounts Section */}
      {secondaryAccounts.length > 0 && (
        <div>
          <div className="bg-secondary-dark text-white px-4 py-2 rounded-t-lg font-semibold text-sm text-center mb-0">
            Secondary Accounts
          </div>
          <div className="space-y-2">
            {secondaryAccounts.map((account, index) => (
              <Card
                key={account.id}
                variant="compact"
                hover
                className={`rounded-t-none border-t-0 ${
                  index === secondaryAccounts.length - 1 ? 'rounded-b-lg' : 'rounded-b-none border-b-0'
                } ${
                  account.id === currentAccount?.id ? 'ring-2 ring-primary' : ''
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <img 
                      src={getAvatarUrl(account.id)} 
                      alt={account.name}
                      className="w-12 h-12 rounded-full flex-shrink-0 object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base font-bold text-secondary-black mb-0.5 truncate">
                        {account.name}
                      </h3>
                      <p className="text-sm text-secondary-dark truncate">{account.company}</p>
                      <p className="text-xs text-secondary-medium">{account.country}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleSwitchAccount(account.id)}
                      disabled={account.id === currentAccount?.id}
                    >
                      {account.id === currentAccount?.id ? 'Current' : 'Switch'}
                    </Button>
                    <button
                      onClick={() => navigate('/settings')}
                      className="p-2 rounded-lg text-secondary-medium hover:text-primary hover:bg-primary-light transition-all border border-transparent hover:border-primary/20"
                      title={`Edit ${account.name} account`}
                      aria-label={`Edit ${account.name} account`}
                    >
                      <Pencil size={18} />
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Empty State - Only show if no accounts at all */}
      {accounts.length === 0 && (
        <Card className="text-center py-12">
          <UserCircle size={48} className="mx-auto mb-4 text-secondary-medium" />
          <h3 className="text-lg font-bold text-secondary-black mb-2">No Accounts</h3>
          <p className="text-secondary-medium mb-6">Get started by adding your first account.</p>
          <Button onClick={() => navigate('/register')}>
            <Plus size={16} className="mr-2" />
            Add New Account
          </Button>
        </Card>
      )}

      {/* Switch Confirmation Modal */}
      {showSwitchConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 sm:p-6">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full animate-fade-in max-h-[90vh] overflow-y-auto">
            <div className="p-6 sm:p-8 text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl sm:text-3xl font-normal leading-none">i</span>
                </div>
              </div>
              
              <div className="space-y-2 mb-6 sm:mb-8">
                <p className="text-sm sm:text-base text-secondary-black font-medium">
                  You are about to switch to a different account.
                </p>
                <p className="text-sm sm:text-base text-secondary-black font-medium">
                  This will change your current workspace and may affect your active sessions.
                </p>
                <p className="text-sm sm:text-base text-secondary-black font-medium">
                  Would you like to proceed with this action?
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Button 
                  onClick={confirmSwitch}
                  size="lg"
                  className="w-full sm:w-auto min-w-[120px] text-sm sm:text-base"
                >
                  Yes
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                  onClick={() => setShowSwitchConfirm(null)}
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

export default Accounts;

