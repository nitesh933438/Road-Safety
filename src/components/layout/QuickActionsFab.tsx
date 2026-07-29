/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Zap,
  X,
  ShieldAlert,
  AlertTriangle,
  Building2,
  Navigation,
  Bot,
  Phone,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

export const QuickActionsFab: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [callModal, setCallModal] = useState<{ open: boolean; number: string; title: string } | null>(null);
  const fabRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (fabRef.current && !fabRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAction = (path?: string, callNum?: string, title?: string) => {
    setIsOpen(false);
    if (path) {
      navigate(path);
    } else if (callNum && title) {
      setCallModal({ open: true, number: callNum, title });
    }
  };

  const executeCall = () => {
    if (!callModal) return;
    toast.success(`Dialing Emergency Hotline ${callModal.number}...`, { icon: '📞' });
    window.location.href = `tel:${callModal.number}`;
    setCallModal(null);
  };

  const actions = [
    { label: 'SOS Emergency', icon: ShieldAlert, color: 'bg-rose-600 hover:bg-rose-700 text-white', path: '/sos' },
    { label: 'Report Accident', icon: FileText, color: 'bg-amber-600 hover:bg-amber-700 text-white', path: '/emergency-report' },
    { label: 'Report Road Hazard', icon: AlertTriangle, color: 'bg-orange-600 hover:bg-orange-700 text-white', path: '/hazards' },
    { label: 'Find Hospital', icon: Building2, color: 'bg-sky-600 hover:bg-sky-700 text-white', path: '/map?filter=hospital' },
    { label: 'Start Navigation', icon: Navigation, color: 'bg-emerald-600 hover:bg-emerald-700 text-white', path: '/safe-route' },
    { label: 'AI Assistant', icon: Bot, color: 'bg-indigo-600 hover:bg-indigo-700 text-white', path: '/ai-assistant' },
    { label: 'Call 108 Ambulance', icon: Phone, color: 'bg-rose-700 hover:bg-rose-800 text-white', number: '108', title: 'Call 108 Medical Ambulance' },
    { label: 'Call 112 Emergency', icon: Phone, color: 'bg-purple-700 hover:bg-purple-800 text-white', number: '112', title: 'Call 112 Unified Emergency Service' },
  ];

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50" ref={fabRef}>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-16 right-0 mb-2 w-64 rounded-3xl glass border border-slate-200 dark:border-slate-800 shadow-2xl p-3 space-y-2"
            >
              <div className="px-3 py-1.5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                  Quick Actions Hub
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              </div>

              <div className="space-y-1.5 max-h-[60vh] overflow-y-auto no-scrollbar">
                {actions.map((act) => {
                  const Icon = act.icon;
                  return (
                    <button
                      key={act.label}
                      type="button"
                      onClick={() => handleAction(act.path, act.number, act.title)}
                      className={`w-full p-2.5 rounded-2xl text-xs font-bold transition-all shadow-sm flex items-center justify-between group hover:scale-[1.02] ${act.color}`}
                    >
                      <div className="flex items-center space-x-2.5">
                        <Icon className="w-4 h-4 shrink-0" />
                        <span>{act.label}</span>
                      </div>
                      <span className="text-[10px] opacity-80 group-hover:opacity-100">→</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Primary FAB Toggle Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Quick Actions Menu"
          className="relative group p-4 rounded-full bg-gradient-to-r from-rose-600 via-indigo-600 to-amber-500 text-white shadow-2xl hover:scale-110 active:scale-95 transition-all focus:outline-none ring-4 ring-rose-500/20"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <div className="flex items-center space-x-1">
              <Zap className="w-6 h-6 animate-bounce" />
            </div>
          )}
        </button>
      </div>

      {/* Emergency Call Modal */}
      <AnimatePresence>
        {callModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-sm rounded-3xl glass border border-slate-200 dark:border-slate-800 p-6 space-y-5 bg-white dark:bg-slate-900 text-center shadow-2xl"
            >
              <div className="w-16 h-16 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-600 flex items-center justify-center mx-auto shadow-inner">
                <Phone className="w-8 h-8 animate-pulse" />
              </div>

              <div className="space-y-1">
                <h3 className="text-lg font-black text-slate-900 dark:text-white">
                  {callModal.title}
                </h3>
                <p className="text-xs text-slate-500">
                  You are about to place an emergency phone call to <strong>{callModal.number}</strong>.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setCallModal(null)}
                  className="py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={executeCall}
                  className="py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-black shadow-lg hover:scale-105 transition-all"
                >
                  Call {callModal.number} Now
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
