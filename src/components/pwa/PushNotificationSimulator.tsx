import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { Bell, AlertTriangle } from 'lucide-react';

export const PushNotificationSimulator: React.FC = () => {
  useEffect(() => {
    // Simulate incoming push notifications randomly
    const intervals: NodeJS.Timeout[] = [];

    // Training Reminder
    intervals.push(
      setTimeout(() => {
        toast.custom(
          (t) => (
            <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-white dark:bg-slate-800 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
              <div className="flex-1 w-0 p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 pt-0.5">
                    <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <Bell className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">Training Reminder</p>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Your First Aid CPR module is incomplete. Finish it today!</p>
                  </div>
                </div>
              </div>
              <div className="flex border-l border-slate-200 dark:border-slate-700">
                <button onClick={() => toast.dismiss(t.id)} className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  Close
                </button>
              </div>
            </div>
          ),
          { duration: 5000, position: 'top-center' }
        );
      }, 15000)
    ); // 15s after load

    // Emergency Alert
    intervals.push(
      setTimeout(() => {
        toast.custom(
          (t) => (
            <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-rose-50 dark:bg-rose-900/20 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-rose-500 ring-opacity-50`}>
              <div className="flex-1 w-0 p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 pt-0.5">
                    <div className="h-10 w-10 rounded-full bg-rose-100 dark:bg-rose-900/50 flex items-center justify-center">
                      <AlertTriangle className="h-5 w-5 text-rose-600 dark:text-rose-400" />
                    </div>
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-bold text-rose-800 dark:text-rose-200">Emergency Alert</p>
                    <p className="mt-1 text-sm text-rose-600 dark:text-rose-300">Heavy rain warning on NH-44. Expect severe waterlogging. Drive safe.</p>
                  </div>
                </div>
              </div>
              <div className="flex border-l border-rose-200 dark:border-rose-800/50">
                <button onClick={() => toast.dismiss(t.id)} className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-rose-700 dark:text-rose-300 hover:text-rose-600 focus:outline-none">
                  Dismiss
                </button>
              </div>
            </div>
          ),
          { duration: 8000, position: 'top-center' }
        );
      }, 35000)
    ); // 35s after load

    return () => {
      intervals.forEach(clearTimeout);
    };
  }, []);

  return null;
};
