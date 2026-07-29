import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore, doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { 
  getAuth, 
  GoogleAuthProvider, 
  setPersistence, 
  browserLocalPersistence,
  User 
} from "firebase/auth";

// Firebase configuration with environment variables and production fallbacks
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCNp5BKQzIlAHrUL7go41uz4cal8Hjpdnc",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "road-safety-44577.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "road-safety-44577",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "road-safety-44577.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "844124339603",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:844124339603:web:42b80106dc3e13d7e1bc66",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-40E4J8DK4R"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

// Enforce browser local persistence to maintain session across page refreshes
setPersistence(auth, browserLocalPersistence).catch((err) => {
  console.warn("Firebase Auth persistence setup warning:", err?.message || err);
});

// Configure Google Auth Provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Analytics safely initialized
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      try {
        getAnalytics(app);
      } catch (e) {
        console.warn("Analytics initialization skipped:", e);
      }
    }
  }).catch(() => {});
}

/**
 * Detects if the application is running inside Google AI Studio Preview sandbox.
 */
export function isGoogleAIStudioPreview(): boolean {
  if (typeof window === 'undefined') return false;
  const host = window.location.hostname;
  return (
    host.includes('ais-dev-') ||
    host.includes('ais-pre-') ||
    host.includes('cloudworkstations.dev') ||
    host.includes('webcontainer')
  );
}

const ADMIN_EMAIL = 'nitesh933438@gmail.com';

/**
 * Syncs or creates the Firestore document in the 'users' collection for the authenticated user.
 */
export async function syncUserProfileDoc(
  user: User, 
  additionalData?: { name?: string; phone?: string }
) {
  if (!user || !user.uid) return null;

  const userEmail = (user.email || '').toLowerCase().trim();
  const isAdmin = userEmail === ADMIN_EMAIL;
  const userRef = doc(db, 'users', user.uid);

  const fallbackName = additionalData?.name?.trim() || 
    user.displayName || 
    (userEmail ? userEmail.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'User');

  const photoURL = user.photoURL || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(fallbackName)}`;

  try {
    const snap = await getDoc(userRef).catch(() => null);
    
    if (snap && snap.exists()) {
      // Existing user -> update lastLogin and sync role/phone/photo if provided
      const existingData = snap.data();
      const updatePayload: Record<string, any> = {
        lastLogin: serverTimestamp(),
        role: isAdmin ? 'admin' : (existingData.role || 'user')
      };
      if (additionalData?.name) updatePayload.name = additionalData.name;
      if (additionalData?.phone) updatePayload.phone = additionalData.phone;
      if (user.photoURL) updatePayload.photoURL = user.photoURL;

      await setDoc(userRef, updatePayload, { merge: true }).catch((err) => {
        console.warn("Firestore user sync update notice:", err?.message || err);
      });
    } else {
      // New user document creation
      const newDoc = {
        uid: user.uid,
        name: fallbackName,
        email: userEmail,
        phone: additionalData?.phone || user.phoneNumber || '',
        photoURL: photoURL,
        role: isAdmin ? 'admin' : 'user',
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp()
      };

      await setDoc(userRef, newDoc, { merge: true }).catch((err) => {
        console.warn("Firestore new user creation notice:", err?.message || err);
      });
    }
  } catch (e) {
    console.warn("Firestore sync skipped:", e);
  }
}

export default app;
