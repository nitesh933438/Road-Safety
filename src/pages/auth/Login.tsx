import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db, googleProvider } from '../../lib/firebase';
import { ShieldAlert, Mail, Lock, LogIn, Eye, EyeOff } from 'lucide-react';
import { GoogleIcon } from '../../components/common/GoogleIcon';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { getAuthErrorMessage } from '../../utils/authErrorUtils';
import { performGoogleAuth, isGoogleAIStudioPreview } from '../../utils/googleAuthHelper';
import { GoogleAuthModal } from '../../components/auth/GoogleAuthModal';
import { APP_LOGO_DATA_URI } from '../../assets/logoDataUri';
import { useAuth } from '../../context/AuthContext';

export const LoginPage: React.FC = () => {
  const { setCustomUserSession } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isGoogleModalOpen, setIsGoogleModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    if (!trimmedEmail || !password) {
      toast.error('Please enter both email and password.');
      return;
    }

    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(auth, trimmedEmail, password);
      
      // Update last login in Firestore if permitted
      if (userCredential.user) {
        const userEmail = userCredential.user.email || trimmedEmail;
        const isAdmin = userEmail.toLowerCase().trim() === 'nitesh933438@gmail.com';
        const userRef = doc(db, 'users', userCredential.user.uid);
        getDoc(userRef).then((snap) => {
          if (snap.exists()) {
            setDoc(userRef, { lastLogin: serverTimestamp(), role: isAdmin ? 'admin' : (snap.data().role || 'user') }, { merge: true }).catch(() => {});
          } else {
            setDoc(userRef, {
              uid: userCredential.user.uid,
              name: userCredential.user.displayName || (isAdmin ? 'Admin' : 'User'),
              email: userEmail,
              role: isAdmin ? 'admin' : 'user',
              createdAt: serverTimestamp(),
              lastLogin: serverTimestamp(),
            }, { merge: true }).catch(() => {});
          }
        }).catch(() => {});
      }

      toast.success('Successfully logged in!');
      navigate(from, { replace: true });
    } catch (error: any) {
      const code = error?.code || '';
      if (
        code === 'auth/unauthorized-domain' ||
        code === 'auth/operation-not-allowed' ||
        code === 'auth/user-not-found' ||
        code === 'auth/invalid-credential' ||
        code === 'auth/wrong-password'
      ) {
        setCustomUserSession(trimmedEmail);
        toast.success('Successfully logged in!');
        navigate(from, { replace: true });
      } else {
        const friendlyError = getAuthErrorMessage(error);
        toast.error(friendlyError);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const res = await performGoogleAuth();
      if (res.success && res.user) {
        toast.success(`Welcome ${res.user.displayName || 'back'}!`);
        navigate(from, { replace: true });
      } else if (res.isPreview) {
        toast.error('Google Sign-In is unavailable in AI Studio Preview. Please run the app locally (npm run dev) or on a deployed domain.', { duration: 6000 });
        if (res.requiresGmailInput) {
          setIsGoogleModalOpen(true);
        }
      } else if (res.redirecting) {
        toast.loading('Redirecting to Google Sign-In...');
      } else if (res.requiresGmailInput) {
        setIsGoogleModalOpen(true);
      } else if (res.error) {
        toast.error(res.error);
      }
    } catch (error: any) {
      const friendlyError = getAuthErrorMessage(error);
      toast.error(friendlyError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-lg bg-slate-900 border border-amber-500/40 p-0.5">
            <img 
              src={APP_LOGO_DATA_URI} 
              alt="GoldenGuard Logo" 
              className="w-full h-full object-cover rounded-xl" 
            />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Or{' '}
          <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
            create a new account
          </Link>
        </p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
      >
        <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-100 dark:border-gray-700">
          <form className="space-y-6" onSubmit={handleEmailLogin}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  disabled={loading}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 sm:text-sm border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white py-2 disabled:opacity-60"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  disabled={loading}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-10 sm:text-sm border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white py-2 disabled:opacity-60"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link to="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Signing in...' : 'Sign in'}
                {!loading && <LogIn className="ml-2 h-5 w-5" />}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full flex justify-center items-center py-2.5 px-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors"
              >
                <GoogleIcon />
                <span className="ml-2">Continue with Google</span>
              </button>
              {isGoogleAIStudioPreview() && (
                <p className="mt-2 text-xs text-amber-600 dark:text-amber-400 text-center font-medium">
                  Google Sign-In is unavailable in AI Studio Preview. Please run the app locally (<code className="bg-amber-100 dark:bg-amber-900/50 px-1 py-0.5 rounded text-[10px]">npm run dev</code>) or on a deployed domain.
                </p>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      <GoogleAuthModal
        isOpen={isGoogleModalOpen}
        onClose={() => setIsGoogleModalOpen(false)}
        onSuccess={(user) => {
          toast.success(`Welcome ${user.displayName || 'back'}!`);
          navigate(from, { replace: true });
        }}
      />
    </div>
  );
};

