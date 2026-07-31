import { getAllCategories } from "@/features/gear/action/gear.action";
import ProviderGearForm from "@/features/provider/components/ProviderGearForm";

export default async function AddGearPage() {
    const categoriesRes = await getAllCategories();
    const categories = categoriesRes.data || [];

    return <ProviderGearForm categories={categories} />;
}
