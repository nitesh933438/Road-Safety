/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  ShieldAlert,
  Sun,
  Moon,
  Menu,
  X,
  Compass,
  Layers,
  Info,
  Bot,
  BookOpen,
  Heart,
  Users,
  Shield,
  Brain,
  Presentation,
  Navigation,
  Radio,
  Search,
  Sparkles
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { NotificationBell } from '../notifications/NotificationBell';
import { motion, AnimatePresence } from 'framer-motion';

import { APP_LOGO_DATA_URI } from '../../assets/logoDataUri';
import { Breadcrumbs } from './Breadcrumbs';
import { WeatherWidget } from './WeatherWidget';
import { LiveStatusWidget } from './LiveStatusWidget';
import { LocationWidget } from '../location/LocationWidget';
import { GlobalSearchModal } from './GlobalSearchModal';
import { ProfileMenu } from './ProfileMenu';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { currentUser, userProfile, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Home', path: '/', icon: Compass },
    { name: 'Dashboard', path: '/dashboard', icon: Layers },
    { name: 'SOS Emergency', path: '/sos', icon: ShieldAlert },
    { name: 'AI Guardian', path: '/guardian', icon: ShieldAlert },
    { name: 'Command Center', path: '/command-center', icon: Radio },
    { name: 'Road Hazards', path: '/hazards', icon: ShieldAlert },
    { name: 'Report Incident', path: '/emergency-report', icon: ShieldAlert },
    { name: 'AI Safe Route', path: '/safe-route', icon: Navigation },
    { name: 'Smart Risk Layer', path: '/risk-layer', icon: Layers },
    { name: 'AI Prediction', path: '/ai-prediction', icon: Brain },
    { name: 'AI Assistant', path: '/ai-assistant', icon: Bot },
    { name: 'Smart Map', path: '/map', icon: Compass },
    { name: 'Training Academy', path: '/training', icon: BookOpen },
    { name: 'Good Samaritan', path: '/samaritan', icon: Heart },
    { name: 'Rescue Network', path: '/community', icon: Users },
    { name: 'Pitch Mode', path: '/presentation', icon: Presentation },
    { name: 'Admin Panel', path: '/admin', icon: Shield },
    { name: 'System Spec', path: '/specs', icon: Layers },
    { name: 'About', path: '/about', icon: Info },
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
  };

  const handleLogout = async () => {
    setMobileMenuOpen(false);
    await logout();
    navigate('/');
  };

  return (
    <>
      <header className="sticky top-0 z-40 glass border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300 shadow-sm backdrop-blur-xl">
        {/* Main Enterprise Header Row */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-2 sm:gap-4">
            
            {/* LEFT SIDE: Brand Logo & Optional Breadcrumbs */}
            <div className="flex items-center space-x-2 sm:space-x-3 shrink-0 min-w-0">
              <Link 
                to="/" 
                className="flex items-center space-x-2 group focus:outline-none shrink-0"
                aria-label="GoldenGuard Home"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl overflow-hidden shadow-md group-hover:scale-105 transition-transform bg-slate-900 flex items-center justify-center border border-amber-500/40 p-0.5">
                  <img 
                    src={APP_LOGO_DATA_URI} 
                    alt="GoldenGuard Logo" 
                    className="w-full h-full object-cover rounded-xl" 
                  />
                </div>
                <div className="hidden min-[360px]:block">
                  <span className="font-extrabold text-sm sm:text-base lg:text-lg tracking-tight gradient-text block leading-none">
                    GoldenGuard
                  </span>
                </div>
              </Link>

              {/* Vertical Separator for Breadcrumbs */}
              <div className="hidden xl:block h-6 w-[1px] bg-slate-200 dark:bg-slate-800 shrink-0" />

              {/* Dynamic Page Title & Breadcrumbs */}
              <Breadcrumbs />
            </div>

            {/* CENTER: Global Smart Search Trigger */}
            <div className="flex-1 max-w-[150px] min-[400px]:max-w-[200px] sm:max-w-xs md:max-w-sm lg:max-w-md mx-1 sm:mx-2 min-w-0">
              <button
                type="button"
                onClick={() => setSearchModalOpen(true)}
                className="w-full flex items-center justify-between px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-2xl bg-slate-100/80 dark:bg-slate-800/80 hover:bg-slate-200/80 dark:hover:bg-slate-700/80 text-slate-500 dark:text-slate-400 text-xs font-semibold transition-all border border-slate-200/60 dark:border-slate-700/60 group focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <div className="flex items-center space-x-1.5 sm:space-x-2 truncate min-w-0">
                  <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-600 dark:text-indigo-400 shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="truncate hidden sm:inline">Search hospitals, CPR, SOS, hazards...</span>
                  <span className="truncate sm:hidden">Search...</span>
                </div>
                <div className="hidden md:flex items-center space-x-1 shrink-0 pl-1.5">
                  <kbd className="px-1.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shadow-2xs">
                    Ctrl K
                  </kbd>
                </div>
              </button>
            </div>

            {/* RIGHT SIDE: Widgets, Bell, Theme, Profile */}
            <div className="flex items-center space-x-1 sm:space-x-2 shrink-0">
              {/* Location Widget */}
              <LocationWidget />

              {/* Weather Widget */}
              <WeatherWidget />

              {/* Live Network Status Widget */}
              <LiveStatusWidget />

              {/* Notification Bell */}
              <NotificationBell />

              {/* Dark/Light Theme Switcher */}
              <button
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                className="p-1.5 sm:p-2 rounded-2xl text-slate-600 dark:text-slate-300 hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-colors focus:outline-none"
              >
                {theme === 'light' ? (
                  <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700 hover:text-indigo-600 transition-colors" />
                ) : (
                  <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 hover:text-amber-300 transition-colors" />
                )}
              </button>

              {/* User Profile Menu */}
              <div className="hidden sm:block">
                <ProfileMenu />
              </div>

              {/* Mobile Menu Toggle Button */}
              <div className="sm:hidden">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  aria-expanded={mobileMenuOpen}
                  aria-label="Toggle navigation menu"
                  className="p-1.5 rounded-2xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none transition-colors"
                >
                  {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Sub-Header Horizontal Category / Navigation Links */}
        <div className="hidden md:block border-t border-slate-200/60 dark:border-slate-800/60 bg-white/40 dark:bg-slate-900/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center space-x-1 overflow-x-auto no-scrollbar py-1 text-xs">
              {visibleNavLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    className={({ isActive }) =>
                      `flex items-center space-x-1.5 px-3 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap shrink-0 ${
                        isActive
                          ? 'bg-indigo-600 text-white shadow-xs'
                          : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-800/80'
                      }`
                    }
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{link.name}</span>
                  </NavLink>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="sm:hidden border-t border-slate-200/80 dark:border-slate-800/80 glass px-4 pt-3 pb-6 space-y-4 shadow-2xl max-h-[80vh] overflow-y-auto"
            >
              {/* User Bar */}
              {currentUser ? (
                <div className="p-3 rounded-2xl bg-indigo-50/80 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 truncate">
                      <div className="h-9 w-9 rounded-full bg-indigo-600 text-white font-black text-sm flex items-center justify-center shrink-0">
                        {userProfile?.name?.charAt(0) || currentUser.email?.charAt(0) || 'U'}
                      </div>
                      <div className="truncate">
                        <p className="text-xs font-black text-slate-900 dark:text-white truncate">{userProfile?.name || 'User'}</p>
                        <p className="text-[10px] text-slate-500 truncate">{currentUser.email}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="px-2.5 py-1 rounded-xl text-[10px] font-black bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300"
                    >
                      Sign Out
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-1 border-t border-indigo-100 dark:border-indigo-900/60 text-xs font-extrabold">
                    <Link
                      to="/profile"
                      onClick={handleLinkClick}
                      className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-300 text-center shadow-2xs"
                    >
                      My Profile
                    </Link>
                    <Link
                      to="/settings"
                      onClick={handleLinkClick}
                      className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 text-center shadow-2xs"
                    >
                      Settings
                    </Link>
                  </div>
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={handleLinkClick}
                  className="flex items-center justify-center w-full py-2.5 rounded-2xl bg-indigo-600 text-white font-black text-xs shadow-md"
                >
                  Sign In to GoldenGuard
                </Link>
              )}

              {/* Nav links */}
              <div className="space-y-1">
                <p className="px-1 text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2">Navigation Menu</p>
                {visibleNavLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <NavLink
                      key={link.name}
                      to={link.path}
                      onClick={handleLinkClick}
                      className={({ isActive }) =>
                        `flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-extrabold transition-all ${
                          isActive
                            ? 'bg-indigo-600 text-white shadow-sm'
                            : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`
                      }
                    >
                      <Icon className="w-4 h-4" />
                      <span>{link.name}</span>
                    </NavLink>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Global Search Modal Overlay */}
      <GlobalSearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
      />
    </>
  );
};
