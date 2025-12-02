"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ArrowLeft, Mail, Phone, Globe, Users, TrendingUp, DollarSign, Share2, Heart, CheckCircle2 } from "lucide-react"

// Mock data
const mockStartups: Record<number, any> = {
  1: {
    id: 1,
    name: "AgriTech SL",
    category: "Agriculture",
    fundingNeeded: 50000,
    currentFunding: 15000,
    team: 5,
    problem: "Connecting smallholder farmers to modern agricultural technology",
    fullDescription: `AgriTech SL is revolutionizing agriculture in Sierra Leone by providing IoT-enabled solutions. 
    Our platform uses sensors and data analytics to help farmers optimize crop yields, reduce water usage, and make informed decisions based on real-time soil and weather data.
    We\'ve already partnered with 500+ farmers across 3 districts and are scaling rapidly.`,
    whySL:
      "Sierra Leone has over 5 million people dependent on agriculture, yet they lack access to modern farming technologies. Our solution addresses this gap.",
    stage: "Seed",
    image: "🌾",
    founders: ["Aminata Kamara", "Ibrahim Sesay"],
    foundersInfo: "Aminata has 8 years in agricultural development, Ibrahim is a software engineer with IoT expertise.",
    highlights: [
      "500+ farmers already using platform",
      "30% average yield increase",
      "Partnerships with 5 agricultural NGOs",
      "Green financing ready",
    ],
    contact: {
      email: "info@agritechsl.com",
      phone: "+232 79 123 456",
      website: "agritechsl.com",
      location: "Freetown",
    },
  },
}

export default function StartupDetailPage() {
  const { id } = useParams()
  const [isSaved, setIsSaved] = useState(false)
  const startupId = typeof id === "string" ? Number.parseInt(id) : 1
  const startup = mockStartups[startupId] || mockStartups[1]

  const fundingProgress = (current: number, needed: number) => (current / needed) * 100

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 px-4 sm:px-6 lg:px-8 py-8 bg-background">
        <div className="max-w-5xl mx-auto">
          {/* Back Button */}
          <Link href="/startups" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-6">
            <ArrowLeft size={16} />
            Back to startups
          </Link>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-6">
              {/* Header */}
              <div className="flex items-start gap-6 mb-6">
                <div className="text-6xl">{startup.image}</div>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold mb-2">{startup.name}</h1>
                  <p className="text-accent font-semibold text-lg mb-3">{startup.category}</p>
                  <p className="text-muted-foreground mb-4">{startup.fullDescription}</p>
                  <div className="flex gap-3">
                    <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                      <Mail size={16} />
                      Contact
                    </Button>
                    <Button variant="outline" className="gap-2 bg-transparent" onClick={() => setIsSaved(!isSaved)}>
                      <Heart
                        size={16}
                        fill={isSaved ? "currentColor" : "none"}
                        className={isSaved ? "text-accent" : ""}
                      />
                      {isSaved ? "Saved" : "Save"}
                    </Button>
                    <Button variant="outline" className="gap-2 bg-transparent">
                      <Share2 size={16} />
                      Share
                    </Button>
                  </div>
                </div>
              </div>

              {/* Problem & Solution */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Problem We Solve</h2>
                <p className="text-muted-foreground mb-4">{startup.whySL}</p>
                <p className="text-foreground">{startup.problem}</p>
              </Card>

              {/* Highlights */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Key Achievements</h2>
                <ul className="space-y-3">
                  {startup.highlights.map((highlight: string) => (
                    <li key={highlight} className="flex items-start gap-3">
                      <CheckCircle2 size={18} className="text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              {/* Team */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Founding Team</h2>
                <p className="text-muted-foreground mb-4">{startup.foundersInfo}</p>
                <div className="flex flex-wrap gap-3">
                  {startup.founders.map((founder: string) => (
                    <div
                      key={founder}
                      className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium"
                    >
                      {founder}
                    </div>
                  ))}
                </div>
              </Card>

              {/* Investment Terms */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Investment Opportunity</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Stage</p>
                    <p className="font-semibold text-foreground">{startup.stage}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Minimum Investment</p>
                    <p className="font-semibold text-foreground">$5,000</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Expected ROI</p>
                    <p className="font-semibold text-foreground">200-300% in 5 years</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Funding Card */}
              <Card className="p-6 sticky top-20">
                <h3 className="text-lg font-semibold mb-4">Funding</h3>

                <div className="mb-4">
                  <div className="flex justify-between mb-2 text-sm">
                    <span className="text-muted-foreground">Raised</span>
                    <span className="font-semibold">${startup.currentFunding.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <div
                      className="bg-accent h-3 rounded-full transition-all"
                      style={{ width: `${fundingProgress(startup.currentFunding, startup.fundingNeeded)}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                    <span>Goal: ${startup.fundingNeeded.toLocaleString()}</span>
                    <span>{Math.round(fundingProgress(startup.currentFunding, startup.fundingNeeded))}%</span>
                  </div>
                </div>

                <div className="space-y-2 mb-6 text-sm">
                  <div className="flex items-center gap-2">
                    <DollarSign size={16} className="text-accent" />
                    <span className="text-muted-foreground">
                      ${(startup.fundingNeeded - startup.currentFunding).toLocaleString()} needed
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={16} className="text-accent" />
                    <span className="text-muted-foreground">24 investors so far</span>
                  </div>
                </div>

                <Button className="w-full gap-2 bg-accent text-accent-foreground hover:bg-accent/90 mb-2">
                  <TrendingUp size={16} />
                  Invest Now
                </Button>
              </Card>

              {/* Contact Card */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Contact</h3>
                <div className="space-y-3">
                  <a
                    href={`mailto:${startup.contact.email}`}
                    className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                  >
                    <Mail size={16} />
                    <span className="text-sm">{startup.contact.email}</span>
                  </a>
                  <a
                    href={`tel:${startup.contact.phone}`}
                    className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                  >
                    <Phone size={16} />
                    <span className="text-sm">{startup.contact.phone}</span>
                  </a>
                  <a
                    href={`https://${startup.contact.website}`}
                    className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                  >
                    <Globe size={16} />
                    <span className="text-sm">{startup.contact.website}</span>
                  </a>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
