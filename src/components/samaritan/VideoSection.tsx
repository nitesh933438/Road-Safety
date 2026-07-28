/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PlayCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const VIDEOS = [
  { id: 1, title: 'Understanding the Good Samaritan Law', duration: '3:45' },
  { id: 2, title: 'How to perform Hands-Only CPR', duration: '2:30' },
  { id: 3, title: 'The Importance of the Golden Hour', duration: '4:15' },
  { id: 4, title: 'Overcoming Bystander Effect', duration: '5:00' },
];

export const VideoSection: React.FC = () => {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">Video Learning Hub</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base">
          Watch short videos to prepare yourself for emergencies.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {VIDEOS.map((vid, idx) => (
          <motion.div
            key={vid.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="group cursor-pointer"
          >
            <div className="relative w-full aspect-video bg-slate-200 dark:bg-slate-800 rounded-2xl overflow-hidden mb-3 border border-slate-200 dark:border-slate-700">
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                <PlayCircle className="w-12 h-12 text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all" />
              </div>
              <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/60 backdrop-blur-sm rounded text-[10px] font-bold text-white">
                {vid.duration}
              </div>
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-amber-500 transition-colors leading-tight">
              {vid.title}
            </h4>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
