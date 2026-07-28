/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, Heart, Github, Terminal } from 'lucide-react';
import { APP_LOGO_DATA_URI } from '../../assets/logoDataUri';

export const Footer: React.FC = () => {
  return (
    <footer className="glass border-t border-slate-200/50 dark:border-slate-800/50 transition-colors duration-300 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-10 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-indigo-500 via-transparent to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg overflow-hidden shadow-sm bg-slate-900 flex items-center justify-center border border-amber-500/40 p-0.5">
                <img 
                  src={APP_LOGO_DATA_URI} 
                  alt="GoldenGuard Logo" 
                  className="w-full h-full object-cover rounded-md" 
                />
              </div>
              <span className="font-bold text-lg tracking-tight gradient-text">
                GoldenGuard Safety Platform
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md leading-relaxed">
              A premium, production-ready road safety web application architecture designed for hackathons. Built with React, Vite, Tailwind CSS, and robust modular design patterns.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Platform Navigation
            </h3>
            <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
              <li><Link to="/dashboard" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Emergency Dashboard</Link></li>
              <li><Link to="/presentation" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Hackathon Pitch Mode</Link></li>
              <li><Link to="/sos" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">1-Tap SOS Distress</Link></li>
              <li><Link to="/training" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Good Samaritan Academy</Link></li>
            </ul>
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Tech Stack
            </h3>
            <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
              <li className="flex items-center space-x-2">
                <Terminal className="w-4 h-4 text-indigo-500" />
                <span>React 19 & TypeScript</span>
              </li>
              <li className="flex items-center space-x-2">
                <Github className="w-4 h-4 text-indigo-500" />
                <span>Tailwind CSS v4</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-fuchsia-500 to-indigo-500 opacity-80" />
                <span>Framer Motion</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200/50 dark:border-slate-800/50 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <p>© {new Date().getFullYear()} GoldenGuard Team. All rights reserved.</p>
          <p className="flex items-center space-x-1 mt-3 sm:mt-0 bg-slate-100 dark:bg-slate-800/50 px-3 py-1.5 rounded-full">
            <span>Built with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" />
            <span>for safer roads</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
