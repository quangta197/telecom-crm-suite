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

const statusOptions = ["Draft", "Sent", "Pending Confirmation", "Accepted", "Rejected"];

export const OpportunityQuotations = () => {
  const [quotations, setQuotations] = useState<Quotation[]>(initialQuotations);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({ title: "", totalValue: "", discount: "", status: "Draft", validUntil: "" });

  const handleAdd = () => {
    const total = parseInt(form.totalValue.replace(/,/g, ""), 10) || 0;
    const discountPct = parseFloat(form.discount) || 0;
    const final = Math.round(total * (1 - discountPct / 100));
    const code = `QT-2024-${String(quotations.length + 1).padStart(3, "0")}`;
    const now = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" });

    const newQ: Quotation = {
      id: Date.now(),
      code,
      title: form.title,
      totalValue: total.toLocaleString(),
      discount: `${discountPct}%`,
      finalValue: final.toLocaleString(),
      status: form.status,
      createdDate: now,
      validUntil: form.validUntil || now,
    };
    setQuotations([...quotations, newQ]);
    setForm({ title: "", totalValue: "", discount: "", status: "Draft", validUntil: "" });
    setDialogOpen(false);
  };

  const canSave = form.title.trim() && form.totalValue.trim();

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-sm">Quotations</h3>
        <Button size="sm" className="gap-1.5" onClick={() => setDialogOpen(true)}>
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

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create Quotation</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Title <span className="text-destructive">*</span></Label>
              <Input placeholder="Quotation title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Total Value <span className="text-destructive">*</span></Label>
                <Input placeholder="0" value={form.totalValue} onChange={(e) => setForm({ ...form, totalValue: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Discount (%)</Label>
                <Input placeholder="0" value={form.discount} onChange={(e) => setForm({ ...form, discount: e.target.value })} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Valid Until</Label>
                <Input type="date" value={form.validUntil} onChange={(e) => setForm({ ...form, validUntil: e.target.value })} />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAdd} disabled={!canSave}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};
