import { useState } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, router } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronLeft, CheckCircle } from 'lucide-react-native';

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

import { authService } from '../services/authService';
import {
  resetPasswordSchema,
  type ResetPasswordInput,
} from '../validation/authSchemas';

export default function ForgotPasswordScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const form = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { email: '' },
  });

  const handleResetPassword = async (data: ResetPasswordInput) => {
    setIsLoading(true);
    try {
      await authService.resetPassword(data.email);
      setEmailSent(true);
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to send reset email.');
    } finally {
      setIsLoading(false);
    }
  };

  if (emailSent) {
    return (
      <>
        <Stack.Screen options={{ headerShown: false }} />
        <SafeAreaView className="flex-1 bg-background-0">
          <VStack className="flex-1 items-center justify-center px-6" space="xl">
            <CheckCircle size={96} color="#22c55e" />
            <Heading size="2xl" className="text-typography-900 text-center">
              Check your email
            </Heading>
            <Text size="md" className="text-typography-500 text-center">
              We sent a reset link to {form.getValues('email')}
            </Text>
            <Button
              action="secondary"
              variant="outline"
              onPress={() => router.back()}
              className="rounded-lg"
            >
              <ButtonText>Back to Sign In</ButtonText>
            </Button>
          </VStack>
        </SafeAreaView>
      </>
    );
  }

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
            <VStack className="flex-1 justify-center px-6 py-8" space="xl">
              {/* Back Button */}
              <Pressable onPress={() => router.back()} className="self-start">
                <HStack className="items-center" space="xs">
                  <ChevronLeft size={20} color="#6b7280" />
                  <Text size="md" className="text-typography-500">
                    Back
                  </Text>
                </HStack>
              </Pressable>

              {/* Header */}
              <VStack space="sm">
                <Heading size="2xl" className="text-typography-900">
                  Forgot password?
                </Heading>
                <Text size="md" className="text-typography-500">
                  Enter your email and we'll send you a link to reset your password
                </Text>
              </VStack>

              {/* Form */}
              <VStack className="w-full max-w-sm" space="lg">
                {/* Email Field */}
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

                {/* Submit Button */}
                <Button
                  size="xl"
                  action="primary"
                  onPress={form.handleSubmit(handleResetPassword)}
                  isDisabled={isLoading}
                  className="w-full rounded-lg"
                >
                  {isLoading && <ButtonSpinner />}
                  <ButtonText>
                    {isLoading ? 'Sending...' : 'Send reset link'}
                  </ButtonText>
                </Button>
              </VStack>

              {/* Footer Text */}
              <Text size="sm" className="text-typography-500 text-center max-w-sm">
                We'll send you an email with a link to reset your password
              </Text>
            </VStack>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}

