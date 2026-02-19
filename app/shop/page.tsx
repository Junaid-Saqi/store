
"use client";

import { useState } from "react";
import { PRODUCTS, CATEGORIES } from "@/lib/mock-data";
import ProductCard from "@/components/product/ProductCard";
import { cn } from "@/lib/utils";
import { Search, SlidersHorizontal } from "lucide-react";

export default function ShopPage() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredProducts = PRODUCTS.filter((product) => {
        const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
                <div className="space-y-4">
                    <h1 className="text-4xl font-black tracking-tight">ALL PRODUCTS</h1>
                    <p className="text-muted-foreground">Discover the latest in premium technology.</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-accent transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="pl-12 pr-4 py-3 bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/10 rounded-2xl w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <button className="flex items-center justify-center space-x-2 px-6 py-3 bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/10 rounded-2xl font-bold hover:bg-black/5 dark:hover:bg-white/5 transition-all">
                        <SlidersHorizontal size={18} />
                        <span>Filters</span>
                    </button>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-12">
                {/* Sidebar Categories */}
                <aside className="w-full md:w-48 shrink-0 space-y-8">
                    <div>
                        <h3 className="font-bold uppercase tracking-widest text-[10px] text-muted-foreground mb-4">Categories</h3>
                        <div className="flex flex-wrap md:flex-col gap-2">
                            {CATEGORIES.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={cn(
                                        "px-4 py-2 rounded-xl text-sm font-bold transition-all text-left",
                                        selectedCategory === category
                                            ? "bg-accent text-white shadow-lg shadow-accent/20"
                                            : "hover:bg-black/5 dark:hover:bg-white/5 text-muted-foreground"
                                    )}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Product Grid */}
                <div className="flex-grow">
                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                            <div className="p-6 bg-black/5 dark:bg-white/5 rounded-full">
                                <Search size={48} className="text-muted-foreground opacity-50" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold">No products found</h3>
                                <p className="text-muted-foreground">Try adjusting your filters or search query.</p>
                            </div>
                            <button
                                onClick={() => { setSelectedCategory("All"); setSearchQuery(""); }}
                                className="text-accent font-bold underline"
                            >
                                Clear all filters
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
