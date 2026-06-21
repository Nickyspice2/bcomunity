import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { HubContent }      from "@/features/hub/components/HubContent";

export const metadata = {
  title: "მოტო-ჰაბი — GeoMotoRoutes",
  description:
    "ქართველი ბიკერების სერვის-დირექტორია: სანდო მექანიკოსები, საბურავები, " +
    "ბუქსირი — ქალაქებისა და მარშრუტების ჩატებთან ერთად.",
};

export default function HubPage(): React.ReactElement {
  return (
    <DashboardLayout>
      <HubContent />
    </DashboardLayout>
  );
}
