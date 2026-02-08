// import { AuthResponse } from "@/types/registrationType";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  user: null;
  token: string | null;
  refreshToken: string | null;
  setUser: (user: any) => void;
  setToken: (token: string) => void;
  setRefreshToken: (refreshToken: string) => void;
  registerStep: number;
  setRegisterStep: (step: number) => void;
  passwordType: "password" | "text";
  setPasswordType: (passwordType: "password" | "text") => void;
  confirmPasswordType: "password" | "text";
  setConfirmPasswordType: (confirmPasswordType: "password" | "text") => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      refreshToken: null,
      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      setRefreshToken: (refreshToken) => set({ refreshToken }),
      registerStep: 1,
      setRegisterStep: (step) => set({ registerStep: step }),
      passwordType: "password",
      setPasswordType: (passwordType) => set({ passwordType }),
      confirmPasswordType: "password",
      setConfirmPasswordType: (confirmPasswordType) =>
        set({ confirmPasswordType }),
      logout: () => set({ user: null, token: null, refreshToken: null }),
    }),
    {
      name: "auth-storage", // LocalStorage key
    },
  ),
);
