import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, MapPin, Clock, Navigation, CheckCircle, XCircle } from 'lucide-react';

export const LiveEmergencies: React.FC = () => {
  const emergencies = [
    {
      id: 1,
      type: 'Major Collision',
      location: 'NH-44, Near Sector 62',
      distance: '2.4 km',
      severity: 'Critical',
      time: '2 mins ago',
      vehicles: 'Car vs Bike',
      victims: 2
    },
    {
      id: 2,
      type: 'Pedestrian Hit',
      location: 'City Center Mall Crossing',
      distance: '3.1 km',
      severity: 'High',
      time: '5 mins ago',
      vehicles: 'Unknown',
      victims: 1
    },
    {
      id: 3,
      type: 'Vehicle Fire',
      location: 'Ring Road, Exit 4',
      distance: '5.8 km',
      severity: 'Medium',
      time: '12 mins ago',
      vehicles: 'Sedan',
      victims: 0
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center">
            <span className="relative flex h-3 w-3 mr-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
            </span>
            Live Emergency Requests
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Real-time SOS broadcasts in your vicinity.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {emergencies.map((em, idx) => (
          <motion.div
            key={em.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className={`border rounded-xl overflow-hidden ${
              em.severity === 'Critical' 
                ? 'border-rose-200 dark:border-rose-900/50 bg-rose-50/30 dark:bg-rose-900/10' 
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800'
            }`}
          >
            <div className={`p-4 border-b ${
              em.severity === 'Critical' 
                ? 'bg-rose-100 dark:bg-rose-900/30 border-rose-200 dark:border-rose-900/50' 
                : 'border-slate-100 dark:border-slate-700'
            }`}>
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-2">
                  <AlertCircle className={`w-5 h-5 ${
                    em.severity === 'Critical' ? 'text-rose-600 dark:text-rose-400' : 'text-amber-500'
                  }`} />
                  <h3 className="font-bold text-slate-900 dark:text-white">{em.type}</h3>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                  em.severity === 'Critical' 
                    ? 'bg-rose-200 text-rose-800 dark:bg-rose-800 dark:text-rose-200' 
                    : em.severity === 'High' 
                      ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300'
                }`}>
                  {em.severity}
                </span>
              </div>
            </div>
            
            <div className="p-4 space-y-3">
              <div className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                <MapPin className="w-4 h-4 mr-2 text-slate-400" />
                {em.location}
              </div>
              <div className="flex justify-between text-sm">
                <span className="flex items-center text-slate-600 dark:text-slate-300">
                  <Navigation className="w-4 h-4 mr-1 text-slate-400" />
                  {em.distance} away
                </span>
                <span className="flex items-center text-slate-500">
                  <Clock className="w-4 h-4 mr-1" />
                  {em.time}
                </span>
              </div>
              
              <div className="pt-2 border-t border-slate-100 dark:border-slate-700 flex justify-between text-xs text-slate-500">
                <span>Vehicles: <span className="font-semibold text-slate-700 dark:text-slate-300">{em.vehicles}</span></span>
                <span>Victims: <span className="font-semibold text-slate-700 dark:text-slate-300">{em.victims}</span></span>
              </div>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-700 grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition-colors">
                <CheckCircle className="w-4 h-4 mr-1" /> Accept
              </button>
              <button className="flex items-center justify-center py-2 px-4 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium transition-colors">
                <XCircle className="w-4 h-4 mr-1" /> Decline
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
