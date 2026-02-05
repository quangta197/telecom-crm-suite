import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, RefreshCw, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StatItem {
  label: string;
  value: string;
  change?: number;
  secondaryValue?: string;
  bgColor: string;
  textColor: string;
}

const stats: StatItem[] = [
  {
    label: "Total Customers",
    value: "5,231",
    bgColor: "bg-primary",
    textColor: "text-primary-foreground",
  },
  {
    label: "New Customers",
    value: "360",
    change: 5,
    bgColor: "bg-card",
    textColor: "text-foreground",
  },
  {
    label: "Purchasing Customers",
    value: "36",
    change: 5,
    bgColor: "bg-card",
    textColor: "text-foreground",
  },
  {
    label: "First-time Buyers",
    value: "7",
    secondaryValue: "19.4%",
    change: 40,
    bgColor: "bg-amber-500",
    textColor: "text-white",
  },
  {
    label: "Repeat Customers",
    value: "29",
    secondaryValue: "80.6%",
    change: 16,
    bgColor: "bg-green-500",
    textColor: "text-white",
  },
];

export function CustomerOverview() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Customer Overview 360</h3>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Settings className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-5 gap-4">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className={cn(
              "rounded-lg p-4 shadow-card",
              stat.bgColor,
              index === 0 ? "text-white" : ""
            )}
          >
            <p className={cn(
              "text-sm mb-2",
              stat.bgColor === "bg-card" ? "text-muted-foreground" : "opacity-90"
            )}>
              {stat.label}
            </p>
            <div className="flex items-baseline gap-2">
              <span className={cn("text-3xl font-bold", stat.textColor)}>
                {stat.value}
              </span>
              {stat.secondaryValue && (
                <span className={cn("text-lg", stat.textColor, "opacity-80")}>
                  {stat.secondaryValue}
                </span>
              )}
            </div>
            {stat.change !== undefined && (
              <div className={cn(
                "flex items-center gap-1 mt-2 text-sm",
                stat.change >= 0 ? "text-green-600" : "text-red-600",
                stat.bgColor !== "bg-card" && "text-white opacity-90"
              )}>
                {stat.change >= 0 ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
                <span>{Math.abs(stat.change)}%</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
