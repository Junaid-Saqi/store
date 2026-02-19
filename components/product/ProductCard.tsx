
"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingCart, ArrowRight } from "lucide-react";
import { Product } from "@/lib/mock-data";
import { formatCurrency, cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";

interface ProductCardProps {
    product: Product;
    horizontal?: boolean;
}

export default function ProductCard({ product, horizontal }: ProductCardProps) {
    const { addToCart } = useCart();

    return (
        <motion.div
            whileHover={{ y: -4 }}
            className={cn(
                "group bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-premium border border-black/5 dark:border-white/5 transition-all duration-300",
                horizontal ? "flex w-[350px] shrink-0" : "flex flex-col h-full"
            )}
        >
            <div className={cn(
                "relative overflow-hidden",
                horizontal ? "w-1/3 aspect-square" : "aspect-square"
            )}>
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {product.isTrending && (
                    <span className="absolute top-3 left-3 bg-accent text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                        Trending
                    </span>
                )}
            </div>

            <div className="p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">{product.category}</p>
                    <div className="flex items-center text-amber-500 space-x-0.5">
                        <Star size={12} fill="currentColor" />
                        <span className="text-[10px] font-bold">{product.rating}</span>
                    </div>
                </div>

                <Link href={`/product/${product.id}`} className="block group-hover:text-accent transition-colors mb-2">
                    <h3 className="font-bold text-lg leading-tight line-clamp-1">{product.name}</h3>
                </Link>

                <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-grow">
                    {product.description}
                </p>

                <div className="flex items-center justify-between mt-auto">
                    <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground line-through opacity-50">{formatCurrency(product.price * 1.2)}</span>
                        <span className="text-xl font-extrabold">{formatCurrency(product.price)}</span>
                    </div>

                    <button
                        onClick={() => addToCart(product)}
                        className="bg-black dark:bg-white text-white dark:text-black p-3 rounded-2xl hover:bg-accent dark:hover:bg-accent hover:text-white dark:hover:text-white transition-all duration-300 active:scale-95"
                    >
                        <ShoppingCart size={20} />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
