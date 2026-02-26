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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Plus, Pencil, Trash2, GripVertical } from "lucide-react";
import {
  useOpportunityCustomFieldsStore,
  OpportunityCustomField,
  FieldType,
} from "@/stores/opportunityCustomFieldsStore";

const fieldTypeLabels: Record<FieldType, string> = {
  text: "Text",
  number: "Number",
  date: "Date",
  select: "Select List",
  textarea: "Long Text",
};

export function OpportunityCustomFieldSettings() {
  const { fields, addField, updateField, removeField } = useOpportunityCustomFieldsStore();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingField, setEditingField] = useState<OpportunityCustomField | null>(null);
  const [form, setForm] = useState({
    label: "",
    type: "text" as FieldType,
    required: false,
    options: "",
  });

  const resetForm = () => {
    setForm({ label: "", type: "text", required: false, options: "" });
    setEditingField(null);
  };

  const openAdd = () => {
    resetForm();
    setDialogOpen(true);
  };

  const openEdit = (field: OpportunityCustomField) => {
    setEditingField(field);
    setForm({
      label: field.label,
      type: field.type,
      required: field.required,
      options: field.options?.join(", ") || "",
    });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!form.label.trim()) return;
    const options = form.type === "select"
      ? form.options.split(",").map((o) => o.trim()).filter(Boolean)
      : undefined;

    if (editingField) {
      updateField(editingField.id, {
        label: form.label.trim(),
        type: form.type,
        required: form.required,
        options,
      });
    } else {
      addField({
        id: `custom-${Date.now()}`,
        label: form.label.trim(),
        type: form.type,
        required: form.required,
        options,
        order: fields.length,
      });
    }
    setDialogOpen(false);
    resetForm();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-lg">Opportunity Custom Fields</h3>
          <p className="text-sm text-muted-foreground">
            Define additional fields for Opportunity records
          </p>
        </div>
        <Button className="gap-2" onClick={openAdd}>
          <Plus className="h-4 w-4" />
          Add Field
        </Button>
      </div>

      <div className="space-y-2">
        {fields.length === 0 && (
          <p className="text-sm text-muted-foreground py-8 text-center">
            No custom fields defined yet. Click "Add Field" to get started.
          </p>
        )}
        {fields.map((field) => (
          <div
            key={field.id}
            className="flex items-center gap-3 p-3 border rounded-lg bg-card"
          >
            <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm">{field.label}</span>
                <Badge variant="secondary" className="text-xs">
                  {fieldTypeLabels[field.type]}
                </Badge>
                {field.required && (
                  <Badge variant="destructive" className="text-xs">
                    Required
                  </Badge>
                )}
              </div>
              {field.type === "select" && field.options && (
                <p className="text-xs text-muted-foreground mt-1">
                  Options: {field.options.join(", ")}
                </p>
              )}
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(field)}>
              <Pencil className="h-3.5 w-3.5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => removeField(field.id)}>
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        ))}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingField ? "Edit Field" : "Add New Field"}</DialogTitle>
            <DialogDescription>
              {editingField ? "Update custom field information" : "Create an additional field for Opportunity"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Field Name *</Label>
              <Input
                value={form.label}
                onChange={(e) => setForm((f) => ({ ...f, label: e.target.value }))}
                placeholder="e.g. Industry, Company Size..."
              />
            </div>
            <div className="space-y-2">
              <Label>Field Type</Label>
              <Select value={form.type} onValueChange={(v) => setForm((f) => ({ ...f, type: v as FieldType }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(fieldTypeLabels).map(([value, label]) => (
                    <SelectItem key={value} value={value}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {form.type === "select" && (
              <div className="space-y-2">
                <Label>Options (comma-separated)</Label>
                <Input
                  value={form.options}
                  onChange={(e) => setForm((f) => ({ ...f, options: e.target.value }))}
                  placeholder="e.g. Small, Medium, Large"
                />
              </div>
            )}
            <div className="flex items-center gap-2">
              <Switch
                checked={form.required}
                onCheckedChange={(v) => setForm((f) => ({ ...f, required: v }))}
              />
              <Label>Required</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>{editingField ? "Update" : "Add"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
