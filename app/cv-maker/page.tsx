"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Plus, Upload, FileText, ArrowRight } from "lucide-react"

export default function CVMakerPage() {
  const [mode, setMode] = useState<"select" | "create" | "upload">("select")

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 px-4 sm:px-6 lg:px-8 py-12 bg-background">
        <div className="max-w-3xl mx-auto">
          {mode === "select" ? (
            <>
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-3">Create Your Professional CV</h1>
                <p className="text-lg text-muted-foreground">Choose how you'd like to get started</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Create from Scratch */}
                <Card
                  className="p-8 cursor-pointer hover:shadow-lg transition-shadow hover:border-primary"
                  onClick={() => setMode("create")}
                >
                  <Plus size={32} className="text-primary mb-4" />
                  <h2 className="text-2xl font-semibold mb-2">Create from Scratch</h2>
                  <p className="text-muted-foreground mb-6">
                    Build a professional CV using our smart form. Our AI will generate a modern, polished document.
                  </p>
                  <Button className="gap-2 w-full bg-primary text-primary-foreground hover:bg-primary/90">
                    Get Started
                    <ArrowRight size={16} />
                  </Button>
                </Card>

                {/* Upload Existing */}
                <Card
                  className="p-8 cursor-pointer hover:shadow-lg transition-shadow hover:border-accent"
                  onClick={() => setMode("upload")}
                >
                  <Upload size={32} className="text-accent mb-4" />
                  <h2 className="text-2xl font-semibold mb-2">Upload Existing CV</h2>
                  <p className="text-muted-foreground mb-6">
                    Upload your current CV (PDF or DOCX). We'll enhance and modernize it automatically.
                  </p>
                  <Button className="gap-2 w-full bg-accent text-accent-foreground hover:bg-accent/90">
                    Upload
                    <ArrowRight size={16} />
                  </Button>
                </Card>
              </div>
            </>
          ) : mode === "create" ? (
            <CVCreateForm onBack={() => setMode("select")} />
          ) : (
            <CVUploadForm onBack={() => setMode("select")} />
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}

function CVCreateForm({ onBack }: { onBack: () => void }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    summary: "",
    experience: [{ title: "", company: "", duration: "", description: "" }],
    education: [{ school: "", degree: "", field: "", year: "" }],
    skills: "",
    certifications: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleArrayChange = (index: number, field: string, value: string, category: "experience" | "education") => {
    setFormData((prev) => ({
      ...prev,
      [category]: prev[category].map((item, i) => (i === index ? { ...item, [field]: value } : item)),
    }))
  }

  const addExperience = () => {
    setFormData((prev) => ({
      ...prev,
      experience: [...prev.experience, { title: "", company: "", duration: "", description: "" }],
    }))
  }

  const addEducation = () => {
    setFormData((prev) => ({
      ...prev,
      education: [...prev.education, { school: "", degree: "", field: "", year: "" }],
    }))
  }

  return (
    <form className="space-y-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Create Your CV</h2>
        <Button variant="outline" onClick={onBack} type="button">
          Back
        </Button>
      </div>

      {/* Personal Information */}
      <div className="bg-card p-6 rounded-lg border border-border space-y-4">
        <h3 className="text-xl font-semibold">Personal Information</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleInputChange}
            className="px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className="px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleInputChange}
            className="px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <textarea
          name="summary"
          placeholder="Professional Summary (2-3 sentences about yourself)"
          value={formData.summary}
          onChange={handleInputChange}
          rows={3}
          className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Experience */}
      <div className="bg-card p-6 rounded-lg border border-border space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">Experience</h3>
          <Button type="button" onClick={addExperience} variant="outline" size="sm" className="gap-2 bg-transparent">
            <Plus size={16} /> Add
          </Button>
        </div>
        {formData.experience.map((exp, i) => (
          <div key={i} className="space-y-3 p-4 border border-border rounded bg-background">
            <input
              type="text"
              placeholder="Job Title"
              value={exp.title}
              onChange={(e) => handleArrayChange(i, "title", e.target.value, "experience")}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <div className="grid md:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Company"
                value={exp.company}
                onChange={(e) => handleArrayChange(i, "company", e.target.value, "experience")}
                className="px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="text"
                placeholder="Duration (e.g., 2020-2023)"
                value={exp.duration}
                onChange={(e) => handleArrayChange(i, "duration", e.target.value, "experience")}
                className="px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <textarea
              placeholder="Description of responsibilities and achievements"
              value={exp.description}
              onChange={(e) => handleArrayChange(i, "description", e.target.value, "experience")}
              rows={2}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        ))}
      </div>

      {/* Education */}
      <div className="bg-card p-6 rounded-lg border border-border space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">Education</h3>
          <Button type="button" onClick={addEducation} variant="outline" size="sm" className="gap-2 bg-transparent">
            <Plus size={16} /> Add
          </Button>
        </div>
        {formData.education.map((edu, i) => (
          <div key={i} className="space-y-3 p-4 border border-border rounded bg-background">
            <input
              type="text"
              placeholder="School/University"
              value={edu.school}
              onChange={(e) => handleArrayChange(i, "school", e.target.value, "education")}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <div className="grid md:grid-cols-3 gap-3">
              <input
                type="text"
                placeholder="Degree"
                value={edu.degree}
                onChange={(e) => handleArrayChange(i, "degree", e.target.value, "education")}
                className="px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="text"
                placeholder="Field of Study"
                value={edu.field}
                onChange={(e) => handleArrayChange(i, "field", e.target.value, "education")}
                className="px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="text"
                placeholder="Year"
                value={edu.year}
                onChange={(e) => handleArrayChange(i, "year", e.target.value, "education")}
                className="px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Skills */}
      <div className="bg-card p-6 rounded-lg border border-border space-y-4">
        <h3 className="text-xl font-semibold">Skills</h3>
        <textarea
          name="skills"
          placeholder="List skills separated by commas (e.g., React, TypeScript, Project Management)"
          value={formData.skills}
          onChange={handleInputChange}
          rows={3}
          className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Certifications */}
      <div className="bg-card p-6 rounded-lg border border-border space-y-4">
        <h3 className="text-xl font-semibold">Certifications (Optional)</h3>
        <textarea
          name="certifications"
          placeholder="List certifications separated by commas (e.g., AWS Certified, Google Analytics Certified)"
          value={formData.certifications}
          onChange={handleInputChange}
          rows={2}
          className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button onClick={onBack} variant="outline" className="flex-1 bg-transparent">
          Cancel
        </Button>
        <Button className="flex-1 gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
          Generate CV
          <FileText size={16} />
        </Button>
      </div>
    </form>
  )
}

function CVUploadForm({ onBack }: { onBack: () => void }) {
  const [file, setFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!file) return
    setIsProcessing(true)
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false)
      alert("CV uploaded and processed successfully!")
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Upload Your CV</h2>
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
      </div>

      <Card className="p-8 border-2 border-dashed border-border hover:border-primary transition-colors cursor-pointer">
        <label htmlFor="file-upload" className="cursor-pointer">
          <div className="flex flex-col items-center gap-4">
            <Upload size={48} className="text-muted-foreground" />
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Upload your CV</h3>
              <p className="text-sm text-muted-foreground mb-2">Drag and drop your file here, or click to select</p>
              <p className="text-xs text-muted-foreground">Supported formats: PDF, DOCX, DOC (Max 5MB)</p>
            </div>
            {file && <p className="text-sm font-medium text-primary">{file.name}</p>}
          </div>
          <input id="file-upload" type="file" accept=".pdf,.docx,.doc" onChange={handleFileChange} className="hidden" />
        </label>
      </Card>

      {file && (
        <Card className="p-4 bg-primary/5 border-primary/20">
          <p className="text-sm text-foreground">
            <span className="font-semibold">Selected:</span> {file.name}
          </p>
        </Card>
      )}

      <div className="flex gap-3">
        <Button onClick={onBack} variant="outline" className="flex-1 bg-transparent">
          Cancel
        </Button>
        <Button
          onClick={handleUpload}
          disabled={!file || isProcessing}
          className="flex-1 gap-2 bg-accent text-accent-foreground hover:bg-accent/90 disabled:opacity-50"
        >
          {isProcessing ? "Processing..." : "Upload & Process"}
          <Upload size={16} />
        </Button>
      </div>
    </div>
  )
}
