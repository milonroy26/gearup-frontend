import { UserRole } from "@/types";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface DecodedToken {
    role: UserRole;
}

const dashboardRoutes: Record<UserRole, string> = {
    CUSTOMER: "/dashboard/customer",
    PROVIDER: "/dashboard/provider",
    ADMIN: "/dashboard/admin",
};

export default async function DashboardPage() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    let destination = "/login";

    if (accessToken) {
        try {
            const decoded = jwtDecode<DecodedToken>(accessToken);
            destination = dashboardRoutes[decoded.role] ?? "/login";
        } catch {
            destination = "/login";
        }
    }

    redirect(destination);
}
