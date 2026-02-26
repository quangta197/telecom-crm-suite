import { create } from "zustand";

export interface OpportunityStageDefinition {
  id: string;
  label: string;
  color: string;
  description: string;
}

const defaultStages: OpportunityStageDefinition[] = [
  { id: "discovery", label: "Discovery", color: "bg-slate-500", description: "Đang tìm hiểu nhu cầu" },
  { id: "qualification", label: "Qualification", color: "bg-blue-500", description: "Đánh giá khả năng" },
  { id: "proposal", label: "Proposal", color: "bg-yellow-500", description: "Đã gửi đề xuất" },
  { id: "negotiation", label: "Negotiation", color: "bg-orange-500", description: "Đang đàm phán" },
  { id: "closed-won", label: "Closed Won", color: "bg-green-500", description: "Thắng hợp đồng" },
  { id: "closed-lost", label: "Closed Lost", color: "bg-red-500", description: "Mất cơ hội" },
];

interface OpportunityStagesState {
  stages: OpportunityStageDefinition[];
  addStage: (stage: OpportunityStageDefinition) => void;
  updateStage: (id: string, stage: Partial<OpportunityStageDefinition>) => void;
  removeStage: (id: string) => void;
  reorderStages: (stages: OpportunityStageDefinition[]) => void;
}

export const useOpportunityStagesStore = create<OpportunityStagesState>((set) => ({
  stages: defaultStages,
  addStage: (stage) => set((s) => ({ stages: [...s.stages, stage] })),
  updateStage: (id, updated) =>
    set((s) => ({ stages: s.stages.map((st) => (st.id === id ? { ...st, ...updated } : st)) })),
  removeStage: (id) => set((s) => ({ stages: s.stages.filter((st) => st.id !== id) })),
  reorderStages: (stages) => set({ stages }),
}));
