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
  const categories = ["Technology", "Healthcare", "Finance", "Education", "Marketing", "Sales", "Operations"]

  const locations = ["Freetown", "Bo", "Kenema", "Makeni", "Remote", "Hybrid"]

  const jobTypes = ["Full-Time", "Part-Time", "Contract", "Freelance"]

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

      {/* Job Type */}
      <div>
        <h3 className="font-semibold text-sm mb-3 text-foreground">Job Type</h3>
        <div className="space-y-2">
          {jobTypes.map((type) => (
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

      {/* Salary Sort */}
      <div>
        <h3 className="font-semibold text-sm mb-3 text-foreground">Salary</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors">
            <input
              type="radio"
              name="salary"
              value="all"
              checked={salarySorting === "all"}
              onChange={(e) => onSalarySortingChange(e.target.value as "low" | "high" | "all")}
              className="rounded"
            />
            <span className="text-sm">Any</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors">
            <input
              type="radio"
              name="salary"
              value="low"
              checked={salarySorting === "low"}
              onChange={(e) => onSalarySortingChange(e.target.value as "low" | "high" | "all")}
              className="rounded"
            />
            <span className="text-sm">Low to High</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors">
            <input
              type="radio"
              name="salary"
              value="high"
              checked={salarySorting === "high"}
              onChange={(e) => onSalarySortingChange(e.target.value as "low" | "high" | "all")}
              className="rounded"
            />
            <span className="text-sm">High to Low</span>
          </label>
        </div>
      </div>
    </div>
  )
}
