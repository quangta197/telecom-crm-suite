import { useState } from "react";
import { Card } from "@/components/ui/card";
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
import { Plus, Eye, FileText } from "lucide-react";

interface Quotation {
  id: number;
  code: string;
  title: string;
  totalValue: string;
  discount: string;
  finalValue: string;
  status: string;
  createdDate: string;
  validUntil: string;
}

const initialQuotations: Quotation[] = [
  { id: 1, code: "QT-2024-001", title: "Enterprise Network Package", totalValue: "5,000,000", discount: "5%", finalValue: "4,750,000", status: "Sent", createdDate: "01/06/2024", validUntil: "02/15/2024" },
  { id: 2, code: "QT-2024-003", title: "Cloud Migration Standard", totalValue: "3,000,000", discount: "3%", finalValue: "2,910,000", status: "Draft", createdDate: "05/06/2024", validUntil: "06/15/2024" },
];

const statusColors: Record<string, string> = {
  Draft: "bg-secondary text-secondary-foreground",
  Sent: "bg-primary/10 text-primary",
  Accepted: "bg-success/10 text-success",
  Rejected: "bg-destructive/10 text-destructive",
  "Pending Confirmation": "bg-warning/10 text-warning",
};

export const OpportunityQuotations = () => {
  const [quotations] = useState<Quotation[]>(initialQuotations);

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-sm">Quotations</h3>
        <Button size="sm" className="gap-1.5">
          <Plus className="h-3.5 w-3.5" /> Create Quotation
        </Button>
      </div>

      {quotations.length === 0 ? (
        <div className="text-center py-8">
          <FileText className="h-10 w-10 mx-auto text-muted-foreground/40 mb-2" />
          <p className="text-muted-foreground">No quotations yet</p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Quote ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead className="text-right">Final Value</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Valid Until</TableHead>
              <TableHead className="w-10"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {quotations.map((q) => (
              <TableRow key={q.id} className="hover:bg-muted/50 cursor-pointer">
                <TableCell className="font-mono text-sm">{q.code}</TableCell>
                <TableCell className="font-medium">{q.title}</TableCell>
                <TableCell className="text-right">{q.totalValue}</TableCell>
                <TableCell className="text-success">-{q.discount}</TableCell>
                <TableCell className="text-right font-semibold text-primary">{q.finalValue}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className={statusColors[q.status]}>{q.status}</Badge>
                </TableCell>
                <TableCell>{q.validUntil}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <Eye className="h-3.5 w-3.5 text-muted-foreground" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Card>
  );
};
