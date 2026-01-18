import { z } from 'zod';

// Password validation rules (reusable)
const passwordRules = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number');

// Full sign up schema (email + password)
export const signUpSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: passwordRules,
});

// Sign in schema
export const signInSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

// Email-only validation for multi-step sign up (step 1)
export const emailOnlySchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

// Password with confirm for multi-step sign up (step 2) and reset password
export const createPasswordSchema = z
  .object({
    password: passwordRules,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

// Reset password request schema (email only)
export const resetPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

// Update password schema (same as createPasswordSchema for backwards compatibility)
export const updatePasswordSchema = createPasswordSchema;

// Type exports
export type SignUpInput = z.infer<typeof signUpSchema>;
export type SignInInput = z.infer<typeof signInSchema>;
export type EmailOnlyInput = z.infer<typeof emailOnlySchema>;
export type CreatePasswordInput = z.infer<typeof createPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type UpdatePasswordInput = z.infer<typeof updatePasswordSchema>;

