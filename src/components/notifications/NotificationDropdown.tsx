/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Bell, 
  CheckCheck, 
  Trash2, 
  Search, 
  Volume2, 
  VolumeX, 
  SlidersHorizontal, 
  Inbox, 
  ArrowRight, 
  X,
  Sparkles
} from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';
import { NotificationItem } from './NotificationItem';
import { NotificationCategory, GroupedTimePeriod } from '../../types/notification';

export const NotificationDropdown: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const {
    groupedNotifications,
    unreadCount,
    criticalUnreadCount,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedPriority,
    setSelectedPriority,
    markAllAsRead,
    clearAll,
    soundEnabled,
    toggleSound,
    triggerDemoNotification
  } = useNotifications();

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on ESC key or click outside
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const categories: { label: string; value: NotificationCategory }[] = [
    { label: 'All', value: 'all' },
    { label: `Unread (${unreadCount})`, value: 'unread' },
    { label: 'Emergency', value: 'emergency' },
    { label: 'AI Assistant', value: 'ai' },
    { label: 'Safety', value: 'safety' },
    { label: 'Community', value: 'community' },
    { label: 'System', value: 'system' }
  ];

  const totalFilteredCount = Object.values(groupedNotifications).reduce(
    (acc, list) => acc + list.length, 
    0
  );

  return (
    <div className="relative">
      {/* Mobile Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 sm:hidden"
        onClick={onClose}
      />

      {/* Main Dropdown Card */}
      <motion.div
        ref={dropdownRef}
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="fixed sm:absolute right-2 sm:right-0 top-16 sm:top-full mt-2 w-[calc(100vw-1rem)] sm:w-[440px] max-h-[85vh] sm:max-h-[620px] glass border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden text-slate-900 dark:text-white"
        role="dialog"
        aria-label="Notification center"
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-200/60 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Bell className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full animate-ping" />
                )}
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Notifications</h3>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 rounded-full text-xs font-black bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                  {unreadCount} new
                </span>
              )}
              {criticalUnreadCount > 0 && (
                <span className="px-2 py-0.5 rounded-full text-xs font-black bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border border-rose-200 dark:border-rose-800 animate-pulse">
                  {criticalUnreadCount} critical
                </span>
              )}
            </div>

            <div className="flex items-center space-x-1">
              <button
                type="button"
                onClick={toggleSound}
                className="p-1.5 rounded-xl text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title={soundEnabled ? 'Mute notification sound' : 'Enable notification sound'}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-rose-500" />}
              </button>

              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Close notifications"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Search Bar */}
          <div className="relative mb-3">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search notifications..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-slate-400"
            />
          </div>

          {/* Category Filter Chips */}
          <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar pb-1">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat.value
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Action Toolbar */}
        <div className="px-4 py-2 bg-slate-50/80 dark:bg-slate-900/40 border-b border-slate-200/50 dark:border-slate-800/50 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2">
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value as any)}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-[11px] font-semibold px-2 py-0.5 outline-none cursor-pointer"
            >
              <option value="all">Priority: All</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          <div className="flex items-center space-x-3">
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllAsRead}
                className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline flex items-center"
              >
                <CheckCheck className="w-3.5 h-3.5 mr-1" />
                Read All
              </button>
            )}

            {totalFilteredCount > 0 && (
              <button
                type="button"
                onClick={clearAll}
                className="text-rose-600 dark:text-rose-400 font-bold hover:underline flex items-center"
              >
                <Trash2 className="w-3.5 h-3.5 mr-1" />
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Notification Grouped Timeline List */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-5">
          {totalFilteredCount === 0 ? (
            <div className="py-12 text-center">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-3 text-slate-400">
                <Inbox className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">No Notifications Found</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs mx-auto">
                {searchQuery ? 'Try clearing your search or changing filters.' : 'You are all caught up! New safety alerts will appear here.'}
              </p>
              
              <button
                type="button"
                onClick={() => triggerDemoNotification('emergency_sos_sent')}
                className="mt-4 inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800 hover:scale-105 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                Trigger Test SOS Alert
              </button>
            </div>
          ) : (
            (Object.keys(groupedNotifications) as GroupedTimePeriod[]).map((period) => {
              const list = groupedNotifications[period];
              if (list.length === 0) return null;

              return (
                <div key={period} className="space-y-2">
                  <div className="sticky top-0 z-10 py-1 bg-slate-50/90 dark:bg-slate-900/90 backdrop-blur-xs px-2 rounded-lg text-[11px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 border border-slate-200/40 dark:border-slate-800/40 flex items-center justify-between">
                    <span>{period}</span>
                    <span className="text-[10px] font-bold text-slate-400">{list.length}</span>
                  </div>

                  <div className="space-y-2">
                    {list.map((notif) => (
                      <NotificationItem
                        key={notif.id}
                        notification={notif}
                        onCloseDropdown={onClose}
                      />
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Link */}
        <div className="p-3 bg-white/80 dark:bg-slate-900/80 border-t border-slate-200/60 dark:border-slate-800/60 text-center">
          <Link
            to="/notifications"
            onClick={onClose}
            className="inline-flex items-center text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
          >
            <span>View All Notifications Page</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
};
