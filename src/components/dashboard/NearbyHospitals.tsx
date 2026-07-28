/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Building2, Star, Navigation, PhoneCall, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

export const NearbyHospitals: React.FC = () => {
  const hospitals = [
    {
      name: 'City Apex Trauma Center',
      distance: '2.4 km away',
      rating: 4.9,
      beds: '14 Trauma ICU Beds Available',
      phone: '+91 98765 43210',
      address: 'NH-48 Sector 12 Junction',
    },
    {
      name: 'LifeLine Emergency Hospital',
      distance: '4.1 km away',
      rating: 4.8,
      beds: '8 Trauma ICU Beds Available',
      phone: '+91 98765 43211',
      address: 'Ring Road Bypass Near Gate 4',
    },
    {
      name: 'Metro General Medical Institute',
      distance: '6.8 km away',
      rating: 4.7,
      beds: '22 Trauma ICU Beds Available',
      phone: '+91 98765 43212',
      address: 'Central Highway Corridor',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } }
  } as const;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-card bg-gradient-to-br from-blue-500/5 via-slate-900/5 to-emerald-500/5 dark:from-blue-950/20 dark:via-slate-900/40 dark:to-emerald-950/20 border border-blue-200/30 dark:border-slate-800/50 rounded-[2rem] p-6 shadow-sm space-y-6 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 rounded-full blur-[40px] pointer-events-none" />
      
      <div className="flex items-center justify-between relative z-10">
        <div>
          <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Nearby Trauma Care Hospitals</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">Live bed availability & telemetry</p>
        </div>
        <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center border border-blue-200 dark:border-blue-800/50 shadow-inner">
          <Building2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </div>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4 relative z-10"
      >
        {hospitals.map((hosp, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            className="p-5 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 bg-white/60 dark:bg-slate-800/40 backdrop-blur-sm space-y-4 hover:bg-white/80 dark:hover:bg-slate-800/60 transition-colors shadow-sm group"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div>
                <h4 className="font-black text-slate-900 dark:text-white text-base leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{hosp.name}</h4>
                <div className="flex items-center space-x-3 mt-1.5">
                  <span className="flex items-center space-x-1 text-xs font-bold text-amber-500 bg-amber-50 dark:bg-amber-950/50 px-2 py-0.5 rounded-md border border-amber-100 dark:border-amber-900/50">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{hosp.rating}</span>
                  </span>
                  <span className="text-xs text-slate-400">•</span>
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-300">{hosp.distance}</span>
                </div>
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/50 px-3 py-1.5 rounded-lg shadow-sm whitespace-nowrap">
                {hosp.beds}
              </span>
            </div>

            <div className="flex items-center space-x-2 text-xs font-medium text-slate-500">
              <MapPin className="w-4 h-4 text-slate-400" />
              <span>{hosp.address}</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-3 border-t border-slate-200/50 dark:border-slate-700/50 gap-3">
              <a
                href={`tel:${hosp.phone}`}
                className="flex flex-1 items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-500/20 transition-all active:scale-95"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Call Hospital</span>
              </a>
              <button
                onClick={() => alert(`Navigating to ${hosp.name}... GPS route activated.`)}
                className="flex flex-1 items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all active:scale-95"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Navigate Route</span>
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};
