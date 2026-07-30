import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const CTA = () => {
    return (
        <section className="bg-[linear-gradient(135deg,#fff7ed_0%,#fefce8_50%,#ecfdf5_100%)] py-20 text-center dark:bg-[linear-gradient(135deg,#241407_0%,#1f1d0b_52%,#072016_100%)]">
            <div className="mx-auto max-w-7xl px-5 lg:px-8">
                <h2 className="mx-auto max-w-3xl font-heading text-3xl font-bold text-foreground md:text-5xl">
                    Your next match doesn&apos;t need a shopping cart.
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                    Rent what you need, when you need it, and keep your storage space for trophies.
                </p>
                <Link href="/gear" className="mt-7 inline-block">
                    <Button variant="flag" size="lg" className="rounded-md px-5">
                        Find gear near you <ArrowRight className="size-4" />
                    </Button>
                </Link>
            </div>
        </section>
    );
};

export default CTA;
