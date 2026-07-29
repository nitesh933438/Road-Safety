/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { Sun, CloudRain, CloudFog, Wind, Eye, Droplets, ShieldCheck, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const WeatherWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (widgetRef.current && !widgetRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={widgetRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="hidden lg:flex items-center space-x-2 px-2.5 py-1.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 bg-white/60 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all border border-slate-200/60 dark:border-slate-800 focus:outline-none"
        aria-label="Live Road Weather Widget"
      >
        <div className="flex items-center space-x-1 text-amber-500">
          <Sun className="w-4 h-4 animate-spin-slow" />
        </div>
        <div className="flex items-center space-x-1">
          <span className="font-extrabold text-slate-900 dark:text-white">28°C</span>
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-100 dark:bg-emerald-950 px-1.5 py-0.5 rounded">
            Safe Road
          </span>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-72 rounded-3xl glass border border-slate-200 dark:border-slate-800 shadow-2xl p-4 z-50 space-y-3"
          >
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
              <div className="flex items-center space-x-2">
                <Sun className="w-5 h-5 text-amber-500" />
                <div>
                  <h4 className="text-xs font-black text-slate-900 dark:text-white">Delhi NCR & NH-48 Sector</h4>
                  <p className="text-[10px] font-semibold text-slate-400">Live Telemetry • Updated 2 mins ago</p>
                </div>
              </div>
              <span className="text-xl font-black text-slate-900 dark:text-white">28°C</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 space-y-1">
                <div className="flex items-center space-x-1 text-slate-400">
                  <Eye className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-bold">Visibility</span>
                </div>
                <p className="font-extrabold text-slate-800 dark:text-slate-200">8.5 km (Optimal)</p>
              </div>

              <div className="p-2 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 space-y-1">
                <div className="flex items-center space-x-1 text-slate-400">
                  <Droplets className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-bold">Humidity</span>
                </div>
                <p className="font-extrabold text-slate-800 dark:text-slate-200">42% (Dry Track)</p>
              </div>

              <div className="p-2 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 space-y-1">
                <div className="flex items-center space-x-1 text-slate-400">
                  <Wind className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-bold">Wind Speed</span>
                </div>
                <p className="font-extrabold text-slate-800 dark:text-slate-200">12 km/h NE</p>
              </div>

              <div className="p-2 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 space-y-1">
                <div className="flex items-center space-x-1 text-slate-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-[10px] font-bold">Driving Index</span>
                </div>
                <p className="font-extrabold text-emerald-600 dark:text-emerald-400">LOW RISK (94/100)</p>
              </div>
            </div>

            <div className="p-2.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-900/60 flex items-start space-x-2 text-[11px]">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-amber-900 dark:text-amber-200 font-medium">
                <strong>Fog Advisory:</strong> Expect shallow haze on Yamuna Expressway during early morning hours (04:00 - 07:00 AM).
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
