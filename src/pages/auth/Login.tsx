import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { isGoogleAIStudioPreview, determineUserRole } from '../../lib/firebase';
import { Mail, Lock, LogIn, Eye, EyeOff, AlertTriangle, ShieldCheck } from 'lucide-react';
import { GoogleIcon } from '../../components/common/GoogleIcon';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { getAuthErrorMessage } from '../../utils/authErrorUtils';
import { APP_LOGO_DATA_URI } from '../../assets/logoDataUri';

export const LoginPage: React.FC = () => {
  const { currentUser, userProfile, login, loginWithGoogle } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  const fromLocation = location.state?.from?.pathname;
  const isPreviewEnv = isGoogleAIStudioPreview();

  const determineRedirectPath = (user: any, firestoreRole?: string, activeProvider?: string) => {
    const computedRole = user ? determineUserRole(user, activeProvider, firestoreRole as any) : (firestoreRole || 'citizen');
    if (computedRole === 'admin') {
      return '/admin';
    }
    // If non-admin attempted to visit a protected route before login, redirect back to it unless it's /admin
    if (fromLocation && fromLocation !== '/login' && fromLocation !== '/' && fromLocation !== '/admin') {
      return fromLocation;
    }
    return '/dashboard';
  };

  // Redirect if already authenticated
  useEffect(() => {
    if (currentUser) {
      const dest = determineRedirectPath(currentUser, userProfile?.role);
      navigate(dest, { replace: true });
    }
  }, [currentUser, userProfile, navigate]);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      toast.error('Please enter your email address.');
      return;
    }

    if (!password) {
      toast.error('Please enter your password.');
      return;
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      toast.error('Please enter a valid email address.');
      return;
    }

    try {
      setLoading(true);
      const user = await login(trimmedEmail, password, rememberMe);
      const dest = determineRedirectPath(user, userProfile?.role, 'password');

      toast.success('Signed in successfully!');
      navigate(dest, { replace: true });
    } catch (error: any) {
      const friendlyError = getAuthErrorMessage(error);
      toast.error(friendlyError, { duration: 4000 });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    if (isPreviewEnv) {
      toast.error(
        'Google Sign-In is available only when running locally (npm run dev) or on a deployed domain due to Firebase OAuth restrictions.',
        { duration: 6000, id: 'google-preview-toast' }
      );
      return;
    }

    try {
      setGoogleLoading(true);
      const res = await loginWithGoogle();

      if (res.success && res.user) {
        const dest = determineRedirectPath(res.user, userProfile?.role, 'google.com');

        toast.success(`Welcome back, ${res.user.displayName || res.user.email}!`);
        navigate(dest, { replace: true });
      } else if (res.isPreview) {
        toast.error(
          'Google Sign-In is available only when running locally (npm run dev) or on a deployed domain due to Firebase OAuth restrictions.',
          { duration: 6000 }
        );
      } else if (res.redirecting) {
        toast.loading('Redirecting to Google Sign-In...');
      } else if (res.error) {
        toast.error(res.error);
      }
    } catch (err: any) {
      const friendlyMsg = getAuthErrorMessage(err);
      toast.error(friendlyMsg);
    } finally {
      setGoogleLoading(false);
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
          Welcome Back
        </h1>
        <p className="mt-2 text-center text-sm text-slate-600 dark:text-slate-400">
          Don't have an account?{' '}
          <Link 
            to="/signup" 
            className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 focus:outline-none focus:underline transition-colors"
          >
            Create an account
          </Link>
        </p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
      >
        <div className="glass backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 py-8 px-6 sm:px-10 shadow-2xl rounded-3xl border border-slate-200/80 dark:border-slate-800/80">
          <form className="space-y-5" onSubmit={handleEmailLogin} noValidate>
            
            {/* Email Field */}
            <div>
              <label 
                htmlFor="login-email" 
                className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5"
              >
                Email Address
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
                  <Mail className="h-5 w-5" aria-hidden="true" />
                </div>
                <input
                  id="login-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  disabled={loading || googleLoading}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3 text-sm text-slate-900 dark:text-white bg-slate-50/70 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/80 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-indigo-400 transition-all outline-none disabled:opacity-60"
                  placeholder="name@example.com"
                  aria-required="true"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label 
                  htmlFor="login-password" 
                  className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider"
                >
                  Password
                </label>
                <Link 
                  to="/forgot-password" 
                  className="text-xs font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 focus:outline-none focus:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
                  <Lock className="h-5 w-5" aria-hidden="true" />
                </div>
                <input
                  id="login-password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  disabled={loading || googleLoading}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-11 pr-11 py-3 text-sm text-slate-900 dark:text-white bg-slate-50/70 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/80 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-indigo-400 transition-all outline-none disabled:opacity-60"
                  placeholder="••••••••"
                  aria-required="true"
                />
                <button
                  type="button"
                  disabled={loading || googleLoading}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 focus:outline-none transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 dark:border-slate-700 rounded dark:bg-slate-800 cursor-pointer"
                />
                <label htmlFor="remember-me" className="ml-2.5 block text-sm text-slate-700 dark:text-slate-300 cursor-pointer select-none">
                  Remember me on this device
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading || googleLoading}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-lg shadow-indigo-500/20 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 via-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                aria-label="Sign in with email and password"
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Signing in...</span>
                  </div>
                ) : (
                  <>
                    <span>Sign In</span>
                    <LogIn className="ml-2 h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Social Login Divider */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-slate-800" />
              </div>
              <div className="relative flex justify-center text-xs uppercase tracking-wider font-semibold">
                <span className="px-3 bg-white/90 dark:bg-slate-900/90 text-slate-500 dark:text-slate-400">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Google Sign-In Area */}
            <div className="mt-5 space-y-3">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={loading || googleLoading}
                className="w-full flex justify-center items-center py-3 px-4 border border-slate-300 dark:border-slate-700 rounded-xl shadow-sm bg-white dark:bg-slate-800 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-750 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-all cursor-pointer"
                aria-label="Continue with Google"
              >
                {googleLoading ? (
                  <div className="w-5 h-5 border-2 border-slate-400 border-t-indigo-600 rounded-full animate-spin mr-2" />
                ) : (
                  <GoogleIcon className="h-5 w-5 mr-2.5" />
                )}
                <span>Continue with Google</span>
              </button>

              {/* AI Studio Preview Domain Restriction Notice */}
              {isPreviewEnv && (
                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-300 flex items-start space-x-2.5 text-xs leading-relaxed">
                  <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <p>
                    <strong>Notice:</strong> Google Sign-In is available only when running locally (<code className="bg-amber-200/50 dark:bg-amber-900/50 px-1 py-0.5 rounded font-mono text-[11px]">npm run dev</code>) or on a deployed domain due to Firebase OAuth restrictions.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
