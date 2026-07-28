/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Building2, Shield, HeartPulse, Droplets, Star, PhoneCall, Navigation } from 'lucide-react';

export const NearbyServicesCard: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'hospitals' | 'police' | 'trauma' | 'blood'>('hospitals');

  const servicesData = {
    hospitals: [
      { name: 'City Apex Trauma Hospital', distance: '2.4 km', rating: 4.9, phone: '+91 98765 43210', info: '14 Trauma ICU Beds Available' },
      { name: 'LifeLine Emergency Center', distance: '4.1 km', rating: 4.8, phone: '+91 98765 43211', info: '8 Trauma ICU Beds Available' },
    ],
    police: [
      { name: 'Sector 4 Highway Police Station', distance: '1.2 km', rating: 4.7, phone: '112', info: 'Patrol Unit 4 dispatched in 3 mins' },
      { name: 'Central Traffic Control Post', distance: '5.0 km', rating: 4.6, phone: '100', info: 'Highway Corridor Monitoring' },
    ],
    trauma: [
      { name: 'Apex Advanced Trauma Institute', distance: '3.8 km', rating: 4.9, phone: '+91 98765 43215', info: 'Level-1 Trauma & Emergency Surgery' },
      { name: 'Highway Emergency MedUnit 2', distance: '6.2 km', rating: 4.8, phone: '+91 98765 43216', info: 'Immediate Critical Care & Ambulance' },
    ],
    blood: [
      { name: 'Red Cross Blood Bank Center', distance: '3.1 km', rating: 4.9, phone: '+91 98765 43220', info: 'O-Negative & All Blood Types Available' },
      { name: 'City Hospital Blood Repository', distance: '4.5 km', rating: 4.8, phone: '+91 98765 43221', info: '24/7 Emergency Blood Reserve' },
    ],
  };

  const categories = [
    { id: 'hospitals', label: 'Hospitals', icon: Building2 },
    { id: 'police', label: 'Police', icon: Shield },
    { id: 'trauma', label: 'Trauma', icon: HeartPulse },
    { id: 'blood', label: 'Blood Banks', icon: Droplets },
  ];

  const currentList = servicesData[activeCategory];

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white text-lg">Nearby Emergency Services</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Live telemetry & dispatch proximity</p>
        </div>

        {/* Category Selector Tabs */}
        <div className="flex flex-wrap bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all ${
                  isActive
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {currentList.map((item, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 space-y-3"
          >
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">{item.name}</h4>
                <div className="flex items-center space-x-3 mt-1">
                  <span className="flex items-center space-x-1 text-xs font-semibold text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{item.rating}</span>
                  </span>
                  <span className="text-xs text-slate-400">•</span>
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">{item.distance}</span>
                </div>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 px-2.5 py-1 rounded-full">
                {item.info}
              </span>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-700">
              <a
                href={`tel:${item.phone}`}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition-colors"
              >
                <PhoneCall className="w-3 h-3" />
                <span>Call {item.phone}</span>
              </a>
              <button
                onClick={() => alert(`GPS navigation route to ${item.name} initialized.`)}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-colors"
              >
                <Navigation className="w-3 h-3" />
                <span>Navigate</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
