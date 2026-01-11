export const ACTIVITY_TYPES = {
  LESSON: 'lesson',
  GAME: 'game',
  TEST: 'test',
} as const;

export type ActivityType = (typeof ACTIVITY_TYPES)[keyof typeof ACTIVITY_TYPES];

