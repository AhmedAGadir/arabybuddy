import {
  GoogleSignin,
  isSuccessResponse,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import * as AppleAuthentication from 'expo-apple-authentication';
import { authService } from './authService';
import { AuthError } from './authErrors';

// Configure Google Sign-In
// TODO: Verify if androidClientId is needed - current setup uses webClientId for token exchange
// which should work for both iOS and Android when configured correctly in Google Cloud Console
GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
  iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
});

/**
 * Native OAuth Service
 * Handles OAuth flows for native platforms (iOS/Android)
 *
 * TODO: Implement signOutFromGoogle to fully clear Google session on sign out
 * TODO: Implement isAppleSignInAvailable check using AppleAuthentication.isAvailableAsync()
 * TODO: Handle Android deep link callback edge cases (app killed during OAuth flow)
 */
export const oauthService = {
  /**
   * Sign in with Google (native)
   * Uses the native Google Sign-In SDK
   */
  async signInWithGoogle() {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();

      if (!isSuccessResponse(response)) {
        throw new AuthError('GOOGLE_SIGN_IN_FAILED', 'Google sign in was not successful');
      }

      if (!response.data.idToken) {
        throw new AuthError('NO_ID_TOKEN', 'No ID token received from Google');
      }

      // Exchange the Google ID token with Supabase
      const data = await authService.signInWithIdToken('google', response.data.idToken);
      return data;
    } catch (error: unknown) {
      // Handle Google-specific errors
      if (error instanceof AuthError) {
        throw error;
      }

      const googleError = error as { code?: string };
      if (googleError.code === statusCodes.SIGN_IN_CANCELLED) {
        throw new AuthError('CANCELLED', 'User cancelled the sign-in flow');
      }
      if (googleError.code === statusCodes.IN_PROGRESS) {
        throw new AuthError('SIGN_IN_IN_PROGRESS', 'Sign in is already in progress');
      }
      if (googleError.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        throw new AuthError(
          'GOOGLE_PLAY_SERVICES_UNAVAILABLE',
          'Google Play Services is not available'
        );
      }

      throw new AuthError(
        'GOOGLE_SIGN_IN_FAILED',
        error instanceof Error ? error.message : 'Google sign in failed'
      );
    }
  },

  /**
   * Sign in with Apple (native iOS)
   * Uses expo-apple-authentication for native Apple Sign In
   */
  async signInWithApple() {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      if (!credential.identityToken) {
        throw new AuthError('NO_ID_TOKEN', 'No identity token received from Apple');
      }

      if (!credential.authorizationCode) {
        throw new AuthError('NO_AUTHORIZATION_CODE', 'No authorization code received from Apple');
      }

      // Exchange the Apple ID token with Supabase
      const data = await authService.signInWithIdToken('apple', credential.identityToken, {
        accessToken: credential.authorizationCode,
      });

      // Apple only provides the user's full name on the first sign-in
      // Save it to user metadata if available
      if (credential.fullName) {
        const nameParts: string[] = [];
        if (credential.fullName.givenName) nameParts.push(credential.fullName.givenName);
        if (credential.fullName.middleName) nameParts.push(credential.fullName.middleName);
        if (credential.fullName.familyName) nameParts.push(credential.fullName.familyName);
        const fullName = nameParts.join(' ');

        if (fullName) {
          await authService.updateUserMetadata({
            full_name: fullName,
            given_name: credential.fullName.givenName,
            family_name: credential.fullName.familyName,
          });
        }
      }

      return data;
    } catch (error: unknown) {
      if (error instanceof AuthError) {
        throw error;
      }

      const appleError = error as { code?: string };
      if (appleError.code === 'ERR_REQUEST_CANCELED') {
        throw new AuthError('CANCELLED', 'User cancelled the sign-in flow');
      }

      throw new AuthError(
        'APPLE_SIGN_IN_FAILED',
        error instanceof Error ? error.message : 'Apple sign in failed'
      );
    }
  },
};
