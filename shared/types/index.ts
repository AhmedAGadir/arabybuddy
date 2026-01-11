/**
 * Core Type Definitions
 *
 * Shared types used across the application
 */

import {
  DIALECTS,
  type Dialect,
  USER_PRONOUNS,
  type UserPronouns,
  CEFR_LEVELS,
  type CEFRLevel,
  ACTIVITY_TYPES,
  type ActivityType,
  GAME_TYPES,
  type GameType,
} from '../constants';

export {
  DIALECTS,
  Dialect,
  USER_PRONOUNS,
  UserPronouns,
  CEFR_LEVELS,
  CEFRLevel,
  ACTIVITY_TYPES,
  ActivityType,
  GAME_TYPES,
  GameType,
};

// User Profile
export interface UserProfile {
  id: string;
  email: string;
  username: string;
  avatar_url?: string;
  timezone?: string;
  created_at: string;
  updated_at: string;
}

// Activities
export interface Activity {
  id: string;
  activity_type: ActivityType;
  title: string;
  description?: string;
  image_url?: string;
  cefr_level: CEFRLevel;
  active: boolean;
  created_at: string;
  updated_at: string;
}

// Lessons
export interface Lesson {
  activity_id: string;
  character_id: number;
}

export interface LessonVariation {
  id: string;
  lesson_id: string;
  dialect: Dialect;
  user_pronouns: UserPronouns;
  created_at: string;
  updated_at: string;
}

export interface ChatStep {
  id: string;
  variation_id: string;
  role: 'character' | 'user';
  message?: string;
  message_translation?: string;
  objective?: string;
  model_answer?: string;
  model_answer_translation?: string;
  hint?: string;
  audio_url?: string;
  word_data?: WordData[];
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface WordData {
  word: string;
  transliteration?: string;
  translation?: string;
  start_time?: number; // milliseconds
  end_time?: number; // milliseconds
}

// Evaluation
export interface EvaluationResult {
  task_fulfillment: number; // 0-5
  coherence_cohesion: number; // 0-5
  grammatical_accuracy: number; // 0-5
  lexical_resource: number; // 0-5
  dialect_sensitivity: number; // 0-5
  total_score: number; // weighted total
  passed: boolean;
  feedback_message: string;
}

// Characters
export interface Character {
  id: number;
  character: string;
  gender: string;
  personality?: string;
  description?: string;
  is_playable: boolean;
  created_at: string;
}

// Games
export interface Game {
  activity_id: string;
  game_type: GameType;
}

// Modules
export interface Module {
  id: string;
  name: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface ModuleActivity {
  module_id: string;
  activity_id: string;
  activity_type: ActivityType;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

