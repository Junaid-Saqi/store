"use client";

import {
    ChevronLeft,
    Save,
    Loader2
} from "lucide-react";
import Link from "next/link";
import { useState, use } from "react";
import { useAdminStore } from "@/lib/admin-store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const { products, updateProduct } = useAdminStore();
    const router = useRouter();
    const [isSaving, setIsSaving] = useState(false);
    
    const product = products.find(p => p.id === Number(id));
    
    const isLoading = !product;

    const [formData, setFormData] = useState(() => ({
        name: product?.name ?? "",
        purchasePrice: product?.purchasePrice?.toString() ?? "",
        retailPrice: product?.retailPrice?.toString() ?? "",
        categoryId: ""
    }));

    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name,
                purchasePrice: product.purchasePrice?.toString() ?? "",
                retailPrice: product.retailPrice?.toString() ?? "",
                categoryId: ""
            });
        }
    }, [product]);

    const handleSave = async () => {
        if (!formData.name) {
            alert("Please fill in the product name.");
            return;
        }

        setIsSaving(true);

        try {
            await updateProduct(Number(id), {
                name: formData.name,
                purchasePrice: formData.purchasePrice ? parseFloat(formData.purchasePrice) : null,
                retailPrice: formData.retailPrice ? parseFloat(formData.retailPrice) : null,
            });
            
            setTimeout(() => {
                router.push("/admin/products");
            }, 500);
        } catch (error) {
            alert("Failed to update product");
            setIsSaving(false);
        }
    };

    if (isLoading) {
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
                        className="p-2 hover:bg-accent/10 rounded-lg transition-colors"
                    >
                        <ChevronLeft size={24} />
                    </Link>
                    <h1 className="text-3xl font-black uppercase">Edit Product</h1>
                </div>
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center space-x-2 bg-accent text-white px-6 py-3 rounded-xl font-bold hover:bg-accent/90 transition-colors disabled:opacity-50"
                >
                    {isSaving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                    <span>Save Changes</span>
                </button>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-black/5 dark:border-white/5 p-8 space-y-8">
                <div className="space-y-4">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Product Name</label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-6 py-4 bg-muted rounded-2xl font-bold text-lg"
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
            </div>
        </div>
    );
}
