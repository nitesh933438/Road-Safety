import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldAlert, ArrowLeft, Home, LogOut, ShieldX, UserCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

export const AccessDeniedPage: React.FC = () => {
  const { userProfile, currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogoutAndSwitch = async () => {
    await logout();
    navigate('/login');
  };

  const currentRole = userProfile?.role || 'citizen';

  const roleLabels: Record<string, string> = {
    citizen: 'Citizen / Driver',
    volunteer: 'Good Samaritan Volunteer',
    hospital: 'Hospital Network',
    police: 'Traffic Police / First Responder',
    admin: 'Administrator'
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 dark:bg-slate-950 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-rose-500/10 dark:bg-rose-500/15 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="max-w-lg w-full relative z-10"
      >
        <div className="glass backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 p-8 sm:p-10 shadow-2xl rounded-3xl border border-rose-200/80 dark:border-rose-900/50 text-center">
          {/* Status Badge & Icon */}
          <div className="relative inline-block mb-6">
            <div className="w-20 h-20 rounded-2xl bg-rose-100 dark:bg-rose-950/80 border-2 border-rose-500/30 flex items-center justify-center mx-auto text-rose-600 dark:text-rose-400 shadow-xl shadow-rose-500/10">
              <ShieldX className="w-10 h-10" />
            </div>
            <span className="absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-wider uppercase bg-rose-600 text-white shadow-md border border-white dark:border-slate-900">
              403 Restricted
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
            Access Denied
          </h1>

          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
            You do not have administrative privileges required to access the <strong className="text-slate-900 dark:text-white">Admin Dashboard</strong> or administrative features.
          </p>

          {/* User Role Card */}
          <div className="bg-slate-100/70 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/80 text-left mb-6 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              <span>Account Identity</span>
              <span className="flex items-center text-rose-600 dark:text-rose-400">
                <ShieldAlert className="w-3.5 h-3.5 mr-1" /> Non-Admin
              </span>
            </div>
            
            <div className="flex items-center space-x-3 pt-1">
              <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-600 dark:text-indigo-300 font-bold flex items-center justify-center uppercase shrink-0">
                {userProfile?.name?.charAt(0) || currentUser?.email?.charAt(0) || 'U'}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
                  {userProfile?.name || 'Logged-in User'}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                  {currentUser?.email || 'user@goldenguard.org'}
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 shrink-0">
                {roleLabels[currentRole] || currentRole}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link
              to="/dashboard"
              className="w-full flex items-center justify-center py-3 px-4 rounded-xl shadow-lg shadow-indigo-500/20 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Return to User Dashboard
            </Link>

            <div className="grid grid-cols-2 gap-3">
              <Link
                to="/"
                className="flex items-center justify-center py-2.5 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors"
              >
                <Home className="w-3.5 h-3.5 mr-1.5" />
                Home Page
              </Link>

              <button
                type="button"
                onClick={handleLogoutAndSwitch}
                className="flex items-center justify-center py-2.5 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5 mr-1.5" />
                Switch Account
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
