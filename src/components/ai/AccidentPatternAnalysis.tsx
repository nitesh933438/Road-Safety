import React from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { AlertCircle, Calendar, Truck, UserX } from 'lucide-react';

const vehicleTypeData = [
  { name: '2-Wheeler', accidents: 450, color: '#f43f5e' },
  { name: 'Car', accidents: 320, color: '#3b82f6' },
  { name: 'Bus', accidents: 85, color: '#f59e0b' },
  { name: 'Truck', accidents: 120, color: '#8b5cf6' },
  { name: 'Pedestrian', accidents: 95, color: '#10b981' },
];

export const AccidentPatternAnalysis: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Accident Pattern Analysis</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">Key insights from historical data</p>
        </div>
        <AlertCircle className="text-indigo-500 w-5 h-5" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[calc(100%-80px)]">
        <div className="space-y-4">
          <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-100 dark:border-slate-700">
            <div className="flex items-center mb-2">
              <Calendar className="w-4 h-4 text-rose-500 mr-2" />
              <h4 className="font-semibold text-slate-700 dark:text-slate-300">Most Dangerous Time</h4>
            </div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">18:00 - 21:00</p>
            <p className="text-sm text-slate-500 mt-1">Accounts for 38% of all incidents, primarily due to low visibility and fatigue.</p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-100 dark:border-slate-700">
            <div className="flex items-center mb-2">
              <UserX className="w-4 h-4 text-amber-500 mr-2" />
              <h4 className="font-semibold text-slate-700 dark:text-slate-300">Top Behavioral Cause</h4>
            </div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">Overspeeding</p>
            <p className="text-sm text-slate-500 mt-1">Present in 52% of fatal accidents. Distracted driving follows at 24%.</p>
          </div>
        </div>

        <div className="h-full min-h-[200px]">
          <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4 flex items-center">
            <Truck className="w-4 h-4 mr-2" /> Vehicle Type Involvement
          </h4>
          <ResponsiveContainer width="100%" height="80%">
            <BarChart data={vehicleTypeData} layout="vertical" margin={{ top: 0, right: 30, left: 20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} fontSize={12} width={80} />
              <RechartsTooltip 
                cursor={{ fill: 'transparent' }}
                contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
              />
              <Bar dataKey="accidents" radius={[0, 4, 4, 0]}>
                {vehicleTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
