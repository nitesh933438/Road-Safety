/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { HeroSection } from '../components/landing/HeroSection';
import { LiveStatistics } from '../components/landing/LiveStatistics';
import { FeaturesSection } from '../components/landing/FeaturesSection';
import { HowItWorks } from '../components/landing/HowItWorks';
import { GoodSamaritanCard } from '../components/landing/GoodSamaritanCard';
import { WhyChooseUs } from '../components/landing/WhyChooseUs';
import { Testimonials } from '../components/landing/Testimonials';
import { FaqAccordion } from '../components/landing/FaqAccordion';
import { CtaSection } from '../components/landing/CtaSection';
import { FolderTree, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Live Statistics */}
      <LiveStatistics />

      {/* 3. Features Section */}
      <FeaturesSection />

      {/* 4. How It Works */}
      <HowItWorks />

      {/* 5. Good Samaritan Law Card */}
      <GoodSamaritanCard />

      {/* 6. Why Choose Us */}
      <WhyChooseUs />

      {/* Architecture Explorer Integration for Hackathon Part 1 */}
      <section className="py-16 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
              <div>
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
                  <FolderTree className="w-3.5 h-3.5" />
                  <span>Architecture Foundation</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  RoadGuard Project Explorer & Specs
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  Built on React 19, TypeScript, Vite, and Tailwind CSS v4 with modular file organization.
                </p>
              </div>
              <Link
                to="/specs"
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold text-sm shadow hover:opacity-90 transition-opacity"
              >
                <span>View Full System Specs</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
              <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <p className="font-bold text-amber-600 dark:text-amber-400 mb-2">/src/components/landing/</p>
                <ul className="space-y-1 text-slate-600 dark:text-slate-400">
                  <li>• HeroSection.tsx</li>
                  <li>• LiveStatistics.tsx</li>
                  <li>• FeaturesSection.tsx</li>
                  <li>• HowItWorks.tsx</li>
                </ul>
              </div>
              <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <p className="font-bold text-blue-600 dark:text-blue-400 mb-2">/src/components/landing/ (Cont.)</p>
                <ul className="space-y-1 text-slate-600 dark:text-slate-400">
                  <li>• GoodSamaritanCard.tsx</li>
                  <li>• WhyChooseUs.tsx</li>
                  <li>• Testimonials.tsx</li>
                  <li>• FaqAccordion.tsx & CtaSection.tsx</li>
                </ul>
              </div>
              <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <p className="font-bold text-emerald-600 dark:text-emerald-400 mb-2">/src/context & /pages</p>
                <ul className="space-y-1 text-slate-600 dark:text-slate-400">
                  <li>• ThemeContext.tsx (Dark/Light)</li>
                  <li>• App.tsx (React Router v6)</li>
                  <li>• SystemSpecs.tsx</li>
                  <li>• AboutHackathon.tsx</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Testimonials */}
      <Testimonials />

      {/* 8. FAQ Accordion */}
      <FaqAccordion />

      {/* 9. Call To Action */}
      <CtaSection />
    </div>
  );
};
