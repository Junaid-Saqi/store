"use client";

import { useCart } from "@/context/CartContext";
import { formatCurrency, calculateAdvance } from "@/lib/utils";
import Link from "next/link";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck } from "lucide-react";

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();

    if (cartCount === 0) {
        return (
            <div className="container mx-auto px-4 py-32 flex flex-col items-center justify-center text-center space-y-8">
                <div className="p-8 bg-black/5 dark:bg-white/5 rounded-full">
                    <ShoppingBag size={64} className="text-muted-foreground opacity-20" />
                </div>
                <div className="space-y-2">
                    <h1 className="text-4xl font-black">YOUR CART IS EMPTY</h1>
                    <p className="text-muted-foreground max-w-sm">Looks like you haven&apos;t added any premium tech yet. Let&apos;s fix that!</p>
                </div>
                <Link
                    href="/shop"
                    className="bg-accent text-white px-8 py-4 rounded-2xl font-bold transition-all hover:scale-105 active:scale-95 shadow-xl shadow-accent/20"
                >
                    Start Shopping
                </Link>
            </div>
        );
    }

    const totalAdvance = calculateAdvance(cartTotal);

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-black tracking-tight mb-12">YOUR CART</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-6">
                    {cart.map((item) => {
                        const price = item.retailPrice || item.purchasePrice || 0;
                        return (
                            <div key={item.id} className="group flex flex-col sm:flex-row items-center p-6 bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/10 rounded-[2.5rem] shadow-premium hover:shadow-xl transition-all duration-500">
                                <div className="w-32 h-32 shrink-0 rounded-2xl bg-accent/10 flex items-center justify-center mb-4 sm:mb-0 sm:mr-6 text-6xl">
                                    📦
                                </div>

                                <div className="flex-grow space-y-2 text-center sm:text-left">
                                    <h3 className="font-bold text-lg">{item.name}</h3>
                                    <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">{item.category?.name}</p>
                                    <p className="text-xl font-black text-accent">Rs. {price}</p>
                                </div>

                                <div className="flex flex-col items-center sm:items-end space-y-4">
                                    <div className="flex items-center space-x-4 bg-black/5 dark:bg-white/5 p-2 rounded-2xl">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="p-1 hover:text-accent transition-colors"
                                        >
                                            <Minus size={16} />
                                        </button>
                                        <span className="font-bold w-8 text-center">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="p-1 hover:text-accent transition-colors"
                                        >
                                            <Plus size={16} />
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Order Summary */}
                <div className="space-y-6">
                    <div className="bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/10 rounded-[2.5rem] p-8 shadow-premium sticky top-8">
                        <h2 className="text-xl font-black uppercase mb-6">Order Summary</h2>

                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Subtotal ({cartCount} items)</span>
                                <span className="font-bold">Rs. {cartTotal}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Advance (10%)</span>
                                <span className="font-bold text-accent">Rs. {totalAdvance}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Pay on Delivery</span>
                                <span className="font-bold">Rs. {cartTotal - totalAdvance}</span>
                            </div>
                        </div>

                        <div className="border-t border-black/5 dark:border-white/5 pt-6 mb-6">
                            <div className="flex justify-between text-xl font-black">
                                <span>Total</span>
                                <span>Rs. {cartTotal}</span>
                            </div>
                        </div>

                        <Link
                            href="/checkout"
                            className="block w-full bg-accent text-white py-4 rounded-2xl font-bold text-center hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-accent/20"
                        >
                            Proceed to Checkout
                        </Link>

                        <div className="mt-6 pt-6 border-t border-black/5 dark:border-white/5 space-y-4">
                            <div className="flex items-center space-x-3 text-muted-foreground">
                                <ShieldCheck size={18} className="text-accent" />
                                <span className="text-xs font-medium">Secure checkout with SSL encryption</span>
                            </div>
                            <div className="flex items-center space-x-3 text-muted-foreground">
                                <ArrowRight size={18} className="text-accent" />
                                <span className="text-xs font-medium">Pay just 10% now, rest on delivery</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
