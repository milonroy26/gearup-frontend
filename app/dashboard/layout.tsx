import Sidebar from "@/components/shared/Sidebar";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-[calc(100vh-4rem)] bg-background md:flex mb-4">
            <Sidebar />
            <div className="min-w-0 flex-1">
                {children}
            </div>
        </div>
    );
}
