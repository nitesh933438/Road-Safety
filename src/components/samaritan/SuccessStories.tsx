/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Quote, User } from 'lucide-react';
import { motion } from 'framer-motion';

const STORIES = [
  {
    id: 1,
    name: 'Rahul Khanna',
    city: 'New Delhi',
    story: 'I used to drive past accidents fearing police harassment. After learning about the Good Samaritan law, I stopped to help a biker last month. The doctors said my quick decision to control the bleeding saved his life. I felt like a hero.',
  },
  {
    id: 2,
    name: 'Priya Sharma',
    city: 'Bengaluru',
    story: 'I was hesitant to do CPR because I wasn\'t a doctor. The training app showed me how simple hands-only CPR is. When an elderly man collapsed at the bus stop, I just acted. The ambulance arrived 10 mins later, but he survived because of those compressions.',
  },
  {
    id: 3,
    name: 'Amit Patel',
    city: 'Ahmedabad',
    story: 'I took a crash victim to the nearest private hospital. I was terrified they would ask for a deposit. To my surprise, they immediately took him to the trauma ICU without asking me for a single rupee. The law really works.',
  }
];

export const SuccessStories: React.FC = () => {
  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">Real Heroes, Real Impact</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base">
          Read stories from everyday citizens who chose to act.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {STORIES.map((story, idx) => (
          <motion.div
            key={story.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-800/50 rounded-3xl p-6 sm:p-8 relative"
          >
            <Quote className="w-10 h-10 text-amber-200 dark:text-amber-800 absolute top-6 left-6" />
            <div className="relative z-10 pt-8 space-y-6">
              <p className="text-sm italic text-slate-700 dark:text-slate-300 leading-relaxed">
                "{story.story}"
              </p>
              <div className="flex items-center space-x-3 pt-4 border-t border-amber-200 dark:border-amber-800/50">
                <div className="w-10 h-10 rounded-full bg-amber-200 dark:bg-amber-800 flex items-center justify-center text-amber-700 dark:text-amber-300">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">{story.name}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{story.city}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
