/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { loginUser } from "@/features/auth/actions/auth.action";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { loginSchema, type ILoginInput } from "@/features/auth/schemas/auth.schema";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { jwtDecode } from "jwt-decode";
import { ShieldCheck, Store, UserRound } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface DecodedToken {
    role: "CUSTOMER" | "PROVIDER" | "ADMIN";
}

const demoCredentials = [
    {
        role: "Admin",
        email: "milonchandro35@gmail.com",
        password: "22422242#",
        icon: ShieldCheck,
        accentClass: "text-amber-600 dark:text-amber-300",
        activeClass: "border-amber-500/45 bg-amber-500/10",
    },
    {
        role: "Provider",
        email: "provider@gmail.com",
        password: "password123",
        icon: Store,
        accentClass: "text-emerald-600 dark:text-emerald-300",
        activeClass: "border-emerald-500/45 bg-emerald-500/10",
    },
    {
        role: "Customer",
        email: "customer@gmail.com",
        password: "password123",
        icon: UserRound,
        accentClass: "text-sky-600 dark:text-sky-300",
        activeClass: "border-sky-500/45 bg-sky-500/10",
    },
];

export default function LoginForm() {
    const router = useRouter();
    const { syncUserFromToken } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [selectedRole, setSelectedRole] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<ILoginInput>({
        resolver: zodResolver(loginSchema),
    });

    const handleDemoCredential = (credential: (typeof demoCredentials)[number]) => {
        setValue("email", credential.email, { shouldDirty: true, shouldValidate: true });
        setValue("password", credential.password, { shouldDirty: true, shouldValidate: true });
        setSelectedRole(credential.role);
        toast.success(`${credential.role} credentials filled`);
    };

    const onSubmit = async (data: ILoginInput) => {
        setIsLoading(true);
        try {
            const res = await loginUser(data);

            if (res.success && "data" in res && res.data?.accessToken) {
                toast.success("Logged in successfully!");

                // Token Decode & Role-based Redirection
                const decoded = jwtDecode<DecodedToken>(res.data.accessToken);
                const role = decoded.role;

                syncUserFromToken(res.data.accessToken);

                if (role === "CUSTOMER") router.replace("/dashboard/customer");
                else if (role === "PROVIDER") router.replace("/dashboard/provider");
                else if (role === "ADMIN") router.replace("/dashboard/admin");
                else router.replace("/");

                router.refresh();
            } else {
                toast.error(res.message || "Invalid email or password");
            }
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-3xl space-y-6 rounded-xl border border-border bg-card p-6 text-card-foreground shadow-md sm:p-8">
            <div className="text-center space-y-2">
                <h1 className="text-2xl font-bold tracking-tight">Welcome Back</h1>
                <p className="text-sm text-muted-foreground">
                    Sign in to your GearUp account
                </p>
            </div>

            <div className="rounded-md border border-border bg-muted/35 p-4">
                <div className="mb-3 flex items-center justify-between gap-3">
                    <div>
                        <p className="text-xs font-semibold uppercase text-muted-foreground">
                            Demo login credentials
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                            Pick a role to fill the form, then sign in.
                        </p>
                    </div>
                    {selectedRole && (
                        <span className="shrink-0 rounded-md border border-emerald-500/25 px-2.5 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-300">
                            {selectedRole}
                        </span>
                    )}
                </div>

                <div className="grid gap-3 md:grid-cols-3">
                    {demoCredentials.map((credential) => {
                        const Icon = credential.icon;
                        const isSelected = selectedRole === credential.role;

                        return (
                            <button
                                key={credential.role}
                                type="button"
                                onClick={() => handleDemoCredential(credential)}
                                className={cn(
                                    "min-w-0 rounded-md border border-border bg-background p-3 text-left shadow-sm transition-colors hover:border-emerald-500/35 hover:bg-emerald-500/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                                    isSelected && credential.activeClass
                                )}
                                aria-pressed={isSelected}
                            >
                                <div className="flex items-center gap-2">
                                    <span className={cn("flex size-9 shrink-0 items-center justify-center rounded-md bg-current/10", credential.accentClass)}>
                                        <Icon className="size-4" strokeWidth={1.8} />
                                    </span>
                                    <div className="min-w-0">
                                        <p className="font-heading text-sm font-bold">{credential.role}</p>
                                        <p className="truncate text-xs text-muted-foreground">{credential.email}</p>
                                    </div>
                                </div>
                                <div className="mt-3 flex items-center justify-between gap-2 text-xs">
                                    <span className="truncate text-muted-foreground">
                                        Password: {credential.password}
                                    </span>
                                    <span className="shrink-0 font-semibold text-emerald-600 dark:text-emerald-300">
                                        Use
                                    </span>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Email Field */}
                <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                        {...register("email")}
                        type="email"
                        placeholder="name@example.com"
                        className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                    />
                    {errors.email && (
                        <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
                    )}
                </div>

                {/* Password Field */}
                <div>
                    <label className="block text-sm font-medium mb-1">Password</label>
                    <input
                        {...register("password")}
                        type="password"
                        placeholder="******"
                        className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                    />
                    {errors.password && (
                        <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full rounded-md bg-emerald-400 px-4 py-2.5 text-sm font-bold text-emerald-950 transition-colors hover:bg-emerald-300 disabled:opacity-50"
                >
                    {isLoading ? "Signing in..." : "Sign In"}
                </button>
            </form>

            <div className="text-center text-sm text-gray-500">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="text-primary font-semibold hover:underline">
                    Register
                </Link>
            </div>
        </div>
    );
}
