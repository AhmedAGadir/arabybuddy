import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/shared/lib/supabase';

type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

interface Activity {
  id: string;
  activity_type: 'lesson' | 'game' | 'test';
  title: string;
  description: string;
  image_url: string;
  cefr_level: CEFRLevel;
  active: boolean;
}

export function useActivities(cefrLevel?: CEFRLevel) {
  return useQuery({
    queryKey: ['activities', cefrLevel],
    queryFn: async () => {
      let query = supabase
        .from('activities')
        .select('*')
        .eq('active', true)
        .order('created_at', { ascending: true });

      if (cefrLevel) {
        query = query.eq('cefr_level', cefrLevel);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as Activity[];
    },
  });
}

