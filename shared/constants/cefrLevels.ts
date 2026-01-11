export const CEFR_LEVELS = {
  A1: 'A1',
  A2: 'A2',
  B1: 'B1',
  B2: 'B2',
  C1: 'C1',
  C2: 'C2',
} as const;

export type CEFRLevel = (typeof CEFR_LEVELS)[keyof typeof CEFR_LEVELS];

