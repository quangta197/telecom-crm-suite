import { create } from "zustand";

export interface ContactRoleDefinition {
  id: string;
  name: string;
  description: string;
}

const defaultRoles: ContactRoleDefinition[] = [
  { id: "decision-maker", name: "Decision Maker", description: "Người ra quyết định" },
  { id: "technical-lead", name: "Technical Lead", description: "Người phụ trách kỹ thuật" },
  { id: "influencer", name: "Influencer", description: "Người ảnh hưởng đến quyết định" },
  { id: "end-user", name: "End User", description: "Người dùng cuối" },
  { id: "procurement", name: "Procurement", description: "Bộ phận mua sắm" },
];

interface ContactRolesState {
  roles: ContactRoleDefinition[];
  addRole: (role: ContactRoleDefinition) => void;
  updateRole: (id: string, role: Partial<ContactRoleDefinition>) => void;
  removeRole: (id: string) => void;
  reorderRoles: (roles: ContactRoleDefinition[]) => void;
}

export const useContactRolesStore = create<ContactRolesState>((set) => ({
  roles: defaultRoles,
  addRole: (role) => set((s) => ({ roles: [...s.roles, role] })),
  updateRole: (id, updated) =>
    set((s) => ({ roles: s.roles.map((r) => (r.id === id ? { ...r, ...updated } : r)) })),
  removeRole: (id) => set((s) => ({ roles: s.roles.filter((r) => r.id !== id) })),
  reorderRoles: (roles) => set({ roles }),
}));
