"use client"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { JobCard } from "./job-card"

// Mock data - in production, this would come from an API
const mockJobs = [
  {
    id: 1,
    title: "Senior React Developer",
    company: "TechHub SL",
    location: "Freetown",
    category: "Technology",
    type: "Full-Time",
    salary: 3500,
    description: "We are looking for an experienced React developer to join our growing team.",
    skills: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    matchScore: 92,
    applicants: 24,
  },
  {
    id: 2,
    title: "Healthcare Administrator",
    company: "Sierra Leone General Hospital",
    location: "Freetown",
    category: "Healthcare",
    type: "Full-Time",
    salary: 2000,
    description: "Manage administrative operations for our healthcare facility.",
    skills: ["Administration", "Patient Care", "Data Management", "Communication"],
    matchScore: 78,
    applicants: 15,
  },
  {
    id: 3,
    title: "Financial Analyst",
    company: "Sierra Leone Bank Ltd",
    location: "Freetown",
    category: "Finance",
    type: "Full-Time",
    salary: 2800,
    description: "Analyze financial data and provide insights for strategic decisions.",
    skills: ["Excel", "Financial Analysis", "Reporting", "Python"],
    matchScore: 85,
    applicants: 18,
  },
  {
    id: 4,
    title: "Marketing Manager",
    company: "Creative Minds Agency",
    location: "Freetown",
    category: "Marketing",
    type: "Full-Time",
    salary: 2200,
    description: "Lead marketing campaigns and brand strategy initiatives.",
    skills: ["Digital Marketing", "Campaign Management", "Analytics", "Leadership"],
    matchScore: 72,
    applicants: 12,
  },
  {
    id: 5,
    title: "Educational Content Developer",
    company: "Sierra Leone Online Academy",
    location: "Remote",
    category: "Education",
    type: "Part-Time",
    salary: 1500,
    description: "Create engaging educational content for online learners.",
    skills: ["Curriculum Design", "Content Writing", "Research", "Teaching"],
    matchScore: 88,
    applicants: 8,
  },
  {
    id: 6,
    title: "Sales Representative",
    company: "Tech Solutions Inc",
    location: "Bo",
    category: "Sales",
    type: "Full-Time",
    salary: 1800,
    description: "Sell tech products and build client relationships.",
    skills: ["Sales", "Communication", "Negotiation", "CRM"],
    matchScore: 65,
    applicants: 22,
  },
]

interface JobListProps {
  selectedCategory: string
  selectedLocation: string
  selectedType: string
  salarySorting: "low" | "high" | "all"
}

export function JobList({ selectedCategory, selectedLocation, selectedType, salarySorting }: JobListProps) {
  let filteredJobs = mockJobs

  if (selectedCategory) {
    filteredJobs = filteredJobs.filter((job) => job.category === selectedCategory)
  }
  if (selectedLocation) {
    filteredJobs = filteredJobs.filter((job) => job.location === selectedLocation)
  }
  if (selectedType) {
    filteredJobs = filteredJobs.filter((job) => job.type === selectedType)
  }

  if (salarySorting === "low") {
    filteredJobs = [...filteredJobs].sort((a, b) => a.salary - b.salary)
  } else if (salarySorting === "high") {
    filteredJobs = [...filteredJobs].sort((a, b) => b.salary - a.salary)
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Showing {filteredJobs.length} {filteredJobs.length === 1 ? "job" : "jobs"}
      </p>

      {filteredJobs.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground mb-4">No jobs match your filters.</p>
          <Button variant="link" className="mt-2 text-primary" onClick={() => window.location.reload()}>
            Try adjusting your search or reset the filters.
          </Button>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  )
}
