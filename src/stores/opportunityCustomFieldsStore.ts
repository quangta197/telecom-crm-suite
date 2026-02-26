import { create } from "zustand";

export type FieldType = "text" | "number" | "date" | "select" | "textarea";

export interface OpportunityCustomField {
  id: string;
  label: string;
  type: FieldType;
  options?: string[]; // for select type
  required: boolean;
  order: number;
}

interface OpportunityCustomFieldsState {
  fields: OpportunityCustomField[];
  addField: (field: OpportunityCustomField) => void;
  updateField: (id: string, field: Partial<OpportunityCustomField>) => void;
  removeField: (id: string) => void;
  reorderFields: (fields: OpportunityCustomField[]) => void;
}

const defaultFields: OpportunityCustomField[] = [
  { id: "industry", label: "Industry", type: "text", required: false, order: 0 },
  { id: "company-size", label: "Company Size", type: "select", options: ["1-10", "11-50", "51-200", "201-500", "500+"], required: false, order: 1 },
  { id: "competitor", label: "Competitor", type: "text", required: false, order: 2 },
];

export const useOpportunityCustomFieldsStore = create<OpportunityCustomFieldsState>((set) => ({
  fields: defaultFields,
  addField: (field) => set((s) => ({ fields: [...s.fields, field] })),
  updateField: (id, updated) =>
    set((s) => ({ fields: s.fields.map((f) => (f.id === id ? { ...f, ...updated } : f)) })),
  removeField: (id) => set((s) => ({ fields: s.fields.filter((f) => f.id !== id) })),
  reorderFields: (fields) => set({ fields }),
}));
