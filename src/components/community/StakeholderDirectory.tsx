import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Hospital, ShieldAlert, PhoneCall, Building, Plus, Navigation } from 'lucide-react';

export const StakeholderDirectory: React.FC = () => {
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Hospitals', 'Police', 'NGOs', 'Blood Banks'];

  const stakeholders = [
    { name: 'City General Hospital', type: 'Hospitals', distance: '1.2 km', phone: '102', status: 'Available' },
    { name: 'Traffic Police HQ', type: 'Police', distance: '3.4 km', phone: '103', status: 'Available' },
    { name: 'LifeSavers NGO', type: 'NGOs', distance: '5.0 km', phone: '1800-111-222', status: 'Active' },
    { name: 'Red Cross Blood Bank', type: 'Blood Banks', distance: '2.1 km', phone: '1800-333-444', status: 'Low Stock' },
    { name: 'Metro Trauma Center', type: 'Hospitals', distance: '4.5 km', phone: '102', status: 'Busy' },
    { name: 'Sector 4 Police Station', type: 'Police', distance: '1.8 km', phone: '100', status: 'Available' },
  ];

  const filtered = filter === 'All' ? stakeholders : stakeholders.filter(s => s.type === filter);

  const getIcon = (type: string) => {
    switch (type) {
      case 'Hospitals': return <Hospital className="w-5 h-5 text-rose-500" />;
      case 'Police': return <ShieldAlert className="w-5 h-5 text-blue-500" />;
      case 'NGOs': return <Building className="w-5 h-5 text-emerald-500" />;
      case 'Blood Banks': return <Plus className="w-5 h-5 text-red-500" />;
      default: return <Building className="w-5 h-5 text-slate-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Emergency Directory</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Quick access to essential services and authorities.</p>
        </div>
      </div>

      <div className="flex overflow-x-auto space-x-2 pb-2 no-scrollbar">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              filter === cat
                ? 'bg-slate-800 text-white dark:bg-emerald-600'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item, idx) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 shadow-sm"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  {getIcon(item.type)}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white leading-tight">{item.name}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{item.type}</p>
                </div>
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded ${
                item.status === 'Available' || item.status === 'Active'
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300'
                  : item.status === 'Busy'
                    ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300'
                    : 'bg-rose-100 text-rose-800 dark:bg-rose-900/50 dark:text-rose-300'
              }`}>
                {item.status}
              </span>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium transition-colors">
                <PhoneCall className="w-4 h-4 mr-2 text-slate-500" />
                {item.phone}
              </button>
              <button className="flex items-center justify-center py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium transition-colors">
                <Navigation className="w-4 h-4 mr-2 text-blue-500" />
                {item.distance}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
