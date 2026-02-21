"use client";

import { useAdminStore } from "@/lib/admin-store";
import {
    Plus,
    Search,
    Edit2,
    Trash2,
    Package
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { motion } from "framer-motion";

export default function AdminProducts() {
    const { products, deleteProduct, isLoading } = useAdminStore();
    const [searchQuery, setSearchQuery] = useState("");

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.category?.name || "").toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (isLoading) return (
        <div className="flex h-[400px] items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
        </div>
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
        >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-black tracking-tight uppercase">Products</h1>
                    <p className="text-muted-foreground">Manage your store&apos;s inventory and listings.</p>
                </div>
                <Link
                    href="/admin/products/new"
                    className="bg-accent text-white px-6 py-3 rounded-2xl font-bold flex items-center justify-center space-x-2 hover:scale-105 transition-all shadow-lg shadow-accent/20"
                >
                    <Plus size={20} />
                    <span>Add Product</span>
                </Link>
            </div>

            <div className="bg-card rounded-[2.5rem] overflow-hidden shadow-sm">
                <div className="p-6 bg-muted/30">
                    <div className="flex items-center bg-background rounded-2xl px-4 py-2 w-full max-w-md">
                        <Search size={18} className="text-muted-foreground mr-2" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-transparent border-none outline-none text-sm w-full py-1"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b bg-muted/10">
                                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-muted-foreground">Product</th>
                                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-muted-foreground">Category</th>
                                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-muted-foreground">Price</th>
                                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-muted-foreground">Status</th>
                                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-muted-foreground text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {filteredProducts.map((product, index) => (
                                <motion.tr
                                    key={product.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="hover:bg-accent/5 transition-colors"
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-2xl">
                                                📦
                                            </div>
                                            <div>
                                                <p className="font-bold text-sm">{product.name}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-xs font-bold px-3 py-1 bg-muted rounded-full">{product.category?.name}</span>
                                    </td>
                                    <td className="px-6 py-4 font-bold text-sm">
                                        Rs. {product.retailPrice || product.purchasePrice || 0}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-green-500 bg-green-500/10 px-2.5 py-1 rounded-full border border-green-500/20">
                                            Active
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end space-x-2">
                                            <Link
                                                href={`/admin/products/${product.id}/edit`}
                                                className="p-2 text-muted-foreground hover:text-accent hover:bg-accent/5 rounded-lg transition-colors"
                                            >
                                                <Edit2 size={16} />
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    if (confirm("Are you sure you want to delete this product?")) {
                                                        deleteProduct(product.id);
                                                    }
                                                }}
                                                className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/5 rounded-lg transition-colors"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </motion.div>
    );
}
