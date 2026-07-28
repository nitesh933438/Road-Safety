import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Activity, Target, MessageSquare, Award, Building2 } from 'lucide-react';
import { CommunityDashboard } from '../components/community/CommunityDashboard';
import { VolunteerRegistration } from '../components/community/VolunteerRegistration';
import { LiveEmergencies } from '../components/community/LiveEmergencies';
import { NearbyVolunteers } from '../components/community/NearbyVolunteers';
import { VolunteerProfile } from '../components/community/VolunteerProfile';
import { StakeholderDirectory } from '../components/community/StakeholderDirectory';
import { CommunityChat } from '../components/community/CommunityChat';
import { RewardsAndAnalytics } from '../components/community/RewardsAndAnalytics';
import { useAuth } from '../context/AuthContext';

type Tab = 'dashboard' | 'emergencies' | 'volunteers' | 'profile' | 'directory' | 'chat' | 'analytics';

export const CommunityNetworkPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const { currentUser } = useAuth();
  
  // Basic check for offline status
  const isOnline = navigator.onLine;

  const tabs: { id: Tab; label: string; icon: any }[] = [
    { id: 'dashboard', label: 'Overview', icon: Target },
    { id: 'emergencies', label: 'Live SOS', icon: Activity },
    { id: 'volunteers', label: 'Network', icon: Users },
    { id: 'profile', label: 'My Profile', icon: Award },
    { id: 'directory', label: 'Directory', icon: Building2 },
    { id: 'chat', label: 'Live Chat', icon: MessageSquare },
    { id: 'analytics', label: 'Analytics', icon: Target },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300 pb-12">
      <div className="bg-emerald-600 dark:bg-emerald-800 text-white pb-16 pt-8 px-4 sm:px-6 lg:px-8 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Community Rescue Network</h1>
              <p className="mt-2 text-emerald-100 max-w-2xl">
                Real-time coordination between citizens, volunteers, police, and hospitals to reduce Golden Hour response time.
              </p>
            </div>
            {!isOnline && (
              <div className="bg-amber-500/20 text-amber-100 px-4 py-2 rounded-lg border border-amber-500/50 flex items-center space-x-2">
                <span className="relative flex h-3 w-3">
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-400"></span>
                </span>
                <span className="text-sm font-medium">Offline Mode - Limited Functionality</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="border-b border-slate-200 dark:border-slate-700 overflow-x-auto no-scrollbar">
            <nav className="flex space-x-2 px-4 py-3" aria-label="Tabs">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`${
                      activeTab === tab.id
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300'
                        : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-700'
                    } flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap`}
                  >
                    <Icon className={`mr-2 h-4 w-4 ${activeTab === tab.id ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}`} />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>
          
          <div className="p-4 sm:p-6 lg:p-8 min-h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === 'dashboard' && <CommunityDashboard setActiveTab={setActiveTab} />}
                {activeTab === 'emergencies' && <LiveEmergencies />}
                {activeTab === 'volunteers' && <NearbyVolunteers />}
                {activeTab === 'profile' && (currentUser ? <VolunteerProfile /> : <VolunteerRegistration />)}
                {activeTab === 'directory' && <StakeholderDirectory />}
                {activeTab === 'chat' && <CommunityChat />}
                {activeTab === 'analytics' && <RewardsAndAnalytics />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
