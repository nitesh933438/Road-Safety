/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { XCircle, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MYTHS = [
  { myth: "I'll get into legal trouble.", reality: "The Good Samaritan Law protects helpers from civil and criminal liability." },
  { myth: "Police will detain me for questioning.", reality: "You cannot be forced to answer questions or visit the police station." },
  { myth: "I have to pay the hospital bill.", reality: "You are not liable to pay any initial hospital expenses." },
  { myth: "I must reveal my identity.", reality: "You can choose to remain completely anonymous." },
  { myth: "I will be dragged to court as a witness.", reality: "You can only be examined on a voluntary basis, usually via video conferencing." },
  { myth: "Helping will make the injury worse.", reality: "Basic first aid (like stopping bleeding) significantly improves survival chances." },
  { myth: "Hospitals will refuse treatment if I leave.", reality: "All hospitals are mandated to provide immediate medical care regardless of who brings the victim." },
  { myth: "I need to be a doctor to help.", reality: "Anyone can call an ambulance, secure the scene, and provide basic comfort." },
  { myth: "People usually survive without help.", reality: "The first 60 minutes (Golden Hour) are critical; bystander help doubles survival rates." },
  { myth: "It's better to wait for the ambulance.", reality: "Immediate actions like CPR or bleeding control cannot wait for an ambulance." },
];

export const MythBusters: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">Myth vs Reality</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base">
          Let's clear up common misconceptions about helping road accident victims.
        </p>
      </div>

      <div className="space-y-3">
        {MYTHS.map((item, idx) => (
          <div 
            key={idx} 
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm"
          >
            <button 
              onClick={() => toggle(idx)}
              className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <XCircle className="w-5 h-5 text-rose-500 flex-shrink-0" />
                <span className="font-bold text-slate-700 dark:text-slate-300 text-sm sm:text-base">
                  Myth: {item.myth}
                </span>
              </div>
              {openIdx === idx ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
            </button>
            <AnimatePresence>
              {openIdx === idx && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-6 pb-4 pt-1"
                >
                  <div className="flex items-start space-x-3 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/50">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-200">
                      Reality: {item.reality}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};
