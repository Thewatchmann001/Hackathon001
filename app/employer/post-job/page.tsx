"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Plus, Trash2, ArrowLeft } from "lucide-react"

export default function PostJobPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requirements: [""],
    location: "Freetown",
    type: "Full-Time",
    salary: "",
    category: "Technology",
    skills: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRequirementChange = (index: number, value: string) => {
    const newReqs = [...formData.requirements]
    newReqs[index] = value
    setFormData((prev) => ({ ...prev, requirements: newReqs }))
  }

  const addRequirement = () => {
    setFormData((prev) => ({
      ...prev,
      requirements: [...prev.requirements, ""],
    }))
  }

  const removeRequirement = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Job posted successfully!")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 px-4 sm:px-6 lg:px-8 py-8 bg-background">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <Link href="/employer" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-6">
            <ArrowLeft size={16} />
            Back to dashboard
          </Link>

          <h1 className="text-3xl font-bold mb-8">Post a New Job</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Job Title */}
            <Card className="p-6 border border-border space-y-4">
              <h2 className="text-xl font-semibold">Job Details</h2>
              <div>
                <label className="block text-sm font-medium mb-2">Job Title</label>
                <input
                  type="text"
                  name="title"
                  placeholder="e.g., Senior React Developer"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="Technology">Technology</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Finance">Finance</option>
                    <option value="Education">Education</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Job Type</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="Full-Time">Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Contract">Contract</option>
                    <option value="Freelance">Freelance</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Location</label>
                  <select
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="Freetown">Freetown</option>
                    <option value="Bo">Bo</option>
                    <option value="Kenema">Kenema</option>
                    <option value="Makeni">Makeni</option>
                    <option value="Remote">Remote</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Salary (LE per month)</label>
                  <input
                    type="number"
                    name="salary"
                    placeholder="e.g., 3500"
                    value={formData.salary}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            </Card>

            {/* Description */}
            <Card className="p-6 border border-border space-y-4">
              <h2 className="text-xl font-semibold">Job Description</h2>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  name="description"
                  placeholder="Describe the role, responsibilities, and what you're looking for..."
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </Card>

            {/* Requirements */}
            <Card className="p-6 border border-border space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Key Requirements</h2>
                <Button
                  type="button"
                  onClick={addRequirement}
                  size="sm"
                  variant="outline"
                  className="gap-1 bg-transparent"
                >
                  <Plus size={14} />
                  Add
                </Button>
              </div>

              <div className="space-y-3">
                {formData.requirements.map((req, i) => (
                  <div key={i} className="flex gap-2">
                    <input
                      type="text"
                      placeholder={`Requirement ${i + 1}`}
                      value={req}
                      onChange={(e) => handleRequirementChange(i, e.target.value)}
                      className="flex-1 px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    {formData.requirements.length > 1 && (
                      <Button
                        type="button"
                        onClick={() => removeRequirement(i)}
                        size="sm"
                        variant="outline"
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 size={16} />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </Card>

            {/* Skills */}
            <Card className="p-6 border border-border space-y-4">
              <h2 className="text-xl font-semibold">Required Skills</h2>
              <textarea
                name="skills"
                placeholder="List required skills separated by commas (e.g., React, TypeScript, Node.js)"
                value={formData.skills}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </Card>

            {/* Actions */}
            <div className="flex gap-3">
              <Link href="/employer" className="flex-1">
                <Button variant="outline" className="w-full bg-transparent">
                  Cancel
                </Button>
              </Link>
              <Button type="submit" className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
                Post Job
              </Button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  )
}
