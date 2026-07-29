import { cookies } from "next/headers";

const BASE_URL = process.env.BACKEND_API_URL || "http://localhost:5000/api";

interface FetcherOptions extends RequestInit {
    tags?: string[];
    revalidate?: number | false;
}

export const fetcher = async <T>(
    endpoint: string,
    options: FetcherOptions = {}
): Promise<T> => {

    const { tags, revalidate, headers, ...customConfig } = options;

    // get Access Token from Cookie (Server Side Compatible)
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    // headers setup with Access Token
    const defaultHeaders: Record<string, string> = {
        "Content-Type": "application/json",
        ...(accessToken ? { Authorization: `${accessToken}`, Cookie: `accessToken=${accessToken}` } : {}),
        ...(headers as Record<string, string>),
    };

    // Make Fetch Request
    const res = await fetch(`${BASE_URL}${endpoint}`, {
        ...customConfig,
        headers: defaultHeaders,
        next: {
            ...(tags && { tags }),
            ...(revalidate !== undefined && { revalidate }),
        },
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "Failed to fetch data");
    }

    return data as T;
};