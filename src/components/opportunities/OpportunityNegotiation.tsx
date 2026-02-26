import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Plus, Handshake } from "lucide-react";

interface NegotiationEntry {
  id: number;
  date: string;
  author: string;
  type: string;
  summary: string;
  result: string;
  nextAction?: string;
}

const initialEntries: NegotiationEntry[] = [
  {
    id: 1,
    date: "06/01/2024 14:00",
    author: "Nguyen Bao Ngoc",
    type: "Meeting",
    summary: "Discussed pricing for 3-year contract. Customer requested 10% discount on total package.",
    result: "Counter-offered 7% discount with extended support",
    nextAction: "Send revised quotation by 06/05/2024",
  },
  {
    id: 2,
    date: "05/28/2024 10:30",
    author: "Nguyen Bao Ngoc",
    type: "Phone Call",
    summary: "Follow-up on proposal. Customer comparing with competitor offer.",
    result: "Customer will review internally and respond by next week",
    nextAction: "Schedule follow-up meeting",
  },
  {
    id: 3,
    date: "05/20/2024 09:00",
    author: "Nguyen Bao Ngoc",
    type: "Email",
    summary: "Sent initial proposal and pricing breakdown.",
    result: "Customer acknowledged receipt",
  },
];

const typeColors: Record<string, string> = {
  Meeting: "bg-primary/10 text-primary",
  "Phone Call": "bg-success/10 text-success",
  Email: "bg-info/10 text-info",
  Other: "bg-secondary text-secondary-foreground",
};

const typeOptions = ["Meeting", "Phone Call", "Email", "Other"];

export const OpportunityNegotiation = () => {
  const [entries, setEntries] = useState<NegotiationEntry[]>(initialEntries);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({ type: "Meeting", summary: "", result: "", nextAction: "" });

  const handleAdd = () => {
    const now = new Date().toLocaleString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
    const newEntry: NegotiationEntry = {
      id: Date.now(),
      date: now,
      author: "Nguyen Bao Ngoc",
      type: form.type,
      summary: form.summary,
      result: form.result,
      nextAction: form.nextAction || undefined,
    };
    setEntries([newEntry, ...entries]);
    setForm({ type: "Meeting", summary: "", result: "", nextAction: "" });
    setDialogOpen(false);
  };

  const canSave = form.summary.trim() && form.result.trim();

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-sm">Negotiation History</h3>
        <Button size="sm" className="gap-1.5" onClick={() => setDialogOpen(true)}>
          <Plus className="h-3.5 w-3.5" /> Add Entry
        </Button>
      </div>

      {entries.length === 0 ? (
        <div className="text-center py-8">
          <Handshake className="h-10 w-10 mx-auto text-muted-foreground/40 mb-2" />
          <p className="text-muted-foreground">No negotiation entries yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {entries.map((entry) => (
            <div key={entry.id} className="flex gap-3 group">
              <Avatar className="h-8 w-8 mt-0.5">
                <AvatarFallback className="text-xs bg-primary/10 text-primary">
                  {entry.author.split(" ").map((n) => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0 border rounded-lg p-3 bg-muted/20">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-sm font-medium">{entry.author}</span>
                  <Badge variant="secondary" className={`text-[10px] px-1.5 py-0 ${typeColors[entry.type] || typeColors.Other}`}>
                    {entry.type}
                  </Badge>
                  <span className="text-xs text-muted-foreground ml-auto">{entry.date}</span>
                </div>
                <p className="text-sm">{entry.summary}</p>
                <div className="mt-2 text-xs space-y-1">
                  <div>
                    <span className="text-muted-foreground font-medium">Result: </span>
                    <span>{entry.result}</span>
                  </div>
                  {entry.nextAction && (
                    <div>
                      <span className="text-muted-foreground font-medium">Next Action: </span>
                      <span className="text-primary">{entry.nextAction}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Negotiation Entry</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Type</Label>
              <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {typeOptions.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Summary <span className="text-destructive">*</span></Label>
              <Textarea placeholder="Describe what was discussed..." rows={3} value={form.summary} onChange={(e) => setForm({ ...form, summary: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Result <span className="text-destructive">*</span></Label>
              <Textarea placeholder="Outcome of the negotiation..." rows={2} value={form.result} onChange={(e) => setForm({ ...form, result: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Next Action</Label>
              <Input placeholder="Follow-up action (optional)" value={form.nextAction} onChange={(e) => setForm({ ...form, nextAction: e.target.value })} />
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
