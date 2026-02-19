
"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { PRODUCTS } from "@/lib/mock-data";
import { formatCurrency, calculateAdvance, cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, ArrowLeft, ArrowRight, Star, ShieldCheck, Truck, RefreshCw, Zap } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import ProductCard from "@/components/product/ProductCard";

export default function ProductDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const { addToCart } = useCart();

    const product = PRODUCTS.find((p) => p.id === id);

    if (!product) {
        return (
            <div className="container mx-auto px-4 py-32 text-center space-y-8">
                <h1 className="text-4xl font-black">PRODUCT NOT FOUND</h1>
                <p className="text-muted-foreground">The product you're looking for doesn't exist or has been removed.</p>
                <Link href="/shop" className="text-accent font-black underline">Back to Shop</Link>
            </div>
        );
    }

    const advanceAmount = calculateAdvance(product.price);
    const remainingAmount = product.price - advanceAmount;

    return (
        <div className="container mx-auto px-4 py-8 md:py-16">
            <button
                onClick={() => router.back()}
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground mb-8 transition-colors group"
            >
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                <span className="font-bold text-sm uppercase tracking-widest">Back</span>
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
                {/* Product Image */}
                <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-premium bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/10">
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Product Info */}
                <div className="flex flex-col space-y-8">
                    <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                            <span className="text-[10px] font-black uppercase tracking-widest bg-accent/10 text-accent px-3 py-1 rounded-full">
                                {product.category}
                            </span>
                            <div className="flex items-center text-amber-500 space-x-1">
                                <Star size={14} fill="currentColor" />
                                <span className="text-sm font-bold">{product.rating} ({product.reviews} reviews)</span>
                            </div>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tight">{product.name}</h1>
                        <p className="text-xl text-muted-foreground leading-relaxed">{product.description}</p>
                    </div>

                    <div className="p-8 bg-black/5 dark:bg-white/5 rounded-[2.5rem] space-y-6">
                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground font-medium">Total Price</span>
                            <span className="text-3xl font-black">{formatCurrency(product.price)}</span>
                        </div>

                        <div className="h-px bg-black/10 dark:bg-white/10" />

                        {/* Advance Calculation Box */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between text-accent">
                                <div className="flex items-center space-x-2">
                                    <Zap size={18} className="fill-current" />
                                    <span className="font-bold">Pay Advance (10%)</span>
                                </div>
                                <span className="text-xl font-black">{formatCurrency(advanceAmount)}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                                <span>Remaining on Delivery</span>
                                <span>{formatCurrency(remainingAmount)}</span>
                            </div>
                        </div>

                        <div className="bg-accent/10 p-4 rounded-2xl flex items-start space-x-3">
                            <ShieldCheck size={18} className="text-accent shrink-0 mt-0.5" />
                            <p className="text-[11px] text-accent leading-tight font-medium">
                                Our advance payment model ensures your product is reserved and protects us from fake orders. Trust is mutual!
                            </p>
                        </div>
                    </div>

                    <div className="flex space-x-4 pt-4">
                        <button
                            onClick={() => addToCart(product)}
                            className="flex-grow bg-black dark:bg-white text-white dark:text-black h-16 rounded-2xl font-black text-lg flex items-center justify-center space-x-3 hover:bg-accent dark:hover:bg-accent hover:text-white dark:hover:text-white transition-all active:scale-95 shadow-xl"
                        >
                            <ShoppingCart size={22} />
                            <span>ADD TO CART</span>
                        </button>
                    </div>

                    {/* Quick Specs / Trust */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center space-x-3 p-4 border border-black/5 dark:border-white/10 rounded-2xl">
                            <Truck size={18} className="text-muted-foreground" />
                            <span className="text-xs font-bold">Fast Shipping</span>
                        </div>
                        <div className="flex items-center space-x-3 p-4 border border-black/5 dark:border-white/10 rounded-2xl">
                            <RefreshCw size={18} className="text-muted-foreground" />
                            <span className="text-xs font-bold">7 Days Replacement</span>
                        </div>
                    </div>

                    <div className="space-y-4 pt-4">
                        <h3 className="text-xl font-black uppercase tracking-tight">Key Specifications</h3>
                        <div className="space-y-2">
                            {product.category === "Gaming Laptops" && (
                                <>
                                    <div className="flex justify-between text-sm border-b border-black/5 dark:border-white/5 pb-2">
                                        <span className="text-muted-foreground font-bold uppercase tracking-widest text-[10px]">Graphics</span>
                                        <span className="font-bold">NVIDIA RTX 4090</span>
                                    </div>
                                    <div className="flex justify-between text-sm border-b border-black/5 dark:border-white/5 pb-2">
                                        <span className="text-muted-foreground font-bold uppercase tracking-widest text-[10px]">Memory</span>
                                        <span className="font-bold">32GB DDR5</span>
                                    </div>
                                </>
                            )}
                            <div className="flex justify-between text-sm border-b border-black/5 dark:border-white/5 pb-2">
                                <span className="text-muted-foreground font-bold uppercase tracking-widest text-[10px]">Warranty</span>
                                <span className="font-bold">1 Year Global</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Related Products */}
            <div className="mt-32 space-y-12 mb-32">
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-black tracking-tighter uppercase italic">You might also <span className="text-accent">crave</span>.</h2>
                    <Link href="/shop" className="text-accent font-black text-sm uppercase tracking-widest hover:underline flex items-center gap-2">
                        View All <ArrowRight size={16} />
                    </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4).map((related) => (
                        <ProductCard key={related.id} product={related} />
                    ))}
                    {PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).length === 0 &&
                        PRODUCTS.filter(p => p.id !== product.id).slice(0, 4).map((related) => (
                            <ProductCard key={related.id} product={related} />
                        ))
                    }
                </div>
            </div>

            {/* Sticky Mobile Buy Button */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-lg border-t border-black/5 md:hidden z-40">
                <button
                    onClick={() => addToCart(product)}
                    className="w-full bg-accent text-white h-14 rounded-2xl font-black flex items-center justify-center space-x-3 shadow-lg shadow-accent/20"
                >
                    <ShoppingCart size={20} />
                    <span>ADD TO CART - {formatCurrency(product.price)}</span>
                </button>
            </div>
        </div>
    );
}
