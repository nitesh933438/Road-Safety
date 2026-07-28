/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'framer-motion';
import {
  Award,
  CheckCircle2,
  TrendingUp,
  Fuel,
  Leaf,
  ShieldCheck,
  Zap,
  Sparkles,
  ArrowRight,
  Clock,
  Navigation
} from 'lucide-react';
import { DrivingTelemetry, AiGuardianWarning, TripSummary } from '../../data/drivingGuardianData';

interface TripSummaryModalProps {
  telemetry: DrivingTelemetry;
  warningsHistory: AiGuardianWarning[];
  destination: string;
  onSaveTrip: (summary: TripSummary) => void;
  onClose: () => void;
}

export const TripSummaryModal: React.FC<TripSummaryModalProps> = ({
  telemetry,
  warningsHistory,
  destination,
  onSaveTrip,
  onClose,
}) => {
  const getRank = (score: number) => {
    if (score >= 88) return 'Excellent';
    if (score >= 75) return 'Good';
    if (score >= 60) return 'Average';
    return 'Poor';
  };

  const rank = getRank(telemetry.safetyScore);
  const durationMins = Math.max(1, Math.round(telemetry.elapsedSeconds / 60));
  const xpEarned = Math.round(telemetry.safetyScore * 2.5);
  const fuelSaved = parseFloat((telemetry.distanceKm * 0.06).toFixed(1));
  const carbonSaved = parseFloat((telemetry.distanceKm * 0.14).toFixed(1));

  const handleSave = () => {
    const summary: TripSummary = {
      id: `trip-${Date.now()}`,
      date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      destination,
      distanceKm: telemetry.distanceKm,
      durationMinutes: durationMins,
      avgSpeedKmh: telemetry.averageSpeedKmh,
      maxSpeedKmh: telemetry.maxSpeedKmh,
      safetyScore: telemetry.safetyScore,
      scoreRank: rank,
      warningsCount: warningsHistory.length,
      blackSpotsCrossed: 2,
      mockFuelSavedLiters: fuelSaved,
      mockCarbonSavedKg: carbonSaved,
      xpEarned,
      aiSuggestions: [
        telemetry.overspeedEvents > 0
          ? 'Reduce speed in high-density corridors to avoid sudden braking.'
          : 'Flawless speed discipline maintained throughout route!',
        'Consistent tire throttle modulation saved ~0.4L fuel.',
      ],
    };

    onSaveTrip(summary);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="max-w-2xl w-full bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200/80 dark:border-slate-700/80 space-y-6 my-8"
      >
        <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-700/60 pb-4">
          <div className="flex items-center space-x-2 text-rose-600 dark:text-rose-400 font-black text-xs uppercase tracking-widest">
            <Sparkles className="w-4 h-4 text-rose-500" />
            <span>Smart AI Driving Summary</span>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 font-black text-xs">
            +{xpEarned} Driver XP Earned
          </span>
        </div>

        {/* HERO SCORE BANNER */}
        <div className="p-6 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Trip Safety Grade
            </span>
            <div className="flex items-baseline space-x-2 justify-center sm:justify-start">
              <span className="text-4xl font-black font-mono text-emerald-400">{telemetry.safetyScore}%</span>
              <span className="text-lg font-bold text-slate-300">({rank})</span>
            </div>
            <p className="text-xs text-slate-400 font-medium">Destination: {destination}</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800 border border-slate-700 text-center space-y-1">
            <Award className="w-8 h-8 text-yellow-400 mx-auto" />
            <span className="text-xs font-black text-white block">Golden Driver Level Up</span>
            <span className="text-[10px] text-slate-400">Top 5% Safe Commuters</span>
          </div>
        </div>

        {/* STATS GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 space-y-1 text-center">
            <span className="text-[10px] font-black uppercase text-slate-400 block">Distance</span>
            <span className="text-xl font-black text-slate-900 dark:text-white font-mono">
              {telemetry.distanceKm} <span className="text-xs">KM</span>
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 space-y-1 text-center">
            <span className="text-[10px] font-black uppercase text-slate-400 block">Duration</span>
            <span className="text-xl font-black text-slate-900 dark:text-white font-mono">
              {durationMins} <span className="text-xs">MINS</span>
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 space-y-1 text-center">
            <span className="text-[10px] font-black uppercase text-slate-400 block">Avg Speed</span>
            <span className="text-xl font-black text-slate-900 dark:text-white font-mono">
              {telemetry.averageSpeedKmh} <span className="text-xs">KM/H</span>
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 space-y-1 text-center">
            <span className="text-[10px] font-black uppercase text-slate-400 block">Warnings</span>
            <span className="text-xl font-black text-rose-600 dark:text-rose-400 font-mono">
              {warningsHistory.length}
            </span>
          </div>
        </div>

        {/* ECO & FUEL MOCK METRICS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 flex items-center space-x-3">
            <Fuel className="w-8 h-8 text-emerald-600 shrink-0" />
            <div>
              <span className="text-xs font-black text-emerald-900 dark:text-emerald-200 block">
                Fuel Saved: ~{fuelSaved} Liters
              </span>
              <span className="text-[10px] text-emerald-700 dark:text-emerald-400">
                Smooth throttle modulation reduced wasteful idling
              </span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 flex items-center space-x-3">
            <Leaf className="w-8 h-8 text-blue-600 shrink-0" />
            <div>
              <span className="text-xs font-black text-blue-900 dark:text-blue-200 block">
                Carbon Offset: ~{carbonSaved} kg CO₂
              </span>
              <span className="text-[10px] text-blue-700 dark:text-blue-400">
                Eco-friendly driving pattern rating
              </span>
            </div>
          </div>
        </div>

        {/* AI SUGGESTIONS */}
        <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-2">
          <span className="text-xs font-black uppercase text-indigo-400 flex items-center space-x-1">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>AI Safety Recommendations</span>
          </span>
          <ul className="space-y-1 text-xs text-slate-300 list-disc list-inside">
            <li>Maintain steady acceleration when entering high-traffic intersections.</li>
            <li>Maintain recommended headlight alignment in fog/night driving corridors.</li>
          </ul>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex items-center space-x-3 pt-2">
          <button
            onClick={handleSave}
            className="flex-1 py-4 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs uppercase tracking-widest shadow-xl shadow-rose-600/30 cursor-pointer flex items-center justify-center space-x-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Save Trip to History & Claim Rewards</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
