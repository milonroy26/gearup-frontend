"use client";

import { Button } from "@/components/ui/button";
import { toggleUserStatus } from "@/features/admin/actions/admin.action";
import { UserStatus } from "@/types";
import { CheckCircle2, Ban } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function UserStatusButton({ userId, status }: { userId: string; status: UserStatus }) {
    const router = useRouter();
    const [isUpdating, setIsUpdating] = useState(false);
    const nextStatus: UserStatus = status === "ACTIVE" ? "SUSPENDED" : "ACTIVE";
    const Icon = status === "ACTIVE" ? Ban : CheckCircle2;

    const handleClick = async () => {
        setIsUpdating(true);

        try {
            const res = await toggleUserStatus(userId, nextStatus);

            if (res.success) {
                toast.success(`User ${nextStatus === "SUSPENDED" ? "suspended" : "activated"} successfully`);
                router.refresh();
            } else {
                toast.error(res.message || "Failed to update user");
            }
        } catch {
            toast.error("Something went wrong");
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <Button
            type="button"
            size="sm"
            variant={status === "ACTIVE" ? "destructive" : "flag"}
            disabled={isUpdating}
            onClick={handleClick}
            className="rounded-md"
        >
            <Icon className="size-4" strokeWidth={1.8} />
            {isUpdating ? "Updating..." : status === "ACTIVE" ? "Suspend" : "Activate"}
        </Button>
    );
}

