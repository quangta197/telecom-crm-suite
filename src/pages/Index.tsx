import { MainLayout } from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import {
  Target,
  TrendingUp,
  Users,
  FileText,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Building2,
  Calendar,
  Phone,
  Mail,
  CheckCircle,
  Clock,
  BarChart3,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// ── KPI Data ──
const kpis = [
  { label: "Total Leads", value: "148", change: 12.5, icon: Target, color: "text-info", bg: "bg-info/10" },
  { label: "Open Opportunities", value: "67", change: 8.3, icon: TrendingUp, color: "text-primary", bg: "bg-primary/10" },
  { label: "Active Projects", value: "23", change: -2.1, icon: FileText, color: "text-accent", bg: "bg-accent/10" },
  { label: "Pipeline Value", value: "$1.42M", change: 15.7, icon: DollarSign, color: "text-success", bg: "bg-success/10" },
];

// ── Revenue Trend ──
const revenueTrend = [
  { month: "Jul", revenue: 185000, won: 120000 },
  { month: "Aug", revenue: 210000, won: 145000 },
  { month: "Sep", revenue: 195000, won: 130000 },
  { month: "Oct", revenue: 240000, won: 165000 },
  { month: "Nov", revenue: 280000, won: 195000 },
  { month: "Dec", revenue: 310000, won: 220000 },
  { month: "Jan", revenue: 265000, won: 185000 },
  { month: "Feb", revenue: 320000, won: 240000 },
];

// ── Pipeline Stages ──
const pipeline = [
  { stage: "Discovery", count: 24, value: 240000, color: "hsl(199, 89%, 48%)" },
  { stage: "Qualification", count: 18, value: 420000, color: "hsl(24, 95%, 53%)" },
  { stage: "Proposal", count: 12, value: 380000, color: "hsl(32, 98%, 50%)" },
  { stage: "Negotiation", count: 8, value: 210000, color: "hsl(38, 92%, 50%)" },
  { stage: "Closed Won", count: 5, value: 170000, color: "hsl(142, 71%, 45%)" },
];

// ── Lead Sources ──
const leadSources = [
  { name: "Referral", value: 42, color: "hsl(24, 95%, 53%)" },
  { name: "Website", value: 31, color: "hsl(199, 89%, 48%)" },
  { name: "Cold Call", value: 28, color: "hsl(142, 71%, 45%)" },
  { name: "Event", value: 18, color: "hsl(38, 92%, 50%)" },
  { name: "Partner", value: 15, color: "hsl(280, 60%, 55%)" },
];

// ── Top Deals ──
const topDeals = [
  { company: "VNPT Hanoi", value: "$320K", stage: "Negotiation", probability: 75, closeDate: "Mar 15" },
  { company: "Viettel Business", value: "$580K", stage: "Proposal", probability: 60, closeDate: "Mar 22" },
  { company: "FPT Telecom", value: "$210K", stage: "Qualification", probability: 45, closeDate: "Apr 01" },
  { company: "CMC Telecom", value: "$450K", stage: "Negotiation", probability: 80, closeDate: "Mar 10" },
];

// ── Recent Activities ──
const recentActivities = [
  { type: "call", icon: Phone, title: "Called VNPT Hanoi", desc: "Discussed enterprise package", time: "10 min ago", user: "John Smith" },
  { type: "email", icon: Mail, title: "Sent quote to Viettel", desc: "Network infrastructure package", time: "1h ago", user: "Sarah Johnson" },
  { type: "meeting", icon: Calendar, title: "Meeting with MobiFone", desc: "Product demo scheduled", time: "2h ago", user: "Mike Wilson" },
  { type: "deal", icon: CheckCircle, title: "Closed CMC deal", desc: "Value: $250K", time: "3h ago", user: "Emily Davis" },
  { type: "project", icon: FileText, title: "New project created", desc: "FPT Data Center upgrade", time: "5h ago", user: "John Smith" },
];

const activityColors: Record<string, string> = {
  call: "bg-info/10 text-info",
  email: "bg-primary/10 text-primary",
  meeting: "bg-warning/10 text-warning",
  deal: "bg-success/10 text-success",
  project: "bg-accent/10 text-accent",
};

// ── Upcoming Tasks ──
const upcomingTasks = [
  { title: "Follow up with VNPT proposal", due: "Today", priority: "High", status: "In Progress" },
  { title: "Prepare Viettel demo materials", due: "Tomorrow", priority: "High", status: "Todo" },
  { title: "Review FPT contract terms", due: "Mar 02", priority: "Medium", status: "Todo" },
  { title: "Submit quarterly report", due: "Mar 05", priority: "Low", status: "Todo" },
];

const priorityColors: Record<string, string> = {
  High: "bg-destructive/10 text-destructive",
  Medium: "bg-warning/10 text-warning",
  Low: "bg-muted text-muted-foreground",
};

// ── Project Status Summary ──
const projectStatus = [
  { status: "Draft", count: 4, color: "bg-muted-foreground" },
  { status: "In Progress", count: 12, color: "bg-primary" },
  { status: "Pending Approval", count: 3, color: "bg-warning" },
  { status: "Completed", count: 8, color: "bg-success" },
];

const fmt = (n: number) => `$${(n / 1000).toFixed(0)}K`;

const Index = () => {
  const totalPipeline = pipeline.reduce((s, p) => s + p.value, 0);
  const totalLeadSources = leadSources.reduce((s, l) => s + l.value, 0);
  const totalProjects = projectStatus.reduce((s, p) => s + p.count, 0);

  return (
    <MainLayout showFilters={false} showActivity={false}>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground text-sm">Sales overview & key metrics</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-4 gap-4">
          {kpis.map((kpi) => (
            <Card key={kpi.label} className="p-5">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">{kpi.label}</p>
                  <p className="text-2xl font-bold">{kpi.value}</p>
                  <div className={cn("flex items-center gap-1 text-xs font-medium", kpi.change >= 0 ? "text-success" : "text-destructive")}>
                    {kpi.change >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                    {kpi.change >= 0 ? "+" : ""}{kpi.change}% vs last month
                  </div>
                </div>
                <div className={cn("flex h-11 w-11 items-center justify-center rounded-xl", kpi.bg)}>
                  <kpi.icon className={cn("h-5 w-5", kpi.color)} />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Row 2: Revenue Chart + Pipeline */}
        <div className="grid grid-cols-3 gap-6">
          {/* Revenue Trend */}
          <Card className="col-span-2 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold">Revenue Trend</h3>
                <p className="text-xs text-muted-foreground">Pipeline vs Closed Won (last 8 months)</p>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-primary" /> Pipeline</span>
                <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-success" /> Won</span>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueTrend}>
                  <defs>
                    <linearGradient id="gPipeline" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(24, 95%, 53%)" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="hsl(24, 95%, 53%)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gWon" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(142, 71%, 45%)" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="hsl(142, 71%, 45%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 32%, 91%)" />
                  <XAxis dataKey="month" fontSize={12} tickLine={false} axisLine={false} stroke="hsl(215, 16%, 47%)" />
                  <YAxis fontSize={12} tickLine={false} axisLine={false} stroke="hsl(215, 16%, 47%)" tickFormatter={(v) => fmt(v)} />
                  <Tooltip formatter={(v: number) => [`$${v.toLocaleString()}`, ""]} contentStyle={{ borderRadius: 8, border: "1px solid hsl(214, 32%, 91%)" }} />
                  <Area type="monotone" dataKey="revenue" stroke="hsl(24, 95%, 53%)" strokeWidth={2} fill="url(#gPipeline)" name="Pipeline" />
                  <Area type="monotone" dataKey="won" stroke="hsl(142, 71%, 45%)" strokeWidth={2} fill="url(#gWon)" name="Won" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Opportunity Pipeline */}
          <Card className="p-6">
            <h3 className="font-semibold mb-1">Opportunity Pipeline</h3>
            <p className="text-xs text-muted-foreground mb-4">By stage • Total: ${(totalPipeline / 1000).toFixed(0)}K</p>
            <div className="space-y-3">
              {pipeline.map((p) => {
                const pct = totalPipeline > 0 ? (p.value / totalPipeline) * 100 : 0;
                return (
                  <div key={p.stage} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: p.color }} />
                        {p.stage}
                      </span>
                      <span className="text-muted-foreground text-xs">{p.count} • {fmt(p.value)}</span>
                    </div>
                    <div className="h-2 rounded-full bg-secondary overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: p.color }} />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 pt-3 border-t flex justify-between text-sm">
              <span className="text-muted-foreground">Conversion Rate</span>
              <span className="font-bold text-success">24.5%</span>
            </div>
          </Card>
        </div>

        {/* Row 3: Top Deals + Lead Sources + Project Status */}
        <div className="grid grid-cols-3 gap-6">
          {/* Top Deals */}
          <Card className="col-span-1 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Top Opportunities</h3>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="space-y-3">
              {topDeals.map((deal) => (
                <div key={deal.company} className="rounded-lg border p-3 hover:border-primary/50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-lg bg-secondary flex items-center justify-center">
                        <Building2 className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{deal.company}</p>
                        <p className="text-xs text-muted-foreground">{deal.stage} • {deal.closeDate}</p>
                      </div>
                    </div>
                    <span className="font-bold text-sm text-primary">{deal.value}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={deal.probability} className="h-1.5 flex-1" />
                    <span className="text-xs text-muted-foreground">{deal.probability}%</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Lead Sources */}
          <Card className="p-6">
            <h3 className="font-semibold mb-1">Lead Sources</h3>
            <p className="text-xs text-muted-foreground mb-4">Distribution of {totalLeadSources} leads</p>
            <div className="flex justify-center mb-4">
              <div className="h-40 w-40">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={leadSources} cx="50%" cy="50%" innerRadius={40} outerRadius={70} dataKey="value" paddingAngle={3}>
                      {leadSources.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(v: number) => [v, "Leads"]} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="space-y-2">
              {leadSources.map((src) => (
                <div key={src.name} className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: src.color }} />
                    {src.name}
                  </span>
                  <span className="text-muted-foreground">{src.value} ({((src.value / totalLeadSources) * 100).toFixed(0)}%)</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Project Status */}
          <Card className="p-6">
            <h3 className="font-semibold mb-1">Project Overview</h3>
            <p className="text-xs text-muted-foreground mb-4">{totalProjects} total projects</p>
            <div className="space-y-4 mb-6">
              {projectStatus.map((ps) => (
                <div key={ps.status} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span>{ps.status}</span>
                    <span className="font-medium">{ps.count}</span>
                  </div>
                  <div className="h-2 rounded-full bg-secondary overflow-hidden">
                    <div className={cn("h-full rounded-full", ps.color)} style={{ width: `${(ps.count / totalProjects) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Upcoming Tasks mini */}
            <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              Upcoming Tasks
            </h4>
            <div className="space-y-2">
              {upcomingTasks.slice(0, 3).map((task, i) => (
                <div key={i} className="flex items-center justify-between text-sm py-1.5 border-b last:border-0">
                  <span className="truncate flex-1 mr-2">{task.title}</span>
                  <Badge variant="outline" className={cn("text-[10px] px-1.5", priorityColors[task.priority])}>
                    {task.due}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Row 4: Recent Activities */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Recent Activities</h3>
            <span className="text-xs text-muted-foreground">Latest team interactions</span>
          </div>
          <div className="grid grid-cols-5 gap-4">
            {recentActivities.map((act, i) => (
              <div key={i} className="flex gap-3 rounded-lg p-3 hover:bg-secondary/50 transition-colors">
                <div className={cn("flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg", activityColors[act.type])}>
                  <act.icon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-sm truncate">{act.title}</p>
                  <p className="text-xs text-muted-foreground truncate">{act.desc}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{act.user} • {act.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Index;
