import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { useThemeClasses } from '../../hooks/useThemeClasses';
import { useTheme } from '../../contexts/ThemeContext';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const classes = useThemeClasses();
  const { theme, colorMode } = useTheme();
  
  const [email, setEmail] = useState(() => {
    const savedEmail = localStorage.getItem('savedEmail');
    return savedEmail || '';
  });
  
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    await new Promise(resolve => setTimeout(resolve, 300));

    const success = login(email, password);
    
    if (success) {
      localStorage.setItem('savedEmail', email);
      navigate('/');
    } else {
      setError('Invalid email or password.');
    }
    
    setIsLoading(false);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-colors ${
      classes.bg.tertiary
    }`}>
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center mb-4">
            <img
              src={`${import.meta.env.BASE_URL}logos/${
                theme === 'cs'
                  ? colorMode === 'dark'
                    ? 'CS Logo Vertical Color White.svg'
                    : 'CS Logo Vertical Color.svg'
                  : colorMode === 'dark'
                    ? 'Logo Vertical Color White.svg'
                    : 'Logo Vertical Color.svg'
              }`}
              alt={theme === 'cs' ? 'Content Syndicate' : 'Blockchain Wire'}
              className="h-28"
            />
          </div>
          <p className={classes.text.secondary}>Sign in to your account</p>
        </div>

        {/* Login Form */}
        <Card variant="elevated" className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className={`block text-sm font-medium mb-2 ${classes.text.primary}`}>
                Email Address
              </label>
              <div className="relative">
                <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${classes.text.secondary}`}>
                  <Mail className="h-5 w-5" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`block w-full pl-10 pr-3 py-2.5 rounded-lg transition-all border ${classes.border.default} ${classes.bg.tertiary} ${classes.text.primary} focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                  placeholder="your@company.com"
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className={`block text-sm font-medium mb-2 ${classes.text.primary}`}>
                Password
              </label>
              <div className="relative">
                <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${classes.text.secondary}`}>
                  <Lock className="h-5 w-5" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`block w-full pl-10 pr-10 py-2.5 rounded-lg transition-all border ${classes.border.default} ${classes.bg.tertiary} ${classes.text.primary} focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute inset-y-0 right-0 pr-3 flex items-center ${classes.text.secondary} transition-colors hover:opacity-80`}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={isLoading || !email || !password}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;

