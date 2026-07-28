/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { GoldenHourTimer } from '../components/sos/GoldenHourTimer';
import { GpsLocationCard } from '../components/sos/GpsLocationCard';
import { FirstActionsChecklist } from '../components/sos/FirstActionsChecklist';
import { VoiceGuidanceCard } from '../components/sos/VoiceGuidanceCard';
import { NearbyServicesCard } from '../components/sos/NearbyServicesCard';
import { EmergencyContactsManager } from '../components/sos/EmergencyContactsManager';
import { GoodSamaritanBanner } from '../components/sos/GoodSamaritanBanner';
import { SeveritySelector } from '../components/sos/SeveritySelector';
import { ShieldAlert, PhoneCall, CheckCircle2, AlertTriangle, WifiOff, ArrowLeft, Radio } from 'lucide-react';
import { Link } from 'react-router-dom';

export const SosEmergencyPage: React.FC = () => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [sosActivated, setSosActivated] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleTriggerSos = () => {
    setConfirmModalOpen(false);
    setSosActivated(true);
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Navigation / Back link */}
        <div className="flex items-center justify-between">
          <Link
            to="/dashboard"
            className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Dashboard</span>
          </Link>

          <Link
            to="/command-center"
            className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-extrabold text-xs shadow-md hover:bg-rose-600 dark:hover:bg-rose-600 dark:hover:text-white transition-colors"
          >
            <Radio className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
            <span>AI Command Center</span>
          </Link>

          <Link
            to="/emergency-report"
            className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-xl bg-rose-600 text-white font-extrabold text-xs shadow-md hover:bg-rose-700 transition-colors"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>File Detailed Emergency Report</span>
          </Link>

          {!isOnline && (
            <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 text-xs font-bold animate-pulse">
              <WifiOff className="w-3.5 h-3.5" />
              <span>Offline Mode Active - Emergency Guides Cached Locally</span>
            </div>
          )}
        </div>

        {/* SOS Header & Main Action */}
        <div className="bg-gradient-to-r from-rose-600 via-rose-700 to-red-700 text-white rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="space-y-4 max-w-xl text-center md:text-left">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider">
              <ShieldAlert className="w-4 h-4" />
              <span>Golden Hour Emergency SOS Hub</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
              Instant Highway SOS & Medical Dispatch
            </h1>
            <p className="text-sm text-rose-100 leading-relaxed">
              Activate emergency telemetry to instantly broadcast your exact GPS coordinates to 108 dispatch, nearby traffic police, and 1,420 registered volunteers within a 2km radius.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <button
              onClick={() => setConfirmModalOpen(true)}
              className="w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-white text-rose-600 font-black text-xl sm:text-2xl shadow-2xl hover:scale-105 active:scale-95 transition-transform flex flex-col items-center justify-center border-8 border-rose-400/40 animate-pulse cursor-pointer group"
            >
              <ShieldAlert className="w-12 h-12 mb-1 group-hover:rotate-12 transition-transform" />
              <span>SOS</span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-rose-500">Tap to Send</span>
            </button>
          </div>
        </div>

        {/* Success Screen Banner if SOS is Activated */}
        {sosActivated && (
          <div className="bg-emerald-600 text-white rounded-2xl p-6 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 animate-fadeIn">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-black">SOS EMERGENCY BEACON BROADCASTED SUCCESSFUL</h3>
                <p className="text-xs text-emerald-100">Ambulance 108 and 4 nearby volunteers are en route to your GPS location.</p>
              </div>
            </div>
            <button
              onClick={() => setSosActivated(false)}
              className="px-5 py-2.5 rounded-xl bg-white text-emerald-700 font-bold text-xs uppercase tracking-wider hover:bg-slate-100 transition-colors shadow-md"
            >
              Dismiss Notice
            </button>
          </div>
        )}

        {/* Confirmation Modal */}
        {confirmModalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 max-w-md w-full shadow-2xl space-y-6 text-center">
              <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-600 dark:bg-rose-950 flex items-center justify-center mx-auto animate-bounce">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-black text-slate-900 dark:text-white">Confirm SOS Dispatch</h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  Are you sure you want to broadcast an emergency SOS beacon to municipal 108 ambulance dispatch and nearby volunteers?
                </p>
              </div>
              <div className="flex space-x-3 pt-2">
                <button
                  onClick={() => setConfirmModalOpen(false)}
                  className="flex-1 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleTriggerSos}
                  className="flex-1 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-lg shadow-rose-600/30"
                >
                  YES, SEND SOS NOW
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Grid Layout for Module Components */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <GoldenHourTimer />
            <FirstActionsChecklist />
            <NearbyServicesCard />
          </div>

          <div className="space-y-6">
            <GpsLocationCard />
            <SeveritySelector />
            <VoiceGuidanceCard />
            <EmergencyContactsManager />
          </div>
        </div>

        {/* Good Samaritan Banner */}
        <GoodSamaritanBanner />
      </div>
    </div>
  );
};
