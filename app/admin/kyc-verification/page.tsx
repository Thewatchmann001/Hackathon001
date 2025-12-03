"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { KycVerificationCard } from "@/components/admin/kyc-verification-card"
import { DocumentPreview } from "@/components/admin/document-preview"
import { Search, Filter } from "lucide-react"

export default function KycVerificationPage() {
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [filter, setFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  // Mock data
  const pendingUsers = [
    {
      id: 1,
      name: "Aminata Kamara",
      category: "Job Seeker",
      email: "aminata@email.com",
      submittedDate: "2024-01-15",
      status: "pending",
      documents: [
        { type: "National ID", name: "national-id.pdf", url: "/national-id.jpg" },
        { type: "Voter ID", name: "voter-id.pdf", url: "/voter-card.jpg" },
      ],
      profileImage: "AK",
    },
    {
      id: 2,
      name: "Mohamed Sesay Enterprises",
      category: "Employer",
      email: "contact@sesayenterprises.com",
      submittedDate: "2024-01-14",
      status: "pending",
      documents: [
        { type: "Government ID", name: "gov-id.pdf", url: "/government-id.jpg" },
        { type: "Certificate of Incorporation", name: "cert-inc.pdf", url: "/business-certificate.jpg" },
        { type: "Proof of Address", name: "proof-address.pdf", url: "/business-address.jpg" },
      ],
      profileImage: "MS",
    },
    {
      id: 3,
      name: "TechStart SL",
      category: "Startup",
      email: "info@techstartsl.com",
      submittedDate: "2024-01-13",
      status: "pending",
      documents: [
        { type: "Certificate of Incorporation", name: "cert-inc.pdf", url: "/business-certificate.jpg" },
        { type: "Government ID", name: "gov-id.pdf", url: "/government-id.jpg" },
        { type: "Proof of Business Address", name: "proof-biz-addr.pdf", url: "/business-location.jpg" },
      ],
      profileImage: "TS",
    },
    {
      id: 4,
      name: "Fatima Mansaray",
      category: "Job Seeker",
      email: "fatima@email.com",
      submittedDate: "2024-01-12",
      status: "verified",
      documents: [{ type: "National ID", name: "national-id.pdf", url: "/national-id.jpg" }],
      profileImage: "FM",
    },
  ]

  const filteredUsers = pendingUsers.filter((user) => {
    const matchesFilter = filter === "all" || user.status === filter
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">KYC Verification Center</h1>
        <p className="text-foreground/60 mt-2">Review and verify user accounts within 72 hours</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main verification list */}
        <div className="lg:col-span-2 space-y-6">
          {/* Filters */}
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-foreground/40" />
                  <Input
                    placeholder="Search by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex gap-2 flex-wrap">
                <Button variant={filter === "all" ? "default" : "outline"} size="sm" onClick={() => setFilter("all")}>
                  All
                </Button>
                <Button
                  variant={filter === "pending" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("pending")}
                >
                  Pending
                </Button>
                <Button
                  variant={filter === "verified" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("verified")}
                >
                  Verified
                </Button>
              </div>
            </div>
          </Card>

          {/* User list */}
          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <KycVerificationCard
                key={user.id}
                user={user}
                isSelected={selectedUser?.id === user.id}
                onSelect={() => setSelectedUser(user)}
              />
            ))}
          </div>
        </div>

        {/* Document preview panel */}
        {selectedUser && (
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">User Details</h2>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-foreground/60">Name</p>
                  <p className="font-medium">{selectedUser.name}</p>
                </div>
                <div>
                  <p className="text-foreground/60">Category</p>
                  <p className="font-medium">{selectedUser.category}</p>
                </div>
                <div>
                  <p className="text-foreground/60">Email</p>
                  <p className="font-medium break-all">{selectedUser.email}</p>
                </div>
                <div>
                  <p className="text-foreground/60">Submitted</p>
                  <p className="font-medium">{selectedUser.submittedDate}</p>
                </div>
                <div>
                  <p className="text-foreground/60">Status</p>
                  <Badge className="mt-2" variant={selectedUser.status === "verified" ? "default" : "secondary"}>
                    {selectedUser.status === "verified" ? "✓ Verified" : "Pending Review"}
                  </Badge>
                </div>
              </div>

              {selectedUser.status === "pending" && (
                <div className="flex gap-3 mt-6 pt-6 border-t">
                  <Button className="flex-1" size="sm">
                    Approve
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent" size="sm">
                    Reject
                  </Button>
                </div>
              )}
            </Card>

            {/* Documents */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Documents</h2>
              <div className="space-y-3">
                {selectedUser.documents.map((doc, idx) => (
                  <DocumentPreview key={idx} document={doc} />
                ))}
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
