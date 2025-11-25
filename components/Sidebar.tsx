import {
  ChevronDown,
  ChevronRight,
  FileText,
  List,
  LogOut,
  Plus,
  Settings,
  Shield,
  Tag,
  UserCircle,
  Users,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAccount } from "../contexts/AccountContext";
import { useAuth } from "../contexts/AuthContext";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen = true, onClose }) => {
  const location = useLocation();
  const { currentAccount } = useAccount();
  const { logout } = useAuth();
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({
    "press-releases": true,
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
        w-64 bg-white border-r border-secondary-light 
        flex flex-col overflow-y-auto 
        h-[calc(100vh-64px)]
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
      `}
      >
        <div className="p-6 border-b border-secondary-light">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-primary rounded flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
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
              <h1 className="font-bold text-secondary-dark text-sm truncate">
                {currentAccount?.company || "TechVision Inc"}
              </h1>
              <p className="text-xs text-primary truncate">
                {currentAccount?.name || "Alex Morgan"}
              </p>
            </div>
          </div>
          {currentAccount && (
            <div className="flex items-center gap-2 px-2 py-1.5 bg-primary-light/30 rounded-lg">
              {currentAccount.isPrimary && (
                <Shield size={12} className="text-primary flex-shrink-0" />
              )}
              <span className="text-xs font-medium text-primary truncate">
                {currentAccount.isPrimary
                  ? "Primary Account"
                  : "Secondary Account"}
              </span>
            </div>
          )}
        </div>

        <nav className="flex-1 px-4 space-y-2 text-sm">
          <div>
            <button
              onClick={() => toggleMenu("press-releases")}
              className={`w-full flex items-center justify-between p-2 rounded transition-colors ${
                hasActiveChild(["/releases/add", "/releases"])
                  ? "text-primary font-semibold bg-primary-light/30"
                  : "text-secondary-dark hover:text-primary font-medium"
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
                      ? "bg-primary-light text-primary font-medium border-l-4 border-primary"
                      : "text-secondary-medium hover:bg-secondary-light"
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
                      ? "bg-primary-light text-primary font-medium border-l-4 border-primary"
                      : "text-secondary-medium hover:bg-secondary-light"
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
                ? "bg-primary-light text-primary font-medium border-l-4 border-primary"
                : "text-secondary-dark hover:bg-secondary-light"
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
                ? "bg-primary-light text-primary font-medium border-l-4 border-primary"
                : "text-secondary-dark hover:bg-secondary-light"
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
                ? "bg-primary-light text-primary font-medium border-l-4 border-primary"
                : "text-secondary-dark hover:bg-secondary-light"
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
                ? "bg-primary-light text-primary font-medium border-l-4 border-primary"
                : "text-secondary-dark hover:bg-secondary-light"
            }`}
          >
            <div className="flex items-center gap-2">
              <Settings size={18} />
              <span>Account Settings</span>
            </div>
          </NavLink>
        </nav>

        <div className="p-4 border-t border-secondary-light">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-secondary-medium hover:text-red-500 text-sm font-medium w-full p-2 transition-colors"
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
