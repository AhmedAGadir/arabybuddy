import React, { useState } from 'react';
import { Alert } from 'react-native';
import { AuthButton, AppleLogo } from '../AuthButton';
import { oauthService } from '../../services/oauthService.native';
import { getAuthErrorMessage, AuthError } from '../../services/authErrors';

export interface AppleSignInButtonProps {
  /** "signup" = "Sign in with Apple", "signin" = "Continue with Apple" */
  variant?: 'signup' | 'signin';
}

/**
 * AppleSignInButton (iOS) - Uses native Apple Sign In via expo-apple-authentication
 */
export default function AppleSignInButton({
  variant = 'signin',
}: AppleSignInButtonProps): React.JSX.Element {
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

  const label = variant === 'signup' ? 'Sign in with Apple' : 'Continue with Apple';

  return (
    <AuthButton
      onPress={handlePress}
      icon={<AppleLogo size={20} color="#000000" />}
      label={label}
      isLoading={isLoading}
    />
  );
}
