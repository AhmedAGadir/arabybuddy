import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, router, Href } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronLeft, Mail } from 'lucide-react-native';
import { Image } from 'expo-image';

import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Box } from '@/components/ui/box';
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  FormControlError,
  FormControlErrorText,
} from '@/components/ui/form-control';
import { Input, InputField } from '@/components/ui/input';
import { Button, ButtonText, ButtonSpinner } from '@/components/ui/button';
import { Pressable } from '@/components/ui/pressable';

import { AppleSignInButton } from '../components/AppleSignInButton';
import { GoogleSignInButton } from '../components/GoogleSignInButton';
import { PasswordInput } from '../components/PasswordInput';
import { AuthLink } from '../components/AuthLink';
import { authService } from '../services/authService';
import { signInSchema, type SignInInput } from '../validation/authSchemas';

type Step = 'options' | 'credentials';

/**
 * SignInScreen - Multi-step sign in flow
 */
export default function SignInScreen(): React.JSX.Element {
  const [step, setStep] = useState<Step>('options');
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: '', password: '' },
  });

  const handleSignIn = async (data: SignInInput) => {
    setIsLoading(true);
    try {
      await authService.signIn(data);
      // Navigation happens automatically via auth state change
    } catch (error: any) {
      Alert.alert('Sign In Failed', error.message || 'Please try again');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    setStep('options');
    form.reset();
  };

  // Step 1: Options
  if (step === 'options') {
    return (
      <>
        <Stack.Screen options={{ headerShown: false }} />
        <SafeAreaView className="flex-1 bg-background-0">
          <ScrollView
            className="flex-1"
            contentContainerStyle={{ flexGrow: 1 }}
          >
            <VStack className="flex-1 items-center justify-center px-6 py-8" space="xl">
              {/* Branding Header */}
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

              {/* Placeholder Image */}
              <Box className="w-48 h-48 bg-background-100 rounded-2xl items-center justify-center border border-background-200">
                <Text className="text-typography-400">Placeholder Image</Text>
              </Box>

              {/* Header */}
              <VStack className="items-center" space="sm">
                <Heading size="xl" className="text-typography-900 text-center">
                  Welcome Back
                </Heading>
                <Text size="md" className="text-typography-500 text-center">
                  Sign in to continue your Arabic learning journey
                </Text>
              </VStack>

              {/* Auth Buttons */}
              <VStack className="w-full max-w-sm" space="md">
                {/* Email Button */}
                <Button
                  size="xl"
                  action="primary"
                  onPress={() => setStep('credentials')}
                  className="w-full rounded-full"
                >
                  <Mail size={20} color="white" />
                  <ButtonText>Sign In with Email</ButtonText>
                </Button>

                {/* Divider */}
                <HStack className="items-center w-full" space="md">
                  <Box className="flex-1 h-px bg-outline-200" />
                  <Text size="sm" className="text-typography-400">or</Text>
                  <Box className="flex-1 h-px bg-outline-200" />
                </HStack>

                {/* OAuth Buttons */}
                <AppleSignInButton />
                <GoogleSignInButton />
              </VStack>

              {/* Auth Link */}
              <AuthLink
                prefix="Don't have an account?"
                linkText="Sign up"
                href={'/signup' as Href}
              />
            </VStack>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }

  // Step 2: Credentials
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView className="flex-1 bg-background-0">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1"
        >
          <ScrollView
            className="flex-1"
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
          >
            <VStack className="flex-1 px-6 py-8" space="xl">
              {/* Back Button */}
              <Pressable onPress={handleBack} className="self-start">
                <HStack className="items-center" space="xs">
                  <ChevronLeft size={20} color="#6b7280" />
                  <Text size="md" className="text-typography-500">
                    Back
                  </Text>
                </HStack>
              </Pressable>

              {/* Content */}
              <VStack className="flex-1 justify-center" space="xl">
                {/* Header */}
                <VStack className="items-center" space="sm">
                  <Heading size="2xl" className="text-typography-900 text-center">
                    Welcome back
                  </Heading>
                  <Text size="md" className="text-typography-500 text-center">
                    Enter your email and password to login
                  </Text>
                </VStack>

                {/* Form */}
                <VStack className="w-full max-w-sm self-center" space="lg">
                  <FormControl isInvalid={!!form.formState.errors.email} className="w-full">
                    <FormControlLabel>
                      <FormControlLabelText>Email</FormControlLabelText>
                    </FormControlLabel>
                    <Controller
                      control={form.control}
                      name="email"
                      render={({ field: { onChange, onBlur, value } }) => (
                        <Input size="lg" variant="outline" className="rounded-lg w-full">
                          <InputField
                            placeholder="you@example.com"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoComplete="email"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            editable={!isLoading}
                          />
                        </Input>
                      )}
                    />
                    {form.formState.errors.email && (
                      <FormControlError>
                        <FormControlErrorText>
                          {form.formState.errors.email.message}
                        </FormControlErrorText>
                      </FormControlError>
                    )}
                  </FormControl>

                  <FormControl isInvalid={!!form.formState.errors.password} className="w-full">
                    <FormControlLabel>
                      <FormControlLabelText>Password</FormControlLabelText>
                    </FormControlLabel>
                    <Controller
                      control={form.control}
                      name="password"
                      render={({ field: { onChange, onBlur, value } }) => (
                        <PasswordInput
                          placeholder="Enter password"
                          value={value}
                          onChangeText={onChange}
                          onBlur={onBlur}
                          editable={!isLoading}
                          autoComplete="current-password"
                        />
                      )}
                    />
                    {form.formState.errors.password && (
                      <FormControlError>
                        <FormControlErrorText>
                          {form.formState.errors.password.message}
                        </FormControlErrorText>
                      </FormControlError>
                    )}
                  </FormControl>

                  <Button
                    size="xl"
                    action="primary"
                    onPress={form.handleSubmit(handleSignIn)}
                    isDisabled={isLoading}
                    className="w-full rounded-lg"
                  >
                    {isLoading && <ButtonSpinner />}
                    <ButtonText>
                      {isLoading ? 'Signing in...' : 'Log in'}
                    </ButtonText>
                  </Button>

                  {/* Forgot Password Link */}
                  <Pressable
                    onPress={() => router.push('/forgot-password' as Href)}
                    className="self-center"
                  >
                    <Text size="sm" className="text-primary-600">
                      Forgot password?
                    </Text>
                  </Pressable>
                </VStack>

                {/* Sign Up Link */}
                <AuthLink
                  prefix="Don't have an account yet?"
                  linkText="Sign up"
                  href={'/signup' as Href}
                />
              </VStack>
            </VStack>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}
