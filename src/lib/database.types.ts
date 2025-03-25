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
          email: string
          mobile_number: string
          status: 'active' | 'inactive' | 'blocked'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          mobile_number: string
          status?: 'active' | 'inactive' | 'blocked'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          mobile_number?: string
          status?: 'active' | 'inactive' | 'blocked'
          created_at?: string
          updated_at?: string
        }
      }
      playlists: {
        Row: {
          id: string
          title: string
          description: string
          language: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          language: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          language?: string
          created_at?: string
          updated_at?: string
        }
      }
      videos: {
        Row: {
          id: string
          title: string
          description: string
          url: string
          playlist_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          url: string
          playlist_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          url?: string
          playlist_id?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_status: 'active' | 'inactive' | 'blocked'
    }
  }
} 