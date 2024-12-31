"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { supabase } from "./supabase"
import type { Session, User, AuthError } from "@supabase/supabase-js"

interface AuthContextType {
  user: User | null
  session: Session | null
  signOut: () => Promise<void>
  signInWithGoogle: () => Promise<void>
  signInWithFacebook: () => Promise<void>
  signInWithApple: () => Promise<void>
  signInWithEmail: (email: string, password: string) => Promise<{
    error: any | null
    data: any | null
  }>
  signUp: (email: string, password: string) => Promise<{
    error: AuthError | null
    data: any | null
  }>
  resetPassword: (email: string) => Promise<{
    error: any | null
    data: any | null
  }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signOut = async () => {
    await supabase.auth.signOut()
  }

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
  }

  const signInWithFacebook = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "facebook",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
  }

  const signInWithApple = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "apple",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
  }

  const signInWithEmail = async (email: string, password: string) => {
    return await supabase.auth.signInWithPassword({
      email,
      password,
    })
  }

  const signUp = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) {
        console.error("Sign up error:", error)
        throw error
      }

      if (data.user) {
        // Attempt to create a profile for the user
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([{ id: data.user.id, email: data.user.email }])

        if (profileError) {
          console.error("Error creating user profile:", profileError)
          // Consider whether to throw this error or handle it differently
          throw new Error("Failed to create user profile")
        }
      }

      return { data, error: null }
    } catch (error) {
      console.error("Unexpected error during sign up:", error)
      return { data: null, error: error as AuthError }
    }
  }

  const resetPassword = async (email: string) => {
    return await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    })
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        signOut,
        signInWithGoogle,
        signInWithFacebook,
        signInWithApple,
        signInWithEmail,
        signUp,
        resetPassword,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

