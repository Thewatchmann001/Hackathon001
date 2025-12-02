"use client"

interface JobSidebarProps {
  selectedCategory: string
  selectedLocation: string
  selectedType: string
  salarySorting: "low" | "high" | "all"
  onCategoryChange: (category: string) => void
  onLocationChange: (location: string) => void
  onTypeChange: (type: string) => void
  onSalarySortingChange: (sorting: "low" | "high" | "all") => void
}

export function JobSidebar({
  selectedCategory,
  selectedLocation,
  selectedType,
  salarySorting,
  onCategoryChange,
  onLocationChange,
  onTypeChange,
  onSalarySortingChange,
}: JobSidebarProps) {
  const categories = [
    "Engineering",
    "ICT & Software",
    "Finance",
    "Marketing",
    "Sales",
    "Management",
    "Operations",
    "Healthcare",
    "Education",
    "Internships",
    "Remote Jobs",
  ]

  const locations = ["Freetown", "Bo", "Kenema", "Makeni", "Port Loko", "Nationwide", "Remote"]

  return (
    <div className="p-6 space-y-6 sticky top-16 max-h-[calc(100vh-64px)] overflow-y-auto">
      {/* Categories */}
      <div>
        <h3 className="font-semibold text-sm mb-3 text-foreground">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <label
              key={category}
              className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors"
            >
              <input
                type="radio"
                name="category"
                value={category}
                checked={selectedCategory === category}
                onChange={(e) => onCategoryChange(e.target.value)}
                className="rounded"
              />
              <span className="text-sm">{category}</span>
            </label>
          ))}
          {selectedCategory && (
            <button onClick={() => onCategoryChange("")} className="text-xs text-primary hover:underline mt-2">
              Clear
            </button>
          )}
        </div>
      </div>

      <div className="border-t border-border pt-4" />

      {/* Locations */}
      <div>
        <h3 className="font-semibold text-sm mb-3 text-foreground">Location</h3>
        <div className="space-y-2">
          {locations.map((location) => (
            <label
              key={location}
              className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors"
            >
              <input
                type="radio"
                name="location"
                value={location}
                checked={selectedLocation === location}
                onChange={(e) => onLocationChange(e.target.value)}
                className="rounded"
              />
              <span className="text-sm">{location}</span>
            </label>
          ))}
          {selectedLocation && (
            <button onClick={() => onLocationChange("")} className="text-xs text-primary hover:underline mt-2">
              Clear
            </button>
          )}
        </div>
      </div>

      <div className="border-t border-border pt-4" />

      {/* Experience Level */}
      <div>
        <h3 className="font-semibold text-sm mb-3 text-foreground">Experience Level</h3>
        <div className="space-y-2">
          {["Entry Level", "Mid Level", "Senior Level", "Director / Executive"].map((level) => (
            <label key={level} className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors">
              <input type="checkbox" className="rounded" />
              <span className="text-sm">{level}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="border-t border-border pt-4" />

      {/* Job Type */}
      <div>
        <h3 className="font-semibold text-sm mb-3 text-foreground">Job Type</h3>
        <div className="space-y-2">
          {["Full-Time", "Part-Time", "Contract", "Internship", "Temporary"].map((type) => (
            <label key={type} className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors">
              <input
                type="radio"
                name="type"
                value={type}
                checked={selectedType === type}
                onChange={(e) => onTypeChange(e.target.value)}
                className="rounded"
              />
              <span className="text-sm">{type}</span>
            </label>
          ))}
          {selectedType && (
            <button onClick={() => onTypeChange("")} className="text-xs text-primary hover:underline mt-2">
              Clear
            </button>
          )}
        </div>
      </div>

      <div className="border-t border-border pt-4" />

      {/* Salary Range */}
      <div>
        <h3 className="font-semibold text-sm mb-3 text-foreground">Salary Range</h3>
        <div className="space-y-2">
          {[
            { label: "1,000 – 2,000 SLL", value: "1000-2000" },
            { label: "2,000 – 5,000 SLL", value: "2000-5000" },
            { label: "5,000 – 10,000 SLL", value: "5000-10000" },
            { label: "10,000+ SLL", value: "10000plus" },
          ].map((range) => (
            <label
              key={range.value}
              className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors"
            >
              <input type="checkbox" className="rounded" />
              <span className="text-sm">{range.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="border-t border-border pt-4" />

      {/* Buttons */}
      <div className="flex gap-2">
        <button className="flex-1 px-3 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90">
          Apply Filters
        </button>
        <button
          onClick={() => {
            onCategoryChange("")
            onLocationChange("")
            onTypeChange("")
            onSalarySortingChange("all")
          }}
          className="flex-1 px-3 py-2 border border-border rounded-lg text-sm font-medium hover:bg-card"
        >
          Reset Filters
        </button>
      </div>
    </div>
  )
}
