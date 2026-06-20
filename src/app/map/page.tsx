import { MapPageWrapper } from "@/features/map/components/MapPageWrapper";

export const metadata = {
  title: "ინტერაქტიული რუკა — GeoMotoRoutes",
};

/**
 * Dedicated full-screen map route.
 * All interactivity runs inside MapPageWrapper (client boundary).
 */
export default function MapPage(): React.ReactElement {
  return (
    <div className="pt-16 h-screen overflow-hidden">
      <MapPageWrapper />
    </div>
  );
}
