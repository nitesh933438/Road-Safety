/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell } from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';
import { NotificationDropdown } from './NotificationDropdown';

export const NotificationBell: React.FC = () => {
  const { unreadCount, criticalUnreadCount, hasNewArrival, setHasNewArrival } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (hasNewArrival) {
      setHasNewArrival(false);
    }
  };

  return (
    <div className="relative">
      <motion.button
        type="button"
        onClick={toggleDropdown}
        animate={hasNewArrival ? { rotate: [0, -15, 15, -10, 10, -5, 5, 0] } : {}}
        transition={{ duration: 0.6, repeat: hasNewArrival ? 2 : 0 }}
        aria-label={`Notifications, ${unreadCount} unread`}
        aria-expanded={isOpen}
        className={`relative p-2 rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
          isOpen
            ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 shadow-sm'
            : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100/60 dark:hover:bg-slate-800/60'
        }`}
      >
        <Bell className="w-5 h-5 transition-transform group-hover:scale-110" />

        {/* Unread Count Badge */}
        {unreadCount > 0 && (
          <span className={`absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-black tracking-tighter text-white flex items-center justify-center shadow-md ${
            criticalUnreadCount > 0 ? 'bg-rose-600 animate-pulse' : 'bg-indigo-600'
          }`}>
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}

        {/* Critical Ping Dot */}
        {criticalUnreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full animate-ping" />
        )}
      </motion.button>

      {/* Dropdown Container */}
      <AnimatePresence>
        {isOpen && (
          <NotificationDropdown
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
