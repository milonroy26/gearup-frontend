/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { loginUser } from "@/features/auth/actions/auth.action";
import { loginSchema, type ILoginInput } from "@/features/auth/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface DecodedToken {
    role: "CUSTOMER" | "PROVIDER" | "ADMIN";
}

export default function LoginForm() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ILoginInput>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: ILoginInput) => {
        setIsLoading(true);
        try {
            const res = await loginUser(data);

            if (res.success && "data" in res && res.data?.accessToken) {
                toast.success("Logged in successfully!");

                // Token Decode & Role-based Redirection
                const decoded = jwtDecode<DecodedToken>(res.data.accessToken);
                const role = decoded.role;

                if (role === "CUSTOMER") router.push("/dashboard/customer");
                else if (role === "PROVIDER") router.push("/dashboard/provider");
                else if (role === "ADMIN") router.push("/dashboard/admin");
                else router.push("/");
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
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-md border border-gray-100 dark:bg-gray-900 dark:border-gray-800">
            <div className="text-center space-y-2">
                <h1 className="text-2xl font-bold tracking-tight">Welcome Back</h1>
                <p className="text-sm text-muted-foreground">
                    Sign in to your GearUp account
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Email Field */}
                <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                        {...register("email")}
                        type="email"
                        placeholder="name@example.com"
                        className="w-full px-3 py-2 border rounded-md text-sm outline-none focus:ring-2 focus:ring-primary"
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
                        className="w-full px-3 py-2 border rounded-md text-sm outline-none focus:ring-2 focus:ring-primary"
                    />
                    {errors.password && (
                        <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-2.5 px-4 bg-black hover:bg-gray-800 text-white font-medium rounded-md text-sm transition-colors disabled:opacity-50"
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