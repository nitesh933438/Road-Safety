import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, AlertOctagon, TrendingDown, ArrowRight } from 'lucide-react';

interface BlackSpot {
  id: number;
  name: string;
  lat: number;
  lng: number;
  risk: string;
  color: string;
  accidents: number;
  fatal: number;
  cause: string;
}

interface Props {
  spots: BlackSpot[];
  activeSpot: number | null;
  onSelectSpot: (id: number) => void;
}

export const SmartBlackSpots: React.FC<Props> = ({ spots, activeSpot, onSelectSpot }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-4 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-100 dark:border-slate-700">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center">
            <AlertOctagon className="w-5 h-5 text-rose-500 mr-2" />
            Active Black Spots
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">High-risk accident prone zones</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 pr-1">
        {spots.map((spot, idx) => (
          <motion.div
            key={spot.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            onClick={() => onSelectSpot(spot.id)}
            className={`cursor-pointer p-4 rounded-xl border transition-all duration-200 ${
              activeSpot === spot.id 
                ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 shadow-md ring-1 ring-indigo-500' 
                : 'border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600 bg-slate-50 dark:bg-slate-900/50'
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-bold text-slate-900 dark:text-white flex items-center">
                <MapPin className="w-4 h-4 text-slate-400 mr-1" /> {spot.name}
              </h4>
              <span className={`text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider ${
                spot.risk === 'Critical' ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-400' :
                spot.risk === 'High' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-400' :
                'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-400'
              }`}>
                {spot.risk}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-2 my-3 text-sm">
              <div className="bg-white dark:bg-slate-800 p-2 rounded border border-slate-100 dark:border-slate-700">
                <p className="text-xs text-slate-500 dark:text-slate-400">Total Accidents</p>
                <p className="font-bold text-slate-900 dark:text-white">{spot.accidents}</p>
              </div>
              <div className="bg-white dark:bg-slate-800 p-2 rounded border border-slate-100 dark:border-slate-700">
                <p className="text-xs text-slate-500 dark:text-slate-400">Fatalities</p>
                <p className="font-bold text-rose-600 dark:text-rose-400">{spot.fatal}</p>
              </div>
            </div>

            <div className="text-sm border-t border-slate-200 dark:border-slate-700 pt-2 mt-2">
              <p className="text-slate-600 dark:text-slate-300 mb-2">
                <span className="font-semibold text-slate-900 dark:text-white">Cause:</span> {spot.cause}
              </p>
              <div className="flex items-start mt-2 bg-emerald-50 dark:bg-emerald-900/10 p-2 rounded-lg text-emerald-800 dark:text-emerald-300">
                <TrendingDown className="w-4 h-4 mr-2 shrink-0 mt-0.5" />
                <span className="text-xs font-medium">Recommended: Install speed breakers and high-visibility signage.</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
