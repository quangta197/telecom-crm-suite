import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableTemplateItem } from "./SortableTemplateItem";
import { toast } from "@/hooks/use-toast";

interface TemplateItem {
  id: number;
  name: string;
  description: string;
  isDefault: boolean;
}

interface TemplateListProps {
  templates: TemplateItem[];
  onReorder: (newTemplates: TemplateItem[]) => void;
  onSetDefault?: (id: number) => void;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}

export function TemplateList({ 
  templates, 
  onReorder,
  onSetDefault,
  onEdit,
  onDelete 
}: TemplateListProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = templates.findIndex((item) => item.id === active.id);
      const newIndex = templates.findIndex((item) => item.id === over.id);
      const newTemplates = arrayMove(templates, oldIndex, newIndex);
      onReorder(newTemplates);
      toast({
        title: "Đã cập nhật thứ tự",
        description: "Thứ tự biểu mẫu đã được thay đổi",
      });
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={templates.map((t) => t.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-3">
          {templates.map((template) => (
            <SortableTemplateItem
              key={template.id}
              template={template}
              onSetDefault={onSetDefault}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
