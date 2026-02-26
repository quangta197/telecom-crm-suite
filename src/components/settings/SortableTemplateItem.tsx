import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GripVertical, MoreHorizontal, Pencil, Trash2, FileText } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TemplateItem {
  id: number;
  name: string;
  description: string;
  isDefault: boolean;
}

interface SortableTemplateItemProps {
  template: TemplateItem;
  onSetDefault?: (id: number) => void;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}

export function SortableTemplateItem({ 
  template, 
  onSetDefault,
  onEdit,
  onDelete 
}: SortableTemplateItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: template.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center justify-between p-4 bg-secondary/30 rounded-lg border hover:bg-secondary/50 transition-colors ${
        isDragging ? "opacity-50 shadow-lg ring-2 ring-primary" : ""
      }`}
    >
      <div className="flex items-center gap-4">
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing touch-none"
        >
          <GripVertical className="h-5 w-5 text-muted-foreground" />
        </button>
        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <FileText className="h-5 w-5 text-primary" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <p className="font-medium">{template.name}</p>
            {template.isDefault && (
              <Badge variant="secondary" className="text-xs">Default</Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{template.description}</p>
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem className="gap-2" onClick={() => onEdit?.(template.id)}>
            <Pencil className="h-4 w-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-2" onClick={() => onSetDefault?.(template.id)}>
            <FileText className="h-4 w-4" />
            Set as Default
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-2 text-destructive" onClick={() => onDelete?.(template.id)}>
            <Trash2 className="h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
