/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AlertTriangle, Users, Clock, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

export const LiveStatistics: React.FC = () => {
  const stats = [
    {
      title: 'Annual Fatalities',
      value: '1.77 Lakh',
      desc: 'Lives lost in road traffic accidents annually',
      icon: AlertTriangle,
      color: 'text-rose-600 dark:text-rose-400',
      bgColor: 'bg-rose-50/50 dark:bg-rose-950/30',
      borderColor: 'border-rose-200/50 dark:border-rose-900/30',
    },
    {
      title: 'Daily Mortality Rate',
      value: '485',
      desc: 'Deaths recorded on Indian roads every single day',
      icon: TrendingUp,
      color: 'text-amber-600 dark:text-amber-400',
      bgColor: 'bg-amber-50/50 dark:bg-amber-950/30',
      borderColor: 'border-amber-200/50 dark:border-amber-900/30',
    },
    {
      title: 'Savable Lives',
      value: '30–40%',
      desc: 'Could be saved with immediate Golden Hour intervention',
      icon: Users,
      color: 'text-emerald-600 dark:text-emerald-400',
      bgColor: 'bg-emerald-50/50 dark:bg-emerald-950/30',
      borderColor: 'border-emerald-200/50 dark:border-emerald-900/30',
    },
    {
      title: 'Golden Hour Impact',
      value: '60 Mins',
      desc: 'Critical window after trauma for emergency stabilization',
      icon: Clock,
      color: 'text-indigo-600 dark:text-indigo-400',
      bgColor: 'bg-indigo-50/50 dark:bg-indigo-950/30',
      borderColor: 'border-indigo-200/50 dark:border-indigo-900/30',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } }
  } as const;

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-950 transition-colors duration-300 relative">
      <div className="absolute inset-0 bg-white/50 dark:bg-slate-900/50 backdrop-blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-black uppercase tracking-[0.2em] gradient-text mb-3"
          >
            Crisis Analysis & Urgency
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight"
          >
            Why the Golden Hour Matters
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm text-slate-600 dark:text-slate-400 mt-3 font-medium"
          >
            Statistics highlight the critical need for rapid bystander response and AI-guided first aid triage.
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                className={`p-6 rounded-2xl border ${stat.borderColor} ${stat.bgColor} glass shadow-sm`}
              >
                <div className="flex items-center justify-between mb-5">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color} bg-white dark:bg-slate-900 shadow-sm border border-white/50 dark:border-slate-800/50`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-white/80 dark:bg-slate-900/80 px-2.5 py-1 rounded-md border border-slate-200/50 dark:border-slate-700/50">
                    Verified
                  </span>
                </div>
                <h4 className="text-3xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">
                  {stat.value}
                </h4>
                <h5 className="font-bold text-slate-800 dark:text-slate-200 text-sm mb-1.5">
                  {stat.title}
                </h5>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                  {stat.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
