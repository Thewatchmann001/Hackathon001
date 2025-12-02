"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

type UserType = "seeker" | "employer" | "startup" | null

interface AuthContextType {
  userType: UserType
  isLoggedIn: boolean
  setUser: (type: UserType) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userType, setUserType] = useState<UserType>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const setUser = (type: UserType) => {
    setUserType(type)
    setIsLoggedIn(!!type)
  }

  const logout = () => {
    setUserType(null)
    setIsLoggedIn(false)
  }

  return <AuthContext.Provider value={{ userType, isLoggedIn, setUser, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
