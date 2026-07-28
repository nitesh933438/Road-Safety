/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShieldCheck, CheckCircle2, Scale, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export const GoodSamaritanCard: React.FC = () => {
  const protections = [
    'Full legal protection under Supreme Court guidelines & Good Samaritan Law',
    'No police harassment or mandatory detention for assisting victims',
    'Civil & criminal liability immunity for emergency medical aid',
    'Voluntary option to remain anonymous while saving a life',
  ];

  return (
    <section className="py-24 bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-transparent dark:from-emerald-950/20 dark:to-transparent border-y border-emerald-500/10 relative overflow-hidden">
      <div className="absolute -left-40 -top-40 w-96 h-96 bg-emerald-500/20 dark:bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-[2rem] p-8 sm:p-12 shadow-2xl border border-white/60 dark:border-white/10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-8">
              <div>
                <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider shadow-sm mb-4 border border-emerald-200/50 dark:border-emerald-800/50">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Legal Rights & Immunity</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  The Good Samaritan Law
                </h2>
                <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed mt-4 font-medium max-w-lg">
                  Fear of police questioning or legal liability stops 74% of bystanders from helping road crash victims. The law is on your side—help without hesitation.
                </p>
              </div>

              <div className="space-y-4 pt-2">
                {protections.map((text, idx) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * idx }}
                    key={idx} 
                    className="flex items-start space-x-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <CheckCircle2 className="w-6 h-6 text-emerald-500 mt-0.5 flex-shrink-0 drop-shadow-sm" />
                    <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{text}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-[2rem] transform rotate-3 opacity-20 dark:opacity-40 blur-sm" />
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-[2rem] p-10 text-white shadow-xl space-y-8 relative z-10 overflow-hidden">
                <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-inner">
                  <Scale className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3 tracking-tight">Bystander Confidence</h3>
                  <p className="text-emerald-50 text-sm leading-relaxed font-medium">
                    "You have absolute legal right to take an injured person to the nearest hospital without being forced to reveal your identity or face interrogation."
                  </p>
                </div>
                <div className="pt-6 border-t border-white/20 flex items-center space-x-2 text-sm font-bold">
                  <Heart className="w-5 h-5 fill-white text-white" />
                  <span>Save Lives with Peace of Mind</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
