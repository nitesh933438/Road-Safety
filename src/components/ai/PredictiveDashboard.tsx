import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar, Legend, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { motion } from 'framer-motion';
import { Activity, AlertTriangle, CloudRain, Clock, Map, TrendingUp } from 'lucide-react';
import { AccidentPatternAnalysis } from './AccidentPatternAnalysis';

const riskTrendData = [
  { name: 'Jan', risk: 65, accidents: 120 },
  { name: 'Feb', risk: 59, accidents: 98 },
  { name: 'Mar', risk: 80, accidents: 150 },
  { name: 'Apr', risk: 81, accidents: 145 },
  { name: 'May', risk: 56, accidents: 85 },
  { name: 'Jun', risk: 45, accidents: 60 },
  { name: 'Jul', risk: 75, accidents: 130 }, // Monsoon
  { name: 'Aug', risk: 90, accidents: 180 }, // Monsoon
];

const weatherImpactData = [
  { name: 'Clear', value: 30, color: '#10b981' },
  { name: 'Rain', value: 45, color: '#3b82f6' },
  { name: 'Fog', value: 15, color: '#8b5cf6' },
  { name: 'Storm', value: 10, color: '#f43f5e' },
];

const trafficDensityData = [
  { time: '00:00', density: 10, risk: 20 },
  { time: '04:00', density: 5, risk: 15 },
  { time: '08:00', density: 85, risk: 70 }, // Morning rush
  { time: '12:00', density: 50, risk: 40 },
  { time: '16:00', density: 60, risk: 50 },
  { time: '20:00', density: 90, risk: 85 }, // Evening rush
  { time: '23:00', density: 30, risk: 55 }, // High risk due to speed/visibility
];

const STATS = [
  { title: 'Current System Risk', value: 'High (78%)', icon: AlertTriangle, color: 'text-rose-500', bg: 'bg-rose-100 dark:bg-rose-900/30', trend: '+12% from last week' },
  { title: 'Active Black Spots', value: '42', icon: Map, color: 'text-amber-500', bg: 'bg-amber-100 dark:bg-amber-900/30', trend: '3 new identified today' },
  { title: 'Avg Response Time', value: '8m 45s', icon: Clock, color: 'text-emerald-500', bg: 'bg-emerald-100 dark:bg-emerald-900/30', trend: '-2m improved this month' },
  { title: 'Weather Alert', value: 'Heavy Rain Warning', icon: CloudRain, color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/30', trend: 'Affecting 5 major routes' },
];

export const PredictiveDashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.title}</p>
                <h3 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</h3>
              </div>
              <div className={`p-3 rounded-lg ${stat.bg} ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="w-4 h-4 mr-1 text-slate-400" />
              <span className="text-slate-600 dark:text-slate-300">{stat.trend}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Trend Chart */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Monthly Risk & Accident Trend</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">AI predictions vs actual incidents</p>
            </div>
            <Activity className="text-indigo-500 w-5 h-5" />
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={riskTrendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorAccidents" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Legend />
                <Area type="monotone" dataKey="risk" name="Predicted Risk Score" stroke="#f43f5e" fillOpacity={1} fill="url(#colorRisk)" />
                <Area type="monotone" dataKey="accidents" name="Actual Accidents" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorAccidents)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Traffic Density vs Risk */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Traffic Density vs Risk</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">24-hour cycle analysis</p>
            </div>
            <Clock className="text-indigo-500 w-5 h-5" />
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trafficDensityData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <XAxis dataKey="time" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                />
                <Legend />
                <Line type="monotone" dataKey="density" name="Traffic Volume %" stroke="#3b82f6" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="risk" name="Accident Risk %" stroke="#f59e0b" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weather Impact */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm lg:col-span-1">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Weather Impact</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Contribution to accidents</p>
          </div>
          <div className="h-[250px] flex justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={weatherImpactData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {weatherImpactData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                />
                <Legend layout="horizontal" verticalAlign="bottom" align="center" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Accident Pattern Analysis (Child Component) */}
        <div className="lg:col-span-2">
          <AccidentPatternAnalysis />
        </div>
      </div>
    </div>
  );
};
