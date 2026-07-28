import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User, 
  onAuthStateChanged,
  getRedirectResult,
  signOut as firebaseSignOut
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import toast from 'react-hot-toast';

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  phone?: string;
  bloodGroup?: string;
  emergencyContacts?: string;
  city?: string;
  state?: string;
  role?: string;
  createdAt?: string;
  lastLogin?: string;
  profileImage?: string;
  notificationsEnabled?: boolean;
}

interface AuthContextType {
  currentUser: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  setCustomUserSession: (email: string, name?: string, photoURL?: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const ADMIN_EMAIL = 'nitesh933438@gmail.com';

export const isAdminEmail = (email?: string | null): boolean => {
  if (!email) return false;
  return email.toLowerCase().trim() === ADMIN_EMAIL;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const setCustomUserSession = (email: string, name?: string, photoURL?: string) => {
    const cleanEmail = email.trim().toLowerCase();
    const isAdmin = isAdminEmail(cleanEmail);
    const displayName = name?.trim() || cleanEmail.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    const uid = 'user_' + Math.abs(cleanEmail.split('').reduce((acc, char) => (acc << 5) - acc + char.charCodeAt(0), 0));

    const mockUser = {
      uid,
      email: cleanEmail,
      displayName,
      photoURL: photoURL || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(cleanEmail)}`,
      emailVerified: true,
      isAnonymous: false,
      metadata: {},
      providerData: [],
      refreshToken: '',
      tenantId: null,
      delete: async () => {},
      getIdToken: async () => 'mock-token',
      getIdTokenResult: async () => ({ token: 'mock-token', claims: {}, authTime: '', issuedAtTime: '', expirationTime: '', signInProvider: null, signInSecondFactor: null }),
      reload: async () => {},
      toJSON: () => ({})
    } as unknown as User;

    const profile: UserProfile = {
      uid,
      name: displayName,
      email: cleanEmail,
      role: isAdmin ? 'admin' : 'user',
      profileImage: mockUser.photoURL || undefined,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString()
    };

    localStorage.setItem('goldenguard_custom_session', JSON.stringify(profile));
    setCurrentUser(mockUser);
    setUserProfile(profile);

    // Sync to Firestore in background if reachable
    setDoc(doc(db, 'users', uid), {
      uid,
      name: displayName,
      email: cleanEmail,
      role: isAdmin ? 'admin' : 'user',
      profileImage: mockUser.photoURL || '',
      lastLogin: serverTimestamp()
    }, { merge: true }).catch(() => {});
  };

  const fetchUserProfile = async (uid: string) => {
    try {
      const docRef = doc(db, 'users', uid);
      const docSnap = await getDoc(docRef);
      const currentEmail = auth.currentUser?.email || currentUser?.email || '';
      const isAdmin = isAdminEmail(currentEmail);

      if (docSnap.exists()) {
        const profileData = docSnap.data() as UserProfile;
        if (isAdmin || isAdminEmail(profileData.email)) {
          profileData.role = 'admin';
        }
        setUserProfile(profileData);
      } else {
        // Create fallback profile if document doesn't exist
        const fallbackProfile: UserProfile = {
          uid,
          name: auth.currentUser?.displayName || currentUser?.displayName || (isAdmin ? 'Admin' : 'User'),
          email: currentEmail,
          role: isAdmin ? 'admin' : 'user',
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
        };
        setUserProfile(fallbackProfile);
      }
    } catch (error: any) {
      console.warn("Firestore permissions or fetch issue, using local fallback profile:", error?.message || error);
      const currentEmail = auth.currentUser?.email || currentUser?.email || '';
      const isAdmin = isAdminEmail(currentEmail);
      if (currentEmail) {
        setUserProfile(prev => prev || {
          uid,
          name: auth.currentUser?.displayName || currentUser?.displayName || (isAdmin ? 'Admin' : 'User'),
          email: currentEmail,
          role: isAdmin ? 'admin' : 'user',
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
        });
      }
    }
  };

  const refreshProfile = async () => {
    if (currentUser) {
      await fetchUserProfile(currentUser.uid);
    }
  };

  const logout = async () => {
    try {
      localStorage.removeItem('goldenguard_custom_session');
      setCurrentUser(null);
      setUserProfile(null);
      await firebaseSignOut(auth).catch(() => {});
      toast.success('Logged out successfully');
    } catch (error: any) {
      toast.error(error?.message || 'Logged out');
    }
  };

  useEffect(() => {
    // Process redirect result if page was loaded after signInWithRedirect
    getRedirectResult(auth)
      .then(async (result) => {
        if (result && result.user) {
          toast.success(`Welcome ${result.user.displayName || result.user.email}!`);
        }
      })
      .catch((err) => {
        console.warn('Firebase Redirect Sign-In Notice:', err?.code || err?.message);
      });

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        const userEmail = user.email || '';
        const userRole = isAdminEmail(userEmail) ? 'admin' : 'user';

        try {
           const userRef = doc(db, 'users', user.uid);
           const docSnap = await getDoc(userRef).catch(() => null);
           if (docSnap && docSnap.exists()) {
              await setDoc(userRef, { lastLogin: serverTimestamp(), role: isAdminEmail(userEmail) ? 'admin' : (docSnap.data()?.role || 'user') }, { merge: true }).catch(() => null);
           } else {
              await setDoc(userRef, {
                 uid: user.uid,
                 email: userEmail,
                 name: user.displayName || (userRole === 'admin' ? 'Admin' : 'User'),
                 createdAt: serverTimestamp(),
                 lastLogin: serverTimestamp(),
                 role: userRole
              }, { merge: true }).catch(() => null);
           }
        } catch(e) {
           console.warn("Notice: Firestore background sync skipped:", e);
        }
        await fetchUserProfile(user.uid);
      } else {
        // Check stored custom session
        try {
          const stored = localStorage.getItem('goldenguard_custom_session');
          if (stored) {
            const parsed = JSON.parse(stored);
            if (parsed && parsed.email) {
              setCustomUserSession(parsed.email, parsed.name, parsed.profileImage);
            } else {
              setUserProfile(null);
            }
          } else {
            setUserProfile(null);
          }
        } catch {
          setUserProfile(null);
        }
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userProfile,
    loading,
    logout,
    refreshProfile,
    setCustomUserSession
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
