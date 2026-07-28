/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AlertTriangle, ShieldAlert, CheckCircle2, Camera } from 'lucide-react';
import { CloudinaryUploader } from '../common/CloudinaryUploader';

export const SeveritySelector: React.FC = () => {
  const [severity, setSeverity] = useState<'minor' | 'moderate' | 'critical'>('critical');
  const [evidenceMedia, setEvidenceMedia] = useState<string | null>(null);

  const severityInfo = {
    minor: {
      title: 'Minor Accident / Scrapes',
      color: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-300',
      desc: 'No heavy bleeding or unconsciousness. Move vehicles to shoulder if safe, inspect for minor injuries, and log report.',
      action: 'Notify Highway Patrol & Log Incident',
    },
    moderate: {
      title: 'Moderate Injury / Fracture / Bleeding',
      color: 'bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300 border-orange-300',
      desc: 'Visible fractures or moderate bleeding. Apply direct pressure, do not move victim unnecessarily, call ambulance 108.',
      action: 'Dispatch Ambulance 108 & Apply First Aid',
    },
    critical: {
      title: 'Critical Trauma / Unconscious / Heavy Arterial Bleeding',
      color: 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border-rose-300',
      desc: 'Severe head trauma, heavy bleeding, or unconsciousness. Initiate Golden Hour protocol immediately, CPR if required, urgent 108 dispatch.',
      action: '🚨 IMMEDIATE SOS BEACON + LEVEL-1 TRAUMA DISPATCH',
    },
  };

  const current = severityInfo[severity];

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <AlertTriangle className="w-5 h-5 text-amber-500" />
          <h3 className="font-bold text-slate-900 dark:text-white text-base">Accident Severity Assessment</h3>
        </div>
        <span className="text-xs text-slate-500 dark:text-slate-400">Select Severity Level</span>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <button
          onClick={() => setSeverity('minor')}
          className={`p-3 rounded-xl border text-center transition-all text-xs font-bold ${
            severity === 'minor'
              ? 'bg-amber-500 text-white border-amber-600 shadow-md'
              : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
          }`}
        >
          Minor
        </button>
        <button
          onClick={() => setSeverity('moderate')}
          className={`p-3 rounded-xl border text-center transition-all text-xs font-bold ${
            severity === 'moderate'
              ? 'bg-orange-500 text-white border-orange-600 shadow-md'
              : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
          }`}
        >
          Moderate
        </button>
        <button
          onClick={() => setSeverity('critical')}
          className={`p-3 rounded-xl border text-center transition-all text-xs font-bold ${
            severity === 'critical'
              ? 'bg-rose-600 text-white border-rose-700 shadow-md'
              : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
          }`}
        >
          Critical
        </button>
      </div>

      <div className={`p-4 rounded-xl border ${current.color} space-y-2`}>
        <div className="flex items-center space-x-2">
          <ShieldAlert className="w-4 h-4 flex-shrink-0" />
          <h4 className="font-bold text-sm">{current.title}</h4>
        </div>
        <p className="text-xs leading-relaxed opacity-90">{current.desc}</p>
        <div className="pt-2 border-t border-current/20">
          <span className="text-[11px] font-bold uppercase tracking-wider block">Recommended Protocol:</span>
          <span className="text-xs font-semibold">{current.action}</span>
        </div>
      </div>

      <div className="pt-2">
        <CloudinaryUploader
          folder="sos_accident_media"
          acceptedTypes="auto"
          maxSizeMB={50}
          value={evidenceMedia}
          label="Attach Scene Photo or Video Evidence"
          description="Directly uploads accident photos or video clips to Cloudinary for emergency responders"
          compact
          onUploadSuccess={(res) => setEvidenceMedia(res.secureUrl)}
          onRemove={() => setEvidenceMedia(null)}
        />
      </div>
    </div>
  );
};
