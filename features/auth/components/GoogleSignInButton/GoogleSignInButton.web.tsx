import React, { useEffect, useState, useRef } from 'react';
import { View, Alert } from 'react-native';
import { GoogleLogin, GoogleOAuthProvider, CredentialResponse } from '@react-oauth/google';
import { AuthButton, GoogleLogo } from '../AuthButton';
import { oauthService } from '../../services/oauthService.web';
import { getAuthErrorMessage } from '../../services/authErrors';

function GoogleSignInButtonInner(): React.JSX.Element {
  const [nonce, setNonce] = useState('');
  const [hashedNonce, setHashedNonce] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const hiddenButtonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Generate nonce on mount
    oauthService.generateGoogleNonce().then(({ nonce, hashedNonce }) => {
      setNonce(nonce);
      setHashedNonce(hashedNonce);
    });
  }, []);

  const handleGoogleSuccess = async (credential: CredentialResponse) => {
    setIsLoading(true);
    try {
      await oauthService.signInWithGoogleCredential(credential, nonce);
      // Navigation handled by AuthProvider via onAuthStateChange
    } catch (error) {
      Alert.alert('Sign In Failed', getAuthErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleFailure = () => {
    Alert.alert('Sign In Failed', 'Google sign in failed. Please try again.');
  };

  const handleCustomButtonPress = () => {
    if (isLoading) return;

    // Find and click the hidden Google button
    const googleButton = hiddenButtonRef.current?.querySelector(
      '[role="button"]'
    ) as HTMLElement;
    if (googleButton) {
      googleButton.click();
    }
  };

  return (
    <View style={{ width: '100%', position: 'relative' }}>
      {/* Custom styled button */}
      <AuthButton
        onPress={handleCustomButtonPress}
        icon={<GoogleLogo size={20} />}
        label="Sign In with Google"
        isLoading={isLoading}
      />

      {/* Hidden Google Login for OAuth flow */}
      <div
        ref={hiddenButtonRef}
        style={{
          position: 'absolute',
          opacity: 0,
          pointerEvents: 'none',
          width: 1,
          height: 1,
          overflow: 'hidden',
        }}
      >
        <GoogleLogin
          nonce={hashedNonce}
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleFailure}
          useOneTap={false}
          auto_select={false}
        />
      </div>
    </View>
  );
}

export default function GoogleSignInButton(): React.JSX.Element {
  return (
    <GoogleOAuthProvider
      clientId={process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID ?? ''}
    >
      <GoogleSignInButtonInner />
    </GoogleOAuthProvider>
  );
}
