// Base file for TypeScript - platform-specific implementations are in:
// - apple-sign-in-button.ios.tsx
// - apple-sign-in-button.android.tsx
// - apple-sign-in-button.web.tsx

import { View, Text } from 'react-native';

// Fallback component (should never be rendered as platform files take precedence)
export default function AppleSignInButton() {
  return (
    <View>
      <Text>Apple Sign In not available</Text>
    </View>
  );
}
