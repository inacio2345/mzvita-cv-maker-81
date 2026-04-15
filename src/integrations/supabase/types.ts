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
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      affiliate_commissions: {
        Row: {
          affiliate_id: string
          amount: number
          created_at: string
          id: string
          payment_id: string
          status: string
          updated_at: string
        }
        Insert: {
          affiliate_id: string
          amount: number
          created_at?: string
          id?: string
          payment_id: string
          status?: string
          updated_at?: string
        }
        Update: {
          affiliate_id?: string
          amount?: number
          created_at?: string
          id?: string
          payment_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "affiliate_commissions_payment_id_fkey"
            columns: ["payment_id"]
            isOneToOne: true
            referencedRelation: "payments"
            referencedColumns: ["id"]
          },
        ]
      }
      affiliates: {
        Row: {
          approved_at: string | null
          channel: string | null
          channel_url: string | null
          code: string
          commission_rate: number
          created_at: string
          email: string
          id: string
          name: string
          phone: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          approved_at?: string | null
          channel?: string | null
          channel_url?: string | null
          code: string
          commission_rate?: number
          created_at?: string
          email: string
          id?: string
          name: string
          phone: string
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          approved_at?: string | null
          channel?: string | null
          channel_url?: string | null
          code?: string
          commission_rate?: number
          created_at?: string
          email?: string
          id?: string
          name?: string
          phone?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "affiliates_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      commissions: {
        Row: {
          affiliate_id: string
          available_at: string
          commission_amount: number
          commission_rate: number
          created_at: string
          id: string
          paid_at: string | null
          payment_amount: number
          payment_id: string
          referred_user_id: string
          status: string
        }
        Insert: {
          affiliate_id: string
          available_at: string
          commission_amount: number
          commission_rate: number
          created_at?: string
          id?: string
          paid_at?: string | null
          payment_amount: number
          payment_id: string
          referred_user_id: string
          status?: string
        }
        Update: {
          affiliate_id?: string
          available_at?: string
          commission_amount?: number
          commission_rate?: number
          created_at?: string
          id?: string
          paid_at?: string | null
          payment_amount?: number
          payment_id?: string
          referred_user_id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "commissions_affiliate_id_fkey"
            columns: ["affiliate_id"]
            isOneToOne: false
            referencedRelation: "affiliates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commissions_payment_id_fkey"
            columns: ["payment_id"]
            isOneToOne: true
            referencedRelation: "payments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commissions_referred_user_id_fkey"
            columns: ["referred_user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          affiliate_code: string | null
          affiliate_id: string | null
          amount: number
          created_at: string
          currency: string | null
          cv_id: string | null
          cv_version: number | null
          id: string
          paysuite_id: string | null
          pdf_url: string | null
          plan_type: string
          reference: string | null
          snapshot_data: Json | null
          status: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          affiliate_code?: string | null
          affiliate_id?: string | null
          amount: number
          created_at?: string
          currency?: string | null
          cv_id?: string | null
          cv_version?: number | null
          id?: string
          paysuite_id?: string | null
          pdf_url?: string | null
          plan_type: string
          reference?: string | null
          snapshot_data?: Json | null
          status?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          affiliate_code?: string | null
          affiliate_id?: string | null
          amount?: number
          created_at?: string
          currency?: string | null
          cv_id?: string | null
          cv_version?: number | null
          id?: string
          paysuite_id?: string | null
          pdf_url?: string | null
          plan_type?: string
          reference?: string | null
          snapshot_data?: Json | null
          status?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_cv_id_fkey"
            columns: ["cv_id"]
            isOneToOne: false
            referencedRelation: "saved_cvs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      payout_items: {
        Row: {
          commission_id: string
          id: string
          payout_id: string
        }
        Insert: {
          commission_id: string
          id?: string
          payout_id: string
        }
        Update: {
          commission_id?: string
          id?: string
          payout_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payout_items_commission_id_fkey"
            columns: ["commission_id"]
            isOneToOne: true
            referencedRelation: "commissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payout_items_payout_id_fkey"
            columns: ["payout_id"]
            isOneToOne: false
            referencedRelation: "payouts"
            referencedColumns: ["id"]
          },
        ]
      }
      payouts: {
        Row: {
          affiliate_id: string
          id: string
          payment_method: string
          payment_reference: string | null
          processed_at: string | null
          processed_by: string | null
          requested_at: string
          status: string
          total_amount: number
        }
        Insert: {
          affiliate_id: string
          id?: string
          payment_method?: string
          payment_reference?: string | null
          processed_at?: string | null
          processed_by?: string | null
          requested_at?: string
          status?: string
          total_amount: number
        }
        Update: {
          affiliate_id?: string
          id?: string
          payment_method?: string
          payment_reference?: string | null
          processed_at?: string | null
          processed_by?: string | null
          requested_at?: string
          status?: string
          total_amount?: number
        }
        Relationships: [
          {
            foreignKeyName: "payouts_affiliate_id_fkey"
            columns: ["affiliate_id"]
            isOneToOne: false
            referencedRelation: "affiliates"
            referencedColumns: ["id"]
          },
        ]
      }
      referral_clicks: {
        Row: {
          affiliate_code: string
          created_at: string
          id: string
          ip_address: string | null
          user_agent: string | null
        }
        Insert: {
          affiliate_code: string
          created_at?: string
          id?: string
          ip_address?: string | null
          user_agent?: string | null
        }
        Update: {
          affiliate_code?: string
          created_at?: string
          id?: string
          ip_address?: string | null
          user_agent?: string | null
        }
        Relationships: []
      }
      saved_cvs: {
        Row: {
          created_at: string
          current_version: number
          cv_data: Json
          id: string
          template_name: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          current_version?: number
          cv_data: Json
          id?: string
          template_name: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          current_version?: number
          cv_data?: Json
          id?: string
          template_name?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_user"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          cv_limit: number | null
          cv_used: number | null
          email: string | null
          full_name: string | null
          id: string
          is_admin: boolean | null
          is_premium: boolean | null
          plan_type: string | null
          preferred_language: string | null
          referred_by: string | null
          subscription_expires_at: string | null
          theme: string | null
          total_downloads: number | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          cv_limit?: number | null
          cv_used?: number | null
          email?: string | null
          full_name?: string | null
          id: string
          is_admin?: boolean | null
          is_premium?: boolean | null
          plan_type?: string | null
          preferred_language?: string | null
          referred_by?: string | null
          subscription_expires_at?: string | null
          theme?: string | null
          total_downloads?: number | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          cv_limit?: number | null
          cv_used?: number | null
          email?: string | null
          full_name?: string | null
          id?: string
          is_admin?: boolean | null
          is_premium?: boolean | null
          plan_type?: string | null
          preferred_language?: string | null
          referred_by?: string | null
          subscription_expires_at?: string | null
          theme?: string | null
          total_downloads?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      webhook_logs: {
        Row: {
          created_at: string
          error_message: string | null
          event_type: string | null
          id: string
          payload: Json | null
          paysuite_id: string | null
          processing_status: string
        }
        Insert: {
          created_at?: string
          error_message?: string | null
          event_type?: string | null
          id?: string
          payload?: Json | null
          paysuite_id?: string | null
          processing_status?: string
        }
        Update: {
          created_at?: string
          error_message?: string | null
          event_type?: string | null
          id?: string
          payload?: Json | null
          paysuite_id?: string | null
          processing_status?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_can_download: { Args: { user_uuid: string }; Returns: boolean }
      generate_affiliate_code: { Args: never; Returns: string }
      get_affiliate_balance: {
        Args: { p_affiliate_id: string }
        Returns: number
      }
      get_affiliate_stats: {
        Args: { p_affiliate_id: string }
        Returns: {
          available_balance: number
          paid_total: number
          pending_balance: number
          total_clicks: number
          total_conversions: number
          total_earned: number
          total_referrals: number
        }[]
      }
      increment_downloads: { Args: { user_uuid: string }; Returns: undefined }
      is_admin_user: { Args: never; Returns: boolean }
      record_download: { Args: { user_uuid: string }; Returns: boolean }
      release_available_commissions: { Args: never; Returns: number }
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
