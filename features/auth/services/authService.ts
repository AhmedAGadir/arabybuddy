import { supabase } from '@/shared/lib/supabase';
import type { Provider } from '@supabase/supabase-js';
import type { SignInInput, SignUpInput } from '../validation/authSchemas';
import { AuthError } from './authErrors';

/**
 * Authentication Service
 * Handles all auth-related API calls
 *
 * TODO: Implement resendVerificationEmail - users may need to resend after signup
 * TODO: Implement deleteAccount for GDPR compliance
 * TODO: Implement linkOAuthProvider to link additional providers to existing account
 * TODO: Implement unlinkOAuthProvider to remove linked providers
 * TODO: Implement getCurrentUser convenience method
 */

export const authService = {
  /**
   * Sign up with email and password
   */
  async signUp({ email, password }: SignUpInput) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;
    return data;
  },

  /**
   * Sign in with email and password
   */
  async signIn({ email, password }: SignInInput) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  },

  /**
   * Sign in with OAuth ID token (used after native OAuth flows)
   */
  async signInWithIdToken(
    provider: Provider,
    idToken: string,
    options?: { accessToken?: string; nonce?: string }
  ) {
    const { data, error } = await supabase.auth.signInWithIdToken({
      provider,
      token: idToken,
      access_token: options?.accessToken,
      nonce: options?.nonce,
    });

    if (error) throw error;
    return data;
  },

  /**
   * Sign in with OAuth redirect (used for web OAuth flows)
   */
  async signInWithOAuth(provider: Provider, redirectTo: string) {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo,
        skipBrowserRedirect: false,
      },
    });

    if (error) throw error;
    return data;
  },

  /**
   * Sign out
   */
  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  /**
   * Send password reset email
   */
  async resetPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'arabybuddy://reset-password',
    });

    if (error) throw error;
  },

  /**
   * Update password
   */
  async updatePassword(newPassword: string) {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) throw error;
  },

  /**
   * Update user metadata (e.g., name from Apple Sign In)
   */
  async updateUserMetadata(metadata: Record<string, unknown>) {
    const { error } = await supabase.auth.updateUser({
      data: metadata,
    });

    if (error) throw error;
  },

  /**
   * Get current session
   */
  async getSession() {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return data.session;
  },

  /**
   * Set session from tokens (used after OAuth callback)
   */
  async setSession(accessToken: string, refreshToken: string) {
    const { data, error } = await supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken,
    });

    if (error) throw new AuthError('INVALID_SESSION', error.message);
    if (!data.session) throw new AuthError('INVALID_SESSION', 'No session returned');

    return data.session;
  },

  /**
   * Exchange PKCE code for session (used in web OAuth callback)
   */
  async exchangeCodeForSession(code: string) {
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) throw new AuthError('INVALID_SESSION', error.message);
    if (!data.session) throw new AuthError('INVALID_SESSION', 'No session returned');

    return data.session;
  },

  /**
   * Refresh session
   */
  async refreshSession() {
    const { data, error } = await supabase.auth.refreshSession();
    if (error) throw error;
    return data.session;
  },
};

