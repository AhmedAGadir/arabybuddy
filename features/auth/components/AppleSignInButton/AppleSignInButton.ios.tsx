import React, { useState } from 'react';
import { Alert } from 'react-native';
import { AuthButton, AppleLogo } from '../AuthButton';
import { oauthService } from '../../services/oauthService.native';
import { getAuthErrorMessage, AuthError } from '../../services/authErrors';

/**
 * AppleSignInButton (iOS) - Uses native Apple Sign In via expo-apple-authentication
 */
export default function AppleSignInButton(): React.JSX.Element {
  const [isLoading, setIsLoading] = useState(false);

  const handlePress = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      await oauthService.signInWithApple();
      // Navigation handled by AuthProvider via onAuthStateChange
    } catch (error) {
      // Don't show alert for user cancellation
      if (error instanceof AuthError && error.code === 'CANCELLED') {
        return;
      }
      Alert.alert('Sign In Failed', getAuthErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthButton
      onPress={handlePress}
      icon={<AppleLogo size={20} color="#000000" />}
      label="Sign in with Apple"
      isLoading={isLoading}
    />
  );
}
