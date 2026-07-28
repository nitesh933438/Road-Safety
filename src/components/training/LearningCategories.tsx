/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { LESSONS } from '../../data/trainingData';
import { PlayCircle, CheckCircle, Clock, BarChart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LearningCategoriesProps {
  completedLessons: string[];
  onSelectLesson: (id: string) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
} as const;

export const LearningCategories: React.FC<LearningCategoriesProps> = ({ completedLessons, onSelectLesson }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-black text-slate-900 dark:text-white flex items-center space-x-2">
        <span>Training Modules</span>
        <span className="px-2.5 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-bold">{LESSONS.length} Total</span>
      </h3>
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {LESSONS.map((lesson) => {
          const isCompleted = completedLessons.includes(lesson.id);
          
          return (
            <motion.div
              key={lesson.id}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectLesson(lesson.id)}
              className={`glass-card relative overflow-hidden rounded-3xl p-6 cursor-pointer transition-all border ${
                isCompleted 
                  ? 'bg-emerald-50/70 border-emerald-200/50 dark:bg-emerald-900/10 dark:border-emerald-800/30 shadow-emerald-500/5'
                  : 'bg-white/70 border-slate-200/50 dark:bg-slate-900/70 dark:border-slate-700/50 hover:shadow-xl hover:shadow-amber-500/5'
              }`}
            >
              {/* Progress Indicator Line */}
              {isCompleted && (
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-emerald-600"></div>
              )}

              <div className="flex items-start justify-between mb-6">
                <div className={`p-3.5 rounded-2xl ${
                  isCompleted ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-gradient-to-br from-amber-100 to-amber-200 text-amber-700 dark:from-amber-900/40 dark:to-amber-800/40 dark:text-amber-400 shadow-inner'
                }`}>
                  {isCompleted ? <CheckCircle className="w-6 h-6" /> : <PlayCircle className="w-6 h-6" />}
                </div>
                {isCompleted && (
                  <span className="px-3 py-1 bg-emerald-100/80 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300 text-[10px] font-black uppercase tracking-widest rounded-xl border border-emerald-200 dark:border-emerald-800/50">
                    Completed
                  </span>
                )}
              </div>
              
              <h4 className="font-black text-xl text-slate-900 dark:text-white mb-3 leading-tight">{lesson.title}</h4>
              
              <div className="flex items-center space-x-4 text-xs font-bold text-slate-500 dark:text-slate-400 mt-auto pt-2 border-t border-slate-100 dark:border-slate-800/50">
                <div className="flex items-center space-x-1.5 bg-slate-100 dark:bg-slate-800/50 px-2.5 py-1 rounded-lg">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{lesson.duration}</span>
                </div>
                <div className="flex items-center space-x-1.5 bg-slate-100 dark:bg-slate-800/50 px-2.5 py-1 rounded-lg">
                  <BarChart className={`w-3.5 h-3.5 ${lesson.difficulty === 'Beginner' ? 'text-emerald-500' : lesson.difficulty === 'Intermediate' ? 'text-amber-500' : 'text-rose-500'}`} />
                  <span>{lesson.difficulty}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};
