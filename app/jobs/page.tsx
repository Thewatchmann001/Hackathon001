"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ChevronDown } from "lucide-react"
import { JobSidebar } from "./components/job-sidebar"
import { JobList } from "./components/job-list"

export default function JobsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [selectedLocation, setSelectedLocation] = useState<string>("")
  const [selectedType, setSelectedType] = useState<string>("")
  const [salarySorting, setSalarySorting] = useState<"low" | "high" | "all">("all")

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <div className="flex-1 flex">
        {/* Sidebar - Desktop only, can be toggled on mobile */}
        <div className="hidden lg:block w-64 border-r border-border bg-card">
          <JobSidebar
            selectedCategory={selectedCategory}
            selectedLocation={selectedLocation}
            selectedType={selectedType}
            salarySorting={salarySorting}
            onCategoryChange={setSelectedCategory}
            onLocationChange={setSelectedLocation}
            onTypeChange={setSelectedType}
            onSalarySortingChange={setSalarySorting}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-4xl">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Job Opportunities</h1>
              <p className="text-muted-foreground">Find your perfect role with AI-powered matching</p>
            </div>

            {/* Mobile Filter Button */}
            <div className="lg:hidden mb-6">
              <Button variant="outline" className="w-full justify-between bg-transparent">
                Filters <ChevronDown size={16} />
              </Button>
            </div>

            {/* Job List */}
            <JobList
              selectedCategory={selectedCategory}
              selectedLocation={selectedLocation}
              selectedType={selectedType}
              salarySorting={salarySorting}
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
