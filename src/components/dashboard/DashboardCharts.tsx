/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, LineChart, Line, Legend
} from 'recharts';
import { TrendingUp, Clock, Users, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const accidentTrendData = [
  { month: 'Jan', accidents: 320, prevented: 120 },
  { month: 'Feb', accidents: 290, prevented: 140 },
  { month: 'Mar', accidents: 340, prevented: 180 },
  { month: 'Apr', accidents: 270, prevented: 195 },
  { month: 'May', accidents: 250, prevented: 220 },
  { month: 'Jun', accidents: 210, prevented: 250 },
];

const responseTimeData = [
  { zone: 'North Highway', avgTime: 7.2 },
  { zone: 'South Expressway', avgTime: 6.5 },
  { zone: 'East Bypass', avgTime: 9.1 },
  { zone: 'West Ring Road', avgTime: 8.0 },
  { zone: 'Central District', avgTime: 5.4 },
];

const volunteerGrowthData = [
  { week: 'W1', volunteers: 450 },
  { week: 'W2', volunteers: 680 },
  { week: 'W3', volunteers: 920 },
  { week: 'W4', volunteers: 1150 },
  { week: 'W5', volunteers: 1420 },
];

const trainingCompletionData = [
  { category: 'CPR Basic', certified: 2400 },
  { category: 'Bleeding Control', certified: 1850 },
  { category: 'Trauma Triage', certified: 1120 },
  { category: 'Highway Safety', certified: 520 },
];

export const DashboardCharts: React.FC = () => {
  const [activeChart, setActiveChart] = useState<'trends' | 'response' | 'volunteers' | 'training'>('trends');

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="glass-card border border-white/50 dark:border-slate-800/50 rounded-3xl p-6 sm:p-8 shadow-sm space-y-8 relative overflow-hidden"
    >
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 relative z-10">
        <div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Analytics & Trauma Telemetry</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">Monthly highway safety and response metrics</p>
        </div>

        {/* Chart Selector Tabs */}
        <div className="flex flex-wrap sm:flex-nowrap bg-slate-100/50 dark:bg-slate-800/50 p-1.5 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 text-xs font-bold backdrop-blur-sm gap-1">
          <button
            onClick={() => setActiveChart('trends')}
            className={`px-4 py-2 rounded-xl transition-all flex-1 sm:flex-none ${activeChart === 'trends' ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm border border-slate-200/50 dark:border-slate-700/50' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50'}`}
          >
            Accident Trend
          </button>
          <button
            onClick={() => setActiveChart('response')}
            className={`px-4 py-2 rounded-xl transition-all flex-1 sm:flex-none ${activeChart === 'response' ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm border border-slate-200/50 dark:border-slate-700/50' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50'}`}
          >
            Response Time
          </button>
          <button
            onClick={() => setActiveChart('volunteers')}
            className={`px-4 py-2 rounded-xl transition-all flex-1 sm:flex-none ${activeChart === 'volunteers' ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm border border-slate-200/50 dark:border-slate-700/50' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50'}`}
          >
            Volunteers
          </button>
          <button
            onClick={() => setActiveChart('training')}
            className={`px-4 py-2 rounded-xl transition-all flex-1 sm:flex-none ${activeChart === 'training' ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm border border-slate-200/50 dark:border-slate-700/50' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50'}`}
          >
            Training
          </button>
        </div>
      </div>

      <div className="h-80 w-full relative z-10">
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeChart}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full"
          >
            {activeChart === 'trends' && (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={accidentTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" opacity={0.15} vertical={false} />
                  <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                  <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} dx={-10} />
                  <Tooltip
                    contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', backdropFilter: 'blur(8px)', borderColor: 'rgba(51, 65, 85, 0.5)', borderRadius: '1rem', color: '#f8fafc', fontWeight: 'bold' }}
                    itemStyle={{ fontWeight: 'bold' }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                  <Area type="monotone" dataKey="accidents" name="Reported Accidents" stroke="#f43f5e" strokeWidth={3} fill="url(#colorAccidents)" />
                  <Area type="monotone" dataKey="prevented" name="Lives Saved / Prevented" stroke="#10b981" strokeWidth={3} fill="url(#colorPrevented)" />
                  <defs>
                    <linearGradient id="colorAccidents" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorPrevented" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            )}

            {activeChart === 'response' && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={responseTimeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" opacity={0.15} vertical={false} />
                  <XAxis dataKey="zone" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                  <YAxis stroke="#64748b" fontSize={12} unit="m" tickLine={false} axisLine={false} dx={-10} />
                  <Tooltip
                    contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', backdropFilter: 'blur(8px)', borderColor: 'rgba(51, 65, 85, 0.5)', borderRadius: '1rem', color: '#f8fafc', fontWeight: 'bold' }}
                    itemStyle={{ fontWeight: 'bold', color: '#f59e0b' }}
                    cursor={{ fill: 'rgba(148, 163, 184, 0.1)' }}
                  />
                  <Bar dataKey="avgTime" name="Avg Response Time (Min)" fill="#f59e0b" radius={[8, 8, 0, 0]} maxBarSize={60} />
                </BarChart>
              </ResponsiveContainer>
            )}

            {activeChart === 'volunteers' && (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={volunteerGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" opacity={0.15} vertical={false} />
                  <XAxis dataKey="week" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                  <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} dx={-10} />
                  <Tooltip
                    contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', backdropFilter: 'blur(8px)', borderColor: 'rgba(51, 65, 85, 0.5)', borderRadius: '1rem', color: '#f8fafc', fontWeight: 'bold' }}
                    itemStyle={{ fontWeight: 'bold', color: '#6366f1' }}
                  />
                  <Line type="monotone" dataKey="volunteers" name="Active Volunteers" stroke="#6366f1" strokeWidth={4} dot={{ r: 6, fill: '#6366f1', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            )}

            {activeChart === 'training' && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={trainingCompletionData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" opacity={0.15} horizontal={false} />
                  <XAxis type="number" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis dataKey="category" type="category" stroke="#64748b" fontSize={12} width={120} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', backdropFilter: 'blur(8px)', borderColor: 'rgba(51, 65, 85, 0.5)', borderRadius: '1rem', color: '#f8fafc', fontWeight: 'bold' }}
                    itemStyle={{ fontWeight: 'bold', color: '#10b981' }}
                    cursor={{ fill: 'rgba(148, 163, 184, 0.1)' }}
                  />
                  <Bar dataKey="certified" name="Certified Participants" fill="#10b981" radius={[0, 8, 8, 0]} maxBarSize={40} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
