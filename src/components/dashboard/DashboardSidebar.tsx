/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { LayoutDashboard, PhoneCall, Bot, BookOpen, FileText, User, Settings, ShieldAlert } from 'lucide-react';

interface DashboardSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'sos', label: 'SOS Emergency', icon: PhoneCall, alert: true },
    { id: 'ai-assistant', label: 'AI Assistant', icon: Bot },
    { id: 'training', label: 'Training & CPR', icon: BookOpen },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-full lg:w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-4 flex flex-col justify-between shrink-0">
      <div className="space-y-6">
        <div className="flex items-center space-x-3 px-3 py-2">
          <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center text-white font-bold shadow-md shadow-amber-500/20">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-sm tracking-tight text-slate-900 dark:text-white block">
              Golden Hour Hub
            </span>
            <span className="text-[10px] uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-semibold">
              Live Operations
            </span>
          </div>
        </div>

        <nav className="flex lg:flex-col overflow-x-auto lg:overflow-visible no-scrollbar space-x-2 lg:space-x-0 lg:space-y-1 pb-2 lg:pb-0">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex-shrink-0 lg:w-full flex items-center justify-between px-3.5 py-2.5 lg:py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/25'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 bg-slate-50 dark:bg-slate-800/40 lg:bg-transparent lg:dark:bg-transparent'
                }`}
              >
                <div className="flex items-center space-x-2.5 lg:space-x-3">
                  <Icon className={`w-4 h-4 lg:w-5 lg:h-5 ${isActive ? 'text-white' : item.alert ? 'text-rose-500' : 'text-slate-500 dark:text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.alert && (
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse ml-2 lg:ml-0"></span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 mt-6">
        <div className="flex items-center space-x-2 text-xs font-semibold text-slate-900 dark:text-white mb-1">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>System Status: Online</span>
        </div>
        <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
          Trauma telemetry synced with 24 municipal dispatch units.
        </p>
      </div>
    </aside>
  );
};
