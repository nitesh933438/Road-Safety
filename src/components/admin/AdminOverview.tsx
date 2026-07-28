import React from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, LineChart, Line } from 'recharts';
import { Users, ShieldCheck, AlertTriangle, HeartPulse, FileText, Building2, ShieldAlert, Clock } from 'lucide-react';

export const AdminOverview: React.FC = () => {
  const kpis = [
    { title: 'Total Users', value: '45,231', icon: Users, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-100 dark:bg-blue-900/40', border: 'border-blue-200/50 dark:border-blue-800/50' },
    { title: 'Total Volunteers', value: '12,450', icon: ShieldCheck, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-100 dark:bg-emerald-900/40', border: 'border-emerald-200/50 dark:border-emerald-800/50' },
    { title: 'Active Emergencies', value: '14', icon: AlertTriangle, color: 'text-rose-600 dark:text-rose-400', bg: 'bg-rose-100 dark:bg-rose-900/40', border: 'border-rose-200/50 dark:border-rose-800/50' },
    { title: 'Avg Response Time', value: '6.2m', icon: Clock, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-100 dark:bg-amber-900/40', border: 'border-amber-200/50 dark:border-amber-800/50' },
  ];

  const secondaryKpis = [
    { title: 'Accident Reports', value: '1,204', icon: FileText, color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-100 dark:bg-purple-900/40' },
    { title: 'Hospitals Connected', value: '86', icon: Building2, color: 'text-cyan-600 dark:text-cyan-400', bg: 'bg-cyan-100 dark:bg-cyan-900/40' },
    { title: 'Police Connected', value: '42', icon: ShieldAlert, color: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-100 dark:bg-indigo-900/40' },
    { title: 'Lives Assisted', value: '4,892', icon: HeartPulse, color: 'text-teal-600 dark:text-teal-400', bg: 'bg-teal-100 dark:bg-teal-900/40' },
  ];

  const monthlyAccidents = [
    { name: 'Jan', critical: 45, moderate: 120, minor: 210 },
    { name: 'Feb', critical: 52, moderate: 140, minor: 230 },
    { name: 'Mar', critical: 38, moderate: 110, minor: 190 },
    { name: 'Apr', critical: 65, moderate: 160, minor: 280 },
    { name: 'May', critical: 58, moderate: 145, minor: 250 },
    { name: 'Jun', critical: 42, moderate: 130, minor: 220 },
  ];

  const volunteerGrowth = [
    { name: 'Jan', volunteers: 8500, trained: 5200 },
    { name: 'Feb', volunteers: 9200, trained: 6100 },
    { name: 'Mar', volunteers: 10100, trained: 7500 },
    { name: 'Apr', volunteers: 11500, trained: 8900 },
    { name: 'May', volunteers: 12000, trained: 9800 },
    { name: 'Jun', volunteers: 12450, trained: 10500 },
  ];

  const responseTimeData = [
    { time: '0-5m', count: 420 },
    { time: '5-10m', count: 310 },
    { time: '10-15m', count: 180 },
    { time: '15m+', count: 45 },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } }
  } as const;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">System Overview</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Real-time telemetry and platform analytics.</p>
        </div>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {kpis.map((kpi, idx) => (
          <motion.div
            key={kpi.title}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className={`glass-card p-6 rounded-3xl border ${kpi.border} bg-white/60 dark:bg-slate-800/40 backdrop-blur-sm shadow-sm relative overflow-hidden group`}
          >
            <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full ${kpi.bg} opacity-50 group-hover:opacity-100 transition-opacity pointer-events-none blur-2xl z-0`} />
            
            <div className="relative z-10 flex flex-col space-y-4">
              <div className={`w-12 h-12 rounded-2xl ${kpi.bg} flex items-center justify-center border border-white/50 dark:border-slate-700/50 shadow-inner`}>
                <kpi.icon className={`w-6 h-6 ${kpi.color}`} />
              </div>
              <div>
                <p className="text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">{kpi.title}</p>
                <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter mt-1">{kpi.value}</h3>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {secondaryKpis.map((kpi, idx) => (
          <motion.div
            key={kpi.title}
            variants={itemVariants}
            whileHover={{ y: -2 }}
            className="glass-card p-4 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 bg-white/40 dark:bg-slate-800/20 backdrop-blur-sm shadow-sm flex items-center space-x-4"
          >
            <div className={`p-2.5 rounded-xl ${kpi.bg} border border-white/50 dark:border-slate-700/50`}>
              <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{kpi.title}</p>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">{kpi.value}</h3>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Accidents Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card bg-white/60 dark:bg-slate-800/40 p-6 rounded-3xl border border-slate-200/50 dark:border-slate-700/50 shadow-sm"
        >
          <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight mb-6">Accident Trends</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyAccidents} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCritical" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorModerate" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#94a3b8" opacity={0.15} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dx={-10} />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', backdropFilter: 'blur(8px)', border: '1px solid rgba(51, 65, 85, 0.5)', borderRadius: '1rem', color: '#fff', fontWeight: 'bold' }} />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                <Area type="monotone" dataKey="critical" stroke="#f43f5e" strokeWidth={3} fillOpacity={1} fill="url(#colorCritical)" name="Critical" />
                <Area type="monotone" dataKey="moderate" stroke="#f59e0b" strokeWidth={3} fillOpacity={1} fill="url(#colorModerate)" name="Moderate" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Volunteer Growth Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card bg-white/60 dark:bg-slate-800/40 p-6 rounded-3xl border border-slate-200/50 dark:border-slate-700/50 shadow-sm"
        >
          <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight mb-6">Volunteer Growth & Training</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={volunteerGrowth} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#94a3b8" opacity={0.15} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dx={-10} />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', backdropFilter: 'blur(8px)', border: '1px solid rgba(51, 65, 85, 0.5)', borderRadius: '1rem', color: '#fff', fontWeight: 'bold' }} />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                <Line type="monotone" dataKey="volunteers" stroke="#3b82f6" strokeWidth={4} name="Total Volunteers" dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="trained" stroke="#10b981" strokeWidth={4} name="Fully Trained" dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
        
        {/* Response Times Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card bg-white/60 dark:bg-slate-800/40 p-6 rounded-3xl border border-slate-200/50 dark:border-slate-700/50 shadow-sm lg:col-span-2"
        >
          <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight mb-6">Response Time Distribution (Emergency SOS)</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={responseTimeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#94a3b8" opacity={0.15} />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dx={-10} />
                <Tooltip cursor={{ fill: 'rgba(148, 163, 184, 0.1)' }} contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', backdropFilter: 'blur(8px)', border: '1px solid rgba(51, 65, 85, 0.5)', borderRadius: '1rem', color: '#fff', fontWeight: 'bold' }} />
                <Bar dataKey="count" fill="#8b5cf6" radius={[6, 6, 0, 0]} name="Incidents" maxBarSize={60} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
