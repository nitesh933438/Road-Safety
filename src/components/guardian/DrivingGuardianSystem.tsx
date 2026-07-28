/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Navigation,
  ShieldCheck,
  Play,
  History,
  Award,
  Radio,
  Sparkles,
  Zap
} from 'lucide-react';
import { StartTripCard } from './StartTripCard';
import { LiveDrivingDashboard } from './LiveDrivingDashboard';
import { EmergencyImpactCountdown } from './EmergencyImpactCountdown';
import { TripSummaryModal } from './TripSummaryModal';
import { TripHistoryAndRewards } from './TripHistoryAndRewards';
import {
  TripConfig,
  DrivingTelemetry,
  AiGuardianWarning,
  TripSummary,
  MOCK_TRIP_HISTORY
} from '../../data/drivingGuardianData';

export const DrivingGuardianSystem: React.FC = () => {
  const [currentView, setCurrentView] = useState<'SETUP' | 'LIVE_DRIVE' | 'HISTORY'>('SETUP');
  const [activeTripConfig, setActiveTripConfig] = useState<TripConfig | null>(null);

  // Crash Emergency Impact State
  const [isImpactEmergencyActive, setIsImpactEmergencyActive] = useState(false);

  // Trip Summary State
  const [tripSummaryData, setTripSummaryData] = useState<{
    telemetry: DrivingTelemetry;
    warningsHistory: AiGuardianWarning[];
  } | null>(null);

  // Trip History List
  const [tripHistory, setTripHistory] = useState<TripSummary[]>(MOCK_TRIP_HISTORY);

  const handleStartTrip = (config: TripConfig) => {
    setActiveTripConfig(config);
    setCurrentView('LIVE_DRIVE');
  };

  const handleEndTrip = (telemetry: DrivingTelemetry, warningsList: AiGuardianWarning[]) => {
    setTripSummaryData({
      telemetry,
      warningsHistory: warningsList,
    });
  };

  const handleSaveTripSummary = (newSummary: TripSummary) => {
    setTripHistory((prev) => [newSummary, ...prev]);
    setTripSummaryData(null);
    setCurrentView('HISTORY');
  };

  const handleTriggerImpactCrash = () => {
    setIsImpactEmergencyActive(true);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* NAVIGATION HEADER BANNER */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-800 space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-rose-500 font-black text-xs uppercase tracking-widest">
              <Radio className="w-4 h-4 text-rose-500 animate-pulse" />
              <span>AI Driving Guardian • Accident Prevention Engine</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black">
              AI Driving Guardian
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm font-medium max-w-2xl">
              Real-time driver telemetry, overspeed & hard braking detector, AI voice warnings, crash impact emergency auto-SOS, and safe driver rewards.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentView('SETUP')}
              className={`px-4 py-2.5 rounded-2xl font-black text-xs uppercase tracking-wider transition-all cursor-pointer ${
                currentView === 'SETUP'
                  ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
              }`}
            >
              Start New Trip
            </button>

            <button
              onClick={() => setCurrentView('HISTORY')}
              className={`px-4 py-2.5 rounded-2xl font-black text-xs uppercase tracking-wider transition-all cursor-pointer ${
                currentView === 'HISTORY'
                  ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
              }`}
            >
              Logbook & Badges
            </button>
          </div>
        </div>
      </div>

      {/* VIEW CONTROLLER */}
      {currentView === 'SETUP' && (
        <StartTripCard onStartTrip={handleStartTrip} />
      )}

      {currentView === 'LIVE_DRIVE' && activeTripConfig && (
        <LiveDrivingDashboard
          tripConfig={activeTripConfig}
          onEndTrip={handleEndTrip}
          onTriggerImpactCrash={handleTriggerImpactCrash}
        />
      )}

      {currentView === 'HISTORY' && (
        <TripHistoryAndRewards tripHistory={tripHistory} />
      )}

      {/* EMERGENCY IMPACT COUNTDOWN MODAL */}
      <AnimatePresence>
        {isImpactEmergencyActive && (
          <EmergencyImpactCountdown
            emergencyContact={activeTripConfig?.emergencyContact || '+91 98765 43210'}
            onCancel={() => setIsImpactEmergencyActive(false)}
            onTriggerSosConfirmed={() => {
              // Confirmed SOS action
            }}
          />
        )}
      </AnimatePresence>

      {/* TRIP SUMMARY MODAL */}
      <AnimatePresence>
        {tripSummaryData && activeTripConfig && (
          <TripSummaryModal
            telemetry={tripSummaryData.telemetry}
            warningsHistory={tripSummaryData.warningsHistory}
            destination={activeTripConfig.destination}
            onSaveTrip={handleSaveTripSummary}
            onClose={() => setTripSummaryData(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
