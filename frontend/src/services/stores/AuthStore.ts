import { create } from "zustand";
import { AdminAuthenticated } from "@/services/graphql/types/codegen";

type AuthStore = {
    admin: AdminAuthenticated | null;
    setAdmin: (admin: AdminAuthenticated) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
    admin: null,
    setAdmin: (admin: AdminAuthenticated) => set({ admin }),
}));
