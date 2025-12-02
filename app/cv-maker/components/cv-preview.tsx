"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Share2 } from "lucide-react"

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

export function CVPreview({ data }: { data: CVData }) {
  const handleDownload = () => {
    alert("CV download initiated! In production, this would generate a PDF.")
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Your CV Preview</h2>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 bg-transparent" onClick={handleDownload}>
            <Download size={16} />
            Download PDF
          </Button>
          <Button variant="outline" className="gap-2 bg-transparent">
            <Share2 size={16} />
            Share
          </Button>
        </div>
      </div>

      {/* CV Document */}
      <Card className="p-12 bg-white text-black max-w-4xl mx-auto shadow-lg">
        {/* Header */}
        <div className="border-b-2 border-primary pb-6 mb-6">
          {data.profileImage && (
            <div className="mb-4 flex justify-center">
              <img
                src={data.profileImage || "/placeholder.svg"}
                alt={data.fullName}
                className="w-32 h-32 rounded-full object-cover border-4 border-primary"
              />
            </div>
          )}
          <h1 className="text-4xl font-bold text-primary mb-1 text-center">{data.fullName || "Your Name"}</h1>
          <div className="flex flex-wrap gap-4 text-sm text-gray-600 justify-center">
            {data.email && <span>{data.email}</span>}
            {data.phone && <span>•</span>}
            {data.phone && <span>{data.phone}</span>}
            {data.location && <span>•</span>}
            {data.location && <span>{data.location}</span>}
          </div>
        </div>

        {/* Summary */}
        {data.summary && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-primary mb-2">PROFESSIONAL SUMMARY</h2>
            <p className="text-gray-700 text-sm">{data.summary}</p>
          </div>
        )}

        {/* Experience */}
        {data.experience.some((e) => e.title) && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-primary mb-3">EXPERIENCE</h2>
            <div className="space-y-4">
              {data.experience.map(
                (exp, i) =>
                  (exp.title || exp.company) && (
                    <div key={i}>
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-bold text-gray-900">{exp.title}</h3>
                        <span className="text-sm text-gray-600">{exp.duration}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{exp.company}</p>
                      {exp.description && <p className="text-sm text-gray-700">{exp.description}</p>}
                    </div>
                  ),
              )}
            </div>
          </div>
        )}

        {/* Education */}
        {data.education.some((e) => e.school) && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-primary mb-3">EDUCATION</h2>
            <div className="space-y-3">
              {data.education.map(
                (edu, i) =>
                  edu.school && (
                    <div key={i}>
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-bold text-gray-900">
                          {edu.degree} {edu.field && `in ${edu.field}`}
                        </h3>
                        <span className="text-sm text-gray-600">{edu.year}</span>
                      </div>
                      <p className="text-sm text-gray-600">{edu.school}</p>
                    </div>
                  ),
              )}
            </div>
          </div>
        )}

        {/* Skills */}
        {data.skills && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-primary mb-2">SKILLS</h2>
            <p className="text-sm text-gray-700">{data.skills}</p>
          </div>
        )}

        {/* Certifications */}
        {data.certifications && (
          <div>
            <h2 className="text-lg font-bold text-primary mb-2">CERTIFICATIONS</h2>
            <p className="text-sm text-gray-700">{data.certifications}</p>
          </div>
        )}
      </Card>
    </div>
  )
}
