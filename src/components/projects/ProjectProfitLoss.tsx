import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { TrendingUp, TrendingDown, DollarSign, Percent } from "lucide-react";
import { cn } from "@/lib/utils";

interface PnLLineItem {
  id: number;
  category: string;
  description: string;
  amount: number;
  type: "revenue" | "cost";
}

const pnlData: PnLLineItem[] = [
  // Revenue
  { id: 1, category: "Hardware Sales", description: "Network Switches (48-port) × 20", amount: 50000, type: "revenue" },
  { id: 2, category: "Hardware Sales", description: "Fiber Optic Cables (1000m) × 50", amount: 10000, type: "revenue" },
  { id: 3, category: "Hardware Sales", description: "Network Routers (Enterprise) × 5", amount: 75000, type: "revenue" },
  { id: 4, category: "Hardware Sales", description: "Firewall Appliances × 2", amount: 50000, type: "revenue" },
  { id: 5, category: "Services", description: "Implementation Services", amount: 85000, type: "revenue" },
  { id: 6, category: "Services", description: "Training & Support Package", amount: 50000, type: "revenue" },
  // Costs
  { id: 7, category: "Hardware Cost", description: "Network Switches procurement", amount: 35000, type: "cost" },
  { id: 8, category: "Hardware Cost", description: "Fiber Optic Cables procurement", amount: 6000, type: "cost" },
  { id: 9, category: "Hardware Cost", description: "Network Routers procurement", amount: 52500, type: "cost" },
  { id: 10, category: "Hardware Cost", description: "Firewall Appliances procurement", amount: 37500, type: "cost" },
  { id: 11, category: "Labor Cost", description: "Implementation team (4 engineers × 60 days)", amount: 48000, type: "cost" },
  { id: 12, category: "Labor Cost", description: "Training staff", amount: 12000, type: "cost" },
  { id: 13, category: "Overhead", description: "Travel & logistics", amount: 8500, type: "cost" },
  { id: 14, category: "Overhead", description: "Project management", amount: 15000, type: "cost" },
  { id: 15, category: "Overhead", description: "Warranty reserve (2-year)", amount: 9600, type: "cost" },
];

const fmt = (n: number) => `$${n.toLocaleString()}`;

export const ProjectProfitLoss = () => {
  const revenueItems = pnlData.filter((i) => i.type === "revenue");
  const costItems = pnlData.filter((i) => i.type === "cost");
  const totalRevenue = revenueItems.reduce((s, i) => s + i.amount, 0);
  const totalCost = costItems.reduce((s, i) => s + i.amount, 0);
  const grossProfit = totalRevenue - totalCost;
  const margin = totalRevenue > 0 ? (grossProfit / totalRevenue) * 100 : 0;

  const summaryCards = [
    { label: "Total Revenue", value: fmt(totalRevenue), icon: DollarSign, color: "text-primary" },
    { label: "Total Costs", value: fmt(totalCost), icon: TrendingDown, color: "text-destructive" },
    { label: "Gross Profit", value: fmt(grossProfit), icon: TrendingUp, color: grossProfit >= 0 ? "text-success" : "text-destructive" },
    { label: "Margin", value: `${margin.toFixed(1)}%`, icon: Percent, color: margin >= 20 ? "text-success" : margin >= 10 ? "text-warning" : "text-destructive" },
  ];

  // Group costs by category
  const costByCategory = costItems.reduce<Record<string, number>>((acc, i) => {
    acc[i.category] = (acc[i.category] || 0) + i.amount;
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4">
        {summaryCards.map((c) => (
          <Card key={c.label} className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                <c.icon className={cn("h-5 w-5", c.color)} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{c.label}</p>
                <p className={cn("text-lg font-bold", c.color)}>{c.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Revenue Section */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-sm flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            Revenue Breakdown
          </h3>
          <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
            {fmt(totalRevenue)}
          </Badge>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-10">#</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {revenueItems.map((item, idx) => (
              <TableRow key={item.id}>
                <TableCell className="text-muted-foreground">{idx + 1}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-xs">{item.category}</Badge>
                </TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell className="text-right font-medium">{fmt(item.amount)}</TableCell>
              </TableRow>
            ))}
            <TableRow className="bg-muted/30 font-semibold">
              <TableCell colSpan={3} className="text-right">Total Revenue</TableCell>
              <TableCell className="text-right text-primary">{fmt(totalRevenue)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>

      {/* Costs Section */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-sm flex items-center gap-2">
            <TrendingDown className="h-4 w-4 text-destructive" />
            Cost Breakdown
          </h3>
          <Badge variant="outline" className="bg-destructive/5 text-destructive border-destructive/20">
            {fmt(totalCost)}
          </Badge>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-10">#</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {costItems.map((item, idx) => (
              <TableRow key={item.id}>
                <TableCell className="text-muted-foreground">{idx + 1}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-xs">{item.category}</Badge>
                </TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell className="text-right font-medium">{fmt(item.amount)}</TableCell>
              </TableRow>
            ))}
            <TableRow className="bg-muted/30 font-semibold">
              <TableCell colSpan={3} className="text-right">Total Costs</TableCell>
              <TableCell className="text-right text-destructive">{fmt(totalCost)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>

      {/* Cost Distribution Summary */}
      <Card className="p-6">
        <h3 className="font-semibold text-sm mb-4">Cost Distribution by Category</h3>
        <div className="space-y-3">
          {Object.entries(costByCategory)
            .sort(([, a], [, b]) => b - a)
            .map(([cat, amount]) => {
              const pct = totalCost > 0 ? (amount / totalCost) * 100 : 0;
              return (
                <div key={cat} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span>{cat}</span>
                    <span className="text-muted-foreground">{fmt(amount)} ({pct.toFixed(1)}%)</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary/70 transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
        </div>

        {/* Final P&L Summary */}
        <div className="mt-6 pt-4 border-t space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Total Revenue</span>
            <span className="font-medium">{fmt(totalRevenue)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Total Costs</span>
            <span className="font-medium text-destructive">({fmt(totalCost)})</span>
          </div>
          <div className="flex justify-between text-sm pt-2 border-t font-bold">
            <span>Net Profit</span>
            <span className={grossProfit >= 0 ? "text-success" : "text-destructive"}>
              {fmt(grossProfit)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Profit Margin</span>
            <Badge className={cn(
              "text-xs",
              margin >= 20 ? "bg-success/10 text-success" : margin >= 10 ? "bg-warning/10 text-warning" : "bg-destructive/10 text-destructive"
            )}>
              {margin.toFixed(1)}%
            </Badge>
          </div>
        </div>
      </Card>
    </div>
  );
};
