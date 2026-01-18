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
import { ArrowLeft, Mail } from 'lucide-react-native';
import { Image } from 'expo-image';

import { VStack } from '@/shared/components/ui/vstack';
import { HStack } from '@/shared/components/ui/hstack';
import { Heading } from '@/shared/components/ui/heading';
import { Text } from '@/shared/components/ui/text';
import { Box } from '@/shared/components/ui/box';
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  FormControlError,
  FormControlErrorText,
} from '@/shared/components/ui/form-control';
import { Input, InputField } from '@/shared/components/ui/input';
import { Button, ButtonText, ButtonSpinner } from '@/shared/components/ui/button';
import { Pressable } from '@/shared/components/ui/pressable';

import { AppleSignInButton } from '../components/AppleSignInButton';
import { GoogleSignInButton } from '../components/GoogleSignInButton';
import { ProgressBar } from '../components/ProgressBar';
import { PasswordInput } from '../components/PasswordInput';
import { PasswordStrengthMeter } from '../components/PasswordStrengthMeter';
import { AuthLink } from '../components/AuthLink';
import { authService } from '../services/authService';
import {
  emailOnlySchema,
  createPasswordSchema,
  type EmailOnlyInput,
  type CreatePasswordInput,
} from '../validation/authSchemas';

type Step = 'options' | 'email' | 'password' | 'checkEmail';

/**
 * SignUpScreen - Multi-step sign up flow
 */
export default function SignUpScreen(): React.JSX.Element {
  const [step, setStep] = useState<Step>('options');
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');

  const emailForm = useForm<EmailOnlyInput>({
    resolver: zodResolver(emailOnlySchema),
    defaultValues: { email: '' },
  });

  const passwordForm = useForm<CreatePasswordInput>({
    resolver: zodResolver(createPasswordSchema),
    defaultValues: { password: '', confirmPassword: '' },
  });

  const handleEmailSubmit = async (data: EmailOnlyInput) => {
    setEmail(data.email);
    setStep('password');
  };

  const handlePasswordSubmit = async (data: CreatePasswordInput) => {
    setIsLoading(true);
    try {
      await authService.signUp({ email, password: data.password });
      setStep('checkEmail');
    } catch (error: any) {
      Alert.alert('Sign Up Failed', error.message || 'Please try again');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (step === 'email') {
      setStep('options');
    } else if (step === 'password') {
      setStep('email');
    }
  };

  const getStepNumber = (): number => {
    switch (step) {
      case 'email':
        return 1;
      case 'password':
        return 2;
      case 'checkEmail':
        return 3;
      default:
        return 0;
    }
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
                  Create an account
                </Heading>
                <Text size="md" className="text-typography-500 text-center">
                  Start your Arabic learning journey today
                </Text>
              </VStack>

              {/* Auth Buttons */}
              <VStack className="w-full max-w-sm" space="md">
                {/* Email Button */}
                <Button
                  size="xl"
                  action="primary"
                  onPress={() => setStep('email')}
                  className="w-full rounded-full"
                >
                  <Mail size={20} color="white" />
                  <ButtonText>Sign in with Email</ButtonText>
                </Button>

                {/* Divider */}
                <HStack className="items-center w-full" space="md">
                  <Box className="flex-1 h-px bg-outline-200" />
                  <Text size="sm" className="text-typography-400">or</Text>
                  <Box className="flex-1 h-px bg-outline-200" />
                </HStack>

                {/* OAuth Buttons */}
                <AppleSignInButton variant="signup" />
                <GoogleSignInButton variant="signup" />
              </VStack>

              {/* Auth Link */}
              <AuthLink
                prefix="Already have an account?"
                linkText="Log in"
                href={'/signin' as Href}
              />
            </VStack>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }

  // Step 2: Email
  if (step === 'email') {
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
                <Pressable onPress={handleBack} className="self-start p-2 -m-2">
                  <ArrowLeft size={24} color="#6b7280" />
                </Pressable>

                {/* Progress Bar */}
                <ProgressBar currentStep={1} totalSteps={3} />

                {/* Content */}
                <VStack className="flex-1 items-center justify-center" space="xl">
                  {/* Placeholder Image */}
                  <Box className="w-40 h-40 bg-background-100 rounded-2xl items-center justify-center border border-background-200">
                    <Text className="text-typography-400 text-sm">Placeholder</Text>
                  </Box>

                  {/* Header */}
                  <VStack className="items-center" space="sm">
                    <Heading size="2xl" className="text-typography-900 text-center">
                      Let's Get You Started!
                    </Heading>
                    <Text size="md" className="text-typography-500 text-center">
                      Enter your email address to create your account
                    </Text>
                  </VStack>

                  {/* Form */}
                  <VStack className="w-full max-w-sm" space="lg">
                    <FormControl isInvalid={!!emailForm.formState.errors.email} className="w-full">
                      <FormControlLabel>
                        <FormControlLabelText>Email</FormControlLabelText>
                      </FormControlLabel>
                      <Controller
                        control={emailForm.control}
                        name="email"
                        render={({ field: { onChange, onBlur, value } }) => (
                          <Input size="lg" variant="outline" className="rounded-full w-full">
                            <InputField
                              placeholder="you@example.com"
                              keyboardType="email-address"
                              autoCapitalize="none"
                              autoComplete="email"
                              onBlur={onBlur}
                              onChangeText={onChange}
                              value={value}
                            />
                          </Input>
                        )}
                      />
                      {emailForm.formState.errors.email && (
                        <FormControlError>
                          <FormControlErrorText>
                            {emailForm.formState.errors.email.message}
                          </FormControlErrorText>
                        </FormControlError>
                      )}
                    </FormControl>

                    <Button
                      size="xl"
                      action="primary"
                      onPress={emailForm.handleSubmit(handleEmailSubmit)}
                      className="w-full rounded-full"
                    >
                      <ButtonText>Confirm Email Address →</ButtonText>
                    </Button>
                  </VStack>
                </VStack>
              </VStack>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </>
    );
  }

  // Step 3: Password
  if (step === 'password') {
    const passwordValue = passwordForm.watch('password');

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
                <Pressable onPress={handleBack} className="self-start p-2 -m-2">
                  <ArrowLeft size={24} color="#6b7280" />
                </Pressable>

                {/* Progress Bar */}
                <ProgressBar currentStep={2} totalSteps={3} />

                {/* Content */}
                <VStack className="flex-1 justify-center" space="xl">
                  {/* Header */}
                  <VStack className="items-center" space="sm">
                    <Heading size="2xl" className="text-typography-900 text-center">
                      Create Password!
                    </Heading>
                    <Text size="md" className="text-typography-500 text-center">
                      Choose a strong password to secure your account
                    </Text>
                  </VStack>

                  {/* Form */}
                  <VStack className="w-full max-w-sm self-center" space="lg">
                    <FormControl isInvalid={!!passwordForm.formState.errors.password} className="w-full">
                      <FormControlLabel>
                        <FormControlLabelText>Password</FormControlLabelText>
                      </FormControlLabel>
                      <Controller
                        control={passwordForm.control}
                        name="password"
                        render={({ field: { onChange, onBlur, value } }) => (
                          <PasswordInput
                            placeholder="Enter password"
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            editable={!isLoading}
                          />
                        )}
                      />
                      {passwordForm.formState.errors.password && (
                        <FormControlError>
                          <FormControlErrorText>
                            {passwordForm.formState.errors.password.message}
                          </FormControlErrorText>
                        </FormControlError>
                      )}
                    </FormControl>

                    <FormControl isInvalid={!!passwordForm.formState.errors.confirmPassword} className="w-full">
                      <FormControlLabel>
                        <FormControlLabelText>Confirm Password</FormControlLabelText>
                      </FormControlLabel>
                      <Controller
                        control={passwordForm.control}
                        name="confirmPassword"
                        render={({ field: { onChange, onBlur, value } }) => (
                          <PasswordInput
                            placeholder="Confirm password"
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            editable={!isLoading}
                          />
                        )}
                      />
                      {passwordForm.formState.errors.confirmPassword && (
                        <FormControlError>
                          <FormControlErrorText>
                            {passwordForm.formState.errors.confirmPassword.message}
                          </FormControlErrorText>
                        </FormControlError>
                      )}
                    </FormControl>

                    {/* Password Strength Meter */}
                    <PasswordStrengthMeter password={passwordValue} />

                    <Button
                      size="xl"
                      action="primary"
                      onPress={passwordForm.handleSubmit(handlePasswordSubmit)}
                      isDisabled={isLoading}
                      className="w-full rounded-full"
                    >
                      {isLoading && <ButtonSpinner />}
                      <ButtonText>
                        {isLoading ? 'Creating Account...' : 'Confirm Password'}
                      </ButtonText>
                    </Button>
                  </VStack>
                </VStack>
              </VStack>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </>
    );
  }

  // Step 4: Check Email
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView className="flex-1 bg-background-0">
        <VStack className="flex-1 px-6 py-8" space="xl">
          {/* Progress Bar */}
          <ProgressBar currentStep={3} totalSteps={3} />

          {/* Content */}
          <VStack className="flex-1 items-center justify-center" space="xl">
            {/* Placeholder Image */}
            <Box className="w-48 h-48 bg-background-100 rounded-2xl items-center justify-center border border-background-200">
              <Text className="text-typography-400">Placeholder Image</Text>
            </Box>

            {/* Header */}
            <VStack className="items-center" space="sm">
              <Heading size="2xl" className="text-typography-900 text-center">
                Check Your Email!
              </Heading>
              <Text size="md" className="text-typography-500 text-center max-w-sm">
                We've sent a confirmation link to {email}. Click the link to verify your account and get started!
              </Text>
            </VStack>

            {/* Action Button */}
            <Button
              size="xl"
              action="secondary"
              variant="outline"
              onPress={() => router.push('/signin' as Href)}
              className="w-full max-w-sm rounded-full"
            >
              <ButtonText>Go to Sign In</ButtonText>
            </Button>
          </VStack>
        </VStack>
      </SafeAreaView>
    </>
  );
}
