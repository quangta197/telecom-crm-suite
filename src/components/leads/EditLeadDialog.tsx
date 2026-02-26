import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export interface LeadData {
  id: number;
  code: string;
  name: string;
  company: string;
  title: string;
  phone: string;
  email: string;
  source: string;
  score: number;
  status: string;
  createdAt: string;
  lastActivity: string;
  address: string;
  website: string;
  industry: string;
  employees: string;
  budget: string;
  timeline: string;
  interests: string[];
  notes: string;
  assignedTo: string;
}

interface EditLeadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lead: LeadData;
  onSave: (lead: LeadData) => void;
}

export const EditLeadDialog = ({ open, onOpenChange, lead, onSave }: EditLeadDialogProps) => {
  const [formData, setFormData] = useState<LeadData>(lead);

  const handleChange = (field: keyof LeadData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave(formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Lead</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="space-y-2">
            <Label>Full Name</Label>
            <Input value={formData.name} onChange={e => handleChange("name", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Title</Label>
            <Input value={formData.title} onChange={e => handleChange("title", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Company</Label>
            <Input value={formData.company} onChange={e => handleChange("company", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Industry</Label>
            <Input value={formData.industry} onChange={e => handleChange("industry", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Phone</Label>
            <Input value={formData.phone} onChange={e => handleChange("phone", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input value={formData.email} onChange={e => handleChange("email", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Website</Label>
            <Input value={formData.website} onChange={e => handleChange("website", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Address</Label>
            <Input value={formData.address} onChange={e => handleChange("address", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Source</Label>
            <Select value={formData.source} onValueChange={v => handleChange("source", v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {["Website", "Event", "Referral", "Cold call", "LinkedIn", "Social Media"].map(s => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Status</Label>
            <Select value={formData.status} onValueChange={v => handleChange("status", v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {["Hot", "Warm", "Cold"].map(s => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Lead Score</Label>
            <Input type="number" min={0} max={100} value={formData.score} onChange={e => handleChange("score", Number(e.target.value))} />
          </div>
          <div className="space-y-2">
            <Label>Employees</Label>
            <Input value={formData.employees} onChange={e => handleChange("employees", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Budget</Label>
            <Input value={formData.budget} onChange={e => handleChange("budget", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Timeline</Label>
            <Input value={formData.timeline} onChange={e => handleChange("timeline", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Assigned To</Label>
            <Input value={formData.assignedTo} onChange={e => handleChange("assignedTo", e.target.value)} />
          </div>
          <div className="col-span-2 space-y-2">
            <Label>Interests</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.interests.map((interest) => (
                <Badge key={interest} variant="secondary" className="gap-1 pr-1">
                  {interest}
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, interests: prev.interests.filter(i => i !== interest) }))}
                    className="ml-1 rounded-full hover:bg-muted p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Add interest..."
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    const val = (e.target as HTMLInputElement).value.trim();
                    if (val && !formData.interests.includes(val)) {
                      setFormData(prev => ({ ...prev, interests: [...prev.interests, val] }));
                      (e.target as HTMLInputElement).value = "";
                    }
                  }
                }}
              />
            </div>
          </div>
          <div className="col-span-2 space-y-2">
            <Label>Notes</Label>
            <Textarea value={formData.notes} onChange={e => handleChange("notes", e.target.value)} />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
