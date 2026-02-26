import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil, Trash2, GripVertical, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useOpportunityStagesStore,
  type OpportunityStageDefinition,
} from "@/stores/opportunityStagesStore";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

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

function SortableStageItem({
  item,
  onEdit,
  onDelete,
}: {
  item: OpportunityStageDefinition;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div ref={setNodeRef} style={style} className="flex items-center gap-3 p-3 bg-card border rounded-lg group">
      <button {...attributes} {...listeners} className="cursor-grab text-muted-foreground hover:text-foreground">
        <GripVertical className="h-4 w-4" />
      </button>
      <div className={`h-3 w-8 rounded-full ${item.color} flex-shrink-0`} />
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm">{item.label}</p>
        <p className="text-xs text-muted-foreground">{item.description}</p>
      </div>
      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onEdit}>
          <Pencil className="h-3 w-3" />
        </Button>
        <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={onDelete}>
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
}

export function OpportunityStageSettings() {
  const { stages, addStage, updateStage, removeStage, reorderStages } = useOpportunityStagesStore();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ label: "", color: "bg-blue-500", description: "" });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const openAdd = () => {
    setEditingId(null);
    setForm({ label: "", color: "bg-blue-500", description: "" });
    setDialogOpen(true);
  };

  const openEdit = (item: OpportunityStageDefinition) => {
    setEditingId(item.id);
    setForm({ label: item.label, color: item.color, description: item.description });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!form.label.trim()) return;
    if (editingId) {
      updateStage(editingId, form);
    } else {
      addStage({ id: `opp-stage-${Date.now()}`, ...form });
    }
    setDialogOpen(false);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = stages.findIndex((t) => t.id === active.id);
      const newIndex = stages.findIndex((t) => t.id === over.id);
      reorderStages(arrayMove(stages, oldIndex, newIndex));
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold">Opportunity Stages</h3>
          <p className="text-sm text-muted-foreground">Định nghĩa các giai đoạn pipeline cho Opportunity</p>
        </div>
        <Button className="gap-2" onClick={openAdd}>
          <Plus className="h-4 w-4" />
          Thêm giai đoạn
        </Button>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={stages.map((t) => t.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-2">
            {stages.map((item) => (
              <SortableStageItem
                key={item.id}
                item={item}
                onEdit={() => openEdit(item)}
                onDelete={() => removeStage(item.id)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <p className="text-sm text-muted-foreground">💡 Kéo thả để sắp xếp thứ tự các giai đoạn trong pipeline</p>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>{editingId ? "Sửa giai đoạn" : "Thêm giai đoạn"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Tên</Label>
              <Input value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} placeholder="VD: Discovery, Proposal..." />
            </div>
            <div className="space-y-2">
              <Label>Màu sắc</Label>
              <Select value={form.color} onValueChange={(v) => setForm({ ...form, color: v })}>
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
