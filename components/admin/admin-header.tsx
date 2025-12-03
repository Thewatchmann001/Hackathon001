"use client"
import { Button } from "@/components/ui/button"
import { Menu, Bell, Settings } from "lucide-react"

interface AdminHeaderProps {
  onMenuClick: () => void
}

export function AdminHeader({ onMenuClick }: AdminHeaderProps) {
  return (
    <header className="h-16 bg-white border-b border-border flex items-center justify-between px-8 shadow-sm">
      <Button variant="ghost" size="icon" onClick={onMenuClick} className="md:hidden">
        <Menu className="h-5 w-5" />
      </Button>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2 w-2 bg-destructive rounded-full" />
        </Button>

        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>

        <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center font-semibold text-sm text-primary">
          AD
        </div>
      </div>
    </header>
  )
}
