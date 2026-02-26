import React, { useState } from 'react';
import {
  Building2,
  Users,
  BarChart3,
  BookmarkCheck,
  Menu,
  X,
  LogOut,
  Home,
  Sun,
  Moon
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const Navbar = ({ currentPage, setCurrentPage }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  const navigationItems = [
    { id: 'dashboard', name: 'Dashboard', icon: Home },
    { id: 'employees', name: 'Employees', icon: Users },
    { id: 'analytics', name: 'Analytics', icon: BarChart3 },
    { id: 'bookmarks', name: 'Bookmarks', icon: BookmarkCheck },
  ];

  const handleNavigation = (pageId) => {
    setCurrentPage(pageId);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsProfileDropdownOpen(false);
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 backdrop-blur-sm border-b z-50 shadow-sm"
      style={{
        background: isDark
          ? 'linear-gradient(135deg,#0e0e0e,#151515)'
          : 'linear-gradient(135deg,#fbf7f2,#f1e8dc)',
        borderColor: isDark ? '#2a2a2a' : '#d6c9b8'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <div className="flex items-center">
            <div
              className="h-10 w-10 rounded-lg flex items-center justify-center"
              style={{
                background: isDark
                  ? 'linear-gradient(135deg,#8b5e3c,#3b2a1a)'
                  : 'linear-gradient(135deg,#3b2a1a,#a86d53)'
              }}
            >
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <span className="ml-3 text-xl font-bold text-[#3b2a1a] dark:text-[#fff1dc] hidden sm:block">
              HR Dashboard
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.id)}
                  className="px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 transition-all"
                  style={{
                    background: isActive
                      ? isDark
                        ? 'linear-gradient(135deg,#3b2a1a,#8b5e3c)'
                        : '#e7c9a5'
                      : 'transparent',
                    color: isActive
                      ? isDark
                        ? '#fff1dc'
                        : '#3b2a1a'
                      : isDark
                        ? '#cbb58b'
                        : '#5a4a42'
                  }}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden lg:block">{item.name}</span>
                </button>
              );
            })}
          </div>

          {/* Right Controls */}
          <div className="flex items-center space-x-3">

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg"
              style={{
                background: isDark
                  ? '#1a1a1a'
                  : '#efe6da'
              }}
            >
              {isDark ? (
                <Sun className="h-5 w-5 text-[#e7c9a5]" />
              ) : (
                <Moon className="h-5 w-5 text-[#3b2a1a]" />
              )}
            </button>

            {/* Profile */}
            <div className="relative">
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center space-x-3 p-2 rounded-lg"
              >
                <img
                  className="h-8 w-8 rounded-full object-cover"
                  src={user?.avatar}
                  alt={user?.name}
                />
                <span className="hidden sm:block text-sm font-medium text-[#3b2a1a] dark:text-[#fff1dc]">
                  {user?.name}
                </span>
              </button>

              {isProfileDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg border z-50"
                  style={{
                    background: isDark ? '#14100b' : '#fffaf3',
                    borderColor: isDark ? '#3a2a1a' : '#d6c9b8'
                  }}
                >
                  <div className="px-4 py-3 border-b" style={{ borderColor: isDark ? '#3a2a1a' : '#d6c9b8' }}>
                    <p className="text-sm font-medium text-[#3b2a1a] dark:text-[#fff1dc]">
                      {user?.name}
                    </p>
                    <p className="text-xs text-[#7a6a5f] dark:text-[#cbb58b]">
                      {user?.email}
                    </p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-[#a86d53]"
                  >
                    <LogOut className="h-4 w-4 mr-3" />
                    Sign out
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg"
              style={{
                background: isDark ? '#1a1a1a' : '#efe6da'
              }}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5 text-[#a86d53]" />
              ) : (
                <Menu className="h-5 w-5 text-[#a86d53]" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden border-t shadow-lg"
          style={{
            background: isDark ? '#14100b' : '#fffaf3',
            borderColor: isDark ? '#3a2a1a' : '#d6c9b8'
          }}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.id)}
                  className="w-full flex items-center px-3 py-3 rounded-lg text-base font-medium"
                  style={{
                    background: isActive
                      ? isDark
                        ? '#3b2a1a'
                        : '#e7c9a5'
                      : 'transparent',
                    color: isDark ? '#fff1dc' : '#3b2a1a'
                  }}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {item.name}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
