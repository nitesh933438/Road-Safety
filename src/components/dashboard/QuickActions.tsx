/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PhoneCall, Bot, Building2, AlertTriangle, HeartPulse, BookOpen, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface QuickActionsProps {
  onActionClick: (actionId: string) => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({ onActionClick }) => {
  const actions = [
    {
      id: 'sos',
      title: 'SOS Emergency',
      desc: 'Instant GPS beacon dispatch',
      icon: PhoneCall,
      color: 'bg-rose-500 text-white',
      badge: 'Urgent',
    },
    {
      id: 'ai-assistant',
      title: 'AI First Aid',
      desc: 'Step-by-step triage guide',
      icon: Bot,
      color: 'bg-indigo-500 text-white',
      badge: 'Active',
    },
    {
      id: 'hospitals',
      title: 'Nearby Hospitals',
      desc: 'Trauma care telemetry sync',
      icon: Building2,
      color: 'bg-blue-600 text-white',
      badge: 'Live Map',
    },
    {
      id: 'report',
      title: 'Report Accident',
      desc: 'Log incident details & severity',
      icon: AlertTriangle,
      color: 'bg-orange-600 text-white',
      badge: 'Quick Log',
    },
    {
      id: 'cpr',
      title: 'Learn CPR',
      desc: 'Rhythm metronome & guide',
      icon: HeartPulse,
      color: 'bg-emerald-600 text-white',
      badge: 'Training',
    },
    {
      id: 'contacts',
      title: 'Emergency Contacts',
      desc: '108, 112, 101 one-touch call',
      icon: BookOpen,
      color: 'bg-slate-800 text-white dark:bg-slate-700',
      badge: 'Direct',
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
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">Quick Emergency Actions</h2>
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">One-Touch Operations</span>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {actions.map((act) => {
          const Icon = act.icon;
          return (
            <motion.button
              key={act.id}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onActionClick(act.id)}
              className="glass-card rounded-2xl p-5 text-left shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all group flex items-center justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 border border-white/50 dark:border-slate-800/50"
            >
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-md ${act.color} group-hover:scale-105 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base tracking-tight">
                      {act.title}
                    </h3>
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {act.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
                    {act.desc}
                  </p>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/30 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 group-hover:translate-x-1 transition-all shadow-sm border border-slate-100 dark:border-slate-700">
                <ArrowRight className="w-4 h-4" />
              </div>
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
};
