import { supabase } from '@/shared/lib/supabase';
import { Button, ButtonText, ButtonIcon } from '@/components/ui/button';
import { Apple } from 'lucide-react-native';

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
    <Button
      size="lg"
      onPress={onAppleButtonPress}
      className="w-full bg-typography-950 data-[hover=true]:bg-typography-900 data-[active=true]:bg-typography-800"
    >
      <ButtonIcon as={Apple} className="text-typography-0" />
      <ButtonText className="text-typography-0">Sign in with Apple</ButtonText>
    </Button>
  );
}

