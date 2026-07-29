/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, 
  Search, 
  Filter, 
  CheckCheck, 
  Trash2, 
  Sparkles, 
  ShieldAlert, 
  Bot, 
  AlertTriangle, 
  Award, 
  Building2, 
  Wifi, 
  Volume2, 
  VolumeX,
  Inbox,
  ArrowUpDown,
  RefreshCw,
  Radio,
  Send,
  Settings,
  Shield,
  Smartphone,
  Mail,
  Vibrate,
  Globe,
  Sliders,
  CheckCircle2,
  Lock,
  Layers,
  Archive
} from 'lucide-react';
import { useNotifications } from '../context/NotificationContext';
import { NotificationItem } from '../components/notifications/NotificationItem';
import { NotificationCategory, NotificationPriority, NotificationType, TargetRole } from '../types/notification';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export const NotificationsPage: React.FC = () => {
  const {
    notifications,
    filteredNotifications,
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
    settings,
    updateUserSettings,
    requestPushPermission,
    broadcastAdminNotification,
    triggerDemoNotification
  } = useNotifications();

  const { currentUser, userProfile } = useAuth();
  const isAdmin = userProfile?.role === 'admin';

  const [activeTab, setActiveTab] = useState<'center' | 'broadcast' | 'settings'>('center');
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [readStatusFilter, setReadStatusFilter] = useState<'all' | 'unread' | 'read' | 'archived'>('all');

  // Broadcast Form State
  const [broadcastRole, setBroadcastRole] = useState<TargetRole>('Everyone');
  const [broadcastTitle, setBroadcastTitle] = useState('');
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [broadcastType, setBroadcastType] = useState<NotificationType>('system_app_update');
  const [broadcastPriority, setBroadcastPriority] = useState<NotificationPriority>('high');
  const [broadcastActionUrl, setBroadcastActionUrl] = useState('/notifications');

  // Stats
  const totalCount = notifications.length;
  const todayCount = useMemo(() => {
    const todayStart = new Date().setHours(0, 0, 0, 0);
    return notifications.filter(n => new Date(n.createdAt).getTime() >= todayStart).length;
  }, [notifications]);

  // Status Filtered List
  const displayedNotifications = useMemo(() => {
    let list = filteredNotifications;
    if (readStatusFilter === 'unread') {
      list = list.filter(n => !n.isRead && !n.isArchived);
    } else if (readStatusFilter === 'read') {
      list = list.filter(n => n.isRead && !n.isArchived);
    } else if (readStatusFilter === 'archived') {
      list = list.filter(n => n.isArchived);
    }
    return list;
  }, [filteredNotifications, readStatusFilter]);

  const paginatedList = useMemo(() => {
    return displayedNotifications.slice(0, itemsPerPage);
  }, [displayedNotifications, itemsPerPage]);

  const categories: { label: string; value: NotificationCategory }[] = [
    { label: 'All', value: 'all' },
    { label: 'Unread', value: 'unread' },
    { label: 'Archived', value: 'archived' },
    { label: 'Emergency', value: 'emergency' },
    { label: 'AI Assistant', value: 'ai' },
    { label: 'Road Safety', value: 'safety' },
    { label: 'Training', value: 'training' },
    { label: 'Community', value: 'community' },
    { label: 'Authentication', value: 'auth' },
    { label: 'Admin', value: 'admin' },
    { label: 'System', value: 'system' }
  ];

  const handleSendBroadcast = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastTitle.trim() || !broadcastMessage.trim()) {
      toast.error('Please fill in title and message');
      return;
    }

    await broadcastAdminNotification(
      broadcastRole,
      broadcastTitle.trim(),
      broadcastMessage.trim(),
      broadcastType,
      broadcastPriority,
      broadcastActionUrl
    );

    setBroadcastTitle('');
    setBroadcastMessage('');
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Header Banner */}
      <div className="glass rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
              <Bell className="w-3.5 h-3.5 mr-1 text-indigo-600 dark:text-indigo-400" />
              <span>Real-Time Enterprise Notification Center</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              GoldenGuard Notifications
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-2xl">
              Live safety alerts, AI triage suggestions, emergency dispatch updates, training achievements, and admin broadcasts.
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <button
              type="button"
              onClick={toggleSound}
              className="px-4 py-2.5 rounded-2xl glass border border-slate-200/80 dark:border-slate-700/80 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all flex items-center shadow-xs"
            >
              {soundEnabled ? (
                <>
                  <Volume2 className="w-4 h-4 mr-2 text-indigo-600 dark:text-indigo-400" />
                  Audio Active
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4 mr-2 text-rose-500" />
                  Audio Muted
                </>
              )}
            </button>

            {unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllAsRead}
                className="px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md hover:scale-105 transition-all flex items-center"
              >
                <CheckCheck className="w-4 h-4 mr-2" />
                Mark All Read
              </button>
            )}
          </div>
        </div>

        {/* Tab Navigation Controls */}
        <div className="flex items-center space-x-2 mt-8 pt-6 border-t border-slate-200/60 dark:border-slate-800/80">
          <button
            type="button"
            onClick={() => setActiveTab('center')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-extrabold transition-all flex items-center ${
              activeTab === 'center'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-white/60 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Bell className="w-4 h-4 mr-2" />
            Notification Center ({unreadCount})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('broadcast')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-extrabold transition-all flex items-center ${
              activeTab === 'broadcast'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-white/60 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Radio className="w-4 h-4 mr-2" />
            Admin Broadcast
            {isAdmin && <span className="ml-1.5 px-1.5 py-0.5 rounded text-[10px] bg-amber-400 text-slate-900 font-black">ADMIN</span>}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('settings')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-extrabold transition-all flex items-center ${
              activeTab === 'settings'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-white/60 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Settings className="w-4 h-4 mr-2" />
            Preferences
          </button>
        </div>
      </div>

      {/* TAB 1: NOTIFICATION CENTER */}
      {activeTab === 'center' && (
        <div className="space-y-8">
          {/* Demo Notification Tester Toolbar */}
          <div className="glass rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Interactive Test Notification Generator
                </h3>
              </div>
              <span className="text-[11px] font-semibold text-slate-400">Click to emit real-time test notification</span>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => triggerDemoNotification('emergency_sos_sent')}
                className="px-3 py-1.5 rounded-xl text-xs font-bold bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300 border border-rose-200 dark:border-rose-800 hover:scale-105 transition-all flex items-center"
              >
                <ShieldAlert className="w-3.5 h-3.5 mr-1.5 text-rose-600" />
                Trigger SOS Alert
              </button>

              <button
                type="button"
                onClick={() => triggerDemoNotification('ai_first_aid')}
                className="px-3 py-1.5 rounded-xl text-xs font-bold bg-indigo-100 text-indigo-800 dark:bg-indigo-950/80 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 hover:scale-105 transition-all flex items-center"
              >
                <Bot className="w-3.5 h-3.5 mr-1.5 text-indigo-600" />
                AI First Aid Triage
              </button>

              <button
                type="button"
                onClick={() => triggerDemoNotification('safety_blackspot')}
                className="px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-200 dark:border-amber-800 hover:scale-105 transition-all flex items-center"
              >
                <AlertTriangle className="w-3.5 h-3.5 mr-1.5 text-amber-600" />
                Black Spot Alert
              </button>

              <button
                type="button"
                onClick={() => triggerDemoNotification('training_certificate_earned')}
                className="px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 hover:scale-105 transition-all flex items-center"
              >
                <Award className="w-3.5 h-3.5 mr-1.5 text-emerald-600" />
                Certificate Issued
              </button>

              <button
                type="button"
                onClick={() => triggerDemoNotification('admin_hospital_request')}
                className="px-3 py-1.5 rounded-xl text-xs font-bold bg-sky-100 text-sky-800 dark:bg-sky-950/80 dark:text-sky-300 border border-sky-200 dark:border-sky-800 hover:scale-105 transition-all flex items-center"
              >
                <Building2 className="w-3.5 h-3.5 mr-1.5 text-sky-600" />
                Hospital Onboarding
              </button>

              <button
                type="button"
                onClick={() => triggerDemoNotification('system_offline_sync')}
                className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:scale-105 transition-all flex items-center"
              >
                <Wifi className="w-3.5 h-3.5 mr-1.5 text-slate-600" />
                Offline Data Sync
              </button>
            </div>
          </div>

          {/* Main Filter & Content Area */}
          <div className="glass rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 space-y-6">
            {/* Controls Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              {/* Search Box */}
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search notifications by title, message or type..."
                  className="w-full pl-10 pr-4 py-2 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-slate-400"
                />
              </div>

              {/* Secondary Select Controls */}
              <div className="flex flex-wrap items-center gap-3">
                {/* Read status filter */}
                <div className="inline-flex rounded-xl p-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => setReadStatusFilter('all')}
                    className={`px-3 py-1 rounded-lg transition-all ${readStatusFilter === 'all' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-xs' : 'text-slate-500'}`}
                  >
                    All
                  </button>
                  <button
                    type="button"
                    onClick={() => setReadStatusFilter('unread')}
                    className={`px-3 py-1 rounded-lg transition-all ${readStatusFilter === 'unread' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-xs' : 'text-slate-500'}`}
                  >
                    Unread ({unreadCount})
                  </button>
                  <button
                    type="button"
                    onClick={() => setReadStatusFilter('read')}
                    className={`px-3 py-1 rounded-lg transition-all ${readStatusFilter === 'read' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-xs' : 'text-slate-500'}`}
                  >
                    Read
                  </button>
                  <button
                    type="button"
                    onClick={() => setReadStatusFilter('archived')}
                    className={`px-3 py-1 rounded-lg transition-all ${readStatusFilter === 'archived' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-xs' : 'text-slate-500'}`}
                  >
                    Archived
                  </button>
                </div>

                {/* Priority filter */}
                <select
                  value={selectedPriority}
                  onChange={(e) => setSelectedPriority(e.target.value as any)}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 outline-none cursor-pointer"
                >
                  <option value="all">Priority: All</option>
                  <option value="critical">Critical</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>

                {/* Clear All button */}
                {displayedNotifications.length > 0 && (
                  <button
                    type="button"
                    onClick={clearAll}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900 hover:bg-rose-100 transition-colors flex items-center"
                  >
                    <Trash2 className="w-3.5 h-3.5 mr-1.5" />
                    Clear All
                  </button>
                )}
              </div>
            </div>

            {/* Category Tabs */}
            <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pb-2 pt-1 border-b border-slate-200/60 dark:border-slate-800">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    selectedCategory === cat.value
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Notifications List Grouped */}
            <div className="space-y-6">
              {paginatedList.length === 0 ? (
                <div className="py-16 text-center">
                  <div className="w-16 h-16 rounded-3xl bg-slate-100 dark:bg-slate-800/80 flex items-center justify-center mx-auto mb-4 text-slate-400">
                    <Inbox className="w-8 h-8" />
                  </div>
                  <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">No Notifications Match Your Filter</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
                    Try selecting a different category or clearing the search box.
                  </p>
                </div>
              ) : (
                paginatedList.map((notif) => (
                  <NotificationItem key={notif.id} notification={notif} />
                ))
              )}
            </div>

            {/* Load More Pagination */}
            {displayedNotifications.length > itemsPerPage && (
              <div className="text-center pt-4">
                <button
                  type="button"
                  onClick={() => setItemsPerPage(prev => prev + 10)}
                  className="px-6 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-extrabold text-slate-700 dark:text-slate-200 transition-all inline-flex items-center shadow-xs"
                >
                  <RefreshCw className="w-3.5 h-3.5 mr-2" />
                  Load More Notifications ({displayedNotifications.length - itemsPerPage} remaining)
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: ADMIN BROADCAST SYSTEM */}
      {activeTab === 'broadcast' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Column */}
          <div className="lg:col-span-2 glass rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 space-y-6">
            <div className="space-y-1">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
                <Radio className="w-3.5 h-3.5 mr-1" />
                <span>Admin Alert Transmitter</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Broadcast System Announcement</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Dispatch urgent emergency alerts, maintenance announcements, or safety guidelines to targeted user cohorts in real-time.
              </p>
            </div>

            <form onSubmit={handleSendBroadcast} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Target Cohort / Role */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Target Role Group
                  </label>
                  <select
                    value={broadcastRole}
                    onChange={(e) => setBroadcastRole(e.target.value as TargetRole)}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-3 text-xs font-bold text-slate-800 dark:text-slate-200 outline-none"
                  >
                    <option value="Everyone">Everyone (All App Users)</option>
                    <option value="Citizens">Citizens Only</option>
                    <option value="Hospitals">Hospitals & Trauma Centers</option>
                    <option value="Police">Traffic Police Units</option>
                    <option value="Volunteers">Samaritan Volunteers</option>
                    <option value="Admins">Command Center Admins</option>
                  </select>
                </div>

                {/* Priority */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Priority Level
                  </label>
                  <select
                    value={broadcastPriority}
                    onChange={(e) => setBroadcastPriority(e.target.value as NotificationPriority)}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-3 text-xs font-bold text-slate-800 dark:text-slate-200 outline-none"
                  >
                    <option value="critical">🚨 Critical Emergency</option>
                    <option value="high">⚠️ High Priority Alert</option>
                    <option value="medium">ℹ️ Medium Update</option>
                    <option value="low">📢 Low Priority Note</option>
                  </select>
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Alert Heading Title
                </label>
                <input
                  type="text"
                  value={broadcastTitle}
                  onChange={(e) => setBroadcastTitle(e.target.value)}
                  placeholder="e.g. Severe Weather Emergency Alert on NH-48 Expressway"
                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-3 text-xs font-medium text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Full Broadcast Message Body
                </label>
                <textarea
                  rows={4}
                  value={broadcastMessage}
                  onChange={(e) => setBroadcastMessage(e.target.value)}
                  placeholder="Provide precise details, traffic detours, or instructions for citizens and emergency response teams..."
                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-3 text-xs font-medium text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Action URL */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Action Link URL
                </label>
                <input
                  type="text"
                  value={broadcastActionUrl}
                  onChange={(e) => setBroadcastActionUrl(e.target.value)}
                  placeholder="/sos or /map or /command-center"
                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-3 text-xs font-medium text-slate-800 dark:text-slate-200 outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-extrabold shadow-lg hover:scale-[1.01] transition-all flex items-center justify-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>Transmit Broadcast Signal to [{broadcastRole}]</span>
              </button>
            </form>
          </div>

          {/* Info Card Column */}
          <div className="space-y-6">
            <div className="glass rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 space-y-4">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Role Access Verification</h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Logged in account: <strong className="text-indigo-600 dark:text-indigo-400">{currentUser?.email || 'Guest User'}</strong>
              </p>
              <div className={`p-3 rounded-2xl text-xs font-bold border ${isAdmin ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800' : 'bg-amber-50 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border-amber-200 dark:border-amber-800'}`}>
                {isAdmin ? '✅ Verified Provider-Based Admin (Google OAuth)' : 'ℹ️ Demo Mode: Admin privileges simulated for broadcast testing.'}
              </div>
            </div>

            <div className="glass rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-500">Live Broadcast Channels</h4>
              <ul className="space-y-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                <li className="flex items-center justify-between">
                  <span>Citizens Dispatch</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px]">ACTIVE</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Hospital ER Dispatch</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px]">ACTIVE</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Traffic Police Channel</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px]">ACTIVE</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Samaritan Network</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px]">ACTIVE</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: NOTIFICATION SETTINGS */}
      {activeTab === 'settings' && (
        <div className="max-w-3xl mx-auto glass rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 space-y-8">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Notification & Alert Settings</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Customize how GoldenGuard alerts your device across sound, browser push notifications, and category-level preferences.
            </p>
          </div>

          <div className="space-y-6 divide-y divide-slate-200/60 dark:divide-slate-800">
            {/* Master Toggle */}
            <div className="flex items-center justify-between pt-2">
              <div className="space-y-0.5">
                <p className="text-sm font-bold text-slate-900 dark:text-white">Allow All Notifications</p>
                <p className="text-xs text-slate-500">Master switch to enable or pause incoming safety alerts.</p>
              </div>
              <input
                type="checkbox"
                checked={settings.enabled}
                onChange={(e) => updateUserSettings({ enabled: e.target.checked })}
                className="w-5 h-5 accent-indigo-600 cursor-pointer"
              />
            </div>

            {/* Sound Toggle */}
            <div className="flex items-center justify-between pt-4">
              <div className="space-y-0.5">
                <p className="text-sm font-bold text-slate-900 dark:text-white">Audio Chime Alerts</p>
                <p className="text-xs text-slate-500">Play acoustic alert chime on high-priority emergency notifications.</p>
              </div>
              <input
                type="checkbox"
                checked={settings.sound}
                onChange={(e) => updateUserSettings({ sound: e.target.checked })}
                className="w-5 h-5 accent-indigo-600 cursor-pointer"
              />
            </div>

            {/* Vibration Toggle */}
            <div className="flex items-center justify-between pt-4">
              <div className="space-y-0.5">
                <p className="text-sm font-bold text-slate-900 dark:text-white">Haptic Vibration Signals</p>
                <p className="text-xs text-slate-500">Trigger haptic vibration patterns on supported mobile devices.</p>
              </div>
              <input
                type="checkbox"
                checked={settings.vibration}
                onChange={(e) => updateUserSettings({ vibration: e.target.checked })}
                className="w-5 h-5 accent-indigo-600 cursor-pointer"
              />
            </div>

            {/* Browser Push Permission */}
            <div className="flex items-center justify-between pt-4">
              <div className="space-y-0.5">
                <p className="text-sm font-bold text-slate-900 dark:text-white">PWA Browser Push Notifications</p>
                <p className="text-xs text-slate-500">Receive desktop and lock screen notifications even when the app tab is minimized.</p>
              </div>
              <button
                type="button"
                onClick={requestPushPermission}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  settings.browserPush 
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' 
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
              >
                {settings.browserPush ? 'Push Active ✅' : 'Enable Push'}
              </button>
            </div>

            {/* Emergency Only Filter */}
            <div className="flex items-center justify-between pt-4">
              <div className="space-y-0.5">
                <p className="text-sm font-bold text-slate-900 dark:text-white">Emergency Only Focus Mode</p>
                <p className="text-xs text-slate-500">Silence all non-emergency community updates and training tips.</p>
              </div>
              <input
                type="checkbox"
                checked={settings.categories.emergencyOnly}
                onChange={(e) => updateUserSettings({ categories: { ...settings.categories, emergencyOnly: e.target.checked } })}
                className="w-5 h-5 accent-indigo-600 cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

