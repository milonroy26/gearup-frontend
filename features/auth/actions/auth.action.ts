/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { fetcher } from "@/lib/fetcher";
import { IApiResponse, IUser } from "@/types";
import { cookies } from "next/headers";
import { ILoginInput, IRegisterInput } from "../schemas/auth.schema";

interface ILoginData {
    accessToken: string;
}

// Register Action
export const registerUser = async (payload: IRegisterInput) => {
    try {
        const res = await fetcher<IApiResponse<IUser>>("/auth/register", {
            method: "POST",
            body: JSON.stringify(payload),
        });

        return res;
    } catch (error: any) {
        return {
            success: false,
            message: error.message || "Registration failed. Please try again.",
        };
    }
};

// Login Action
export const loginUser = async (payload: ILoginInput) => {
    try {
        const res = await fetcher<IApiResponse<ILoginData>>("/auth/login", {
            method: "POST",
            body: JSON.stringify(payload),
        });

        if (res.success && res.data?.accessToken) {
            const cookieStore = await cookies();
            cookieStore.set("accessToken", res.data.accessToken, {
                httpOnly: true,
                sameSite: "lax",
                maxAge: 60 * 60 * 24,
                path: "/",
            });
        }

        return res;
    } catch (error: any) {
        return {
            success: false,
            message: error.message || "Login failed. Invalid credentials.",
        };
    }
};

// 3. Logout Action
export const logoutUser = async () => {
    const cookieStore = await cookies();
    cookieStore.delete("accessToken");
    return { success: true, message: "Logged out successfully" };
};