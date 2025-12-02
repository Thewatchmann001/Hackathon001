"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Plus, Upload, FileText, ArrowRight, Save } from "lucide-react"
import { CVPreview } from "./components/cv-preview"

interface CVData {
  fullName: string
  email: string
  phone: string
  location: string
  profileImage: string
  summary: string
  experience: Array<{ title: string; company: string; duration: string; description: string }>
  education: Array<{ school: string; degree: string; field: string; year: string }>
  skills: string
  certifications: string
}

const defaultCVData: CVData = {
  fullName: "",
  email: "",
  phone: "",
  location: "",
  profileImage: "",
  summary: "",
  experience: [{ title: "", company: "", duration: "", description: "" }],
  education: [{ school: "", degree: "", field: "", year: "" }],
  skills: "",
  certifications: "",
}

export default function CVMakerPage() {
  const [mode, setMode] = useState<"select" | "create" | "upload" | "preview">("select")
  const [cvData, setCVData] = useState<CVData>(defaultCVData)

  useEffect(() => {
    const saved = localStorage.getItem("cvData")
    if (saved) {
      setCVData(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    if (cvData.fullName) {
      localStorage.setItem("cvData", JSON.stringify(cvData))
    }
  }, [cvData])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCVData((prev) => ({ ...prev, [name]: value }))
  }

  const handleArrayChange = (index: number, field: string, value: string, category: "experience" | "education") => {
    setCVData((prev) => ({
      ...prev,
      [category]: prev[category].map((item, i) => (i === index ? { ...item, [field]: value } : item)),
    }))
  }

  const addExperience = () => {
    setCVData((prev) => ({
      ...prev,
      experience: [...prev.experience, { title: "", company: "", duration: "", description: "" }],
    }))
  }

  const addEducation = () => {
    setCVData((prev) => ({
      ...prev,
      education: [...prev.education, { school: "", degree: "", field: "", year: "" }],
    }))
  }

  const handleGeneratePreview = () => {
    if (!cvData.fullName) {
      alert("Please enter at least your name to generate a preview")
      return
    }
    setMode("preview")
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.onload = (event) => {
        setCVData((prev) => ({ ...prev, profileImage: event.target?.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 px-4 sm:px-6 lg:px-8 py-12 bg-background">
        <div className="max-w-4xl mx-auto">
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
                    Build a professional CV using our smart form. Your data is saved automatically.
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

              {/* Show existing CV option if data exists */}
              {cvData.fullName && (
                <Card className="p-6 mt-8 bg-primary/5 border-primary/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">You have a saved CV</h3>
                      <p className="text-sm text-muted-foreground">for {cvData.fullName}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" className="gap-2 bg-transparent" onClick={() => setMode("preview")}>
                        <FileText size={16} />
                        View Preview
                      </Button>
                      <Button
                        className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
                        onClick={() => setMode("create")}
                      >
                        <Plus size={16} />
                        Edit CV
                      </Button>
                    </div>
                  </div>
                </Card>
              )}
            </>
          ) : mode === "create" ? (
            <CVCreateForm
              formData={cvData}
              onInputChange={handleInputChange}
              onArrayChange={handleArrayChange}
              onAddExperience={addExperience}
              onAddEducation={addEducation}
              onPreview={handleGeneratePreview}
              onBack={() => setMode("select")}
              onImageUpload={handleImageUpload}
            />
          ) : mode === "upload" ? (
            <CVUploadForm onBack={() => setMode("select")} />
          ) : (
            <CVPreview data={cvData} />
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}

function CVCreateForm({
  formData,
  onInputChange,
  onArrayChange,
  onAddExperience,
  onAddEducation,
  onPreview,
  onBack,
  onImageUpload,
}: {
  formData: CVData
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onArrayChange: (index: number, field: string, value: string, category: "experience" | "education") => void
  onAddExperience: () => void
  onAddEducation: () => void
  onPreview: () => void
  onBack: () => void
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <form className="space-y-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Create Your CV</h2>
        <Button variant="outline" onClick={onBack} type="button">
          Back
        </Button>
      </div>

      {/* Profile Picture */}
      <div className="bg-card p-6 rounded-lg border border-border space-y-4">
        <h3 className="text-xl font-semibold">Profile Picture</h3>
        <div className="border-2 border-dashed border-border rounded-lg p-6 hover:border-primary transition-colors cursor-pointer">
          <input type="file" id="profile-image" accept="image/*" onChange={onImageUpload} className="hidden" />
          <label htmlFor="profile-image" className="cursor-pointer flex flex-col items-center gap-2">
            {formData.profileImage ? (
              <>
                <img
                  src={formData.profileImage || "/placeholder.svg"}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover"
                />
                <p className="text-sm text-muted-foreground">Click to change picture</p>
              </>
            ) : (
              <>
                <Upload size={32} className="text-muted-foreground" />
                <p className="text-sm font-medium">Upload Profile Picture</p>
                <p className="text-xs text-muted-foreground">JPG, PNG (Max 5MB)</p>
              </>
            )}
          </label>
        </div>
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
            onChange={onInputChange}
            className="px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={onInputChange}
            className="px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={onInputChange}
            className="px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={onInputChange}
            className="px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <textarea
          name="summary"
          placeholder="Professional Summary (2-3 sentences about yourself)"
          value={formData.summary}
          onChange={onInputChange}
          rows={3}
          className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Experience */}
      <div className="bg-card p-6 rounded-lg border border-border space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">Experience</h3>
          <Button type="button" onClick={onAddExperience} variant="outline" size="sm" className="gap-2 bg-transparent">
            <Plus size={16} /> Add
          </Button>
        </div>
        {formData.experience.map((exp, i) => (
          <div key={i} className="space-y-3 p-4 border border-border rounded bg-background">
            <input
              type="text"
              placeholder="Job Title"
              value={exp.title}
              onChange={(e) => onArrayChange(i, "title", e.target.value, "experience")}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <div className="grid md:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Company"
                value={exp.company}
                onChange={(e) => onArrayChange(i, "company", e.target.value, "experience")}
                className="px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="text"
                placeholder="Duration (e.g., 2020-2023)"
                value={exp.duration}
                onChange={(e) => onArrayChange(i, "duration", e.target.value, "experience")}
                className="px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <textarea
              placeholder="Description of responsibilities and achievements"
              value={exp.description}
              onChange={(e) => onArrayChange(i, "description", e.target.value, "experience")}
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
          <Button type="button" onClick={onAddEducation} variant="outline" size="sm" className="gap-2 bg-transparent">
            <Plus size={16} /> Add
          </Button>
        </div>
        {formData.education.map((edu, i) => (
          <div key={i} className="space-y-3 p-4 border border-border rounded bg-background">
            <input
              type="text"
              placeholder="School/University"
              value={edu.school}
              onChange={(e) => onArrayChange(i, "school", e.target.value, "education")}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <div className="grid md:grid-cols-3 gap-3">
              <input
                type="text"
                placeholder="Degree"
                value={edu.degree}
                onChange={(e) => onArrayChange(i, "degree", e.target.value, "education")}
                className="px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="text"
                placeholder="Field of Study"
                value={edu.field}
                onChange={(e) => onArrayChange(i, "field", e.target.value, "education")}
                className="px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="text"
                placeholder="Year"
                value={edu.year}
                onChange={(e) => onArrayChange(i, "year", e.target.value, "education")}
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
          onChange={onInputChange}
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
          onChange={onInputChange}
          rows={2}
          className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button onClick={onBack} variant="outline" className="flex-1 bg-transparent">
          Cancel
        </Button>
        <Button onClick={onPreview} className="flex-1 gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
          <Save size={16} />
          Preview & Save CV
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
      alert("CV uploaded and processed successfully! It's been saved to your dashboard.")
      onBack()
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
