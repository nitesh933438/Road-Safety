/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Shield, TrendingUp, Award, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export const ConfidenceMeter: React.FC = () => {
  const [q1, setQ1] = useState(50);
  const [q2, setQ2] = useState(50);
  const [q3, setQ3] = useState(50);
  const [q4, setQ4] = useState(50);

  const average = Math.round((q1 + q2 + q3 + q4) / 4);

  let level = 'Beginner';
  let color = 'text-slate-500';
  let bg = 'bg-slate-500';
  let Icon = Shield;

  if (average >= 80) {
    level = 'Hero';
    color = 'text-amber-500';
    bg = 'bg-amber-500';
    Icon = Award;
  } else if (average >= 60) {
    level = 'Confident';
    color = 'text-emerald-500';
    bg = 'bg-emerald-500';
    Icon = Zap;
  } else if (average >= 40) {
    level = 'Growing';
    color = 'text-blue-500';
    bg = 'bg-blue-500';
    Icon = TrendingUp;
  }

  const Slider = ({ value, setValue, label }: any) => (
    <div className="space-y-3">
      <div className="flex justify-between text-sm font-bold text-slate-700 dark:text-slate-300">
        <span>{label}</span>
        <span className={color}>{value}%</span>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(e) => setValue(parseInt(e.target.value))}
        className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
      />
    </div>
  );

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-black text-slate-900 dark:text-white">Confidence Meter</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Rate your comfort level in different emergency scenarios.
          </p>
        </div>
        
        <div className="space-y-6">
          <Slider value={q1} setValue={setQ1} label="Would you step forward to help?" />
          <Slider value={q2} setValue={setQ2} label="Would you call 108 for an ambulance?" />
          <Slider value={q3} setValue={setQ3} label="Would you perform CPR if needed?" />
          <Slider value={q4} setValue={setQ4} label="Would you help control heavy bleeding?" />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center p-8 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-800 text-center">
        <div className="relative mb-6">
          <svg className="w-32 h-32 transform -rotate-90">
            <circle cx="64" cy="64" r="56" className="stroke-slate-200 dark:stroke-slate-700" strokeWidth="12" fill="none" />
            <motion.circle 
              cx="64" 
              cy="64" 
              r="56" 
              className={`stroke-current ${color}`} 
              strokeWidth="12" 
              fill="none" 
              strokeDasharray="351.86"
              strokeDashoffset={351.86 - (351.86 * average) / 100}
              strokeLinecap="round"
              initial={{ strokeDashoffset: 351.86 }}
              animate={{ strokeDashoffset: 351.86 - (351.86 * average) / 100 }}
              transition={{ duration: 1 }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <Icon className={`w-10 h-10 ${color}`} />
          </div>
        </div>

        <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">Your Profile</h4>
        <div className={`text-3xl font-black ${color}`}>{level}</div>
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-3 max-w-xs">
          {average >= 80 ? "You are fully prepared to save lives. Great job!" : 
           average >= 60 ? "You have good instincts. A little more training will make you a pro." : 
           "It's normal to feel hesitant. Reviewing the training academy will boost your confidence."}
        </p>
      </div>
    </div>
  );
};
