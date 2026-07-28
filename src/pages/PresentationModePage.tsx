/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldAlert,
  Clock,
  Activity,
  Award,
  Users,
  Brain,
  Zap,
  MapPin,
  HeartHandshake,
  Building2,
  TrendingUp,
  Cpu,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  Sparkles,
  PhoneCall,
  Flame,
  ShieldCheck,
  Compass
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useDemo } from '../context/DemoContext';

export const PresentationModePage: React.FC = () => {
  const { triggerSimulatedSOS } = useDemo();
  const [activeTab, setActiveTab] = useState<'problem' | 'solution' | 'ai' | 'sos' | 'impact' | 'future'>('problem');

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-indigo-500 selection:text-white relative overflow-hidden pb-24">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-rose-600/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header Banner */}
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center text-white shadow-lg">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-bold tracking-tight text-white">RoadGuard</h1>
                <span className="px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-semibold">
                  Hackathon Pitch Mode
                </span>
              </div>
              <p className="text-xs text-slate-400">Next-Gen AI Emergency Response & Volunteer Mesh</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={triggerSimulatedSOS}
              className="hidden sm:flex items-center space-x-2 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs transition-all shadow-lg shadow-rose-900/40"
            >
              <PhoneCall className="w-4 h-4 animate-pulse" />
              <span>Test Live SOS</span>
            </button>
            <Link
              to="/dashboard"
              className="flex items-center space-x-1 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-all shadow-md"
            >
              <span>Explore Platform</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Pitch Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">
        {/* Pitch Hero Header */}
        <section className="text-center max-w-4xl mx-auto space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-slate-900 border border-indigo-500/30 text-xs font-semibold text-indigo-300"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Saving Lives in the Critical Golden Hour</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-indigo-200"
          >
            Zero Preventable Deaths on Highways
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed"
          >
            Connecting accident victims, nearby certified Good Samaritan volunteers, AI accident prediction models, and trauma hospitals in under 8 minutes.
          </motion.p>
        </section>

        {/* Section Navigation Tabs */}
        <div className="flex items-center justify-center overflow-x-auto no-scrollbar py-2 border-b border-slate-800">
          <div className="flex space-x-2 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800">
            {[
              { id: 'problem', label: '1. Problem & Golden Hour', icon: Clock },
              { id: 'solution', label: '2. Architecture Solution', icon: Activity },
              { id: 'ai', label: '3. AI Engine & Prediction', icon: Brain },
              { id: 'sos', label: '4. SOS Simulation', icon: ShieldAlert },
              { id: 'impact', label: '5. Impact & Stakeholders', icon: TrendingUp },
              { id: 'future', label: '6. Future Scope', icon: Cpu }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-900/40'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Presentation Content Panels */}
        <div className="mt-8">
          {/* TAB 1: PROBLEM & GOLDEN HOUR */}
          {activeTab === 'problem' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center">
                    <Flame className="w-6 h-6" />
                  </div>
                  <h3 className="text-3xl font-extrabold text-white">150,000+</h3>
                  <p className="text-sm text-slate-400 font-medium">Annual Road Fatalities</p>
                  <p className="text-xs text-slate-500">More than 50% occur due to delayed emergency medical intervention.</p>
                </div>

                <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                    <Clock className="w-6 h-6" />
                  </div>
                  <h3 className="text-3xl font-extrabold text-white">24 Mins</h3>
                  <p className="text-sm text-slate-400 font-medium">Average Emergency Dispatch Delay</p>
                  <p className="text-xs text-slate-500">Traditional call routing takes up to 20-30 mins to identify location and hospital bed status.</p>
                </div>

                <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                    <Zap className="w-6 h-6" />
                  </div>
                  <h3 className="text-3xl font-extrabold text-white">&lt; 8 Mins</h3>
                  <p className="text-sm text-slate-400 font-medium">RoadGuard Target Response Time</p>
                  <p className="text-xs text-slate-500">By alerting nearby certified Good Samaritan volunteers within 500m instantly.</p>
                </div>
              </div>

              {/* The Golden Hour Card */}
              <div className="p-8 rounded-3xl bg-gradient-to-br from-indigo-950/80 via-slate-900 to-slate-950 border border-indigo-500/30 space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="p-3 rounded-2xl bg-indigo-600/30 text-indigo-400">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">The Golden Hour Principle</h3>
                    <p className="text-xs text-slate-400">First 60 minutes after severe trauma determines survival chances</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
                  <div className="space-y-3 bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
                    <h4 className="font-bold text-rose-400 flex items-center gap-2">
                      <span>⚠️ Traditional System Bottlenecks</span>
                    </h4>
                    <ul className="space-y-2 text-xs text-slate-400">
                      <li className="flex items-start gap-2">
                        <span className="text-rose-500">❌</span> Bystander hesitation due to legal harassment fears.
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-rose-500">❌</span> Ambulances arriving at hospitals without ICU/Trauma bed availability.
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-rose-500">❌</span> Manual address description causes lost dispatch time.
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-3 bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
                    <h4 className="font-bold text-emerald-400 flex items-center gap-2">
                      <span>⚡ RoadGuard Paradigm Shift</span>
                    </h4>
                    <ul className="space-y-2 text-xs text-slate-300">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" /> Good Samaritan Legal Shield & Reward Tokens.
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" /> Live Trauma Center bed & ventilator readiness matching.
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" /> 1-Tap GPS + Auto AI audio voice triage dispatch.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: ARCHITECTURE SOLUTION */}
          {activeTab === 'solution' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <h3 className="text-2xl font-bold text-white">4-Pillar Emergency Mesh Network</h3>
                <p className="text-xs text-slate-400">Integrated microservices architecture providing end-to-end emergency orchestration</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    title: '1. Citizen SOS',
                    desc: '1-click emergency button, voice activation, location broadcasting, emergency contact SMS alerts.',
                    icon: ShieldAlert,
                    color: 'text-rose-400 bg-rose-500/10 border-rose-500/30'
                  },
                  {
                    title: '2. Volunteer Mesh',
                    desc: 'Geofenced push alerts to certified CPR/BLS responders within 1km radius with turn-by-turn navigation.',
                    icon: Users,
                    color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30'
                  },
                  {
                    title: '3. AI Triage Engine',
                    desc: 'Gemini 2.5 Flash voice & visual trauma evaluation, generating instant medical priority recommendations.',
                    icon: Brain,
                    color: 'text-purple-400 bg-purple-500/10 border-purple-500/30'
                  },
                  {
                    title: '4. Trauma Hospital Sync',
                    desc: 'Live ICU bed, ventilator, and blood bank availability telemetry matching for ambulances.',
                    icon: Building2,
                    color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
                  }
                ].map((pillar) => {
                  const Icon = pillar.icon;
                  return (
                    <div key={pillar.title} className={`p-6 rounded-3xl bg-slate-900/80 border ${pillar.color} space-y-4`}>
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-slate-800">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h4 className="text-base font-bold text-white">{pillar.title}</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">{pillar.desc}</p>
                    </div>
                  );
                })}
              </div>

              <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2">
                  <h4 className="text-lg font-bold text-white flex items-center gap-2">
                    <HeartHandshake className="w-5 h-5 text-amber-400" />
                    Good Samaritan Legal Shield & Gamified Training
                  </h4>
                  <p className="text-xs text-slate-400 max-w-xl">
                    Protects volunteers under national Good Samaritan legislation with digital certificates, verified badges, and government-backed insurance incentives.
                  </p>
                </div>
                <Link
                  to="/samaritan"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs font-bold transition-all shadow-lg whitespace-nowrap"
                >
                  View Samaritan Hub
                </Link>
              </div>
            </motion.div>
          )}

          {/* TAB 3: AI ENGINE & PREDICTION */}
          {activeTab === 'ai' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              <div className="p-8 rounded-3xl bg-gradient-to-br from-purple-950/60 via-slate-900 to-slate-950 border border-purple-500/30 space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="p-3 rounded-2xl bg-purple-600/30 text-purple-400">
                    <Brain className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Google Gemini AI Intelligence Suite</h3>
                    <p className="text-xs text-slate-400">Powered by Gemini models for real-time multimodal accident analysis</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                  <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                    <div className="flex items-center space-x-2 text-purple-400 font-bold">
                      <Sparkles className="w-4 h-4" />
                      <span>Accident Blackspot Prediction</span>
                    </div>
                    <p className="text-slate-400">
                      Analyzes historical crash data, weather conditions, road curvature, and traffic flow to forecast high-risk zones.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                    <div className="flex items-center space-x-2 text-purple-400 font-bold">
                      <PhoneCall className="w-4 h-4" />
                      <span>Automated Voice Triage</span>
                    </div>
                    <p className="text-slate-400">
                      Listens to panic voice calls, extracts medical symptoms, evaluates patient consciousness, and auto-dispatches emergency services.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                    <div className="flex items-center space-x-2 text-purple-400 font-bold">
                      <ShieldCheck className="w-4 h-4" />
                      <span>First-Aid Guide Copilot</span>
                    </div>
                    <p className="text-slate-400">
                      Step-by-step interactive audio and visual guide for bystanders on CPR, pressure bandage application, and spinal stabilization.
                    </p>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <Link
                    to="/ai-prediction"
                    className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-all shadow-lg"
                  >
                    <span>Try AI Blackspot Predictor</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 4: SOS SIMULATION */}
          {activeTab === 'sos' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
                  <div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      <ShieldAlert className="w-6 h-6 text-rose-500 animate-bounce" />
                      Interactive SOS Dispatch Simulator
                    </h3>
                    <p className="text-xs text-slate-400">Experience how RoadGuard orchestrates instantaneous trauma dispatch</p>
                  </div>

                  <button
                    onClick={triggerSimulatedSOS}
                    className="px-6 py-3 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs transition-all shadow-xl shadow-rose-900/50 flex items-center space-x-2"
                  >
                    <Zap className="w-4 h-4" />
                    <span>Trigger Live Simulated SOS</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                    <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Step 01</span>
                    <h4 className="font-bold text-white">1-Tap / Voice Trigger</h4>
                    <p className="text-slate-400">Captures high-accuracy GPS coordinates & opens instant voice channel.</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                    <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Step 02</span>
                    <h4 className="font-bold text-indigo-400">Volunteer Mesh Geofence</h4>
                    <p className="text-slate-400">Pings 3 nearest CPR-trained volunteers within 1km radius.</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                    <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Step 03</span>
                    <h4 className="font-bold text-purple-400">AI Triage Generation</h4>
                    <p className="text-slate-400">Evaluates injury urgency and sends summary to emergency trauma center.</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                    <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Step 04</span>
                    <h4 className="font-bold text-emerald-400">Hospital ICU Reservation</h4>
                    <p className="text-slate-400">Pre-allocates trauma bed and ventilator prior to ambulance arrival.</p>
                  </div>
                </div>

                <div className="flex justify-center pt-4">
                  <Link
                    to="/sos"
                    className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-all shadow-lg"
                  >
                    <span>Open Full Emergency Screen</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 5: IMPACT & STAKEHOLDERS */}
          {activeTab === 'impact' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-emerald-400" />
                    Quantifiable Impact Metrics
                  </h3>
                  <div className="space-y-3 text-xs text-slate-300">
                    <div className="flex justify-between items-center p-3 rounded-xl bg-slate-950 border border-slate-800">
                      <span>Fatality Reduction Rate</span>
                      <span className="font-extrabold text-emerald-400 text-base">35% Projected</span>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-xl bg-slate-950 border border-slate-800">
                      <span>Average Golden Hour First Response</span>
                      <span className="font-extrabold text-indigo-400 text-base">4.2 Minutes</span>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-xl bg-slate-950 border border-slate-800">
                      <span>Registered Good Samaritan Responders</span>
                      <span className="font-extrabold text-amber-400 text-base">12,000+ Active</span>
                    </div>
                  </div>
                </div>

                <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Users className="w-5 h-5 text-indigo-400" />
                    Key Ecosystem Stakeholders
                  </h3>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                      <span className="font-bold text-white block">Citizens & Drivers</span>
                      <span className="text-[11px] text-slate-400">Instant 1-tap rescue</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                      <span className="font-bold text-indigo-300 block">Good Samaritans</span>
                      <span className="text-[11px] text-slate-400">Legal protection & rewards</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                      <span className="font-bold text-purple-300 block">Trauma Hospitals</span>
                      <span className="text-[11px] text-slate-400">Real-time patient telemetry</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                      <span className="font-bold text-emerald-300 block">Traffic Authorities</span>
                      <span className="text-[11px] text-slate-400">Blackspot analytics</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 6: FUTURE SCOPE */}
          {activeTab === 'future' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 border border-slate-800 space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="p-3 rounded-2xl bg-indigo-600/30 text-indigo-400">
                    <Cpu className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">RoadGuard Roadmap & Innovation Scope</h3>
                    <p className="text-xs text-slate-400">Next-stage technology roadmap for autonomous safety mesh</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                  <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                    <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono text-[10px]">Phase 1</span>
                    <h4 className="font-bold text-white text-sm">IoT OBD-II Vehicle Sensor Sync</h4>
                    <p className="text-slate-400">Automatic G-force rollover crash detection built into connected cars.</p>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                    <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono text-[10px]">Phase 2</span>
                    <h4 className="font-bold text-white text-sm">Autonomous Drone Blood Delivery</h4>
                    <p className="text-slate-400">Dispatches autonomous medical drones with O-negative blood to remote highway sites.</p>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px]">Phase 3</span>
                    <h4 className="font-bold text-white text-sm">V2X Mesh Vehicle Alerting</h4>
                    <p className="text-slate-400">Vehicles within 2km automatically slow down and yield emergency corridors.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Call to Action Footer in Pitch Mode */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 border border-indigo-500/30 text-center space-y-4">
          <h3 className="text-2xl font-bold text-white">Ready to Save Lives with RoadGuard?</h3>
          <p className="text-xs text-slate-300 max-w-xl mx-auto">
            Experience the live interactive prototype across emergency SOS, AI prediction, training academy, and admin telemetry.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to="/sos"
              className="px-6 py-3 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs transition-all shadow-xl shadow-rose-900/40 flex items-center space-x-2"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Open Emergency SOS</span>
            </Link>
            <Link
              to="/dashboard"
              className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs transition-all shadow-xl shadow-indigo-900/40 flex items-center space-x-2"
            >
              <Compass className="w-4 h-4" />
              <span>Go to Main Dashboard</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};
