/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Settings, Bell, Sun, Moon, Globe, HelpCircle, LogOut, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

export const ProfileMenu: React.FC = () => {
  const { currentUser, userProfile, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const userRole = userProfile?.role || 'citizen';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setIsOpen(false);
    await logout();
    navigate('/');
  };

  if (!currentUser) {
    return (
      <Link
        to="/login"
        className="inline-flex items-center justify-center px-4 py-2 rounded-xl text-xs font-black text-white gradient-bg hover:shadow-lg hover:scale-105 transition-all shadow-sm"
      >
        Sign In
      </Link>
    );
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="User Profile Menu"
        className="flex items-center space-x-2 p-1 rounded-full border-2 border-transparent hover:border-indigo-500 transition-all focus:outline-none"
      >
        <div className="h-9 w-9 rounded-full bg-indigo-600 text-white font-black uppercase text-sm flex items-center justify-center shadow-md">
          {userProfile?.name?.charAt(0) || currentUser.email?.charAt(0) || 'U'}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-64 rounded-3xl glass border border-slate-200 dark:border-slate-800 shadow-2xl py-2 z-50 overflow-hidden"
          >
            {/* Header info */}
            <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 space-y-1">
              <p className="text-sm font-extrabold text-slate-900 dark:text-white truncate">
                {userProfile?.name || 'GoldenGuard User'}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                {currentUser.email}
              </p>
              <div className="pt-1">
                <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                  <Shield className="w-3 h-3 text-indigo-600 dark:text-indigo-400 mr-0.5" />
                  <span>Role: {userRole}</span>
                </span>
              </div>
            </div>

            {/* Menu Links */}
            <div className="py-2 space-y-0.5 text-xs font-bold text-slate-700 dark:text-slate-200">
              <Link
                to="/profile"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 hover:bg-slate-100/80 dark:hover:bg-slate-800/80 flex items-center transition-colors"
              >
                <User className="w-4 h-4 mr-3 text-indigo-600 dark:text-indigo-400" />
                <span>Profile</span>
              </Link>

              <Link
                to="/settings"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 hover:bg-slate-100/80 dark:hover:bg-slate-800/80 flex items-center transition-colors"
              >
                <Settings className="w-4 h-4 mr-3 text-slate-500" />
                <span>Settings</span>
              </Link>

              <Link
                to="/notifications"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 hover:bg-slate-100/80 dark:hover:bg-slate-800/80 flex items-center transition-colors"
              >
                <Bell className="w-4 h-4 mr-3 text-amber-500" />
                <span>Notification Settings</span>
              </Link>

              <button
                type="button"
                onClick={toggleTheme}
                className="w-full text-left px-4 py-2 hover:bg-slate-100/80 dark:hover:bg-slate-800/80 flex items-center justify-between transition-colors"
              >
                <div className="flex items-center">
                  {theme === 'light' ? (
                    <Moon className="w-4 h-4 mr-3 text-indigo-600" />
                  ) : (
                    <Sun className="w-4 h-4 mr-3 text-amber-400" />
                  )}
                  <span>Theme</span>
                </div>
                <span className="text-[10px] uppercase font-black px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700">
                  {theme}
                </span>
              </button>

              <Link
                to="/about"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 hover:bg-slate-100/80 dark:hover:bg-slate-800/80 flex items-center transition-colors"
              >
                <HelpCircle className="w-4 h-4 mr-3 text-slate-500" />
                <span>Help & Support</span>
              </Link>
            </div>

            {/* Logout */}
            <div className="border-t border-slate-100 dark:border-slate-800 pt-1">
              <button
                type="button"
                onClick={handleLogout}
                className="w-full text-left px-4 py-2.5 text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/60 flex items-center transition-colors"
              >
                <LogOut className="w-4 h-4 mr-3 text-rose-500" />
                <span>Logout</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
