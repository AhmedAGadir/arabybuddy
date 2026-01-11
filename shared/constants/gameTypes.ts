export const GAME_TYPES = {
  CROSSWORD: 'crossword',
  MULTIPLE_CHOICE: 'multiple_choice',
  MATCHING_PAIRS: 'matching_pairs',
  SENTENCE_REORDERING: 'sentence_reordering',
} as const;

export type GameType = (typeof GAME_TYPES)[keyof typeof GAME_TYPES];

