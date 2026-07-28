/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Wifi,
  WifiOff,
  RotateCw,
  CheckCircle2,
  AlertCircle,
  Clock,
  Trash2,
  Database,
  CloudUpload,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  HardDrive
} from 'lucide-react';
import {
  getOfflineReports,
  getPendingSyncCount,
  syncPendingReports,
  removeOfflineReport,
  clearSyncedOfflineReports,
  OfflineEmergencyReport
} from '../../services/offlineSyncService';

interface OfflineSyncQueueWidgetProps {
  className?: string;
  onSyncComplete?: () => void;
}

export const OfflineSyncQueueWidget: React.FC<OfflineSyncQueueWidgetProps> = ({
  className = '',
  onSyncComplete,
}) => {
  const [reports, setReports] = useState<OfflineEmergencyReport[]>([]);
  const [isOnline, setIsOnline] = useState<boolean>(typeof navigator !== 'undefined' ? navigator.onLine : true);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [expandedReportId, setExpandedReportId] = useState<string | null>(null);
  const [syncStatusMsg, setSyncStatusMsg] = useState<string | null>(null);

  const refreshReports = () => {
    setReports(getOfflineReports());
  };

  useEffect(() => {
    refreshReports();

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    const handleQueueUpdated = () => refreshReports();

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    window.addEventListener('emergency-sync-queue-updated', handleQueueUpdated);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('emergency-sync-queue-updated', handleQueueUpdated);
    };
  }, []);

  const handleManualSync = async () => {
    if (!isOnline) {
      setSyncStatusMsg('Device is currently offline. Please reconnect to internet to sync.');
      setTimeout(() => setSyncStatusMsg(null), 4000);
      return;
    }

    setIsSyncing(true);
    setSyncStatusMsg('Pushing offline reports to Firestore...');
    try {
      const { syncedCount, failedCount } = await syncPendingReports();
      refreshReports();
      if (syncedCount > 0) {
        setSyncStatusMsg(`Successfully pushed ${syncedCount} report(s) to Firestore!`);
        if (onSyncComplete) onSyncComplete();
      } else if (failedCount > 0) {
        setSyncStatusMsg(`Failed to sync ${failedCount} report(s). Retrying automatically...`);
      } else {
        setSyncStatusMsg('All offline reports are already synced!');
      }
    } catch (err) {
      console.error('Manual sync error:', err);
      setSyncStatusMsg('Error during sync execution.');
    } finally {
      setIsSyncing(false);
      setTimeout(() => setSyncStatusMsg(null), 4000);
    }
  };

  const handleDeleteItem = (id: string) => {
    removeOfflineReport(id);
    refreshReports();
  };

  const handleClearSynced = () => {
    clearSyncedOfflineReports();
    refreshReports();
  };

  const pendingCount = getPendingSyncCount();
  const syncedCount = reports.filter((r) => r.syncStatus === 'synced').length;

  if (reports.length === 0) {
    return (
      <div className={`p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-slate-300 text-xs flex items-center justify-between ${className}`}>
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <p className="font-semibold text-slate-200">Offline Background Sync Queue</p>
            <p className="text-slate-400">All emergency reports synchronized with Firestore cloud.</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {isOnline ? (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Wifi className="w-3 h-3 mr-1" /> Online
            </span>
          ) : (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <WifiOff className="w-3 h-3 mr-1" /> Offline
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`p-5 rounded-2xl bg-slate-900/90 border border-amber-500/30 shadow-2xl backdrop-blur-xl text-white ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <CloudUpload className="w-5 h-5 animate-pulse" />
            </div>
            {pendingCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 text-slate-950 text-[10px] font-black rounded-full flex items-center justify-center border-2 border-slate-900 shadow-lg">
                {pendingCount}
              </span>
            )}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-bold text-sm text-slate-100">Offline Emergency Sync Service</h3>
              {isOnline ? (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  <Wifi className="w-3 h-3 mr-1" /> Online
                </span>
              ) : (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30 animate-pulse">
                  <WifiOff className="w-3 h-3 mr-1" /> Offline Queue
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {pendingCount > 0
                ? `${pendingCount} incident report(s) queued offline. Will push to Firestore automatically.`
                : 'All offline emergency reports synced.'}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2">
          {syncedCount > 0 && (
            <button
              onClick={handleClearSynced}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center space-x-1.5 border border-slate-700/60 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5 text-slate-400" />
              <span>Clear Synced</span>
            </button>
          )}

          <button
            onClick={handleManualSync}
            disabled={isSyncing || !isOnline}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all shadow-lg ${
              isOnline
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black shadow-amber-500/20 active:scale-95'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
            }`}
          >
            <RotateCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Syncing...' : 'Sync Now'}</span>
          </button>
        </div>
      </div>

      {/* Status Alert Message */}
      {syncStatusMsg && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-3 px-3 py-2 rounded-xl bg-slate-800/80 border border-amber-500/20 text-xs text-amber-300 flex items-center space-x-2"
        >
          <AlertCircle className="w-4 h-4 flex-shrink-0 text-amber-400" />
          <span>{syncStatusMsg}</span>
        </motion.div>
      )}

      {/* Queue Items List */}
      <div className="mt-4 space-y-2.5 max-h-64 overflow-y-auto pr-1 custom-scrollbar">
        {reports.map((item) => {
          const isExpanded = expandedReportId === item.id;
          return (
            <div
              key={item.id}
              className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 transition-all text-xs"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <span
                    className={`px-2 py-0.5 rounded-md font-extrabold text-[10px] ${
                      item.severity === 'Critical'
                        ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                        : item.severity === 'High'
                        ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                        : item.severity === 'Medium'
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    }`}
                  >
                    {item.severity}
                  </span>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-mono font-bold text-slate-200">{item.id}</span>
                      <span className="text-[10px] text-slate-500 flex items-center">
                        <Clock className="w-3 h-3 mr-1 inline" />
                        {item.timestamp}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{item.address}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {/* Sync Status Badge */}
                  {item.syncStatus === 'synced' && (
                    <span className="inline-flex items-center px-2 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                      <CheckCircle2 className="w-3 h-3 mr-1" /> Firestore Synced
                    </span>
                  )}
                  {item.syncStatus === 'pending' && (
                    <span className="inline-flex items-center px-2 py-1 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[10px] font-bold animate-pulse">
                      <Clock className="w-3 h-3 mr-1" /> Pending Sync
                    </span>
                  )}
                  {item.syncStatus === 'syncing' && (
                    <span className="inline-flex items-center px-2 py-1 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/30 text-[10px] font-bold">
                      <RotateCw className="w-3 h-3 mr-1 animate-spin" /> Syncing...
                    </span>
                  )}
                  {item.syncStatus === 'failed' && (
                    <span className="inline-flex items-center px-2 py-1 rounded-lg bg-red-500/10 text-red-400 border border-red-500/30 text-[10px] font-bold">
                      <AlertCircle className="w-3 h-3 mr-1" /> Sync Error
                    </span>
                  )}

                  <button
                    onClick={() => setExpandedReportId(isExpanded ? null : item.id)}
                    className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200"
                    title="View offline report JSON"
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="p-1 rounded-lg hover:bg-red-500/20 text-slate-500 hover:text-red-400 transition-colors"
                    title="Remove from offline queue"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Expanded Details */}
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 pt-3 border-t border-slate-800/80 space-y-2 text-[11px] text-slate-300"
                >
                  <p>
                    <strong className="text-slate-400">Description:</strong>{' '}
                    {item.description || 'No description provided'}
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-[10px] bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                    <div>
                      <span className="text-slate-500">Vehicle Type:</span> {item.vehicleType}
                    </div>
                    <div>
                      <span className="text-slate-500">Injured Count:</span> {item.injuredCount}
                    </div>
                    <div>
                      <span className="text-slate-500">Captured At:</span>{' '}
                      {new Date(item.offlineCapturedAt).toLocaleString()}
                    </div>
                    <div>
                      <span className="text-slate-500">Sync Attempts:</span> {item.attempts || 0}
                    </div>
                  </div>
                  {item.syncError && (
                    <p className="text-red-400 text-[10px] bg-red-500/10 p-2 rounded-lg border border-red-500/20">
                      <strong>Last Error:</strong> {item.syncError}
                    </p>
                  )}
                  {item.firestoreDocId && (
                    <p className="text-emerald-400 text-[10px]">
                      <strong>Firestore Document ID:</strong> {item.firestoreDocId}
                    </p>
                  )}
                </motion.div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
