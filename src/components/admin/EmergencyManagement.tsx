import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, MoreVertical, AlertTriangle } from 'lucide-react';

export const EmergencyManagement: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const emergencies = [
    { id: 'EM-1042', time: '10:45 AM', location: 'NH-44, Sector 62', severity: 'Critical', assigned: 'Ravi K.', hospital: 'City Gen', status: 'Active' },
    { id: 'EM-1041', time: '10:12 AM', location: 'City Center Mall', severity: 'High', assigned: 'Priya S.', hospital: 'Metro Trauma', status: 'Pending' },
    { id: 'EM-1040', time: '09:30 AM', location: 'Ring Road, Exit 4', severity: 'Medium', assigned: 'Amit S.', hospital: 'N/A', status: 'Completed' },
    { id: 'EM-1039', time: '08:15 AM', location: 'MG Road Junction', severity: 'Minor', assigned: 'N/A', hospital: 'N/A', status: 'Cancelled' },
    { id: 'EM-1038', time: 'Yesterday', location: 'Sector 18 Market', severity: 'Critical', assigned: 'Ravi K.', hospital: 'City Gen', status: 'Completed' },
  ];

  const filters = ['All', 'Pending', 'Active', 'Completed', 'Cancelled'];

  const filteredData = emergencies.filter(em => {
    const matchesFilter = filter === 'All' || em.status === filter;
    const matchesSearch = em.id.toLowerCase().includes(search.toLowerCase()) || 
                          em.location.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Emergency Dispatch Logs</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">Live tracking and management of all SOS alerts.</p>
        </div>
        
        <div className="flex space-x-3">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search emergencies..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2.5 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 w-full sm:w-64 text-slate-900 dark:text-white shadow-sm transition-all outline-none"
            />
          </div>
          <button className="p-2.5 glass-card bg-white/60 dark:bg-slate-800/60 border border-slate-200/50 dark:border-slate-700/50 rounded-xl text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors shadow-sm">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex overflow-x-auto space-x-2 pb-2 no-scrollbar">
        {filters.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all shadow-sm relative overflow-hidden group ${
              filter === f
                ? 'text-white'
                : 'bg-white/60 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 border border-slate-200/50 dark:border-slate-700/50 hover:bg-white dark:hover:bg-slate-800'
            }`}
          >
            {filter === f && (
              <motion.div
                layoutId="activeFilter"
                className="absolute inset-0 bg-emerald-600 dark:bg-emerald-500"
                initial={false}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <span className="relative z-10">{f}</span>
          </button>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card bg-white/60 dark:bg-slate-800/40 rounded-3xl border border-slate-200/50 dark:border-slate-700/50 overflow-hidden shadow-sm backdrop-blur-sm"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-200/50 dark:border-slate-700/50">
              <tr>
                <th className="px-6 py-4 font-black text-slate-600 dark:text-slate-300 uppercase tracking-wider text-[10px]">ID</th>
                <th className="px-6 py-4 font-black text-slate-600 dark:text-slate-300 uppercase tracking-wider text-[10px]">Time</th>
                <th className="px-6 py-4 font-black text-slate-600 dark:text-slate-300 uppercase tracking-wider text-[10px]">Location</th>
                <th className="px-6 py-4 font-black text-slate-600 dark:text-slate-300 uppercase tracking-wider text-[10px]">Severity</th>
                <th className="px-6 py-4 font-black text-slate-600 dark:text-slate-300 uppercase tracking-wider text-[10px]">Volunteer</th>
                <th className="px-6 py-4 font-black text-slate-600 dark:text-slate-300 uppercase tracking-wider text-[10px]">Hospital</th>
                <th className="px-6 py-4 font-black text-slate-600 dark:text-slate-300 uppercase tracking-wider text-[10px]">Status</th>
                <th className="px-6 py-4 font-black text-slate-600 dark:text-slate-300 uppercase tracking-wider text-[10px] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
              <AnimatePresence mode="popLayout">
                {filteredData.map((em, idx) => (
                  <motion.tr 
                    key={em.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="hover:bg-white dark:hover:bg-slate-800/80 transition-colors group"
                  >
                    <td className="px-6 py-4 font-black text-slate-900 dark:text-white">{em.id}</td>
                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400 font-medium">{em.time}</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300 font-medium">{em.location}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border ${
                        em.severity === 'Critical' ? 'bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-900' :
                        em.severity === 'High' ? 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-900' :
                        'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-300 dark:border-yellow-900'
                      }`}>
                        {em.severity}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300 font-medium">{em.assigned}</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300 font-medium">{em.hospital}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                        em.status === 'Active' ? 'bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-900 shadow-sm shadow-rose-500/20' :
                        em.status === 'Pending' ? 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-900' :
                        em.status === 'Completed' ? 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-900' :
                        'bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
                      }`}>
                        {em.status === 'Active' && <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mr-1.5 animate-pulse"></span>}
                        {em.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors opacity-0 group-hover:opacity-100">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          {filteredData.length === 0 && (
            <div className="p-12 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
                <AlertTriangle className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">No Emergencies Found</h3>
              <p className="text-sm text-slate-500 mt-1 max-w-sm">No dispatch logs match your current search and filter criteria.</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
