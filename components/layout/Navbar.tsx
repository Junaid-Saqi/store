
"use client";

import Link from "next/link";
import { ShoppingCart, Search, Menu, X, ArrowRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const { cartCount } = useCart();
    const router = useRouter();
    const searchInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isSearchOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isSearchOpen]);

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
            setIsSearchOpen(false);
            setSearchQuery("");
        }
    };

    return (
        <>
            <nav className="sticky top-0 z-50 w-full glass border-b border-white/10">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <Link href="/" className="text-2xl font-black tracking-tighter text-accent uppercase italic">
                        VOLT<span className="text-foreground">.</span>
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
                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors"
                        >
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
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="md:hidden glass border-t border-white/10"
                        >
                            <div className="flex flex-col p-4 space-y-4">
                                <Link href="/shop" className="text-lg font-medium" onClick={() => setIsMenuOpen(false)}>Shop</Link>
                                <Link href="/categories" className="text-lg font-medium" onClick={() => setIsMenuOpen(false)}>Categories</Link>
                                <Link href="/about" className="text-lg font-medium" onClick={() => setIsMenuOpen(false)}>About</Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            {/* Global Search Overlay */}
            <AnimatePresence>
                {isSearchOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-100 bg-white dark:bg-black flex flex-col pt-32"
                    >
                        <button
                            onClick={() => setIsSearchOpen(false)}
                            className="absolute top-8 right-8 p-4 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-all"
                        >
                            <X size={32} />
                        </button>

                        <div className="container mx-auto px-4 max-w-4xl">
                            <form onSubmit={handleSearchSubmit} className="relative">
                                <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-accent" size={32} />
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    placeholder="Search the future of tech..."
                                    className="w-full bg-transparent border-b-2 border-black/10 dark:border-white/10 focus:border-accent py-8 pl-14 pr-20 text-3xl md:text-5xl font-black uppercase tracking-tighter outline-none transition-all placeholder:text-muted-foreground/30"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <button
                                    type="submit"
                                    className="absolute right-0 top-1/2 -translate-y-1/2 p-4 bg-accent text-white rounded-2xl hover:scale-110 active:scale-95 transition-all shadow-xl shadow-accent/20"
                                >
                                    <ArrowRight size={24} />
                                </button>
                            </form>

                            <div className="mt-12 space-y-4">
                                <p className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">Trending Searches</p>
                                <div className="flex flex-wrap gap-3">
                                    {["iPhone 15", "Gaming Laptops", "Smartwatches", "Audio"].map((term) => (
                                        <button
                                            key={term}
                                            onClick={() => {
                                                setSearchQuery(term);
                                                router.push(`/shop?q=${encodeURIComponent(term)}`);
                                                setIsSearchOpen(false);
                                            }}
                                            className="px-6 py-2 bg-black/5 dark:bg-white/5 hover:bg-accent hover:text-white rounded-full text-sm font-bold transition-all"
                                        >
                                            {term}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
