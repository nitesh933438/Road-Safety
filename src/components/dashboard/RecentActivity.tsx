/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Clock, MapPin, AlertCircle, CheckCircle2, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

export const RecentActivity: React.FC = () => {
  const activities = [
    {
      id: 'INC-8492',
      time: '12 mins ago',
      location: 'NH-48 Highway, Mile Marker 142',
      severity: 'Critical',
      status: 'Dispatched',
      response: 'Ambulance 108 & Traffic Police Unit #4',
    },
    {
      id: 'INC-8491',
      time: '34 mins ago',
      location: 'Ring Road Junction 7, East Corridor',
      severity: 'Moderate',
      status: 'Resolved',
      response: 'Good Samaritan AI Triage + Volunteer First Aid',
    },
    {
      id: 'INC-8490',
      time: '1 hour ago',
      location: 'Expressway Flyover Overpass 3',
      severity: 'High',
      status: 'En Route',
      response: 'Trauma Center Team A (City Hospital)',
    },
    {
      id: 'INC-8489',
      time: '2 hours ago',
      location: 'State Highway 12, Sector 9 Curve',
      severity: 'Moderate',
      status: 'Resolved',
      response: 'Local Police Patrol & Medical Escort',
    },
  ];

  const getSeverityBadge = (sev: string) => {
    switch (sev) {
      case 'Critical':
        return 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 border-rose-200 dark:border-rose-800/50';
      case 'High':
        return 'bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300 border-orange-200 dark:border-orange-800/50';
      default:
        return 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300 border-amber-200 dark:border-amber-800/50';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Resolved':
        return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/50';
      case 'Dispatched':
        return 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/50';
      default:
        return 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800/50';
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } }
  };

  return (
    <div className="glass-card border border-white/50 dark:border-slate-800/50 rounded-[2rem] p-6 shadow-sm overflow-hidden relative">
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-500/5 rounded-full blur-[80px] pointer-events-none" />
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4 relative z-10">
        <div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Recent Emergency Activity</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">Live dispatch log across highway sectors</p>
        </div>
        <span className="text-xs font-mono font-bold bg-white/60 dark:bg-slate-800/60 border border-slate-200/50 dark:border-slate-700/50 text-indigo-700 dark:text-indigo-300 px-3 py-1.5 rounded-lg shadow-sm backdrop-blur-sm whitespace-nowrap">
          4 Active Incidents Logged
        </span>
      </div>

      <div className="overflow-x-auto relative z-10">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200/50 dark:border-slate-700/50 text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              <th className="py-4 px-4 whitespace-nowrap">Incident ID</th>
              <th className="py-4 px-4 whitespace-nowrap">Location</th>
              <th className="py-4 px-4 whitespace-nowrap">Severity</th>
              <th className="py-4 px-4 whitespace-nowrap">Status</th>
              <th className="py-4 px-4 whitespace-nowrap">Response Unit</th>
              <th className="py-4 px-4 whitespace-nowrap text-right">Time</th>
            </tr>
          </thead>
          <motion.tbody 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="divide-y divide-slate-100/50 dark:divide-slate-800/30 text-sm"
          >
            {activities.map((item) => (
              <motion.tr 
                key={item.id} 
                variants={itemVariants}
                className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors group"
              >
                <td className="py-4 px-4 font-mono font-black text-xs text-indigo-600 dark:text-indigo-400 whitespace-nowrap">
                  {item.id}
                </td>
                <td className="py-4 px-4 text-slate-800 dark:text-slate-200 font-medium">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-indigo-400 dark:text-indigo-500 flex-shrink-0 group-hover:animate-bounce" />
                    <span className="truncate max-w-[200px] sm:max-w-xs">{item.location}</span>
                  </div>
                </td>
                <td className="py-4 px-4 whitespace-nowrap">
                  <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border ${getSeverityBadge(item.severity)} shadow-sm`}>
                    {item.severity}
                  </span>
                </td>
                <td className="py-4 px-4 whitespace-nowrap">
                  <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm ${getStatusBadge(item.status)}`}>
                    {item.status}
                  </span>
                </td>
                <td className="py-4 px-4 text-xs text-slate-600 dark:text-slate-300 font-medium max-w-[150px] sm:max-w-none truncate">
                  {item.response}
                </td>
                <td className="py-4 px-4 text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap text-right font-medium">
                  {item.time}
                </td>
              </motion.tr>
            ))}
          </motion.tbody>
        </table>
      </div>
    </div>
  );
};
