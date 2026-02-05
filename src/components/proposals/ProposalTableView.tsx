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
import { Eye, Download, MoreHorizontal } from "lucide-react";

interface Proposal {
  id: number;
  code: string;
  title: string;
  customer: string;
  value: string;
  status: string;
  createdAt: string;
  validUntil: string;
}

interface ProposalTableViewProps {
  proposals: Proposal[];
  selectedRows: number[];
  onRowClick: (id: number) => void;
  onToggleRow: (id: number) => void;
  onToggleAll: () => void;
}

const statusColors: Record<string, string> = {
  Draft: "bg-secondary text-secondary-foreground",
  "Pending Approval": "bg-warning/10 text-warning",
  Approved: "bg-success/10 text-success",
  Sent: "bg-primary/10 text-primary",
  Rejected: "bg-destructive/10 text-destructive",
};

export function ProposalTableView({
  proposals,
  selectedRows,
  onRowClick,
  onToggleRow,
  onToggleAll,
}: ProposalTableViewProps) {
  return (
    <div className="rounded-lg bg-card shadow-sm overflow-hidden border">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="w-12">
              <Checkbox
                checked={selectedRows.length === proposals.length}
                onCheckedChange={onToggleAll}
              />
            </TableHead>
            <TableHead>Proposal ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Value</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Valid Until</TableHead>
            <TableHead className="w-24">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {proposals.map((proposal) => (
            <TableRow
              key={proposal.id}
              className={`hover:bg-muted/50 cursor-pointer ${
                selectedRows.includes(proposal.id) ? "bg-primary/5" : ""
              }`}
              onClick={() => onRowClick(proposal.id)}
            >
              <TableCell onClick={(e) => e.stopPropagation()}>
                <Checkbox
                  checked={selectedRows.includes(proposal.id)}
                  onCheckedChange={() => onToggleRow(proposal.id)}
                />
              </TableCell>
              <TableCell className="font-mono text-sm">{proposal.code}</TableCell>
              <TableCell className="font-medium text-primary hover:underline">
                {proposal.title}
              </TableCell>
              <TableCell>{proposal.customer}</TableCell>
              <TableCell className="font-semibold text-primary">
                {proposal.value}
              </TableCell>
              <TableCell>
                <Badge variant="secondary" className={statusColors[proposal.status]}>
                  {proposal.status}
                </Badge>
              </TableCell>
              <TableCell>{proposal.createdAt}</TableCell>
              <TableCell>{proposal.validUntil}</TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between px-4 py-3 border-t bg-muted/30">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Total: {proposals.length}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">1 to {proposals.length}</span>
        </div>
      </div>
    </div>
  );
}
