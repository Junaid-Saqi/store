
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatCurrency, calculateAdvance } from "@/lib/utils";
import { ShoppingCart, ArrowLeft, Star, ShieldCheck, Truck, RefreshCw } from "lucide-react";

interface Props {
    params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: Props) {
    const { id } = await params;
    const productId = parseInt(id);

    if (isNaN(productId)) {
        notFound();
    }

    const product = await prisma.product.findUnique({
        where: { id: productId },
        include: { category: true },
    });

    if (!product) {
        return (
            <div className="container mx-auto px-4 py-32 text-center space-y-8">
                <h1 className="text-4xl font-black">PRODUCT NOT FOUND</h1>
                <p className="text-muted-foreground">The product you&apos;re looking for doesn&apos;t exist or has been removed.</p>
                <Link href="/shop" className="text-accent font-black underline">Back to Shop</Link>
            </div>
        );
    }

    const price = product.retailPrice || product.purchasePrice || 0;
    const advanceAmount = calculateAdvance(price);
    const remainingAmount = price - advanceAmount;

    const relatedProducts = await prisma.product.findMany({
        where: {
            categoryId: product.categoryId,
            id: { not: product.id },
        },
        take: 4,
        include: { category: true },
    });

    return (
        <div className="container mx-auto px-4 py-8 md:py-16">
            <Link
                href="/shop"
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground mb-8 transition-colors group"
            >
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                <span className="font-bold">Back to Shop</span>
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="relative aspect-square bg-gradient-to-br from-accent/10 to-accent/5 rounded-3xl overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-8xl">📦</span>
                    </div>
                </div>

                <div className="space-y-8">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-accent mb-2">
                            {product.category?.name}
                        </p>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tight">{product.name}</h1>
                    </div>

                    <div className="flex items-baseline space-x-4">
                        <span className="text-4xl font-extrabold">Rs. {price}</span>
                        {product.retailPrice && product.purchasePrice && (
                            <span className="text-xl text-muted-foreground line-through">
                                Rs. {product.retailPrice}
                            </span>
                        )}
                    </div>

                    <div className="bg-accent/10 p-6 rounded-3xl space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Advance Payment (10%)</span>
                            <span className="font-bold text-xl">Rs. {advanceAmount}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Pay on Delivery</span>
                            <span className="font-bold text-xl">Rs. {remainingAmount}</span>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <button className="flex-1 bg-accent text-white py-4 rounded-2xl font-bold flex items-center justify-center space-x-2 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-accent/20">
                            <ShoppingCart size={20} />
                            <span>Add to Cart</span>
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-black/5 dark:border-white/5">
                        <div className="text-center space-y-2">
                            <ShieldCheck className="mx-auto text-accent" size={24} />
                            <p className="text-xs font-bold uppercase">Secure Payment</p>
                        </div>
                        <div className="text-center space-y-2">
                            <Truck className="mx-auto text-accent" size={24} />
                            <p className="text-xs font-bold uppercase">Fast Delivery</p>
                        </div>
                        <div className="text-center space-y-2">
                            <RefreshCw className="mx-auto text-accent" size={24} />
                            <p className="text-xs font-bold uppercase">Easy Returns</p>
                        </div>
                    </div>
                </div>
            </div>

            {relatedProducts.length > 0 && (
                <section className="mt-20">
                    <h2 className="text-2xl font-black uppercase mb-8">Related Products</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {relatedProducts.map((related) => (
                            <Link
                                key={related.id}
                                href={`/product/${related.id}`}
                                className="block bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-black/5 dark:border-white/5 hover:border-accent/50 transition-all"
                            >
                                <div className="aspect-square bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl mb-4 flex items-center justify-center">
                                    <span className="text-4xl">📦</span>
                                </div>
                                <h3 className="font-bold mb-2 line-clamp-1">{related.name}</h3>
                                <p className="text-accent font-extrabold">
                                    Rs. {related.retailPrice || related.purchasePrice || 0}
                                </p>
                            </Link>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}
