/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  TrendingUp,
  BarChart3,
  MapPin,
  CheckCircle2,
  PieChart as PieIcon,
  ShieldCheck
} from 'lucide-react';
import {
  MOCK_ANALYTICS_BY_TYPE,
  MOCK_ANALYTICS_BY_CITY,
  MOCK_ANALYTICS_MONTHLY
} from '../../data/roadHazardData';

export const HazardAnalytics: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80 dark:border-slate-700/80 space-y-2">
        <div className="flex items-center space-x-2 text-rose-600 dark:text-rose-400 font-black text-xs uppercase tracking-widest">
          <BarChart3 className="w-4 h-4" />
          <span>Road Safety Intelligence & Predictive Analytics</span>
        </div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white">
          Road Hazard Analytics & City Hotspot Reports
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium max-w-2xl">
          Aggregated analytics on pothole density, flood zones, open manholes, and municipal PWD repair resolution efficiency across metropolitan corridors.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* CHART 1: HAZARDS BY TYPE */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl border border-slate-200/80 dark:border-slate-700/80 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                Hazards Distribution by Category
              </h3>
              <p className="text-xs text-slate-500">Breakdown of reported safety defects</p>
            </div>
            <span className="p-2 rounded-xl bg-orange-100 text-orange-600 dark:bg-orange-950/80 dark:text-orange-300 font-mono text-xs font-bold">
              Total 137 Reports
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_ANALYTICS_BY_TYPE}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="type" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderRadius: '16px',
                    color: '#fff',
                    border: 'none',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="count" fill="#f97316" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CHART 2: MONTHLY TREND (REPORTED VS RESOLVED) */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl border border-slate-200/80 dark:border-slate-700/80 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                Monthly Report vs Resolution Growth
              </h3>
              <p className="text-xs text-slate-500">Citizen filings vs Municipal PWD fixes</p>
            </div>
            <span className="p-2 rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950/80 dark:text-emerald-300 font-mono text-xs font-bold flex items-center space-x-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>93% Fix Efficiency</span>
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_ANALYTICS_MONTHLY}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderRadius: '16px',
                    color: '#fff',
                    border: 'none',
                    fontSize: '12px',
                  }}
                />
                <Area type="monotone" dataKey="reported" stroke="#f43f5e" fill="#f43f5e" fillOpacity={0.2} />
                <Area type="monotone" dataKey="resolved" stroke="#10b981" fill="#10b981" fillOpacity={0.2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* CITY HOTSPOTS TABLE & RESOLUTION STATS */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl border border-slate-200/80 dark:border-slate-700/80 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
              Metropolitan City Zone Performance
            </h3>
            <p className="text-xs text-slate-500">Hazard load and municipal resolution percentage</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {MOCK_ANALYTICS_BY_CITY.map((c) => (
            <div key={c.city} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 space-y-2 border border-slate-200 dark:border-slate-700">
              <span className="text-xs font-extrabold text-slate-900 dark:text-white block">{c.city}</span>
              <div className="text-lg font-black text-rose-600">{c.hazards} Hazards</div>
              <div className="flex items-center justify-between text-[10px] font-bold text-slate-500">
                <span>PWD Fixed:</span>
                <span className="text-emerald-600">{c.resolvedPercent}%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                <div className="h-full bg-emerald-500" style={{ width: `${c.resolvedPercent}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
