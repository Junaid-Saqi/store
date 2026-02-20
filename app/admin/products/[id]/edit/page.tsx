"use client";

import { CATEGORIES } from "@/lib/mock-data";
import {
    ChevronLeft,
    Upload,
    Save,
    Plus,
    Info,
    Loader2
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect, use } from "react";
import { useAdminStore } from "@/lib/admin-store";
import { useRouter } from "next/navigation";

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const { products, updateProduct, isLoading: storeLoading } = useAdminStore();
    const router = useRouter();
    const [isSaving, setIsSaving] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        category: "smartphones",
        image: ""
    });

    useEffect(() => {
        if (!storeLoading) {
            const product = products.find(p => p.id === id);
            if (product) {
                setFormData({
                    name: product.name,
                    description: product.description,
                    price: product.price.toString(),
                    category: product.category.toLowerCase(),
                    image: product.image
                });
                setIsLoading(false);
            } else {
                // Product not found, redirect
                router.push("/admin/products");
            }
        }
    }, [id, products, storeLoading, router]);

    const handleSave = async () => {
        if (!formData.name || !formData.price) {
            alert("Please fill in at least the name and price.");
            return;
        }

        setIsSaving(true);
        updateProduct(id, {
            name: formData.name,
            description: formData.description,
            price: parseFloat(formData.price),
            category: formData.category,
            image: formData.image
        });

        setTimeout(() => {
            router.push("/admin/products");
        }, 500);
    };

    if (isLoading || storeLoading) {
        return (
            <div className="flex h-[400px] items-center justify-center">
                <Loader2 className="animate-spin text-accent" size={32} />
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Link
                        href="/admin/products"
                        className="p-2 hover:bg-muted rounded-xl transition-colors"
                    >
                        <ChevronLeft size={24} />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-black uppercase tracking-tight">Edit Product</h1>
                        <p className="text-muted-foreground text-sm">Update your product details and listing.</p>
                    </div>
                </div>
                <div className="flex items-center space-x-3">
                    <button
                        onClick={() => router.push("/admin/products")}
                        className="px-6 py-2.5 rounded-xl font-bold border border-border hover:bg-muted transition-all"
                    >
                        Discard
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="px-6 py-2.5 bg-accent text-white rounded-xl font-bold hover:scale-105 transition-all shadow-lg shadow-accent/20 flex items-center space-x-2 disabled:opacity-50"
                    >
                        <Save size={18} />
                        <span>{isSaving ? "Updating..." : "Update Product"}</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    {/* General Information */}
                    <div className="bg-card border border-border rounded-4xl p-8 space-y-6 shadow-sm">
                        <h3 className="text-lg font-bold flex items-center space-x-2">
                            <span>General Information</span>
                        </h3>

                        <div className="space-y-4">
                            <div className="grid gap-2">
                                <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Product Name</label>
                                <input
                                    type="text"
                                    placeholder="e.g. iPhone 15 Pro"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-background border border-border rounded-2xl px-5 py-3 outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                                />
                            </div>

                            <div className="grid gap-2">
                                <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Description</label>
                                <textarea
                                    placeholder="Describe the product features and specifications..."
                                    rows={6}
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full bg-background border border-border rounded-2xl px-5 py-3 outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all resize-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Media */}
                    <div className="bg-card border border-border rounded-4xl p-8 space-y-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-bold">Product Media</h3>
                            <button className="text-accent text-sm font-bold hover:underline flex items-center space-x-1">
                                <Plus size={14} />
                                <span>Add from URL</span>
                            </button>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="relative aspect-square border border-border rounded-2xl overflow-hidden bg-muted group">
                                <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <button className="text-white text-xs font-bold uppercase tracking-widest">Change</button>
                                </div>
                            </div>
                            <button className="aspect-square border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center space-y-2 hover:bg-accent/5 hover:border-accent transition-all group">
                                <Plus className="text-muted-foreground group-hover:text-accent" size={24} />
                                <span className="text-xs font-bold text-muted-foreground group-hover:text-accent">Add Image</span>
                            </button>
                        </div>

                        <div className="flex items-start space-x-2 p-4 bg-blue-500/5 rounded-2xl border border-blue-500/10">
                            <Info size={18} className="text-blue-500 mt-0.5" />
                            <p className="text-xs text-blue-600 font-medium">
                                High-quality images (2000x2000px) are recommended for a better customer experience.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Organization */}
                    <div className="bg-card border border-border rounded-4xl p-8 space-y-6 shadow-sm">
                        <h3 className="text-lg font-bold">Organization</h3>

                        <div className="space-y-4">
                            <div className="grid gap-2">
                                <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Category</label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full bg-background border border-border rounded-2xl px-5 py-3 outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all appearance-none cursor-pointer"
                                >
                                    {CATEGORIES.filter(c => c !== "All").map(category => (
                                        <option key={category} value={category.toLowerCase()}>{category}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="grid gap-2">
                                <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Status</label>
                                <select className="w-full bg-background border border-border rounded-2xl px-5 py-3 outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all appearance-none cursor-pointer">
                                    <option value="active">Active</option>
                                    <option value="draft">Draft</option>
                                    <option value="archived">Archived</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Pricing */}
                    <div className="bg-card border border-border rounded-4xl p-8 space-y-6 shadow-sm">
                        <h3 className="text-lg font-bold">Pricing</h3>

                        <div className="space-y-4">
                            <div className="grid gap-2">
                                <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Base Price</label>
                                <div className="relative">
                                    <span className="absolute left-5 top-1/2 -translate-y-1/2 font-bold text-muted-foreground">$</span>
                                    <input
                                        type="number"
                                        placeholder="0.00"
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                        className="w-full bg-background border border-border rounded-2xl pl-10 pr-5 py-3 outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                                    />
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Inventory</label>
                                <input
                                    type="number"
                                    placeholder="Quantity in stock"
                                    className="w-full bg-background border border-border rounded-2xl px-5 py-3 outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
