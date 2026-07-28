/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { EmergencyReportData } from '../data/emergencyData';

export interface OfflineEmergencyReport extends EmergencyReportData {
  offlineCapturedAt: number; // Date.now() timestamp
  syncStatus: 'pending' | 'syncing' | 'synced' | 'failed';
  syncError?: string;
  attempts: number;
  lastAttemptAt?: number;
  firestoreDocId?: string;
}

const STORAGE_KEY = 'roadguard_offline_emergency_queue';
const SYNC_EVENT_NAME = 'emergency-sync-queue-updated';
const TOAST_EVENT_NAME = 'emergency-sync-toast';

/**
 * Helper to dispatch custom browser event when queue updates
 */
function notifyQueueUpdated() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(SYNC_EVENT_NAME));
  }
}

/**
 * Helper to dispatch custom toast events
 */
function triggerSyncToast(message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info') {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent(TOAST_EVENT_NAME, {
        detail: { message, type },
      })
    );
  }
}

/**
 * Get all queued offline reports from local storage
 */
export function getOfflineReports(): OfflineEmergencyReport[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to read offline emergency queue:', err);
    return [];
  }
}

/**
 * Save offline reports list to local storage
 */
export function saveOfflineReports(reports: OfflineEmergencyReport[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
    notifyQueueUpdated();
  } catch (err) {
    console.error('Failed to save offline emergency queue:', err);
  }
}

/**
 * Get pending sync count
 */
export function getPendingSyncCount(): number {
  const reports = getOfflineReports();
  return reports.filter((r) => r.syncStatus === 'pending' || r.syncStatus === 'failed').length;
}

/**
 * Add a report to the offline queue
 */
export function enqueueOfflineReport(report: EmergencyReportData): OfflineEmergencyReport {
  const reports = getOfflineReports();
  
  // Check if report already exists in queue
  const existingIndex = reports.findIndex((r) => r.id === report.id);
  
  const offlineItem: OfflineEmergencyReport = {
    ...report,
    offlineCapturedAt: Date.now(),
    syncStatus: 'pending',
    attempts: 0,
  };

  if (existingIndex >= 0) {
    reports[existingIndex] = {
      ...reports[existingIndex],
      ...offlineItem,
      syncStatus: 'pending',
    };
  } else {
    reports.unshift(offlineItem);
  }

  saveOfflineReports(reports);

  // Register background sync with Service Worker if supported
  registerServiceWorkerSync();

  // Try immediate sync if online
  if (navigator.onLine) {
    setTimeout(() => {
      syncPendingReports();
    }, 500);
  }

  return offlineItem;
}

/**
 * Attempt to sync all pending/failed reports to Firestore
 */
export async function syncPendingReports(): Promise<{ syncedCount: number; failedCount: number }> {
  if (!navigator.onLine) {
    console.log('Offline Background Sync: Device is offline, skipping sync attempt.');
    return { syncedCount: 0, failedCount: 0 };
  }

  const reports = getOfflineReports();
  const pendingIndices = reports
    .map((r, index) => ({ report: r, index }))
    .filter(({ report }) => report.syncStatus === 'pending' || report.syncStatus === 'failed');

  if (pendingIndices.length === 0) {
    return { syncedCount: 0, failedCount: 0 };
  }

  let syncedCount = 0;
  let failedCount = 0;

  for (const { report, index } of pendingIndices) {
    // Mark as syncing
    reports[index].syncStatus = 'syncing';
    reports[index].attempts += 1;
    reports[index].lastAttemptAt = Date.now();
    saveOfflineReports(reports);

    try {
      // Clean object for Firestore payload
      const firestorePayload = {
        id: report.id,
        timestamp: report.timestamp,
        lat: report.lat,
        lng: report.lng,
        address: report.address,
        photoUrls: report.photoUrls || [],
        videoUrls: report.videoUrls || [],
        description: report.description,
        vehicleType: report.vehicleType,
        severity: report.severity,
        injuredCount: report.injuredCount,
        aiSeverityPrediction: report.aiSeverityPrediction || null,
        status: report.status || 'Submitted',
        createdAt: serverTimestamp(),
        offlineCapturedAt: report.offlineCapturedAt,
        syncedFromOffline: true,
        syncedAt: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, 'emergency_reports'), firestorePayload);

      reports[index].syncStatus = 'synced';
      reports[index].firestoreDocId = docRef.id;
      reports[index].syncError = undefined;
      syncedCount++;

      console.log(`[Offline Background Sync] Successfully synced report ${report.id} -> docId ${docRef.id}`);
    } catch (err: any) {
      console.warn(`[Offline Background Sync] Failed to sync report ${report.id}:`, err?.message || err);
      reports[index].syncStatus = 'failed';
      reports[index].syncError = err?.message || 'Network / Firestore write failure';
      failedCount++;
    }

    saveOfflineReports(reports);
  }

  if (syncedCount > 0) {
    triggerSyncToast(
      `⚡ Network Restored! ${syncedCount} offline emergency incident${syncedCount > 1 ? 's' : ''} pushed to Firestore & 108 Command Center!`,
      'success'
    );
  }

  return { syncedCount, failedCount };
}

/**
 * Remove a specific report from queue
 */
export function removeOfflineReport(id: string): void {
  const reports = getOfflineReports().filter((r) => r.id !== id);
  saveOfflineReports(reports);
}

/**
 * Clear all synced items from local storage queue
 */
export function clearSyncedOfflineReports(): void {
  const reports = getOfflineReports().filter((r) => r.syncStatus !== 'synced');
  saveOfflineReports(reports);
}

/**
 * Register ServiceWorker Background Sync event if browser supports background sync API
 */
export function registerServiceWorkerSync(): void {
  if (typeof window === 'undefined') return;

  if ('serviceWorker' in navigator && 'SyncManager' in window) {
    navigator.serviceWorker.ready
      .then((registration: any) => {
        return registration.sync.register('sync-emergency-reports');
      })
      .then(() => {
        console.log('[Background Sync] Successfully registered SW sync tag: sync-emergency-reports');
      })
      .catch((err) => {
        console.log('[Background Sync] SW Sync registration notice (fallback to window online listener):', err?.message || err);
      });
  }
}

/**
 * Initialize background sync service event listeners.
 * Call this in main app entry point or Emergency page mount.
 */
let isInitialized = false;
export function initOfflineSyncService(onQueueChange?: () => void): () => void {
  if (typeof window === 'undefined') return () => {};

  const handleOnline = () => {
    console.log('[Background Sync] Network online detected. Triggering offline queue sync...');
    syncPendingReports();
  };

  const handleQueueChange = () => {
    if (onQueueChange) onQueueChange();
  };

  window.addEventListener('online', handleOnline);
  window.addEventListener(SYNC_EVENT_NAME, handleQueueChange);

  // Periodic safety check every 15 seconds if online and items exist
  const intervalId = setInterval(() => {
    if (navigator.onLine && getPendingSyncCount() > 0) {
      console.log('[Background Sync] Periodic check found pending items. Syncing...');
      syncPendingReports();
    }
  }, 15000);

  // Initial sync attempt if online on init
  if (navigator.onLine && !isInitialized) {
    isInitialized = true;
    setTimeout(() => {
      if (getPendingSyncCount() > 0) {
        syncPendingReports();
      }
    }, 1000);
  }

  return () => {
    window.removeEventListener('online', handleOnline);
    window.removeEventListener(SYNC_EVENT_NAME, handleQueueChange);
    clearInterval(intervalId);
  };
}
