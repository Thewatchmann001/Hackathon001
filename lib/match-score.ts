// AI Job Matching Score Calculation
// Mock implementation - in production, this would use Sentence Transformers

export interface CVData {
  skills: string[]
  experience: string
  education: string
  summary: string
}

export interface JobData {
  title: string
  description: string
  requirements: string[]
  skills: string[]
}

/**
 * Calculates match score between CV and job description (0-100)
 * Factors: skill match, experience level, keywords, requirements
 */
export function calculateMatchScore(cv: CVData, job: JobData): number {
  let score = 0
  let weightedPoints = 0

  // 1. Skill Match (40% weight)
  const skillMatches = cv.skills.filter((skill) =>
    job.skills.some(
      (jobSkill) =>
        jobSkill.toLowerCase().includes(skill.toLowerCase()) || skill.toLowerCase().includes(jobSkill.toLowerCase()),
    ),
  ).length
  const skillScore = (skillMatches / Math.max(job.skills.length, 1)) * 40
  weightedPoints += skillScore

  // 2. Requirements Coverage (30% weight)
  const requirementMatches = job.requirements.filter(
    (req) =>
      cv.summary.toLowerCase().includes(req.toLowerCase()) || cv.experience.toLowerCase().includes(req.toLowerCase()),
  ).length
  const requirementScore = (requirementMatches / Math.max(job.requirements.length, 1)) * 30
  weightedPoints += requirementScore

  // 3. Experience Keywords (20% weight)
  const experienceKeywords = ["experience", "years", "lead", "developed", "managed", "architected"]
  const expMatches = experienceKeywords.filter((keyword) => cv.experience.toLowerCase().includes(keyword)).length
  const experienceScore = (expMatches / experienceKeywords.length) * 20
  weightedPoints += experienceScore

  // 4. Education Match (10% weight)
  const educationBonus =
    cv.education.toLowerCase().includes("degree") ||
    cv.education.toLowerCase().includes("bachelor") ||
    cv.education.toLowerCase().includes("master")
      ? 10
      : 0
  weightedPoints += educationBonus

  // Normalize to 0-100 and add randomness for demo
  score = Math.min(Math.round(weightedPoints), 100)

  // Add slight randomness for demonstration (±5%)
  const randomFactor = Math.random() * 10 - 5
  return Math.max(Math.min(score + randomFactor, 100), 60)
}

/**
 * Get match score explanation based on score range
 */
export function getMatchExplanation(score: number): string {
  if (score >= 90) return "Excellent fit for this role"
  if (score >= 80) return "Strong alignment with requirements"
  if (score >= 70) return "Good match for this position"
  if (score >= 60) return "Moderate fit, but missing some skills"
  return "May need additional training"
}

/**
 * Get match color based on score
 */
export function getMatchColor(score: number): string {
  if (score >= 90) return "text-green-600"
  if (score >= 80) return "text-blue-600"
  if (score >= 70) return "text-yellow-600"
  if (score >= 60) return "text-orange-600"
  return "text-red-600"
}
