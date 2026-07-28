/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin, Navigation, PhoneCall, Star, Building2, Shield, HeartPulse, Droplets, Truck, AlertTriangle, Share2, Copy, Check, ExternalLink
} from 'lucide-react';
import { EmergencyService, AccidentReport } from '../../data/mapData';

interface ServicePopupProps {
  item: EmergencyService | AccidentReport;
  onNavigate: () => void;
  onClose: () => void;
}

export const ServicePopup: React.FC<ServicePopupProps> = ({ item, onNavigate, onClose }) => {
  const [copied, setCopied] = useState(false);
  const isService = 'phone' in item;

  const handleShare = () => {
    const text = isService
      ? `Emergency Service: ${item.name} (${(item as EmergencyService).phone}). Address: ${item.address}. GPS: ${item.lat}, ${item.lng}`
      : `Accident Report: ${item.accidentType} (${item.severity} Severity). Address: ${item.address}. GPS: ${item.lat}, ${item.lng}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="glass-card bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl border border-slate-200/50 dark:border-slate-700/50 rounded-3xl p-5 shadow-2xl max-w-sm w-full space-y-4 text-left origin-bottom-left"
      >
        <div className="flex items-start justify-between">
          <div>
            <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg border ${
              isService ? 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-900' : 
              'bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-900'
            }`}>
              {isService ? (item as EmergencyService).type.toUpperCase() : `Accident (${(item as AccidentReport).severity})`}
            </span>
            <h4 className="font-black text-slate-900 dark:text-white text-lg mt-2 leading-tight">{isService ? (item as EmergencyService).name : "Accident Details"}</h4>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">{item.address}</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full bg-slate-100/50 dark:bg-slate-800/50 text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">×</button>
        </div>

        {isService ? (
          <div className="space-y-2.5">
            {/* Status & Rating Bar */}
            <div className="flex items-center justify-between text-xs bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-200/60 dark:border-slate-700/60">
              <div className="flex items-center space-x-2">
                <span className="flex items-center space-x-1 font-black text-amber-500">
                  <Star className="w-3.5 h-3.5 fill-amber-500" />
                  <span>{(item as EmergencyService).rating}</span>
                </span>
                <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600" />
                <span className="font-bold text-slate-700 dark:text-slate-200">{(item as EmergencyService).distance} away</span>
              </div>
              <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-300/40">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>{(item as EmergencyService).status}</span>
              </span>
            </div>

            {/* Phone & Info */}
            <div className="p-3 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30 text-xs space-y-1.5">
              <div className="flex items-center justify-between text-slate-700 dark:text-slate-300">
                <span className="font-semibold text-slate-500 dark:text-slate-400">Phone:</span>
                <a href={`tel:${(item as EmergencyService).phone}`} className="font-mono font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center space-x-1">
                  <PhoneCall className="w-3 h-3 inline mr-1" />
                  <span>{(item as EmergencyService).phone}</span>
                </a>
              </div>
              <div className="flex items-center justify-between text-slate-700 dark:text-slate-300">
                <span className="font-semibold text-slate-500 dark:text-slate-400">Info:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400 truncate max-w-[180px]">{(item as EmergencyService).info}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-2xl bg-rose-50/50 dark:bg-rose-900/10 border border-rose-100 dark:border-rose-900/30 text-xs space-y-2">
            <p className="text-slate-700 dark:text-slate-300 font-medium"><strong>Type:</strong> {(item as AccidentReport).accidentType}</p>
            <p className="text-slate-700 dark:text-slate-300"><strong>Injured:</strong> {(item as AccidentReport).injuredCount} | <strong>Vehicle:</strong> {(item as AccidentReport).vehicleType}</p>
            <p className="text-slate-500 italic mt-2 border-t border-rose-100 dark:border-rose-900/30 pt-2">{(item as AccidentReport).description}</p>
          </div>
        )}

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-2">
            {isService && (
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={`tel:${(item as EmergencyService).phone}`}
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black shadow-lg shadow-emerald-500/30 uppercase tracking-wider transition-all"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Call</span>
              </motion.a>
            )}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onNavigate}
              className={`inline-flex items-center space-x-2 px-4 py-2 rounded-xl text-white text-xs font-black shadow-lg uppercase tracking-wider transition-all ${
                isService ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/30' : 'bg-rose-600 hover:bg-rose-700 shadow-rose-500/30 w-full justify-center'
              }`}
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Navigate</span>
            </motion.button>
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleShare}
            className="p-2.5 rounded-xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 transition-all shadow-sm"
            title="Share Location"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
          </motion.button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
