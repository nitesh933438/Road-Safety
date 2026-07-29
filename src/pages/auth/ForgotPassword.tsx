import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Mail, ArrowLeft, CheckCircle2, KeyRound } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { getAuthErrorMessage } from '../../utils/authErrorUtils';
import { APP_LOGO_DATA_URI } from '../../assets/logoDataUri';

export const ForgotPasswordPage: React.FC = () => {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      toast.error('Please enter your email address.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      toast.error('Please enter a valid email address.');
      return;
    }

    try {
      setLoading(true);
      await resetPassword(trimmedEmail);
      setSubmitted(true);
      toast.success('Password reset email sent successfully!');
    } catch (error: any) {
      const friendlyError = getAuthErrorMessage(error);
      toast.error(friendlyError, { duration: 4000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 dark:bg-slate-950 flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Brand Logo & Name */}
        <div className="flex justify-center">
          <Link to="/" className="group flex flex-col items-center focus:outline-none" aria-label="Go to Home">
            <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-xl bg-slate-900 border-2 border-amber-500/40 p-0.5 group-hover:scale-105 transition-transform">
              <img 
                src={APP_LOGO_DATA_URI} 
                alt="GoldenGuard Logo" 
                className="w-full h-full object-cover rounded-xl" 
              />
            </div>
            <span className="mt-3 font-bold text-2xl tracking-tight gradient-text">
              GoldenGuard
            </span>
          </Link>
        </div>

        <h1 className="mt-4 text-center text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Reset Your Password
        </h1>
        <p className="mt-2 text-center text-sm text-slate-600 dark:text-slate-400">
          Enter your registered email address and we'll send you reset instructions.
        </p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
      >
        <div className="glass backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 py-8 px-6 sm:px-10 shadow-2xl rounded-3xl border border-slate-200/80 dark:border-slate-800/80">
          {!submitted ? (
            <form className="space-y-5" onSubmit={handleResetPassword} noValidate>
              <div>
                <label 
                  htmlFor="reset-email" 
                  className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5"
                >
                  Account Email Address
                </label>
                <div className="relative rounded-xl shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
                    <Mail className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <input
                    id="reset-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    disabled={loading}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-11 pr-4 py-3 text-sm text-slate-900 dark:text-white bg-slate-50/70 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/80 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-indigo-400 transition-all outline-none disabled:opacity-60"
                    placeholder="name@example.com"
                    aria-required="true"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-lg shadow-indigo-500/20 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 via-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  aria-label="Send password reset email"
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Sending instructions...</span>
                    </div>
                  ) : (
                    <>
                      <span>Send Password Reset Link</span>
                      <KeyRound className="ml-2 h-4 w-4" />
                    </>
                  )}
                </button>
              </div>

              <div className="text-center pt-2">
                <Link
                  to="/login"
                  className="inline-flex items-center text-xs font-semibold text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors focus:outline-none focus:underline"
                >
                  <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
                  Return to Sign In
                </Link>
              </div>
            </form>
          ) : (
            <div className="text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-600 dark:text-emerald-400 shadow-inner">
                <CheckCircle2 className="w-6 h-6" />
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Check Your Inbox
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-xs mx-auto">
                  We've sent password reset instructions to{' '}
                  <strong className="text-slate-900 dark:text-white break-all">{email}</strong>.
                  Please check your inbox or spam folder.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center w-full py-2.5 px-4 rounded-xl text-sm font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 dark:text-indigo-300 dark:bg-indigo-950/50 dark:hover:bg-indigo-900/50 transition-colors focus:outline-none"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Sign In
                </Link>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
