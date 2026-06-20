"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type {
  AuthContextValue,
  AuthModalTab,
  AuthUser,
  LoginCredentials,
  RegisterCredentials,
} from "@/features/auth/types";

// ─── Context ─────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextValue | null>(null);

// ─── Provider ────────────────────────────────────────────────────────────────

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps): React.ReactElement {
  const [user,        setUser]        = useState<AuthUser | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTab,    setModalTab]    = useState<AuthModalTab>("login");

  const openModal = useCallback((tab: AuthModalTab = "login") => {
    setModalTab(tab);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  /**
   * Mock login — accepts any non-empty credentials and resolves immediately.
   * Replace with a real API call in production.
   */
  const login = useCallback(async ({ email }: LoginCredentials): Promise<void> => {
    const mockUser: AuthUser = {
      id:              `u-${Date.now()}`,
      name:            email.split("@")[0] ?? "ბიკერი",
      email,
      motorcycleModel: "",
      joinedAt:        new Date().toISOString(),
    };
    setUser(mockUser);
    setIsModalOpen(false);
  }, []);

  /**
   * Mock registration — creates a local user object from the supplied fields.
   * Replace with a real API call in production.
   */
  const register = useCallback(async (credentials: RegisterCredentials): Promise<void> => {
    const mockUser: AuthUser = {
      id:              `u-${Date.now()}`,
      name:            credentials.name,
      email:           credentials.email,
      motorcycleModel: credentials.motorcycleModel,
      joinedAt:        new Date().toISOString(),
    };
    setUser(mockUser);
    setIsModalOpen(false);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const value: AuthContextValue = {
    user,
    isAuthenticated: user !== null,
    isModalOpen,
    modalTab,
    openModal,
    closeModal,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ─── Consumer hook ────────────────────────────────────────────────────────────

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside <AuthProvider>");
  }
  return ctx;
}
