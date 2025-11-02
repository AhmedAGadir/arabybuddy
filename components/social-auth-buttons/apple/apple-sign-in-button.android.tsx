import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { supabase } from '@/lib/supabase';

async function onAppleButtonPress() {
  const redirectUrl = 'arabybuddy://auth/callback';

  console.log('Starting OAuth with redirect:', redirectUrl);

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

  console.log('OAuth URL:', data?.url);
}

export default function AppleSignInButton() {
  return (
    <Button className="w-40 h-12" onPress={onAppleButtonPress}>
      <Text className="text-primary-foreground">Sign in with Apple</Text>
    </Button>
  );
}

