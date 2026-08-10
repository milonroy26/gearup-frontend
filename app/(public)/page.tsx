import { getAllCategories, getAllGears } from "@/features/gear/action/gear.action";
import Category from "@/features/home/components/Category";
import CTA from "@/features/home/components/CTA";
import FeaturedGear from "@/features/home/components/FeaturedGear";
import Hero from "@/features/home/components/Hero";
import HowItWork from "@/features/home/components/HowItWork";
import Ourmission from "@/features/home/components/Ourmission";

export default async function HomePage() {

    const [categoryRes, gearRes] = await Promise.all([
        getAllCategories(),
        getAllGears(),
    ]);

    if (!categoryRes.success || !categoryRes.data) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
                <h1 className="text-3xl font-bold">Something went wrong</h1>
            </div>
        );
    }
    const categories = categoryRes.data;
    const availableGears = (gearRes.data || []).filter((gear) => gear.isAvailable && gear.stock > 0);
    const heroFeaturedGears = availableGears.slice(0, 5);
    const featuredGears = availableGears.slice(0, 3);

    return (
        <div className="flex min-h-screen flex-col">
            <Hero featuredGears={heroFeaturedGears} />
            <Category categories={categories} />
            <FeaturedGear gears={featuredGears} />
            <HowItWork />
            <Ourmission />
            <CTA />
        </div>
    );
}
