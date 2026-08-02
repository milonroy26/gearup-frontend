import { getAllCategories } from "@/features/gear/action/gear.action";
import Category from "@/features/home/components/Category";
import CTA from "@/features/home/components/CTA";
import Hero from "@/features/home/components/Hero";
import HowItWork from "@/features/home/components/HowItWork";

// const CATEGORIES = [
//     { label: "Cricket", tag: "01" },
//     { label: "Football", tag: "02" },
//     { label: "Cycling", tag: "03" },
//     { label: "Camping & Hiking", tag: "04" },
//     { label: "Fitness & Gym", tag: "05" },
//     { label: "Swimming", tag: "06" },
// ];

export default async function HomePage() {

    const res = await getAllCategories();
    if (!res.success || !res.data) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
                <h1 className="text-3xl font-bold">Something went wrong</h1>
            </div>
        );
    }
    const categories = res.data;

    return (
        <div className="flex min-h-screen flex-col">
            <Hero />
            <Category categories={categories} />
            <HowItWork />
            <CTA />
        </div>
    );
}
