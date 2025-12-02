"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Mail, Lock, ArrowRight } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [userType, setUserType] = useState<"seeker" | "employer" | "startup">("seeker")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Logging in as ${userType}...`)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 flex items-center justify-center px-4 py-12 bg-background">
        <div className="w-full max-w-md">
          <Card className="p-8">
            <h1 className="text-3xl font-bold mb-2 text-center">Welcome Back</h1>
            <p className="text-muted-foreground text-center mb-8">Sign in to your TrustBridge account</p>

            {/* User Type Selection */}
            <div className="grid grid-cols-3 gap-2 mb-6">
              {(["seeker", "employer", "startup"] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setUserType(type)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                    userType === type
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-3 text-muted-foreground" />
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-3 text-muted-foreground" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
              </div>

              {/* Remember me & Forgot password */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-muted-foreground">Remember me</span>
                </label>
                <a href="#" className="text-primary hover:text-primary/80">
                  Forgot password?
                </a>
              </div>

              {/* Submit */}
              <Button type="submit" className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                Sign In
                <ArrowRight size={16} />
              </Button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-border" />
              <span className="text-sm text-muted-foreground">OR</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            {/* Sign up link */}
            <p className="text-center text-sm text-muted-foreground mb-4">
              Don't have an account?{" "}
              <Link href="/auth/register" className="text-primary hover:text-primary/80 font-medium">
                Create one
              </Link>
            </p>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}
