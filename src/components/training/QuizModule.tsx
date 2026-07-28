/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Quiz } from '../../data/trainingData';
import { ArrowLeft, Clock, AlertCircle, CheckCircle2, XCircle, Award } from 'lucide-react';
import { motion } from 'framer-motion';

interface QuizModuleProps {
  quiz: Quiz;
  onBack: () => void;
  onComplete: (score: number) => void;
}

export const QuizModule: React.FC<QuizModuleProps> = ({ quiz, onBack, onComplete }) => {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(quiz.questions.length * 60); // 1 min per question

  useEffect(() => {
    if (isFinished) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isFinished]);

  const currentQuestion = quiz.questions[currentQIndex];

  const handleSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedAnswer(index);
    setIsAnswered(true);
    if (index === currentQuestion.correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQIndex < quiz.questions.length - 1) {
      setCurrentQIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (isFinished) {
    const percentage = Math.round((score / quiz.questions.length) * 100);
    const passed = percentage >= 80;

    return (
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={`p-10 rounded-3xl border-4 ${
            passed 
              ? 'bg-emerald-50 border-emerald-500 dark:bg-emerald-950/30' 
              : 'bg-rose-50 border-rose-500 dark:bg-rose-950/30'
          }`}
        >
          <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6 ${
            passed ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
          }`}>
            {passed ? <Award className="w-12 h-12" /> : <XCircle className="w-12 h-12" />}
          </div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">
            {passed ? 'Quiz Passed!' : 'Quiz Failed'}
          </h2>
          <p className="text-lg font-medium text-slate-600 dark:text-slate-400 mb-6">
            You scored {score} out of {quiz.questions.length} ({percentage}%)
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-8">
            {passed 
              ? 'Great job! You have demonstrated a solid understanding of these life-saving techniques. XP has been awarded.'
              : 'You need at least 80% to pass and earn XP. Review the lesson and try again.'}
          </p>
          
          <div className="flex justify-center space-x-4">
            {!passed && (
              <button 
                onClick={() => {
                  setCurrentQIndex(0);
                  setSelectedAnswer(null);
                  setIsAnswered(false);
                  setScore(0);
                  setIsFinished(false);
                  setTimeLeft(quiz.questions.length * 60);
                }}
                className="px-6 py-3 rounded-xl font-bold bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 transition-colors"
              >
                Retry Quiz
              </button>
            )}
            <button 
              onClick={() => {
                if (passed) onComplete(percentage);
                onBack();
              }}
              className="px-6 py-3 rounded-xl font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
            >
              {passed ? 'Claim XP & Return' : 'Back to Academy'}
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <button 
          onClick={onBack}
          className="flex items-center space-x-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit Quiz</span>
        </button>
        
        <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg font-bold font-mono text-sm ${
          timeLeft < 30 ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-400 animate-pulse' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
        }`}>
          <Clock className="w-4 h-4" />
          <span>{formatTime(timeLeft)}</span>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
        <div className="space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-500">
            Question {currentQIndex + 1} of {quiz.questions.length}
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-snug">
            {currentQuestion.question}
          </h2>
        </div>

        <div className="space-y-3">
          {currentQuestion.options.map((opt, idx) => {
            let btnClass = "bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:border-amber-400 text-slate-700 dark:text-slate-300";
            let icon = null;

            if (isAnswered) {
              if (idx === currentQuestion.correctAnswer) {
                btnClass = "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-500 text-emerald-800 dark:text-emerald-300";
                icon = <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
              } else if (idx === selectedAnswer) {
                btnClass = "bg-rose-50 dark:bg-rose-900/20 border-rose-500 text-rose-800 dark:text-rose-300";
                icon = <XCircle className="w-5 h-5 text-rose-500" />;
              } else {
                btnClass = "bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 opacity-50";
              }
            } else if (selectedAnswer === idx) {
              btnClass = "bg-amber-50 border-amber-500 text-amber-800 dark:bg-amber-900/20 dark:text-amber-300";
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={isAnswered}
                className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-center justify-between ${btnClass}`}
              >
                <span className="font-semibold text-sm sm:text-base">{opt}</span>
                {icon}
              </button>
            );
          })}
        </div>

        {isAnswered && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-xl border ${
              selectedAnswer === currentQuestion.correctAnswer 
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900 dark:bg-emerald-900/20 dark:border-emerald-800 dark:text-emerald-200' 
                : 'bg-rose-50 border-rose-200 text-rose-900 dark:bg-rose-900/20 dark:border-rose-800 dark:text-rose-200'
            }`}
          >
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-bold text-sm mb-1">
                  {selectedAnswer === currentQuestion.correctAnswer ? 'Correct!' : 'Incorrect'}
                </p>
                <p className="text-sm opacity-90">{currentQuestion.explanation}</p>
              </div>
            </div>
          </motion.div>
        )}

        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <button
            onClick={handleNext}
            disabled={!isAnswered}
            className={`px-8 py-3 rounded-xl font-bold text-sm transition-all ${
              isAnswered 
                ? 'bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 shadow-md active:scale-95' 
                : 'bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-600 cursor-not-allowed'
            }`}
          >
            {currentQIndex < quiz.questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
          </button>
        </div>
      </div>
    </div>
  );
};
