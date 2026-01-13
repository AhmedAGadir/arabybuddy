import { useState } from 'react';
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

import { Image } from 'expo-image';

import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
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
import { authService } from '../services/authService';
import {
  signInSchema,
  signUpSchema,
  type SignInInput,
  type SignUpInput,
} from '../validation/authSchemas';

type AuthMode = 'signin' | 'signup';

export default function LoginScreen() {
  const [mode, setMode] = useState<AuthMode>('signin');
  const [isLoading, setIsLoading] = useState(false);

  const signInForm = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: '', password: '' },
  });

  const signUpForm = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { email: '', password: '' },
  });

  const currentForm = mode === 'signin' ? signInForm : signUpForm;

  const handleSignIn = async (data: SignInInput) => {
    setIsLoading(true);
    try {
      await authService.signIn(data);
    } catch (error: any) {
      Alert.alert('Sign In Failed', error.message || 'Please try again');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (data: SignUpInput) => {
    setIsLoading(true);
    try {
      await authService.signUp(data);
      Alert.alert('Check Your Email', 'We sent you a confirmation link.');
    } catch (error: any) {
      Alert.alert('Sign Up Failed', error.message || 'Please try again');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setMode(mode === 'signin' ? 'signup' : 'signin');
    signInForm.reset();
    signUpForm.reset();
  };

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
            <VStack className="flex-1 items-center justify-center px-6 py-8" space="xl">
              {/* Logo + Branding */}
              <VStack className="items-center" space="sm">
                <Image
                  source={require('@/assets/images/icon.png')}
                  contentFit="cover"
                  style={{ width: 100, height: 100}}
                />
                <Heading size="3xl" className="text-typography-900">
                  ArabyBuddy
                </Heading>
                <Text size="md" className="text-typography-500 text-center">
                  {mode === 'signin'
                    ? 'Welcome back to learning Arabic'
                    : 'Start your Arabic learning journey'}
                </Text>
              </VStack>

              {/* Form Container */}
              <VStack className="w-full max-w-sm" space="lg">
                {/* Email Field */}
                <FormControl isInvalid={!!currentForm.formState.errors.email} className="w-full">
                  <FormControlLabel>
                    <FormControlLabelText>Email</FormControlLabelText>
                  </FormControlLabel>
                  <Controller
                    control={currentForm.control}
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
                  {currentForm.formState.errors.email && (
                    <FormControlError>
                      <FormControlErrorText>
                        {currentForm.formState.errors.email.message}
                      </FormControlErrorText>
                    </FormControlError>
                  )}
                </FormControl>

                {/* Password Field */}
                <FormControl isInvalid={!!currentForm.formState.errors.password} className="w-full">
                  <FormControlLabel>
                    <FormControlLabelText>Password</FormControlLabelText>
                  </FormControlLabel>
                  <Controller
                    control={currentForm.control}
                    name="password"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input size="lg" variant="outline" className="rounded-lg w-full">
                        <InputField
                          placeholder="Enter password"
                          type="password"
                          autoCapitalize="none"
                          autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
                          onBlur={onBlur}
                          onChangeText={onChange}
                          value={value}
                          editable={!isLoading}
                        />
                      </Input>
                    )}
                  />
                  {currentForm.formState.errors.password && (
                    <FormControlError>
                      <FormControlErrorText>
                        {currentForm.formState.errors.password.message}
                      </FormControlErrorText>
                    </FormControlError>
                  )}
                </FormControl>

                {/* Forgot Password Link */}
                {mode === 'signin' && (
                  <Pressable
                    onPress={() => router.push('/forgot-password' as Href)}
                    className="self-start"
                  >
                    <Text size="sm" className="text-primary-600">
                      Forgot password?
                    </Text>
                  </Pressable>
                )}

                {/* Submit Button */}
                <Button
                  size="xl"
                  action="primary"
                  onPress={currentForm.handleSubmit(
                    mode === 'signin' ? handleSignIn : handleSignUp
                  )}
                  isDisabled={isLoading}
                  className="w-full rounded-lg"
                >
                  {isLoading && <ButtonSpinner />}
                  <ButtonText>
                    {isLoading
                      ? 'Please wait...'
                      : mode === 'signin'
                        ? 'Sign In'
                        : 'Create Account'}
                  </ButtonText>
                </Button>
              </VStack>

              {/* Mode Toggle */}
              <HStack className="items-center" space="xs">
                <Text size="sm" className="text-typography-500">
                  {mode === 'signin'
                    ? "Don't have an account?"
                    : 'Already have an account?'}
                </Text>
                <Pressable onPress={toggleMode}>
                  <Text size="sm" className="text-primary-600 font-medium">
                    {mode === 'signin' ? 'Sign Up' : 'Sign In'}
                  </Text>
                </Pressable>
              </HStack>

              {/* Divider */}
              <Text size="sm" className="text-typography-400">
                or
              </Text>

              {/* Social Auth Buttons */}
              <VStack className="w-full max-w-sm" space="md">
                <AppleSignInButton />
                <GoogleSignInButton />
              </VStack>
            </VStack>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}

