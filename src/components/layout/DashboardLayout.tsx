/**
 * @deprecated The app now uses src/components/layout/Providers.tsx as the
 * client shell and individual page files (app/page.tsx, app/map/page.tsx)
 * for layout. This file is kept to avoid breaking any accidental imports
 * during the transition but it is not used by any active route.
 */
export function DashboardLayout(): React.ReactElement {
  return <></>;
}
