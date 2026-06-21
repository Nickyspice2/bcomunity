import { DashboardLayout }     from "@/components/layout/DashboardLayout";
import { MarketplaceContent }  from "@/features/marketplace/components/MarketplaceContent";

export const metadata = {
  title: "მოტო-ბაზარი — GeoMotoRoutes",
  description: "ბიკერიდან ბიკერისთვის — ყიდვა-გაყიდვა მოტოციკლებზე, ეკიპირებაზე და ნაწილებზე.",
};

export default function MarketplacePage(): React.ReactElement {
  return (
    <DashboardLayout>
      <MarketplaceContent />
    </DashboardLayout>
  );
}
