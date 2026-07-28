import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Server, Database, Cloud, HardDrive, Bell, Send, CheckCircle, AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';

export const SystemHealth: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'health' | 'notifications' | 'logs'>('health');
  const [notifType, setNotifType] = useState('Emergency');
  const [notifMessage, setNotifMessage] = useState('');

  const handleSendNotification = (e: React.FormEvent) => {
    e.preventDefault();
    if (!notifMessage.trim()) return;
    toast.success(`Notification sent: [${notifType}]`);
    setNotifMessage('');
  };

  const auditLogs = [
    { id: 'AL-101', date: '2023-10-24 10:45:00', action: 'User Suspended (U-2)', user: 'Admin User', status: 'Success' },
    { id: 'AL-102', date: '2023-10-24 09:30:12', action: 'Approved Report (RPT-002)', user: 'Admin User', status: 'Success' },
    { id: 'AL-103', date: '2023-10-23 15:20:00', action: 'System Backup Started', user: 'System', status: 'In Progress' },
    { id: 'AL-104', date: '2023-10-23 12:10:05', action: 'Broadcast Emergency Alert', user: 'Admin User', status: 'Success' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">System & Audit</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">Platform health, global broadcasts, and security logs.</p>
        </div>
      </div>

      <div className="flex space-x-2 pb-2 overflow-x-auto no-scrollbar border-b border-slate-200/50 dark:border-slate-800/50">
        {[
          { id: 'health', label: 'Health Status', icon: Server },
          { id: 'notifications', label: 'Notification Center', icon: Bell },
          { id: 'logs', label: 'Audit Logs', icon: Database },
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
                  layoutId="activeSystemTab"
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
        className="glass-card bg-white/60 dark:bg-slate-800/40 rounded-3xl border border-slate-200/50 dark:border-slate-700/50 shadow-sm p-6 backdrop-blur-sm"
      >
        <AnimatePresence mode="wait">
          {activeTab === 'health' && (
            <motion.div 
              key="health"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {[
                { title: 'Main Server', status: 'Operational', icon: Server, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-100 dark:bg-emerald-900/40', border: 'border-emerald-200/50 dark:border-emerald-800/50', statusColor: 'text-emerald-500' },
                { title: 'Firebase Status', status: 'Operational', icon: Cloud, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-100 dark:bg-emerald-900/40', border: 'border-emerald-200/50 dark:border-emerald-800/50', statusColor: 'text-emerald-500' },
                { title: 'Database Engine', status: 'Operational', icon: Database, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-100 dark:bg-emerald-900/40', border: 'border-emerald-200/50 dark:border-emerald-800/50', statusColor: 'text-emerald-500' },
                { title: 'Storage Usage', status: '85% Full', icon: HardDrive, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-100 dark:bg-amber-900/40', border: 'border-amber-200/50 dark:border-amber-800/50', statusColor: 'text-amber-500', isWarning: true },
              ].map((item, idx) => (
                <div key={idx} className={`flex items-center space-x-4 p-5 bg-white/60 dark:bg-slate-900/40 rounded-2xl border ${item.border} backdrop-blur-sm shadow-sm`}>
                  <div className={`p-3.5 rounded-xl ${item.bg} shadow-inner`}>
                    <item.icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{item.title}</p>
                    <p className={`font-black text-slate-900 dark:text-white flex items-center text-lg mt-0.5`}>
                      {item.status} 
                      {item.isWarning ? (
                        <AlertTriangle className={`w-4 h-4 ml-1.5 ${item.statusColor}`} />
                      ) : (
                        <CheckCircle className={`w-4 h-4 ml-1.5 ${item.statusColor}`} />
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'notifications' && (
            <motion.div 
              key="notifications"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="max-w-2xl"
            >
              <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight mb-6">Broadcast Global Message</h3>
              <form onSubmit={handleSendNotification} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Notification Type</label>
                  <select 
                    value={notifType}
                    onChange={(e) => setNotifType(e.target.value)}
                    className="w-full bg-white/60 dark:bg-slate-900/40 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 rounded-xl px-4 py-3 text-sm font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 shadow-sm outline-none transition-all"
                  >
                    <option>Emergency Alert</option>
                    <option>Maintenance Notice</option>
                    <option>Awareness Campaign</option>
                    <option>Training Update</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Message</label>
                  <textarea 
                    value={notifMessage}
                    onChange={(e) => setNotifMessage(e.target.value)}
                    rows={4}
                    placeholder="Type the message to broadcast to all users..."
                    className="w-full bg-white/60 dark:bg-slate-900/40 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 rounded-xl px-4 py-3 text-sm font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 shadow-sm outline-none resize-none transition-all"
                  />
                </div>
                <button 
                  type="submit"
                  className="inline-flex items-center justify-center space-x-2 px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl transition-all shadow-lg shadow-emerald-500/30 active:scale-95"
                >
                  <Send className="w-5 h-5" />
                  <span>Broadcast Now</span>
                </button>
              </form>
            </motion.div>
          )}

          {activeTab === 'logs' && (
            <motion.div 
              key="logs"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="overflow-x-auto -mx-6 -my-6 sm:mx-0 sm:my-0 rounded-2xl"
            >
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-slate-50/50 dark:bg-slate-900/30 border-b border-slate-200/50 dark:border-slate-700/50">
                  <tr>
                    <th className="px-6 py-4 font-black text-slate-600 dark:text-slate-300 uppercase tracking-wider text-[10px]">Date/Time</th>
                    <th className="px-6 py-4 font-black text-slate-600 dark:text-slate-300 uppercase tracking-wider text-[10px]">Action</th>
                    <th className="px-6 py-4 font-black text-slate-600 dark:text-slate-300 uppercase tracking-wider text-[10px]">User/System</th>
                    <th className="px-6 py-4 font-black text-slate-600 dark:text-slate-300 uppercase tracking-wider text-[10px]">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                  {auditLogs.map((log, idx) => (
                    <motion.tr 
                      key={log.id} 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      transition={{ delay: idx * 0.05 }} 
                      className="hover:bg-white/60 dark:hover:bg-slate-800/80 transition-colors"
                    >
                      <td className="px-6 py-4 text-slate-500 dark:text-slate-400 font-mono text-xs">{log.date}</td>
                      <td className="px-6 py-4 font-black text-slate-900 dark:text-white">{log.action}</td>
                      <td className="px-6 py-4 text-slate-600 dark:text-slate-300 font-medium">{log.user}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border ${
                          log.status === 'Success' ? 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-900' : 
                          'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-900'
                        }`}>
                          {log.status}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
