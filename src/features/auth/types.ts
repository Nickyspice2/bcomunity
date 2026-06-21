// ─── Domain types for the auth feature ───────────────────────────────────────

export interface AuthUser {
  id:              string;
  name:            string;
  email:           string;
  motorcycleModel: string;
  /** CSS colour string used to generate the initials avatar. */
  avatarColor:     string;
  /** ISO 8601 timestamp */
  joinedAt:        string;
}

export type AuthModalTab = "login" | "register";

export interface LoginCredentials {
  email:    string;
  password: string;
}

export interface RegisterCredentials {
  name:            string;
  email:           string;
  motorcycleModel: string;
  password:        string;
}

// ─── Context value shape ──────────────────────────────────────────────────────

export interface AuthContextValue {
  user:             AuthUser | null;
  isAuthenticated:  boolean;
  isModalOpen:      boolean;
  modalTab:         AuthModalTab;
  openModal:        (tab?: AuthModalTab) => void;
  closeModal:       () => void;
  login:            (credentials: LoginCredentials)  => Promise<void>;
  register:         (credentials: RegisterCredentials) => Promise<void>;
  logout:           () => void;
}
