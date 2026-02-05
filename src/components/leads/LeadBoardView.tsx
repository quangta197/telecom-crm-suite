import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Phone } from "lucide-react";

interface Lead {
  id: number;
  code: string;
  name: string;
  company: string;
  phone: string;
  source: string;
  score: number;
  status: string;
  createdAt: string;
}

interface LeadBoardViewProps {
  leads: Lead[];
  onLeadClick: (id: number) => void;
}

const columns = [
  { id: "Hot", title: "Hot", color: "bg-destructive/10 border-destructive/30" },
  { id: "Warm", title: "Warm", color: "bg-warning/10 border-warning/30" },
  { id: "Cold", title: "Cold", color: "bg-info/10 border-info/30" },
];

const statusColors = {
  Hot: "bg-destructive/10 text-destructive",
  Warm: "bg-warning/10 text-warning",
  Cold: "bg-info/10 text-info",
};

export function LeadBoardView({ leads, onLeadClick }: LeadBoardViewProps) {
  const getLeadsByStatus = (status: string) =>
    leads.filter((lead) => lead.status === status);

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 50) return "text-warning";
    return "text-destructive";
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {columns.map((column) => {
        const columnLeads = getLeadsByStatus(column.id);
        return (
          <div
            key={column.id}
            className={`rounded-lg border-2 ${column.color} p-4 min-h-[500px]`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">{column.title}</h3>
              <Badge variant="secondary" className="rounded-full">
                {columnLeads.length}
              </Badge>
            </div>

            <div className="space-y-3">
              {columnLeads.map((lead) => (
                <Card
                  key={lead.id}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => onLeadClick(lead.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-medium text-primary hover:underline">
                          {lead.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {lead.company}
                        </p>
                      </div>
                      <span
                        className={`text-sm font-semibold ${getScoreColor(
                          lead.score
                        )}`}
                      >
                        {lead.score}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Phone className="h-3.5 w-3.5 text-success" />
                      <span>{lead.phone}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {lead.source}
                      </span>
                      <Badge
                        variant="secondary"
                        className={`text-xs ${
                          statusColors[lead.status as keyof typeof statusColors]
                        }`}
                      >
                        {lead.status}
                      </Badge>
                    </div>

                    <p className="text-xs text-muted-foreground mt-2 font-mono">
                      {lead.code}
                    </p>
                  </CardContent>
                </Card>
              ))}

              {columnLeads.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-8">
                  No leads
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
