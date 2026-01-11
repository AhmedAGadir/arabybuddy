import { Pressable, Text } from 'react-native';
import { supabase } from '@/lib/supabase';

async function onAppleButtonPress() {
  const redirectUrl = 'arabybuddy://auth/callback';

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'apple',
    options: {
      redirectTo: redirectUrl,
      skipBrowserRedirect: false,
    },
  });

  if (error) {
    console.error('Sign in error:', error);
  }
}

export default function AppleSignInButton() {
  return (
    <Pressable onPress={onAppleButtonPress}>
      <Text>Sign in with Apple</Text>
    </Pressable>
  );
}
