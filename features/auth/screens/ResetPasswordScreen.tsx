import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { authService } from '../services/authService';
import { supabase } from '@/shared/lib/supabase';
import {
  updatePasswordSchema,
  type UpdatePasswordInput,
} from '../validation/authSchemas';

export default function ResetPasswordScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isValidSession, setIsValidSession] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  const params = useLocalSearchParams();

  const form = useForm<UpdatePasswordInput>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: { password: '', confirmPassword: '' },
  });

  useEffect(() => {
    const handleTokenExchange = async () => {
      try {
        const accessToken = params.access_token as string | undefined;
        const refreshToken = params.refresh_token as string | undefined;

        if (accessToken && refreshToken) {
          const { error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });
          if (error) throw error;
        }

        const session = await authService.getSession();
        if (session) {
          setIsValidSession(true);
        } else {
          Alert.alert('Link Expired', 'Please request a new one.', [
            { text: 'OK', onPress: () => router.replace('/login') },
          ]);
        }
      } catch (error: any) {
        Alert.alert('Error', error.message, [
          { text: 'OK', onPress: () => router.replace('/login') },
        ]);
      } finally {
        setIsCheckingSession(false);
      }
    };

    handleTokenExchange();
  }, [params.access_token, params.refresh_token]);

  const handleUpdatePassword = async (data: UpdatePasswordInput) => {
    setIsLoading(true);
    try {
      await authService.updatePassword(data.password);
      setIsSuccess(true);
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to update password.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isCheckingSession) {
    return (
      <>
        <Stack.Screen options={{ headerShown: false }} />
        <View>
          <ActivityIndicator size="large" />
          <Text>Verifying link...</Text>
        </View>
      </>
    );
  }

  if (!isValidSession) {
    return (
      <>
        <Stack.Screen options={{ headerShown: false }} />
        <View>
          <Text>Link expired</Text>
          <Pressable onPress={() => router.replace('/login')}>
            <Text>Back to Sign In</Text>
          </Pressable>
        </View>
      </>
    );
  }

  if (isSuccess) {
    return (
      <>
        <Stack.Screen options={{ headerShown: false }} />
        <View>
          <Text>Password updated</Text>
          <Pressable onPress={() => router.replace('/login')}>
            <Text>Sign In</Text>
          </Pressable>
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View>
        <Text>Set new password</Text>

        <Controller
          control={form.control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <View>
              <Text>New password</Text>
              <TextInput
                placeholder="Enter new password"
                secureTextEntry
                autoCapitalize="none"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
              {form.formState.errors.password && (
                <Text>{form.formState.errors.password?.message}</Text>
              )}
            </View>
          )}
        />

        <Controller
          control={form.control}
          name="confirmPassword"
          render={({ field: { onChange, onBlur, value } }) => (
            <View>
              <Text>Confirm password</Text>
              <TextInput
                placeholder="Confirm new password"
                secureTextEntry
                autoCapitalize="none"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
              {form.formState.errors.confirmPassword && (
                <Text>{form.formState.errors.confirmPassword?.message}</Text>
              )}
            </View>
          )}
        />

        <Pressable
          onPress={form.handleSubmit(handleUpdatePassword)}
          disabled={isLoading}
        >
          {isLoading && <ActivityIndicator />}
          <Text>{isLoading ? 'Updating...' : 'Reset password'}</Text>
        </Pressable>
      </View>
    </>
  );
}

