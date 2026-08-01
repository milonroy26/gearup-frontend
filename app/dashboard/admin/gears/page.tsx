import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getAdminAllGears } from "@/features/admin/actions/admin.action";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

export default async function AdminGearListingsPage() {
    const res = await getAdminAllGears();
    const gears = res.data || [];

    return (
        <section className="px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl space-y-6">
                <Link href="/dashboard/admin" className="text-xs text-muted-foreground hover:underline">
                    Back to Overview
                </Link>

                <div>
                    <p className="text-xs font-semibold uppercase text-emerald-700 dark:text-emerald-300">Content moderation</p>
                    <h1 className="mt-2 font-heading text-3xl font-bold text-foreground">Gear listings</h1>
                    <p className="mt-2 text-sm text-muted-foreground">Inspect gear listings created by providers across the platform.</p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Listings</CardTitle>
                        <CardDescription>{gears.length} gear listing{gears.length === 1 ? "" : "s"} found.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {gears.length > 0 ? (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Title</TableHead>
                                        <TableHead>Brand</TableHead>
                                        <TableHead>Category</TableHead>
                                        <TableHead>Stock</TableHead>
                                        <TableHead>Price / Day</TableHead>
                                        <TableHead>Availability</TableHead>
                                        <TableHead className="text-right">Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {gears.map((gear) => (
                                        <TableRow key={gear.id}>
                                            <TableCell className="font-medium">{gear.title}</TableCell>
                                            <TableCell className="text-muted-foreground">{gear.brand}</TableCell>
                                            <TableCell className="text-muted-foreground">{gear.category?.name || "N/A"}</TableCell>
                                            <TableCell>{gear.stock}</TableCell>
                                            <TableCell className="font-semibold">BDT {Number(gear.pricePerDay || 0).toLocaleString("en-US")}</TableCell>
                                            <TableCell>
                                                <span
                                                    className={
                                                        gear.isAvailable
                                                            ? "inline-flex rounded-md bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300"
                                                            : "inline-flex rounded-md bg-red-500/10 px-2.5 py-1 text-xs font-semibold text-red-700 dark:text-red-300"
                                                    }
                                                >
                                                    {gear.isAvailable ? "Available" : "Unavailable"}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex justify-end">
                                                    <Button asChild variant="outline" size="sm" className="rounded-md">
                                                        <Link href={`/gear/${gear.id}`}>
                                                            <ExternalLink className="size-4" strokeWidth={1.8} />
                                                            View
                                                        </Link>
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : (
                            <div className="rounded-md border border-dashed border-border px-6 py-14 text-center text-sm text-muted-foreground">
                                No gear listings found in the platform.
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}

