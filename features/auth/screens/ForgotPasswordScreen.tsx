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
import { ArrowLeft } from 'lucide-react-native';

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

import { authService } from '../services/authService';
import {
  resetPasswordSchema,
  type ResetPasswordInput,
} from '../validation/authSchemas';

type Step = 'request' | 'confirmation';

/**
 * ForgotPasswordScreen - Password reset request flow
 */
export default function ForgotPasswordScreen(): React.JSX.Element {
  const [step, setStep] = useState<Step>('request');
  const [isLoading, setIsLoading] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');

  const form = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { email: '' },
  });

  const handleResetPassword = async (data: ResetPasswordInput) => {
    setIsLoading(true);
    try {
      await authService.resetPassword(data.email);
      setSubmittedEmail(data.email);
      setStep('confirmation');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to send reset email.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendEmail = async () => {
    setIsLoading(true);
    try {
      await authService.resetPassword(submittedEmail);
      Alert.alert('Email Sent', 'We\'ve resent the password reset link to your inbox.');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to resend email.');
    } finally {
      setIsLoading(false);
    }
  };

  // Step 1: Request
  if (step === 'request') {
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
                <Pressable onPress={() => router.back()} className="self-start p-2 -m-2">
                  <ArrowLeft size={24} color="#6b7280" />
                </Pressable>

                {/* Content */}
                <VStack className="flex-1 items-center justify-center" space="xl">
                  {/* Placeholder Image */}
                  <Box className="w-48 h-48 bg-background-100 rounded-2xl items-center justify-center border border-background-200">
                    <Text className="text-typography-400">Placeholder Image</Text>
                  </Box>

                  {/* Header */}
                  <VStack className="items-center" space="sm">
                    <Heading size="2xl" className="text-typography-900 text-center">
                      Forgot Your Password?
                    </Heading>
                    <Text size="md" className="text-typography-500 text-center max-w-sm">
                      No worries! Enter your email and we'll send you a link to reset your password.
                    </Text>
                  </VStack>

                  {/* Form */}
                  <VStack className="w-full max-w-sm" space="lg">
                    <FormControl isInvalid={!!form.formState.errors.email} className="w-full">
                      <FormControlLabel>
                        <FormControlLabelText>Email</FormControlLabelText>
                      </FormControlLabel>
                      <Controller
                        control={form.control}
                        name="email"
                        render={({ field: { onChange, onBlur, value } }) => (
                          <Input size="lg" variant="outline" className="rounded-full w-full">
                            <InputField
                              placeholder="Enter your email"
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

                    <Button
                      size="xl"
                      action="primary"
                      onPress={form.handleSubmit(handleResetPassword)}
                      isDisabled={isLoading}
                      className="w-full rounded-full"
                    >
                      {isLoading && <ButtonSpinner />}
                      <ButtonText>
                        {isLoading ? 'Sending...' : 'Send Reset Link'}
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

  // Step 2: Confirmation
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView className="flex-1 bg-background-0">
        <VStack className="flex-1 items-center justify-center px-6" space="xl">
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
              We've sent a password reset link to your inbox! Click the link to reset your password and get back to your account!
            </Text>
          </VStack>

          {/* Action Button */}
          <Button
            size="xl"
            action="primary"
            onPress={() => router.push('/signin' as Href)}
            className="w-full max-w-sm rounded-full"
          >
            <ButtonText>Go Back to Log In</ButtonText>
          </Button>

          {/* Resend Link */}
          <HStack className="items-center" space="xs">
            <Text size="sm" className="text-typography-500">
              Didn't receive the email?
            </Text>
            <Pressable onPress={handleResendEmail} disabled={isLoading}>
              <Text size="sm" className="text-primary-600 font-medium">
                {isLoading ? 'Sending...' : 'Resend'}
              </Text>
            </Pressable>
          </HStack>
        </VStack>
      </SafeAreaView>
    </>
  );
}
