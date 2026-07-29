/**
 * Formats Firebase Auth error codes into clear, user-friendly error messages
 */
export function getAuthErrorMessage(error: any): string {
  if (!error) return 'An unexpected error occurred. Please try again.';

  const code = typeof error === 'string' ? error : error.code || '';
  const message = error.message || '';

  switch (code) {
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/user-not-found':
      return 'No account found with this email address. Please check your email or sign up.';
    case 'auth/wrong-password':
      return 'Incorrect password. Please try again or click "Forgot password?".';
    case 'auth/invalid-credential':
      return 'Invalid email or password. Please verify your login details.';
    case 'auth/email-already-in-use':
      return 'An account with this email address already exists. Try signing in instead.';
    case 'auth/weak-password':
      return 'Password is too weak. Please use at least 6 characters with letters and numbers.';
    case 'auth/network-request-failed':
      return 'Network error. Please check your internet connection.';
    case 'auth/too-many-requests':
      return 'Too many failed sign-in attempts. Please wait a few minutes before trying again.';
    case 'auth/popup-closed-by-user':
      return 'Google sign-in popup was closed before completion.';
    case 'auth/popup-blocked':
      return 'Sign-in popup was blocked by your browser. Please allow popups or use redirect.';
    case 'auth/account-exists-with-different-credential':
      return 'An account already exists with the same email using a different sign-in provider.';
    case 'auth/user-disabled':
      return 'This user account has been disabled. Please contact support.';
    case 'auth/operation-not-allowed':
      return 'This sign-in method is currently not enabled in Firebase project settings.';
    case 'auth/requires-recent-login':
      return 'This action requires recent authentication. Please log in again.';
    case 'auth/cancelled-popup-request':
      return 'Sign-in request was cancelled. Please try again.';
    default:
      if (message.includes('network') || message.includes('Network')) {
        return 'Network connection error. Please check your internet connection.';
      }
      return message.replace(/^Firebase:\s*Error\s*\([^)]+\):\s*/, '').replace(/^Firebase:\s*/, '') || 'Authentication failed. Please try again.';
  }
}
