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

interface Project {
  id: number;
  code: string;
  title: string;
  customer: string;
  value: string;
  status: string;
  createdAt: string;
  validUntil: string;
}

interface ProjectTableViewProps {
  projects: Project[];
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

export function ProjectTableView({
  projects,
  selectedRows,
  onRowClick,
  onToggleRow,
  onToggleAll,
}: ProjectTableViewProps) {
  return (
    <div className="rounded-lg bg-card shadow-sm overflow-hidden border">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="w-12">
              <Checkbox
                checked={selectedRows.length === projects.length}
                onCheckedChange={onToggleAll}
              />
            </TableHead>
            <TableHead>Project ID</TableHead>
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
          {projects.map((project) => (
            <TableRow
              key={project.id}
              className={`hover:bg-muted/50 cursor-pointer ${
                selectedRows.includes(project.id) ? "bg-primary/5" : ""
              }`}
              onClick={() => onRowClick(project.id)}
            >
              <TableCell onClick={(e) => e.stopPropagation()}>
                <Checkbox
                  checked={selectedRows.includes(project.id)}
                  onCheckedChange={() => onToggleRow(project.id)}
                />
              </TableCell>
              <TableCell className="font-mono text-sm">{project.code}</TableCell>
              <TableCell className="font-medium text-primary hover:underline">
                {project.title}
              </TableCell>
              <TableCell>{project.customer}</TableCell>
              <TableCell className="font-semibold text-primary">
                {project.value}
              </TableCell>
              <TableCell>
                <Badge variant="secondary" className={statusColors[project.status]}>
                  {project.status}
                </Badge>
              </TableCell>
              <TableCell>{project.createdAt}</TableCell>
              <TableCell>{project.validUntil}</TableCell>
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
          <span>Total: {projects.length}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">1 to {projects.length}</span>
        </div>
      </div>
    </div>
  );
}
