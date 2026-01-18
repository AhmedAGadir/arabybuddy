import React from 'react';
import { router, Href } from 'expo-router';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Pressable } from '@/components/ui/pressable';

interface AuthLinkProps {
  /** The prefix text before the link */
  prefix: string;
  /** The clickable link text */
  linkText: string;
  /** The route to navigate to when clicked */
  href: Href;
}

/**
 * AuthLink - Styled text link for auth screens
 * Example: "Already have an account? Log in"
 */
export default function AuthLink({
  prefix,
  linkText,
  href,
}: AuthLinkProps): React.JSX.Element {
  return (
    <HStack className="items-center justify-center" space="xs">
      <Text size="sm" className="text-typography-500">
        {prefix}
      </Text>
      <Pressable onPress={() => router.push(href)}>
        <Text size="sm" className="text-primary-600 font-medium">
          {linkText}
        </Text>
      </Pressable>
    </HStack>
  );
}
