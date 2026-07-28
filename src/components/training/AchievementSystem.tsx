/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BADGES } from '../../data/trainingData';
import { Award, Lock, ShieldCheck, HeartPulse, Droplets, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

interface AchievementSystemProps {
  earnedBadges: string[];
}

export const AchievementSystem: React.FC<AchievementSystemProps> = ({ earnedBadges }) => {
  
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Footprints': return <ShieldCheck className="w-6 h-6" />;
      case 'HeartPulse': return <HeartPulse className="w-6 h-6" />;
      case 'Droplets': return <Droplets className="w-6 h-6" />;
      case 'Shield': return <Shield className="w-6 h-6" />;
      default: return <Award className="w-6 h-6" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-black text-slate-900 dark:text-white">Badges & Achievements</h3>
        <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
          {earnedBadges.length} / {BADGES.length} Earned
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {BADGES.map((badge, idx) => {
          const isEarned = earnedBadges.includes(badge.id);
          
          return (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className={`relative p-4 rounded-2xl border text-center space-y-3 ${
                isEarned 
                  ? 'bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-800/50 border-amber-200 dark:border-amber-900/50 shadow-sm' 
                  : 'bg-slate-50 dark:bg-slate-800/30 border-slate-200 dark:border-slate-800 opacity-60 grayscale'
              }`}
            >
              <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center border-4 ${
                isEarned 
                  ? 'bg-amber-100 border-amber-300 text-amber-600 dark:bg-amber-900/50 dark:border-amber-700 dark:text-amber-400' 
                  : 'bg-slate-200 border-slate-300 text-slate-400 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-500'
              }`}>
                {getIcon(badge.icon)}
              </div>
              
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white leading-tight">
                  {badge.name}
                </h4>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                  {badge.description}
                </p>
              </div>

              {!isEarned && (
                <div className="absolute top-2 right-2">
                  <Lock className="w-4 h-4 text-slate-400" />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
