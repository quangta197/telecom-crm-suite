import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreHorizontal } from "lucide-react";
import { SortableTableHead } from "@/components/ui/sortable-table-head";
import { useTableSort } from "@/hooks/use-table-sort";

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
  leadId?: number | null;
  leadCode?: string | null;
}

interface OpportunityTableViewProps {
  opportunities: Opportunity[];
  selectedRows: number[];
  onRowClick: (id: number) => void;
  onToggleRow: (id: number) => void;
  onToggleAll: () => void;
}

const stageColors: Record<string, string> = {
  Discovery: "bg-info/10 text-info",
  Qualification: "bg-primary/10 text-primary",
  Proposal: "bg-accent/10 text-accent",
  Negotiation: "bg-warning/10 text-warning",
  "Closed Won": "bg-success/10 text-success",
};

const columns: { key: keyof Opportunity; label: string }[] = [
  { key: "code", label: "Opp ID" },
  { key: "title", label: "Opportunity Name" },
  { key: "company", label: "Customer" },
  { key: "leadCode", label: "Lead" },
  { key: "value", label: "Value" },
  { key: "stage", label: "Stage" },
  { key: "probability", label: "Probability" },
  { key: "closeDate", label: "Close Date" },
  { key: "owner", label: "Owner" },
];

export function OpportunityTableView({
  opportunities,
  selectedRows,
  onRowClick,
  onToggleRow,
  onToggleAll,
}: OpportunityTableViewProps) {
  const navigate = useNavigate();
  const { sorted, sortKey, sortDir, handleSort } = useTableSort(opportunities);

  return (
    <div className="rounded-lg bg-card shadow-sm overflow-hidden border">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="w-12">
              <Checkbox
                checked={selectedRows.length === opportunities.length}
                onCheckedChange={onToggleAll}
              />
            </TableHead>
            {columns.map((col) => (
              <SortableTableHead
                key={col.key}
                label={col.label}
                sortKey={col.key}
                currentSortKey={sortKey as string | null}
                currentSortDir={sortDir}
                onSort={(k) => handleSort(k as keyof Opportunity)}
              />
            ))}
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sorted.map((opp) => (
            <TableRow
              key={opp.id}
              className={`hover:bg-muted/50 cursor-pointer ${
                selectedRows.includes(opp.id) ? "bg-primary/5" : ""
              }`}
              onClick={() => onRowClick(opp.id)}
            >
              <TableCell onClick={(e) => e.stopPropagation()}>
                <Checkbox
                  checked={selectedRows.includes(opp.id)}
                  onCheckedChange={() => onToggleRow(opp.id)}
                />
              </TableCell>
              <TableCell className="font-mono text-sm">{opp.code}</TableCell>
              <TableCell className="font-medium text-primary hover:underline">
                {opp.title}
              </TableCell>
              <TableCell>{opp.company}</TableCell>
              <TableCell>
                {opp.leadId && opp.leadCode ? (
                  <span
                    className="text-primary font-mono text-xs hover:underline cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/leads/${opp.leadId}`);
                    }}
                  >
                    {opp.leadCode}
                  </span>
                ) : (
                  <span className="text-muted-foreground text-xs">—</span>
                )}
              </TableCell>
              <TableCell className="font-semibold text-primary">
                {opp.value}
              </TableCell>
              <TableCell>
                <Badge variant="secondary" className={stageColors[opp.stage]}>
                  {opp.stage}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Progress value={opp.probability} className="h-2 w-16" />
                  <span className="text-sm">{opp.probability}%</span>
                </div>
              </TableCell>
              <TableCell>{opp.closeDate}</TableCell>
              <TableCell>{opp.owner}</TableCell>
              <TableCell>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between px-4 py-3 border-t bg-muted/30">
        <span className="text-sm text-muted-foreground">Total: {opportunities.length}</span>
        <span className="text-sm text-muted-foreground">1 to {opportunities.length}</span>
      </div>
    </div>
  );
}
