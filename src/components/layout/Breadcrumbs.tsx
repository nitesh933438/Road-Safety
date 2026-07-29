/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ChevronRight, Home, ShieldAlert, Layers, Navigation, Radio, Bot, Compass, BookOpen, Heart, Users, Shield, Info, Bell, Settings, User } from 'lucide-react';

interface BreadcrumbRouteInfo {
  title: string;
  category?: string;
  icon?: React.ElementType;
}

const ROUTE_MAP: Record<string, BreadcrumbRouteInfo> = {
  '/': { title: 'Home', icon: Home },
  '/dashboard': { title: 'Dashboard', category: 'Overview', icon: Layers },
  '/sos': { title: 'SOS Emergency Triage', category: 'Emergency', icon: ShieldAlert },
  '/guardian': { title: 'AI Driving Guardian', category: 'Safety', icon: ShieldAlert },
  '/command-center': { title: 'AI Command Center', category: 'Analytics', icon: Radio },
  '/hazards': { title: 'Road Hazards', category: 'Safety', icon: ShieldAlert },
  '/emergency-report': { title: 'Incident Reporting', category: 'Emergency', icon: ShieldAlert },
  '/safe-route': { title: 'AI Safe Route Navigation', category: 'Navigation', icon: Navigation },
  '/risk-layer': { title: 'Smart Risk Layer', category: 'Analytics', icon: Layers },
  '/ai-prediction': { title: 'AI Risk Prediction', category: 'AI Intelligence', icon: Bot },
  '/ai-assistant': { title: 'AI First Aid Assistant', category: 'AI Intelligence', icon: Bot },
  '/map': { title: 'Smart Emergency Map', category: 'Emergency Services', icon: Compass },
  '/training': { title: 'Training Academy', category: 'Education', icon: BookOpen },
  '/samaritan': { title: 'Good Samaritan Hub', category: 'Community', icon: Heart },
  '/community': { title: 'Rescue Samaritan Network', category: 'Community', icon: Users },
  '/admin': { title: 'Admin Command Panel', category: 'Administration', icon: Shield },
  '/specs': { title: 'System Architecture', category: 'System Specs', icon: Layers },
  '/about': { title: 'About Hackathon Project', category: 'System Specs', icon: Info },
  '/presentation': { title: 'Pitch Presentation Mode', category: 'Overview', icon: Layers },
  '/notifications': { title: 'Notification Hub', category: 'System', icon: Bell },
  '/profile': { title: 'User Profile', category: 'Account', icon: User },
  '/settings': { title: 'System Settings', category: 'Account', icon: Settings },
};

export const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const currentRoute = ROUTE_MAP[location.pathname] || { title: 'Page', icon: Home };

  if (location.pathname === '/') {
    return (
      <div className="hidden lg:flex items-center space-x-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
        <span className="flex items-center space-x-1.5 text-indigo-600 dark:text-indigo-400 font-extrabold">
          <Home className="w-3.5 h-3.5" />
          <span>Home Overview</span>
        </span>
      </div>
    );
  }

  return (
    <div className="hidden sm:flex flex-col justify-center min-w-0">
      {/* Page Title */}
      <h1 className="text-sm sm:text-base font-black text-slate-900 dark:text-white truncate tracking-tight flex items-center space-x-1.5">
        <span>{currentRoute.title}</span>
      </h1>

      {/* Breadcrumb Trail */}
      <nav aria-label="Breadcrumb" className="flex items-center space-x-1 text-[11px] font-semibold text-slate-500 dark:text-slate-400 truncate">
        <Link 
          to="/" 
          className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center shrink-0"
        >
          <Home className="w-3 h-3 mr-1 text-slate-400" />
          <span>Home</span>
        </Link>

        {currentRoute.category && (
          <>
            <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
            <span className="text-slate-500 dark:text-slate-400 truncate">{currentRoute.category}</span>
          </>
        )}

        <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
        <span className="text-indigo-600 dark:text-indigo-400 font-bold truncate">
          {currentRoute.title}
        </span>
      </nav>
    </div>
  );
};
