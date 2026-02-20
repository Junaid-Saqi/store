"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Package,
    ShoppingBag,
    Users,
    Settings,
    LogOut,
    ChevronRight,
    Zap
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useAdminStore } from "@/lib/admin-store";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const MENU_ITEMS = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
    { icon: Package, label: "Products", href: "/admin/products" },
    { icon: ShoppingBag, label: "Orders", href: "/admin/orders" },
    { icon: Users, label: "Customers", href: "/admin/customers" },
    { icon: Settings, label: "Settings", href: "/admin/settings" },
];

export default function Sidebar() {
    const pathname = usePathname();
    const { logout } = useAdminStore();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push("/");
    };

    return (
        <aside className="w-64 h-screen bg-card border-r border-border sticky top-0 flex flex-col">
            <div className="p-6 border-b border-border flex items-center space-x-2">
                <div className="bg-accent p-1.5 rounded-lg">
                    <Zap className="text-white fill-white" size={18} />
                </div>
                <span className="text-xl font-black tracking-tighter">VOLT ADMIN</span>
            </div>

            <nav className="flex-grow p-4 space-y-2 overflow-y-auto">
                {MENU_ITEMS.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center justify-between px-4 py-3 rounded-xl transition-all group",
                                isActive
                                    ? "bg-accent text-white font-bold"
                                    : "text-muted-foreground hover:bg-accent/5 hover:text-foreground"
                            )}
                        >
                            <div className="flex items-center space-x-3">
                                <item.icon size={20} />
                                <span>{item.label}</span>
                            </div>
                            {isActive && <ChevronRight size={16} />}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-border mt-auto">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 px-4 py-3 text-muted-foreground hover:text-destructive hover:bg-destructive/5 rounded-xl transition-all"
                >
                    <LogOut size={20} />
                    <span>Sign Out</span>
                </button>
            </div>
        </aside>
    );
}
