import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, MapPin, Clock, Cloud, Car, ShieldAlert, AlertTriangle, Lightbulb, TrendingDown, Eye } from 'lucide-react';
import { AiIncidentSimulator } from './AiIncidentSimulator';

export const AiRiskPrediction: React.FC = () => {
  const [isPredicting, setIsPredicting] = useState(false);
  const [predictionResult, setPredictionResult] = useState<any>(null);

  // Form State
  const [formData, setFormData] = useState({
    location: '',
    time: '12:00',
    weather: 'Clear',
    roadType: 'Highway',
    vehicleType: 'Car',
    trafficDensity: 'Medium',
    speed: 60,
    visibility: 'Good',
    lighting: 'Daylight',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePredict = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPredicting(true);
    
    // Simulate AI processing
    setTimeout(() => {
      // Dummy logic for demonstration
      let score = 30;
      if (formData.weather === 'Rain' || formData.weather === 'Fog') score += 25;
      if (formData.time > '18:00' || formData.time < '06:00') score += 20;
      if (Number(formData.speed) > 80) score += 15;
      if (formData.trafficDensity === 'High') score += 10;
      if (formData.visibility === 'Poor') score += 15;

      score = Math.min(score, 98); // Max 98

      let level = 'Safe';
      let color = 'text-emerald-500';
      let bg = 'bg-emerald-100';
      
      if (score > 80) { level = 'Critical'; color = 'text-rose-600'; bg = 'bg-rose-100'; }
      else if (score > 60) { level = 'High'; color = 'text-orange-500'; bg = 'bg-orange-100'; }
      else if (score > 40) { level = 'Medium'; color = 'text-amber-500'; bg = 'bg-amber-100'; }
      else if (score > 20) { level = 'Low'; color = 'text-yellow-500'; bg = 'bg-yellow-100'; }

      setPredictionResult({
        score,
        level,
        color,
        bg,
        confidence: 89,
        reasoning: `High risk factors detected: ${formData.weather} weather combined with ${formData.speed}km/h speed on a ${formData.roadType}.`,
        recommendations: [
          'Reduce speed by 20km/h',
          'Increase following distance',
          'Turn on fog lights if available'
        ]
      });
      setIsPredicting(false);
    }, 1500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Column: Form & Simulator */}
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center mb-6">
            <Brain className="w-6 h-6 text-indigo-500 mr-2" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Risk Parameters</h3>
          </div>

          <form onSubmit={handlePredict} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 flex items-center">
                <MapPin className="w-4 h-4 mr-1" /> Location
              </label>
              <input type="text" name="location" value={formData.location} onChange={handleChange} required placeholder="e.g. NH-44, Sector 62" className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 flex items-center">
                  <Clock className="w-4 h-4 mr-1" /> Time
                </label>
                <input type="time" name="time" value={formData.time} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 flex items-center">
                  <Cloud className="w-4 h-4 mr-1" /> Weather
                </label>
                <select name="weather" value={formData.weather} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500">
                  <option>Clear</option><option>Rain</option><option>Fog</option><option>Storm</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 flex items-center">
                  <Car className="w-4 h-4 mr-1" /> Vehicle
                </label>
                <select name="vehicleType" value={formData.vehicleType} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500">
                  <option>Car</option><option>2-Wheeler</option><option>Truck</option><option>Bus</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Speed (km/h)</label>
                <input type="number" name="speed" value={formData.speed} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 flex items-center">
                  <Eye className="w-4 h-4 mr-1" /> Visibility
                </label>
                <select name="visibility" value={formData.visibility} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500">
                  <option>Good</option><option>Moderate</option><option>Poor</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Lighting</label>
                <select name="lighting" value={formData.lighting} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500">
                  <option>Daylight</option><option>Streetlights</option><option>Dark</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={isPredicting || !formData.location}
              className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-medium py-3 rounded-lg flex justify-center items-center transition-colors"
            >
              {isPredicting ? (
                <span className="flex items-center">
                  <Brain className="w-5 h-5 mr-2 animate-pulse" /> Analyzing Data...
                </span>
              ) : (
                <span className="flex items-center">
                  <Brain className="w-5 h-5 mr-2" /> Predict Risk
                </span>
              )}
            </button>
          </form>
        </div>
        
        {/* Simulator Sidebar Component */}
        <AiIncidentSimulator formData={formData} setFormData={setFormData} />
      </div>

      {/* Right Column: Results */}
      <div className="lg:col-span-2">
        {predictionResult ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-slate-800 p-8 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm h-full"
          >
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">AI Risk Analysis Complete</h2>
              <p className="text-slate-500 dark:text-slate-400">Based on historical data and current conditions for {formData.location}</p>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-12 mb-10">
              {/* Radial Progress / Gauge */}
              <div className="relative w-48 h-48 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" className="text-slate-100 dark:text-slate-700" />
                  <motion.circle 
                    initial={{ strokeDasharray: "0 300" }}
                    animate={{ strokeDasharray: `${(predictionResult.score / 100) * 283} 300` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" 
                    className={predictionResult.color} 
                    strokeLinecap="round" 
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center text-center">
                  <span className={`text-4xl font-black ${predictionResult.color}`}>{predictionResult.score}</span>
                  <span className="text-sm font-medium text-slate-500 mt-1">/ 100</span>
                </div>
              </div>

              <div className="space-y-6 flex-1 text-center md:text-left">
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Assessed Risk Level</p>
                  <div className={`inline-flex items-center px-4 py-2 rounded-full font-bold text-lg ${predictionResult.bg} ${predictionResult.color}`}>
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    {predictionResult.level} Risk
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">AI Confidence</p>
                  <div className="flex items-center justify-center md:justify-start">
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5 max-w-[200px] mr-3">
                      <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${predictionResult.confidence}%` }}></div>
                    </div>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{predictionResult.confidence}%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-6 mb-8 border border-slate-100 dark:border-slate-700">
              <h4 className="font-bold text-slate-900 dark:text-white flex items-center mb-3">
                <Brain className="w-5 h-5 mr-2 text-indigo-500" /> AI Reasoning
              </h4>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                {predictionResult.reasoning} Historical data for this area shows a 40% increase in incidents under similar environmental conditions.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 dark:text-white flex items-center mb-4">
                <Lightbulb className="w-5 h-5 mr-2 text-amber-500" /> Actionable Recommendations
              </h4>
              <ul className="space-y-3">
                {predictionResult.recommendations.map((rec: string, idx: number) => (
                  <motion.li 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + (idx * 0.1) }}
                    key={idx} 
                    className="flex items-start bg-white dark:bg-slate-800 p-3 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm"
                  >
                    <div className="bg-emerald-100 dark:bg-emerald-900/30 p-1.5 rounded-full mr-3 mt-0.5">
                      <TrendingDown className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <span className="text-slate-700 dark:text-slate-300 font-medium">{rec}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

          </motion.div>
        ) : (
          <div className="bg-slate-50 dark:bg-slate-800/50 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl flex flex-col items-center justify-center p-12 h-full min-h-[500px] text-center">
            <div className="w-20 h-20 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mb-6">
              <ShieldAlert className="w-10 h-10 text-indigo-500" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Ready to Analyze</h3>
            <p className="text-slate-500 dark:text-slate-400 max-w-md">
              Enter location and environmental parameters on the left, then click predict to generate a comprehensive AI risk analysis.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
