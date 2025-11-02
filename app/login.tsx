import { Link, Stack } from 'expo-router'

import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'

export default function LoginScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Login' }} />
      <ThemedView className="flex-1 items-center justify-center p-5">
        <ThemedText type="title">Login</ThemedText>
        <Link href="/" className="mt-4 py-4">
          <ThemedText type="link">Try to navigate to home screen!</ThemedText>
        </Link>
      </ThemedView>
    </>
  )
}
