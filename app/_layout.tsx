import { PortalHost } from '@rn-primitives/portal';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import {
  Tajawal_400Regular,
  Tajawal_500Medium,
  Tajawal_700Bold,
} from '@expo-google-fonts/tajawal';
import { LuckiestGuy_400Regular } from '@expo-google-fonts/luckiest-guy';

import { SplashScreenController } from '@/components/splash-screen-controller';
import { useAuthContext } from '@/hooks/use-auth-context';
import AuthProvider from '@/providers/auth-provider';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/src/lib/query-client';

import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import '@/global.css';

SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

export const unstable_settings = {
  anchor: '(tabs)',
};

function RootNavigator() {
  const { isLoggedIn } = useAuthContext();
  return (
    
    <GluestackUIProvider mode="dark">
      <Stack>
      <Stack.Protected guard={isLoggedIn}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack.Protected>
      <Stack.Protected guard={!isLoggedIn}>
        <Stack.Screen name="login" options={{ headerShown: false }} />
      </Stack.Protected>
      <Stack.Protected guard={!isLoggedIn}>
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack.Protected>
      <Stack.Screen name="+not-found" />
    </Stack>
    </GluestackUIProvider>
  
  );
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    LuckiestGuy: LuckiestGuy_400Regular,
    Poppins: Poppins_400Regular,
    'Poppins-Medium': Poppins_500Medium,
    'Poppins-SemiBold': Poppins_600SemiBold,
    'Poppins-Bold': Poppins_700Bold,
    Tajawal: Tajawal_400Regular,
    'Tajawal-Medium': Tajawal_500Medium,
    'Tajawal-Bold': Tajawal_700Bold,
    DGBebo: require('../assets/fonts/DGBebo-Regular.ttf'),
    'DGBebo-Bold': require('../assets/fonts/DGBebo-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SplashScreenController />
        <RootNavigator />
        <StatusBar style="auto" />
        <PortalHost />
      </AuthProvider>
    </QueryClientProvider>
  );
}
