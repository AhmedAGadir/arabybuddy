// Mock expo-secure-store
jest.mock('expo-secure-store', () => ({
  getItemAsync: jest.fn(() => Promise.resolve(null)),
  setItemAsync: jest.fn(() => Promise.resolve()),
  deleteItemAsync: jest.fn(() => Promise.resolve()),
}));

// Mock expo-router
jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  },
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
  useLocalSearchParams: () => ({}),
  useSegments: () => [],
  Stack: {
    Screen: 'Stack.Screen',
    Protected: ({ children }) => children,
  },
}));

// Mock react-native-reanimated
jest.mock('react-native-reanimated', () => {
  return {
    default: {
      call: () => {},
      createAnimatedComponent: (component) => component,
      addWhitelistedUIProps: () => {},
      addWhitelistedNativeProps: () => {},
    },
    useSharedValue: (initialValue) => ({ value: initialValue }),
    useAnimatedStyle: () => ({}),
    withTiming: (value) => value,
    withSpring: (value) => value,
    withSequence: (...values) => values[0],
    withDelay: (_, value) => value,
    Easing: {
      linear: (t) => t,
      ease: (t) => t,
      bezier: () => (t) => t,
    },
    FadeIn: { duration: () => ({ delay: () => ({}) }) },
    FadeOut: { duration: () => ({ delay: () => ({}) }) },
    SlideInRight: { duration: () => ({}) },
    SlideOutLeft: { duration: () => ({}) },
    Layout: {},
    createAnimatedComponent: (component) => component,
  };
});

// Mock nativewind
jest.mock('nativewind', () => ({
  useColorScheme: () => ({
    colorScheme: 'light',
    setColorScheme: jest.fn(),
  }),
}));

// Silence console warnings in tests
const originalWarn = console.warn;
console.warn = (...args) => {
  if (
    typeof args[0] === 'string' &&
    args[0].includes('Animated: `useNativeDriver`')
  ) {
    return;
  }
  originalWarn(...args);
};
