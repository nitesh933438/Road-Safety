/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MapPin,
  PlusCircle,
  Building2,
  BarChart3,
  ShieldAlert,
  Sparkles,
  Radio,
  CheckCircle2,
  RotateCcw
} from 'lucide-react';
import { HazardReportForm } from './HazardReportForm';
import { HazardMap } from './HazardMap';
import { GovernmentDashboard } from './GovernmentDashboard';
import { SmartProximityAlert } from './SmartProximityAlert';
import { HazardAnalytics } from './HazardAnalytics';
import {
  MOCK_ROAD_HAZARDS,
  MOCK_GOVT_STATS,
  RoadHazard,
  HazardStatus
} from '../../data/roadHazardData';

export const RoadHazardSystem: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'map' | 'report' | 'government' | 'analytics'
  >('map');

  const [hazards, setHazards] = useState<RoadHazard[]>(MOCK_ROAD_HAZARDS);
  const [govtStats, setGovtStats] = useState(MOCK_GOVT_STATS);

  // Upvote Handler
  const handleUpvote = (id: string) => {
    setHazards((prev) =>
      prev.map((h) => (h.id === id ? { ...h, upvotes: h.upvotes + 1 } : h))
    );
  };

  // Downvote Handler
  const handleDownvote = (id: string) => {
    setHazards((prev) =>
      prev.map((h) => (h.id === id ? { ...h, downvotes: h.downvotes + 1 } : h))
    );
  };

  // Mark Fixed Handler
  const handleMarkFixed = (id: string) => {
    setHazards((prev) =>
      prev.map((h) =>
        h.id === id
          ? {
              ...h,
              status: 'Resolved' as HazardStatus,
              resolvedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            }
          : h
      )
    );
    setGovtStats((prev) => ({
      ...prev,
      resolvedCount: prev.resolvedCount + 1,
      pendingCount: Math.max(0, prev.pendingCount - 1),
    }));
  };

  // Update Status Handler from Govt Dashboard
  const handleUpdateStatus = (id: string, newStatus: HazardStatus) => {
    setHazards((prev) =>
      prev.map((h) => (h.id === id ? { ...h, status: newStatus } : h))
    );

    if (newStatus === 'Resolved') {
      setGovtStats((prev) => ({
        ...prev,
        resolvedCount: prev.resolvedCount + 1,
        pendingCount: Math.max(0, prev.pendingCount - 1),
      }));
    }
  };

  // Comment Add Handler
  const handleAddComment = (id: string, text: string) => {
    setHazards((prev) =>
      prev.map((h) =>
        h.id === id
          ? {
              ...h,
              comments: [
                ...h.comments,
                {
                  id: `c-${Date.now()}`,
                  userName: 'Verified Citizen',
                  text,
                  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                },
              ],
            }
          : h
      )
    );
  };

  // New Hazard Submission Handler
  const handleReportSubmitted = (newHazard: RoadHazard) => {
    setHazards((prev) => [newHazard, ...prev]);
    setGovtStats((prev) => ({
      ...prev,
      pendingCount: prev.pendingCount + 1,
      criticalCount: newHazard.severity === 'Critical' ? prev.criticalCount + 1 : prev.criticalCount,
    }));
    setActiveTab('map');
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* HERO BANNER & NAVIGATION */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-800 space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-rose-500 font-black text-xs uppercase tracking-widest">
              <ShieldAlert className="w-4 h-4 text-rose-500 animate-pulse" />
              <span>AI Proactive Road Safety & Accident Prevention</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black">
              AI Road Hazard Detection System
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm font-medium max-w-2xl">
              Crowdsourced hazard reporting, Cloudinary media verification, AI risk diagnostics, and direct Municipal PWD dispatch line.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('report')}
            className="px-6 py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-rose-600/30 hover:scale-105 transition-all flex items-center space-x-2 cursor-pointer shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Report Road Hazard</span>
          </button>
        </div>

        {/* NAVIGATION TABS */}
        <div className="flex items-center space-x-2 border-t border-slate-800 pt-6 overflow-x-auto no-scrollbar">
          {[
            { id: 'map', label: 'Interactive Hazard Map', icon: MapPin },
            { id: 'report', label: 'Report Hazard (Cloudinary)', icon: PlusCircle },
            { id: 'government', label: 'Government / PWD Portal', icon: Building2 },
            { id: 'analytics', label: 'Hazard Analytics & Hotspots', icon: BarChart3 },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-5 py-3 rounded-2xl font-black text-xs uppercase tracking-wider transition-all flex items-center space-x-2 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* PROXIMITY RADAR WIDGET */}
      <SmartProximityAlert hazards={hazards} />

      {/* ACTIVE TAB CONTENT */}
      {activeTab === 'map' && (
        <HazardMap
          hazards={hazards}
          onUpvote={handleUpvote}
          onDownvote={handleDownvote}
          onMarkFixed={handleMarkFixed}
          onAddComment={handleAddComment}
        />
      )}

      {activeTab === 'report' && (
        <HazardReportForm onReportSubmitted={handleReportSubmitted} />
      )}

      {activeTab === 'government' && (
        <GovernmentDashboard
          hazards={hazards}
          stats={govtStats}
          onUpdateStatus={handleUpdateStatus}
        />
      )}

      {activeTab === 'analytics' && <HazardAnalytics />}
    </div>
  );
};
