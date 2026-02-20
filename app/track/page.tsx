"use client";

import { useState } from "react";
import { Search, Package, Truck, CheckCircle2, Clock, MapPin, ArrowRight, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function TrackOrderPage() {
    const [orderId, setOrderId] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [trackingData, setTrackingData] = useState<any>(null);

    const handleTrack = (e: React.FormEvent) => {
        e.preventDefault();
        if (!orderId) return;

        setIsSearching(true);
        // Simulate API call
        setTimeout(() => {
            setTrackingData({
                id: orderId,
                status: "In Transit",
                lastUpdate: "2 hours ago",
                location: "Distribution Center, Karachi",
                steps: [
                    { status: "Order Placed", date: "Oct 24, 10:30 AM", completed: true },
                    { status: "Advance Paid", date: "Oct 24, 10:45 AM", completed: true },
                    { status: "Package Shipped", date: "Oct 25, 09:15 AM", completed: true },
                    { status: "In Transit", date: "Oct 25, 02:30 PM", completed: false },
                    { status: "Out for Delivery", date: "Expected Tomorrow", completed: false },
                ]
            });
            setIsSearching(false);
        }, 1500);
    };

    return (
        <div className="container mx-auto px-4 py-20 min-h-screen">
            <div className="max-w-2xl mx-auto space-y-12">
                <div className="text-center space-y-4">
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none">
                        TRACK YOUR <span className="text-accent underline decoration-4 underline-offset-8">GEAR</span>.
                    </h1>
                    <p className="text-muted-foreground text-lg italic">
                        Real-time status of your premium innovation.
                    </p>
                </div>

                <form onSubmit={handleTrack} className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-accent/50 to-accent rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                    <div className="relative flex flex-col sm:flex-row gap-4 p-4 bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-black/5 dark:border-white/10 shadow-2xl">
                        <div className="relative flex-grow">
                            <Package className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-accent transition-colors" size={24} />
                            <input
                                type="text"
                                placeholder="Enter Order ID (e.g. EW-90210)"
                                className="w-full pl-16 pr-6 py-5 bg-transparent border-none rounded-3xl focus:outline-none font-bold text-lg"
                                value={orderId}
                                onChange={(e) => setOrderId(e.target.value)}
                            />
                        </div>
                        <button
                            disabled={isSearching}
                            className="bg-accent text-white px-10 py-5 rounded-2xl font-black text-lg flex items-center justify-center space-x-2 shadow-xl shadow-accent/40 active:scale-95 transition-all disabled:opacity-50"
                        >
                            {isSearching ? (
                                <Clock className="animate-spin" size={24} />
                            ) : (
                                <>
                                    <span>TRACK</span>
                                    <ArrowRight size={24} />
                                </>
                            )}
                        </button>
                    </div>
                </form>

                <AnimatePresence mode="wait">
                    {trackingData && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="bg-accent/5 rounded-[3rem] border border-white/5 p-8 md:p-12 space-y-12 shadow-premium"
                        >
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <div className="space-y-1 border-l-4 border-accent pl-6">
                                    <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">Order ID</p>
                                    <h3 className="text-3xl font-black italic">{trackingData.id}</h3>
                                </div>
                                <div className="bg-accent/10 px-6 py-3 rounded-2xl border border-accent/20">
                                    <p className="text-xs font-black uppercase tracking-widest text-accent mb-1">Current Status</p>
                                    <div className="flex items-center space-x-2 text-xl font-bold">
                                        <Truck className="text-accent" size={20} />
                                        <span>{trackingData.status}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-8">
                                {trackingData.steps.map((step: any, i: number) => (
                                    <div key={i} className="flex space-x-6 relative last:space-x-0">
                                        {i !== trackingData.steps.length - 1 && (
                                            <div className={`absolute left-4 top-10 bottom-0 w-0.5 ${step.completed ? 'bg-accent' : 'bg-black/10 dark:bg-white/10'}`} />
                                        )}
                                        <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 z-10 ${step.completed ? 'bg-accent text-white' : 'bg-black/10 dark:bg-white/10 text-muted-foreground'}`}>
                                            {step.completed ? <CheckCircle2 size={18} /> : (i === 3 ? <Truck size={18} className="animate-pulse" /> : <div className="h-2 w-2 bg-current rounded-full" />)}
                                        </div>
                                        <div className="flex-grow pt-1.5 flex justify-between gap-4">
                                            <div>
                                                <p className={`font-black text-lg uppercase tracking-tight ${step.completed ? 'text-foreground' : 'text-muted-foreground'}`}>{step.status}</p>
                                            </div>
                                            <p className="text-sm font-bold text-muted-foreground shrink-0">{step.date}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-white/5 p-6 rounded-3xl border border-white/10 flex items-start space-x-4">
                                <div className="h-10 w-10 bg-accent/20 text-accent rounded-xl flex items-center justify-center shrink-0">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-1">Last Known Location</p>
                                    <p className="text-lg font-bold">{trackingData.location}</p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {!trackingData && !isSearching && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-60">
                        <div className="p-8 bg-black/5 dark:bg-white/5 rounded-[2rem] border border-transparent hover:border-accent/20 transition-colors">
                            <Clock className="mb-4" size={32} />
                            <h4 className="font-black uppercase text-sm tracking-widest mb-2">Instant Updates</h4>
                            <p className="text-xs leading-relaxed">Our system syncs every 15 minutes with our global logistics network.</p>
                        </div>
                        <div className="p-8 bg-black/5 dark:bg-white/5 rounded-[2rem] border border-transparent hover:border-accent/20 transition-colors">
                            <ShieldCheck className="mb-4" size={32} />
                            <h4 className="font-black uppercase text-sm tracking-widest mb-2">Secure Path</h4>
                            <p className="text-xs leading-relaxed">Your piece is handle with white-glove care from lab to door.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
