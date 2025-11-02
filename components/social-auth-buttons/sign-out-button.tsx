import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useAuthContext } from '@/hooks/use-auth-context';
import { supabase } from '@/lib/supabase';
import React from 'react';

async function onSignOutButtonPress() {
 const { error } = await supabase.auth.signOut()

 if (error) {
   console.error('Error signing out:', error)
 }
}

export default function SignOutButton() {
  const { isLoggedIn } = useAuthContext();

  return (
    <Button
      size="lg"
      disabled={!isLoggedIn}
      onPress={onSignOutButtonPress}
    >
      <Text>Sign out</Text>
    </Button>
  );
}