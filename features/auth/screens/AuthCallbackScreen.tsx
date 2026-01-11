import { router } from 'expo-router';
import { JSX, useEffect } from 'react';
import { View, ActivityIndicator, Platform } from 'react-native';
import { supabase } from '@/shared/lib/supabase';

/**
 * AuthCallbackScreen - Handles OAuth callback redirects
 *
 * This screen processes OAuth authentication callbacks from providers
 * like Google and Apple. It handles both web (URL params) and native
 * (deep link) authentication flows.
 */
export default function AuthCallbackScreen(): JSX.Element {
  useEffect(() => {
    const handleOAuthCallback = async () => {
      // Handle web OAuth callback
      if (Platform.OS === 'web' && typeof window !== 'undefined') {
        const url = new URL(window.location.href);
        const code = url.searchParams.get('code');
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token');

        // PKCE flow - exchange code for session
        if (code) {
          const { data, error } = await supabase.auth.exchangeCodeForSession(code);
          if (error || !data?.session) {
            router.replace('/login');
            return;
          }
          router.replace('/(tabs)');
          return;
        }

        // Implicit flow - set session from tokens
        if (accessToken && refreshToken) {
          const { data, error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });
          if (error || !data?.session) {
            router.replace('/login');
            return;
          }
          router.replace('/(tabs)');
          return;
        }
      }

      // Handle native OAuth callback via auth state change
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_IN' && session) {
          router.replace('/(tabs)');
        } else if (event === 'SIGNED_OUT') {
          router.replace('/login');
        }
      });

      // Check if already authenticated
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        router.replace('/(tabs)');
      }

      return () => subscription.unsubscribe();
    };

    handleOAuthCallback();
  }, []);

  return (
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator size="large" />
    </View>
  );
}

