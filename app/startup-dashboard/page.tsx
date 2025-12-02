"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building2, Users, DollarSign, Edit2, LogOut, Plus, Upload } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"

export default function StartupDashboardPage() {
  const router = useRouter()
  const { userType, isLoggedIn, logout } = useAuth()
  const [activeTab, setActiveTab] = useState("profile")
  const [startupData, setStartupData] = useState({
    name: "",
    category: "Technology",
    description: "",
    fullDescription: "",
    problem: "",
    whySL: "",
    stage: "Seed",
    fundingNeeded: 50000,
    currentFunding: 0,
    teamSize: 0,
    founders: [] as string[],
    foundersInfo: "",
    highlights: [] as string[],
    email: "",
    phone: "",
    website: "",
    location: "Freetown",
    logo: "",
  })

  useEffect(() => {
    if (isLoggedIn && userType !== "startup") {
      router.push("/")
    }
  }, [isLoggedIn, userType, router])

  useEffect(() => {
    const saved = localStorage.getItem("startupData")
    if (saved) {
      setStartupData(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("startupData", JSON.stringify(startupData))
  }, [startupData])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setStartupData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFoundersChange = (index: number, value: string) => {
    setStartupData((prev) => ({
      ...prev,
      founders: prev.founders.map((f, i) => (i === index ? value : f)),
    }))
  }

  const addFounder = () => {
    setStartupData((prev) => ({
      ...prev,
      founders: [...prev.founders, ""],
    }))
  }

  const handleHighlightsChange = (index: number, value: string) => {
    setStartupData((prev) => ({
      ...prev,
      highlights: prev.highlights.map((h, i) => (i === index ? value : h)),
    }))
  }

  const addHighlight = () => {
    setStartupData((prev) => ({
      ...prev,
      highlights: [...prev.highlights, ""],
    }))
  }

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.onload = (event) => {
        setStartupData((prev) => ({ ...prev, logo: event.target?.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  const fundingProgress = (current: number, needed: number) => (current / needed) * 100

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 px-4 sm:px-6 lg:px-8 py-8 bg-background">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Startup Dashboard</h1>
              <p className="text-muted-foreground mt-1">Manage your startup profile and funding</p>
            </div>
            <Link href="/auth/login">
              <Button variant="outline" className="gap-2 bg-transparent">
                <LogOut size={16} />
                Sign Out
              </Button>
            </Link>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile" className="gap-2">
                <Building2 size={16} />
                <span className="hidden sm:inline">Profile</span>
              </TabsTrigger>
              <TabsTrigger value="funding" className="gap-2">
                <DollarSign size={16} />
                <span className="hidden sm:inline">Funding</span>
              </TabsTrigger>
              <TabsTrigger value="team" className="gap-2">
                <Users size={16} />
                <span className="hidden sm:inline">Team</span>
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <Card className="p-6">
                <h2 className="text-2xl font-semibold mb-6">Upload Your Logo</h2>
                <div className="border-2 border-dashed border-border rounded-lg p-8 hover:border-primary transition-colors cursor-pointer">
                  <input
                    type="file"
                    id="startup-logo"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                  <label htmlFor="startup-logo" className="cursor-pointer flex flex-col items-center gap-3">
                    {startupData.logo ? (
                      <>
                        <img
                          src={startupData.logo || "/placeholder.svg"}
                          alt="Logo"
                          className="w-32 h-32 object-contain"
                        />
                        <p className="text-sm text-muted-foreground">Click to change logo</p>
                      </>
                    ) : (
                      <>
                        <Upload size={40} className="text-muted-foreground" />
                        <p className="text-sm font-medium">Upload Your Startup Logo</p>
                        <p className="text-xs text-muted-foreground">PNG, JPG, SVG (Max 5MB)</p>
                      </>
                    )}
                  </label>
                </div>
              </Card>

              <Card className="p-6">
                <h2 className="text-2xl font-semibold mb-6">Edit Startup Profile</h2>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Startup Name</label>
                      <input
                        type="text"
                        name="name"
                        value={startupData.name}
                        onChange={handleInputChange}
                        placeholder="e.g., AgriTech SL"
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Category</label>
                      <select
                        name="category"
                        value={startupData.category}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option>Technology</option>
                        <option>Agriculture</option>
                        <option>Finance</option>
                        <option>Education</option>
                        <option>Healthcare</option>
                        <option>Environment</option>
                        <option>E-Commerce</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">One-Line Description</label>
                    <input
                      type="text"
                      name="description"
                      value={startupData.description}
                      onChange={handleInputChange}
                      placeholder="e.g., IoT-enabled solutions for farmers"
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                    <p className="text-xs text-muted-foreground mt-1">This appears on the startup marketplace</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Full Startup Description</label>
                    <textarea
                      name="fullDescription"
                      value={startupData.fullDescription}
                      onChange={handleInputChange}
                      placeholder="Tell investors your full story..."
                      rows={4}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Problem We Solve</label>
                    <textarea
                      name="problem"
                      value={startupData.problem}
                      onChange={handleInputChange}
                      placeholder="What problem does your startup solve?"
                      rows={3}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Why Sierra Leone Needs This</label>
                    <textarea
                      name="whySL"
                      value={startupData.whySL}
                      onChange={handleInputChange}
                      placeholder="Why is your solution important for Sierra Leone?"
                      rows={3}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Location</label>
                      <select
                        name="location"
                        value={startupData.location}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option>Freetown</option>
                        <option>Bo</option>
                        <option>Kenema</option>
                        <option>Makeni</option>
                        <option>Port Loko</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Stage</label>
                      <select
                        name="stage"
                        value={startupData.stage}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option>MVP</option>
                        <option>Seed</option>
                        <option>Series A</option>
                        <option>Series B</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={startupData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={startupData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Website</label>
                      <input
                        type="url"
                        name="website"
                        value={startupData.website}
                        onChange={handleInputChange}
                        placeholder="https://example.com"
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                      <Edit2 size={16} />
                      Save Profile
                    </Button>
                  </div>
                </form>
              </Card>

              {/* Key Achievements */}
              <Card className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">Key Achievements</h3>
                  <Button size="sm" variant="outline" className="gap-1 bg-transparent" onClick={addHighlight}>
                    <Plus size={14} />
                    Add
                  </Button>
                </div>
                <div className="space-y-3">
                  {startupData.highlights.map((highlight, i) => (
                    <input
                      key={i}
                      type="text"
                      value={highlight}
                      onChange={(e) => handleHighlightsChange(i, e.target.value)}
                      placeholder="e.g., 500+ farmers using platform"
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  ))}
                </div>
              </Card>
            </TabsContent>

            {/* Funding Tab */}
            <TabsContent value="funding" className="space-y-6">
              <Card className="p-6">
                <h2 className="text-2xl font-semibold mb-6">Funding Details</h2>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Funding Goal (USD)</label>
                      <input
                        type="number"
                        name="fundingNeeded"
                        value={startupData.fundingNeeded}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Currently Raised (USD)</label>
                      <input
                        type="number"
                        name="currentFunding"
                        value={startupData.currentFunding}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>

                  {/* Funding Progress */}
                  <div className="bg-card p-4 rounded-lg border border-border">
                    <div className="flex justify-between mb-2 text-sm">
                      <span className="text-muted-foreground">Funding Progress</span>
                      <span className="font-semibold">
                        {Math.round(fundingProgress(startupData.currentFunding, startupData.fundingNeeded))}%
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3">
                      <div
                        className="bg-accent h-3 rounded-full transition-all"
                        style={{
                          width: `${fundingProgress(startupData.currentFunding, startupData.fundingNeeded)}%`,
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                      <Edit2 size={16} />
                      Update Funding
                    </Button>
                  </div>
                </form>
              </Card>
            </TabsContent>

            {/* Team Tab */}
            <TabsContent value="team" className="space-y-6">
              <Card className="p-6">
                <h2 className="text-2xl font-semibold mb-6">Team Members</h2>
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Team Size</label>
                    <input
                      type="number"
                      name="teamSize"
                      value={startupData.teamSize}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <label className="block text-sm font-medium">Founders</label>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        className="gap-1 bg-transparent"
                        onClick={addFounder}
                      >
                        <Plus size={14} />
                        Add Founder
                      </Button>
                    </div>
                    <div className="space-y-3">
                      {startupData.founders.map((founder, i) => (
                        <input
                          key={i}
                          type="text"
                          value={founder}
                          onChange={(e) => handleFoundersChange(i, e.target.value)}
                          placeholder="Founder name"
                          className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Founders Bio</label>
                    <textarea
                      name="foundersInfo"
                      value={startupData.foundersInfo}
                      onChange={handleInputChange}
                      placeholder="Tell us about your founding team..."
                      rows={4}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                      <Edit2 size={16} />
                      Save Team Info
                    </Button>
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
