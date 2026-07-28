/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  Minus,
  Navigation,
  Compass,
  Layers,
  RefreshCw,
  AlertTriangle,
  LocateFixed,
  Eye,
  Sun,
  Moon
} from 'lucide-react';

interface MapControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onRecenter: () => void;
  onRefreshGps: () => void;
  isLocating?: boolean;
  gpsStatus?: 'loading' | 'active' | 'denied' | 'error';
  isFollowing?: boolean;
  onToggleFollow?: () => void;
  mapStyle?: 'light' | 'dark';
  onToggleStyle?: () => void;
  onOpenReportModal?: () => void;
}

export const MapControls: React.FC<MapControlsProps> = ({
  onZoomIn,
  onZoomOut,
  onRecenter,
  onRefreshGps,
  isLocating = false,
  gpsStatus = 'active',
  isFollowing = false,
  onToggleFollow,
  mapStyle = 'dark',
  onToggleStyle,
  onOpenReportModal
}) => {
  return (
    <div className="absolute bottom-6 right-6 z-[1000] flex flex-col items-end gap-3 pointer-events-auto">
      {/* Quick Report SOS Button on Mobile/Tablet */}
      {onOpenReportModal && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onOpenReportModal}
          className="flex items-center space-x-2 px-4 py-3 bg-gradient-to-r from-rose-600 to-red-600 text-white rounded-2xl shadow-xl shadow-rose-600/30 font-black text-xs uppercase tracking-wider border border-rose-400/40 hover:brightness-110 transition-all sm:hidden"
          title="Report Emergency Crash"
        >
          <AlertTriangle className="w-4 h-4" />
          <span>Report Crash</span>
        </motion.button>
      )}

      {/* Control Stack Card */}
      <div className="flex flex-col bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/60 dark:border-slate-800/80 rounded-2xl shadow-2xl p-1.5 space-y-1">
        {/* Re-center / Locate GPS Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.92 }}
          onClick={onRecenter}
          disabled={isLocating}
          className={`relative min-w-[44px] min-h-[44px] w-11 h-11 rounded-xl flex items-center justify-center transition-all ${
            gpsStatus === 'active'
              ? 'bg-blue-500 text-white shadow-md shadow-blue-500/30 hover:bg-blue-600'
              : gpsStatus === 'denied'
              ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400 hover:bg-amber-200'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
          title={
            gpsStatus === 'denied'
              ? 'GPS Permission Denied - Click to retry'
              : 'Re-center to my live GPS location'
          }
        >
          <Navigation className={`w-5 h-5 ${isLocating ? 'animate-spin' : ''}`} />
          {gpsStatus === 'active' && (
            <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-white dark:border-slate-900" />
          )}
        </motion.button>

        {/* Refresh GPS Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.92 }}
          onClick={onRefreshGps}
          disabled={isLocating}
          className="min-w-[44px] min-h-[44px] w-11 h-11 rounded-xl flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="Refresh GPS Signal"
        >
          <RefreshCw className={`w-4 h-4 ${isLocating ? 'animate-spin text-blue-500' : ''}`} />
        </motion.button>

        {/* Toggle Auto-Follow Mode */}
        {onToggleFollow && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
            onClick={onToggleFollow}
            className={`min-w-[44px] min-h-[44px] w-11 h-11 rounded-xl flex items-center justify-center transition-all ${
              isFollowing
                ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30'
                : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
            title={isFollowing ? 'Auto-Follow Enabled' : 'Enable Auto-Follow Mode'}
          >
            <LocateFixed className="w-4 h-4" />
          </motion.button>
        )}

        <div className="w-8 h-px bg-slate-200 dark:bg-slate-800 mx-auto" />

        {/* Map Style Toggle (Light / Dark) */}
        {onToggleStyle && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
            onClick={onToggleStyle}
            className="min-w-[44px] min-h-[44px] w-11 h-11 rounded-xl flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={`Switch to ${mapStyle === 'dark' ? 'Light' : 'Dark'} Map Tiles`}
          >
            {mapStyle === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-500" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-500" />
            )}
          </motion.button>
        )}

        <div className="w-8 h-px bg-slate-200 dark:bg-slate-800 mx-auto" />

        {/* Zoom In */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.92 }}
          onClick={onZoomIn}
          className="min-w-[44px] min-h-[44px] w-11 h-11 rounded-xl flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="Zoom In"
        >
          <Plus className="w-5 h-5" />
        </motion.button>

        {/* Zoom Out */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.92 }}
          onClick={onZoomOut}
          className="min-w-[44px] min-h-[44px] w-11 h-11 rounded-xl flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="Zoom Out"
        >
          <Minus className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
};
