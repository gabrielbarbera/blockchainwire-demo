import {
  ChevronDown,
  ChevronRight,
  FileText,
  List,
  LogOut,
  Moon,
  Palette,
  Plus,
  Settings,
  Shield,
  Sun,
  Tag,
  UserCircle,
  Users,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAccount } from "../contexts/AccountContext";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen = true, onClose }) => {
  const location = useLocation();
  const { currentAccount } = useAccount();
  const { logout } = useAuth();
  const { theme, colorMode, setTheme, toggleColorMode } = useTheme();
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({
    "press-releases": true,
    theme: false,
  });

  const toggleMenu = (key: string) => {
    setOpenMenus((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleLogout = () => {
    logout();
    window.location.href = "/#/login";
  };

  const isActive = (path: string) => location.pathname === path;

  const hasActiveChild = (paths: string[]) => {
    return paths.some((path) => isActive(path));
  };

  useEffect(() => {
    const path = location.pathname;
    if (path.startsWith("/releases")) {
      setOpenMenus((prev) => ({ ...prev, "press-releases": true }));
    }
  }, [location.pathname]);

  return (
    <>
      <div
        className={`
        fixed lg:sticky top-[64px] left-0 z-50
        w-64 flex flex-col overflow-y-auto 
        h-[calc(100vh-64px)]
        transform transition-all duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
        ${
          theme === "cs"
            ? "bg-wire-bg-light-mode border-r border-gray-300 dark:bg-wire-bg-dark dark:border-wire-bg"
            : "bg-gray-50 dark:bg-gray-900 border-r border-gray-300 dark:border-gray-700"
        }
      `}
      >
        <div
          className={`p-6 border-b ${
            theme === "cs"
              ? "border-gray-300 dark:border-wire-bg"
              : "border-gray-300 dark:border-gray-700"
          }`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className={`w-10 h-10 rounded flex items-center justify-center text-white font-bold text-xl flex-shrink-0 ${
                theme === "cs"
                  ? "bg-wire-accent"
                  : "bg-primary dark:bg-primary-dark"
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
              <h1
                className={`font-bold text-sm truncate ${
                  theme === "cs"
                    ? "text-gray-900 dark:text-wire-text"
                    : "text-secondary-dark dark:text-gray-100"
                }`}
              >
                {currentAccount?.company || "TechVision Inc"}
              </h1>
              <p
                className={`text-xs truncate font-medium ${
                  theme === "cs"
                    ? "text-wire-accent dark:text-wire-accent"
                    : "text-primary dark:text-primary-dark"
                }`}
              >
                {currentAccount?.name || "Alex Morgan"}
              </p>
            </div>
          </div>
          {currentAccount && (
            <div
              className={`flex items-center gap-2 px-2 py-1.5 rounded-lg ${
                theme === "cs"
                  ? "bg-wire-accent/20"
                  : "bg-primary-light/30 dark:bg-primary-dark/20"
              }`}
            >
              {currentAccount.isPrimary && (
                <Shield
                  size={12}
                  className={`flex-shrink-0 ${
                    theme === "cs"
                      ? "text-wire-accent"
                      : "text-primary dark:text-primary-dark"
                  }`}
                />
              )}
              <span
                className={`text-xs font-medium truncate ${
                  theme === "cs"
                    ? "text-wire-accent"
                    : "text-primary dark:text-primary-dark"
                }`}
              >
                {currentAccount.isPrimary
                  ? "Primary Account"
                  : "Secondary Account"}
              </span>
            </div>
          )}
        </div>

        <nav className="flex-1 px-4 pt-4 space-y-2 text-sm">
          <div>
            <button
              onClick={() => toggleMenu("press-releases")}
              className={`w-full flex items-center justify-between p-2 rounded transition-colors ${
                hasActiveChild(["/releases/add", "/releases"])
                  ? theme === "cs"
                    ? "text-wire-accent font-semibold bg-wire-accent/20 dark:bg-wire-accent/10"
                    : "text-primary dark:text-primary-dark font-semibold bg-primary-light/30 dark:bg-primary-dark/20"
                  : theme === "cs"
                  ? "text-gray-900 hover:text-wire-accent hover:bg-gray-100 font-medium dark:text-wire-text dark:hover:text-wire-accent"
                  : "text-secondary-dark dark:text-gray-300 hover:text-primary dark:hover:text-primary-dark font-medium"
              }`}
            >
              <div className="flex items-center gap-2">
                <FileText size={18} />
                <span>Press Releases</span>
              </div>
              {openMenus["press-releases"] ? (
                <ChevronDown size={14} />
              ) : (
                <ChevronRight size={14} />
              )}
            </button>

            {openMenus["press-releases"] && (
              <div className="ml-7 mt-1 space-y-1">
                <NavLink
                  to="/releases/add"
                  onClick={onClose}
                  className={`block p-2 rounded relative ${
                    isActive("/releases/add")
                      ? theme === "cs"
                        ? "bg-wire-accent/20 text-wire-accent font-medium border-l-4 border-wire-accent dark:bg-wire-accent/10"
                        : "bg-primary-light text-primary font-medium border-l-4 border-primary dark:bg-primary-dark/20 dark:text-primary-dark"
                      : theme === "cs"
                      ? "text-gray-800 hover:bg-gray-100 dark:text-wire-text-secondary dark:hover:bg-wire-bg"
                      : "text-secondary-medium dark:text-gray-400 hover:bg-secondary-light dark:hover:bg-gray-800"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Plus size={14} /> Add New
                  </div>
                </NavLink>
                <NavLink
                  to="/releases"
                  onClick={onClose}
                  className={`block p-2 rounded relative ${
                    isActive("/releases")
                      ? theme === "cs"
                        ? "bg-wire-accent/20 text-wire-accent font-medium border-l-4 border-wire-accent dark:bg-wire-accent/10"
                        : "bg-primary-light text-primary font-medium border-l-4 border-primary dark:bg-primary-dark/20 dark:text-primary-dark"
                      : theme === "cs"
                      ? "text-gray-800 hover:bg-gray-100 dark:text-wire-text-secondary dark:hover:bg-wire-bg"
                      : "text-secondary-medium dark:text-gray-400 hover:bg-secondary-light dark:hover:bg-gray-800"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <List size={14} /> List of Releases
                  </div>
                </NavLink>
              </div>
            )}
          </div>

          <NavLink
            to="/account"
            onClick={onClose}
            className={`block p-2 rounded relative ${
              isActive("/account") || isActive("/account/add")
                ? theme === "cs"
                  ? "bg-wire-accent/20 text-wire-accent font-medium border-l-4 border-wire-accent dark:bg-wire-accent/10"
                  : "bg-primary-light text-primary font-medium border-l-4 border-primary dark:bg-primary-dark/20 dark:text-primary-dark"
                : theme === "cs"
                ? "text-gray-900 hover:bg-gray-100 dark:text-wire-text dark:hover:bg-wire-bg"
                : "text-secondary-dark dark:text-gray-300 hover:bg-secondary-light dark:hover:bg-gray-800"
            }`}
          >
            <div className="flex items-center gap-2">
              <UserCircle size={18} />
              <span>Account</span>
            </div>
          </NavLink>

          <NavLink
            to="/users"
            onClick={onClose}
            className={`block p-2 rounded relative ${
              isActive("/users") || isActive("/users/add")
                ? theme === "cs"
                  ? "bg-wire-accent/20 text-wire-accent font-medium border-l-4 border-wire-accent dark:bg-wire-accent/10"
                  : "bg-primary-light text-primary font-medium border-l-4 border-primary dark:bg-primary-dark/20 dark:text-primary-dark"
                : theme === "cs"
                ? "text-gray-900 hover:bg-gray-100 dark:text-wire-text dark:hover:bg-wire-bg"
                : "text-secondary-dark dark:text-gray-300 hover:bg-secondary-light dark:hover:bg-gray-800"
            }`}
          >
            <div className="flex items-center gap-2">
              <Users size={18} />
              <span>Users</span>
            </div>
          </NavLink>

          <NavLink
            to="/promos"
            onClick={onClose}
            className={`block p-2 rounded relative ${
              isActive("/promos")
                ? theme === "cs"
                  ? "bg-wire-accent/20 text-wire-accent font-medium border-l-4 border-wire-accent dark:bg-wire-accent/10"
                  : "bg-primary-light text-primary font-medium border-l-4 border-primary dark:bg-primary-dark/20 dark:text-primary-dark"
                : theme === "cs"
                ? "text-gray-900 hover:bg-gray-100 dark:text-wire-text dark:hover:bg-wire-bg"
                : "text-secondary-dark dark:text-gray-300 hover:bg-secondary-light dark:hover:bg-gray-800"
            }`}
          >
            <div className="flex items-center gap-2">
              <Tag size={18} />
              <span>Promo Codes</span>
            </div>
          </NavLink>

          <NavLink
            to="/settings"
            onClick={onClose}
            className={`block p-2 rounded relative ${
              isActive("/settings")
                ? theme === "cs"
                  ? "bg-wire-accent/20 text-wire-accent font-medium border-l-4 border-wire-accent dark:bg-wire-accent/10"
                  : "bg-primary-light text-primary font-medium border-l-4 border-primary dark:bg-primary-dark/20 dark:text-primary-dark"
                : theme === "cs"
                ? "text-gray-900 hover:bg-gray-100 dark:text-wire-text dark:hover:bg-wire-bg"
                : "text-secondary-dark dark:text-gray-300 hover:bg-secondary-light dark:hover:bg-gray-800"
            }`}
          >
            <div className="flex items-center gap-2">
              <Settings size={18} />
              <span>Account Settings</span>
            </div>
          </NavLink>

          {/* Theme Section */}
          <div className="mt-4">
            <button
              onClick={() => toggleMenu("theme")}
              className={`w-full flex items-center justify-between p-2 rounded transition-colors ${
                theme === "cs"
                  ? "text-gray-900 hover:bg-gray-100 dark:text-wire-text dark:hover:bg-wire-bg"
                  : "text-secondary-dark dark:text-gray-300 hover:text-primary dark:hover:text-primary-dark font-medium"
              }`}
            >
              <div className="flex items-center gap-2">
                <Palette size={18} />
                <span>Theme</span>
              </div>
              {openMenus["theme"] ? (
                <ChevronDown size={14} />
              ) : (
                <ChevronRight size={14} />
              )}
            </button>

            {openMenus["theme"] && (
              <div className="ml-7 mt-1 space-y-2">
                {/* Theme Selector */}
                <div className="space-y-1">
                  <label
                    className={`text-xs font-medium ${
                      theme === "cs"
                        ? "text-gray-700 dark:text-wire-text-secondary"
                        : "text-secondary-medium dark:text-gray-400"
                    }`}
                  >
                    Color Theme
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setTheme("bw")}
                      className={`flex-1 px-3 py-2 rounded text-xs font-medium transition-colors ${
                        theme === "bw"
                          ? "bg-primary text-white dark:bg-primary-dark"
                          : theme === "cs"
                          ? "bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-wire-bg dark:text-wire-text-secondary dark:hover:bg-wire-bg-light"
                          : "bg-secondary-light text-secondary-dark hover:bg-secondary-medium/20 dark:bg-gray-800 dark:text-gray-300"
                      }`}
                    >
                      BW
                    </button>
                    <button
                      onClick={() => setTheme("cs")}
                      className={`flex-1 px-3 py-2 rounded text-xs font-medium transition-colors ${
                        theme === "cs"
                          ? "bg-wire-accent text-black font-semibold"
                          : "bg-secondary-light text-secondary-dark hover:bg-secondary-medium/20 dark:bg-gray-800 dark:text-gray-300"
                      }`}
                    >
                      CS
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Dark/Light Mode Toggle - Separate Menu Item */}
          <div           className={`mt-4 border-t pt-4 ${
            theme === "cs"
              ? "border-gray-300 dark:border-wire-bg"
              : "border-gray-300 dark:border-gray-700"
          }`}>
            <div className="flex items-center justify-between p-2">
              <div className="flex items-center gap-2">
                {colorMode === "dark" ? (
                  <Moon size={18} className={
                    theme === "cs"
                      ? "text-gray-700 dark:text-wire-text"
                      : "text-secondary-medium dark:text-gray-300"
                  } />
                ) : (
                  <Sun size={18} className={
                    theme === "cs"
                      ? "text-gray-700 dark:text-wire-text"
                      : "text-secondary-medium dark:text-gray-300"
                  } />
                )}
                <span className={`text-sm font-medium ${
                  theme === "cs"
                    ? "text-gray-900 dark:text-wire-text"
                    : "text-secondary-dark dark:text-gray-300"
                }`}>
                  {colorMode === "dark" ? "Dark Mode" : "Light Mode"}
                </span>
              </div>
              <button
                onClick={toggleColorMode}
                type="button"
                role="switch"
                aria-checked={colorMode === "dark"}
                aria-label={`Switch to ${colorMode === "dark" ? "light" : "dark"} mode`}
                className={`relative inline-flex h-8 w-16 items-center rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  theme === "cs"
                    ? colorMode === "dark"
                      ? "bg-wire-accent focus:ring-wire-accent shadow-md"
                      : "bg-gray-300 focus:ring-wire-accent shadow-sm"
                    : colorMode === "dark"
                    ? "bg-primary-dark focus:ring-primary-dark shadow-md"
                    : "bg-gray-300 focus:ring-primary shadow-sm"
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-lg transition-all duration-300 ease-in-out flex items-center justify-center ${
                    colorMode === "dark" ? "translate-x-9" : "translate-x-1"
                  }`}
                >
                  {colorMode === "dark" ? (
                    <Moon size={14} className="text-gray-800" />
                  ) : (
                    <Sun size={14} className="text-yellow-500" />
                  )}
                </span>
              </button>
            </div>
          </div>
        </nav>

        <div
          className={`p-4 border-t ${
            theme === "cs"
              ? "border-gray-300 dark:border-wire-bg"
              : "border-gray-300 dark:border-gray-700"
          }`}
        >
          <button
            onClick={handleLogout}
            className={`flex items-center gap-2 text-sm font-medium w-full p-2 transition-colors ${
              theme === "cs"
                ? "text-gray-800 hover:text-red-600 dark:text-wire-text dark:hover:text-red-400"
                : "text-secondary-medium dark:text-gray-400 hover:text-red-500"
            }`}
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
