export const USER_PRONOUNS = {
  HE_HIM: 'he_him',
  SHE_HER: 'she_her',
} as const;

export type UserPronouns = (typeof USER_PRONOUNS)[keyof typeof USER_PRONOUNS];
