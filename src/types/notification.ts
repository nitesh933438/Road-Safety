/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type TargetRole = 'Everyone' | 'Citizens' | 'Hospitals' | 'Police' | 'Volunteers' | 'Admins';

export type NotificationType =
  // Authentication
  | 'auth_login'
  | 'auth_logout'
  | 'auth_google'
  | 'auth_signup'
  | 'auth_password_reset'
  // Emergency
  | 'emergency_sos_sent'
  | 'emergency_sos_accepted'
  | 'emergency_sos_cancelled'
  | 'emergency_volunteer_accepted'
  | 'emergency_ambulance_assigned'
  | 'emergency_hospital_accepted'
  | 'emergency_police_assigned'
  | 'emergency_completed'
  // Map / Safety
  | 'map_nearby_hospital'
  | 'map_nearby_police'
  | 'map_traffic_alert'
  | 'safety_hazard_nearby'
  | 'safety_blackspot'
  | 'safety_route_updated'
  | 'safety_weather'
  // Training
  | 'training_course_completed'
  | 'training_quiz_passed'
  | 'training_certificate_earned'
  | 'training_cpr_reminder'
  // AI Assistant
  | 'ai_analysis_ready'
  | 'ai_risk_prediction'
  | 'ai_first_aid'
  | 'ai_medical_suggestion'
  // Community
  | 'community_volunteer_joined'
  | 'community_volunteer_nearby'
  | 'community_hazard_verified'
  | 'community_report_approved'
  | 'community_comment'
  | 'community_upvote'
  | 'community_like'
  // Admin
  | 'admin_user_registered'
  | 'admin_accident_report'
  | 'admin_volunteer_request'
  | 'admin_hospital_request'
  | 'admin_hospital_registered'
  | 'admin_critical_incident'
  // System
  | 'system_app_update'
  | 'system_maintenance'
  | 'system_backup_complete'
  | 'system_offline_sync'
  | 'system_reconnected'
  | 'system_internet_connected';

export type NotificationCategory =
  | 'all'
  | 'unread'
  | 'archived'
  | 'auth'
  | 'emergency'
  | 'training'
  | 'ai'
  | 'safety'
  | 'community'
  | 'admin'
  | 'system';

export type NotificationPriority = 'critical' | 'high' | 'medium' | 'low';

export interface AppNotification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  category: NotificationCategory;
  priority: NotificationPriority;
  icon?: string;
  image?: string;
  isRead: boolean;
  isArchived?: boolean;
  createdAt: string; // ISO String
  actionUrl?: string;
  role?: TargetRole;
  metadata?: Record<string, any>;
}

export type GroupedTimePeriod = 'Today' | 'Yesterday' | 'This Week' | 'This Month' | 'Older';

export interface NotificationUserSettings {
  enabled: boolean;
  sound: boolean;
  vibration: boolean;
  browserPush: boolean;
  emailNotifications: boolean;
  categories: {
    emergencyOnly: boolean;
    communityOnly: boolean;
    trainingOnly: boolean;
    aiAlerts: boolean;
    safetyAlerts: boolean;
    systemAlerts: boolean;
  };
}

