"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select, SelectOption } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { addProviderGear } from "@/features/provider/actions/provider.action";
import { IAddGearPayload } from "@/features/provider/types/provider.type";
import { ICategory } from "@/types";
import { ArrowLeft, ImageIcon, PackagePlus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const initialFormData: IAddGearPayload = {
    title: "",
    description: "",
    image: "",
    brand: "",
    pricePerDay: 0,
    stock: 1,
    isAvailable: true,
    categoryId: "",
};

export default function ProviderGearForm({ categories }: { categories: ICategory[] }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState<IAddGearPayload>(initialFormData);
    const hasCategories = categories.length > 0;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!hasCategories) {
            toast.error("No categories are available right now");
            return;
        }

        if (!formData.title.trim() || !formData.brand.trim() || !formData.categoryId.trim() || formData.pricePerDay <= 0 || formData.stock < 1) {
            toast.error("Please fill all required fields correctly");
            return;
        }

        setIsLoading(true);

        try {
            const image = formData.image?.trim();
            const payload: IAddGearPayload = {
                ...formData,
                title: formData.title.trim(),
                brand: formData.brand.trim(),
                description: formData.description.trim(),
                categoryId: formData.categoryId.trim(),
                ...(image ? { image } : { image: undefined }),
            };
            const res = await addProviderGear(payload);

            if (res.success) {
                toast.success("Gear added to inventory successfully");
                router.push("/dashboard/provider");
                router.refresh();
                return;
            }

            toast.error(res.message || "Failed to add gear");
        } catch {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
                <Button asChild variant="ghost" className="mb-6 rounded-md">
                    <Link href="/dashboard/provider">
                        <ArrowLeft className="size-4" strokeWidth={1.8} />
                        Back to overview
                    </Link>
                </Button>

                <Card>
                    <CardHeader>
                        <div className="flex items-start gap-3">
                            <span className="flex size-11 items-center justify-center rounded-md bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
                                <PackagePlus className="size-5" strokeWidth={1.8} />
                            </span>
                            <div>
                                <CardTitle>Add new sports gear</CardTitle>
                                <CardDescription>Publish a gear item customers can rent with a hosted image URL.</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="title" className="mb-2 block text-xs font-semibold uppercase text-muted-foreground">Gear Title *</label>
                                    <Input
                                        id="title"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        placeholder="Professional Cricket Bat"
                                        className="h-11 rounded-md text-sm"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="brand" className="mb-2 block text-xs font-semibold uppercase text-muted-foreground">Brand *</label>
                                    <Input
                                        id="brand"
                                        value={formData.brand}
                                        onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                                        placeholder="SS / Nike / Yonex"
                                        className="h-11 rounded-md text-sm"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid gap-4 lg:grid-cols-[1fr_220px]">
                                <div>
                                    <label htmlFor="image" className="mb-2 block text-xs font-semibold uppercase text-muted-foreground">Image URL</label>
                                    <Input
                                        id="image"
                                        type="url"
                                        value={formData.image || ""}
                                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                        placeholder="https://images.unsplash.com/..."
                                        className="h-11 rounded-md text-sm"
                                    />
                                    <p className="mt-2 text-xs text-muted-foreground">
                                        Paste a direct image URL. This image will appear on listings and details pages.
                                    </p>
                                </div>

                                <div className="overflow-hidden rounded-md border border-border bg-muted/40">
                                    {formData.image?.trim() ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img
                                            src={formData.image.trim()}
                                            alt="Gear preview"
                                            className="aspect-4/3 h-full min-h-36 w-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex aspect-4/3 min-h-36 flex-col items-center justify-center gap-2 text-center text-muted-foreground">
                                            <ImageIcon className="size-8" strokeWidth={1.7} />
                                            <span className="px-4 text-xs font-medium">
                                                Image preview
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {!hasCategories && (
                                <div className="rounded-md border border-amber-500/25 bg-amber-500/10 p-4 text-sm text-amber-700 dark:text-amber-300">
                                    Categories are unavailable. Please try again after categories are created by an admin.
                                </div>
                            )}

                            <div className="grid gap-4 sm:grid-cols-3">
                                <div>
                                    <label htmlFor="pricePerDay" className="mb-2 block text-xs font-semibold uppercase text-muted-foreground">Price / Day *</label>
                                    <Input
                                        id="pricePerDay"
                                        type="number"
                                        min="1"
                                        value={formData.pricePerDay || ""}
                                        onChange={(e) => setFormData({ ...formData, pricePerDay: Number(e.target.value) })}
                                        placeholder="500"
                                        className="h-11 rounded-md text-sm"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="stock" className="mb-2 block text-xs font-semibold uppercase text-muted-foreground">Stock *</label>
                                    <Input
                                        id="stock"
                                        type="number"
                                        min="1"
                                        value={formData.stock}
                                        onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                                        className="h-11 rounded-md text-sm"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="categoryId" className="mb-2 block text-xs font-semibold uppercase text-muted-foreground">Category *</label>
                                    <Select
                                        id="categoryId"
                                        value={formData.categoryId}
                                        onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                                        disabled={!hasCategories}
                                        required
                                    >
                                        <SelectOption value="">
                                            Select category
                                        </SelectOption>
                                        {categories.map((category) => (
                                            <SelectOption key={category.id} value={category.id}>
                                                {category.name}
                                            </SelectOption>
                                        ))}
                                    </Select>
                                    {formData.categoryId && (
                                        <p className="mt-2 truncate text-xs text-muted-foreground">
                                            ID: {formData.categoryId}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label htmlFor="description" className="mb-2 block text-xs font-semibold uppercase text-muted-foreground">Description</label>
                                <Textarea
                                    id="description"
                                    rows={4}
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Condition, size, specs, pickup notes..."
                                />
                            </div>

                            <label className="flex items-center justify-between gap-4 rounded-md border border-border bg-muted/40 p-4 text-sm">
                                <span>
                                    <span className="block font-semibold">Available for rent</span>
                                    <span className="text-muted-foreground">Turn this off when gear is not ready for customers.</span>
                                </span>
                                <Checkbox
                                    checked={formData.isAvailable}
                                    onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
                                />
                            </label>

                            <Button type="submit" variant="flag" size="lg" disabled={isLoading || !hasCategories} className="h-11 w-full rounded-md">
                                {isLoading ? "Publishing..." : "Publish Gear"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}
