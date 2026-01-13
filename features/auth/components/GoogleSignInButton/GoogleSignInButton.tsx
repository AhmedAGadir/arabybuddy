import {
  GoogleSignin,
  GoogleSigninButton,
  isSuccessResponse,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { supabase } from '@/shared/lib/supabase';
import { View } from 'react-native';

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
  iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
});

export default function GoogleSignInButton() {
  return (
    <View style={{ width: '100%', height: 48, overflow: 'hidden' }}>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        style={{ width: '100%', height: 48 }}
        onPress={async () => {
          try {
            await GoogleSignin.hasPlayServices();
            const response = await GoogleSignin.signIn();
            if (isSuccessResponse(response)) {
              const { data, error } = await supabase.auth.signInWithIdToken({
                provider: 'google',
                token: response.data.idToken!,
              });

              if (error) {
                console.error('Supabase auth error:', error);
              } else {
                console.log('Google sign in successful:', data);
              }
            }
          } catch (error: any) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
              console.log('User cancelled the sign-in flow');
            } else if (error.code === statusCodes.IN_PROGRESS) {
              console.log('Sign in is in progress');
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
              console.error('Play services not available or outdated');
            } else {
              console.error('Google sign in error:', error);
            }
          }
        }}
      />
    </View>
  );
}

