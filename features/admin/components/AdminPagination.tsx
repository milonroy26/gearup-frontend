import { Button } from "@/components/ui/button";
import { IPaginationMeta } from "@/types";
import Link from "next/link";
import { getTotalPages } from "../utils/admin-data";

interface AdminPaginationProps {
    basePath: string;
    meta: IPaginationMeta;
    params: Record<string, string | undefined>;
    itemCount: number;
}

function makeHref(basePath: string, params: Record<string, string | undefined>, page: number) {
    const nextParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
        if (value) nextParams.set(key, value);
    });
    nextParams.set("page", String(page));

    return `${basePath}?${nextParams.toString()}`;
}

export default function AdminPagination({ basePath, meta, params, itemCount }: AdminPaginationProps) {
    const currentPage = Math.max(1, meta.page || Number(params.page) || 1);
    const totalPages = getTotalPages(meta, itemCount);
    const total = meta.total ?? itemCount;

    return (
        <div className="flex flex-col gap-3 border-t border-border px-4 py-3 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <p>
                Page {currentPage} of {totalPages} - {total} item{total === 1 ? "" : "s"}
            </p>
            <div className="flex gap-2">
                <Button asChild variant="outline" size="sm" className="rounded-md" aria-disabled={currentPage <= 1}>
                    <Link href={currentPage <= 1 ? makeHref(basePath, params, currentPage) : makeHref(basePath, params, currentPage - 1)}>Previous</Link>
                </Button>
                <Button asChild variant="outline" size="sm" className="rounded-md" aria-disabled={currentPage >= totalPages}>
                    <Link href={currentPage >= totalPages ? makeHref(basePath, params, currentPage) : makeHref(basePath, params, currentPage + 1)}>Next</Link>
                </Button>
            </div>
        </div>
    );
}
