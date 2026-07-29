/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShieldAlert, Sun, Moon, Menu, X, Compass, Layers, Info, Bot, BookOpen, Heart, User, LogOut, Settings, LogIn, Users, Shield, Brain, Presentation, Navigation, Radio } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

import { APP_LOGO_DATA_URI } from '../../assets/logoDataUri';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { currentUser, userProfile, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Home', path: '/', icon: Compass },
    { name: 'Dashboard', path: '/dashboard', icon: Layers },
    { name: 'Pitch Mode', path: '/presentation', icon: Presentation },
    { name: 'SOS Emergency', path: '/sos', icon: ShieldAlert },
    { name: 'AI Driving Guardian', path: '/guardian', icon: ShieldAlert },
    { name: 'AI Command Center', path: '/command-center', icon: Radio },
    { name: 'Road Hazards', path: '/hazards', icon: ShieldAlert },
    { name: 'Emergency Report', path: '/emergency-report', icon: ShieldAlert },
    { name: 'AI Safe Route', path: '/safe-route', icon: Navigation },
    { name: 'Smart Risk Layer', path: '/risk-layer', icon: Layers },
    { name: 'AI Prediction', path: '/ai-prediction', icon: Brain },
    { name: 'AI Assistant', path: '/ai-assistant', icon: Bot },
    { name: 'Smart Map', path: '/map', icon: Compass },
    { name: 'Training Academy', path: '/training', icon: BookOpen },
    { name: 'Good Samaritan', path: '/samaritan', icon: Heart },
    { name: 'Rescue Network', path: '/community', icon: Users },
    { name: 'Admin Panel', path: '/admin', icon: Shield },
    { name: 'System Spec', path: '/specs', icon: Layers },
    { name: 'About Hackathon', path: '/about', icon: Info },
  ];

  const userRole = userProfile?.role || 'citizen';

  const visibleNavLinks = navLinks.filter(link => {
    if (link.path === '/admin') {
      return userRole === 'admin';
    }
    return true;
  });

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
    setProfileDropdownOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    setProfileDropdownOpen(false);
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 glass border-b border-slate-200/50 dark:border-slate-800/50 transition-colors duration-300 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3">
            <Link 
              to="/" 
              className="flex items-center space-x-2.5 group focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg p-1"
              aria-label="GoldenGuard Home"
            >
              <div className="w-10 h-10 rounded-xl overflow-hidden shadow-md group-hover:scale-105 transition-transform bg-slate-900 flex items-center justify-center border border-amber-500/40 p-0.5">
                <img 
                  src={APP_LOGO_DATA_URI} 
                  alt="GoldenGuard Logo" 
                  className="w-full h-full object-cover rounded-lg" 
                />
              </div>
              <div>
                <span className="font-bold text-lg tracking-tight gradient-text">
                  GoldenGuard
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 overflow-x-auto max-w-2xl no-scrollbar">
            {visibleNavLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                      isActive
                        ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/50 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800/50'
                    }`
                  }
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden lg:inline">{link.name}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* Right Action Area: Theme Toggle, Auth, & Mobile Button */}
          <div className="flex items-center space-x-3">
            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100/50 dark:hover:bg-slate-800/50 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5 text-slate-700 hover:text-indigo-600 transition-colors" />
              ) : (
                <Sun className="w-5 h-5 text-amber-400 hover:text-amber-300 transition-colors" />
              )}
            </button>

            {/* User Profile / Auth */}
            <div className="hidden md:block relative">
              {currentUser ? (
                <div>
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-indigo-500 transition duration-150 ease-in-out hover:scale-105 transform"
                    id="user-menu"
                    aria-label="User menu"
                    aria-haspopup="true"
                  >
                    <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900/80 flex items-center justify-center text-indigo-600 dark:text-indigo-300 font-bold uppercase shadow-sm">
                      {userProfile?.name?.charAt(0) || currentUser.email?.charAt(0) || 'U'}
                    </div>
                  </button>

                  {/* Profile Dropdown */}
                  <AnimatePresence>
                    {profileDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="origin-top-right absolute right-0 mt-2 w-48 rounded-xl shadow-lg py-1 glass border border-slate-200 dark:border-slate-700"
                      >
                        <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-700/50">
                          <p className="text-sm text-slate-900 dark:text-white font-semibold truncate">{userProfile?.name || 'User'}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 truncate mb-1.5">{currentUser.email}</p>
                          <span className="inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                            Role: {userRole}
                          </span>
                        </div>
                        <Link
                          to="/profile"
                          onClick={handleLinkClick}
                          className="px-4 py-2 text-sm text-slate-700 hover:bg-slate-100/50 dark:text-slate-200 dark:hover:bg-slate-800/50 flex items-center transition-colors"
                        >
                          <User className="mr-2 h-4 w-4" /> Your Profile
                        </Link>
                        <Link
                          to="/settings"
                          onClick={handleLinkClick}
                          className="px-4 py-2 text-sm text-slate-700 hover:bg-slate-100/50 dark:text-slate-200 dark:hover:bg-slate-800/50 flex items-center transition-colors"
                        >
                          <Settings className="mr-2 h-4 w-4" /> Settings
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-900/30 flex items-center transition-colors"
                        >
                          <LogOut className="mr-2 h-4 w-4" /> Sign out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center px-4 py-2 rounded-lg shadow-sm text-sm font-medium text-white gradient-bg hover:shadow-md hover:scale-105 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle navigation menu"
                className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100/50 dark:hover:bg-slate-800/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t border-slate-200/50 dark:border-slate-800/50 glass px-4 pt-2 pb-4 space-y-1 shadow-lg max-h-[80vh] overflow-y-auto"
          >
            {currentUser ? (
               <div className="mb-4 pb-4 border-b border-slate-200/50 dark:border-slate-700/50">
                 <div className="flex items-center px-3 py-2">
                   <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900/80 flex items-center justify-center text-indigo-600 dark:text-indigo-300 font-bold uppercase shadow-sm">
                        {userProfile?.name?.charAt(0) || currentUser.email?.charAt(0) || 'U'}
                      </div>
                   </div>
                   <div className="ml-3">
                     <div className="text-base font-semibold text-slate-800 dark:text-white truncate">{userProfile?.name || 'User'}</div>
                     <div className="text-sm font-medium text-slate-500 dark:text-slate-400 truncate mb-1">{currentUser.email}</div>
                     <span className="inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                       Role: {userRole}
                     </span>
                   </div>
                 </div>
                 <div className="mt-3 space-y-1">
                   <Link
                     to="/profile"
                     onClick={handleLinkClick}
                     className="block px-3 py-2 rounded-lg text-base font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100/50 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800/50 transition-colors"
                   >
                     Your Profile
                   </Link>
                   <Link
                     to="/settings"
                     onClick={handleLinkClick}
                     className="block px-3 py-2 rounded-lg text-base font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100/50 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800/50 transition-colors"
                   >
                     Settings
                   </Link>
                   <button
                     onClick={handleLogout}
                     className="block w-full text-left px-3 py-2 rounded-lg text-base font-medium text-rose-600 hover:text-rose-800 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-900/30 transition-colors"
                   >
                     Sign out
                   </button>
                 </div>
               </div>
            ) : (
              <div className="mb-4">
                <Link
                  to="/login"
                  onClick={handleLinkClick}
                  className="flex items-center w-full justify-center px-4 py-2 rounded-lg shadow-sm text-base font-medium text-white gradient-bg hover:shadow-md transition-all"
                >
                  Sign In
                </Link>
              </div>
            )}
            
            <div className="space-y-1">
              <p className="px-3 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Navigation</p>
              {visibleNavLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    onClick={handleLinkClick}
                    className={({ isActive }) =>
                      `flex items-center space-x-3 px-3 py-3 rounded-xl text-base font-medium transition-colors ${
                        isActive
                          ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300 shadow-sm'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/50 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800/50'
                      }`
                    }
                  >
                    <Icon className="w-5 h-5" />
                    <span>{link.name}</span>
                  </NavLink>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
