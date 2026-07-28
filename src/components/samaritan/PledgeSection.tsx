/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShieldCheck, Heart, Users, Award, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const PledgeSection: React.FC = () => {
  const [pledged, setPledged] = useState(false);

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden max-w-5xl mx-auto">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-amber-500 blur-3xl opacity-20 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 rounded-full bg-emerald-500 blur-3xl opacity-20 pointer-events-none"></div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white/10 rounded-full text-xs font-bold uppercase tracking-wider text-amber-400">
            <Heart className="w-4 h-4" />
            <span>Join the Movement</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            I Pledge To Be A Good Samaritan
          </h2>
          <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
            I commit to overcoming hesitation. If I witness a road accident, I will not look away. I will secure the scene, call for help, and provide whatever basic assistance I can to save a life during the Golden Hour.
          </p>
          
          <AnimatePresence mode="wait">
            {!pledged ? (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={() => setPledged(true)}
                className="w-full sm:w-auto px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-black text-lg shadow-lg shadow-amber-500/30 transition-all active:scale-95"
              >
                Take The Pledge Now
              </motion.button>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center space-x-3 px-6 py-3 bg-emerald-500/20 border border-emerald-500/50 rounded-xl text-emerald-400 font-bold"
              >
                <ShieldCheck className="w-6 h-6" />
                <span>You are now a pledged Road Guardian!</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Community Stats Wall */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center space-y-2">
            <Users className="w-8 h-8 text-amber-400 mx-auto" />
            <div className="text-3xl font-black">124,592</div>
            <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Citizens Pledged</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center space-y-2">
            <Heart className="w-8 h-8 text-rose-400 mx-auto" />
            <div className="text-3xl font-black">18,430</div>
            <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Lives Impacted</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center space-y-2">
            <Award className="w-8 h-8 text-emerald-400 mx-auto" />
            <div className="text-3xl font-black">45,102</div>
            <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Certificates Issued</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center space-y-2 flex flex-col justify-center items-center">
            <button className="flex flex-col items-center space-y-2 text-slate-300 hover:text-white transition-colors group">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-white transition-colors">
                <Download className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-center">Download Quick Guide</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
