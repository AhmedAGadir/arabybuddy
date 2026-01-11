import { Pressable, Text } from 'react-native';
import { useAuthContext } from '@/hooks/use-auth-context';
import { supabase } from '@/lib/supabase';

async function onSignOutButtonPress() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error('Error signing out:', error);
  }
}

export default function SignOutButton() {
  const { isLoggedIn } = useAuthContext();

  return (
    <Pressable onPress={onSignOutButtonPress} disabled={!isLoggedIn}>
      <Text>Sign out</Text>
    </Pressable>
  );
}
