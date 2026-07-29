import { z } from "zod";

// Login Schema
export const loginSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});

// Register Schema
export const registerSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters long"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    role: z.enum(["CUSTOMER", "PROVIDER"] as const, {
        message: "Please select a role",
    }),
});

export type ILoginInput = z.infer<typeof loginSchema>;
export type IRegisterInput = z.infer<typeof registerSchema>;