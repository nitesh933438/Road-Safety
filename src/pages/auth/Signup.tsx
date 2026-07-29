import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, UserRole } from '../../context/AuthContext';
import { isGoogleAIStudioPreview } from '../../lib/firebase';
import { Mail, Lock, User, Phone, UserPlus, Eye, EyeOff, Check, AlertTriangle, ShieldCheck, Shield, Heart, Building2, Radio } from 'lucide-react';
import { GoogleIcon } from '../../components/common/GoogleIcon';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { getAuthErrorMessage } from '../../utils/authErrorUtils';
import { APP_LOGO_DATA_URI } from '../../assets/logoDataUri';

export const SignupPage: React.FC = () => {
  const { currentUser, signup, loginWithGoogle } = useAuth();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<UserRole>('citizen');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  
  const navigate = useNavigate();
  const isPreviewEnv = isGoogleAIStudioPreview();

  // Redirect if already authenticated
  useEffect(() => {
    if (currentUser) {
      navigate('/dashboard', { replace: true });
    }
  }, [currentUser, navigate]);

  // Password Strength Calculation Helper
  const calculatePasswordStrength = (pass: string) => {
    let score = 0;
    if (!pass) return { score: 0, label: '', color: 'bg-slate-200 dark:bg-slate-700' };
    
    if (pass.length >= 6) score += 1;
    if (pass.length >= 10) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    if (score <= 1) return { score: 1, label: 'Weak', color: 'bg-rose-500' };
    if (score <= 3) return { score: 2, label: 'Fair', color: 'bg-amber-500' };
    if (score <= 4) return { score: 3, label: 'Good', color: 'bg-blue-500' };
    return { score: 4, label: 'Strong', color: 'bg-emerald-500' };
  };

  const strength = calculatePasswordStrength(password);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();

    if (!trimmedName) {
      toast.error('Please enter your full name.');
      return;
    }

    if (!trimmedEmail) {
      toast.error('Please enter your email address.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      toast.error('Please enter a valid email address.');
      return;
    }

    if (!trimmedPhone) {
      toast.error('Please enter your phone number.');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match. Please check and try again.');
      return;
    }

    if (!agreeTerms) {
      toast.error('You must agree to the Terms & Conditions to sign up.');
      return;
    }

    try {
      setLoading(true);
      await signup(trimmedName, trimmedEmail, trimmedPhone, password, role);
      toast.success('Account created successfully!');
      navigate('/dashboard', { replace: true });
    } catch (error: any) {
      const friendlyError = getAuthErrorMessage(error);
      toast.error(friendlyError, { duration: 4000 });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    if (isPreviewEnv) {
      toast.error(
        'Google Sign-In is available only when running locally (npm run dev) or on a deployed domain due to Firebase OAuth restrictions.',
        { duration: 6000 }
      );
      return;
    }

    try {
      setGoogleLoading(true);
      const res = await loginWithGoogle();

      if (res.success && res.user) {
        toast.success(`Welcome to GoldenGuard, ${res.user.displayName || 'User'}!`);
        navigate('/dashboard', { replace: true });
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
          Create Your Account
        </h1>
        <p className="mt-2 text-center text-sm text-slate-600 dark:text-slate-400">
          Already have an account?{' '}
          <Link 
            to="/login" 
            className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 focus:outline-none focus:underline transition-colors"
          >
            Sign in instead
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
          <form className="space-y-4" onSubmit={handleSignup} noValidate>
            
            {/* Full Name */}
            <div>
              <label 
                htmlFor="signup-name" 
                className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1"
              >
                Full Name
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
                  <User className="h-5 w-5" aria-hidden="true" />
                </div>
                <input
                  id="signup-name"
                  name="name"
                  type="text"
                  required
                  disabled={loading || googleLoading}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full pl-11 pr-4 py-2.5 text-sm text-slate-900 dark:text-white bg-slate-50/70 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/80 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-indigo-400 transition-all outline-none disabled:opacity-60"
                  placeholder="John Doe"
                  aria-required="true"
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label 
                htmlFor="signup-email" 
                className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1"
              >
                Email Address
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
                  <Mail className="h-5 w-5" aria-hidden="true" />
                </div>
                <input
                  id="signup-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  disabled={loading || googleLoading}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-11 pr-4 py-2.5 text-sm text-slate-900 dark:text-white bg-slate-50/70 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/80 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-indigo-400 transition-all outline-none disabled:opacity-60"
                  placeholder="you@example.com"
                  aria-required="true"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label 
                htmlFor="signup-phone" 
                className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1"
              >
                Phone Number
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
                  <Phone className="h-5 w-5" aria-hidden="true" />
                </div>
                <input
                  id="signup-phone"
                  name="phone"
                  type="tel"
                  required
                  disabled={loading || googleLoading}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="block w-full pl-11 pr-4 py-2.5 text-sm text-slate-900 dark:text-white bg-slate-50/70 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/80 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-indigo-400 transition-all outline-none disabled:opacity-60"
                  placeholder="+1 (555) 000-0000"
                  aria-required="true"
                />
              </div>
            </div>

            {/* Account Role Selection */}
            <div>
              <label 
                htmlFor="signup-role" 
                className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1"
              >
                Account Identity & Role
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
                  <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                </div>
                <select
                  id="signup-role"
                  name="role"
                  disabled={loading || googleLoading}
                  value={role}
                  onChange={(e) => setRole(e.target.value as UserRole)}
                  className="block w-full pl-11 pr-8 py-2.5 text-sm text-slate-900 dark:text-white bg-slate-50/70 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/80 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-indigo-400 transition-all outline-none disabled:opacity-60 cursor-pointer appearance-none"
                >
                  <option value="citizen">Citizen / Commuter (Default)</option>
                  <option value="volunteer">Good Samaritan Volunteer</option>
                  <option value="hospital">Hospital / Emergency Medical Staff</option>
                  <option value="police">Traffic Police / First Responder</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
                  ▼
                </div>
              </div>
            </div>

            {/* Password */}
            <div>
              <label 
                htmlFor="signup-password" 
                className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1"
              >
                Password
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
                  <Lock className="h-5 w-5" aria-hidden="true" />
                </div>
                <input
                  id="signup-password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  disabled={loading || googleLoading}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-11 pr-11 py-2.5 text-sm text-slate-900 dark:text-white bg-slate-50/70 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/80 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-indigo-400 transition-all outline-none disabled:opacity-60"
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

              {/* Password Strength Meter */}
              {password.length > 0 && (
                <div className="mt-2 space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-medium">
                    <span className="text-slate-500 dark:text-slate-400">Password Strength:</span>
                    <span className={`font-semibold ${
                      strength.score === 1 ? 'text-rose-600 dark:text-rose-400' :
                      strength.score === 2 ? 'text-amber-600 dark:text-amber-400' :
                      strength.score === 3 ? 'text-blue-600 dark:text-blue-400' :
                      'text-emerald-600 dark:text-emerald-400'
                    }`}>{strength.label}</span>
                  </div>
                  <div className="grid grid-cols-4 gap-1.5 h-1.5">
                    {[1, 2, 3, 4].map((step) => (
                      <div
                        key={step}
                        className={`h-full rounded-full transition-all duration-300 ${
                          step <= strength.score ? strength.color : 'bg-slate-200 dark:bg-slate-700/60'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label 
                htmlFor="signup-confirm-password" 
                className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1"
              >
                Confirm Password
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
                  <Lock className="h-5 w-5" aria-hidden="true" />
                </div>
                <input
                  id="signup-confirm-password"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  disabled={loading || googleLoading}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="block w-full pl-11 pr-11 py-2.5 text-sm text-slate-900 dark:text-white bg-slate-50/70 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/80 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-indigo-400 transition-all outline-none disabled:opacity-60"
                  placeholder="••••••••"
                  aria-required="true"
                />
                <button
                  type="button"
                  disabled={loading || googleLoading}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 focus:outline-none transition-colors"
                  aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Terms and Conditions Checkbox */}
            <div className="pt-1">
              <div className="flex items-start">
                <input
                  id="agree-terms"
                  name="agreeTerms"
                  type="checkbox"
                  required
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-0.5 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 dark:border-slate-700 rounded dark:bg-slate-800 cursor-pointer"
                />
                <label htmlFor="agree-terms" className="ml-2.5 block text-xs text-slate-600 dark:text-slate-400 cursor-pointer leading-relaxed select-none">
                  I agree to GoldenGuard's{' '}
                  <span className="text-indigo-600 dark:text-indigo-400 font-medium">Terms of Service</span> and{' '}
                  <span className="text-indigo-600 dark:text-indigo-400 font-medium">Privacy Policy</span>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading || googleLoading}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-lg shadow-indigo-500/20 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 via-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                aria-label="Create new GoldenGuard account"
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Creating Account...</span>
                  </div>
                ) : (
                  <>
                    <span>Create Account</span>
                    <UserPlus className="ml-2 h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Social Login Divider */}
          <div className="mt-5">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-slate-800" />
              </div>
              <div className="relative flex justify-center text-xs uppercase tracking-wider font-semibold">
                <span className="px-3 bg-white/90 dark:bg-slate-900/90 text-slate-500 dark:text-slate-400">
                  Or sign up with
                </span>
              </div>
            </div>

            {/* Google Sign-In */}
            <div className="mt-4 space-y-3">
              <button
                type="button"
                onClick={handleGoogleSignup}
                disabled={loading || googleLoading}
                className="w-full flex justify-center items-center py-3 px-4 border border-slate-300 dark:border-slate-700 rounded-xl shadow-sm bg-white dark:bg-slate-800 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-750 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-all cursor-pointer"
                aria-label="Sign up with Google"
              >
                {googleLoading ? (
                  <div className="w-5 h-5 border-2 border-slate-400 border-t-indigo-600 rounded-full animate-spin mr-2" />
                ) : (
                  <GoogleIcon className="h-5 w-5 mr-2.5" />
                )}
                <span>Continue with Google</span>
              </button>

              {/* AI Studio Preview Domain Notice */}
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
