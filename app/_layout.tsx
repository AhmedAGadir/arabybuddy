import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';

import { useAuthContext } from '@/features/auth';
import { AppProviders } from '@/shared/providers';
import { appFonts } from '@/shared/config';
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
      <Stack.Protected guard={isLoggedIn}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack.Protected>
      <Stack.Protected guard={!isLoggedIn}>
        <Stack.Screen name="login" options={{ headerShown: false }} />
      </Stack.Protected>
      <Stack.Protected guard={!isLoggedIn}>
        <Stack.Screen
          name="modal"
          options={{ presentation: 'modal', title: 'Modal' }}
        />
      </Stack.Protected>
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
