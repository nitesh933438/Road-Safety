/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldAlert,
  Users,
  Ambulance,
  Hospital,
  ShieldCheck,
  Flame,
  Zap,
  HeartPulse,
  Radio,
  CheckCircle2,
  Clock,
  MapPin,
  Compass,
  AlertTriangle,
  PhoneCall,
  Send,
  Sparkles,
  Activity,
  Droplet,
  BarChart2,
  PieChart as PieChartIcon,
  TrendingUp,
  RefreshCw,
  Bell,
  Check,
  Phone,
  Eye,
  ChevronRight,
  Shield,
  FileText,
  Volume2
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  CartesianGrid
} from 'recharts';
import { useTheme } from '../../context/ThemeContext';
import {
  MOCK_COMMAND_KPIS,
  MOCK_LIVE_TIMELINE,
  MOCK_INCIDENT_ANALYSIS,
  MOCK_RESOURCE_AVAILABILITY,
  MOCK_BLOOD_STOCK,
  MOCK_EMERGENCY_CONTACTS,
  MOCK_BROADCAST_CHANNELS,
  MOCK_AI_RECOMMENDATIONS,
  MOCK_EMERGENCY_TYPES_ANALYTICS,
  MOCK_RESPONSE_TIME_ANALYTICS,
  MOCK_MONTHLY_RESCUE_ANALYTICS,
  BroadcastChannel
} from '../../data/commandCenterData';

// Leaflet Custom Icons
const createIncidentMarker = () => {
  return L.divIcon({
    className: 'custom-cmd-incident',
    html: `
      <div style="
        background-color: #ef4444;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 4px solid white;
        box-shadow: 0 0 25px rgba(239, 68, 68, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 20px;
        animation: pulse 1.2s infinite;
      ">
        🚨
      </div>
    `,
    iconSize: [40, 40],
  });
};

const createAmbulanceMarker = () => {
  return L.divIcon({
    className: 'custom-cmd-amb',
    html: `
      <div style="
        background-color: #3b82f6;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 4px 12px rgba(59, 130, 246, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 15px;
      ">
        🚑
      </div>
    `,
    iconSize: [32, 32],
  });
};

const createVolunteerMarker = () => {
  return L.divIcon({
    className: 'custom-cmd-vol',
    html: `
      <div style="
        background-color: #10b981;
        width: 28px;
        height: 28px;
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0 2px 8px rgba(16, 185, 129, 0.4);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 13px;
      ">
        🦸‍♂️
      </div>
    `,
    iconSize: [28, 28],
  });
};

const createHospitalMarker = () => {
  return L.divIcon({
    className: 'custom-cmd-hosp',
    html: `
      <div style="
        background-color: #6366f1;
        width: 34px;
        height: 34px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 4px 12px rgba(99, 102, 241, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 16px;
      ">
        🏥
      </div>
    `,
    iconSize: [34, 34],
  });
};

export const EmergencyCommandCenter: React.FC = () => {
  const { theme } = useTheme();

  // Clock State
  const [timeString, setTimeString] = useState('');

  // Interactive Broadcast State
  const [broadcastChannels, setBroadcastChannels] = useState<BroadcastChannel[]>(MOCK_BROADCAST_CHANNELS);
  const [isBroadcastingAll, setIsBroadcastingAll] = useState(false);
  const [broadcastSuccessToast, setBroadcastSuccessToast] = useState<string | null>(null);

  // Active Tab View for Main Content
  const [activeSection, setActiveSection] = useState<'overview' | 'incident' | 'resources' | 'contacts' | 'analytics'>('overview');

  // Direct Dial Simulation Modal/Toast State
  const [dialingContact, setDialingContact] = useState<{ name: string; number: string } | null>(null);

  useEffect(() => {
    const updateTime = () => {
      setTimeString(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const triggerToast = (msg: string) => {
    setBroadcastSuccessToast(msg);
    setTimeout(() => setBroadcastSuccessToast(null), 4000);
  };

  const handleBroadcastAll = () => {
    setIsBroadcastingAll(true);
    triggerToast('Initiating multi-channel satellite dispatch broadcast...');

    setTimeout(() => {
      setBroadcastChannels((prev) =>
        prev.map((ch) => ({
          ...ch,
          status: 'Broadcasting',
          deliveryPercent: 45,
        }))
      );
    }, 1000);

    setTimeout(() => {
      setBroadcastChannels((prev) =>
        prev.map((ch) => ({
          ...ch,
          status: 'Delivered',
          deliveryPercent: 100,
        }))
      );
      setIsBroadcastingAll(false);
      triggerToast('Emergency Alert Successfully Dispatched to 221 Units Across 6 Channels!');
    }, 2800);
  };

  const handleDialNumber = (name: string, number: string) => {
    setDialingContact({ name, number });
    triggerToast(`Connecting 1-Tap Emergency Line to ${name} (${number})...`);
    setTimeout(() => setDialingContact(null), 4000);
  };

  // Helper for KPI Icons
  const renderKpiIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldAlert': return <ShieldAlert className="w-5 h-5" />;
      case 'Users': return <Users className="w-5 h-5" />;
      case 'Ambulance': return <Ambulance className="w-5 h-5" />;
      case 'Hospital': return <Hospital className="w-5 h-5" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5" />;
      case 'Flame': return <Flame className="w-5 h-5" />;
      case 'Zap': return <Zap className="w-5 h-5" />;
      case 'HeartPulse': return <HeartPulse className="w-5 h-5" />;
      default: return <Activity className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-8" role="region" aria-label="AI Emergency Command Center">
      {/* Toast Notification */}
      <AnimatePresence>
        {broadcastSuccessToast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-20 right-4 sm:right-8 z-50 bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 px-5 py-3.5 rounded-2xl shadow-2xl border border-rose-500/50 flex items-center space-x-3"
            role="status"
          >
            <Bell className="w-5 h-5 text-rose-500 animate-bounce" />
            <span className="text-xs font-black tracking-wide">{broadcastSuccessToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dialing Overlay Modal */}
      <AnimatePresence>
        {dialingContact && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-slate-900 text-white rounded-3xl p-8 max-w-sm w-full border border-rose-500/40 text-center space-y-6 shadow-2xl"
            >
              <div className="w-20 h-20 rounded-full bg-rose-600/20 text-rose-500 mx-auto flex items-center justify-center border-2 border-rose-500 animate-ping">
                <PhoneCall className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-rose-400 block">
                  Connecting Priority Hotline
                </span>
                <h3 className="text-xl font-black">{dialingContact.name}</h3>
                <p className="text-2xl font-mono font-bold text-rose-400">{dialingContact.number}</p>
              </div>

              <div className="text-xs text-slate-400 font-medium">
                Establishing direct encrypted satellite voice channel...
              </div>

              <button
                onClick={() => setDialingContact(null)}
                className="w-full py-3 rounded-2xl bg-rose-600 text-white font-black text-xs uppercase tracking-wider hover:bg-rose-700 transition-colors"
              >
                End Emergency Call
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* TOP COMMAND HEADER BAR */}
      <div className="bg-gradient-to-r from-slate-950 via-rose-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-rose-500/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-rose-500/10 pointer-events-none blur-3xl" />
        
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center space-x-3">
              <span className="px-3 py-1 rounded-full bg-rose-600/30 border border-rose-500/40 text-rose-300 text-xs font-black uppercase tracking-widest flex items-center space-x-1.5">
                <Radio className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
                <span>Command Center Active</span>
              </span>
              <span className="text-xs font-mono text-slate-300 font-bold bg-slate-800/80 px-2.5 py-1 rounded-full border border-slate-700">
                {timeString || '08:42:15 AM'}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              AI Emergency Command Center
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-medium">
              Unified GIS tactical dashboard orchestrating real-time incident triage, Golden Hour emergency timelines, resource telemetry, and 1-tap dispatch channels.
            </p>
          </div>

          {/* Quick Action Button */}
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleBroadcastAll}
              disabled={isBroadcastingAll}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs uppercase tracking-widest shadow-xl shadow-rose-600/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center space-x-2.5 cursor-pointer disabled:opacity-50"
              aria-label="Broadcast Emergency Alert"
            >
              <Send className={`w-4 h-4 ${isBroadcastingAll ? 'animate-spin' : ''}`} />
              <span>{isBroadcastingAll ? 'Broadcasting Satellite Alerts...' : 'Broadcast Emergency Alert'}</span>
            </button>
          </div>
        </div>

        {/* SECTION NAV TABS */}
        <div className="flex items-center space-x-2 mt-8 pt-6 border-t border-slate-800/80 overflow-x-auto no-scrollbar">
          {[
            { id: 'overview', label: '1. Dashboard Overview', icon: Activity },
            { id: 'incident', label: '2. Incident & AI Triage', icon: Sparkles },
            { id: 'resources', label: '3. Resource Telemetry', icon: Droplet },
            { id: 'contacts', label: '4. 1-Tap Emergency Hotline', icon: PhoneCall },
            { id: 'analytics', label: '5. Rescue Analytics', icon: BarChart2 },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeSection === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id as any)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all flex items-center space-x-2 cursor-pointer ${
                  active
                    ? 'bg-white text-slate-900 shadow-lg'
                    : 'bg-slate-900/60 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-800'
                }`}
                aria-selected={active}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-rose-600' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* FEATURE 1: ANIMATED KPI CARDS (8 METRICS) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        {MOCK_COMMAND_KPIS.map((kpi) => (
          <motion.div
            key={kpi.id}
            whileHover={{ y: -3 }}
            className="p-4 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-lg space-y-2 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200">
                {renderKpiIcon(kpi.icon)}
              </div>
              <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 font-mono">
                {kpi.change}
              </span>
            </div>

            <div>
              <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                {kpi.value}
              </div>
              <div className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                {kpi.label}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* SECTION VIEW CONTROLLER */}

      {/* 1. OVERVIEW SECTION: GIS MAP & LIVE TIMELINE */}
      {activeSection === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: GIS Tactical Radar Map */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 dark:border-slate-700/80 flex flex-col">
              <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Compass className="w-5 h-5 text-rose-500 animate-spin" />
                  <span className="font-extrabold text-xs uppercase tracking-wider">
                    Live GIS Incident & Resource Radar
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-[10px] font-black uppercase text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>Real-Time Dispatches</span>
                </div>
              </div>

              <div className="h-[460px] w-full relative z-0">
                <MapContainer
                  center={[28.6139, 77.2090]}
                  zoom={13}
                  className="w-full h-full"
                >
                  <TileLayer
                    url={
                      theme === 'dark'
                        ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
                        : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    }
                    attribution="&copy; OpenStreetMap & CARTO"
                  />

                  {/* Active Collision Incident */}
                  <Marker position={[28.6139, 77.2090]} icon={createIncidentMarker()}>
                    <Popup>
                      <div className="p-1 font-bold text-xs space-y-1">
                        <div className="text-rose-600 font-extrabold">Active Incident: INC-784920</div>
                        <div>NH-48 Mahipalpur Expressway</div>
                        <div>Severity: CRITICAL (Rollover Crash)</div>
                      </div>
                    </Popup>
                  </Marker>

                  {/* Dispatched Ambulance */}
                  <Marker position={[28.6220, 77.2180]} icon={createAmbulanceMarker()}>
                    <Popup>
                      <div className="p-1 text-xs">
                        <b className="text-blue-600">Ambulance DL-1C-9920</b>
                        <p className="text-[10px]">ETA 3.5 mins (ALS Unit)</p>
                      </div>
                    </Popup>
                  </Marker>

                  {/* En Route CPR Volunteer */}
                  <Marker position={[28.6110, 77.2030]} icon={createVolunteerMarker()}>
                    <Popup>
                      <div className="p-1 text-xs">
                        <b className="text-emerald-600">Dr. Rajesh Sharma (Volunteer)</b>
                        <p className="text-[10px]">CPR Certified • En Route on Bike</p>
                      </div>
                    </Popup>
                  </Marker>

                  {/* AIIMS Level 1 Trauma Center */}
                  <Marker position={[28.5672, 77.2100]} icon={createHospitalMarker()}>
                    <Popup>
                      <div className="p-1 text-xs">
                        <b className="text-indigo-600">AIIMS Trauma Center</b>
                        <p className="text-[10px]">14 ICU Beds Free • ER Bay #4 Reserved</p>
                      </div>
                    </Popup>
                  </Marker>

                  {/* Route Polyline connecting ambulance to incident */}
                  <Polyline
                    positions={[
                      [28.6220, 77.2180],
                      [28.6139, 77.2090],
                    ]}
                    pathOptions={{ color: '#3b82f6', weight: 4, dashArray: '8, 8' }}
                  />
                </MapContainer>
              </div>
            </div>
          </div>

          {/* Right: FEATURE 2 - LIVE EMERGENCY TIMELINE */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl border border-slate-200/80 dark:border-slate-700/80 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-700/60 pb-4">
                <div className="flex items-center space-x-2.5">
                  <div className="w-9 h-9 rounded-2xl bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 flex items-center justify-center font-black">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-extrabold text-slate-900 dark:text-white text-base">
                      Live Emergency Timeline
                    </h2>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      Real-time Golden Hour dispatch sequence
                    </span>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300 font-black text-[10px] uppercase">
                  Incident #784920
                </span>
              </div>

              {/* Timeline Steps */}
              <div className="space-y-6 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-700">
                {MOCK_LIVE_TIMELINE.map((step) => {
                  const isDone = step.status === 'completed';
                  const isCurrent = step.status === 'in_progress';

                  return (
                    <div key={step.id} className="relative pl-9 space-y-1 group">
                      {/* Step Indicator Dot */}
                      <div
                        className={`absolute left-1.5 top-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                          isDone
                            ? 'bg-emerald-500 border-emerald-400 text-white'
                            : isCurrent
                            ? 'bg-rose-600 border-white text-white animate-pulse shadow-lg shadow-rose-600/50'
                            : 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-400'
                        }`}
                      >
                        {isDone ? (
                          <Check className="w-3 h-3 stroke-[3]" />
                        ) : isCurrent ? (
                          <div className="w-2 h-2 rounded-full bg-white" />
                        ) : (
                          <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-xs text-slate-900 dark:text-white">
                          {step.title}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 font-bold">
                          {step.timestamp}
                        </span>
                      </div>

                      <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug">
                        {step.details}
                      </p>

                      <div className="flex items-center space-x-2 pt-0.5">
                        <span className="text-[9px] font-black uppercase text-slate-400">
                          Actor: {step.actor}
                        </span>
                        {step.location && (
                          <span className="text-[9px] font-bold text-rose-500 flex items-center">
                            <MapPin className="w-2.5 h-2.5 mr-0.5" />
                            {step.location}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. FEATURE 3 & 7: AI INCIDENT ANALYSIS & AI FIRST AID RECOMMENDATIONS */}
      {(activeSection === 'overview' || activeSection === 'incident') && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* AI Incident Analysis Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl border border-slate-200/80 dark:border-slate-700/80 space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-black">
                    <Sparkles className="w-5 h-5 animate-spin" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                      AI Incident Diagnostic Analysis
                    </h3>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      Multi-vector crash & survival predictive engine
                    </span>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full bg-rose-600 text-white font-black text-xs uppercase">
                  {MOCK_INCIDENT_ANALYSIS.severity}
                </span>
              </div>

              {/* Golden Hour Chance & Survival Gauge Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200/60 dark:border-indigo-900/40 text-center space-y-1">
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                    Golden Hour Chance
                  </span>
                  <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400">
                    {MOCK_INCIDENT_ANALYSIS.goldenHourChance}%
                  </div>
                  <span className="text-[10px] text-emerald-600 font-bold block">
                    +12% vs standard response
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-900/40 text-center space-y-1">
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                    Survival Improvement
                  </span>
                  <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                    +{MOCK_INCIDENT_ANALYSIS.survivalImprovementPercent}%
                  </div>
                  <span className="text-[10px] text-slate-400 block">Calculated via AI triage</span>
                </div>
              </div>

              {/* Nearest Facilities Matrix */}
              <div className="space-y-2.5 pt-1">
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-black uppercase text-slate-400 block">
                      Nearest Trauma Center
                    </span>
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      {MOCK_INCIDENT_ANALYSIS.nearestTraumaCenter.name}
                    </span>
                  </div>
                  <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400">
                    {MOCK_INCIDENT_ANALYSIS.nearestTraumaCenter.distance} ({MOCK_INCIDENT_ANALYSIS.nearestTraumaCenter.etaMinutes}m ETA)
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-black uppercase text-slate-400 block">
                      Nearest Blood Bank
                    </span>
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      {MOCK_INCIDENT_ANALYSIS.nearestBloodBank.name}
                    </span>
                  </div>
                  <span className="text-xs font-extrabold text-rose-600 dark:text-rose-400">
                    {MOCK_INCIDENT_ANALYSIS.nearestBloodBank.distance}
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-black uppercase text-slate-400 block">
                      Nearest Police Control Cell
                    </span>
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      {MOCK_INCIDENT_ANALYSIS.nearestPoliceStation.name}
                    </span>
                  </div>
                  <span className="text-xs font-extrabold text-amber-600 dark:text-amber-400">
                    {MOCK_INCIDENT_ANALYSIS.nearestPoliceStation.distance}
                  </span>
                </div>
              </div>

              {/* AI Diagnostic Summary Box */}
              <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400 flex items-center space-x-1">
                  <Activity className="w-3.5 h-3.5 text-indigo-400" />
                  <span>AI Telemetry Diagnostic Summary</span>
                </span>
                <p className="text-xs leading-relaxed text-slate-300 font-medium">
                  "{MOCK_INCIDENT_ANALYSIS.aiDiagnosticSummary}"
                </p>
              </div>
            </div>
          </div>

          {/* FEATURE 7: AI FIRST AID & FIRST-RESPONDER RECOMMENDATIONS */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl border border-slate-200/80 dark:border-slate-700/80 space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 flex items-center justify-center font-black">
                    <HeartPulse className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                      AI First-Responder Action Protocols
                    </h3>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      Immediate life-support instructions with priority badges
                    </span>
                  </div>
                </div>

                <span className="text-xs font-bold text-slate-400">5 Active Directives</span>
              </div>

              <div className="space-y-3 max-h-[420px] overflow-y-auto no-scrollbar pr-1">
                {MOCK_AI_RECOMMENDATIONS.map((rec) => (
                  <div
                    key={rec.id}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-700/60 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white flex items-center space-x-2">
                        <span>{rec.title}</span>
                      </div>

                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider text-white ${
                          rec.priority === 'CRITICAL'
                            ? 'bg-rose-600'
                            : rec.priority === 'HIGH'
                            ? 'bg-amber-600'
                            : 'bg-indigo-600'
                        }`}
                      >
                        {rec.priority}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                      {rec.description}
                    </p>

                    {/* Step-by-step guidance list */}
                    <ul className="space-y-1.5 pl-2 border-l-2 border-indigo-500/40">
                      {rec.steps.map((s, idx) => (
                        <li key={idx} className="text-[11px] text-slate-700 dark:text-slate-300 font-medium flex items-start space-x-1.5">
                          <span className="text-indigo-500 font-extrabold">•</span>
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>

                    {rec.warningAlert && (
                      <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/40 text-[10px] font-black text-rose-700 dark:text-rose-300 flex items-center space-x-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                        <span>{rec.warningAlert}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. FEATURE 4 & 6: RESOURCE AVAILABILITY & EMERGENCY BROADCAST */}
      {(activeSection === 'overview' || activeSection === 'resources') && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* FEATURE 4: RESOURCE AVAILABILITY TELEMETRY */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl border border-slate-200/80 dark:border-slate-700/80 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-black">
                    <Droplet className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                      Resource & Infrastructure Availability
                    </h3>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      Real-time regional capacity for ICU, blood & ambulances
                    </span>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 font-black text-xs uppercase">
                  Telemetry Active
                </span>
              </div>

              {/* Resource Capacity Meters */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {MOCK_RESOURCE_AVAILABILITY.map((res) => {
                  const pct = Math.round((res.available / res.total) * 100);
                  return (
                    <div
                      key={res.id}
                      className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-700/60 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-slate-900 dark:text-white">
                          {res.name}
                        </span>
                        <span className="text-[10px] font-black uppercase text-emerald-600 dark:text-emerald-400">
                          {res.status}
                        </span>
                      </div>

                      <div className="flex items-baseline justify-between">
                        <span className="text-lg font-black text-slate-900 dark:text-white">
                          {res.available} <span className="text-xs text-slate-400 font-medium">/ {res.total} {res.unit}</span>
                        </span>
                        <span className="text-xs font-mono font-bold text-slate-500">{pct}%</span>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-500 to-indigo-500 transition-all duration-500"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Blood Stock Availability Meter Grid */}
              <div className="space-y-3 pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-slate-900 dark:text-white flex items-center space-x-1.5">
                    <Droplet className="w-4 h-4 text-rose-500" />
                    <span>Regional Blood Bank Stock Status</span>
                  </span>
                  <span className="text-[10px] font-black uppercase text-slate-400">
                    O- Negative Stock Priority
                  </span>
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                  {MOCK_BLOOD_STOCK.map((b) => (
                    <div
                      key={b.type}
                      className={`p-2.5 rounded-2xl text-center border space-y-1 ${
                        b.status === 'Critical'
                          ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800'
                          : b.status === 'Low'
                          ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800'
                          : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      <span className="text-xs font-black block text-slate-900 dark:text-white">
                        {b.type}
                      </span>
                      <span className="text-sm font-black text-rose-600 dark:text-rose-400 block">
                        {b.unitsAvailable}
                      </span>
                      <span className="text-[8px] uppercase font-bold text-slate-400 block">
                        Units
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* FEATURE 6: EMERGENCY BROADCAST PANEL */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl border border-slate-200/80 dark:border-slate-700/80 space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 flex items-center justify-center font-black">
                    <Radio className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                      Emergency Broadcast Channels
                    </h3>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      Multi-agency priority satellite dispatch
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleBroadcastAll}
                  disabled={isBroadcastingAll}
                  className="px-3.5 py-1.5 rounded-xl bg-rose-600 text-white font-extrabold text-xs hover:bg-rose-700 transition-colors cursor-pointer disabled:opacity-50"
                >
                  Broadcast All
                </button>
              </div>

              {/* Channels List */}
              <div className="space-y-3">
                {broadcastChannels.map((ch) => (
                  <div
                    key={ch.id}
                    className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-700/60 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-extrabold text-xs text-slate-900 dark:text-white flex items-center space-x-2">
                        <span>{ch.recipientGroup}</span>
                        <span className="text-[10px] text-slate-400 font-normal">
                          ({ch.recipientCount} units)
                        </span>
                      </div>

                      <span
                        className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase ${
                          ch.status === 'Acknowledged'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300'
                            : ch.status === 'Delivered'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300'
                            : ch.status === 'Broadcasting'
                            ? 'bg-amber-100 text-amber-800 animate-pulse'
                            : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        {ch.status}
                      </span>
                    </div>

                    <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                      <div
                        className="h-full bg-rose-600 transition-all duration-500"
                        style={{ width: `${ch.deliveryPercent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. FEATURE 5: EMERGENCY CONTACT PANEL (ONE-TAP DIALING) */}
      {(activeSection === 'overview' || activeSection === 'contacts') && (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl border border-slate-200/80 dark:border-slate-700/80 space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 flex items-center justify-center font-black">
                <PhoneCall className="w-5 h-5 animate-bounce" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                  Priority 1-Tap Emergency Hotline Panel
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Instant direct satellite dialing for 108, 112, Police, Fire, Hospital & Kin
                </p>
              </div>
            </div>

            <span className="text-xs font-bold text-slate-400">Zero Wait Priority</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {MOCK_EMERGENCY_CONTACTS.map((cnt) => (
              <div
                key={cnt.id}
                className="p-5 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-700/80 space-y-4 hover:border-amber-500 transition-all group"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider ${cnt.badgeColor}`}>
                      {cnt.category}
                    </span>
                    <h4 className="font-extrabold text-slate-900 dark:text-white text-base mt-2">
                      {cnt.title}
                    </h4>
                    <span className="text-[10px] font-mono font-bold text-slate-500">
                      Wait Time: {cnt.avgWaitTime}
                    </span>
                  </div>

                  <span className="text-xl font-mono font-black text-rose-600 dark:text-rose-400">
                    {cnt.number}
                  </span>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 leading-snug">
                  {cnt.description}
                </p>

                {/* 1-TAP DIAL BUTTON */}
                <button
                  onClick={() => handleDialNumber(cnt.title, cnt.number)}
                  className="w-full py-3 rounded-2xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-extrabold text-xs uppercase tracking-wider hover:bg-rose-600 dark:hover:bg-rose-600 dark:hover:text-white transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-md"
                >
                  <Phone className="w-4 h-4 text-amber-400 group-hover:text-white" />
                  <span>1-Tap Direct Call</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. FEATURE 8: RESCUE ANALYTICS & CHARTS */}
      {(activeSection === 'overview' || activeSection === 'analytics') && (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl border border-slate-200/80 dark:border-slate-700/80 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-black">
                <BarChart2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                  Emergency Response & Rescue Analytics
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Data-driven insights across response times, incident types and monthly lives saved
                </p>
              </div>
            </div>

            <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 font-black text-xs uppercase">
              2026 YTD
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Monthly Rescue Count Trend Chart */}
            <div className="lg:col-span-7 space-y-3">
              <span className="text-xs font-extrabold text-slate-900 dark:text-white block">
                Monthly Rescue Count & Lives Saved Trend
              </span>
              <div className="h-64 w-full bg-slate-50 dark:bg-slate-900/50 p-3 rounded-2xl border border-slate-200/60 dark:border-slate-700/60">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={MOCK_MONTHLY_RESCUE_ANALYTICS}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="month" stroke="#94a3b8" fontSize={10} />
                    <YAxis stroke="#94a3b8" fontSize={10} />
                    <RechartsTooltip />
                    <Area type="monotone" dataKey="rescuesCount" name="Total Rescues" stroke="#6366f1" fill="#6366f1" fillOpacity={0.2} />
                    <Area type="monotone" dataKey="livesSaved" name="Lives Saved" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Emergency Types Breakdown */}
            <div className="lg:col-span-5 space-y-3">
              <span className="text-xs font-extrabold text-slate-900 dark:text-white block">
                Emergency Types Distribution
              </span>
              <div className="h-64 w-full bg-slate-50 dark:bg-slate-900/50 p-3 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={MOCK_EMERGENCY_TYPES_ANALYTICS}
                      dataKey="count"
                      nameKey="type"
                      cx="50%"
                      cy="50%"
                      outerRadius={75}
                      label={({ name }) => name.split(' ')[0]}
                    >
                      {MOCK_EMERGENCY_TYPES_ANALYTICS.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
