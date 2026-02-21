
"use client";

import { useState, useMemo, Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { CATEGORIES } from "@/lib/mock-data";
import ProductCard from "@/components/product/ProductCard";
import { cn } from "@/lib/utils";
import { Search, SlidersHorizontal, X, ArrowUpDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Product {
    id: number;
    name: string;
    purchasePrice: number | null;
    retailPrice: number | null;
    category?: {
        name: string;
    };
}

function ShopContent() {
    const searchParams = useSearchParams();
    const globalSearch = searchParams.get("q") || "";

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState(globalSearch);
    const [sortBy, setSortBy] = useState("Recommended");
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const params = new URLSearchParams();
                if (selectedCategory !== "All") {
                    params.set("category", selectedCategory);
                }
                if (globalSearch) {
                    params.set("search", globalSearch);
                }
                const res = await fetch(`/api/products?${params}`);
                const data = await res.json();
                setProducts(data);
            } catch (error) {
                console.error("Failed to fetch products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [selectedCategory, globalSearch]);

    const filteredAndSortedProducts = useMemo(() => {
        const result = [...products];

        // Sorting logic
        switch (sortBy) {
            case "Price: Low to High":
                result.sort((a, b) => (a.retailPrice || a.purchasePrice || 0) - (b.retailPrice || b.purchasePrice || 0));
                break;
            case "Price: High to Low":
                result.sort((a, b) => (b.retailPrice || b.purchasePrice || 0) - (a.retailPrice || a.purchasePrice || 0));
                break;
            default:
                break;
        }

        return result;
    }, [products, sortBy]);

    return (
        <div className="container mx-auto px-4 py-12 min-h-screen">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
                <div className="space-y-4">
                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">ALL <span className="text-accent underline underline-offset-8 decoration-4">PRODUCTS</span></h1>
                    <p className="text-muted-foreground italic">Discover the latest in premium technology.</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                    <div className="relative group grow sm:grow-0">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-accent transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder="Search innovation..."
                            className="pl-12 pr-4 py-4 bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/10 rounded-2xl w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all font-bold"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={() => setShowMobileFilters(true)}
                        className="flex items-center justify-center space-x-2 px-8 py-4 bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/10 rounded-2xl font-black uppercase text-sm tracking-widest hover:bg-black/5 dark:hover:bg-white/5 transition-all shadow-lg md:hidden"
                    >
                        <SlidersHorizontal size={18} />
                        <span>Filters</span>
                    </button>

                    {/* Desktop Sorting Dropdown */}
                    <div className="hidden md:block relative group">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="appearance-none pl-6 pr-12 py-4 bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/10 rounded-2xl font-black uppercase text-sm tracking-widest focus:outline-none focus:border-accent transition-all cursor-pointer shadow-lg"
                        >
                            <option>Recommended</option>
                            <option>Price: Low to High</option>
                            <option>Price: High to Low</option>
                            <option>Rating</option>
                        </select>
                        <ArrowUpDown className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" size={16} />
                    </div>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-12">
                {/* Desktop Sidebar Categories */}
                <aside className="hidden md:block w-56 shrink-0 space-y-10">
                    <div>
                        <h3 className="font-black uppercase tracking-[0.2em] text-[10px] text-muted-foreground mb-6 border-b border-black/5 dark:border-white/5 pb-2">Category Filter</h3>
                        <div className="flex flex-col gap-2">
                            {CATEGORIES.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={cn(
                                        "px-6 py-3 rounded-xl text-sm font-black uppercase tracking-widest transition-all text-left",
                                        selectedCategory === category
                                            ? "bg-accent text-white shadow-xl shadow-accent/20 translate-x-1"
                                            : "hover:bg-black/5 dark:hover:bg-white/5 text-muted-foreground hover:translate-x-1"
                                    )}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Product Grid */}
                <div className="grow">
                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="h-80 bg-muted animate-pulse rounded-2xl" />
                            ))}
                        </div>
                    ) : filteredAndSortedProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
                            {filteredAndSortedProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-32 text-center space-y-6">
                            <div className="p-10 bg-black/5 dark:bg-white/5 rounded-full ring-1 ring-black/5 dark:ring-white/5">
                                <Search size={64} className="text-muted-foreground opacity-20" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-2xl font-black uppercase tracking-tight">Zero results found</h3>
                                <p className="text-muted-foreground italic">No pieces match your current innovation filter.</p>
                            </div>
                            <button
                                onClick={() => { setSelectedCategory("All"); setSearchQuery(""); setSortBy("Recommended"); }}
                                className="text-accent font-black underline uppercase tracking-widest text-sm hover:text-accent/80 transition-colors"
                            >
                                Reset Search
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Filter Drawer */}
            <AnimatePresence>
                {showMobileFilters && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowMobileFilters(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-100"
                        />
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-white dark:bg-zinc-950 z-101 shadow-3xl p-8 overflow-y-auto"
                        >
                            <div className="flex items-center justify-between mb-12">
                                <h2 className="text-3xl font-black tracking-tighter uppercase">Filters</h2>
                                <button
                                    onClick={() => setShowMobileFilters(false)}
                                    className="p-3 bg-black/5 dark:bg-white/5 rounded-2xl hover:bg-accent hover:text-white transition-all"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="space-y-12">
                                <section className="space-y-6">
                                    <h4 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground border-b border-black/5 dark:border-white/5 pb-2">Sort By</h4>
                                    <div className="grid grid-cols-1 gap-3">
                                        {["Recommended", "Price: Low to High", "Price: High to Low", "Rating"].map((option) => (
                                            <button
                                                key={option}
                                                onClick={() => setSortBy(option)}
                                                className={cn(
                                                    "w-full text-left px-6 py-4 rounded-2xl font-bold transition-all",
                                                    sortBy === option
                                                        ? "bg-accent text-white shadow-lg shadow-accent/20"
                                                        : "bg-black/5 dark:bg-white/5 text-muted-foreground"
                                                )}
                                            >
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                </section>

                                <section className="space-y-6">
                                    <h4 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground border-b border-black/5 dark:border-white/5 pb-2">Category</h4>
                                    <div className="grid grid-cols-1 gap-3">
                                        {CATEGORIES.map((category) => (
                                            <button
                                                key={category}
                                                onClick={() => setSelectedCategory(category)}
                                                className={cn(
                                                    "w-full text-left px-6 py-4 rounded-2xl font-bold transition-all",
                                                    selectedCategory === category
                                                        ? "bg-accent text-white shadow-lg shadow-accent/20"
                                                        : "bg-black/5 dark:bg-white/5 text-muted-foreground"
                                                )}
                                            >
                                                {category}
                                            </button>
                                        ))}
                                    </div>
                                </section>

                                <button
                                    onClick={() => setShowMobileFilters(false)}
                                    className="w-full bg-black dark:bg-white text-white dark:text-black py-6 rounded-3xl font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all mt-8"
                                >
                                    Apply Changes
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}

function ShopPageLoading() {
    return (
        <div className="container mx-auto px-4 py-12 min-h-screen">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
                <div className="space-y-4">
                    <div className="h-16 w-64 bg-muted animate-pulse rounded" />
                    <div className="h-6 w-80 bg-muted animate-pulse rounded" />
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-80 bg-muted animate-pulse rounded-2xl" />
                ))}
            </div>
        </div>
    );
}

export default function ShopPage() {
    return (
        <Suspense fallback={<ShopPageLoading />}>
            <ShopContent />
        </Suspense>
    );
}
