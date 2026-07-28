/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Lightbulb, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const SafetyTips: React.FC = () => {
  const tips = [
    {
      title: 'Golden Hour Rule',
      content: 'Getting professional medical attention within the first 60 minutes after a severe crash increases survival probability by up to 40%.',
    },
    {
      title: 'Bleeding Control (Direct Pressure)',
      content: 'For severe arterial bleeding, apply firm continuous direct pressure using a clean cloth or bandage for at least 10 minutes without lifting.',
    },
    {
      title: 'Do Not Move Neck in Trauma',
      content: 'Unless there is immediate danger of fire or explosion, never move an accident victim with suspected spinal or neck injuries.',
    },
    {
      title: 'Good Samaritan Legal Immunity',
      content: 'Indian law protects bystanders who help road crash victims. You can assist without fear of police detention, interrogation, or liability.',
    },
    {
      title: 'CPR Compression Rhythm',
      content: 'Perform chest compressions at a rate of 100 to 120 beats per minute—matching the tempo of the song "Stayin Alive".',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % tips.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [tips.length]);

  const nextTip = () => {
    setCurrentIndex((prev) => (prev + 1) % tips.length);
  };

  const currentTip = tips[currentIndex];

  return (
    <div className="glass-card bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-amber-500/10 dark:from-indigo-950/40 dark:via-slate-900/40 dark:to-amber-950/20 border border-indigo-200/50 dark:border-indigo-800/50 rounded-[2rem] p-6 shadow-sm flex flex-col justify-between relative overflow-hidden h-full">
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-[40px] pointer-events-none" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-white flex items-center justify-center shadow-lg shadow-amber-500/30">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">Golden Hour Wisdom</h3>
              <p className="text-[10px] text-amber-600 dark:text-amber-400 font-black uppercase tracking-widest">Protocol Tips</p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextTip}
            aria-label="Next tip"
            className="p-2.5 rounded-xl bg-white/60 dark:bg-slate-800/60 text-indigo-600 dark:text-indigo-400 hover:bg-white dark:hover:bg-slate-800 transition-colors shadow-sm backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50"
          >
            <RefreshCw className="w-4 h-4" />
          </motion.button>
        </div>

        <div className="h-[120px] relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <h4 className="font-black text-lg text-slate-900 dark:text-white mb-2 leading-tight">{currentTip.title}</h4>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                "{currentTip.content}"
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 mt-2 border-t border-indigo-200/50 dark:border-slate-700/50 text-xs font-bold text-slate-500 relative z-10">
        <span>Tip {currentIndex + 1} of {tips.length}</span>
        <div className="flex space-x-1.5">
          {tips.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === currentIndex ? 'bg-amber-500 w-6' : 'bg-slate-300 dark:bg-slate-700 w-1.5'}`}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
};
