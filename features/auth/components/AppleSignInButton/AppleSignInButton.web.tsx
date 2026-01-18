import React, { useState } from 'react';
import { Alert } from 'react-native';
import { AuthButton, AppleLogo } from '../AuthButton';
import { oauthService } from '../../services/oauthService.web';
import { getAuthErrorMessage } from '../../services/authErrors';

export interface AppleSignInButtonProps {
  /** "signup" = "Sign in with Apple", "signin" = "Continue with Apple" */
  variant?: 'signup' | 'signin';
}

/**
 * AppleSignInButton (Web) - Uses OAuth redirect flow
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
      // This will redirect to Apple's OAuth page, loading state will persist until redirect
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
