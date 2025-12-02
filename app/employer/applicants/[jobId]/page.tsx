"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import {
  ArrowLeft,
  Download,
  Mail,
  Phone,
  CheckCircle2,
  Clock,
  XCircle,
  Zap,
  Eye,
  Merge as Message,
} from "lucide-react"

export default function ApplicantsPage() {
  const { jobId } = useParams()
  const [selectedApplicant, setSelectedApplicant] = useState<number | null>(null)

  const applicants = [
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@example.com",
      phone: "+232 79 111 111",
      cv: "alice_cv.pdf",
      appliedDate: "1 day ago",
      matchScore: 95,
      status: "reviewing",
      skills: ["React", "TypeScript", "Node.js", "PostgreSQL", "AWS"],
      experience: "5 years",
      summary:
        "Senior developer with expertise in full-stack React applications. Passionate about building scalable solutions.",
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob@example.com",
      phone: "+232 79 222 222",
      cv: "bob_cv.pdf",
      appliedDate: "2 days ago",
      matchScore: 89,
      status: "reviewing",
      skills: ["React", "JavaScript", "Node.js", "MongoDB"],
      experience: "4 years",
      summary:
        "Full-stack developer with strong JavaScript fundamentals. Experience building responsive web applications.",
    },
    {
      id: 3,
      name: "Carol Davis",
      email: "carol@example.com",
      phone: "+232 79 333 333",
      cv: "carol_cv.pdf",
      appliedDate: "3 days ago",
      matchScore: 82,
      status: "reviewing",
      skills: ["React", "Vue", "JavaScript", "CSS"],
      experience: "3 years",
      summary: "Frontend specialist with focus on user experience and responsive design.",
    },
  ]

  const selectedApp = selectedApplicant ? applicants.find((a) => a.id === selectedApplicant) : null

  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted":
        return "bg-green-50 text-green-700"
      case "rejected":
        return "bg-red-50 text-red-700"
      default:
        return "bg-blue-50 text-blue-700"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "accepted":
        return CheckCircle2
      case "rejected":
        return XCircle
      default:
        return Clock
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 px-4 sm:px-6 lg:px-8 py-8 bg-background">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <Link href="/employer" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-6">
            <ArrowLeft size={16} />
            Back to jobs
          </Link>

          <h1 className="text-3xl font-bold mb-8">Job Applicants</h1>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Applicants List */}
            <div className="lg:col-span-1">
              <Card className="p-0 border border-border max-h-96 overflow-y-auto">
                {applicants.map((applicant) => (
                  <button
                    key={applicant.id}
                    onClick={() => setSelectedApplicant(applicant.id)}
                    className={`w-full text-left p-4 border-b border-border hover:bg-card transition-colors ${
                      selectedApplicant === applicant.id ? "bg-primary/10 border-l-2 border-l-primary" : ""
                    }`}
                  >
                    <h3 className="font-semibold text-foreground">{applicant.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{applicant.appliedDate}</p>
                    <div className="flex items-center gap-2">
                      <Zap size={16} className="text-accent" />
                      <span className="text-sm font-semibold text-accent">{applicant.matchScore}% Match</span>
                    </div>
                  </button>
                ))}
              </Card>
            </div>

            {/* Applicant Details */}
            <div className="lg:col-span-2">
              {selectedApp ? (
                <div className="space-y-6">
                  {/* Header Card */}
                  <Card className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h2 className="text-2xl font-bold">{selectedApp.name}</h2>
                        <p className="text-muted-foreground">{selectedApp.experience} of experience</p>
                      </div>
                      <div className="text-right">
                        <p className="text-4xl font-bold text-accent">{selectedApp.matchScore}%</p>
                        <p className="text-sm text-muted-foreground">Match Score</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm mb-6">
                      <a
                        href={`mailto:${selectedApp.email}`}
                        className="flex items-center gap-2 text-primary hover:text-primary/80"
                      >
                        <Mail size={16} />
                        {selectedApp.email}
                      </a>
                      <a
                        href={`tel:${selectedApp.phone}`}
                        className="flex items-center gap-2 text-primary hover:text-primary/80"
                      >
                        <Phone size={16} />
                        {selectedApp.phone}
                      </a>
                    </div>

                    <div className="flex gap-2">
                      <Button className="gap-2 flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
                        <Download size={16} />
                        Download CV
                      </Button>
                      <Button variant="outline" className="gap-2 flex-1 bg-transparent">
                        <Message size={16} />
                        Send Message
                      </Button>
                    </div>
                  </Card>

                  {/* Summary */}
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-3">Professional Summary</h3>
                    <p className="text-muted-foreground">{selectedApp.summary}</p>
                  </Card>

                  {/* Skills */}
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedApp.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </Card>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button className="flex-1 bg-green-600 text-white hover:bg-green-700 gap-2">
                      <CheckCircle2 size={16} />
                      Accept
                    </Button>
                    <Button variant="outline" className="flex-1 gap-2 text-red-600 hover:text-red-700 bg-transparent">
                      <XCircle size={16} />
                      Reject
                    </Button>
                  </div>
                </div>
              ) : (
                <Card className="p-12 text-center">
                  <Eye size={48} className="mx-auto text-muted-foreground mb-4" />
                  <p className="text-lg text-muted-foreground">Select an applicant to view details</p>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
