"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, Download, Eye, Edit2 } from "lucide-react"

interface CVViewerProps {
  profile: {
    name: string
    title: string
    email: string
    phone: string
    location: string
    skills: string[]
    cvUploaded: boolean
  }
}

export function CVViewer({ profile }: CVViewerProps) {
  const [showPreview, setShowPreview] = useState(false)

  return (
    <div className="space-y-6">
      {profile.cvUploaded ? (
        <>
          {/* CV Actions */}
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={() => setShowPreview(!showPreview)}
              className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Eye size={16} />
              {showPreview ? "Hide" : "Preview"} CV
            </Button>
            <Button variant="outline" className="gap-2 bg-transparent">
              <Download size={16} />
              Download
            </Button>
            <Button variant="outline" className="gap-2 bg-transparent">
              <Edit2 size={16} />
              Edit
            </Button>
            <Button variant="outline" className="gap-2 bg-transparent">
              <Upload size={16} />
              Replace
            </Button>
          </div>

          {/* CV Preview */}
          {showPreview && (
            <Card className="p-8 bg-white text-black space-y-6">
              <div>
                <h1 className="text-3xl font-bold">{profile.name}</h1>
                <p className="text-lg text-gray-700">{profile.title}</p>
              </div>

              <div className="flex gap-4 text-sm text-gray-600">
                <span>{profile.email}</span>
                <span>•</span>
                <span>{profile.phone}</span>
                <span>•</span>
                <span>{profile.location}</span>
              </div>

              <hr />

              <div>
                <h2 className="text-xl font-bold mb-3">Summary</h2>
                <p className="text-gray-700">
                  Passionate professional with expertise in software development and technical leadership. Proven track
                  record of delivering high-quality solutions and leading successful projects.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-3">Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-gray-200 text-gray-800 rounded text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-3">Experience</h2>
                <div className="space-y-3">
                  <div>
                    <h3 className="font-bold">Senior Software Engineer</h3>
                    <p className="text-gray-600">TechHub SL · 2021 - Present</p>
                    <p className="text-gray-700 mt-1">
                      Led development of multiple projects and mentored junior developers.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </>
      ) : (
        <Card className="p-12 text-center border-2 border-dashed border-border">
          <Upload size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">No CV Uploaded</h3>
          <p className="text-muted-foreground mb-6">Upload or create your CV to get started with job applications.</p>
          <div className="flex gap-3 justify-center">
            <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
              <Upload size={16} />
              Upload CV
            </Button>
            <Button variant="outline" className="gap-2 bg-transparent">
              <Edit2 size={16} />
              Create New
            </Button>
          </div>
        </Card>
      )}
    </div>
  )
}
