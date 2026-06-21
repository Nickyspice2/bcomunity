import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MapPageWrapper }  from "@/features/map/components/MapPageWrapper";

export const metadata = {
  title: "ინტერაქტიული რუკა — GeoMotoRoutes",
};

/**
 * Dedicated full-screen map route.
 * DashboardLayout provides the pt-16 + h-screen overflow-hidden frame;
 * MapPageWrapper fills the remaining height with the Leaflet map.
 */
export default function MapPage(): React.ReactElement {
  return (
    <DashboardLayout>
      <MapPageWrapper />
    </DashboardLayout>
  );
}
