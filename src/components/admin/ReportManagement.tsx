import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Map, Trash2, CheckCircle, Archive, AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';

export const ReportManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'reports' | 'hotspots'>('reports');

  const reports = [
    { id: 'RPT-001', date: 'Oct 24, 2023', user: 'Ravi Kumar', type: 'Pothole', status: 'Pending', severity: 'Medium' },
    { id: 'RPT-002', date: 'Oct 23, 2023', user: 'Neha Gupta', type: 'Accident', status: 'Approved', severity: 'Critical' },
    { id: 'RPT-003', date: 'Oct 20, 2023', user: 'Amit S.', type: 'Broken Signal', status: 'Archived', severity: 'Minor' },
  ];

  const hotspots = [
    { id: 'HS-1', location: 'NH-44 Curve', risk: 'Critical', accidents: 24, status: 'Active' },
    { id: 'HS-2', location: 'Sector 62 Crossing', risk: 'High', accidents: 15, status: 'Active' },
    { id: 'HS-3', location: 'MG Road Junction', risk: 'Medium', accidents: 8, status: 'Active' },
  ];

  const handleAction = (action: string, id: string) => {
    toast.success(`${action} applied to ${id}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Reports & Black Spots</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">Review community reports and track high-risk areas.</p>
        </div>
      </div>

      <div className="flex space-x-2 pb-2 overflow-x-auto no-scrollbar border-b border-slate-200/50 dark:border-slate-800/50">
        {[
          { id: 'reports', label: 'User Reports', icon: FileText },
          { id: 'hotspots', label: 'Black Spots (Hotspots)', icon: Map },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-3 text-sm font-bold transition-all relative whitespace-nowrap group ${
                isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400 group-hover:text-slate-500 dark:group-hover:text-slate-300'}`} />
                <span>{tab.label}</span>
              </div>
              {isActive && (
                <motion.div
                  layoutId="activeReportTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 dark:bg-emerald-400"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>

      <motion.div 
        layout
        className="glass-card bg-white/60 dark:bg-slate-800/40 rounded-3xl border border-slate-200/50 dark:border-slate-700/50 overflow-hidden shadow-sm backdrop-blur-sm"
      >
        <div className="overflow-x-auto">
          <AnimatePresence mode="wait">
            {activeTab === 'reports' ? (
              <motion.table 
                key="reports-table"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="w-full text-left text-sm whitespace-nowrap"
              >
                <thead className="bg-slate-50/50 dark:bg-slate-900/30 border-b border-slate-200/50 dark:border-slate-700/50">
                  <tr>
                    <th className="px-6 py-4 font-black text-slate-600 dark:text-slate-300 uppercase tracking-wider text-[10px]">ID</th>
                    <th className="px-6 py-4 font-black text-slate-600 dark:text-slate-300 uppercase tracking-wider text-[10px]">Date</th>
                    <th className="px-6 py-4 font-black text-slate-600 dark:text-slate-300 uppercase tracking-wider text-[10px]">User</th>
                    <th className="px-6 py-4 font-black text-slate-600 dark:text-slate-300 uppercase tracking-wider text-[10px]">Type</th>
                    <th className="px-6 py-4 font-black text-slate-600 dark:text-slate-300 uppercase tracking-wider text-[10px]">Severity</th>
                    <th className="px-6 py-4 font-black text-slate-600 dark:text-slate-300 uppercase tracking-wider text-[10px]">Status</th>
                    <th className="px-6 py-4 font-black text-slate-600 dark:text-slate-300 uppercase tracking-wider text-[10px] text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                  {reports.map((r, idx) => (
                    <motion.tr 
                      key={r.id} 
                      initial={{ opacity: 0, y: 5 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      transition={{ delay: idx * 0.05 }} 
                      className="hover:bg-white/60 dark:hover:bg-slate-800/80 transition-colors group"
                    >
                      <td className="px-6 py-4 font-black text-slate-900 dark:text-white">{r.id}</td>
                      <td className="px-6 py-4 text-slate-500 dark:text-slate-400 font-medium">{r.date}</td>
                      <td className="px-6 py-4 text-slate-600 dark:text-slate-300 font-medium">{r.user}</td>
                      <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">{r.type}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border ${
                          r.severity === 'Critical' ? 'bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-900' :
                          r.severity === 'Medium' ? 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-900' :
                          'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-900'
                        }`}>
                          {r.severity}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-800 border border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700">
                          {r.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => handleAction('Approved', r.id)} className="p-2 text-emerald-500 bg-emerald-50 dark:bg-emerald-900/30 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 rounded-xl transition-all shadow-sm" title="Approve">
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleAction('Archived', r.id)} className="p-2 text-slate-500 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-all shadow-sm" title="Archive">
                            <Archive className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </motion.table>
            ) : (
              <motion.table 
                key="hotspots-table"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="w-full text-left text-sm whitespace-nowrap"
              >
                <thead className="bg-slate-50/50 dark:bg-slate-900/30 border-b border-slate-200/50 dark:border-slate-700/50">
                  <tr>
                    <th className="px-6 py-4 font-black text-slate-600 dark:text-slate-300 uppercase tracking-wider text-[10px]">ID</th>
                    <th className="px-6 py-4 font-black text-slate-600 dark:text-slate-300 uppercase tracking-wider text-[10px]">Location</th>
                    <th className="px-6 py-4 font-black text-slate-600 dark:text-slate-300 uppercase tracking-wider text-[10px]">Risk Level</th>
                    <th className="px-6 py-4 font-black text-slate-600 dark:text-slate-300 uppercase tracking-wider text-[10px]">Recorded Accidents</th>
                    <th className="px-6 py-4 font-black text-slate-600 dark:text-slate-300 uppercase tracking-wider text-[10px]">Status</th>
                    <th className="px-6 py-4 font-black text-slate-600 dark:text-slate-300 uppercase tracking-wider text-[10px] text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                  {hotspots.map((hs, idx) => (
                    <motion.tr 
                      key={hs.id} 
                      initial={{ opacity: 0, y: 5 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      transition={{ delay: idx * 0.05 }} 
                      className="hover:bg-white/60 dark:hover:bg-slate-800/80 transition-colors group"
                    >
                      <td className="px-6 py-4 font-black text-slate-900 dark:text-white">{hs.id}</td>
                      <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">{hs.location}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border ${
                          hs.risk === 'Critical' ? 'bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-900' :
                          hs.risk === 'High' ? 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-950 dark:text-orange-300 dark:border-orange-900' :
                          'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-900'
                        }`}>
                          {hs.risk === 'Critical' && <AlertTriangle className="w-3 h-3 mr-1.5" />}
                          {hs.risk}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-600 dark:text-slate-300 font-medium">{hs.accidents} incidents</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-900">
                          {hs.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button onClick={() => handleAction('Deleted', hs.id)} className="p-2 text-rose-500 bg-rose-50 dark:bg-rose-900/30 hover:bg-rose-100 dark:hover:bg-rose-900/50 rounded-xl transition-all shadow-sm opacity-0 group-hover:opacity-100" title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </motion.table>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};
