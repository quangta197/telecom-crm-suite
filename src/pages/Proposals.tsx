import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, MoreHorizontal, Eye, Download } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

const proposals = [
  {
    id: 1,
    code: "PR-2024-001",
    title: "VNPT Network Infrastructure Solution",
    customer: "VNPT Hanoi",
    value: "$320K",
    status: "Sent",
    createdAt: "01/12/2024",
    validUntil: "02/12/2024",
  },
  {
    id: 2,
    code: "PR-2024-002",
    title: "Viettel Data Center Solution",
    customer: "Viettel Business",
    value: "$580K",
    status: "Pending Approval",
    createdAt: "01/10/2024",
    validUntil: "02/10/2024",
  },
  {
    id: 3,
    code: "PR-2024-003",
    title: "Cloud Migration Package",
    customer: "FPT Telecom",
    value: "$210K",
    status: "Approved",
    createdAt: "01/08/2024",
    validUntil: "02/08/2024",
  },
  {
    id: 4,
    code: "PR-2024-004",
    title: "5G Enterprise Solution",
    customer: "CMC Telecom",
    value: "$450K",
    status: "Sent",
    createdAt: "01/05/2024",
    validUntil: "02/05/2024",
  },
  {
    id: 5,
    code: "PR-2024-005",
    title: "IoT Platform Integration",
    customer: "MobiFone",
    value: "$180K",
    status: "Draft",
    createdAt: "01/03/2024",
    validUntil: "02/03/2024",
  },
];

const statusColors: Record<string, string> = {
  "Draft": "bg-secondary text-secondary-foreground",
  "Pending Approval": "bg-warning/10 text-warning",
  "Approved": "bg-success/10 text-success",
  "Sent": "bg-primary/10 text-primary",
  "Rejected": "bg-destructive/10 text-destructive",
};

const filterOptions = [
  { id: "code", label: "Proposal Code" },
  { id: "title", label: "Title" },
  { id: "customer", label: "Customer" },
  { id: "value", label: "Value" },
  { id: "status", label: "Status" },
];

const savedFilters = ["Sent Proposals", "This Month's Proposals"];

const Proposals = () => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const toggleRow = (id: number) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedRows.length === proposals.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(proposals.map((p) => p.id));
    }
  };

  return (
    <MainLayout
      filterTitle="All Proposals"
      filters={filterOptions}
      savedFilters={savedFilters}
    >
      <div className="space-y-6 animate-fade-in">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">All Proposals</h1>
          <Button className="gradient-primary">
            <Plus className="mr-2 h-4 w-4" />
            Add
          </Button>
        </div>

        {/* Table */}
        <div className="rounded-lg bg-card shadow-sm overflow-hidden border">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedRows.length === proposals.length}
                    onCheckedChange={toggleAll}
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
                >
                  <TableCell>
                    <Checkbox
                      checked={selectedRows.includes(proposal.id)}
                      onCheckedChange={() => toggleRow(proposal.id)}
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

          {/* Footer */}
          <div className="flex items-center justify-between px-4 py-3 border-t bg-muted/30">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Total: {proposals.length}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">1 to {proposals.length}</span>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Proposals;
