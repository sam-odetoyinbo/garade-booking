"use client"

import { useState } from "react"
import { MainNav } from "@/components/main-nav"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { Car } from 'lucide-react'
import Link from "next/link"
import { AuthModal } from "./auth-modal"
import { useAuth } from "@/lib/auth-context"

export function Header() {
  const [showAuthModal, setShowAuthModal] = useState(false)
  const { user, signOut } = useAuth()

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Car className="h-6 w-6" />
            <span className="font-bold">BookMyGarage</span>
          </Link>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div className="w-full flex-1 md:w-auto md:flex-none">
              <MainNav />
            </div>
            <div className="flex items-center space-x-2">
              <ModeToggle />
              {user ? (
                <Button onClick={signOut}>Sign Out</Button>
              ) : (
                <Button onClick={() => setShowAuthModal(true)}>
                  Sign In
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  )
}

