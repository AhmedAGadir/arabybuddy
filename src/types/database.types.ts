export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      activities: {
        Row: {
          active: boolean | null
          activity_type: string
          cefr_level: string
          created_at: string | null
          description: string | null
          id: string
          image_url: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          active?: boolean | null
          activity_type: string
          cefr_level: string
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          active?: boolean | null
          activity_type?: string
          cefr_level?: string
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      badges: {
        Row: {
          active: boolean | null
          badge_category: string
          badge_description: string
          badge_name: string
          created_at: string | null
          id: string
          image_url: string | null
          requirements: Json
          updated_at: string | null
          xp_reward: number
        }
        Insert: {
          active?: boolean | null
          badge_category: string
          badge_description: string
          badge_name: string
          created_at?: string | null
          id?: string
          image_url?: string | null
          requirements: Json
          updated_at?: string | null
          xp_reward?: number
        }
        Update: {
          active?: boolean | null
          badge_category?: string
          badge_description?: string
          badge_name?: string
          created_at?: string | null
          id?: string
          image_url?: string | null
          requirements?: Json
          updated_at?: string | null
          xp_reward?: number
        }
        Relationships: []
      }
      character_animations: {
        Row: {
          animation_url: string
          character_id: number
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          animation_url: string
          character_id: number
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          animation_url?: string
          character_id?: number
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "character_animations_character_id_fkey"
            columns: ["character_id"]
            isOneToOne: true
            referencedRelation: "characters"
            referencedColumns: ["id"]
          },
        ]
      }
      character_assessment_sounds: {
        Row: {
          assessment_tier: string
          character_id: number
          created_at: string | null
          id: string
          language: string
          sound_url: string
          text: string
          updated_at: string | null
          user_pronouns: string
        }
        Insert: {
          assessment_tier: string
          character_id: number
          created_at?: string | null
          id?: string
          language: string
          sound_url: string
          text: string
          updated_at?: string | null
          user_pronouns: string
        }
        Update: {
          assessment_tier?: string
          character_id?: number
          created_at?: string | null
          id?: string
          language?: string
          sound_url?: string
          text?: string
          updated_at?: string | null
          user_pronouns?: string
        }
        Relationships: [
          {
            foreignKeyName: "character_assessment_sounds_character_id_fkey"
            columns: ["character_id"]
            isOneToOne: false
            referencedRelation: "characters"
            referencedColumns: ["id"]
          },
        ]
      }
      character_images: {
        Row: {
          character_id: number
          created_at: string
          id: string
          image_url: string
        }
        Insert: {
          character_id: number
          created_at?: string
          id?: string
          image_url: string
        }
        Update: {
          character_id?: number
          created_at?: string
          id?: string
          image_url?: string
        }
        Relationships: [
          {
            foreignKeyName: "character_images_character_id_fkey"
            columns: ["character_id"]
            isOneToOne: false
            referencedRelation: "characters"
            referencedColumns: ["id"]
          },
        ]
      }
      character_voice_details: {
        Row: {
          character_id: number
          created_at: string
          dialect: string
          provider: string
          voice_id: string
          voice_name: string | null
        }
        Insert: {
          character_id: number
          created_at?: string
          dialect: string
          provider: string
          voice_id: string
          voice_name?: string | null
        }
        Update: {
          character_id?: number
          created_at?: string
          dialect?: string
          provider?: string
          voice_id?: string
          voice_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "character_voice_details_character_id_fkey"
            columns: ["character_id"]
            isOneToOne: false
            referencedRelation: "characters"
            referencedColumns: ["id"]
          },
        ]
      }
      characters: {
        Row: {
          character: string
          created_at: string
          description: string
          gender: string
          id: number
          is_playable: boolean
          personality: string
        }
        Insert: {
          character: string
          created_at?: string
          description: string
          gender: string
          id?: number
          is_playable?: boolean
          personality: string
        }
        Update: {
          character?: string
          created_at?: string
          description?: string
          gender?: string
          id?: number
          is_playable?: boolean
          personality?: string
        }
        Relationships: []
      }
      chat_steps: {
        Row: {
          audio_url: string | null
          created_at: string | null
          hint: string | null
          id: string
          message: string | null
          message_translation: string | null
          model_answer: string | null
          model_answer_translation: string | null
          objective: string | null
          role: string
          sort_order: number
          updated_at: string | null
          variation_id: string
          word_data: Json | null
        }
        Insert: {
          audio_url?: string | null
          created_at?: string | null
          hint?: string | null
          id?: string
          message?: string | null
          message_translation?: string | null
          model_answer?: string | null
          model_answer_translation?: string | null
          objective?: string | null
          role: string
          sort_order: number
          updated_at?: string | null
          variation_id: string
          word_data?: Json | null
        }
        Update: {
          audio_url?: string | null
          created_at?: string | null
          hint?: string | null
          id?: string
          message?: string | null
          message_translation?: string | null
          model_answer?: string | null
          model_answer_translation?: string | null
          objective?: string | null
          role?: string
          sort_order?: number
          updated_at?: string | null
          variation_id?: string
          word_data?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "chat_steps_variation_id_fkey"
            columns: ["variation_id"]
            isOneToOne: false
            referencedRelation: "lesson_variations"
            referencedColumns: ["id"]
          },
        ]
      }
      crossword_games: {
        Row: {
          game_id: string
          height: number
          width: number
          words: Json
        }
        Insert: {
          game_id: string
          height: number
          width: number
          words: Json
        }
        Update: {
          game_id?: string
          height?: number
          width?: number
          words?: Json
        }
        Relationships: [
          {
            foreignKeyName: "crossword_games_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: true
            referencedRelation: "activities"
            referencedColumns: ["id"]
          },
        ]
      }
      games: {
        Row: {
          activity_id: string
          game_type: string
        }
        Insert: {
          activity_id: string
          game_type: string
        }
        Update: {
          activity_id?: string
          game_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "games_activity_id_fkey"
            columns: ["activity_id"]
            isOneToOne: true
            referencedRelation: "activities"
            referencedColumns: ["id"]
          },
        ]
      }
      generated_media_metadata: {
        Row: {
          character_ids: number[] | null
          created_at: string
          media_type: string
          media_url: string
          prompt: string
          user_id: string
        }
        Insert: {
          character_ids?: number[] | null
          created_at?: string
          media_type: string
          media_url: string
          prompt: string
          user_id: string
        }
        Update: {
          character_ids?: number[] | null
          created_at?: string
          media_type?: string
          media_url?: string
          prompt?: string
          user_id?: string
        }
        Relationships: []
      }
      lesson_variations: {
        Row: {
          created_at: string | null
          dialect: string
          id: string
          lesson_id: string
          updated_at: string | null
          user_pronouns: string
        }
        Insert: {
          created_at?: string | null
          dialect: string
          id?: string
          lesson_id: string
          updated_at?: string | null
          user_pronouns: string
        }
        Update: {
          created_at?: string | null
          dialect?: string
          id?: string
          lesson_id?: string
          updated_at?: string | null
          user_pronouns?: string
        }
        Relationships: [
          {
            foreignKeyName: "lesson_variations_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "activities"
            referencedColumns: ["id"]
          },
        ]
      }
      lessons: {
        Row: {
          activity_id: string
          character_id: number
        }
        Insert: {
          activity_id: string
          character_id: number
        }
        Update: {
          activity_id?: string
          character_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "lessons_activity_id_fkey"
            columns: ["activity_id"]
            isOneToOne: true
            referencedRelation: "activities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lessons_character_id_fkey"
            columns: ["character_id"]
            isOneToOne: false
            referencedRelation: "characters"
            referencedColumns: ["id"]
          },
        ]
      }
      matching_pairs_games: {
        Row: {
          game_id: string
          instructions: string | null
          matching_type: string
          pairs: Json
        }
        Insert: {
          game_id: string
          instructions?: string | null
          matching_type: string
          pairs: Json
        }
        Update: {
          game_id?: string
          instructions?: string | null
          matching_type?: string
          pairs?: Json
        }
        Relationships: [
          {
            foreignKeyName: "matching_pairs_games_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: true
            referencedRelation: "activities"
            referencedColumns: ["id"]
          },
        ]
      }
      module_activities: {
        Row: {
          activity_id: string
          activity_type: string
          created_at: string | null
          module_id: string
          sort_order: number
          updated_at: string | null
        }
        Insert: {
          activity_id: string
          activity_type: string
          created_at?: string | null
          module_id: string
          sort_order: number
          updated_at?: string | null
        }
        Update: {
          activity_id?: string
          activity_type?: string
          created_at?: string | null
          module_id?: string
          sort_order?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "module_activities_activity_id_fkey"
            columns: ["activity_id"]
            isOneToOne: false
            referencedRelation: "activities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "module_activities_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "modules"
            referencedColumns: ["id"]
          },
        ]
      }
      modules: {
        Row: {
          created_at: string | null
          id: string
          name: string
          sort_order: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          sort_order: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          sort_order?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      multiple_choice_games: {
        Row: {
          game_id: string
          questions: Json
        }
        Insert: {
          game_id: string
          questions: Json
        }
        Update: {
          game_id?: string
          questions?: Json
        }
        Relationships: [
          {
            foreignKeyName: "multiple_choice_games_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: true
            referencedRelation: "activities"
            referencedColumns: ["id"]
          },
        ]
      }
      places: {
        Row: {
          created_at: string
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          id?: never
          name: string
        }
        Update: {
          created_at?: string
          id?: never
          name?: string
        }
        Relationships: []
      }
      places_images: {
        Row: {
          created_at: string
          id: string
          image_url: string
          place_id: number
        }
        Insert: {
          created_at?: string
          id?: string
          image_url: string
          place_id: number
        }
        Update: {
          created_at?: string
          id?: string
          image_url?: string
          place_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "places_images_place_id_fkey"
            columns: ["place_id"]
            isOneToOne: false
            referencedRelation: "places"
            referencedColumns: ["id"]
          },
        ]
      }
      props: {
        Row: {
          created_at: string
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          id?: never
          name: string
        }
        Update: {
          created_at?: string
          id?: never
          name?: string
        }
        Relationships: []
      }
      props_images: {
        Row: {
          created_at: string
          id: string
          image_url: string
          prop_id: number
        }
        Insert: {
          created_at?: string
          id?: string
          image_url: string
          prop_id: number
        }
        Update: {
          created_at?: string
          id?: string
          image_url?: string
          prop_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "props_images_prop_id_fkey"
            columns: ["prop_id"]
            isOneToOne: false
            referencedRelation: "props"
            referencedColumns: ["id"]
          },
        ]
      }
      sentence_reordering_games: {
        Row: {
          game_id: string
          sentences: Json
        }
        Insert: {
          game_id: string
          sentences: Json
        }
        Update: {
          game_id?: string
          sentences?: Json
        }
        Relationships: [
          {
            foreignKeyName: "sentence_reordering_games_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: true
            referencedRelation: "activities"
            referencedColumns: ["id"]
          },
        ]
      }
      test_details: {
        Row: {
          tasks: Json
          test_id: string
        }
        Insert: {
          tasks: Json
          test_id: string
        }
        Update: {
          tasks?: Json
          test_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "test_details_test_id_fkey"
            columns: ["test_id"]
            isOneToOne: true
            referencedRelation: "activities"
            referencedColumns: ["id"]
          },
        ]
      }
      tests: {
        Row: {
          activity_id: string
          character_id: number
        }
        Insert: {
          activity_id: string
          character_id: number
        }
        Update: {
          activity_id?: string
          character_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "tests_activity_id_fkey"
            columns: ["activity_id"]
            isOneToOne: true
            referencedRelation: "activities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tests_character_id_fkey"
            columns: ["character_id"]
            isOneToOne: false
            referencedRelation: "characters"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profiles: {
        Row: {
          created_at: string | null
          email: string | null
          id: string
          is_admin: boolean
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id: string
          is_admin?: boolean
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: string
          is_admin?: boolean
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      character_voice_details_view: {
        Row: {
          character: string | null
          dialect: string | null
          provider: string | null
          voice_id: string | null
          voice_name: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      is_admin: { Args: never; Returns: boolean }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

