import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil, Trash2, GripVertical, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useContactRolesStore, type ContactRoleDefinition } from "@/stores/contactRolesStore";
import {
  DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function SortableRoleItem({ item, onEdit, onDelete }: { item: ContactRoleDefinition; onEdit: () => void; onDelete: () => void }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id });
  const style = { transform: CSS.Transform.toString(transform), transition };
  return (
    <div ref={setNodeRef} style={style} className="flex items-center gap-3 p-3 bg-card border rounded-lg group">
      <button {...attributes} {...listeners} className="cursor-grab text-muted-foreground hover:text-foreground">
        <GripVertical className="h-4 w-4" />
      </button>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm">{item.name}</p>
        <p className="text-xs text-muted-foreground">{item.description}</p>
      </div>
      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onEdit}><Pencil className="h-3 w-3" /></Button>
        <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={onDelete}><Trash2 className="h-3 w-3" /></Button>
      </div>
    </div>
  );
}

export function ContactRoleSettings() {
  const { roles, addRole, updateRole, removeRole, reorderRoles } = useContactRolesStore();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", description: "" });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const openAdd = () => { setEditingId(null); setForm({ name: "", description: "" }); setDialogOpen(true); };
  const openEdit = (item: ContactRoleDefinition) => { setEditingId(item.id); setForm({ name: item.name, description: item.description }); setDialogOpen(true); };

  const handleSave = () => {
    if (!form.name.trim()) return;
    if (editingId) updateRole(editingId, form);
    else addRole({ id: `role-${Date.now()}`, ...form });
    setDialogOpen(false);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = roles.findIndex((t) => t.id === active.id);
      const newIndex = roles.findIndex((t) => t.id === over.id);
      reorderRoles(arrayMove(roles, oldIndex, newIndex));
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold">Contact Roles</h3>
          <p className="text-sm text-muted-foreground">Định nghĩa các vai trò của liên hệ trong Opportunity</p>
        </div>
        <Button className="gap-2" onClick={openAdd}><Plus className="h-4 w-4" /> Thêm vai trò</Button>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={roles.map((t) => t.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-2">
            {roles.map((item) => (
              <SortableRoleItem key={item.id} item={item} onEdit={() => openEdit(item)} onDelete={() => removeRole(item.id)} />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <p className="text-sm text-muted-foreground">💡 Kéo thả để sắp xếp thứ tự hiển thị</p>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>{editingId ? "Sửa vai trò" : "Thêm vai trò"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Tên</Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="VD: Decision Maker..." />
            </div>
            <div className="space-y-2">
              <Label>Mô tả</Label>
              <Input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Mô tả ngắn" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Hủy</Button>
            <Button onClick={handleSave}>Lưu</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
