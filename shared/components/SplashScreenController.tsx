import { useAuthContext } from '@/features/auth';
import { SplashScreen } from 'expo-router';

SplashScreen.preventAutoHideAsync();

export function SplashScreenController() {
  const { isLoading } = useAuthContext();
  if (!isLoading) {
    SplashScreen.hideAsync();
  }
  return null;
}

