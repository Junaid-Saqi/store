
"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { formatCurrency, calculateAdvance, cn } from "@/lib/utils";
import { ShieldCheck, ArrowRight, CheckCircle2, ChevronRight, Truck, CreditCard } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function CheckoutPage() {
    const { cartTotal, clearCart } = useCart();
    const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Success
    const [isProcessing, setIsProcessing] = useState(false);
    const [orderId] = useState(() => Math.floor(Math.random() * 90000) + 10000);

    const totalAdvance = calculateAdvance(cartTotal);

    const handleNext = () => {
        if (step === 2) {
            setIsProcessing(true);
            setTimeout(() => {
                setIsProcessing(false);
                setStep(3);
                clearCart();
            }, 2000);
        } else {
            setStep(step + 1);
        }
    };

    if (step === 3) {
        return (
            <div className="container mx-auto px-4 py-32 flex flex-col items-center justify-center text-center space-y-8 animate-in zoom-in-95 duration-700">
                <div className="w-24 h-24 bg-green-500 text-white rounded-full flex items-center justify-center shadow-xl shadow-green-500/20">
                    <CheckCircle2 size={48} />
                </div>
                <div className="space-y-4">
                    <h1 className="text-4xl font-black">ORDER PLACED!</h1>
                    <p className="text-muted-foreground max-w-sm">
                        Thank you for your trust. Your advance of <span className="text-accent font-bold">{formatCurrency(totalAdvance)}</span> has been confirmed.
                    </p>
                </div>
                <div className="bg-black/5 dark:bg-white/5 p-6 rounded-[2rem] max-w-xs w-full text-sm space-y-2">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Order ID</span>
                        <span className="font-bold">#EW-{orderId}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Estimated Delivery</span>
                        <span className="font-bold">Next 48 Hours</span>
                    </div>
                </div>
                <Link
                    href="/"
                    className="bg-accent text-white px-8 py-4 rounded-2xl font-bold transition-all hover:scale-105 active:scale-95 shadow-xl shadow-accent/20"
                >
                    Back to Home
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            {/* Stepper */}
            <div className="flex items-center justify-center space-x-4 mb-16">
                <div className={cn("flex items-center space-x-2", step >= 1 ? "text-accent" : "text-muted-foreground")}>
                    <div className={cn("w-8 h-8 rounded-full flex items-center justify-center font-bold border-2", step >= 1 ? "border-accent bg-accent/10" : "border-muted-foreground")}>1</div>
                    <span className="font-bold text-sm uppercase tracking-widest hidden sm:block">Shipping</span>
                </div>
                <ChevronRight size={16} className="text-muted-foreground" />
                <div className={cn("flex items-center space-x-2", step >= 2 ? "text-accent" : "text-muted-foreground")}>
                    <div className={cn("w-8 h-8 rounded-full flex items-center justify-center font-bold border-2", step >= 2 ? "border-accent bg-accent/10" : "border-muted-foreground")}>2</div>
                    <span className="font-bold text-sm uppercase tracking-widest hidden sm:block">Advance Payment</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
                {/* Form Area */}
                <div className="lg:col-span-2">
                    <AnimatePresence mode="wait">
                        {step === 1 ? (
                            <motion.div
                                key="shipping"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="space-y-8"
                            >
                                <div className="space-y-4">
                                    <h2 className="text-3xl font-black">SHIPPING DETAILS</h2>
                                    <p className="text-muted-foreground">Where should we deliver your premium tech?</p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <Input label="Full Name" placeholder="John Doe" />
                                    <Input label="Email Address" placeholder="john@example.com" />
                                    <div className="sm:col-span-2">
                                        <Input label="Address" placeholder="123 Future Street" />
                                    </div>
                                    <Input label="City" placeholder="Techville" />
                                    <Input label="Phone Number" placeholder="+1 (555) 000-0000" />
                                </div>

                                <div className="p-6 bg-accent/5 rounded-3xl flex items-center space-x-4">
                                    <Truck className="text-accent" />
                                    <div className="text-sm">
                                        <p className="font-bold">Next-Day Delivery Available</p>
                                        <p className="text-muted-foreground">Orders are processed immediately after advance payment.</p>
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="payment"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8"
                            >
                                <div className="space-y-4">
                                    <h2 className="text-3xl font-black">ADVANCE PAYMENT</h2>
                                    <p className="text-muted-foreground">Secure your order by paying 10% now.</p>
                                </div>

                                <div className="bg-black/5 dark:bg-white/5 p-8 rounded-[3rem] border-2 border-accent/20">
                                    <div className="flex flex-col items-center justify-center text-center space-y-4 mb-8">
                                        <div className="p-4 bg-accent text-white rounded-3xl shadow-xl shadow-accent/20">
                                            <CreditCard size={32} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Amount to pay now</p>
                                            <p className="text-5xl font-black text-accent">{formatCurrency(totalAdvance)}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Payment Method</p>
                                        <div className="grid grid-cols-2 gap-4">
                                            <button className="p-4 border-2 border-accent bg-accent/5 rounded-2xl text-center">
                                                <p className="font-bold">UPI / Cards</p>
                                            </button>
                                            <button className="p-4 border border-black/10 dark:border-white/10 rounded-2xl text-center opacity-50 cursor-not-allowed">
                                                <p className="font-bold">Full COD</p>
                                                <p className="text-[10px] uppercase">Disabled</p>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-accent/10 p-6 rounded-3xl flex items-start space-x-4">
                                    <ShieldCheck className="text-accent shrink-0 mt-1" />
                                    <div className="text-sm">
                                        <p className="font-bold text-accent">Commitment Bridge</p>
                                        <p className="text-muted-foreground italic">&quot;We commit to delivery, you commit to acceptance.&quot;</p>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Sidebar Summary */}
                <div className="bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/10 p-8 rounded-[3rem] shadow-premium h-fit space-y-8">
                    <h3 className="font-bold text-xl">ORDER SUMMARY</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Total Value</span>
                            <span className="font-bold">{formatCurrency(cartTotal)}</span>
                        </div>
                        <div className="flex justify-between text-sm text-accent">
                            <span className="font-bold underline">To Pay Now (10%)</span>
                            <span className="font-bold">{formatCurrency(totalAdvance)}</span>
                        </div>
                        <div className="h-px bg-black/5 dark:bg-white/5" />
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">On Delivery</span>
                            <span className="font-bold">{formatCurrency(cartTotal - totalAdvance)}</span>
                        </div>
                    </div>

                    <button
                        onClick={handleNext}
                        disabled={isProcessing}
                        className="w-full bg-black dark:bg-white text-white dark:text-black h-16 rounded-2xl font-black text-lg flex items-center justify-center space-x-2 hover:bg-accent dark:hover:bg-accent hover:text-white dark:hover:text-white transition-all active:scale-95 disabled:opacity-50"
                    >
                        {isProcessing ? (
                            <div className="h-6 w-6 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        ) : (
                            <>
                                <span>{step === 1 ? "CONTINUE" : `PAY ${formatCurrency(totalAdvance)}`}</span>
                                <ArrowRight size={22} />
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

function Input({ label, placeholder }: { label: string; placeholder: string }) {
    return (
        <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">{label}</label>
            <input
                type="text"
                placeholder={placeholder}
                className="w-full px-5 py-3 tracking-wide bg-black/5 dark:bg-white/5 border border-transparent rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
            />
        </div>
    );
}


