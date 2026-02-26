import { create } from "zustand";

export interface QuotationTemplate {
  id: number;
  name: string;
  description: string;
  isDefault: boolean;
}

const defaultTemplates: QuotationTemplate[] = [
  { id: 1, name: "Enterprise Internet Package", description: "Template for B2B Internet packages", isDefault: true },
  { id: 2, name: "PBX Solution", description: "Template for VoIP and Cloud PBX quotations", isDefault: false },
  { id: 3, name: "Cloud Services", description: "Template for Cloud hosting, VPS services", isDefault: false },
  { id: 4, name: "Telecom Combo", description: "Template for Internet + Phone combo packages", isDefault: false },
];

interface QuotationTemplatesState {
  templates: QuotationTemplate[];
  addTemplate: (template: QuotationTemplate) => void;
  updateTemplate: (id: number, data: Partial<QuotationTemplate>) => void;
  removeTemplate: (id: number) => void;
  reorderTemplates: (templates: QuotationTemplate[]) => void;
  setDefault: (id: number) => void;
}

export const useQuotationTemplatesStore = create<QuotationTemplatesState>((set) => ({
  templates: defaultTemplates,
  addTemplate: (template) =>
    set((state) => ({ templates: [...state.templates, template] })),
  updateTemplate: (id, data) =>
    set((state) => ({
      templates: state.templates.map((t) => (t.id === id ? { ...t, ...data } : t)),
    })),
  removeTemplate: (id) =>
    set((state) => ({ templates: state.templates.filter((t) => t.id !== id) })),
  reorderTemplates: (templates) => set({ templates }),
  setDefault: (id) =>
    set((state) => ({
      templates: state.templates.map((t) => ({ ...t, isDefault: t.id === id })),
    })),
}));
