import { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert, ActivityIndicator } from 'react-native';
import { Stack, router } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import AppleSignInButton from '@/components/social-auth-buttons/apple/apple-sign-in-button';
import GoogleSignInButton from '@/components/social-auth-buttons/google/google-sign-in-button';
import { authService } from '@/src/services/auth-service';
import {
  signInSchema,
  signUpSchema,
  type SignInInput,
  type SignUpInput,
} from '@/src/validation';

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
      <View>
        <Text>ArabyBuddy</Text>
        <Text>{mode === 'signin' ? 'Welcome back' : 'Create account'}</Text>

        <Controller
          control={currentForm.control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <View>
              <Text>Email</Text>
              <TextInput
                placeholder="you@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
              {currentForm.formState.errors.email && (
                <Text>{currentForm.formState.errors.email?.message}</Text>
              )}
            </View>
          )}
        />

        <Controller
          control={currentForm.control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <View>
              <Text>Password</Text>
              <TextInput
                placeholder="Enter password"
                secureTextEntry
                autoCapitalize="none"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
              {currentForm.formState.errors.password && (
                <Text>{currentForm.formState.errors.password?.message}</Text>
              )}
            </View>
          )}
        />

        {mode === 'signin' && (
          <Pressable onPress={() => router.push('/forgot-password')}>
            <Text>Forgot password?</Text>
          </Pressable>
        )}

        <Pressable
          onPress={currentForm.handleSubmit(mode === 'signin' ? handleSignIn : handleSignUp)}
          disabled={isLoading}
        >
          {isLoading && <ActivityIndicator />}
          <Text>{isLoading ? 'Please wait...' : mode === 'signin' ? 'Sign In' : 'Create Account'}</Text>
        </Pressable>

        <Pressable onPress={toggleMode}>
          <Text>
            {mode === 'signin' ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
          </Text>
        </Pressable>

        <Text>or</Text>

        <AppleSignInButton />
        <GoogleSignInButton />
      </View>
    </>
  );
}
