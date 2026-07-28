/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MapPin, Navigation, PhoneCall, Star, Building2, Shield, HeartPulse, Droplets, Truck, AlertTriangle, Share2, Copy, Check, ExternalLink, CloudRain, Thermometer, Eye, Wind, Search, Plus
} from 'lucide-react';
import { EmergencyService, AccidentReport, BlackSpot } from '../../data/mapData';

interface MapFiltersProps {
  filters: {
    hospitals: boolean;
    trauma: boolean;
    police: boolean;
    ambulance: boolean;
    blood: boolean;
    fire?: boolean;
    petrol?: boolean;
    reports: boolean;
    blackSpots: boolean;
  };
  setFilters: React.Dispatch<React.SetStateAction<any>>;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  weather: {
    temp: string;
    rain: string;
    visibility: string;
    roadCondition: string;
  };
  onOpenReportModal: () => void;
  onOpenShareCard: () => void;
}

export const MapControlsOverlay: React.FC<MapFiltersProps> = ({
  filters, setFilters, searchQuery, setSearchQuery, weather, onOpenReportModal, onOpenShareCard
}) => {
  const toggleFilter = (key: string) => {
    setFilters((prev: any) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="absolute top-6 left-6 right-6 z-[1000] pointer-events-none flex flex-col lg:flex-row justify-between items-start gap-4">
      {/* Search & Filters Card */}
      <motion.div 
        initial={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="pointer-events-auto glass-card bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-3xl p-5 shadow-2xl max-w-lg w-full space-y-4"
      >
        <div className="flex items-center space-x-3">
          <div className="relative flex-1 group">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
            <input
              type="text"
              placeholder="Search hospital, city, highway, village, police station..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-200/60 dark:border-slate-700/60 bg-white/50 dark:bg-slate-800/50 pl-10 pr-4 py-3 text-sm font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:bg-white dark:focus:bg-slate-800 transition-all shadow-inner"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onOpenReportModal}
            className="flex items-center px-4 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-rose-500/30 whitespace-nowrap border border-rose-400/50"
          >
            <AlertTriangle className="w-4 h-4 mr-1.5" />
            Report Crash
          </motion.button>
        </div>

        {/* Filter Badges */}
        <div className="flex flex-wrap gap-2 pt-1">
          {[
            { key: 'hospitals', label: 'Hospitals', color: 'bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300 border-blue-200/50 dark:border-blue-800/50' },
            { key: 'trauma', label: 'Trauma', color: 'bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300 border-rose-200/50 dark:border-rose-800/50' },
            { key: 'police', label: 'Police', color: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950/80 dark:text-indigo-300 border-indigo-200/50 dark:border-indigo-800/50' },
            { key: 'ambulance', label: 'Ambulance', color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border-emerald-200/50 dark:border-emerald-800/50' },
            { key: 'blood', label: 'Blood Bank', color: 'bg-purple-100 text-purple-800 dark:bg-purple-950/80 dark:text-purple-300 border-purple-200/50 dark:border-purple-800/50' },
            { key: 'fire', label: 'Fire Station', color: 'bg-orange-100 text-orange-800 dark:bg-orange-950/80 dark:text-orange-300 border-orange-200/50 dark:border-orange-800/50' },
            { key: 'petrol', label: 'Petrol Pump', color: 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border-amber-200/50 dark:border-amber-800/50' },
            { key: 'reports', label: 'Crash Reports', color: 'bg-red-100 text-red-800 dark:bg-red-950/80 dark:text-red-300 border-red-200/50 dark:border-red-800/50' },
            { key: 'blackSpots', label: 'Black Spots', color: 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border-amber-200/50 dark:border-amber-800/50' },
          ].map((f) => {
            const isActive = filters[f.key as keyof typeof filters];
            return (
              <motion.button
                key={f.key}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleFilter(f.key)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all border ${
                  isActive
                    ? `${f.color} shadow-sm ring-1 ring-black/5 dark:ring-white/5`
                    : 'bg-white/40 dark:bg-slate-800/40 text-slate-500 dark:text-slate-400 border-slate-200/50 dark:border-slate-700/50 hover:bg-white/60 dark:hover:bg-slate-700/60'
                }`}
              >
                {f.label}
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Right Weather & Tools Card */}
      <motion.div 
        initial={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
        className="pointer-events-auto flex flex-col sm:flex-row items-end sm:items-center gap-3"
      >
        {/* Weather Badge */}
        <div className="glass-card bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-2xl px-5 py-3.5 shadow-xl flex items-center space-x-5 text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300">
          <div className="flex items-center space-x-2" title="Temperature">
            <Thermometer className="w-4 h-4 text-amber-500" />
            <span>{weather.temp}</span>
          </div>
          <div className="w-px h-4 bg-slate-200 dark:bg-slate-700"></div>
          <div className="flex items-center space-x-2" title="Rain">
            <CloudRain className="w-4 h-4 text-blue-500" />
            <span>{weather.rain}</span>
          </div>
          <div className="w-px h-4 bg-slate-200 dark:bg-slate-700"></div>
          <div className="flex items-center space-x-2" title="Visibility">
            <Eye className="w-4 h-4 text-emerald-500" />
            <span>{weather.visibility}</span>
          </div>
        </div>

        {/* Emergency Share Card Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onOpenShareCard}
          className="bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-2xl px-5 py-3.5 shadow-xl shadow-amber-500/20 font-black text-xs uppercase tracking-wider flex items-center space-x-2 border border-amber-400/50"
        >
          <Share2 className="w-4 h-4" />
          <span className="hidden sm:inline">Emergency Card</span>
        </motion.button>
      </motion.div>
    </div>
  );
};
