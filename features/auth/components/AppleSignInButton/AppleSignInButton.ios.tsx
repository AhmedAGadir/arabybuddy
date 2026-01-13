import { supabase } from '@/shared/lib/supabase';
import * as AppleAuthentication from 'expo-apple-authentication';
import { router, Href } from 'expo-router';

async function onAppleButtonPress() {
  try {
    const credential = await AppleAuthentication.signInAsync({
      requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        AppleAuthentication.AppleAuthenticationScope.EMAIL,
      ],
    });

    console.log('Apple sign in successful:', { appleAuthRequestResponse: credential });

    // Sign in via Supabase Auth
    if (credential.identityToken && credential.authorizationCode) {
      const {
        data: { user },
        error,
      } = await supabase.auth.signInWithIdToken({
        provider: 'apple',
        token: credential.identityToken,
        access_token: credential.authorizationCode,
      });

      console.log(JSON.stringify({ error, user }, null, 2));

      if (error) {
        console.error('Error signing in with Apple in Supabase Auth:', error);
        throw error;
      }

      // Apple only provides the user's full name on the first sign-in
      // Save it to user metadata if available
      if (credential.fullName) {
        const nameParts = [];
        if (credential.fullName.givenName) nameParts.push(credential.fullName.givenName);
        if (credential.fullName.middleName) nameParts.push(credential.fullName.middleName);
        if (credential.fullName.familyName) nameParts.push(credential.fullName.familyName);
        const fullName = nameParts.join(' ');

        await supabase.auth.updateUser({
          data: {
            full_name: fullName,
            given_name: credential.fullName.givenName,
            family_name: credential.fullName.familyName,
          },
        });
      }

      // User is signed in, navigate to the home screen
      console.log('Apple sign in successful:', credential.user);
      router.push('/(tabs)' as Href);
    } else {
      throw new Error('No identity token or authorization code');
    }
  } catch (e: any) {
    if (e.code === 'ERR_REQUEST_CANCELED') {
      console.log('User canceled the sign-in flow');
    } else {
      console.error('Error signing in with Apple:', e);
    }
  }
}

export default function AppleSignInButton() {
  return (
    <AppleAuthentication.AppleAuthenticationButton
      buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
      buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
      cornerRadius={8}
      style={{ width: '100%', height: 48 }}
      onPress={onAppleButtonPress}
    />
  );
}

