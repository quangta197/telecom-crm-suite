import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
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

const unitOptions = ["License", "Year", "Month", "Unit", "Package", "Hour"];

export const OpportunityServiceProducts = () => {
  const [items, setItems] = useState<ServiceProduct[]>(initialItems);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({ code: "", name: "", unit: "License", quantity: "1", unitPrice: "" });

  const handleDelete = (id: number) => {
    setItems(items.filter((i) => i.id !== id));
  };

  const handleAdd = () => {
    const qty = parseInt(form.quantity, 10) || 1;
    const price = parseInt(form.unitPrice.replace(/,/g, ""), 10) || 0;
    const total = qty * price;
    const newItem: ServiceProduct = {
      id: Date.now(),
      code: form.code || `SP${String(items.length + 1).padStart(3, "0")}`,
      name: form.name,
      unit: form.unit,
      quantity: qty,
      unitPrice: price.toLocaleString(),
      total: total.toLocaleString(),
      source: "opportunity",
    };
    setItems([...items, newItem]);
    setForm({ code: "", name: "", unit: "License", quantity: "1", unitPrice: "" });
    setDialogOpen(false);
  };

  const totalAmount = items.reduce((sum, item) => {
    const val = parseInt(item.total.replace(/,/g, ""), 10);
    return sum + (isNaN(val) ? 0 : val);
  }, 0);

  const canSave = form.name.trim() && form.unitPrice.trim();

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-sm">Service / Product</h3>
        <Button size="sm" className="gap-1.5" onClick={() => setDialogOpen(true)}>
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
                      <Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => handleDelete(item.id)}>
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

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Service / Product</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Code</Label>
                <Input placeholder="Auto-generated" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Unit</Label>
                <Select value={form.unit} onValueChange={(v) => setForm({ ...form, unit: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {unitOptions.map((u) => <SelectItem key={u} value={u}>{u}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Service/Product Name <span className="text-destructive">*</span></Label>
              <Input placeholder="Enter name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Quantity</Label>
                <Input type="number" min="1" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Unit Price <span className="text-destructive">*</span></Label>
                <Input placeholder="0" value={form.unitPrice} onChange={(e) => setForm({ ...form, unitPrice: e.target.value })} />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAdd} disabled={!canSave}>Add</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};
