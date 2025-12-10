import { useState } from "react"
import { Search, Filter, Download, Eye } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StatusBadge } from "@/components/ui/status-badge"
import { warrantyData, type WarrantyData } from "@/lib/mock-data"

export default function WarrantyManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [productTypeFilter, setProductTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredData = warrantyData.filter((item) => {
    const matchesSearch = 
      item.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.productName.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesProductType = productTypeFilter === "all" || item.productType === productTypeFilter
    const matchesStatus = statusFilter === "all" || item.status === statusFilter

    return matchesSearch && matchesProductType && matchesStatus
  })

  const productTypes = [...new Set(warrantyData.map(item => item.productType))]

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">LG Warranty Management</h1>
        <p className="text-muted-foreground">
          Manage LG customer warranties, track expiration dates, and view service history
        </p>
      </div>

      {/* Filters and Search */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle>Filters & Search</CardTitle>
          <CardDescription>Filter warranties by various criteria</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search customers or LG products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Product Type Filter */}
            <Select value={productTypeFilter} onValueChange={setProductTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Product Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Product Types</SelectItem>
                {productTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="expiring">Expiring Soon</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectContent>
            </Select>

            {/* Export Button */}
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export Data
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Warranty Table */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle>Warranty Records</CardTitle>
          <CardDescription>
            {filteredData.length} of {warrantyData.length} warranties shown
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="data-table">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Warranty Expiry</TableHead>
                  <TableHead>Last Service</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((warranty) => (
                  <TableRow key={warranty.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">
                      {warranty.customerName}
                    </TableCell>
                    <TableCell>{warranty.productName}</TableCell>
                    <TableCell>{warranty.productType}</TableCell>
                    <TableCell>
                      {new Date(warranty.warrantyExpiry).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {new Date(warranty.lastServiceDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={warranty.status}>
                        {warranty.status === "active" ? "Active" : 
                         warranty.status === "expired" ? "Expired" : "Expiring Soon"}
                      </StatusBadge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredData.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No warranties found matching your criteria.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}