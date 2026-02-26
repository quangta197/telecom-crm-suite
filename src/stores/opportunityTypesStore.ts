import { create } from "zustand";

export interface OpportunityTypeDefinition {
  id: string;
  name: string;
  color: string;
  description: string;
}

const defaultTypes: OpportunityTypeDefinition[] = [
  { id: "new-customer", name: "New Customer", color: "bg-blue-500", description: "New customer acquisition" },
  { id: "existing-customer", name: "Existing Customer", color: "bg-green-500", description: "Existing customer expansion" },
  { id: "upsell", name: "Upsell", color: "bg-orange-500", description: "Upsell additional products/services" },
  { id: "cross-sell", name: "Cross-sell", color: "bg-purple-500", description: "Cross-sell related products/services" },
  { id: "renewal", name: "Renewal", color: "bg-yellow-500", description: "Contract renewal" },
];

interface OpportunityTypesState {
  types: OpportunityTypeDefinition[];
  addType: (t: OpportunityTypeDefinition) => void;
  updateType: (id: string, t: Partial<OpportunityTypeDefinition>) => void;
  removeType: (id: string) => void;
  reorderTypes: (types: OpportunityTypeDefinition[]) => void;
}

export const useOpportunityTypesStore = create<OpportunityTypesState>((set) => ({
  types: defaultTypes,
  addType: (t) => set((s) => ({ types: [...s.types, t] })),
  updateType: (id, updated) =>
    set((s) => ({ types: s.types.map((t) => (t.id === id ? { ...t, ...updated } : t)) })),
  removeType: (id) => set((s) => ({ types: s.types.filter((t) => t.id !== id) })),
  reorderTypes: (types) => set({ types }),
}));
