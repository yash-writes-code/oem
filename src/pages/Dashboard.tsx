import { TrendingUp, IndianRupee, Clock, Users, Star, Shield } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MetricCard } from "@/components/ui/metric-card"
import { Progress } from "@/components/ui/progress"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts"
import { keyMetrics, monthlyPerformanceData, vulnerableProducts, getWarrantyDistribution } from "@/lib/mock-data"

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))']

export default function Dashboard() {
  const warrantyDistribution = getWarrantyDistribution()
  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">LG Performance Dashboard</h1>
        <p className="text-muted-foreground">
          Comprehensive overview of LG warranty services and operational metrics
        </p>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <MetricCard
          title="Total Services"
          value={keyMetrics.totalServices.toLocaleString()}
          change="+12.3% from last month"
          changeType="positive"
          icon={TrendingUp}
        />
        <MetricCard
          title="Cost Burnt"
          value={`₹${(keyMetrics.totalCost / 1000000).toFixed(1)}M`}
          change="+8.1% from last month"
          changeType="negative"
          icon={IndianRupee}
        />
        <MetricCard
          title="Avg. Rating"
          value={keyMetrics.averageRating}
          change="+0.2 from last month"
          changeType="positive"
          icon={Star}
        />
        <MetricCard
          title="Resolution Time"
          value={keyMetrics.avgResolutionTime}
          change="-15% from last month"
          changeType="positive"
          icon={Clock}
        />
        <MetricCard
          title="Active Workers"
          value={keyMetrics.activeWorkers}
          change="+23 from last month"
          changeType="positive"
          icon={Users}
        />
        <MetricCard
          title="Satisfaction"
          value={`${keyMetrics.customerSatisfaction}%`}
          change="+5% from last month"
          changeType="positive"
          icon={Shield}
        />
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Monthly Performance Chart */}
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Monthly Performance
            </CardTitle>
            <CardDescription>Services completed over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis 
                    dataKey="month" 
                    tick={{ fontSize: 12 }}
                    tickLine={{ stroke: 'hsl(var(--muted-foreground))' }}
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    tickLine={{ stroke: 'hsl(var(--muted-foreground))' }}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="services" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Customer Satisfaction Trend */}
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-primary" />
              Customer Satisfaction Trend
            </CardTitle>
            <CardDescription>Average rating over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis 
                    dataKey="month" 
                    tick={{ fontSize: 12 }}
                    tickLine={{ stroke: 'hsl(var(--muted-foreground))' }}
                  />
                  <YAxis 
                    domain={[3.5, 5]}
                    tick={{ fontSize: 12 }}
                    tickLine={{ stroke: 'hsl(var(--muted-foreground))' }}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="satisfaction" 
                    stroke="hsl(var(--success))" 
                    strokeWidth={3}
                    dot={{ r: 6, fill: 'hsl(var(--success))' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Warranty Distribution by Product Type */}
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Warranty Distribution
            </CardTitle>
            <CardDescription>Active warranties by product category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={warrantyDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ productType, percentage }) => `${productType}: ${percentage}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="warranties"
                  >
                    {warrantyDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                    formatter={(value: any, name: string) => [`${value} warranties`, 'Count']}
                    labelFormatter={(label) => `Product Type: ${label}`}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
              {warrantyDistribution.map((item, index) => (
                <div key={item.productType} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-muted-foreground">
                    {item.productType}: {item.warranties}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Vulnerable Products Section */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Top Vulnerable Products */}
        <Card className="dashboard-card lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-destructive" />
              Most Vulnerable Products
            </CardTitle>
            <CardDescription>Products with highest service frequency this season</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {vulnerableProducts.map((product, index) => (
                <div key={product.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center text-destructive font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">{product.serviceCount} services</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-destructive">₹{product.cost.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">cost</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* SLA Progress */}
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              SLA Performance
            </CardTitle>
            <CardDescription>Current month metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Response Time SLA</span>
                <span className="font-medium">94%</span>
              </div>
              <Progress value={94} className="h-2" />
              <p className="text-xs text-muted-foreground">Target: &lt; 1 hour</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Resolution Time SLA</span>
                <span className="font-medium">87%</span>
              </div>
              <Progress value={87} className="h-2" />
              <p className="text-xs text-muted-foreground">Target: &lt; 24 hours</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Customer Satisfaction</span>
                <span className="font-medium text-success">92%</span>
              </div>
              <Progress value={92} className="h-2" />
              <p className="text-xs text-muted-foreground">Target: &gt; 85%</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}