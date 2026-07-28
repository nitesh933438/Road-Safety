/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CheckSquare, Square, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export const InteractiveChecklist: React.FC = () => {
  const [checked, setChecked] = useState<{ [key: number]: boolean }>({});

  const items = [
    "Stay calm and take a deep breath.",
    "Ensure the scene is safe from traffic or fire.",
    "Call 108 or ask a specific bystander to call.",
    "Check if the victim is responsive and breathing.",
    "If bleeding heavily, apply direct pressure.",
    "Do not move the victim unless in immediate danger.",
    "Wait with the victim until help arrives."
  ];

  const toggle = (idx: number) => {
    setChecked(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const progress = Math.round((Object.values(checked).filter(Boolean).length / items.length) * 100);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm max-w-2xl mx-auto space-y-6">
      <div className="flex items-center space-x-3 mb-2">
        <div className="p-3 bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400 rounded-xl">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-black text-slate-900 dark:text-white">Emergency Checklist</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Mental preparation before helping</p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-xs font-bold text-slate-500">
          <span>Readiness</span>
          <span>{progress}%</span>
        </div>
        <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-emerald-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="space-y-2">
        {items.map((item, idx) => (
          <button
            key={idx}
            onClick={() => toggle(idx)}
            className={`w-full flex items-start space-x-3 p-4 rounded-xl border transition-all text-left ${
              checked[idx] 
                ? 'bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800/50' 
                : 'bg-slate-50 border-slate-200 dark:bg-slate-800/50 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <div className="mt-0.5 flex-shrink-0">
              {checked[idx] ? (
                <CheckSquare className="w-5 h-5 text-emerald-500" />
              ) : (
                <Square className="w-5 h-5 text-slate-400" />
              )}
            </div>
            <span className={`font-semibold text-sm ${checked[idx] ? 'text-emerald-900 dark:text-emerald-200 line-through opacity-70' : 'text-slate-700 dark:text-slate-300'}`}>
              {item}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
