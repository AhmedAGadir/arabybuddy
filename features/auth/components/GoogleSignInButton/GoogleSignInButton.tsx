import React, { useState } from 'react';
import { Alert } from 'react-native';
import { AuthButton, GoogleLogo } from '../AuthButton';
import { oauthService } from '../../services/oauthService.native';
import { getAuthErrorMessage } from '../../services/authErrors';

export interface GoogleSignInButtonProps {
  /** "signup" = "Sign in with Google", "signin" = "Continue with Google" */
  variant?: 'signup' | 'signin';
}

/**
 * GoogleSignInButton (Native) - Uses native Google Sign-In SDK
 */
export default function GoogleSignInButton({
  variant = 'signin',
}: GoogleSignInButtonProps): React.JSX.Element {
  const [isLoading, setIsLoading] = useState(false);

  const handlePress = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      await oauthService.signInWithGoogle();
      // Navigation handled by AuthProvider via onAuthStateChange
    } catch (error) {
      Alert.alert('Sign In Failed', getAuthErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  const label = variant === 'signup' ? 'Sign in with Google' : 'Continue with Google';

  return (
    <AuthButton
      onPress={handlePress}
      icon={<GoogleLogo size={20} />}
      label={label}
      isLoading={isLoading}
    />
  );
}
