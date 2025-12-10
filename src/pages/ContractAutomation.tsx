import { FileText, Download, Eye, Filter, Calendar } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { MetricCard } from "@/components/ui/metric-card"
import { StatusBadge } from "@/components/ui/status-badge"
import { warrantyData } from "@/lib/mock-data"

export default function ContractAutomation() {
  // Extended warranty contracts (simulate data)
  const extendedContracts = warrantyData.map((item, index) => ({
    ...item,
    contractId: `CT-${String(index + 1).padStart(4, '0')}`,
    originalExpiry: item.warrantyExpiry,
    extendedExpiry: new Date(new Date(item.warrantyExpiry).getTime() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    extensionCost: Math.floor(Math.random() * 300) + 100,
    paymentStatus: Math.random() > 0.3 ? 'paid' : 'pending',
    contractDate: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  }))

  const totalContracts = extendedContracts.length
  const totalRevenue = extendedContracts.reduce((sum, contract) => sum + contract.extensionCost, 0)
  const paidContracts = extendedContracts.filter(c => c.paymentStatus === 'paid').length
  const avgContractValue = totalRevenue / totalContracts

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Contract Automation</h1>
        <p className="text-muted-foreground">
          Manage extended warranty contracts, digital agreements, and payment processing
        </p>
      </div>

      {/* Key Contract Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Contracts"
          value={totalContracts}
          change="+23% this month"
          changeType="positive"
          icon={FileText}
        />
        <MetricCard
          title="Total Revenue"
          value={`₹${totalRevenue.toLocaleString()}`}
          change="+18.5% this month"
          changeType="positive"
          icon={Download}
        />
        <MetricCard
          title="Payment Success"
          value={`${Math.round((paidContracts / totalContracts) * 100)}%`}
          change="+5% this month"
          changeType="positive"
          icon={Calendar}
        />
        <MetricCard
          title="Avg Contract Value"
          value={`₹${Math.round(avgContractValue)}`}
          change="+12% this month"
          changeType="positive"
          icon={FileText}
        />
      </div>

      {/* Filters Section */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle>Contract Filters</CardTitle>
          <CardDescription>Filter and search warranty extension contracts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Input placeholder="Search by customer or contract ID..." />
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="White Good Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All White Good Types</SelectItem>
                <SelectItem value="air-conditioner">Air Conditioner</SelectItem>
                <SelectItem value="ro">RO Water Purifier</SelectItem>
                <SelectItem value="washing-machine">Washing Machine</SelectItem>
                <SelectItem value="fridge">Refrigerator</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Payment Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export Contracts
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Contract Management Table */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle>Extended Warranty Contracts</CardTitle>
          <CardDescription>
            Digital contracts for warranty extensions processed through the platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="data-table">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Contract ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Extension Period</TableHead>
                  <TableHead>Contract Value</TableHead>
                  <TableHead>Payment Status</TableHead>
                  <TableHead>Contract Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {extendedContracts.map((contract) => (
                  <TableRow key={contract.contractId} className="hover:bg-muted/50">
                    <TableCell className="font-mono font-medium">
                      {contract.contractId}
                    </TableCell>
                    <TableCell className="font-medium">
                      {contract.customerName}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{contract.productName}</p>
                        <p className="text-sm text-muted-foreground">{contract.productType}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p>{new Date(contract.originalExpiry).toLocaleDateString()}</p>
                        <p className="text-muted-foreground">→</p>
                        <p className="text-success font-medium">{new Date(contract.extendedExpiry).toLocaleDateString()}</p>
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold">
                      ${contract.extensionCost}
                    </TableCell>
                    <TableCell>
                      <Badge variant={contract.paymentStatus === 'paid' ? 'default' : 'secondary'}>
                        {contract.paymentStatus === 'paid' ? 'Paid' : 'Pending'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(contract.contractDate).toLocaleDateString()}
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
        </CardContent>
      </Card>
    </div>
  )
}