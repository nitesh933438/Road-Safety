/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShieldCheck, CheckSquare, Square, AlertCircle, HeartPulse, Stethoscope, PhoneCall } from 'lucide-react';

export const FirstActionsChecklist: React.FC = () => {
  const [checkedItems, setCheckedItems] = useState<{ [key: number]: boolean }>({
    0: true, // Ensure scene safety checked by default
  });

  const steps = [
    { title: 'Ensure Scene Safety', desc: 'Check for oncoming traffic, fire hazards, or downed power lines before approaching.' },
    { title: 'Check Responsiveness', desc: 'Tap the victim gently and ask loudly: "Are you okay? Can you hear me?"' },
    { title: 'Call Emergency Services', desc: 'Immediately dial 108 for ambulance dispatch or 112 for police assistance.' },
    { title: 'Control Severe Bleeding', desc: 'Apply firm, continuous direct pressure to bleeding sites using clean cloth or bandage.' },
    { title: 'Check Breathing & CPR', desc: 'If unconscious and not breathing normally, begin chest compressions (100-120 bpm).' },
    { title: 'Recovery Position', desc: 'If breathing but unconscious, place on side to keep airway clear of fluids.' },
    { title: 'Stay With Victim', desc: 'Remain calm and reassure the victim until professional medical rescue units arrive.' },
  ];

  const toggleCheck = (index: number) => {
    setCheckedItems((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const completedCount = Object.values(checkedItems).filter(Boolean).length;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-5 h-5 text-emerald-500" />
          <h3 className="font-bold text-slate-900 dark:text-white text-base">Golden Hour First Actions Protocol</h3>
        </div>
        <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
          {completedCount} / {steps.length} Completed
        </span>
      </div>

      <div className="space-y-2.5">
        {steps.map((step, idx) => {
          const isDone = !!checkedItems[idx];
          return (
            <button
              key={idx}
              onClick={() => toggleCheck(idx)}
              className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start space-x-3 ${
                isDone
                  ? 'bg-emerald-50/60 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900/60'
                  : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <div className="mt-0.5 flex-shrink-0">
                {isDone ? (
                  <CheckSquare className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <Square className="w-5 h-5 text-slate-400" />
                )}
              </div>
              <div className="flex-1">
                <h4 className={`font-bold text-sm ${isDone ? 'line-through text-slate-500 dark:text-slate-400' : 'text-slate-900 dark:text-white'}`}>
                  {idx + 1}. {step.title}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
