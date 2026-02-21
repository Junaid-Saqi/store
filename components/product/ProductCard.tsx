
"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";

interface ProductCardProps {
    product: {
        id: number;
        name: string;
        purchasePrice: number | null;
        retailPrice: number | null;
        category?: {
            name: string;
        };
    };
    horizontal?: boolean;
}

export default function ProductCard({ product, horizontal }: ProductCardProps) {
    const { addToCart } = useCart();
    const price = product.retailPrice || product.purchasePrice || 0;

    return (
        <motion.div
            whileHover={{ y: -4 }}
            className={cn(
                "group bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-premium border border-black/5 dark:border-white/5 transition-all duration-300",
                horizontal ? "flex w-[350px] shrink-0" : "flex flex-col h-full"
            )}
        >
            <div className={cn(
                "relative overflow-hidden bg-gradient-to-br from-accent/10 to-accent/5",
                horizontal ? "w-1/3 aspect-square" : "aspect-square"
            )}>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl">📦</span>
                </div>
            </div>

            <div className="p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">
                        {product.category?.name || "Uncategorized"}
                    </p>
                </div>

                <Link href={`/product/${product.id}`} className="block group-hover:text-accent transition-colors mb-2">
                    <h3 className="font-bold text-lg leading-tight line-clamp-1">{product.name}</h3>
                </Link>

                <div className="flex items-center justify-between mt-auto">
                    <div className="flex flex-col">
                        {product.retailPrice && product.purchasePrice && (
                            <span className="text-xs text-muted-foreground line-through opacity-50">
                                Rs. {product.retailPrice}
                            </span>
                        )}
                        <span className="text-xl font-extrabold">
                            Rs. {price}
                        </span>
                    </div>

                    <button
                        onClick={() => addToCart(product as any)}
                        className="bg-black dark:bg-white text-white dark:text-black p-3 rounded-2xl hover:bg-accent dark:hover:bg-accent hover:text-white dark:hover:text-white transition-all duration-300 active:scale-95"
                    >
                        <ShoppingCart size={20} />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
