import { UserRole } from "@/types";

export interface AuthUser {
    id?: string;
    name: string;
    email?: string;
    role: UserRole;
}

export interface AuthContextValue {
    user: AuthUser | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    syncUserFromToken: (accessToken: string) => void;
    logout: () => Promise<void>;
}
