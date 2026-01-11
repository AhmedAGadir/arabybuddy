import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

interface UserProfile {
  id: string;
  email: string;
  username: string;
  avatar_url?: string;
  timezone?: string;
  created_at: string;
  updated_at: string;
}

export function useUserProfile(userId: string | undefined) {
  return useQuery({
    queryKey: ['user-profile', userId],
    queryFn: async () => {
      if (!userId) throw new Error('User ID is required');
      
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      return data as UserProfile;
    },
    enabled: !!userId,
  });
}

export function useUpdateUserProfile() {
  // TODO: Implement mutation for updating user profile
}

