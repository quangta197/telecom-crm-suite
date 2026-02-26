import { create } from "zustand";
import { Phone, Mail, Calendar, MessageSquare, Video, Users, FileText, Briefcase } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface ActivityTypeDefinition {
  id: string;
  name: string;
  icon: string; // icon key
  color: string; // tailwind bg class
  description: string;
}

export const iconOptions: { value: string; label: string; icon: LucideIcon }[] = [
  { value: "phone", label: "Phone", icon: Phone },
  { value: "mail", label: "Email", icon: Mail },
  { value: "calendar", label: "Meeting", icon: Calendar },
  { value: "message", label: "Note", icon: MessageSquare },
  { value: "video", label: "Video Call", icon: Video },
  { value: "users", label: "Group Meeting", icon: Users },
  { value: "file", label: "Document", icon: FileText },
  { value: "briefcase", label: "Task", icon: Briefcase },
];

export const iconMap: Record<string, LucideIcon> = Object.fromEntries(
  iconOptions.map((o) => [o.value, o.icon])
);

const defaultActivityTypes: ActivityTypeDefinition[] = [
  { id: "call", name: "Call", icon: "phone", color: "bg-blue-500", description: "Phone call" },
  { id: "email", name: "Email", icon: "mail", color: "bg-green-500", description: "Send email" },
  { id: "meeting", name: "Meeting", icon: "calendar", color: "bg-orange-500", description: "Meeting / Appointment" },
  { id: "note", name: "Note", icon: "message", color: "bg-purple-500", description: "Note" },
];

interface ActivityTypesState {
  activityTypes: ActivityTypeDefinition[];
  addActivityType: (type: ActivityTypeDefinition) => void;
  updateActivityType: (id: string, type: Partial<ActivityTypeDefinition>) => void;
  removeActivityType: (id: string) => void;
  reorderActivityTypes: (types: ActivityTypeDefinition[]) => void;
}

export const useActivityTypesStore = create<ActivityTypesState>((set) => ({
  activityTypes: defaultActivityTypes,
  addActivityType: (type) =>
    set((state) => ({ activityTypes: [...state.activityTypes, type] })),
  updateActivityType: (id, updated) =>
    set((state) => ({
      activityTypes: state.activityTypes.map((t) => (t.id === id ? { ...t, ...updated } : t)),
    })),
  removeActivityType: (id) =>
    set((state) => ({ activityTypes: state.activityTypes.filter((t) => t.id !== id) })),
  reorderActivityTypes: (types) => set({ activityTypes: types }),
}));
