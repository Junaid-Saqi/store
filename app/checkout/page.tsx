
"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { formatCurrency, calculateAdvance, cn } from "@/lib/utils";
import { ShieldCheck, ArrowRight, CheckCircle2, ChevronRight, Truck, CreditCard, Loader2 } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function CheckoutPage() {
    const { cart, cartTotal, clearCart } = useCart();
    const [step, setStep] = useState(1);
    const [isProcessing, setIsProcessing] = useState(false);
    const [orderData, setOrderData] = useState({
        name: "",
        email: "",
        address: "",
        city: "",
        phone: "",
    });
    const [orderId, setOrderId] = useState("");

    const totalAdvance = calculateAdvance(cartTotal);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOrderData({ ...orderData, [e.target.name]: e.target.value });
    };

    const handlePlaceOrder = async () => {
        if (!orderData.name || !orderData.email || !orderData.phone) {
            alert("Please fill in all required fields");
            return;
        }

        setIsProcessing(true);

        try {
            const items = cart.map(item => ({
                productId: item.id,
                quantity: item.quantity,
                price: item.retailPrice || item.purchasePrice || 0,
            }));

            const res = await fetch("/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    customer: orderData.name,
                    email: orderData.email,
                    product: cart.map(item => item.name).join(", "),
                    amount: cartTotal,
                    method: "10% Advance",
                    items,
                }),
            });

            const data = await res.json();
            
            if (res.ok) {
                const newOrderId = data.id.slice(-6).toUpperCase();
                setOrderId(newOrderId);
                clearCart();
                setStep(3);
            } else {
                alert("Failed to place order. Please try again.");
            }
        } catch (error) {
            console.error("Order error:", error);
            alert("Failed to place order. Please try again.");
        } finally {
            setIsProcessing(false);
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
                        Thank you for your trust. Your advance of <span className="text-accent font-bold">Rs. {totalAdvance}</span> has been confirmed.
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
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Full Name *</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={orderData.name}
                                            onChange={handleInputChange}
                                            placeholder="John Doe"
                                            className="w-full px-5 py-3 tracking-wide bg-black/5 dark:bg-white/5 border border-transparent rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Email Address *</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={orderData.email}
                                            onChange={handleInputChange}
                                            placeholder="john@example.com"
                                            className="w-full px-5 py-3 tracking-wide bg-black/5 dark:bg-white/5 border border-transparent rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                                        />
                                    </div>
                                    <div className="sm:col-span-2 space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Address</label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={orderData.address}
                                            onChange={handleInputChange}
                                            placeholder="123 Future Street"
                                            className="w-full px-5 py-3 tracking-wide bg-black/5 dark:bg-white/5 border border-transparent rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">City</label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={orderData.city}
                                            onChange={handleInputChange}
                                            placeholder="Techville"
                                            className="w-full px-5 py-3 tracking-wide bg-black/5 dark:bg-white/5 border border-transparent rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Phone Number *</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={orderData.phone}
                                            onChange={handleInputChange}
                                            placeholder="+1 (555) 000-0000"
                                            className="w-full px-5 py-3 tracking-wide bg-black/5 dark:bg-white/5 border border-transparent rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                                        />
                                    </div>
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

                                <div className="bg-black/5 dark:bg-white/5 p-8 rounded-[3rem]">
                                    <div className="flex flex-col items-center justify-center text-center space-y-4 mb-8">
                                        <div className="p-4 bg-accent text-white rounded-3xl shadow-xl shadow-accent/20">
                                            <CreditCard size={32} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Amount to pay now</p>
                                            <p className="text-5xl font-black text-accent">Rs. {totalAdvance}</p>
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

                <div className="bg-white dark:bg-zinc-900 p-8 rounded-[3rem] shadow-premium h-fit space-y-8">
                    <h3 className="font-bold text-xl">ORDER SUMMARY</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Total Value</span>
                            <span className="font-bold">Rs. {cartTotal}</span>
                        </div>
                        <div className="flex justify-between text-sm text-accent">
                            <span className="font-bold underline">To Pay Now (10%)</span>
                            <span className="font-bold">Rs. {totalAdvance}</span>
                        </div>
                        <div className="h-px bg-black/5 dark:bg-white/5" />
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">On Delivery</span>
                            <span className="font-bold">Rs. {cartTotal - totalAdvance}</span>
                        </div>
                    </div>

                    <button
                        onClick={step === 1 ? () => setStep(2) : handlePlaceOrder}
                        disabled={isProcessing}
                        className="w-full bg-black dark:bg-white text-white dark:text-black h-16 rounded-2xl font-black text-lg flex items-center justify-center space-x-2 hover:bg-accent dark:hover:bg-accent hover:text-white dark:hover:text-white transition-all active:scale-95 disabled:opacity-50"
                    >
                        {isProcessing ? (
                            <Loader2 className="animate-spin" />
                        ) : (
                            <>
                                <span>{step === 1 ? "CONTINUE" : `PAY Rs. ${totalAdvance}`}</span>
                                <ArrowRight size={22} />
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
