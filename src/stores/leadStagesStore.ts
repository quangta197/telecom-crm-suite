import { create } from "zustand";

export interface LeadStageDefinition {
  id: string;
  label: string;
  color: string;
  description: string;
}

const defaultStages: LeadStageDefinition[] = [
  { id: "new", label: "New", color: "bg-slate-500", description: "Lead mới tiếp nhận" },
  { id: "contacted", label: "Contacted", color: "bg-blue-500", description: "Đã liên hệ" },
  { id: "qualified", label: "Qualified", color: "bg-orange-500", description: "Đã đánh giá đủ điều kiện" },
  { id: "converted", label: "Converted", color: "bg-green-500", description: "Đã chuyển đổi thành cơ hội" },
];

interface LeadStagesState {
  stages: LeadStageDefinition[];
  addStage: (stage: LeadStageDefinition) => void;
  updateStage: (id: string, stage: Partial<LeadStageDefinition>) => void;
  removeStage: (id: string) => void;
  reorderStages: (stages: LeadStageDefinition[]) => void;
}

export const useLeadStagesStore = create<LeadStagesState>((set) => ({
  stages: defaultStages,
  addStage: (stage) => set((s) => ({ stages: [...s.stages, stage] })),
  updateStage: (id, updated) =>
    set((s) => ({ stages: s.stages.map((st) => (st.id === id ? { ...st, ...updated } : st)) })),
  removeStage: (id) => set((s) => ({ stages: s.stages.filter((st) => st.id !== id) })),
  reorderStages: (stages) => set({ stages }),
}));
