import type { PropsWithChildren } from 'react';
import { View, ScrollView } from 'react-native';

type Props = PropsWithChildren<{}>;

export default function ParallaxScrollView({ children }: Props) {
  return (
    <ScrollView>
      <View>{children}</View>
    </ScrollView>
  );
}
