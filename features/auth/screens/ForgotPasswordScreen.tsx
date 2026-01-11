import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Stack, router } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

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
        <View>
          <Text>Check your email</Text>
          <Text>We sent a reset link to {form.getValues('email')}</Text>
          <Pressable onPress={() => router.back()}>
            <Text>Back to Sign In</Text>
          </Pressable>
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View>
        <Pressable onPress={() => router.back()}>
          <Text>Back</Text>
        </Pressable>

        <Text>Forgot password?</Text>

        <Controller
          control={form.control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <View>
              <Text>Email</Text>
              <TextInput
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
              {form.formState.errors.email && (
                <Text>{form.formState.errors.email?.message}</Text>
              )}
            </View>
          )}
        />

        <Pressable
          onPress={form.handleSubmit(handleResetPassword)}
          disabled={isLoading}
        >
          {isLoading && <ActivityIndicator />}
          <Text>{isLoading ? 'Sending...' : 'Reset password'}</Text>
        </Pressable>
      </View>
    </>
  );
}

