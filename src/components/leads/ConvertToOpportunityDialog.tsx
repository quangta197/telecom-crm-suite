import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { Target, ArrowRight } from "lucide-react";
import type { LeadData } from "@/components/leads/EditLeadDialog";

interface ConvertToOpportunityDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lead: LeadData;
  onConverted?: () => void;
}

const stages = ["Discovery", "Qualification", "Proposal", "Negotiation", "Closed Won"];
const owners = ["John Smith", "Sarah Johnson", "Mike Wilson", "Emily Davis"];

export function ConvertToOpportunityDialog({
  open,
  onOpenChange,
  lead,
  onConverted,
}: ConvertToOpportunityDialogProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: `${lead.company} - Opportunity`,
    company: lead.company,
    value: lead.forecastRevenue || "",
    stage: "Discovery",
    probability: lead.score >= 80 ? 75 : lead.score >= 50 ? 50 : 25,
    closeDate: "",
    owner: lead.assignedTo,
  });

  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleConvert = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Lead converted successfully!",
      description: `Opportunity "${formData.title}" has been created.`,
    });

    onConverted?.();
    onOpenChange(false);
    navigate("/opportunities", {
      state: {
        convertedLead: {
          ...formData,
          leadId: lead.id,
          leadCode: lead.code,
        },
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Convert Lead to Opportunity
          </DialogTitle>
          <DialogDescription>
            Convert <span className="font-medium text-foreground">{lead.name}</span> ({lead.company}) into a new opportunity.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleConvert} className="space-y-4">
          {/* Lead Summary */}
          <div className="rounded-lg border bg-muted/30 p-3 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
              {lead.name.split(" ").map(n => n[0]).join("")}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm">{lead.name}</p>
              <p className="text-xs text-muted-foreground">{lead.title} at {lead.company}</p>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
            <div className="text-sm font-medium text-primary">Opportunity</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 space-y-2">
              <Label>Opportunity Name *</Label>
              <Input
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Customer</Label>
              <Input
                value={formData.company}
                onChange={(e) => handleChange("company", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Value</Label>
              <Input
                value={formData.value}
                onChange={(e) => handleChange("value", e.target.value)}
                placeholder="e.g., $100K"
              />
            </div>

            <div className="space-y-2">
              <Label>Stage</Label>
              <Select value={formData.stage} onValueChange={(v) => handleChange("stage", v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {stages.map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Probability (%)</Label>
              <Input
                type="number"
                min="0"
                max="100"
                value={formData.probability}
                onChange={(e) => handleChange("probability", parseInt(e.target.value) || 0)}
              />
            </div>

            <div className="space-y-2">
              <Label>Expected Close Date *</Label>
              <Input
                type="date"
                value={formData.closeDate}
                onChange={(e) => handleChange("closeDate", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Owner</Label>
              <Select value={formData.owner} onValueChange={(v) => handleChange("owner", v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select owner" />
                </SelectTrigger>
                <SelectContent>
                  {owners.map((o) => (
                    <SelectItem key={o} value={o}>{o}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="gap-1.5">
              <Target className="h-4 w-4" />
              Convert
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
