import { TrendingUp, Users, Clock, Star, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MetricCard } from "@/components/ui/metric-card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts"
import { serviceAnalyticsData, workerData, vulnerableProducts } from "@/lib/mock-data"

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))']

export default function ServiceAnalytics() {
  const avgRating = serviceAnalyticsData.reduce((sum, day) => sum + day.rating, 0) / serviceAnalyticsData.length
  const totalServices = serviceAnalyticsData.reduce((sum, day) => sum + day.services, 0)
  const totalCost = serviceAnalyticsData.reduce((sum, day) => sum + day.cost, 0)

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Service Analytics</h1>
        <p className="text-muted-foreground">
          Detailed insights into service performance, worker efficiency, and cost analysis
        </p>
      </div>

      {/* Key Service Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Services"
          value={totalServices.toLocaleString()}
          change="+8.2% this week"
          changeType="positive"
          icon={TrendingUp}
        />
        <MetricCard
          title="Average Rating"
          value={avgRating.toFixed(1)}
          change="+0.3 this week"
          changeType="positive"
          icon={Star}
        />
        <MetricCard
          title="Service Cost"
          value={`₹${(totalCost / 1000).toFixed(0)}K`}
          change="+12.5% this week"
          changeType="negative"
          icon={AlertTriangle}
        />
        <MetricCard
          title="Active Workers"
          value={workerData.filter(w => w.availability).length}
          change="+3 this week"
          changeType="positive"
          icon={Users}
        />
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Service Frequency Chart */}
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Service Frequency
            </CardTitle>
            <CardDescription>Daily service requests over the past week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={serviceAnalyticsData}>
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
                    dataKey="services" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    dot={{ r: 6, fill: 'hsl(var(--primary))' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Service Rating Distribution */}
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-primary" />
              Service Cost Analysis
            </CardTitle>
            <CardDescription>Daily warranty service costs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={serviceAnalyticsData}>
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
                    formatter={(value) => [`$${value}`, 'Cost']}
                  />
                  <Bar dataKey="cost" fill="hsl(var(--chart-3))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Worker Performance Section */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Top Performers */}
        <Card className="dashboard-card lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Top Performing Workers
            </CardTitle>
            <CardDescription>Based on rating, response time, and completion rate</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {workerData
                .sort((a, b) => b.rating - a.rating)
                .slice(0, 5)
                .map((worker, index) => (
                <div key={worker.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4">
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
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span className="font-semibold">{worker.rating}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{worker.servicesCompleted} services</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-success">{worker.responseTime}min</p>
                      <p className="text-xs text-muted-foreground">avg response</p>
                    </div>
                    <Badge variant={worker.availability ? "default" : "secondary"}>
                      {worker.availability ? "Available" : "Busy"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Service Distribution */}
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-primary" />
              Most Problematic Products
            </CardTitle>
            <CardDescription>By service frequency</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={vulnerableProducts.slice(0, 5)}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="serviceCount"
                  >
                    {vulnerableProducts.slice(0, 5).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {vulnerableProducts.slice(0, 5).map((product, index) => (
                <div key={product.name} className="flex items-center gap-2 text-sm">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="flex-1">{product.name}</span>
                  <span className="font-medium">{product.serviceCount}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}