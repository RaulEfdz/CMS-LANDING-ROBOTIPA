// types/supabase.ts
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string | null
          full_name: string | null
          avatar_url: string | null
          website: string | null
          updated_at: string
        }
        Insert: {
          id: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          website?: string | null
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          website?: string | null
          updated_at?: string
        }
      }
    }
  }
}

export type UserRole = 'user' | 'admin' | 'editor'; // Ajusta los roles según tu sistema

export interface User {
  user_id: string;
  created_at: Date;
  updated_at: Date;
  email_confirmed_at: Date | null;
  first_name?: string | null;
  last_name?: string | null;
  full_name: string;
  profile_picture_url?: string | null;
  date_of_birth?: Date | null;
  phone_number?: string | null;
  address?: string | null;
  city?: string | null;
  country?: string | null;
  postal_code?: string | null;
  timezone?: string | null;
  locale?: string | null;
  preferred_language?: string | null;
  theme_preference?: string | null;
  notifications_enabled?: boolean | null;
  marketing_emails_enabled?: boolean | null;
  website_url?: string | null;
  twitter_username?: string | null;
  instagram_username?: string | null;
  linkedin_url?: string | null;
  github_username?: string | null;
  role?: string | null;
  is_active?: boolean | null;
  last_login_at?: Date | null;
  bio?: string | null;
  interests?: string[] | null;
  custom_field_1?: string | null;
  custom_field_2?: number | null;
  custom_field_3?: boolean | null;
  created_by_user_id?: string | null;
  updated_by_user_id?: string | null;
}