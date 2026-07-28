/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShieldAlert, Target, Award, Rocket } from 'lucide-react';

export const AboutHackathon: React.FC = () => {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-semibold mb-6">
          <Award className="w-4 h-4" />
          <span>Hackathon Submission: Part 1 Architecture</span>
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-6">
          About RoadGuard Mission
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          RoadGuard is engineered to transform municipal road safety through real-time hazard detection, intelligent incident reporting, and data-driven civic analytics.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-6">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Our Core Objective</h3>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            To build a resilient, scalable web platform that empowers citizens and urban planners to collaborate on eliminating traffic accidents and improving road infrastructure quality.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-teal-50 dark:bg-teal-950/50 flex items-center justify-center text-teal-600 dark:text-teal-400 mb-6">
            <Rocket className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Development Roadmap</h3>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            <strong>Part 1:</strong> Foundation, Routing, Theme & Layout (Current).<br />
            <strong>Part 2:</strong> Interactive Map & Hazard Dashboard.<br />
            <strong>Part 3:</strong> AI Assistant & Incident Reporting System.
          </p>
        </div>
      </div>
    </div>
  );
};
