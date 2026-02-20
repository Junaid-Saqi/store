"use client";

import Sidebar from "./components/Sidebar";
import AdminHeader from "./components/AdminHeader";
import { useAdminStore } from "@/lib/admin-store";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

function AuthGuard({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, isLoading } = useAdminStore();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!isLoading && !isAuthenticated && pathname !== "/admin/login") {
            router.push("/admin/login");
        }
        if (!isLoading && isAuthenticated && pathname === "/admin/login") {
            router.push("/admin");
        }
    }, [isAuthenticated, isLoading, router, pathname]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <Loader2 className="animate-spin text-accent" size={40} />
            </div>
        );
    }

    if (!isAuthenticated && pathname !== "/admin/login") {
        return null; // Prevents flashing protected content
    }

    return <>{children}</>;
}

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isLoginPage = pathname === "/admin/login";

    if (isLoginPage) {
        return <AuthGuard>{children}</AuthGuard>;
    }

    return (
        <AuthGuard>
            <div className="flex min-h-screen bg-background text-foreground">
                <Sidebar />
                <div className="flex-grow flex flex-col">
                    <AdminHeader />
                    <main className="p-8">
                        {children}
                    </main>
                </div>
            </div>
        </AuthGuard>
    );
}
