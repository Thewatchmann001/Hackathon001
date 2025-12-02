import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"

interface Application {
  id: number
  jobTitle: string
  company: string
  appliedDate: string
  status: string
  matchScore: number
}

interface ApplicationHistoryProps {
  applications: Application[]
}

export function ApplicationHistory({ applications }: ApplicationHistoryProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted":
        return "text-green-600 bg-green-50"
      case "rejected":
        return "text-red-600 bg-red-50"
      default:
        return "text-blue-600 bg-blue-50"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "under-review":
        return "Under Review"
      case "accepted":
        return "Accepted"
      case "rejected":
        return "Rejected"
      default:
        return status
    }
  }

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">Application History</h2>
      {applications.length === 0 ? (
        <p className="text-center text-muted-foreground py-8">No applications yet. Start applying to jobs!</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-foreground">Job Title</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Company</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Applied</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Match</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Action</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app.id} className="border-b border-border hover:bg-card transition-colors">
                  <td className="py-4 px-4 font-medium text-foreground">{app.jobTitle}</td>
                  <td className="py-4 px-4 text-muted-foreground">{app.company}</td>
                  <td className="py-4 px-4 text-muted-foreground">{app.appliedDate}</td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(app.status)}`}>
                      {getStatusLabel(app.status)}
                    </span>
                  </td>
                  <td className="py-4 px-4 font-semibold text-accent">{app.matchScore}%</td>
                  <td className="py-4 px-4">
                    <Button size="sm" variant="outline" className="gap-1 bg-transparent">
                      <Eye size={14} />
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  )
}
