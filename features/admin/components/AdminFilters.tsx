"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectOption } from "@/components/ui/select";
import { OrderStatus, UserRole, UserStatus } from "@/types";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

interface AdminFiltersProps {
    search?: string;
    role?: UserRole;
    status?: UserStatus | OrderStatus;
    statusOptions?: readonly string[];
    roleOptions?: readonly UserRole[];
    limit?: number;
    basePath: string;
    searchPlaceholder: string;
}

export default function AdminFilters({
    search,
    role,
    status,
    statusOptions = [],
    roleOptions = [],
    limit = 10,
    basePath,
    searchPlaceholder,
}: AdminFiltersProps) {
    const router = useRouter();

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const params = new URLSearchParams();
        const nextSearch = String(formData.get("search") || "").trim();
        const nextRole = String(formData.get("role") || "");
        const nextStatus = String(formData.get("status") || "");
        const limit = String(formData.get("limit") || "10");

        params.set("page", "1");
        params.set("limit", limit);
        if (nextSearch) params.set("search", nextSearch);
        if (nextRole) params.set("role", nextRole);
        if (nextStatus) params.set("status", nextStatus);

        router.push(`${basePath}?${params.toString()}`);
    };

    return (
        <form onSubmit={handleSubmit} className="grid gap-3 md:grid-cols-[minmax(220px,1fr)_160px_160px_120px_auto_auto]">
            <Input name="search" defaultValue={search || ""} placeholder={searchPlaceholder} className="h-9 rounded-md text-sm" />

            {roleOptions.length > 0 ? (
                <Select name="role" defaultValue={role || ""} className="h-9 rounded-md">
                    <SelectOption value="">All roles</SelectOption>
                    {roleOptions.map((option) => (
                        <SelectOption key={option} value={option}>
                            {option}
                        </SelectOption>
                    ))}
                </Select>
            ) : (
                <span className="hidden md:block" />
            )}

            {statusOptions.length > 0 ? (
                <Select name="status" defaultValue={status || ""} className="h-9 rounded-md">
                    <SelectOption value="">All statuses</SelectOption>
                    {statusOptions.map((option) => (
                        <SelectOption key={option} value={option}>
                            {option}
                        </SelectOption>
                    ))}
                </Select>
            ) : (
                <span className="hidden md:block" />
            )}

            <Select name="limit" defaultValue={String(limit)} className="h-9 rounded-md">
                <SelectOption value="10">10 / page</SelectOption>
                <SelectOption value="20">20 / page</SelectOption>
                <SelectOption value="50">50 / page</SelectOption>
            </Select>

            <Button type="submit" variant="flag" className="h-9 rounded-md">
                <Search className="size-4" strokeWidth={1.8} />
                Filter
            </Button>

            <Button type="button" variant="outline" className="h-9 rounded-md" onClick={() => router.push(`${basePath}?page=1&limit=10`)}>
                <X className="size-4" strokeWidth={1.8} />
                Reset
            </Button>
        </form>
    );
}
