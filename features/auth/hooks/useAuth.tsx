"use client";

import { logoutUser } from "@/features/auth/actions/auth.action";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    startTransition,
    useState,
    type ReactNode,
} from "react";
import { AuthContextValue, AuthUser } from "../types/auth.type";

type DecodedAuthToken = Partial<AuthUser>;



const AuthContext = createContext<AuthContextValue | null>(null);

function getDisplayName(decoded: DecodedAuthToken) {
    return decoded.name || decoded.email || decoded.role || "Member";
}

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

    useEffect(() => {
        startTransition(() => {
            setUser(initialUser);
        });
    }, [initialUser]);

    const syncUserFromToken = useCallback((accessToken: string) => {
        const decoded = jwtDecode<DecodedAuthToken>(accessToken);

        if (!decoded.role) {
            setUser(null);
            return;
        }

        setUser({
            id: decoded.id,
            name: getDisplayName(decoded),
            email: decoded.email,
            role: decoded.role,
        });
    }, []);

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
            syncUserFromToken,
            logout,
        }),
        [isLoading, logout, syncUserFromToken, user]
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
