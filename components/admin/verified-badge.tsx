import { CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface VerifiedBadgeProps {
  isVerified: boolean
  size?: "sm" | "md" | "lg"
}

export function VerifiedBadge({ isVerified, size = "md" }: VerifiedBadgeProps) {
  if (!isVerified) return null

  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  }

  return (
    <div className="flex items-center gap-1">
      <CheckCircle2 className={cn("text-primary fill-primary", sizeClasses[size])} />
      <span className="text-xs font-semibold text-primary">Verified</span>
    </div>
  )
}
