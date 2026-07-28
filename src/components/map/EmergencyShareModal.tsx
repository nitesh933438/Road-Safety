/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Share2, Copy, Check, X, ShieldAlert, MapPin, PhoneCall } from 'lucide-react';

interface EmergencyShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmergencyShareModal: React.FC<EmergencyShareModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const shareText = `🚨 EMERGENCY SOS BEACON\nLocation: NH-48 Highway, Sector 4 Junction (Lat: 28.6139, Lng: 77.2090)\nGoogle Maps: https://maps.google.com/?q=28.6139,77.2090\nEmergency Contact: +91 98765 11111 (Spouse)\nPlease dispatch 108 ambulance immediately!`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[2000] bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Share2 className="w-6 h-6 text-amber-500" />
            <h3 className="text-xl font-black text-slate-900 dark:text-white">Emergency Share Card</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3 font-mono text-xs text-slate-700 dark:text-slate-300">
          <div className="flex items-center space-x-2 text-rose-600 font-bold">
            <ShieldAlert className="w-4 h-4" />
            <span>SOS TELEMETRY CARD</span>
          </div>
          <p><strong>GPS:</strong> 28.6139° N, 77.2090° E</p>
          <p><strong>Address:</strong> NH-48 Highway, Sector 4 Junction</p>
          <p><strong>Maps Link:</strong> https://maps.google.com/?q=28.6139,77.2090</p>
          <p><strong>ICE Contact:</strong> Rajesh Sharma (+91 98765 11111)</p>
        </div>

        <button
          onClick={handleCopy}
          className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-md flex items-center justify-center space-x-2 transition-transform active:scale-95"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'Copied to Clipboard!' : 'Copy Emergency Card'}</span>
        </button>
      </div>
    </div>
  );
};
