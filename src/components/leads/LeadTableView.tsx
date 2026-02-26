import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreHorizontal, Phone, Mail } from "lucide-react";
import { SortableTableHead } from "@/components/ui/sortable-table-head";
import { useTableSort } from "@/hooks/use-table-sort";

interface Lead {
  id: number;
  code: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  source: string;
  score: number;
  status: string;
  createdAt: string;
}

interface LeadTableViewProps {
  leads: Lead[];
  selectedRows: number[];
  onRowClick: (id: number) => void;
  onToggleRow: (id: number) => void;
  onToggleAll: () => void;
}

const statusColors = {
  Hot: "bg-destructive/10 text-destructive",
  Warm: "bg-warning/10 text-warning",
  Cold: "bg-info/10 text-info",
};

const columns: { key: keyof Lead; label: string; className?: string }[] = [
  { key: "code", label: "Lead ID" },
  { key: "name", label: "Lead Name" },
  { key: "company", label: "Company" },
  { key: "phone", label: "Phone" },
  { key: "email", label: "Email" },
  { key: "source", label: "Source" },
  { key: "status", label: "Status" },
  { key: "score", label: "Score", className: "text-right" },
];

export function LeadTableView({
  leads,
  selectedRows,
  onRowClick,
  onToggleRow,
  onToggleAll,
}: LeadTableViewProps) {
  const { sorted, sortKey, sortDir, handleSort } = useTableSort(leads);

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 50) return "text-warning";
    return "text-destructive";
  };

  return (
    <div className="rounded-lg bg-card shadow-sm overflow-hidden border">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="w-12">
              <Checkbox
                checked={selectedRows.length === leads.length}
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
                onSort={(k) => handleSort(k as keyof Lead)}
                className={col.className}
              />
            ))}
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sorted.map((lead) => (
            <TableRow
              key={lead.id}
              className={`hover:bg-muted/50 cursor-pointer ${
                selectedRows.includes(lead.id) ? "bg-primary/5" : ""
              }`}
              onClick={() => onRowClick(lead.id)}
            >
              <TableCell onClick={(e) => e.stopPropagation()}>
                <Checkbox
                  checked={selectedRows.includes(lead.id)}
                  onCheckedChange={() => onToggleRow(lead.id)}
                />
              </TableCell>
              <TableCell className="font-mono text-sm">{lead.code}</TableCell>
              <TableCell className="font-medium text-primary hover:underline">
                {lead.name}
              </TableCell>
              <TableCell>{lead.company}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 text-success" />
                  <span>{lead.phone}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 text-primary" />
                  <span className="text-sm">{lead.email}</span>
                </div>
              </TableCell>
              <TableCell>{lead.source}</TableCell>
              <TableCell>
                <Badge
                  variant="secondary"
                  className={statusColors[lead.status as keyof typeof statusColors]}
                >
                  {lead.status}
                </Badge>
              </TableCell>
              <TableCell
                className={`text-right font-semibold ${getScoreColor(lead.score)}`}
              >
                {lead.score}
              </TableCell>
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
        <span className="text-sm text-muted-foreground">Total: {leads.length}</span>
        <span className="text-sm text-muted-foreground">1 to {leads.length}</span>
      </div>
    </div>
  );
}
