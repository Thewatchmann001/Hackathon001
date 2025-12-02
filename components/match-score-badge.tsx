"use client"

import { Zap } from "lucide-react"

interface MatchScoreBadgeProps {
  score: number
  size?: "sm" | "md" | "lg"
  showLabel?: boolean
}

export function MatchScoreBadge({ score, size = "md", showLabel = true }: MatchScoreBadgeProps) {
  const getColor = (score: number) => {
    if (score >= 90) return "bg-green-50 text-green-700 border-green-200"
    if (score >= 80) return "bg-blue-50 text-blue-700 border-blue-200"
    if (score >= 70) return "bg-yellow-50 text-yellow-700 border-yellow-200"
    if (score >= 60) return "bg-orange-50 text-orange-700 border-orange-200"
    return "bg-red-50 text-red-700 border-red-200"
  }

  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-2 text-sm",
    lg: "px-4 py-3 text-base",
  }

  return (
    <div
      className={`flex items-center gap-1.5 border rounded-full font-semibold ${sizeClasses[size]} ${getColor(score)}`}
    >
      <Zap size={size === "sm" ? 14 : size === "md" ? 16 : 18} />
      <span>{score}%</span>
      {showLabel && <span className="hidden sm:inline">Match</span>}
    </div>
  )
}
