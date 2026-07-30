import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, AlertTriangle, Users, Building2, FileText, Server, Menu, X, Shield } from 'lucide-react';
import { AdminOverview } from '../components/admin/AdminOverview';
import { EmergencyManagement } from '../components/admin/EmergencyManagement';
import { UserManagement } from '../components/admin/UserManagement';
import { HospitalManagement } from '../components/admin/HospitalManagement';
import { ReportManagement } from '../components/admin/ReportManagement';
import { SystemHealth } from '../components/admin/SystemHealth';
import { useAuth } from '../context/AuthContext';

type Tab = 'overview' | 'emergencies' | 'users' | 'hospitals' | 'reports' | 'system';

export const AdminDashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { currentUser, userProfile } = useAuth();

  const tabs: { id: Tab; label: string; icon: any }[] = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'emergencies', label: 'Emergencies', icon: AlertTriangle },
    { id: 'users', label: 'Users & Roles', icon: Users },
    { id: 'hospitals', label: 'Hospitals', icon: Building2 },
    { id: 'reports', label: 'Reports & Hotspots', icon: FileText },
    { id: 'system', label: 'System & Logs', icon: Server },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-multiply dark:mix-blend-lighten transform -translate-x-1/2 -translate-y-1/2" />
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[150px] pointer-events-none mix-blend-multiply dark:mix-blend-lighten transform translate-x-1/3 translate-y-1/3" />
      
      {/* Mobile Sidebar Toggle */}
      <div className="lg:hidden p-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-700/50 flex justify-between items-center sticky top-[64px] z-30 shadow-sm">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
            <Shield className="w-4 h-4" />
          </div>
          <h2 className="font-bold text-slate-900 dark:text-white">Admin Console</h2>
        </div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-slate-500 hover:text-emerald-600 transition-colors bg-slate-100 dark:bg-slate-800 rounded-lg">
          {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <div className="flex max-w-7xl mx-auto pt-[64px] lg:pt-[88px] px-0 lg:px-6 gap-6 min-h-[calc(100vh-64px)] relative z-10 pb-12">
        {/* Sidebar */}
        <aside className={`
          fixed lg:sticky top-[64px] lg:top-[88px] inset-y-0 left-0 z-40 w-72 lg:w-64 glass-card border border-white/50 dark:border-slate-800/50 lg:rounded-3xl shadow-sm
          transform transition-transform duration-300 ease-in-out lg:translate-x-0 h-[calc(100vh-64px)] lg:h-[calc(100vh-120px)] flex flex-col
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="p-6 pb-2">
            <div className="flex items-center space-x-3 mb-1">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Admin</h1>
                <p className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Console</p>
              </div>
            </div>
          </div>
          
          <nav className="px-4 py-4 space-y-1.5 flex-1 overflow-y-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setIsSidebarOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all relative group overflow-hidden ${
                    isActive
                      ? 'text-emerald-700 dark:text-emerald-300 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabAdmin"
                      className="absolute inset-0 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 rounded-2xl"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <Icon className={`w-5 h-5 relative z-10 transition-colors ${isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300'}`} />
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Admin User Info */}
          <div className="p-4 m-4 rounded-2xl bg-white/50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-sm">
            <div className="flex items-center space-x-3">
              {userProfile?.profileImage || userProfile?.photoURL || currentUser?.photoURL ? (
                <img 
                  src={userProfile?.profileImage || userProfile?.photoURL || currentUser?.photoURL || ''} 
                  alt="Admin Avatar" 
                  className="w-10 h-10 rounded-xl object-cover shrink-0"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-700 dark:text-slate-300 shrink-0">
                  {(userProfile?.name || currentUser?.displayName || 'A').charAt(0)}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{userProfile?.name || currentUser?.displayName || 'Admin User'}</p>
                <p className="text-[10px] text-slate-500 font-medium truncate">{currentUser?.email || 'admin@system.com'}</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Overlay for mobile sidebar */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-slate-900/50 z-30 lg:hidden backdrop-blur-sm" 
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-0 min-h-[calc(100vh-120px)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              {activeTab === 'overview' && <AdminOverview />}
              {activeTab === 'emergencies' && <EmergencyManagement />}
              {activeTab === 'users' && <UserManagement />}
              {activeTab === 'hospitals' && <HospitalManagement />}
              {activeTab === 'reports' && <ReportManagement />}
              {activeTab === 'system' && <SystemHealth />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};
