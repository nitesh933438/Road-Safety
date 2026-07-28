import React from 'react';
import { motion } from 'framer-motion';
import { Users, Activity, HeartPulse, Hospital, AlertTriangle, ShieldCheck } from 'lucide-react';

interface Props {
  setActiveTab: (tab: any) => void;
}

export const CommunityDashboard: React.FC<Props> = ({ setActiveTab }) => {
  const stats = [
    { title: 'Total Volunteers', value: '12,450', icon: Users, color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/30' },
    { title: 'Nearby Volunteers', value: '342', icon: ShieldCheck, color: 'text-emerald-500', bg: 'bg-emerald-100 dark:bg-emerald-900/30' },
    { title: 'Lives Assisted', value: '4,892', icon: HeartPulse, color: 'text-rose-500', bg: 'bg-rose-100 dark:bg-rose-900/30' },
    { title: 'Active SOS', value: '12', icon: AlertTriangle, color: 'text-amber-500', bg: 'bg-amber-100 dark:bg-amber-900/30' },
    { title: 'Rescue Points', value: '156', icon: Activity, color: 'text-purple-500', bg: 'bg-purple-100 dark:bg-purple-900/30' },
    { title: 'Hospitals Connected', value: '48', icon: Hospital, color: 'text-cyan-500', bg: 'bg-cyan-100 dark:bg-cyan-900/30' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Network Overview</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Real-time statistics of the community rescue network.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center space-x-4"
          >
            <div className={`p-4 rounded-lg ${stat.bg}`}>
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.title}</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="bg-slate-900 rounded-xl p-8 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-2">Be a Hero. Save a Life.</h3>
            <p className="text-slate-300 mb-6 max-w-sm">
              Join our network of community volunteers. Get training, receive alerts, and help victims during the Golden Hour.
            </p>
            <button 
              onClick={() => setActiveTab('profile')}
              className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
            >
              Join the Network
            </button>
          </div>
          <HeartPulse className="absolute -right-8 -bottom-8 w-48 h-48 text-white/5" />
        </div>

        <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/50 rounded-xl p-8">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center">
            <Activity className="w-5 h-5 mr-2 text-emerald-600 dark:text-emerald-400" />
            Live Network Status
          </h3>
          <ul className="space-y-4">
            <li className="flex items-center text-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 mr-3"></span>
              <span className="text-slate-600 dark:text-slate-300 flex-1">Ambulance Dispatch System</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">Operational</span>
            </li>
            <li className="flex items-center text-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 mr-3"></span>
              <span className="text-slate-600 dark:text-slate-300 flex-1">Volunteer Notification Service</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">Operational</span>
            </li>
            <li className="flex items-center text-sm">
              <span className="w-2 h-2 rounded-full bg-amber-500 mr-3"></span>
              <span className="text-slate-600 dark:text-slate-300 flex-1">Hospital Bed Registry API</span>
              <span className="font-semibold text-amber-600 dark:text-amber-400">Degraded</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
