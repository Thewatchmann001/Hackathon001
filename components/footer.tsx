"use client"

import Link from "next/link"
import { Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="w-full bg-gradient-to-b from-primary/5 to-background border-t border-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand - Enhanced */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              TrustBridge SL
            </h3>
            <p className="text-sm text-foreground/70 leading-relaxed">
              Empowering Sierra Leone's talent and ambition. Built by Sierra Leoneans, for Sierra Leoneans.
            </p>
            <div className="flex items-center gap-2 text-sm text-primary font-semibold">
              <Heart className="h-4 w-4 fill-primary" />
              Made in Sierra Leone
            </div>
          </div>

          {/* For Job Seekers */}
          <div>
            <h4 className="font-semibold text-sm mb-4 text-foreground">For Job Seekers</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/jobs" className="text-foreground/70 hover:text-primary transition-colors font-medium">
                  Search Jobs
                </Link>
              </li>
              <li>
                <Link href="/cv-maker" className="text-foreground/70 hover:text-primary transition-colors font-medium">
                  Create CV
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-foreground/70 hover:text-primary transition-colors font-medium">
                  My Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* For Employers */}
          <div>
            <h4 className="font-semibold text-sm mb-4 text-foreground">For Employers</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/employer" className="text-foreground/70 hover:text-primary transition-colors font-medium">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/employer/post-job"
                  className="text-foreground/70 hover:text-primary transition-colors font-medium"
                >
                  Post a Job
                </Link>
              </li>
              <li>
                <Link
                  href="/employer/applicants/1"
                  className="text-foreground/70 hover:text-primary transition-colors font-medium"
                >
                  View Applicants
                </Link>
              </li>
            </ul>
          </div>

          {/* For Startups */}
          <div>
            <h4 className="font-semibold text-sm mb-4 text-foreground">For Startups</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/startups" className="text-foreground/70 hover:text-primary transition-colors font-medium">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link
                  href="/auth/register"
                  className="text-foreground/70 hover:text-primary transition-colors font-medium"
                >
                  Register Startup
                </Link>
              </li>
              <li>
                <Link
                  href="/auth/login"
                  className="text-foreground/70 hover:text-primary transition-colors font-medium"
                >
                  Investor Login
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary/10 pt-8">
          <p className="text-center text-sm text-foreground/60">
            © 2025 TrustBridge SL. Empowering Sierra Leone's workforce and innovation ecosystem.
          </p>
        </div>
      </div>
    </footer>
  )
}
