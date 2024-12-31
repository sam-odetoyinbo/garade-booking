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
          updated_at: string | null
          username: string | null
          full_name: string | null
          avatar_url: string | null
          email: string
        }
        Insert: {
          id: string
          updated_at?: string | null
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          email: string
        }
        Update: {
          id?: string
          updated_at?: string | null
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          email?: string
        }
      }
      garages: {
        Row: {
          id: string
          name: string
          address: string
          postcode: string
          rating: number | null
          created_at: string
          description: string
          image_url: string
        }
        Insert: {
          id?: string
          name: string
          address: string
          postcode: string
          rating?: number | null
          created_at?: string
          description: string
          image_url?: string
        }
      }
      services: {
        Row: {
          id: string
          garage_id: string
          name: string
          price: number
          duration: number
          created_at: string
        }
        Insert: {
          id?: string
          garage_id: string
          name: string
          price: number
          duration: number
          created_at?: string
        }
      }
      bookings: {
        Row: {
          id: string
          user_id: string
          garage_id: string
          service_id: string
          booking_date: string
          status: string
          created_at: string
          vehicle_reg: string
        }
        Insert: {
          id?: string
          user_id: string
          garage_id: string
          service_id: string
          booking_date: string
          status?: string
          created_at?: string
          vehicle_reg: string
        }
      }
    }
  }
}

