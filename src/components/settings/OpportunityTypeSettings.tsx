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
  { value: "bg-slate-500", label: "Xám" },
  { value: "bg-red-500", label: "Đỏ" },
  { value: "bg-orange-500", label: "Cam" },
  { value: "bg-yellow-500", label: "Vàng" },
  { value: "bg-green-500", label: "Xanh lá" },
  { value: "bg-blue-500", label: "Xanh dương" },
  { value: "bg-purple-500", label: "Tím" },
  { value: "bg-pink-500", label: "Hồng" },
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
          <h3 className="font-semibold text-lg">Loại Cơ hội</h3>
          <p className="text-sm text-muted-foreground">
            Định nghĩa các loại cơ hội kinh doanh trong hệ thống
          </p>
        </div>
        <Button className="gap-2" onClick={openAdd}>
          <Plus className="h-4 w-4" />
          Thêm loại
        </Button>
      </div>

      <div className="space-y-2">
        {types.length === 0 && (
          <p className="text-sm text-muted-foreground py-8 text-center">
            Chưa có loại cơ hội nào.
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
            <DialogTitle>{editingType ? "Sửa loại cơ hội" : "Thêm loại cơ hội"}</DialogTitle>
            <DialogDescription>
              {editingType ? "Cập nhật thông tin loại cơ hội" : "Tạo loại cơ hội mới cho hệ thống"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Tên loại *</Label>
              <Input
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="VD: New Customer, Upsell..."
              />
            </div>
            <div className="space-y-2">
              <Label>Màu sắc</Label>
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
              <Label>Mô tả</Label>
              <Input
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                placeholder="Mô tả ngắn về loại cơ hội"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Hủy</Button>
            <Button onClick={handleSave}>{editingType ? "Cập nhật" : "Thêm"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
