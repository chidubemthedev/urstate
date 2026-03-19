import { create } from "zustand";

interface LeaseState {
  selectedLeaseId: string | null;

  // Actions
  selectLease: (id: string | null) => void;
  clearSelection: () => void;
}

export const useLeaseStore = create<LeaseState>((set) => ({
  selectedLeaseId: null,

  selectLease: (id) => set({ selectedLeaseId: id }),
  clearSelection: () => set({ selectedLeaseId: null }),
}));
