"use client"
import { cn } from "@/lib/utils"
import { LayoutDashboard, CheckCircle2, Users, Settings, LogOut, ChevronLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface AdminSidebarProps {
  open: boolean
  onToggle: () => void
}

export function AdminSidebar({ open, onToggle }: AdminSidebarProps) {
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
    { icon: CheckCircle2, label: "KYC Verification", href: "/admin/kyc-verification" },
    { icon: Users, label: "User Management", href: "/admin/users" },
    { icon: Settings, label: "Settings", href: "/admin/settings" },
  ]

  return (
    <aside
      className={cn(
        "bg-sidebar border-r border-sidebar-border h-full transition-all duration-300 flex flex-col",
        open ? "w-64" : "w-20",
      )}
    >
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border flex items-center justify-between">
        {open && <h1 className="font-bold text-lg text-sidebar-primary">TrustBridge</h1>}
        <Button variant="ghost" size="icon" onClick={onToggle} className="h-8 w-8">
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent/10 hover:text-sidebar-accent",
                  !open && "px-2",
                )}
                title={item.label}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {open && <span className="ml-3">{item.label}</span>}
              </Button>
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-sidebar-border">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start text-sidebar-foreground hover:bg-destructive/10 hover:text-destructive",
            !open && "px-2",
          )}
        >
          <LogOut className="h-5 w-5 flex-shrink-0" />
          {open && <span className="ml-3">Logout</span>}
        </Button>
      </div>
    </aside>
  )
}
