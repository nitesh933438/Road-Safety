/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { DashboardSidebar } from '../components/dashboard/DashboardSidebar';
import { WelcomeHeader } from '../components/dashboard/WelcomeHeader';
import { QuickActions } from '../components/dashboard/QuickActions';
import { LiveStats } from '../components/dashboard/LiveStats';
import { DashboardCharts } from '../components/dashboard/DashboardCharts';
import { RecentActivity } from '../components/dashboard/RecentActivity';
import { SafetyTips } from '../components/dashboard/SafetyTips';
import { EmergencyContacts } from '../components/dashboard/EmergencyContacts';
import { WeatherCard } from '../components/dashboard/WeatherCard';
import { NearbyHospitals } from '../components/dashboard/NearbyHospitals';
import { Bot, PhoneCall, BookOpen, FileText, User, Settings, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sosActive, setSosActive] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);

  const handleQuickAction = (actionId: string) => {
    setActiveTab(actionId);
    if (actionId === 'sos') {
      setSosActive(true);
    }
  };

  const handleAiSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiPrompt.trim()) return;
    setAiResponse(`Analyzing query: "${aiPrompt}"...\n\nRecommended Golden Hour Protocol:\n1. Ensure scene safety before approaching.\n2. Check responsiveness and breathing.\n3. Apply direct pressure to any active bleeding sites.\n4. Call 108 immediately for professional medical dispatch.`);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-4rem)] bg-slate-100 dark:bg-slate-950 transition-colors duration-300">
      {/* Sidebar */}
      <DashboardSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 overflow-y-auto relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-multiply dark:mix-blend-lighten transform translate-x-1/2 -translate-y-1/2" />
        {/* Welcome Header */}
        <WelcomeHeader />

        {/* SOS Active Modal Banner if SOS is triggered */}
        {sosActive && (
          <div className="bg-rose-600 text-white rounded-2xl p-6 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 animate-pulse">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center font-bold">
                SOS
              </div>
              <div>
                <h3 className="text-lg font-black">EMERGENCY SOS BEACON ACTIVE</h3>
                <p className="text-xs text-rose-100">GPS coordinates broadcasting to 108 Dispatch & 24 nearby volunteers.</p>
              </div>
            </div>
            <button
              onClick={() => setSosActive(false)}
              className="px-5 py-2.5 rounded-xl bg-white text-rose-600 font-bold text-xs uppercase tracking-wider hover:bg-slate-100 transition-colors shadow-md"
            >
              Cancel Beacon
            </button>
          </div>
        )}

        {/* Dynamic Content based on activeTab */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'dashboard' && (
              <div className="space-y-6 relative z-10">
                {/* Quick Actions */}
            <QuickActions onActionClick={handleQuickAction} />

            {/* Live Statistics */}
            <LiveStats />

            {/* Charts Section */}
            <DashboardCharts />

            {/* Grid for Recent Activity & Safety Tips */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <RecentActivity />
              </div>
              <div className="space-y-6">
                <SafetyTips />
                <WeatherCard />
              </div>
            </div>

            {/* Grid for Hospitals & Emergency Contacts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <NearbyHospitals />
              <EmergencyContacts />
            </div>
          </div>
        )}

        {activeTab === 'sos' && (
          <div className="glass-card rounded-3xl p-8 shadow-sm space-y-6 max-w-2xl mx-auto text-center border border-rose-500/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-rose-500/5 pointer-events-none" />
            <div className="w-24 h-24 bg-gradient-to-br from-rose-400 to-rose-600 rounded-full flex items-center justify-center text-white mx-auto animate-pulse shadow-lg shadow-rose-500/30">
              <PhoneCall className="w-12 h-12" />
            </div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white relative z-10">Emergency SOS Dispatch Console</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 font-medium relative z-10">
              Activating SOS immediately broadcasts your real-time GPS location, incident severity, and telemetry to 108 ambulance dispatch and registered volunteers within a 2km radius.
            </p>
            <div className="pt-6 flex flex-col sm:flex-row justify-center gap-4 relative z-10">
              <button
                onClick={() => setSosActive(true)}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-rose-500 to-rose-700 hover:from-rose-600 hover:to-rose-800 text-white font-bold shadow-xl shadow-rose-600/30 text-base transition-all hover:scale-105 active:scale-95"
              >
                🚨 ACTIVATE HIGHWAY SOS NOW
              </button>
              <button
                onClick={() => setActiveTab('dashboard')}
                className="px-6 py-4 rounded-xl glass text-slate-700 dark:text-slate-300 font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border border-slate-200 dark:border-slate-700"
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        )}

        {activeTab === 'ai-assistant' && (
          <div className="glass-card rounded-[2rem] p-6 sm:p-8 shadow-sm space-y-6 border border-indigo-500/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-indigo-500/5 pointer-events-none" />
            <div className="flex items-center space-x-4 border-b border-slate-200/50 dark:border-slate-800/50 pb-6 relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white flex items-center justify-center shadow-lg shadow-indigo-500/30">
                <Bot className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white">AI First Aid Triage Assistant</h2>
                <p className="text-sm font-medium text-slate-500">Ask emergency medical questions and receive instant Golden Hour protocols.</p>
              </div>
            </div>

            <form onSubmit={handleAiSubmit} className="space-y-4 relative z-10">
              <div>
                <label className="block text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-3">
                  Describe Emergency Situation or Symptom:
                </label>
                <textarea
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  placeholder="e.g. Heavy bleeding from leg wound after highway collision. What should I do first?"
                  rows={3}
                  className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm p-5 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-inner"
                />
              </div>
              <button
                type="submit"
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-bold text-sm shadow-lg shadow-indigo-500/30 transition-all hover:-translate-y-0.5 active:translate-y-0"
              >
                Generate First Aid Protocol
              </button>
            </form>

            {aiResponse && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 rounded-2xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/50 space-y-3 relative z-10 backdrop-blur-md"
              >
                <h4 className="font-bold text-indigo-900 dark:text-indigo-200 text-sm flex items-center space-x-2">
                  <CheckCircle2 className="w-5 h-5 text-indigo-600" />
                  <span>AI Triage Protocol Result</span>
                </h4>
                <p className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed font-medium">
                  {aiResponse}
                </p>
              </motion.div>
            )}
          </div>
        )}

        {activeTab === 'training' && (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">CPR & First Aid Training Hub</h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm">
              Master the life-saving skills required during the Golden Hour. Complete interactive modules and earn certification.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-3">
                <h3 className="font-bold text-slate-900 dark:text-white">CPR Rhythm Training</h3>
                <p className="text-xs text-slate-500">Interactive 100-120 bpm metronome with real-time compression feedback.</p>
                <button onClick={() => alert('Starting CPR Interactive Metronome...')} className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold">Start Module</button>
              </div>
              <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-3">
                <h3 className="font-bold text-slate-900 dark:text-white">Bleeding Control</h3>
                <p className="text-xs text-slate-500">Tourniquet application and direct pressure simulation videos.</p>
                <button onClick={() => alert('Starting Bleeding Control module...')} className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold">Start Module</button>
              </div>
              <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-3">
                <h3 className="font-bold text-slate-900 dark:text-white">Good Samaritan Rights</h3>
                <p className="text-xs text-slate-500">Legal awareness quiz and bystander confidence checklist.</p>
                <button onClick={() => alert('Starting Legal Awareness module...')} className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold">Start Module</button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="space-y-6">
            <RecentActivity />
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm space-y-6 max-w-xl mx-auto">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-amber-500 text-white flex items-center justify-center font-black text-2xl">
                DA
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Dr. Ananya Sharma</h2>
                <p className="text-xs text-slate-500">Emergency Resident & Trauma Coordinator</p>
                <span className="inline-block mt-2 text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">Verified Responder</span>
              </div>
            </div>
            <div className="border-t border-slate-200 dark:border-slate-800 pt-4 space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-slate-500">Email:</span><span className="font-medium text-slate-800 dark:text-slate-200">ananya.sharma@roadguard.org</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Assigned Sector:</span><span className="font-medium text-slate-800 dark:text-slate-200">National Highway 48 (Sector 4)</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Total Incidents Handled:</span><span className="font-medium text-slate-800 dark:text-slate-200">42</span></div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="glass-card border border-slate-200/50 dark:border-slate-800/50 rounded-3xl p-8 shadow-sm space-y-6 max-w-xl mx-auto">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">System Settings</h2>
            <div className="space-y-4 text-sm font-medium">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-white/50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-700/50">
                <span>Push Notifications for SOS</span>
                <input type="checkbox" defaultChecked className="toggle toggle-indigo" />
              </div>
              <div className="flex items-center justify-between p-4 rounded-2xl bg-white/50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-700/50">
                <span>GPS Location Telemetry Sync</span>
                <input type="checkbox" defaultChecked className="toggle toggle-indigo" />
              </div>
              <div className="flex items-center justify-between p-4 rounded-2xl bg-white/50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-700/50">
                <span>High Contrast Accessibility Mode</span>
                <input type="checkbox" className="toggle toggle-indigo" />
              </div>
            </div>
          </div>
        )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};
