import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Shield, UserX, UserCheck, CheckCircle, XCircle, Users } from 'lucide-react';
import toast from 'react-hot-toast';

export const UserManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'users' | 'volunteers'>('users');
  const [search, setSearch] = useState('');

  const [users, setUsers] = useState([
    { id: 'U-1', name: 'Rahul Sharma', role: 'citizen', status: 'Active', email: 'rahul@example.com' },
    { id: 'U-2', name: 'Neha Gupta', role: 'volunteer', status: 'Active', email: 'neha@example.com' },
    { id: 'U-3', name: 'Metro Life Hospital', role: 'hospital', status: 'Active', email: 'emergency@metrolife.org' },
    { id: 'U-4', name: 'City Traffic Control', role: 'police', status: 'Active', email: 'dispatch@police.gov.in' },
    { id: 'U-5', name: 'Nitesh Kumar', role: 'admin', status: 'Active', email: 'nitesh933438@gmail.com' },
  ]);

  const roleStyles: Record<string, string> = {
    admin: 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-950 dark:text-purple-300 dark:border-purple-900',
    police: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-900',
    hospital: 'bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-900',
    volunteer: 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-900',
    citizen: 'bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
  };

  const handleRoleChange = (userId: string, newRole: string) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
    toast.success(`Updated role for ${userId} to ${newRole.toUpperCase()}`);
  };

  const volunteers = [
    { id: 'V-1', name: 'Dr. Priya Singh', cert: 'Trauma Surgeon', rating: 4.9, city: 'Delhi', status: 'Approved', rescues: 112 },
    { id: 'V-2', name: 'Amit Kumar', cert: 'Basic First Aid', rating: 4.5, city: 'Mumbai', status: 'Pending', rescues: 0 },
    { id: 'V-3', name: 'Ravi Verma', cert: 'CPR Certified', rating: 4.8, city: 'Delhi', status: 'Approved', rescues: 45 },
  ];

  const handleSuspend = (id: string) => {
    toast.success(`User ${id} suspended`);
  };

  const handleActivate = (id: string) => {
    toast.success(`User ${id} activated`);
  };

  const handleApprove = (id: string) => {
    toast.success(`Volunteer ${id} approved`);
  };

  const handleReject = (id: string) => {
    toast.error(`Volunteer ${id} rejected`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">User & Role Management</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">Manage citizens, admins, and verify volunteers.</p>
        </div>
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search name or ID..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2.5 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 w-full sm:w-64 text-slate-900 dark:text-white shadow-sm transition-all outline-none"
          />
        </div>
      </div>

      <div className="flex space-x-2 pb-2 overflow-x-auto no-scrollbar border-b border-slate-200/50 dark:border-slate-800/50">
        {[
          { id: 'users', label: 'General Users', icon: Users },
          { id: 'volunteers', label: 'Volunteer Approvals', icon: Shield },
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
                  layoutId="activeUserTab"
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
            {activeTab === 'users' ? (
              <motion.table 
                key="users-table"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="w-full text-left text-sm whitespace-nowrap"
              >
                <thead className="bg-slate-50/50 dark:bg-slate-900/30 border-b border-slate-200/50 dark:border-slate-700/50">
                  <tr>
                    <th className="px-6 py-4 font-black text-slate-600 dark:text-slate-300 uppercase tracking-wider text-[10px]">Name</th>
                    <th className="px-6 py-4 font-black text-slate-600 dark:text-slate-300 uppercase tracking-wider text-[10px]">Email</th>
                    <th className="px-6 py-4 font-black text-slate-600 dark:text-slate-300 uppercase tracking-wider text-[10px]">Role</th>
                    <th className="px-6 py-4 font-black text-slate-600 dark:text-slate-300 uppercase tracking-wider text-[10px]">Status</th>
                    <th className="px-6 py-4 font-black text-slate-600 dark:text-slate-300 uppercase tracking-wider text-[10px] text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                  {users.filter(u => u.name.toLowerCase().includes(search.toLowerCase())).map((user, idx) => (
                    <motion.tr 
                      key={user.id} 
                      initial={{ opacity: 0, y: 5 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      transition={{ delay: idx * 0.05 }} 
                      className="hover:bg-white/60 dark:hover:bg-slate-800/80 transition-colors group"
                    >
                      <td className="px-6 py-4 font-black text-slate-900 dark:text-white">{user.name}</td>
                      <td className="px-6 py-4 text-slate-500 dark:text-slate-400 font-medium">{user.email}</td>
                      <td className="px-6 py-4">
                        <select
                          value={user.role}
                          onChange={(e) => handleRoleChange(user.id, e.target.value)}
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border cursor-pointer outline-none ${
                            roleStyles[user.role] || roleStyles.citizen
                          }`}
                        >
                          <option value="citizen">Citizen</option>
                          <option value="volunteer">Volunteer</option>
                          <option value="hospital">Hospital</option>
                          <option value="police">Police</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                          user.status === 'Active' ? 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-900' : 'bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-900'
                        }`}>
                          {user.status === 'Active' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5"></span>}
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        {user.status === 'Active' ? (
                          <button onClick={() => handleSuspend(user.id)} className="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/30 rounded-xl transition-all shadow-sm opacity-0 group-hover:opacity-100" title="Suspend">
                            <UserX className="w-5 h-5" />
                          </button>
                        ) : (
                          <button onClick={() => handleActivate(user.id)} className="p-2 text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 rounded-xl transition-all shadow-sm opacity-0 group-hover:opacity-100" title="Activate">
                            <UserCheck className="w-5 h-5" />
                          </button>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </motion.table>
            ) : (
              <motion.table 
                key="volunteers-table"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="w-full text-left text-sm whitespace-nowrap"
              >
                <thead className="bg-slate-50/50 dark:bg-slate-900/30 border-b border-slate-200/50 dark:border-slate-700/50">
                  <tr>
                    <th className="px-6 py-4 font-black text-slate-600 dark:text-slate-300 uppercase tracking-wider text-[10px]">Name</th>
                    <th className="px-6 py-4 font-black text-slate-600 dark:text-slate-300 uppercase tracking-wider text-[10px]">Certification</th>
                    <th className="px-6 py-4 font-black text-slate-600 dark:text-slate-300 uppercase tracking-wider text-[10px]">City</th>
                    <th className="px-6 py-4 font-black text-slate-600 dark:text-slate-300 uppercase tracking-wider text-[10px]">Rating/Rescues</th>
                    <th className="px-6 py-4 font-black text-slate-600 dark:text-slate-300 uppercase tracking-wider text-[10px]">Status</th>
                    <th className="px-6 py-4 font-black text-slate-600 dark:text-slate-300 uppercase tracking-wider text-[10px] text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                  {volunteers.filter(v => v.name.toLowerCase().includes(search.toLowerCase())).map((vol, idx) => (
                    <motion.tr 
                      key={vol.id} 
                      initial={{ opacity: 0, y: 5 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      transition={{ delay: idx * 0.05 }} 
                      className="hover:bg-white/60 dark:hover:bg-slate-800/80 transition-colors group"
                    >
                      <td className="px-6 py-4 font-black text-slate-900 dark:text-white">{vol.name}</td>
                      <td className="px-6 py-4 text-slate-500 dark:text-slate-400 font-medium">{vol.cert}</td>
                      <td className="px-6 py-4 text-slate-500 dark:text-slate-400 font-medium">{vol.city}</td>
                      <td className="px-6 py-4 text-slate-500 dark:text-slate-400 font-medium">
                        <span className="text-amber-500 mr-1">★</span> {vol.rating} ({vol.rescues} rescues)
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                          vol.status === 'Approved' ? 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-900 shadow-sm' : 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-900'
                        }`}>
                          {vol.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        {vol.status === 'Pending' && (
                          <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => handleApprove(vol.id)} className="p-2 text-emerald-500 bg-emerald-50 dark:bg-emerald-900/30 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 rounded-xl transition-all shadow-sm" title="Approve">
                              <CheckCircle className="w-5 h-5" />
                            </button>
                            <button onClick={() => handleReject(vol.id)} className="p-2 text-rose-500 bg-rose-50 dark:bg-rose-900/30 hover:bg-rose-100 dark:hover:bg-rose-900/50 rounded-xl transition-all shadow-sm" title="Reject">
                              <XCircle className="w-5 h-5" />
                            </button>
                          </div>
                        )}
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
