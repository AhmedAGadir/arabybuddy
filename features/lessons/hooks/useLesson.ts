import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/shared/lib/supabase';

interface ChatStep {
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
  word_data?: any;
  sort_order: number;
}

interface LessonVariation {
  id: string;
  lesson_id: string;
  dialect: string;
  user_pronouns: string;
  chat_steps: ChatStep[];
}

export function useLessonVariation(
  lessonId: string,
  dialect: string,
  pronouns: string
) {
  return useQuery({
    queryKey: ['lesson-variation', lessonId, dialect, pronouns],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('lesson_variations')
        .select(
          `
          *,
          chat_steps (*)
        `
        )
        .eq('lesson_id', lessonId)
        .eq('dialect', dialect)
        .eq('user_pronouns', pronouns)
        .single();

      if (error) throw error;

      // Sort chat steps by sort_order
      const variation = data as any as LessonVariation;
      variation.chat_steps?.sort((a, b) => a.sort_order - b.sort_order);

      return variation;
    },
    enabled: !!lessonId && !!dialect && !!pronouns,
  });
}

