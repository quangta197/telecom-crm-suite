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
import { Plus, Trash2, Package } from "lucide-react";

interface ServiceProduct {
  id: number;
  code: string;
  name: string;
  unit: string;
  quantity: number;
  unitPrice: string;
  total: string;
  source?: "lead" | "opportunity";
}

const initialItems: ServiceProduct[] = [
  { id: 1, code: "SP001", name: "MeInvoice - Electronic Invoice", unit: "License", quantity: 1, unitPrice: "2,000,000", total: "2,000,000", source: "opportunity" },
  { id: 2, code: "SP002", name: "AMIS Accounting - Cloud Package", unit: "Year", quantity: 1, unitPrice: "1,500,000", total: "1,500,000", source: "opportunity" },
  { id: 3, code: "SP003", name: "AMIS CRM - Standard", unit: "Year", quantity: 1, unitPrice: "1,500,000", total: "1,500,000", source: "lead" },
];

const sourceLabels: Record<string, { label: string; className: string }> = {
  lead: { label: "From Lead", className: "bg-amber-500/10 text-amber-600 border-amber-200" },
  opportunity: { label: "Opportunity", className: "bg-primary/10 text-primary border-primary/20" },
};

export const OpportunityServiceProducts = () => {
  const [items, setItems] = useState<ServiceProduct[]>(initialItems);

  const handleDelete = (id: number) => {
    setItems(items.filter((i) => i.id !== id));
  };

  const totalAmount = items.reduce((sum, item) => {
    const val = parseInt(item.total.replace(/,/g, ""), 10);
    return sum + (isNaN(val) ? 0 : val);
  }, 0);

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-sm">Service / Product</h3>
        <Button size="sm" className="gap-1.5">
          <Plus className="h-3.5 w-3.5" /> Add Product
        </Button>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-8">
          <Package className="h-10 w-10 mx-auto text-muted-foreground/40 mb-2" />
          <p className="text-muted-foreground">No services/products added</p>
        </div>
      ) : (
        <>
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-10">#</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Service/Product Name</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead className="text-right">Qty</TableHead>
                <TableHead className="text-right">Unit Price</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead>Source</TableHead>
                <TableHead className="w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item, idx) => {
                const sourceInfo = item.source ? sourceLabels[item.source] : null;
                return (
                  <TableRow key={item.id} className="group">
                    <TableCell className="text-muted-foreground">{idx + 1}</TableCell>
                    <TableCell className="font-mono text-sm">{item.code}</TableCell>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.unit}</TableCell>
                    <TableCell className="text-right">{item.quantity}</TableCell>
                    <TableCell className="text-right">{item.unitPrice}</TableCell>
                    <TableCell className="text-right font-semibold">{item.total}</TableCell>
                    <TableCell>
                      {sourceInfo && (
                        <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${sourceInfo.className}`}>
                          {sourceInfo.label}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Trash2 className="h-3.5 w-3.5 text-muted-foreground" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <div className="flex justify-end mt-4 pt-3 border-t">
            <div className="text-sm">
              <span className="text-muted-foreground mr-2">Total Amount:</span>
              <span className="font-bold text-primary text-base">{totalAmount.toLocaleString()} VND</span>
            </div>
          </div>
        </>
      )}
    </Card>
  );
};
