import { router, Href } from 'expo-router';
import { JSX, useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Loader2 } from 'lucide-react-native';

import { VStack } from '@/shared/components/ui/vstack';
import { Text } from '@/shared/components/ui/text';
import { authService } from '../services/authService';
import { oauthService } from '../services/oauthService.web';

/**
 * AuthCallbackScreen - Handles OAuth callback redirects
 *
 * This screen processes OAuth authentication callbacks from providers
 * like Google and Apple. It handles both web (URL params) and native
 * (deep link) authentication flows.
 */
export default function AuthCallbackScreen(): JSX.Element {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleOAuthCallback = async () => {
      try {
        // Handle web OAuth callback
        if (Platform.OS === 'web' && typeof window !== 'undefined') {
          const result = await oauthService.handleOAuthCallback();

          if (result.success) {
            router.replace('/(tabs)' as Href);
            return;
          }
        }

        // For native platforms, check if already authenticated
        // The deep link should have already triggered the auth flow
        const session = await authService.getSession();
        if (session) {
          router.replace('/(tabs)' as Href);
          return;
        }

        // No session found, redirect to sign in
        setError('Unable to complete sign in');
        setTimeout(() => {
          router.replace('/signin' as Href);
        }, 2000);
      } catch (err) {
        console.error('OAuth callback error:', err);
        setError('Sign in failed. Redirecting...');
        setTimeout(() => {
          router.replace('/signin' as Href);
        }, 2000);
      }
    };

    handleOAuthCallback();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-background-0">
      <VStack className="flex-1 items-center justify-center" space="md">
        <Loader2 size={48} color="#6366f1" className="animate-spin" />
        <Text size="md" className="text-typography-500">
          {error || 'Completing sign in...'}
        </Text>
      </VStack>
    </SafeAreaView>
  );
}
