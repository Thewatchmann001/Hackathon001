"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Search, Heart, TrendingUp, Users, ChevronRight } from "lucide-react"

export default function StartupsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [savedStartups, setSavedStartups] = useState<number[]>([])

  const startups = [
    {
      id: 1,
      name: "AgriTech SL",
      category: "Agriculture",
      fundingNeeded: 50000,
      currentFunding: 15000,
      team: 5,
      problem: "Connecting smallholder farmers to modern agricultural technology",
      description:
        "AgriTech SL provides IoT-enabled solutions to help farmers optimize crop yields through data-driven insights.",
      founders: ["Aminata Kamara", "Ibrahim Sesay"],
      stage: "Seed",
      image: "🌾",
    },
    {
      id: 2,
      name: "FinTech Hub",
      category: "Finance",
      fundingNeeded: 100000,
      currentFunding: 45000,
      team: 8,
      problem: "Providing accessible digital banking to underbanked populations",
      description: "Mobile-first financial services platform enabling secure transactions, savings, and micro-loans.",
      founders: ["Mohamed Kargbo", "Fatima Koroma"],
      stage: "Series A",
      image: "💰",
    },
    {
      id: 3,
      name: "EduConnect",
      category: "Education",
      fundingNeeded: 75000,
      currentFunding: 20000,
      team: 6,
      problem: "Bridging the education gap in rural areas",
      description:
        "Online platform connecting students in remote areas with qualified tutors and digital learning resources.",
      founders: ["Zainab Bangura"],
      stage: "MVP",
      image: "📚",
    },
    {
      id: 4,
      name: "HealthTech Solutions",
      category: "Healthcare",
      fundingNeeded: 120000,
      currentFunding: 35000,
      team: 7,
      problem: "Improving healthcare access in underserved communities",
      description: "Telemedicine platform connecting patients with healthcare professionals across Sierra Leone.",
      founders: ["Dr. Hassan Jallow", "Alhaji Sesay"],
      stage: "Seed",
      image: "⚕️",
    },
    {
      id: 5,
      name: "CleanWater Tech",
      category: "Environment",
      fundingNeeded: 80000,
      currentFunding: 25000,
      team: 4,
      problem: "Providing clean water solutions to rural communities",
      description: "Developing affordable water purification systems using locally sourced materials.",
      founders: ["Aminata Diallo"],
      stage: "MVP",
      image: "💧",
    },
    {
      id: 6,
      name: "Digital Marketplace",
      category: "E-Commerce",
      fundingNeeded: 90000,
      currentFunding: 30000,
      team: 9,
      problem: "Empowering small businesses to reach national markets",
      description: "Platform connecting artisans and small businesses directly to consumers nationwide.",
      founders: ["Ade Kante", "Stella Bangura", "James Stevens"],
      stage: "Series A",
      image: "🛍️",
    },
  ]

  let filtered = startups
  if (selectedCategory) {
    filtered = filtered.filter((s) => s.category === selectedCategory)
  }
  if (searchTerm) {
    filtered = filtered.filter(
      (s) =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.problem.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }

  const toggleSave = (id: number) => {
    setSavedStartups((prev) => (prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]))
  }

  const categories = ["All", "Agriculture", "Finance", "Education", "Healthcare", "Environment", "E-Commerce"]
  const fundingProgress = (current: number, needed: number) => (current / needed) * 100

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 px-4 sm:px-6 lg:px-8 py-12 bg-background">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-3">Startup Investment Marketplace</h1>
            <p className="text-lg text-muted-foreground">
              Discover promising Sierra Leonean startups and connect with innovation
            </p>
          </div>

          {/* Search & Filters */}
          <div className="mb-8 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 text-muted-foreground" size={20} />
              <input
                type="text"
                placeholder="Search startups..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat === "All" ? "" : cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    (selectedCategory === "" && cat === "All") || selectedCategory === cat
                      ? "bg-primary text-primary-foreground"
                      : "bg-card border border-border text-foreground hover:border-primary"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Startups Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((startup) => (
              <Card key={startup.id} className="p-6 hover:shadow-lg transition-shadow flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{startup.image}</div>
                  <button
                    onClick={() => toggleSave(startup.id)}
                    className="text-muted-foreground hover:text-accent transition-colors"
                  >
                    <Heart
                      size={20}
                      fill={savedStartups.includes(startup.id) ? "currentColor" : "none"}
                      className={savedStartups.includes(startup.id) ? "text-accent" : ""}
                    />
                  </button>
                </div>

                <Link href={`/startups/${startup.id}`}>
                  <h3 className="text-xl font-semibold mb-1 hover:text-primary transition-colors cursor-pointer">
                    {startup.name}
                  </h3>
                </Link>
                <p className="text-sm text-accent font-medium mb-3">{startup.category}</p>

                <p className="text-sm text-muted-foreground mb-4 flex-1">{startup.problem}</p>

                {/* Funding Progress */}
                <div className="mb-4">
                  <div className="flex justify-between mb-2 text-xs">
                    <span className="text-muted-foreground">Funding</span>
                    <span className="font-semibold text-foreground">
                      ${startup.currentFunding.toLocaleString()} / ${startup.fundingNeeded.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-accent h-2 rounded-full transition-all"
                      style={{ width: `${fundingProgress(startup.currentFunding, startup.fundingNeeded)}%` }}
                    />
                  </div>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users size={16} className="text-accent" />
                    {startup.team} team members
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <TrendingUp size={16} className="text-accent" />
                    {startup.stage}
                  </div>
                </div>

                {/* CTA */}
                <Link href={`/startups/${startup.id}`} className="w-full">
                  <Button className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                    View Details
                    <ChevronRight size={16} />
                  </Button>
                </Link>
              </Card>
            ))}
          </div>

          {filtered.length === 0 && (
            <Card className="p-12 text-center">
              <p className="text-lg text-muted-foreground">No startups found matching your criteria.</p>
            </Card>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
