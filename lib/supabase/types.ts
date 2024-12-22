export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      products: {
        Row: {
          id: number
          image_url: string
          name: string
          status: 'active' | 'inactive' | 'archived'
          price: number
          stock: number
          available_at: string
        }
        Insert: {
          id?: number
          image_url: string
          name: string
          status: 'active' | 'inactive' | 'archived'
          price: number
          stock: number
          available_at: string
        }
        Update: {
          id?: number
          image_url?: string
          name?: string
          status?: 'active' | 'inactive' | 'archived'
          price?: number
          stock?: number
          available_at?: string
        }
      }
      eco_cupons: {
        Row: {
          id: number
          code: string
          product_id: number | null
          status: 'active' | 'inactive' | 'archived'
          created_at: string
          scanned_at: string | null
          scanned_location: string | null
        }
        Insert: {
          id?: number
          code: string
          product_id?: number | null
          status?: 'active' | 'inactive' | 'archived'
          created_at?: string
          scanned_at?: string | null
          scanned_location?: string | null
        }
        Update: {
          id?: number
          code?: string
          product_id?: number | null
          status?: 'active' | 'inactive' | 'archived'
          created_at?: string
          scanned_at?: string | null
          scanned_location?: string | null
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
      status: 'active' | 'inactive' | 'archived'
    }
  }
}
