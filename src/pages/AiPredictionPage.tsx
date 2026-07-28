import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Map, BarChart3, Settings, ShieldAlert, Cpu, Compass, Layers } from 'lucide-react';
import { PredictiveDashboard } from '../components/ai/PredictiveDashboard';
import { AiRiskPrediction } from '../components/ai/AiRiskPrediction';
import { InteractiveRiskMap } from '../components/ai/InteractiveRiskMap';
import { AiRecommendations } from '../components/ai/AiRecommendations';
import { AiSafeRoute } from '../components/ai/AiSafeRoute';
import { SmartRiskLayer } from '../components/ai/SmartRiskLayer';

type Tab = 'risk-layer' | 'safe-route' | 'dashboard' | 'predictor' | 'map' | 'recommendations';

export const AiPredictionPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('risk-layer');

  const tabs: { id: Tab; label: string; icon: any }[] = [
    { id: 'risk-layer', label: 'Smart Risk Layer Radar', icon: Layers },
    { id: 'safe-route', label: 'AI Safe Route Generator', icon: Compass },
    { id: 'dashboard', label: 'Predictive Dashboard', icon: BarChart3 },
    { id: 'predictor', label: 'Risk Predictor & Simulator', icon: Cpu },
    { id: 'map', label: 'Risk Map & Black Spots', icon: Map },
    { id: 'recommendations', label: 'AI Recommendations', icon: Brain },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300 pb-12">
      <div className="bg-indigo-600 dark:bg-indigo-900 text-white pb-16 pt-8 px-4 sm:px-6 lg:px-8 shadow-sm relative overflow-hidden">
        {/* Animated background element */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 opacity-20 pointer-events-none">
          <Brain className="w-96 h-96 text-white" />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight flex items-center">
                <Brain className="w-8 h-8 mr-3" />
                AI Intelligence & Smart Analytics
              </h1>
              <p className="mt-2 text-indigo-100 max-w-2xl text-lg">
                Predict accident risks, identify black spots, and generate actionable preventive recommendations using AI.
              </p>
            </div>
            <div className="bg-indigo-800/50 backdrop-blur-sm border border-indigo-500/30 px-4 py-2 rounded-lg flex items-center space-x-3">
              <div className="flex items-center">
                <span className="relative flex h-3 w-3 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <span className="text-sm font-medium">Model: RS-Core v2.4</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden relative z-20">
          <div className="border-b border-slate-200 dark:border-slate-700 overflow-x-auto no-scrollbar">
            <nav className="flex space-x-2 px-4 py-3" aria-label="Tabs">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`${
                      activeTab === tab.id
                        ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300'
                        : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-700'
                    } flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap`}
                  >
                    <Icon className={`mr-2 h-4 w-4 ${activeTab === tab.id ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}`} />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>
          
          <div className="p-4 sm:p-6 lg:p-8 min-h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === 'risk-layer' && <SmartRiskLayer />}
                {activeTab === 'safe-route' && <AiSafeRoute />}
                {activeTab === 'dashboard' && <PredictiveDashboard />}
                {activeTab === 'predictor' && <AiRiskPrediction />}
                {activeTab === 'map' && <InteractiveRiskMap />}
                {activeTab === 'recommendations' && <AiRecommendations />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
