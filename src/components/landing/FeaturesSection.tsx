/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Bot, PhoneCall, ShieldCheck, HeartPulse, Building2, Users2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      title: 'AI First Aid Assistant',
      desc: 'Instant voice & text step-by-step triage guidance for bleeding control, fractures, and trauma care.',
      icon: Bot,
      badge: 'AI Powered',
    },
    {
      title: 'SOS Emergency SOS',
      desc: 'One-touch emergency beacon broadcasting exact GPS coordinates to nearby ambulances and police.',
      icon: PhoneCall,
      badge: 'Instant Dispatch',
    },
    {
      title: 'Good Samaritan Guide',
      desc: 'Legal protections and step-by-step confidence manuals for bystanders assisting accident victims.',
      icon: ShieldCheck,
      badge: 'Legally Protected',
    },
    {
      title: 'CPR Training Hub',
      desc: 'Interactive rhythm metronome and visual guides for performing chest compressions correctly.',
      icon: HeartPulse,
      badge: 'Interactive',
    },
    {
      title: 'Nearby Hospital Locator',
      desc: 'Real-time telemetry of closest trauma care facilities with direct one-touch routing.',
      icon: Building2,
      badge: 'Live GPS',
    },
    {
      title: 'Community Volunteers',
      desc: 'Registered local first-responders and medical students alerted within 2km radius of accident.',
      icon: Users2,
      badge: 'Crowdsourced',
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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } }
  } as const;

  return (
    <section id="features" className="py-24 bg-white dark:bg-slate-900 border-y border-slate-200/50 dark:border-slate-800/50 transition-colors duration-300 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-multiply dark:mix-blend-lighten transform translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-fuchsia-500/10 dark:bg-fuchsia-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-multiply dark:mix-blend-lighten transform -translate-x-1/2 translate-y-1/2" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-black uppercase tracking-[0.2em] gradient-text mb-3"
          >
            Platform Capabilities
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight"
          >
            Designed for Instant Emergency Action
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-4 font-medium"
          >
            Every module is optimized for high-stress scenarios with low latency and foolproof accessibility.
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                className="glass-card rounded-[2rem] p-8 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-900/40 dark:to-violet-900/40 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform shadow-sm border border-indigo-100 dark:border-indigo-800/50">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-100/70 dark:bg-indigo-900/50 px-3 py-1 rounded-full border border-indigo-200/50 dark:border-indigo-800/50 shadow-sm">
                      {feat.badge}
                    </span>
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">
                    {feat.title}
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-medium">
                    {feat.desc}
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
