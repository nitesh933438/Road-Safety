/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight, Shield, HeartPulse, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { APP_LOGO_DATA_URI } from '../../assets/logoDataUri';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden py-20 lg:py-32 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Background Glow & Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-50 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[500px] bg-indigo-500/20 dark:bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none mix-blend-multiply dark:mix-blend-lighten" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left Text Column */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-7 space-y-8 text-center lg:text-left"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider shadow-sm border border-indigo-200 dark:border-indigo-800"
            >
              <Activity className="w-4 h-4 animate-pulse text-indigo-600 dark:text-indigo-400" />
              <span>Next-Gen Emergency Response</span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              Intelligence that <br className="hidden sm:block" />
              <span className="gradient-text">
                Saves Lives.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
              A premium road safety ecosystem. Empowering bystanders, automating emergency dispatch, and predicting risks before they happen.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/specs"
                  className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl gradient-bg hover:opacity-90 font-semibold shadow-lg transition-all"
                >
                  <span>Explore Platform</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <a
                  href="#features"
                  className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl glass hover:bg-slate-50 dark:hover:bg-slate-800/80 text-slate-700 dark:text-slate-200 font-semibold transition-colors shadow-sm"
                >
                  <HeartPulse className="w-4 h-4 text-rose-500" />
                  <span>Learn First Aid</span>
                </a>
              </motion.div>
            </div>

            {/* Quick stats badges */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="pt-10 border-t border-slate-200/50 dark:border-slate-800/50 grid grid-cols-3 gap-6 max-w-lg mx-auto lg:mx-0"
            >
              <div className="space-y-1">
                <p className="text-3xl font-extrabold text-slate-900 dark:text-white">60<span className="text-lg text-slate-400">m</span></p>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wide">Golden Hour</p>
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-extrabold gradient-text">40<span className="text-lg text-slate-400">%</span></p>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wide">Lives Savable</p>
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-extrabold text-slate-900 dark:text-white">24<span className="text-lg text-slate-400">/7</span></p>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wide">AI Dispatch</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Illustration Card */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="absolute -inset-1 bg-gradient-to-tr from-indigo-500 to-fuchsia-500 rounded-[2rem] blur-xl opacity-30 dark:opacity-40 animate-pulse mix-blend-multiply dark:mix-blend-screen" />
              <div className="relative glass-card rounded-[2rem] p-8 shadow-2xl space-y-8 border border-white/50 dark:border-white/10">
                <div className="flex items-center justify-between border-b border-slate-200/50 dark:border-slate-700/50 pb-5">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-amber-500/40 p-0.5 shadow-lg overflow-hidden flex-shrink-0">
                      <img 
                        src={APP_LOGO_DATA_URI} 
                        alt="GoldenGuard Emblem" 
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white text-base">GoldenGuard AI</h3>
                      <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5 mt-0.5">
                        <span className="relative flex h-2.5 w-2.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                        </span>
                        Active Dispatch Grid
                      </p>
                    </div>
                  </div>
                  <Shield className="w-6 h-6 text-indigo-500" />
                </div>

                <div className="space-y-4">
                  <motion.div whileHover={{ scale: 1.02 }} className="p-4 rounded-2xl bg-white/60 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/50 flex items-center justify-between transition-transform cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-fuchsia-500/10 text-fuchsia-600 flex items-center justify-center font-bold text-xs shadow-sm">AI</div>
                      <div>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">Smart Triage Protocol</p>
                        <p className="text-xs text-slate-500 font-medium">Real-time vitals & risk assessment</p>
                      </div>
                    </div>
                    <span className="text-xs font-extrabold text-emerald-600 bg-emerald-100 dark:bg-emerald-900/50 px-2.5 py-1 rounded-md shadow-sm">Ready</span>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.02 }} className="p-4 rounded-2xl bg-white/60 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/50 flex items-center justify-between transition-transform cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center font-bold text-xs shadow-sm">GPS</div>
                      <div>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">Hospital Telemetry</p>
                        <p className="text-xs text-slate-500 font-medium">Auto-routing to trauma centers</p>
                      </div>
                    </div>
                    <span className="text-xs font-extrabold text-indigo-600 bg-indigo-100 dark:bg-indigo-900/50 px-2.5 py-1 rounded-md shadow-sm">Syncing</span>
                  </motion.div>
                </div>

                <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-500/10 to-violet-500/10 border border-indigo-500/20 text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-white/20 dark:bg-white/5 mix-blend-overlay"></div>
                  <p className="text-xs font-bold text-indigo-900 dark:text-indigo-200 relative z-10 flex items-center justify-center gap-2">
                    <span>💡</span> Good Samaritan Law Protected
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
