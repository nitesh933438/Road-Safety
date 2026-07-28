/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Clock, AlertTriangle, ShieldCheck } from 'lucide-react';

export const GoldenHourTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<number>(60 * 60);
  const [isActive, setIsActive] = useState<boolean>(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => Math.max(0, prev - 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progressPercent = ((60 * 60 - timeLeft) / (60 * 60)) * 100;

  let badgeColor = 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300';
  let statusText = 'Optimal Golden Window';

  if (timeLeft < 30 * 60) {
    badgeColor = 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300';
    statusText = 'Critical Window - Action Required';
  }
  if (timeLeft < 15 * 60) {
    badgeColor = 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300';
    statusText = 'Emergency Critical - 15 Mins Left';
  }

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Clock className="w-5 h-5 text-amber-500" />
          <h3 className="font-bold text-slate-900 dark:text-white text-base">Golden Hour Countdown</h3>
        </div>
        <span className={`text-xs font-bold px-3 py-1 rounded-full ${badgeColor}`}>
          {statusText}
        </span>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-2">
        <div className="text-center sm:text-left">
          <div className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-slate-900 dark:text-white">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Time remaining for maximum trauma survival rate (60 min window)
          </p>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => setIsActive(!isActive)}
            className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs hover:bg-slate-200 transition-colors"
          >
            {isActive ? 'Pause Timer' : 'Resume Timer'}
          </button>
          <button
            onClick={() => setTimeLeft(60 * 60)}
            className="px-4 py-2 rounded-xl bg-amber-500 text-white font-bold text-xs hover:bg-amber-600 transition-colors shadow-sm"
          >
            Reset 60m
          </button>
        </div>
      </div>

      <div className="w-full bg-slate-100 dark:bg-slate-800 h-3 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-1000 ${
            timeLeft < 900 ? 'bg-rose-600' : timeLeft < 1800 ? 'bg-amber-500' : 'bg-emerald-500'
          }`}
          style={{ width: `${Math.max(5, progressPercent)}%` }}
        ></div>
      </div>
    </div>
  );
};
