import React, { useState } from 'react';
import { Eye, EyeOff, User, Lock, Building2, Moon, Sun } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const LoginPage = () => {
  const { login } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const dummyCredentials = {
    email: 'hr.manager@company.com',
    password: 'hrpass123'
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setTimeout(() => {
      const success = login(formData);
      if (!success) setError('Invalid credentials.');
      setIsLoading(false);
    }, 1000);
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const fillDummyCredentials = () => setFormData(dummyCredentials);

  return (
    <div
      className="
        min-h-screen flex items-center justify-center px-4
        bg-gradient-to-br from-[#fbf7f2] via-[#f1e8dc] to-[#e7c9a5]/40
        dark:bg-gradient-to-br dark:from-[#0b0b0b] dark:via-[#14100b] dark:to-[#1c140d]
      "
    >
      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="
          fixed top-6 right-6 p-3 rounded-full shadow-md
          bg-[#faf8f5] text-[#3b2a1a]
          dark:bg-[#1f140b] dark:text-[#d6c3a1]
        "
      >
        {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>

      <div className="max-w-md w-full space-y-8">
        {/* Logo */}
        <div className="text-center">
          <div
            className="mx-auto h-20 w-20 rounded-xl flex items-center justify-center mb-6"
            style={{
              background: isDark
                ? 'linear-gradient(135deg, #3a2a1a, #5a402a)'
                : 'linear-gradient(135deg, #312214, #764a37)',
              boxShadow: isDark
                ? '0 0 20px rgba(90,64,42,0.35)'
                : '0 0 25px rgba(168,109,83,0.4)'
            }}
          >
            <Building2 className="h-10 w-10 text-white" />
          </div>

          <h2 className="text-3xl font-bold text-[#2b1d0e] dark:text-[#f6efe6]">
            HR Dashboard
          </h2>
          <p className="mt-2 text-sm text-[#5a4a42] dark:text-[#cbb8a0]">
            Sign in to your account
          </p>
        </div>

        {/* Demo Credentials */}
        <div
          className="
            rounded-lg p-4 border
            bg-[#f3eee6] border-[#d6c9b8] text-[#3b2a1a]
            dark:bg-gradient-to-br dark:from-[#1a120c] dark:to-[#23170e]
            dark:border-[#3a2a1a] dark:text-[#efe2cf]
          "
        >
          <div className="flex justify-between mb-2">
            <h3 className="text-sm font-medium">Demo Credentials</h3>
            <button
              onClick={fillDummyCredentials}
              className="
                text-xs px-3 py-1 rounded-full text-white
                bg-[#3b2a1a] hover:bg-[#6a4a33]
                dark:bg-[#5a402a] dark:hover:bg-[#7a5a40]
              "
            >
              Use Demo
            </button>
          </div>
          <div className="text-xs space-y-1">
            <div><strong>Email:</strong> {dummyCredentials.email}</div>
            <div><strong>Password:</strong> {dummyCredentials.password}</div>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <div
            className="
              rounded-xl shadow-xl p-8 border
              bg-white border-[#e0d6c8]
              dark:bg-gradient-to-br dark:from-[#14100b] dark:to-[#1c140d]
              dark:border-[#3a2a1a]
            "
          >
            <div className="space-y-6">
              {/* Email */}
              <div>
                <label className="block text-sm mb-2 text-[#3b2a1a] dark:text-[#e7d3b3]">
                  Email Address
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="
                      w-full pl-10 py-3 rounded-lg border
                      bg-[#faf8f5] border-[#d6c9b8] text-[#2b1d0e]
                      focus:ring-2 focus:ring-[#cbb8a0]
                      dark:bg-[#1a120c] dark:border-[#3a2a1a]
                      dark:text-[#f6efe6] dark:focus:ring-[#8b6b4f]
                    "
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm mb-2 text-[#3b2a1a] dark:text-[#e7d3b3]">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="
                      w-full pl-10 pr-12 py-3 rounded-lg border
                      bg-[#faf8f5] border-[#d6c9b8] text-[#2b1d0e]
                      focus:ring-2 focus:ring-[#cbb8a0]
                      dark:bg-[#1a120c] dark:border-[#3a2a1a]
                      dark:text-[#f6efe6] dark:focus:ring-[#8b6b4f]
                    "
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>

              {error && (
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="
                  w-full py-3 rounded-lg font-semibold text-white
                  bg-gradient-to-r from-[#3b2a1a] to-[#6a4a33]
                  hover:from-[#6a4a33] hover:to-[#3b2a1a]
                  dark:from-[#5a402a] dark:to-[#7a5a40]
                  dark:hover:from-[#7a5a40] dark:hover:to-[#5a402a]
                  transition shadow-lg
                "
              >
                {isLoading ? 'Signing in...' : 'Sign in to Dashboard'}
              </button>
            </div>
          </div>
        </form>

        <p className="text-xs text-center text-[#7a6a5f] dark:text-[#b8a88f]">
          © 2026 HR Dashboard
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
