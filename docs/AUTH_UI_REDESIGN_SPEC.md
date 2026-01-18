# Auth UI Redesign Spec

## Overview

Update the visual presentation of ArabyBuddy's authentication screens to match the polished UI design from pixelpennies, while maintaining the existing feature-based architecture, auth logic, validation, and testing structure.

**Key Principle:** This is a UI-only redesign. We keep all existing:
- Feature-based architecture (`features/auth/`)
- Auth logic and services
- Validation schemas
- Testing structure
- Route organization

---

## Table of Contents

- [Design Goals](#design-goals)
- [Gluestack Components Needed](#gluestack-components-needed)
- [Screen Specifications](#screen-specifications)
  - [LoginScreen](#1-loginscreen)
  - [ForgotPasswordScreen](#2-forgotpasswordscreen)
  - [ResetPasswordScreen](#3-resetpasswordscreen)
  - [AuthCallbackScreen](#4-authcallbackscreen)
- [Layout Patterns](#layout-patterns)
- [Styling Approach](#styling-approach)
- [Testing Updates](#testing-updates)
- [Implementation Checklist](#implementation-checklist)

---

## Design Goals

1. **Professional polish** - Match pixelpennies' clean, modern UI
2. **Consistent spacing** - Use Gluestack's spacing system
3. **Proper form UX** - Clear labels, error states, loading states
4. **Responsive layout** - Safe areas, keyboard handling, scrollable content
5. **Branded** - Use ArabyBuddy logo (`assets/images/icon.png`)
6. **Accessible** - Proper contrast, touch targets, screen reader support

---

## Gluestack Components Needed

Use the Gluestack MCP to select and generate these components:

### Layout Components
- `VStack` - Vertical stacking with spacing
- `HStack` - Horizontal layouts
- `Box` - Generic container
- `Center` - Centered content

### Form Components
- `FormControl` - Form field wrapper
- `FormControlLabel` - Field labels
- `FormControlLabelText` - Label text
- `FormControlError` - Error container
- `FormControlErrorText` - Error messages
- `FormControlHelper` - Helper text container
- `FormControlHelperText` - Helper text

### Input Components
- `Input` - Input wrapper
- `InputField` - Text input field
- `InputIcon` - Icons in inputs (optional)

### Button Components
- `Button` - Button wrapper
- `ButtonText` - Button label
- `ButtonSpinner` - Loading spinner in button

### Typography
- `Heading` - Headings
- `Text` - Body text

### Image
- `Image` - For logo display

### Feedback
- `Spinner` - Loading indicators

---

## Screen Specifications

### 1. LoginScreen

**Current:** `/Users/ahmed/dev/arabybuddy/features/auth/screens/LoginScreen.tsx`

**Layout Structure:**
```
SafeAreaView (flex-1, bg-background-0)
└─ KeyboardAvoidingView (behavior="padding", flex-1)
   └─ ScrollView (flex-1, contentContainerStyle: flexGrow-1, keyboardShouldPersistTaps="handled")
      └─ VStack (flex-1, items-center, justify-center, px-6, py-8, space="xl")
         ├─ Logo + Branding
         │  ├─ Image (icon.png, w-20, h-20, rounded-full)
         │  ├─ Heading size="3xl" - "ArabyBuddy"
         │  └─ Text size="md" color-typography-500 - mode-specific subtitle
         │
         ├─ Form Container (w-full, max-w-sm, space="lg")
         │  ├─ Email FormControl
         │  │  ├─ FormControlLabel → FormControlLabelText
         │  │  ├─ Controller → Input size="lg" → InputField
         │  │  └─ FormControlError → FormControlErrorText
         │  │
         │  ├─ Password FormControl
         │  │  └─ (same structure)
         │  │
         │  ├─ Forgot Password Link (if signin mode)
         │  │  └─ Pressable → Text size="sm" color-primary-600
         │  │
         │  └─ Submit Button
         │     └─ Button size="xl" action="primary" w-full
         │        ├─ ButtonSpinner (if loading)
         │        └─ ButtonText - "Sign In" / "Create Account"
         │
         ├─ Mode Toggle
         │  └─ HStack (items-center, space="xs")
         │     ├─ Text size="sm" color-typography-500
         │     └─ Pressable → Text size="sm" color-primary-600
         │
         ├─ Divider
         │  └─ Text size="sm" color-typography-400 - "or"
         │
         └─ Social Auth Buttons (w-full, max-w-sm, space="md")
            ├─ AppleSignInButton
            └─ GoogleSignInButton
```

**Visual Details:**
- **Logo:** 80x80px, centered, with subtle shadow
- **Heading:** size="3xl", weight-bold, color-typography-900, mb-2
- **Subtitle:** size="md", color-typography-500, mb-8
  - Sign In: "Welcome back to learning Arabic"
  - Sign Up: "Start your Arabic learning journey"
- **Form fields:** size="lg", variant="outline", rounded-lg
- **Error text:** color-error-700, size="sm"
- **Submit button:** size="xl", rounded-lg, full width
- **Spacing:** Consistent use of space props (md, lg, xl)

**Keep Existing:**
- Dual mode toggle (signin/signup)
- Form state management with react-hook-form
- Validation with Zod schemas
- Auth handlers (handleSignIn, handleSignUp)
- Loading states
- Error handling with Alert.alert

---

### 2. ForgotPasswordScreen

**Current:** `/Users/ahmed/dev/arabybuddy/features/auth/screens/ForgotPasswordScreen.tsx`

**Layout Structure:**

**Main Form View:**
```
SafeAreaView (flex-1, bg-background-0)
└─ KeyboardAvoidingView (behavior="padding", flex-1)
   └─ ScrollView (flex-1, contentContainerStyle: flexGrow-1)
      └─ VStack (flex-1, justify-center, px-6, py-8, space="xl")
         ├─ Back Button
         │  └─ Pressable (self-start) → HStack
         │     ├─ Icon (ChevronLeft)
         │     └─ Text - "Back"
         │
         ├─ Header (mb-8)
         │  ├─ Heading size="2xl" - "Forgot password?"
         │  └─ Text size="md" color-typography-500 - "Enter your email..."
         │
         ├─ Form (w-full, max-w-sm, space="lg")
         │  ├─ Email FormControl
         │  └─ Submit Button
         │     └─ Button size="xl" action="primary" w-full
         │
         └─ Footer Text
            └─ Text size="sm" color-typography-500 - "We'll send reset link"
```

**Success State (emailSent = true):**
```
SafeAreaView (flex-1, bg-background-0)
└─ VStack (flex-1, items-center, justify-center, px-6, space="xl")
   ├─ Success Icon (checkmark circle, size-24, color-success-500)
   ├─ Heading size="2xl" - "Check your email"
   ├─ Text size="md" color-typography-500 text-center
   │  └─ "We sent a reset link to {email}"
   └─ Button variant="outline" action="secondary"
      └─ ButtonText - "Back to Sign In"
```

**Visual Details:**
- Center-aligned success state with icon
- Subtle instruction text
- Large, prominent submit button
- Success confirmation with email display

**Keep Existing:**
- emailSent state toggle
- Form handling with react-hook-form
- Validation with resetPasswordSchema
- handleResetPassword logic
- Error handling
- Navigation with router.back()

---

### 3. ResetPasswordScreen

**Current:** `/Users/ahmed/dev/arabybuddy/features/auth/screens/ResetPasswordScreen.tsx`

**Layout Structure:**

**Loading State (isCheckingSession):**
```
SafeAreaView (flex-1, bg-background-0)
└─ VStack (flex-1, items-center, justify-center, space="md")
   ├─ Spinner size="large" color-primary-500
   └─ Text size="md" color-typography-500 - "Verifying link..."
```

**Invalid Session State:**
```
SafeAreaView (flex-1, bg-background-0)
└─ VStack (flex-1, items-center, justify-center, px-6, space="xl")
   ├─ Error Icon (XCircle, size-24, color-error-500)
   ├─ Heading size="2xl" - "Link expired"
   ├─ Text size="md" color-typography-500 text-center
   │  └─ "This reset link is no longer valid..."
   └─ Button action="primary"
      └─ ButtonText - "Back to Sign In"
```

**Success State (isSuccess):**
```
SafeAreaView (flex-1, bg-background-0)
└─ VStack (flex-1, items-center, justify-center, px-6, space="xl")
   ├─ Success Icon (CheckCircle, size-24, color-success-500)
   ├─ Heading size="2xl" - "Password updated"
   ├─ Text size="md" color-typography-500 text-center
   │  └─ "Your password has been successfully reset"
   └─ Button action="primary"
      └─ ButtonText - "Sign In"
```

**Main Form View:**
```
SafeAreaView (flex-1, bg-background-0)
└─ KeyboardAvoidingView (behavior="padding", flex-1)
   └─ ScrollView (flex-1, contentContainerStyle: flexGrow-1)
      └─ VStack (flex-1, justify-center, px-6, py-8, space="xl")
         ├─ Header
         │  ├─ Heading size="2xl" - "Set new password"
         │  └─ Text size="md" color-typography-500 - "Choose a strong password"
         │
         └─ Form (w-full, max-w-sm, space="lg")
            ├─ Password FormControl
            ├─ Confirm Password FormControl
            ├─ Helper Text (password requirements)
            └─ Submit Button
```

**Visual Details:**
- Multiple states with clear icons (Spinner, XCircle, CheckCircle)
- Centered feedback states
- Password requirements helper text
- Consistent button styling

**Keep Existing:**
- State management (isLoading, isSuccess, isValidSession, isCheckingSession)
- Token exchange logic in useEffect
- Form handling with updatePasswordSchema
- handleUpdatePassword logic
- Session validation
- All navigation logic

---

### 4. AuthCallbackScreen

**Current:** `/Users/ahmed/dev/arabybuddy/features/auth/screens/AuthCallbackScreen.tsx`

**Layout Structure:**
```
SafeAreaView (flex-1, bg-background-0)
└─ VStack (flex-1, items-center, justify-center, space="md")
   ├─ Spinner size="large" color-primary-500
   └─ Text size="md" color-typography-500 - "Completing sign in..."
```

**Visual Details:**
- Simple centered spinner with message
- Matches other loading states

**Keep Existing:**
- All OAuth callback logic
- Platform-specific handling (web vs native)
- PKCE flow and implicit flow
- Auth state change subscription
- Session checking
- Navigation logic

---

## Layout Patterns

### Common Wrapper Pattern
```tsx
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
      {/* Screen content */}
    </ScrollView>
  </KeyboardAvoidingView>
</SafeAreaView>
```

### Form Field Pattern
```tsx
<FormControl isInvalid={!!errors.fieldName} className="w-full">
  <FormControlLabel>
    <FormControlLabelText>Field Label</FormControlLabelText>
  </FormControlLabel>
  <Controller
    control={control}
    name="fieldName"
    render={({ field: { onChange, onBlur, value } }) => (
      <Input size="lg" variant="outline" className="rounded-lg">
        <InputField
          placeholder="Placeholder text"
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          editable={!isLoading}
        />
      </Input>
    )}
  />
  {errors.fieldName && (
    <FormControlError>
      <FormControlErrorText>{errors.fieldName.message}</FormControlErrorText>
    </FormControlError>
  )}
</FormControl>
```

### Button Pattern
```tsx
<Button
  size="xl"
  action="primary"
  onPress={handleSubmit(handler)}
  isDisabled={isLoading}
  className="w-full rounded-lg"
>
  {isLoading && <ButtonSpinner />}
  <ButtonText>{isLoading ? 'Loading...' : 'Button Text'}</ButtonText>
</Button>
```

---

## Styling Approach

### NativeWind Classes
Use Tailwind classes via `className` prop:

**Colors (Semantic Tokens):**
- `bg-background-0` - Screen background
- `bg-background-50` - Input backgrounds
- `text-typography-900` - Primary text (headings)
- `text-typography-500` - Secondary text (descriptions)
- `text-typography-400` - Tertiary text (dividers)
- `text-primary-500` / `text-primary-600` - Brand color (links, icons)
- `text-error-700` - Error text
- `text-success-500` - Success states

**Spacing:**
- `px-6` - Horizontal padding (screens)
- `py-8` - Vertical padding (screens)
- `space="xs" | "sm" | "md" | "lg" | "xl"` - VStack/HStack spacing
- `mb-2` / `mb-8` - Margins

**Layout:**
- `flex-1` - Fill available space
- `items-center` - Center horizontally
- `justify-center` - Center vertically
- `w-full` - Full width
- `max-w-sm` - Constrain form width (384px)

**Components:**
- `rounded-lg` - Border radius
- `rounded-full` - Circular (logo)

### Component Sizes
- Headings: `size="2xl"` | `size="3xl"`
- Text: `size="sm"` | `size="md"`
- Inputs: `size="lg"`
- Buttons: `size="xl"`

### Component Variants
- Input: `variant="outline"`
- Button: `action="primary"` | `action="secondary"`
- Button: `variant="solid"` | `variant="outline"` | `variant="link"`

---

## Testing Updates

### Component Tests
For each updated screen, update the corresponding test file to verify:

**Rendering Tests:**
- Logo/branding appears
- All form fields render
- Buttons render with correct text
- Helper text and labels display

**Interaction Tests:**
- Form inputs accept text
- Submit buttons call handlers
- Loading states disable inputs
- Error messages display
- Navigation links work

**State Tests:**
- Mode toggle (LoginScreen)
- emailSent state (ForgotPasswordScreen)
- Multiple states (ResetPasswordScreen: loading, invalid, success, form)
- Loading state (AuthCallbackScreen)

### Test File Locations
Following colocated testing pattern:
```
features/auth/screens/
├── LoginScreen.tsx
├── LoginScreen.test.tsx
├── ForgotPasswordScreen.tsx
├── ForgotPasswordScreen.test.tsx
├── ResetPasswordScreen.tsx
├── ResetPasswordScreen.test.tsx
├── AuthCallbackScreen.tsx
└── AuthCallbackScreen.test.tsx
```

### Testing Library Setup
```tsx
import { render, screen, fireEvent } from '@testing-library/react-native';
import { GluestackUIProvider } from '@/shared/components/ui/gluestack-ui-provider';

// Wrapper for Gluestack components
const wrapper = ({ children }) => (
  <GluestackUIProvider>{children}</GluestackUIProvider>
);

describe('LoginScreen', () => {
  it('renders branding and form', () => {
    render(<LoginScreen />, { wrapper });
    expect(screen.getByText('ArabyBuddy')).toBeOnTheScreen();
    expect(screen.getByPlaceholderText('you@example.com')).toBeOnTheScreen();
  });
});
```

### Mock Requirements
- Mock `@/features/auth` services and validation
- Mock `expo-router` navigation
- Mock `react-native` Alert
- Mock social auth button components (already exist)
- Mock `expo-image` for Image component

---

## Implementation Checklist

### Phase 1: Setup Gluestack Components
- [ ] Use Gluestack MCP to select components:
  - VStack, HStack, Box, Center
  - FormControl, FormControlLabel, FormControlLabelText, FormControlError, FormControlErrorText
  - Input, InputField
  - Button, ButtonText, ButtonSpinner
  - Heading, Text
  - Image, Spinner
- [ ] Verify components render correctly
- [ ] Test with NativeWind classes

### Phase 2: Update LoginScreen
- [ ] Replace View/Text with Gluestack components
- [ ] Add logo from `assets/images/icon.png`
- [ ] Implement layout structure with VStack/HStack
- [ ] Update form fields with FormControl components
- [ ] Style with NativeWind classes
- [ ] Update test file
- [ ] Run tests: `npm run test features/auth/screens/LoginScreen.test.tsx`
- [ ] Visual QA on iOS/Android/Web

### Phase 3: Update ForgotPasswordScreen
- [ ] Implement main form view
- [ ] Implement success state with icon
- [ ] Add back button with icon
- [ ] Update test file
- [ ] Run tests: `npm run test features/auth/screens/ForgotPasswordScreen.test.tsx`
- [ ] Visual QA on all platforms

### Phase 4: Update ResetPasswordScreen
- [ ] Implement loading state
- [ ] Implement invalid session state
- [ ] Implement success state
- [ ] Implement main form view
- [ ] Add icons for states (using lucide-react-native or @expo/vector-icons)
- [ ] Update test file
- [ ] Run tests: `npm run test features/auth/screens/ResetPasswordScreen.test.tsx`
- [ ] Visual QA on all platforms

### Phase 5: Update AuthCallbackScreen
- [ ] Replace ActivityIndicator with Spinner
- [ ] Add loading message
- [ ] Update test file (if exists)
- [ ] Visual QA on all platforms

### Phase 6: Final QA
- [ ] Run all auth tests: `npm run test features/auth/`
- [ ] Run linting: `npm run lint`
- [ ] Run type check: `npm run typecheck`
- [ ] Test complete auth flows:
  - [ ] Sign up → email confirmation
  - [ ] Sign in → dashboard
  - [ ] Forgot password → email → reset → sign in
  - [ ] Google sign in
  - [ ] Apple sign in (iOS only)
- [ ] Verify responsive behavior
- [ ] Verify keyboard handling
- [ ] Verify safe area handling
- [ ] Verify loading states
- [ ] Verify error states
- [ ] Cross-platform testing (iOS, Android, Web)

---

## Notes

### Icons
Use Lucide React Native (already installed) for icons:
```tsx
import { ChevronLeft, CheckCircle, XCircle } from 'lucide-react-native';

<ChevronLeft size={20} color="currentColor" />
```

### Logo
Path: `assets/images/icon.png`
Usage:
```tsx
import { Image } from '@/shared/components/ui/image';

<Image
  source={require('@/assets/images/icon.png')}
  alt="ArabyBuddy Logo"
  className="w-20 h-20 rounded-full"
/>
```

### Platform Differences
- KeyboardAvoidingView behavior: `Platform.OS === 'ios' ? 'padding' : 'height'`
- Apple Sign In only on iOS: Use existing `AppleSignInButton` component logic

### Accessibility
- All inputs have labels via FormControlLabel
- Error messages associated with fields via FormControlError
- Touch targets meet minimum size (44x44 pt)
- Color contrast meets WCAG AA standards

---

## Success Criteria

✅ All screens match pixelpennies visual design quality
✅ Existing auth logic unchanged
✅ Feature-based architecture maintained
✅ All tests passing
✅ No linting or type errors
✅ Works on iOS, Android, and Web
✅ Proper keyboard handling
✅ Proper safe area handling
✅ Loading states functional
✅ Error states display correctly
✅ Form validation works
✅ Navigation works correctly
