import { router } from 'expo-router';
import { useEffect } from 'react';
import { View, ActivityIndicator, Platform } from 'react-native';
import { supabase } from '@/lib/supabase';

export default function AuthCallback() {
  useEffect(() => {
    const handleOAuthCallback = async () => {
      // For web, check if we have OAuth params in the URL
      if (Platform.OS === 'web' && typeof window !== 'undefined') {
        const url = new URL(window.location.href);
        
        // Check for code in query string (PKCE flow)
        const code = url.searchParams.get('code');
        
        // Check for tokens in hash fragment (implicit flow)
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token');
        
        if (code) {
          console.log('Found OAuth code, exchanging for session...');
          try {
            // Exchange the code for a session
            const { data, error } = await supabase.auth.exchangeCodeForSession(code);
            
            if (error) {
              console.error('Error exchanging code:', error);
              router.replace('/login');
              return;
            }
            
            if (data?.session) {
              console.log('Session created successfully via code exchange');
              router.replace('/(tabs)');
              return;
            }
          } catch (err) {
            console.error('Unexpected error:', err);
            router.replace('/login');
            return;
          }
        } else if (accessToken && refreshToken) {
          console.log('Found tokens in URL hash, setting session...');
          try {
            // Set the session from the tokens in the URL
            const { data, error } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken,
            });
            
            if (error) {
              console.error('Error setting session from tokens:', error);
              router.replace('/login');
              return;
            }
            
            if (data?.session) {
              console.log('Session created successfully from tokens');
              router.replace('/(tabs)');
              return;
            }
          } catch (err) {
            console.error('Unexpected error:', err);
            router.replace('/login');
            return;
          }
        }
      }

      // For mobile deep links or if session already exists
      // Listen for auth state changes
      const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
        console.log('Auth state changed in callback:', event, session?.user?.email);
        
        if (event === 'SIGNED_IN' && session) {
          console.log('User signed in via state change');
          router.replace('/(tabs)');
        } else if (event === 'SIGNED_OUT') {
          router.replace('/login');
        }
      });

      // Also check if user is already signed in
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        console.log('User already has session');
        router.replace('/(tabs)');
      }

      return () => {
        subscription.unsubscribe();
      };
    };

    handleOAuthCallback();
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-background">
      <ActivityIndicator size="large" />
    </View>
  );
}