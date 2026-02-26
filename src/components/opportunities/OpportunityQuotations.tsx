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
import { Plus, Eye, FileText, ShieldCheck, UserCheck, Trash2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

type ApprovalType = "self" | "manager";

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
  approvalType: ApprovalType;
  approvalStatus?: "pending" | "approved" | "rejected";
  approvedBy?: string;
}

const initialQuotations: Quotation[] = [
  { id: 1, code: "QT-2024-001", title: "Enterprise Network Package", totalValue: "5,000,000", discount: "5%", finalValue: "4,750,000", status: "Sent", createdDate: "01/06/2024", validUntil: "02/15/2024", approvalType: "self" },
  { id: 2, code: "QT-2024-003", title: "Cloud Migration Standard", totalValue: "3,000,000", discount: "3%", finalValue: "2,910,000", status: "Draft", createdDate: "05/06/2024", validUntil: "06/15/2024", approvalType: "manager", approvalStatus: "pending" },
];

const statusColors: Record<string, string> = {
  Draft: "bg-secondary text-secondary-foreground",
  Sent: "bg-primary/10 text-primary",
  Accepted: "bg-success/10 text-success",
  Rejected: "bg-destructive/10 text-destructive",
  "Pending Confirmation": "bg-warning/10 text-warning",
};

const approvalStatusColors: Record<string, string> = {
  pending: "bg-warning/10 text-warning",
  approved: "bg-success/10 text-success",
  rejected: "bg-destructive/10 text-destructive",
};

const approvalStatusLabels: Record<string, string> = {
  pending: "Pending",
  approved: "Approved",
  rejected: "Rejected",
};

const selfStatusOptions = ["Draft", "Sent", "Pending Confirmation", "Accepted", "Rejected"];
const managerStatusOptions = ["Draft"];

export const OpportunityQuotations = () => {
  const [quotations, setQuotations] = useState<Quotation[]>(initialQuotations);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({ title: "", totalValue: "", discount: "", status: "Draft", validUntil: "", approvalType: "self" as ApprovalType });

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
      status: "Draft",
      createdDate: now,
      validUntil: form.validUntil || now,
      approvalType: form.approvalType,
      approvalStatus: form.approvalType === "manager" ? "pending" : undefined,
    };
    setQuotations([...quotations, newQ]);
    setForm({ title: "", totalValue: "", discount: "", status: "Draft", validUntil: "", approvalType: "self" });
    setDialogOpen(false);
  };

  const handleApprove = (id: number) => {
    setQuotations((prev) =>
      prev.map((q) => q.id === id ? { ...q, approvalStatus: "approved", approvedBy: "Manager", status: "Sent" } : q)
    );
  };

  const handleReject = (id: number) => {
    setQuotations((prev) =>
      prev.map((q) => q.id === id ? { ...q, approvalStatus: "rejected", status: "Rejected" } : q)
    );
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
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead className="text-right">Final Value</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Approval</TableHead>
              <TableHead>Valid Until</TableHead>
              <TableHead className="w-10"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {quotations.map((q) => (
              <TableRow key={q.id} className="hover:bg-muted/50 cursor-pointer">
                <TableCell className="font-mono text-sm">{q.code}</TableCell>
                <TableCell className="font-medium">{q.title}</TableCell>
                <TableCell>
                  <Tooltip>
                    <TooltipTrigger>
                      <Badge variant="outline" className={`gap-1 text-xs ${q.approvalType === "self" ? "border-primary/30 text-primary" : "border-orange-400/30 text-orange-600"}`}>
                        {q.approvalType === "self" ? <UserCheck className="h-3 w-3" /> : <ShieldCheck className="h-3 w-3" />}
                        {q.approvalType === "self" ? "Self-Approved" : "Needs Approval"}
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent>
                      {q.approvalType === "self" ? "Sales can decide without approval" : "Requires manager approval"}
                    </TooltipContent>
                  </Tooltip>
                </TableCell>
                <TableCell className="text-right">{q.totalValue}</TableCell>
                <TableCell className="text-success">-{q.discount}</TableCell>
                <TableCell className="text-right font-semibold text-primary">{q.finalValue}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className={statusColors[q.status]}>{q.status}</Badge>
                </TableCell>
                <TableCell>
                  {q.approvalType === "manager" && q.approvalStatus ? (
                    <div className="flex items-center gap-1.5">
                      <Badge variant="secondary" className={approvalStatusColors[q.approvalStatus]}>
                        {approvalStatusLabels[q.approvalStatus]}
                      </Badge>
                      {q.approvalStatus === "pending" && (
                        <div className="flex gap-0.5">
                          <Button variant="ghost" size="icon" className="h-6 w-6 text-success hover:text-success" onClick={() => handleApprove(q.id)}>
                            <ShieldCheck className="h-3.5 w-3.5" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive hover:text-destructive" onClick={() => handleReject(q.id)}>
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <span className="text-xs text-muted-foreground">—</span>
                  )}
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
            {/* Approval Type Selection */}
            <div className="space-y-2">
              <Label>Quotation Type <span className="text-destructive">*</span></Label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-colors ${form.approvalType === "self" ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"}`}
                  onClick={() => setForm({ ...form, approvalType: "self" })}
                >
                  <UserCheck className={`h-6 w-6 ${form.approvalType === "self" ? "text-primary" : "text-muted-foreground"}`} />
                  <span className={`text-sm font-medium ${form.approvalType === "self" ? "text-primary" : "text-foreground"}`}>Self-Approved</span>
                  <span className="text-xs text-muted-foreground text-center">Sales can decide without approval</span>
                </button>
                <button
                  type="button"
                  className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-colors ${form.approvalType === "manager" ? "border-orange-500 bg-orange-500/5" : "border-border hover:border-orange-400/40"}`}
                  onClick={() => setForm({ ...form, approvalType: "manager" })}
                >
                  <ShieldCheck className={`h-6 w-6 ${form.approvalType === "manager" ? "text-orange-500" : "text-muted-foreground"}`} />
                  <span className={`text-sm font-medium ${form.approvalType === "manager" ? "text-orange-500" : "text-foreground"}`}>Needs Approval</span>
                  <span className="text-xs text-muted-foreground text-center">Requires manager approval</span>
                </button>
              </div>
            </div>

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
            <div className="space-y-2">
              <Label>Valid Until</Label>
              <Input type="date" value={form.validUntil} onChange={(e) => setForm({ ...form, validUntil: e.target.value })} />
            </div>

            {form.approvalType === "manager" && (
              <div className="rounded-lg bg-orange-500/5 border border-orange-500/20 p-3">
                <p className="text-xs text-orange-600 flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Quotation will be in "Pending" status after creation. Manager must approve before sending to customer.
                </p>
              </div>
            )}
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
