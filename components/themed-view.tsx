import { View, type ViewProps } from 'react-native';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({ style, className, ...otherProps }: ThemedViewProps & { className?: string }) {
  return <View className={className || 'bg-background'} style={style} {...otherProps} />;
}

