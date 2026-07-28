/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShieldAlert, X, AlertTriangle, Upload, CheckCircle2 } from 'lucide-react';
import { AccidentReport } from '../../data/mapData';
import { CloudinaryUploader } from '../common/CloudinaryUploader';

interface AccidentReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (report: AccidentReport) => void;
}

export const AccidentReportModal: React.FC<AccidentReportModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [address, setAddress] = useState('NH-48 Highway, Sector 4 Junction (Live GPS Lat: 28.6139, Lng: 77.2090)');
  const [accidentType, setAccidentType] = useState('Car Collision');
  const [severity, setSeverity] = useState<'Low' | 'Medium' | 'High' | 'Critical'>('High');
  const [injuredCount, setInjuredCount] = useState(2);
  const [vehicleType, setVehicleType] = useState('Car & Two-Wheeler');
  const [description, setDescription] = useState('Heavy traffic collision with potential fuel leakage and moderate injuries.');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [submittedAiResult, setSubmittedAiResult] = useState<any | null>(null);

  if (!isOpen) return null;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulated AI Severity Prediction
    let aiRec = 'Dispatch Level-1 Trauma Ambulance immediately. Keep victim warm and calm.';
    if (severity === 'Critical') {
      aiRec = 'CRITICAL ALERT: Immediate Ambulance 108 dispatch, police corridor clearance, and bystander CPR guidance required.';
    } else if (severity === 'Medium') {
      aiRec = 'Dispatch standard ambulance and apply direct pressure to injuries.';
    }

    const newReport: AccidentReport = {
      id: Date.now().toString(),
      lat: 28.6139 + (Math.random() - 0.5) * 0.02,
      lng: 77.2090 + (Math.random() - 0.5) * 0.02,
      address,
      dateTime: new Date().toLocaleString(),
      accidentType,
      severity,
      injuredCount,
      vehicleType,
      description,
      imageUrl: imageUrl || undefined,
      aiRecommendation: aiRec,
    };

    setSubmittedAiResult(newReport);
  };

  const handleFinish = () => {
    if (submittedAiResult) {
      onSubmit(submittedAiResult);
    }
    setSubmittedAiResult(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[2000] bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShieldAlert className="w-6 h-6 text-rose-600" />
            <h3 className="text-xl font-black text-slate-900 dark:text-white">Report Highway Accident</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
            <X className="w-6 h-6" />
          </button>
        </div>

        {submittedAiResult ? (
          <div className="space-y-6 animate-fadeIn">
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 flex items-center space-x-3">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 flex-shrink-0" />
              <div>
                <h4 className="font-black text-emerald-900 dark:text-emerald-300 text-sm">Accident Report & AI Triage Successfully Submitted</h4>
                <p className="text-xs text-emerald-700 dark:text-emerald-400">Broadcasted to 108 dispatch and nearby patrol units.</p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
              <h5 className="font-bold text-xs uppercase tracking-wider text-amber-600">🤖 AI Severity Prediction & Recommendations:</h5>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Predicted Risk Level</span>
                  <span className={`text-sm font-black block mt-0.5 ${
                    submittedAiResult.severity === 'Critical' ? 'text-rose-600' : 'text-orange-500'
                  }`}>
                    {submittedAiResult.severity} Severity
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Injured Count</span>
                  <span className="text-sm font-black block mt-0.5 text-slate-900 dark:text-white">{submittedAiResult.injuredCount} Persons</span>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-xs text-amber-900 dark:text-amber-300 font-medium">
                {submittedAiResult.aiRecommendation}
              </div>
            </div>

            <button
              onClick={handleFinish}
              className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg"
            >
              View on Live Emergency Map
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Accident Type</label>
                <select
                  value={accidentType}
                  onChange={(e) => setAccidentType(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-xs text-slate-900 dark:text-white"
                >
                  <option value="Car Collision">Car Collision</option>
                  <option value="Truck Rollover">Truck Rollover</option>
                  <option value="Two-Wheeler Crash">Two-Wheeler Crash</option>
                  <option value="Pedestrian Struck">Pedestrian Struck</option>
                  <option value="Vehicle Fire / Hazard">Vehicle Fire / Hazard</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Severity Level</label>
                <select
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value as any)}
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-xs text-slate-900 dark:text-white"
                >
                  <option value="Low">Low - Minor Scrapes</option>
                  <option value="Medium">Medium - Moderate Injury</option>
                  <option value="High">High - Severe Trauma</option>
                  <option value="Critical">Critical - Life Threatening</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Number of Injured</label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={injuredCount}
                  onChange={(e) => setInjuredCount(parseInt(e.target.value) || 1)}
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Vehicle Types Involved</label>
                <input
                  type="text"
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-xs text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Location Address / GPS</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-xs text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Description & Details</label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-xs text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <CloudinaryUploader
                folder="accident_media"
                acceptedTypes="auto"
                maxSizeMB={50}
                value={imageUrl}
                label="Upload Accident Photo / Video"
                description="Upload images or video clips of the accident site (max 50MB)"
                compact
                onUploadSuccess={(res) => setImageUrl(res.secureUrl)}
                onRemove={() => setImageUrl(null)}
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-lg shadow-rose-600/30"
            >
              Submit Report & Run AI Severity Analysis
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
