/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Award, BookOpen, CheckCircle, Star, Shield, Medal } from 'lucide-react';
import { getLevel, getNextLevel } from '../../data/trainingData';
import { motion } from 'framer-motion';

interface TrainingDashboardProps {
  progress: {
    xp: number;
    completedLessons: string[];
    quizScores: Record<string, number>;
    badges: string[];
  };
  totalLessons: number;
}

export const TrainingDashboard: React.FC<TrainingDashboardProps> = ({ progress, totalLessons }) => {
  const currentLevel = getLevel(progress.xp);
  const nextLevel = getNextLevel(progress.xp);
  
  const xpProgress = nextLevel 
    ? ((progress.xp - currentLevel.minXp) / (nextLevel.minXp - currentLevel.minXp)) * 100 
    : 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Level & XP Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-3xl p-8 shadow-2xl md:col-span-2 space-y-8 relative overflow-hidden"
      >
        {/* Decorative background blur */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center space-x-6">
            <motion.div 
              whileHover={{ scale: 1.05, rotate: 5 }}
              className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-white flex items-center justify-center shadow-lg shadow-amber-500/30"
            >
              <Shield className="w-10 h-10" />
            </motion.div>
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-1">Current Rank</p>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white leading-none">{currentLevel.name}</h2>
              <p className="text-sm font-bold text-amber-600 dark:text-amber-500 mt-2">{progress.xp} Total XP</p>
            </div>
          </div>
          {nextLevel && (
            <div className="text-left sm:text-right bg-slate-100/50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200/50 dark:border-slate-700/50">
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-black uppercase tracking-widest mb-1">Next Rank</p>
              <p className="text-lg font-black text-slate-900 dark:text-white">{nextLevel.name}</p>
            </div>
          )}
        </div>

        <div className="space-y-3 relative z-10">
          <div className="flex justify-between text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
            <span>{currentLevel.minXp} XP</span>
            <span>{nextLevel ? `${nextLevel.minXp} XP` : 'MAX'}</span>
          </div>
          <div className="h-6 bg-slate-100 dark:bg-slate-800/80 rounded-full overflow-hidden border border-slate-200/50 dark:border-slate-700/50 shadow-inner relative">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${xpProgress}%` }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 rounded-full"
            />
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent w-1/2 animate-[shimmer_2s_infinite]"></div>
          </div>
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400 text-center pt-2">
            {nextLevel ? `${nextLevel.minXp - progress.xp} XP to next level` : 'You have reached the maximum level!'}
          </p>
        </div>
      </motion.div>

      {/* Stats Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-3xl p-8 shadow-2xl space-y-6"
      >
        <h3 className="font-black text-lg text-slate-900 dark:text-white flex items-center space-x-2">
          <Star className="w-5 h-5 text-emerald-500" />
          <span>Your Progress</span>
        </h3>
        
        <div className="space-y-4">
          <motion.div whileHover={{ scale: 1.02 }} className="flex items-center justify-between p-4 rounded-2xl bg-white/50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 transition-all">
            <div className="flex items-center space-x-4">
              <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Lessons</span>
            </div>
            <span className="text-lg font-black text-slate-900 dark:text-white">
              {progress.completedLessons.length} <span className="text-slate-400 text-sm font-semibold">/ {totalLessons}</span>
            </span>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} className="flex items-center justify-between p-4 rounded-2xl bg-white/50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 transition-all">
            <div className="flex items-center space-x-4">
              <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
                <CheckCircle className="w-5 h-5" />
              </div>
              <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Quizzes Passed</span>
            </div>
            <span className="text-lg font-black text-slate-900 dark:text-white">
              {Object.keys(progress.quizScores).filter(k => progress.quizScores[k] >= 80).length}
            </span>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} className="flex items-center justify-between p-4 rounded-2xl bg-white/50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 transition-all">
            <div className="flex items-center space-x-4">
              <div className="p-2 rounded-xl bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                <Medal className="w-5 h-5" />
              </div>
              <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Badges Earned</span>
            </div>
            <span className="text-lg font-black text-slate-900 dark:text-white">
              {progress.badges.length}
            </span>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};
