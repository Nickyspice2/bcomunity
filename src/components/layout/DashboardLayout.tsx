import type { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

/**
 * Full-viewport layout frame — sits beneath the fixed TopBar (h-16 / 64px).
 * Provides h-screen overflow-hidden flex-col so child content can manage
 * its own internal scrolling without the outer viewport scrolling.
 */
export function DashboardLayout({ children }: DashboardLayoutProps): React.ReactElement {
  return (
    <div className="h-screen overflow-hidden flex flex-col pt-16">
      {children}
    </div>
  );
}
