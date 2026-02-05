import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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

interface OpportunityFormData {
  title: string;
  company: string;
  value: string;
  stage: string;
  probability: number;
  closeDate: string;
  owner: string;
}

interface AddOpportunityDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: OpportunityFormData) => void;
}

const stages = ["Discovery", "Qualification", "Proposal", "Negotiation", "Closed Won"];
const owners = ["John Smith", "Sarah Johnson", "Mike Wilson", "Emily Davis"];

export function AddOpportunityDialog({
  open,
  onOpenChange,
  onSubmit,
}: AddOpportunityDialogProps) {
  const [formData, setFormData] = useState<OpportunityFormData>({
    title: "",
    company: "",
    value: "",
    stage: "Discovery",
    probability: 30,
    closeDate: "",
    owner: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      title: "",
      company: "",
      value: "",
      stage: "Discovery",
      probability: 30,
      closeDate: "",
      owner: "",
    });
    onOpenChange(false);
  };

  const handleChange = (field: keyof OpportunityFormData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Opportunity</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 space-y-2">
              <Label htmlFor="title">Opportunity Name *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                placeholder="Enter opportunity name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">Customer *</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => handleChange("company", e.target.value)}
                placeholder="Enter customer name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="value">Value *</Label>
              <Input
                id="value"
                value={formData.value}
                onChange={(e) => handleChange("value", e.target.value)}
                placeholder="e.g., $100K"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="stage">Stage *</Label>
              <Select
                value={formData.stage}
                onValueChange={(value) => handleChange("stage", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select stage" />
                </SelectTrigger>
                <SelectContent>
                  {stages.map((stage) => (
                    <SelectItem key={stage} value={stage}>
                      {stage}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="probability">Probability (%)</Label>
              <Input
                id="probability"
                type="number"
                min="0"
                max="100"
                value={formData.probability}
                onChange={(e) => handleChange("probability", parseInt(e.target.value) || 0)}
                placeholder="0-100"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="closeDate">Expected Close Date *</Label>
              <Input
                id="closeDate"
                type="date"
                value={formData.closeDate}
                onChange={(e) => handleChange("closeDate", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="owner">Owner *</Label>
              <Select
                value={formData.owner}
                onValueChange={(value) => handleChange("owner", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select owner" />
                </SelectTrigger>
                <SelectContent>
                  {owners.map((owner) => (
                    <SelectItem key={owner} value={owner}>
                      {owner}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="gradient-primary">
              Create Opportunity
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
