import { useState } from 'react';
import { Alert } from 'react-native';
import { Pressable, Text } from 'react-native';
import { useAuthContext } from '../hooks/useAuthContext';
import { authService } from '../services/authService';
import { getAuthErrorMessage } from '../services/authErrors';

/**
 * SignOutButton - Signs out the current user
 */
export default function SignOutButton() {
  const { isLoggedIn } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    if (isLoading || !isLoggedIn) return;

    setIsLoading(true);
    try {
      await authService.signOut();
      // Navigation handled by AuthProvider via onAuthStateChange
    } catch (error) {
      Alert.alert('Sign Out Failed', getAuthErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Pressable onPress={handleSignOut} disabled={!isLoggedIn || isLoading}>
      <Text>{isLoading ? 'Signing out...' : 'Sign out'}</Text>
    </Pressable>
  );
}
