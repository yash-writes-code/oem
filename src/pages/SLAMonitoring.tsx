import { useState } from "react"
import { Clock, Zap, Users, Target, CheckCircle, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MetricCard } from "@/components/ui/metric-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"
import { workerData, serviceAnalyticsData } from "@/lib/mock-data"

// Mock SLA data
const slaData = [
  { date: '2024-01-01', responseTime: 45, resolutionTime: 2.8, target: 60 },
  { date: '2024-01-02', responseTime: 38, resolutionTime: 3.2, target: 60 },
  { date: '2024-01-03', responseTime: 52, resolutionTime: 2.1, target: 60 },
  { date: '2024-01-04', responseTime: 41, resolutionTime: 4.1, target: 60 },
  { date: '2024-01-05', responseTime: 47, resolutionTime: 2.9, target: 60 },
  { date: '2024-01-06', responseTime: 33, resolutionTime: 3.5, target: 60 },
  { date: '2024-01-07', responseTime: 44, resolutionTime: 2.7, target: 60 }
]

// Mock complaint for smart routing
const mockComplaint = {
  id: "COMP-2024-001",
  customerName: "Sneha Patel",
  productName: "Voltas 1.5 Ton Split AC",
  location: "Mumbai, MH",
  issueType: "Cooling Issue",
  priority: "High",
  description: "Customer reports cooling issue in air conditioner. Requesting immediate service under warranty.",
  skills: ["AC Repair", "Voltas Appliances", "Cooling Systems"]
}

export default function SLAMonitoring() {
  const [showSmartRouting, setShowSmartRouting] = useState(false)
  const [selectedWorker, setSelectedWorker] = useState<string | null>(null)

  // Calculate SLA metrics
  const avgResponseTime = slaData.reduce((sum, day) => sum + day.responseTime, 0) / slaData.length
  const avgResolutionTime = slaData.reduce((sum, day) => sum + day.resolutionTime, 0) / slaData.length
  const slaCompliance = Math.round((slaData.filter(d => d.responseTime <= 60).length / slaData.length) * 100)

  // Smart routing scoring (mock ML algorithm)
  const getWorkerScore = (worker: any) => {
    const availabilityScore = worker.availability ? 100 : 0
    const ratingScore = (worker.rating / 5) * 100
    const speedScore = Math.max(0, 100 - (worker.responseTime - 5) * 10)
    const experienceScore = Math.min(100, (worker.servicesCompleted / 500) * 100)
    
    return Math.round((availabilityScore * 0.3 + ratingScore * 0.25 + speedScore * 0.25 + experienceScore * 0.2))
  }

  const rankedWorkers = workerData
    .map(worker => ({ ...worker, score: getWorkerScore(worker) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 10)

  const handleWorkerSelect = (workerId: string) => {
    setSelectedWorker(workerId)
    // Simulate assignment
    setTimeout(() => {
      setSelectedWorker(null)
      setShowSmartRouting(false)
      alert("Assignment request sent to worker. Awaiting confirmation...")
    }, 1000)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">SLA Monitoring & Smart Routing</h1>
        <p className="text-muted-foreground">
          Monitor service level agreements and intelligently route complaints to optimal workers
        </p>
      </div>

      {/* SLA Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Avg Response Time"
          value={`${avgResponseTime.toFixed(0)}min`}
          change="-8min from target"
          changeType="positive"
          icon={Clock}
          description="Target: < 60min"
        />
        <MetricCard
          title="Avg Resolution Time"
          value={`${avgResolutionTime.toFixed(1)}hrs`}
          change="+0.3hrs from target"
          changeType="negative"
          icon={Target}
          description="Target: < 24hrs"
        />
        <MetricCard
          title="SLA Compliance"
          value={`${slaCompliance}%`}
          change="+5% this week"
          changeType="positive"
          icon={CheckCircle}
          description="Meeting SLA targets"
        />
        <MetricCard
          title="Active Workers"
          value={workerData.filter(w => w.availability).length}
          change="+2 today"
          changeType="positive"
          icon={Users}
          description="Available for assignments"
        />
      </div>

      {/* Smart Routing Section */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            Smart Routing System
          </CardTitle>
          <CardDescription>AI-powered worker assignment for optimal service delivery</CardDescription>
        </CardHeader>
        <CardContent>
          {!showSmartRouting ? (
            <div className="text-center py-8">
              <div className="bg-muted/30 rounded-lg p-6 mb-4 max-w-md mx-auto">
                <AlertTriangle className="h-12 w-12 text-warning mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">New Complaint Received</h3>
                <p className="text-muted-foreground mb-4">
                  Incoming service request requires smart routing assignment
                </p>
                <Button 
                  onClick={() => setShowSmartRouting(true)}
                  className="flex items-center gap-2 mx-auto"
                >
                  <Zap className="h-4 w-4" />
                  Use Smart Routing
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Complaint Details */}
              <div className="bg-muted/30 rounded-lg p-4">
                <h4 className="font-semibold mb-3">Complaint Details: {mockComplaint.id}</h4>
                <div className="grid gap-2 md:grid-cols-2 text-sm">
                  <div><span className="font-medium">Customer:</span> {mockComplaint.customerName}</div>
                  <div><span className="font-medium">Product:</span> {mockComplaint.productName}</div>
                  <div><span className="font-medium">Location:</span> {mockComplaint.location}</div>
                  <div><span className="font-medium">Priority:</span> 
                    <Badge variant="destructive" className="ml-2">{mockComplaint.priority}</Badge>
                  </div>
                  <div className="md:col-span-2"><span className="font-medium">Issue:</span> {mockComplaint.description}</div>
                  <div className="md:col-span-2">
                    <span className="font-medium">Required Skills:</span>
                    <div className="flex gap-1 mt-1">
                      {mockComplaint.skills.map(skill => (
                        <Badge key={skill} variant="outline">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Top 10 Recommended Workers */}
              <div>
                <h4 className="font-semibold mb-3">Top 10 Recommended Workers</h4>
                <div className="data-table">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Rank</TableHead>
                        <TableHead>Worker</TableHead>
                        <TableHead>Score</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead>Response Time</TableHead>
                        <TableHead>Availability</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {rankedWorkers.map((worker, index) => (
                        <TableRow key={worker.id} className="hover:bg-muted/50">
                          <TableCell>
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                              {index + 1}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback className="text-xs">
                                  {worker.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{worker.name}</p>
                                <p className="text-xs text-muted-foreground">{worker.company}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="w-16 bg-muted rounded-full h-2">
                                <div 
                                  className="bg-primary h-2 rounded-full transition-all"
                                  style={{ width: `${worker.score}%` }}
                                />
                              </div>
                              <span className="text-sm font-medium">{worker.score}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <span className="font-medium">{worker.rating}</span>
                              <span className="text-yellow-500">★</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm">{worker.responseTime} min</span>
                          </TableCell>
                          <TableCell>
                            <Badge variant={worker.availability ? "default" : "secondary"}>
                              {worker.availability ? "Available" : "Busy"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button 
                              size="sm" 
                              onClick={() => handleWorkerSelect(worker.id)}
                              disabled={!worker.availability || selectedWorker === worker.id}
                              variant={selectedWorker === worker.id ? "default" : "outline"}
                            >
                              {selectedWorker === worker.id ? "Assigning..." : "Assign"}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* SLA Performance Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Response Time Trend */}
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Response Time vs SLA Target
            </CardTitle>
            <CardDescription>Daily response times compared to 60-minute SLA target</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={slaData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => new Date(value).toLocaleDateString()}
                  />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                    labelFormatter={(value) => new Date(value).toLocaleDateString()}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="responseTime" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    name="Response Time (min)"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="target" 
                    stroke="hsl(var(--destructive))" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="SLA Target (60min)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Worker Leaderboard */}
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Worker Performance Leaderboard
            </CardTitle>
            <CardDescription>Top 10 workers by overall performance score</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {rankedWorkers.slice(0, 10).map((worker, index) => (
                <div key={worker.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                      {index + 1}
                    </div>
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>
                        {worker.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{worker.name}</p>
                      <p className="text-sm text-muted-foreground">{worker.company}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-semibold text-primary">{worker.score}</p>
                      <p className="text-xs text-muted-foreground">score</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{worker.rating}★</p>
                      <p className="text-xs text-muted-foreground">{worker.servicesCompleted} jobs</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}