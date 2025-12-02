"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Briefcase, Users, TrendingUp, Plus, Edit2, Trash2, Eye, MessageSquare, Zap } from "lucide-react"

export default function EmployerDashboard() {
  const jobs = [
    {
      id: 1,
      title: "Senior React Developer",
      status: "active",
      applicants: 24,
      postedDate: "5 days ago",
      views: 342,
      matchScore: 92,
    },
    {
      id: 2,
      title: "UX Designer",
      status: "active",
      applicants: 18,
      postedDate: "10 days ago",
      views: 267,
      matchScore: 85,
    },
    {
      id: 3,
      title: "Backend Engineer",
      status: "closed",
      applicants: 31,
      postedDate: "1 month ago",
      views: 512,
      matchScore: 88,
    },
  ]

  const topApplicants = [
    {
      id: 1,
      name: "Alice Johnson",
      jobTitle: "Senior React Developer",
      matchScore: 95,
      status: "reviewing",
      appliedDate: "1 day ago",
    },
    {
      id: 2,
      name: "Bob Smith",
      jobTitle: "Senior React Developer",
      matchScore: 89,
      status: "reviewing",
      appliedDate: "2 days ago",
    },
    {
      id: 3,
      name: "Carol Davis",
      jobTitle: "UX Designer",
      matchScore: 92,
      status: "reviewing",
      appliedDate: "3 days ago",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 px-4 sm:px-6 lg:px-8 py-8 bg-background">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Employer Dashboard</h1>
              <p className="text-muted-foreground mt-1">Manage jobs, review applicants, and find the perfect talent</p>
            </div>
            <Link href="/employer/post-job">
              <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                <Plus size={16} />
                Post Job
              </Button>
            </Link>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="jobs">Active Jobs</TabsTrigger>
              <TabsTrigger value="applicants">Applicants</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* Stats */}
              <div className="grid md:grid-cols-4 gap-4">
                <Card className="p-6 bg-primary/5 border-primary/20">
                  <div className="flex items-start gap-4">
                    <Briefcase size={24} className="text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Active Jobs</p>
                      <p className="text-3xl font-bold text-primary">2</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-accent/5 border-accent/20">
                  <div className="flex items-start gap-4">
                    <Users size={24} className="text-accent" />
                    <div>
                      <p className="text-sm text-muted-foreground">Total Applicants</p>
                      <p className="text-3xl font-bold text-accent">42</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900">
                  <div className="flex items-start gap-4">
                    <TrendingUp size={24} className="text-blue-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">Profile Views</p>
                      <p className="text-3xl font-bold text-blue-600">1,121</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900">
                  <div className="flex items-start gap-4">
                    <Zap size={24} className="text-green-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">Avg Match Score</p>
                      <p className="text-3xl font-bold text-green-600">88%</p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Top Applicants */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Top Matching Applicants</h2>
                <div className="space-y-3">
                  {topApplicants.map((applicant) => (
                    <div
                      key={applicant.id}
                      className="flex items-center justify-between p-4 bg-card border border-border rounded-lg hover:border-primary transition-colors"
                    >
                      <div>
                        <h3 className="font-semibold text-foreground">{applicant.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {applicant.jobTitle} · Applied {applicant.appliedDate}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-2xl font-bold text-accent">{applicant.matchScore}%</p>
                          <p className="text-xs text-muted-foreground">Match</p>
                        </div>
                        <Link href={`/employer/applicants/1`}>
                          <Button size="sm" className="gap-1 bg-primary text-primary-foreground hover:bg-primary/90">
                            <Eye size={14} />
                            Review
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            {/* Jobs Tab */}
            <TabsContent value="jobs" className="space-y-6">
              <Card className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Your Job Postings</h2>
                  <Link href="/employer/post-job">
                    <Button size="sm" className="gap-1 bg-primary text-primary-foreground hover:bg-primary/90">
                      <Plus size={14} />
                      New Job
                    </Button>
                  </Link>
                </div>

                <div className="space-y-3">
                  {jobs.map((job) => (
                    <div
                      key={job.id}
                      className="p-4 border border-border rounded-lg hover:border-primary transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-foreground">{job.title}</h3>
                          <p className="text-sm text-muted-foreground">Posted {job.postedDate}</p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            job.status === "active" ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {job.status === "active" ? "Active" : "Closed"}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm mb-4">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Users size={16} className="text-accent" />
                          {job.applicants} applicants
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Eye size={16} className="text-accent" />
                          {job.views} views
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Zap size={16} className="text-accent" />
                          {job.matchScore}% avg match
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Link href={`/employer/applicants/${job.id}`}>
                          <Button size="sm" variant="outline" className="gap-1 bg-transparent">
                            <Users size={14} />
                            View Applicants
                          </Button>
                        </Link>
                        <Button size="sm" variant="outline" className="gap-1 bg-transparent">
                          <Edit2 size={14} />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="gap-1 text-destructive hover:text-destructive bg-transparent"
                        >
                          <Trash2 size={14} />
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            {/* Applicants Tab */}
            <TabsContent value="applicants" className="space-y-6">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-6">All Applicants</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 font-semibold text-foreground">Name</th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground">Position</th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground">Applied</th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground">Match</th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topApplicants.map((applicant) => (
                        <tr key={applicant.id} className="border-b border-border hover:bg-card transition-colors">
                          <td className="py-4 px-4 font-medium text-foreground">{applicant.name}</td>
                          <td className="py-4 px-4 text-muted-foreground">{applicant.jobTitle}</td>
                          <td className="py-4 px-4 text-muted-foreground">{applicant.appliedDate}</td>
                          <td className="py-4 px-4">
                            <span className="px-3 py-1 rounded-full bg-accent/10 text-accent font-semibold text-sm">
                              {applicant.matchScore}%
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium">
                              {applicant.status === "reviewing" ? "Under Review" : applicant.status}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex gap-2">
                              <Link href={`/employer/applicants/1`}>
                                <Button size="sm" variant="outline" className="gap-1 bg-transparent">
                                  <Eye size={14} />
                                </Button>
                              </Link>
                              <Button size="sm" variant="outline" className="gap-1 bg-transparent">
                                <MessageSquare size={14} />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  )
}
