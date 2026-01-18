import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, Href } from 'expo-router';

import { AuthCarousel, CarouselItem } from '../components/AuthCarousel';

const welcomeItems: CarouselItem[] = [
  {
    id: '1',
    title: 'The Fun Way to Learn Arabic',
    subtitle: 'Your personal Arabic language learning companion. Learn dialects through fun and immersive activities.',
    buttonText: 'Get Started',
    buttonHref: '/signup' as Href,
  },
  {
    id: '2',
    title: 'Learn Real Arabic',
    subtitle: 'Master authentic Arabic dialects spoken by native speakers across the Arab world.',
    buttonText: 'Start Learning',
    buttonHref: '/signup' as Href,
  },
  {
    id: '3',
    title: 'Practice Speaking',
    subtitle: 'Improve your pronunciation with AI-powered speech recognition and instant feedback.',
    buttonText: 'Try It Now',
    buttonHref: '/signup' as Href,
  },
  {
    id: '4',
    title: 'Ready to Begin?',
    subtitle: 'Join thousands of learners on their Arabic language journey. Create your account today!',
    buttonText: "Let's Get Started",
    buttonHref: '/signup' as Href,
  },
];

/**
 * WelcomeScreen - Onboarding carousel for unauthenticated users
 */
export default function WelcomeScreen(): React.JSX.Element {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView className="flex-1 bg-background-0">
        <AuthCarousel
          items={welcomeItems}
          linkPrefix="Already have an account?"
          linkText="Log in"
          linkHref={'/signin' as Href}
        />
      </SafeAreaView>
    </>
  );
}
