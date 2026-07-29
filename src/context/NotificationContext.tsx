/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { 
  AppNotification, 
  NotificationCategory, 
  NotificationPriority, 
  NotificationType,
  GroupedTimePeriod,
  TargetRole,
  NotificationUserSettings
} from '../types/notification';
import { 
  subscribeUserNotifications, 
  createNotification, 
  broadcastNotification,
  markAsReadInDoc, 
  markUnreadInDoc,
  toggleArchiveInDoc,
  markAllAsReadInDocs, 
  deleteNotificationInDoc, 
  clearAllNotificationsInDocs,
  generateSampleNotifications,
  getCategoryFromType,
  getDefaultPriority
} from '../services/notificationService';
import toast from 'react-hot-toast';

const DEFAULT_SETTINGS: NotificationUserSettings = {
  enabled: true,
  sound: true,
  vibration: true,
  browserPush: false,
  emailNotifications: true,
  categories: {
    emergencyOnly: false,
    communityOnly: false,
    trainingOnly: false,
    aiAlerts: true,
    safetyAlerts: true,
    systemAlerts: true
  }
};

interface NotificationContextType {
  notifications: AppNotification[];
  filteredNotifications: AppNotification[];
  groupedNotifications: Record<GroupedTimePeriod, AppNotification[]>;
  unreadCount: number;
  criticalUnreadCount: number;
  loading: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: NotificationCategory;
  setSelectedCategory: (cat: NotificationCategory) => void;
  selectedPriority: NotificationPriority | 'all';
  setSelectedPriority: (prio: NotificationPriority | 'all') => void;
  hasNewArrival: boolean;
  setHasNewArrival: (val: boolean) => void;
  soundEnabled: boolean;
  toggleSound: () => void;
  
  // Settings & Push
  settings: NotificationUserSettings;
  updateUserSettings: (newSettings: Partial<NotificationUserSettings>) => void;
  requestPushPermission: () => Promise<boolean>;

  // Notification Operations
  markAsRead: (id: string) => void;
  markUnread: (id: string) => void;
  toggleArchive: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
  clearAll: () => void;
  sendNotification: (
    title: string, 
    message: string, 
    type: NotificationType, 
    actionUrl?: string, 
    priority?: NotificationPriority,
    metadata?: Record<string, any>
  ) => Promise<void>;
  broadcastAdminNotification: (
    targetRole: TargetRole,
    title: string,
    message: string,
    type?: NotificationType,
    priority?: NotificationPriority,
    actionUrl?: string
  ) => Promise<void>;
  triggerDemoNotification: (type: NotificationType) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// Web Audio API chime generator for non-blocking notification alerts
function playNotificationChime(priority: NotificationPriority = 'medium') {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = priority === 'critical' ? 'sawtooth' : 'sine';
    const freq = priority === 'critical' ? 880 : priority === 'high' ? 660 : 523.25;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.4);

    // Vibration pattern if supported
    if ('vibrate' in navigator) {
      navigator.vibrate(priority === 'critical' ? [200, 100, 200] : [100]);
    }
  } catch (err) {
    // Silent catch if audio context blocked before user gesture
  }
}

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth();
  const userId = currentUser?.uid || 'guest_user';

  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<NotificationCategory>('all');
  const [selectedPriority, setSelectedPriority] = useState<NotificationPriority | 'all'>('all');
  const [hasNewArrival, setHasNewArrival] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [previousCount, setPreviousCount] = useState<number>(0);

  // Persistent User Notification Settings
  const [settings, setSettings] = useState<NotificationUserSettings>(() => {
    try {
      const saved = localStorage.getItem('goldenguard_notification_settings');
      return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  const updateUserSettings = useCallback((newSettings: Partial<NotificationUserSettings>) => {
    setSettings(prev => {
      const updated = {
        ...prev,
        ...newSettings,
        categories: {
          ...prev.categories,
          ...(newSettings.categories || {})
        }
      };
      localStorage.setItem('goldenguard_notification_settings', JSON.stringify(updated));
      return updated;
    });
    toast.success('Notification settings saved');
  }, []);

  const requestPushPermission = useCallback(async () => {
    if (!('Notification' in window)) {
      toast.error('Browser push notifications not supported in this browser.');
      return false;
    }
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      updateUserSettings({ browserPush: true });
      toast.success('Push notification permission granted!');
      return true;
    } else {
      updateUserSettings({ browserPush: false });
      toast.error('Push notification permission denied.');
      return false;
    }
  }, [updateUserSettings]);

  // Load from Firestore or local fallback
  useEffect(() => {
    setLoading(true);
    const unsubscribe = subscribeUserNotifications(userId, (data) => {
      setNotifications(data);
      setLoading(false);

      const unread = data.filter(n => !n.isRead).length;
      if (previousCount > 0 && unread > previousCount) {
        setHasNewArrival(true);
        if (settings.enabled && settings.sound) {
          const newest = data[0];
          playNotificationChime(newest?.priority || 'medium');
        }
      }
      setPreviousCount(unread);
    });

    return () => unsubscribe();
  }, [userId, settings.enabled, settings.sound]);

  // Handle Online/Offline Status for Sync
  useEffect(() => {
    const handleOnline = () => {
      toast.success('Internet reconnected. Syncing notifications...', { icon: '📶' });
    };
    const handleOffline = () => {
      toast('Operating offline. Changes will queue locally.', { icon: '📡' });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const toggleSound = () => {
    const newSound = !settings.sound;
    updateUserSettings({ sound: newSound });
    setSoundEnabled(newSound);
  };

  // Filtered Notifications
  const filteredNotifications = useMemo(() => {
    return notifications.filter((notif) => {
      // Category Settings Filter (User preferences)
      if (settings.categories.emergencyOnly && notif.category !== 'emergency') return false;

      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = notif.title.toLowerCase().includes(query);
        const matchesMsg = notif.message.toLowerCase().includes(query);
        const matchesType = notif.type.toLowerCase().includes(query);
        if (!matchesTitle && !matchesMsg && !matchesType) return false;
      }

      // Category filter
      if (selectedCategory === 'unread') {
        if (notif.isRead || notif.isArchived) return false;
      } else if (selectedCategory === 'archived') {
        if (!notif.isArchived) return false;
      } else if (selectedCategory !== 'all') {
        if (notif.category !== selectedCategory || notif.isArchived) return false;
      } else {
        // 'all' category hides archived by default unless viewed under 'archived'
        if (notif.isArchived) return false;
      }

      // Priority filter
      if (selectedPriority !== 'all') {
        if (notif.priority !== selectedPriority) return false;
      }

      return true;
    });
  }, [notifications, searchQuery, selectedCategory, selectedPriority, settings]);

  // Grouped by time period
  const groupedNotifications = useMemo(() => {
    const grouped: Record<GroupedTimePeriod, AppNotification[]> = {
      Today: [],
      Yesterday: [],
      'This Week': [],
      'This Month': [],
      Older: []
    };

    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const yesterdayStart = todayStart - 86400000;
    const weekStart = todayStart - 6 * 86400000;
    const monthStart = todayStart - 29 * 86400000;

    filteredNotifications.forEach((notif) => {
      const notifTime = new Date(notif.createdAt).getTime();

      if (notifTime >= todayStart) {
        grouped.Today.push(notif);
      } else if (notifTime >= yesterdayStart) {
        grouped.Yesterday.push(notif);
      } else if (notifTime >= weekStart) {
        grouped['This Week'].push(notif);
      } else if (notifTime >= monthStart) {
        grouped['This Month'].push(notif);
      } else {
        grouped.Older.push(notif);
      }
    });

    return grouped;
  }, [filteredNotifications]);

  const unreadCount = useMemo(() => {
    return notifications.filter(n => !n.isRead && !n.isArchived).length;
  }, [notifications]);

  const criticalUnreadCount = useMemo(() => {
    return notifications.filter(n => !n.isRead && !n.isArchived && n.priority === 'critical').length;
  }, [notifications]);

  // Actions
  const markAsRead = useCallback((id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
    markAsReadInDoc(id);
  }, []);

  const markUnread = useCallback((id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: false } : n));
    markUnreadInDoc(id);
    toast.success('Marked as unread');
  }, []);

  const toggleArchive = useCallback((id: string) => {
    setNotifications(prev => prev.map(n => {
      if (n.id === id) {
        const nextArchived = !n.isArchived;
        toggleArchiveInDoc(id, nextArchived);
        toast.success(nextArchived ? 'Notification archived' : 'Unarchived notification');
        return { ...n, isArchived: nextArchived };
      }
      return n;
    }));
  }, []);

  const markAllAsRead = useCallback(() => {
    const unreadIds = notifications.filter(n => !n.isRead).map(n => n.id);
    if (unreadIds.length === 0) return;

    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    markAllAsReadInDocs(userId, unreadIds);
    toast.success('All notifications marked as read');
  }, [notifications, userId]);

  const deleteNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    deleteNotificationInDoc(id);
    toast.success('Notification removed');
  }, []);

  const clearAll = useCallback(() => {
    const allIds = notifications.map(n => n.id);
    setNotifications([]);
    clearAllNotificationsInDocs(userId, allIds);
    toast.success('Cleared all notifications');
  }, [notifications, userId]);

  const sendNotification = useCallback(async (
    title: string, 
    message: string, 
    type: NotificationType, 
    actionUrl?: string, 
    priority?: NotificationPriority,
    metadata?: Record<string, any>
  ) => {
    const newNotif = await createNotification(userId, {
      title,
      message,
      type,
      actionUrl,
      priority,
      metadata
    });

    setNotifications(prev => [newNotif, ...prev]);
    setHasNewArrival(true);
    if (settings.enabled && settings.sound) {
      playNotificationChime(newNotif.priority);
    }
  }, [userId, settings.enabled, settings.sound]);

  const broadcastAdminNotification = useCallback(async (
    targetRole: TargetRole,
    title: string,
    message: string,
    type: NotificationType = 'system_app_update',
    priority: NotificationPriority = 'high',
    actionUrl: string = '/notifications'
  ) => {
    const bNotif = await broadcastNotification(targetRole, title, message, type, priority, actionUrl);
    setNotifications(prev => [bNotif, ...prev]);
    setHasNewArrival(true);
    toast.success(`Broadcast sent to [${targetRole}]`, { icon: '📢' });
  }, []);

  const triggerDemoNotification = useCallback((type: NotificationType) => {
    const category = getCategoryFromType(type);
    const priority = getDefaultPriority(type);

    const typeTitles: Record<string, { title: string; msg: string; icon: string }> = {
      // Auth
      auth_login: { title: 'New Device Login Detected', msg: 'Successful login from Chrome on Windows 11.', icon: 'ShieldCheck' },
      auth_logout: { title: 'User Signed Out', msg: 'Your session was safely terminated across connected devices.', icon: 'ShieldAlert' },
      auth_google: { title: 'Google Identity Verified', msg: 'Connected with GoldenGuard workspace credentials.', icon: 'ShieldCheck' },
      auth_signup: { title: 'Welcome to GoldenGuard!', msg: 'Your account is ready. Explore AI Emergency features.', icon: 'Sparkles' },
      auth_password_reset: { title: 'Password Reset Requested', msg: 'Security link sent to your registered email.', icon: 'Lock' },
      
      // Emergency
      emergency_sos_sent: { title: '🚨 SOS Emergency Alert Active', msg: 'Live beacon sent to nearest 5 Good Samaritans & ER Dispatch.', icon: 'ShieldAlert' },
      emergency_sos_accepted: { title: 'Responder Accepted SOS', msg: 'Ambulance #108 confirmed route to incident site.', icon: 'Truck' },
      emergency_sos_cancelled: { title: 'SOS Emergency Standby', msg: 'Emergency alert was safely cancelled by the user.', icon: 'Shield' },
      emergency_volunteer_accepted: { title: 'Volunteer Dispatched', msg: 'Dr. Priya Singh is on route (ETA 3 mins).', icon: 'Heart' },
      emergency_ambulance_assigned: { title: 'Ambulance #402 En Route', msg: 'GPS Live Tracking active. ETA to crash site: 6 mins.', icon: 'Truck' },
      emergency_hospital_accepted: { title: 'ICU Bed Reserved', msg: 'Metro Life Trauma Center ready for patient reception.', icon: 'Building2' },
      emergency_police_assigned: { title: 'Traffic Police Dispatched', msg: 'Unit #102 dispatched for traffic diversion at Outer Ring Rd.', icon: 'Radio' },
      emergency_completed: { title: 'Emergency Resolved Safely', msg: 'Patient safely admitted and incident report generated.', icon: 'CheckCircle2' },

      // Training
      training_course_completed: { title: 'Course Completed: CPR Basics', msg: 'You passed CPR & Airway Stabilization Module.', icon: 'BookOpen' },
      training_quiz_passed: { title: 'Quiz Score: 100%', msg: 'Perfect score on Hemorrhage Control Assessment!', icon: 'CheckCircle2' },
      training_certificate_earned: { title: '🏆 Certificate Issued', msg: 'Certified First Responder status active until 2028.', icon: 'Award' },
      training_cpr_reminder: { title: 'Annual CPR Skills Refresher', msg: 'Your Good Samaritan certification renews in 30 days.', icon: 'Award' },

      // AI
      ai_analysis_ready: { title: 'AI Risk Telemetry Report Ready', msg: 'AI detected 15% reduction in braking latency over last 50km.', icon: 'Brain' },
      ai_first_aid: { title: 'AI First Aid Recommendation', msg: 'Immediate action: Keep airway clear and maintain head tilt.', icon: 'Bot' },
      ai_risk_prediction: { title: 'AI High Collision Probability', msg: 'Predictive model flagged dense fog & blackspot on Yamuna Highway.', icon: 'Brain' },

      // Safety
      safety_hazard_nearby: { title: '⚠️ Road Hazard Warning', msg: 'Deep pothole reported 300m ahead on express lane.', icon: 'AlertTriangle' },
      safety_blackspot: { title: '🚨 Critical Black Spot Ahead', msg: 'High fatality intersection. Reduce speed to 35 km/h.', icon: 'ShieldAlert' },
      safety_route_updated: { title: 'AI Safest Route Updated', msg: 'Detoured around waterlogged underpass. Saved 12 mins.', icon: 'Navigation' },
      safety_weather: { title: 'Heavy Rain & Fog Advisory', msg: 'Low visibility alert for NH-48. Engage hazard lights.', icon: 'CloudRain' },

      // Community
      community_volunteer_joined: { title: 'New Samaritan Joined Squad', msg: '5 new certified first-aiders registered in your sector.', icon: 'Users' },
      community_volunteer_nearby: { title: 'New Samaritan Nearby', msg: '3 CPR-certified volunteers now active in your area.', icon: 'Users' },
      community_hazard_verified: { title: 'Hazard Post Upvoted', msg: '12 drivers confirmed road debris near Ring Road flyover.', icon: 'ThumbsUp' },
      community_report_approved: { title: 'Report Approved by Police', msg: 'Road Repair Authority notified of damaged barrier.', icon: 'CheckCircle' },
      community_comment: { title: 'New Comment on your Report', msg: 'User Vikram: "Thanks for warning, maintenance team arrived."', icon: 'MessageSquare' },
      community_upvote: { title: 'Upvote Received', msg: 'Your Samaritan tip received +5 community trust points.', icon: 'Heart' },

      // Admin
      admin_user_registered: { title: 'New Citizen Registered', msg: 'User Account #9482 verified and synced.', icon: 'UserPlus' },
      admin_accident_report: { title: 'New Accident Report #AR-811', msg: 'Critical crash incident submitted with 3 scene photos.', icon: 'FileText' },
      admin_volunteer_request: { title: 'Volunteer Verification Pending', msg: 'Dr. Amit Kumar uploaded medical license for review.', icon: 'Shield' },
      admin_hospital_request: { title: 'New Hospital Onboarding', msg: 'Apollo Heart Institute requested GoldenGuard API access.', icon: 'Building2' },
      admin_critical_incident: { title: '🚨 ADMIN ALERT: Multi-Vehicle Collision', msg: 'Mass casualty protocol triggered on Yamuna Expressway.', icon: 'Radio' },

      // System
      system_app_update: { title: 'GoldenGuard App Updated', msg: 'Version 2.5 active with instant AI Audio Dispatch.', icon: 'Sparkles' },
      system_maintenance: { title: 'System Maintenance Scheduled', msg: 'Brief 5-min database index optimization tonight at 02:00 IST.', icon: 'Info' },
      system_offline_sync: { title: 'Offline Data Synced', msg: 'Saved telemetry logs successfully uploaded to cloud.', icon: 'Wifi' },
      system_reconnected: { title: 'Internet Connection Restored', msg: 'Real-time GoldenGuard satellite feeds reconnected.', icon: 'Wifi' }
    };

    const details = typeTitles[type] || {
      title: 'New System Alert',
      msg: `Update received for category ${category}.`,
      icon: 'Bell'
    };

    sendNotification(
      details.title,
      details.msg,
      type,
      category === 'emergency' ? '/sos' : category === 'training' ? '/training' : category === 'safety' ? '/hazards' : '/dashboard',
      priority,
      { demoTriggered: true }
    );

    toast.success(`Generated test alert: ${details.title}`);
  }, [sendNotification]);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        filteredNotifications,
        groupedNotifications,
        unreadCount,
        criticalUnreadCount,
        loading,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedPriority,
        setSelectedPriority,
        hasNewArrival,
        setHasNewArrival,
        soundEnabled: settings.sound,
        toggleSound,
        settings,
        updateUserSettings,
        requestPushPermission,
        markAsRead,
        markUnread,
        toggleArchive,
        markAllAsRead,
        deleteNotification,
        clearAll,
        sendNotification,
        broadcastAdminNotification,
        triggerDemoNotification
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

