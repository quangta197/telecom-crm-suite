import { MainLayout } from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import { TrendingUp, TrendingDown, DollarSign, Target, AlertTriangle, CheckCircle } from "lucide-react";

const projectData = [
  { name: "VNPT HN", revenue: 320, cost: 240, profit: 80 },
  { name: "Viettel", revenue: 580, cost: 420, profit: 160 },
  { name: "FPT", revenue: 210, cost: 180, profit: 30 },
  { name: "CMC", revenue: 450, cost: 320, profit: 130 },
  { name: "MobiFone", revenue: 180, cost: 140, profit: 40 },
];

const profitTrend = [
  { month: "Jan", profit: 120 },
  { month: "Feb", profit: 150 },
  { month: "Mar", profit: 110 },
  { month: "Apr", profit: 180 },
  { month: "May", profit: 210 },
  { month: "Jun", profit: 190 },
  { month: "Jul", profit: 240 },
  { month: "Aug", profit: 220 },
  { month: "Sep", profit: 280 },
  { month: "Oct", profit: 310 },
  { month: "Nov", profit: 290 },
  { month: "Dec", profit: 350 },
];

const costBreakdown = [
  { name: "Personnel", value: 45, color: "hsl(24, 95%, 53%)" },
  { name: "Equipment", value: 25, color: "hsl(32, 98%, 50%)" },
  { name: "Operations", value: 15, color: "hsl(142, 71%, 45%)" },
  { name: "Other", value: 15, color: "hsl(215, 16%, 47%)" },
];

const Analytics = () => {
  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Profit & Loss Analysis</h1>
            <p className="text-muted-foreground">
              Track financial performance across projects
            </p>
          </div>
          <Select defaultValue="2024">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">Year 2024</SelectItem>
              <SelectItem value="2023">Year 2023</SelectItem>
              <SelectItem value="2022">Year 2022</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="p-5 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">$1.74M</p>
                <div className="flex items-center gap-1 text-sm text-success">
                  <TrendingUp className="h-4 w-4" />
                  +18.2%
                </div>
              </div>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
            </div>
          </Card>

          <Card className="p-5 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Costs</p>
                <p className="text-2xl font-bold">$1.30M</p>
                <div className="flex items-center gap-1 text-sm text-destructive">
                  <TrendingUp className="h-4 w-4" />
                  +12.5%
                </div>
              </div>
              <div className="h-12 w-12 rounded-lg bg-destructive/10 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-destructive" />
              </div>
            </div>
          </Card>

          <Card className="p-5 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Net Profit</p>
                <p className="text-2xl font-bold">$440K</p>
                <div className="flex items-center gap-1 text-sm text-success">
                  <TrendingUp className="h-4 w-4" />
                  +24.8%
                </div>
              </div>
              <div className="h-12 w-12 rounded-lg bg-success/10 flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-success" />
              </div>
            </div>
          </Card>

          <Card className="p-5 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Profit Margin</p>
                <p className="text-2xl font-bold">25.3%</p>
                <div className="flex items-center gap-1 text-sm text-success">
                  <TrendingUp className="h-4 w-4" />
                  +2.1%
                </div>
              </div>
              <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                <Target className="h-6 w-6 text-accent" />
              </div>
            </div>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Project P&L */}
          <Card className="p-6 shadow-card">
            <h3 className="text-lg font-semibold mb-4">P&L by Project</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={projectData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 32%, 91%)" />
                  <XAxis dataKey="name" stroke="hsl(215, 16%, 47%)" fontSize={12} />
                  <YAxis stroke="hsl(215, 16%, 47%)" fontSize={12} tickFormatter={(v) => `$${v}K`} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(0, 0%, 100%)",
                      border: "1px solid hsl(214, 32%, 91%)",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => [`$${value}K`, ""]}
                  />
                  <Bar dataKey="revenue" fill="hsl(217, 91%, 50%)" name="Revenue" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="cost" fill="hsl(0, 84%, 60%)" name="Cost" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="profit" fill="hsl(142, 71%, 45%)" name="Profit" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Profit Trend */}
          <Card className="p-6 shadow-card">
            <h3 className="text-lg font-semibold mb-4">Profit Trend</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={profitTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 32%, 91%)" />
                  <XAxis dataKey="month" stroke="hsl(215, 16%, 47%)" fontSize={12} />
                  <YAxis stroke="hsl(215, 16%, 47%)" fontSize={12} tickFormatter={(v) => `$${v}K`} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(0, 0%, 100%)",
                      border: "1px solid hsl(214, 32%, 91%)",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => [`$${value}K`, "Profit"]}
                  />
                  <Line
                    type="monotone"
                    dataKey="profit"
                    stroke="hsl(142, 71%, 45%)"
                    strokeWidth={3}
                    dot={{ fill: "hsl(142, 71%, 45%)", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Cost Breakdown */}
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="p-6 shadow-card">
            <h3 className="text-lg font-semibold mb-4">Cost Structure</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={costBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {costBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => [`${value}%`, ""]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2">
              {costBreakdown.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span>{item.name}</span>
                  </div>
                  <span className="font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Top Profitable Projects */}
          <Card className="p-6 shadow-card lg:col-span-2">
            <h3 className="text-lg font-semibold mb-4">Most Profitable Projects</h3>
            <div className="space-y-4">
              {projectData
                .sort((a, b) => b.profit - a.profit)
                .slice(0, 4)
                .map((project, index) => {
                  const marginPercent = ((project.profit / project.revenue) * 100).toFixed(1);
                  return (
                    <div key={project.name} className="flex items-center gap-4 p-4 rounded-lg bg-secondary/30">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full gradient-primary text-primary-foreground font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold">{project.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Revenue: ${project.revenue}K
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-success">${project.profit}K</p>
                        <p className="text-sm text-muted-foreground">Margin: {marginPercent}%</p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Analytics;
