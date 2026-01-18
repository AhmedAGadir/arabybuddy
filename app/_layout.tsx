import { Stack, ErrorBoundaryProps } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';

import { useAuthContext } from '@/features/auth';
import { AppProviders } from '@/shared/providers';
import { appFonts } from '@/shared/config';
import { VStack } from '@/components/ui/vstack';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import '@/global.css';

// Configure splash screen
SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

// Expo Router settings
export const unstable_settings = {
  anchor: '(tabs)',
};

/**
 * AppNavigator - Handles authenticated/unauthenticated routing
 */
function AppNavigator() {
  const { isLoggedIn } = useAuthContext();

  return (
    <Stack>
      {/* Authenticated routes */}
      <Stack.Protected guard={isLoggedIn}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack.Protected>

      {/* Unauthenticated routes */}
      <Stack.Protected guard={!isLoggedIn}>
        <Stack.Screen name="welcome" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false }} />
        <Stack.Screen name="signin" options={{ headerShown: false }} />
        <Stack.Screen name="forgot-password" options={{ headerShown: false }} />
        <Stack.Screen name="reset-password" options={{ headerShown: false }} />
      </Stack.Protected>

      {/* OAuth callback - accessible regardless of auth state */}
      <Stack.Screen name="auth/callback" options={{ headerShown: false }} />

      <Stack.Screen name="+not-found" />
    </Stack>
  );
}

/**
 * RootLayout - App entry point
 */
export default function RootLayout() {
  const [fontsLoaded] = useFonts(appFonts);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AppProviders>
      <AppNavigator />
    </AppProviders>
  );
}

/**
 * ErrorBoundary - Catches unhandled errors in child routes
 */
export function ErrorBoundary({ error, retry }: ErrorBoundaryProps) {
  return (
    <VStack className="flex-1 items-center justify-center px-5" space="lg">
      <Heading size="2xl" className="text-typography-900">
        Something went wrong
      </Heading>
      <Text size="sm" className="text-typography-500 text-center">
        {error.message}
      </Text>
      <Button size="lg" action="primary" onPress={retry}>
        <ButtonText>Try again</ButtonText>
      </Button>
    </VStack>
  );
}
