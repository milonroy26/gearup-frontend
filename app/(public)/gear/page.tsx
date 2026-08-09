import { getAllGears } from "@/features/gear/action/gear.action";
import GearCard from "@/features/gear/components/GearCard";
import GearFilter from "@/features/gear/components/GearFilter";

interface GearPageProps {
    searchParams: Promise<{
        query?: string;
        minPrice?: string;
        maxPrice?: string;
        categoryId?: string;
        sortBy?: string;
        sortOrder?: string;
    }>;
}

export default async function GearListingPage({ searchParams }: GearPageProps) {
    const query = await searchParams;
    const res = await getAllGears({
        minPrice: query.minPrice,
        maxPrice: query.maxPrice,
        categoryId: query.categoryId,
        sortBy: query.sortBy,
        sortOrder: query.sortOrder,
    });

    const searchQuery = query.query?.trim().toLowerCase();
    const selectedCategoryId = query.categoryId?.trim();
    const gears = (res.data || []).filter((gear) => {
        if (selectedCategoryId && gear.categoryId !== selectedCategoryId) {
            return false;
        }

        if (!searchQuery) {
            return true;
        }

        return [gear.title, gear.brand, gear.description].some((value) =>
            value.toLowerCase().includes(searchQuery)
        );
    });

    return (
        <div className="min-h-[calc(100vh-4rem)] bg-background text-foreground">
            <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                <div className="mb-8 flex flex-col gap-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-600 dark:text-emerald-300">
                        Rental Marketplace
                    </p>
                    <h1 className="font-heading text-4xl font-bold uppercase tracking-normal">
                        Browse Gear
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        {gears.length} item{gears.length === 1 ? "" : "s"} available right now
                    </p>
                </div>

                <div className="space-y-8">
                    <GearFilter />

                    <section>
                        {gears.length > 0 ? (
                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                                {gears.map((gear) => (
                                    <GearCard key={gear.id} gear={gear} />
                                ))}
                            </div>
                        ) : (
                            <div className="flex min-h-44 flex-col items-center justify-center border border-border bg-card px-6 py-12 text-center">
                                <p className="font-heading text-lg font-bold uppercase tracking-normal">
                                    Nothing Here Yet
                                </p>
                                <p className="mt-2 text-sm text-muted-foreground">
                                    Try a different search keyword, price range, or sort option.
                                </p>
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </div>
    );
}
