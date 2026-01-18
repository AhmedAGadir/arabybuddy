/**
 * Standardized auth error codes for consistent error handling
 */
export type AuthErrorCode =
  | 'CANCELLED'
  | 'NETWORK_ERROR'
  | 'INVALID_CREDENTIALS'
  | 'GOOGLE_PLAY_SERVICES_UNAVAILABLE'
  | 'GOOGLE_SIGN_IN_FAILED'
  | 'APPLE_SIGN_IN_FAILED'
  | 'NO_ID_TOKEN'
  | 'NO_AUTHORIZATION_CODE'
  | 'SESSION_EXPIRED'
  | 'INVALID_SESSION'
  | 'SIGN_IN_IN_PROGRESS'
  | 'UNKNOWN';

/**
 * Custom error class for authentication errors
 */
export class AuthError extends Error {
  constructor(
    public code: AuthErrorCode,
    message: string
  ) {
    super(message);
    this.name = 'AuthError';
  }
}

/**
 * Get a user-friendly error message from an AuthError
 */
export function getAuthErrorMessage(error: unknown): string {
  if (error instanceof AuthError) {
    switch (error.code) {
      case 'CANCELLED':
        return 'Sign in was cancelled';
      case 'NETWORK_ERROR':
        return 'Network error. Please check your connection and try again.';
      case 'INVALID_CREDENTIALS':
        return 'Invalid email or password';
      case 'GOOGLE_PLAY_SERVICES_UNAVAILABLE':
        return 'Google Play Services is not available on this device';
      case 'GOOGLE_SIGN_IN_FAILED':
        return 'Google sign in failed. Please try again.';
      case 'APPLE_SIGN_IN_FAILED':
        return 'Apple sign in failed. Please try again.';
      case 'NO_ID_TOKEN':
        return 'Authentication failed. No identity token received.';
      case 'NO_AUTHORIZATION_CODE':
        return 'Authentication failed. No authorization code received.';
      case 'SESSION_EXPIRED':
        return 'Your session has expired. Please sign in again.';
      case 'INVALID_SESSION':
        return 'Invalid session. Please sign in again.';
      case 'SIGN_IN_IN_PROGRESS':
        return 'Sign in is already in progress';
      case 'UNKNOWN':
      default:
        return error.message || 'An unexpected error occurred';
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'An unexpected error occurred';
}
