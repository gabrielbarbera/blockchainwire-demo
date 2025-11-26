import { Pencil } from "lucide-react";
import React from "react";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { useTheme } from "../../contexts/ThemeContext";
import { useThemeClasses } from "../../hooks/useThemeClasses";

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
  const classes = useThemeClasses();
  const { theme, colorMode } = useTheme();

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <h1 className={`text-xl sm:text-2xl font-bold ${classes.text.black}`}>
          Switch Account
        </h1>
      </div>

      {primaryAccount && (
        <div className="mb-6">
          <div
            className={`px-4 py-2 rounded-t-lg font-semibold text-sm text-center ${
              theme === "cs"
                ? colorMode === "dark"
                  ? "bg-cs-accent text-black"
                  : "bg-cs-accent text-black"
                : colorMode === "dark"
                ? "bg-primary-dark text-white"
                : "bg-primary text-white"
            }`}
          >
            Main Account
          </div>
          <Card variant="compact" className="rounded-t-none border-t-0">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div
                  className={`w-12 h-12 rounded flex items-center justify-center text-white flex-shrink-0 ${
                    theme === "cs"
                      ? "bg-cs-accent"
                      : colorMode === "dark"
                      ? "bg-primary-dark"
                      : "bg-primary"
                  }`}
                >
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
                  <h2
                    className={`text-base font-bold truncate ${classes.text.black}`}
                  >
                    {primaryAccount.name}
                  </h2>
                  <span
                    className={`font-medium text-sm ${
                      theme === "cs" ? "text-cs-accent" : "text-primary"
                    }`}
                  >
                    Primary
                  </span>
                  <div className={`text-xs mt-1 ${classes.text.secondary}`}>
                    <p className="truncate">
                      Company: {primaryAccount.company}
                    </p>
                    <p>Country: {primaryAccount.country}</p>
                  </div>
                </div>
              </div>
              <button
                className={`flex items-center gap-1.5 h-8 px-3 rounded text-xs font-medium transition-colors border border-transparent flex-shrink-0 ${
                  classes.text.primary
                } ${
                  theme === "cs"
                    ? "hover:text-cs-accent hover:bg-cs-accent/20 hover:border-cs-accent/20"
                    : "hover:text-primary hover:bg-primary-light/30 hover:border-primary-light"
                }`}
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
          <div
            className={`px-4 py-2 rounded-t-lg font-semibold text-sm text-center mb-0 ${
              theme === "cs"
                ? colorMode === "dark"
                  ? "bg-wire-bg-light text-wire-text"
                  : "bg-wire-bg text-wire-text"
                : colorMode === "dark"
                ? "bg-gray-700 text-white"
                : "bg-secondary-dark text-white"
            }`}
          >
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
                    <div
                      className={`w-12 h-12 rounded flex items-center justify-center text-white flex-shrink-0 ${classes.bg.secondary}`}
                    >
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
                      <h2
                        className={`text-base font-bold truncate ${classes.text.black}`}
                      >
                        {account.name}
                      </h2>
                      <span
                        className={`font-medium text-sm ${classes.text.secondary}`}
                      >
                        Secondary
                      </span>
                      <div className={`text-xs mt-1 ${classes.text.secondary}`}>
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
                      className={`p-2 rounded-lg transition-all border border-transparent ${
                        classes.text.secondary
                      } ${
                        theme === "cs"
                          ? "hover:text-cs-accent hover:bg-cs-accent/20 hover:border-cs-accent/20"
                          : "hover:text-primary hover:bg-primary-light hover:border-primary/20"
                      }`}
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
          <p className={classes.text.secondary}>No other accounts linked.</p>
        </Card>
      )}
    </div>
  );
};

export default SwitchAccount;
