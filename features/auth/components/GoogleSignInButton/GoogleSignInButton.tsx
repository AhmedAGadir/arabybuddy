import React, { useState } from 'react';
import { Alert } from 'react-native';
import { AuthButton, GoogleLogo } from '../AuthButton';
import { oauthService } from '../../services/oauthService.native';
import { getAuthErrorMessage } from '../../services/authErrors';

/**
 * GoogleSignInButton (Native) - Uses native Google Sign-In SDK
 */
export default function GoogleSignInButton(): React.JSX.Element {
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

  return (
    <AuthButton
      onPress={handlePress}
      icon={<GoogleLogo size={20} />}
      label="Sign In with Google"
      isLoading={isLoading}
    />
  );
}
