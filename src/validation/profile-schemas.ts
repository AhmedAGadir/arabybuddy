import { z } from 'zod';

export const usernameSchema = z
  .string()
  .min(3, 'Username must be at least 3 characters')
  .max(30, 'Username must be less than 30 characters')
  .regex(
    /^[a-z0-9_-]+$/,
    'Username can only contain lowercase letters, numbers, hyphens, and underscores'
  );

export const updateProfileSchema = z.object({
  username: usernameSchema.optional(),
  timezone: z.string().optional(),
});

export const onboardingSchema = z.object({
  targetDialect: z.enum(['egyptian', 'levantine', 'gulf', 'msa']),
  pronouns: z.enum(['he', 'she']),
  cefrLevel: z.enum(['A1', 'A2', 'B1', 'B2', 'C1', 'C2']),
  username: usernameSchema.optional(),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type OnboardingInput = z.infer<typeof onboardingSchema>;

