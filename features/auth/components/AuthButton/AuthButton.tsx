import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Pressable } from '@/shared/components/ui/pressable';
import { HStack } from '@/shared/components/ui/hstack';
import { Text } from '@/shared/components/ui/text';
import { Box } from '@/shared/components/ui/box';

interface AuthButtonProps {
  onPress: () => void;
  icon: React.ReactNode;
  label: string;
  isDisabled?: boolean;
  isLoading?: boolean;
}

/**
 * AuthButton - Consistent OAuth sign-in button following both Apple and Google branding guidelines
 *
 * Specifications (per Google iOS spec & Apple HIG, scaled proportionally):
 * - Height: 48px (standard touch target)
 * - Border: 1px #747775 (Google spec)
 * - Background: White (#FFFFFF)
 * - Text: #1F1F1F, 16px medium (scaled from 14px base)
 * - Padding: 16px left/right, 12px logo-text gap
 * - Logo: 20x20px (scaled from 18px base)
 * - Shape: Pill (rounded-full)
 *
 * @see https://developers.google.com/identity/branding-guidelines
 * @see https://developer.apple.com/design/human-interface-guidelines/sign-in-with-apple
 */
export default function AuthButton({
  onPress,
  icon,
  label,
  isDisabled = false,
  isLoading = false,
}: AuthButtonProps): React.JSX.Element {
  const disabled = isDisabled || isLoading;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className={`
        w-full h-12 rounded-full
        bg-white justify-center items-center
        active:bg-background-100
        ${disabled ? 'opacity-50' : ''}
      `}
      style={{ borderWidth: 1, borderColor: '#747775' }}
    >
      <HStack className="items-center justify-center px-4" space="md">
        <Box className="w-5 h-5 items-center justify-center">
          {isLoading ? <ActivityIndicator size="small" color="#1F1F1F" /> : icon}
        </Box>
        <Text
          className="text-base font-medium"
          style={{ color: '#1F1F1F' }}
        >
          {label}
        </Text>
      </HStack>
    </Pressable>
  );
}
