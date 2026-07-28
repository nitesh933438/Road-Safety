import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ShieldCheck, LogIn, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';

export const VolunteerRegistration: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden border border-slate-200 dark:border-slate-700 text-center"
      >
        <div className="bg-emerald-600 p-8 text-white">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
            <Heart className="w-10 h-10 text-white fill-current" />
          </div>
          <h2 className="text-3xl font-bold mb-2">Join the Rescue Network</h2>
          <p className="text-emerald-100 max-w-md mx-auto">
            Become a certified Good Samaritan. Get notified of nearby emergencies and help save lives during the Golden Hour.
          </p>
        </div>

        <div className="p-8 space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mb-3">
                <span className="font-bold text-lg">1</span>
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Sign Up</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Create your free account</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mb-3">
                <span className="font-bold text-lg">2</span>
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Train</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Complete basic modules</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mb-3">
                <span className="font-bold text-lg">3</span>
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Save Lives</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Respond to SOS alerts</p>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-100 dark:border-slate-700 flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/signup"
              className="flex items-center justify-center space-x-2 px-8 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-all shadow-md active:scale-95"
            >
              <UserPlus className="w-5 h-5" />
              <span>Create Account</span>
            </Link>
            <Link 
              to="/login"
              className="flex items-center justify-center space-x-2 px-8 py-3 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold border border-slate-200 dark:border-slate-600 transition-all active:scale-95"
            >
              <LogIn className="w-5 h-5" />
              <span>Log In</span>
            </Link>
          </div>
          <p className="text-xs text-slate-400 mt-4">
            By joining, you agree to our Good Samaritan terms and conditions. Legal protection applies as per Supreme Court guidelines.
          </p>
        </div>
      </motion.div>
    </div>
  );
};
