
"use client";

import { useCart } from "@/context/CartContext";
import { formatCurrency, calculateAdvance } from "@/lib/utils";
import Image from "next/image";
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
                    <p className="text-muted-foreground max-w-sm">Looks like you haven't added any premium tech yet. Let's fix that!</p>
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
                    {cart.map((item) => (
                        <div key={item.id} className="group flex flex-col sm:flex-row items-center p-6 bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/10 rounded-[2.5rem] shadow-premium hover:shadow-xl transition-all duration-500">
                            <div className="relative w-32 h-32 shrink-0 rounded-2xl overflow-hidden mb-4 sm:mb-0 sm:mr-6">
                                <Image src={item.image} alt={item.name} fill className="object-cover" />
                            </div>

                            <div className="flex-grow space-y-2 text-center sm:text-left">
                                <h3 className="font-bold text-lg">{item.name}</h3>
                                <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">{item.category}</p>
                                <p className="text-xl font-black text-accent">{formatCurrency(item.price)}</p>
                            </div>

                            <div className="flex flex-col items-center sm:items-end space-y-4">
                                <div className="flex items-center space-x-4 bg-black/5 dark:bg-white/5 p-2 rounded-2xl">
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        className="p-1 hover:text-accent transition-colors"
                                    >
                                        <Minus size={16} />
                                    </button>
                                    <span className="font-bold w-4 text-center">{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        className="p-1 hover:text-accent transition-colors"
                                    >
                                        <Plus size={16} />
                                    </button>
                                </div>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-red-500 hover:text-red-600 transition-colors p-2"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order Summary */}
                <div className="space-y-8">
                    <div className="bg-black/5 dark:bg-white/5 p-8 rounded-[3rem] space-y-6 sticky top-24">
                        <h2 className="text-2xl font-black">SUMMARY</h2>

                        <div className="space-y-4">
                            <div className="flex justify-between text-muted-foreground">
                                <span>Subtotal ({cartCount} items)</span>
                                <span>{formatCurrency(cartTotal)}</span>
                            </div>
                            <div className="flex justify-between text-muted-foreground">
                                <span>Shipping</span>
                                <span className="text-green-500 font-bold uppercase tracking-widest text-xs">Free</span>
                            </div>
                            <div className="h-px bg-black/10 dark:bg-white/10" />

                            <div className="space-y-2">
                                <div className="flex justify-between text-accent">
                                    <span className="font-bold">Pay Advance Now (10%)</span>
                                    <span className="text-2xl font-black">{formatCurrency(totalAdvance)}</span>
                                </div>
                                <p className="text-[10px] text-muted-foreground text-right italic">Remaining {formatCurrency(cartTotal - totalAdvance)} on delivery</p>
                            </div>
                        </div>

                        <div className="bg-accent/10 p-4 rounded-2xl flex items-start space-x-3">
                            <ShieldCheck size={18} className="text-accent shrink-0 mt-0.5" />
                            <p className="text-xs text-accent font-medium leading-tight">
                                Your advance payment is secured. Reach out to support if you have any questions.
                            </p>
                        </div>

                        <Link
                            href="/checkout"
                            className="w-full bg-accent text-white h-16 rounded-2xl font-black text-lg flex items-center justify-center space-x-2 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-accent/20"
                        >
                            <span>CHECKOUT</span>
                            <ArrowRight size={22} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
