import { supabase } from '@/lib/supabase';
import type { Dialect, UserPronouns } from '@/src/types';

/**
 * Lessons Service
 * Handles all lesson-related API calls
 */

export const lessonsService = {
  /**
   * Get lesson by activity ID
   */
  async getLesson(activityId: string) {
    const { data, error } = await supabase
      .from('lessons')
      .select(`
        *,
        activity:activities (*),
        character:characters (*)
      `)
      .eq('activity_id', activityId)
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Get lesson variation with chat steps
   */
  async getLessonVariation(
    lessonId: string,
    dialect: Dialect,
    pronouns: UserPronouns
  ) {
    const { data, error } = await supabase
      .from('lesson_variations')
      .select(`
        *,
        chat_steps (*)
      `)
      .eq('lesson_id', lessonId)
      .eq('dialect', dialect)
      .eq('user_pronouns', pronouns)
      .single();

    if (error) throw error;

    // Sort chat steps by sort_order
    if (data?.chat_steps) {
      data.chat_steps.sort((a: any, b: any) => a.sort_order - b.sort_order);
    }

    return data;
  },

  /**
   * Submit lesson completion (to be implemented with scoring logic)
   */
  async submitLessonCompletion(
    lessonId: string,
    userId: string,
    scores: {
      task_fulfillment: number;
      coherence_cohesion: number;
      grammatical_accuracy: number;
      lexical_resource: number;
      dialect_sensitivity: number;
      total_score: number;
    }
  ) {
    // TODO: Implement lesson completion tracking
    // This will involve creating a lesson_completions table
    // and calculating XP rewards
    console.log('Submitting lesson completion:', {
      lessonId,
      userId,
      scores,
    });
  },
};

