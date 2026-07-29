/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import toast, { useToaster, Toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Info,
  ShieldAlert,
  Pause,
  Siren,
  Bell
} from 'lucide-react';
import { NotificationPriority } from '../../types/notification';

export type ToastPriority = NotificationPriority; // 'critical' | 'high' | 'medium' | 'low'

/**
 * Determine exact Priority Level based on toast options, ID, message, or icon
 */
export function getToastPriority(t: Toast): ToastPriority {
  const customPriority = (t as any).opts?.priority || (t as any).priority;
  if (customPriority === 'critical' || customPriority === 'high' || customPriority === 'medium' || customPriority === 'low') {
    return customPriority;
  }

  const msgString = typeof t.message === 'string'
    ? t.message
    : (React.isValidElement(t.message) ? String((t.message.props as { children?: React.ReactNode })?.children || '') : '');

  const msgLower = msgString.toLowerCase();
  const iconString = typeof t.icon === 'string' ? t.icon : '';

  // 1. 🔴 Critical Priority (8 seconds)
  // SOS Triggered, Major Accident, Ambulance Assigned, Hospital Accepted, Police Alert
  const isCritical =
    (t as any).opts?.isEmergency ||
    t.id?.toLowerCase().includes('emergency') ||
    t.id?.toLowerCase().includes('sos') ||
    msgString.includes('🚨') ||
    msgLower.includes('sos') ||
    msgLower.includes('accident') ||
    msgLower.includes('ambulance') ||
    msgLower.includes('hospital accepted') ||
    msgLower.includes('police alert') ||
    msgLower.includes('critical') ||
    iconString === '🚨' ||
    (t.className && t.className.toLowerCase().includes('critical'));

  if (isCritical) return 'critical';

  // 2. 🟠 High Priority (6 seconds)
  // Hazard Nearby, Black Spot Alert, AI Warning
  const isHigh =
    t.type === 'error' ||
    msgLower.includes('hazard') ||
    msgLower.includes('blackspot') ||
    msgLower.includes('black spot') ||
    msgLower.includes('warning') ||
    msgLower.includes('ai warning') ||
    msgLower.includes('caution') ||
    msgLower.includes('advisory') ||
    msgLower.includes('risk') ||
    iconString === '⚠️' ||
    iconString === '📡' ||
    iconString === '⚡';

  if (isHigh) return 'high';

  // 3. 🔵 Medium Priority (4 seconds)
  // Course Completed, Certificate Ready, New Comment, Volunteer Accepted
  const isMedium =
    msgLower.includes('course') ||
    msgLower.includes('certificate') ||
    msgLower.includes('comment') ||
    msgLower.includes('volunteer') ||
    msgLower.includes('quiz') ||
    msgLower.includes('upvote') ||
    msgLower.includes('like') ||
    msgLower.includes('broadcast') ||
    t.type === 'success';

  if (isMedium) return 'medium';

  // 4. ⚪ Low Priority (3 seconds)
  // Profile Updated, Settings Saved, Theme Changed
  return 'low';
}

/**
 * Priority Duration Mapping:
 * 🔴 Critical: 8s (8000ms)
 * 🟠 High: 6s (6000ms)
 * 🔵 Medium: 4s (4000ms)
 * ⚪ Low: 3s (3000ms)
 */
export function getPriorityDuration(priority: ToastPriority, explicitDuration?: number): number {
  if (explicitDuration && explicitDuration !== 4000 && explicitDuration !== Infinity && explicitDuration > 0) {
    return explicitDuration;
  }

  switch (priority) {
    case 'critical':
      return 8000;
    case 'high':
      return 6000;
    case 'medium':
      return 4000;
    case 'low':
    default:
      return 3000;
  }
}

interface ToastItemProps {
  toastItem: Toast;
}

const ToastItem: React.FC<ToastItemProps> = ({ toastItem }) => {
  const priority = getToastPriority(toastItem);
  const totalDuration = getPriorityDuration(priority, toastItem.duration);

  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(100);

  const remainingRef = useRef<number>(totalDuration);
  const lastTickRef = useRef<number>(Date.now());
  const timerIdRef = useRef<number | null>(null);

  const handleDismiss = () => {
    toast.dismiss(toastItem.id);
  };

  useEffect(() => {
    lastTickRef.current = Date.now();

    const updateTimer = () => {
      if (!isHovered) {
        const now = Date.now();
        const delta = now - lastTickRef.current;
        lastTickRef.current = now;

        remainingRef.current = Math.max(0, remainingRef.current - delta);
        const newPct = (remainingRef.current / totalDuration) * 100;
        setProgress(newPct);

        if (remainingRef.current <= 0) {
          handleDismiss();
          return;
        }
      } else {
        lastTickRef.current = Date.now();
      }

      timerIdRef.current = requestAnimationFrame(updateTimer);
    };

    timerIdRef.current = requestAnimationFrame(updateTimer);

    return () => {
      if (timerIdRef.current) {
        cancelAnimationFrame(timerIdRef.current);
      }
    };
  }, [isHovered, totalDuration, toastItem.id]);

  // Visual Theme configuration per Priority
  const priorityStyles: Record<ToastPriority, {
    bg: string;
    border: string;
    text: string;
    badgeBg: string;
    badgeText: string;
    progressBarBg: string;
    icon: React.ElementType;
    iconColor: string;
    label: string;
    pulseRing: string;
  }> = {
    critical: {
      bg: 'bg-rose-50/95 dark:bg-rose-950/95',
      border: 'border-2 border-rose-500 dark:border-rose-500 shadow-2xl shadow-rose-500/20',
      text: 'text-rose-950 dark:text-rose-100',
      badgeBg: 'bg-rose-600 dark:bg-rose-600',
      badgeText: 'text-white font-black',
      progressBarBg: 'bg-rose-600',
      icon: Siren,
      iconColor: 'text-rose-600 dark:text-rose-400 animate-bounce',
      label: '🔴 Critical (8s)',
      pulseRing: 'ring-4 ring-rose-500/30 animate-pulse'
    },
    high: {
      bg: 'bg-amber-50/95 dark:bg-amber-950/95',
      border: 'border-2 border-amber-500 dark:border-amber-500/80 shadow-xl shadow-amber-500/10',
      text: 'text-amber-950 dark:text-amber-100',
      badgeBg: 'bg-amber-500 dark:bg-amber-600',
      badgeText: 'text-white font-bold',
      progressBarBg: 'bg-amber-500',
      icon: AlertTriangle,
      iconColor: 'text-amber-600 dark:text-amber-400',
      label: '🟠 High (6s)',
      pulseRing: ''
    },
    medium: {
      bg: 'bg-blue-50/95 dark:bg-slate-900/95',
      border: 'border-2 border-blue-400 dark:border-blue-500/70 shadow-lg shadow-blue-500/10',
      text: 'text-slate-900 dark:text-slate-100',
      badgeBg: 'bg-blue-500 dark:bg-blue-600',
      badgeText: 'text-white font-bold',
      progressBarBg: 'bg-blue-500',
      icon: CheckCircle2,
      iconColor: 'text-blue-600 dark:text-blue-400',
      label: '🔵 Medium (4s)',
      pulseRing: ''
    },
    low: {
      bg: 'bg-slate-50/95 dark:bg-slate-900/95',
      border: 'border border-slate-300 dark:border-slate-700 shadow-md',
      text: 'text-slate-900 dark:text-slate-100',
      badgeBg: 'bg-slate-200 dark:bg-slate-800',
      badgeText: 'text-slate-700 dark:text-slate-300 font-bold',
      progressBarBg: 'bg-slate-400 dark:bg-slate-500',
      icon: Info,
      iconColor: 'text-slate-600 dark:text-slate-400',
      label: '⚪ Low (3s)',
      pulseRing: ''
    }
  };

  const styleConfig = priorityStyles[priority];
  const IconComponent = styleConfig.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 80, scale: 0.9, y: -10 }}
      animate={{ opacity: 1, x: 0, scale: 1, y: 0 }}
      exit={{ opacity: 0, x: 80, scale: 0.9, y: -10 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`pointer-events-auto relative w-full max-w-sm sm:max-w-md rounded-2xl p-3.5 sm:p-4 backdrop-blur-md overflow-hidden transition-all ${styleConfig.bg} ${styleConfig.border} ${styleConfig.text} ${styleConfig.pulseRing}`}
    >
      <div className="flex items-start space-x-3">
        {/* Priority Icon */}
        <div className={`p-2 rounded-xl shrink-0 ${priority === 'low' ? 'bg-slate-200/70 dark:bg-slate-800' : 'bg-white/80 dark:bg-black/40'} ${styleConfig.iconColor}`}>
          <IconComponent className="w-5 h-5" />
        </div>

        {/* Content Body */}
        <div className="flex-1 min-w-0 pr-2">
          <div className="flex items-center space-x-2">
            <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md ${styleConfig.badgeBg} ${styleConfig.badgeText}`}>
              {styleConfig.label}
            </span>
            {isHovered && (
              <span className="flex items-center space-x-1 text-[10px] font-bold text-slate-500 dark:text-slate-400 animate-pulse">
                <Pause className="w-2.5 h-2.5" />
                <span>Timer Paused</span>
              </span>
            )}
          </div>

          <div className="mt-1 text-xs sm:text-sm font-semibold leading-snug break-words">
            {typeof toastItem.message === 'function'
              ? toastItem.message(toastItem)
              : toastItem.message}
          </div>
        </div>

        {/* Close (×) Button */}
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Close notification"
          className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-black/5 dark:hover:bg-white/10 transition-colors shrink-0 focus:outline-none"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Smooth Countdown Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-black/5 dark:bg-white/10 overflow-hidden">
        <div
          className={`h-full transition-all duration-75 ease-linear ${styleConfig.progressBarBg}`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </motion.div>
  );
};

export const CustomToaster: React.FC = () => {
  const { toasts } = useToaster({ duration: Infinity });

  // Filter visible toasts and restrict maximum to 5 visible at once (stacking)
  // Overflow toasts wait in queue and render as space becomes available
  const visibleToasts = toasts.filter(t => t.visible).slice(0, 5);

  return (
    <div
      aria-live="polite"
      className="fixed top-16 sm:top-20 right-3 sm:right-6 z-[9999] flex flex-col items-end space-y-2.5 sm:space-y-3 pointer-events-none w-[calc(100vw-1.5rem)] sm:w-auto max-w-md"
    >
      <AnimatePresence mode="popLayout">
        {visibleToasts.map((t) => (
          <ToastItem key={t.id} toastItem={t} />
        ))}
      </AnimatePresence>
    </div>
  );
};


