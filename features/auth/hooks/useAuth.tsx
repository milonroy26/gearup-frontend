"use client";

import { logoutUser } from "@/features/auth/actions/auth.action";
import { useRouter } from "next/navigation";
import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
    type ReactNode,
} from "react";
import { AuthContextValue, AuthUser } from "../types/auth.type";



const AuthContext = createContext<AuthContextValue | null>(null);

//* Provider
export function AuthProvider({
    children,
    initialUser,
}: Readonly<{
    children: ReactNode;
    initialUser: AuthUser | null;
}>) {
    const router = useRouter();
    const [user, setUser] = useState<AuthUser | null>(initialUser);
    const [isLoading, setIsLoading] = useState(false);

    const logout = useCallback(async () => {
        setIsLoading(true);

        try {
            await logoutUser();
            setUser(null);
            router.push("/login");
            router.refresh();
        } finally {
            setIsLoading(false);
        }
    }, [router]);

    const value = useMemo(
        () => ({
            user,
            isAuthenticated: Boolean(user),
            isLoading,
            logout,
        }),
        [isLoading, logout, user]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

//* Custom Hook
export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }

    return context;
}
