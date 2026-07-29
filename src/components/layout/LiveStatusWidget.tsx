/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Radio, Activity, Navigation, Wifi, Server, Heart, Truck, Building2, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const LiveStatusWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [volunteersCount, setVolunteersCount] = useState(24);
  const [ambulancesCount, setAmbulancesCount] = useState(8);
  const [ping, setPing] = useState(12);

  const containerRef = useRef<HTMLDivElement>(null);

  // Monitor online status & simulate live heartbeat changes
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    const interval = setInterval(() => {
      // Small realistic fluctuate
      setVolunteersCount(prev => Math.max(18, prev + (Math.random() > 0.5 ? 1 : -1)));
      setAmbulancesCount(prev => Math.max(5, prev + (Math.random() > 0.7 ? 1 : -1)));
      setPing(10 + Math.floor(Math.random() * 6));
    }, 5000);

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(interval);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-2.5 py-1.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 bg-emerald-50/80 dark:bg-emerald-950/40 hover:bg-emerald-100/80 dark:hover:bg-emerald-900/60 transition-all border border-emerald-200/80 dark:border-emerald-800/80 focus:outline-none"
        aria-label="Live System Status Widget"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
        </span>
        <span className="hidden sm:inline font-extrabold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider text-[11px]">
          Live Network
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-80 rounded-3xl glass border border-slate-200 dark:border-slate-800 shadow-2xl p-4 z-50 space-y-3"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
              <div className="flex items-center space-x-2">
                <Radio className="w-4 h-4 text-emerald-500 animate-pulse" />
                <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">
                  Live System Dispatch Status
                </h4>
              </div>
              <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                ACTIVE
              </span>
            </div>

            {/* Metrics List */}
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
                <div className="flex items-center space-x-2">
                  <Heart className="w-4 h-4 text-rose-500" />
                  <span className="font-bold text-slate-700 dark:text-slate-300">🟢 Volunteers Nearby</span>
                </div>
                <span className="font-black text-slate-900 dark:text-white">{volunteersCount} Samaritan Squads</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
                <div className="flex items-center space-x-2">
                  <Truck className="w-4 h-4 text-sky-500" />
                  <span className="font-bold text-slate-700 dark:text-slate-300">🚑 Ambulances Ready</span>
                </div>
                <span className="font-black text-slate-900 dark:text-white">{ambulancesCount} Units (108/402)</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
                <div className="flex items-center space-x-2">
                  <Building2 className="w-4 h-4 text-indigo-500" />
                  <span className="font-bold text-slate-700 dark:text-slate-300">🏥 Hospitals Open</span>
                </div>
                <span className="font-black text-slate-900 dark:text-white">12 ERs (Level-1 Trauma)</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
                <div className="flex items-center space-x-2">
                  <ShieldAlert className="w-4 h-4 text-amber-500" />
                  <span className="font-bold text-slate-700 dark:text-slate-300">🚨 Active SOS Beacons</span>
                </div>
                <span className="font-black text-emerald-600 dark:text-emerald-400">0 Live Emergency</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
                <div className="flex items-center space-x-2">
                  <Navigation className="w-4 h-4 text-indigo-600" />
                  <span className="font-bold text-slate-700 dark:text-slate-300">📍 GPS Lock</span>
                </div>
                <span className="font-bold text-indigo-600 dark:text-indigo-400">High Precision (4m)</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
                <div className="flex items-center space-x-2">
                  <Wifi className="w-4 h-4 text-emerald-500" />
                  <span className="font-bold text-slate-700 dark:text-slate-300">🌐 Network Connection</span>
                </div>
                <span className={`font-black ${isOnline ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600'}`}>
                  {isOnline ? 'Online (Real-Time Sync)' : 'Offline (Local Queue)'}
                </span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
                <div className="flex items-center space-x-2">
                  <Server className="w-4 h-4 text-purple-500" />
                  <span className="font-bold text-slate-700 dark:text-slate-300">⚡ Command Cloud Server</span>
                </div>
                <span className="font-extrabold text-slate-800 dark:text-slate-200">Operational ({ping}ms)</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
