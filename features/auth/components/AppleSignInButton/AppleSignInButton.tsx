// Base file for TypeScript - platform-specific implementations are in:
// - AppleSignInButton.ios.tsx
// - AppleSignInButton.android.tsx
// - AppleSignInButton.web.tsx

import { View, Text } from 'react-native';

export interface AppleSignInButtonProps {
  /** "signup" = "Sign in with Apple", "signin" = "Continue with Apple" */
  variant?: 'signup' | 'signin';
}

// Fallback component (should never be rendered as platform files take precedence)
export default function AppleSignInButton(_props: AppleSignInButtonProps) {
  return (
    <View>
      <Text>Apple Sign In not available</Text>
    </View>
  );
}

