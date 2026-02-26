import { create } from "zustand";

export interface LeadSourceDefinition {
  id: string;
  name: string;
  color: string;
  description: string;
}

const defaultSources: LeadSourceDefinition[] = [
  { id: "website", name: "Website", color: "bg-blue-500", description: "From company website" },
  { id: "referral", name: "Referral", color: "bg-green-500", description: "Customer referral" },
  { id: "social", name: "Social Media", color: "bg-purple-500", description: "Social media channels" },
  { id: "cold-call", name: "Cold Call", color: "bg-orange-500", description: "Direct cold calling" },
  { id: "event", name: "Event", color: "bg-pink-500", description: "Events and seminars" },
  { id: "partner", name: "Partner", color: "bg-yellow-500", description: "Partner referral" },
];

interface LeadSourcesState {
  sources: LeadSourceDefinition[];
  addSource: (source: LeadSourceDefinition) => void;
  updateSource: (id: string, source: Partial<LeadSourceDefinition>) => void;
  removeSource: (id: string) => void;
  reorderSources: (sources: LeadSourceDefinition[]) => void;
}

export const useLeadSourcesStore = create<LeadSourcesState>((set) => ({
  sources: defaultSources,
  addSource: (source) => set((s) => ({ sources: [...s.sources, source] })),
  updateSource: (id, updated) =>
    set((s) => ({ sources: s.sources.map((src) => (src.id === id ? { ...src, ...updated } : src)) })),
  removeSource: (id) => set((s) => ({ sources: s.sources.filter((src) => src.id !== id) })),
  reorderSources: (sources) => set({ sources }),
}));
