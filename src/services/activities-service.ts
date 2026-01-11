import { supabase } from '@/lib/supabase';
import type { CEFRLevel } from '@/src/types';

/**
 * Activities Service
 * Handles all activity-related API calls
 */

export const activitiesService = {
  /**
   * Get all activities (optionally filtered by CEFR level)
   */
  async getActivities(cefrLevel?: CEFRLevel) {
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
    return data;
  },

  /**
   * Get a single activity by ID
   */
  async getActivityById(id: string) {
    const { data, error } = await supabase
      .from('activities')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Get modules with their activities
   */
  async getModulesWithActivities() {
    const { data, error } = await supabase
      .from('modules')
      .select(`
        *,
        module_activities (
          *,
          activity:activities (*)
        )
      `)
      .order('sort_order', { ascending: true });

    if (error) throw error;
    return data;
  },
};

