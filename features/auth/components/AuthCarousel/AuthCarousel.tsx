import React, { useState } from 'react';
import { View, useWindowDimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { router, Href } from 'expo-router';
import { Image } from 'expo-image';

import { VStack } from '@/shared/components/ui/vstack';
import { HStack } from '@/shared/components/ui/hstack';
import { Heading } from '@/shared/components/ui/heading';
import { Text } from '@/shared/components/ui/text';
import { Button, ButtonText } from '@/shared/components/ui/button';
import { Box } from '@/shared/components/ui/box';
import { AuthLink } from '../AuthLink';

export interface CarouselItem {
  id: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonHref: Href;
}

interface AuthCarouselProps {
  items: CarouselItem[];
  /** Link prefix text (e.g., "Already have an account?") */
  linkPrefix: string;
  /** Link text (e.g., "Log in") */
  linkText: string;
  /** Link destination */
  linkHref: Href;
}

/**
 * AuthCarousel - Welcome screen carousel with pagination dots
 */
export default function AuthCarousel({
  items,
  linkPrefix,
  linkText,
  linkHref,
}: AuthCarouselProps): React.JSX.Element {
  const { width, height } = useWindowDimensions();
  const [activeIndex, setActiveIndex] = useState(0);

  // Calculate carousel height (screen height minus safe area and pagination)
  const carouselHeight = height - 150;

  const renderItem = ({ item, index }: { item: CarouselItem; index: number }) => (
    <VStack className="flex-1 items-center justify-center px-6" space="xl">
      {/* Branding Header - only on first slide */}
      {index === 0 && (
        <HStack className="items-center" space="sm">
          <Image
            source={require('@/assets/images/icon.png')}
            style={{ width: 40, height: 40 }}
            contentFit="contain"
          />
          <Heading size="2xl" className="text-typography-900">
            ArabyBuddy
          </Heading>
        </HStack>
      )}

      {/* Placeholder Image */}
      <Box className="w-64 h-64 bg-background-100 rounded-2xl items-center justify-center border border-background-200">
        <Text className="text-typography-400">Placeholder Image</Text>
      </Box>

      {/* Content */}
      <VStack className="items-center" space="md">
        <Heading size="2xl" className="text-typography-900 text-center">
          {item.title}
        </Heading>
        <Text size="md" className="text-typography-500 text-center max-w-sm">
          {item.subtitle}
        </Text>
      </VStack>

      {/* CTA Button */}
      <Button
        size="xl"
        action="primary"
        onPress={() => router.push(item.buttonHref)}
        className="w-full max-w-sm rounded-lg"
      >
        <ButtonText>{item.buttonText}</ButtonText>
      </Button>

      {/* Auth Link */}
      <AuthLink prefix={linkPrefix} linkText={linkText} href={linkHref} />
    </VStack>
  );

  return (
    <VStack className="flex-1">
      <View style={{ flex: 1 }}>
        <Carousel
          loop={false}
          width={width}
          height={carouselHeight}
          data={items}
          scrollAnimationDuration={300}
          onSnapToItem={setActiveIndex}
          renderItem={renderItem}
        />
      </View>

      {/* Pagination Dots */}
      <View className="flex-row justify-center items-center pb-8 gap-2">
        {items.map((_, index) => (
          <View
            key={index}
            className={`h-2 rounded-full ${
              index === activeIndex
                ? 'w-6 bg-primary-500'
                : 'w-2 bg-background-300'
            }`}
          />
        ))}
      </View>
    </VStack>
  );
}
