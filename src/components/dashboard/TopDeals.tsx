import { Building2, TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const deals = [
  {
    id: 1,
    company: "VNPT Hanoi",
    value: "$320K",
    stage: "Negotiation",
    probability: 75,
    closeDate: "01/15/2024",
  },
  {
    id: 2,
    company: "Viettel Business",
    value: "$580K",
    stage: "Proposal",
    probability: 60,
    closeDate: "01/22/2024",
  },
  {
    id: 3,
    company: "FPT Telecom",
    value: "$210K",
    stage: "Qualification",
    probability: 45,
    closeDate: "01/30/2024",
  },
  {
    id: 4,
    company: "CMC Telecom",
    value: "$450K",
    stage: "Negotiation",
    probability: 80,
    closeDate: "02/10/2024",
  },
];

export function TopDeals() {
  return (
    <div className="rounded-xl bg-card p-6 shadow-card">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Top Opportunities</h3>
          <p className="text-sm text-muted-foreground">Top deals by value</p>
        </div>
        <TrendingUp className="h-5 w-5 text-success" />
      </div>
      <div className="space-y-4">
        {deals.map((deal) => (
          <div
            key={deal.id}
            className="rounded-lg border border-border p-4 transition-all hover:border-primary hover:shadow-md"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                  <Building2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">{deal.company}</p>
                  <p className="text-sm text-muted-foreground">{deal.stage}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-primary">{deal.value}</p>
                <p className="text-xs text-muted-foreground">
                  Expected: {deal.closeDate}
                </p>
              </div>
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Win Probability</span>
                <span className="font-medium">{deal.probability}%</span>
              </div>
              <Progress value={deal.probability} className="h-2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
