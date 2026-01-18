import React, { useState } from 'react';
import { Alert } from 'react-native';
import { AuthButton, AppleLogo } from '../AuthButton';
import { authService } from '../../services/authService';
import { getAuthErrorMessage } from '../../services/authErrors';

export interface AppleSignInButtonProps {
  /** "signup" = "Sign in with Apple", "signin" = "Continue with Apple" */
  variant?: 'signup' | 'signin';
}

/**
 * AppleSignInButton (Android) - Uses OAuth redirect flow
 * Apple Sign In is not natively available on Android, so we use the web OAuth flow
 */
export default function AppleSignInButton({
  variant = 'signin',
}: AppleSignInButtonProps): React.JSX.Element {
  const [isLoading, setIsLoading] = useState(false);

  const handlePress = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const redirectUrl = 'arabybuddy://auth/callback';
      await authService.signInWithOAuth('apple', redirectUrl);
      // This will open the browser for OAuth, loading state will persist until redirect
    } catch (error) {
      Alert.alert('Sign In Failed', getAuthErrorMessage(error));
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
