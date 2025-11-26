import React, { useEffect, useState } from "react";
import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import Sidebar from "./components/Sidebar";
import { AccountProvider } from "./contexts/AccountContext";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import Accounts from "./pages/Account/Accounts";
import Register from "./pages/Account/Register";
import Login from "./pages/Auth/Login";
import ListReleases from "./pages/PressRelease/ListReleases";
import NewRelease from "./pages/PressRelease/NewRelease";
import PromoCodeHistory from "./pages/PromoCode/PromoCodeHistory";
import AccountSettings from "./pages/Settings/AccountSettings";
import AddUser from "./pages/Users/AddUser";
import MyUsers from "./pages/Users/MyUsers";

const AppContent: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { theme, colorMode } = useTheme();

  useEffect(() => {
    const faviconLink = document.querySelector(
      "link[rel~='icon']"
    ) as HTMLLinkElement;
    const alternateFaviconLink = document.querySelector(
      "link[rel~='alternate icon']"
    ) as HTMLLinkElement;

    if (theme === "cs") {
      if (faviconLink) {
        faviconLink.href = `${import.meta.env.BASE_URL}logos/CSFavicon.svg`;
      }
      if (alternateFaviconLink) {
        alternateFaviconLink.href = `${
          import.meta.env.BASE_URL
        }logos/CSFavicon.png`;
      }
    } else {
      if (faviconLink) {
        faviconLink.href = `${import.meta.env.BASE_URL}logos/Favicon2.svg`;
      }
      if (alternateFaviconLink) {
        alternateFaviconLink.href = `${
          import.meta.env.BASE_URL
        }logos/Favicon2.png`;
      }
    }
  }, [theme]);

  const isPublicPage =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/account/add";
  const showSidebar = !isPublicPage;

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors ${
        theme === "cs"
          ? colorMode === "dark"
            ? "bg-wire-bg-dark"
            : "bg-wire-bg-light-mode"
          : colorMode === "dark"
          ? "bg-gray-900"
          : "bg-gray-50"
      }`}
    >
      {showSidebar && (
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      )}
      <div className="flex flex-1 min-h-0 relative">
        {showSidebar && (
          <>
            <Sidebar
              isOpen={sidebarOpen}
              onClose={() => setSidebarOpen(false)}
            />
            {sidebarOpen && (
              <div
                className="fixed inset-0 bg-black/50 z-[45] lg:hidden"
                onClick={() => setSidebarOpen(false)}
              />
            )}
          </>
        )}
        <main
          className={`flex-1 ${
            showSidebar ? "p-4 md:p-6 lg:p-8" : ""
          } overflow-y-auto w-full ${
            showSidebar ? "" : "max-w-full"
          } transition-colors ${
            theme === "cs"
              ? colorMode === "dark"
                ? "text-wire-text"
                : "text-wire-text-dark"
              : colorMode === "dark"
              ? "text-gray-100"
              : "text-secondary-dark"
          }`}
        >
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Navigate to="/releases/add" replace />
                </ProtectedRoute>
              }
            />
            <Route
              path="/releases/add"
              element={
                <ProtectedRoute>
                  <NewRelease />
                </ProtectedRoute>
              }
            />
            <Route
              path="/releases"
              element={
                <ProtectedRoute>
                  <ListReleases />
                </ProtectedRoute>
              }
            />

            <Route
              path="/account"
              element={
                <ProtectedRoute>
                  <Accounts />
                </ProtectedRoute>
              }
            />
            <Route
              path="/account/add"
              element={<Navigate to="/register" replace />}
            />

            <Route
              path="/users"
              element={
                <ProtectedRoute>
                  <MyUsers />
                </ProtectedRoute>
              }
            />
            <Route
              path="/users/add"
              element={
                <ProtectedRoute>
                  <AddUser />
                </ProtectedRoute>
              }
            />

            <Route
              path="/promos"
              element={
                <ProtectedRoute>
                  <PromoCodeHistory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <AccountSettings />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
      {showSidebar && <Footer />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AccountProvider>
          <Router>
            <AppContent />
          </Router>
        </AccountProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
