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
import { Plus, MoreHorizontal, Eye, Send } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

const quotations = [
  {
    id: 1,
    code: "QT-2024-001",
    title: "Enterprise Network Package",
    customer: "VNPT Hanoi",
    items: 12,
    totalValue: "$320K",
    discount: "5%",
    finalValue: "$304K",
    status: "Sent",
    validUntil: "02/15/2024",
  },
  {
    id: 2,
    code: "QT-2024-002",
    title: "Data Center Premium Package",
    customer: "Viettel Business",
    items: 8,
    totalValue: "$580K",
    discount: "8%",
    finalValue: "$534K",
    status: "Pending Confirmation",
    validUntil: "02/20/2024",
  },
  {
    id: 3,
    code: "QT-2024-003",
    title: "Cloud Migration Standard",
    customer: "FPT Telecom",
    items: 5,
    totalValue: "$210K",
    discount: "3%",
    finalValue: "$204K",
    status: "Accepted",
    validUntil: "02/25/2024",
  },
  {
    id: 4,
    code: "QT-2024-004",
    title: "5G Enterprise Solution",
    customer: "CMC Telecom",
    items: 15,
    totalValue: "$450K",
    discount: "10%",
    finalValue: "$405K",
    status: "Draft",
    validUntil: "02/28/2024",
  },
  {
    id: 5,
    code: "QT-2024-005",
    title: "IoT Platform Package",
    customer: "MobiFone",
    items: 7,
    totalValue: "$180K",
    discount: "5%",
    finalValue: "$171K",
    status: "Sent",
    validUntil: "03/01/2024",
  },
];

const statusColors: Record<string, string> = {
  "Draft": "bg-secondary text-secondary-foreground",
  "Pending Confirmation": "bg-warning/10 text-warning",
  "Accepted": "bg-success/10 text-success",
  "Sent": "bg-primary/10 text-primary",
  "Rejected": "bg-destructive/10 text-destructive",
};

const filterOptions = [
  { id: "code", label: "Quotation Code" },
  { id: "title", label: "Title" },
  { id: "customer", label: "Customer" },
  { id: "value", label: "Value" },
  { id: "status", label: "Status" },
];

const savedFilters = ["Sent Quotations", "This Month's Quotations"];

const Quotations = () => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const toggleRow = (id: number) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedRows.length === quotations.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(quotations.map((q) => q.id));
    }
  };

  return (
    <MainLayout
      filterTitle="All Quotations"
      filters={filterOptions}
      savedFilters={savedFilters}
    >
      <div className="space-y-6 animate-fade-in">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">All Quotations</h1>
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
                    checked={selectedRows.length === quotations.length}
                    onCheckedChange={toggleAll}
                  />
                </TableHead>
                <TableHead>Quote ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Final Value</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Valid Until</TableHead>
                <TableHead className="w-24">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {quotations.map((quote) => (
                <TableRow
                  key={quote.id}
                  className={`hover:bg-muted/50 cursor-pointer ${
                    selectedRows.includes(quote.id) ? "bg-primary/5" : ""
                  }`}
                >
                  <TableCell>
                    <Checkbox
                      checked={selectedRows.includes(quote.id)}
                      onCheckedChange={() => toggleRow(quote.id)}
                    />
                  </TableCell>
                  <TableCell className="font-mono text-sm">{quote.code}</TableCell>
                  <TableCell className="font-medium text-primary hover:underline">
                    {quote.title}
                  </TableCell>
                  <TableCell>{quote.customer}</TableCell>
                  <TableCell>{quote.totalValue}</TableCell>
                  <TableCell className="text-success">-{quote.discount}</TableCell>
                  <TableCell className="font-semibold text-primary">
                    {quote.finalValue}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={statusColors[quote.status]}>
                      {quote.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{quote.validUntil}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Send className="h-4 w-4" />
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
              <span>Total: {quotations.length}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">1 to {quotations.length}</span>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Quotations;
