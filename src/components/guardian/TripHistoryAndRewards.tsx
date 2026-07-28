/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Award,
  History,
  Filter,
  ShieldCheck,
  Radio,
  HeartPulse,
  Search,
  Sparkles,
  ChevronRight,
  TrendingUp,
  MapPin,
  Clock
} from 'lucide-react';
import {
  TripSummary,
  DriverBadge,
  MOCK_DRIVER_BADGES
} from '../../data/drivingGuardianData';

interface TripHistoryAndRewardsProps {
  tripHistory: TripSummary[];
}

export const TripHistoryAndRewards: React.FC<TripHistoryAndRewardsProps> = ({
  tripHistory,
}) => {
  const [filterScore, setFilterScore] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = tripHistory.filter((t) => {
    const matchesSearch =
      t.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.date.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesScore =
      filterScore === 'All' ||
      (filterScore === 'High' && t.safetyScore >= 85) ||
      (filterScore === 'Medium' && t.safetyScore >= 70 && t.safetyScore < 85) ||
      (filterScore === 'Low' && t.safetyScore < 70);

    return matchesSearch && matchesScore;
  });

  const totalXp = tripHistory.reduce((acc, curr) => acc + curr.xpEarned, 540);

  return (
    <div className="space-y-8">
      {/* REWARDS & BADGES SECTION */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center space-x-2 text-yellow-400 font-black text-xs uppercase tracking-widest mb-1">
              <Award className="w-4 h-4" />
              <span>Safe Driver Level & Rewards</span>
            </div>
            <h2 className="text-2xl font-black">
              Golden Driver Gamification Badges
            </h2>
          </div>

          <div className="px-4 py-2 rounded-2xl bg-yellow-500/20 border border-yellow-500/40 text-yellow-300 font-mono text-xs font-black">
            Total Driver XP: {totalXp} PTS
          </div>
        </div>

        {/* BADGES GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {MOCK_DRIVER_BADGES.map((b) => (
            <div
              key={b.id}
              className={`p-5 rounded-3xl border transition-all space-y-3 ${
                b.unlocked
                  ? 'bg-slate-800/90 border-yellow-500/50 shadow-xl'
                  : 'bg-slate-950/60 border-slate-800 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-2xl bg-yellow-500/20 text-yellow-400">
                  <Award className="w-6 h-6" />
                </div>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                    b.unlocked
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {b.unlocked ? 'Unlocked' : `Requires ${b.requiredXp} XP`}
                </span>
              </div>

              <div>
                <h3 className="font-extrabold text-sm text-white">{b.title}</h3>
                <p className="text-xs text-slate-400 leading-snug mt-1">
                  {b.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TRIP HISTORY TABLE */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl border border-slate-200/80 dark:border-slate-700/80 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <History className="w-5 h-5 text-rose-600 dark:text-rose-400" />
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
              Trip History & Telemetry Logbook
            </h3>
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search trip destination..."
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white"
              />
            </div>

            <select
              value={filterScore}
              onChange={(e) => setFilterScore(e.target.value)}
              className="px-3.5 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white"
            >
              <option value="All">All Scores</option>
              <option value="High">High (&gt;85%)</option>
              <option value="Medium">Medium (70-84%)</option>
              <option value="Low">Needs Caution (&lt;70%)</option>
            </select>
          </div>
        </div>

        {/* TRIP LIST */}
        <div className="space-y-3">
          {filtered.map((t) => (
            <div
              key={t.id}
              className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-rose-500 transition-colors"
            >
              <div className="space-y-1">
                <div className="flex items-center space-x-2 text-xs font-black text-slate-900 dark:text-white">
                  <MapPin className="w-3.5 h-3.5 text-rose-500" />
                  <span>{t.destination}</span>
                </div>
                <span className="text-[10px] text-slate-400 block">{t.date}</span>
              </div>

              <div className="grid grid-cols-4 gap-4 w-full sm:w-auto text-center">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-black block">Distance</span>
                  <span className="text-xs font-bold font-mono text-slate-800 dark:text-slate-200">{t.distanceKm} KM</span>
                </div>

                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-black block">Duration</span>
                  <span className="text-xs font-bold font-mono text-slate-800 dark:text-slate-200">{t.durationMinutes} min</span>
                </div>

                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-black block">Safety Score</span>
                  <span
                    className={`text-xs font-extrabold font-mono ${
                      t.safetyScore >= 85
                        ? 'text-emerald-600'
                        : t.safetyScore >= 70
                        ? 'text-yellow-600'
                        : 'text-rose-600'
                    }`}
                  >
                    {t.safetyScore}%
                  </span>
                </div>

                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-black block">XP Earned</span>
                  <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400">+{t.xpEarned}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
