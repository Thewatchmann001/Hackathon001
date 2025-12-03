"use client"
import { Card } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Users, CheckCircle, AlertCircle, TrendingUp } from "lucide-react"

export default function AdminDashboard() {
  const analyticsData = [
    { date: "Jan 1", jobSeekers: 1200, employers: 340, startups: 89 },
    { date: "Jan 8", jobSeekers: 1800, employers: 521, startups: 156 },
    { date: "Jan 15", jobSeekers: 2400, employers: 780, startups: 234 },
    { date: "Jan 22", jobSeekers: 3100, employers: 1045, startups: 312 },
    { date: "Jan 29", jobSeekers: 3950, employers: 1320, startups: 425 },
  ]

  const verificationData = [
    { date: "Jan 1", verified: 450, unverified: 680 },
    { date: "Jan 8", verified: 780, unverified: 980 },
    { date: "Jan 15", verified: 1200, unverified: 1450 },
    { date: "Jan 22", verified: 1680, unverified: 1980 },
    { date: "Jan 29", verified: 2340, unverified: 2620 },
  ]

  const stats = [
    {
      label: "Total Users",
      value: "8,650",
      change: "+15% this month",
      icon: Users,
      color: "text-primary",
    },
    {
      label: "Verified Accounts",
      value: "2,340",
      change: "27% verification rate",
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      label: "Pending Verification",
      value: "2,620",
      change: "Awaiting review",
      icon: AlertCircle,
      color: "text-orange-600",
    },
    {
      label: "New Registrations",
      value: "485",
      change: "This week",
      icon: TrendingUp,
      color: "text-accent",
    },
  ]

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <p className="text-foreground/60 mt-2">Real-time platform analytics and key metrics</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm text-foreground/60 font-medium">{stat.label}</p>
                  <h3 className="text-3xl font-bold mt-2">{stat.value}</h3>
                  <p className="text-xs text-foreground/50 mt-2">{stat.change}</p>
                </div>
                <Icon className={`h-8 w-8 ${stat.color} opacity-20`} />
              </div>
            </Card>
          )
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">User Growth by Category</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analyticsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="date" stroke="var(--foreground)" opacity={0.5} />
              <YAxis stroke="var(--foreground)" opacity={0.5} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="jobSeekers" stroke="var(--chart-1)" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="employers" stroke="var(--chart-2)" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="startups" stroke="var(--chart-3)" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Verification Status Chart */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Verification Status</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={verificationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="date" stroke="var(--foreground)" opacity={0.5} />
              <YAxis stroke="var(--foreground)" opacity={0.5} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                }}
              />
              <Legend />
              <Bar dataKey="verified" fill="var(--chart-1)" radius={[8, 8, 0, 0]} />
              <Bar dataKey="unverified" fill="var(--chart-2)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Category Breakdown */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">User Breakdown by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">4,285</div>
            <p className="text-foreground/60">Job Seekers</p>
            <p className="text-xs text-foreground/50 mt-1">49.5% of total</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-accent mb-2">2,940</div>
            <p className="text-foreground/60">Employers</p>
            <p className="text-xs text-foreground/50 mt-1">34.0% of total</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-secondary mb-2">1,425</div>
            <p className="text-foreground/60">Startups</p>
            <p className="text-xs text-foreground/50 mt-1">16.5% of total</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
