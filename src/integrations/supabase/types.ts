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
      achievements: {
        Row: {
          achievement_code: string
          achievement_name: string | null
          id: string
          unlocked_at: string | null
          user_id: string
        }
        Insert: {
          achievement_code: string
          achievement_name?: string | null
          id?: string
          unlocked_at?: string | null
          user_id: string
        }
        Update: {
          achievement_code?: string
          achievement_name?: string | null
          id?: string
          unlocked_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      exercises_completed: {
        Row: {
          clarity_score: number | null
          completed_at: string | null
          created_at: string | null
          duration: number | null
          exercise_id: string
          exercise_title: string | null
          fluency_score: number | null
          id: string
          listen_count: number | null
          listening_completed: boolean | null
          overall_score: number | null
          pronunciation_score: number | null
          reading_completed: boolean | null
          recording_url: string | null
          speaking_completed: boolean | null
          user_id: string
          words_consulted: number | null
          xp_earned: number | null
        }
        Insert: {
          clarity_score?: number | null
          completed_at?: string | null
          created_at?: string | null
          duration?: number | null
          exercise_id: string
          exercise_title?: string | null
          fluency_score?: number | null
          id?: string
          listen_count?: number | null
          listening_completed?: boolean | null
          overall_score?: number | null
          pronunciation_score?: number | null
          reading_completed?: boolean | null
          recording_url?: string | null
          speaking_completed?: boolean | null
          user_id: string
          words_consulted?: number | null
          xp_earned?: number | null
        }
        Update: {
          clarity_score?: number | null
          completed_at?: string | null
          created_at?: string | null
          duration?: number | null
          exercise_id?: string
          exercise_title?: string | null
          fluency_score?: number | null
          id?: string
          listen_count?: number | null
          listening_completed?: boolean | null
          overall_score?: number | null
          pronunciation_score?: number | null
          reading_completed?: boolean | null
          recording_url?: string | null
          speaking_completed?: boolean | null
          user_id?: string
          words_consulted?: number | null
          xp_earned?: number | null
        }
        Relationships: []
      }
      saved_items: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          id: string
          item_id: string
          item_type: string
          level: string | null
          thumbnail_url: string | null
          title: string
          user_id: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          item_id: string
          item_type: string
          level?: string | null
          thumbnail_url?: string | null
          title: string
          user_id: string
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          item_id?: string
          item_type?: string
          level?: string | null
          thumbnail_url?: string | null
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      user_stats: {
        Row: {
          current_level: number | null
          current_streak: number | null
          last_practice_date: string | null
          longest_streak: number | null
          total_exercises: number | null
          total_words_learned: number | null
          total_xp: number | null
          updated_at: string | null
          user_id: string
          xp_to_next_level: number | null
        }
        Insert: {
          current_level?: number | null
          current_streak?: number | null
          last_practice_date?: string | null
          longest_streak?: number | null
          total_exercises?: number | null
          total_words_learned?: number | null
          total_xp?: number | null
          updated_at?: string | null
          user_id: string
          xp_to_next_level?: number | null
        }
        Update: {
          current_level?: number | null
          current_streak?: number | null
          last_practice_date?: string | null
          longest_streak?: number | null
          total_exercises?: number | null
          total_words_learned?: number | null
          total_xp?: number | null
          updated_at?: string | null
          user_id?: string
          xp_to_next_level?: number | null
        }
        Relationships: []
      }
      users: {
        Row: {
          cancel_at_period_end: boolean | null
          canceled_at: string | null
          created_at: string | null
          current_period_end: string | null
          current_period_start: string | null
          email: string
          email_verified: boolean | null
          english_level: string | null
          full_name: string | null
          how_did_you_hear: string | null
          id: string
          job_role: string | null
          last_login_at: string | null
          last_payment_amount: number | null
          last_payment_date: string | null
          last_payment_failed_at: string | null
          onboarding_completed: boolean | null
          phone: string | null
          plan_type: string | null
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          subscription_status: string | null
          trial_ends_at: string | null
          updated_at: string | null
        }
        Insert: {
          cancel_at_period_end?: boolean | null
          canceled_at?: string | null
          created_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          email: string
          email_verified?: boolean | null
          english_level?: string | null
          full_name?: string | null
          how_did_you_hear?: string | null
          id?: string
          job_role?: string | null
          last_login_at?: string | null
          last_payment_amount?: number | null
          last_payment_date?: string | null
          last_payment_failed_at?: string | null
          onboarding_completed?: boolean | null
          phone?: string | null
          plan_type?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          subscription_status?: string | null
          trial_ends_at?: string | null
          updated_at?: string | null
        }
        Update: {
          cancel_at_period_end?: boolean | null
          canceled_at?: string | null
          created_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          email?: string
          email_verified?: boolean | null
          english_level?: string | null
          full_name?: string | null
          how_did_you_hear?: string | null
          id?: string
          job_role?: string | null
          last_login_at?: string | null
          last_payment_amount?: number | null
          last_payment_date?: string | null
          last_payment_failed_at?: string | null
          onboarding_completed?: boolean | null
          phone?: string | null
          plan_type?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          subscription_status?: string | null
          trial_ends_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      vocabulary: {
        Row: {
          alternatives: Json | null
          context_sentence: string | null
          created_at: string | null
          examples: Json | null
          exercise_id: string | null
          id: string
          is_favorite: boolean | null
          last_reviewed_at: string | null
          lookup_count: number | null
          next_review_at: string | null
          phonetic: string | null
          review_count: number | null
          translation: string
          updated_at: string | null
          user_id: string
          word: string
        }
        Insert: {
          alternatives?: Json | null
          context_sentence?: string | null
          created_at?: string | null
          examples?: Json | null
          exercise_id?: string | null
          id?: string
          is_favorite?: boolean | null
          last_reviewed_at?: string | null
          lookup_count?: number | null
          next_review_at?: string | null
          phonetic?: string | null
          review_count?: number | null
          translation: string
          updated_at?: string | null
          user_id: string
          word: string
        }
        Update: {
          alternatives?: Json | null
          context_sentence?: string | null
          created_at?: string | null
          examples?: Json | null
          exercise_id?: string | null
          id?: string
          is_favorite?: boolean | null
          last_reviewed_at?: string | null
          lookup_count?: number | null
          next_review_at?: string | null
          phonetic?: string | null
          review_count?: number | null
          translation?: string
          updated_at?: string | null
          user_id?: string
          word?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      increment_lookup_count: {
        Args: { p_user_id: string; p_word: string }
        Returns: undefined
      }
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
