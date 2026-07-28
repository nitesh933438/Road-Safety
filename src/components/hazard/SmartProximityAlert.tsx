/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Volume2,
  VolumeX,
  AlertTriangle,
  Navigation,
  ShieldAlert,
  Radio,
  Check,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { RoadHazard } from '../../data/roadHazardData';

interface SmartProximityAlertProps {
  hazards: RoadHazard[];
  onSelectHazard?: (hazard: RoadHazard) => void;
}

export const SmartProximityAlert: React.FC<SmartProximityAlertProps> = ({
  hazards,
  onSelectHazard,
}) => {
  const [isDriveMode, setIsDriveMode] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [nearbyAlert, setNearbyAlert] = useState<{
    hazard: RoadHazard;
    distanceMeters: number;
  } | null>(null);

  useEffect(() => {
    let interval: any = null;

    if (isDriveMode) {
      // Pick a random critical or high hazard to simulate driving towards
      const criticals = hazards.filter((h) => h.severity === 'Critical' || h.severity === 'High');
      const target = criticals.length > 0 ? criticals[0] : hazards[0];

      if (target) {
        setNearbyAlert({
          hazard: target,
          distanceMeters: 140,
        });

        if (soundEnabled) {
          playAudioBeep();
        }
      }

      interval = setInterval(() => {
        setNearbyAlert((prev) => {
          if (!prev) return null;
          const newDist = Math.max(20, prev.distanceMeters - 20);
          return { ...prev, distanceMeters: newDist };
        });
      }, 2000);
    } else {
      setNearbyAlert(null);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isDriveMode, hazards, soundEnabled]);

  const playAudioBeep = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(880, audioCtx.currentTime); // A5 note
      gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.25);
    } catch (e) {
      // Audio context policy fallback
    }
  };

  return (
    <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-2xl border border-rose-500/40 space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-rose-600/30 border border-rose-500/50 text-rose-500 flex items-center justify-center font-black">
            <Radio className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="font-extrabold text-base">Smart AI Proximity Hazard Radar</h3>
            <p className="text-xs text-slate-400">
              Real-time driver alert system scanning 200m radius for potholes, floods & manholes
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3 w-full sm:w-auto justify-between sm:justify-end">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2.5 rounded-2xl border transition-all cursor-pointer ${
              soundEnabled
                ? 'bg-rose-950/80 border-rose-700 text-rose-400'
                : 'bg-slate-800 border-slate-700 text-slate-400'
            }`}
            title="Toggle Audio Notification Chime"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setIsDriveMode(!isDriveMode)}
            className={`px-5 py-2.5 rounded-2xl font-black text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center space-x-2 ${
              isDriveMode
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/40 animate-pulse'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Navigation className="w-4 h-4" />
            <span>{isDriveMode ? 'Radar Scanning Active' : 'Start Driver Radar Mode'}</span>
          </button>
        </div>
      </div>

      {/* PROXIMITY ALERT BANNER */}
      <AnimatePresence>
        {nearbyAlert && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="p-5 rounded-2xl bg-gradient-to-r from-rose-950 via-slate-900 to-rose-950 border-2 border-rose-500 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl"
          >
            <div className="flex items-start space-x-3">
              <div className="p-3 rounded-2xl bg-rose-600 text-white animate-bounce shrink-0 mt-0.5">
                <AlertTriangle className="w-6 h-6" />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-rose-400 block">
                  ⚠️ WARNING! HIGH RISK ROAD HAZARD AHEAD ({nearbyAlert.distanceMeters} METERS)
                </span>
                <h4 className="text-lg font-black text-white">
                  {nearbyAlert.hazard.type}: {nearbyAlert.hazard.title}
                </h4>
                <p className="text-xs text-slate-300 font-medium">
                  Location: {nearbyAlert.hazard.address} • Action: {nearbyAlert.hazard.aiAnalysis.suggestedAction}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2 w-full md:w-auto">
              {onSelectHazard && (
                <button
                  onClick={() => onSelectHazard(nearbyAlert.hazard)}
                  className="px-4 py-2.5 rounded-xl bg-white text-slate-900 font-extrabold text-xs hover:bg-rose-600 hover:text-white transition-colors cursor-pointer"
                >
                  Inspect Hazard
                </button>
              )}
              <button
                onClick={() => setNearbyAlert(null)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs hover:bg-slate-700 transition-colors cursor-pointer"
              >
                Acknowledge
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
