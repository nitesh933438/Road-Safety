/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AlertTriangle, Users, Clock, CheckCircle2, PhoneCall, HeartPulse, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

export const LiveStats: React.FC = () => {
  const stats = [
    {
      title: 'Accidents Today',
      value: '24',
      change: '+4% vs yesterday',
      isPositive: false,
      icon: AlertTriangle,
      color: 'text-rose-600 dark:text-rose-400',
      bg: 'bg-rose-50 dark:bg-rose-950/40',
    },
    {
      title: 'Lives Assisted',
      value: '182',
      change: '+18% this week',
      isPositive: true,
      icon: HeartPulse,
      color: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-50 dark:bg-emerald-950/40',
    },
    {
      title: 'Active Volunteers',
      value: '1,420',
      change: '84 online within 2km',
      isPositive: true,
      icon: Users,
      color: 'text-indigo-600 dark:text-indigo-400',
      bg: 'bg-indigo-50 dark:bg-indigo-950/40',
    },
    {
      title: 'Avg. Response Time',
      value: '8.4 Min',
      change: '-2.1 min improvement',
      isPositive: true,
      icon: Clock,
      color: 'text-amber-600 dark:text-amber-400',
      bg: 'bg-amber-50 dark:bg-amber-950/40',
    },
    {
      title: 'Training Completed',
      value: '5,890',
      change: 'CPR course certified',
      isPositive: true,
      icon: CheckCircle2,
      color: 'text-teal-600 dark:text-teal-400',
      bg: 'bg-teal-50 dark:bg-teal-950/40',
    },
    {
      title: 'Emergency Calls',
      value: '312',
      change: '24/7 Dispatch active',
      isPositive: true,
      icon: PhoneCall,
      color: 'text-violet-600 dark:text-violet-400',
      bg: 'bg-violet-50 dark:bg-violet-950/40',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } }
  } as const;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">Live Telemetry & Metrics</h2>
        <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 px-2 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-800/50">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Real-Time Sync
        </span>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="glass-card rounded-2xl p-5 shadow-sm hover:shadow-xl transition-all border border-white/50 dark:border-slate-800/50 relative overflow-hidden group"
            >
              <div className={`absolute top-0 right-0 w-24 h-24 rounded-bl-full ${stat.bg} opacity-50 group-hover:opacity-100 transition-opacity pointer-events-none -mr-4 -mt-4 z-0`} />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center ${stat.color} shadow-sm border border-white/60 dark:border-slate-700/50`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${
                    stat.isPositive ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800/50' : 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-900/30 dark:text-rose-300 dark:border-rose-800/50'
                  }`}>
                    {stat.change}
                  </span>
                </div>
                <p className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-1">
                  {stat.value}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
                  {stat.title}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};
