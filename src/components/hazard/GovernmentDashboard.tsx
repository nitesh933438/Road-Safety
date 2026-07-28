/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Building2,
  Clock,
  CheckCircle2,
  AlertOctagon,
  ShieldAlert,
  ArrowUpRight,
  Filter,
  UserCheck,
  Wrench,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import {
  RoadHazard,
  HazardGovernmentStats,
  HazardStatus
} from '../../data/roadHazardData';

interface GovernmentDashboardProps {
  hazards: RoadHazard[];
  stats: HazardGovernmentStats;
  onUpdateStatus: (id: string, newStatus: HazardStatus) => void;
}

export const GovernmentDashboard: React.FC<GovernmentDashboardProps> = ({
  hazards,
  stats,
  onUpdateStatus,
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('All');

  const filtered = hazards.filter((h) => filterStatus === 'All' || h.status === filterStatus);

  return (
    <div className="space-y-8">
      {/* HEADER BAR */}
      <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-indigo-400 font-black text-xs uppercase tracking-widest">
            <Building2 className="w-4 h-4" />
            <span>Municipal Public Works & Traffic Control Command</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black">
            Government & Authority Hazard Resolution Portal
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm font-medium max-w-2xl">
            Real-time municipal workflow dashboard for prioritizing PWD repairs, dispatching road crews, and certifying community-reported hazard fixes.
          </p>
        </div>

        <div className="px-4 py-2.5 rounded-2xl bg-indigo-950/80 border border-indigo-800 text-indigo-300 font-mono text-xs font-bold">
          PWD Portal Active • 24/7 Dispatch Mode
        </div>
      </div>

      {/* KPI STAT CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-lg space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase text-slate-400">Pending Hazards</span>
            <AlertOctagon className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            {stats.pendingCount}
          </div>
          <span className="text-[10px] text-rose-600 font-bold block">Awaiting PWD Triage</span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-lg space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase text-slate-400">Verified Hazards</span>
            <UserCheck className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            {stats.verifiedCount}
          </div>
          <span className="text-[10px] text-emerald-600 font-bold block">&gt;85% Citizen Upvoted</span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-lg space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase text-slate-400">Resolved Hazards</span>
            <CheckCircle2 className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            {stats.resolvedCount}
          </div>
          <span className="text-[10px] text-indigo-600 font-bold block">Fixed This Month</span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-lg space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase text-slate-400">Critical Hazards</span>
            <ShieldAlert className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-2xl font-black text-rose-600 dark:text-rose-400">
            {stats.criticalCount}
          </div>
          <span className="text-[10px] text-rose-600 font-bold block">P1 Emergency Crew</span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-lg space-y-2 col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase text-slate-400">Avg Resolution Time</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            {stats.avgResolutionTimeHours} <span className="text-xs text-slate-400 font-normal">Hrs</span>
          </div>
          <span className="text-[10px] text-emerald-600 font-bold block">1.8h faster than target</span>
        </div>
      </div>

      {/* AUTHORITY ACTION TABLE */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl border border-slate-200/80 dark:border-slate-700/80 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
              Municipal Dispatch & Action Queue
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Update resolution status, assign repair crews and certify road safety
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Verified">Verified</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        </div>

        {/* DATA TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700 text-[10px] font-black uppercase tracking-wider text-slate-400">
                <th className="py-3 px-4">Hazard & Location</th>
                <th className="py-3 px-4">Severity</th>
                <th className="py-3 px-4">AI Priority</th>
                <th className="py-3 px-4">Assigned Dept</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Municipal Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60 text-xs">
              {filtered.map((h) => (
                <tr key={h.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                  <td className="py-4 px-4 space-y-0.5">
                    <div className="font-extrabold text-slate-900 dark:text-white">
                      {h.type}
                    </div>
                    <div className="text-[10px] text-slate-500 font-medium">{h.address}</div>
                  </td>

                  <td className="py-4 px-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase text-white ${
                        h.severity === 'Critical'
                          ? 'bg-rose-600'
                          : h.severity === 'High'
                          ? 'bg-orange-600'
                          : h.severity === 'Medium'
                          ? 'bg-yellow-600'
                          : 'bg-emerald-600'
                      }`}
                    >
                      {h.severity}
                    </span>
                  </td>

                  <td className="py-4 px-4 font-mono font-extrabold text-slate-700 dark:text-slate-300">
                    {h.aiAnalysis.estimatedRepairPriority.split(' - ')[0]}
                  </td>

                  <td className="py-4 px-4 text-slate-600 dark:text-slate-300 font-medium">
                    {h.assignedDepartment || 'Municipal PWD'}
                  </td>

                  <td className="py-4 px-4">
                    <span
                      className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase ${
                        h.status === 'Resolved'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300'
                          : h.status === 'In Progress'
                          ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950/80 dark:text-indigo-300'
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300'
                      }`}
                    >
                      {h.status}
                    </span>
                  </td>

                  <td className="py-4 px-4 text-right space-x-2">
                    {h.status !== 'In Progress' && h.status !== 'Resolved' && (
                      <button
                        onClick={() => onUpdateStatus(h.id, 'In Progress')}
                        className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-[10px] transition-colors cursor-pointer"
                      >
                        Dispatch Crew
                      </button>
                    )}

                    {h.status !== 'Resolved' && (
                      <button
                        onClick={() => onUpdateStatus(h.id, 'Resolved')}
                        className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-[10px] transition-colors cursor-pointer"
                      >
                        Mark Resolved
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
