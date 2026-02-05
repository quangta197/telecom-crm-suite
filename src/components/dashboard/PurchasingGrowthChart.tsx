import { TrendingUp } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "1", value: 32 },
  { month: "2", value: 38 },
  { month: "3", value: 62 },
  { month: "4", value: 51 },
  { month: "5", value: 52 },
  { month: "6", value: 53 },
  { month: "7", value: 43 },
  { month: "8", value: 51 },
  { month: "9", value: 48 },
  { month: "10", value: 62 },
  { month: "11", value: 40 },
  { month: "12", value: 60 },
];

export function PurchasingGrowthChart() {
  return (
    <div className="rounded-xl bg-card p-6 shadow-card">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold">Purchasing Customer Growth</h3>
        </div>
        <button className="text-sm text-primary hover:underline">Details</button>
      </div>
      
      <div className="flex items-baseline gap-2 mb-4">
        <span className="text-4xl font-bold">522</span>
        <div className="flex items-center gap-1 text-green-600 text-sm">
          <TrendingUp className="h-4 w-4" />
          <span>20%</span>
        </div>
      </div>

      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="month" 
              axisLine={false} 
              tickLine={false}
              tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false}
              tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "hsl(var(--card))", 
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px"
              }}
            />
            <Bar
              dataKey="value"
              fill="hsl(var(--primary))"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
