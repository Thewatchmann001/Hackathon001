"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, DollarSign, Users, Zap } from "lucide-react"

interface JobCardProps {
  job: {
    id: number
    title: string
    company: string
    location: string
    category: string
    type: string
    salary: number
    description: string
    skills: string[]
    matchScore: number
    applicants: number
  }
}

export function JobCard({ job }: JobCardProps) {
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow group">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        {/* Job Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-3 mb-3">
            <div className="flex-1">
              <Link href={`/jobs/${job.id}`}>
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors cursor-pointer">
                  {job.title}
                </h3>
              </Link>
              <p className="text-sm text-muted-foreground">{job.company}</p>
            </div>
            <div className="flex-shrink-0 px-2 py-1 bg-primary/10 rounded text-xs font-semibold text-primary">
              {job.type}
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin size={16} className="text-accent" />
              {job.location}
            </div>
            <div className="flex items-center gap-1">
              <DollarSign size={16} className="text-accent" />
              LE {job.salary.toLocaleString()}
            </div>
            <div className="flex items-center gap-1">
              <Users size={16} className="text-accent" />
              {job.applicants} applicants
            </div>
          </div>

          {/* Description Preview */}
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{job.description}</p>

          {/* Skills */}
          <div className="flex flex-wrap gap-2">
            {job.skills.slice(0, 3).map((skill) => (
              <span key={skill} className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded">
                {skill}
              </span>
            ))}
            {job.skills.length > 3 && (
              <span className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded">
                +{job.skills.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Match Score & Action */}
        <div className="flex flex-col items-end gap-3 sm:pl-4">
          {/* Match Score */}
          <div className="px-3 py-2 bg-accent/10 rounded-lg text-right">
            <div className="flex items-center gap-1 justify-end mb-1">
              <Zap size={16} className="text-accent" />
              <span className="text-lg font-bold text-accent">{job.matchScore}%</span>
            </div>
            <p className="text-xs text-muted-foreground">Match</p>
          </div>

          {/* Apply Button */}
          <Link href={`/jobs/${job.id}`} className="w-full sm:w-auto">
            <Button className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
              View Details →
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  )
}
