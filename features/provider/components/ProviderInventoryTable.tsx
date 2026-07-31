"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { deleteProviderGear, updateProviderGear } from "@/features/provider/actions/provider.action";
import { cn } from "@/lib/utils";
import { IGearItem } from "@/types";
import { Pencil, Save, Trash2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type EditingGear = Pick<IGearItem, "title" | "brand" | "pricePerDay" | "stock" | "isAvailable">;

export default function ProviderInventoryTable({ gears }: { gears: IGearItem[] }) {
    const router = useRouter();
    const [editingId, setEditingId] = useState<string | null>(null);
    const [workingId, setWorkingId] = useState<string | null>(null);
    const [draft, setDraft] = useState<EditingGear | null>(null);

    const beginEdit = (gear: IGearItem) => {
        setEditingId(gear.id);
        setDraft({
            title: gear.title,
            brand: gear.brand,
            pricePerDay: gear.pricePerDay,
            stock: gear.stock,
            isAvailable: gear.isAvailable,
        });
    };

    const saveEdit = async (gearId: string) => {
        if (!draft || !draft.title.trim() || !draft.brand.trim() || draft.pricePerDay <= 0 || draft.stock < 0) {
            toast.error("Please provide valid gear details");
            return;
        }

        setWorkingId(gearId);
        const res = await updateProviderGear(gearId, {
            ...draft,
            title: draft.title.trim(),
            brand: draft.brand.trim(),
        });

        if (res.success) {
            toast.success("Gear updated");
            setEditingId(null);
            setDraft(null);
            router.refresh();
        } else {
            toast.error(res.message || "Failed to update gear");
        }

        setWorkingId(null);
    };

    const toggleAvailability = async (gear: IGearItem) => {
        setWorkingId(gear.id);
        const res = await updateProviderGear(gear.id, { isAvailable: !gear.isAvailable });

        if (res.success) {
            toast.success(`Gear marked ${gear.isAvailable ? "unavailable" : "available"}`);
            router.refresh();
        } else {
            toast.error(res.message || "Failed to update availability");
        }

        setWorkingId(null);
    };

    const removeGear = async (gear: IGearItem) => {
        if (!window.confirm(`Remove "${gear.title}" from your inventory?`)) return;

        setWorkingId(gear.id);
        const res = await deleteProviderGear(gear.id);

        if (res.success) {
            toast.success("Gear removed from inventory");
            router.refresh();
        } else {
            toast.error(res.message || "Failed to remove gear");
        }

        setWorkingId(null);
    };

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Brand</TableHead>
                    <TableHead>Price/Day</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Availability</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {gears.map((gear) => {
                    const isEditing = editingId === gear.id;
                    const disabled = workingId === gear.id;

                    return (
                        <TableRow key={gear.id}>
                            <TableCell className="min-w-52 font-medium">
                                {isEditing && draft ? (
                                    <Input
                                        value={draft.title}
                                        onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                                        className="h-9 rounded-md text-sm"
                                    />
                                ) : (
                                    gear.title
                                )}
                            </TableCell>
                            <TableCell className="min-w-36 text-muted-foreground">
                                {isEditing && draft ? (
                                    <Input
                                        value={draft.brand}
                                        onChange={(e) => setDraft({ ...draft, brand: e.target.value })}
                                        className="h-9 rounded-md text-sm"
                                    />
                                ) : (
                                    gear.brand
                                )}
                            </TableCell>
                            <TableCell className="min-w-32 font-semibold">
                                {isEditing && draft ? (
                                    <Input
                                        type="number"
                                        min="1"
                                        value={draft.pricePerDay}
                                        onChange={(e) => setDraft({ ...draft, pricePerDay: Number(e.target.value) })}
                                        className="h-9 w-28 rounded-md text-sm"
                                    />
                                ) : (
                                    `BDT ${gear.pricePerDay}`
                                )}
                            </TableCell>
                            <TableCell className="min-w-24">
                                {isEditing && draft ? (
                                    <Input
                                        type="number"
                                        min="0"
                                        value={draft.stock}
                                        onChange={(e) => setDraft({ ...draft, stock: Number(e.target.value) })}
                                        className="h-9 w-20 rounded-md text-sm"
                                    />
                                ) : (
                                    gear.stock
                                )}
                            </TableCell>
                            <TableCell>
                                {isEditing && draft ? (
                                    <label className="inline-flex items-center gap-2 text-xs font-medium">
                                        <Checkbox
                                            checked={draft.isAvailable}
                                            onChange={(e) => setDraft({ ...draft, isAvailable: e.target.checked })}
                                            className="size-4"
                                        />
                                        Available
                                    </label>
                                ) : (
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        disabled={disabled}
                                        onClick={() => toggleAvailability(gear)}
                                        className={cn(
                                            "h-7 rounded-md px-2.5 text-xs font-semibold ring-1",
                                            gear.isAvailable
                                                ? "bg-emerald-500/10 text-emerald-700 ring-emerald-500/20 dark:text-emerald-300"
                                                : "bg-red-500/10 text-red-700 ring-red-500/20 dark:text-red-300"
                                        )}
                                    >
                                        {gear.isAvailable ? "Available" : "Unavailable"}
                                    </Button>
                                )}
                            </TableCell>
                            <TableCell>
                                <div className="flex justify-end gap-2">
                                    {isEditing ? (
                                        <>
                                            <Button type="button" variant="flag" size="sm" disabled={disabled} onClick={() => saveEdit(gear.id)} className="rounded-md">
                                                <Save className="size-4" strokeWidth={1.8} />
                                                Save
                                            </Button>
                                            <Button type="button" variant="outline" size="sm" disabled={disabled} onClick={() => { setEditingId(null); setDraft(null); }} className="rounded-md">
                                                <X className="size-4" strokeWidth={1.8} />
                                                Cancel
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <Button type="button" variant="outline" size="sm" disabled={disabled} onClick={() => beginEdit(gear)} className="rounded-md">
                                                <Pencil className="size-4" strokeWidth={1.8} />
                                                Edit
                                            </Button>
                                            <Button type="button" variant="destructive" size="sm" disabled={disabled} onClick={() => removeGear(gear)} className="rounded-md">
                                                <Trash2 className="size-4" strokeWidth={1.8} />
                                                Remove
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
}
