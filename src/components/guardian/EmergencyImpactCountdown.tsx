/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldAlert,
  PhoneCall,
  XCircle,
  AlertTriangle,
  Radio,
  CheckCircle2,
  Volume2
} from 'lucide-react';

interface EmergencyImpactCountdownProps {
  emergencyContact: string;
  onCancel: () => void;
  onTriggerSosConfirmed: () => void;
}

export const EmergencyImpactCountdown: React.FC<EmergencyImpactCountdownProps> = ({
  emergencyContact,
  onCancel,
  onTriggerSosConfirmed,
}) => {
  const [countdown, setCountdown] = useState(10);
  const [isSosSent, setIsSosSent] = useState(false);

  useEffect(() => {
    if (countdown <= 0) {
      setIsSosSent(true);
      onTriggerSosConfirmed();
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown, onTriggerSosConfirmed]);

  return (
    <div className="fixed inset-0 z-50 bg-rose-950/95 backdrop-blur-xl flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="max-w-xl w-full bg-slate-900 border-4 border-rose-500 rounded-3xl p-6 sm:p-8 text-center space-y-6 text-white shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-rose-600 animate-pulse" />

        {!isSosSent ? (
          <>
            <div className="w-16 h-16 bg-rose-600 text-white rounded-full mx-auto flex items-center justify-center animate-bounce shadow-xl shadow-rose-600/50">
              <ShieldAlert className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-black uppercase tracking-widest text-rose-400 block">
                CRITICAL SAFETY EVENT DETECTED
              </span>
              <h2 className="text-2xl sm:text-3xl font-black">
                Sudden Stop / Crash Impact Detected!
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                Auto-dispatching emergency team & SMS to <strong className="text-white">{emergencyContact}</strong> in:
              </p>
            </div>

            {/* COUNTDOWN TIMER DISPLAY */}
            <div className="relative w-36 h-36 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-rose-500/30 animate-ping" />
              <div className="w-32 h-32 rounded-full bg-rose-600/20 border-4 border-rose-500 flex items-center justify-center">
                <span className="text-6xl font-black font-mono text-rose-500">
                  {countdown}
                </span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <button
                onClick={onCancel}
                className="w-full py-5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm uppercase tracking-widest shadow-xl shadow-emerald-600/40 cursor-pointer flex items-center justify-center space-x-2"
              >
                <XCircle className="w-6 h-6" />
                <span>I AM OK — CANCEL SOS DISPATCH</span>
              </button>

              <p className="text-[10px] text-slate-400">
                Tap button above if false alarm. Otherwise emergency services will be dispatched automatically.
              </p>
            </div>
          </>
        ) : (
          <div className="space-y-6 py-4">
            <div className="w-16 h-16 bg-rose-600 text-white rounded-full mx-auto flex items-center justify-center animate-pulse">
              <Radio className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-black uppercase tracking-widest text-rose-400 block">
                SOS SIGNAL DISPATCHED
              </span>
              <h2 className="text-2xl font-black text-white">
                Emergency Signal Broadcasted!
              </h2>
              <p className="text-xs text-slate-300">
                GPS Location coordinates & emergency alert sent to GoldenGuard Command Center & <strong className="text-white">{emergencyContact}</strong>.
              </p>
            </div>

            <button
              onClick={onCancel}
              className="px-6 py-3 bg-slate-800 text-slate-200 rounded-2xl font-bold text-xs"
            >
              Return to Guardian Dashboard
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};
