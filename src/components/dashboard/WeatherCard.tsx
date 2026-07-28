/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CloudSun, Wind, Droplets, Eye, Thermometer } from 'lucide-react';
import { motion } from 'framer-motion';

export const WeatherCard: React.FC = () => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="glass-card bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-indigo-500/10 dark:from-cyan-950/40 dark:via-slate-900/40 dark:to-indigo-950/20 border border-cyan-200/50 dark:border-cyan-800/50 rounded-[2rem] p-6 shadow-sm space-y-5 relative overflow-hidden"
    >
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-500/20 rounded-full blur-[30px] pointer-events-none" />
      
      <div className="flex items-center justify-between relative z-10">
        <div>
          <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">Highway Weather & Visibility</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Sector 4 National Highway Conditions</p>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/30">
          <CloudSun className="w-6 h-6 text-white" />
        </div>
      </div>

      <div className="flex items-center justify-between p-4 rounded-2xl bg-white/60 dark:bg-slate-800/60 border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-sm relative z-10 shadow-inner">
        <div>
          <span className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">28°C</span>
          <p className="text-xs font-bold text-slate-600 dark:text-slate-300 mt-1 uppercase tracking-wider">Clear & Dry Road</p>
        </div>
        <div className="text-right space-y-1.5">
          <span className="text-xs font-black text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/50 px-3 py-1.5 rounded-lg shadow-sm">
            OPTIMAL BRAKING
          </span>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">No Fog Warnings</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 relative z-10">
        <div className="p-3 rounded-2xl bg-white/50 dark:bg-slate-800/40 text-center border border-white/50 dark:border-slate-700/30">
          <Droplets className="w-5 h-5 text-blue-500 mx-auto mb-1.5" />
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Humidity</span>
          <span className="text-sm font-black text-slate-800 dark:text-slate-200">42%</span>
        </div>
        <div className="p-3 rounded-2xl bg-white/50 dark:bg-slate-800/40 text-center border border-white/50 dark:border-slate-700/30">
          <Wind className="w-5 h-5 text-teal-500 mx-auto mb-1.5" />
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Wind</span>
          <span className="text-sm font-black text-slate-800 dark:text-slate-200">12 km/h</span>
        </div>
        <div className="p-3 rounded-2xl bg-white/50 dark:bg-slate-800/40 text-center border border-white/50 dark:border-slate-700/30">
          <Eye className="w-5 h-5 text-amber-500 mx-auto mb-1.5" />
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Visibility</span>
          <span className="text-sm font-black text-slate-800 dark:text-slate-200">10 km</span>
        </div>
      </div>
    </motion.div>
  );
};
