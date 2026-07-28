/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, ChevronDown, ChevronUp, Info, Navigation, Shield, HeartPulse, AlertTriangle, Radio } from 'lucide-react';

interface MapLegendProps {
  className?: string;
  defaultOpen?: boolean;
}

export const MapLegend: React.FC<MapLegendProps> = ({
  className = '',
  defaultOpen = true
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const legendItems = [
    {
      label: 'Your Live GPS',
      icon: <div className="w-3.5 h-3.5 rounded-full bg-blue-500 border-2 border-white dark:border-slate-900 shadow-sm animate-pulse" />,
      desc: 'Real-time location stream'
    },
    {
      label: 'Trauma & Hospitals',
      icon: <div className="w-3.5 h-3.5 rounded-full bg-rose-600 text-white flex items-center justify-center text-[8px] font-bold">🏥</div>,
      desc: 'Level-1 Trauma & Emergency Wards'
    },
    {
      label: 'Police Posts',
      icon: <div className="w-3.5 h-3.5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[8px] font-bold">🚓</div>,
      desc: 'Highway Patrols & Control Units'
    },
    {
      label: 'Ambulance Hubs',
      icon: <div className="w-3.5 h-3.5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[8px] font-bold">🚑</div>,
      desc: '24/7 ALS Emergency Dispatch'
    },
    {
      label: 'Blood Banks',
      icon: <div className="w-3.5 h-3.5 rounded-full bg-purple-600 text-white flex items-center justify-center text-[8px] font-bold">🩸</div>,
      desc: 'Rare & Universal Donors'
    },
    {
      label: 'Fire Stations',
      icon: <div className="w-3.5 h-3.5 rounded-full bg-orange-600 text-white flex items-center justify-center text-[8px] font-bold">🚒</div>,
      desc: 'Heavy Rescue & Rescue Tenders'
    },
    {
      label: 'Petrol Pumps',
      icon: <div className="w-3.5 h-3.5 rounded-full bg-amber-600 text-white flex items-center justify-center text-[8px] font-bold">⛽</div>,
      desc: '24/7 Fuel & EV Fast Chargers'
    },
    {
      label: 'Accident Crash Reports',
      icon: <div className="w-3.5 h-3.5 rounded-full bg-red-600 text-white flex items-center justify-center text-[8px] font-bold">🚨</div>,
      desc: 'Live Community & AI Dispatches'
    },
    {
      label: 'Black Spot Zones',
      icon: (
        <div className="flex space-x-0.5">
          <span className="w-2 h-2 rounded-full bg-red-600" />
          <span className="w-2 h-2 rounded-full bg-orange-500" />
          <span className="w-2 h-2 rounded-full bg-amber-400" />
        </div>
      ),
      desc: 'High accident risk corridors'
    }
  ];

  return (
    <div className={`pointer-events-auto ${className}`}>
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/60 dark:border-slate-800/80 rounded-2xl shadow-xl overflow-hidden transition-all">
        {/* Header Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-2.5 flex items-center justify-between space-x-3 text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 hover:bg-slate-100/50 dark:hover:bg-slate-800/50 transition-colors"
        >
          <div className="flex items-center space-x-2">
            <Layers className="w-4 h-4 text-emerald-500" />
            <span>Map Legend & Layers</span>
          </div>
          {isOpen ? (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {/* Legend Contents */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="px-4 pb-3 pt-1 space-y-2 border-t border-slate-100 dark:border-slate-800/60"
            >
              <div className="grid grid-cols-1 gap-1.5 text-xs">
                {legendItems.map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-2.5 py-0.5">
                    <div className="w-5 flex justify-center shrink-0">{item.icon}</div>
                    <div className="flex-1 min-w-0">
                      <span className="font-semibold text-slate-800 dark:text-slate-200 truncate block text-[11px]">
                        {item.label}
                      </span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 truncate block">
                        {item.desc}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
