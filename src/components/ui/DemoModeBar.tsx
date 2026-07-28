/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Zap, Presentation, AlertTriangle, RefreshCw, X } from 'lucide-react';
import { useDemo } from '../../context/DemoContext';
import { motion, AnimatePresence } from 'framer-motion';

export const DemoModeBar: React.FC = () => {
  const { isDemoMode, toggleDemoMode, triggerSimulatedSOS, resetDemoData } = useDemo();
  const [collapsed, setCollapsed] = useState(false);

  if (!isDemoMode && collapsed) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end space-y-2 pointer-events-none">
      <AnimatePresence>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="pointer-events-auto p-3.5 rounded-2xl bg-slate-900/90 dark:bg-slate-950/95 text-white backdrop-blur-xl border border-indigo-500/30 shadow-2xl shadow-indigo-900/30 max-w-sm"
          >
            <div className="flex items-center justify-between gap-3 mb-2 pb-2 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-300 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Hackathon Demo Mode
                </span>
              </div>
              <button
                onClick={() => setCollapsed(true)}
                className="text-slate-400 hover:text-white transition-colors"
                title="Minimize Demo Panel"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-300 mb-3">
              Preloaded with simulated incidents, volunteer mesh & trauma hospital readiness. No backend required.
            </p>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={triggerSimulatedSOS}
                className="flex items-center justify-center space-x-1.5 px-3 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold transition-all shadow-md shadow-rose-900/30 active:scale-95"
              >
                <AlertTriangle className="w-3.5 h-3.5 animate-pulse" />
                <span>Simulate SOS</span>
              </button>

              <Link
                to="/presentation"
                className="flex items-center justify-center space-x-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold transition-all shadow-md active:scale-95"
              >
                <Presentation className="w-3.5 h-3.5" />
                <span>Pitch Mode</span>
              </Link>
            </div>

            <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-800/80 text-[11px] text-slate-400">
              <button
                onClick={resetDemoData}
                className="flex items-center space-x-1 hover:text-indigo-300 transition-colors"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset State</span>
              </button>

              <button
                onClick={toggleDemoMode}
                className="flex items-center space-x-1.5 font-medium text-amber-400 hover:text-amber-300 transition-colors"
              >
                <Zap className="w-3 h-3" />
                <span>Toggle Live Mode</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {collapsed && (
        <button
          onClick={() => setCollapsed(false)}
          className="pointer-events-auto flex items-center space-x-2 px-3.5 py-2 rounded-full bg-slate-900/90 text-white backdrop-blur-md border border-indigo-500/40 shadow-xl hover:bg-slate-800 transition-all active:scale-95 text-xs font-bold"
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Demo Controls</span>
        </button>
      )}
    </div>
  );
};
