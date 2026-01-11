module.exports = {
  preset: 'jest-expo',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@sentry/react-native|native-base|react-native-svg|@rn-primitives/.*|@supabase/.*)',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^@/features/(.*)$': '<rootDir>/features/$1',
    '^@/shared/(.*)$': '<rootDir>/shared/$1',
  },
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.maestro/',
  ],
  collectCoverageFrom: [
    'features/**/*.{ts,tsx}',
    'shared/**/*.{ts,tsx}',
    'app/**/*.{ts,tsx}',
    '!**/*.test.{ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/index.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 80,
      statements: 80,
    },
  },
};
