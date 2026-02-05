import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Calendar, User } from "lucide-react";

interface Opportunity {
  id: number;
  code: string;
  title: string;
  company: string;
  value: string;
  stage: string;
  probability: number;
  closeDate: string;
  owner: string;
}

interface OpportunityBoardViewProps {
  opportunities: Opportunity[];
  onOpportunityClick: (id: number) => void;
}

const columns = [
  { id: "Discovery", title: "Discovery", color: "bg-info/10 border-info/30" },
  { id: "Qualification", title: "Qualification", color: "bg-primary/10 border-primary/30" },
  { id: "Proposal", title: "Proposal", color: "bg-accent/10 border-accent/30" },
  { id: "Negotiation", title: "Negotiation", color: "bg-warning/10 border-warning/30" },
  { id: "Closed Won", title: "Closed Won", color: "bg-success/10 border-success/30" },
];

const stageColors: Record<string, string> = {
  Discovery: "bg-info/10 text-info",
  Qualification: "bg-primary/10 text-primary",
  Proposal: "bg-accent/10 text-accent",
  Negotiation: "bg-warning/10 text-warning",
  "Closed Won": "bg-success/10 text-success",
};

export function OpportunityBoardView({
  opportunities,
  onOpportunityClick,
}: OpportunityBoardViewProps) {
  const getOpportunitiesByStage = (stage: string) =>
    opportunities.filter((opp) => opp.stage === stage);

  const getTotalValue = (opps: Opportunity[]) => {
    const total = opps.reduce((sum, opp) => {
      const value = parseFloat(opp.value.replace(/[$K]/g, "")) * 1000;
      return sum + value;
    }, 0);
    return `$${(total / 1000).toFixed(0)}K`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {columns.map((column) => {
        const columnOpps = getOpportunitiesByStage(column.id);
        return (
          <div
            key={column.id}
            className={`rounded-lg border-2 ${column.color} p-4 min-h-[500px]`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-sm">{column.title}</h3>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="rounded-full text-xs">
                  {columnOpps.length}
                </Badge>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mb-4">
              Total: {getTotalValue(columnOpps)}
            </p>

            <div className="space-y-3">
              {columnOpps.map((opp) => (
                <Card
                  key={opp.id}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => onOpportunityClick(opp.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-primary hover:underline text-sm truncate">
                          {opp.title}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {opp.company}
                        </p>
                      </div>
                    </div>

                    <div className="text-lg font-bold text-primary mb-3">
                      {opp.value}
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <Progress value={opp.probability} className="h-2 flex-1" />
                      <span className="text-xs font-medium">{opp.probability}%</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                      <Calendar className="h-3 w-3" />
                      <span>{opp.closeDate}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <User className="h-3 w-3" />
                        <span>{opp.owner}</span>
                      </div>
                      <Badge
                        variant="secondary"
                        className={`text-xs ${stageColors[opp.stage]}`}
                      >
                        {opp.stage}
                      </Badge>
                    </div>

                    <p className="text-xs text-muted-foreground mt-2 font-mono">
                      {opp.code}
                    </p>
                  </CardContent>
                </Card>
              ))}

              {columnOpps.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-8">
                  No opportunities
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
