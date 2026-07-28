/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQS = [
  {
    q: "Will the police detain me for questioning?",
    a: "No. Under the Good Samaritan Law, police cannot force you to stay at the scene or visit the police station. Any questioning is purely voluntary."
  },
  {
    q: "Can a hospital refuse to treat the victim if I don't pay?",
    a: "Absolutely not. The Supreme Court mandates that all hospitals, public and private, must provide immediate emergency care without demanding payment from the Good Samaritan."
  },
  {
    q: "Can I leave the hospital immediately after dropping the victim?",
    a: "Yes. Once you drop the victim, you are free to leave immediately. The hospital cannot detain you."
  },
  {
    q: "Will my identity be exposed?",
    a: "No. You have the right to remain completely anonymous. You don't have to provide your name, ID, or contact details to the hospital or police unless you volunteer to."
  },
  {
    q: "Who pays for the hospital expenses?",
    a: "The Good Samaritan is not liable to pay any hospital fees. Emergency stabilization costs are often covered by government schemes or the victim's insurance later."
  }
];

export const FaqAccordion: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">Frequently Asked Questions</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base">
          Clear your doubts about legal rights and hospital procedures.
        </p>
      </div>

      <div className="space-y-3">
        {FAQS.map((faq, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
            <button
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
            >
              <div className="flex items-center space-x-3 pr-4">
                <HelpCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />
                <span className="font-bold text-slate-800 dark:text-slate-200 text-sm sm:text-base">{faq.q}</span>
              </div>
              {openIdx === idx ? <ChevronUp className="w-5 h-5 text-slate-400 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />}
            </button>
            <AnimatePresence>
              {openIdx === idx && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-6 pb-4 pt-1"
                >
                  <p className="text-sm text-slate-600 dark:text-slate-400 pl-8 leading-relaxed">
                    {faq.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};
