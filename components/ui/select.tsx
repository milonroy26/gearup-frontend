import { ChevronDown } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

function Select({ className, children, ...props }: React.ComponentProps<"select">) {
    return (
        <div className="relative">
            <select
                data-slot="select"
                className={cn(
                    "h-11 w-full appearance-none rounded-md border border-input bg-transparent px-3 pr-10 text-sm font-medium text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-input/30",
                    className
                )}
                {...props}
            >
                {children}
            </select>
            <ChevronDown
                className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                strokeWidth={1.8}
            />
        </div>
    );
}

function SelectOption({ className, ...props }: React.ComponentProps<"option">) {
    return (
        <option
            data-slot="select-option"
            className={cn("bg-background text-foreground dark:bg-[#172018] dark:text-white", className)}
            {...props}
        />
    );
}

export { Select, SelectOption };
