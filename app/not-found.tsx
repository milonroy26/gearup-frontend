import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, PackageSearch, SearchX } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
    return (
        <section className="px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto flex min-h-[calc(100vh-12rem)] max-w-3xl items-center justify-center">
                <Card className="w-full">
                    <CardContent className="p-8 text-center sm:p-10">
                        <div className="mx-auto flex size-16 items-center justify-center rounded-md border border-emerald-500/25 bg-emerald-500/10 text-emerald-600 dark:text-emerald-300">
                            <SearchX className="size-9" strokeWidth={1.8} />
                        </div>

                        <p className="mt-6 text-xs font-semibold uppercase text-emerald-700 dark:text-emerald-300">404 / Route not found</p>
                        <h1 className="mt-3 font-heading text-4xl font-bold text-foreground sm:text-5xl">This gear is off the rack</h1>
                        <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
                            The page you are looking for does not exist, may have moved, or is no longer available in GearUp.
                        </p>

                        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                            <Button asChild variant="flag" className="rounded-md">
                                <Link href="/">
                                    <Home className="size-4" strokeWidth={1.8} />
                                    Return Home
                                </Link>
                            </Button>
                            <Button asChild variant="outline" className="rounded-md">
                                <Link href="/gear">
                                    <PackageSearch className="size-4" strokeWidth={1.8} />
                                    Browse Gear
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}
