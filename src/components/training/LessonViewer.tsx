/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Lesson, QUIZZES } from '../../data/trainingData';
import { ArrowLeft, Target, AlertTriangle, ShieldAlert, CheckCircle2, ChevronRight, ChevronLeft, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LessonViewerProps {
  lesson: Lesson;
  onBack: () => void;
  onComplete: () => void;
  onStartQuiz: (quizId: string) => void;
}

export const LessonViewer: React.FC<LessonViewerProps> = ({ lesson, onBack, onComplete, onStartQuiz }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = lesson.steps.length;
  
  const relatedQuiz = QUIZZES.find(q => q.id === `${lesson.id.split('-')[0]}-quiz`); // Simple matching logic

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <div className="space-y-6">
      <button 
        onClick={onBack}
        className="flex items-center space-x-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Academy</span>
      </button>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
        {/* Header */}
        <div className="bg-slate-900 dark:bg-slate-950 p-6 sm:p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <Target className="w-32 h-32" />
          </div>
          <div className="relative z-10 max-w-2xl">
            <span className="inline-block px-3 py-1 bg-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider rounded-full mb-3">
              {lesson.difficulty} • {lesson.duration}
            </span>
            <h2 className="text-3xl font-black mb-4">{lesson.title}</h2>
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Objectives:</h3>
              <ul className="space-y-1">
                {lesson.objectives.map((obj, i) => (
                  <li key={i} className="flex items-start space-x-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 sm:p-8">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">
              <span>Step {currentStep + 1} of {totalSteps}</span>
              <span>{Math.round(((currentStep + 1) / totalSteps) * 100)}%</span>
            </div>
            <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-amber-500"
                initial={{ width: `${(currentStep / totalSteps) * 100}%` }}
                animate={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          {/* Current Step */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                {lesson.steps[currentStep].title}
              </h3>
              
              {/* Image Placeholder */}
              <div className="w-full h-64 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center border border-slate-200 dark:border-slate-700">
                <p className="text-slate-400 dark:text-slate-500 font-semibold text-sm">Interactive Image / Video Placeholder</p>
              </div>

              <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300">
                <p className="text-lg leading-relaxed">{lesson.steps[currentStep].content}</p>
              </div>

              {/* Show Tips and Mistakes on the last step */}
              {currentStep === totalSteps - 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                  <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-5 space-y-3">
                    <div className="flex items-center space-x-2 text-emerald-700 dark:text-emerald-400 font-bold">
                      <ShieldAlert className="w-5 h-5" />
                      <span>Safety Tips</span>
                    </div>
                    <ul className="space-y-2 text-sm text-emerald-900 dark:text-emerald-200">
                      {lesson.safetyTips.map((tip, i) => (
                        <li key={i} className="flex items-start space-x-2">
                          <span className="opacity-50">•</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 rounded-2xl p-5 space-y-3">
                    <div className="flex items-center space-x-2 text-rose-700 dark:text-rose-400 font-bold">
                      <AlertTriangle className="w-5 h-5" />
                      <span>Common Mistakes</span>
                    </div>
                    <ul className="space-y-2 text-sm text-rose-900 dark:text-rose-200">
                      {lesson.commonMistakes.map((mistake, i) => (
                        <li key={i} className="flex items-start space-x-2">
                          <span className="opacity-50">•</span>
                          <span>{mistake}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-10 pt-6 border-t border-slate-200 dark:border-slate-800">
            <button
              onClick={handlePrev}
              disabled={currentStep === 0}
              className={`flex items-center space-x-2 px-5 py-3 rounded-xl font-bold text-sm transition-colors ${
                currentStep === 0 
                  ? 'opacity-50 cursor-not-allowed bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500' 
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>
            
            {currentStep === totalSteps - 1 ? (
              <div className="flex space-x-3">
                <button
                  onClick={onComplete}
                  className="flex items-center space-x-2 px-6 py-3 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition-all active:scale-95"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Mark Complete</span>
                </button>
                {relatedQuiz && (
                  <button
                    onClick={() => {
                      onComplete();
                      onStartQuiz(relatedQuiz.id);
                    }}
                    className="flex items-center space-x-2 px-6 py-3 rounded-xl font-bold text-sm bg-amber-500 hover:bg-amber-600 text-white shadow-md transition-all active:scale-95"
                  >
                    <Award className="w-5 h-5" />
                    <span>Take Quiz</span>
                  </button>
                )}
              </div>
            ) : (
              <button
                onClick={handleNext}
                className="flex items-center space-x-2 px-6 py-3 rounded-xl font-bold text-sm bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 shadow-md transition-all active:scale-95"
              >
                <span>Next Step</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
