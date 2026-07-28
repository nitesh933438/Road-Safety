/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Trophy, Medal } from 'lucide-react';

const DUMMY_LEADERBOARD = [
  { rank: 1, name: 'Rahul V.', xp: 2450, level: 'Golden Hero', city: 'Mumbai' },
  { rank: 2, name: 'Anita S.', xp: 2100, level: 'Golden Hero', city: 'Delhi' },
  { rank: 3, name: 'You', xp: 0, level: 'Beginner', city: 'Local', isUser: true },
  { rank: 4, name: 'Vikram K.', xp: 1450, level: 'Road Guardian', city: 'Pune' },
  { rank: 5, name: 'Priya M.', xp: 1200, level: 'Road Guardian', city: 'Bangalore' },
];

interface LeaderboardProps {
  userXp: number;
  userLevel: string;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ userXp, userLevel }) => {
  // Update user's dummy data
  const leaderboard = DUMMY_LEADERBOARD.map(user => 
    user.isUser ? { ...user, xp: userXp, level: userLevel } : user
  ).sort((a, b) => b.xp - a.xp).map((u, i) => ({ ...u, rank: i + 1 }));

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-6">
      <div className="flex items-center space-x-3 mb-4">
        <div className="p-2 bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-400 rounded-xl">
          <Trophy className="w-5 h-5" />
        </div>
        <h3 className="text-lg font-black text-slate-900 dark:text-white">Global Leaderboard</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              <th className="pb-3 pl-4">Rank</th>
              <th className="pb-3">Hero Name</th>
              <th className="pb-3">Level</th>
              <th className="pb-3 text-right pr-4">Total XP</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {leaderboard.map((user) => (
              <tr 
                key={user.rank} 
                className={`border-b border-slate-100 dark:border-slate-800/50 last:border-0 ${
                  user.isUser ? 'bg-amber-50 dark:bg-amber-900/10' : ''
                }`}
              >
                <td className="py-4 pl-4">
                  {user.rank <= 3 ? (
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      user.rank === 1 ? 'bg-yellow-400 text-yellow-900' :
                      user.rank === 2 ? 'bg-slate-300 text-slate-800' :
                      'bg-orange-400 text-orange-950'
                    }`}>
                      {user.rank}
                    </div>
                  ) : (
                    <span className="font-bold text-slate-400 ml-2">{user.rank}</span>
                  )}
                </td>
                <td className="py-4 font-bold text-slate-900 dark:text-white">
                  {user.name} {user.isUser && '(You)'}
                </td>
                <td className="py-4 text-slate-600 dark:text-slate-400">
                  {user.level}
                </td>
                <td className="py-4 text-right pr-4 font-black text-amber-600 dark:text-amber-400">
                  {user.xp}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
