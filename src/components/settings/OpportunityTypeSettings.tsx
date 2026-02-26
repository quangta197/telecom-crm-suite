import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, GripVertical } from "lucide-react";
import {
  useOpportunityTypesStore,
  OpportunityTypeDefinition,
} from "@/stores/opportunityTypesStore";

const colorOptions = [
  { value: "bg-slate-500", label: "Gray" },
  { value: "bg-red-500", label: "Red" },
  { value: "bg-orange-500", label: "Orange" },
  { value: "bg-yellow-500", label: "Yellow" },
  { value: "bg-green-500", label: "Green" },
  { value: "bg-blue-500", label: "Blue" },
  { value: "bg-purple-500", label: "Purple" },
  { value: "bg-pink-500", label: "Pink" },
];

export function OpportunityTypeSettings() {
  const { types, addType, updateType, removeType } = useOpportunityTypesStore();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingType, setEditingType] = useState<OpportunityTypeDefinition | null>(null);
  const [form, setForm] = useState({ name: "", color: "bg-blue-500", description: "" });

  const resetForm = () => {
    setForm({ name: "", color: "bg-blue-500", description: "" });
    setEditingType(null);
  };

  const openAdd = () => {
    resetForm();
    setDialogOpen(true);
  };

  const openEdit = (t: OpportunityTypeDefinition) => {
    setEditingType(t);
    setForm({ name: t.name, color: t.color, description: t.description });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!form.name.trim()) return;
    if (editingType) {
      updateType(editingType.id, {
        name: form.name.trim(),
        color: form.color,
        description: form.description.trim(),
      });
    } else {
      addType({
        id: `opp-type-${Date.now()}`,
        name: form.name.trim(),
        color: form.color,
        description: form.description.trim(),
      });
    }
    setDialogOpen(false);
    resetForm();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-lg">Opportunity Types</h3>
          <p className="text-sm text-muted-foreground">
            Define opportunity types used in the system
          </p>
        </div>
        <Button className="gap-2" onClick={openAdd}>
          <Plus className="h-4 w-4" />
          Add Type
        </Button>
      </div>

      <div className="space-y-2">
        {types.length === 0 && (
          <p className="text-sm text-muted-foreground py-8 text-center">
            No opportunity types defined yet.
          </p>
        )}
        {types.map((t) => (
          <div key={t.id} className="flex items-center gap-3 p-3 border rounded-lg bg-card">
            <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
            <div className={`h-4 w-4 rounded-full ${t.color}`} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm">{t.name}</span>
              </div>
              {t.description && (
                <p className="text-xs text-muted-foreground mt-0.5">{t.description}</p>
              )}
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(t)}>
              <Pencil className="h-3.5 w-3.5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => removeType(t.id)}>
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        ))}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingType ? "Edit Opportunity Type" : "Add Opportunity Type"}</DialogTitle>
            <DialogDescription>
              {editingType ? "Update opportunity type information" : "Create a new opportunity type"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Name *</Label>
              <Input
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="VD: New Customer, Upsell..."
              />
            </div>
            <div className="space-y-2">
              <Label>Color</Label>
              <Select value={form.color} onValueChange={(v) => setForm((f) => ({ ...f, color: v }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {colorOptions.map((c) => (
                    <SelectItem key={c.value} value={c.value}>
                      <div className="flex items-center gap-2">
                        <div className={`h-4 w-4 rounded ${c.value}`} />
                        <span>{c.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Input
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                placeholder="Short description"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>{editingType ? "Update" : "Add"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
