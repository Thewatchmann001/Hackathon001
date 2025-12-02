"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Heart, Briefcase, Settings, Upload, Edit2, LogOut, Clock, CheckCircle2 } from "lucide-react"
import { ProfileCard } from "./components/profile-card"
import { CVViewer } from "./components/cv-viewer"
import { ApplicationHistory } from "./components/application-history"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [userProfile, setUserProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
    location: "Freetown",
    title: "Software Engineer",
    bio: "Passionate about building innovative solutions",
    avatar: "👤",
    phone: "+232 79 000 000",
    skills: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    cvUploaded: true,
  })

  const applications = [
    {
      id: 1,
      jobTitle: "Senior React Developer",
      company: "TechHub SL",
      appliedDate: "2 days ago",
      status: "under-review",
      matchScore: 92,
    },
    {
      id: 2,
      jobTitle: "Financial Analyst",
      company: "Sierra Leone Bank Ltd",
      appliedDate: "1 week ago",
      status: "accepted",
      matchScore: 85,
    },
    {
      id: 3,
      jobTitle: "Marketing Manager",
      company: "Creative Minds Agency",
      appliedDate: "2 weeks ago",
      status: "rejected",
      matchScore: 72,
    },
  ]

  const savedJobs = [
    { id: 1, title: "UX Designer", company: "Design Studio", matchScore: 88 },
    { id: 2, title: "Product Manager", company: "Tech Innovations", matchScore: 81 },
    { id: 3, title: "DevOps Engineer", company: "Cloud Systems", matchScore: 79 },
  ]

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
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 px-4 sm:px-6 lg:px-8 py-8 bg-background">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Welcome back, {userProfile.name}</h1>
              <p className="text-muted-foreground mt-1">Here's what's happening with your job search today</p>
            </div>
            <Link href="/auth/login">
              <Button variant="outline" className="gap-2 bg-transparent">
                <LogOut size={16} />
                Sign Out
              </Button>
            </Link>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview" className="gap-2">
                <Briefcase size={16} />
                <span className="hidden sm:inline">Overview</span>
              </TabsTrigger>
              <TabsTrigger value="cv" className="gap-2">
                <FileText size={16} />
                <span className="hidden sm:inline">CV</span>
              </TabsTrigger>
              <TabsTrigger value="applications" className="gap-2">
                <Clock size={16} />
                <span className="hidden sm:inline">Applications</span>
              </TabsTrigger>
              <TabsTrigger value="profile" className="gap-2">
                <Settings size={16} />
                <span className="hidden sm:inline">Profile</span>
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                {/* Profile Summary */}
                <ProfileCard profile={userProfile} />

                {/* Stats */}
                <div className="space-y-4">
                  <Card className="p-6 bg-primary/5 border-primary/20">
                    <div className="flex items-start gap-4">
                      <Briefcase size={24} className="text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Your Applications</p>
                        <p className="text-3xl font-bold text-primary">{applications.length}</p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 bg-accent/5 border-accent/20">
                    <div className="flex items-start gap-4">
                      <Heart size={24} className="text-accent" />
                      <div>
                        <p className="text-sm text-muted-foreground">Saved Jobs</p>
                        <p className="text-3xl font-bold text-accent">{savedJobs.length}</p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900">
                    <div className="flex items-start gap-4">
                      <CheckCircle2 size={24} className="text-green-600" />
                      <div>
                        <p className="text-sm text-muted-foreground">Profile Complete</p>
                        <p className="text-3xl font-bold text-green-600">100%</p>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>

              {/* Recent Applications */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Your Applications</h2>
                <div className="space-y-3">
                  {applications.slice(0, 3).map((app) => (
                    <div
                      key={app.id}
                      className="flex items-center justify-between p-3 bg-card border border-border rounded-lg hover:border-primary transition-colors"
                    >
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">{app.jobTitle}</h3>
                        <p className="text-sm text-muted-foreground">
                          {app.company} · {app.appliedDate}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className={`px-2 py-1 rounded text-sm font-medium ${getStatusColor(app.status)}`}>
                          {getStatusLabel(app.status)}
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-accent">{app.matchScore}%</p>
                          <p className="text-xs text-muted-foreground">Match</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Link href="#applications" onClick={() => setActiveTab("applications")}>
                  <Button variant="link" className="mt-3 text-primary">
                    View all applications →
                  </Button>
                </Link>
              </Card>

              {/* Saved Jobs */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Saved Jobs</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {savedJobs.map((job) => (
                    <Card key={job.id} className="p-4 hover:shadow-lg transition-shadow">
                      <h3 className="font-semibold text-foreground mb-1">{job.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{job.company}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-accent font-semibold">{job.matchScore}% Match</span>
                        <Button size="sm" className="gap-1 bg-primary text-primary-foreground hover:bg-primary/90">
                          View
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>
            </TabsContent>

            {/* CV Tab */}
            <TabsContent value="cv" className="space-y-6">
              <CVViewer profile={userProfile} />
            </TabsContent>

            {/* Applications Tab */}
            <TabsContent value="applications" className="space-y-6">
              <ApplicationHistory applications={applications} />
            </TabsContent>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <Card className="p-6">
                <h2 className="text-2xl font-semibold mb-6">Edit Profile</h2>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Full Name</label>
                      <input
                        type="text"
                        defaultValue={userProfile.name}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Title</label>
                      <input
                        type="text"
                        defaultValue={userProfile.title}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <input
                        type="email"
                        defaultValue={userProfile.email}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone</label>
                      <input
                        type="tel"
                        defaultValue={userProfile.phone}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Location</label>
                    <input
                      type="text"
                      defaultValue={userProfile.location}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Bio</label>
                    <textarea
                      defaultValue={userProfile.bio}
                      rows={4}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div className="flex gap-3">
                    <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                      <Edit2 size={16} />
                      Save Changes
                    </Button>
                    <Link href="/cv-maker/upload">
                      <Button variant="outline" className="gap-2 bg-transparent">
                        <Upload size={16} />
                        Update CV
                      </Button>
                    </Link>
                  </div>
                </form>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  )
}
