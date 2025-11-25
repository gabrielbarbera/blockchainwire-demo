import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Account {
  id: string;
  name: string;
  company: string;
  country: string;
  isPrimary: boolean;
}

interface AccountContextType {
  currentAccount: Account | null;
  accounts: Account[];
  switchAccount: (accountId: string) => void;
  addAccount: (account: Account) => void;
}

const AccountContext = createContext<AccountContextType | undefined>(undefined);

const MOCK_ACCOUNTS: Account[] = [
  {
    id: "1",
    name: "Alex Morgan",
    company: "TechVision Inc",
    country: "United States",
    isPrimary: true,
  },
  {
    id: "2",
    name: "Alex Morgan",
    company: "TechVision Inc",
    country: "United States",
    isPrimary: false,
  },
];

export const AccountProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [accounts, setAccounts] = useState<Account[]>(MOCK_ACCOUNTS);
  const [currentAccountId, setCurrentAccountId] = useState<string>("1");

  const currentAccount = accounts.find(acc => acc.id === currentAccountId) || accounts.find(acc => acc.isPrimary) || null;

  const switchAccount = (accountId: string) => {
    setCurrentAccountId(accountId);
    // In a real app, you'd persist this to localStorage/API
    localStorage.setItem('currentAccountId', accountId);
  };

  const addAccount = (account: Account) => {
    setAccounts(prev => [...prev, account]);
    // If it's a primary account and there's no current account, set it as current
    if (account.isPrimary && !currentAccount) {
      setCurrentAccountId(account.id);
      localStorage.setItem('currentAccountId', account.id);
    }
  };

  // Load current account from localStorage on mount
  React.useEffect(() => {
    const savedAccountId = localStorage.getItem('currentAccountId');
    if (savedAccountId && accounts.find(acc => acc.id === savedAccountId)) {
      setCurrentAccountId(savedAccountId);
    }
  }, []);

  return (
    <AccountContext.Provider value={{ currentAccount, accounts, switchAccount, addAccount }}>
      {children}
    </AccountContext.Provider>
  );
};

export const useAccount = () => {
  const context = useContext(AccountContext);
  if (context === undefined) {
    throw new Error('useAccount must be used within an AccountProvider');
  }
  return context;
};

