import { Pencil } from "lucide-react";
import React from "react";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";

interface Account {
  id: string;
  name: string;
  company: string;
  country: string;
  isPrimary: boolean;
}

const ACCOUNTS: Account[] = [
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

const SwitchAccount: React.FC = () => {
  const primaryAccount = ACCOUNTS.find((acc) => acc.isPrimary);
  const secondaryAccounts = ACCOUNTS.filter((acc) => !acc.isPrimary);

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-secondary-black">
          Switch Account
        </h1>
      </div>

      {primaryAccount && (
        <div className="mb-6">
          <div className="bg-primary text-white px-4 py-2 rounded-t-lg font-semibold text-sm text-center">
            Main Account
          </div>
          <Card variant="compact" className="rounded-t-none border-t-0">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-12 h-12 bg-primary rounded flex items-center justify-center text-white flex-shrink-0">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-base font-bold text-secondary-black truncate">
                    {primaryAccount.name}
                  </h2>
                  <span className="text-primary font-medium text-sm">
                    Primary
                  </span>
                  <div className="text-xs text-secondary-medium mt-1">
                    <p className="truncate">
                      Company: {primaryAccount.company}
                    </p>
                    <p>Country: {primaryAccount.country}</p>
                  </div>
                </div>
              </div>
              <button
                className="flex items-center gap-1.5 h-8 px-3 rounded text-xs font-medium text-secondary-dark hover:text-primary hover:bg-primary-light/30 transition-colors border border-transparent hover:border-primary-light flex-shrink-0"
                aria-label="Edit account"
              >
                <Pencil size={14} />
                <span>Edit</span>
              </button>
            </div>
          </Card>
        </div>
      )}

      {secondaryAccounts.length > 0 ? (
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
                  index === secondaryAccounts.length - 1
                    ? "rounded-b-lg"
                    : "rounded-b-none border-b-0"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-12 h-12 bg-secondary-medium rounded flex items-center justify-center text-white flex-shrink-0">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h2 className="text-base font-bold text-secondary-black truncate">
                        {account.name}
                      </h2>
                      <span className="text-secondary-medium font-medium text-sm">
                        Secondary
                      </span>
                      <div className="text-xs text-secondary-medium mt-1">
                        <p className="truncate">Company: {account.company}</p>
                        <p>Country: {account.country}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Button variant="primary" size="sm">
                      Switch
                    </Button>
                    <button
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
      ) : (
        <Card className="text-center py-10">
          <p className="text-secondary-medium">No other accounts linked.</p>
        </Card>
      )}
    </div>
  );
};

export default SwitchAccount;
