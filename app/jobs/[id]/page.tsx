"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ArrowLeft, MapPin, DollarSign, Users, Zap, CheckCircle2, Clock, Share2 } from "lucide-react"

// Mock data - would come from API in production
const mockJobs: Record<number, any> = {
  1: {
    id: 1,
    title: "Senior React Developer",
    company: "TechHub SL",
    location: "Freetown",
    category: "Technology",
    type: "Full-Time",
    salary: 3500,
    description: "We are looking for an experienced React developer to join our growing team.",
    fullDescription:
      "We are seeking a talented and experienced React developer to join our dynamic tech team. You will work on challenging projects, collaborate with talented engineers, and help shape the future of technology in Sierra Leone.",
    requirements: [
      "5+ years of React development experience",
      "Strong TypeScript skills",
      "Experience with Node.js backend",
      "PostgreSQL database knowledge",
      "Git version control proficiency",
    ],
    benefits: [
      "Competitive salary package",
      "Health insurance",
      "Professional development opportunities",
      "Flexible working arrangements",
      "Team bonuses",
    ],
    skills: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    matchScore: 92,
    applicants: 24,
    postedDate: "2 days ago",
    deadline: "March 15, 2025",
  },
}

export default function JobDetailPage() {
  const { id } = useParams()
  const [hasApplied, setHasApplied] = useState(false)
  const jobId = typeof id === "string" ? Number.parseInt(id) : 1
  const job = mockJobs[jobId] || mockJobs[1]

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 px-4 sm:px-6 lg:px-8 py-8 bg-background">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link href="/jobs" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-6">
            <ArrowLeft size={16} />
            Back to jobs
          </Link>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-6">
              {/* Header */}
              <div>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
                    <p className="text-lg text-muted-foreground">{job.company}</p>
                  </div>
                  <div className="px-3 py-1 bg-primary/10 rounded-full text-sm font-semibold text-primary">
                    {job.type}
                  </div>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <MapPin size={18} className="text-accent" />
                  <div className="text-sm">
                    <p className="text-muted-foreground">Location</p>
                    <p className="font-semibold">{job.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign size={18} className="text-accent" />
                  <div className="text-sm">
                    <p className="text-muted-foreground">Salary</p>
                    <p className="font-semibold">LE {job.salary.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={18} className="text-accent" />
                  <div className="text-sm">
                    <p className="text-muted-foreground">Applicants</p>
                    <p className="font-semibold">{job.applicants}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={18} className="text-accent" />
                  <div className="text-sm">
                    <p className="text-muted-foreground">Posted</p>
                    <p className="font-semibold">{job.postedDate}</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-3">About the Role</h2>
                <p className="text-muted-foreground mb-4">{job.fullDescription}</p>
              </Card>

              {/* Requirements */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Requirements</h2>
                <ul className="space-y-3">
                  {job.requirements.map((req: string) => (
                    <li key={req} className="flex items-start gap-3">
                      <CheckCircle2 size={18} className="text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{req}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              {/* Benefits */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">What We Offer</h2>
                <ul className="space-y-3">
                  {job.benefits.map((benefit: string) => (
                    <li key={benefit} className="flex items-start gap-3">
                      <CheckCircle2 size={18} className="text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              {/* Skills */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Required Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill) => (
                    <span key={skill} className="px-3 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Match Score Card */}
              <Card className="p-6 bg-accent/5 border-accent/20 sticky top-20">
                <div className="flex items-center gap-3 mb-4">
                  <Zap size={24} className="text-accent" />
                  <div>
                    <p className="text-xs text-muted-foreground">Match Score</p>
                    <p className="text-2xl font-bold text-accent">{job.matchScore}%</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">Your profile strongly aligns with this role.</p>

                {!hasApplied ? (
                  <Button
                    onClick={() => setHasApplied(true)}
                    className="w-full font-medium mb-2 bg-accent text-accent-foreground hover:bg-accent/90"
                  >
                    Apply Now
                  </Button>
                ) : (
                  <Button disabled className="w-full font-medium mb-2">
                    <CheckCircle2 size={16} className="mr-2" />
                    Application Sent
                  </Button>
                )}

                <Button variant="outline" className="w-full gap-2 font-medium bg-transparent">
                  <Share2 size={16} />
                  Share
                </Button>
              </Card>

              {/* Deadline Card */}
              <Card className="p-4 border-orange-200 bg-orange-50 dark:bg-orange-950/20">
                <p className="text-xs text-muted-foreground mb-1">Application Deadline</p>
                <p className="font-semibold text-foreground">{job.deadline}</p>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
