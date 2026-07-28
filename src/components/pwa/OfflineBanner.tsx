import React, { useState, useEffect } from 'react';
import { WifiOff, X, CloudUpload, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { initOfflineSyncService, getPendingSyncCount } from '../../services/offlineSyncService';
import toast from 'react-hot-toast';

export const OfflineBanner: React.FC = () => {
  const [isOnline, setIsOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);
  const [dismissed, setDismissed] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    // Initialize background sync listener service globally
    const cleanupSyncService = initOfflineSyncService(() => {
      setPendingCount(getPendingSyncCount());
    });

    setPendingCount(getPendingSyncCount());

    const handleOnline = () => {
      setIsOnline(true);
      setDismissed(false);
    };
    const handleOffline = () => setIsOnline(false);

    const handleToastEvent = (e: any) => {
      if (e.detail?.message) {
        if (e.detail.type === 'success') {
          toast.success(e.detail.message, { duration: 5000, icon: '⚡' });
        } else {
          toast(e.detail.message, { duration: 4000 });
        }
      }
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    window.addEventListener('emergency-sync-toast', handleToastEvent);

    return () => {
      cleanupSyncService();
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('emergency-sync-toast', handleToastEvent);
    };
  }, []);

  if (isOnline || dismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        className="fixed top-[64px] left-0 right-0 z-40 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white px-4 py-2 flex items-center justify-between shadow-xl border-b border-amber-400/30"
      >
        <div className="flex items-center space-x-3">
          <WifiOff className="w-5 h-5 flex-shrink-0 text-amber-200 animate-pulse" />
          <p className="text-xs sm:text-sm font-semibold">
            <span>You are currently offline. Emergency reports captured now are stored in background sync queue.</span>
            {pendingCount > 0 && (
              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full bg-white/20 text-white text-[11px] font-black border border-white/30">
                <CloudUpload className="w-3 h-3 mr-1" /> {pendingCount} Pending Sync
              </span>
            )}
          </p>
        </div>
        <button 
          onClick={() => setDismissed(true)}
          className="p-1 hover:bg-amber-700/60 rounded-full transition-colors ml-4 flex-shrink-0"
          aria-label="Dismiss offline banner"
        >
          <X className="w-4 h-4" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
};
