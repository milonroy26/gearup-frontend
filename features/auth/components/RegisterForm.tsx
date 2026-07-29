/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { registerUser } from "@/features/auth/actions/auth.action";
import { registerSchema, type IRegisterInput } from "@/features/auth/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

export default function RegisterForm() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        control,
        formState: { errors },
    } = useForm<IRegisterInput>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            role: "CUSTOMER",
        },
    });

    const selectedRole = useWatch({
        control,
        name: "role",
    });

    const onSubmit = async (data: IRegisterInput) => {
        setIsLoading(true);
        try {
            const res = await registerUser(data);

            if (res.success) {
                toast.success("Account created successfully! Please login.");
                router.push("/login");
            } else {
                toast.error(res.message || "Registration failed");
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
                <h1 className="text-2xl font-bold tracking-tight">Create an Account</h1>
                <p className="text-sm text-muted-foreground">
                    Join GearUp to rent or provide sports gear
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Name Field */}
                <div>
                    <label className="block text-sm font-medium mb-1">Full Name</label>
                    <input
                        {...register("name")}
                        type="text"
                        placeholder="John Doe"
                        className="w-full px-3 py-2 border rounded-md text-sm outline-none focus:ring-2 focus:ring-primary"
                    />
                    {errors.name && (
                        <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
                    )}
                </div>

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

                {/* Role Selection */}
                <div>
                    <label className="block text-sm font-medium mb-2">Select Your Role</label>
                    <div className="grid grid-cols-2 gap-3">
                        <button
                            type="button"
                            onClick={() => setValue("role", "CUSTOMER")}
                            className={`py-2 px-4 text-sm font-medium rounded-md border text-center transition-all ${selectedRole === "CUSTOMER"
                                ? "border-primary bg-primary/10 text-primary font-semibold"
                                : "border-gray-200 text-gray-600 hover:bg-gray-50"
                                }`}
                        >
                            🏋️ Customer
                        </button>
                        <button
                            type="button"
                            onClick={() => setValue("role", "PROVIDER")}
                            className={`py-2 px-4 text-sm font-medium rounded-md border text-center transition-all ${selectedRole === "PROVIDER"
                                ? "border-primary bg-primary/10 text-primary font-semibold"
                                : "border-gray-200 text-gray-600 hover:bg-gray-50"
                                }`}
                        >
                            🏪 Provider
                        </button>
                    </div>
                    {errors.role && (
                        <p className="text-xs text-red-500 mt-1">{errors.role.message}</p>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-2.5 px-4 bg-black hover:bg-gray-800 text-white font-medium rounded-md text-sm transition-colors disabled:opacity-50"
                >
                    {isLoading ? "Creating account..." : "Register"}
                </button>
            </form>

            <div className="text-center text-sm text-gray-500">
                Already have an account?{" "}
                <Link href="/login" className="text-primary font-semibold hover:underline">
                    Sign In
                </Link>
            </div>
        </div>
    );
}