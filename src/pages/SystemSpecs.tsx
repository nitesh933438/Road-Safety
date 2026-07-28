/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Layers, Shield, Zap, Globe, Smartphone, Check } from 'lucide-react';

export const SystemSpecs: React.FC = () => {
  const specs = [
    {
      category: 'Frontend Core',
      items: [
        'React 19 with Concurrent Mode and StrictMode enabled',
        'Vite build pipeline with ES Modules and Hot Module Replacement support',
        'React Router v6 for client-side multi-view routing',
        'Tailwind CSS v4 with custom design tokens and dark mode support',
      ],
      icon: Layers,
    },
    {
      category: 'State & Theme',
      items: [
        'React Context API for global theme state management (Light / Dark mode)',
        'localStorage persistence for user preferences',
        'Fully responsive layout wrapper with mobile hamburger navigation',
        'Accessibility (a11y) compliant interactive controls with aria labels',
      ],
      icon: Zap,
    },
    {
      category: 'Modular Architecture',
      items: [
        'Separated layout components (Navbar, Footer, Layout wrapper)',
        'Dedicated types file (/src/types.ts) for robust TypeScript interfaces',
        'Organized directory structure for future feature expansion',
        'Strict adherence to TypeScript strict mode and no dummy compile errors',
      ],
      icon: Shield,
    },
  ];

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
          System Specifications & Architecture
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Detailed breakdown of the foundational setup established in Part 1 of the RoadGuard web application.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {specs.map((spec, idx) => {
          const Icon = spec.icon;
          return (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{spec.category}</h3>
                <ul className="space-y-3">
                  {spec.items.map((item, i) => (
                    <li key={i} className="flex items-start space-x-3 text-sm text-slate-600 dark:text-slate-300">
                      <Check className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
