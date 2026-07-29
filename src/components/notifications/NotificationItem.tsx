/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldAlert, 
  Heart, 
  Bot, 
  AlertTriangle, 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  Building2, 
  Brain, 
  Wifi, 
  Navigation, 
  Sparkles, 
  BookOpen, 
  Truck, 
  Radio, 
  CloudRain, 
  Users, 
  ThumbsUp, 
  CheckCircle, 
  MessageSquare, 
  UserPlus, 
  FileText, 
  Shield, 
  Lock, 
  Bell, 
  Trash2, 
  ExternalLink,
  Check,
  Eye,
  Archive,
  RotateCcw
} from 'lucide-react';
import { AppNotification } from '../../types/notification';
import { useNotifications } from '../../context/NotificationContext';
import { motion } from 'framer-motion';

// Icon Renderer Map
const getNotificationIcon = (type: string, priority: string) => {
  if (type.includes('sos') || priority === 'critical') return <ShieldAlert className="w-5 h-5 text-rose-600 dark:text-rose-400" />;
  if (type.includes('volunteer') || type.includes('upvote')) return <Heart className="w-5 h-5 text-rose-500" />;
  if (type.includes('ai_')) return <Bot className="w-5 h-5 text-indigo-500" />;
  if (type.includes('blackspot') || type.includes('hazard')) return <AlertTriangle className="w-5 h-5 text-amber-500" />;
  if (type.includes('auth')) return <ShieldCheck className="w-5 h-5 text-emerald-500" />;
  if (type.includes('certificate') || type.includes('training')) return <Award className="w-5 h-5 text-amber-500" />;
  if (type.includes('hospital') || type.includes('admin_hospital')) return <Building2 className="w-5 h-5 text-sky-500" />;
  if (type.includes('police') || type.includes('radio')) return <Radio className="w-5 h-5 text-blue-500" />;
  if (type.includes('ambulance') || type.includes('truck')) return <Truck className="w-5 h-5 text-red-500" />;
  if (type.includes('route') || type.includes('navigation')) return <Navigation className="w-5 h-5 text-indigo-500" />;
  if (type.includes('weather')) return <CloudRain className="w-5 h-5 text-slate-500" />;
  if (type.includes('user') || type.includes('community')) return <Users className="w-5 h-5 text-indigo-500" />;
  if (type.includes('sync') || type.includes('wifi')) return <Wifi className="w-5 h-5 text-emerald-500" />;
  return <Bell className="w-5 h-5 text-indigo-500" />;
};

// Relative Time Helper
function formatRelativeTime(dateString: string): string {
  try {
    const notifDate = new Date(dateString);
    const now = new Date();
    const diffSecs = Math.floor((now.getTime() - notifDate.getTime()) / 1000);

    if (diffSecs < 60) return 'Just now';
    if (diffSecs < 3600) return `${Math.floor(diffSecs / 60)}m ago`;
    if (diffSecs < 86400) return `${Math.floor(diffSecs / 3600)}h ago`;
    if (diffSecs < 172800) return 'Yesterday';
    return `${Math.floor(diffSecs / 86400)}d ago`;
  } catch (err) {
    return 'Recently';
  }
}

export const NotificationItem: React.FC<{
  notification: AppNotification;
  onCloseDropdown?: () => void;
}> = ({ notification, onCloseDropdown }) => {
  const { markAsRead, markUnread, toggleArchive, deleteNotification } = useNotifications();
  const navigate = useNavigate();

  const handleItemClick = () => {
    if (!notification.isRead) {
      markAsRead(notification.id);
    }
    if (notification.actionUrl) {
      navigate(notification.actionUrl);
      if (onCloseDropdown) onCloseDropdown();
    }
  };

  const priorityBadgeStyles = {
    critical: 'bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300 border-rose-300 dark:border-rose-800 animate-pulse',
    high: 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border-amber-300 dark:border-amber-800',
    medium: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950/80 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800',
    low: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0 }}
      className={`group relative p-3.5 sm:p-4 rounded-2xl border transition-all duration-200 ${
        !notification.isRead 
          ? 'bg-indigo-50/70 dark:bg-slate-800/80 border-indigo-200/80 dark:border-indigo-900/60 shadow-sm' 
          : 'bg-white/60 dark:bg-slate-900/60 border-slate-200/60 dark:border-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-800/40'
      }`}
    >
      <div className="flex items-start space-x-3 sm:space-x-3.5">
        {/* Icon Avatar */}
        <div className={`p-2.5 rounded-xl shrink-0 flex items-center justify-center ${
          notification.priority === 'critical'
            ? 'bg-rose-100 dark:bg-rose-950/80 border border-rose-300 dark:border-rose-800'
            : !notification.isRead
            ? 'bg-indigo-100 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800'
            : 'bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700'
        }`}>
          {getNotificationIcon(notification.type, notification.priority)}
        </div>

        {/* Text Content */}
        <div className="flex-1 min-w-0" onClick={handleItemClick}>
          <div className="flex items-center justify-between gap-2 mb-1">
            <div className="flex items-center space-x-1.5 flex-wrap gap-y-1 min-w-0">
              <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider border ${priorityBadgeStyles[notification.priority]}`}>
                {notification.priority}
              </span>
              {notification.role && notification.role !== 'Everyone' && (
                <span className="px-1.5 py-0.5 rounded-md text-[10px] font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                  {notification.role}
                </span>
              )}
              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider truncate">
                {notification.category}
              </span>
            </div>

            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 shrink-0">
              {formatRelativeTime(notification.createdAt)}
            </span>
          </div>

          <h4 className={`text-sm font-bold leading-snug cursor-pointer transition-colors ${
            !notification.isRead 
              ? 'text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400' 
              : 'text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400'
          }`}>
            {notification.title}
          </h4>

          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 line-clamp-2 leading-relaxed">
            {notification.message}
          </p>

          {notification.image && (
            <div className="mt-2 rounded-xl overflow-hidden max-w-xs border border-slate-200 dark:border-slate-700">
              <img src={notification.image} alt="Notification media" className="w-full h-24 object-cover" />
            </div>
          )}

          {notification.actionUrl && (
            <div className="mt-2 inline-flex items-center text-xs font-semibold text-indigo-600 dark:text-indigo-400 group-hover:underline">
              <span>View details</span>
              <ExternalLink className="w-3 h-3 ml-1" />
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-1 shrink-0 pt-0.5">
          {!notification.isRead ? (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                markAsRead(notification.id);
              }}
              title="Mark as read"
              className="p-1.5 rounded-lg text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-950 transition-colors"
              aria-label="Mark notification as read"
            >
              <Check className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                markUnread(notification.id);
              }}
              title="Mark as unread"
              className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Mark notification as unread"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleArchive(notification.id);
            }}
            title={notification.isArchived ? "Unarchive" : "Archive"}
            className={`p-1.5 rounded-lg transition-colors ${
              notification.isArchived 
                ? 'text-amber-600 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-950/40' 
                : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
            aria-label="Archive notification"
          >
            <Archive className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              deleteNotification(notification.id);
            }}
            title="Delete notification"
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
            aria-label="Delete notification"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

