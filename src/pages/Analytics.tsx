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
   { name: "VNPT HN", revenue: 3200, cost: 2400, profit: 800 },
   { name: "Viettel", revenue: 5800, cost: 4200, profit: 1600 },
   { name: "FPT", revenue: 2100, cost: 1800, profit: 300 },
   { name: "CMC", revenue: 4500, cost: 3200, profit: 1300 },
   { name: "MobiFone", revenue: 1800, cost: 1400, profit: 400 },
 ];
 
 const profitTrend = [
   { month: "T1", profit: 1200 },
   { month: "T2", profit: 1500 },
   { month: "T3", profit: 1100 },
   { month: "T4", profit: 1800 },
   { month: "T5", profit: 2100 },
   { month: "T6", profit: 1900 },
   { month: "T7", profit: 2400 },
   { month: "T8", profit: 2200 },
   { month: "T9", profit: 2800 },
   { month: "T10", profit: 3100 },
   { month: "T11", profit: 2900 },
   { month: "T12", profit: 3500 },
 ];
 
 const costBreakdown = [
   { name: "Nhân sự", value: 45, color: "hsl(217, 91%, 50%)" },
   { name: "Thiết bị", value: 25, color: "hsl(174, 72%, 40%)" },
   { name: "Vận hành", value: 15, color: "hsl(38, 92%, 50%)" },
   { name: "Khác", value: 15, color: "hsl(215, 16%, 47%)" },
 ];
 
 const Analytics = () => {
   return (
     <MainLayout>
       <div className="space-y-6 animate-fade-in">
         {/* Page Header */}
         <div className="flex items-center justify-between">
           <div>
             <h1 className="text-2xl font-bold">Phân tích lãi lỗ</h1>
             <p className="text-muted-foreground">
               Theo dõi hiệu suất tài chính các dự án
             </p>
           </div>
           <Select defaultValue="2024">
             <SelectTrigger className="w-32">
               <SelectValue />
             </SelectTrigger>
             <SelectContent>
               <SelectItem value="2024">Năm 2024</SelectItem>
               <SelectItem value="2023">Năm 2023</SelectItem>
               <SelectItem value="2022">Năm 2022</SelectItem>
             </SelectContent>
           </Select>
         </div>
 
         {/* Summary Cards */}
         <div className="grid gap-4 md:grid-cols-4">
           <Card className="p-5 shadow-card">
             <div className="flex items-center justify-between">
               <div>
                 <p className="text-sm text-muted-foreground">Tổng doanh thu</p>
                 <p className="text-2xl font-bold">17.4 tỷ</p>
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
                 <p className="text-sm text-muted-foreground">Tổng chi phí</p>
                 <p className="text-2xl font-bold">13.0 tỷ</p>
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
                 <p className="text-sm text-muted-foreground">Lợi nhuận ròng</p>
                 <p className="text-2xl font-bold">4.4 tỷ</p>
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
                 <p className="text-sm text-muted-foreground">Tỷ suất lợi nhuận</p>
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
             <h3 className="text-lg font-semibold mb-4">Lãi lỗ theo dự án</h3>
             <div className="h-80">
               <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={projectData}>
                   <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 32%, 91%)" />
                   <XAxis dataKey="name" stroke="hsl(215, 16%, 47%)" fontSize={12} />
                   <YAxis stroke="hsl(215, 16%, 47%)" fontSize={12} tickFormatter={(v) => `${v / 1000}K`} />
                   <Tooltip
                     contentStyle={{
                       backgroundColor: "hsl(0, 0%, 100%)",
                       border: "1px solid hsl(214, 32%, 91%)",
                       borderRadius: "8px",
                     }}
                     formatter={(value: number) => [`${value} triệu`, ""]}
                   />
                   <Bar dataKey="revenue" fill="hsl(217, 91%, 50%)" name="Doanh thu" radius={[4, 4, 0, 0]} />
                   <Bar dataKey="cost" fill="hsl(0, 84%, 60%)" name="Chi phí" radius={[4, 4, 0, 0]} />
                   <Bar dataKey="profit" fill="hsl(142, 71%, 45%)" name="Lợi nhuận" radius={[4, 4, 0, 0]} />
                 </BarChart>
               </ResponsiveContainer>
             </div>
           </Card>
 
           {/* Profit Trend */}
           <Card className="p-6 shadow-card">
             <h3 className="text-lg font-semibold mb-4">Xu hướng lợi nhuận</h3>
             <div className="h-80">
               <ResponsiveContainer width="100%" height="100%">
                 <LineChart data={profitTrend}>
                   <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 32%, 91%)" />
                   <XAxis dataKey="month" stroke="hsl(215, 16%, 47%)" fontSize={12} />
                   <YAxis stroke="hsl(215, 16%, 47%)" fontSize={12} tickFormatter={(v) => `${v}M`} />
                   <Tooltip
                     contentStyle={{
                       backgroundColor: "hsl(0, 0%, 100%)",
                       border: "1px solid hsl(214, 32%, 91%)",
                       borderRadius: "8px",
                     }}
                     formatter={(value: number) => [`${value} triệu`, "Lợi nhuận"]}
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
             <h3 className="text-lg font-semibold mb-4">Cơ cấu chi phí</h3>
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
             <h3 className="text-lg font-semibold mb-4">Dự án sinh lời nhất</h3>
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
                           Doanh thu: {project.revenue} triệu
                         </p>
                       </div>
                       <div className="text-right">
                         <p className="font-bold text-success">{project.profit} triệu</p>
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