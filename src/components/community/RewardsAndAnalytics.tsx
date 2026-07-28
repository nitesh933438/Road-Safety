import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { Award, TrendingUp, Users, Activity } from 'lucide-react';

export const RewardsAndAnalytics: React.FC = () => {
  const activityData = [
    { name: 'Jan', rescues: 45, volunteers: 120 },
    { name: 'Feb', rescues: 52, volunteers: 150 },
    { name: 'Mar', rescues: 38, volunteers: 180 },
    { name: 'Apr', rescues: 65, volunteers: 220 },
    { name: 'May', rescues: 58, volunteers: 250 },
    { name: 'Jun', rescues: 72, volunteers: 310 },
  ];

  const responseTimeData = [
    { time: '0-5m', count: 120 },
    { time: '5-10m', count: 85 },
    { time: '10-15m', count: 40 },
    { time: '15m+', count: 15 },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Network Analytics</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Impact and performance of the community rescue network.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Avg Response Time</p>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">6.2 min</p>
          <p className="text-xs text-emerald-500 flex items-center justify-center mt-1">
            <TrendingUp className="w-3 h-3 mr-1" /> -1.2m this month
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Acceptance Rate</p>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">84%</p>
          <p className="text-xs text-emerald-500 flex items-center justify-center mt-1">
            <TrendingUp className="w-3 h-3 mr-1" /> +5% this month
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Lives Helped</p>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">4,892</p>
          <p className="text-xs text-slate-400 mt-1">Since platform launch</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Total XP Awarded</p>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">1.2M</p>
          <p className="text-xs text-amber-500 mt-1">Across all volunteers</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Chart 1: Activity Growth */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Growth & Activity</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRescues" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorVols" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Legend />
                <Area type="monotone" dataKey="volunteers" stroke="#3b82f6" fillOpacity={1} fill="url(#colorVols)" />
                <Area type="monotone" dataKey="rescues" stroke="#10b981" fillOpacity={1} fill="url(#colorRescues)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Response Times */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Response Time Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={responseTimeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip 
                  cursor={{ fill: '#f1f5f9', opacity: 0.1 }}
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                />
                <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="Incidents" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Gamification Explanation */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl p-8 text-white">
        <div className="flex items-start md:items-center flex-col md:flex-row gap-6">
          <div className="p-4 bg-white/20 rounded-full backdrop-blur-sm">
            <Award className="w-10 h-10 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-2">Rewards System Active</h3>
            <p className="text-amber-50 max-w-2xl text-sm md:text-base">
              Volunteers earn XP for completing training modules, responding to emergencies, and reporting hazards. Unlock badges and earn certificates recognized by local authorities.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
