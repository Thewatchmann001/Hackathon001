import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit2, Download } from "lucide-react"

interface ProfileCardProps {
  profile: {
    name: string
    title: string
    location: string
    avatar: string
    email: string
    phone: string
  }
}

export function ProfileCard({ profile }: ProfileCardProps) {
  return (
    <Card className="p-6 md:col-span-1 text-center">
      <div className="text-5xl mb-4">{profile.avatar}</div>
      <h2 className="text-2xl font-bold">{profile.name}</h2>
      <p className="text-accent font-semibold mb-1">{profile.title}</p>
      <p className="text-sm text-muted-foreground mb-4">{profile.location}</p>

      <div className="space-y-2 mb-6 text-sm">
        <p className="text-muted-foreground">{profile.email}</p>
        <p className="text-muted-foreground">{profile.phone}</p>
      </div>

      <div className="flex gap-2">
        <Button variant="outline" className="flex-1 gap-2 bg-transparent">
          <Edit2 size={16} />
          Edit
        </Button>
        <Button className="flex-1 gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
          <Download size={16} />
          Download CV
        </Button>
      </div>
    </Card>
  )
}
