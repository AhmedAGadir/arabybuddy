import { Image } from 'expo-image';
import { Platform, View } from 'react-native';

import { ExternalLink } from '@/components/external-link';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { Collapsible } from '@/components/ui/collapsible';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Text } from '@/components/ui/text';
import { Fonts } from '@/constants/theme';

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: 'hsl(var(--muted))', dark: 'hsl(var(--muted))' }}
      headerImage={
        <IconSymbol
          size={310}
          color="hsl(var(--muted-foreground))"
          name="chevron.left.forwardslash.chevron.right"
          style={{
            color: 'hsl(var(--muted-foreground))',
            bottom: -90,
            left: -35,
            position: 'absolute',
          }}
        />
      }>
      <View className="flex-row gap-2">
        <Text
          className="text-3xl font-bold"
          style={{
            fontFamily: Fonts.rounded,
          }}>
          Explore
        </Text>
      </View>
      <Text>This app includes example code to help you get started.</Text>
      <Collapsible title="File-based routing">
        <Text>
          This app has two screens:{' '}
          <Text variant="small">app/(tabs)/index.tsx</Text> and{' '}
          <Text variant="small">app/(tabs)/explore.tsx</Text>
        </Text>
        <Text>
          The layout file in <Text variant="small">app/(tabs)/_layout.tsx</Text>{' '}
          sets up the tab navigator.
        </Text>
        <ExternalLink href="https://docs.expo.dev/router/introduction">
          <Text className="text-primary">Learn more</Text>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Android, iOS, and web support">
        <Text>
          You can open this project on Android, iOS, and the web. To open the web version, press{' '}
          <Text variant="small">w</Text> in the terminal running this project.
        </Text>
      </Collapsible>
      <Collapsible title="Images">
        <Text>
          For static images, you can use the <Text variant="small">@2x</Text> and{' '}
          <Text variant="small">@3x</Text> suffixes to provide files for
          different screen densities
        </Text>
        <Image
          source={require('@/assets/images/react-logo.png')}
          className="w-[100px] h-[100px] self-center"
        />
        <ExternalLink href="https://reactnative.dev/docs/images">
          <Text className="text-primary">Learn more</Text>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Light and dark mode components">
        <Text>
          This template has light and dark mode support. The{' '}
          <Text variant="small">useColorScheme()</Text> hook lets you inspect
          what the user&apos;s current color scheme is, and so you can adjust UI colors accordingly.
        </Text>
        <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
          <Text className="text-primary">Learn more</Text>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Animations">
        <Text>
          This template includes an example of an animated component. The{' '}
          <Text variant="small">components/HelloWave.tsx</Text> component uses
          the powerful{' '}
          <Text variant="small" style={{ fontFamily: Fonts.mono }}>
            react-native-reanimated
          </Text>{' '}
          library to create a waving hand animation.
        </Text>
        {Platform.select({
          ios: (
            <Text>
              The <Text variant="small">components/ParallaxScrollView.tsx</Text>{' '}
              component provides a parallax effect for the header image.
            </Text>
          ),
        })}
      </Collapsible>
    </ParallaxScrollView>
  );
}
