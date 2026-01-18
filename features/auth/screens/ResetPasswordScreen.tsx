import React, { useState, useEffect } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, router, useLocalSearchParams, Href } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, XCircle, CheckCircle } from 'lucide-react-native';

import { VStack } from '@/components/ui/vstack';
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
import { Button, ButtonText, ButtonSpinner } from '@/components/ui/button';

import { PasswordInput } from '../components/PasswordInput';
import { PasswordStrengthMeter } from '../components/PasswordStrengthMeter';
import { authService } from '../services/authService';
import { getAuthErrorMessage } from '../services/authErrors';
import {
  createPasswordSchema,
  type CreatePasswordInput,
} from '../validation/authSchemas';

type State = 'loading' | 'invalidLink' | 'form' | 'success';

/**
 * ResetPasswordScreen - Set new password after clicking reset link
 */
export default function ResetPasswordScreen(): React.JSX.Element {
  const [state, setState] = useState<State>('loading');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const params = useLocalSearchParams();

  const form = useForm<CreatePasswordInput>({
    resolver: zodResolver(createPasswordSchema),
    defaultValues: { password: '', confirmPassword: '' },
  });

  const passwordValue = form.watch('password');

  useEffect(() => {
    const handleTokenExchange = async () => {
      try {
        const accessToken = params.access_token as string | undefined;
        const refreshToken = params.refresh_token as string | undefined;

        if (accessToken && refreshToken) {
          await authService.setSession(accessToken, refreshToken);
        }

        const session = await authService.getSession();
        if (session) {
          setState('form');
        } else {
          setState('invalidLink');
        }
      } catch (error) {
        Alert.alert('Error', getAuthErrorMessage(error), [
          { text: 'OK', onPress: () => router.replace('/signin' as Href) },
        ]);
        setState('invalidLink');
      }
    };

    handleTokenExchange();
  }, [params.access_token, params.refresh_token]);

  const handleUpdatePassword = async (data: CreatePasswordInput) => {
    setIsSubmitting(true);
    try {
      await authService.updatePassword(data.password);
      setState('success');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to update password.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading State
  if (state === 'loading') {
    return (
      <>
        <Stack.Screen options={{ headerShown: false }} />
        <SafeAreaView className="flex-1 bg-background-0">
          <VStack className="flex-1 items-center justify-center" space="md">
            <Loader2 size={48} color="#6366f1" />
            <Text size="md" className="text-typography-500">
              Verifying link...
            </Text>
          </VStack>
        </SafeAreaView>
      </>
    );
  }

  // Invalid Link State
  if (state === 'invalidLink') {
    return (
      <>
        <Stack.Screen options={{ headerShown: false }} />
        <SafeAreaView className="flex-1 bg-background-0">
          <VStack className="flex-1 items-center justify-center px-6" space="xl">
            <XCircle size={96} color="#ef4444" />
            <Heading size="2xl" className="text-typography-900 text-center">
              Link expired
            </Heading>
            <Text size="md" className="text-typography-500 text-center max-w-sm">
              This reset link is no longer valid. Please request a new password reset.
            </Text>
            <Button
              size="xl"
              action="primary"
              onPress={() => router.replace('/signin' as Href)}
              className="w-full max-w-sm rounded-lg"
            >
              <ButtonText>Back to Sign In</ButtonText>
            </Button>
          </VStack>
        </SafeAreaView>
      </>
    );
  }

  // Success State
  if (state === 'success') {
    return (
      <>
        <Stack.Screen options={{ headerShown: false }} />
        <SafeAreaView className="flex-1 bg-background-0">
          <VStack className="flex-1 items-center justify-center px-6" space="xl">
            <CheckCircle size={96} color="#22c55e" />
            <Heading size="2xl" className="text-typography-900 text-center">
              Password updated
            </Heading>
            <Text size="md" className="text-typography-500 text-center max-w-sm">
              Your password has been successfully reset. You can now sign in with your new password.
            </Text>
            <Button
              size="xl"
              action="primary"
              onPress={() => router.replace('/signin' as Href)}
              className="w-full max-w-sm rounded-lg"
            >
              <ButtonText>Sign In</ButtonText>
            </Button>
          </VStack>
        </SafeAreaView>
      </>
    );
  }

  // Form State
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
              {/* Placeholder Image */}
              <Box className="w-48 h-48 bg-background-100 rounded-2xl items-center justify-center border border-background-200">
                <Text className="text-typography-400">Placeholder Image</Text>
              </Box>

              {/* Header */}
              <VStack className="items-center" space="sm">
                <Heading size="2xl" className="text-typography-900 text-center">
                  Create a New Password!
                </Heading>
                <Text size="md" className="text-typography-500 text-center max-w-sm">
                  Set a new password to regain access to your account!
                </Text>
              </VStack>

              {/* Form */}
              <VStack className="w-full max-w-sm" space="lg">
                <FormControl isInvalid={!!form.formState.errors.password} className="w-full">
                  <FormControlLabel>
                    <FormControlLabelText>New Password</FormControlLabelText>
                  </FormControlLabel>
                  <Controller
                    control={form.control}
                    name="password"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <PasswordInput
                        placeholder="Enter new password"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        editable={!isSubmitting}
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

                <FormControl isInvalid={!!form.formState.errors.confirmPassword} className="w-full">
                  <FormControlLabel>
                    <FormControlLabelText>Confirm Password</FormControlLabelText>
                  </FormControlLabel>
                  <Controller
                    control={form.control}
                    name="confirmPassword"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <PasswordInput
                        placeholder="Confirm new password"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        editable={!isSubmitting}
                      />
                    )}
                  />
                  {form.formState.errors.confirmPassword && (
                    <FormControlError>
                      <FormControlErrorText>
                        {form.formState.errors.confirmPassword.message}
                      </FormControlErrorText>
                    </FormControlError>
                  )}
                </FormControl>

                {/* Password Strength Meter */}
                <PasswordStrengthMeter password={passwordValue} />

                <Button
                  size="xl"
                  action="primary"
                  onPress={form.handleSubmit(handleUpdatePassword)}
                  isDisabled={isSubmitting}
                  className="w-full rounded-lg"
                >
                  {isSubmitting && <ButtonSpinner />}
                  <ButtonText>
                    {isSubmitting ? 'Updating...' : 'Create New Password'}
                  </ButtonText>
                </Button>
              </VStack>
            </VStack>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}
