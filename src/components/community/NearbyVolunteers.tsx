import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageCircle, Star, MapPin, Award, Shield } from 'lucide-react';

export const NearbyVolunteers: React.FC = () => {
  const volunteers = [
    {
      id: 1,
      name: 'Ravi Kumar',
      role: 'First Responder',
      distance: '0.8 km',
      rating: 4.9,
      rescues: 45,
      skills: ['CPR Certified', 'Trauma Care'],
      avatar: 'R',
      status: 'online'
    },
    {
      id: 2,
      name: 'Dr. Priya Sharma',
      role: 'Off-duty Doctor',
      distance: '1.2 km',
      rating: 5.0,
      rescues: 112,
      skills: ['Advanced Life Support', 'Surgeon'],
      avatar: 'P',
      status: 'online'
    },
    {
      id: 3,
      name: 'Amit Singh',
      role: 'Community Hero',
      distance: '2.5 km',
      rating: 4.7,
      rescues: 18,
      skills: ['Basic First Aid', 'Transport'],
      avatar: 'A',
      status: 'busy'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Nearby Volunteers</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Connect with active Good Samaritans in your area.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {volunteers.map((vol, idx) => (
          <motion.div
            key={vol.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden"
          >
            <div className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center text-emerald-700 dark:text-emerald-300 font-bold text-xl">
                      {vol.avatar}
                    </div>
                    <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-slate-800 ${
                      vol.status === 'online' ? 'bg-green-500' : 'bg-amber-500'
                    }`}></span>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">{vol.name}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center">
                      <Shield className="w-3 h-3 mr-1" /> {vol.role}
                    </p>
                  </div>
                </div>
                <div className="flex items-center bg-slate-50 dark:bg-slate-700 px-2 py-1 rounded text-sm font-semibold">
                  <Star className="w-3 h-3 text-amber-500 mr-1 fill-current" />
                  {vol.rating}
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-sm text-slate-600 dark:text-slate-300">
                <span className="flex items-center">
                  <MapPin className="w-4 h-4 text-slate-400 mr-1" />
                  {vol.distance} away
                </span>
                <span className="flex items-center">
                  <Award className="w-4 h-4 text-emerald-500 mr-1" />
                  {vol.rescues} Rescues
                </span>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {vol.skills.map(skill => (
                  <span key={skill} className="px-2 py-1 text-xs font-medium bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300 rounded">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 divide-x divide-slate-100 dark:divide-slate-700 border-t border-slate-100 dark:border-slate-700">
              <button className="flex items-center justify-center py-3 text-sm font-medium text-slate-600 hover:text-emerald-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700/50 transition-colors">
                <Phone className="w-4 h-4 mr-2" /> Call
              </button>
              <button className="flex items-center justify-center py-3 text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700/50 transition-colors">
                <MessageCircle className="w-4 h-4 mr-2" /> Chat
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
