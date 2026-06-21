"use client";

import {
  useState,
  useEffect,
  useRef,
  type FormEvent,
  type ChangeEvent,
} from "react";
import { X, Map, Mail, Lock, User, Bike, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/features/auth/context/AuthContext";
import { KA } from "@/lib/i18n/ka";
import { cn } from "@/lib/utils";

// ─── Field component ──────────────────────────────────────────────────────────

interface FieldProps {
  label:       string;
  type?:       string;
  value:       string;
  onChange:    (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  icon:        React.ReactNode;
  autoComplete?: string;
}

function Field({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  icon,
  autoComplete,
}: FieldProps): React.ReactElement {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType  = isPassword && showPassword ? "text" : type;

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-zinc-400 tracking-wide">
        {label}
      </label>
      <div className="relative flex items-center">
        <span className="absolute left-3 text-zinc-500" aria-hidden="true">
          {icon}
        </span>
        <input
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required
          className={cn(
            "h-10 w-full rounded-xl bg-zinc-800/70 pl-9 pr-4 text-sm text-zinc-200",
            "placeholder:text-zinc-600 border border-zinc-700",
            "focus:outline-none focus:border-amber-500/60 focus:ring-2 focus:ring-amber-500/20",
            "transition-all duration-150",
            isPassword && "pr-10"
          )}
        />
        {isPassword && (
          <button
            type="button"
            aria-label="პაროლის ჩვენება"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3 text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Main modal ───────────────────────────────────────────────────────────────

export function AuthModal(): React.ReactElement | null {
  const { isModalOpen, modalTab, openModal, closeModal, login, register } = useAuth();

  // Derive the active tab directly from context — no local copy needed.
  const tab = modalTab;

  const [email,     setEmail]     = useState("");
  const [password,  setPassword]  = useState("");
  const [name,      setName]      = useState("");
  const [motoModel, setMotoModel] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error,     setError]     = useState<string | null>(null);

  const backdropRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    if (!isModalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isModalOpen, closeModal]);

  // Prevent background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isModalOpen]);

  if (!isModalOpen) return null;

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      await login({ email, password });
    } catch {
      setError("შეცდომა. გთხოვთ თავიდან სცადოთ.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      await register({ name, email, motorcycleModel: motoModel, password });
    } catch {
      setError("შეცდომა. გთხოვთ თავიდან სცადოთ.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    /* Backdrop */
    <div
      ref={backdropRef}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.72)", backdropFilter: "blur(6px)" }}
      onPointerDown={(e) => {
        if (e.target === backdropRef.current) closeModal();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={tab === "login" ? KA.authWelcomeBack : KA.authJoinCommunity}
    >
      <div
        className={cn(
          "relative w-full max-w-sm rounded-2xl overflow-hidden",
          "bg-[var(--color-surface-card)]",
          "border border-[var(--color-surface-border)]",
          "shadow-[0_24px_64px_rgba(0,0,0,0.7)]",
          "animate-fade-up"
        )}
      >
        {/* ── Gradient header ── */}
        <div className="relative flex flex-col items-center gap-2 px-6 pt-8 pb-6 bg-gradient-to-b from-amber-500/10 to-transparent">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 shadow-[0_0_20px_rgba(245,158,11,0.5)]">
            <Map size={18} className="text-zinc-900" strokeWidth={2.5} />
          </div>
          <h2 className="text-base font-bold text-zinc-100">
            GeoMoto<span className="text-amber-400">Routes</span>
          </h2>
          <p className="text-xs text-zinc-500">
            {tab === "login" ? KA.authWelcomeBack : KA.authJoinCommunity}
          </p>

          {/* Close */}
          <button
            type="button"
            aria-label={KA.authClose}
            onClick={closeModal}
            className="absolute top-4 right-4 rounded-lg p-1.5 text-zinc-500 hover:bg-white/5 hover:text-zinc-300 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* ── Tab switcher ── */}
        <div className="flex mx-6 mb-5 rounded-xl overflow-hidden border border-[var(--color-surface-border)] bg-[var(--color-surface-overlay)]">
          {(["login", "register"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => { openModal(t); setError(null); }}
              className={cn(
                "flex-1 py-2 text-xs font-semibold transition-all duration-150",
                tab === t
                  ? "bg-amber-500/20 text-amber-400 shadow-[inset_0_0_0_1px_rgba(245,158,11,0.25)]"
                  : "text-zinc-500 hover:text-zinc-300"
              )}
            >
              {t === "login" ? KA.authTabLogin : KA.authTabRegister}
            </button>
          ))}
        </div>

        {/* ── Forms ── */}
        <div className="px-6 pb-6">
          {error && (
            <div className="mb-4 rounded-lg bg-red-900/30 border border-red-500/30 px-3 py-2 text-xs text-red-400">
              {error}
            </div>
          )}

          {tab === "login" ? (
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <Field
                label={KA.authEmailLabel}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={KA.authEmailPlaceholder}
                icon={<Mail size={15} />}
                autoComplete="email"
              />
              <Field
                label={KA.authPasswordLabel}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={KA.authPasswordPlaceholder}
                icon={<Lock size={15} />}
                autoComplete="current-password"
              />

              <div className="flex justify-end">
                <button type="button" className="text-[11px] text-zinc-600 hover:text-amber-400 transition-colors">
                  {KA.authForgotPassword}
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={cn(
                  "h-10 w-full rounded-xl text-sm font-semibold text-zinc-900",
                  "bg-gradient-to-r from-amber-500 to-orange-500",
                  "hover:from-amber-400 hover:to-orange-400",
                  "shadow-[0_0_16px_rgba(245,158,11,0.35)] hover:shadow-[0_0_24px_rgba(245,158,11,0.5)]",
                  "transition-all duration-150 active:scale-[0.98]",
                  "disabled:opacity-60 disabled:cursor-not-allowed"
                )}
              >
                {isLoading ? "…" : KA.authLoginCTA}
              </button>

              <p className="text-center text-[11px] text-zinc-600">
                {KA.authSwitchToRegister}{" "}
                <button type="button" onClick={() => openModal("register")} className="text-amber-400 hover:underline">
                  {KA.authTabRegister}
                </button>
              </p>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="flex flex-col gap-4">
              <Field
                label={KA.authNameLabel}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={KA.authNamePlaceholder}
                icon={<User size={15} />}
                autoComplete="name"
              />
              <Field
                label={KA.authEmailLabel}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={KA.authEmailPlaceholder}
                icon={<Mail size={15} />}
                autoComplete="email"
              />
              <Field
                label={KA.authMotoLabel}
                value={motoModel}
                onChange={(e) => setMotoModel(e.target.value)}
                placeholder={KA.authMotoPlaceholder}
                icon={<Bike size={15} />}
                autoComplete="off"
              />
              <Field
                label={KA.authPasswordLabel}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={KA.authPasswordPlaceholder}
                icon={<Lock size={15} />}
                autoComplete="new-password"
              />

              <button
                type="submit"
                disabled={isLoading}
                className={cn(
                  "h-10 w-full rounded-xl text-sm font-semibold text-zinc-900",
                  "bg-gradient-to-r from-amber-500 to-orange-500",
                  "hover:from-amber-400 hover:to-orange-400",
                  "shadow-[0_0_16px_rgba(245,158,11,0.35)] hover:shadow-[0_0_24px_rgba(245,158,11,0.5)]",
                  "transition-all duration-150 active:scale-[0.98]",
                  "disabled:opacity-60 disabled:cursor-not-allowed"
                )}
              >
                {isLoading ? "…" : KA.authRegisterCTA}
              </button>

              <p className="text-center text-[11px] text-zinc-600">
                {KA.authSwitchToLogin}{" "}
                <button type="button" onClick={() => openModal("login")} className="text-amber-400 hover:underline">
                  {KA.authTabLogin}
                </button>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
