import { create } from "zustand";

interface User {
  id?: Number;
  sid?: string;
  username?: string;
  batch?: string;
  dept?: string;
  email?: string;
  role?: "teacher" | "student" | "admin";
  number?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token?: String | null;
}

interface AuthAction {
  setUser: (user: User) => void;
  logout: () => void;
  updateUserDetails: (details: Partial<User>) => void;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  token: null,
};
export const useAuthStore = create<AuthState & AuthAction>((set) => ({
  ...initialState,
  setUser: (user) => set({ user, isAuthenticated: true }),
  logout: () => set(initialState),
  updateUserDetails: (details) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...details } : null,
    })),
}));
