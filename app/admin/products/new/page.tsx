"use client";

import { useState, useEffect } from "react";
import {
    ChevronLeft,
    Save,
    Loader2
} from "lucide-react";
import Link from "next/link";
import { useAdminStore } from "@/lib/admin-store";
import { useRouter } from "next/navigation";

export default function NewProductPage() {
    const { addProduct } = useAdminStore();
    const router = useRouter();
    const [isSaving, setIsSaving] = useState(false);
    const [categories, setCategories] = useState<{id: string, name: string}[]>([]);

    const [formData, setFormData] = useState({
        name: "",
        purchasePrice: "",
        retailPrice: "",
        categoryId: ""
    });

    useEffect(() => {
        fetch("/api/categories")
            .then(res => res.json())
            .then(data => setCategories(data))
            .catch(err => console.error("Failed to fetch categories:", err));
    }, []);

    const handleSave = async () => {
        if (!formData.name) {
            alert("Please fill in the product name.");
            return;
        }

        if (!formData.categoryId) {
            alert("Please select a category.");
            return;
        }

        setIsSaving(true);

        try {
            await addProduct({
                name: formData.name,
                purchasePrice: formData.purchasePrice ? parseFloat(formData.purchasePrice) : null,
                retailPrice: formData.retailPrice ? parseFloat(formData.retailPrice) : null,
                categoryId: formData.categoryId
            } as any);

            setTimeout(() => {
                router.push("/admin/products");
            }, 500);
        } catch (error) {
            alert("Failed to create product");
            setIsSaving(false);
        }
    };

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
                        <h1 className="text-3xl font-black uppercase tracking-tight">Add New Product</h1>
                        <p className="text-muted-foreground text-sm">Create a new listing for your store.</p>
                    </div>
                </div>
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center space-x-2 bg-accent text-white px-6 py-3 rounded-xl font-bold hover:bg-accent/90 transition-colors disabled:opacity-50"
                >
                    {isSaving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                    <span>{isSaving ? "Saving..." : "Save Product"}</span>
                </button>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-black/5 dark:border-white/5 p-8 space-y-8">
                <div className="space-y-4">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Product Name</label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-6 py-4 bg-muted rounded-2xl font-bold"
                        placeholder="Enter product name"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Purchase Price</label>
                        <input
                            type="number"
                            value={formData.purchasePrice}
                            onChange={(e) => setFormData({ ...formData, purchasePrice: e.target.value })}
                            className="w-full px-6 py-4 bg-muted rounded-2xl font-bold"
                            placeholder="0.00"
                        />
                    </div>
                    <div className="space-y-4">
                        <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Retail Price</label>
                        <input
                            type="number"
                            value={formData.retailPrice}
                            onChange={(e) => setFormData({ ...formData, retailPrice: e.target.value })}
                            className="w-full px-6 py-4 bg-muted rounded-2xl font-bold"
                            placeholder="0.00"
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Category</label>
                    <select
                        value={formData.categoryId}
                        onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                        className="w-full px-6 py-4 bg-muted rounded-2xl font-bold"
                    >
                        <option value="">Select a category</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}
