import * as React from "react";

import { cn } from "@/lib/utils";

function Checkbox({ className, ...props }: React.ComponentProps<"input">) {
    return (
        <input
            type="checkbox"
            data-slot="checkbox"
            className={cn("size-5 rounded border border-input accent-emerald-500", className)}
            {...props}
        />
    );
}

export { Checkbox };
