/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Gauge,
  Zap,
  Navigation,
  Clock,
  ShieldAlert,
  Volume2,
  VolumeX,
  AlertTriangle,
  Square,
  Sparkles,
  School,
  CloudFog,
  CloudRain,
  Moon,
  Activity,
  Octagon
} from 'lucide-react';
import {
  TripConfig,
  DrivingTelemetry,
  AiGuardianWarning,
  HazardZoneType
} from '../../data/drivingGuardianData';

interface LiveDrivingDashboardProps {
  tripConfig: TripConfig;
  onEndTrip: (telemetry: DrivingTelemetry, warningsList: AiGuardianWarning[]) => void;
  onTriggerImpactCrash: () => void;
}

export const LiveDrivingDashboard: React.FC<LiveDrivingDashboardProps> = ({
  tripConfig,
  onEndTrip,
  onTriggerImpactCrash,
}) => {
  const [speed, setSpeed] = useState<number>(45);
  const [avgSpeed, setAvgSpeed] = useState<number>(42);
  const [maxSpeed, setMaxSpeed] = useState<number>(58);
  const [distanceKm, setDistanceKm] = useState<number>(2.4);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(180);
  const [safetyScore, setSafetyScore] = useState<number>(96);
  const [overspeedCount, setOverspeedCount] = useState<number>(0);
  const [hardBrakingCount, setHardBrakingCount] = useState<number>(0);
  const [sharpTurnCount, setSharpTurnCount] = useState<number>(0);

  const [voiceAlertsEnabled, setVoiceAlertsEnabled] = useState<boolean>(true);
  const [activeWarnings, setActiveWarnings] = useState<AiGuardianWarning[]>([]);
  const [allWarningsHistory, setAllWarningsHistory] = useState<AiGuardianWarning[]>([]);

  // Trip Timer Loop
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
      setDistanceKm((prev) => parseFloat((prev + speed / 3600).toFixed(2)));
    }, 1000);

    return () => clearInterval(timer);
  }, [speed]);

  // Speech Synthesis Helper
  const speakVoiceMessage = (text: string) => {
    if (!voiceAlertsEnabled || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel(); // Stop prior audio
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.1;
      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn('Speech synthesis error:', err);
    }
  };

  // Mobile Vibration Helper
  const triggerMobileVibration = () => {
    if ('vibrate' in navigator) {
      navigator.vibrate([200, 100, 200]);
    }
  };

  // Helper to Push Warning
  const addWarning = (
    type: HazardZoneType,
    title: string,
    message: string,
    voiceText: string,
    severity: 'CRITICAL' | 'WARNING' | 'INFO',
    iconName: string
  ) => {
    const newWarn: AiGuardianWarning = {
      id: `warn-${Date.now()}`,
      type,
      title,
      message,
      voiceText,
      severity,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      iconName,
    };

    setActiveWarnings((prev) => [newWarn, ...prev]);
    setAllWarningsHistory((prev) => [newWarn, ...prev]);

    // Play Voice Alert & Mobile Vibration
    speakVoiceMessage(voiceText);
    triggerMobileVibration();

    // Auto dismiss active toast after 6s
    setTimeout(() => {
      setActiveWarnings((prev) => prev.filter((w) => w.id !== newWarn.id));
    }, 6000);
  };

  // SIMULATED HAZARD TRIGGERS
  const handleSimulateOverspeed = () => {
    const newSpeed = 85;
    setSpeed(newSpeed);
    if (newSpeed > maxSpeed) setMaxSpeed(newSpeed);
    setOverspeedCount((prev) => prev + 1);
    setSafetyScore((prev) => Math.max(30, prev - 8));

    addWarning(
      'Overspeeding',
      'SPEED LIMIT EXCEEDED (85 KM/H)',
      'Speed limit on this sector is 60 km/h. Please slow down immediately to prevent accidents.',
      'Warning. Overspeeding detected. Please slow down immediately.',
      'CRITICAL',
      'Zap'
    );
  };

  const handleSimulateHardBraking = () => {
    setSpeed(12);
    setHardBrakingCount((prev) => prev + 1);
    setSafetyScore((prev) => Math.max(30, prev - 6));

    addWarning(
      'Sudden Braking',
      'HARD BRAKING DETECTED (-30 KM/H)',
      'Abrupt deceleration detected. Keep safe braking distance from vehicles ahead.',
      'Hard braking detected. Maintain safe tailing distance.',
      'WARNING',
      'Activity'
    );
  };

  const handleSimulateSchoolZone = () => {
    setSpeed(30);
    addWarning(
      'School Zone',
      'SCHOOL ZONE AHEAD (SPEED LIMIT 25 KM/H)',
      'Children crossing corridor. Maintain maximum vigilance and low speed.',
      'School Zone Ahead. Slow down for children crossing.',
      'WARNING',
      'School'
    );
  };

  const handleSimulateBlackspot = () => {
    addWarning(
      'High Accident Blackspot',
      'HIGH ACCIDENT PRONE BLACKSPOT',
      '14 severe collisions logged at this intersection in 2025. Exercise extreme caution.',
      'Accident Prone Area. Drive with extreme caution.',
      'CRITICAL',
      'Octagon'
    );
  };

  const handleSimulateFogRain = () => {
    addWarning(
      'Dense Fog Zone',
      'HEAVY FOG & LOW VISIBILITY ZONE',
      'Visibility under 50 meters. Turn on fog lights and reduce speed to under 40 km/h.',
      'Heavy Fog Ahead. Turn on fog lights and reduce speed.',
      'WARNING',
      'CloudFog'
    );
  };

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleFinishTrip = () => {
    const telemetry: DrivingTelemetry = {
      currentSpeedKmh: speed,
      averageSpeedKmh: avgSpeed,
      maxSpeedKmh: maxSpeed,
      distanceKm,
      elapsedSeconds,
      estimatedEtaMinutes: Math.max(1, Math.round(18 - distanceKm * 0.5)),
      safetyScore,
      overspeedEvents: overspeedCount,
      hardBrakingEvents: hardBrakingCount,
      sharpTurnEvents: sharpTurnCount,
    };

    onEndTrip(telemetry, allWarningsHistory);
  };

  return (
    <div className="space-y-6">
      {/* HEADER & TRIP META */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-2xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-black uppercase text-rose-400 tracking-widest flex items-center space-x-1">
            <Sparkles className="w-3.5 h-3.5 text-rose-400 animate-spin" />
            <span>AI Guardian Live Driving Mode</span>
          </span>
          <h2 className="text-xl sm:text-2xl font-black">
            En Route to: {tripConfig.destination}
          </h2>
          <p className="text-xs text-slate-400 font-medium">
            Origin: {tripConfig.currentLocation} • Vehicle: {tripConfig.vehicleType}
          </p>
        </div>

        <div className="flex items-center space-x-3 w-full md:w-auto justify-between md:justify-end">
          <button
            onClick={() => setVoiceAlertsEnabled(!voiceAlertsEnabled)}
            className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center space-x-1.5 ${
              voiceAlertsEnabled
                ? 'bg-rose-950/80 border-rose-700 text-rose-300'
                : 'bg-slate-800 border-slate-700 text-slate-400'
            }`}
          >
            {voiceAlertsEnabled ? <Volume2 className="w-4 h-4 text-rose-400" /> : <VolumeX className="w-4 h-4" />}
            <span>{voiceAlertsEnabled ? 'Voice Alerts ON' : 'Muted'}</span>
          </button>

          <button
            onClick={handleFinishTrip}
            className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-rose-600/30 transition-all flex items-center space-x-1.5 cursor-pointer"
          >
            <Square className="w-3.5 h-3.5 fill-current" />
            <span>End Trip & Get Summary</span>
          </button>
        </div>
      </div>

      {/* ACTIVE WARNING POPUP CARDS */}
      <AnimatePresence>
        {activeWarnings.map((w) => (
          <motion.div
            key={w.id}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className={`p-5 rounded-3xl border-2 shadow-2xl flex items-start space-x-4 ${
              w.severity === 'CRITICAL'
                ? 'bg-rose-950/90 text-white border-rose-500 shadow-rose-600/30'
                : 'bg-amber-950/90 text-white border-amber-500 shadow-amber-600/30'
            }`}
          >
            <div className="p-3 rounded-2xl bg-rose-600 text-white shrink-0 animate-bounce">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-rose-300">
                {w.type} • {w.timestamp}
              </span>
              <h3 className="text-base font-black">{w.title}</h3>
              <p className="text-xs text-slate-200 font-medium">{w.message}</p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* TELEMETRY METRIC GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* Speedometer */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-xl space-y-1 text-center col-span-2 sm:col-span-1">
          <span className="text-[10px] font-black uppercase text-slate-400 block">Current Speed</span>
          <div className="text-4xl font-black text-rose-600 dark:text-rose-400 font-mono">
            {speed}
          </div>
          <span className="text-[10px] text-slate-500 font-bold block">KM/H</span>
        </div>

        {/* Live Safety Score */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-xl space-y-1 text-center col-span-2 sm:col-span-1">
          <span className="text-[10px] font-black uppercase text-slate-400 block">Safety Score</span>
          <div
            className={`text-4xl font-black font-mono ${
              safetyScore >= 85
                ? 'text-emerald-500'
                : safetyScore >= 70
                ? 'text-yellow-500'
                : 'text-rose-500'
            }`}
          >
            {safetyScore}%
          </div>
          <span className="text-[10px] text-emerald-600 font-bold block">
            {safetyScore >= 85 ? 'Excellent' : safetyScore >= 70 ? 'Good' : 'Needs Caution'}
          </span>
        </div>

        {/* Distance */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-xl space-y-1 text-center">
          <span className="text-[10px] font-black uppercase text-slate-400 block">Distance</span>
          <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
            {distanceKm} <span className="text-xs font-normal">KM</span>
          </div>
          <span className="text-[10px] text-slate-400 font-bold block">Traveled</span>
        </div>

        {/* Trip Time */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-xl space-y-1 text-center">
          <span className="text-[10px] font-black uppercase text-slate-400 block">Trip Time</span>
          <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
            {formatTime(elapsedSeconds)}
          </div>
          <span className="text-[10px] text-slate-400 font-bold block">Elapsed</span>
        </div>

        {/* Avg Speed */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-xl space-y-1 text-center">
          <span className="text-[10px] font-black uppercase text-slate-400 block">Avg Speed</span>
          <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
            {avgSpeed} <span className="text-xs font-normal">KM/H</span>
          </div>
          <span className="text-[10px] text-slate-400 font-bold block">Max: {maxSpeed}</span>
        </div>

        {/* ETA */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-xl space-y-1 text-center">
          <span className="text-[10px] font-black uppercase text-slate-400 block">Estimated ETA</span>
          <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400 font-mono">
            ~14 <span className="text-xs font-normal">MINS</span>
          </div>
          <span className="text-[10px] text-emerald-600 font-bold block">Smooth Traffic</span>
        </div>
      </div>

      {/* SIMULATOR ACTION CONTROLS */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-700/60 pb-3">
          <div className="flex items-center space-x-2 text-rose-600 dark:text-rose-400 font-black text-xs uppercase tracking-wider">
            <Zap className="w-4 h-4" />
            <span>AI Guardian Scenario Testing Simulator</span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono">Simulate Live Driving Hazards</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <button
            onClick={handleSimulateOverspeed}
            className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/50 hover:bg-rose-100 text-rose-800 dark:text-rose-300 font-black text-xs space-y-1 text-left border border-rose-200 dark:border-rose-800 cursor-pointer"
          >
            <Zap className="w-4 h-4 text-rose-600" />
            <span>Overspeed (85 KM/H)</span>
          </button>

          <button
            onClick={handleSimulateHardBraking}
            className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/50 hover:bg-amber-100 text-amber-800 dark:text-amber-300 font-black text-xs space-y-1 text-left border border-amber-200 dark:border-amber-800 cursor-pointer"
          >
            <Activity className="w-4 h-4 text-amber-600" />
            <span>Hard Braking</span>
          </button>

          <button
            onClick={handleSimulateSchoolZone}
            className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-100 text-indigo-800 dark:text-indigo-300 font-black text-xs space-y-1 text-left border border-indigo-200 dark:border-indigo-800 cursor-pointer"
          >
            <School className="w-4 h-4 text-indigo-600" />
            <span>School Zone</span>
          </button>

          <button
            onClick={handleSimulateBlackspot}
            className="p-3 rounded-2xl bg-purple-50 dark:bg-purple-950/50 hover:bg-purple-100 text-purple-800 dark:text-purple-300 font-black text-xs space-y-1 text-left border border-purple-200 dark:border-purple-800 cursor-pointer"
          >
            <Octagon className="w-4 h-4 text-purple-600" />
            <span>Accident Blackspot</span>
          </button>

          <button
            onClick={handleSimulateFogRain}
            className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-100 text-blue-800 dark:text-blue-300 font-black text-xs space-y-1 text-left border border-blue-200 dark:border-blue-800 cursor-pointer"
          >
            <CloudFog className="w-4 h-4 text-blue-600" />
            <span>Heavy Fog Zone</span>
          </button>

          <button
            onClick={onTriggerImpactCrash}
            className="p-3 rounded-2xl bg-rose-600 text-white hover:bg-rose-700 font-black text-xs space-y-1 text-left shadow-md shadow-rose-600/30 cursor-pointer"
          >
            <ShieldAlert className="w-4 h-4 text-white animate-pulse" />
            <span>Simulate Crash Impact</span>
          </button>
        </div>
      </div>
    </div>
  );
};
