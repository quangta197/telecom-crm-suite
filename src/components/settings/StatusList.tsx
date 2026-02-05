import { useState } from "react";
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
import { SortableStatusItem } from "./SortableStatusItem";
import { toast } from "@/hooks/use-toast";

interface StatusItem {
  id: number;
  name: string;
  color: string;
  description: string;
}

interface StatusListProps {
  statuses: StatusItem[];
  onReorder: (newStatuses: StatusItem[]) => void;
}

export function StatusList({ statuses, onReorder }: StatusListProps) {
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
      const oldIndex = statuses.findIndex((item) => item.id === active.id);
      const newIndex = statuses.findIndex((item) => item.id === over.id);
      const newStatuses = arrayMove(statuses, oldIndex, newIndex);
      onReorder(newStatuses);
      toast({
        title: "Đã cập nhật thứ tự",
        description: "Thứ tự trạng thái đã được thay đổi",
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
        items={statuses.map((s) => s.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-3">
          {statuses.map((status, index) => (
            <SortableStatusItem
              key={status.id}
              status={status}
              index={index}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
