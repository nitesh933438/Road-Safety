import React, { useState, useEffect } from 'react';
import { WifiOff, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const OfflineBanner: React.FC = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setDismissed(false);
    };
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline || dismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        className="fixed top-[64px] left-0 right-0 z-40 bg-amber-500 text-white px-4 py-2 flex items-center justify-between shadow-md"
      >
        <div className="flex items-center space-x-3">
          <WifiOff className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm font-medium">
            You are currently offline. You can still access cached emergency guides, SOS, and recent lessons.
          </p>
        </div>
        <button 
          onClick={() => setDismissed(true)}
          className="p-1 hover:bg-amber-600 rounded-full transition-colors ml-4 flex-shrink-0"
          aria-label="Dismiss offline banner"
        >
          <X className="w-4 h-4" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
};
