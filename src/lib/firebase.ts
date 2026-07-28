import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, setPersistence, browserLocalPersistence } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCNp5BKQzIlAHrUL7go41uz4cal8Hjpdnc",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "road-safety-44577.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "road-safety-44577",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "road-safety-44577.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "844124339603",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:844124339603:web:42b80106dc3e13d7e1bc66",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-40E4J8DK4R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

// Enforce browser local persistence to maintain session across refreshes
setPersistence(auth, browserLocalPersistence).catch((err) => {
  console.warn("Firebase Auth persistence configuration warning:", err?.message || err);
});

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

export default app;

