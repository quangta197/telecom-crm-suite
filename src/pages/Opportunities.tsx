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
import { Plus, MoreHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";

const opportunities = [
  {
    id: 1,
    code: "OP00001",
    title: "VNPT Network Infrastructure",
    company: "VNPT Hanoi",
    value: "$320K",
    stage: "Negotiation",
    probability: 75,
    closeDate: "01/15/2024",
    owner: "John Smith",
  },
  {
    id: 2,
    code: "OP00002",
    title: "Viettel Data Center",
    company: "Viettel Business",
    value: "$580K",
    stage: "Proposal",
    probability: 60,
    closeDate: "01/22/2024",
    owner: "Sarah Johnson",
  },
  {
    id: 3,
    code: "OP00003",
    title: "FPT Cloud Migration",
    company: "FPT Telecom",
    value: "$210K",
    stage: "Qualification",
    probability: 45,
    closeDate: "01/30/2024",
    owner: "Mike Wilson",
  },
  {
    id: 4,
    code: "OP00004",
    title: "CMC 5G Enterprise",
    company: "CMC Telecom",
    value: "$450K",
    stage: "Negotiation",
    probability: 80,
    closeDate: "02/10/2024",
    owner: "John Smith",
  },
  {
    id: 5,
    code: "OP00005",
    title: "MobiFone IoT Platform",
    company: "MobiFone",
    value: "$180K",
    stage: "Discovery",
    probability: 30,
    closeDate: "02/28/2024",
    owner: "Emily Davis",
  },
  {
    id: 6,
    code: "OP00006",
    title: "BIDV Security Solution",
    company: "BIDV Securities",
    value: "$250K",
    stage: "Closed Won",
    probability: 95,
    closeDate: "01/05/2024",
    owner: "Sarah Johnson",
  },
];

const stageColors: Record<string, string> = {
  "Discovery": "bg-info/10 text-info",
  "Qualification": "bg-primary/10 text-primary",
  "Proposal": "bg-accent/10 text-accent",
  "Negotiation": "bg-warning/10 text-warning",
  "Closed Won": "bg-success/10 text-success",
};

const filterOptions = [
  { id: "code", label: "Opportunity Code" },
  { id: "title", label: "Opportunity Name" },
  { id: "company", label: "Customer" },
  { id: "value", label: "Value" },
  { id: "stage", label: "Stage" },
  { id: "owner", label: "Owner" },
];

const savedFilters = ["In Negotiation", "This Month's Opportunities"];

const Opportunities = () => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const toggleRow = (id: number) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedRows.length === opportunities.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(opportunities.map((o) => o.id));
    }
  };

  return (
    <MainLayout
      filterTitle="All Opportunities"
      filters={filterOptions}
      savedFilters={savedFilters}
    >
      <div className="space-y-6 animate-fade-in">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">All Opportunities</h1>
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
                    checked={selectedRows.length === opportunities.length}
                    onCheckedChange={toggleAll}
                  />
                </TableHead>
                <TableHead>Opp ID</TableHead>
                <TableHead>Opportunity Name</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Stage</TableHead>
                <TableHead>Probability</TableHead>
                <TableHead>Close Date</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {opportunities.map((opp) => (
                <TableRow
                  key={opp.id}
                  className={`hover:bg-muted/50 cursor-pointer ${
                    selectedRows.includes(opp.id) ? "bg-primary/5" : ""
                  }`}
                >
                  <TableCell>
                    <Checkbox
                      checked={selectedRows.includes(opp.id)}
                      onCheckedChange={() => toggleRow(opp.id)}
                    />
                  </TableCell>
                  <TableCell className="font-mono text-sm">{opp.code}</TableCell>
                  <TableCell className="font-medium text-primary hover:underline">
                    {opp.title}
                  </TableCell>
                  <TableCell>{opp.company}</TableCell>
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

          {/* Footer */}
          <div className="flex items-center justify-between px-4 py-3 border-t bg-muted/30">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Total: {opportunities.length}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">1 to {opportunities.length}</span>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Opportunities;
