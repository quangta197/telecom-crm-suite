import { TrendingUp } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { name: "Wholesale", existing: 90, new: 0 },
  { name: "Retail", existing: 60, new: 20 },
  { name: "Agent", existing: 40, new: 20 },
  { name: "CTV", existing: 30, new: 20 },
  { name: "Walk-in", existing: 20, new: 20 },
];

export function CustomersByType() {
  return (
    <div className="rounded-xl bg-card p-6 shadow-card">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold">Customers by Type</h3>
        </div>
        <button className="text-sm text-primary hover:underline">Details</button>
      </div>
      
      <div className="flex items-baseline gap-4 mb-4">
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold">320</span>
          <div className="flex items-center gap-1 text-green-600 text-sm">
            <TrendingUp className="h-4 w-4" />
            <span>20%</span>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded-full bg-primary" />
            <span className="text-primary font-medium">220</span>
            <span className="text-muted-foreground">Existing</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded-full bg-amber-500" />
            <span className="text-amber-500 font-medium">100</span>
            <span className="text-muted-foreground">New</span>
          </div>
        </div>
      </div>

      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ left: 80 }}>
            <XAxis 
              type="number" 
              axisLine={false} 
              tickLine={false}
              tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
              domain={[0, 100]}
            />
            <YAxis 
              type="category" 
              dataKey="name" 
              axisLine={false} 
              tickLine={false}
              tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
              width={80}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "hsl(var(--card))", 
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px"
              }}
            />
            <Bar dataKey="existing" stackId="a" fill="hsl(var(--primary))" radius={[0, 0, 0, 0]} />
            <Bar dataKey="new" stackId="a" fill="#f59e0b" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
