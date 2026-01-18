import type { CredentialResponse } from '@react-oauth/google';
import { authService } from './authService';
import { AuthError } from './authErrors';

/**
 * Web OAuth Service
 * Handles OAuth flows for web platform
 *
 * TODO: Implement signInWithGoogleRedirect as alternative to popup flow
 * TODO: Handle OAuth error params in callback (error, error_description)
 * TODO: Implement signOutFromGoogle to revoke Google token on sign out
 */

/**
 * Generate a random nonce for OAuth
 */
function generateNonce(): string {
  const array = new Uint32Array(1);
  window.crypto.getRandomValues(array);
  return array[0].toString();
}

/**
 * Generate SHA-256 hash of a nonce
 */
async function generateSha256Nonce(nonce: string): Promise<string> {
  const buffer = await window.crypto.subtle.digest(
    'sha-256',
    new TextEncoder().encode(nonce)
  );
  const array = Array.from(new Uint8Array(buffer));
  return array.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export const oauthService = {
  /**
   * Generate nonce pair for Google OAuth
   * Returns both the raw nonce (for Supabase) and hashed nonce (for Google)
   */
  async generateGoogleNonce(): Promise<{ nonce: string; hashedNonce: string }> {
    const nonce = generateNonce();
    const hashedNonce = await generateSha256Nonce(nonce);
    return { nonce, hashedNonce };
  },

  /**
   * Sign in with Google credential response (web)
   * Used after Google Identity Services returns a credential
   */
  async signInWithGoogleCredential(credential: CredentialResponse, nonce: string) {
    if (!credential.credential) {
      throw new AuthError('NO_ID_TOKEN', 'No credential received from Google');
    }

    const data = await authService.signInWithIdToken('google', credential.credential, {
      nonce,
    });

    return data;
  },

  /**
   * Sign in with Apple via OAuth redirect (web)
   * Initiates the Apple OAuth flow via redirect
   */
  async signInWithApple() {
    const redirectUrl = `${window.location.origin}/auth/callback`;
    return authService.signInWithOAuth('apple', redirectUrl);
  },

  /**
   * Handle OAuth callback (web)
   * Processes the OAuth callback after redirect
   */
  async handleOAuthCallback(): Promise<{ success: boolean }> {
    const url = new URL(window.location.href);
    const code = url.searchParams.get('code');
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = hashParams.get('access_token');
    const refreshToken = hashParams.get('refresh_token');

    // PKCE flow - exchange code for session
    if (code) {
      await authService.exchangeCodeForSession(code);
      return { success: true };
    }

    // Implicit flow - set session from tokens
    if (accessToken && refreshToken) {
      await authService.setSession(accessToken, refreshToken);
      return { success: true };
    }

    return { success: false };
  },
};
