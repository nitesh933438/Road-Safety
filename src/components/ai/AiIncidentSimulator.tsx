import React from 'react';
import { Sliders, CloudRain, Sun, Moon } from 'lucide-react';

interface AiIncidentSimulatorProps {
  formData: any;
  setFormData: (data: any) => void;
}

export const AiIncidentSimulator: React.FC<AiIncidentSimulatorProps> = ({ formData, setFormData }) => {
  
  const handleQuickSet = (preset: string) => {
    switch (preset) {
      case 'Monsoon Night':
        setFormData({ ...formData, weather: 'Rain', time: '23:00', visibility: 'Poor', lighting: 'Dark', speed: 60 });
        break;
      case 'Clear Day':
        setFormData({ ...formData, weather: 'Clear', time: '14:00', visibility: 'Good', lighting: 'Daylight', speed: 80 });
        break;
      case 'Winter Fog':
        setFormData({ ...formData, weather: 'Fog', time: '06:00', visibility: 'Poor', lighting: 'Daylight', speed: 40 });
        break;
    }
  };

  return (
    <div className="bg-indigo-50 dark:bg-indigo-900/10 p-6 rounded-xl border border-indigo-100 dark:border-indigo-800/30">
      <div className="flex items-center mb-4">
        <Sliders className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mr-2" />
        <h3 className="text-md font-bold text-slate-900 dark:text-white">Quick Simulation Scenarios</h3>
      </div>
      <p className="text-xs text-slate-500 mb-4">Quickly populate the form with common high-risk or low-risk scenarios.</p>
      
      <div className="space-y-3">
        <button 
          onClick={() => handleQuickSet('Monsoon Night')}
          className="w-full flex items-center justify-between p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600 transition-colors group"
        >
          <div className="flex items-center">
            <CloudRain className="w-4 h-4 text-blue-500 mr-2 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Monsoon Night</span>
          </div>
          <span className="text-xs font-bold text-rose-500 bg-rose-50 dark:bg-rose-900/30 px-2 py-1 rounded">High Risk</span>
        </button>

        <button 
          onClick={() => handleQuickSet('Winter Fog')}
          className="w-full flex items-center justify-between p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600 transition-colors group"
        >
          <div className="flex items-center">
            <Moon className="w-4 h-4 text-slate-400 mr-2 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Winter Fog Morning</span>
          </div>
          <span className="text-xs font-bold text-orange-500 bg-orange-50 dark:bg-orange-900/30 px-2 py-1 rounded">Medium Risk</span>
        </button>

        <button 
          onClick={() => handleQuickSet('Clear Day')}
          className="w-full flex items-center justify-between p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600 transition-colors group"
        >
          <div className="flex items-center">
            <Sun className="w-4 h-4 text-amber-500 mr-2 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Clear Afternoon</span>
          </div>
          <span className="text-xs font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-1 rounded">Low Risk</span>
        </button>
      </div>
    </div>
  );
};
