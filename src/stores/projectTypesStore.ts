import { create } from "zustand";

export interface ProjectTypeDefinition {
  id: string;
  name: string;
  color: string;
  description: string;
}

const defaultTypes: ProjectTypeDefinition[] = [
  { id: "implementation", name: "Implementation", color: "bg-blue-500", description: "Product/service deployment projects" },
  { id: "maintenance", name: "Maintenance", color: "bg-green-500", description: "Technical maintenance and support" },
  { id: "consulting", name: "Consulting", color: "bg-purple-500", description: "Solution consulting projects" },
  { id: "internal", name: "Internal", color: "bg-orange-500", description: "Internal company projects" },
  { id: "research", name: "Research", color: "bg-yellow-500", description: "Research and development projects" },
];

interface ProjectTypesState {
  types: ProjectTypeDefinition[];
  addType: (t: ProjectTypeDefinition) => void;
  updateType: (id: string, t: Partial<ProjectTypeDefinition>) => void;
  removeType: (id: string) => void;
  reorderTypes: (types: ProjectTypeDefinition[]) => void;
}

export const useProjectTypesStore = create<ProjectTypesState>((set) => ({
  types: defaultTypes,
  addType: (t) => set((s) => ({ types: [...s.types, t] })),
  updateType: (id, updated) =>
    set((s) => ({ types: s.types.map((t) => (t.id === id ? { ...t, ...updated } : t)) })),
  removeType: (id) => set((s) => ({ types: s.types.filter((t) => t.id !== id) })),
  reorderTypes: (types) => set({ types }),
}));
