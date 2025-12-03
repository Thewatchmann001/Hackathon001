"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, ArrowLeft } from "lucide-react"
import { generateCVPDF } from "@/lib/cv-pdf-generator"
import { useState } from "react"

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

export function CVPreview({ data, onBack }: { data: CVData; onBack?: () => void }) {
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = async () => {
    setIsDownloading(true)
    try {
      const fileName = data.fullName.replace(/\s+/g, "-") || "Resume"
      await generateCVPDF("cv-document", fileName)
    } catch (error) {
      console.error("Download failed:", error)
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-3xl font-bold">Your CV Preview</h2>
        <div className="flex gap-2 w-full sm:w-auto">
          {onBack && (
            <Button onClick={onBack} variant="outline" className="gap-2 bg-transparent flex-1 sm:flex-none">
              <ArrowLeft size={16} />
              Back
            </Button>
          )}
          <Button
            onClick={handleDownload}
            disabled={isDownloading}
            className="gap-2 flex-1 sm:flex-none bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Download size={16} />
            {isDownloading ? "Generating..." : "Download PDF"}
          </Button>
        </div>
      </div>

      {/* CV Document */}
      <div className="w-full overflow-x-auto">
        <Card id="cv-document" className="p-8 sm:p-12 bg-white text-black max-w-4xl mx-auto shadow-lg w-full">
          {/* Header */}
          <div className="border-b-2 border-green-600 pb-6 mb-6">
            {data.profileImage && (
              <div className="mb-4 flex justify-center">
                <img
                  src={data.profileImage || "/placeholder.svg"}
                  alt={data.fullName}
                  className="w-28 h-28 rounded-full object-cover border-4 border-green-600"
                />
              </div>
            )}
            <h1 className="text-3xl sm:text-4xl font-bold text-green-600 mb-2 text-center">
              {data.fullName || "Your Name"}
            </h1>
            <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600 justify-center">
              {data.email && <span>{data.email}</span>}
              {data.email && data.phone && <span>•</span>}
              {data.phone && <span>{data.phone}</span>}
              {(data.email || data.phone) && data.location && <span>•</span>}
              {data.location && <span>{data.location}</span>}
            </div>
          </div>

          {/* Summary */}
          {data.summary && (
            <div className="mb-6">
              <h2 className="text-base sm:text-lg font-bold text-green-600 mb-2 uppercase">Professional Summary</h2>
              <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">{data.summary}</p>
            </div>
          )}

          {/* Experience */}
          {data.experience.some((e) => e.title) && (
            <div className="mb-6">
              <h2 className="text-base sm:text-lg font-bold text-green-600 mb-3 uppercase">Experience</h2>
              <div className="space-y-4">
                {data.experience.map(
                  (exp, i) =>
                    (exp.title || exp.company) && (
                      <div key={i}>
                        <div className="flex flex-col sm:flex-row justify-between items-start mb-1 gap-2">
                          <h3 className="font-bold text-gray-900 text-sm sm:text-base">{exp.title}</h3>
                          <span className="text-xs sm:text-sm text-gray-600 whitespace-nowrap">{exp.duration}</span>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600 mb-1">{exp.company}</p>
                        {exp.description && <p className="text-xs sm:text-sm text-gray-700">{exp.description}</p>}
                      </div>
                    ),
                )}
              </div>
            </div>
          )}

          {/* Education */}
          {data.education.some((e) => e.school) && (
            <div className="mb-6">
              <h2 className="text-base sm:text-lg font-bold text-green-600 mb-3 uppercase">Education</h2>
              <div className="space-y-3">
                {data.education.map(
                  (edu, i) =>
                    edu.school && (
                      <div key={i}>
                        <div className="flex flex-col sm:flex-row justify-between items-start mb-1 gap-2">
                          <h3 className="font-bold text-gray-900 text-sm sm:text-base">
                            {edu.degree} {edu.field && `in ${edu.field}`}
                          </h3>
                          <span className="text-xs sm:text-sm text-gray-600 whitespace-nowrap">{edu.year}</span>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600">{edu.school}</p>
                      </div>
                    ),
                )}
              </div>
            </div>
          )}

          {/* Skills */}
          {data.skills && (
            <div className="mb-6">
              <h2 className="text-base sm:text-lg font-bold text-green-600 mb-2 uppercase">Skills</h2>
              <p className="text-xs sm:text-sm text-gray-700">{data.skills}</p>
            </div>
          )}

          {/* Certifications */}
          {data.certifications && (
            <div>
              <h2 className="text-base sm:text-lg font-bold text-green-600 mb-2 uppercase">Certifications</h2>
              <p className="text-xs sm:text-sm text-gray-700">{data.certifications}</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
