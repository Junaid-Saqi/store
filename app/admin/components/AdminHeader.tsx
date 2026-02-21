"use client";

import { Bell, Search, User } from "lucide-react";

export default function AdminHeader() {
    return (
        <header className="h-16 bg-card flex items-center justify-between px-8 sticky top-0 z-10">
            <div className="hidden md:flex items-center bg-muted/50 rounded-full px-4 py-2 w-96">
                <Search size={18} className="text-muted-foreground mr-2" />
                <input
                    type="text"
                    placeholder="Quick search..."
                    className="bg-transparent outline-none text-sm w-full"
                />
            </div>

            <div className="flex items-center space-x-4">
                <button className="relative p-2 text-muted-foreground hover:bg-accent/5 rounded-full transition-colors">
                    <Bell size={20} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full border-2 border-card"></span>
                </button>
                <div className="h-8 w-[1px] bg-transparent mx-2"></div>
                <div className="flex items-center space-x-3">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-bold leading-none">Admin User</p>
                        <p className="text-xs text-muted-foreground mt-1">Super Admin</p>
                    </div>
                    <div className="h-10 w-10 bg-accent/10 rounded-full flex items-center justify-center text-accent">
                        <User size={20} />
                    </div>
                </div>
            </div>
        </header>
    );
}
