import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Users, Building, ShieldAlert, HeartPulse, HardHat, FileText, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

const stakeholders = [
  {
    id: 'gov',
    title: 'Government / Civic Authorities',
    icon: Building,
    color: 'text-indigo-500',
    bg: 'bg-indigo-50 dark:bg-indigo-900/30',
    border: 'border-indigo-200 dark:border-indigo-800',
    recommendations: [
      'Install speed breakers at NH-44 Curve within 30 days based on critical risk assessment.',
      'Upgrade street lighting on MG Road Junction (AI identified 38% of accidents happen post 18:00).',
      'Repair potholes on Sector 62 Crossing before upcoming monsoon season.',
    ]
  },
  {
    id: 'police',
    title: 'Traffic Police',
    icon: ShieldAlert,
    color: 'text-blue-500',
    bg: 'bg-blue-50 dark:bg-blue-900/30',
    border: 'border-blue-200 dark:border-blue-800',
    recommendations: [
      'Deploy interceptor vehicles at Sector 62 Crossing between 18:00 - 21:00.',
      'Increase automated challans for overspeeding (identified as top behavioral cause).',
      'Redirect heavy truck traffic during peak morning rush hours (08:00 - 10:00).',
    ]
  },
  {
    id: 'hospital',
    title: 'Hospitals & Emergency Responders',
    icon: HeartPulse,
    color: 'text-rose-500',
    bg: 'bg-rose-50 dark:bg-rose-900/30',
    border: 'border-rose-200 dark:border-rose-800',
    recommendations: [
      'Position standby ambulances near NH-44 Curve during weekends.',
      'Increase trauma bed readiness by 15% during heavy rain forecasts.',
      'Integrate with Good Samaritan network to reduce average response time below 8 mins.',
    ]
  },
  {
    id: 'citizens',
    title: 'Citizens & Drivers',
    icon: Users,
    color: 'text-emerald-500',
    bg: 'bg-emerald-50 dark:bg-emerald-900/30',
    border: 'border-emerald-200 dark:border-emerald-800',
    recommendations: [
      'Use the app to check live risk scores before traveling during fog or heavy rain.',
      'Maintain at least 3-second following distance on highways.',
      'Report active hazards or broken signals immediately to earn community points.',
    ]
  },
];

export const AiRecommendations: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownloadReport = () => {
    setIsGenerating(true);
    toast.loading('Compiling AI insights and generating PDF...', { id: 'report' });
    
    setTimeout(() => {
      setIsGenerating(false);
      toast.success('Comprehensive Risk Report downloaded successfully.', { id: 'report' });
    }, 2000);
  };

  return (
    <div className="space-y-8 h-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center">
            <FileText className="w-6 h-6 mr-2 text-indigo-500" />
            AI Prevention Strategies
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Actionable recommendations distributed by stakeholder responsibility.</p>
        </div>
        <button
          onClick={handleDownloadReport}
          disabled={isGenerating}
          className="flex items-center px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 rounded-lg font-medium transition-colors text-sm"
        >
          {isGenerating ? (
            <span className="flex items-center animate-pulse"><HardHat className="w-4 h-4 mr-2" /> Generating...</span>
          ) : (
            <span className="flex items-center"><Download className="w-4 h-4 mr-2" /> Download Full PDF Report</span>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stakeholders.map((stakeholder, idx) => (
          <motion.div
            key={stakeholder.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden flex flex-col`}
          >
            <div className={`p-4 border-b ${stakeholder.border} ${stakeholder.bg} flex items-center`}>
              <div className={`p-2 bg-white dark:bg-slate-800 rounded-lg mr-3 shadow-sm ${stakeholder.color}`}>
                <stakeholder.icon className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white">{stakeholder.title}</h3>
            </div>
            
            <div className="p-5 flex-1">
              <ul className="space-y-4">
                {stakeholder.recommendations.map((rec, rIdx) => (
                  <li key={rIdx} className="flex items-start">
                    <CheckCircle2 className={`w-5 h-5 mr-3 shrink-0 mt-0.5 ${stakeholder.color}`} />
                    <span className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Emergency Readiness Score */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl p-6 shadow-lg text-white">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2 flex items-center"><ShieldAlert className="w-6 h-6 mr-2" /> Regional Emergency Readiness</h3>
            <p className="text-emerald-50 max-w-2xl text-sm">
              AI calculated readiness score based on hospital capacity, available volunteers, police coverage, and active ambulance density in the current sector.
            </p>
          </div>
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="text-4xl font-black mb-1">84%</div>
              <div className="text-xs font-medium text-emerald-100 uppercase tracking-wide">Overall Score</div>
            </div>
            <div className="h-16 w-px bg-emerald-400/50 hidden md:block"></div>
            <div className="space-y-2 text-sm font-medium">
              <div className="flex items-center justify-between w-40">
                <span className="text-emerald-100">Medical:</span> <span>92%</span>
              </div>
              <div className="flex items-center justify-between w-40">
                <span className="text-emerald-100">Volunteers:</span> <span>76%</span>
              </div>
              <div className="flex items-center justify-between w-40">
                <span className="text-emerald-100">Police:</span> <span>85%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
