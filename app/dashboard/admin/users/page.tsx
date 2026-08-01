import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import AdminFilters from "@/features/admin/components/AdminFilters";
import AdminPagination from "@/features/admin/components/AdminPagination";
import UserStatusButton from "@/features/admin/components/UserStatusButton";
import { getAllUsers } from "@/features/admin/actions/admin.action";
import { normalizePaginatedData } from "@/features/admin/utils/admin-data";
import { UserRole, UserStatus } from "@/types";
import Link from "next/link";

const USER_ROLES: UserRole[] = ["CUSTOMER", "PROVIDER", "ADMIN"];
const USER_STATUSES: UserStatus[] = ["ACTIVE", "SUSPENDED"];

type AdminUsersSearchParams = Promise<{
    page?: string;
    limit?: string;
    search?: string;
    role?: string;
    status?: string;
}>;

function getValidNumber(value: string | undefined, fallback: number) {
    const parsed = Number(value);

    return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function getUserStatus(user: { status?: UserStatus; isDeleted?: boolean }) {
    if (user.status) return user.status;

    return user.isDeleted ? "SUSPENDED" : "ACTIVE";
}

export default async function AdminUsersPage({ searchParams }: { searchParams: AdminUsersSearchParams }) {
    const query = await searchParams;
    const page = getValidNumber(query.page, 1);
    const limit = getValidNumber(query.limit, 10);
    const role = USER_ROLES.includes(query.role as UserRole) ? (query.role as UserRole) : undefined;
    const status = USER_STATUSES.includes(query.status as UserStatus) ? (query.status as UserStatus) : undefined;
    const search = query.search?.trim() || undefined;
    const res = await getAllUsers({ page, limit, search, role, status });
    const { items: users, meta } = normalizePaginatedData(res);

    return (
        <section className="px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl space-y-6">
                <Link href="/dashboard/admin" className="text-xs text-muted-foreground hover:underline">
                    Back to Overview
                </Link>

                <div>
                    <p className="text-xs font-semibold uppercase text-emerald-700 dark:text-emerald-300">User management</p>
                    <h1 className="mt-2 font-heading text-3xl font-bold text-foreground">All users</h1>
                    <p className="mt-2 text-sm text-muted-foreground">Search, filter, suspend, and activate platform accounts.</p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Filters</CardTitle>
                        <CardDescription>Filter users by account details, role, and account status.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <AdminFilters
                            basePath="/dashboard/admin/users"
                            search={search}
                            role={role}
                            status={status}
                            limit={limit}
                            roleOptions={USER_ROLES}
                            statusOptions={USER_STATUSES}
                            searchPlaceholder="Search users..."
                        />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Users</CardTitle>
                        <CardDescription>{users.length} user{users.length === 1 ? "" : "s"} shown.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {users.length > 0 ? (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Role</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Joined</TableHead>
                                        <TableHead className="text-right">Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {users.map((user) => {
                                        const userStatus = getUserStatus(user);

                                        return (
                                            <TableRow key={user.id}>
                                                <TableCell className="font-medium">{user.name}</TableCell>
                                                <TableCell className="text-muted-foreground">{user.email}</TableCell>
                                                <TableCell>
                                                    <span className="inline-flex rounded-md bg-muted px-2.5 py-1 text-xs font-semibold">{user.role}</span>
                                                </TableCell>
                                                <TableCell>
                                                    <span
                                                        className={
                                                            userStatus === "ACTIVE"
                                                                ? "inline-flex rounded-md bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300"
                                                                : "inline-flex rounded-md bg-red-500/10 px-2.5 py-1 text-xs font-semibold text-red-700 dark:text-red-300"
                                                        }
                                                    >
                                                        {userStatus}
                                                    </span>
                                                </TableCell>
                                                <TableCell className="text-muted-foreground">
                                                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString("en-US") : "N/A"}
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex justify-end">
                                                        <UserStatusButton userId={user.id} status={userStatus} />
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        ) : (
                            <div className="rounded-md border border-dashed border-border px-6 py-14 text-center text-sm text-muted-foreground">
                                No users matched the current filters.
                            </div>
                        )}
                    </CardContent>
                    <AdminPagination
                        basePath="/dashboard/admin/users"
                        meta={meta}
                        itemCount={users.length}
                        params={{
                            page: String(page),
                            limit: String(limit),
                            search,
                            role,
                            status,
                        }}
                    />
                </Card>
            </div>
        </section>
    );
}

