import { useState } from "react";
import { Phone, Mail, Calendar, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useActivityTypesStore, iconMap } from "@/stores/activityTypesStore";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type ActivityType = string;

interface AddActivityDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: ActivityType;
  onAdd: (activity: {
    type: ActivityType;
    title: string;
    description: string;
    author: string;
    date: string;
  }) => void;
}

const defaultConfig = {
  title: "Log Activity",
  titlePlaceholder: "Subject",
  descPlaceholder: "Details...",
};

export function AddActivityDialog({
  open,
  onOpenChange,
  type,
  onAdd,
}: AddActivityDialogProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { activityTypes } = useActivityTypesStore();

  const actType = activityTypes.find((at) => at.id === type);
  const Icon = actType ? iconMap[actType.icon] : null;
  const dialogTitle = actType ? `Log ${actType.name}` : defaultConfig.title;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const today = new Date();
    const formattedDate = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear().toString().slice(-2)}`;
    
    onAdd({
      type,
      title,
      description,
      author: "Current User",
      date: formattedDate,
    });
    
    setTitle("");
    setDescription("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {Icon && <Icon className="h-5 w-5" />}
            {dialogTitle}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Subject"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Details..."
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
