import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Briefcase, Zap, Users, TrendingUp, ArrowRight } from "lucide-react"

export default function LandingPage() {
  const features = [
    {
      icon: Zap,
      title: "AI-Powered Matching",
      description: "Our intelligent matching engine connects you with opportunities that align with your skills.",
    },
    {
      icon: Briefcase,
      title: "Professional CV Creator",
      description: "Create or enhance your CV with our smart tools and templates.",
    },
    {
      icon: Users,
      title: "Direct Access to Employers",
      description: "Apply to jobs with one click and get instant match scores.",
    },
    {
      icon: TrendingUp,
      title: "Investment Opportunities",
      description: "For startups: Connect with investors. For investors: Discover promising ventures.",
    },
  ]

  const stats = [
    { label: "Active Jobs", value: "2,500+" },
    { label: "Registered Users", value: "50,000+" },
    { label: "Successful Placements", value: "5,000+" },
    { label: "Match Accuracy", value: "94%" },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="flex-1 relative overflow-hidden px-4 sm:px-6 lg:px-8 pt-12 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-3">
                <h1 className="text-4xl sm:text-5xl font-bold text-balance">
                  Connecting Sierra Leone's <span className="text-primary">Talent</span> to{" "}
                  <span className="text-accent">Opportunity</span>
                </h1>
                <p className="text-lg text-muted-foreground">
                  Discover your perfect job match, build your professional profile, or find your next investment
                  opportunity. All powered by AI.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/auth/register">
                  <Button className="font-medium text-base px-6 py-6 bg-primary text-primary-foreground hover:bg-primary/90">
                    Get Started Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/jobs">
                  <Button variant="outline" className="font-medium text-base px-6 py-6 bg-transparent">
                    Browse Jobs
                  </Button>
                </Link>
              </div>
            </div>

            {/* Hero Image */}
            <div className="hidden md:flex justify-end">
              <div className="w-full max-w-md h-96 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center border border-border">
                <div className="text-6xl">💼</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-card border-y border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-primary">{stat.value}</div>
                <p className="text-sm text-muted-foreground mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Why Choose TrustBridge?</h2>
            <p className="text-lg text-muted-foreground">Everything you need to thrive in Sierra Leone's job market</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <Card key={feature.title} className="p-6 hover:shadow-lg transition-shadow">
                  <Icon className="h-8 w-8 text-primary mb-3" />
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Transform Your Career?</h2>
          <p className="text-lg opacity-90 mb-8">
            Join thousands of professionals and employers using TrustBridge to build better futures.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register">
              <Button className="font-medium text-base px-8 py-6 bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                Create Your Profile
              </Button>
            </Link>
            <Link href="/jobs">
              <Button
                variant="outline"
                className="font-medium text-base px-8 py-6 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
              >
                Explore Opportunities
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
