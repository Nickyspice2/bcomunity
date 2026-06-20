"use client";

import type { ReactNode } from "react";
import { AuthProvider } from "@/features/auth/context/AuthContext";
import { AuthModal }    from "@/features/auth/components/AuthModal";
import { TopBar }       from "./TopBar";

interface ProvidersProps {
  children: ReactNode;
}

/**
 * Client-side provider shell that wraps the entire app.
 * Lives inside the server root layout so fonts/metadata stay in a Server Component
 * while all context and interactive chrome (TopBar, AuthModal) run on the client.
 */
export function Providers({ children }: ProvidersProps): React.ReactElement {
  return (
    <AuthProvider>
      {/* Fixed top navigation — rendered on every page */}
      <TopBar />
      {/* Auth modal — self-manages visibility via AuthContext */}
      <AuthModal />
      {children}
    </AuthProvider>
  );
}
