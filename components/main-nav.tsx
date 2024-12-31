import Link from "next/link"
import { Car, Home, Settings, User } from 'lucide-react'

export function MainNav() {
  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      <Link
        href="/"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        <Home className="h-4 w-4" />
        <span className="sr-only">Home</span>
      </Link>
      <Link
        href="/garages"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        <Car className="h-4 w-4" />
        <span className="sr-only">Garages</span>
      </Link>
      <Link
        href="/bookings"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        <Settings className="h-4 w-4" />
        <span className="sr-only">Bookings</span>
      </Link>
      <Link
        href="/account"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        <User className="h-4 w-4" />
        <span className="sr-only">My Account</span>
      </Link>
    </nav>
  )
}

