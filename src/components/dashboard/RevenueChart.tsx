 import {
   AreaChart,
   Area,
   XAxis,
   YAxis,
   CartesianGrid,
   Tooltip,
   ResponsiveContainer,
 } from "recharts";
 
 const data = [
   { month: "T1", revenue: 2400, target: 2000 },
   { month: "T2", revenue: 1398, target: 2100 },
   { month: "T3", revenue: 9800, target: 2200 },
   { month: "T4", revenue: 3908, target: 2300 },
   { month: "T5", revenue: 4800, target: 2400 },
   { month: "T6", revenue: 3800, target: 2500 },
   { month: "T7", revenue: 4300, target: 2600 },
   { month: "T8", revenue: 5300, target: 2700 },
   { month: "T9", revenue: 4900, target: 2800 },
   { month: "T10", revenue: 6200, target: 2900 },
   { month: "T11", revenue: 7100, target: 3000 },
   { month: "T12", revenue: 8500, target: 3100 },
 ];
 
 export function RevenueChart() {
   return (
     <div className="rounded-xl bg-card p-6 shadow-card">
       <div className="mb-6">
         <h3 className="text-lg font-semibold">Doanh thu theo tháng</h3>
         <p className="text-sm text-muted-foreground">
           So sánh doanh thu thực tế và mục tiêu năm 2024
         </p>
       </div>
       <div className="h-80">
         <ResponsiveContainer width="100%" height="100%">
           <AreaChart data={data}>
 
             <defs>
               <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                 <stop offset="5%" stopColor="hsl(24, 95%, 53%)" stopOpacity={0.3} />
                 <stop offset="95%" stopColor="hsl(24, 95%, 53%)" stopOpacity={0} />
               </linearGradient>
               <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
                 <stop offset="5%" stopColor="hsl(32, 98%, 50%)" stopOpacity={0.3} />
                 <stop offset="95%" stopColor="hsl(32, 98%, 50%)" stopOpacity={0} />
               </linearGradient>
             </defs>
             <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 32%, 91%)" />
             <XAxis
               dataKey="month"
               stroke="hsl(215, 16%, 47%)"
               fontSize={12}
               tickLine={false}
               axisLine={false}
             />
             <YAxis
               stroke="hsl(215, 16%, 47%)"
               fontSize={12}
               tickLine={false}
               axisLine={false}
               tickFormatter={(value) => `${value / 1000}K`}
             />
             <Tooltip
               contentStyle={{
                 backgroundColor: "hsl(0, 0%, 100%)",
                 border: "1px solid hsl(214, 32%, 91%)",
                 borderRadius: "8px",
                 boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
               }}
               formatter={(value: number) => [`${value.toLocaleString()} triệu`, ""]}
             />
 
             <Area
               type="monotone"
               dataKey="revenue"
               stroke="hsl(24, 95%, 53%)"
               strokeWidth={2}
               fillOpacity={1}
               fill="url(#colorRevenue)"
               name="Doanh thu"
             />
             <Area
               type="monotone"
               dataKey="target"
               stroke="hsl(32, 98%, 50%)"
               strokeWidth={2}
               fillOpacity={1}
               fill="url(#colorTarget)"
               name="Mục tiêu"
             />
           </AreaChart>
         </ResponsiveContainer>
       </div>
       <div className="mt-4 flex items-center justify-center gap-6">
         <div className="flex items-center gap-2">
           <div className="h-3 w-3 rounded-full bg-primary" />
           <span className="text-sm text-muted-foreground">Doanh thu</span>
         </div>
         <div className="flex items-center gap-2">
           <div className="h-3 w-3 rounded-full bg-accent" />
           <span className="text-sm text-muted-foreground">Mục tiêu</span>
         </div>
       </div>
     </div>
   );
 }