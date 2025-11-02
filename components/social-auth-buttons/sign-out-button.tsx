import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
import { supabase } from '@/lib/supabase'

async function onSignOutButtonPress() {
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.error('Error signing out:', error)
  }
}

export default function SignOutButton() {
  return (
    <Button variant="outline" onPress={onSignOutButtonPress}>
      <Text>Sign out</Text>
    </Button>
  )
}
