
"use client";

import Link from "next/link";
import { ShoppingCart, Search, Menu, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { cartCount } = useCart();

    return (
        <nav className="sticky top-0 z-50 w-full glass border-b border-white/10">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="text-2xl font-bold tracking-tight text-accent">
                    Electro<span className="text-foreground">Wave</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center space-x-8">
                    <Link href="/shop" className="text-sm font-medium hover:text-accent transition-colors">
                        Shop
                    </Link>
                    <Link href="/categories" className="text-sm font-medium hover:text-accent transition-colors">
                        Categories
                    </Link>
                    <Link href="/about" className="text-sm font-medium hover:text-accent transition-colors">
                        About
                    </Link>
                </div>

                <div className="flex items-center space-x-4">
                    <button className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors">
                        <Search size={20} />
                    </button>

                    <Link href="/cart" className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors relative">
                        <ShoppingCart size={20} />
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-accent text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full">
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    <button
                        className="md:hidden p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden glass border-t border-white/10 animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="flex flex-col p-4 space-y-4">
                        <Link href="/shop" className="text-lg font-medium" onClick={() => setIsMenuOpen(false)}>Shop</Link>
                        <Link href="/categories" className="text-lg font-medium" onClick={() => setIsMenuOpen(false)}>Categories</Link>
                        <Link href="/about" className="text-lg font-medium" onClick={() => setIsMenuOpen(false)}>About</Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
