"use client"

import { MatchScoreBadge } from "./match-score-badge"
import { getMatchExplanation } from "@/lib/match-score"

interface MatchScoreTooltipProps {
  score: number
  cvSkills?: string[]
  jobSkills?: string[]
}

export function MatchScoreTooltip({ score, cvSkills = [], jobSkills = [] }: MatchScoreTooltipProps) {
  const explanation = getMatchExplanation(score)
  const skillMatches = cvSkills.filter((skill) =>
    jobSkills.some((js) => js.toLowerCase().includes(skill.toLowerCase())),
  )

  return (
    <div className="space-y-3">
      <MatchScoreBadge score={score} size="lg" />
      <p className="font-medium text-sm">{explanation}</p>

      {skillMatches.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-muted-foreground mb-2">Matching Skills:</p>
          <div className="flex flex-wrap gap-1">
            {skillMatches.slice(0, 5).map((skill) => (
              <span key={skill} className="px-2 py-1 bg-primary/10 text-primary rounded text-xs">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
