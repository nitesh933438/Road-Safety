import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
        <div className="flex flex-col items-center space-y-4 p-8 rounded-2xl glass border border-slate-200/50 dark:border-slate-800/50 shadow-xl">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 rounded-full border-4 border-indigo-500/20 animate-ping"></div>
            <div className="w-12 h-12 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin"></div>
          </div>
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 tracking-wide animate-pulse">
            Verifying Session...
          </p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    // Redirect unauthenticated users to Login, keeping memory of previous route
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
