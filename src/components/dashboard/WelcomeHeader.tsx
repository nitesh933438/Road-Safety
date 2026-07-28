/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Activity, ShieldAlert } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';

export const WelcomeHeader: React.FC = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const { userProfile, currentUser } = useAuth();

  useEffect(() => {
    const timer = setInterval(() => setCurrentDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = currentDateTime.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const formattedTime = currentDateTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="glass-card rounded-[2rem] p-6 sm:p-8 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border border-white/60 dark:border-slate-700/50 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-violet-500/5 to-transparent pointer-events-none" />
      
      <div className="space-y-2 relative z-10">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-800 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider mb-2 border border-indigo-200/50 dark:border-indigo-800/50 shadow-sm">
          <Activity className="w-4 h-4 animate-pulse text-indigo-600 dark:text-indigo-400" />
          <span>Live Command Center</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Welcome back, <span className="gradient-text">{userProfile?.name || currentUser?.displayName || 'User'}</span>
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">
          National Highway Sector 4 telemetry is fully operational and synchronized.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-4 relative z-10">
        {/* Date & Time Badge */}
        <div className="flex items-center space-x-4 bg-white/60 dark:bg-slate-800/60 border border-slate-200/50 dark:border-slate-700/50 px-4 py-3 rounded-2xl shadow-sm backdrop-blur-sm">
          <div className="flex items-center space-x-2 text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wide">
            <Calendar className="w-4 h-4 text-indigo-500" />
            <span>{formattedDate}</span>
          </div>
          <div className="h-4 w-px bg-slate-200 dark:bg-slate-700"></div>
          <div className="flex items-center space-x-2 text-sm font-mono font-black text-slate-900 dark:text-white">
            <Clock className="w-4 h-4 text-fuchsia-500" />
            <span>{formattedTime}</span>
          </div>
        </div>

        {/* Emergency Status Indicator */}
        <div className="flex items-center space-x-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/50 dark:border-emerald-800/50 px-5 py-3 rounded-2xl shadow-sm">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </div>
          <div className="text-left">
            <span className="block text-[10px] uppercase font-black tracking-wider text-emerald-700 dark:text-emerald-400/80">Status</span>
            <span className="text-xs font-bold text-emerald-900 dark:text-emerald-300">Nodes Secure</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
