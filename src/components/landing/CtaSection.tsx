/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight, ShieldAlert, HeartPulse } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const CtaSection: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.15),transparent_60%)] pointer-events-none" />
      <div className="absolute right-0 bottom-0 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent_70%)] rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md mx-auto flex items-center justify-center shadow-2xl border border-white/30"
        >
          <ShieldAlert className="w-8 h-8 text-white" />
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-4xl sm:text-5xl font-black tracking-tight leading-[1.15]"
        >
          Be Prepared to Save a Life <br className="hidden sm:block" /> in the Golden Hour
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-indigo-100 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-medium"
        >
          Join thousands of citizens, medical volunteers, and urban planners building a safer highway ecosystem. Start your first aid training today.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-4 pt-4"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/specs"
              className="inline-flex items-center space-x-2 px-8 py-4 rounded-xl bg-white text-indigo-900 font-bold shadow-xl hover:shadow-2xl transition-all"
            >
              <span>Explore Technical Specs</span>
              <ArrowRight className="w-5 h-5 text-indigo-600" />
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/about"
              className="inline-flex items-center space-x-2 px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold border border-white/30 shadow-lg transition-colors"
            >
              <HeartPulse className="w-5 h-5 text-rose-300" />
              <span>Hackathon Mission</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
