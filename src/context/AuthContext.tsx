import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User, 
  onAuthStateChanged, 
  getRedirectResult,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  signInWithRedirect,
  sendPasswordResetEmail,
  signOut as firebaseSignOut,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db, googleProvider, syncUserProfileDoc, isGoogleAIStudioPreview, UserRole, determineUserRole } from '../lib/firebase';
import toast from 'react-hot-toast';
import { getAuthErrorMessage } from '../utils/authErrorUtils';

export type { UserRole };

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  phone?: string;
  photoURL?: string;
  role: UserRole;
  createdAt?: any;
  lastLogin?: any;
  bloodGroup?: string;
  emergencyContacts?: string;
  city?: string;
  state?: string;
  profileImage?: string;
  notificationsEnabled?: boolean;
}

interface GoogleAuthResponse {
  success: boolean;
  user?: User | null;
  isPreview?: boolean;
  redirecting?: boolean;
  error?: string;
}

interface AuthContextType {
  currentUser: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  login: (email: string, pass: string, rememberMe?: boolean) => Promise<User>;
  signup: (fullName: string, email: string, phone: string, pass: string, role?: UserRole) => Promise<User>;
  loginWithGoogle: () => Promise<GoogleAuthResponse>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const ADMIN_EMAIL = 'nitesh933438@gmail.com';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch Firestore User Profile document
  const fetchUserProfile = async (user: User, activeProvider?: string) => {
    try {
      const userRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(userRef).catch(() => null);
      const userEmail = (user.email || '').toLowerCase().trim();

      if (docSnap && docSnap.exists()) {
        const data = docSnap.data() as UserProfile;
        const computedRole = determineUserRole(user, activeProvider, data.role);
        
        // Ensure Firestore role is synced if computedRole is updated
        if (data.role !== computedRole) {
          await setDoc(userRef, { role: computedRole, lastLogin: serverTimestamp() }, { merge: true }).catch(() => {});
        }

        setUserProfile({
          ...data,
          uid: user.uid,
          email: userEmail,
          role: computedRole
        });
      } else {
        // Create initial fallback profile if doc doesn't exist yet
        const computedRole = determineUserRole(user, activeProvider);
        const fallbackProfile: UserProfile = {
          uid: user.uid,
          name: user.displayName || userEmail.split('@')[0] || 'User',
          email: userEmail,
          phone: user.phoneNumber || '',
          photoURL: user.photoURL || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.displayName || userEmail)}`,
          role: computedRole,
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString()
        };
        setUserProfile(fallbackProfile);
        await syncUserProfileDoc(user, { activeProvider });
      }
    } catch (err) {
      console.warn("Notice: Firestore profile fetch fallback triggered:", err);
      const userEmail = (user.email || '').toLowerCase().trim();
      const computedRole = determineUserRole(user, activeProvider);
      setUserProfile({
        uid: user.uid,
        name: user.displayName || userEmail.split('@')[0] || 'User',
        email: userEmail,
        phone: user.phoneNumber || '',
        photoURL: user.photoURL || '',
        role: computedRole
      });
    }
  };

  const refreshProfile = async () => {
    if (auth.currentUser) {
      await fetchUserProfile(auth.currentUser);
    }
  };

  // 1. Email & Password Login
  const login = async (emailInput: string, passwordInput: string, rememberMe: boolean = true) => {
    const trimmedEmail = emailInput.trim();
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('gg_auth_provider', 'password');
    }

    // Set Persistence based on Remember Me
    await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence).catch(() => {});
    
    const credential = await signInWithEmailAndPassword(auth, trimmedEmail, passwordInput);
    const user = credential.user;
    
    // Sync profile to Firestore with password provider
    await syncUserProfileDoc(user, { activeProvider: 'password' });
    await fetchUserProfile(user, 'password');
    
    return user;
  };

  // 2. Signup
  const signup = async (fullName: string, emailInput: string, phone: string, passwordInput: string, selectedRole: UserRole = 'citizen') => {
    const trimmedName = fullName.trim();
    const trimmedEmail = emailInput.trim();
    const trimmedPhone = phone.trim();

    if (typeof window !== 'undefined') {
      localStorage.setItem('gg_auth_provider', 'password');
    }

    const credential = await createUserWithEmailAndPassword(auth, trimmedEmail, passwordInput);
    const user = credential.user;

    // Update Auth profile displayName
    if (user) {
      await updateProfile(user, {
        displayName: trimmedName,
        photoURL: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(trimmedName)}`
      }).catch(() => {});

      // Create Firestore User Document with selected role
      await syncUserProfileDoc(user, { name: trimmedName, phone: trimmedPhone, role: selectedRole, activeProvider: 'password' });
      await fetchUserProfile(user, 'password');
    }

    return user;
  };

  // 3. Continue with Google
  const loginWithGoogle = async (): Promise<GoogleAuthResponse> => {
    // Check preview sandbox constraint
    if (isGoogleAIStudioPreview()) {
      return {
        success: false,
        isPreview: true,
        error: "Google Sign-In is available only when running locally (npm run dev) or on a deployed domain due to Firebase OAuth restrictions."
      };
    }

    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('gg_auth_provider', 'google.com');
      }

      // Primary: signInWithPopup
      const result = await signInWithPopup(auth, googleProvider);
      if (result.user) {
        await syncUserProfileDoc(result.user, { activeProvider: 'google.com' });
        await fetchUserProfile(result.user, 'google.com');
        return { success: true, user: result.user };
      }
      return { success: false, error: 'Failed to sign in with Google' };
    } catch (popupErr: any) {
      console.warn('Firebase Google Popup Error:', popupErr?.code || popupErr?.message);

      const code = popupErr?.code || '';
      if (code === 'auth/popup-closed-by-user' || code === 'auth/cancelled-popup-request') {
        return { success: false, error: 'Google sign-in popup was closed.' };
      }

      // Automatic fallback to signInWithRedirect if popup fails or is blocked
      try {
        console.log('Attempting automatic fallback to signInWithRedirect...');
        await signInWithRedirect(auth, googleProvider);
        return { success: false, redirecting: true };
      } catch (redirectErr: any) {
        console.error('Firebase Google Redirect Error:', redirectErr);
        const errorMsg = getAuthErrorMessage(redirectErr);
        return { success: false, error: errorMsg };
      }
    }
  };

  // 4. Logout
  const logout = async () => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('gg_auth_provider');
      }
      await firebaseSignOut(auth);
      setCurrentUser(null);
      setUserProfile(null);
      toast.success('Signed out successfully');
    } catch (err: any) {
      toast.error('Error signing out');
    }
  };

  // 5. Reset Password
  const resetPassword = async (emailInput: string) => {
    const trimmedEmail = emailInput.trim();
    await sendPasswordResetEmail(auth, trimmedEmail);
  };

  // Listen to Auth state & handle redirect result
  useEffect(() => {
    // Process redirect result if page reloaded after signInWithRedirect
    getRedirectResult(auth)
      .then(async (result) => {
        if (result && result.user) {
          if (typeof window !== 'undefined') {
            localStorage.setItem('gg_auth_provider', 'google.com');
          }
          await syncUserProfileDoc(result.user, { activeProvider: 'google.com' });
          await fetchUserProfile(result.user, 'google.com');
          toast.success(`Welcome back, ${result.user.displayName || result.user.email}!`);
        }
      })
      .catch((err) => {
        if (err?.code !== 'auth/popup-closed-by-user') {
          console.warn('Firebase Redirect Sign-In notice:', err?.message || err);
        }
      });

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        await fetchUserProfile(user);
      } else {
        setCurrentUser(null);
        setUserProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userProfile,
    loading,
    login,
    signup,
    loginWithGoogle,
    logout,
    resetPassword,
    refreshProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
