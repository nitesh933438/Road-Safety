import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Star, Activity, Shield, Settings, Power } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const VolunteerProfile: React.FC = () => {
  const { userProfile } = useAuth();
  const [status, setStatus] = useState<'online' | 'busy' | 'offline'>('online');

  const badges = [
    { name: 'First Responder', icon: Shield, color: 'text-emerald-500', bg: 'bg-emerald-100 dark:bg-emerald-900/30' },
    { name: 'CPR Certified', icon: Activity, color: 'text-rose-500', bg: 'bg-rose-100 dark:bg-rose-900/30' },
    { name: 'Top 10%', icon: Star, color: 'text-amber-500', bg: 'bg-amber-100 dark:bg-amber-900/30' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="h-32 bg-emerald-600 dark:bg-emerald-800 relative">
          <div className="absolute -bottom-12 left-6">
            <div className="w-24 h-24 bg-white dark:bg-slate-800 rounded-full p-1 shadow-lg">
              <div className="w-full h-full rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-3xl font-bold text-slate-600 dark:text-slate-300">
                {userProfile?.name?.charAt(0) || 'U'}
              </div>
            </div>
          </div>
          <div className="absolute top-4 right-4">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white backdrop-blur-sm border border-white/30`}>
              Level 4 Volunteer
            </span>
          </div>
        </div>
        
        <div className="pt-16 pb-6 px-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{userProfile?.name || 'Community Member'}</h2>
              <p className="text-slate-500 dark:text-slate-400">Joined Jan 2026 • {userProfile?.city || 'Local Area'}</p>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="bg-slate-100 dark:bg-slate-700 p-1 rounded-lg flex space-x-1">
                <button 
                  onClick={() => setStatus('online')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${status === 'online' ? 'bg-white dark:bg-slate-600 shadow text-emerald-600 dark:text-emerald-400' : 'text-slate-500'}`}
                >
                  Online
                </button>
                <button 
                  onClick={() => setStatus('busy')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${status === 'busy' ? 'bg-white dark:bg-slate-600 shadow text-amber-500' : 'text-slate-500'}`}
                >
                  Busy
                </button>
                <button 
                  onClick={() => setStatus('offline')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${status === 'offline' ? 'bg-white dark:bg-slate-600 shadow text-slate-700 dark:text-slate-300' : 'text-slate-500'}`}
                >
                  Offline
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-slate-100 dark:border-slate-700">
            <div className="text-center">
              <p className="text-sm text-slate-500 dark:text-slate-400">Total XP</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">4,250</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-slate-500 dark:text-slate-400">Rescues</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">12</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-slate-500 dark:text-slate-400">Avg Response</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">4.2m</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-slate-500 dark:text-slate-400">Rating</p>
              <p className="text-2xl font-bold text-amber-500 mt-1 flex justify-center items-center">
                4.9 <Star className="w-4 h-4 ml-1 fill-current" />
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center">
            <Award className="w-5 h-5 mr-2 text-amber-500" />
            Badges & Certifications
          </h3>
          <div className="space-y-4">
            {badges.map((badge, idx) => (
              <div key={idx} className="flex items-center space-x-4 bg-slate-50 dark:bg-slate-700/30 p-3 rounded-lg border border-slate-100 dark:border-slate-700">
                <div className={`p-2 rounded-full ${badge.bg}`}>
                  <badge.icon className={`w-5 h-5 ${badge.color}`} />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white text-sm">{badge.name}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Verified by platform</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center">
            <Activity className="w-5 h-5 mr-2 text-emerald-500" />
            Training Progress
          </h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-slate-700 dark:text-slate-300">Basic First Aid</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">100%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-slate-700 dark:text-slate-300">Advanced Trauma Life Support</span>
                <span className="text-amber-500 font-medium">60%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2">
                <div className="bg-amber-500 h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-slate-700 dark:text-slate-300">Emergency Extrication</span>
                <span className="text-slate-500 font-medium">0%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2">
                <div className="bg-slate-300 dark:bg-slate-600 h-2 rounded-full" style={{ width: '0%' }}></div>
              </div>
            </div>
          </div>
          <button className="mt-6 w-full py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 text-sm font-medium rounded-lg transition-colors">
            Continue Training
          </button>
        </div>
      </div>
    </div>
  );
};
