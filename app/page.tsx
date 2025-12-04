import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Briefcase, Zap, TrendingUp, ArrowRight, CheckCircle, Globe, Lightbulb } from "lucide-react"

export default function LandingPage() {
  const features = [
    {
      icon: Zap,
      title: "AI-Powered Matching",
      description:
        "Our intelligent matching engine understands Sierra Leone's job market and connects you with perfect fits.",
    },
    {
      icon: Briefcase,
      title: "Professional CV Creator",
      description: "Build employer-ready CVs with templates designed for local and international opportunities.",
    },
    {
      icon: Globe,
      title: "Direct Employer Access",
      description: "Apply to jobs with one click and see instant match scores showing your fit.",
    },
    {
      icon: TrendingUp,
      title: "Investment Hub",
      description: "Startups connect with investors. Investors discover promising Sierra Leonean ventures.",
    },
  ]

  const stats = [
    { label: "Active Jobs", value: "2,500+", highlight: "Across SL" },
    { label: "Registered Users", value: "50,000+", highlight: "Job Seekers" },
    { label: "Success Stories", value: "5,000+", highlight: "Placements" },
    { label: "Match Accuracy", value: "94%", highlight: "AI Powered" },
  ]

  const testimonials = [
    {
      name: "Aminata Kamara",
      role: "Software Developer - Freetown",
      text: "TrustBridge helped me find the perfect tech job in Freetown. The AI matching was incredibly accurate!",
      avatar: "AK",
    },
    {
      name: "Mohamed Sesay",
      role: "Business Owner - Bo",
      text: "As an employer, I found the right talent quickly. The applicant ranking system saves hours.",
      avatar: "MS",
    },
    {
      name: "Fatima Mansaray",
      role: "Startup Founder - Makeni",
      text: "I connected with investors through TrustBridge. It's a game-changer for Sierra Leone's startup scene.",
      avatar: "FM",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 sm:px-6 lg:px-8 pt-12 pb-24">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A66C2]/10 via-transparent to-[#004182]/10 -z-10" />

        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 bg-[#004182]/10 text-[#0A66C2] px-4 py-2 rounded-full border border-[#004182]/30">
                  <Lightbulb className="h-4 w-4" />
                  <span className="text-sm font-semibold">Powered by AI for Sierra Leone</span>
                </div>
                <h1 className="text-5xl sm:text-6xl font-bold leading-tight text-[#1C1C1C]">
                  Connecting Sierra Leone's <span className="text-[#004182]">Best Talent</span> to{" "}
                  <span className="text-[#0A66C2]">Real Opportunities</span>
                </h1>
                <p className="text-lg text-[#1C1C1C]/70">
                  Find your dream job, build a world-class CV, or discover the next big startup investment. Everything
                  you need to grow in Sierra Leone's thriving job market.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/auth/register">
                  <Button className="font-semibold text-base px-8 py-6 bg-[#0A66C2] text-white hover:bg-[#0A66C2]/90 shadow-lg hover:shadow-xl transition-all">
                    Get Started Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/jobs">
                  <Button
                    variant="outline"
                    className="font-semibold text-base px-8 py-6 bg-white border-2 border-[#0A66C2] text-[#0A66C2] hover:bg-[#0A66C2]/5"
                  >
                    Browse 2,500+ Jobs
                  </Button>
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-[#004182] fill-[#004182]" />
                  <span className="text-sm font-medium">Trusted by employers nationwide</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-[#004182] fill-[#004182]" />
                  <span className="text-sm font-medium">100% secure & verified</span>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="hidden md:flex justify-end">
              <div className="relative w-full max-w-md h-96 rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/job-search-hero.jpg"
                  alt="Professional using laptop for job search with AI-powered interface"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A66C2]/20 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-[#0A66C2]/5 to-[#004182]/5 border-y border-[#0A66C2]/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="text-center p-6 rounded-xl bg-white/50 hover:bg-white transition-colors border border-[#0A66C2]/10"
              >
                <div className="text-3xl sm:text-4xl font-bold text-[#0A66C2]">{stat.value}</div>
                <p className="text-xs text-[#004182] font-semibold mt-1 uppercase tracking-wide">{stat.highlight}</p>
                <p className="text-sm text-[#1C1C1C]/60 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#004182]/10 text-[#0A66C2] px-4 py-2 rounded-full border border-[#004182]/30 mb-4">
              <span className="text-sm font-semibold">Why TrustBridge?</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-[#1C1C1C]">Everything for Your Career Growth</h2>
            <p className="text-lg text-[#1C1C1C]/70 max-w-2xl mx-auto">
              Built for Sierra Leone, powered by AI. Get the tools and connections you need to thrive.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <Card
                  key={feature.title}
                  className="p-8 hover:shadow-xl transition-all hover:border-[#0A66C2]/50 border-2 border-transparent group cursor-pointer"
                >
                  <div className="mb-4 p-3 bg-gradient-to-br from-[#0A66C2]/20 to-[#004182]/20 rounded-lg w-fit group-hover:from-[#0A66C2]/30 group-hover:to-[#004182]/30 transition-all">
                    <Icon className="h-6 w-6 text-[#0A66C2]" />
                  </div>
                  <h3 className="font-bold text-lg mb-3 text-[#1C1C1C]">{feature.title}</h3>
                  <p className="text-sm text-[#1C1C1C]/70 leading-relaxed">{feature.description}</p>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gradient-to-b from-[#0A66C2]/5 to-transparent py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#004182]/10 text-[#0A66C2] px-4 py-2 rounded-full border border-[#004182]/30 mb-4">
              <span className="text-sm font-semibold">Success Stories</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-[#1C1C1C]">
              Hear from Sierra Leoneans Making It Happen
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name} className="p-8 hover:shadow-lg transition-all border-2 border-[#0A66C2]/10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0A66C2] to-[#004182] flex items-center justify-center text-white font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1C1C1C]">{testimonial.name}</h4>
                    <p className="text-sm text-[#0A66C2] font-semibold">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-[#1C1C1C]/70 italic leading-relaxed">"{testimonial.text}"</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#0A66C2] via-[#0A66C2]/90 to-[#0A66C2] text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">Ready to Transform Your Career?</h2>
          <p className="text-lg opacity-95 mb-10">
            Join thousands of Sierra Leoneans building better futures through TrustBridge. Your next opportunity is
            waiting.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register">
              <Button className="font-semibold text-base px-10 py-6 bg-white text-[#0A66C2] hover:bg-white/90 shadow-lg">
                Create Your Profile Now
              </Button>
            </Link>
            <Link href="/jobs">
              <Button
                variant="outline"
                className="font-semibold text-base px-10 py-6 border-2 border-white text-white hover:bg-white/10 bg-transparent"
              >
                Start Exploring Jobs
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
