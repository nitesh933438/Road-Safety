import React from 'react';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const LoadingScreen: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="text-indigo-600 dark:text-indigo-400 mb-4"
      >
        <Loader2 className="w-10 h-10" />
      </motion.div>
      <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Loading module...</h2>
      <p className="text-slate-500 dark:text-slate-400 text-sm">Please wait while we prepare the content.</p>
    </div>
  );
};
