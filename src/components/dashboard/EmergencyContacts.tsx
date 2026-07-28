/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PhoneCall, Shield, Flame, Truck } from 'lucide-react';
import { motion } from 'framer-motion';

export const EmergencyContacts: React.FC = () => {
  const contacts = [
    {
      name: 'Ambulance & Medical',
      number: '108',
      desc: 'National Trauma & Medical Emergency Dispatch',
      icon: Truck,
      color: 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/30',
      border: 'border-emerald-200/50 dark:border-emerald-900/50',
      bgHover: 'hover:bg-emerald-50/50 dark:hover:bg-emerald-900/10'
    },
    {
      name: 'National Emergency',
      number: '112',
      desc: 'All-in-one Police, Highway Patrol & SOS',
      icon: Shield,
      color: 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/30',
      border: 'border-blue-200/50 dark:border-blue-900/50',
      bgHover: 'hover:bg-blue-50/50 dark:hover:bg-blue-900/10'
    },
    {
      name: 'Fire & Rescue',
      number: '101',
      desc: 'Vehicle Fire & Extrication Rescue Squad',
      icon: Flame,
      color: 'bg-rose-600 hover:bg-rose-700 shadow-rose-600/30',
      border: 'border-rose-200/50 dark:border-rose-900/50',
      bgHover: 'hover:bg-rose-50/50 dark:hover:bg-rose-900/10'
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
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" as const } }
  } as const;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-card bg-gradient-to-br from-rose-500/5 via-slate-900/5 to-rose-600/5 dark:from-rose-950/20 dark:via-slate-900/40 dark:to-rose-950/20 border border-rose-200/30 dark:border-rose-800/30 rounded-[2rem] p-6 shadow-sm space-y-6 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-40 h-40 bg-rose-500/10 rounded-full blur-[40px] pointer-events-none" />
      
      <div className="flex items-center justify-between relative z-10">
        <div>
          <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Emergency Direct Lines</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">One-click national dispatch hotlines</p>
        </div>
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-rose-100 dark:bg-rose-950/60 shadow-inner">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
        </div>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3 relative z-10"
      >
        {contacts.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className={`p-4 rounded-2xl border ${item.border} bg-white/60 dark:bg-slate-800/40 backdrop-blur-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors ${item.bgHover} shadow-sm group`}
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800 flex items-center justify-center text-slate-800 dark:text-slate-200 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-black text-sm text-slate-900 dark:text-white leading-tight">{item.name}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">{item.desc}</p>
                </div>
              </div>

              <a
                href={`tel:${item.number}`}
                className={`flex items-center justify-center space-x-2 px-5 py-3 rounded-xl font-bold text-xs text-white shadow-lg transition-all active:scale-95 ${item.color} w-full sm:w-auto`}
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call {item.number}</span>
              </a>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
};
