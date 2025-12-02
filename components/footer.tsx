"use client"

import Link from "next/link"

export function Footer() {
  return (
    <footer className="w-full bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="font-bold text-lg text-primary mb-4">TrustBridge SL</h3>
            <p className="text-sm text-muted-foreground">
              Connecting Sierra Leone's talent to the right jobs, opportunities, and investors.
            </p>
          </div>

          {/* Job Seekers */}
          <div>
            <h4 className="font-semibold text-sm mb-3">For Job Seekers</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/jobs" className="text-muted-foreground hover:text-primary transition-colors">
                  Search Jobs
                </Link>
              </li>
              <li>
                <Link href="/cv-maker" className="text-muted-foreground hover:text-primary transition-colors">
                  Create CV
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-muted-foreground hover:text-primary transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Employers */}
          <div>
            <h4 className="font-semibold text-sm mb-3">For Employers</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/employer" className="text-muted-foreground hover:text-primary transition-colors">
                  Employer Dashboard
                </Link>
              </li>
              <li>
                <Link href="/employer/post-job" className="text-muted-foreground hover:text-primary transition-colors">
                  Post a Job
                </Link>
              </li>
              <li>
                <Link
                  href="/employer/applicants/1"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  View Applicants
                </Link>
              </li>
            </ul>
          </div>

          {/* Startups */}
          <div>
            <h4 className="font-semibold text-sm mb-3">For Startups</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/startups" className="text-muted-foreground hover:text-primary transition-colors">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link href="/auth/register" className="text-muted-foreground hover:text-primary transition-colors">
                  Register Startup
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8">
          <p className="text-center text-sm text-muted-foreground">
            © 2025 TrustBridge SL. Empowering Sierra Leone's workforce.
          </p>
        </div>
      </div>
    </footer>
  )
}
