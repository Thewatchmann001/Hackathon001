"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { FileText, Eye, Download } from "lucide-react"

interface DocumentPreviewProps {
  document: {
    type: string
    name: string
    url: string
  }
}

export function DocumentPreview({ document }: DocumentPreviewProps) {
  const [showPreview, setShowPreview] = useState(false)

  return (
    <div className="border border-border rounded-lg p-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <FileText className="h-5 w-5 text-muted-foreground" />
        <div>
          <p className="text-sm font-medium">{document.type}</p>
          <p className="text-xs text-foreground/50">{document.name}</p>
        </div>
      </div>

      <div className="flex gap-2">
        <Button variant="ghost" size="sm" onClick={() => setShowPreview(!showPreview)}>
          <Eye className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm">
          <Download className="h-4 w-4" />
        </Button>
      </div>

      {showPreview && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-96 overflow-auto">
            <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between">
              <h3 className="font-semibold">{document.type}</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowPreview(false)}>
                ✕
              </Button>
            </div>
            <img src={document.url || "/placeholder.svg"} alt={document.type} className="w-full" />
          </div>
        </div>
      )}
    </div>
  )
}
