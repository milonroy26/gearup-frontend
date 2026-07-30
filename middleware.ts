/* eslint-disable @typescript-eslint/no-unused-vars */
import { jwtDecode } from "jwt-decode";
import { NextResponse, type NextRequest } from "next/server";

interface DecodedToken {
    id: string;
    role: "CUSTOMER" | "PROVIDER" | "ADMIN";
    exp: number;
}

const protectedRoutes = ["/dashboard"];

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;


    const accessToken = request.cookies.get("accessToken")?.value;

    const isProtectedRoute = protectedRoutes.some((route) =>
        pathname.startsWith(route)
    );

    // If the user is not logged in and tries to enter the protected route, redirect to login.
    if (isProtectedRoute && !accessToken) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("redirect", pathname);
        return NextResponse.redirect(loginUrl);
    }

    // Role-based access permission check if user is logged in
    if (accessToken) {
        try {
            const decoded = jwtDecode<DecodedToken>(accessToken);
            const role = decoded.role;

            // Role-based path restriction
            if (pathname.startsWith("/dashboard/customer") && role !== "CUSTOMER") {
                return NextResponse.redirect(new URL("/dashboard", request.url));
            }
            if (pathname.startsWith("/dashboard/provider") && role !== "PROVIDER") {
                return NextResponse.redirect(new URL("/dashboard", request.url));
            }
            if (pathname.startsWith("/dashboard/admin") && role !== "ADMIN") {
                return NextResponse.redirect(new URL("/dashboard", request.url));
            }

            // When you go to /login or /register while logged in, you will be sent to the dashboard.
            if (pathname === "/login" || pathname === "/register") {
                if (role === "CUSTOMER") return NextResponse.redirect(new URL("/dashboard/customer", request.url));
                if (role === "PROVIDER") return NextResponse.redirect(new URL("/dashboard/provider", request.url));
                if (role === "ADMIN") return NextResponse.redirect(new URL("/dashboard/admin", request.url));
            }
        } catch (err) {
            // If the token is incorrect or expired, the cookie will be deleted and sent to login.
            const response = NextResponse.redirect(new URL("/login", request.url));
            response.cookies.delete("accessToken");
            return response;
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/login",
        "/register",
    ],
};