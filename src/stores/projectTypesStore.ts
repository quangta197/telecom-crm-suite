import { create } from "zustand";

export interface ProjectTypeDefinition {
  id: string;
  name: string;
  color: string;
  description: string;
}

const defaultTypes: ProjectTypeDefinition[] = [
  { id: "implementation", name: "Triển khai", color: "bg-blue-500", description: "Dự án triển khai sản phẩm/dịch vụ" },
  { id: "maintenance", name: "Bảo trì", color: "bg-green-500", description: "Dự án bảo trì, hỗ trợ kỹ thuật" },
  { id: "consulting", name: "Tư vấn", color: "bg-purple-500", description: "Dự án tư vấn giải pháp" },
  { id: "internal", name: "Nội bộ", color: "bg-orange-500", description: "Dự án nội bộ công ty" },
  { id: "research", name: "Nghiên cứu", color: "bg-yellow-500", description: "Dự án nghiên cứu, phát triển" },
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
