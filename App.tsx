import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { AccountProvider } from './contexts/AccountContext';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import Login from './pages/Auth/Login';
import NewRelease from './pages/PressRelease/NewRelease';
import ListReleases from './pages/PressRelease/ListReleases';
import Accounts from './pages/Account/Accounts';
import Register from './pages/Account/Register';
import AddUser from './pages/Users/AddUser';
import MyUsers from './pages/Users/MyUsers';
import PromoCodeHistory from './pages/PromoCode/PromoCodeHistory';
import AccountSettings from './pages/Settings/AccountSettings';

const Placeholder = ({ title }: { title: string }) => (
  <div className="p-10 text-center">
    <h1 className="text-2xl font-bold text-secondary-medium">{title}</h1>
    <p className="text-secondary-medium mt-2">This page is under construction.</p>
  </div>
);

const AppContent: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  
  // Hide sidebar on public pages (login/registration for unregistered users)
  const isPublicPage = location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/account/add';
  const showSidebar = !isPublicPage;

  return (
    <div className="min-h-screen bg-secondary-light/30 flex flex-col">
      {showSidebar && <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />}
      <div className="flex flex-1 min-h-0 relative">
        {showSidebar && (
          <>
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            {sidebarOpen && (
              <div 
                className="fixed inset-0 bg-black/50 z-[45] lg:hidden"
                onClick={() => setSidebarOpen(false)}
              />
            )}
          </>
        )}
        <main className={`flex-1 ${showSidebar ? 'p-4 md:p-6 lg:p-8' : ''} overflow-y-auto w-full ${showSidebar ? '' : 'max-w-full'}`}>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected Routes */}
            <Route path="/" element={
              <ProtectedRoute>
                <Navigate to="/releases/add" replace />
              </ProtectedRoute>
            } />
            <Route path="/releases/add" element={
              <ProtectedRoute>
                <NewRelease />
              </ProtectedRoute>
            } />
            <Route path="/releases" element={
              <ProtectedRoute>
                <ListReleases />
              </ProtectedRoute>
            } />
            
            <Route path="/account" element={
              <ProtectedRoute>
                <Accounts />
              </ProtectedRoute>
            } />
            <Route path="/account/add" element={<Navigate to="/register" replace />} />
            
            <Route path="/users" element={
              <ProtectedRoute>
                <MyUsers />
              </ProtectedRoute>
            } />
            <Route path="/users/add" element={
              <ProtectedRoute>
                <AddUser />
              </ProtectedRoute>
            } />
            
            <Route path="/promos" element={
              <ProtectedRoute>
                <PromoCodeHistory />
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute>
                <AccountSettings />
              </ProtectedRoute>
            } />
          </Routes>
        </main>
      </div>
      {showSidebar && <Footer />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AccountProvider>
        <Router>
          <AppContent />
        </Router>
      </AccountProvider>
    </AuthProvider>
  );
};

export default App;