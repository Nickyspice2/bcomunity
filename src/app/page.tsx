import { DashboardLayout } from "@/components/layout/DashboardLayout";

/**
 * Root page — renders the full-viewport map dashboard.
 * All interactivity lives inside DashboardLayout (client boundary).
 */
export default function HomePage(): React.ReactElement {
  return <DashboardLayout />;
}
