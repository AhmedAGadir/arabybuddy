import { Link, Stack } from 'expo-router';
import { VStack } from '@/components/ui/vstack';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Not Found' }} />
      <VStack className="flex-1 items-center justify-center px-5" space="md">
        <Heading size="4xl" className="text-typography-900">
          404
        </Heading>
        <Text size="lg" className="text-typography-500 text-center">
          This page doesn&apos;t exist.
        </Text>
        <Link href="/" asChild>
          <Button size="lg" action="primary" className="mt-4">
            <ButtonText>Go to home</ButtonText>
          </Button>
        </Link>
      </VStack>
    </>
  );
}
