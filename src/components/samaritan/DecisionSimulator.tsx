/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, XCircle, RefreshCw, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SCENARIOS = [
  {
    id: 1,
    title: 'Motorcycle Accident',
    desc: 'You witness a motorcyclist skid and fall on a busy road. They are lying still. What is your first action?',
    options: [
      { text: 'Ignore and drive away', correct: false, explanation: 'Ignoring a victim wastes precious Golden Hour minutes.' },
      { text: 'Record a video', correct: false, explanation: 'Recording videos is unhelpful and disrespectful. Action is needed.' },
      { text: 'Call 108 and secure the scene', correct: true, explanation: 'Calling an ambulance and securing the scene from other traffic is the best first step.' },
      { text: 'Drag them off the road immediately', correct: false, explanation: 'Unless there is immediate danger (like a fire), moving a victim can worsen spinal injuries.' },
    ]
  },
  {
    id: 2,
    title: 'Heavy Bleeding',
    desc: 'The victim has a deep cut on their arm that is bleeding heavily. What do you do?',
    options: [
      { text: 'Wait for the ambulance', correct: false, explanation: 'Severe bleeding can be fatal in minutes. You must act.' },
      { text: 'Apply direct pressure with a clean cloth', correct: true, explanation: 'Direct pressure is the most effective way to stop external bleeding.' },
      { text: 'Pour water on it', correct: false, explanation: 'Water will wash away clotting factors and won\'t stop bleeding.' },
      { text: 'Tie a tight rope around the neck', correct: false, explanation: 'Never tie anything around the neck. Tourniquets are for limbs only, and only if pressure fails.' },
    ]
  }
];

export const DecisionSimulator: React.FC = () => {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const scenario = SCENARIOS[currentScenario];
  const isAnswered = selectedOption !== null;

  const handleNext = () => {
    if (currentScenario < SCENARIOS.length - 1) {
      setCurrentScenario(prev => prev + 1);
      setSelectedOption(null);
    } else {
      setCurrentScenario(0);
      setSelectedOption(null);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">Decision Simulator</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base">
          Test your instincts in realistic emergency scenarios.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
        <div className="space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-500">Scenario {currentScenario + 1}</span>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">{scenario.title}</h3>
          <p className="text-slate-600 dark:text-slate-300">{scenario.desc}</p>
        </div>

        <div className="space-y-3">
          {scenario.options.map((opt, idx) => {
            let btnClass = "bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:border-amber-400 text-slate-700 dark:text-slate-300";
            let icon = null;

            if (isAnswered) {
              if (idx === selectedOption) {
                btnClass = opt.correct 
                  ? "bg-emerald-50 border-emerald-500 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-300"
                  : "bg-rose-50 border-rose-500 text-rose-800 dark:bg-rose-900/20 dark:text-rose-300";
                icon = opt.correct ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <XCircle className="w-5 h-5 text-rose-500" />;
              } else if (opt.correct) {
                btnClass = "bg-emerald-50/50 border-emerald-200 text-emerald-700 dark:bg-emerald-900/10 dark:border-emerald-800 dark:text-emerald-400 opacity-60";
              } else {
                btnClass = "bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 opacity-40";
              }
            }

            return (
              <button
                key={idx}
                onClick={() => !isAnswered && setSelectedOption(idx)}
                disabled={isAnswered}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between ${btnClass}`}
              >
                <span className="font-semibold text-sm">{opt.text}</span>
                {icon}
              </button>
            );
          })}
        </div>

        <AnimatePresence>
          {isAnswered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 space-y-3"
            >
              <div className="flex items-center space-x-2 text-amber-700 dark:text-amber-400 font-bold">
                <Bot className="w-5 h-5" />
                <span>AI Feedback</span>
              </div>
              <p className="text-sm text-amber-900 dark:text-amber-200">
                {scenario.options[selectedOption].explanation}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {isAnswered && (
          <div className="flex justify-end pt-4">
            <button
              onClick={handleNext}
              className="flex items-center space-x-2 px-6 py-3 rounded-xl font-bold text-sm bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 transition-all active:scale-95"
            >
              <span>{currentScenario < SCENARIOS.length - 1 ? 'Next Scenario' : 'Restart Simulator'}</span>
              <RefreshCw className={`w-4 h-4 ${currentScenario === SCENARIOS.length - 1 ? 'animate-spin-slow' : ''}`} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
