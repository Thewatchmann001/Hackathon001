"use client"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

interface KycVerificationCardProps {
  user: any
  isSelected: boolean
  onSelect: () => void
}

export function KycVerificationCard({ user, isSelected, onSelect }: KycVerificationCardProps) {
  const getStatusIcon = (status: string) => {
    if (status === "verified") return <CheckCircle2 className="h-5 w-5 text-green-600" />
    return <Clock className="h-5 w-5 text-orange-600" />
  }

  return (
    <Card
      onClick={onSelect}
      className={cn(
        "p-4 cursor-pointer transition-all hover:shadow-lg border-2",
        isSelected ? "border-primary bg-primary/5" : "border-transparent",
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4 flex-1">
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-semibold text-sm">
            {user.profileImage}
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold">{user.name}</h3>
              <Badge variant="outline" className="text-xs">
                {user.category}
              </Badge>
            </div>
            <p className="text-sm text-foreground/60">{user.email}</p>
            <p className="text-xs text-foreground/40 mt-1">Submitted: {user.submittedDate}</p>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-2">
            {getStatusIcon(user.status)}
            <Badge variant={user.status === "verified" ? "default" : "secondary"}>
              {user.status === "verified" ? "Verified" : "Pending"}
            </Badge>
          </div>
          <p className="text-xs text-foreground/40">{user.documents.length} documents</p>
        </div>
      </div>
    </Card>
  )
}
