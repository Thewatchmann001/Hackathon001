"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, LogOut } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { userType, isLoggedIn, logout } = useAuth()

  // Base links visible to all users
  const baseLinks = [
    { label: "Home", href: "/" },
    { label: "Search Jobs", href: "/jobs" },
    { label: "Startups", href: "/startups" },
  ]

  // Conditional links based on user type
  const getDynamicLinks = () => {
    const links = [...baseLinks]

    if (isLoggedIn) {
      if (userType === "seeker") {
        links.splice(2, 0, { label: "CV Maker", href: "/cv-maker" })
        links.push({ label: "My Dashboard", href: "/dashboard" })
      } else if (userType === "employer") {
        links.push({ label: "Employer Dashboard", href: "/employer" })
      }
    } else {
      links.splice(2, 0, { label: "CV Maker", href: "/cv-maker" })
    }

    return links
  }

  const links = getDynamicLinks()

  return (
    <nav className="sticky top-0 z-50 w-full bg-background border-b border-primary/20 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Enhanced */}
          <Link
            href="/"
            className="font-bold text-xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
          >
            TrustBridge SL
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-foreground hover:text-primary transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth Buttons / User Menu */}
          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              <>
                <span className="text-sm text-foreground/60 capitalize font-medium">
                  {userType === "seeker" ? "Job Seeker" : userType === "employer" ? "Employer" : "Startup"}
                </span>
                <Button
                  variant="outline"
                  className="font-semibold bg-transparent gap-2 border-primary/30 hover:bg-primary/5"
                  onClick={logout}
                >
                  <LogOut size={16} />
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button
                    variant="outline"
                    className="font-semibold bg-transparent border-primary/30 hover:bg-primary/5"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button className="font-semibold bg-primary text-primary-foreground hover:bg-primary/90 shadow-md">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 border-t border-primary/10 pt-4 space-y-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-sm font-semibold text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-primary/10 pt-3 mt-3 flex flex-col gap-2">
              {isLoggedIn ? (
                <>
                  <span className="text-sm text-foreground/60 capitalize px-3 font-medium">
                    {userType === "seeker" ? "Job Seeker" : userType === "employer" ? "Employer" : "Startup"}
                  </span>
                  <Button
                    variant="outline"
                    className="w-full font-semibold bg-transparent border-primary/30 hover:bg-primary/5 gap-2"
                    onClick={() => {
                      logout()
                      setIsOpen(false)
                    }}
                  >
                    <LogOut size={16} />
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/auth/login" className="w-full">
                    <Button
                      variant="outline"
                      className="w-full font-semibold bg-transparent border-primary/30 hover:bg-primary/5"
                    >
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/auth/register" className="w-full">
                    <Button className="w-full font-semibold bg-primary text-primary-foreground hover:bg-primary/90">
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
