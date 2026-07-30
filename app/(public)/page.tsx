import Category from "@/features/home/components/Category";
import CTA from "@/features/home/components/CTA";
import Hero from "@/features/home/components/Hero";
import HowItWork from "@/features/home/components/HowItWork";

const CATEGORIES = [
    { label: "Cricket", tag: "01" },
    { label: "Football", tag: "02" },
    { label: "Cycling", tag: "03" },
    { label: "Camping & Hiking", tag: "04" },
    { label: "Fitness & Gym", tag: "05" },
    { label: "Swimming", tag: "06" },
];

export default function HomePage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Hero />
            <Category categories={CATEGORIES} />
            <HowItWork />
            <CTA />
        </div>
    );
}
