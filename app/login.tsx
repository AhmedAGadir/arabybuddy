import AppleSignInButton from '@/components/social-auth-buttons/apple/apple-sign-in-button';
import { View } from 'react-native';
import { Stack } from 'expo-router';

export default function LoginScreen() {
  
  return (
    <>
      <Stack.Screen options={{ title: 'Login' }} />
      <View className="flex-1 items-center justify-center p-5 bg-background">
        <AppleSignInButton />
      </View>
    </> 
  );
}