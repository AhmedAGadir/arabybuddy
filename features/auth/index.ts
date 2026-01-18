// Screens
export { default as WelcomeScreen } from './screens/WelcomeScreen';
export { default as SignUpScreen } from './screens/SignUpScreen';
export { default as SignInScreen } from './screens/SignInScreen';
export { default as ForgotPasswordScreen } from './screens/ForgotPasswordScreen';
export { default as ResetPasswordScreen } from './screens/ResetPasswordScreen';
export { default as AuthCallbackScreen } from './screens/AuthCallbackScreen';

// Components - Social Auth
export { AppleSignInButton } from './components/AppleSignInButton';
export { GoogleSignInButton } from './components/GoogleSignInButton';
export { default as SignOutButton } from './components/SignOutButton';

// Components - Auth UI
export { AuthCarousel, type CarouselItem } from './components/AuthCarousel';
export { AuthButton, GoogleLogo, AppleLogo } from './components/AuthButton';
export { ProgressBar } from './components/ProgressBar';
export { PasswordInput } from './components/PasswordInput';
export { PasswordStrengthMeter } from './components/PasswordStrengthMeter';
export { AuthLink } from './components/AuthLink';

// Hooks
export { useAuthContext, AuthContext, type AuthData } from './hooks/useAuthContext';

// Services
export { authService } from './services/authService';
export {
  AuthError,
  getAuthErrorMessage,
  type AuthErrorCode,
} from './services/authErrors';

// Providers
export { default as AuthProvider } from './providers/AuthProvider';

// Validation
export {
  signUpSchema,
  signInSchema,
  emailOnlySchema,
  createPasswordSchema,
  resetPasswordSchema,
  updatePasswordSchema,
  type SignUpInput,
  type SignInInput,
  type EmailOnlyInput,
  type CreatePasswordInput,
  type ResetPasswordInput,
  type UpdatePasswordInput,
} from './validation/authSchemas';
