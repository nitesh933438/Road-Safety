/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { LawCards } from '../components/samaritan/LawCards';
import { MythBusters } from '../components/samaritan/MythBusters';
import { ConfidenceMeter } from '../components/samaritan/ConfidenceMeter';
import { DecisionSimulator } from '../components/samaritan/DecisionSimulator';
import { InteractiveChecklist } from '../components/samaritan/InteractiveChecklist';
import { VideoSection } from '../components/samaritan/VideoSection';
import { FaqAccordion } from '../components/samaritan/FaqAccordion';
import { SuccessStories } from '../components/samaritan/SuccessStories';
import { PledgeSection } from '../components/samaritan/PledgeSection';
import { Shield, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const GoodSamaritanHubPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Hero Section */}
        <div className="bg-slate-900 dark:bg-slate-950 rounded-3xl p-8 sm:p-12 lg:p-16 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center gap-10">
          <div className="relative z-10 flex-1 space-y-6 text-center md:text-left">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white/10 rounded-full text-xs font-bold uppercase tracking-wider text-amber-400 mx-auto md:mx-0">
              <Shield className="w-4 h-4" />
              <span>Good Samaritan Hub</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              Don't Be Afraid.<br />
              <span className="text-amber-500">Be Someone's Hero.</span>
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-lg mx-auto md:mx-0">
              Fear of legal harassment and police questioning stops millions from helping road accident victims. Learn your rights, overcome hesitation, and pledge to save a life during the Golden Hour.
            </p>
            <div className="pt-2 flex justify-center md:justify-start">
              <Link 
                to="/training"
                className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm transition-all shadow-lg active:scale-95"
              >
                <span>Start Training Academy</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
          <div className="flex-1 w-full max-w-md">
            {/* Illustration Placeholder */}
            <div className="w-full aspect-square bg-slate-800 rounded-full border-[16px] border-slate-800/50 flex flex-col items-center justify-center p-8 text-center space-y-4">
              <Shield className="w-24 h-24 text-amber-500" />
              <h3 className="font-black text-2xl">Legally Protected</h3>
              <p className="text-sm text-slate-400">By the Supreme Court of India</p>
            </div>
          </div>
        </div>

        <LawCards />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start max-w-6xl mx-auto">
          <MythBusters />
          <div className="space-y-8">
            <InteractiveChecklist />
            <DecisionSimulator />
          </div>
        </div>

        <ConfidenceMeter />

        <VideoSection />

        <SuccessStories />

        <FaqAccordion />

        <PledgeSection />

      </div>
    </div>
  );
};
