import { useState, useEffect } from 'react';
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
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  FormControlError,
  FormControlErrorText,
} from '@/components/ui/form-control';
import { Input, InputField } from '@/components/ui/input';
import { Button, ButtonText, ButtonSpinner } from '@/components/ui/button';

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
            { text: 'OK', onPress: () => router.replace('/login' as Href) },
          ]);
        }
      } catch (error: any) {
        Alert.alert('Error', error.message, [
          { text: 'OK', onPress: () => router.replace('/login' as Href) },
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
        <SafeAreaView className="flex-1 bg-background-0">
          <VStack className="flex-1 items-center justify-center" space="md">
            <Loader2 size={48} color="#6366f1" className="animate-spin" />
            <Text size="md" className="text-typography-500">
              Verifying link...
            </Text>
          </VStack>
        </SafeAreaView>
      </>
    );
  }

  if (!isValidSession) {
    return (
      <>
        <Stack.Screen options={{ headerShown: false }} />
        <SafeAreaView className="flex-1 bg-background-0">
          <VStack className="flex-1 items-center justify-center px-6" space="xl">
            <XCircle size={96} color="#ef4444" />
            <Heading size="2xl" className="text-typography-900 text-center">
              Link expired
            </Heading>
            <Text size="md" className="text-typography-500 text-center">
              This reset link is no longer valid. Please request a new password reset.
            </Text>
            <Button
              action="primary"
              onPress={() => router.replace('/login' as Href)}
              className="rounded-lg"
            >
              <ButtonText>Back to Sign In</ButtonText>
            </Button>
          </VStack>
        </SafeAreaView>
      </>
    );
  }

  if (isSuccess) {
    return (
      <>
        <Stack.Screen options={{ headerShown: false }} />
        <SafeAreaView className="flex-1 bg-background-0">
          <VStack className="flex-1 items-center justify-center px-6" space="xl">
            <CheckCircle size={96} color="#22c55e" />
            <Heading size="2xl" className="text-typography-900 text-center">
              Password updated
            </Heading>
            <Text size="md" className="text-typography-500 text-center">
              Your password has been successfully reset. You can now sign in with your new password.
            </Text>
            <Button
              action="primary"
              onPress={() => router.replace('/login' as Href)}
              className="rounded-lg"
            >
              <ButtonText>Sign In</ButtonText>
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
              {/* Header */}
              <VStack space="sm">
                <Heading size="2xl" className="text-typography-900">
                  Set new password
                </Heading>
                <Text size="md" className="text-typography-500">
                  Choose a strong password to secure your account
                </Text>
              </VStack>

              {/* Form */}
              <VStack className="w-full max-w-sm" space="lg">
                {/* Password Field */}
                <FormControl isInvalid={!!form.formState.errors.password} className="w-full">
                  <FormControlLabel>
                    <FormControlLabelText>New Password</FormControlLabelText>
                  </FormControlLabel>
                  <Controller
                    control={form.control}
                    name="password"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input size="lg" variant="outline" className="rounded-lg w-full">
                        <InputField
                          placeholder="Enter new password"
                          type="password"
                          autoCapitalize="none"
                          autoComplete="new-password"
                          onBlur={onBlur}
                          onChangeText={onChange}
                          value={value}
                          editable={!isLoading}
                        />
                      </Input>
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

                {/* Confirm Password Field */}
                <FormControl isInvalid={!!form.formState.errors.confirmPassword} className="w-full">
                  <FormControlLabel>
                    <FormControlLabelText>Confirm Password</FormControlLabelText>
                  </FormControlLabel>
                  <Controller
                    control={form.control}
                    name="confirmPassword"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input size="lg" variant="outline" className="rounded-lg w-full">
                        <InputField
                          placeholder="Confirm new password"
                          type="password"
                          autoCapitalize="none"
                          autoComplete="new-password"
                          onBlur={onBlur}
                          onChangeText={onChange}
                          value={value}
                          editable={!isLoading}
                        />
                      </Input>
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

                {/* Submit Button */}
                <Button
                  size="xl"
                  action="primary"
                  onPress={form.handleSubmit(handleUpdatePassword)}
                  isDisabled={isLoading}
                  className="w-full rounded-lg"
                >
                  {isLoading && <ButtonSpinner />}
                  <ButtonText>
                    {isLoading ? 'Updating...' : 'Reset Password'}
                  </ButtonText>
                </Button>
              </VStack>

              {/* Helper Text */}
              <Text size="sm" className="text-typography-500 text-center max-w-sm">
                Password must be at least 8 characters with an uppercase letter and a number
              </Text>
            </VStack>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}

