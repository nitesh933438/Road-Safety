/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Eye, Bot, PhoneCall, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Witness Accident',
      desc: 'Bystander spots the emergency and opens the RoadGuard web app instantly.',
      icon: Eye,
      color: 'bg-indigo-500 text-white shadow-indigo-500/20',
    },
    {
      step: '02',
      title: 'AI First Aid Guidance',
      desc: 'Interactive AI prompts vital questions and provides immediate bleeding/CPR steps.',
      icon: Bot,
      color: 'bg-violet-500 text-white shadow-violet-500/20',
    },
    {
      step: '03',
      title: 'Instant SOS Broadcast',
      desc: 'One-tap dispatch alerts nearby volunteers, traffic police, and ambulance service.',
      icon: PhoneCall,
      color: 'bg-fuchsia-500 text-white shadow-fuchsia-500/20',
    },
    {
      step: '04',
      title: 'Hospital Handover',
      desc: 'Victim is routed to the closest trauma care facility with pre-hospital telemetry.',
      icon: Building2,
      color: 'bg-rose-500 text-white shadow-rose-500/20',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
  } as const;

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-950 border-y border-slate-200/50 dark:border-slate-800/50 transition-colors duration-300 relative overflow-hidden">
      <div className="absolute inset-0 bg-white/50 dark:bg-slate-900/50 backdrop-blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-black uppercase tracking-[0.2em] gradient-text mb-3"
          >
            Workflow Timeline
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight"
          >
            How Golden Hour Response Works
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-4 font-medium"
          >
            A seamless 4-step protocol designed to eliminate delays in emergency medical assistance.
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative"
        >
          {/* Connecting line for desktop */}
          <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-indigo-500/20 via-fuchsia-500/20 to-rose-500/20 rounded-full" />

          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="glass rounded-2xl p-6 relative flex flex-col justify-between border border-white/50 dark:border-slate-700/50 shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-lg shadow-lg relative z-10 ${item.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-3xl font-black text-slate-200 dark:text-slate-800 tracking-tighter">
                      {item.step}
                    </span>
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">
                    {item.title}
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
